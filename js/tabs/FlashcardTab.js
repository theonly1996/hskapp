// =========================================================================
// TAB: FLASHCARD (FLASHCARD TAB - 3D FLIPPING & LESSON MANAGER)
// =========================================================================
const { useState: useStateFlashcard, useEffect: useEffectFlashcard, useMemo: useMemoFlashcard, useCallback: useCallbackFlashcard } = React;

const FlashcardTab = ({ words, loading, bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus, initialLessonId }) => {
    // Chế độ xem: 'flashcard' (Học thẻ) | 'manager' (Quản lý bài học) | 'create_lesson' (Tạo bài mới)
    const [viewMode, setViewMode] = useStateFlashcard('flashcard');
    
    // Quản lý ID bài học đang học: 'all' (Tất cả), 'bookmarks' (Từ yêu thích),
    // '__review_due__' (Từ đang học cần ôn tập hôm nay - từ thẻ "Hôm nay học gì")
    // hoặc 'custom_xxx' (Bài tự tạo). initialLessonId cho phép App.js mở sẵn
    // đúng chế độ mong muốn khi mount; không truyền thì giữ nguyên mặc định cũ 'all'.
    const [activeLessonId, setActiveLessonId] = useStateFlashcard(initialLessonId || 'all');
    
    // State lưu danh sách bài học tự tạo vào LocalStorage để không bị mất khi F5
    const [lessons, setLessons] = useStateFlashcard(() => {
        const saved = localStorage.getItem('flashcard_custom_lessons');
        return saved ? JSON.parse(saved) : [];
    });

    // State lưu danh sách từ vựng tự nhập ngoài thư viện hệ thống
    const [customWords, setCustomWords] = useStateFlashcard(() => {
        const saved = localStorage.getItem('flashcard_custom_words');
        return saved ? JSON.parse(saved) : [];
    });

    // States phục vụ việc tạo bài học mới
    const [newLessonName, setNewLessonName] = useStateFlashcard('');
    const [searchQuery, setSearchQuery] = useStateFlashcard('');
    const [selectedWordIds, setSelectedWordIds] = useStateFlashcard([]);

    // States phục vụ việc thêm từ vựng mới tự thiết kế
    const [customWordChinese, setCustomWordChinese] = useStateFlashcard('');
    const [customWordPinyin, setCustomWordPinyin] = useStateFlashcard('');
    const [customWordVietnamese, setCustomWordVietnamese] = useStateFlashcard('');
    const [customWordExample, setCustomWordExample] = useStateFlashcard('');
    const [showQuickAddForm, setShowQuickAddForm] = useStateFlashcard(false);

    // States điều khiển Flashcard
    const [currentIndex, setCurrentIndex] = useStateFlashcard(0);
    const [isFlipped, setIsFlipped] = useStateFlashcard(false);
    const [autoPlaySpeech, setAutoPlaySpeech] = useStateFlashcard(true);
    const [isTransitioning, setIsTransitioning] = useStateFlashcard(false);

    // State điều khiển hệ thống Modal Thông Báo / Xác Nhận tùy biến (Thay thế hoàn toàn alert/confirm)
    const [customModal, setCustomModal] = useStateFlashcard(null); // { type: 'alert'|'confirm', message: '', onConfirm: () => {} }

    // Hàm kích hoạt Modal thông báo thay thế alert()
    const triggerAlert = (message) => {
        setCustomModal({ type: 'alert', message });
    };

    // Hàm kích hoạt Modal hỏi đáp thay thế confirm()
    const triggerConfirm = (message, onConfirmCallback) => {
        setCustomModal({ type: 'confirm', message, onConfirm: onConfirmCallback });
    };

    // Hợp nhất danh sách từ vựng hệ thống và từ vựng tự chế của người dùng
    const mergedWords = useMemoFlashcard(() => {
        const systemWords = words.filter(w => w.id !== 'error');
        return [...systemWords, ...customWords];
    }, [words, customWords]);

    // Lọc từ vựng dựa trên bài học đang chọn & Loại bỏ từ "Đã thuộc" (Cuốn chiếu)
    const cleanWords = useMemoFlashcard(() => {
        let baseWords = mergedWords;

        if (activeLessonId === 'bookmarks') {
            baseWords = bookmarks;
        } else if (activeLessonId === '__review_due__') {
            // Chế độ "Ôn tập hôm nay": chỉ lấy các từ đang ở trạng thái "learning"
            baseWords = mergedWords.filter(w => progress[w.id] === 'learning');
        } else if (activeLessonId !== 'all') {
            const currentLesson = lessons.find(l => l.id === activeLessonId);
            if (currentLesson) {
                baseWords = mergedWords.filter(w => currentLesson.wordIds.includes(w.id));
            }
        }

        // Lọc cuốn chiếu: Loại bỏ những từ đã thuộc (mastered) khỏi vòng lặp học hiện tại
        return baseWords.filter(w => (progress[w.id] || 'unlearned') !== 'mastered');
    }, [mergedWords, progress, activeLessonId, lessons, bookmarks]);

    // Khắc phục triệt để lỗi "trắng màn hình" bằng cách tính toán safe index ngay trong quá trình render (Derive state)
    const safeCurrentIndex = (cleanWords.length > 0 && currentIndex >= cleanWords.length) ? 0 : currentIndex;
    const currentWord = cleanWords[safeCurrentIndex];

    // Lọc danh sách từ khi tìm kiếm trong màn hình "Tạo bài mới"
    const filteredWordsForSearch = useMemoFlashcard(() => {
        if (!searchQuery.trim()) return mergedWords;
        const q = searchQuery.toLowerCase().trim();
        return mergedWords.filter(w => 
            w.word.toLowerCase().includes(q) ||
            (w.pinyin && w.pinyin.toLowerCase().includes(q)) ||
            (w.meaning && w.meaning.toLowerCase().includes(q))
        );
    }, [mergedWords, searchQuery]);

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

    // Chức năng thêm một từ vựng cá nhân mới ngoài hệ thống
    const handleAddCustomWord = () => {
        if (!customWordChinese.trim()) {
            triggerAlert("Vui lòng điền Chữ Hán / Chữ tiếng Trung!");
            return;
        }
        if (!customWordVietnamese.trim()) {
            triggerAlert("Vui lòng điền Nghĩa tiếng Việt!");
            return;
        }

        const newWordId = 'user_word_' + Date.now();
        const newWordObj = {
            id: newWordId,
            word: customWordChinese.trim(),
            pinyin: customWordPinyin.trim() || '---',
            meaning: customWordVietnamese.trim(),
            example: customWordExample.trim() || '',
            pos: 'noun', // Giá trị từ loại mặc định
            isCustom: true // Đánh dấu từ do người dùng tự thêm
        };

        const updatedCustomWords = [...customWords, newWordObj];
        setCustomWords(updatedCustomWords);
        localStorage.setItem('flashcard_custom_words', JSON.stringify(updatedCustomWords));

        // Tự động đánh dấu tích chọn từ này trong danh sách thiết lập bài học
        setSelectedWordIds(prev => [...prev, newWordId]);

        // Làm sạch form nhập liệu và đóng khung collapsible
        setCustomWordChinese('');
        setCustomWordPinyin('');
        setCustomWordVietnamese('');
        setCustomWordExample('');
        setShowQuickAddForm(false);
        triggerAlert("Đã lưu từ vựng cá nhân thành công và tự động thêm vào danh sách bài học!");
    };

    // Chức năng xóa từ vựng cá nhân vĩnh viễn
    const handleDeleteCustomWord = (e, wordId) => {
        e.stopPropagation();
        e.preventDefault();
        triggerConfirm("Bạn có chắc chắn muốn xóa vĩnh viễn từ vựng cá nhân này khỏi hệ thống?", () => {
            const updated = customWords.filter(w => w.id !== wordId);
            setCustomWords(updated);
            localStorage.setItem('flashcard_custom_words', JSON.stringify(updated));
            // Hủy chọn từ đó trong bài học nếu đang được tích
            setSelectedWordIds(prev => prev.filter(id => id !== wordId));
        });
    };

    // Tạo bài học mới
    const handleCreateLesson = () => {
        if (!newLessonName.trim()) {
            triggerAlert("Vui lòng điền tên bài học!");
            return;
        }
        if (selectedWordIds.length === 0) {
            triggerAlert("Vui lòng chọn ít nhất 1 từ vựng để bắt đầu học!");
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
        triggerConfirm("Bạn có chắc chắn muốn xóa bài học tự chọn này không?", () => {
            const updated = lessons.filter(l => l.id !== lessonId);
            setLessons(updated);
            localStorage.setItem('flashcard_custom_lessons', JSON.stringify(updated));
            if (activeLessonId === lessonId) {
                setActiveLessonId('all');
            }
        });
    };

    // Ôn tập lại từ đầu (Reset toàn bộ trạng thái từ của bài học này về 'unlearned')
    const handleResetLessonProgress = (e, targetWordIds) => {
        e.stopPropagation();
        triggerConfirm("Đặt lại trạng thái học của toàn bộ từ trong bài này về 'Chưa thuộc' để ôn tập lại từ đầu?", () => {
            targetWordIds.forEach(id => {
                onChangeStatus(id, 'unlearned');
            });
            setCurrentIndex(0);
            setIsFlipped(false);
            triggerAlert("Đã đặt lại tiến trình ôn tập của bài thành công!");
        });
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
        return window.ProgressService.getVocabularyStatisticsForSubset(mergedWords, wordIds);
    };

    if (loading) return <LoadingScreen message="Đang nạp bộ Flashcard..." />;

    // Lấy thông tin bài học hiện tại đang học để hiển thị lên Header
    const getActiveLessonName = () => {
        if (activeLessonId === 'all') return 'Tất cả từ vựng';
        if (activeLessonId === 'bookmarks') return 'Từ vựng yêu thích ⭐';
        if (activeLessonId === '__review_due__') return 'Ôn tập từ đang học hôm nay 🎯';
        return lessons.find(l => l.id === activeLessonId)?.name || 'Bài học tùy chọn';
    };

    return (
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full animate-fade-in flex flex-col gap-6 relative px-4 transition-all duration-300">
            
            {/* ==========================================
                HỆ THỐNG CUSTOM MODAL THAY THẾ ALERT/CONFIRM
               ========================================== */}
            {customModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border dark:border-slate-800 shadow-xl space-y-4 transform scale-100 transition-transform">
                        <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
                            <i className={`fas ${customModal.type === 'confirm' ? 'fa-question-circle text-2xl' : 'fa-info-circle text-2xl'}`}></i>
                            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-100">
                                {customModal.type === 'confirm' ? 'Xác nhận yêu cầu' : 'Thông báo hệ thống'}
                            </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                            {customModal.message}
                        </p>
                        <div className="flex gap-2 justify-end pt-2">
                            {customModal.type === 'confirm' && (
                                <button 
                                    onClick={() => setCustomModal(null)}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                            )}
                            <button 
                                onClick={() => {
                                    if (customModal.type === 'confirm' && customModal.onConfirm) {
                                        customModal.onConfirm();
                                    }
                                    setCustomModal(null);
                                }}
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl transition-all shadow-sm"
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* THỐNG KÊ & CHUYỂN ĐỔI CHẾ ĐỘ XEM */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-5 py-4 rounded-2xl border dark:border-slate-800 shadow-sm">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đang học bài</span>
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400 truncate max-w-[180px] md:max-w-xs">
                        {getActiveLessonName()}
                    </span>
                </div>
                
                <div className="flex gap-2">
                    {viewMode !== 'manager' ? (
                        <button 
                            onClick={() => setViewMode('manager')}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-950/40 transition-colors"
                        >
                            <i className="fas fa-folder-open text-xs"></i> <span className="hidden md:inline">Đổi Bài Học</span><span className="inline md:hidden">Đổi Bài</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => setViewMode('flashcard')}
                            className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-teal-700 transition-colors"
                        >
                            <i className="fas fa-play text-xs"></i> Học Tiếp
                        </button>
                    )}
                </div>
            </div>

            {/* ==========================================
                VIEW MODE: QUẢN LÝ BÀI HỌC (MANAGER)
               ========================================== */}
            {}
            {viewMode === 'manager' && (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Danh sách bài ôn tập</h3>
                        <button 
                            onClick={() => { setViewMode('create_lesson'); setSelectedWordIds([]); }}
                            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                        >
                            <i className="fas fa-plus"></i> Tạo Bài Mới
                        </button>
                    </div>

                    {/* Sử dụng grid 2 cột trên màn hình desktop (md:grid-cols-2) để hiển thị trực quan hơn */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-1">
                        
                        {/* BÀI 1: TẤT CẢ TỪ VỰNG (Mặc định) */}
                        <div 
                            onClick={() => handleSelectLesson('all')}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-full ${activeLessonId === 'all' ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/10 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-base">Học tất cả từ vựng</h4>
                                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">Mặc định hệ thống ({mergedWords.length} từ)</p>
                                </div>
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] font-black uppercase tracking-wider">Hệ Thống</span>
                            </div>
                            {/* Thanh tiến độ */}
                            {(() => {
                                const stats = getLessonStats(mergedWords.map(w => w.id));
                                return (
                                    <div className="space-y-2 mt-4">
                                        <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500">
                                            <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${stats.percent}%` }}></div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-1">
                                            <button 
                                                onClick={(e) => handleResetLessonProgress(e, mergedWords.map(w => w.id))}
                                                className="text-[10px] font-extrabold text-rose-500 hover:underline"
                                                title="Học lại tất cả từ đầu"
                                            >
                                                <i className="fas fa-redo"></i> Học lại tất cả từ đầu
                                            </button>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* BÀI 2: TỪ VỰNG YÊU THÍCH (Bookmarks) */}
                        <div 
                            onClick={() => handleSelectLesson('bookmarks')}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-full ${activeLessonId === 'bookmarks' ? 'border-amber-500 bg-amber-50/10 dark:bg-amber-950/10 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-extrabold text-amber-600 dark:text-amber-400 text-sm md:text-base flex items-center gap-1.5">
                                        <i className="fas fa-star text-xs"></i> Từ vựng yêu thích
                                    </h4>
                                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">Các từ bạn đã gắn dấu sao ({bookmarks.length} từ)</p>
                                </div>
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/10 rounded text-[10px] font-black uppercase tracking-wider">Yêu thích</span>
                            </div>
                            {bookmarks.length > 0 ? (() => {
                                const stats = getLessonStats(bookmarks.map(w => w.id));
                                return (
                                    <div className="space-y-2 mt-4">
                                        <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500">
                                            <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.percent}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })() : (
                                <p className="text-[11px] text-slate-400 italic mt-4">Hãy nhấn biểu tượng ngôi sao trên Flashcard để lưu từ yêu thích.</p>
                            )}
                        </div>

                        {/* CÁC BÀI HỌC CÁ NHÂN TỰ TẠO */}
                        {lessons.map((lesson) => {
                            const stats = getLessonStats(lesson.wordIds);
                            const isCurrent = activeLessonId === lesson.id;
                            return (
                                <div 
                                    key={lesson.id}
                                    onClick={() => handleSelectLesson(lesson.id)}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between h-full ${isCurrent ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/10 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-base flex items-center gap-1.5">
                                                <i className="fas fa-folder text-teal-500 text-xs"></i> {lesson.name}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-bold mt-0.5">Bài tự lập • {lesson.wordIds.length} từ vựng</p>
                                        </div>
                                        <button 
                                            onClick={(e) => handleDeleteLesson(e, lesson.id)}
                                            className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            title="Xóa bài học"
                                        >
                                            <i className="fas fa-trash-alt text-xs"></i>
                                        </button>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500">
                                            <span>Tiến độ: {stats.percent}% (Đã thuộc: {stats.mastered}/{stats.total})</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.percent}%` }}></div>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-1">
                                            <button 
                                                onClick={(e) => handleResetLessonProgress(e, lesson.wordIds)}
                                                className="text-[10px] font-extrabold text-rose-500 hover:underline"
                                            >
                                                <i className="fas fa-redo"></i> Ôn tập lại từ đầu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {lessons.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 max-w-md mx-auto w-full">
                            <i className="fas fa-folder-plus text-slate-300 text-4xl mb-3"></i>
                            <p className="text-xs text-slate-400 font-bold">Chưa có bài học tự chọn nào.</p>
                            <p className="text-[11px] text-slate-400">Hãy nhấn "Tạo Bài Mới" ở góc trên để chọn lọc từ cần học!</p>
                        </div>
                    )}
                </div>
            )}

            {/* ==========================================
                VIEW MODE: TẠO BÀI HỌC MỚI (CREATE)
               ========================================== */}
            {}
            {viewMode === 'create_lesson' && (
                <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-3xl border dark:border-slate-800 space-y-6 animate-fade-in shadow-sm">
                    <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800">
                        <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 uppercase tracking-wider">Tạo Bài Học Tự Chọn</h3>
                        <button 
                            onClick={() => setViewMode('manager')}
                            className="text-xs font-black text-slate-400 hover:text-teal-600 transition-colors flex items-center gap-1"
                        >
                            <i className="fas fa-chevron-left"></i> Quay lại
                        </button>
                    </div>

                    {/* Thiết kế lưới 2 cột trên PC giúp giao diện trực quan và rộng rãi */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* CỘT TRÁI (md:5): THÔNG TIN BÀI HỌC & FORM THÊM TỪ CÁ NHÂN */}
                        <div className="md:col-span-5 space-y-4">
                            {/* Tên bài học */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-wider">Tên bài học của bạn</label>
                                <input 
                                    type="text" 
                                    placeholder="Ví dụ: Bài 1, Từ khó nhớ, Ngày 26..."
                                    value={newLessonName}
                                    onChange={(e) => setNewLessonName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                />
                            </div>

                            {/* BỔ SUNG TÍNH NĂNG: THÊM NHANH TỪ CÁ NHÂN */}
                            <div className="border border-teal-100 dark:border-teal-950/60 rounded-xl bg-teal-50/20 dark:bg-teal-950/5 overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setShowQuickAddForm(!showQuickAddForm)}
                                    className="w-full px-4 py-3 flex justify-between items-center text-xs font-extrabold text-teal-600 dark:text-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors"
                                >
                                    <span className="flex items-center gap-2 text-left">
                                        <i className="fas fa-plus-circle"></i> Tự thêm từ ngoài thư viện (Tên riêng, từ mới)
                                    </span>
                                    <i className={`fas fa-chevron-${showQuickAddForm ? 'up' : 'down'} text-[10px] ml-2`}></i>
                                </button>

                                {showQuickAddForm && (
                                    <div className="p-4 border-t border-teal-100 dark:border-teal-950/40 space-y-3 bg-white dark:bg-slate-950/40 animate-fade-in text-left">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-0.5">
                                                <label className="text-[9px] font-black uppercase text-slate-400">Chữ Hán *</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Ví dụ: 北京"
                                                    value={customWordChinese}
                                                    onChange={(e) => setCustomWordChinese(e.target.value)}
                                                    className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 rounded-lg text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-0.5">
                                                <label className="text-[9px] font-black uppercase text-slate-400">Pinyin</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Ví dụ: Běijīng"
                                                    value={customWordPinyin}
                                                    onChange={(e) => setCustomWordPinyin(e.target.value)}
                                                    className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 rounded-lg text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-0.5">
                                            <label className="text-[9px] font-black uppercase text-slate-400">Nghĩa tiếng Việt *</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ví dụ: Bắc Kinh"
                                                value={customWordVietnamese}
                                                onChange={(e) => setCustomWordVietnamese(e.target.value)}
                                                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 rounded-lg text-xs font-bold"
                                            />
                                        </div>
                                        <div className="space-y-0.5">
                                            <label className="text-[9px] font-black uppercase text-slate-400">Ví dụ minh họa (Nếu có)</label>
                                            <textarea 
                                                placeholder="Ví dụ: 我去过北京。"
                                                value={customWordExample}
                                                onChange={(e) => setCustomWordExample(e.target.value)}
                                                rows="2"
                                                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 rounded-lg text-[11px] font-semibold resize-none"
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end gap-1.5 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => setShowQuickAddForm(false)}
                                                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md text-[10px] font-bold hover:bg-slate-200 transition-colors"
                                            >
                                                Hủy bỏ
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleAddCustomWord}
                                                className="px-3 py-1.5 bg-teal-600 text-white rounded-md text-[10px] font-black hover:bg-teal-700 shadow-sm transition-colors"
                                            >
                                                Lưu & Chọn từ này
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CỘT PHẢI (md:7): TÌM KIẾM & CHỌN TỪ VỰNG GỒM GRID 2 CỘT */}
                        <div className="md:col-span-7 space-y-3">
                            {/* Thanh tìm kiếm từ */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-wider">Tìm từ vựng để thêm ({selectedWordIds.length} đã chọn)</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Tìm theo chữ Hán, Pinyin hoặc nghĩa..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                    />
                                    <i className="fas fa-search absolute left-3 top-3 text-slate-400 text-xs"></i>
                                </div>
                            </div>

                            {/* Danh sách từ tìm kiếm được - hiển thị dạng Grid 2 cột trên máy tính giúp chọn từ siêu tốc */}
                            <div className="max-h-64 md:max-h-96 overflow-y-auto border dark:border-slate-800 rounded-2xl p-3 bg-slate-50 dark:bg-slate-950/50">
                                {filteredWordsForSearch.length === 0 ? (
                                    <p className="text-center py-6 text-xs font-bold text-slate-400">Không tìm thấy từ tương thích.</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {filteredWordsForSearch.map(word => {
                                            const isChecked = selectedWordIds.includes(word.id);
                                            return (
                                                <label 
                                                    key={word.id} 
                                                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isChecked ? 'bg-teal-500/10 border-teal-500/30' : 'bg-white dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-800'}`}
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
                                                        className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4 mt-0.5"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                                                            <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm tracking-wide">{word.word}</span>
                                                            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">[{word.pinyin}]</span>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-1 mt-1">
                                                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate">
                                                                {word.meaning}
                                                            </span>
                                                            {word.isCustom && (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handleDeleteCustomWord(e, word.id)}
                                                                    className="p-1 text-slate-300 hover:text-rose-500 transition-colors ml-auto"
                                                                    title="Xóa từ này"
                                                                >
                                                                    <i className="fas fa-trash-alt text-[10px]"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Bộ phím hành động */}
                    <div className="flex gap-3 pt-3 border-t dark:border-slate-800 max-w-sm ml-auto">
                        <button 
                            type="button"
                            onClick={() => setViewMode('manager')}
                            className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="button"
                            onClick={handleCreateLesson}
                            className="flex-1 py-2.5 bg-teal-600 text-white font-black text-xs rounded-xl hover:bg-teal-700 shadow-sm transition-colors"
                        >
                            Lưu bài ({selectedWordIds.length} từ)
                        </button>
                    </div>
                </div>
            )}

            {/* ==========================================
                VIEW MODE: HỌC FLASHCARD (STUDY)
               ========================================== */}
            {}
            {viewMode === 'flashcard' && (
                <div className="space-y-6 animate-fade-in">
                    
                    {/* Bảng điều khiển Flashcard */}
                    <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-5 py-3.5 rounded-2xl border dark:border-slate-800 text-xs font-bold text-slate-500">
                        <span>Thẻ {cleanWords.length > 0 ? safeCurrentIndex + 1 : 0} / {cleanWords.length}</span>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                checked={autoPlaySpeech} 
                                onChange={(e) => setAutoPlaySpeech(e.target.checked)}
                                className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
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
                                            handleResetLessonProgress(e, mergedWords.map(w => w.id));
                                        } else if (activeLessonId === 'bookmarks') {
                                            handleResetLessonProgress(e, bookmarks.map(w => w.id));
                                        } else if (activeLessonId === '__review_due__') {
                                            handleResetLessonProgress(e, mergedWords.filter(w => progress[w.id] === 'learning').map(w => w.id));
                                        } else {
                                            const currentLesson = lessons.find(l => l.id === activeLessonId);
                                            if (currentLesson) handleResetLessonProgress(e, currentLesson.wordIds);
                                        }
                                    }}
                                    className="w-full py-2.5 bg-teal-600 text-white font-extrabold text-xs rounded-xl hover:bg-teal-700 transition-colors"
                                >
                                    <i className="fas fa-redo-alt"></i> Học lại bài này từ đầu
                                </button>
                                <button 
                                    onClick={() => setViewMode('manager')}
                                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold text-xs rounded-xl hover:bg-slate-200"
                                >
                                    <i className="fas fa-book-open"></i> Học bài khác
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Khối lật 3D nâng tầm responsive - Card lớn hơn trên màn hình PC và tablet */}
                            {}
                            <div 
                                className="w-full h-80 md:h-[400px] lg:h-[440px] perspective-1000 cursor-pointer max-w-3xl mx-auto"
                                onClick={handleFlip}
                            >
                                <div className={`relative w-full h-full duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                                    
                                    {/* MẶT TRƯỚC */}
                                    <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md flex flex-col items-center justify-between backface-hidden transition-all">
                                        <div className="w-full flex justify-between items-center">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded border dark:border-slate-800">
                                                Mặt trước (Nhận diện) {currentWord.isCustom && '⭐'}
                                            </span>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onToggleBookmark(currentWord); }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 ${bookmarks.some(b => b.id === currentWord.id) ? 'text-amber-500' : 'text-slate-300'} transition-colors`}
                                            >
                                                <i className="fas fa-star text-base"></i>
                                            </button>
                                        </div>

                                        <div className="text-center space-y-4">
                                            {/* Font chữ phóng lớn cực nét trên màn hình PC */}
                                            <h2 className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-teal-600 dark:text-teal-400 tracking-wide select-none transition-all">
                                                {currentWord.word}
                                            </h2>
                                            <p className="text-xs text-slate-400 font-semibold italic">Chạm vào thẻ hoặc bấm phím Space để lật đáp án</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); playAudio(currentWord.word, 'zh-CN'); }}
                                                className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center hover:bg-teal-100 transition-colors"
                                                title="Nghe phát âm"
                                            >
                                                <i className="fas fa-volume-up text-base"></i>
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onShowStroke(currentWord.word); }}
                                                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"
                                                title="Xem nét viết"
                                            >
                                                <i className="fas fa-pen-fancy text-sm"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* MẶT SAU */}
                                    <div className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md flex flex-col items-center justify-between rotate-y-180 backface-hidden transition-all">
                                        <div className="w-full flex justify-between items-center pb-2.5 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-1 rounded border border-teal-100/30">
                                                Mặt sau (Giải nghĩa)
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 italic">
                                                {currentWord.isCustom ? 'Từ cá nhân' : ((typeof POS_MAP !== 'undefined' && POS_MAP[currentWord.pos]) ? POS_MAP[currentWord.pos].name : 'Khác')}
                                            </span>
                                        </div>

                                        {/* Nội dung đáp án mở rộng, dễ đọc hơn trên Desktop */}
                                        <div className="text-center space-y-3 max-h-[180px] md:max-h-[220px] overflow-y-auto w-full px-4 py-2">
                                            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white transition-all">{currentWord.word}</h3>
                                            <p className="text-base md:text-lg font-bold text-teal-600 dark:text-teal-400 transition-all">{currentWord.pinyin}</p>
                                            <p className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200 transition-all">{currentWord.meaning}</p>
                                            
                                            {currentWord.example && (
                                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-normal bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl mt-3 text-left border dark:border-slate-800 transition-all">
                                                    {currentWord.example}
                                                </p>
                                            )}
                                        </div>

                                        <div className="w-full flex justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); playAudio(currentWord.word, 'zh-CN'); }}
                                                className="w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center hover:bg-teal-100 transition-colors"
                                            >
                                                <i className="fas fa-volume-up"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Phím Điều Hướng & Đánh giá Spaced Repetition */}
                            {}
                            <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={handlePrev}
                                        className="flex-1 py-3.5 bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold text-xs md:text-sm rounded-2xl border dark:border-slate-800 shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                                    >
                                        <i className="fas fa-arrow-left"></i> Thẻ trước
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        className="flex-1 py-3.5 bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 font-bold text-xs md:text-sm rounded-2xl border dark:border-slate-800 shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                                    >
                                        Thẻ tiếp <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border dark:border-slate-800 text-center space-y-4">
                                    <p className="text-[10px] md:text-xs uppercase font-bold text-slate-400 tracking-wider">
                                        Đánh giá độ thuộc của bạn {isFlipped && <span className="text-teal-500 font-extrabold">(Phím tắt 1 - 2 - 3)</span>}
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button 
                                            onClick={() => handleStatusClick('unlearned')}
                                            className={`py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${(progress[currentWord?.id] || 'unlearned') === 'unlearned' ? 'bg-rose-500 text-white shadow-sm' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50'}`}
                                        >
                                            Chưa thuộc
                                        </button>
                                        <button 
                                            onClick={() => handleStatusClick('learning')}
                                            className={`py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${(progress[currentWord?.id] || 'unlearned') === 'learning' ? 'bg-indigo-500 text-white shadow-sm' : 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50'}`}
                                        >
                                            Đang học
                                        </button>
                                        <button 
                                            onClick={() => handleStatusClick('mastered')}
                                            className={`py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${(progress[currentWord?.id] || 'unlearned') === 'mastered' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50'}`}
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