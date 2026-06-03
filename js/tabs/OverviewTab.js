// =========================================================================
// TAB: TỔNG QUAN (DASHBOARD - BIỂU ĐỒ, THỐNG KÊ CHI TIẾT & BẢNG TIẾN ĐỘ LUYỆN DỊCH HSK 1 - 3)
// =========================================================================
const { useMemo: useMemoOverview, useState: useStateOverview, useEffect: useEffectOverview } = React;

const OverviewTab = ({ progress = {}, bookmarks = [], onSwitchTab, onSwitchLevel, streak = 0 }) => {
    const allLevels = [1, 2, 3, 4, 5, 6];

    // Khởi tạo trạng thái cho bảng tiến độ luyện dịch
    const [translationProgress, setTranslationProgress] = useStateOverview([]);
// Trạng thái bộ lọc bài tập dịch theo cấp độ để tránh giao diện quá dài (HSK 1, HSK 2, HSK 3)
const [selectedTranslationLevel, setSelectedTranslationLevel] = useStateOverview('all');

// Tự động load và đồng bộ hóa tiến độ luyện dịch từ LocalStorage kèm tính năng di trú dữ liệu cũ
useEffectOverview(() => {
    const defaultList = window.hskProData?.defaultProgress || [
        // HSK 1 (Bài 1 - 15)
        { lessonId: 1, level: 1, title: "Bài 1: 你好 — Xin chào", isCompleted: false, currentScore: 0 },
        { lessonId: 2, level: 1, title: "Bài 2: 谢谢你 — Cảm ơn bạn", isCompleted: false, currentScore: 0 },
        { lessonId: 3, level: 1, title: "Bài 3: 你叫什么名字 — Bạn tên là gì", isCompleted: false, currentScore: 0 },
        { lessonId: 4, level: 1, title: "Bài 4: 她是我的汉语老师 — Cô ấy là giáo viên", isCompleted: false, currentScore: 0 },
        { lessonId: 5, level: 1, title: "Bài 5: 她女儿今年二十岁 — Con gái cô ấy 20 tuổi", isCompleted: false, currentScore: 0 },
        { lessonId: 6, level: 1, title: "Bài 6: 我会说汉语 — Tôi biết nói tiếng Trung", isCompleted: false, currentScore: 0 },
        { lessonId: 7, level: 1, title: "Bài 7: 今天几号 — Hôm nay ngày mấy", isCompleted: false, currentScore: 0 },
        { lessonId: 8, level: 1, title: "Bài 8: 我想喝茶 — Tôi muốn uống trà", isCompleted: false, currentScore: 0 },
        { lessonId: 9, level: 1, title: "Bài 9: 你兒子在哪里工作 — Con trai bạn làm việc ở đâu", isCompleted: false, currentScore: 0 },
        { lessonId: 10, level: 1, title: "Bài 10: 我能坐这儿吗 — Tôi có thể ngồi đây không", isCompleted: false, currentScore: 0 },
        { lessonId: 11, level: 1, title: "Bài 11: 现在几点 — Bây giờ mấy giờ", isCompleted: false, currentScore: 0 },
        { lessonId: 12, level: 1, title: "Bài 12: 明天天气怎么样 — Ngày mai thời tiết thế nào", isCompleted: false, currentScore: 0 },
        { lessonId: 13, level: 1, title: "Bài 13: 他在学做中国菜呢 — Anh ấy đang học nấu ăn", isCompleted: false, currentScore: 0 },
        { lessonId: 14, level: 1, title: "Bài 14: 她买了不少衣服 — Cô ấy mua không ít quần áo", isCompleted: false, currentScore: 0 },
        { lessonId: 15, level: 1, title: "Bài 15: 我是坐飞机来的 — Tôi đi máy bay đến", isCompleted: false, currentScore: 0 },
        
        // HSK 2 (Bài 16 - 30)
        { lessonId: 16, level: 2, title: "Bài 16 (H2-B1): 九月去北京旅游 tốt nhất", isCompleted: false, currentScore: 0 },
        { lessonId: 17, level: 2, title: "Bài 17 (H2-B2): 我每天六点起床", isCompleted: false, currentScore: 0 },
        { lessonId: 18, level: 2, title: "Bài 18 (H2-B3): 左边那个红色的是我的", isCompleted: false, currentScore: 0 },
        { lessonId: 19, level: 2, title: "Bài 19 (H2-B4): 这个工作是他帮 me", isCompleted: false, currentScore: 0 },
        { lessonId: 20, level: 2, title: "Bài 20 (H2-B5): 可以这儿写你的名字", isCompleted: false, currentScore: 0 },
        { lessonId: 21, level: 2, title: "Bài 21 (H2-B6): 你怎么不吃了", isCompleted: false, currentScore: 0 },
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
        { lessonId: 35, level: 3, title: "Bài 35 (H3-B5): 我最近买了一辆新车", isCompleted: false, currentScore: 0 },
        { lessonId: 36, level: 3, title: "Bài 36 (H3-B6): 怎么突然变冷了", isCompleted: false, currentScore: 0 },
        { lessonId: 37, level: 3, title: "Bài 37 (H3-B7): 我跟他一样高", isCompleted: false, currentScore: 0 },
        { lessonId: 38, level: 3, title: "Bài 38 (H3-B8): 这里的变化真大", isCompleted: false, currentScore: 0 },
        { lessonId: 39, level: 3, title: "Bài 39 (H3-B9): 她的汉语越来越好", isCompleted: false, currentScore: 0 },
        { lessonId: 40, level: 3, title: "Bài 40 (H3-B10): 数学考试难 không", isCompleted: false, currentScore: 0 },
        { lessonId: 41, level: 3, title: "Bài 41 (H3-B11): 别着急，慢慢来", isCompleted: false, currentScore: 0 },
        { lessonId: 42, level: 3, title: "Bài 42 (H3-B12): 把书放在桌子上", isCompleted: false, currentScore: 0 },
        { lessonId: 43, level: 3, title: "Bài 43 (H3-B13): 我习惯了这里的生活", isCompleted: false, currentScore: 0 },
        { lessonId: 44, level: 3, title: "Bài 44 (H3-B14): 请再检查一下账单", isCompleted: false, currentScore: 0 },
        { lessonId: 45, level: 3, title: "Bài 45 (H3-B15): 终于把问题解决了", isCompleted: false, currentScore: 0 }
    ];

    const savedProgress = localStorage.getItem('hskpro_translation_progress_v1');
    if (savedProgress) {
        try {
            const parsed = JSON.parse(savedProgress);
            const savedMap = new Map(parsed.map(item => [item.lessonId, item]));
            
            let mergedList = [];
            let hasChanges = false;
            
            defaultList.forEach(defaultItem => {
                if (savedMap.has(defaultItem.lessonId)) {
                    const savedItem = savedMap.get(defaultItem.lessonId);
                    let updatedLevel = savedItem.level;
                    
                    // Khắc phục việc thiếu level của dữ liệu cũ
                    if (updatedLevel === undefined || updatedLevel === null) {
                        updatedLevel = defaultItem.level;
                        hasChanges = true;
                    }
                    
                    mergedList.push({
                        ...savedItem,
                        level: updatedLevel,
                        title: savedItem.title || defaultItem.title
                    });
                } else {
                    // Thêm bài mới (ví dụ các bài HSK 2 và HSK 3) chưa có trong localStorage của user
                    mergedList.push(defaultItem);
                    hasChanges = true;
                }
            });

            // Sắp xếp lại danh sách theo đúng thứ tự bài học
            mergedList.sort((a, b) => a.lessonId - b.lessonId);
            setTranslationProgress(mergedList);
            
            if (hasChanges) {
                localStorage.setItem('hskpro_translation_progress_v1', JSON.stringify(mergedList));
            }
        } catch (e) {
            console.error("Lỗi đồng bộ dữ liệu tiến trình dịch:", e);
            setTranslationProgress(defaultList);
            localStorage.setItem('hskpro_translation_progress_v1', JSON.stringify(defaultList));
        }
    } else {
        setTranslationProgress(defaultList);
        localStorage.setItem('hskpro_translation_progress_v1', JSON.stringify(defaultList));
    }
}, []);

// Xử lý khi người dùng tương tác thay đổi checkbox hoàn thành trực tiếp trên Dashboard
    const handleToggleLesson = (lessonId) => {
        const updated = translationProgress.map(item => {
            if (item.lessonId === lessonId) {
                return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
        });
        setTranslationProgress(updated);
        localStorage.setItem('hskpro_translation_progress_v1', JSON.stringify(updated));
    };

    // Logic thống kê tiến trình các cấp độ HSK (Đảm bảo an toàn không bị lỗi Reference)
    const levelStats = useMemoOverview(() => {
        let totalMastered = 0;
        let totalLearning = 0;
        let totalUnlearned = 0;
        let totalWordsAllLevels = 0;

        // Lấy từ vựng fallback an toàn từ window hoặc từ biến toàn cục khác
        const vocabSource = typeof window !== 'undefined' && window.FALLBACK_VOCABULARY 
            ? window.FALLBACK_VOCABULARY 
            : (typeof FALLBACK_VOCABULARY !== 'undefined' ? FALLBACK_VOCABULARY : {});

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

    // Dữ liệu 12 bộ thủ cốt lõi HSK 1 - ĐÃ LOẠI BỎ TOÀN BỘ TRÙNG LẶP & SỬA LỖI CHÍNH TẢ
    const coreRadicals = useMemoOverview(() => {
        return window.hskProData?.coreRadicals || [
            { radical: "亻", name: "Nhân đứng", meaning: "Con người, danh xưng", examples: "你 (bạn), 他 (anh ấy)", tip: "Liên quan đến danh xưng, đại từ hoặc hành vi con người." },
            { radical: "女", name: "Nữ", meaning: "Phụ nữ, phái đẹp", examples: "她 (cô ấy), 好 (tốt)", tip: "Người phụ nữ bế đứa con (子) bên cạnh biểu thị điềm lành, tốt đẹp." },
            { radical: "口", name: "Khẩu", meaning: "Cái miệng, ăn nói", examples: "叫 (gọi), 吃 (ăn)", tip: "Biểu diễn các hành động phát ra hoặc liên quan trực tiếp đến miệng." },
            { radical: "日", name: "Nhật", meaning: "Mặt trời, ngày", examples: "明 (sáng), 时 (giờ)", tip: "Liên quan đến thời gian, lịch trình, dòng chảy ngày đêm." },
            { radical: "氵", name: "Ba chấm thủy", meaning: "Nước, chất lỏng", examples: "没 (không có), 汉 (Hán)", tip: "Hình dáng ba giọt nước bắn ra, chỉ chất lỏng hoặc các khái niệm sông ngòi." },
            { radical: "宀", name: "Miên", meaning: "Mái nhà, mái che", examples: "家 (nhà), 字 (chữ Hán)", tip: "Hình ảnh mái nhà có ống khói dùng che chở cho con người, thế hệ bên dưới." },
            { radical: "辶", name: "Sước", meaning: "Bước dài, di chuyển", examples: "这 (đây), 进 (vào)", tip: "Liên quan đến hành trình di chuyển, phương hướng, khoảng cách." },
            { radical: "木", name: "Mộc", meaning: "Cây cối, gỗ giuộc", examples: "杯 (cái cốc), 桌 (cái bàn)", tip: "Vẽ hình cây có rễ lá; dùng cho đồ vật vốn chế tác từ gỗ tự nhiên." },
            { radical: "饣", name: "Thực", meaning: "Ăn uống, thực phẩm", examples: "饭 (cơm), 馆 (quán ăn)", tip: "Hình nắp đậy trên nồi thức ăn nóng hổi, chỉ hành vi ăn uống và lương thực." },
            { radical: "讠", name: "Ngôn", meaning: "Ngôn ngữ, lời nói", examples: "语 (ngôn ngữ), 谢 (cảm ơn)", tip: "Biểu thị lời nói phát ra mang tính lễ nghi, giao tiếp ngôn từ." },
            { radical: "纟", name: "Mịch", meaning: "Sợi tơ, vải vóc", examples: "红 (màu đỏ), 绍 (giới thiệu)", tip: "Hình cuộn chỉ dệt tơ lằm thắt nút, chỉ may mặc hay sắc màu nhuộm." },
            { radical: "父", name: "Phụ", meaning: "Người cha, bề trên", examples: "爸爸 (bố)", tip: "Hình ảnh người cha cầm hai chiếc gậy quyền lực răn dạy con cái thuở xưa." },
            { radical: "忄", name: "Tâm đứng", meaning: "Tình cảm, cảm xúc", examples: "慢 (chậm), 懒 (lười biếng)", tip: "Trái tim dựng đứng, thể hiện thế giới nội tâm, trạng thái tâm lý sâu kín." },
            { radical: "目", name: "Mục", meaning: "Con mắt, tầm nhìn", examples: "睛 (mắt), 眼 (mắt)", tip: "Hình vẽ con mắt nằm ngang ngày xưa, nay được dựng dọc để tiết kiệm không gian viết." },
            { radical: "足", name: "Túc", meaning: "Cơ thể chân, chạy nhảy", examples: "跑 (chạy), 路 (đường)", tip: "Hình ảnh phần đùi gối và bàn chân đang nâng bước vận động thể thao." },
            { radical: "疒", name: "Nạch", meaning: "Ốm đau, bệnh tật", examples: "病 (bệnh), 疼 (đau đớn)", tip: "Hình người bệnh suy nhược đang tựa nghiêng vào thành giường cứu chữa." }
        ];
    }, []);

    // Lọc danh sách bài tập dịch theo cấp độ được chọn (Hỗ trợ fallback tự tính toán cấp độ an toàn)
    const filteredTranslation = useMemoOverview(() => {
        if (selectedTranslationLevel === 'all') return translationProgress;
        return translationProgress.filter(item => {
            // Lấy level có sẵn từ item, nếu thiếu sẽ tự động phân tách theo lessonId
            const itemLevel = item.level || (item.lessonId <= 15 ? 1 : item.lessonId <= 30 ? 2 : 3);
            return itemLevel === Number(selectedTranslationLevel);
        });
    }, [translationProgress, selectedTranslationLevel]);

    const handleLevelSelect = (levelNum) => {
        if (typeof onSwitchLevel === 'function') {
            onSwitchLevel(levelNum);
        }
        if (typeof onSwitchTab === 'function') {
            onSwitchTab('dictionary');
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

            {/* BẢNG THEO DÕI TIẾN ĐỘ LUYỆN DỊCH (Hỗ trợ lọc HSK 1, HSK 2, HSK 3 mượt mà) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-tasks text-emerald-600"></i> Vở Bài Tập Luyện Dịch HSK (Tổng số {translationProgress.length} Bài)
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Học dịch chuyên sâu kèm hệ thống ngữ pháp và bộ thủ hỗ trợ thực hành.</p>
                    </div>
                    
                    {/* Thanh lọc cấp độ dịch cải tiến */}
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

                {/* Grid danh sách bài tập gọn nhẹ */}
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

            {/* CẨM NANG BỘ THỦ CHỮ HÁN CỐT LÕI */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <i className="fas fa-book-open text-indigo-600"></i> Cẩm nang 16 Bộ thủ chữ Hán cốt lõi HSK
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Mẹo tư duy và liên tưởng hình ảnh để lưu giữ mặt chữ sâu sắc và lâu bền nhất.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {coreRadicals.map((item, index) => (
                        <div 
                            key={index} 
                            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-950 transition duration-300 flex flex-col justify-between space-y-2.5"
                        >
                            <div>
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
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
                </div>
            </div>
        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.OverviewTab = OverviewTab;