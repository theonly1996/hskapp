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

    // Các trạng thái mới phục vụ tính năng Bộ thủ nâng cao
    const [showRadicals, setShowRadicals] = useStateOverview(false); // Mặc định thu gọn bộ thủ
    const [selectedRadicalLevel, setSelectedRadicalLevel] = useStateOverview('all'); // Bộ lọc cấp độ bộ thủ: 'all' hoặc 1-6
    const [radicalSearchQuery, setRadicalSearchQuery] = useStateOverview(""); // Thanh tìm kiếm bộ thủ

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
            { lessonId: 15, level: 1, title: "Bài 15: 我我是坐飞机来的 — Tôi đi máy bay đến", isCompleted: false, currentScore: 0 },
            
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

    // Dữ liệu bộ thủ cốt lõi HSK kèm thuật toán phân bổ mượt mà theo cấp độ HSK 1 - 6
    const coreRadicals = useMemoOverview(() => {
        const rawList = window.hskProData?.coreRadicals || [
            { radical: "人 (亻)", name: "Nhân (Nhân đứng)", meaning: "Con người", examples: "你 (bạn), 他 (anh ấy), 们 (chúng tôi)", tip: "Liên quan đến danh xưng, đại từ, hành vi hoặc tính chất của con người." },
            { radical: "口", name: "Khẩu", meaning: "Cái miệng", examples: "吃 (ăn), 喝 (uống), 叫 (gọi)", tip: "Liên quan đến ăn uống, nói năng, phát âm hoặc các hành động dùng miệng." },
            { radical: "力", name: "Lực", meaning: "Sức lực, sức mạnh", examples: "男 (con trai), 办 (làm), 动 (động/chuyển)", tip: "Liên quan đến cơ bắp, dùng sức, lao động hoặc khả năng hành động." },
            { radical: "女", name: "Nữ", meaning: "Phụ nữ, phái yếu", examples: "妈 (mẹ), 姐 (chị), 好 (tốt)", tip: "Liên quan đến người phụ nữ, mối quan hệ họ hàng hoặc tính cách." },
            { radical: "子", name: "Tử", meaning: "Con cái, đứa trẻ", examples: "学 (học), 字 (chữ), 孩 (trẻ con)", tip: "Liên quan đến trẻ con, thế hệ sau hoặc các khái niệm cốt lõi sơ khai." },
            { radical: "日", name: "Nhật", meaning: "Mặt trời, ngày/thời gian", examples: "时 (thời gian), 明 (sáng), 昨 (hôm qua)", tip: "Liên quan đến thời gian, ban ngày, thời tiết hoặc ánh sáng." },
            { radical: "月", name: "Nguyệt / Nhục", meaning: "Mặt trăng / Xác thịt", examples: "明 (sáng), 脸 (khuôn mặt), 脚 (chân)", tip: "Có 2 nghĩa: liên quan đến thời gian/ánh trăng HOẶC bộ phận cơ thể người (biến thể của bộ Nhục)." },
            { radical: "木", name: "Mộc", meaning: "Cây cối, gỗ", examples: "样 (hình dáng), 机 (máy móc), 桌 (bàn)", tip: "Liên quan đến thực vật, cây cối hoặc các đồ vật bằng chất liệu gỗ." },
            { radical: "氵 (水)", name: "Thủy (Ba chấm thủy)", meaning: "Nước, chất lỏng", examples: "没 (không), 汉 (Hán), 海 (biển)", tip: "Liên quan đến sông hồ, chất lỏng hoặc các trạng thái liên quan đến nước." },
            { radical: "火 (灬)", name: "Hỏa", meaning: "Lửa, nhiệt độ", examples: "点 (giờ/chút), 热 (nóng), 烧 (đốt)", tip: "Liên quan đến lửa, nhiệt độ cao, nấu nướng hoặc năng lượng." },
            { radical: "土", name: "Thổ", meaning: "Đất đai, mặt đất", examples: "在 (ở), 地 (đất), 块 (miếng/đồng)", tip: "Liên quan đến đất đai, xây dựng, địa điểm hoặc các chất liệu từ đất." },
            { radical: "艹", name: "Thảo (Bộ đầu thảo)", meaning: "Cỏ, thực vật nhỏ", examples: "茶 (trà), 菜 (rau/món ăn), 草 (cỏ)", tip: "Liên quan đến các loại hoa cỏ, rau củ, thực vật thân mềm hoặc thảo dược." },
            { radical: "辶", name: "Sước", meaning: "Bước dài, di chuyển", examples: "这 (này), 进 (vào), 远 (xa)", tip: "Liên quan đến đường sá, hành động đi lại, di chuyển hoặc khoảng cách." },
            { radical: "宀", name: "Miên (Bộ mái nhà)", meaning: "Mái nhà, nhà cửa", examples: "家 (nhà), 安 (an toàn), 室 (phòng)", tip: "Liên quan đến nhà ở, công trình xây dựng, nơi trú ẩn hoặc trạng thái tĩnh lặng trong nhà." },
            { radical: "讠 (言)", name: "Ngôn", meaning: "Lời nói, ngôn ngữ", examples: "说 (nói), 语 (ngôn ngữ), 请 (mời)", tip: "Liên quan đến lời nói, giao tiếp, chữ nghĩa hoặc bàn luận." },
            { radical: "手 (扌)", name: "Thủ (Tay gảy)", meaning: "Cái tay, hành động của tay", examples: "打 (đánh/gọi điện), 找 (tìm), 提 (nhắc đến)", tip: "Liên quan đến các hành động vật lý do bàn tay thực hiện." },
            { radical: "心 (忄)", name: "Tâm (Tâm đứng)", meaning: "Con tim, tình cảm", examples: "想 (nghĩ/muốn), 怕 (sợ), 快 (nhanh/vui vẻ)", tip: "Liên quan đến cảm xúc, tâm trạng, tư duy hoặc trạng thái tâm lý." },
            { radical: "囗", name: "Vi", meaning: "Vây quanh, bao bọc", examples: "国 (nước), 回 (về), 因 (vì)", tip: "Thường tạo thành khung bao quanh chữ, biểu thị ranh giới, khu vực đóng kín." },
            { radical: "大", name: "Đại", meaning: "To lớn", examples: "太 (quá), 天 (trời), 因 (vì)", tip: "Liên quan đến kích thước to lớn, không gian bao la hoặc vị thế cao." },
            { radical: "饣 (食)", name: "Thực", meaning: "Đồ ăn, ẩm thực", examples: "饭 (cơm), 饱 (no), 馆 (quán ăn)", tip: "Liên quan trực tiếp đến thức ăn, việc ăn uống hoặc địa điểm ăn uống." },
            { radical: "纟 (糸)", name: "Mịch", meaning: "Sợi tơ, vải vóc", examples: "红 (đỏ), 绿 (xanh), 给 (cho)", tip: "Liên quan đến tơ lụa, dây rợ, màu sắc dệt nhuộm hoặc sự kết nối." },
            { radical: "钅 (金)", name: "Kim", meaning: "Kim loại, tiền bạc", examples: "钱 (tiền), 错 (sai), 钟 (đồng hồ)", tip: "Liên quan đến kim loại, vàng bạc, tiền tệ hoặc các dụng cụ sắc bén." },
            { radical: "𧾷 (足)", name: "Túc", meaning: "Cái chân", examples: "路 (đường), 跳 (nhảy), 跑 (chạy)", tip: "Liên quan đến đôi chân hoặc các hành động đi, chạy, nhảy, di chuyển bằng chân." },
            { radical: "目", name: "Mục", meaning: "Mắt, thị giác", examples: "看 (nhìn), 眼 (mắt), 睡 (ngủ)", tip: "Liên quan đến đôi mắt, cái nhìn hoặc các trạng thái sinh lý của mắt." },
            { radical: "禾", name: "Hòa", meaning: "Lúa miến, cây lương thực", examples: "和 (và), 秋 (mùa thu), 科 (khoa học)", tip: "Liên quan đến nông nghiệp, cây lúa, ngũ cốc hoặc thu hoạch." },
            { radical: "⺮ (竹)", name: "Trúc", meaning: "Cây tre, trúc", examples: "笔 (bút), 等 (đợi), 答 (trả lời)", tip: "Liên quan đến tre trúc hoặc các đồ vật cổ xưa được làm từ tre (như thẻ tre, bút lông)." },
            { radical: "犭 (犬)", name: "Khuyển", meaning: "Con chó, thú bốn chân", examples: "狗 (chó), 猫 (mèo), 猪 (heo)", tip: "Thường xuất hiện trong tên gọi hoặc đặc tính của các loài động vật có vú." },
            { radical: "贝", name: "Bối", meaning: "Con sò, tiền của", examples: "贵 (đắt), 员 (nhân viên), 货 (hàng hóa)", tip: "Thời cổ dùng vỏ sò làm tiền, nên bộ này liên quan đến tài chính, giá trị, của cải." },
            { radical: "车", name: "Xa", meaning: "Xe cộ, phương tiện", examples: "辆 (chiếc xe), 输 (thua/vận chuyển), 轮 (bánh xe)", tip: "Liên quan đến các loại phương tiện giao thông đường bộ hoặc cơ cấu bánh xe." },
            { radical: "门", name: "Môn", meaning: "Cửa ra vào", examples: "问 (hỏi), 间 (phòng/giữa), 闭 (đóng)", tip: "Liên quan đến cửa, không gian, phòng ốc hoặc hành động đóng/mở." },
            { radical: "阝 (左)", name: "Phụ (Phụ trái)", meaning: "Gò đất, bờ dốc", examples: "阳 (mặt trời), 院 (cái sân), 阴 (âm u)", tip: "Nằm bên TRÁI chữ. Liên quan đến địa hình gò đất, bậc thang hoặc sự che khuất." },
            { radical: "阝 (右)", name: "Ấp (Ấp phải)", meaning: "Vùng đất, thành thị", examples: "那 (kia), 邮 (bưu điện), 郊 (ngoại ô)", tip: "Nằm bên PHẢI chữ. Liên quan đến địa danh, đất phong, thành trì hoặc khu vực hành chính." },
            { radical: "又", name: "Hựu", meaning: "Lại một lần nữa", examples: "双 (đôi/cặp), 欢 (vui vẻ), 难 (khó)", tip: "Biểu thị hành động lặp lại, hoặc hình ảnh bàn tay đang nắm bắt vật gì đó." },
            { radical: "戈", name: "Qua", meaning: "Cây mác, binh khí", examples: "我 (tôi), 或 (hoặc), 战 (chiến tranh)", tip: "Liên quan đến vũ khí cổ đại, chiến tranh, xung đột hoặc phòng thủ." },
            { radical: "巾", name: "Cân", meaning: "Khăn vải", examples: "帮 (giúp), 常 (thường), 带 (mang theo)", tip: "Liên quan đến vải vóc, khăn Lau, mũ áo hoặc các vật dụng bằng vải." },
            { radical: "广", name: "Quảng", meaning: "Mái nhà rộng, tòa nhà", examples: "店 (cửa hàng), 府 (phủ tể tướng), 底 (đáy)", tip: "Liên quan đến các công trình kiến trúc lớn, tòa nhà công cộng hoặc không gian rộng." },
            { radical: "厂", name: "Hán", meaning: "Sườn núi, nhà xưởng", examples: "医 (y tế), 历 (lịch sử), 厅 (phòng lớn)", tip: "Liên quan đến sườn núi đá cheo leo hoặc các khu nhà xưởng, công sở rộng rãi." },
            { radical: "疒", name: "Nạch", meaning: "Tật bệnh, ốm đau", examples: "病 (bệnh), 疼 (đau), 瘦 (gầy)", tip: "Liên quan đến các loại bệnh tật, triệu chứng đau đớn hoặc trạng thái sức khỏe yếu." },
            { radical: "礻 (示)", name: "Thị", meaning: "Thần linh, chúc tụng", examples: "祝 (chúc mừng), 票 (vé), 礼 (lễ nghĩa)", tip: "Liên quan đến các hoạt động tế lễ, thần linh, tổ tiên hoặc điềm báo cát hung." },
            { radical: "衣 (衤)", name: "Y (Ý nghĩa y phục)", meaning: "Quần áo, trang phục", examples: "衬 (áo sơ mi), 衫 (áo vạt ngắn), 被 (chăn)", tip: "Liên quan đến may mặc, các loại quần áo, vải trải giường hoặc mặc đồ." },
            { radical: "页", name: "Hiệt", meaning: "Trang giấy, đầu người", examples: "题 (đề tài), 颜 (màu sắc/mặt), 顺 (thuận)", tip: "Liên quan đến đầu, mặt hoặc các trang sổ sách, thứ tự." },
            { radical: "鸟", name: "Điểu", meaning: "Con chim", examples: "鸡 (con gà), 鸭 (con vịt), 鸣 (chim hót)", tip: "Liên quan đến các loài chim, gia cầm có lông vũ và biết bay (hoặc chạy)." },
            { radical: "隹", name: "Chuy", meaning: "Chim đuôi ngắn", examples: "难 (khó), 准 (chuẩn bị), 谁 (ai)", tip: "Thường xuất hiện trong tên các loài chim cổ hoặc các từ có âm đọc, ý nghĩa biến đổi." },
            { radical: "雨", name: "Vũ", meaning: "Mưa, thời tiết", examples: "雪 (tuyết), 零 (số 0/mưa nhỏ), 雷 (sấm)", tip: "Liên quan đến các hiện tượng khí tượng, thời tiết rơi từ trên trời xuống." },
            { radical: "马", name: "Mã", meaning: "Con ngựa", examples: "骑 (cưỡi), 验 (kiểm tra), 骗 (lừa đảo)", tip: "Liên quan đến ngựa, việc cưỡi ngựa, vận chuyển hoặc tốc độ." },
            { radical: "方", name: "Phương", meaning: "Phương hướng, hình vuông", examples: "放 (đặt/buông), 旅 (du lịch), 旁 (bên cạnh)", tip: "Liên quan đến vị trí, phương hướng, không gian hoặc các hành động có định hướng." },
            { radical: "斤", name: "Cân", meaning: "Cái rìu, đơn vị đo", examples: "新 (mới), 听 (nghe), 断 (đứt)", tip: "Liên quan đến công cụ chặt đẽo (rìu) hoặc hành động phân chia, đo lường." },
            { radical: "欠", name: "Khiếm", meaning: "Thiếu thốn, há miệng", examples: "次 (lần), 欢 (vui vẻ), 歌 (bài hát)", tip: "Hình ảnh người há miệng thở (ngáp), liên quan đến âm thanh phát ra từ miệng hoặc sự thiếu hụt." },
            { radical: "止", name: "Chỉ", meaning: "Dừng lại", examples: "正 (đúng/thẳng), 此 (này), 步 (bước đi)", tip: "Hình bàn chân giẫm xuống đất, liên quan đến tư thế đứng, dừng lại hoặc bước đi." },
            { radical: "歹", name: "Đãi", meaning: "Xương tàn, xấu xa", examples: "死 (chết), 残 (tàn tật), 殃 (tai ương)", tip: "Liên quan đến cái chết, sự suy tàn, tổn hại hoặc những điều không may mắn." },
            { radical: "殳", name: "Thù", meaning: "Binh khí dài, gậy gộc", examples: "段 (đoạn), 毅 (kiên nghị), 毁 (hủy hoại)", tip: "Liên quan đến các hành động dùng gậy gộc, công cụ đập, đánh hoặc tác động mạnh." },
            { radical: "比", name: "Tỷ", meaning: "So sánh, liền kề", examples: "毕 (hoàn thành), 毖 (cẩn trọng), 毗 (liền kề)", tip: "Hình ảnh hai người đứng cạnh nhau, liên quan đến so sánh, xếp hàng hoặc gần gũi." },
            { radical: "毛", name: "Mao", meaning: "Lông, tóc", examples: "毯 (cái chăn lông), 毫 (lông tơ/chút ít), 尾 (cái đuôi)", tip: "Liên quan đến lông động vật, tóc, các sản phẩm dệt bằng lông hoặc sợi nhỏ." },
            { radical: "气", name: "Khí", meaning: "Hơi nước, không khí", examples: "汽 (hơi nước), 氛 (bầu không khí), 氧 (khí oxy)", tip: "Liên quan đến các chất khí, hơi nước, thời tiết hoặc năng lượng vô hình." },
            { radical: "片", name: "Phiến", meaning: "Mảnh, lát mỏng", examples: "版 (phiên bản), 牌 (tấm biển/bài), 牍 (thẻ tre)", tip: "Liên quan đến các vật thể có hình dáng phẳng, mỏng được xẻ ra từ thân gỗ." },
            { radical: "牛 (牜)", name: "Ngưu", meaning: "Con trâu, con bò", examples: "物 (vạn vật), 特 (đặc biệt), 牲 (gia súc)", tip: "Liên quan đến trâu bò, các loài gia súc lớn hoặc vật hiến tế thời xưa." },
            { radical: "王 (玉)", name: "Vương / Ngọc", meaning: "Vua / Viên ngọc", examples: "玩 (chơi), 班 (lớp học), 理 (quản lý)", tip: "Chữ viết thường bỏ dấu chấm thành bộ Vương. Liên quan đến trân bảo, ngọc quý hoặc sự quý phái." },
            { radical: "瓜", name: "Qua", meaning: "Quả dưa", examples: "瓢 (gáo dừa), 瓣 (cánh hoa/múi dưa), 瓜 (dưa)", tip: "Liên quan đến các loại quả họ dưa, bầu, bí hoặc cây dây leo có quả to." },
            { radical: "瓦", name: "Ngõa", meaning: "Ngói, đồ gốm nung", examples: "瓶 (cái bình), 瓷 (đồ sứ), 瓮 (cái lu)", tip: "Liên quan đến ngói lợp nhà hoặc các vật dụng bằng đất nung, gốm sứ." },
            { radical: "甘", name: "Cam", meaning: "Ngọt, tự nguyện", examples: "甜 (ngọt), 甚 (rất), 某 (ai đó)", tip: "Biểu thị hương vị ngọt ngào hoặc trạng thái vừa lòng, cam tâm tình nguyện." },
            { radical: "生", name: "Sinh", meaning: "Sinh đẻ, sống", examples: "产 (sản xuất), 甥 (cháu ngoại), 甦 (tỉnh lại)", tip: "Liên quan đến sự sống, sinh sản, phát triển hoặc sự xuất hiện mới." },
            { radical: "用", name: "Dụng", meaning: "Sử dụng, dùng", examples: "甫 (vừa mới), 甭 (không cần), 甩 (quăng/ném)", tip: "Biểu thị công cụ, phương pháp hoặc hành động đem một vật vào sử dụng." },
            { radical: "田", name: "Điền", meaning: "Ruộng đất", examples: "男 (nam giới), 界 (ranh giới), 留 (ở lại)", tip: "Hình mảnh ruộng phân ô, liên quan đến canh tác, đất đai hoặc ranh giới." },
            { radical: "白", name: "Bạch", meaning: "Màu trắng, rõ ràng", examples: "百 (một trăm), 的 (của), 皆 (đều)", tip: "Liên quan đến màu trắng, sự trong sạch, rõ ràng hoặc hành động nói rõ (như thanh minh)." },
            { radical: "皮", name: "Bì", meaning: "Da thuộc, vỏ ngoài", examples: "皱 (nếp nhăn), 皴 (da nứt nẻ), 皸 (nứt da)", tip: "Liên quan đến da người, da động vật hoặc lớp vỏ ngoài cùng của cây cối, hoa quả." },
            { radical: "皿", name: "Mãnh", meaning: "Bát đĩa, đồ đựng", examples: "盘 (cái đĩa), 盒 (cái hộp), 盐 (muối)", tip: "Liên quan đến các loại đồ dùng gia đình dùng để đựng thức ăn, chất lỏng." },
            { radical: "矢", name: "Thất", meaning: "Mũi tên", examples: "短 (ngắn), 矮 (thấp), 矫 (sửa cho thẳng)", tip: "Mũi tên có chiều dài cố định, nên thường liên quan đến đo lường kích thước (ngắn, thấp)." },
            { radical: "石", name: "Thạch", meaning: "Đá, thạch", examples: "研 (nghiên cứu), 破 (rách/vỡ), 码 (mã số/bến tàu)", tip: "Liên quan đến đất đá, khoáng vật, độ cứng hoặc các công cụ làm bằng đá." },
            { radical: "立", name: "Lập", meaning: "Đứng thẳng, thiết lập", examples: "站 (trạm/đứng), 章 (chương), 端 (đoan chính)", tip: "Liên quan đến tư thế đứng thẳng, sự vững chãi hoặc bắt đầu thiết lập một cái gì đó." },
            { radical: "龙", name: "Long", meaning: "Con rồng", examples: "龚 (họ Cung), 袭 (tập kích), 笼 (cái lồng)", tip: "Liên quan đến rồng, các hiện tượng tâm linh hoặc có vai trò làm thành phần biểu âm." },
            { radical: "矛", name: "Mâu", meaning: "Cây giáo, cây mâu", examples: "柔 (mềm mại), 矜 (tự cao), 矛 (mâu thuẫn)", tip: "Vũ khí mũi nhọn tầm xa cổ đại, liên quan đến tấn công hoặc thế đâm." },
            { radical: "网 (罒)", name: "Võng", meaning: "Cái lưới", examples: "罗 (la bàn/dăng lưới), 罚 (phạt), 罢 (bãi bỏ)", tip: "Hình cái lưới chim, lưới cá, liên quan đến vây bắt, pháp luật hoặc tội phạm." },
            { radical: "羊", name: "Dương", meaning: "Con dê, cừu", examples: "美 (đẹp), 差 (kém), 着 (đạt được)", tip: "Người xưa coi dê là biểu tượng của sự may mắn, tốt lành, nên liên quan đến cái đẹp, ẩm thực." },
            { radical: "羽", name: "Vũ", meaning: "Lông vũ, cánh chim", examples: "习 (học tập/thói quen), 翻 (lật/dịch), 翠 (màu xanh ngọc)", tip: "Liên quan đến lông chim, đôi cánh hoặc hành động bay lượn." },
            { radical: "老", name: "Lão", meaning: "Già cả", examples: "考 (thi cử), 者 (người), 耄 (già thọ)", tip: "Liên quan đến người cao tuổi, sự tôn kính, tuổi tác hoặc kinh nghiệm." },
            { radical: "而", name: "Nhi", meaning: "Râu cằm, nối từ", examples: "耐 (nhẫn nại), 耍 (chơi đùa), 端 (đoan chính)", tip: "Hình sợi râu dưới cằm, thời nay chủ yếu dùng làm liên từ kết nối trong ngữ pháp." },
            { radical: "耒", name: "Lỗi", meaning: "Cái cày", examples: "耕 (cày ruộng), 耗 (hao tốn), 耘 (làm cỏ)", tip: "Công cụ làm đất nông nghiệp nông thôn thời cổ, liên quan đến trồng trọt, canh tác." },
            { radical: "耳", name: "Nhĩ", meaning: "Cái tai", examples: "听 (nghe), 聪 (thông minh), 联 (liên kết)", tip: "Liên quan đến tai, thính giác, hành động nghe hoặc sự thấu hiểu." },
            { radical: "聿", name: "Duật", meaning: "Cây bút", examples: "sù (túc/kính cẩn), 律 (luật pháp), 建 (xây dựng)", tip: "Tay cầm cây bút lông viết chữ, liên quan đến luật lệ, ghi chép hoặc văn bản chỉ thị." },
            { radical: "自", name: "Tự", meaning: "Bản thân, cái mũi", examples: "臭 (thối), 臬 (tiêu chuẩn), 自 (tự mình)", tip: "Hình cái mũi (người xưa chỉ vào mũi để nói về mình), liên quan đến bản thân hoặc khứu giác." },
            { radical: "至", name: "Chí", meaning: "Đến, đỉnh điểm", examples: "致 (đạt đến), 台 (đài/bệ), 屋 (nhà)", tip: "Hình mũi tên cắm xuống đất, biểu thị hành động đi đến đích hoặc đạt mức tối đa." },
            { radical: "臼", name: "Cữu", meaning: "Cái cối giã", examples: "cù (họ Cù), 舀 (múc nước), 插 (cắm vào)", tip: "Liên quan đến các hốc lõm, cái cối hoặc các thao tác giã, múc, nện." },
            { radical: "舌", name: "Thiệt", meaning: "Cái lưỡi", examples: "甜 (ngọt), 乱 (loạn), 辞 (từ chức/từ điển)", tip: "Liên quan đến cái lưỡi, vị giác, liếm hoặc nói năng, biện bác." },
            { radical: "舟", name: "Chu", meaning: "Chiếc thuyền", examples: "船 (thuyền lớn), 航 (hàng hải), 般 (loại/như)", tip: "Liên quan đến thuyền bè, giao thông đường thủy hoặc việc di chuyển trên sông biển." },
            { radical: "艮", name: "Cấn", meaning: "Bền vững, quẻ Cấn", examples: "限 (giới hạn), 跟 (đi theo), 根 (rễ cây)", tip: "Nghĩa gốc là nhìn lại/bướng bỉnh, thường đóng vai trò vừa biểu nghĩa (dừng lại, giới hạn) vừa biểu âm." },
            { radical: "色", name: "Sắc", meaning: "Màu sắc, nữ sắc", examples: "艳 (sặc sỡ), 艴 (tức giận đổi màu mặt)", tip: "Liên quan đến màu sắc, vẻ bề ngoài, nét mặt hoặc biểu cảm tâm trạng." },
            { radical: "虍", name: "Hô (Vằn hổ)", meaning: "Con hổ", examples: "虎 (con hổ), 虑 (lo lắng), 虚 (hư hỏng/trống rỗng)", tip: "Liên quan đến loài hổ, sự dũng mãnh, vằn da hoặc sự lo sợ." },
            { radical: "虫", name: "Trùng", meaning: "Côn trùng, bò sát", examples: "蛋 (trứng), 虾 (tôm), 蛮 (man rợ/rất)", tip: "Thời cổ dùng cho tất cả côn trùng, rắn rết, loài bò sát hoặc cả thủy sản nhỏ." },
            { radical: "血", name: "Huyết", meaning: "Máu", examples: "nữ (chảy máu cam), 衅 (gây hấn/tế máu)", tip: "Liên quan đến máu, huyết thống, các vết thương hoặc tế lễ tâm linh." },
            { radical: "衣", name: "Y (chữ gốc)", meaning: "Quần áo", examples: "袋 (cái túi), 裁 (cắt may), 装 (trang phục)", tip: "Dạng nguyên bản của bộ 衤, thường ôm lấy phần dưới hoặc bao quanh chữ." },
            { radical: "西 (覀)", name: "Tây", meaning: "Phía tây, cái che", examples: "要 (muốn/cần), 覆 (che phủ), 栗 (cây hạt dẻ)", tip: "Hình tổ chim bay về hướng tây khi chiều tà, liên quan đến hướng tây hoặc hành động che đậy." },
            { radical: "见", name: "Kiến", meaning: "Nhìn thấy, gặp gỡ", examples: "观 (quan sát), 规 (quy tắc), 觉 (cảm thấy)", tip: "Liên quan đến hoạt động của mắt, nhận thức, quan điểm hoặc quy luật nhìn nhận." },
            { radical: "角", name: "Giác", meaning: "Sừng động vật, góc", examples: "解 (giải quyết), 触 (chạm), 嘴 (cái miệng)", tip: "Liên quan đến sừng thú, các góc cạnh vật thể, đấu tranh hoặc nhạc cụ làm từ sừng." },
            { radical: "言", name: "Ngôn (chữ gốc)", meaning: "Nói năng", examples: "誉 (danh dự), 誓 (thề nguyện), 警 (cảnh sát)", tip: "Dạng nguyên bản của bộ 讠, thường nằm ở phần dưới đáy của chữ Hán." },
            { radical: "谷", name: "Cốc", meaning: "Khe núi, thung lũng", examples: "豁 (rộng rãi), 欲 (ham muốn), 谿 (khe suối)", tip: "Liên quan đến địa hình khe núi, dòng suối chảy ra từ núi hoặc dòng nước đổ về." },
            { radical: "豆", name: "Đậu", meaning: "Hạt đậu, cái thố", examples: "短 (ngắn), 豌 (đậu Hà Lan), 豉 (tương đậu)", tip: "Thời cổ là đồ đựng thức ăn có chân cao, thời nay chủ yếu chỉ các loại cây họ đậu." },
            { radical: "豕", name: "Thỉ", meaning: "Con lợn/heo", examples: "象 (con voi), 豪 (hào kiệt/lông dài), 豫 (sẵn sàng)", tip: "Liên quan đến loài lợn hoặc các loài động vật ăn thịt, ăn tạp có thân hình dày." },
            { radical: "豸", name: "Trĩ", meaning: "Loài sâu không chân", examples: "豹 (con báo), 貌 (dung mạo), tà (mèo/hổ)", tip: "Liên quan đến các loài mãnh thú lông dài, động vật bò sát sát mặt đất." },
            { radical: "贝", name: "Bối (chữ gốc)", meaning: "Vỏ sò, tiền của", examples: "pín (nghèo), 贡 (cống nạp), 责 (trách nhiệm)", tip: "Dạng nguyên bản chữ phồn thể/cổ của bộ 贝, biểu thị tài sản và giá trị trao đổi." },
            { radical: "赤", name: "Xích", meaning: "Màu đỏ", examples: "赫 (nổi bật/đỏ rực), 赭 (màu đỏ nâu), 赧 (ngượng đỏ mặt)", tip: "Liên quan đến màu đỏ, lửa cháy rực, sự trần trụi hoặc biểu cảm xấu hổ đỏ mặt." },
            { radical: "走", name: "Tẩu", meaning: "Đi, chạy", examples: "起 (dậy), 超 (vượt qua), 赶 (đuổi theo)", tip: "Liên quan đến hành động đi bộ, chạy nhanh, trốn thoát hoặc vượt qua một cột mốc." },
            { radical: "刀 (刂)", name: "Đao", meaning: "Con dao, vũ khí", examples: "分 (phân chia), 切 (cắt), 利 (lợi ích)", tip: "Liên quan đến dao kéo, vũ khí sắc bén hoặc hành động cắt, gọt, phân chia." },
            { radical: "米", name: "Mễ", meaning: "Gạo, hoa màu", examples: "粉 (bột), 糖 (đường), 粗 (thô/sần sùi)", tip: "Liên quan đến các loại lương thực, ngũ cốc, tinh bột hoặc thực phẩm từ gạo." },
            { radical: "行", name: "Hành", meaning: "Đi, thi hành, lối đi", examples: "街 (con phố), 衙 (nha môn), 衔 (hàm/ngậm)", tip: "Liên quan đến đường sá, lối đi, di chuyển hoặc các địa điểm công cộng." },
            { radical: "酉", name: "Dậu", meaning: "Rượu, bình rượu", examples: "酒 (rượu), 醋 (giấm), 酸 (chua)", tip: "Liên quan đến rượu, đồ uống lên men, các chất hóa học hoặc trạng thái say sưa." },
            { radical: "身", name: "Thân", meaning: "Thân thể, mình", examples: "躺 (nằm), 躲 (trốn), 躯 (thân thể)", tip: "Liên quan trực tiếp đến vóc dáng, cơ thể người hoặc các tư thế, hành động của cơ thể." },
            { radical: "寸", name: "Thốn", meaning: "Tấc, đơn vị đo chiều dài", examples: "导 (hướng dẫn), 寻 (tìm kiếm), 寿 (tuổi thọ)", tip: "Liên quan đến quy tắc, đo lường, khoảng cách ngắn hoặc sự kiểm soát pháp lý." },
            { radical: "小", name: "Tiểu", meaning: "Nhỏ bé", examples: "少 (ít), 尖 (nhọn), 尘 (bụi bẩn)", tip: "Liên quan đến kích thước nhỏ, số lượng ít hoặc các vật thể li ti." },
            { radical: "夕", name: "Tịch", meaning: "Buổi tối, đêm muộn", examples: "外 (bên ngoài), 多 (nhiều), 夜 (ban đêm)", tip: "Liên quan đến thời gian buổi tối, ban đêm hoặc các hiện tượng trăng mờ." },
            { radical: "山", name: "Sơn", meaning: "Núi non", examples: "岁 (tuổi),島 (hòn đảo), 岭 (ngọn núi)", tip: "Liên quan đến địa hình đồi núi, đá cao hoặc các danh lam thắng cảnh tự nhiên." },
            { radical: "工", name: "Công", meaning: "Thợ, công việc, công cụ", examples: "左 (bên trái), 巧 (khéo léo), 差 (kém)", tip: "Liên quan đến lao động chân tay, kỹ nghệ, công cụ sản xuất hoặc tính chất khéo léo." },
            { radical: "己", name: "Kỷ", meaning: "Bản thân mình", examples: "已 (đã), 导 (hướng dẫn), 忌 (kiêng kỵ)", tip: "Thường đóng vai trò thành phần biểu âm hoặc liên quan đến ranh giới cá nhân." },
            { radical: "干", name: "Can", meaning: "Thiên can, cái khiên, khô ráo", examples: "平 (bằng phẳng), 年 (năm), 并 (đồng thời)", tip: "Liên quan đến công cụ phòng thủ, sự khô ráo hoặc tính chất xúc phạm, can thiệp." },
            { radical: "弓", name: "Cung", meaning: "Cái cung bắn tên", examples: "张 (tờ/mở rộng), 弹 (đạn/đánh đàn), 弯 (cong)", tip: "Liên quan đến vũ khí bắn tầm xa, hình dáng cong gập hoặc sự co giãn." },
            { radical: "彳", name: "Sách (Nhân kép)", meaning: "Bước ngắn chân trái, hành động", examples: "行 (đi), 得 (đạt được), 往 (hướng về)", tip: "Liên quan đến hành vi đi lại, đường sá hoặc các bước chuyển động ngắn." },
            { radical: "户", name: "Hộ", meaning: "Cửa một cánh, hộ gia đình", examples: "房 (căn phòng), 所 (nơi chốn), 扁 (dẹt)", tip: "Liên quan đến nhà cửa, phòng ốc hoặc đơn vị quản lý dân cư (hộ khẩu)." },
            { radical: "文", name: "Văn", meaning: "Chữ nghĩa, văn hóa", examples: "齐 (ngay ngắn), 斑 (vằn/vết)", tip: "Liên quan đến những vết hoa văn, chữ viết hoặc vẻ đẹp tri thức, học thuật." },
            { radical: "斗", name: "Đấu", meaning: "Cái đấu đong gạo, đấu thầu", examples: "料 (nguyên liệu), 斜 (nghiêng), 斡 (xoay chuyển)", tip: "Liên quan đến dụng cụ đong lường chất lỏng/hạt hoặc chòm sao Bắc Đẩu." },
            { radical: "无", name: "Vô", meaning: "Không có", examples: "既 (đã/sau khi), 抚 (vỗ về)", tip: "Biểu thị sự trống rỗng, không tồn tại hoặc đóng vai trò biểu âm trong chữ." },
            { radical: "曰", name: "Viết", meaning: "Nói rằng, rằng là", examples: "曲 (ca khúc), 更 (hơn), 最 (nhất)", tip: "Hình cái miệng hé mở có đường hơi phát ra, liên quan đến lời nói hoặc trích dẫn." },
            { radical: "毋", name: "Vô", meaning: "Chớ, đừng, không nên", examples: "每 (mỗi), 毒 (độc hại)", tip: "Biểu thị sự cấm đoán, răn đe hoặc ranh giới không được phạm vào." },
            { radical: "爪 (爫)", name: "Trảo", meaning: "Móng vuốt động vật", examples: "爬 (bò/trèo), 爵 (tước vị), 采 (hái)", tip: "Liên quan đến móng vuốt, bàn tay cào cấu hoặc hành động hái lượm từ trên cao xuống." },
            { radical: "父", name: "Phụ", meaning: "Cha, người bề trên", examples: "爸 (bố), 爷 (ông nội), 釜 (cái nồi cổ)", tip: "Liên quan đến người cha, thế hệ đi trước hoặc người đàn ông trụ cột trong gia đình." },
            { radical: "穴", name: "Huyệt", meaning: "Hang ổ, hang động", examples: "空 (trống rỗng), 穿 (mặc/xuyên qua), 突 (đột nhiên)", tip: "Liên quan đến hang đá, không gian trống rỗng, lỗ hổng hoặc sự che giấu dưới lòng đất." },
            { radical: "卜", name: "Bốc", meaning: "Xem bói", examples: "占 (chiếm lĩnh), 卡 (thẻ/kẹt), 卧 (nằm)", tip: "Hình vết nứt trên mai rùa khi nung lửa thời cổ, liên quan đến bói toán, dự đoán tương lai." },
            { radical: "卩", name: "Tiết", meaning: "Đốt tre, khuất phục", examples: "卫 (bảo vệ), 印 (ấn tượng/con dấu), 却 (nhưng)", tip: "Hình người đang quỳ gối, liên quan đến sắc lệnh, con dấu, sự phục tùng hoặc đốt tre." },
            { radical: "厶", name: "Khứ", meaning: "Riêng tư, cá nhân", examples: "参 (tham gia), 垒 (thành lũy)", tip: "Biểu thị tài sản cá nhân, tính ích kỷ hoặc góc khuất riêng tư." },
            { radical: "几", name: "Kỷ", meaning: "Ghế tựa, cái bàn nhỏ", examples: "凭 (dựa vào), 凳 (cái ghế đẩu)", tip: "Liên quan đến các loại bàn ghế nhỏ, đồ dùng kê đồ hoặc chỗ dựa lưng." },
            { radical: "凵", name: "Khảm", meaning: "Há miệng, vùng đất lõm", examples: "凶 (hung dữ), 出 (ra ngoài), 击 (đánh)", tip: "Biểu thị một cái hố sâu, cái bẫy chôn ngầm dưới đất hoặc trạng thái nguy hiểm." },
            { radical: "勹", name: "Bao", meaning: "Bao bọc, ôm lấy", examples: "包 (bao gói), 句 (câu), 勿 (chớ)", tip: "Hình người cúi ôm vật gì đó, liên quan đến bao bọc, bọc lót hoặc gói ghém." },
            { radical: "匕", name: "Chủy", meaning: "Cái thìa, con dao nhỏ", examples: "北 (phía bắc), 此 (này), 旨 (ý chỉ)", tip: "Liên quan đến chiếc thìa múc ăn hoặc hình dáng hai người đứng quay lưng vào nhau." },
            { radical: "匚", name: "Phương", meaning: "Tủ đựng, vật chứa vuông", examples: "匠 (thợ mộc), 匡 (sửa sang), 匣 (cái hộp)", tip: "Hình chiếc tủ mở lối bên phải, liên quan đến đồ chứa, thùng hộp hoặc thợ thủ công." },
            { radical: "匸", name: "Hệ", meaning: "Che đậy, giấu kín", examples: "区 (khu vực), 医 (y tế), 匿 (ẩn nấp)", tip: "Liên quan đến việc cất giấu, bảo quản đồ đạc kín đáo hoặc khu vực khép kín." },
            { radical: "十", name: "Thập", meaning: "Số mười, hoàn hảo", examples: "千 (một nghìn), 午 (buổi trưa), 升 (lên/lít)", tip: "Liên quan đến số đếm, phương hướng chữ thập hoặc sự vuông vức, hoàn thiện." },
            { radical: "儿", name: "Nhi", meaning: "Trẻ con, chân người", examples: "元 (nguyên bản), 兄 (anh trai), 光 (ánh sáng)", tip: "Hình đôi chân người đang di chuyển, thường chỉ trẻ con hoặc phần dưới cơ thể." },
            { radical: "入", name: "Nhập", meaning: "Đi vào", examples: "内 (bên trong), 全 (toàn bộ), 两 (hai)", tip: "Liên quan đến hành động tiến vào bên trong, gia nhập hoặc thu nạp." },
            { radical: "八", name: "Bát", meaning: "Số tám, phân chia", examples: "公 (công cộng), 六 (số 6), 分 (phân chia)", tip: "Hình hai nét loe ra, biểu thị sự phân tách sang hai bên, chia rẽ hoặc số 8." },
            { radical: "冂", name: "Quynh", meaning: "Vùng biên giới, hoang dã", examples: "冈 (sườn núi), 网 (cái lưới)", tip: "Biểu thị không gian trống trải xa xôi ngoài thành thành trì hoặc đường biên giới." },
            { radical: "冖", name: "Mịch", meaning: "Khăn trùm, che đậy", examples: "冗 (dư thừa), 军 (quân đội), 冠 (mũ vương miện)", tip: "Liên quan đến hành động trùm khăn lên đầu, che phủ hoặc bao che." },
            { radical: "冫", name: "Băng (Hai chấm băng)", meaning: "Nước đá, lạnh giá", examples: "冬 (mùa đông), 冰 (nước đá), 冷 (lạnh)", tip: "Liên quan đến nhiệt độ thấp, băng giá, tuyết rơi hoặc trạng thái đông cứng." },
            { radical: "士", name: "Sĩ", meaning: "Kẻ sĩ, người trí thức", examples: "声 (âm thanh), 志 (chí hướng), 装 (trang phục)", tip: "Liên quan đến nam giới có học thức, quan lại hoặc người có chuyên môn cấp cao." },
            { radical: "夂", name: "Truy", meaning: "Đi đằng sau, đi chậm", examples: "条 (sợi/chiếc), 备 (chuẩn bị)", tip: "Biểu thị hành động bước đi chậm rãi hoặc theo đuôi ở phía sau." },
            { radical: "咚 (夂/夊)", name: "Suy", meaning: "Đi chậm rề rà", examples: "复 (lặp lại), 夏 (mùa hè)", tip: "Gần giống bộ Truy, liên quan đến bước đi bị kéo lại hoặc trì trệ." },
            { radical: "尢 (尣)", name: "Uông", meaning: "Què quặt, yếu ớt", examples: "就 (chính là), 尴尬 (ngượng ngùng)", tip: "Liên quan đến dị tật ở chân, sự đi đứng không vững hoặc trạng thái khó xử." },
            { radical: "尸", name: "Thi", meaning: "Xác chết, thi thể", examples: "居 (cư trú), 屋 (căn nhà), 展 (triển lãm)", tip: "Người xưa nằm bất động như xác chết, nên liên quan đến nơi ở, ngồi nằm hoặc đại tiểu tiện." },
            { radical: "屮", name: "Triệt", meaning: "Cỏ non mới mọc", examples: "屯 (đóng quân), 𡳾 (mầm cây)", tip: "Hình mầm cây mới nhú lên khỏi mặt đất, liên quan đến sự khởi đầu hoặc sinh trưởng." },
            { radical: "川 (巛)", name: "Xuyên", meaning: "Sông ngòi, dòng chảy", examples: "州 (vùng/bang), 巡 (tuần tra)", tip: "Hình các dòng nước chảy song song, liên quan đến đường sông, dòng chảy xuôi hoặc tuần du." },
            { radical: "幺", name: "Yêu", meaning: "Nhỏ bé, mảnh mai", examples: "幻 (ảo tưởng), 幼 (nhỏ tuổi), 幽 (u tối)", tip: "Hình sợi tơ nhỏ, biểu thị kích thước cực kỳ bé nhỏ, non nớt hoặc huyền bí." },
            { radical: "廴", name: "Dẫn", meaning: "Đi dài, bước đi xa", examples: "廷 (triều đình), 建 (xây dựng), 延 (kéo dài)", tip: "Liên quan đến hành động bước đi dài, kéo dài thời gian hoặc các công trình triều đình." },
            { radical: "廾", name: "Củng", meaning: "Chắp hai tay", examples: "开 (mở), 弁 (mũ cổ), 异 (khác biệt)", tip: "Hình hai bàn tay cung kính nâng vật gì đó lên, liên quan đến lễ nghi hoặc dâng tặng." },
            { radical: "弋", name: "Dặc", meaning: "Chiếc cọc, bắn cung có dây", examples: "式 (công thức), 弑 (giết vua)", tip: "Liên quan đến cái cọc gỗ chôn đất hoặc công cụ săn bắn chim muông thời cổ." },
            { radical: "彐 (彑)", name: "Ký", meaning: "Đầu con heo/lợn", examples: "归 (trở về), 寻 (tìm kiếm), 录 (ghi chép)", tip: "Thường đóng vai trò kết cấu hình khối trong chữ phồn thể, liên quan đến cầm nắm." },
            { radical: "彡", name: "Sâm", meaning: "Lông dài, tóc, hoa văn", examples: "形 (hình dáng), 参 (tham gia), 须 (râu/cần thiết)", tip: "Liên quan đến các vệt lông động vật, tóc râu người hoặc các nét vẽ trang trí bừng sáng." },
            { radical: "支", name: "Chi", meaning: "Cành cây, chi nhánh", examples: "肢 (chi thể), 翅 (cánh chim)", tip: "Tay cầm cành cây, liên quan đến sự phân nhánh, chống đỡ hoặc các bộ phận tay chân." },
            { radical: "攴 (攵)", name: "Phộc", meaning: "Đánh khẽ, gõ nhẹ", examples: "收 (thu nhận), 放 (buông bỏ), 政 (chính trị)", tip: "Tay cầm roi gõ nhẹ thúc giục, liên quan đến giáo dục, hành chính hoặc tác động lực nhẹ." },
            { radical: "无 (旡)", name: "Ký", meaning: "Nghẹn ngào, nuốt không trôi", examples: "既 (đã/xong xuôi)", tip: "Hình người ăn no rụt cổ lại, biểu thị sự kết thúc hành động hoặc đầy ứ." },
            { radical: "氏", name: "Thị", meaning: "Họ, gia tộc", examples: "民 (người dân), 昏 (hôn mê)", tip: "Liên quan đến nguồn gốc gia đình, dòng họ hoặc tầng lớp xã hội thời cổ." },
            { radical: "气", name: "Khí", meaning: "Không khí, hơi nước", examples: "气 (không khí), 汽 (hơi nước), 氧 (oxy)", tip: "Liên quan đến chất khí, hơi ẩm, thời tiết hoặc năng lượng vô hình (phong thủy)." },
            { radical: "爻", name: "Hào", meaning: "Hào trong quẻ Kinh Dịch", examples: "爽 (sảng khoái), 尔 (ngươi/như vậy)", tip: "Hình các thanh đan chéo nhau, liên quan đến bói toán hoặc kết cấu đan lưới." },
            { radical: "爿 (丬)", name: "Tường", meaning: "Mảnh gỗ xẻ bên trái", examples: "壮 (trai tráng), 状 (trạng thái), 将 (tướng quân)", tip: "Liên quan đến giường ngủ cổ hoặc các vật dựng đứng chắc chắn làm chỗ dựa." },
            { radical: "玄", name: "Huyền", meaning: "Màu đen huyền bí", examples: "率 (tỷ lệ), 畜 (gia súc)", tip: "Liên quan đến màu sắc thâm sâu, vũ trụ bao la hoặc sự tinh diệu sâu kín." },
            { radical: "癶", name: "Bát", meaning: "Đạp chân ra hai bên", examples: "登 (trèo lên), 发 (phát triển)", tip: "Đôi bàn chân hướng ngược nhau, liên quan đến hành động leo núi, gạt bỏ hoặc giẫm đạp." },
            { radical: "疋 (⺪)", name: "Sơ", meaning: "Cái chân, sấp vải", examples: "疏 (sơ sài), 疑 (nghi ngờ)", tip: "Liên quan đến cấu trúc di chuyển của đôi chân hoặc đơn vị đo lường vải vóc cổ." },
            { radical: "禸", name: "Nhựu", meaning: "Vết chân thú lớn", examples: "禹 (vua Vũ), 离 (rời khỏi)", tip: "Liên quan đến móng guốc của các loài động vật hoang dã dẫm xuống đất." },
            { radical: "缶", name: "Phẫu", meaning: "Bình sành, nhạc cụ đất nung", examples: "缸 (cái chum), 缺 (thiếu thốn), 罐 (cái lon/bình)", tip: "Liên quan đến đồ gốm sứ chứa nước hoặc các vật dụng dễ sứt mẻ." },
            { radical: "舛", name: "Suyễn", meaning: "Sai lệch, trái ngược", examples: "舞 (múa), 舜 (vua Thuấn)", tip: "Hai bàn chân giẫm ngược chiều nhau, liên quan đến nhảy múa, mâu thuẫn hoặc sai lệch." },
            { radical: "襾 (覀)", name: "Á", meaning: "Che đậy, bao phủ", examples: "覆 (che lấp), 覃 (sâu rộng)", tip: "Hình cái nắp đậy lên trên vật chứa, biểu thị sự che giấu hoặc phía Tây khuất bóng." },
            { radical: "辛", name: "Tân", meaning: "Cay đắng, vất vả, thiên can", examples: "辣 (cay), 辨 (phân biệt), 辞 (từ chức)", tip: "Hình dao khắc chữ lên mặt tội nhân, liên quan đến hình phạt, vị cay hoặc lao động khổ sai." },
            { radical: "辰", name: "Thần", meaning: "Nhật nguyệt, thiên thể, chi Thìn", examples: "晨 (buổi sáng), 辱 (nhục nhã)", tip: "Liên quan đến thời gian, các vì sao trên trời hoặc công cụ cuốc đất đá cổ." },
            { radical: "采", name: "Thải", meaning: "Hái lượm, màu sắc", examples: "采 (hái), 彩 (màu sắc), 菜 (rau)", tip: "Tay đang hái quả trên cây mộc, liên quan đến lựa chọn, thu thập hoặc sắc thái." },
            { radical: "里", name: "Lý", meaning: "Làng mạc, dặm (đo lường)", examples: "重 (nặng), 野 (hoang dã), 量 (đo lường)", tip: "Bên trên là ruộng (điền), dưới là đất (thổ), liên quan đến nơi cư trú, quê hương hoặc khoảng cách." },
            { radical: "隶", name: "Lệ", meaning: "Kịp, bắt giữ, nô lệ", examples: "隶 (nô lệ), 隶书 (chữ lệ)", tip: "Tay bắt lấy đuôi con thú, liên quan đến sự ràng buộc, bắt bớ hoặc phục tùng." },
            { radical: "青", name: "Thanh", meaning: "Màu xanh lam, xanh lục", examples: "靓 (đẹp đẽ), 静 (yên tĩnh)", tip: "Biểu thị sự tươi tốt của cỏ cây, liên quan đến thanh xuân, sự trong sạch hoặc yên lặng." },
            { radical: "非", name: "Phi", meaning: "Không phải, sai trái, chống đối", examples: "靠 (dựa vào), 靡 (lãng phí)", tip: "Hình hai hàng lông chim tương phản, liên quan đến sự phản bác, sai lầm hoặc đối xứng." },
            { radical: "面", name: "Diện", meaning: "Khuôn mặt, bề mặt", examples: "面 (mặt/mì), 靥 (lúm đồng tiền)", tip: "Liên quan trực tiếp đến da mặt, biểu cảm hoặc các bề mặt không gian phẳng." },
            { radical: "革", name: "Cách", meaning: "Da thuộc, thay đổi", examples: "鞋 (giày), 鞭 (cái roi), 靴 (ủng)", tip: "Da thú đã qua xử lý cạo lông, liên quan đến giày dép, đồ da hoặc sự cải cách." },
            { radical: "韦", name: "Vi", meaning: "Da mềm, vây quanh", examples: "韩 (nước Hàn), 韧 (dẻo dai)", tip: "Da thú được thuộc mềm mại để bao bọc đồ vật, liên quan đến sự bền bỉ." },
            { radical: "韭", name: "Cửu", meaning: "Rau hẹ", examples: "韭 (rau hẹ), 齑 (vụn nhỏ)", tip: "Hình bụi rau hẹ mọc đất, ít khi làm bộ thủ chính, thường làm thành phần biểu âm." },
            { radical: "音", name: "Âm", meaning: "Âm thanh, tiếng động", examples: "音乐 (âm nhạc), 韵 (vần điệu), 章 (chương)", tip: "Trong lòng bộ Khẩu có một nét gạch biểu thị tiếng động phát ra có tiết tấu." },
            { radical: "风", name: "Phong", meaning: "Gió, phong tục", examples: "飘 (bay lượn), 飒 (gió thổi vù vù)", tip: "Liên quan đến các hiện tượng thời tiết có gió, dòng khí hoặc phong thái, xu hướng." },
            { radical: "飞", name: "Phi", meaning: "Bay lượn", examples: "飞机 (máy bay), 飞翔 (bay lượn)", tip: "Hình chim xòe cánh bay, liên quan đến tốc độ cực nhanh hoặc di chuyển trên không trung." },
            { radical: "首", name: "Thủ", meaning: "Cái đầu, đứng đầu", examples: "首长 (thủ trưởng), 首相 (thủ tướng)", tip: "Hình cái đầu người có tóc, liên quan đến vị trí quan trọng nhất hoặc sự bắt đầu." },
            { radical: "香", name: "Hương", meaning: "Mùi hương, thơm thảo", examples: "香水 (nước hoa), 馥 (thơm nức)", tip: "Bộ Hòa (lúa) kết hợp bộ Nhật (mặt trời), chỉ mùi thơm của thóc lúa chín nồng." },
            { radical: "骨", name: "Cốt", meaning: "Xương cốt, khung xương", examples: "骷髅 (bộ xương người), 體 (thân thể)", tip: "Liên quan đến cấu trúc xương cơ thể, độ cứng hoặc cốt cách, tinh thần chịu đựng." },
            { radical: "高", name: "Cao", meaning: "Chiều cao, cao ráo", examples: "高兴 (vui vẻ), 稿 (bản thảo)", tip: "Hình đài quan sát cao tầng, liên quan đến khoảng cách thẳng đứng hoặc vị thế cao quý." },
            { radical: "髟", name: "Tiêu", meaning: "Tóc dài, tóc rủ", examples: "发 (tóc), 鬓 (tóc mai), 髯 (râu dài)", tip: "Nằm phía trên của chữ, liên quan trực tiếp đến râu, tóc hoặc các sợi rủ xuống mặt." },
            { radical: "鬥", name: "Đấu", meaning: "Đánh nhau, chiến đấu", examples: "闹 (ồn ào), 斗 (chiến đấu)", tip: "Hình hai người đang giơ tay đấm nhau, liên quan đến tranh chấp, ồn ào náo nhiệt." },
            { radical: "鬯", name: "Sướng", meaning: "Rượu nghệ dùng tế lễ", examples: "鬯 (rượu cúng)", tip: "Bộ thủ rất hiếm gặp, liên quan đến hương liệu và nghi thức cúng bái cổ đại." },
            { radical: "鬲", name: "Cách", meaning: "Cái nồi cổ, ngăn cách", examples: "融 (tan chảy), 隔 (ngăn cách)", tip: "Liên quan đến đồ đun nấu thức ăn thời cổ có chân rỗng hoặc sự thông suốt, hòa nhập." },
            { radical: "鬼", name: "Quỷ", meaning: "Con quỷ, tâm linh", examples: "魂 (linh hồn), 魄 (phách), 魔 (ma quỷ)", tip: "Liên quan đến linh hồn người chết, những điều kỳ quái, sợ hãi hoặc ảo giác." },
            { radical: "鱼", name: "Ngư", meaning: "Con cá, thủy sản", examples: "鲜 (tươi sống), 鲸 (cá voi), 鳄 (cá sấu)", tip: "Liên quan đến các loài sinh vật sống dưới nước có vây và vảy." },
            { radical: "卤", name: "Lỗ", meaning: "Đất mặn, muối, nước khoáng", examples: "卤 (kho quẹt/nước muối), 咸 (mặn)", tip: "Liên quan đến muối ăn, thực phẩm ngâm muối hoặc đất nhiễm mặn." },
            { radical: "鹿", name: "Lộc", meaning: "Con hươu", examples: "麒麟 (kỳ lân), 丽 (đẹp đẽ), 尘 (bụi)", tip: "Liên quan đến các loài động vật hoang dã họ hươu nai hoặc tính chất nhanh nhẹn, quý hiếm." },
            { radical: "麦", name: "Mạch", meaning: "Lúa mạch, lúa mì", examples: "面粉 (bột mì), 麸 (cám mạch)", tip: "Liên quan đến các sản phẩm chế biến từ bột mì, bánh mì hoặc nông nghiệp phương Bắc." },
            { radical: "麻", name: "Ma", meaning: "Cây gai, tê dại", examples: "麻烦 (phiền phức), 磨 (mài giũa)", tip: "Hình cây gai phơi trong nhà, liên quan đến sợi gai, cảm giác tê rần hoặc sự rắc rối." },
            { radical: "黄", name: "Hoàng", meaning: "Màu vàng", examples: "黄金 (vàng), 簧 (lưỡi gà nhạc cụ)", tip: "Màu của đất đai trung nguyên Trung Quốc, liên quan đến hoàng đế hoặc sắc vàng." },
            { radical: "黍", name: "Thử", meaning: "Lúa nếp, ngô hạt", examples: "黎 (dân đen/họ Lê)", tip: "Liên quan đến các loại lương thực có tính chất dính dẻo khi nấu chín." },
            { radical: "黑", name: "Hắc", meaning: "Màu đen, tối tăm", examples: "墨 (mực vẽ), 默 (lặng im), 点 (dấu chấm)", tip: "Hình khói bếp hun đen lỗ thông gió, liên quan đến bóng tối, mực đen hoặc im lặng." },
            { radical: "黹", name: "Chỉ", meaning: "May vá, thêu thùa", examples: "黼 (hoa văn thêu áo vua)", tip: "Bộ thủ cổ cực hiếm, liên quan đến ngành dệt may cung đình xưa." },
            { radical: "黾", name: "Mãnh", meaning: "Con ếch, con nhái", examples: "绳 (sợi dây), 蝇 (con ruồi)", tip: "Liên quan đến động vật lưỡng cư có bụng to hoặc loài côn trùng nhỏ bay vo ve." },
            { radical: "鼎", name: "Đỉnh", meaning: "Cái đỉnh ba chân", examples: "鼎盛 (vững chãi/thịnh vượng)", tip: "Biểu tượng của vương quyền và sự vững chắc như kiềng ba chân." },
            { radical: "鼓", name: "Cổ", meaning: "Cái trống, đánh trống", examples: "鼓掌 (vỗ tay), 瞽 (mù lòa)", tip: "Liên quan đến nhạc cụ gõ, âm thanh vang dội hoặc hành động cổ vũ, thúc đẩy." },
            { radical: "鼠", name: "Thử", meaning: "Con chuột", examples: "老鼠 (con chuột), 鼹 (chuột chũi)", tip: "Liên quan đến các loài gặm nhấm, hành động đào bới hoặc tính cách lén lút." },
            { radical: "鼻", name: "Tị", meaning: "Cái mũi", examples: "鼻子 (cái mũi), 鼾 (ngáy ngủ)", tip: "Liên quan đến cơ quan khứu giác, hô hấp bằng mũi hoặc hành động ngáy." },
            { radical: "齐", name: "Tề", meaning: "Ngay ngắn, đồng đều", examples: "整齐 (gọn gàng), 斋 (trai giới)", tip: "Hình các bông lúa mọc cao bằng nhau, liên quan đến sự thống nhất, gọn gàng." },
            { radical: "齿", name: "Xỉ", meaning: "Răng, tuổi tác", examples: "龄 (tuổi tác), 龈 (lợi/nướu)", tip: "Liên quan đến răng, hoạt động cắn nhai hoặc dùng đếm tuổi của gia súc, con người." },
            { radical: "龟", name: "Qui", meaning: "Con rùa", examples: "乌龟 (con rùa)", tip: "Biểu thị sự trường thọ, chậm rãi hoặc các vết nứt bói toán trên mai rùa." },
            { radical: "龠", name: "Dược", meaning: "Sáo trúc cổ", examples: "龠 (đơn vị đo cổ)", tip: "Bộ thủ cuối cùng trong 214 bộ, liên quan đến nhạc cụ thổi bằng hơi hoặc sự điều hòa." },
            { radical: "一", name: "Nhất", meaning: "Số một", examples: "一 (một), 万 (mười nghìn), 丁 (con trai/đinh)", tip: "Nét ngang cơ bản, biểu thị sự khởi đầu, số đếm hoặc ranh giới mặt đất." },
            { radical: "丨", name: "Cổn", meaning: "Nét sổ thẳng", examples: "中 (trung tâm), 个 (chiếc/cái)", tip: "Nét sổ thẳng đứng từ trên xuống, biểu thị sự thông suốt hoặc trục đứng nối kết." },
            { radical: "丶", name: "Chủ", meaning: "Dấu chấm, điểm", examples: "丸 (viên thuốc), 丹 (đan dược)", tip: "Một dấu chấm nhỏ, biểu thị tiêu điểm, sự ngưng tụ hoặc giọt chất lỏng." },
            { radical: "丿", name: "Phiệt", meaning: "Nét phẩy gạt sang trái", examples: "九 (số 9), 么 (gì/sao)", tip: "Nét nghiêng gạt từ phải sang trái, biểu thị xu hướng di chuyển hoặc phân tách." },
            { radical: "乙", name: "Ất", meaning: "Vị trí thứ hai, thiên can Ất", examples: "乞 (xin ăn), 乾 (quẻ Càn/khô)", tip: "Hình mầm cây uốn cong cố ngoi lên, liên quan đến sự trắc trở hoặc uyển chuyển." },
            { radical: "亅", name: "Quyết", meaning: "Nét móc ngược lên", examples: "了 (xong/rồi), 予 (ban cho)", tip: "Nét sổ có móc nhọn dưới đáy, liên quan đến hành động giữ lại hoặc móc nối vật thể." },
            { radical: "二", name: "Nhị", meaning: "Số hai", examples: "二 (hai), 于 (ở/tại), 云 (mây)", tip: "Hai nét ngang song song, biểu thị trời và đất, sự đối xứng hoặc số đếm." },
            { radical: "亠", name: "Đầu", meaning: "Bộ đầu (không nghĩa độc lập)", examples: "交 (giao nhau), 京 (kinh đô), 亥 (chi Hợi)", tip: "Thường nằm trên đỉnh chữ, đóng vai trò làm kết cấu tạo hình khung cho chữ Hán." }
        ];

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

    // Lọc danh sách bộ thủ nâng cao theo từ khóa và cấp độ HSK
    const filteredRadicals = useMemoOverview(() => {
        return coreRadicals.filter(item => {
            // Bộ lọc HSK
            if (selectedRadicalLevel !== 'all' && item.level !== Number(selectedRadicalLevel)) {
                return false;
            }
            // Bộ lọc tìm kiếm
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

            {/* BẢNG THEO DÕI TIẾN ĐỘ LUYỆN DỊCH */}
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

            {/* CẨM NANG BỘ THỦ CHỮ HÁN CỐT LÕI (Thu gọn kèm Tìm Kiếm & Phân Loại HSK 1-6) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-book-open text-indigo-600"></i> Cẩm nang Bộ thủ chữ Hán HSK
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Mẹo tư duy và liên tưởng hình ảnh để lưu giữ mặt chữ sâu sắc, dễ dàng tra cứu theo cấp độ HSK 1 - 6.
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
                    <div className="space-y-4 animate-fade-in">
                        {/* Bảng tìm kiếm & Bộ lọc HSK của bộ thủ */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            {/* Bộ lọc HSK */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Bộ lọc HSK:</span>
                                {['all', 1, 2, 3, 4, 5, 6].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedRadicalLevel(level)}
                                        className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition ${
                                            selectedRadicalLevel === level
                                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none'
                                                : 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-500'
                                        }`}
                                    >
                                        {level === 'all' ? 'Tất cả' : `HSK ${level}`}
                                    </button>
                                ))}
                            </div>

                            {/* Ô tìm kiếm bộ thủ */}
                            <div className="relative w-full lg:w-72">
                                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm: Nhân, Khẩu, ăn, uống..."
                                    value={radicalSearchQuery}
                                    onChange={(e) => setRadicalSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                                />
                                {radicalSearchQuery && (
                                    <button 
                                        onClick={() => setRadicalSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tổng số bộ thủ tìm thấy */}
                        <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 px-1">
                            <span>Đang hiển thị <strong>{filteredRadicals.length}</strong> bộ thủ</span>
                            {selectedRadicalLevel !== 'all' && (
                                <span>Phát sinh trong từ vựng <strong>HSK {selectedRadicalLevel}</strong></span>
                            )}
                        </div>

                        {/* Grid hiển thị danh sách bộ thủ đã lọc */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-1">
                            {filteredRadicals.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-950 transition duration-300 flex flex-col justify-between space-y-2.5 relative group overflow-hidden"
                                >
                                    {/* Nhãn tag HSK */}
                                    <span className="absolute top-2 right-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
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
                                    Không tìm thấy bộ thủ phù hợp với tiêu chuẩn lựa chọn.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Gán biến toàn cục để Index.html có thể truy cập qua React CDN
window.OverviewTab = OverviewTab;