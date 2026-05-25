// =========================================================================
// TAB: FLASHCARD (FLASHCARD TAB - 3D FLIPPING)
// =========================================================================
const { useState: useStateFlashcard, useEffect: useEffectFlashcard, useMemo: useMemoFlashcard } = React;

const FlashcardTab = ({ words, loading, bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus }) => {
    const [currentIndex, setCurrentIndex] = useStateFlashcard(0);
    const [isFlipped, setIsFlipped] = useStateFlashcard(false);
    const [autoPlaySpeech, setAutoPlaySpeech] = useStateFlashcard(true);

    const cleanWords = useMemoFlashcard(() => words.filter(w => w.id !== 'error'), [words]);

    // Thêm useEffect này vào ngay dưới các useEffect khác trong FlashcardTab
    useEffectFlashcard(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Tránh bị cuộn trang khi bấm Space
                handleFlip();
            } else if (e.code === 'ArrowRight') {
                handleNext();
            } else if (e.code === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        // Dọn dẹp sự kiện khi rời khỏi tab Flashcard
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFlipped, cleanWords, currentIndex]); // Dependencies cần thiết
    
    useEffectFlashcard(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [words]);

    // Tự động phát âm từ tiếng Trung khi đổi thẻ mới
    useEffectFlashcard(() => {
        if (cleanWords[currentIndex] && autoPlaySpeech && !isFlipped) {
            playAudio(cleanWords[currentIndex].word, 'zh-CN');
        }
    }, [currentIndex, cleanWords, autoPlaySpeech]);

    if (loading) return <LoadingScreen message="Đang nạp bộ Flashcard..." />;
    if (cleanWords.length === 0) {
        return (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 animate-fade-in max-w-md mx-auto">
                <i className="far fa-clone text-slate-300 text-4xl mb-3"></i>
                <p className="text-slate-500 dark:text-slate-400 font-bold">Không có từ vựng nào để tạo Flashcard.</p>
            </div>
        );
    }

    const currentWord = cleanWords[currentIndex];
    const status = progress[currentWord.id] || 'unlearned';

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % cleanWords.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev - 1 + cleanWords.length) % cleanWords.length);
        }, 150);
    };

    const handleStatusClick = (statusType) => {
        onChangeStatus(currentWord.id, statusType);
        handleNext();
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in flex flex-col gap-6">
            {/* Bảng điều khiển Flashcard */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border dark:border-slate-800 text-xs font-bold text-slate-500">
                <span>Thẻ {currentIndex + 1} / {cleanWords.length}</span>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={autoPlaySpeech} 
                        onChange={(e) => setAutoPlaySpeech(e.target.checked)}
                        className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    Tự động phát âm
                </label>
            </div>

            {/* Khối lật 3D */}
            <div 
                className="w-full h-80 perspective-1000 cursor-pointer"
                onClick={handleFlip}
            >
                <div className={`relative w-full h-full duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    
                    {/* MẶT TRƯỚC */}
                    <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-md flex flex-col items-center justify-between backface-hidden">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border dark:border-slate-800">
                                Mặt trước (Nhìn nhận diện)
                            </span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onToggleBookmark(currentWord); }}
                                className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 ${bookmarks.some(b => b.id === currentWord.id) ? 'text-amber-500' : 'text-slate-300'}`}
                            >
                                <i className="fas fa-star text-sm"></i>
                            </button>
                        </div>

                        <div className="text-center space-y-4">
                            <h2 className="text-7xl font-extrabold text-teal-600 dark:text-teal-400 tracking-wide select-none">
                                {currentWord.word}
                            </h2>
                            <p className="text-xs text-slate-400 font-semibold italic">Chạm vào thẻ để lật đáp án</p>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); playAudio(currentWord.word, 'zh-CN'); }}
                                className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center hover:bg-teal-100"
                                title="Nghe phát âm"
                            >
                                <i className="fas fa-volume-up"></i>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onShowStroke(currentWord.word); }}
                                className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-slate-100"
                                title="Xem nét viết"
                            >
                                <i className="fas fa-pen-fancy"></i>
                            </button>
                        </div>
                    </div>

                    {/* MẶT SAU */}
                    <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-md flex flex-col items-center justify-between rotate-y-180 backface-hidden">
                        <div className="w-full flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-100/30">
                                Mặt sau (Giải nghĩa)
                            </span>
                            <span className="text-xs font-bold text-slate-400 italic">
                                {POS_MAP[currentWord.pos]?.name || 'Khác'}
                            </span>
                        </div>

                        <div className="text-center space-y-2 max-h-[160px] overflow-y-auto w-full px-2 py-2">
                            <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white">{currentWord.word}</h3>
                            <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{currentWord.pinyin}</p>
                            <p className="text-base font-bold text-slate-700 dark:text-slate-200">{currentWord.meaning}</p>
                            
                            {currentWord.example && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl mt-2 text-left">
                                    {currentWord.example}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <button 
                                onClick={(e) => { e.stopPropagation(); playAudio(currentWord.word, 'zh-CN'); }}
                                className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center hover:bg-teal-100"
                            >
                                <i className="fas fa-volume-up"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Phím Điều Hướng & Đánh giá Spaced Repetition */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <button 
                        onClick={handlePrev}
                        className="flex-1 py-3 bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold text-xs rounded-2xl border dark:border-slate-800 shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all"
                    >
                        <i className="fas fa-arrow-left"></i> Thẻ trước
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex-1 py-3 bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold text-xs rounded-2xl border dark:border-slate-800 shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all"
                    >
                        Thẻ tiếp <i className="fas fa-arrow-right"></i>
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800 text-center space-y-3">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Đánh giá độ thuộc của bạn</p>
                    <div className="grid grid-cols-3 gap-2">
                        <button 
                            onClick={() => handleStatusClick('unlearned')}
                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${status === 'unlearned' ? 'bg-rose-500 text-white' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50'}`}
                        >
                            Chưa thuộc
                        </button>
                        <button 
                            onClick={() => handleStatusClick('learning')}
                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${status === 'learning' ? 'bg-indigo-500 text-white' : 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50'}`}
                        >
                            Đang học
                        </button>
                        <button 
                            onClick={() => handleStatusClick('mastered')}
                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${status === 'mastered' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50'}`}
                        >
                            Đã thuộc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};