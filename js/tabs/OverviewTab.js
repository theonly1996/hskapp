// =========================================================================
// TAB: TỔNG QUAN (DASHBOARD - BIỂU ĐỒ, THỐNG KÊ CHI TIẾT & BẢNG TIẾN ĐỘ LUYỆN DỊCH HSK 1)
// =========================================================================
const { useMemo: useMemoOverview, useState: useStateOverview, useEffect: useEffectOverview } = React;

const OverviewTab = ({ progress, bookmarks, onSwitchTab, onSwitchLevel, streak }) => {
    const allLevels = [1, 2, 3, 4, 5, 6];

    // Khởi tạo trạng thái cho bảng tiến độ luyện dịch
    const [translationProgress, setTranslationProgress] = useStateOverview([]);

    // Tự động load và đồng bộ hóa tiến độ luyện dịch từ LocalStorage
    useEffectOverview(() => {
        const savedProgress = localStorage.getItem('hskpro_translation_progress_v1');
        if (savedProgress) {
            setTranslationProgress(JSON.parse(savedProgress));
        } else {
            // Sử dụng dữ liệu khởi tạo mặc định nếu chưa có
            const defaultList = window.hskProData?.defaultProgress || [
                { lessonId: 1, title: "Bài 1: 你好 — Xin chào", isCompleted: false, currentScore: 0 },
    { lessonId: 2, title: "Bài 2: 谢谢你 — Cảm ơn bạn", isCompleted: false, currentScore: 0 },
    { lessonId: 3, title: "Bài 3: 你叫什么名字 — Bạn tên là gì", isCompleted: false, currentScore: 0 },
    { lessonId: 4, title: "Bài 4: 她是我的汉语老师 — Cô ấy là giáo viên của tôi", isCompleted: false, currentScore: 0 },
    { lessonId: 5, title: "Bài 5: 她女儿今年二十岁 — Con gái cô ấy năm nay 20 tuổi", isCompleted: false, currentScore: 0 },
    { lessonId: 6, title: "Bài 6: 我会说汉语 — Tôi biết nói tiếng Trung", isCompleted: false, currentScore: 0 },
    { lessonId: 7, title: "Bài 7: 今天几号 — Hôm nay ngày mấy", isCompleted: false, currentScore: 0 },
    { lessonId: 8, title: "Bài 8: 我想喝茶 — Tôi muốn uống trà", isCompleted: false, currentScore: 0 },
    { lessonId: 9, title: "Bài 9: 你兒子在哪里工作 — Con trai bạn làm việc ở đâu", isCompleted: false, currentScore: 0 },
    { lessonId: 10, title: "Bài 10: 我能坐这儿吗 — Tôi có thể ngồi đây không", isCompleted: false, currentScore: 0 },
    { lessonId: 11, title: "Bài 11: 现在几点 — Bây giờ mấy giờ", isCompleted: false, currentScore: 0 },
    { lessonId: 12, title: "Bài 12: 明天天气怎么样 — Ngày mai thời tiết thế nào", isCompleted: false, currentScore: 0 },
    { lessonId: 13, title: "Bài 13: 他在学做中国菜呢 — Anh ấy đang học nấu món ăn Trung Quốc", isCompleted: false, currentScore: 0 },
    { lessonId: 14, title: "Bài 14: 她买了不少衣服 — Cô ấy đã mua không ít quần áo", isCompleted: false, currentScore: 0 },
    { lessonId: 15, title: "Bài 15: 我是坐飞机来的 — Tôi đến bằng máy bay", isCompleted: false, currentScore: 0 },
    { lessonId: 16, title: "Bài 1: 九月去北京旅游最好 (Tháng 9 đi Bắc Kinh du lịch tốt nhất)", isCompleted: false, currentScore: 0 },
    { lessonId: 17, title: "Bài 2: 我每天六点起床 (Mỗi ngày tôi thức dậy lúc 6 giờ)", isCompleted: false, currentScore: 0 },
    { lessonId: 18, title: "Bài 3: 左边那个红色的是我的 (Cái màu đỏ bên trái là của tôi)", isCompleted: false, currentScore: 0 },
    { lessonId: 19, title: "Bài 4: 这个工作是他帮我介绍的 (Công việc này do anh ấy giới thiệu)", isCompleted: false, currentScore: 0 },
    { lessonId: 20, title: "Bài 5: 可以这儿写你的名字 (Có thể viết tên của bạn ở đây)", isCompleted: false, currentScore: 0 },
    { lessonId: 21, title: "Bài 6: 你怎么不吃了 (Sao bạn không ăn nữa?)", isCompleted: false, currentScore: 0 },
    { lessonId: 22, title: "Bài 7: 你家离公司远吗 (Nhà bạn cách công ty xa không?)", isCompleted: false, currentScore: 0 },
    { lessonId: 23, title: "Bài 8: 让我想一想再告诉你 (Để tôi suy nghĩ một lát rồi bảo bạn)", isCompleted: false, currentScore: 0 },
    { lessonId: 24, title: "Bài 9: 题太多，我没做完 (Đề nhiều quá, tôi chưa làm xong)", isCompleted: false, currentScore: 0 },
    { lessonId: 25, title: "Bài 10: 别找了，手机在桌子上呢 (Đừng tìm nữa, điện thoại ở trên bàn)", isCompleted: false, currentScore: 0 },
    { lessonId: 26, title: "Bài 11: 他比我大三岁 (Anh ấy lớn hơn tôi 3 tuổi)", isCompleted: false, currentScore: 0 },
    { lessonId: 27, title: "Bài 12: 你穿得太少了 (Bạn mặc ít đồ quá)", isCompleted: false, currentScore: 0 },
    { lessonId: 28, title: "Bài 13: 门开着呢 (Cửa đang mở đấy)", isCompleted: false, currentScore: 0 },
    { lessonId: 29, title: "Bài 14: 你看过那个电影吗 (Bạn đã xem bộ phim đó chưa?)", isCompleted: false, currentScore: 0 },
    { lessonId: 30, title: "Bài 15: 新年快到了 (Tết sắp đến rồi)", isCompleted: false, currentScore: 0 },
    { lessonId: 31, title: "Bài 1: 周末你有什么打算 (Cuối tuần bạn có dự định gì?)", isCompleted: false, currentScore: 0 },
    { lessonId: 32, title: "Bài 2: 他什么时候回来 (Khi nào anh ấy quay lại?)", isCompleted: false, currentScore: 0 },
    { lessonId: 33, title: "Bài 3: 桌子上放着一杯咖啡 (Trên bàn có đặt một ly cà phê)", isCompleted: false, currentScore: 0 },
    { lessonId: 34, title: "Bài 4: 她总是笑眯眯的 (Cô ấy lúc nào cũng mỉm cười)", isCompleted: false, currentScore: 0 },
    { lessonId: 35, title: "Bài 5: 我最近买了一辆新车 (Gần đây tôi mới mua chiếc xe mới)", isCompleted: false, currentScore: 0 },
    { lessonId: 36, title: "Bài 6: 怎么突然变冷了 (Sao tự nhiên lại trở lạnh thế?)", isCompleted: false, currentScore: 0 },
    { lessonId: 37, title: "Bài 7: 我跟他一样高 (Tôi cao bằng anh ấy)", isCompleted: false, currentScore: 0 },
    { lessonId: 38, title: "Bài 8: 这里的变化真大 (Sự thay đổi ở đây thật lớn)", isCompleted: false, currentScore: 0 },
    { lessonId: 39, title: "Bài 9: 她的汉语越来越好 (Tiếng Trung của cô ấy ngày càng tốt)", isCompleted: false, currentScore: 0 },
    { lessonId: 40, title: "Bài 10: 数学考试难不难 (Bài kiểm tra Toán có khó không?)", isCompleted: false, currentScore: 0 },
    { lessonId: 41, title: "Bài 11: 别着急，慢慢来 (Đừng vội vàng, cứ từ từ)", isCompleted: false, currentScore: 0 },
    { lessonId: 42, title: "Bài 12: 把书放在桌子上 (Đặt quyển sách lên trên bàn)", isCompleted: false, currentScore: 0 },
    { lessonId: 43, title: "Bài 13: 我习惯了这里的生活 (Tôi đã quen với cuộc sống ở đây)", isCompleted: false, currentScore: 0 },
    { lessonId: 44, title: "Bài 14: 请再检查一下账单 (Xin vui lòng kiểm tra lại hóa đơn)", isCompleted: false, currentScore: 0 },
    { lessonId: 45, title: "Bài 15: 终于把问题解决了 (Cuối cùng cũng giải quyết xong vấn đề)", isCompleted: false, currentScore: 0 }
            ];
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

    // Logic thống kê tiến trình các cấp độ HSK (Không làm ảnh hưởng đến code gốc)
    const levelStats = useMemoOverview(() => {
        let totalMastered = 0;
        let totalLearning = 0;
        let totalUnlearned = 0;
        let totalWordsAllLevels = 0;

        const stats = allLevels.map(level => {
            const levelWords = (typeof FALLBACK_VOCABULARY !== 'undefined' ? FALLBACK_VOCABULARY[level] : []) || [];
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

    // Dữ liệu 12 bộ thủ cốt lõi HSK 1 làm phương án dự phòng an toàn
    const coreRadicals = window.hskProData?.coreRadicals || [
       { radical: "亻", name: "Nhân đứng", meaning: "Con người, danh xưng", examples: "你 (bạn), 他 (anh ấy)", tip: "Liên quan đến danh xưng, đại từ hoặc hành vi con người." },
    { radical: "女", name: "Nữ", meaning: "Phụ nữ, phái đẹp", examples: "她 (cô ấy), 好 (tốt)", tip: "Người phụ nữ bế đứa con (子) là điều tốt đẹp." },
    { radical: "口", name: "Khẩu", meaning: "Cái miệng", examples: "叫 (gọi), 吃 (ăn)", tip: "Các hành động phát ra từ miệng." },
    { radical: "日", name: "Nhật", meaning: "Mặt trời, ngày", examples: "明 (sáng), 时 (giờ)", tip: "Liên quan đến thời gian, dòng chảy ngày đêm." },
    { radical: "氵", name: "Ba chấm thủy", meaning: "Nước, chất lỏng", examples: "没 (không có), 汉 (Hán)", tip: "Ba giọt nước, liên quan đến chất lỏng, ngôn ngữ." },
    { radical: "宀", name: "Bộ Miên", meaning: "Mái nhà, mái che", examples: "家 (nhà), 字 (chữ Hán)", tip: "Hình ảnh mái nhà có ống khói che chở bên trên." },
    { radical: "辶", name: "Bộ Sước", meaning: "Bước dài, di chuyển", examples: "这 (đây), 进 (vào)", tip: "Liên quan đến hành động di chuyển đường sá, khoảng cách." },
    { radical: "木", name: "Mộc", meaning: "Cây cối, gỗ giuộc", examples: "杯 (cái cốc), 桌 (cái bàn)", tip: "Hình cây có gốc rễ và cành lá; đồ vật làm từ gỗ xưa kia." },
    { radical: "饣", name: "Bộ Thực", meaning: "Ăn uống, thực phẩm", examples: "饭 (cơm)", tip: "Hình người đang che giỏ thức ăn, chỉ đồ ăn thức uống." },
    { radical: "讠", name: "Bộ Ngôn", meaning: "Ngôn ngữ, lời nói", examples: "语 (ngôn ngữ), Xie (cảm ơn)", tip: "Biểu thị lời nói phát ra từ miệng mang tính lễ nghi." },
    { radical: "纟", name: "Bộ Mịch", meaning: "Sợi tơ, vải vóc", examples: "红 (màu đỏ), 绿 (màu xanh)", tip: "Cuộn sợi tơ tằm, các chữ liên quan đến vải vóc hoặc sắc màu nhuộm." },
    { radical: "父", name: "Bộ Phụ", meaning: "Người cha, bề trên", examples: "爸爸 (bố)", tip: "Hình ảnh người cha cầm hai chiếc gậy quyền lực răn dạy con." },
    { radical: "饣", name: "Bộ Thực (Ăn uống)", meaning: "Liên quan đến đồ ăn, quán xá, lương thực", examples: "馆 (quán),饺子 (sủi cảo)", tip: "Hình chiếc nắp đậy trên nồi đựng thức ăn nóng hổi." },
    { radical: "纟", name: "Bộ Mịch (Sợi tơ)", meaning: "Sợi tơ dệt, vải vóc, dệt nhuộm màu sắc", examples: "绍 (giới thiệu), 红 (đỏ)", tip: "Hình cuộn chỉ thắt nút dùng để may mặc." },
    { radical: "辶", name: "Bộ Sước (Bước đi)", meaning: "Hành động di chuyển, khoảng cách, đường sá", examples: "送 (tặng/tiễn), 迎 (đón rước)", tip: "Hình bàn chân đi ngắn rồi dừng lại kéo dài." },
    { radical: "忄", name: "Bộ Tâm đứng", meaning: "Tình cảm, tâm trạng, cảm xúc suy nghĩ", examples: "慢 (chậm), 情 (tình cảm)", tip: "Trái tim dựng đứng, thể hiện cảm xúc sâu kín bên trong." },
    { radical: "目", name: "Bộ Mục (Mắt)", meaning: "Liên quan đến con mắt, cái nhìn, thị lực", examples: "睛 (mắt), 眼 (mắt)", tip: "Vẽ hình con mắt dựng dọc có hai con ngươi bên trong." },
    { radical: "足", name: "Bộ Túc (Chân)", meaning: "Hành động đi lại, thể thao, đá chân", examples: "路 (đường), 跳 (nhảy múa)", tip: "Hình vẽ đùi, đầu gối và bàn chân di chuyển." },
    { radical: "扌", name: "Bộ Thủ (Tay)", meaning: "Hành động bằng tay, cầm nắm, lao động", examples: "找 (tìm kiếm), 报 (báo chí)", tip: "Hình dáng một bàn tay xòe năm ngón làm việc." },
    { radical: "⻏", name: "Bộ Ấp (Bên phải)", meaning: "Địa danh, khu vực, khí hậu thời tiết", examples: "阳 (mặt trời), 阴 (u ám)", tip: "Vùng đất trập trùng hay gò đất có bóng râm." },
    { radical: "疒", name: "Bộ Nạch (Bệnh tật)", meaning: "Liên quan đến ốm đau, bệnh tật, vết thương", examples: "病 (bệnh), 疼 (đau đớn)", tip: "Hình người ốm yếu nằm nghiêng bên giường bệnh." },
    { radical: "犭", name: "Bộ Khuyển (Thú vật)", meaning: "Liên quan đến động vật, thú bốn chân", examples: "猫 (mèo), 狗 (chó)", tip: "Hình con thú hoang đang rình mồi dựng lông đứng." },
    { radical: "⺮", name: "Bộ Trúc (Tre nứa)", meaning: "Đồ dùng làm từ tre trúc, văn phòng phẩm", examples: "等 (đợi), 笔 (bút)", tip: "Hình hai cành lá trúc rủ xuống bên dưới." },
    { radical: "贝", name: "Bộ Bối (Tiền tệ)", meaning: "Giá trị vật chất, mua bán, bảo bối", examples: "贵 (đắt đỏ), 货 (hàng hóa)", tip: "Hình con sò biển - loại tiền cổ dùng để giao dịch ngày xưa." },
    { radical: "土", name: "Thổ (Đất)", meaning: "Liên quan đến đất đai, gạch đá, địa điểm xây dựng", examples: "地 (đất), 坏 (hỏng)", tip: "Hình ảnh một mầm cây nhỏ đang đâm chồi lên khỏi mặt đất." },
    { radical: "广", name: "Quảng (Rộng lớn)", meaning: "Liên quan đến nhà cửa, tòa nhà cao tầng, không gian rộng", examples: "店 (cửa hàng), 府 (phủ)", tip: "Hình ảnh mái nhà dựa sườn núi có không gian rộng lớn thoáng đãng." },
    { radical: "力", name: "Lực (Sức mạnh)", meaning: "Hành động tốn sức lực, sức mạnh cơ bắp, dụng cụ", examples: "办 (làm), 劲 (sức lực)", tip: "Hình dáng chiếc cày hoặc cánh tay gân guốc đang gồng lên dùng sức." },
    { radical: "疒", name: "Nạch (Bệnh tật)", meaning: "Liên quan đến ốm đau, bệnh tật, các trạng thái đau đớn", examples: "疼 (đau), 瘦 (gầy)", tip: "Hình người ốm yếu mệt mỏi đang tựa vào giường bệnh." },
    { radical: "目", name: "Mục (Mắt)", meaning: "Liên quan đến con mắt, cái nhìn, tầm nhìn", examples: "睁 (mở mắt), 瞎 (mù)", tip: "Hình vẽ con mắt nằm ngang xưa kia, nay dựng đứng lên." },
    { radical: "足", name: "Túc (Chân)", meaning: "Hành động di chuyển bằng chân, nhảy, đá bóng", examples: "跑 (chạy), 路 (đường đi)", tip: "Hình ảnh phần đùi và bàn chân đang nâng bước vận động." },
    { radical: "饣", name: "Thực (Ăn uống)", meaning: "Lương thực, thực phẩm, ăn uống, quán xá", examples: "饱 (no), 饮 (uống)", tip: "Hình chiếc nồi có nắp đậy chứa đầy thức ăn chín." },
    { radical: "纟", name: "Mịch (Sợi tơ)", meaning: "Sợi dây, dệt tơ lụa, liên kết màu sắc dệt", examples: "终 (cuối cùng), 绿 (xanh lá)", tip: "Cuộn chỉ dệt có thắt nút, biểu thị sự liên kết liên tục." },
    { radical: "辶", name: "Sước (Bước đi)", meaning: "Hành trình di chuyển, đường đi, tiến trình", examples: "迟 (muộn), 逃 (chạy trốn)", tip: "Bước chân đi ngắn rồi dừng lại kéo dài chân tiến bước." },
    { radical: "忄", name: "Tâm đứng", meaning: "Cảm xúc, tâm lý, suy nghĩ sâu sắc bên trong", examples: "懒 (lười), 慢 (chậm)", tip: "Trái tim dựng thẳng đứng, đại diện cho thế giới nội tâm." },
    { radical: "⺮", name: "Trúc (Tre nứa)", meaning: "Các dụng cụ làm bằng tre trúc, văn phòng phẩm", examples: "笔 (bút), 筷 (đũa)", tip: "Hình ảnh hai cành lá trúc đang rủ bóng mềm mại." },
    { radical: "贝", name: "Bối (Tiền bạc)", meaning: "Giá trị vật chất, bảo bối, buôn bán tiền tệ", examples: "贵 (đắt), 赔 (đền bù)", tip: "Vẽ chiếc vỏ sò biển - tiền tệ giao thương cổ đại." }
    ];

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
                                        onClick={() => { onSwitchLevel(s.level); onSwitchTab('dictionary'); }}
                                        className="font-bold text-teal-600 hover:text-teal-700 dark:text-teal-400 text-left hover:underline flex items-center gap-1"
                                    >
                                        Cấp độ HSK {s.level} <i className="fas fa-chevron-right text-[9px]"></i>
                                    </button>
                                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                                        Đã thuộc {s.mastered}/{s.total} từ ({s.masteredPercent}%)
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

            {/* BẢNG THEO DÕI TIẾN ĐỘ LUYỆN DỊCH HSK 1 (Tích hợp từ file Word) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-tasks text-emerald-600"></i> Vở Bài Tập Luyện Dịch HSK 1 (Trọn bộ 15 Bài)
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Tích hợp: Bộ thủ chuyên sâu, Biến điệu Pinyin & Khung ngữ pháp</p>
                    </div>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold self-start">
                        Tự Động Lưu Đồng Bộ
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {translationProgress.map((item) => (
                        <div 
                            key={item.lessonId} 
                            className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-200 ${
                                item.isCompleted 
                                    ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/55' 
                                    : 'bg-slate-50/60 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    checked={item.isCompleted} 
                                    onChange={() => handleToggleLesson(item.lessonId)}
                                    className="w-4.5 h-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
                                />
                                <span className={`text-xs font-bold transition-all ${
                                    item.isCompleted ? 'text-emerald-600 dark:text-emerald-400 line-through' : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                    {item.title}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
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
                </div>
            </div>

            {/* CẨM NANG 12 BỘ THỦ CHỮ HÁN CỐT LÕI (Tích hợp từ file Word) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <i className="fas fa-book-open text-indigo-600"></i> Cẩm nang 12 Bộ thủ chữ Hán cốt lõi HSK 1
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Mẹo tư duy liên tưởng giúp ghi nhớ mặt chữ lâu bền</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coreRadicals.map((item, index) => (
                        <div 
                            key={index} 
                            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-950 transition duration-300 space-y-2.5"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
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