// =========================================================================
// TAB: TRẮC NGHIỆM TỔNG HỢP (Quiz Tab)
// =========================================================================
const { useState: useStateQuiz, useEffect: useEffectQuiz } = React;

const QuizTab = ({ words, loading }) => {
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
                    answer: removePinyinTones(targetWord.pinyin).replace(/\s+/g, '') // Bỏ dấu và khoảng trắng để dễ check
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
            normalizedInput = normalizedInput.replace(/\s+/g, ''); // Xóa khoảng trắng do người dùng nhập để check linh hoạt
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
    if (cleanWords.length < 4) return (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 animate-fade-in">
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">Cần ít nhất 4 từ vựng trong danh sách này để kích hoạt Trắc Nghiệm.</p>
        </div>
    );

    if (!isStarted) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in max-w-lg mx-auto">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
                    <i className="fas fa-feather-alt animate-pulse"></i>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">Phòng Luyện Thi HSK</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Chọn hình thức ôn tập phù hợp với mục tiêu của bạn:</p>
                
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
            </div>
        );
    }

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
                    <button onClick={() => startQuiz(quizMode)} className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors">
                        <i className="fas fa-redo mr-1.5"></i> Luyện lại
                    </button>
                    <button onClick={() => setIsStarted(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 font-bold text-xs rounded-xl shadow-sm transition-colors">
                        Đổi chế độ
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

            {/* Giao diện: Gõ chữ Hán (Writing Quiz) */}
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

            {/* Giao diện: Nghe và viết Pinyin */}
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

            {/* Giao diện: Sắp xếp câu (Reorder Quiz) */}
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

            {/* Giao diện: Trắc nghiệm Multiple Choice */}
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