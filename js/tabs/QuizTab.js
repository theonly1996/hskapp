// =========================================================================
// TAB: LUYỆN TẬP — TRẮC NGHIỆM TỔNG HỢP, LUYỆN DỊCH & NGHE THỤ ĐỘNG (Quiz Tab)
// Đây là nơi duy nhất chứa mọi hình thức LUYỆN chủ động (không phải tra cứu):
// trắc nghiệm từ vựng, vở bài tập luyện dịch, và máy nghe thụ động rảnh tay
// (trước đây nằm lẫn trong tab Từ vựng — đã chuyển về đây vì "nghe" cũng là
// một hình thức luyện tập, không phải hành động tra cứu một từ cụ thể).
// =========================================================================
const { useState: useStateQuiz, useEffect: useEffectQuiz, useMemo: useMemoQuiz, useRef: useRefQuiz } = React;

const QuizTab = ({ words, loading }) => {
    // Phân chia phân hệ chính: 'vocab' (Trắc nghiệm từ vựng), 'translation' (Vở bài tập luyện dịch)
    // hoặc 'listening' (Máy nghe thụ động rảnh tay)
    const [activeSection, setActiveSection] = useStateQuiz('vocab');
    const [selectedLessonId, setSelectedLessonId] = useStateQuiz(null);
    const [translationLessonsProgress, setTranslationLessonsProgress] = useStateQuiz([]);
    
    // Bộ lọc cấp độ luyện dịch (Mặc định chọn HSK 1 để giao diện sạch sẽ, gọn gàng nhất)
    const [selectedLevel, setSelectedLevel] = useStateQuiz('1');

    const [isStarted, setIsStarted] = useStateQuiz(false);
    const [quizMode, setQuizMode] = useStateQuiz('meaning'); 
    const [questions, setQuestions] = useStateQuiz([]);
    const [currentIndex, setCurrentIndex] = useStateQuiz(0);
    const [score, setScore] = useStateQuiz(0);
    const [showResult, setShowResult] = useStateQuiz(false);
    const [selectedAnswer, setSelectedAnswer] = useStateQuiz(null);

    const [userArrangement, setUserArrangement] = useStateQuiz([]);
    const [availableBlocks, setAvailableBlocks] = useStateQuiz([]);

    const [userInputChar, setUserInputChar] = useStateQuiz("");
    const [showHint, setShowHint] = useStateQuiz(false);

    // --- STATE CHO MÁY NGHE THỤ ĐỘNG RẢNH TAY (chuyển nguyên vẹn từ DictionaryTab) ---
    const [isAutoPlaying, setIsAutoPlaying] = useStateQuiz(false);
    const [isPaused, setIsPaused] = useStateQuiz(false);
    const [isShuffle, setIsShuffle] = useStateQuiz(false);
    const [playList, setPlayList] = useStateQuiz([]);
    const [autoPlayIndex, setAutoPlayIndex] = useStateQuiz(-1);
    const [readMeaning, setReadMeaning] = useStateQuiz(true);
    const [playMode, setPlayMode] = useStateQuiz('vocab_and_example');
    const autoPlayRef = useRefQuiz(null);

    useEffectQuiz(() => {
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
            listToPlay = words.filter(w => w.id !== 'error');
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

    // Load tiến độ luyện dịch từ LocalStorage để hiển thị điểm số trên danh sách bài
    useEffectQuiz(() => {
        const savedList = window.ProgressService.getAllLessonProgress();
        if (savedList && savedList.length > 0) {
            setTranslationLessonsProgress(savedList);
        } else {
            const defaultList = window.hskProData?.defaultProgress || [];
            setTranslationLessonsProgress(defaultList);
        }
    }, [isStarted, showResult, activeSection]);

    // Lắng nghe tín hiệu chuyển bài học từ Dashboard để tự kích hoạt bài test dịch
    useEffectQuiz(() => {
        const pendingLessonId = localStorage.getItem('hskpro_active_translation_lesson_id');
        if (pendingLessonId) {
            localStorage.removeItem('hskpro_active_translation_lesson_id');
            setActiveSection('translation');
            
            // Tự động chuyển tab lọc tương ứng với bài học được click từ Dashboard
            const lessonIdNum = parseInt(pendingLessonId, 10);
            if (lessonIdNum >= 1 && lessonIdNum <= 15) {
                setSelectedLevel('1');
            } else if (lessonIdNum >= 16 && lessonIdNum <= 30) {
                setSelectedLevel('2');
            } else if (lessonIdNum >= 31) {
                setSelectedLevel('3');
            }
            
            startTranslationQuiz(lessonIdNum);
        }
    }, [isStarted]);

    // Lọc danh sách bài học dựa trên cấp độ HSK được chọn
    const filteredLessons = useMemoQuiz(() => {
        const allLessons = window.hskProData?.lessons || [];
        if (selectedLevel === 'all') return allLessons;
        return allLessons.filter(lesson => {
            const lvl = lesson.level || (lesson.lessonId <= 15 ? 1 : lesson.lessonId <= 30 ? 2 : 3);
            return lvl === Number(selectedLevel);
        });
    }, [selectedLevel, translationLessonsProgress]);

    // Hàm chuẩn hóa chuỗi tiếng Trung để so khớp đáp án dịch không bị lỗi do dấu câu hoặc khoảng trắng
    const normalizeChineseStr = (str) => {
        if (!str) return '';
        return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'，。！？；：（）“”‘’\s]/g, "");
    };

    // Khởi động bài kiểm tra Luyện Dịch HSK
    const startTranslationQuiz = (lessonId) => {
        const lesson = window.hskProData?.lessons?.find(l => l.lessonId === lessonId);
        if (!lesson || !lesson.questions || lesson.questions.length === 0) return;

        setQuizMode('translation');
        setSelectedLessonId(lessonId);

        // Map bộ câu hỏi luyện dịch của bài học
        const generatedQuestions = lesson.questions.map(q => ({
            id: q.id,
            word: q.chinese,     // Chữ Hán đáp án đúng
            pinyin: q.pinyin,     // Pinyin đáp án đúng
            meaning: q.vietnamese, // Câu hỏi tiếng Việt
            type: 'translation'
        }));

        setQuestions(generatedQuestions);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setUserInputChar("");
        setShowHint(false);
        setIsStarted(true);
    };

    // Hàm lưu điểm luyện dịch tự động đồng bộ xuống LocalStorage của OverviewTab
    const saveTranslationScore = (lessonId, finalScore) => {
        const lesson = window.hskProData?.lessons?.find(l => l.lessonId === lessonId);
        const level = lesson?.level || (lessonId <= 15 ? 1 : lessonId <= 30 ? 2 : 3);
        const title = lesson?.title || `Bài ${lessonId}`;

        window.ProgressService.recordLessonScore(lessonId, finalScore, { level, title });
    };

    // Xử lý nộp bài Luyện Dịch câu hỏi tiếng Việt sang tiếng Trung
    const handleCheckTranslation = (e) => {
        if (e) e.preventDefault();
        if (selectedAnswer) return;

        const userInput = normalizeChineseStr(userInputChar);
        const correctAnswer = normalizeChineseStr(questions[currentIndex].word);

        let isCorrect = userInput === correctAnswer;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setSelectedAnswer('correct');
            if (typeof playSoundFeedback === 'function') playSoundFeedback('correct');
            setScore(newScore);
        } else {
            setSelectedAnswer('wrong');
            if (typeof playSoundFeedback === 'function') playSoundFeedback('wrong');
        }

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setSelectedAnswer(null);
                setUserInputChar("");
                setShowHint(false);
                setCurrentIndex(prev => prev + 1);
            } else {
                saveTranslationScore(selectedLessonId, newScore);
                setShowResult(true);
            }
        }, 3200); // Đợi 3.2s giúp học viên ghi nhớ Chữ Hán & Pinyin đáp án đúng hiện trên màn hình
    };

    // Bắt đầu làm trắc nghiệm từ vựng (Hàm gốc giữ nguyên)
    const startQuiz = (mode) => {
        const cleanWords = words.filter(w => w.id !== 'error');
        if (cleanWords.length < 4) return;
        setQuizMode(mode);
        
        const shuffledWords = [...cleanWords].sort(() => 0.5 - Math.random()).slice(0, 10);
        
        const generatedQuestions = shuffledWords.map(targetWord => {
            if (mode === 'reorder') {
                const parsed = parseExample(targetWord.example);
                let sentence = parsed.zh || targetWord.word;
                let meaning = parsed.vi || targetWord.meaning;

                const cleanSentence = sentence.replace(/[^\u4e00-\u9fa5]/g, '').trim();
                if (cleanSentence.length < 2) {
                    sentence = targetWord.word;
                } else {
                    sentence = cleanSentence;
                }

                let chars = sentence.split('');
                let shuffledChars = [...chars].sort(() => 0.5 - Math.random());
                
                while(chars.length > 1 && shuffledChars.join('') === chars.join('')) {
                    shuffledChars = [...chars].sort(() => 0.5 - Math.random());
                }

                return {
                    ...targetWord,
                    type: 'reorder',
                    sentence: sentence,
                    meaning: meaning,
                    shuffledChars: shuffledChars
                };

            } else if (mode === 'writing') {
                return {
                    ...targetWord,
                    type: 'writing',
                    answer: targetWord.word
                };
            } else if (mode === 'listen_pinyin') {
                return {
                    ...targetWord,
                    type: 'listen_pinyin',
                    answer: removePinyinTones(targetWord.pinyin).replace(/\s+/g, '')
                };
            } else {
                const optKey = mode === 'listening' ? 'word' : mode;
                const wrongWords = cleanWords.filter(w => w.id !== targetWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
                const options = [...wrongWords.map(w => w[optKey]), targetWord[optKey]].sort(() => 0.5 - Math.random());
                return { ...targetWord, type: 'standard', answer: targetWord[optKey], options: options };
            }
        });
        
        setQuestions(generatedQuestions);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setUserInputChar("");
        setShowHint(false);
        setIsStarted(true);
    };

    useEffectQuiz(() => {
        if (isStarted && !showResult && (quizMode === 'listening' || quizMode === 'listen_pinyin') && questions[currentIndex]) {
            playAudio(questions[currentIndex].word, 'zh-CN');
        }
    }, [currentIndex, isStarted, showResult, quizMode, questions]);

    const handleSelectBlock = (block) => {
        if (selectedAnswer) return;
        setUserArrangement([...userArrangement, block]);
        setAvailableBlocks(availableBlocks.filter(b => b.id !== block.id));
    };

    const handleRemoveBlock = (block) => {
        if (selectedAnswer) return;
        setAvailableBlocks([...availableBlocks, block]);
        setUserArrangement(userArrangement.filter(b => b.id !== block.id));
    };

    const handleCheckReorder = () => {
        if (selectedAnswer) return;
        const answerStr = userArrangement.map(b => b.char).join('');
        if (answerStr === questions[currentIndex].sentence) {
            setSelectedAnswer('correct');
            playSoundFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setSelectedAnswer('wrong');
            playSoundFeedback('wrong');
        }

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setSelectedAnswer(null);
                setCurrentIndex(prev => prev + 1);
            } else {
                setShowResult(true);
            }
        }, 2200);
    };

    const handleCheckWriting = (e) => {
        if (e) e.preventDefault();
        if (selectedAnswer) return;

        let normalizedInput = userInputChar.trim().toLowerCase();
        let actualAnswer = questions[currentIndex].answer.trim().toLowerCase();

        if (quizMode === 'listen_pinyin') {
            normalizedInput = normalizedInput.replace(/\s+/g, '');
        }

        if (normalizedInput === actualAnswer) {
            setSelectedAnswer('correct');
            playSoundFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setSelectedAnswer('wrong');
            playSoundFeedback('wrong');
        }

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setSelectedAnswer(null);
                setUserInputChar("");
                setShowHint(false);
                setCurrentIndex(prev => prev + 1);
            } else {
                setShowResult(true);
            }
        }, 2200);
    };

    const handleAnswerStandard = (option) => {
        if (selectedAnswer) return; 
        setSelectedAnswer(option);
        
        if (option === questions[currentIndex].answer) {
            playSoundFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            playSoundFeedback('wrong');
        }

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setSelectedAnswer(null);
                setCurrentIndex(prev => prev + 1);
            } else {
                setShowResult(true);
            }
        }, 1600);
    };

    const cleanWords = words.filter(w => w.id !== 'error');
    if (loading) return <LoadingScreen message="Đang khởi tạo bài kiểm tra..." />;

    // NẾU CHƯA BẮT ĐẦU QUIZ: HIỂN THỊ MENU CHỌN CHẾ ĐỘ
    if (!isStarted) {
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                {/* THANH CHUYỂN PHÂN HỆ: TRẮC NGHIỆM TỪ VỰNG / LUYỆN DỊCH / NGHE THỤ ĐỘNG */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl max-w-lg mx-auto border border-slate-200/50 dark:border-slate-800/50">
                    <button 
                        onClick={() => setActiveSection('vocab')}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition duration-200 ${
                            activeSection === 'vocab' 
                                ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        ⚡ Luyện Thi HSK
                    </button>
                    <button 
                        onClick={() => setActiveSection('translation')}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition duration-200 ${
                            activeSection === 'translation' 
                                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        📝 Luyện Dịch HSK
                    </button>
                    <button 
                        onClick={() => setActiveSection('listening')}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition duration-200 ${
                            activeSection === 'listening' 
                                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                    >
                        🎧 Nghe Thụ Động
                    </button>
                </div>

                {/* GIAO DIỆN PHÂN HỆ 1: TRẮC NGHIỆM TỪ VỰNG CHUẨN (CODE CŨ GIỮ NGUYÊN) */}
                {activeSection === 'vocab' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
                            <i className="fas fa-feather-alt animate-pulse"></i>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">Phòng Luyện Thi HSK</h2>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Chọn hình thức ôn tập phù hợp với mục tiêu của bạn:</p>
                        
                        {cleanWords.length < 4 ? (
                            <p className="text-sm font-bold text-amber-500">Cần ít nhất 4 từ vựng trong danh sách để kích hoạt Trắc Nghiệm.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button onClick={() => startQuiz('meaning')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-language text-base text-teal-500"></i> Đọc hiểu (Nhìn Hán chọn Nghĩa)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <button onClick={() => startQuiz('pinyin')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-bullhorn text-base text-indigo-500"></i> Phát âm (Nhìn Hán chọn Pinyin)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <button onClick={() => startQuiz('listening')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-headphones text-base text-amber-500"></i> Luyện nghe (Nghe phát âm chọn Hán)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <button onClick={() => startQuiz('reorder')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-puzzle-piece text-base text-purple-500"></i> Sắp xếp câu (Ghép chữ thành câu)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <button onClick={() => startQuiz('writing')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-keyboard text-base text-emerald-500"></i> Luyện gõ phím (Viết từ vựng chữ Hán)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <button onClick={() => startQuiz('listen_pinyin')} className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 hover:border-pink-500 dark:hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between group">
                                    <span className="flex items-center gap-3"><i className="fas fa-ear-listen text-base text-pink-500"></i> Nghe và viết Pinyin (Bỏ qua dấu)</span>
                                    <i className="fas fa-arrow-right opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* GIAO DIỆN PHÂN HỆ 2: VỞ BÀI TẬP LUYỆN DỊCH HSK ĐÃ PHÂN CẤP ĐỘ (1, 2, 3) */}
                {activeSection === 'translation' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2">
                                📚 Vở Bài Tập Luyện Dịch HSK {selectedLevel === 'all' ? '1 - 3' : selectedLevel} (Tổng số {filteredLessons.length} Bài)
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Luyện phản xạ viết chữ Hán từ câu dịch tiếng Việt tự nhiên</p>
                        </div>

                        {/* THANH LỌC CẤP ĐỘ DỊCH PHÂN CHIA CHI TIẾT TỪNG 15 BÀI */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl max-w-sm mx-auto border border-slate-200/40 dark:border-slate-800">
                            <button 
                                onClick={() => setSelectedLevel('1')}
                                className={`px-4 py-1.5 text-[11px] font-bold rounded-xl transition duration-200 flex-1 ${
                                    selectedLevel === '1' 
                                        ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-600 dark:text-emerald-400' 
                                        : 'text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                                }`}
                            >
                                HSK 1 (B1-15)
                            </button>
                            <button 
                                onClick={() => setSelectedLevel('2')}
                                className={`px-4 py-1.5 text-[11px] font-bold rounded-xl transition duration-200 flex-1 ${
                                    selectedLevel === '2' 
                                        ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-600 dark:text-emerald-400' 
                                        : 'text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                                }`}
                            >
                                HSK 2 (B16-30)
                            </button>
                            <button 
                                onClick={() => setSelectedLevel('3')}
                                className={`px-4 py-1.5 text-[11px] font-bold rounded-xl transition duration-200 flex-1 ${
                                    selectedLevel === '3' 
                                        ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-600 dark:text-emerald-400' 
                                        : 'text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                                }`}
                            >
                                HSK 3 (B31-45)
                            </button>
                            <button 
                                onClick={() => setSelectedLevel('all')}
                                className={`px-4 py-1.5 text-[11px] font-bold rounded-xl transition duration-200 flex-1 ${
                                    selectedLevel === 'all' 
                                        ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-600 dark:text-emerald-400' 
                                        : 'text-slate-500 hover:text-slate-750 dark:hover:text-slate-350'
                                }`}
                            >
                                Tất cả
                            </button>
                        </div>

                        {/* DANH SÁCH BÀI TẬP SAU KHI LỌC */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredLessons.map((lesson) => {
                                const progInfo = translationLessonsProgress.find(p => p.lessonId === lesson.lessonId);
                                const isDone = progInfo?.isCompleted || false;
                                const maxSc = progInfo?.currentScore || 0;

                                return (
                                    <div 
                                        key={lesson.lessonId} 
                                        className={`p-4 rounded-2xl border transition duration-200 flex flex-col justify-between space-y-3 hover:shadow-md ${
                                            isDone 
                                                ? 'bg-emerald-50/20 border-emerald-200/70 dark:bg-emerald-950/10 dark:border-emerald-900/50' 
                                                : 'bg-slate-50/50 border-slate-200 dark:bg-slate-950/20 dark:border-slate-800/80'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] font-extrabold uppercase text-slate-400">
                                                    Bài HỌC {lesson.lessonId}
                                                </span>
                                                <span className="text-[9px] bg-blue-100/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 px-1.5 py-0.5 rounded font-black">
                                                    HSK {lesson.level || (lesson.lessonId <= 15 ? 1 : lesson.lessonId <= 30 ? 2 : 3)}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate" title={lesson.title}>
                                                {lesson.title}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 line-clamp-2 italic">
                                                {lesson.grammar}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                                            <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                                                {maxSc} / 20 đ
                                            </span>
                                            <button 
                                                onClick={() => startTranslationQuiz(lesson.lessonId)}
                                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg transition"
                                            >
                                                Bắt đầu dịch
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {filteredLessons.length === 0 && (
                            <div className="text-center py-12 text-slate-400 text-xs">
                                Chưa có bài tập luyện dịch tương ứng với cấp độ này.
                            </div>
                        )}
                    </div>
                )}

                {/* GIAO DIỆN PHÂN HỆ 3: MÁY NGHE THỤ ĐỘNG RẢNH TAY (chuyển nguyên vẹn từ Từ vựng) */}
                {activeSection === 'listening' && (
                    <div className="max-w-2xl mx-auto">
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
                                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'vocab_only' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-800'}`}
                            >
                                🗣️ Chỉ Từ vựng & Nghĩa
                            </button>
                            <button 
                                onClick={() => { setPlayMode('vocab_and_example'); if (isAutoPlaying) stopAutoPlay(); }}
                                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'vocab_and_example' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-800'}`}
                            >
                                📖 Song ngữ Từ & Ví dụ
                            </button>
                            <button 
                                onClick={() => { setPlayMode('example_only'); if (isAutoPlaying) stopAutoPlay(); }}
                                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'example_only' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-800'}`}
                            >
                                🎧 Chỉ câu ví dụ dài
                            </button>
                            <button 
                                onClick={() => { setPlayMode('long_story'); if (isAutoPlaying) stopAutoPlay(); }}
                                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${playMode === 'long_story' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-800'}`}
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
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border dark:border-slate-800 inline-block max-w-full">
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
                    </div>
                )}
            </div>
        );
    }

    // GIAO DIỆN 2: MÀN HÌNH KẾT QUẢ SAU KHI LÀM XONG BÀI QUIZ
    if (showResult) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in max-w-md mx-auto">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 border border-emerald-100">
                    <i className="fas fa-award"></i>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">Hoàn thành bài luyện!</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Điểm số chính xác: <strong>{score} / {questions.length}</strong> câu trả lời đúng.</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-8 overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(score/questions.length)*100}%` }}></div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => {
                            if (quizMode === 'translation') {
                                startTranslationQuiz(selectedLessonId);
                            } else {
                                startQuiz(quizMode);
                            }
                        }} 
                        className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                        <i className="fas fa-redo mr-1.5"></i> Luyện lại
                    </button>
                    <button onClick={() => setIsStarted(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 font-bold text-xs rounded-xl shadow-sm transition-colors">
                        Thoát bài
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    if (!currentQ) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsStarted(false)} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-all" title="Trở lại thực đơn">
                        <i className="fas fa-arrow-left text-xs"></i>
                    </button>
                    <span className="text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-xl text-xs">Câu {currentIndex + 1}/{questions.length}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500"><i className="fas fa-star text-amber-500 mr-1"></i> Điểm: {score}</span>
            </div>

            {/* GIAO DIỆN CHUYÊN DỤNG: LUYỆN DỊCH HSK 1 - 3 (TỪ FILE WORD) */}
            {currentQ.type === 'translation' && (
                <div className="text-center animate-fade-in space-y-5">
                    <div>
                        <p className="text-[10px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">Dịch câu này sang chữ Hán:</p>
                        <div className="p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-100 dark:border-slate-800 rounded-2xl">
                            <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-slate-200 leading-relaxed">
                                {currentQ.meaning}
                            </h2>
                        </div>
                    </div>

                    <form onSubmit={handleCheckTranslation} className="max-w-md mx-auto flex gap-2 pt-2">
                        <input 
                            key={`input-translation-${currentIndex}`}
                            type="text" 
                            className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-center text-xl placeholder-slate-300 dark:placeholder-slate-750"
                            placeholder="Nhập chữ Hán..."
                            value={userInputChar}
                            onChange={(e) => setUserInputChar(e.target.value)}
                            disabled={!!selectedAnswer}
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!userInputChar.trim() || !!selectedAnswer}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl disabled:opacity-50 transition shrink-0"
                        >
                            Nộp bài
                        </button>
                    </form>

                    <div className="flex justify-center gap-2">
                        <button 
                            type="button" 
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5 hover:underline"
                        >
                            <i className="fas fa-question-circle"></i> {showHint ? "Ẩn gợi ý phát âm" : "Gợi ý Pinyin phát âm"}
                        </button>
                    </div>

                    {showHint && (
                        <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-950/40 py-2 px-4 rounded-xl inline-block animate-fade-in border border-indigo-100/50 dark:border-slate-800/45">
                            🗣️ {currentQ.pinyin}
                        </p>
                    )}

                    {selectedAnswer === 'correct' && (
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 text-emerald-700 dark:text-emerald-400 font-bold animate-fade-in text-xs leading-relaxed">
                            <i className="fas fa-check-circle mr-1.5"></i> Tuyệt hảo! Dịch hoàn toàn chính xác.
                        </div>
                    )}
                    {selectedAnswer === 'wrong' && (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 rounded-2xl text-left animate-fade-in space-y-1">
                            <p className="text-rose-700 dark:text-rose-400 font-bold text-xs">
                                <i className="fas fa-times-circle mr-1.5"></i> Chưa chính xác! Xem đáp án chuẩn:
                            </p>
                            <p className="text-xl font-extrabold text-slate-800 dark:text-white pt-1">
                                Chữ Hán: {currentQ.word}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-indigo-400 font-semibold">
                                Pinyin: {currentQ.pinyin}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* GIAO DIỆN: GÕ CHỮ HÁN (Writing Quiz) */}
            {currentQ.type === 'writing' && (
                <div className="text-center animate-fade-in">
                    <div className="mb-6">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Hãy gõ chữ Hán của từ vựng sau:</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentQ.pinyin}</p>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Nghĩa: {currentQ.meaning}</p>
                    </div>

                    <form onSubmit={handleCheckWriting} className="max-w-md mx-auto mb-6 flex gap-2">
                        <input 
                            key={`input-writing-${currentIndex}`}
                            type="text" 
                            className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 font-bold text-center text-xl placeholder-slate-300 dark:placeholder-slate-700"
                            placeholder="Gõ chữ Hán..."
                            value={userInputChar}
                            onChange={(e) => setUserInputChar(e.target.value)}
                            disabled={!!selectedAnswer}
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!userInputChar.trim() || !!selectedAnswer}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl disabled:opacity-50 transition-colors shrink-0"
                        >
                            Nộp bài
                        </button>
                    </form>

                    <div className="flex justify-center gap-2 mb-4">
                        <button 
                            type="button" 
                            onClick={() => setShowHint(!showHint)}
                            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5"
                        >
                            <i className="fas fa-question-circle"></i> {showHint ? "Ẩn gợi ý nét chữ" : "Xem gợi ý độ dài & số chữ"}
                        </button>
                    </div>

                    {showHint && (
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 animate-fade-in mb-4">
                            Từ này có <span className="text-indigo-500">{currentQ.answer.length}</span> ký tự chữ Hán. Bắt đầu bằng nét vẽ kí tự chữ: "{currentQ.answer[0]}"
                        </p>
                    )}

                    {selectedAnswer === 'correct' && <p className="text-emerald-600 dark:text-emerald-400 font-bold animate-fade-in text-sm mt-2"><i className="fas fa-check-circle mr-1.5"></i> Chính xác tuyệt đối!</p>}
                    {selectedAnswer === 'wrong' && <p className="text-rose-600 dark:text-rose-400 font-bold animate-fade-in text-sm mt-2"><i className="fas fa-times-circle mr-1.5"></i> Sai rồi! Đáp án chuẩn là: <span className="text-lg font-extrabold">{currentQ.answer}</span></p>}
                </div>
            )}

            {/* GIAO DIỆN: NGHE VÀ VIẾT PINYIN */}
            {currentQ.type === 'listen_pinyin' && (
                <div className="text-center animate-fade-in">
                    <div className="mb-6">
                        <button 
                            onClick={(e) => playAudio(currentQ.word, 'zh-CN', e)} 
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 hover:bg-teal-100 flex items-center justify-center text-3xl mx-auto shadow-inner border border-teal-100/50 dark:border-teal-900/50 animate-pulse active:scale-95 mb-4"
                            title="Bấm nghe lại phát âm"
                        >
                            <i className="fas fa-volume-up"></i>
                        </button>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Nghe âm thanh và gõ Pinyin (không cần dấu):</p>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Gợi ý nghĩa: {currentQ.meaning}</p>
                    </div>

                    <form onSubmit={handleCheckWriting} className="max-w-md mx-auto mb-6 flex gap-2">
                        <input 
                            key={`input-pinyin-${currentIndex}`}
                            type="text" 
                            className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 font-bold text-center text-xl placeholder-slate-300 dark:placeholder-slate-700"
                            placeholder="Gõ pinyin (VD: nihao)..."
                            value={userInputChar}
                            onChange={(e) => setUserInputChar(e.target.value)}
                            disabled={!!selectedAnswer}
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!userInputChar.trim() || !!selectedAnswer}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl disabled:opacity-50 transition-colors shrink-0"
                        >
                            Nộp bài
                        </button>
                    </form>

                    {selectedAnswer === 'correct' && <p className="text-emerald-600 dark:text-emerald-400 font-bold animate-fade-in text-sm mt-2"><i className="fas fa-check-circle mr-1.5"></i> Chính xác tuyệt đối!</p>}
                    {selectedAnswer === 'wrong' && <p className="text-rose-600 dark:text-rose-400 font-bold animate-fade-in text-sm mt-2"><i className="fas fa-times-circle mr-1.5"></i> Sai rồi! Đáp án chuẩn là: <span className="text-lg font-extrabold">{currentQ.pinyin}</span></p>}
                </div>
            )}

            {/* GIAO DIỆN: SẮP XẾP CÂU (Reorder Quiz) */}
            {currentQ.type === 'reorder' && (
                <div className="text-center animate-fade-in">
                    <div className="mb-6">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Ghép các khối chữ Hán để tạo câu đúng nghĩa:</p>
                        <p className="text-slate-600 dark:text-slate-300 font-bold italic text-base">"{currentQ.meaning}"</p>
                    </div>
                    
                    <div className="min-h-[80px] p-4 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl mb-6 flex flex-wrap justify-center gap-2 items-center">
                        {userArrangement.map(block => (
                            <button 
                                key={`user-${block.id}`} 
                                onClick={() => handleRemoveBlock(block)}
                                disabled={!!selectedAnswer}
                                className={`w-12 h-12 md:w-14 md:h-14 text-2xl font-bold rounded-xl shadow-sm transition-all flex items-center justify-center
                                    ${selectedAnswer === 'correct' ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500' : 
                                      selectedAnswer === 'wrong' ? 'bg-rose-100 text-rose-800 border-2 border-rose-500' : 
                                      'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'}
                                `}
                            >
                                {block.char}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {availableBlocks.map(block => (
                            <button 
                                key={`avail-${block.id}`} 
                                onClick={() => handleSelectBlock(block)}
                                disabled={!!selectedAnswer}
                                className="w-12 h-12 md:w-14 md:h-14 text-2xl font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-teal-500 hover:text-teal-600 dark:hover:border-teal-500 transition-all flex items-center justify-center active:scale-95"
                            >
                                {block.char}
                            </button>
                        ))}
                    </div>

                    {userArrangement.length === currentQ.sentence.length && !selectedAnswer && (
                        <button 
                            onClick={handleCheckReorder}
                            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all animate-fade-in"
                        >
                            Xác nhận kiểm tra
                        </button>
                    )}

                    {selectedAnswer === 'correct' && <p className="text-emerald-600 dark:text-emerald-400 font-bold animate-fade-in text-sm mt-4"><i className="fas fa-check-circle mr-1.5"></i> Hoàn hảo! Ghép câu cực tốt.</p>}
                    {selectedAnswer === 'wrong' && <p className="text-rose-600 dark:text-rose-400 font-bold animate-fade-in text-sm mt-4"><i className="fas fa-times-circle mr-1.5"></i> Câu đúng là: <span className="font-extrabold text-slate-800 dark:text-white text-lg">{currentQ.sentence}</span></p>}
                </div>
            )}

            {/* GIAO DIỆN: TRẮC NGHIỆM MULTIPLE CHOICE (STANDARD QUIZ) */}
            {currentQ.type === 'standard' && (
                <>
                    <div className="text-center mb-6">
                        {quizMode === 'listening' ? (
                            <button 
                                onClick={(e) => playAudio(currentQ.word, 'zh-CN', e)} 
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 hover:bg-teal-100 flex items-center justify-center text-3xl mx-auto shadow-inner border border-teal-100/50 dark:border-teal-900/50 animate-pulse active:scale-95"
                                title="Bấm nghe lại phát âm"
                            >
                                <i className="fas fa-volume-up"></i>
                            </button>
                        ) : (
                            <>
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <h2 className="text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-white">{currentQ.word}</h2>
                                    <button 
                                        onClick={(e) => playAudio(currentQ.word, 'zh-CN', e)} 
                                        className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 hover:bg-teal-100 flex items-center justify-center text-sm shadow-sm border dark:border-slate-800"
                                    >
                                        <i className="fas fa-volume-up"></i>
                                    </button>
                                </div>
                                {quizMode === 'meaning' && <p className="text-sm font-bold text-slate-400 dark:text-slate-500">{currentQ.pinyin}</p>}
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {currentQ.options.map((option, idx) => {
                            let btnClass = "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 hover:border-teal-300";
                            if (selectedAnswer) {
                                if (option === currentQ.answer) {
                                    btnClass = "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"; 
                                } else if (option === selectedAnswer) {
                                    btnClass = "bg-rose-100 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 font-bold"; 
                                } else {
                                    btnClass = "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-650 opacity-40 cursor-not-allowed"; 
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerStandard(option)}
                                    disabled={!!selectedAnswer}
                                    className={`p-3.5 rounded-2xl border text-left font-medium text-xs md:text-sm transition-all flex justify-between items-center ${btnClass} ${quizMode === 'listening' ? 'text-center text-2xl md:text-3xl py-4 justify-center' : ''}`}
                                >
                                    <span className="truncate pr-1">{option}</span>
                                    {selectedAnswer && option === currentQ.answer && <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400 shrink-0"></i>}
                                    {selectedAnswer === option && option !== currentQ.answer && <i className="fas fa-times-circle text-rose-600 dark:text-rose-400 shrink-0"></i>}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            {selectedAnswer && currentQ.tip && (
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-2xl animate-fade-in text-amber-800 dark:text-amber-400 text-xs flex gap-2.5">
                    <i className="fas fa-lightbulb text-amber-500 text-base shrink-0 mt-0.5"></i>
                    <div>
                        <p className="mb-1"><strong>Mở rộng tri thức:</strong> {currentQ.word} ({currentQ.pinyin}) - {currentQ.meaning}</p>
                        <p className="leading-relaxed"><strong>Mẹo làm bài:</strong> {currentQ.tip}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.QuizTab = QuizTab;