// =========================================================================
// TAB: THỐNG KÊ (DASHBOARD CHI TIẾT - BIỂU ĐỒ & BẢNG TIẾN ĐỘ LUYỆN DỊCH)
// Đây là phần "đào sâu" dành cho người dùng muốn xem chi tiết, tách khỏi màn
// hình Trang chủ (HomeTab.js) để Trang chủ luôn gọn và tập trung vào hành
// động học tiếp theo. Toàn bộ logic/dữ liệu bên dưới được giữ NGUYÊN so với
// bản OverviewTab gốc, chỉ khác là "lessonProgress" & việc đổi trạng thái bài
// luyện dịch nay được App.js quản lý và truyền xuống qua props (dùng chung
// với HomeTab để tránh trùng lặp danh sách mặc định 45 bài học).
// Cẩm nang Bộ thủ (tra cứu bộ thủ + game ghép cặp) đã CHUYỂN sang GrammarTab
// (tab "Ngữ pháp") vì đó là tài liệu THAM KHẢO/TRA CỨU, không phải số liệu
// tiến độ — StatsTab giờ chỉ còn đúng một việc: cho biết "tiến độ đến đâu".
// =========================================================================
const { useMemo: useMemoOverview, useState: useStateOverview } = React;

const StatsTab = ({ progress = {}, bookmarks = [], wordsByLevel = null, onSwitchTab, onSwitchLevel, streak = 0, lessonProgress = [], onToggleLesson }) => {
    const allLevels = [1, 2, 3, 4, 5, 6];

    const [selectedTranslationLevel, setSelectedTranslationLevel] = useStateOverview('all');


    const levelStats = useMemoOverview(() => {
        const vocabSource = wordsByLevel || (typeof window !== 'undefined' && window.FALLBACK_VOCABULARY) || {};
        return window.ProgressService.getVocabularyStatisticsByLevel(vocabSource, allLevels);
    }, [progress, wordsByLevel]);

    const filteredTranslation = useMemoOverview(() => {
        if (selectedTranslationLevel === 'all') return lessonProgress;
        return lessonProgress.filter(item => {
            const itemLevel = item.level || (item.lessonId <= 15 ? 1 : item.lessonId <= 30 ? 2 : 3);
            return itemLevel === Number(selectedTranslationLevel);
        });
    }, [lessonProgress, selectedTranslationLevel]);

    const handleLevelSelect = (levelNum) => {
        if (typeof onSwitchLevel === 'function') onSwitchLevel(levelNum);
        if (typeof onSwitchTab === 'function') onSwitchTab('dictionary');
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* KHỐI CHUỖI NGÀY HỌC & ĐỘNG LỰC */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-3xl shadow-sm border border-amber-400/20 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase opacity-85 tracking-wider">Chuỗi Liên Tục</span>
                        <h4 className="text-3xl font-extrabold">{streak} Ngày</h4>
                        <p className="text-xs opacity-90 font-medium">Bạn đang học rất tốt! Duy trì nhé!</p>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
                        ⚡
                    </div>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-5 rounded-3xl shadow-sm border border-teal-400/20 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase opacity-85 tracking-wider">Đã Thuộc Lòng</span>
                        <h4 className="text-3xl font-extrabold">{levelStats.totalMastered} từ</h4>
                        <p className="text-xs opacity-90 font-medium">Hoàn thành {levelStats.totalPercent}% toàn khóa HSK.</p>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                        <i className="fas fa-trophy"></i>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-3xl shadow-sm border border-indigo-400/20 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase opacity-85 tracking-wider">Ưu Tiên Ôn Tập</span>
                        <h4 className="text-3xl font-extrabold">{bookmarks.length} từ</h4>
                        <p className="text-xs opacity-90 font-medium">Từ quan trọng đã đánh dấu sao.</p>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                        <i className="fas fa-star text-amber-300"></i>
                    </div>
                </div>
            </div>

            {/* BIỂU ĐỒ CHI TIẾT TỪNG CẤP ĐỘ HSK */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <i className="fas fa-chart-bar text-teal-600"></i> Phân tích lộ trình học tập HSK 1 - 6
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {levelStats.stats.map(s => (
                            <div key={s.level} className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                    <button 
                                        onClick={() => handleLevelSelect(s.level)}
                                        className="font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 text-left hover:underline flex items-center gap-1"
                                    >
                                        Cấp độ HSK {s.level} <i className="fas fa-chevron-right text-[9px]"></i>
                                    </button>
                                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                                        Đã thuộc {s.mastered}/{s.total} từ ({s.masteredPercent}% 🎉)
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden flex">
                                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${s.masteredPercent}%` }} title="Đã thuộc"></div>
                                    <div className="bg-indigo-400 h-full transition-all duration-500" style={{ width: s.total > 0 ? `${Math.round((s.learning / s.total) * 100)}%` : '0%' }} title="Đang học"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                        <div>
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block mb-1">Cố vấn học tập AI</span>
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">Đánh giá hiệu suất học của bạn</h5>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                {levelStats.totalPercent === 0 ? (
                                    "Bạn chưa đánh dấu thuộc từ nào. Hãy chuyển sang Tab 'Từ vựng' để bắt đầu học những từ vựng HSK 1 cơ bản đầu tiên!"
                                ) : levelStats.totalPercent < 30 ? (
                                    "Bạn đang có một bước khởi đầu tuyệt vời! Hãy duy trì việc học Flashcard ít nhất 10 phút mỗi ngày để tăng tốc độ ghi nhớ."
                                ) : levelStats.totalPercent < 70 ? (
                                    "Tiến độ rất ấn tượng! Bạn đã vượt qua cột mốc cơ bản. Khuyên dùng tính năng 'Luyện nghe thụ động' khi đang làm việc nhà hoặc tập thể dục để rèn thính giác phản xạ."
                                ) : (
                                    "Tuyệt hảo! Bạn đã sẵn sàng để thi thử HSK. Hãy tập trung luyện viết chữ Hán và chế độ ghép câu trắc nghiệm để đạt điểm tối đa."
                                )}
                            </p>
                        </div>
                        
                        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-3 flex justify-between gap-4 text-center">
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-slate-400">Chưa học</div>
                                <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{levelStats.totalUnlearned} từ</div>
                            </div>
                            <div className="flex-1 border-x border-slate-200/50 dark:border-slate-800/50">
                                <div className="text-xs font-semibold text-slate-400">Đang học</div>
                                <div className="text-lg font-bold text-indigo-500">{levelStats.totalLearning} từ</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-slate-400">Đã thuộc</div>
                                <div className="text-lg font-bold text-emerald-500">{levelStats.totalMastered} từ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BẢNG THEO DÕI TIẾN ĐỘ LUYỆN DỊCH */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-tasks text-emerald-600"></i> Vở Bài Tập Luyện Dịch HSK (Tổng số {lessonProgress.length} Bài)
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Học dịch chuyên sâu kèm hệ thống ngữ pháp và bộ thủ hỗ trợ thực hành.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl self-start">
                        <button 
                            onClick={() => setSelectedTranslationLevel('all')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === 'all' 
                                    ? 'bg-white dark:bg-slate-800 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            Tất cả
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('1')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '1' 
                                    ? 'bg-white dark:bg-slate-800 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            HSK 1
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('2')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '2' 
                                    ? 'bg-white dark:bg-slate-800 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            HSK 2
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('3')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '3' 
                                    ? 'bg-white dark:bg-slate-800 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            HSK 3
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                    {filteredTranslation.map((item) => (
                        <div 
                            key={item.lessonId} 
                            className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-200 ${
                                item.isCompleted 
                                    ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/55' 
                                    : 'bg-slate-50/60 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800'
                            }`}
                        >
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                <input 
                                    type="checkbox" 
                                    checked={item.isCompleted} 
                                    onChange={() => onToggleLesson && onToggleLesson(item.lessonId)}
                                    className="w-4.5 h-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer flex-shrink-0"
                                />
                                <span className={`text-xs font-bold truncate transition-all ${
                                    item.isCompleted ? 'text-emerald-600 dark:text-emerald-400 line-through' : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                    {item.title}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                                    item.isCompleted 
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                        : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                    {item.isCompleted ? 'Đã xong' : 'Chưa xong'}
                                </span>
                                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md">
                                    {item.currentScore} / 20 đ
                                </span>
                            </div>
                        </div>
                    ))}
                    {filteredTranslation.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-xs text-slate-400">
                            Không tìm thấy bài tập nào cho danh mục này.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.StatsTab = StatsTab;