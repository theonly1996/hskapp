// =========================================================================
// TAB: TỔNG QUAN (DASHBOARD - BIỂU ĐỒ, THỐNG KÊ CHI TIẾT & BẢNG TIẾN ĐỘ LUYỆN DỊCH HSK 1 - 3)
// =========================================================================
const { useMemo: useMemoOverview, useState: useStateOverview, useEffect: useEffectOverview } = React;

const OverviewTab = ({ progress = {}, bookmarks = [], onSwitchTab, onSwitchLevel, streak = 0 }) => {
    const allLevels = [1, 2, 3, 4, 5, 6];

    const [translationProgress, setTranslationProgress] = useStateOverview([]);
    const [selectedTranslationLevel, setSelectedTranslationLevel] = useStateOverview('all');

    // Các trạng thái phục vụ tính năng Cẩm nang Bộ thủ nâng cao
    const [showRadicals, setShowRadicals] = useStateOverview(false); 
    const [selectedRadicalLevel, setSelectedRadicalLevel] = useStateOverview('all'); 
    const [radicalSearchQuery, setRadicalSearchQuery] = useStateOverview(""); 

    // Các trạng thái phục vụ phân hệ Mini-Game Ghép cặp Bộ thủ tương tác
    const [radicalActiveTab, setRadicalActiveTab] = useStateOverview('lookup'); // 'lookup' hoặc 'game'
    const [gameLevel, setGameLevel] = useStateOverview('all'); // Cấp độ bộ thủ trong game
    const [gameCards, setGameCards] = useStateOverview([]); // Danh sách các thẻ bài trong game
    const [selectedCard, setSelectedCard] = useStateOverview(null); // Thẻ bài đang chọn hiện tại
    const [wrongPair, setWrongPair] = useStateOverview([]); // Cặp thẻ bài ghép sai tạm thời hiển thị đỏ
    const [matchedCount, setMatchedCount] = useStateOverview(0); // Số cặp đã ghép đúng thành công
    const [gameStatus, setGameStatus] = useStateOverview('idle'); // 'idle', 'playing', 'won'

    useEffectOverview(() => {
        const defaultList = window.hskProData?.defaultProgress || [
            // HSK 1 (Bài 1 - 15)
            { lessonId: 1, level: 1, title: "Bài 1: 你好 — Xin chào", isCompleted: false, currentScore: 0 },
            { lessonId: 2, level: 1, title: "Bài 2: 谢谢你 — Cảm ơn bạn", isCompleted: false, currentScore: 0 },
            { lessonId: 3, level: 1, title: "Bài 3: 你叫什么名字 — Bạn tên là gì", isCompleted: false, currentScore: 0 },
            { lessonId: 4, level: 1, title: "Bài 4: 她是我的汉语老师 — Cô ấy là giáo viên", isCompleted: false, currentScore: 0 },
            { lessonId: 5, level: 1, title: "Bài 5: 她女儿今年二十岁 — Con gái cô ấy 20 tuổi", isCompleted: false, currentScore: 0 },
            { lessonId: 6, level: 1, title: "Bài 6: 我会 say 汉语 — Tôi biết nói tiếng Trung", isCompleted: false, currentScore: 0 },
            { lessonId: 7, level: 1, title: "Bài 7: 今天几号 — Hôm nay ngày mấy", isCompleted: false, currentScore: 0 },
            { lessonId: 8, level: 1, title: "Bài 8: 我想喝茶 — Tôi muốn uống trà", isCompleted: false, currentScore: 0 },
            { lessonId: 9, level: 1, title: "Bài 9: 你兒子在哪里工作 — Con trai bạn làm việc ở đâu", isCompleted: false, currentScore: 0 },
            { lessonId: 10, level: 1, title: "Bài 10: 我能坐这儿吗 — Tôi có thể ngồi đây không", isCompleted: false, currentScore: 0 },
            { lessonId: 11, level: 1, title: "Bài 11: 现在几点 — Bây giờ mấy giờ", isCompleted: false, currentScore: 0 },
            { lessonId: 12, level: 1, title: "Bài 12: 明天天气怎么样 — Ngày mai thời tiết thế nào", isCompleted: false, currentScore: 0 },
            { lessonId: 13, level: 1, title: "Bài 13: 他在学做中国菜呢 — Anh ấy đang học nấu ăn", isCompleted: false, currentScore: 0 },
            { lessonId: 14, level: 1, title: "Bài 14: 她买了不少衣服 — Cô ấy mua không ít quần áo", isCompleted: false, currentScore: 0 },
            { lessonId: 15, level: 1, title: "Bài 15: 我我是坐飞机来的 — Tôi đi máy bay đến", isCompleted: false, currentScore: 0 },
            
            // HSK 2 (Bài 16 - 30)
            { lessonId: 16, level: 2, title: "Bài 16 (H2-B1): 九月去北京旅游 tốt nhất", isCompleted: false, currentScore: 0 },
            { lessonId: 17, level: 2, title: "Bài 17 (H2-B2): 我每天六点起床", isCompleted: false, currentScore: 0 },
            { lessonId: 18, level: 2, title: "Bài 18 (H2-B3): 左边那个红色的是 shadow", isCompleted: false, currentScore: 0 },
            { lessonId: 19, level: 2, title: "Bài 19 (H2-B4): 这个工作是他帮 me", isCompleted: false, currentScore: 0 },
            { lessonId: 20, level: 2, title: "Bài 20 (H2-B5): 可以这儿写你的名字", isCompleted: false, currentScore: 0 },
            { lessonId: 21, level: 2, title: "Bài 21 (H2-B6): 你怎么 không chī le", isCompleted: false, currentScore: 0 },
            { lessonId: 22, level: 2, title: "Bài 22 (H2-B7): 你家离公司远吗", isCompleted: false, currentScore: 0 },
            { lessonId: 23, level: 2, title: "Bài 23 (H2-B8): 让我想一想再告诉你", isCompleted: false, currentScore: 0 },
            { lessonId: 24, level: 2, title: "Bài 24 (H2-B9): 题太多，我没做完", isCompleted: false, currentScore: 0 },
            { lessonId: 25, level: 2, title: "Bài 25 (H2-B10): 别找了，手机在桌子上呢", isCompleted: false, currentScore: 0 },
            { lessonId: 26, level: 2, title: "Bài 26 (H2-B11): 他比我大三岁", isCompleted: false, currentScore: 0 },
            { lessonId: 27, level: 2, title: "Bài 27 (H2-B12): 你穿得太少了", isCompleted: false, currentScore: 0 },
            { lessonId: 28, level: 2, title: "Bài 28 (H2-B13): 门开着呢", isCompleted: false, currentScore: 0 },
            { lessonId: 29, level: 2, title: "Bài 29 (H2-B14): 你看过那个电影吗", isCompleted: false, currentScore: 0 },
            { lessonId: 30, level: 2, title: "Bài 30 (H2-B15): 新年快到了", isCompleted: false, currentScore: 0 },
            
            // HSK 3 (Bài 31 - 45)
            { lessonId: 31, level: 3, title: "Bài 31 (H3-B1): 周末你有什么打算", isCompleted: false, currentScore: 0 },
            { lessonId: 32, level: 3, title: "Bài 32 (H3-B2): 他什么时候回来", isCompleted: false, currentScore: 0 },
            { lessonId: 33, level: 3, title: "Bài 33 (H3-B3): 桌子上放着一杯咖啡", isCompleted: false, currentScore: 0 },
            { lessonId: 34, level: 3, title: "Bài 34 (H3-B4): 她总是笑眯眯 de", isCompleted: false, currentScore: 0 },
            { lessonId: 35, level: 3, title: "Bài 35 (H3-B5): 我最近买了一辆 new 车", isCompleted: false, currentScore: 0 },
            { lessonId: 36, level: 3, title: "Bài 36 (H3-B6): 怎么突然变冷了", isCompleted: false, currentScore: 0 },
            { lessonId: 37, level: 3, title: "Bài 37 (H3-B7): 我跟他一样高", isCompleted: false, currentScore: 0 },
            { lessonId: 38, level: 3, title: "Bài 38 (H3-B8): 这里的变化真大", isCompleted: false, currentScore: 0 },
            { lessonId: 39, level: 3, title: "Bài 39 (H3-B9): 她的汉语越来越好", isCompleted: false, currentScore: 0 },
            { lessonId: 40, level: 3, title: "Bài 40 (H3-B10): 数学考试难 không", isCompleted: false, currentScore: 0 },
            { lessonId: 41, level: 3, title: "Bài 41 (H3-B11): 别着急，慢慢来", isCompleted: false, currentScore: 0 },
            { lessonId: 42, level: 3, title: "Bài 42 (H3-B12): 把书放在桌子上", isCompleted: false, currentScore: 0 },
            { lessonId: 43, level: 3, title: "Bài 43 (H3-B13): 我习惯了这里的生活", isCompleted: false, currentScore: 0 },
            { lessonId: 44, level: 3, title: "Bài 44 (H3-B14): 请再检查一下账单", isCompleted: false, currentScore: 0 },
            { lessonId: 45, level: 3, title: "Bài 45 (H3-B15): 终于把 problem 解决了", isCompleted: false, currentScore: 0 }
        ];

        const mergedList = window.ProgressService.syncLessonProgress(defaultList);
        setTranslationProgress(mergedList);
    }, []);

    const handleToggleLesson = (lessonId) => {
        const updated = window.ProgressService.toggleLessonProgress(lessonId);
        setTranslationProgress(updated);
    };

    const levelStats = useMemoOverview(() => {
        let totalMastered = 0;
        let totalLearning = 0;
        let totalUnlearned = 0;
        let totalWordsAllLevels = 0;

        const vocabSource = typeof window !== 'undefined' && window.FALLBACK_VOCABULARY 
            ? window.FALLBACK_VOCABULARY 
            : {};

        const stats = allLevels.map(level => {
            const levelWords = vocabSource[level] || [];
            const total = levelWords.length;
            totalWordsAllLevels += total;

            let mastered = 0;
            let learning = 0;
            levelWords.forEach(w => {
                const status = progress[w.id];
                if (status === 'mastered') mastered++;
                else if (status === 'learning') learning++;
            });
            
            totalMastered += mastered;
            totalLearning += learning;
            totalUnlearned += (total - mastered - learning);

            return {
                level,
                total,
                mastered,
                learning,
                unlearned: total - mastered - learning,
                masteredPercent: total > 0 ? Math.round((mastered / total) * 100) : 0
            };
        });

        return {
            stats,
            totalMastered,
            totalLearning,
            totalUnlearned,
            totalWordsAllLevels,
            totalPercent: totalWordsAllLevels > 0 ? Math.round((totalMastered / totalWordsAllLevels) * 100) : 0
        };
    }, [progress]);

    const coreRadicals = useMemoOverview(() => {
        const rawList = window.hskProData?.coreRadicals || [];
        // Phân bổ thông minh các bộ thủ cốt lõi vào HSK 1-6 để phân mảnh tiện lợi
        return rawList.map((item, idx) => {
            let level = 1;
            if (idx >= 100) level = 6;
            else if (idx >= 80) level = 5;
            else if (idx >= 60) level = 4;
            else if (idx >= 41) level = 3;
            else if (idx >= 21) level = 2;
            return {
                ...item,
                level
            };
        });
    }, []);

    const filteredRadicals = useMemoOverview(() => {
        return coreRadicals.filter(item => {
            if (selectedRadicalLevel !== 'all' && item.level !== Number(selectedRadicalLevel)) {
                return false;
            }
            if (radicalSearchQuery.trim()) {
                const query = radicalSearchQuery.toLowerCase().trim();
                return (
                    item.radical.toLowerCase().includes(query) ||
                    item.name.toLowerCase().includes(query) ||
                    item.meaning.toLowerCase().includes(query) ||
                    item.examples.toLowerCase().includes(query) ||
                    item.tip.toLowerCase().includes(query)
                );
            }
            return true;
        });
    }, [coreRadicals, selectedRadicalLevel, radicalSearchQuery]);

    const filteredTranslation = useMemoOverview(() => {
        if (selectedTranslationLevel === 'all') return translationProgress;
        return translationProgress.filter(item => {
            const itemLevel = item.level || (item.lessonId <= 15 ? 1 : item.lessonId <= 30 ? 2 : 3);
            return itemLevel === Number(selectedTranslationLevel);
        });
    }, [translationProgress, selectedTranslationLevel]);

    const handleLevelSelect = (levelNum) => {
        if (typeof onSwitchLevel === 'function') onSwitchLevel(levelNum);
        if (typeof onSwitchTab === 'function') onSwitchTab('dictionary');
    };

    const startNewGame = (level = gameLevel) => {
        // Lọc danh sách bộ thủ thuộc cấp độ trò chơi đang chọn
        const pool = coreRadicals.filter(r => level === 'all' || r.level === Number(level));
        if (pool.length < 4) {
            setGameCards([]);
            setGameStatus('idle');
            return;
        }

        // Chọn ngẫu nhiên 4 bộ thủ từ danh sách lọc được
        const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
        const selectedRadicals = shuffledPool.slice(0, 4);

        // Tạo danh sách thẻ: 4 thẻ chữ bộ thủ và 4 thẻ ý nghĩa tiếng Việt tương ứng
        const cards = [];
        selectedRadicals.forEach((rad, index) => {
            cards.push({
                id: `rad_${index}`,
                matchId: index,
                type: 'symbol',
                content: rad.radical.split(' ')[0], // Trích xuất ký tự gốc sạch
                detail: `Bộ ${rad.name}`,
                isMatched: false
            });
            cards.push({
                id: `meaning_${index}`,
                matchId: index,
                type: 'meaning',
                content: rad.meaning,
                detail: `Bộ ${rad.name}`,
                isMatched: false
            });
        });

        // Xáo trộn ngẫu nhiên hoàn toàn thứ tự các thẻ bài
        const randomizedCards = cards.sort(() => 0.5 - Math.random());

        setGameCards(randomizedCards);
        setSelectedCard(null);
        setWrongPair([]);
        setMatchedCount(0);
        setGameStatus('playing');
    };

    const handleCardSelect = (card) => {
        if (card.isMatched || gameStatus !== 'playing') return;
        if (wrongPair.length > 0) return; // Đợi hiệu ứng đỏ nhấp nháy biến mất

        // Nếu click lại đúng thẻ đã chọn -> Bỏ chọn
        if (selectedCard && selectedCard.id === card.id) {
            setSelectedCard(null);
            return;
        }

        // Nếu chưa chọn thẻ nào -> Tiến hành chọn thẻ hiện tại
        if (!selectedCard) {
            setSelectedCard(card);
            return;
        }

        // Nếu chọn 2 thẻ cùng loại (ví dụ 2 ký tự bộ thủ hoặc 2 nghĩa tiếng Việt) -> Đổi thẻ chọn mới
        if (selectedCard.type === card.type) {
            setSelectedCard(card);
            return;
        }

        // ĐỐI CHIẾU: Tiến hành so khớp khi đã chọn một cặp Thẻ chữ và Thẻ nghĩa
        if (selectedCard.matchId === card.matchId) {
            // Đúng! Đánh dấu 2 thẻ bài đã được khớp thành công
            setGameCards(prev => prev.map(c => {
                if (c.matchId === card.matchId) return { ...c, isMatched: true };
                return c;
            }));
            setMatchedCount(prev => {
                const nextCount = prev + 1;
                if (nextCount === 4) {
                    setGameStatus('won');
                }
                return nextCount;
            });
            setSelectedCard(null);
            // Kích hoạt âm thanh phản hồi Ting Ting chuẩn xác
            if (typeof window.playSoundFeedback === 'function') {
                window.playSoundFeedback('correct');
            }
        } else {
            // Sai! Lưu trữ cặp thẻ ghép lỗi để phủ màu đỏ cảnh báo
            setWrongPair([selectedCard.id, card.id]);
            setSelectedCard(null);
            if (typeof window.playSoundFeedback === 'function') {
                window.playSoundFeedback('wrong');
            }

            // Tự động khôi phục lại trạng thái bình thường sau 800ms
            setTimeout(() => {
                setWrongPair([]);
            }, 800);
        }
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

                    <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-850/60">
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
                            <i className="fas fa-tasks text-emerald-600"></i> Vở Bài Tập Luyện Dịch HSK (Tổng số {translationProgress.length} Bài)
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Học dịch chuyên sâu kèm hệ thống ngữ pháp và bộ thủ hỗ trợ thực hành.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl self-start">
                        <button 
                            onClick={() => setSelectedTranslationLevel('all')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === 'all' 
                                    ? 'bg-white dark:bg-slate-850 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            Tất cả
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('1')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '1' 
                                    ? 'bg-white dark:bg-slate-850 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            HSK 1
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('2')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '2' 
                                    ? 'bg-white dark:bg-slate-850 shadow-sm text-teal-600 dark:text-teal-400' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                            }`}
                        >
                            HSK 2
                        </button>
                        <button 
                            onClick={() => setSelectedTranslationLevel('3')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-xl transition ${
                                selectedTranslationLevel === '3' 
                                    ? 'bg-white dark:bg-slate-850 shadow-sm text-teal-600 dark:text-teal-400' 
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
                                    onChange={() => handleToggleLesson(item.lessonId)}
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

            {/* CẨM NANG BỘ THỦ CHỮ HÁN CỐT LÕI (Collapse kèm Tìm Kiếm & Game Ghép cặp) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-book-open text-indigo-600"></i> Cẩm nang Bộ thủ chữ Hán HSK
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Mẹo tư duy và liên tưởng hình ảnh để lưu giữ mặt chữ sâu sắc, dễ dàng tra cứu và luyện game phản xạ.
                        </p>
                    </div>

                    <button 
                        onClick={() => setShowRadicals(!showRadicals)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-md shadow-indigo-100 dark:shadow-none transition duration-150 self-start sm:self-center"
                    >
                        {showRadicals ? (
                            <>
                                <i className="fas fa-eye-slash"></i> Thu gọn bộ thủ
                            </>
                        ) : (
                            <>
                                <i className="fas fa-eye"></i> Xem cẩm nang ({coreRadicals.length} Bộ)
                            </>
                        )}
                    </button>
                </div>

                {showRadicals && (
                    <div className="space-y-4 animate-fade-in border-t border-slate-100 dark:border-slate-800/80 pt-4">
                        
                        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl w-full sm:w-80">
                            <button
                                onClick={() => setRadicalActiveTab('lookup')}
                                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                                    radicalActiveTab === 'lookup'
                                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                                }`}
                            >
                                <i className="fas fa-search-plus"></i> Tra cứu bộ thủ
                            </button>
                            <button
                                onClick={() => {
                                    setRadicalActiveTab('game');
                                    if (gameStatus === 'idle') startNewGame('all');
                                }}
                                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                                    radicalActiveTab === 'game'
                                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                                }`}
                            >
                                <i className="fas fa-gamepad"></i> Game ghép cặp
                            </button>
                        </div>

                        {/* PHÂN HỆ 1: TRA CỨU BỘ THỦ */}
                        {radicalActiveTab === 'lookup' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850/60">
                                    {/* Bộ lọc cấp độ HSK từ 1 - 6 */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 mr-1">Bộ lọc HSK:</span>
                                        {['all', 1, 2, 3, 4, 5, 6].map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => setSelectedRadicalLevel(level)}
                                                className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition border ${
                                                    selectedRadicalLevel === level
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100'
                                                        : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-indigo-500'
                                                }`}
                                            >
                                                {level === 'all' ? 'Tất cả' : `HSK ${level}`}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Thanh tìm kiếm bộ thủ */}
                                    <div className="relative w-full lg:w-72">
                                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm: Nhân, Khẩu, ăn, uống, trà..."
                                            value={radicalSearchQuery}
                                            onChange={(e) => setRadicalSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                                        />
                                        {radicalSearchQuery && (
                                            <button 
                                                onClick={() => setRadicalSearchQuery("")}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 px-1">
                                    <span>Đang hiển thị <strong>{filteredRadicals.length}</strong> bộ thủ</span>
                                    {selectedRadicalLevel !== 'all' && (
                                        <span>Thuộc nhóm từ vựng của <strong>HSK {selectedRadicalLevel}</strong></span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                                    {filteredRadicals.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-950/20 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-950 transition duration-300 flex flex-col justify-between space-y-2.5 relative group overflow-hidden"
                                        >
                                            <span className="absolute top-2 right-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/35 dark:border-indigo-900/35">
                                                HSK {item.level}
                                            </span>

                                            <div>
                                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 pr-12">
                                                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{item.radical}</span>
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Bộ {item.name}</span>
                                                </div>
                                                
                                                <div className="space-y-1 text-xs">
                                                    <p className="text-slate-600 dark:text-slate-400">
                                                        <strong>Ý nghĩa:</strong> {item.meaning}
                                                    </p>
                                                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                                        <strong>Ví dụ:</strong> {item.examples}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-amber-500/10 text-amber-800 dark:text-amber-300 p-2.5 rounded-xl text-[11px] leading-relaxed italic border border-amber-500/10">
                                                🎯 {item.tip}
                                            </div>
                                        </div>
                                    ))}
                                    {filteredRadicals.length === 0 && (
                                        <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                                            <i className="fas fa-search text-2xl mb-2 block text-slate-300"></i>
                                            Không tìm thấy bộ thủ phù hợp với từ khóa của bạn.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PHÂN HỆ 2: GAME GHẾP CẶP BỘ THỦ */}
                        {radicalActiveTab === 'game' && (
                            <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-3xl border border-slate-100 dark:border-slate-800/80 space-y-5 animate-fade-in">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest">Trò chơi phản xạ Bộ thủ</h5>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Hãy click ghép cặp đúng các ô chữ bộ thủ với phần giải nghĩa tiếng Việt tương ứng.</p>
                                    </div>

                                    {/* Lựa chọn cấp độ luyện tập bộ thủ trong Game */}
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={gameLevel}
                                            onChange={(e) => {
                                                setGameLevel(e.target.value);
                                                startNewGame(e.target.value);
                                            }}
                                            className="text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                                        >
                                            <option value="all">Mức độ: Tất cả bộ thủ</option>
                                            <option value="1">Mức độ HSK 1</option>
                                            <option value="2">Mức độ HSK 2</option>
                                            <option value="3">Mức độ HSK 3</option>
                                            <option value="4">Mức độ HSK 4</option>
                                            <option value="5">Mức độ HSK 5</option>
                                            <option value="6">Mức độ HSK 6</option>
                                        </select>

                                        <button
                                            onClick={() => startNewGame()}
                                            className="p-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-xl transition duration-150 active:scale-95"
                                            title="Tải lại bảng ghép bài"
                                        >
                                            <i className="fas fa-redo"></i> Chơi lại
                                        </button>
                                    </div>
                                </div>

                                {gameStatus === 'playing' && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto py-2">
                                        {gameCards.map((card) => {
                                            const isSelected = selectedCard?.id === card.id;
                                            const isWrong = wrongPair.includes(card.id);
                                            
                                            return (
                                                <button
                                                    key={card.id}
                                                    onClick={() => handleCardSelect(card)}
                                                    disabled={card.isMatched}
                                                    className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-3 transition-all duration-300 relative ${
                                                        card.isMatched
                                                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 scale-95 opacity-55 cursor-not-allowed'
                                                            : isWrong
                                                            ? 'bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 shake-animation'
                                                            : isSelected
                                                            ? 'bg-indigo-500 border-indigo-500 text-white scale-105 shadow-md shadow-indigo-100 dark:shadow-none'
                                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-800 text-slate-800 dark:text-slate-200 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                                                    }`}
                                                >
                                                    {/* Nhãn loại thẻ bài nhỏ kín */}
                                                    <span className={`absolute top-1.5 left-2.5 text-[8px] font-black uppercase opacity-65 ${
                                                        isSelected ? 'text-white' : 'text-slate-400'
                                                    }`}>
                                                        {card.type === 'symbol' ? 'Bộ thủ' : 'Ý nghĩa'}
                                                    </span>

                                                    {card.isMatched ? (
                                                        <div className="flex flex-col items-center justify-center text-center">
                                                            <i className="fas fa-check-circle text-lg mb-1"></i>
                                                            <span className="text-[10px] font-black uppercase tracking-wider">Đã khớp</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center w-full">
                                                            <span className={`font-black break-words block leading-snug ${
                                                                card.type === 'symbol' ? 'text-3xl' : 'text-[11px] px-1'
                                                            }`}>
                                                                {card.content}
                                                            </span>
                                                            {card.type === 'symbol' && (
                                                                <span className={`text-[10px] block font-medium mt-0.5 opacity-80 ${
                                                                    isSelected ? 'text-white/80' : 'text-slate-400'
                                                                }`}>
                                                                    {card.detail}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {gameStatus === 'won' && (
                                    <div className="text-center py-10 max-w-md mx-auto space-y-4 animate-scale-up">
                                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-4xl mx-auto shadow-inner border border-emerald-200/50">
                                            🎉
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">Chiến thắng xuất sắc!</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Bạn đã ghi nhớ và ghép nối chuẩn xác tất cả các bộ thủ.</p>
                                        </div>
                                        <button
                                            onClick={() => startNewGame()}
                                            className="px-6 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-100 dark:shadow-none transition duration-150 active:scale-95"
                                        >
                                            Luyện ván mới <i className="fas fa-arrow-right ml-1"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.OverviewTab = OverviewTab;