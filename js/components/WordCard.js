// =========================================================================
// CARD HIỂN THỊ TỪ VỰNG CHUẨN UX/UI VÀ AI PRONUNCIATION
// =========================================================================
const WordCard = ({ word, isBookmarked, onToggleBookmark, onShowStroke, learningStatus, onChangeStatus }) => {
    // Lưu ý: Các hàm POS_MAP, parseExample, playAudio, playSoundFeedback được gọi từ js/data.js và js/utils.js
    const parsed = React.useMemo(() => parseExample(word.example), [word.example]);
    const posInfo = POS_MAP[word.pos] || POS_MAP['other'];

    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const [speechStatus, setSpeechStatus] = React.useState(null); 
    const [heardText, setHeardText] = React.useState("");

    const handleSpeechRecognition = (e) => {
        e.stopPropagation();
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setHeardText("Thiết bị của bạn không hỗ trợ Nhận Diện Giọng Nói.");
            setSpeechStatus('wrong');
            playSoundFeedback('wrong');
            return;
        }

        setIsSpeaking(true);
        setSpeechStatus(null);
        setHeardText("");

        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const resultText = event.results[0][0].transcript;
            setHeardText(resultText);
            const cleanHeard = resultText.replace(/[^\u4e00-\u9fa5]/g, '');
            const cleanTarget = word.word.replace(/[^\u4e00-\u9fa5]/g, '');
            
            if (cleanHeard === cleanTarget || cleanHeard.includes(cleanTarget)) {
                setSpeechStatus('correct');
                playSoundFeedback('correct');
            } else {
                setSpeechStatus('wrong');
                playSoundFeedback('wrong');
            }
        };

        recognition.onerror = () => {
            setSpeechStatus('wrong');
            playSoundFeedback('wrong');
            setHeardText("Lỗi nhận diện. Vui lòng thử lại!");
            setIsSpeaking(false);
        };

        recognition.onend = () => {
            setIsSpeaking(false);
        };

        recognition.start();
    };

    const statusColors = {
        'unlearned': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        'learning': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/50',
        'mastered': 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-200/50 dark:border-teal-900/50'
    };

    const statusLabels = {
        'unlearned': 'Chưa học',
        'learning': 'Đang học',
        'mastered': 'Đã thuộc'
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all flex flex-col gap-4 relative group animate-fade-in">
            <div className="flex items-start gap-4">
                <div 
                    onClick={(e) => playAudio(word.word, 'zh-CN', e)}
                    className="bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-300 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-extrabold flex-shrink-0 cursor-pointer shadow-inner border border-teal-100/50 dark:border-teal-900/50 transition-all active:scale-95"
                    title="Bấm nghe phát âm"
                >
                    {word.word}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 break-all">{word.pinyin}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${posInfo.color} shrink-0`}>
                                {posInfo.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button 
                                onClick={handleSpeechRecognition}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isSpeaking ? 'bg-red-500 text-white recording-pulse' : 'text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                title="Luyện đọc nói AI"
                            >
                                <i className="fas fa-microphone text-xs"></i>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onShowStroke(word.word); }} 
                                className="text-slate-400 hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-400 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                title="Luyện viết chữ"
                            >
                                <i className="fas fa-pen-fancy text-xs"></i>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onToggleBookmark(word); }}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-slate-100 dark:hover:bg-slate-850 dark:hover:bg-slate-850 ${isBookmarked ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'}`}
                                title={isBookmarked ? "Bỏ đánh dấu" : "Đánh dấu lưu"}
                            >
                                <i className={`${isBookmarked ? 'fas' : 'far'} fa-star text-sm`}></i>
                            </button>
                        </div>
                    </div>

                    <p className="text-teal-600 dark:text-teal-400 font-semibold mb-2">{word.meaning}</p>
                    
                    {parsed.zh && (
                        <div className="text-xs bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40">
                            <p className="font-semibold text-slate-700 dark:text-slate-200">{parsed.zh}</p>
                            {parsed.pinyin && <p className="text-slate-400 dark:text-slate-500 italic mt-0.5">{parsed.pinyin}</p>}
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{parsed.vi}</p>
                        </div>
                    )}

                    {(isSpeaking || speechStatus) && (
                        <div className="mt-2 text-xs p-2 rounded-xl flex items-center gap-2 animate-fade-in border transition-all duration-300 bg-slate-50 dark:bg-slate-900/40 border-slate-150 dark:border-slate-800/80">
                            {isSpeaking && (
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 flex items-center gap-1.5 font-bold"><i className="fas fa-circle animate-pulse"></i> Hệ thống đang nghe...</span>
                                    <div className="flex items-center gap-0.5 ml-1">
                                        <div className="wave-bar"></div>
                                        <div className="wave-bar"></div>
                                        <div className="wave-bar"></div>
                                        <div className="wave-bar"></div>
                                        <div className="wave-bar"></div>
                                    </div>
                                </div>
                            )}
                            {speechStatus === 'correct' && (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold"><i className="fas fa-check-circle"></i> Đọc chuẩn! Phát âm tốt ({heardText})</span>
                            )}
                            {speechStatus === 'wrong' && !isSpeaking && (
                                <span className="text-red-500 dark:text-red-400 flex flex-col font-medium gap-0.5">
                                    <span><i className="fas fa-exclamation-circle mr-1"></i> Chưa chuẩn!</span>
                                    {heardText && <span className="text-[10px] text-slate-400 italic">Nghe được: "{heardText}"</span>}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {word.tip && (
                <div className="text-xs text-amber-700 dark:text-amber-400/90 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-100/50 dark:border-amber-900/30 flex items-start gap-1.5">
                    <i className="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                    <p className="leading-relaxed"><strong>Mẹo:</strong> {word.tip}</p>
                </div>
            )}

            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColors[learningStatus]}`}>
                    {statusLabels[learningStatus]}
                </span>
                <div className="flex gap-1">
                    <button 
                        onClick={() => onChangeStatus(word.id, 'learning')}
                        className={`text-[10px] px-2 py-1 rounded-md font-bold transition-colors ${learningStatus === 'learning' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                        Học
                    </button>
                    <button 
                        onClick={() => onChangeStatus(word.id, 'mastered')}
                        className={`text-[10px] px-2 py-1 rounded-md font-bold transition-colors ${learningStatus === 'mastered' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                        Thuộc
                    </button>
                    {learningStatus !== 'unlearned' && (
                        <button 
                            onClick={() => onChangeStatus(word.id, 'unlearned')}
                            className="text-[10px] px-1.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                            title="Đặt lại chưa học"
                        >
                            <i className="fas fa-undo"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};