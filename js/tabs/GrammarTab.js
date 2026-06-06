// File: js/tabs/GrammarTab.js

const GrammarTab = ({ activeLevel }) => {
    // Lấy useState và useEffect từ biến toàn cục React
    const { useState, useEffect } = React;

    // Cơ chế an toàn: Kiểm tra xem biến hskGrammarDatabase có tồn tại không
    const isDbAvailable = typeof hskGrammarDatabase !== 'undefined';
    
    // Nếu có DB, lấy dữ liệu theo level, nếu không fallback về mảng rỗng []
    const activeGrammar = isDbAvailable 
        ? (hskGrammarDatabase[activeLevel] || hskGrammarDatabase[1] || []) 
        : [];

    // --- CÁC STATE TÌM KIẾM VÀ LỌC ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'bookmarked', 'learned'

    // --- CÁC STATE THỰC HÀNH ---
    const [openPracticeId, setOpenPracticeId] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState({});

    // --- CÁC STATE CÁ NHÂN HÓA (ĐÁNH DẤU & TIẾN ĐỘ) ---
    // Khởi tạo state từ localStorage để không bị mất khi F5
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('hsk_grammar_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [learned, setLearned] = useState(() => {
        const saved = localStorage.getItem('hsk_grammar_learned');
        return saved ? JSON.parse(saved) : [];
    });

    // --- EFFECTS: Lưu vào LocalStorage mỗi khi có thay đổi ---
    useEffect(() => {
        localStorage.setItem('hsk_grammar_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    useEffect(() => {
        localStorage.setItem('hsk_grammar_learned', JSON.stringify(learned));
    }, [learned]);

    // --- HÀM XỬ LÝ CÁ NHÂN HÓA ---
    const toggleBookmark = (id) => {
        setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    const toggleLearned = (id) => {
        setLearned(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    };

    // --- TÍNH TOÁN TIẾN ĐỘ TỔNG QUAN ---
    const totalGrammarCount = activeGrammar.length;
    const learnedGrammarCount = activeGrammar.filter(g => {
        const gId = g.id || g.title;
        return learned.includes(gId);
    }).length;
    const progressPercent = totalGrammarCount > 0 ? Math.round((learnedGrammarCount / totalGrammarCount) * 100) : 0;
    
    // Tạo thông điệp khích lệ dựa trên phần trăm tiến độ
    let progressMessage = "Hãy bắt đầu điểm ngữ pháp đầu tiên nhé!";
    if (progressPercent === 100) progressMessage = "Tuyệt vời! Bạn đã hoàn thành toàn bộ ngữ pháp cấp độ này 🏆";
    else if (progressPercent >= 80) progressMessage = "Sắp về đích rồi, cố lên! 🔥";
    else if (progressPercent >= 50) progressMessage = "Bạn đã đi được hơn một nửa chặng đường! 🚀";
    else if (progressPercent > 0) progressMessage = "Khởi đầu rất tốt, tiếp tục phát huy nhé! 🌟";

    // --- LOGIC TÌM KIẾM VÀ LỌC ---
    const allTags = ["All", ...new Set(activeGrammar.flatMap(g => g.tags || []))];

    // --- STATE CHO CHẾ ĐỘ TẬP TRUNG (FOCUS MODE) ---
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [focusIndex, setFocusIndex] = useState(0);

    // --- STATE CHO CHẾ ĐỘ ÔN TẬP TỔNG HỢP (REVIEW MODE) ---
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [reviewQuestions, setReviewQuestions] = useState([]);
    const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
    const [reviewSelectedOpt, setReviewSelectedOpt] = useState(null);
    const [isReviewAnswered, setIsReviewAnswered] = useState(false);
    const [reviewScore, setReviewScore] = useState(0);
    const [showReviewResult, setShowReviewResult] = useState(false);

    const filteredGrammar = activeGrammar.filter(g => {
        // Đảm bảo mỗi item có một ID duy nhất để so sánh (fallback dùng tiêu đề nếu thiếu id)
        const gId = g.id || g.title;

        // Kiểm tra từ khóa
        const matchesSearch = searchTerm === "" || 
            (g.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (g.structure?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (g.desc?.toLowerCase().includes(searchTerm.toLowerCase()));

        // Kiểm tra thẻ lọc
        const matchesTag = selectedTag === "All" || (g.tags && g.tags.includes(selectedTag));

        // Kiểm tra trạng thái tiến độ
        const matchesStatus = 
            statusFilter === "all" || 
            (statusFilter === "bookmarked" && bookmarks.includes(gId)) ||
            (statusFilter === "learned" && learned.includes(gId));

        return matchesSearch && matchesTag && matchesStatus;
    });

    // --- CÁC HÀM XỬ LÝ THỰC HÀNH & ÂM THANH ---
    const togglePractice = (grammarId) => {
        setOpenPracticeId(openPracticeId === grammarId ? null : grammarId);
    };

    const handleSelectOption = (grammarId, qIndex, optIndex) => {
        if (submitted[grammarId]) return;
        setUserAnswers(prev => ({
            ...prev,
            [grammarId]: {
                ...(prev[grammarId] || {}),
                [qIndex]: optIndex
            }
        }));
    };

    const handleSubmit = (grammarId) => {
        setSubmitted(prev => ({ ...prev, [grammarId]: true }));
    };

    const handleRetry = (grammarId) => {
        setSubmitted(prev => ({ ...prev, [grammarId]: false }));
        setUserAnswers(prev => ({ ...prev, [grammarId]: {} }));
    };

    const playAudio = (text, audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(err => console.log("Không thể phát file âm thanh:", err));
            return;
        }
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Trình duyệt của bạn không hỗ trợ đọc văn bản.");
        }
    };

    // --- LOGIC ÔN TẬP TỔNG HỢP ---
    const startReview = () => {
        const questions = [];
        activeGrammar.forEach(g => {
            const gId = g.id || g.title;
            if (bookmarks.includes(gId) && g.exercises && g.exercises.length > 0) {
                g.exercises.forEach(ex => questions.push({ ...ex, grammarTitle: g.title }));
            }
        });
        
        if (questions.length === 0) return;
        
        // Trộn ngẫu nhiên câu hỏi
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        setReviewQuestions(questions);
        setCurrentReviewIdx(0);
        setReviewSelectedOpt(null);
        setIsReviewAnswered(false);
        setReviewScore(0);
        setShowReviewResult(false);
        setIsReviewMode(true);
    };

    const handleReviewSelect = (optIdx) => {
        if (isReviewAnswered) return;
        setReviewSelectedOpt(optIdx);
        setIsReviewAnswered(true);
        if (optIdx === reviewQuestions[currentReviewIdx].correctAnswer) {
            setReviewScore(prev => prev + 1);
        }
    };

    const nextReviewQuestion = () => {
        if (currentReviewIdx < reviewQuestions.length - 1) {
            setCurrentReviewIdx(prev => prev + 1);
            setReviewSelectedOpt(null);
            setIsReviewAnswered(false);
        } else {
            setShowReviewResult(true);
        }
    };

    // Kiểm tra xem có bài tập nào trong các bài đã lưu không để hiện/ẩn nút
    const hasReviewQuestions = activeGrammar.some(g => {
        const gId = g.id || g.title;
        return bookmarks.includes(gId) && g.exercises && g.exercises.length > 0;
    });

    // --- RENDER GIAO DIỆN ---
    if (!activeGrammar || activeGrammar.length === 0) {
        return (
            <div className="p-6 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800">
                <p>Đang tải dữ liệu ngữ pháp hoặc không tìm thấy dữ liệu cấp độ này...</p>
            </div>
        );
    }

    // --- RENDER CHẾ ĐỘ TẬP TRUNG (FOCUS MODE) ---
    if (isFocusMode && filteredGrammar.length > 0) {
        const g = filteredGrammar[focusIndex];
        const gId = g.id || g.title;
        const isBookmarked = bookmarks.includes(gId);
        const isLearned = learned.includes(gId);

        return (
            <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in">
                {/* Nút thoát */}
                <button 
                    onClick={() => setIsFocusMode(false)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Nội dung Card */}
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-y-auto max-h-[85vh] hide-scrollbar border dark:border-slate-700">
                    
                    {/* Header Card */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <h4 className="font-black text-2xl text-slate-800 dark:text-white flex items-center gap-3">
                            <span className="w-8 h-8 text-sm rounded-full flex items-center justify-center font-bold shrink-0 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400">
                                {focusIndex + 1}
                            </span>
                            {g.title}
                        </h4>
                        <div className="flex items-center gap-3 shrink-0">
                            <button 
                                onClick={() => toggleBookmark(gId)}
                                className={`p-2 rounded-full transition-all duration-300 ${isBookmarked ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 shadow-sm scale-110' : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50 dark:text-slate-600 dark:hover:text-amber-500 dark:hover:bg-amber-950/30 hover:scale-105'}`}
                            >
                                <svg className="w-6 h-6" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isBookmarked ? 0 : 2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cấu trúc mẫu */}
                    <div className="p-5 mb-6 border border-dashed rounded-2xl bg-teal-50/50 dark:bg-teal-950/10 border-teal-200 dark:border-teal-900/40">
                        <span className="text-xs uppercase font-extrabold block mb-2 tracking-wider text-teal-600 dark:text-teal-400">Cấu trúc mẫu</span>
                        <p className="font-bold text-lg text-teal-800 dark:text-teal-300">{g.structure}</p>
                        {g.pinyinStructure && <p className="text-sm mt-1 italic text-teal-600/80 dark:text-teal-400/70">{g.pinyinStructure}</p>}
                    </div>

                    {/* Giải thích */}
                    {g.desc && (
                        <div className="mb-6 text-base font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                            <span className="font-bold block mb-2 text-slate-800 dark:text-slate-200">Cách dùng & Chú giải:</span>
                            {g.desc}
                        </div>
                    )}

                    {/* Ví dụ */}
                    <div className="space-y-3 mb-6">
                        <span className="text-xs uppercase font-bold block tracking-wider text-slate-400">Ví dụ minh họa</span>
                        {g.examples?.map((ex, exIdx) => (
                            <div key={exIdx} className="p-4 rounded-2xl space-y-2 relative group pr-14 border bg-slate-50 border-transparent dark:bg-slate-800/50 dark:border-slate-700/50">
                                <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{ex.zh}</p>
                                <p className="font-semibold text-slate-500 dark:text-slate-400">{ex.py}</p>
                                <p className="italic text-slate-600 dark:text-slate-300">{ex.vi}</p>
                                {ex.note && <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/50 px-3 py-1.5 rounded-lg inline-block mt-2 font-medium">Lưu ý: {ex.note}</p>}
                                
                                <button 
                                    onClick={() => playAudio(ex.zh, ex.audio)}
                                    className="absolute top-4 right-4 p-2.5 rounded-full transition-all shadow-sm bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-110 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-800/80"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Lỗi thường gặp */}
                    {g.commonMistakes && (
                        <div className="p-4 bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 rounded-2xl text-sm mb-6">
                            <span className="font-bold text-rose-700 dark:text-rose-400 block mb-2">⚠️ Lỗi thường gặp:</span>
                            <p className="text-rose-700/90 dark:text-rose-300/90 font-medium leading-relaxed">{g.commonMistakes}</p>
                        </div>
                    )}

                    {/* Phân biệt dễ nhầm (MỚI) */}
                    {g.compareWith && (
                        <div className="p-4 bg-violet-50/80 dark:bg-violet-950/20 border border-violet-200/70 dark:border-violet-900/40 rounded-2xl text-sm mb-6">
                            <span className="font-bold text-violet-700 dark:text-violet-400 block mb-2">🔍 Phân biệt dễ nhầm:</span>
                            <p className="text-violet-700/90 dark:text-violet-300/90 font-medium leading-relaxed mb-3">{g.compareWith.note}</p>
                            {g.compareWith.targetTitle && (
                                <button
                                    onClick={() => {
                                        setSearchTerm(g.compareWith.targetTitle);
                                        setFocusIndex(0);
                                        // Giữ nguyên Focus Mode, nội dung sẽ tự đổi sang bài liên quan mượt mà
                                    }}
                                    className="px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800 rounded-xl font-bold transition-colors text-xs flex items-center gap-2"
                                >
                                    <span>🔗</span> Xem cấu trúc: {g.compareWith.targetTitle}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Điều khiển */}
                    <div className="flex items-center justify-between pt-6 border-t dark:border-slate-700/80">
                        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={isLearned}
                                    onChange={() => toggleLearned(gId)}
                                    className="peer w-6 h-6 appearance-none rounded-md border-2 border-slate-300 checked:border-emerald-500 checked:bg-emerald-500 dark:border-slate-600 dark:checked:border-emerald-500 cursor-pointer transition-all"
                                />
                                <svg className="absolute w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className={`font-bold select-none ${isLearned ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>Đã nắm vững</span>
                        </label>
                    </div>

                </div>

                {/* Nút điều hướng */}
                <div className="w-full max-w-2xl mt-6 flex justify-between gap-4">
                    <button 
                        onClick={() => setFocusIndex(prev => Math.max(0, prev - 1))}
                        disabled={focusIndex === 0}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors w-1/2 justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Bài trước
                    </button>
                    <button 
                        onClick={() => setFocusIndex(prev => Math.min(filteredGrammar.length - 1, prev + 1))}
                        disabled={focusIndex === filteredGrammar.length - 1}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors w-1/2 justify-center"
                    >
                        Bài tiếp
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        );
    }

    // --- RENDER CHẾ ĐỘ ÔN TẬP (REVIEW MODE) ---
    if (isReviewMode && reviewQuestions.length > 0) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in">
                {/* Nút thoát */}
                <button 
                    onClick={() => setIsReviewMode(false)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl relative border dark:border-slate-700">
                    {showReviewResult ? (
                        <div className="text-center space-y-6 py-8 animate-fade-in">
                            <div className="w-24 h-24 mx-auto bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center text-4xl mb-4">
                                🏆
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white">Hoàn thành Ôn tập!</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                                Bạn trả lời đúng <span className="text-amber-500 dark:text-amber-400 font-black text-2xl">{reviewScore}</span> / {reviewQuestions.length} câu.
                            </p>
                            <button 
                                onClick={() => setIsReviewMode(false)}
                                className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-indigo-500/30"
                            >
                                Quay lại danh sách
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in flex flex-col h-full min-h-[50vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 border-b dark:border-slate-800 pb-4">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="text-amber-500">⭐️</span> Ôn tập ngữ pháp
                                </h3>
                                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                    Câu {currentReviewIdx + 1} / {reviewQuestions.length}
                                </div>
                            </div>
                            
                            {/* Nội dung câu hỏi */}
                            <div className="flex-1">
                                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1 rounded-lg mb-4 inline-block">
                                    Cấu trúc: {reviewQuestions[currentReviewIdx].grammarTitle}
                                </span>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
                                    {reviewQuestions[currentReviewIdx].question}
                                </h4>
                                
                                <div className="space-y-3">
                                    {reviewQuestions[currentReviewIdx].options?.map((opt, optIdx) => {
                                        const isCorrect = optIdx === reviewQuestions[currentReviewIdx].correctAnswer;
                                        const isSelected = reviewSelectedOpt === optIdx;
                                        
                                        let btnClass = "w-full text-left px-5 py-4 text-base font-medium rounded-2xl border-2 transition-all ";
                                        
                                        if (!isReviewAnswered) {
                                            btnClass += "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500/50";
                                        } else {
                                            if (isCorrect) {
                                                btnClass += "bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-500 dark:text-emerald-300 shadow-sm";
                                            } else if (isSelected && !isCorrect) {
                                                btnClass += "bg-rose-100 border-rose-500 text-rose-800 dark:bg-rose-900/40 dark:border-rose-500 dark:text-rose-300";
                                            } else {
                                                btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500";
                                            }
                                        }

                                        return (
                                            <button 
                                                key={optIdx}
                                                onClick={() => handleReviewSelect(optIdx)}
                                                disabled={isReviewAnswered}
                                                className={btnClass}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isReviewAnswered && (
                                    <div className={`mt-6 p-4 rounded-2xl text-sm font-medium animate-fade-in border ${reviewSelectedOpt === reviewQuestions[currentReviewIdx].correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-300' : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-300'}`}>
                                        <span className="font-bold text-base block mb-1">
                                            {reviewSelectedOpt === reviewQuestions[currentReviewIdx].correctAnswer ? '✅ Chính xác!' : '❌ Sai rồi!'}
                                        </span>
                                        {reviewQuestions[currentReviewIdx].explanation}
                                    </div>
                                )}
                            </div>

                            {/* Nút Next */}
                            {isReviewAnswered && (
                                <div className="mt-8 flex justify-end animate-fade-in">
                                    <button 
                                        onClick={nextReviewQuestion}
                                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all flex items-center gap-2 hover:translate-x-1 shadow-lg shadow-indigo-500/30"
                                    >
                                        {currentReviewIdx < reviewQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-4">
            
            {/* THANH TIẾN ĐỘ TỔNG QUAN (PROGRESS DASHBOARD) */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border dark:border-slate-800/85 shadow-sm relative overflow-hidden transition-all">
                {/* Hiệu ứng background phát sáng mờ ở góc */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="text-xl">📈</span> Tiến độ học HSK {activeLevel || 1}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{progressMessage}</p>
                    </div>
                    <div className="text-left md:text-right">
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{progressPercent}%</span>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Đã nắm vững {learnedGrammarCount} / {totalGrammarCount}</p>
                    </div>
                </div>
                
                {/* Khung thanh trượt (Progress Bar) */}
                <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200/50 dark:border-slate-700/50">
                    <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercent}%` }}
                    >
                        {/* Đường kẻ sáng bóng trên thanh bar tạo cảm giác 3D */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* KHOẢNG KHÔNG GIAN TÌM KIẾM VÀ LỌC */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border dark:border-slate-800/85 shadow-sm space-y-4">
                {/* Thanh tìm kiếm */}
                <div className="relative flex gap-3">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm ngữ pháp, cấu trúc (VD: 是)..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>
                    {/* Nút bật Chế độ tập trung */}
                    <button 
                        onClick={() => {
                            if(filteredGrammar.length > 0) {
                                setFocusIndex(0);
                                setIsFocusMode(true);
                            }
                        }}
                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap"
                        disabled={filteredGrammar.length === 0}
                        title="Học tập trung từng bài"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        <span className="hidden sm:inline">Tập trung</span>
                    </button>
                    {/* MỚI: Nút Tổng Ôn bài Đã lưu */}
                    <button 
                        onClick={startReview}
                        disabled={!hasReviewQuestions}
                        className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm shadow-amber-500/20"
                        title={hasReviewQuestions ? "Ôn tập các bài đã lưu" : "Hãy đánh dấu (⭐️) bài ngữ pháp có bài tập để ôn tập"}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="hidden md:inline">Tổng Ôn</span>
                    </button>
                </div>

                {/* Danh sách thẻ lọc (Tags) */}
                <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                selectedTag === tag 
                                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20 border-transparent' 
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {tag === "All" ? "Tất cả chủ đề" : tag}
                        </button>
                    ))}
                </div>

                {/* Bộ lọc trạng thái tiến độ học */}
                <div className="flex gap-2 pt-3 border-t dark:border-slate-800/80">
                    <button 
                        onClick={() => setStatusFilter("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${statusFilter === 'all' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Tất cả trạng thái
                    </button>
                    <button 
                        onClick={() => setStatusFilter("bookmarked")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${statusFilter === 'bookmarked' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        <span>⭐</span> Đã lưu
                    </button>
                    <button 
                        onClick={() => setStatusFilter("learned")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${statusFilter === 'learned' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        <span>✅</span> Đã nắm vững
                    </button>
                </div>
            </div>

            {/* KIỂM TRA NẾU TÌM KIẾM KHÔNG CÓ KẾT QUẢ */}
            {filteredGrammar.length === 0 && (
                <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 border-dashed">
                    <p className="font-medium">Không tìm thấy kết quả phù hợp 😢</p>
                    <button onClick={() => { setSearchTerm(""); setSelectedTag("All"); setStatusFilter("all"); }} className="mt-2 text-indigo-500 font-bold text-sm hover:underline">
                        Xóa tất cả bộ lọc
                    </button>
                </div>
            )}

            {/* DANH SÁCH NGỮ PHÁP */}
            <div className="grid grid-cols-1 gap-4">
                {filteredGrammar.map((g, idx) => {
                    const gId = g.id || g.title; // Dùng id, nếu không có dùng title làm định danh
                    const isBookmarked = bookmarks.includes(gId);
                    const isLearned = learned.includes(gId);

                    // TÍNH NĂNG 5: Thay đổi style toàn bộ Card nếu đã học xong (Gamification)
                    return (
                        <div key={gId} className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm space-y-4 transition-all duration-500 ease-in-out ${isLearned ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-emerald-100/50 dark:shadow-none scale-[1.01]' : 'dark:border-slate-800/85 hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:shadow-md'}`}>
                            
                            {/* --- PHẦN LÝ THUYẾT & NÚT ĐÁNH DẤU --- */}
                            <div className="flex items-start justify-between gap-4">
                                <h4 className={`font-bold text-sm flex items-center gap-2 transition-colors ${isLearned ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
                                    <span className={`w-6 h-6 text-[11px] rounded-full flex items-center justify-center font-bold shrink-0 transition-colors shadow-sm ${isLearned ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400'}`}>
                                        {isLearned ? '✓' : (idx + 1)}
                                    </span>
                                    {g.title}
                                </h4>
                                
                                <div className="flex items-center gap-3 shrink-0">
                                    {g.tags && (
                                        <div className="hidden sm:flex gap-1 flex-wrap justify-end">
                                            {g.tags?.map((tag, tIdx) => (
                                                <span key={tIdx} className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-colors ${isLearned ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    {/* Nút Đánh dấu / Bookmark (Có hiệu ứng hover và active) */}
                                    <button 
                                        onClick={() => toggleBookmark(gId)}
                                        className={`p-2 rounded-full transition-all duration-300 ${isBookmarked ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 shadow-sm scale-110' : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50 dark:text-slate-600 dark:hover:text-amber-500 dark:hover:bg-amber-950/30 hover:scale-105'}`}
                                        title={isBookmarked ? "Bỏ lưu" : "Lưu lại bài này"}
                                    >
                                        <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isBookmarked ? 0 : 2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className={`p-4 border border-dashed rounded-2xl transition-colors ${isLearned ? 'bg-emerald-100/60 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800/60' : 'bg-teal-50/50 dark:bg-teal-950/10 border-teal-200 dark:border-teal-900/40'}`}>
                                <span className={`text-[10px] uppercase font-extrabold block mb-1.5 tracking-wider ${isLearned ? 'text-emerald-700 dark:text-emerald-400' : 'text-teal-600 dark:text-teal-400'}`}>Cấu trúc mẫu</span>
                                <p className={`font-bold text-base ${isLearned ? 'text-emerald-900 dark:text-emerald-300' : 'text-teal-800 dark:text-teal-300'}`}>{g.structure}</p>
                                {g.pinyinStructure && <p className={`text-xs mt-1 italic ${isLearned ? 'text-emerald-700/80 dark:text-emerald-400/70' : 'text-teal-600/80 dark:text-teal-400/70'}`}>{g.pinyinStructure}</p>}
                            </div>

                            {g.desc && (
                                <div className={`text-sm font-medium leading-relaxed ${isLearned ? 'text-emerald-800/80 dark:text-emerald-200/70' : 'text-slate-600 dark:text-slate-400'}`}>
                                    <span className={`font-bold block mb-1 ${isLearned ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-800 dark:text-slate-200'}`}>Cách dùng & Chú giải:</span>
                                    {g.desc}
                                </div>
                            )}

                            <div className="space-y-2.5">
                                <span className={`text-[10px] uppercase font-bold block tracking-wider ${isLearned ? 'text-emerald-600/70 dark:text-emerald-500/50' : 'text-slate-400'}`}>Ví dụ minh họa</span>
                                {g.examples?.map((ex, exIdx) => (
                                    <div key={exIdx} className={`p-3.5 rounded-2xl text-xs space-y-1.5 relative group pr-12 transition-colors border ${isLearned ? 'bg-white/60 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/30' : 'bg-slate-50 border-transparent dark:bg-slate-950'}`}>
                                        <p className={`font-bold text-sm ${isLearned ? 'text-emerald-950 dark:text-emerald-50' : 'text-slate-800 dark:text-slate-100'}`}>{ex.zh}</p>
                                        <p className={`font-semibold ${isLearned ? 'text-emerald-700/80 dark:text-emerald-300/80' : 'text-slate-500 dark:text-slate-400'}`}>{ex.py}</p>
                                        <p className={`italic ${isLearned ? 'text-emerald-800/90 dark:text-emerald-200/80' : 'text-slate-600 dark:text-slate-300'}`}>{ex.vi}</p>
                                        {ex.note && <p className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/50 px-2.5 py-1 rounded-md inline-block mt-1 font-medium border border-amber-200/50 dark:border-amber-800/30">Lưu ý: {ex.note}</p>}
                                        
                                        <button 
                                            onClick={() => playAudio(ex.zh, ex.audio)}
                                            className={`absolute top-3.5 right-3.5 p-2 rounded-full transition-all shadow-sm ${isLearned ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-110 dark:bg-emerald-900/60 dark:text-emerald-400' : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-110 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-800/80'}`}
                                            title="Nghe phát âm"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {g.commonMistakes && (
                                <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 rounded-2xl text-xs">
                                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">⚠️ Lỗi thường gặp:</span>
                                    <p className="text-rose-700/90 dark:text-rose-300/90 font-medium leading-relaxed">{g.commonMistakes}</p>
                                </div>
                            )}

                            {/* Phân biệt dễ nhầm (MỚI) */}
                            {g.compareWith && (
                                <div className="p-3.5 bg-violet-50/80 dark:bg-violet-950/20 border border-violet-200/70 dark:border-violet-900/40 rounded-2xl text-xs mt-3">
                                    <span className="font-bold text-violet-700 dark:text-violet-400 block mb-1">🔍 Phân biệt dễ nhầm:</span>
                                    <p className="text-violet-700/90 dark:text-violet-300/90 font-medium leading-relaxed mb-2">{g.compareWith.note}</p>
                                    {g.compareWith.targetTitle && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm(g.compareWith.targetTitle);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="px-3 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800 rounded-lg font-bold transition-colors text-[11px] flex items-center gap-1.5 inline-flex"
                                        >
                                            <span>🔗</span> Chuyển đến: {g.compareWith.targetTitle}
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* --- THANH ĐIỀU KHIỂN DƯỚI (Đã học & Thực hành) --- */}
                            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t mt-5 transition-colors ${isLearned ? 'border-emerald-200/60 dark:border-emerald-800/40' : 'dark:border-slate-800/80'}`}>
                                {/* Checkbox đánh dấu đã học */}
                                <label className="flex items-center gap-2 cursor-pointer w-full sm:w-auto p-2 sm:p-0 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="relative flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={isLearned}
                                            onChange={() => toggleLearned(gId)}
                                            className="peer w-5 h-5 appearance-none rounded-md border-2 border-slate-300 checked:border-emerald-500 checked:bg-emerald-500 dark:border-slate-600 dark:checked:border-emerald-500 cursor-pointer transition-all"
                                        />
                                        <svg className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span className={`text-sm font-bold select-none ${isLearned ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                        Đã nắm vững
                                    </span>
                                </label>

                                {/* Nút thực hành (Chỉ hiện khi có bài tập) */}
                                {g.exercises && g.exercises.length > 0 && (
                                    <button 
                                        onClick={() => togglePractice(g.id)}
                                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors ${openPracticeId === g.id ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400'}`}
                                    >
                                        {openPracticeId === g.id ? "Đóng bài tập" : "🚀 Thực hành ngay"}
                                    </button>
                                )}
                            </div>

                            {/* --- KHU VỰC CÂU HỎI --- */}
                            {openPracticeId === g.id && g.exercises && g.exercises.length > 0 && (
                                <div className="mt-4 space-y-4 animate-fade-in border-t dark:border-slate-800/80 pt-4">
                                    {g.exercises?.map((exercise, qIdx) => {
                                        const selectedOpt = userAnswers[g.id]?.[qIdx];
                                        const isSubmitted = submitted[g.id];
                                        const isCorrect = selectedOpt === exercise.correctAnswer;

                                        return (
                                            <div key={qIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                                                <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">
                                                    Câu {qIdx + 1}: {exercise.question}
                                                </p>
                                                <div className="space-y-2">
                                                    {exercise.options?.map((opt, optIdx) => {
                                                        let btnClass = "w-full text-left px-4 py-2 text-sm font-medium rounded-xl border transition-all ";
                                                        
                                                        if (!isSubmitted) {
                                                            btnClass += selectedOpt === optIdx 
                                                                ? "bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-500 dark:text-indigo-300" 
                                                                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300";
                                                        } else {
                                                            if (optIdx === exercise.correctAnswer) {
                                                                btnClass += "bg-emerald-100 border-emerald-400 text-emerald-800 dark:bg-emerald-900/50 dark:border-emerald-500 dark:text-emerald-300"; 
                                                            } else if (selectedOpt === optIdx && !isCorrect) {
                                                                btnClass += "bg-rose-100 border-rose-400 text-rose-800 dark:bg-rose-900/50 dark:border-rose-500 dark:text-rose-300"; 
                                                            } else {
                                                                btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500";
                                                            }
                                                        }

                                                        return (
                                                            <button 
                                                                key={optIdx}
                                                                onClick={() => handleSelectOption(g.id, qIdx, optIdx)}
                                                                className={btnClass}
                                                                disabled={isSubmitted}
                                                            >
                                                                {opt}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {isSubmitted && (
                                                    <div className={`mt-3 p-3 rounded-xl text-xs font-medium ${isCorrect ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'}`}>
                                                        {isCorrect ? "✅ Chính xác! " : "❌ Sai rồi! "}
                                                        {exercise.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    <div className="pt-2 flex justify-end gap-2">
                                        {submitted[g.id] ? (
                                            <button 
                                                onClick={() => handleRetry(g.id)}
                                                className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 rounded-xl"
                                            >
                                                Làm lại
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleSubmit(g.id)}
                                                disabled={Object.keys(userAnswers[g.id] || {}).length < (g.exercises?.length || 0)}
                                                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all"
                                            >
                                                Kiểm tra đáp án
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};