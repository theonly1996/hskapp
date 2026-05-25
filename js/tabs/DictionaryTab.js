// =========================================================================
// TAB: TỪ VỰNG & AUTO-PLAY PASSIVE LISTENING MODE
// =========================================================================
const { useState: useStateDictionary, useMemo: useMemoDictionary, useEffect: useEffectDictionary, useRef: useRefDictionary } = React;

const DictionaryTab = ({ words, loading, bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus }) => {
    const [searchTerm, setSearchTerm] = useStateDictionary("");
    const [selectedPos, setSelectedPos] = useStateDictionary("all");
    const [selectedProgress, setSelectedProgress] = useStateDictionary("all");
    const [currentPage, setCurrentPage] = useStateDictionary(1);
    const wordsPerPage = 20;

    const [isAutoPlaying, setIsAutoPlaying] = useStateDictionary(false);
    const [isPaused, setIsPaused] = useStateDictionary(false); 
    const [isShuffle, setIsShuffle] = useStateDictionary(false); 
    const [playList, setPlayList] = useStateDictionary([]); 
    const [autoPlayIndex, setAutoPlayIndex] = useStateDictionary(-1);
    const [readMeaning, setReadMeaning] = useStateDictionary(true);
    const [playMode, setPlayMode] = useStateDictionary('vocab_and_example');
    
    const autoPlayRef = useRefDictionary(null);

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

    useEffectDictionary(() => {
        if (!isAutoPlaying || isPaused || autoPlayIndex < 0 || autoPlayIndex >= playList.length) {
            if (isAutoPlaying && autoPlayIndex >= playList.length) {
                setIsAutoPlaying(false);
                setAutoPlayIndex(-1);
            }
            return;
        }

        const currentItem = playList[autoPlayIndex];
        
        const playStep = async () => {
            if (!isAutoPlaying || isPaused) return;

            if (playMode === 'vocab_only') {
                await playAudio(currentItem.word, 'zh-CN', false);
                if (!isAutoPlaying || isPaused) return;

                autoPlayRef.current = setTimeout(async () => {
                    if (readMeaning && !isPaused) {
                        await playAudio(currentItem.meaning, 'vi-VN', false);
                    }
                    autoPlayRef.current = setTimeout(() => {
                        if (!isPaused) setAutoPlayIndex(prev => prev + 1);
                    }, 2000);
                }, 1200);

            } else if (playMode === 'vocab_and_example') {
                const parsedExample = parseExample(currentItem.example);
                await playAudio(currentItem.word, 'zh-CN', false);
                if (!isAutoPlaying || isPaused) return;

                autoPlayRef.current = setTimeout(async () => {
                    if (readMeaning && !isPaused) {
                        await playAudio(currentItem.meaning, 'vi-VN', false);
                    }
                    if (!isAutoPlaying || isPaused) return;

                    autoPlayRef.current = setTimeout(async () => {
                        if (parsedExample.zh && !isPaused) {
                            await playAudio(parsedExample.zh, 'zh-CN', false);
                        }
                        if (!isAutoPlaying || isPaused) return;

                        autoPlayRef.current = setTimeout(async () => {
                            if (readMeaning && parsedExample.vi && !isPaused) {
                                await playAudio(parsedExample.vi, 'vi-VN', false);
                            }
                            
                            autoPlayRef.current = setTimeout(() => {
                                if (!isPaused) setAutoPlayIndex(prev => prev + 1);
                            }, 3000);
                        }, 1500);
                    }, 1500);
                }, 1200);

            } else if (playMode === 'example_only') {
                const parsedExample = parseExample(currentItem.example);
                if (parsedExample.zh) {
                    await playAudio(parsedExample.zh, 'zh-CN', false);
                } else {
                    await playAudio(currentItem.word, 'zh-CN', false);
                }
                if (!isAutoPlaying || isPaused) return;

                autoPlayRef.current = setTimeout(async () => {
                    if (readMeaning && !isPaused) {
                        if (parsedExample.vi) {
                            await playAudio(parsedExample.vi, 'vi-VN', false);
                        } else {
                            await playAudio(currentItem.meaning, 'vi-VN', false);
                        }
                    }
                    
                    autoPlayRef.current = setTimeout(() => {
                        if (!isPaused) setAutoPlayIndex(prev => prev + 1);
                    }, 2500);
                }, 1500);
            } else if (playMode === 'long_story') {
                await playAudio(currentItem.zh, 'zh-CN', false);
                if (!isAutoPlaying || isPaused) return;

                autoPlayRef.current = setTimeout(async () => {
                    if (readMeaning && currentItem.vi && !isPaused) {
                        await playAudio(currentItem.vi, 'vi-VN', false);
                    }
                    
                    autoPlayRef.current = setTimeout(() => {
                        if (!isPaused) setAutoPlayIndex(prev => prev + 1);
                    }, 3500);
                }, 2000);
            }
        };

        playStep();

        return () => {
            clearTimeout(autoPlayRef.current);
        };
    }, [isAutoPlaying, isPaused, autoPlayIndex, playList, readMeaning, playMode]);

    const startAutoPlay = () => {
        let listToPlay = [];
        if (playMode === 'long_story') {
            listToPlay = window.hskStories ? [...window.hskStories] : [];
        } else {
            listToPlay = [...filteredWords];
        }

        if (listToPlay.length === 0) return;
        
        if (isShuffle) {
            listToPlay.sort(() => 0.5 - Math.random());
        }
        
        setPlayList(listToPlay);
        setIsAutoPlaying(true);
        setIsPaused(false);
        setAutoPlayIndex(0);
    };

    const togglePauseResume = () => {
        if (isPaused) {
            setIsPaused(false);
        } else {
            setIsPaused(true);
            window.speechSynthesis.cancel();
            clearTimeout(autoPlayRef.current);
        }
    };

    const handleNext = () => {
        window.speechSynthesis.cancel();
        clearTimeout(autoPlayRef.current);
        if (autoPlayIndex + 1 < playList.length) {
            setAutoPlayIndex(prev => prev + 1);
        } else {
            stopAutoPlay();
        }
    };

    const handlePrev = () => {
        window.speechSynthesis.cancel();
        clearTimeout(autoPlayRef.current);
        if (autoPlayIndex - 1 >= 0) {
            setAutoPlayIndex(prev => prev - 1);
        }
    };

    const stopAutoPlay = () => {
        setIsAutoPlaying(false);
        setIsPaused(false);
        setAutoPlayIndex(-1);
        setPlayList([]);
        window.speechSynthesis.cancel();
        clearTimeout(autoPlayRef.current);
    };

    return (
        <div className="animate-fade-in">
            
            {/* KHỐI CHẾ ĐỘ NGHE RẢNH TAY */}
            <div className="bg-gradient-to-r from-teal-500/15 to-indigo-500/15 dark:from-teal-950/20 dark:to-indigo-950/20 p-5 rounded-3xl border border-teal-200/40 dark:border-teal-900/40 mb-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center text-lg shrink-0 animate-pulse">
                            <i className="fas fa-headphones"></i>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Máy phát học thụ động rảnh tay (Smart Audio Learner)</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tối ưu hóa học thụ động: có đầy đủ bộ nút điều hướng tua từ vựng, tạm dừng tiện lợi cho người học bận rộn.</p>
                        </div>
                    </div>
                    
                    {/* Chọn Chế Độ Phát */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-2xl border dark:border-slate-800">
                        <button 
                            onClick={() => { setPlayMode('vocab_only'); if (isAutoPlaying) stopAutoPlay(); }}
                            className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'vocab_only' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 dark:border-slate-800'}`}
                        >
                            🗣️ Chỉ Từ vựng & Nghĩa
                        </button>
                        <button 
                            onClick={() => { setPlayMode('vocab_and_example'); if (isAutoPlaying) stopAutoPlay(); }}
                            className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'vocab_and_example' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 dark:border-slate-800'}`}
                        >
                            📖 Song ngữ Từ & Ví dụ
                        </button>
                        <button 
                            onClick={() => { setPlayMode('example_only'); if (isAutoPlaying) stopAutoPlay(); }}
                            className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'example_only' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 dark:border-slate-800'}`}
                        >
                            🎧 Chỉ câu ví dụ dài
                        </button>
                        <button 
                            onClick={() => { setPlayMode('long_story'); if (isAutoPlaying) stopAutoPlay(); }}
                            className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'long_story' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 dark:border-slate-800'}`}
                        >
                            📚 Luyện nghe đoạn văn dài
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={readMeaning} 
                                    onChange={(e) => setReadMeaning(e.target.checked)}
                                    className="rounded text-teal-600 focus:ring-teal-500"
                                />
                                Phát dịch nghĩa tiếng Việt
                            </label>

                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    checked={isShuffle} 
                                    onChange={(e) => {
                                        setIsShuffle(e.target.checked);
                                        if (isAutoPlaying) stopAutoPlay();
                                    }}
                                    className="rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className={isShuffle ? "text-indigo-600 dark:text-indigo-400 flex items-center gap-1" : "flex items-center gap-1"}>
                                    <i className="fas fa-random text-xs"></i> Trộn ngẫu nhiên
                                </span>
                            </label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {!isAutoPlaying ? (
                                <button 
                                    onClick={startAutoPlay}
                                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
                                >
                                    <i className="fas fa-play"></i> Bắt đầu nghe thụ động
                                </button>
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <button 
                                        onClick={handlePrev}
                                        disabled={autoPlayIndex === 0}
                                        className="w-9 h-9 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:text-teal-600 disabled:opacity-40 rounded-xl transition-all"
                                        title="Từ trước đó"
                                    >
                                        <i className="fas fa-backward text-xs"></i>
                                    </button>
                                    <button 
                                        onClick={togglePauseResume}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold transition-all shadow-md ${isPaused ? 'bg-amber-500 hover:bg-amber-600' : 'bg-teal-600 hover:bg-teal-700'}`}
                                        title={isPaused ? "Tiếp tục phát" : "Tạm dừng"}
                                    >
                                        <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} text-xs`}></i>
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={autoPlayIndex === playList.length - 1}
                                        className="w-9 h-9 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:text-teal-600 disabled:opacity-40 rounded-xl transition-all"
                                        title="Từ tiếp theo"
                                    >
                                        <i className="fas fa-forward text-xs"></i>
                                    </button>
                                    <button 
                                        onClick={stopAutoPlay}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                                    >
                                        <i className="fas fa-stop"></i> Dừng
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Phụ đề hiển thị song ngữ */}
                {isAutoPlaying && autoPlayIndex >= 0 && playList[autoPlayIndex] && (
                    <div className="mt-4 p-4 bg-white dark:bg-slate-950/85 rounded-2xl border border-teal-200/20 animate-fade-in flex flex-col gap-2 shadow-inner">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-900">
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
                                <i className="fas fa-headphones-alt animate-bounce"></i> Đang phát {autoPlayIndex + 1}/{playList.length}
                                {isPaused && <span className="text-amber-500 text-[9px] px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 font-bold uppercase">Tạm dừng</span>}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                                {playMode === 'vocab_only' ? 'Chỉ từ vựng' : playMode === 'vocab_and_example' ? 'Song ngữ từ + ví dụ' : playMode === 'example_only' ? 'Chỉ câu ví dụ' : 'Đoạn văn dài'}
                            </span>
                        </div>
                        
                        <div className="text-center py-2 space-y-1">
                            {playMode !== 'long_story' ? (
                                <>
                                    <h5 className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">{playList[autoPlayIndex].word}</h5>
                                    <p className="text-xs font-bold text-slate-400 italic">{playList[autoPlayIndex].pinyin} - {playList[autoPlayIndex].meaning}</p>
                                    
                                    {(playMode === 'vocab_and_example' || playMode === 'example_only') && parseExample(playList[autoPlayIndex].example).zh && (
                                        <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-1 animate-fade-in">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border dark:border-slate-850 inline-block max-w-full">
                                                {parseExample(playList[autoPlayIndex].example).zh}
                                            </p>
                                            {parseExample(playList[autoPlayIndex].example).pinyin && (
                                                <p className="text-xs text-slate-400 italic font-medium">
                                                    {parseExample(playList[autoPlayIndex].example).pinyin}
                                                </p>
                                            )}
                                            {readMeaning && parseExample(playList[autoPlayIndex].example).vi && (
                                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                                                    Dịch: "{parseExample(playList[autoPlayIndex].example).vi}"
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-3 text-left px-2 max-h-[250px] overflow-y-auto">
                                    <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold">
                                            {playList[autoPlayIndex].level}
                                        </span>
                                        <span className="text-xs font-bold text-slate-800 dark:text-white shrink-0">
                                            {playList[autoPlayIndex].title}
                                        </span>
                                    </div>
                                    <p className="text-sm md:text-base font-extrabold text-teal-700 dark:text-teal-400 leading-relaxed tracking-wide">
                                        {playList[autoPlayIndex].zh}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 italic leading-relaxed">
                                        {playList[autoPlayIndex].pinyin}
                                    </p>
                                    {readMeaning && (
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-900">
                                            Dịch nghĩa: {playList[autoPlayIndex].vi}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

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