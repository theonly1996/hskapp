// =========================================================================
// TAB: TRANG CHỦ (HOME) — Màn hình đầu tiên người dùng nhìn thấy khi mở app.
//
// Triết lý thiết kế: mở app lên phải biết ngay "hôm nay học gì" và chỉ cần
// một lần chạm để bắt đầu học — không phải suy nghĩ, không phải tìm menu.
// Toàn bộ dữ liệu/tính toán dùng lại nguyên vẹn TodayPlanService (không đổi
// logic học), chỉ khác về cách trình bày: gọn, tập trung vào 1 hành động
// chính, các chi tiết còn lại (thống kê đầy đủ, bảng luyện dịch ở tab
// Thống kê; cẩm nang bộ thủ tra cứu ở tab Ngữ pháp) được chuyển sang các
// tab tương ứng, truy cập qua nút "Xem thống kê chi tiết".
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

    // "Còn bao nhiêu việc hôm nay" — đếm số đầu việc (bài học / ôn tập / từ
    // mới) người dùng còn CHƯA làm, để trả lời thẳng câu hỏi "còn bao nhiêu
    // việc" ngay trên Home mà không cần tự suy luận từ 3 ô chi tiết bên dưới.
    const todayTasksTotal = useMemoHome(() => {
        let total = 0;
        if (todayPlan.nextLesson) total++;
        if (todayPlan.reviewWords.total > 0) total++;
        if (todayPlan.newWords.total > 0) total++;
        return total;
    }, [todayPlan]);

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
                    <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
                        {todayTasksTotal > 0 ? 'Hôm nay học gì?' : 'Đã xong hết việc hôm nay! 🎉'}
                    </h2>
                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                        {todayTasksTotal > 0 ? `Còn ${todayTasksTotal} việc — bấm bên dưới để bắt đầu` : 'Học thêm hoặc nghỉ ngơi đều tốt cả'}
                    </p>
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

            {/* KẾ HOẠCH HÔM NAY — chỉ để ĐỌC, không phải 3 nút bấm cạnh tranh với
                nút hành động chính ở trên. Người dùng không cần tự quyết định
                "bấm cái nào trước" — hệ thống đã quyết định đó là primaryAction.
                Các dòng còn lại chỉ cho biết "sau đó còn gì", mờ đi khi đã xong. */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                <div className={`flex items-center gap-3 px-4 py-3 ${!todayPlan.nextLesson ? 'opacity-40' : ''}`}>
                    <i className={`fas ${todayPlan.nextLesson ? 'fa-circle text-teal-500' : 'fa-circle-check text-emerald-500'} text-[10px] shrink-0`}></i>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">
                            {todayPlan.nextLesson ? todayPlan.nextLesson.title : 'Bài học: đã xong giáo trình 🎉'}
                        </p>
                    </div>
                    {todayPlan.nextLesson && <span className="text-[10px] font-bold text-slate-400 shrink-0">{todayPlan.nextLesson.vocabRemaining}/{todayPlan.nextLesson.vocabTotal} từ</span>}
                </div>

                <div className={`flex items-center gap-3 px-4 py-3 ${todayPlan.reviewWords.total === 0 ? 'opacity-40' : ''}`}>
                    <i className={`fas ${todayPlan.reviewWords.total > 0 ? 'fa-circle text-indigo-500' : 'fa-circle-check text-emerald-500'} text-[10px] shrink-0`}></i>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">
                            {todayPlan.reviewWords.total > 0 ? `Ôn tập: ${todayPlan.reviewWords.total} từ (HSK ${activeLevel})` : 'Ôn tập: chưa có từ nào cần ôn'}
                        </p>
                    </div>
                </div>

                <div className={`flex items-center gap-3 px-4 py-3 ${todayPlan.newWords.total === 0 ? 'opacity-40' : ''}`}>
                    <i className={`fas ${todayPlan.newWords.total > 0 ? 'fa-circle text-amber-500' : 'fa-circle-check text-emerald-500'} text-[10px] shrink-0`}></i>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">
                            {todayPlan.newWords.total > 0 ? `Từ mới: gợi ý ${todayPlan.newWords.suggestedCount} từ (HSK ${activeLevel})` : `Từ mới: đã học hết HSK ${activeLevel}`}
                        </p>
                    </div>
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
