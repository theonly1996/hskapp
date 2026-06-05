// =========================================================================
// TAB: FLASHCARD (FLASHCARD TAB - 3D FLIPPING & LESSON MANAGER)
// =========================================================================
const { useState: useStateFlashcard, useEffect: useEffectFlashcard, useMemo: useMemoFlashcard, useCallback: useCallbackFlashcard } = React;

const FlashcardTab = ({ words, loading, bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus }) => {
    // Chế độ xem: 'flashcard' (Học thẻ) | 'manager' (Quản lý bài học) | 'create_lesson' (Tạo bài mới)
    const [viewMode, setViewMode] = useStateFlashcard('flashcard');
    
    // Quản lý ID bài học đang học: 'all' (Tất cả), 'bookmarks' (Từ yêu thích) hoặc 'custom_xxx' (Bài tự tạo)
    const [activeLessonId, setActiveLessonId] = useStateFlashcard('all');
    
    // State lưu danh sách bài học tự tạo vào LocalStorage để không bị mất khi F5
    const [lessons, setLessons] = useStateFlashcard(() => {
        const saved = localStorage.getItem('flashcard_custom_lessons');
        return saved ? JSON.parse(saved) : [];
    });

    // States phục vụ việc tạo bài học mới
    const [newLessonName, setNewLessonName] = useStateFlashcard('');
    const [searchQuery, setSearchQuery] = useStateFlashcard('');
    const [selectedWordIds, setSelectedWordIds] = useStateFlashcard([]);

    // States điều khiển Flashcard
    const [currentIndex, setCurrentIndex] = useStateFlashcard(0);
    const [isFlipped, setIsFlipped] = useStateFlashcard(false);
    const [autoPlaySpeech, setAutoPlaySpeech] = useStateFlashcard(true);
    const [isTransitioning, setIsTransitioning] = useStateFlashcard(false);

    // Lọc từ vựng dựa trên bài học đang chọn & Loại bỏ từ "Đã thuộc" (Cuốn chiếu)
    const cleanWords = useMemoFlashcard(() => {
        let baseWords = words.filter(w => w.id !== 'error');

        if (activeLessonId === 'bookmarks') {
            baseWords = bookmarks;
        } else if (activeLessonId !== 'all') {
            const currentLesson = lessons.find(l => l.id === activeLessonId);
            if (currentLesson) {
                baseWords = words.filter(w => currentLesson.wordIds.includes(w.id));
            }
        }

        // Lọc cuốn chiếu: Loại bỏ những từ đã thuộc (mastered) khỏi vòng lặp học hiện tại
        return baseWords.filter(w => (progress[w.id] || 'unlearned') !== 'mastered');
    }, [words, progress, activeLessonId, lessons, bookmarks]);

    // Khắc phục triệt để lỗi "trắng màn hình" bằng cách tính toán safe index ngay trong quá trình render (Derive state)
    // Tránh việc currentIndex bị out of bounds tạm thời trước khi useEffect đồng bộ kịp
    const safeCurrentIndex = (cleanWords.length > 0 && currentIndex >= cleanWords.length) ? 0 : currentIndex;
    const currentWord = cleanWords[safeCurrentIndex];

    // Lọc danh sách từ khi tìm kiếm trong màn hình "Tạo bài mới"
    const filteredWordsForSearch = useMemoFlashcard(() => {
        const base = words.filter(w => w.id !== 'error');
        if (!searchQuery.trim()) return base;
        const q = searchQuery.toLowerCase().trim();
        return base.filter(w => 
            w.word.toLowerCase().includes(q) ||
            (w.pinyin && w.pinyin.toLowerCase().includes(q)) ||
            (w.meaning && w.meaning.toLowerCase().includes(q))
        );
    }, [words, searchQuery]);

    // Đồng bộ index an toàn khi số lượng từ thay đổi (để đồng bộ state currentIndex sau render)
    useEffectFlashcard(() => {
        if (cleanWords.length > 0 && currentIndex >= cleanWords.length) {
            setCurrentIndex(0);
        }
    }, [cleanWords.length, currentIndex]);

    // Xử lý phím tắt cho Flashcard
    useEffectFlashcard(() => {
        if (viewMode !== 'flashcard') return;

        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleFlip();
            } else if (e.code === 'ArrowRight') {
                handleNext();
            } else if (e.code === 'ArrowLeft') {
                handlePrev();
            } else if (isFlipped && !isTransitioning && currentWord) {
                if (e.key === '1') handleStatusClick('unlearned');
                else if (e.key === '2') handleStatusClick('learning');
                else if (e.key === '3') handleStatusClick('mastered');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFlipped, cleanWords, safeCurrentIndex, isTransitioning, currentWord, viewMode]);

    // Tự động phát âm
    useEffectFlashcard(() => {
        if (viewMode === 'flashcard' && cleanWords[safeCurrentIndex] && autoPlaySpeech && !isFlipped) {
            playAudio(cleanWords[safeCurrentIndex].word, 'zh-CN');
        }
    }, [safeCurrentIndex, cleanWords, autoPlaySpeech, viewMode, isFlipped]);

    // Reset lật thẻ khi đổi bài học
    const handleSelectLesson = (lessonId) => {
        setActiveLessonId(lessonId);
        setCurrentIndex(0);
        setIsFlipped(false);
        setViewMode('flashcard');
    };

    // Tạo bài học mới
    const handleCreateLesson = () => {
        if (!newLessonName.trim()) {
            alert("Vui lòng điền tên bài học!");
            return;
        }
        if (selectedWordIds.length === 0) {
            alert("Vui lòng chọn ít nhất 1 từ vựng để học!");
            return;
        }

        const newLesson = {
            id: 'custom_' + Date.now(),
            name: newLessonName.trim(),
            wordIds: selectedWordIds
        };

        const updatedLessons = [...lessons, newLesson];
        setLessons(updatedLessons);
        localStorage.setItem('flashcard_custom_lessons', JSON.stringify(updatedLessons));

        // Tự động chuyển sang học bài mới tạo
        handleSelectLesson(newLesson.id);

        // Reset form
        setNewLessonName('');
        setSelectedWordIds([]);
        setSearchQuery('');
    };

    // Xóa bài học tự tạo
    const handleDeleteLesson = (e, lessonId) => {
        e.stopPropagation();
        if (window.confirm("Bạn có chắc chắn muốn xóa bài học tự chọn này không?")) {
            const updated = lessons.filter(l => l.id !== lessonId);
            setLessons(updated);
            localStorage.setItem('flashcard_custom_lessons', JSON.stringify(updated));
            if (activeLessonId === lessonId) {
                setActiveLessonId('all');
            }
        }
    };

    // Ôn tập lại từ đầu (Reset toàn bộ trạng thái từ của bài học này về 'unlearned')
    const handleResetLessonProgress = (e, targetWordIds) => {
        e.stopPropagation();
        if (window.confirm("Đặt lại trạng thái học của toàn bộ từ trong bài này về 'Chưa thuộc' để ôn tập lại từ đầu?")) {
            targetWordIds.forEach(id => {
                onChangeStatus(id, 'unlearned');
            });
            setCurrentIndex(0);
            setIsFlipped(false);
            alert("Đã đặt lại tiến trình học!");
        }
    };

    // Đánh giá nhanh từ vựng
    const handleStatusClick = (statusType) => {
        if (isTransitioning || !currentWord) return;
        
        onChangeStatus(currentWord.id, statusType);
        
        if (statusType === 'mastered') {
            setIsTransitioning(true);
            setIsFlipped(false);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 150);
        } else {
            handleNext();
        }
    };

    const handleFlip = () => {
        if (isTransitioning) return;
        setIsFlipped(prev => !prev);
    };

    const handleNext = () => {
        if (isTransitioning || cleanWords.length <= 1) return;
        setIsTransitioning(true);
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % cleanWords.length);
            setIsTransitioning(false);
        }, 150);
    };

    const handlePrev = () => {
        if (isTransitioning || cleanWords.length <= 1) return;
        setIsTransitioning(true);
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev - 1 + cleanWords.length) % cleanWords.length);
            setIsTransitioning(false);
        }, 150);
    };

    // Tính toán số liệu tiến độ của mỗi bài học
    const getLessonStats = (wordIds) => {
        const lessonWords = words.filter(w => wordIds.includes(w.id));
        let mastered = 0, learning = 0, unlearned = 0;
        lessonWords.forEach(w => {
            const stat = progress[w.id] || 'unlearned';
            if (stat === 'mastered') mastered++;
            else if (stat === 'learning') learning++;
            else unlearned++;
        });
        const total = lessonWords.length;
        const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
        return { total, mastered, learning, unlearned, percent };
    };

    if (loading) return <LoadingScreen message="Đang nạp bộ Flashcard..." />;

    // Lấy thông tin bài học hiện tại đang học để hiển thị lên Header
    const getActiveLessonName = () => {
        if (activeLessonId === 'all') return 'Tất cả từ vựng';
        if (activeLessonId === 'bookmarks') return 'Từ vựng yêu thích ⭐';
        return lessons.find(l => l.id === activeLessonId)?.name || 'Bài học tùy chọn';
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in flex flex-col gap-6">
            
            {/* THỐNG KÊ & CHUYỂN ĐỔI CHẾ ĐỘ XEM */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border dark:border-slate-800 shadow-sm">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đang học bài</span>
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400 truncate max-w-[180px]">
                        {getActiveLessonName()}
                    </span>
                </div>
                
                <div className="flex gap-2">
                    {viewMode !== 'manager' ? (
                        <button 
                            onClick={() => setViewMode('manager')}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/40 transition-colors"
                        >
                            <i className="fas fa-folder-open"></i> Đổi Bài Học
                        </button>
                    ) : (
                        <button 
                            onClick={() => setViewMode('flashcard')}
                            className="px-3 py-1.5 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-teal-700 transition-colors"
                        >
                            <i className="fas fa-play"></i> Học Tiếp
                        </button>
                    )}
                </div>
            </div>

            {/* ==========================================
                VIEW MODE: QUẢN LÝ BÀI HỌC (MANAGER)
               ========================================== */}
            {viewMode === 'manager' && (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-extrabold text-slate-700 dark:text-slate-300 uppercase">Danh sách bài ôn tập</h3>
                        <button 
                            onClick={() => { setViewMode('create_lesson'); setSelectedWordIds([]); }}
                            className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1 hover:brightness-105 transition-all shadow-sm"
                        >
                            <i className="fas fa-plus"></i> Thêm Bài Mới
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
                        
                        {/* BÀI 1: TẤT CẢ TỪ VỰNG (Mặc định) */}
                        <div 
                            onClick={() => handleSelectLesson('all')}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${activeLessonId === 'all' ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Học tất cả từ vựng</h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Mặc định hệ thống ({words.filter(w => w.id !== 'error').length} từ)</p>
                                </div>
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] font-black">Hệ Thống</span>
                            </div>
                            {/* Thanh tiến độ */}
                            {(() => {
                                const stats = getLessonStats(words.filter(w => w.id !== 'error').map(w => w.id));
                                return (
                                    <div className="space-y-1.5 mt-3">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                            <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500" style={{ width: `${stats.percent}%` }}></div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-1">
                                            <button 
                                                onClick={(e) => handleResetLessonProgress(e, words.filter(w => w.id !== 'error').map(w => w.id))}
                                                className="text-[10px] font-extrabold text-rose-500 hover:underline"
                                                title="Học lại tất cả từ đầu"
                                            >
                                                <i className="fas fa-redo"></i> Học lại từ đầu
                                            </button>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* BÀI 2: TỪ VỰNG YÊU THÍCH (Bookmarks) */}
                        <div 
                            onClick={() => handleSelectLesson('bookmarks')}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${activeLessonId === 'bookmarks' ? 'border-amber-500 bg-amber-50/10 dark:bg-amber-950/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-extrabold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1">
                                        <i className="fas fa-star text-xs"></i> Từ vựng yêu thích (Bookmarks)
                                    </h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Các từ bạn đã gắn dấu sao ({bookmarks.length} từ)</p>
                                </div>
                            </div>
                            {bookmarks.length > 0 && (() => {
                                const stats = getLessonStats(bookmarks.map(w => w.id));
                                return (
                                    <div className="space-y-1.5 mt-3">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                            <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500" style={{ width: `${stats.percent}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* CÁC BÀI HỌC CÁ NHÂN TỰ TẠO */}
                        {lessons.length === 0 ? (
                            <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30">
                                <i className="fas fa-folder-plus text-slate-300 text-3xl mb-2"></i>
                                <p className="text-xs text-slate-400 font-bold">Chưa có bài học tự chọn nào.</p>
                                <p className="text-[11px] text-slate-400">Hãy nhấn "Thêm Bài Mới" để gom từ tự học!</p>
                            </div>
                        ) : (
                            lessons.map((lesson) => {
                                const stats = getLessonStats(lesson.wordIds);
                                const isCurrent = activeLessonId === lesson.id;
                                return (
                                    <div 
                                        key={lesson.id}
                                        onClick={() => handleSelectLesson(lesson.id)}
                                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${isCurrent ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                                                    <i className="fas fa-folder text-teal-500 text-xs"></i> {lesson.name}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 font-bold">Bài tự lập • {lesson.wordIds.length} từ vựng</p>
                                            </div>
                                            <button 
                                                onClick={(e) => handleDeleteLesson(e, lesson.id)}
                                                className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors"
                                                title="Xóa bài học"
                                            >
                                                <i className="fas fa-trash-alt text-xs"></i>
                                            </button>
                                        </div>

                                        <div className="space-y-1.5 mt-3">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                                <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${stats.percent}%` }}></div>
                                            </div>
                                            <div className="flex justify-end gap-3 pt-1">
                                                <button 
                                                    onClick={(e) => handleResetLessonProgress(e, lesson.wordIds)}
                                                    className="text-[10px] font-extrabold text-rose-500 hover:underline"
                                                >
                                                    <i className="fas fa-redo"></i> Học lại từ đầu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* ==========================================
                VIEW MODE: TẠO BÀI HỌC MỚI (CREATE)
               ========================================== */}
            {viewMode === 'create_lesson' && (
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-800 space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Tạo Bài Học Tự Chọn</h3>
                        <button 
                            onClick={() => setViewMode('manager')}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600"
                        >
                            Quay lại
                        </button>
                    </div>

                    {/* Tên bài học */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-slate-400">Tên bài học của bạn</label>
                        <input 
                            type="text" 
                            placeholder="Ví dụ: Bài học ngày thứ Hai, Từ vựng bài 1..."
                            value={newLessonName}
                            onChange={(e) => setNewLessonName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Thanh tìm kiếm từ */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-black uppercase text-slate-400">Tìm từ vựng để thêm ({selectedWordIds.length} đã chọn)</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Gõ từ Hán, Pinyin hoặc nghĩa tiếng Việt..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <i className="fas fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                        </div>
                    </div>

                    {/* Danh sách từ tìm kiếm được */}
                    <div className="max-h-60 overflow-y-auto space-y-1.5 border dark:border-slate-800 rounded-xl p-2 bg-slate-50 dark:bg-slate-950/50">
                        {filteredWordsForSearch.length === 0 ? (
                            <p className="text-center py-4 text-xs font-bold text-slate-400">Không tìm thấy từ tương thích.</p>
                        ) : (
                            filteredWordsForSearch.map(word => {
                                const isChecked = selectedWordIds.includes(word.id);
                                return (
                                    <label 
                                        key={word.id} 
                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs ${isChecked ? 'bg-teal-500/10 dark:bg-teal-500/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={isChecked}
                                            onChange={() => {
                                                if (isChecked) {
                                                    setSelectedWordIds(prev => prev.filter(id => id !== word.id));
                                                } else {
                                                    setSelectedWordIds(prev => [...prev, word.id]);
                                                }
                                            }}
                                            className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                                        />
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm tracking-wide">{word.word}</span>
                                                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold ml-2">[{word.pinyin}]</span>
                                            </div>
                                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate max-w-[150px]">
                                                {word.meaning}
                                            </span>
                                        </div>
                                    </label>
                                );
                            })
                        )}
                    </div>

                    {/* Bộ phím hành động */}
                    <div className="flex gap-2 pt-2">
                        <button 
                            type="button"
                            onClick={() => setViewMode('manager')}
                            className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="button"
                            onClick={handleCreateLesson}
                            className="flex-1 py-2 bg-teal-600 text-white font-black text-xs rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
                        >
                            Lưu bài học ({selectedWordIds.length} từ)
                        </button>
                    </div>
                </div>
            )}

            {/* ==========================================
                VIEW MODE: HỌC FLASHCARD (STUDY)
               ========================================== */}
            {viewMode === 'flashcard' && (
                <div className="space-y-6 animate-fade-in">
                    
                    {/* Bảng điều khiển Flashcard */}
                    <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border dark:border-slate-800 text-xs font-bold text-slate-500">
                        <span>Thẻ {cleanWords.length > 0 ? safeCurrentIndex + 1 : 0} / {cleanWords.length}</span>
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

                    {/* Xử lý trường hợp đã thuộc hết từ trong danh sách hoặc rỗng */}
                    {cleanWords.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 animate-fade-in max-w-md mx-auto px-6 shadow-sm space-y-4">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                                <i className="fas fa-check-circle text-3xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-1">Xuất sắc hoàn thành!</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-bold text-xs leading-relaxed">
                                    Không còn từ vựng nào chưa học trong bài này! Bạn đã chinh phục sạch sẽ toàn bộ thẻ rồi.
                                </p>
                            </div>
                            
                            <div className="pt-2 flex flex-col gap-2">
                                <button 
                                    onClick={(e) => {
                                        if (activeLessonId === 'all') {
                                            handleResetLessonProgress(e, words.filter(w => w.id !== 'error').map(w => w.id));
                                        } else if (activeLessonId === 'bookmarks') {
                                            handleResetLessonProgress(e, bookmarks.map(w => w.id));
                                        } else {
                                            const currentLesson = lessons.find(l => l.id === activeLessonId);
                                            if (currentLesson) handleResetLessonProgress(e, currentLesson.wordIds);
                                        }
                                    }}
                                    className="w-full py-2 bg-teal-600 text-white font-extrabold text-xs rounded-xl hover:bg-teal-700 transition-colors"
                                >
                                    <i className="fas fa-redo-alt"></i> Học lại bài này từ đầu
                                </button>
                                <button 
                                    onClick={() => setViewMode('manager')}
                                    className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold text-xs rounded-xl hover:bg-slate-200"
                                >
                                    <i className="fas fa-book-open"></i> Học bài khác
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                                Mặt trước (Nhận diện)
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
                                            <p className="text-xs text-slate-400 font-semibold italic">Chạm vào thẻ hoặc bấm phím Space để lật đáp án</p>
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
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                        Đánh giá độ thuộc của bạn {isFlipped && <span className="text-teal-500 font-extrabold">(Phím tắt 1 - 2 - 3)</span>}
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button 
                                            onClick={() => handleStatusClick('unlearned')}
                                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${(progress[currentWord?.id] || 'unlearned') === 'unlearned' ? 'bg-rose-500 text-white' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50'}`}
                                        >
                                            Chưa thuộc
                                        </button>
                                        <button 
                                            onClick={() => handleStatusClick('learning')}
                                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${(progress[currentWord?.id] || 'unlearned') === 'learning' ? 'bg-indigo-500 text-white' : 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50'}`}
                                        >
                                            Đang học
                                        </button>
                                        <button 
                                            onClick={() => handleStatusClick('mastered')}
                                            className={`py-2 rounded-xl text-xs font-bold transition-colors ${(progress[currentWord?.id] || 'unlearned') === 'mastered' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50'}`}
                                        >
                                            Đã thuộc
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};