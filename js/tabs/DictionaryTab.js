// =========================================================================
// TAB: TỪ VỰNG (TRA CỨU) — tìm kiếm, lọc và xem chi tiết từ vựng theo cấp độ.
// Máy phát học thụ động rảnh tay (nghe liên tục) đã được chuyển sang tab
// "Luyện tập" vì đó là một hình thức LUYỆN, không phải TRA CỨU — người
// dùng vào Từ vựng để tìm/xem một từ cụ thể, còn nghe thụ động là một
// hoạt động luyện tập chủ động, đặt cạnh Luyện dịch/Luyện thi sẽ hợp lý
// hơn theo đúng mục đích sử dụng.
// =========================================================================
const { useState: useStateDictionary, useMemo: useMemoDictionary, useEffect: useEffectDictionary } = React;

const DictionaryTab = ({ words, loading, bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus }) => {
    const [searchTerm, setSearchTerm] = useStateDictionary("");
    const [selectedPos, setSelectedPos] = useStateDictionary("all");
    const [selectedProgress, setSelectedProgress] = useStateDictionary("all");
    const [currentPage, setCurrentPage] = useStateDictionary(1);
    const wordsPerPage = 20;

    const filteredWords = useMemoDictionary(() => {
        return words.filter(w => {
            const cleanSearch = searchTerm.trim().toLowerCase();
            const cleanNoVietnamese = removeVietnameseTones(cleanSearch);
            const cleanNoPinyin = removePinyinTones(cleanSearch);

            const matchWord = w.word.includes(cleanSearch);
            const matchPinyin = w.pinyin && removePinyinTones(w.pinyin).includes(cleanNoPinyin);
            const matchMeaning = w.meaning && removeVietnameseTones(w.meaning).includes(cleanNoVietnamese);
            
            const matchSearch = matchWord || matchPinyin || matchMeaning;

            let matchPos = true;
            if (selectedPos !== "all") {
                if (selectedPos === "isMeasureWord") {
                    matchPos = !!w.isMeasureWord || w.pos === 'q';
                } else {
                    matchPos = w.pos === selectedPos;
                }
            }

            let matchProgress = true;
            if (selectedProgress !== "all") {
                const status = progress[w.id] || 'unlearned';
                matchProgress = status === selectedProgress;
            }

            return matchSearch && matchPos && matchProgress;
        });
    }, [words, searchTerm, selectedPos, selectedProgress, progress]);

    useEffectDictionary(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedPos, selectedProgress]);

    const paginatedWords = useMemoDictionary(() => {
        const startIdx = (currentPage - 1) * wordsPerPage;
        return filteredWords.slice(startIdx, startIdx + wordsPerPage);
    }, [filteredWords, currentPage]);

    const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

    if (loading) return <LoadingScreen message="Đang nạp bộ từ vựng..." />;

    return (
        <div className="animate-fade-in">
            
            {/* Hộp Tìm kiếm & Thanh Lọc */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 flex flex-col gap-4">
                <div className="relative">
                    <i className="fas fa-search absolute left-4 top-3.5 text-slate-400 dark:text-slate-500"></i>
                    <input 
                        type="text" 
                        placeholder="Nhập chữ Hán, pinyin không dấu (gaoxing) hoặc nghĩa tiếng Việt..." 
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Từ loại</label>
                        <select 
                            value={selectedPos} 
                            onChange={(e) => setSelectedPos(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-xs font-bold"
                        >
                            <option value="all">Tất cả Từ Loại</option>
                            <option value="n">Danh từ</option>
                            <option value="v">Động từ thông thường</option>
                            <option value="v_separable">Từ ly hợp</option>
                            <option value="adj">Tính từ</option>
                            <option value="q">Lượng từ</option>
                            <option value="conj">Liên từ</option>
                            <option value="p">Trợ / Giới từ</option>
                            <option value="idiom">Thành ngữ</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tiến trình học</label>
                        <select 
                            value={selectedProgress} 
                            onChange={(e) => setSelectedProgress(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-xs font-bold"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="unlearned">Chưa học</option>
                            <option value="learning">Đang học</option>
                            <option value="mastered">Đã thuộc</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-xs font-bold text-slate-400 dark:text-slate-500 flex justify-between items-center px-1">
                <span>Đã tìm thấy {filteredWords.length} từ vựng</span>
                {totalPages > 1 && <span>Trang {currentPage} / {totalPages}</span>}
            </div>

            {/* Lưới Từ Vựng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedWords.map((word) => (
                    <WordCard 
                        key={word.id} 
                        word={word} 
                        isBookmarked={bookmarks.some(b => b.id === word.id)}
                        onToggleBookmark={onToggleBookmark}
                        onShowStroke={onShowStroke}
                        learningStatus={progress[word.id] || 'unlearned'}
                        onChangeStatus={onChangeStatus}
                    />
                ))}
            </div>

            {filteredWords.length === 0 && (
                <div className="text-center text-slate-500 dark:text-slate-400 py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <i className="fas fa-search-minus text-4xl text-slate-300 dark:text-slate-700 mb-3"></i>
                    <p className="font-semibold text-sm">Không tìm thấy từ vựng nào phù hợp.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 border border-slate-100 dark:border-slate-800 flex items-center justify-center disabled:opacity-50 transition-all shadow-sm"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <span className="text-xs font-bold px-4 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 h-10 flex items-center justify-center border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                        {currentPage} / {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 border border-slate-100 dark:border-slate-800 flex items-center justify-center disabled:opacity-50 transition-all shadow-sm"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
};