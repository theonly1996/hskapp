// =========================================================================
// TAB: TRANG CHỦ (HOME) — Màn hình đầu tiên người dùng nhìn thấy khi mở app.
//
// Triết lý thiết kế: mở app lên phải biết ngay "hôm nay học gì" và chỉ cần
// một lần chạm để bắt đầu học — không phải suy nghĩ, không phải tìm menu.
// Toàn bộ dữ liệu/tính toán dùng lại nguyên vẹn TodayPlanService (không đổi
// logic học), chỉ khác về cách trình bày: gọn, tập trung vào 1 hành động
// chính, các chi tiết còn lại (thống kê đầy đủ, bảng luyện dịch, bộ thủ...)
// được chuyển sang StatsTab.js truy cập qua nút "Xem thống kê chi tiết".
// =========================================================================
const { useMemo: useMemoHome } = React;

const HomeTab = ({
    progress = {},
    bookmarks = [],
    curriculumData = {},
    words = [],
    wordsByLevel = null,
    activeLevel,
    streak = 0,
    lessonProgress = [],
    onSwitchTab,
    onJumpToLesson,
    onStartReview,
    onStartNewWords
}) => {

    const todayPlan = useMemoHome(() => {
        return window.TodayPlanService.buildTodayStudyPlan({
            progress,
            curriculumData,
            lessonProgress,
            dictionaryWords: words,
            activeLevel
        });
    }, [progress, curriculumData, lessonProgress, words, activeLevel]);

    // Thống kê tổng gọn nhẹ (tái sử dụng ProgressService, không thêm logic mới)
    const levelStats = useMemoHome(() => {
        const vocabSource = wordsByLevel || (typeof window !== 'undefined' && window.FALLBACK_VOCABULARY) || {};
        return window.ProgressService.getVocabularyStatisticsByLevel(vocabSource, [1, 2, 3, 4, 5, 6]);
    }, [progress, wordsByLevel]);

    const todayDateLabel = useMemoHome(() => {
        const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const now = new Date();
        return `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}`;
    }, []);

    const handleGoToTodayLesson = () => {
        if (todayPlan.nextLesson && typeof onJumpToLesson === 'function') {
            onJumpToLesson(todayPlan.nextLesson.level, todayPlan.nextLesson.localLessonId);
        }
    };

    const handleStartReview = () => {
        if (typeof onStartReview === 'function') onStartReview();
    };

    const handleStartNewWords = () => {
        if (typeof onStartNewWords === 'function') onStartNewWords(activeLevel);
    };

    // HÀNH ĐỘNG CHÍNH DUY NHẤT của ngày hôm nay, theo thứ tự ưu tiên:
    // 1) Có bài học tiếp theo trong giáo trình chưa hoàn thành
    // 2) Có từ đang học cần ôn tập (Spaced Repetition)
    // 3) Có từ mới gợi ý học ở cấp độ đang chọn
    const primaryAction = useMemoHome(() => {
        if (todayPlan.nextLesson) {
            return {
                label: 'Vào học ngay',
                subtitle: todayPlan.nextLesson.title,
                meta: `${todayPlan.nextLesson.vocabRemaining}/${todayPlan.nextLesson.vocabTotal} từ mới trong bài`,
                onClick: handleGoToTodayLesson,
                icon: 'fa-graduation-cap'
            };
        }
        if (todayPlan.reviewWords.total > 0) {
            return {
                label: 'Ôn tập ngay',
                subtitle: `${todayPlan.reviewWords.total} từ đang học cần ôn lại`,
                meta: `Cấp độ HSK ${activeLevel}`,
                onClick: handleStartReview,
                icon: 'fa-rotate'
            };
        }
        if (todayPlan.newWords.total > 0) {
            return {
                label: 'Học từ mới',
                subtitle: `Gợi ý ${todayPlan.newWords.suggestedCount} từ mới hôm nay`,
                meta: `Cấp độ HSK ${activeLevel}`,
                onClick: handleStartNewWords,
                icon: 'fa-star'
            };
        }
        return null;
    }, [todayPlan, activeLevel]);

    return (
        <div className="animate-fade-in space-y-4 max-w-2xl mx-auto pb-4">

            {/* LỜI CHÀO + CHUỖI NGÀY HỌC */}
            <div className="flex items-center justify-between px-1">
                <div>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{todayDateLabel}</p>
                    <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Chào bạn 👋</h2>
                </div>
                <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-100 dark:border-orange-900/40 shrink-0">
                    <span>🔥</span><span>{streak} ngày</span>
                </div>
            </div>

            {/* NÚT HÀNH ĐỘNG CHÍNH - "chỉ cần một lần nhấn để bắt đầu học" */}
            {primaryAction ? (
                <button
                    onClick={primaryAction.onClick}
                    className="w-full text-left bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white p-5 md:p-6 rounded-3xl shadow-lg shadow-teal-900/10 transition-all active:scale-[0.98] flex items-center gap-4"
                >
                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                        <i className={`fas ${primaryAction.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5">Hôm nay bạn nên</p>
                        <h3 className="text-lg font-extrabold leading-snug truncate">{primaryAction.label}</h3>
                        <p className="text-xs opacity-90 truncate mt-0.5">{primaryAction.subtitle}</p>
                    </div>
                    <i className="fas fa-arrow-right text-lg opacity-80 shrink-0"></i>
                </button>
            ) : (
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-6 rounded-3xl shadow-lg text-center space-y-1">
                    <p className="text-3xl">🎉</p>
                    <h3 className="font-extrabold text-sm">Xuất sắc! Bạn đã hoàn thành mọi nhiệm vụ hôm nay.</h3>
                    <p className="text-xs opacity-90">Ghé Từ vựng hoặc chuyển cấp độ cao hơn để học thêm nhé.</p>
                </div>
            )}

            {/* 3 KHỐI CHI TIẾT: bài tiếp theo / từ cần ôn / từ mới — minh bạch để người dùng tự chọn nếu muốn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between gap-2 min-h-[104px]">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                        <i className="fas fa-graduation-cap text-xs"></i>
                        <span className="text-[10px] font-black uppercase tracking-wider">Bài học tiếp theo</span>
                    </div>
                    {todayPlan.nextLesson ? (
                        <button onClick={handleGoToTodayLesson} className="text-left group">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{todayPlan.nextLesson.title}</p>
                            <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400 group-hover:underline mt-0.5">
                                {todayPlan.nextLesson.vocabRemaining}/{todayPlan.nextLesson.vocabTotal} từ mới <i className="fas fa-chevron-right text-[9px] ml-0.5"></i>
                            </p>
                        </button>
                    ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500">Đã hoàn thành hết giáo trình 🎉</p>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between gap-2 min-h-[104px]">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <i className="fas fa-rotate text-xs"></i>
                        <span className="text-[10px] font-black uppercase tracking-wider">Từ cần ôn</span>
                    </div>
                    {todayPlan.reviewWords.total > 0 ? (
                        <button onClick={handleStartReview} className="text-left group">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{todayPlan.reviewWords.total} từ (HSK {activeLevel})</p>
                            <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline mt-0.5">
                                Ôn tập ngay <i className="fas fa-chevron-right text-[9px] ml-0.5"></i>
                            </p>
                        </button>
                    ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500">Chưa có từ nào cần ôn</p>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between gap-2 min-h-[104px]">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <i className="fas fa-star text-xs"></i>
                        <span className="text-[10px] font-black uppercase tracking-wider">Từ vựng mới</span>
                    </div>
                    {todayPlan.newWords.total > 0 ? (
                        <button onClick={handleStartNewWords} className="text-left group">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{todayPlan.newWords.suggestedCount} từ gợi ý (HSK {activeLevel})</p>
                            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline mt-0.5">
                                Học ngay <i className="fas fa-chevron-right text-[9px] ml-0.5"></i>
                            </p>
                        </button>
                    ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500">Đã học hết từ vựng HSK {activeLevel}</p>
                    )}
                </div>
            </div>

            {/* TIẾN ĐỘ TỔNG QUAN GỌN NHẸ */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex items-center justify-around text-center divide-x divide-slate-100 dark:divide-slate-800">
                <div className="flex-1 px-2">
                    <p className="text-lg font-extrabold text-slate-800 dark:text-white">{levelStats.totalMastered}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Đã thuộc</p>
                </div>
                <div className="flex-1 px-2">
                    <p className="text-lg font-extrabold text-slate-800 dark:text-white">{levelStats.totalPercent}%</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Toàn khoá</p>
                </div>
                <div className="flex-1 px-2">
                    <p className="text-lg font-extrabold text-slate-800 dark:text-white">{bookmarks.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Ưu tiên</p>
                </div>
            </div>

            <button
                onClick={() => onSwitchTab && onSwitchTab('stats')}
                className="w-full text-center text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-1.5"
            >
                Xem thống kê chi tiết <i className="fas fa-chevron-right text-[9px]"></i>
            </button>
        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.HomeTab = HomeTab;
