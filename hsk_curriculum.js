// =========================================================================
// CƠ SỞ DỮ LIỆU GIÁO TRÌNH CHUẨN HSK 1 - 2 - 3 TOÀN DIỆN
// =========================================================================
window.hskCurriculumData = {
    1: [
        {
            lessonId: 1,
            title: "Bài 1: 你好 - Xin chào",
            desc: "Chào hỏi cơ bản, tự giới thiệu và đáp lại lời xin lỗi trong giao tiếp hàng ngày.",
            dialogue: [
                { role: "A", zh: "你好！", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
                { role: "B", zh: "你好！", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
                { role: "A", zh: "对不起！", pinyin: "Duìbuqǐ!", vi: "Tôi xin lỗi!" },
                { role: "B", zh: "没关系。", pinyin: "Méiguānxi.", vi: "Không có chi / Không sao đâu." }
            ],
            vocab: [
                { id: "cur1_1_1", word: "你", pinyin: "nǐ", meaning: "bạn, anh, chị (ngôi thứ hai)", pos: "other", tip: "Bộ Nhân đứng 亻 chỉ người, kết hợp chữ Nhĩ 尔." },
                { id: "cur1_1_2", word: "好", pinyin: "hǎo", meaning: "tốt, khoẻ, đẹp", pos: "adj", tip: "Bộ Nữ 女 (con gái) đứng cạnh bộ Tử 子 (con trai) tạo thành chữ Tốt." },
                { id: "cur1_1_3", word: "您", pinyin: "nín", meaning: "ngài, ông, bà (kính trọng)", pos: "other", tip: "Chữ 你 (bạn) đặt trên bộ Tâm 心 (trái tim) thể hiện sự tôn kính." },
                { id: "cur1_1_4", word: "对不起", pinyin: "duìbuqǐ", meaning: "xin lỗi", pos: "v", tip: "Cách nói lời xin lỗi phổ thông nhất." },
                { id: "cur1_1_5", word: "没关系", pinyin: "méiguānxi", meaning: "không sao đâu, không có gì", pos: "other", tip: "Hồi đáp lịch sự khi nhận được lời xin lỗi." }
            ],
            grammar: "1. Chào hỏi thông thường: Sử dụng '你好' khi chào một người đối diện.\n2. Chào kính trọng: Dùng '您好' cho người lớn tuổi, thầy cô hoặc cấp trên.\n3. Cách nói xin lỗi và đáp lại: Khi nhận được lời xin lỗi '对不起', ta đáp lại bằng '没关系'.",
            quiz: [
                { q: "Từ nào dùng để chào một người lớn tuổi hoặc thầy cô giáo?", options: ["你好", "您好", "你们好", "没关系"], ans: "您好" },
                { q: "Khi đối phương nói '对不起', bạn nên đáp lại như thế nào?", options: ["谢谢", "再见", "没关系", "不客气"], ans: "没关系" },
                { q: "Chữ '好' được ghép từ hai bộ thủ nào?", options: ["Nhân & Tâm", "Nữ & Tử", "Ngôn & Thân", "Nhân & Nhĩ"], ans: "Nữ & Tử" }
            ]
        },
        {
            lessonId: 2,
            title: "Bài 2: 谢谢你 - Cảm ơn bạn",
            desc: "Bày tỏ lòng biết ơn khi được giúp đỡ và nói lời tạm biệt khi chia tay.",
            dialogue: [
                { role: "A", zh: "谢谢你！", pinyin: "Xièxie nǐ!", vi: "Cảm ơn bạn nhé!" },
                { role: "B", zh: "不客气。", pinyin: "Bú kèqi.", vi: "Đừng khách khí / Không có gì đâu." },
                { role: "A", zh: "再见！", pinyin: "Zàijiàn!", vi: "Tạm biệt nhé!" },
                { role: "B", zh: "再见！", pinyin: "Zàijiàn!", vi: "Tạm biệt!" }
            ],
            vocab: [
                { id: "cur1_2_1", word: "谢谢", pinyin: "xièxie", meaning: "cảm ơn", pos: "v", tip: "Bộ Ngôn 言 (nói) đứng trước chữ Thân 身 và Thốn 寸." },
                { id: "cur1_2_2", word: "不", pinyin: "bù", meaning: "không (phó từ phủ định)", pos: "other", tip: "Dùng để phủ định hành động hoặc tính chất đứng sau." },
                { id: "cur1_2_3", word: "客气", pinyin: "kèqi", meaning: "khách sáo, khách khí", pos: "adj", tip: "Chữ 客 (khách) kết hợp với chữ 气 (khí)." },
                { id: "cur1_2_4", word: "再见", pinyin: "zàijiàn", meaning: "tạm biệt, hẹn gặp lại", pos: "v", tip: "Tái (再 - lại) kết hợp với Kiến (见 - gặp)." }
            ],
            grammar: "1. Bày tỏ sự biết ơn: Dùng '谢谢' hoặc '谢谢你'.\n2. Đáp lại lời cảm ơn: Nói '不客气' (Đừng khách sáo) hoặc '不用谢' (Không cần cảm ơn).\n3. Chào tạm biệt: Dùng '再见' để kết thúc cuộc trò chuyện lịch sự.",
            quiz: [
                { q: "Từ nào dùng để đáp lại lời cảm ơn một cách lịch sự?", options: ["没关系", "对不起", "不客气", "再见"], ans: "不客气" },
                { q: "Ý nghĩa của cụm từ '再见' là gì?", options: ["Xin chào", "Hẹn gặp lại", "Không sao", "Cảm ơn"], ans: "Hẹn gặp lại" },
                { q: "Bộ thủ nào xuất hiện đầu tiên trong chữ '谢'?", options: ["Bộ Tâm", "Bộ Thủy", "Bộ Nhân", "Bộ Ngôn"], ans: "Bộ Ngôn" }
            ]
        },
        {
            lessonId: 3,
            title: "Bài 3: 你叫什么名字 - Bạn tên là gì",
            desc: "Hỏi và trả lời về họ tên, học cách xác định danh tính cơ bản.",
            dialogue: [
                { role: "A", zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?" },
                { role: "B", zh: "我叫李月。", pinyin: "Wǒ jiào Lǐ Yuè.", vi: "Tôi tên là Lý Nguyệt." },
                { role: "A", zh: "你是老师吗？", pinyin: "Nǐ shì lǎoshī ma?", vi: "Bạn là giáo viên phải không?" },
                { role: "B", zh: "我不是老师，我是学生。", pinyin: "Wǒ bú shì lǎoshī, wǒ shì xuésheng.", vi: "Tôi không phải là giáo viên, tôi là học sinh." }
            ],
            vocab: [
                { id: "cur1_3_1", word: "叫", pinyin: "jiào", meaning: "gọi là, tên là", pos: "v", tip: "Bộ Khẩu 口 (miệng) đứng cạnh chữ Hựu 丩." },
                { id: "cur1_3_2", word: "什么", pinyin: "shénme", meaning: "cái gì, gì (đại từ nghi vấn)", pos: "other", tip: "Dùng để hỏi về thông tin sự vật, sự việc." },
                { id: "cur1_3_3", word: "名字", pinyin: "míngzi", meaning: "tên gọi", pos: "n", tip: "Danh xưng chính thức của một người." },
                { id: "cur1_3_4", word: "我", pinyin: "wǒ", meaning: "tôi, tớ, mình (ngôi thứ nhất)", pos: "other", tip: "Chữ ngã (我) biểu thị bản thân người nói." },
                { id: "cur1_3_5", word: "是", pinyin: "shì", meaning: "là (động từ phán đoán)", pos: "v", tip: "A 是 B nghĩa là A là B." },
                { id: "cur1_3_6", word: "老师", pinyin: "lǎoshī", meaning: "giáo viên, thầy cô", pos: "n", tip: "Chữ Lão (老) kết hợp với Sư (师 - thầy)." },
                { id: "cur1_3_7", word: "学生", pinyin: "xuésheng", meaning: "học sinh, học viên", pos: "n", tip: "Người đang học tập." }
            ],
            grammar: "1. Hỏi tên: Sử dụng '你叫什么名字？'.\n2. Động từ phán đoán '是': Khẳng định 'A 是 B', phủ định dùng 'A 不是 B'.\n3. Trợ từ nghi vấn '吗': Đặt cuối câu để tạo câu hỏi Có/Không (Ví dụ: 你是老师吗？).",
            quiz: [
                { q: "Để hỏi 'Bạn tên là gì?', ta nói câu nào?", options: ["你是谁？", "你好吗？", "幕你叫什么名字？", "你叫什么名字？"], ans: "你叫 what 名字？" },
                { q: "Dịch câu 'Tôi không phải là giáo viên' sang tiếng Trung?", options: ["我是学生", "我... không phải là lǎoshī", "我不是老师", "我是老师吗"], ans: "我... không phải là lǎoshī" },
                { q: "Trợ từ nghi vấn đặt ở cuối câu để tạo câu hỏi Có/Không là từ nào?", options: ["吗", "呢", "吧", "的"], ans: "吗" }
            ]
        },
        {
            lessonId: 4,
            title: "Bài 4: 她是我的汉语老师 - Cô ấy là giáo viên tiếng Trung của tôi",
            desc: "Giới thiệu về người khác, hỏi quốc tịch và nói về mối quan hệ.",
            dialogue: [
                { role: "A", zh: "她是谁？", pinyin: "Tā : shì shéi?", vi: "Cô ấy là ai vậy?" },
                { role: "B", zh: "她是我的汉语老师，她叫李月。", pinyin: "Tā : shì wǒ de Hànyǔ lǎoshī, tā jiào Lǐ Yuè.", vi: "Cô ấy là giáo viên tiếng Trung của tôi, cô ấy tên là Lý Nguyệt." },
                { role: "A", zh: "你是哪国人？", pinyin: "Nǐ : shì nǎ guó rén?", vi: "Bạn là người nước nào?" },
                { role: "B", zh: "我是美国人。你呢？", pinyin: "Wǒ : shì Měiguó rén. Nǐ ne?", vi: "Tôi là người Mỹ. Còn bạn thì sao?" },
                { role: "A", zh: "我是中国人。", pinyin: "Wǒ : shì Zhōngguó rén.", vi: "Tôi là người Trung Quốc." }
            ],
            vocab: [
                { id: "cur1_4_1", word: "她", pinyin: "tā", meaning: "cô ấy, bà ấy, chị ấy", pos: "other", tip: "Bộ Nữ 女 đứng trước đại diện cho phái nữ." },
                { id: "cur1_4_2", word: "谁", pinyin: "shéi", meaning: "ai (đại từ nghi vấn hỏi người)", pos: "other", tip: "Bộ Ngôn 言 đứng trước chỉ việc hỏi." },
                { id: "cur1_4_3", word: "汉语", pinyin: "Hànyǔ", meaning: "tiếng Trung, Hán ngữ", pos: "n", tip: "Hán (汉) kết hợp Ngữ (语)." },
                { id: "cur1_4_4", word: "哪", pinyin: "nǎ", meaning: "nào, cái nào", pos: "other", tip: "Có bộ Khẩu 口 đằng trước để hỏi." },
                { id: "cur1_4_5", word: "国", pinyin: "guó", meaning: "nước, quốc gia", pos: "n", tip: "Bộ Vi 囗 bao quanh chữ Ngọc 玉." }
            ],
            grammar: "1. Hỏi người '谁': Dùng hỏi 'Ai' (Ví dụ: 她是谁？).\n2. Hỏi quốc tịch: Sử dụng cấu trúc 'Subject + 是 + 哪国人？'.\n3. Trợ từ '呢': Dùng để hỏi lại câu hỏi trước đó cho đối tượng mới (Ví dụ: 你ne？).",
            quiz: [
                { q: "Câu 'Bạn là người nước nào?' dịch sang tiếng Trung là gì?", options: ["你是谁？", "你是哪国人？", "你叫什么名字？", "你是中国人吗？"], ans: "你是哪国人？" },
                { q: "Đại từ nhân xưng 'Cô ấy/Bà ấy' trong tiếng Trung dùng chữ nào?", options: ["他", "她", "你", "我"], ans: " she " }
            ]
        },
        {
            lessonId: 5,
            title: "Bài 5: 她女儿今年二十岁 - Con gái cô ấy năm nay 20 tuổi",
            desc: "Hỏi và nói về số lượng thành viên trong gia đình, hỏi tuổi tác.",
            dialogue: [
                { role: "A", zh: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà bạn có mấy người?" },
                { role: "B", zh: "我家有三口人。", pinyin: "Wǒ jiā yǒu sān kǒu rén.", vi: "Nhà tôi có ba người." },
                { role: "A", zh: "你女儿今年几岁了？", pinyin: "Nǐ nǚ'ér : jīnnián jǐ suì le?", vi: "Con gái bạn năm nay mấy tuổi rồi?" },
                { role: "B", zh: "她今年四岁了。", pinyin: "Tā : jīnnián sì suì le.", vi: "Con bé năm nay bốn tuổi rồi." }
            ],
            vocab: [
                { id: "cur1_5_1", word: "家", pinyin: "jiā", meaning: "nhà, gia đình", pos: "n", tip: "Mái nhà (bộ Miên 宀) nuôi heo (bộ Thỉ 豕) bên dưới." },
                { id: "cur1_5_2", word: "几", pinyin: "jǐ", meaning: "mấy, bao nhiêu (< 10)", pos: "other", tip: "Đại từ nghi vấn để hỏi số lượng nhỏ." },
                { id: "cur1_5_3", word: "口", pinyin: "kǒu", meaning: "miệng (lượng từ chỉ nhân khẩu)", pos: "q", tip: "Dùng riêng cho số người trong gia đình." },
                { id: "cur1_5_4", word: "女儿", pinyin: "nǚ'ér", meaning: "con gái", pos: "n", tip: "Nữ (女) kết hợp với Nhi (儿)." }
            ],
            grammar: "1. Hỏi số lượng với '几': Sử dụng khi ước tính số lượng nhỏ hơn 10.\n2. Hỏi tuổi tác cho trẻ em (<10 tuổi): Dùng '几岁' (Ví dụ: 你女儿几岁了？).\n3. Trợ từ '了' cuối câu: Biểu thị sự thay đổi trạng thái.",
            quiz: [
                { q: "Lượng từ nào dùng để đếm số người trong gia đình?", options: ["个", "本", "口", "张"], ans: "口" },
                { q: "Để hỏi tuổi cho trẻ em dưới 10 tuổi, ta dùng cụm từ nào?", options: ["多大", "几岁", "什么sự", "多少岁"], ans: "几岁" }
            ]
        },
        {
            lessonId: 6,
            title: "Bài 6: 我会说汉语 - Tôi biết nói tiếng Trung",
            desc: "Học cách nói về khả năng thông qua rèn luyện, nói về ẩm thực.",
            dialogue: [
                { role: "A", zh: "你会说汉语吗？", pinyin: "Nǐ huì shuō Hànyǔ ma?", vi: "Bạn biết nói tiếng Trung không?" },
                { role: "B", zh: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", vi: "Tôi biết nói tiếng Trung." },
                { role: "A", zh: "中国菜好吃吗？", pinyin: "Zhōngguó cài hǎochī ma?", vi: "Món ăn Trung Quốc ngon không?" },
                { role: "B", zh: "中国菜很好吃。", pinyin: "Zhōngguó cài hěn hǎochī.", vi: "Món ăn Trung Quốc rất ngon." }
            ],
            vocab: [
                { id: "cur1_6_1", word: "会", pinyin: "huì", meaning: "biết (qua học tập, rèn luyện)", pos: "v", tip: "Khả năng có được nhờ tích cực rèn luyện." },
                { id: "cur1_6_2", word: "说", pinyin: "shuō", meaning: "nói", pos: "v", tip: "Bộ Ngôn 言 (nói năng) đứng trước." },
                { id: "cur1_6_3", word: "菜", pinyin: "cài", meaning: "món ăn, rau", pos: "n", tip: "Bộ Thảo đầu 艹 phía trên liên quan đến rau cỏ." },
                { id: "cur1_6_4", word: "好吃", pinyin: "hǎochī", meaning: "ngon (ăn ngon)", pos: "adj", tip: "Hảo (好) ghép với Sức (吃)." }
            ],
            grammar: "1. Động từ năng nguyện '会': Biểu thị khả năng qua học tập. Phủ định dùng '不会'.\n2. Câu vị ngữ tính từ: 'Chủ ngữ + 很 + Tính từ'. '很' làm nhiệm vụ liên kết ngữ pháp.",
            quiz: [
                { q: "Động từ năng nguyện nào chỉ khả năng có được do học tập?", options: ["能", "可以", "会", "想"], ans: "会" },
                { q: "Phó từ chỉ mức độ thường đứng trước tính từ là từ nào?", options: ["不", "很", "太", "最"], ans: "很" }
            ]
        },
        {
            lessonId: 7,
            title: "Bài 7: 今天几号 - Hôm nay ngày mấy",
            desc: "Cách hỏi và nói về ngày, tháng, thứ trong tuần, lập kế hoạch thời gian.",
            dialogue: [
                { role: "A", zh: "请问，今天几号？", pinyin: "Qǐngwèn, jīntiān jǐ hào?", vi: "Xin hỏi, hôm nay ngày mấy?" },
                { role: "B", zh: "今天九月一号。", pinyin: "Jīntiān jiǔyuè yī hào.", vi: "Hôm nay ngày 1 tháng 9." },
                { role: "A", zh: "今天星期几？", pinyin: "Jīntiān xīngqī jǐ?", vi: "Hôm nay là thứ mấy?" },
                { role: "B", zh: "今天星期三。", pinyin: "Jīntiān xīngqī sān.", vi: "Hôm nay là thứ Tư." }
            ],
            vocab: [
                { id: "cur1_7_1", word: "请问", pinyin: "qǐngwèn", meaning: "xin hỏi", pos: "v", tip: "Thỉnh (请) kết hợp Vấn (问)." },
                { id: "cur1_7_2", word: "今天", pinyin: "jīntiān", meaning: "hôm nay", pos: "other", tip: "Kim (今) kết hợp Thiên (天)." },
                { id: "cur1_7_3", word: "号", pinyin: "hào", meaning: "ngày, số", pos: "n", tip: "Dùng trong khẩu ngữ hàng ngày để chỉ ngày." },
                { id: "cur1_7_4", word: "星期", pinyin: "xīngqī", meaning: "tuần, thứ", pos: "n", tip: "Tinh (星) kết hợp Kỳ (期)." }
            ],
            grammar: "1. Biểu đạt thời gian: Đi từ lớn đến nhỏ: 'Năm -> Tháng -> Ngày -> Thứ'.\n2. Thứ trong tuần: '星期一' (Thứ hai) ... '星期六' (Thứ bảy), riêng Chủ nhật dùng '星期天' hoặc '星期日'.",
            quiz: [
                { q: "Trong tiếng Trung, ngày thứ Tư được gọi là gì?", options: ["星期四", "星期三", "星期五", "星期二"], ans: "星期三" },
                { q: "Cụm từ lịch sự dùng khi bắt đầu hỏi thông tin là gì?", options: ["对不起", "没关系", "请问", "谢谢"], ans: "请问" }
            ]
        },
        {
            lessonId: 8,
            title: "Bài 8: 我想喝茶 - Tôi muốn uống trà",
            desc: "Bày tỏ mong muốn, dự định cá nhân, hỏi giá cả khi đi mua sắm.",
            dialogue: [
                { role: "A", zh: "你想喝什么？", pinyin: "Nǐ xiǎng hē shénme?", vi: "Bạn muốn uống gì?" },
                { role: "B", zh: "我想喝茶。", pinyin: "Wǒ xiǎng hē chá.", vi: "Tôi muốn uống trà." },
                { role: "A", zh: "下午你想去哪儿？", pinyin: "Xiàwǔ nǐ xiǎng qù nǎr?", vi: "Chiều nay bạn muốn đi đâu?" },
                { role: "B", zh: "下午我想去商店。我想买一个杯子。", pinyin: "Xiàwǔ wǒ xiǎng qù shāngdiàn. Wǒ xiǎng mǎi yí gè bēizi.", vi: "Chiều nay tôi muốn đi cửa hàng. Tôi muốn mua một chiếc ly." }
            ],
            vocab: [
                { id: "cur1_8_1", word: "想", pinyin: "xiǎng", meaning: "muốn, nghĩ, nhớ", pos: "v", tip: "Bộ Tương 相 phía trên kết hợp bộ Tâm 心 phía dưới." },
                { id: "cur1_8_2", word: "喝", pinyin: "hē", meaning: "uống", pos: "v", tip: "Uống bằng miệng nên có bộ Khẩu 口." },
                { id: "cur1_8_3", word: "茶", pinyin: "chá", meaning: "trà", pos: "n", tip: "Lá trà hái từ cây cỏ nên có bộ Thảo đầu 艹." },
                { id: "cur1_8_4", word: "商店", pinyin: "shāngdiàn", meaning: "cửa hàng", pos: "n", tip: "Thương (商) kết hợp Điếm (店)." }
            ],
            grammar: "1. Động từ năng nguyện '想': Đặt trước động từ để biểu thị mong muốn hoặc ý định làm gì.\n2. Đại từ chỉ nơi chốn '哪儿': Dùng để hỏi 'ở đâu, đi đâu'.",
            quiz: [
                { q: "Dịch câu 'Tôi muốn uống trà' sang tiếng Trung?", options: ["我想吃米饭", "我想喝茶", "我想去商店", "我不想喝茶"], ans: "我想喝茶" },
                { q: "Đại từ nghi vấn dùng để hỏi địa điểm 'ở đâu/đâu' là từ nào?", options: ["什么", "谁", "哪儿", "几"], ans: "哪儿" }
            ]
        },
        {
            lessonId: 9,
            title: "Bài 9: 你儿子在哪儿工作 - Con trai bạn làm việc ở đâu",
            desc: "Nói về vị trí của động vật, đồ vật và hỏi về địa điểm làm việc, nghề nghiệp.",
            dialogue: [
                { role: "A", zh: "小猫在哪儿？", pinyin: "Xiǎomāo zài nǎr?", vi: "Con mèo nhỏ ở đâu thế?" },
                { role: "B", zh: "小猫在那儿。", pinyin: "Xiǎomāo zài nàr.", vi: "Mèo nhỏ ở đằng kia." },
                { role: "A", zh: "你儿子在哪儿工作？", pinyin: "Nǐ érzi zài nǎr gōngzuò?", vi: "Con trai bạn làm việc ở đâu?" },
                { role: "B", zh: "我儿子在医院工作，他是医生。", pinyin: "Wǒ érzi zài yīyuàn gōngzuò, tā : shì yīshēng.", vi: "Con trai tôi làm việc ở bệnh viện, nó là bác sĩ." }
            ],
            vocab: [
                { id: "cur1_9_1", word: "小", pinyin: "xiǎo", meaning: "nhỏ, bé", pos: "adj", tip: "Ngược nghĩa với 大 (to lớn)." },
                { id: "cur1_9_2", word: "在", pinyin: "zài", meaning: "ở, tại", pos: "v", tip: "Biểu thị vị trí tồn tại của người hoặc vật." },
                { id: "cur1_9_3", word: "工作", pinyin: "gōngzuò", meaning: "làm việc, công việc", pos: "v", tip: "Có thể làm động từ hoặc danh từ." },
                { id: "cur1_9_4", word: "医院", pinyin: "yīyuàn", meaning: "bệnh viện", pos: "n", tip: "Nơi chữa trị chăm sóc người bệnh." }
            ],
            grammar: "1. Giới từ chỉ nơi chốn '在': Đặt trước cụm danh từ địa điểm làm trạng ngữ chỉ nơi chốn: 'S + 在 + Địa điểm + Động từ'.\n2. Hỏi nơi làm việc: Dùng cấu trúc 'S + 在哪儿工作？'.",
            quiz: [
                { q: "Từ nào có nghĩa là 'Bệnh viện'?", options: ["商店", "学校", "医院", "家"], ans: "医院" },
                { q: "Cấu trúc nói về hành động xảy ra tại địa điểm nào đúng?", options: ["S + 工作 + 在医院", "S + 在医院 + 工作", "在医院 + S + 工作", "S + 工作 + 医院"], ans: "S + 在医院 + 工作" }
            ]
        },
        {
            lessonId: 10,
            title: "Bài 10: 我能坐这儿吗 - Tôi có thể ngồi đây không",
            desc: "Hỏi về sự tồn tại của đồ vật, xin phép lịch sự trong không gian công cộng.",
            dialogue: [
                { role: "A", zh: "桌子上有什么？", pinyin: "Zhuōzi shàng yǒu shénme?", vi: "Trên bàn có cái gì vậy?" },
                { role: "B", zh: "桌子上有一个电脑和一本书。", pinyin: "Zhuōzi shàng yǒu yí gè diànnǎo hé yì běn shū.", vi: "Trên bàn có một chiếc máy tính và một cuốn sách." },
                { role: "A", zh: "我能坐这儿吗？", pinyin: "Wǒ néng zuò zhèr ma?", vi: "Tôi có thể ngồi đây không?" },
                { role: "B", zh: "请坐。", pinyin: "Qǐng zuò.", vi: "Xin mời ngồi." }
            ],
            vocab: [
                { id: "cur1_10_1", word: "桌子", pinyin: "zhuōzi", meaning: "cái bàn", pos: "n", tip: "Chữ 桌 có bộ Mộc 木 ở dưới chỉ chất liệu gỗ." },
                { id: "cur1_10_2", word: "电脑", pinyin: "diànnǎo", meaning: "máy vi tính", pos: "n", tip: "Điện (电) kết hợp Não (脑)." },
                { id: "cur1_10_3", word: "和", pinyin: "hé", meaning: "và, với", pos: "conj", tip: "Dùng để nối các danh từ song hành." },
                { id: "cur1_10_4", word: "请", pinyin: "qǐng", meaning: "xin mời", pos: "v", tip: "Đứng đầu câu thể hiện lời mời lịch thiệp." }
            ],
            grammar: "1. Câu tồn tại với '有': 'Địa điểm + 有 + Vật thể'.\n2. Động từ năng nguyện '能': Biểu thị khả năng hoặc xin phép làm việc gì đó.\n3. Câu cầu khiến lịch sự '请': Thường kết hợp '请 + Động từ'.",
            quiz: [
                { q: "Từ nào dùng để nối hai danh từ song hành có nghĩa là 'Và'?", options: ["也", "和", "được", "đều"], ans: "和" },
                { q: "Để mời ai đó ngồi một cách lịch sự, ta nói gì?", options: ["请坐", "请问", "谢谢", "再见"], ans: "请坐" }
            ]
        },
        {
            lessonId: 11,
            title: "Bài 11: 现在几点 - Bây giờ là mấy giờ",
            desc: "Hỏi và nói về thời gian giờ giấc, sắp xếp thời gian biểu hàng ngày.",
            dialogue: [
                { role: "A", zh: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", vi: "Bây giờ là mấy giờ?" },
                { role: "B", zh: "现在十点十分。", pinyin: "Xiànzài shí diǎn shí fēn.", vi: "Bây giờ là mười giờ mười phút." },
                { role: "A", zh: "中午几点吃饭？", pinyin: "Zhōngwǔ jǐ diǎn chīfàn?", vi: "Buổi trưa mấy giờ ăn cơm?" },
                { role: "B", zh: "十二点吃饭。", pinyin: "Shí'er diǎn chīfàn.", vi: "Mười hai giờ ăn cơm." }
            ],
            vocab: [
                { id: "cur1_11_1", word: "现zài", pinyin: "xiànzài", meaning: "bây giờ, hiện tại", pos: "other", tip: "Hiện (现) kết hợp Tại (在)." },
                { id: "cur1_11_2", word: "点", pinyin: "diǎn", meaning: "giờ (mốc thời gian)", pos: "n", tip: "Dùng để nói về giờ chẵn." },
                { id: "cur1_11_3", word: "分", pinyin: "fēn", meaning: "phút", pos: "n", tip: "Dùng để nói về phút lẻ." },
                { id: "cur1_11_4", word: "吃饭", pinyin: "chīfàn", meaning: "ăn cơm", pos: "v", tip: "Cụm động từ chỉ hoạt động ăn cơm." }
            ],
            grammar: "1. Hỏi giờ: '现在几点？'.\n2. Nói giờ phút: 'Số + 点 + Số + 分'.\n3. Trạng ngữ thời gian: Đứng trước động từ vị ngữ chính (Ví dụ: 我十二点吃饭).",
            quiz: [
                { q: "Cụm từ nghi vấn dùng để hỏi thời gian 'Khi nào/Bao giờ' là gì?", options: ["在哪儿", "为什么", "什么时候", "几sự"], ans: "什么时候" },
                { q: "Nói mốc thời gian '10 giờ 10 phút' như thế nào?", options: ["十点十分", "十分十点", "十点几分", "现在十点"], ans: "十点十分" }
            ]
        },
        {
            lessonId: 12,
            title: "Bài 12: 明天天气怎么样 - Thời tiết ngày mai thế nào",
            desc: "Hỏi và nói về thời tiết, thảo luận về tình hình sức khỏe và nhiệt độ.",
            dialogue: [
                { role: "A", zh: "昨天北京的天气怎么样？", pinyin: "Zuótiān Běijīng de tiānqì zěnmeyàng?", vi: "Thời tiết Bắc Kinh hôm qua thế nào?" },
                { role: "B", zh: "天气太热了。", pinyin: "Tiānqì tài rè le.", vi: "Thời tiết nóng quá." },
                { role: "A", zh: "明天天气怎么样？", pinyin: "Míngtiān tiānqì zěnmeyàng?", vi: "Ngày mai thời tiết thế nào?" },
                { role: "B", zh: "明天天气很好，不冷不热。", pinyin: "Míngtiān tiānqì hěn hǎo, bù lěng bú rè.", vi: "Thời tiết ngày mai rất tốt, không lạnh cũng không nóng." }
            ],
            vocab: [
                { id: "cur1_12_1", word: "怎么样", pinyin: "zěnmeyàng", meaning: "như thế nào, ra sao", pos: "other", tip: "Đại từ nghi vấn hỏi tính chất, tình trạng." },
                { id: "cur1_12_2", word: "太...了", pinyin: "tài...le", meaning: "quá... rồi", pos: "other", tip: "Biểu thị mức độ cực kỳ cao, cảm thán." },
                { id: "cur1_12_3", word: "热", pinyin: "rè", meaning: "nóng", pos: "adj", tip: "Có bộ Hỏa 灬 phía dưới chỉ nguồn nhiệt." },
                { id: "cur1_12_4", word: "冷", pinyin: "lěng", meaning: "lạnh", pos: "adj", tip: "Có bộ Băng 冫 bên trái chỉ lạnh giá." }
            ],
            grammar: "1. Hỏi tình trạng '怎么样': Dùng hỏi về thời tiết, sức khỏe.\n2. Cấu trúc cảm thán '太 + Adj + 了': Biểu đạt mức độ cao.\n3. Động từ '会' chỉ khả năng xảy ra của sự việc tự nhiên trong tương lai.",
            quiz: [
                { q: "Cấu trúc dùng để cảm thán '...quá... rồi' là gì?", options: ["很...了", "太...了", "最...了", "不...了"], ans: "太...le" },
                { q: "Từ nào có nghĩa là 'mưa'?", options: ["下雨", "天气", "怎么样", "冷"], ans: "下雨" }
            ]
        },
        {
            lessonId: 13,
            title: "Bài 13: 他在学做中国菜呢 - Anh ấy đang học nấu món ăn Trung Quốc",
            desc: "Nói về hành động đang diễn ra tại thời điểm nói, gọi điện thoại hỏi thăm.",
            dialogue: [
                { role: "A", zh: "喂，你在做什么呢？", pinyin: "Wéi, nǐ zài zuò shénme ne?", vi: "Alo, bạn đang làm gì thế?" },
                { role: "B", zh: "我在看书呢。", pinyin: "Wǒ zài kànshū ne.", vi: "Tôi đang đọc sách." },
                { role: "A", zh: "大卫也在看书吗？", pinyin: "Dàwèi yě zài kànshū ma?", vi: "David cũng đang đọc sách à?" },
                { role: "B", zh: "他没看书，他在学做中国菜呢。", pinyin: "Tā méi kànshū, tā zài xué zuò Zhōngguó cài ne.", vi: "Anh ấy không đọc sách, anh ấy đang học nấu món ăn Trung Quốc đấy." }
            ],
            vocab: [
                { id: "cur1_13_1", word: "喂", pinyin: "wéi", meaning: "alo (gọi điện thoại)", pos: "other", tip: "Từ ngữ khí chuyên dùng khi đàm thoại điện thoại." },
                { id: "cur1_13_2", word: "在...呢", pinyin: "zài...ne", meaning: "đang... đấy", pos: "other", tip: "Cấu trúc nhấn mạnh hành động đang diễn tiến." },
                { id: "cur1_13_3", word: "看书", pinyin: "kànshū", meaning: "đọc sách", pos: "v", tip: "Khán (看 - nhìn) kết hợp Thư (书 - sách)." },
                { id: "cur1_13_4", word: "学", pinyin: "xué", meaning: "học, học tập", pos: "v", tip: "Đứa trẻ (bộ Tử 子) học chữ bên dưới mái trường." }
            ],
            grammar: "1. Biểu thị hành động tiếp diễn '在...呢': Cấu trúc 'S + 在 + Động từ + (Tân ngữ) + 呢'.\n2. Phủ định hành động tiếp diễn: Dùng từ '没' hoặc 'Hello', đồng thời loại bỏ trợ từ '呢'.",
            quiz: [
                { q: "Cấu trúc nào biểu thị hành động đang diễn ra tại thời điểm nói?", options: ["想...了", "太...了", "在...呢", "会...吗"], ans: "在...ne" },
                { q: "Dịch cụm từ '看书' sang tiếng Việt?", options: ["Học tập", "Nấu ăn", "Đọc sách", "Xem phim"], ans: "Đọc sách" }
            ]
        },
        {
            lessonId: 14,
            title: "Bài 14: 她买了不少衣服 - Cô ấy đã mua không ít quần áo",
            desc: "Nói về sự việc đã xảy ra trong quá khứ, mua sắm đồ đạc, quần áo.",
            dialogue: [
                { role: "A", zh: "昨天上午你去哪儿了？", pinyin: "Zuótiān shàngwǔ nǐ qù nǎr le?", vi: "Sáng hôm qua bạn đi đâu thế?" },
                { role: "B", zh: "我去商店买东西了。", pinyin: "Wǒ qù shāngdiàn mǎi dōngxi le.", vi: "Tôi đi cửa hàng mua đồ rồi." },
                { role: "A", zh: "你买什么了？", pinyin: "Nǐ mǎi shénme le?", vi: "Bạn đã mua cái gì thế?" },
                { role: "B", zh: "我买了一点苹果。", pinyin: "Wǒ mǎi le yìdiǎn píngguǒ.", vi: "Tôi đã mua một ít táo." }
            ],
            vocab: [
                { id: "cur1_14_1", word: "东西", pinyin: "dōngxi", meaning: "đồ đạc, sự vật", pos: "n", tip: "Đông (东) kết hợp Tây (西) tạo nghĩa bao quát." },
                { id: "cur1_14_2", word: "先生", pinyin: "xiānsheng", meaning: "ông, ngài", pos: "n", tip: "Từ ngữ xưng hô trang trọng dành cho nam giới." },
                { id: "cur1_14_3", word: "不少", pinyin: "bùshǎo", meaning: "không ít, khá nhiều", pos: "adj", tip: "Phủ định của 少 (ít) tức là nhiều." },
                { id: "cur1_14_4", word: "衣服", pinyin: "yīfu", meaning: "quần áo", pos: "n", tip: "Y (衣) phục (服)." }
            ],
            grammar: "1. Trợ từ động thái '了': Đặt ngay sau động từ biểu thị hành động đã hoàn thành trong quá khứ.\n2. Từ chỉ lượng '一点儿': Biểu thị số lượng ít, đặt trước danh từ.",
            quiz: [
                { q: "Từ nào có nghĩa là 'Quần áo' trong tiếng Trung?", options: ["东西", "衣服", "苹果", "杯子"], ans: "衣服" },
                { q: "Dịch nghĩa của từ '不少'?", options: ["Rất ít", "Không ít / Khá nhiều", "Không có", "Quá ít"], ans: "Không ít / Khá nhiều" }
            ]
        },
        {
            lessonId: 15,
            title: "Bài 15: 我是坐飞机来的 - Tôi đến bằng máy bay",
            desc: "Nhấn mạnh về thời gian, địa điểm hoặc phương thức của một hành động đã xảy ra.",
            dialogue: [
                { role: "A", zh: "你和李小姐是什么时候认识的？", pinyin: "Nǐ hé Lǐ xiǎojiě :  shì shénme shíhou rènshi de?", vi: "Bạn và cô Lý quen nhau từ bao giờ?" },
                { role: "B", zh: "我们是2011年9月认识 của chúng tôi.", pinyin: "Wǒmen :  shì èr líng yī yī nián jiǔyuè rènshi de.", vi: "Chúng tôi quen nhau vào tháng 9 năm 2011." },
                { role: "A", zh: "你们是怎么来饭店的？", pinyin: "Nǐmen :  shì zěnme lái fàndiàn de?", vi: "Các bạn đến nhà hàng bằng phương tiện gì?" },
                { role: "B", zh: "我们是坐出租车来的。", pinyin: "Wǒmen :  shì zuò chūzūchē lái de.", vi: "Chúng tôi đến bằng xe taxi." }
            ],
            vocab: [
                { id: "cur1_15_1", word: "认识", pinyin: "rènshi", meaning: "quen biết, nhận biết", pos: "v", tip: "Nhận (认) kết hợp Thức (识)." },
                { id: "cur1_15_2", word: "学校", pinyin: "xuéxiào", meaning: "trường học", pos: "n", tip: "Học (学) kết hợp Hiệu (校)." },
                { id: "cur1_15_3", word: "飞机", pinyin: "fēijī", meaning: "máy bay", pos: "n", tip: "Phi (飞 - bay) kết hợp Cơ (机 - máy móc)." },
                { id: "cur1_15_4", word: "出租车", pinyin: "chūzūchē", meaning: "xe taxi", pos: "n", tip: "Xe cho thuê có người lái phục vụ hành khách." }
            ],
            grammar: "1. Cấu trúc nhấn mạnh '是... de': Dùng nhấn mạnh thời gian, địa điểm hoặc phương thức hành động đã hoàn tất trong quá khứ.\n2. Cách đọc năm: Đọc từng chữ số đơn lẻ kèm theo từ '年' phía sau.",
            quiz: [
                { q: "Để hỏi về phương thức di chuyển 'Bạn đến đây bằng cách nào?', ta nói câu nào?", options: ["你是sự？", "你什么时候来？", "你是怎么来的？", "你在哪儿？"], ans: "你是怎么来的？" },
                { q: "Từ nào có nghĩa là 'Xe Taxi'?", options: ["飞机", "出租车", "椅子", "商店"], ans: "出租车" }
            ]
        }
    ],
    2: [
        {
            lessonId: 1,
            title: "Bài 1: 九月去北京旅游最好 - Đi du lịch Bắc Kinh vào tháng 9 là tốt nhất",
            desc: "Thảo luận về thời gian đi du lịch tốt nhất, nói về sở thích cá nhân và thời tiết.",
            dialogue: [
                { role: "A", zh: "你觉得什么时候去北京旅游最好？", pinyin: "Nǐ juéde shénme shíhou qù Běijīng lǚyóu zuì hǎo?", vi: "Bạn thấy đi du lịch Bắc Kinh lúc nào là tốt nhất?" },
                { role: "B", zh: "九月去北京旅游最好。", pinyin: "Jiǔyuè qù Běijīng lǚyóu zuì hǎo.", vi: "Tháng Chín đi du lịch Bắc Kinh là tốt nhất." },
                { role: "A", zh: "为什么？", pinyin: "Wèishénme?", vi: "Tại sao vậy?" },
                { role: "B", zh: "因为九月的北京天气不冷 cũng không nóng.", pinyin: "Yīnwèi jiǔyuè de Běijīng tiānqì bù lěng yě bú rè.", vi: "Bởi vì thời tiết Bắc Kinh tháng Chín không lạnh cũng không nóng." }
            ],
            vocab: [
                { id: "cur2_1_1", word: "旅游", pinyin: "lǚyóu", meaning: "du lịch, đi chơi", pos: "v", tip: "Đi chơi xa thưởng ngoạn, lữ (旅) kết hợp du (游)." },
                { id: "cur2_1_2", word: "觉得", pinyin: "juéde", meaning: "cảm thấy, cho rằng", pos: "v", tip: "Dùng để đưa ra ý kiến, nhận định cá nhân." },
                { id: "cur2_1_3", word: "最", pinyin: "zuì", meaning: "nhất", pos: "other", tip: "Phó từ chỉ mức độ cao nhất (Ví dụ: 最好)." },
                { id: "cur2_1_4", word: "为什么", pinyin: "wèishénme", meaning: "tại sao, vì sao", pos: "other", tip: "Đại từ dùng để hỏi lý do." },
                { id: "cur2_1_5", word: "因为", pinyin: "yīnwèi", meaning: "bởi vì", pos: "conj", tip: "Mở đầu vế câu chỉ nguyên nhân, thường đi với 所以." }
            ],
            grammar: "1. Phó từ chỉ mức độ '最': Đứng trước tính từ hoặc động từ tâm lý biểu thị vị trí số một (Ví dụ: 最好 - tốt nhất, 最喜欢 - thích nhất).\n2. Cặp liên từ chỉ nguyên nhân - kết quả: '因为... (bởi vì)... 所以... (cho nên...)'.\n3. Biểu đạt sự trung hòa: '不... 也不...' (Không... cũng không...) chỉ trạng thái ôn hòa vừa phải.",
            quiz: [
                { q: "Trong tiếng Trung, phó từ so sánh nhất 'Nhất' là từ nào?", options: ["很", "太", "最", "真"], ans: "最" },
                { q: "Cặp liên từ chỉ quan hệ nhân quả là cặp từ nào?", options: ["虽然...đặc biệt...", "因为...所以...", "不但...而且...", "如果...就..."], ans: "因为...所以..." },
                { q: "Dịch nghĩa của từ '觉得'?", options: ["Cảm thấy / Nghĩ rằng", "Nhìn thấy", "Nghe thấy", "Biết được"], ans: "Cảm thấy / Nghĩ rằng" }
            ]
        },
        {
            lessonId: 2,
            title: "Bài 2: 我每天六点起床 - Tôi thức dậy lúc sáu giờ mỗi ngày",
            desc: "Nói về thời gian biểu sinh hoạt hàng ngày, rèn luyện thể thao và sức khỏe.",
            dialogue: [
                { role: "A", zh: "你每天几点起床？", pinyin: "Nǐ měitiān jǐ diǎn qǐchuáng?", vi: "Mỗi ngày bạn thức dậy lúc mấy giờ?" },
                { role: "B", zh: "我每天六点起床。", pinyin: "Wǒ měitiān liù diǎn qǐchuáng.", vi: "Tôi thức dậy lúc sáu giờ mỗi ngày." },
                { role: "A", zh: "你身体怎么样？", pinyin: "Nǐ shēntǐ zěnmeyàng?", vi: "Sức khỏe của bạn thế nào?" },
                { role: "B", zh: "我身体很好。我每天都跑步。", pinyin: "Wǒ shēntǐ hěn hǎo. Wǒ měitiān dōu pǎobù.", vi: "Sức khỏe tôi rất tốt. Mỗi ngày tôi đều chạy bộ." }
            ],
            vocab: [
                { id: "cur2_2_1", word: "每天", pinyin: "měitiān", meaning: "mỗi ngày, hàng ngày", pos: "other", tip: "Mỗi (每) kết hợp Thiên (天) biểu thị tính đều đặn." },
                { id: "cur2_2_2", word: "起床", pinyin: "qǐchuáng", meaning: "thức dậy, rời giường", pos: "v", tip: "Khởi (起 - nâng lên) kết hợp Sàng (床 - cái giường)." },
                { id: "cur2_2_3", word: "身体", pinyin: "shēntǐ", meaning: "thân thể, sức khỏe", pos: "n", tip: "Thân (身) kết hợp Thể (体)." },
                { id: "cur2_2_4", word: "跑步", pinyin: "pǎobù", meaning: "chạy bộ", pos: "v", tip: "Động từ ly hợp chạy bộ, bộ Túc 足 bên trái chữ 跑 chỉ hành động của chân." }
            ],
            grammar: "1. Từ chỉ tần suất '每天' và phó từ '都': Thường kết hợp thành cấu trúc 'S + 每天 + 都 + Động từ' chỉ một thói quen thường nhật.\n2. Giới từ '对' (đối với): Biểu thị mối quan hệ tác động (Ví dụ: 跑步对身体很好 - Chạy bộ rất tốt đối với sức khỏe).",
            quiz: [
                { q: "Cụm từ 'Thức dậy' trong tiếng Trung dùng chữ nào?", options: ["睡觉", "吃饭", "起床", "唱歌"], ans: "起床" },
                { q: "Chữ '跑' (trong chạy bộ) có chứa bộ thủ nào liên quan đến bộ phận cơ thể?", options: ["Bộ Khẩu", "Bộ Túc (chân)", "Bộ Thủ (tay)", "Bộ Tâm"], ans: "Bộ Túc (chân)" },
                { q: "Dịch câu 'Chạy bộ rất tốt cho sức khỏe'?", options: ["跑步对身体不好", "跑步对身体很好", "跑步不身体好", "我不跑步身体好"], ans: "跑步对身体很好" }
            ]
        },
        {
            lessonId: 3,
            title: "Bài 3: 左边那个红色的是我的 - Cái màu đỏ bên trái là của tôi",
            desc: "Học cách xác định vị trí phương hướng, màu sắc và cấu trúc sở hữu tỉnh lược.",
            dialogue: [
                { role: "A", zh: "哪个杯子是你的？", pinyin: "Nǎge bēizi :  shì nǐ de?", vi: "Chiếc ly nào là của bạn vậy?" },
                { role: "B", zh: "左边那个红色的是我的。", pinyin: "Zuǒbian nàge hóngsè de :  shì wǒ de.", vi: "Cái màu đỏ bên trái kia là của tôi đấy." },
                { role: "A", zh: "这个呢？", pinyin: "Zhège ne?", vi: "Còn cái này thì sao?" },
                { role: "B", zh: "这个是我姐姐给我的。", pinyin: "Zhège :  shì wǒ jiějie gěi wǒ de.", vi: "Cái này là do chị gái tặng cho tôi." }
            ],
            vocab: [
                { id: "cur2_3_1", word: "左边", pinyin: "zuǒbian", meaning: "bên trái", pos: "other", tip: "Từ chỉ phương vị bên tay trái, ngược nghĩa với 右边." },
                { id: "cur2_3_2", word: "红色", pinyin: "hóngsè", meaning: "màu đỏ", pos: "n", tip: "Hồng (红 - màu đỏ) kết hợp Sắc (色 - màu sắc)." },
                { id: "cur2_3_3", word: "姐姐", pinyin: "jiějie", meaning: "chị gái", pos: "n", tip: "Hai chữ giống nhau ghép lại, có bộ Nữ 女 đứng đầu." },
                { id: "cur2_3_4", word: "给", pinyin: "gěi", meaning: "cho, tặng", pos: "v", tip: "Đưa vật phẩm hoặc thực hiện hành động chuyển giao." }
            ],
            grammar: "1. Cấu trúc chữ '的' rút gọn danh từ: Khi danh từ trung tâm đã được đề cập rõ (ở đây là '杯子'), ta có thể bỏ danh từ đó và chỉ giữ lại '红色 de / 我的' để câu nói ngắn gọn.\n2. Giới từ '给': Cấu trúc 'A + 给 + B + Động từ' (A làm việc gì đó cho B).",
            quiz: [
                { q: "Từ phương vị chỉ 'Bên trái' là từ nào?", options: ["右边", "左边", "旁边", "下面"], ans: "左边" },
                { q: "Chữ '的' trong câu '红色的是我的' dùng để làm gì?", options: ["Hỏi thăm", "Cảm thán", "Rút gọn danh từ đã biết phía trước", "Phủ định"], ans: "Rút gọn danh từ đã biết phía trước" },
                { q: "Dịch từ 'Chị gái' sang tiếng Trung?", options: ["妈妈", "妹妹", "姐姐", "老师"], ans: "姐姐" }
            ]
        },
        {
            lessonId: 4,
            title: "Bài 4: 这个工作是他帮 tôi giới thiệu de - Công việc này là do anh ấy giới thiệu cho tôi",
            desc: "Cách nói về việc giới thiệu công việc, xin sự trợ giúp và dùng cấu trúc nhấn mạnh.",
            dialogue: [
                { role: "A", zh: "你在哪儿工作？", pinyin: "Nǐ zài nǎr gōngzuò?", vi: "Bạn đang làm việc ở đâu vậy?" },
                { role: "B", zh: "我在一个商店工作。", pinyin: "Wǒ zài yí gè shāngdiàn gōngzuò.", vi: "Tôi làm việc tại một cửa hàng." },
                { role: "A", zh: "这个工作怎么样？", pinyin: "Zhège gōngzuò zěnmeyàng?", vi: "Công việc này thế nào?" },
                { role: "B", zh: "很好。这个工作是他帮 tôi giới thiệu de。", pinyin: "Hěn hǎo. Zhège gōngzuò :  shì tā bāng wǒ jièshào de.", vi: "Rất tốt. Công việc này là do anh ấy giới thiệu cho tôi đấy." }
            ],
            vocab: [
                { id: "cur2_4_1", word: "介绍", pinyin: "jièshào", meaning: "giới thiệu", pos: "v", tip: "Giới (介) kết hợp Thiệu (绍) nhằm làm cầu nối thông tin." },
                { id: "cur2_4_2", word: "帮", pinyin: "bāng", meaning: "giúp, giúp đỡ", pos: "v", tip: "Hỗ trợ người khác hoàn thành hành động." },
                { id: "cur2_4_3", word: "新", pinyin: "xīn", meaning: "mới", pos: "adj", tip: "Đối lập hoàn toàn với Cựu/Cổ (旧 - cũ)." }
            ],
            grammar: "1. Nhấn mạnh tác giả/phương thức bằng cấu trúc '是... de': Dùng nhấn mạnh đối tượng thực hiện hành động trong quá khứ (Ví dụ: 是他帮我介绍的 - là do anh ấy giới thiệu).\n2. Giới từ '帮': Diễn tả việc giúp đỡ ai đó làm việc gì (S + 帮 + O + Động từ).",
            quiz: [
                { q: "Từ nào có nghĩa là 'Giới thiệu'?", options: ["工作", "学习", "介绍", "觉得"], ans: "介绍" },
                { q: "Cấu trúc 'S + 是 + [Ai đó] + Động từ + 的' dùng để làm gì?", options: ["Hỏi ý kiến", "Nhấn mạnh đối tượng thực hiện hành động", "Cảm thán thời tiết", "Phủ định khả năng"], ans: "Nhấn mạnh đối tượng thực hiện hành động" },
                { q: "Dịch câu 'Anh ấy giúp tôi học tiếng Trung'?", options: ["他帮我学习汉语", "他介绍我学习汉语", "他觉得 học tập Hà ngữ hảo", "我帮他学习汉语"], ans: "他帮 wǒ học tập Hà ngữ" }
            ]
        },
        {
            lessonId: 5,
            title: "Bài 5: 送你一只猫 - Tặng bạn một con mèo",
            desc: "Nói về sở thích nuôi thú cưng, các hoạt động thể thao ngoài trời.",
            dialogue: [
                { role: "A", zh: "这是你买的猫吗？", pinyin: "Zhè :  shì nǐ mǎi de māo ma?", vi: "Đây là con mèo bạn mới mua phải không?" },
                { role: "B", zh: "不是，这是我朋友送我的。", pinyin: "Bú :  shì, zhè :  shì wǒ péngyou sòng wǒ de.", vi: "Không phải, cái này là do bạn tôi tặng đấy." },
                { role: "A", zh: "你会踢足球吗？", pinyin: "Nǐ huì tī zúqiú ma?", vi: "Bạn biết đá bóng không?" },
                { role: "B", zh: "我会踢。我们下午去踢球吧。", pinyin: "Wǒ huì tī. Wǒmen xiàwǔ qù tīqiú ba.", vi: "Tôi biết đá chứ. Chiều nay chúng ta đi đá bóng đi." }
            ],
            vocab: [
                { id: "cur2_5_1", word: "送", pinyin: "sòng", meaning: "tặng, tiễn", pos: "v", tip: "Biếu tặng quà cáp hoặc đưa tiễn ai đó ra về." },
                { id: "cur2_5_2", word: "踢足球", pinyin: "tī zúqiú", meaning: "đá bóng, đá bóng đá", pos: "v", tip: "Thích (踢 - đá) kết hợp Túc cầu (足球 - quả bóng đá)." },
                { id: "cur2_5_3", word: "足球", pinyin: "zúqiú", meaning: "quả bóng đá, môn bóng đá", pos: "n", tip: "Môn thể thao dùng chân đá quả bóng tròn." },
                { id: "cur2_5_4", word: "吧", pinyin: "ba", meaning: "đi, nhé (trợ từ ngữ khí)", pos: "p", tip: "Đặt ở cuối câu cầu khiến hoặc gợi ý đề xuất." }
            ],
            grammar: "1. Động từ hai tân ngữ '送': Cấu trúc 'A + 送 + B (Tân ngữ gián tiếp chỉ người) + C (Tân ngữ trực tiếp chỉ vật)'.\n2. Trợ từ ngữ khí gợi ý '吧': Đặt cuối câu để đưa ra đề nghị, rủ rê nhẹ nhàng (Ví dụ: 我们去吧 - Chúng ta đi nhé).",
            quiz: [
                { q: "Môn thể thao 'Đá bóng' trong tiếng Trung viết như thế nào?", options: ["跑步", "打篮球", "踢足球", "唱歌"], ans: "踢足球" },
                { q: "Trợ từ ngữ khí đặt cuối câu dùng để rủ rê, đề nghị nhẹ nhàng là chữ nào?", options: ["吗", "呢", "吧", "的"], ans: "吧" },
                { q: "Dịch câu 'Đây là quà bạn tôi tặng tôi'?", options: ["这是我朋友送我的", "这是我朋友买的", "这是我送朋友的", "这是我的猫"], ans: "这是我朋友送我的" }
            ]
        },
        {
            lessonId: 6,
            title: "Bài 6: 怎么突然找不到了 - Sao đột nhiên lại không tìm thấy nữa",
            desc: "Nói về việc tìm kiếm đồ vật bị thất lạc, dùng phó từ chỉ sự ngăn cấm.",
            dialogue: [
                { role: "A", zh: "我的手机在哪儿？你看见了吗？", pinyin: "Wǒ de shǒu jī zài nǎr? Nǐ kàn jiàn le ma?", vi: "Điện thoại của tôi ở đâu rồi? Bạn có nhìn thấy không?" },
                { role: "B", zh: "刚才还在桌子上呢，怎么突然找不到了？", pinyin: "Gāngcái hái zài zhuōzi shàng ne, zěnme tūrán zhǎo bú dào le?", vi: "Vừa nãy vẫn còn ở trên bàn mà, sao tự nhiên lại tìm không thấy nữa rồi?" },
                { role: "A", zh: "别着急，我用我的电脑找找看。", pinyin: "Bié zháojí, wǒ yòng wǒ de diànnǎo zhǎozhǎo kàn.", vi: "Đừng sốt ruột, để tôi dùng máy tính tìm thử xem." }
            ],
            vocab: [
                { id: "cur2_6_1", word: "突然", pinyin: "tūrán", meaning: "đột nhiên, bỗng nhiên", pos: "adj", tip: "Sự việc diễn ra bất ngờ ngoài dự kiến." },
                { id: "cur2_6_2", word: "刚才", pinyin: "gāngcái", meaning: "vừa nãy, vừa mới", pos: "other", tip: "Danh từ chỉ thời gian rất gần thời điểm nói." },
                { id: "cur2_6_3", word: "别", pinyin: "bié", meaning: "đừng (phó từ ngăn cấm)", pos: "other", tip: "Đứng trước động từ biểu thị khuyên ngăn hoặc cấm đoán." },
                { id: "cur2_6_4", word: "找", pinyin: "zhǎo", meaning: "tìm, tìm kiếm, thối tiền", pos: "v", tip: "Có bộ Thủ 扌 chỉ hành động tìm bằng tay." }
            ],
            grammar: "1. Bổ ngữ kết quả phủ định '找不到': Biểu thị nỗ lực tìm kiếm nhưng không thu được kết quả mong muốn.\n2. Phó từ ngăn cấm '别': Sử dụng cấu trúc '别 + Động từ/Tính từ' đồng nghĩa với cụm từ '不要...'.",
            quiz: [
                { q: "Phó từ có nghĩa là 'Đừng' dùng khuyên ngăn là từ nào?", options: ["不", "没", "别", "太"], ans: "别" },
                { q: "Cụm từ 'Tìm không thấy' trong tiếng Trung nói thế nào?", options: ["看得到", "找不到", "买不到", "听不到"], ans: "找不到" },
                { q: "Dịch nghĩa của từ '刚才'?", options: ["Ngày mai", "Hôm qua", "Vừa nãy", "Bây giờ"], ans: "Vừa nãy" }
            ]
        },
        {
            lessonId: 7,
            title: "Bài 7: 你家离公司远吗 - Nhà bạn cách công ty xa không",
            desc: "Hỏi han và biểu đạt cự ly, khoảng cách giữa các địa điểm, phương tiện giao thông.",
            dialogue: [
                { role: "A", zh: "你家离公司远吗？", pinyin: "Nǐ jiā lí gōngsī yuǎn ma?", vi: "Nhà bạn cách công ty xa không?" },
                { role: "B", zh: "不远，很近。坐地铁十五分钟就 do 。", pinyin: "Bù yuǎn, hěn jìn. Zuò dìtiě shíwǔ fēnzhōng jiù dào.", vi: "Không xa, rất gần. Đi tàu điện ngầm chỉ mười lăm phút là tới." },
                { role: "A", zh: "你每天怎么去 công ty ？", pinyin: "Nǐ měitiān zěnme qù gōngsī?", vi: "Mỗi ngày bạn đi làm bằng cách nào?" },
                { role: "B", zh: "我有时候坐公共汽车，有时候坐地铁。", pinyin: "Wǒ yǒushíhou zuò gōnggòng qìchē, yǒushíhou zuò dìtiě.", vi: "Tôi lúc thì đi xe buýt, lúc thì đi tàu điện ngầm." }
            ],
            vocab: [
                { id: "cur2_7_1", word: "离", pinyin: "lí", meaning: "cách, ly biểu", pos: "p", tip: "Giới từ dùng để biểu thị khoảng cách không gian hoặc thời gian." },
                { id: "cur2_7_2", word: "远", pinyin: "yuǎn", meaning: "xa", pos: "adj", tip: "Khoảng cách địa lý lớn, có bộ Sước 辶 chỉ chuyển động đường dài." },
                { id: "cur2_7_3", word: "近", pinyin: "jìn", meaning: "gần", pos: "adj", tip: "Khoảng cách địa lý ngắn, đối lập hoàn toàn với 远." },
                { id: "cur2_7_4", word: "地铁", pinyin: "dìtiě", meaning: "tàu điện ngầm", pos: "n", tip: "Địa (地) kết hợp Thiết (铁)." },
                { id: "cur2_7_5", word: "公共汽车", pinyin: "gōnggòng qìchē", meaning: "xe buýt, xe công cộng", pos: "n", tip: "Công cộng (公共) kết hợp xe hơi (汽车)." }
            ],
            grammar: "1. Giới từ chỉ khoảng cách '离': Cấu trúc 'Địa điểm A + 离 + Địa điểm B + 远/近' (A cách B xa/gần).\n2. Cụm từ biểu thị phương tiện '坐/乘 + Phương tiện': Chỉ phương thức di chuyển (Ví dụ: 坐地铁).\n3. Liên từ chỉ sự luân phiên '有时候... 有时候...': Biểu thị lúc thế này lúc thế khác.",
            quiz: [
                { q: "Giới từ dùng để nói khoảng cách 'Địa điểm A cách Địa điểm B...' là chữ nào?", options: ["在", "从", "离", "向"], ans: "离" },
                { q: "Từ nào có nghĩa là 'Tàu điện ngầm'?", options: ["公共汽车", "出租车", "地铁", "飞机"], ans: "地铁" },
                { q: "Ngược nghĩa với tính từ '远' (xa) là tính từ nào?", options: ["高", "矮", "近", "小"], ans: "近" }
            ]
        },
        {
            lessonId: 8,
            title: "Bài 8: 让我想想再告诉你 - Để tôi suy nghĩ chút rồi nói cho bạn biết",
            desc: "Sử dụng câu kiêm ngữ để ra lệnh hoặc nhờ vả, thể hiện sự cân nhắc suy nghĩ.",
            dialogue: [
                { role: "A", zh: "晚上我们一起去吃饭，怎么样？", pinyin: "Wǎnshang wǒmen yìqǐ qù chīfàn, zěnmeyàng?", vi: "Tối nay chúng ta cùng nhau đi ăn cơm nhé, thế nào?" },
                { role: "B", zh: "让我想想再告诉你。", pinyin: "Ràng wǒ xiǎngxiang zài gàosu nǐ.", vi: "Để tôi suy nghĩ một chút rồi nói cho bạn biết sau nhé." },
                { role: "A", zh: "这件事是谁让你做的？", pinyin: "Zhè jiàn shì :  shì shéi ràng nǐ zuò de?", vi: "Chuyện này là do ai bảo bạn làm vậy?" },
                { role: "B", zh: "是经理让我做的。", pinyin: "Shì jīnglǐ ràng wǒ zuò de.", vi: "Là do Giám đốc bảo tôi làm đấy." }
            ],
            vocab: [
                { id: "cur2_8_1", word: "让", pinyin: "ràng", meaning: "cho phép, bảo, nhường", pos: "v", tip: "Động từ sai khiến đứng trước tân ngữ chỉ người." },
                { id: "cur2_8_2", word: "告诉", pinyin: "gàosu", meaning: "nói cho biết, báo cáo", pos: "v", tip: "Cáo (告) kết hợp Tố (诉 - tố tụng, nói bày tỏ)." },
                { id: "cur2_8_3", word: "事情", pinyin: "shìqing", meaning: "sự việc, việc", pos: "n", tip: "Sự (事) kết hợp Tình (情)." },
                { id: "cur2_8_4", word: "经理", pinyin: "jīnglǐ", meaning: "giám đốc, quản lý", pos: "n", tip: "Kinh (经) kết hợp Lý (理)." }
            ],
            grammar: "1. Câu kiêm ngữ với động từ '让': Cấu trúc 'Chủ ngữ 1 + 让 + Tân ngữ (đồng thời là Chủ ngữ 2) + Động từ 2'. Thể hiện sự sai bảo, yêu cầu ai làm gì.\n2. Lặp lại động từ để giảm nhẹ ngữ khí '想想': Diễn tả hành động thử, làm nhẹ nhàng, ngắn ngủi.",
            quiz: [
                { q: "Động từ sai khiến nào có nghĩa là 'Cho phép/Bảo' ai làm việc gì?", options: ["要", "会", "让", "给"], ans: "让" },
                { q: "Dịch câu 'Để tôi suy nghĩ một chút'?", options: ["让我想想", "让我看看", "让我听听", "让我做做"], ans: "ràng wǒ xiǎngxiang" },
                { q: "Lượng từ dùng riêng cho từ '事情' (sự việc) là lượng từ nào?", options: ["本", "件", "张", "口"], ans: "件" }
            ]
        },
        {
            lessonId: 9,
            title: "Bài 9: 题太多，我没做完 - Đề bài nhiều quá, tôi chưa làm xong",
            desc: "Bày tỏ kết quả của hành động, nói về các buổi kiểm tra, học tập.",
            dialogue: [
                { role: "A", zh: "今天的考试怎么样？你做完了吗？", pinyin: "Jīntiān de kǎoshì zěnmeyàng? Nǐ zuò wán le ma?", vi: "Bài thi hôm nay thế nào? Bạn đã làm xong chưa?" },
                { role: "B", zh: "题太多，我没做完。", pinyin: "Tí tài duō, wǒ méi zuò wán.", vi: "Đề bài nhiều quá, tôi làm chưa xong." },
                { role: "A", zh: "你听懂了老师说的话 ma ？", pinyin: "Nǐ tīng dǒng le lǎoshī shuō de huà ma?", vi: "Bạn có nghe hiểu những lời thầy giáo nói không?" },
                { role: "B", zh: "我都听懂了。", pinyin: "Wǒ dōu tīng dǒng le.", vi: "Tôi đều nghe hiểu hết rồi." }
            ],
            vocab: [
                { id: "cur2_9_1", word: "题", pinyin: "tí", meaning: "đề bài, câu hỏi", pos: "n", tip: "Đề thi, câu hỏi trắc nghiệm hay tự luận." },
                { id: "cur2_9_2", word: "完", pinyin: "wán", meaning: "xong, hoàn thành", pos: "v", tip: "Dùng làm bổ ngữ chỉ kết quả sau động từ hành động." },
                { id: "cur2_9_3", word: "懂", pinyin: "dǒng", meaning: "hiểu, thông thấu", pos: "v", tip: "Có bộ Tâm đứng 忄 bên trái biểu thị thấu hiểu bằng tấm lòng." },
                { id: "cur2_9_4", word: "考试", pinyin: "kǎoshì", meaning: "thi cử, kỳ thi", pos: "n", tip: "Khảo (考) kết hợp Thí (试)." }
            ],
            grammar: "1. Bổ ngữ kết quả: Đặt trực tiếp sau động từ chính để biểu đạt kết quả của hành động: 'Động từ + Bổ ngữ kết quả' (Ví dụ: 做完 - làm xong, 听懂 - nghe hiểu).\n2. Phủ định bổ ngữ kết quả: Sử dụng phó từ '没' hoặc '没有' đứng trước động từ và bỏ trợ từ '了' cuối câu.",
            quiz: [
                { q: "Cụm từ 'Nghe hiểu' trong tiếng Trung nói thế nào?", options: ["看懂", "听懂", "做完", "学完"], ans: "听懂" },
                { q: "Để phủ định một hành động đã xảy ra kèm bổ ngữ kết quả (ví dụ 'chưa làm xong'), ta dùng từ nào?", options: ["不", "没", "太", "最"], ans: "没" },
                { q: "Dịch nghĩa của từ '考试'?", options: ["Bài tập", "Giờ học", "Kỳ thi", "Nghỉ ngơi"], ans: "Kỳ thi" }
            ]
        },
        {
            lessonId: 10,
            title: "Bài 10: 别找了，手机在桌子上呢 - Đừng tìm nữa, điện thoại ở trên bàn kìa",
            desc: "Nói về sự tồn tại liên tục của vật, sử dụng trợ từ ngữ khí cuối câu.",
            dialogue: [
                { role: "A", zh: "我的手机在哪儿？你帮我找找。", pinyin: "Wǒ de shǒu jī zài nǎr? Nǐ bāng wǒ zhǎozhao.", vi: "Điện thoại của tôi ở đâu rồi? Bạn tìm giúp tôi với." },
                { role: "B", zh: "别找了，手机在桌子上呢。", pinyin: "Bié zhǎo le, shǒu jī zài zhuōzi shàng ne.", vi: "Đừng tìm nữa, điện thoại ở ngay trên bàn kìa." },
                { role: "A", zh: "你看，上面还放着一份报纸。", pinyin: "Nǐ kàn, shàngmiàn hái fàng zhe yí fèn bàozhǐ.", vi: "Bạn xem kìa, ở bên trên còn đang đặt một tờ báo nữa." }
            ],
            vocab: [
                { id: "cur2_10_1", word: "别...了", pinyin: "bié...le", meaning: "đừng... nữa", pos: "other", tip: "Cấu trúc khuyên ngăn hành động đang tiếp diễn." },
                { id: "cur2_10_2", word: "报纸", pinyin: "bài zhǐ", meaning: "tờ báo, báo chí", pos: "n", tip: "Báo (报) kết hợp Chỉ (纸 - giấy tờ)." },
                { id: "cur2_10_3", word: "放", pinyin: "fàng", meaning: "đặt, để", pos: "v", tip: "Đặt để vật dụng ở một vị trí cố định." },
                { id: "cur2_10_4", word: "着", pinyin: "zhe", meaning: "đang đặt, đang mang (trợ từ)", pos: "p", tip: "Đặt ngay sau động từ chỉ trạng thái của vật." }
            ],
            grammar: "1. Câu khuyên cản '别 + V + 了': 'Đừng làm việc gì đó nữa' biểu đạt sự ngăn cản nhẹ nhàng.\n2. Trợ từ động thái '着': Biểu thị trạng thái của hành động đang được duy trì (Động từ + 着).\n3. Trợ từ ngữ khí '呢' cuối câu trần thuật: Nhấn mạnh sự khẳng định của sự thật hoặc thu hút chú ý.",
            quiz: [
                { q: "Cấu trúc nào dùng để khuyên ngăn 'Đừng làm gì đó nữa'?", options: ["太...了", "别...了", "会...吗", "在...呢"], ans: "别...lơ" },
                { q: "Trợ từ động thái đứng ngay sau động từ chỉ trạng thái kéo dài là chữ nào?", options: ["了", "过", "着", "的"], ans: "着" },
                { q: "Dịch nghĩa của từ '报纸'?", options: ["Tờ báo", "Cuốn sách", "Chiếc bàn", "Điện thoại"], ans: "Tờ báo" }
            ]
        },
        {
            lessonId: 11,
            title: "Bài 11: 他比我大三岁 - Anh ấy lớn hơn tôi ba tuổi",
            desc: "Học cách thực hiện so sánh hơn, so sánh tuổi tác và kích thước.",
            dialogue: [
                { role: "A", zh: "他今年多大？", pinyin: "Tā :  jīnnián duō dā?", vi: "Anh ấy năm nay bao nhiêu tuổi?" },
                { role: "B", zh: "他二十三岁。他比我大三岁。", pinyin: "Tā :  èrshísān suì. Tā bǐ wǒ dà sān suì.", vi: "Anh ấy hai mươi ba tuổi. Anh ấy lớn hơn tôi ba tuổi." },
                { role: "A", zh: "你和他谁高？", pinyin: "Nǐ hé tā shéi gāo?", vi: "Bạn và anh ấy ai cao hơn?" },
                { role: "B", zh: "他比我高一点儿。", pinyin: "Tā bǐ wǒ gāo yìdiǎnr.", vi: "Anh ấy cao hơn tôi một chút." }
            ],
            vocab: [
                { id: "cur2_11_1", word: "比", pinyin: "bǐ", meaning: "so với (giới từ so sánh)", pos: "p", tip: "Dùng để so sánh tính chất giữa hai đối tượng." },
                { id: "cur2_11_2", word: "高", pinyin: "gāo", meaning: "cao", pos: "adj", tip: "Ngược nghĩa với 矮 (ǎi - thấp lùn)." },
                { id: "cur2_11_3", word: "多大", pinyin: "duō dà", meaning: "bao nhiêu tuổi (hỏi người lớn)", pos: "other", tip: "Cụm nghi vấn hỏi tuổi cho người trưởng thành." },
                { id: "cur2_11_4", word: "矮", pinyin: "ǎi", meaning: "thấp, lùn", pos: "adj", tip: "Có bộ Thỉ 矢 chỉ mũi tên lùn ngắn." }
            ],
            grammar: "1. Câu so sánh chữ '比': Cấu trúc cơ bản 'A + 比 + B + Tính từ' (A hơn B về mặt tính chất).\n2. So sánh kèm sai biệt cụ thể: 'A + 比 + B + Tính từ + Con số cụ thể / 一点儿' (Ví dụ: 他比我大三岁).",
            quiz: [
                { q: "Giới từ dùng để tiến hành so sánh trong tiếng Trung là từ nào?", options: ["离", "在", "比", "给"], ans: "比" },
                { q: "Dịch câu 'Anh ấy cao hơn tôi một chút'?", options: ["他比我高一点儿", "I bǐ tā gāo yìdiǎnr", "他 không có wǒ gāo", "他和我一样高"], ans: "他比 wǒ gāo một chút" },
                { q: "Để hỏi tuổi tác cho một người trưởng thành một cách thông thường, ta dùng cụm từ nào?", options: ["几sự", "多大", "多少", "什么时候"], ans: "多大" }
            ]
        },
        {
            lessonId: 12,
            title: "Bài 12: 你穿得太少了 - Bạn mặc quá ít đồ rồi đấy",
            desc: "Nhận xét, đánh giá kết quả hoặc trạng thái thực hiện hành động thông qua bổ ngữ.",
            dialogue: [
                { role: "A", zh: "今天很冷，你穿得太少了。", pinyin: "Jīntiān hěn lěng, nǐ chuān de tài shǎo le.", vi: "Hôm nay lạnh lắm, bạn mặc ít đồ quá rồi đấy." },
                { role: "B", zh: "没关系，我身体很好，不觉得冷。", pinyin: "Méiguānxi, wǒ shēntǐ hěn hǎo, bù juéde lěng.", vi: "Không sao đâu, sức khỏe tôi rất tốt, không thấy lạnh." },
                { role: "A", zh: "你每天起床起得很早吗？", pinyin: "Nǐ měitiān qǐchuáng qǐ de hěn zǎo ma?", vi: "Mỗi ngày bạn thức dậy rất sớm phải không?" },
                { role: "B", zh: "对，我每天五点就起床了。", pinyin: "Duì, wǒ měitiān wǔ diǎn jiù qǐchuáng le.", vi: "Đúng thế, mỗi ngày tôi năm giờ đã thức dậy rồi." }
            ],
            vocab: [
                { id: "cur2_12_1", word: "穿", pinyin: "chuān", meaning: "mặc (quần áo), xỏ (giày)", pos: "v", tip: "Mặc quần áo có bộ Huyệt 穴 chỉ hang hốc để xỏ tay vào." },
                { id: "cur2_12_2", word: "得", pinyin: "de", meaning: "đến mức, được (trợ từ liên kết)", pos: "p", tip: "Trợ từ liên kết động từ chính với bổ ngữ trạng thái phía sau." },
                { id: "cur2_12_3", word: "少", pinyin: "shǎo", meaning: "ít", pos: "adj", tip: "Ngược nghĩa hoàn toàn với 多 (duō - nhiều)." },
                { id: "cur2_12_4", word: "早", pinyin: "zǎo", meaning: "sớm", pos: "adj", tip: "Mặt trời (bộ Nhật 日) ló rạng trên ngọn cây." }
            ],
            grammar: "1. Bổ ngữ trạng thái / bổ ngữ chỉ mức độ: Cấu trúc dùng để nhận xét đánh giá 'Động từ + 得 + Adj / Cụm Adj' (Ví dụ: 穿得太sau - mặc quá ít).\n2. Phó từ chỉ thời gian sớm '就': Biểu thị hành động xảy ra sớm, nhanh chóng (Ví dụ: 五点就起床 - 5 giờ đã dậy).",
            quiz: [
                { q: "Trợ từ dùng để nối động từ với bổ ngữ trạng thái nhận xét là chữ nào?", options: ["的", "地", "得", "了"], ans: "得" },
                { q: "Ngược nghĩa với tính từ '早' (sớm) là tính từ nào?", options: ["慢", "晚 (muộn)", "矮", "多"], ans: "晚 (muộn)" },
                { q: "Dịch câu 'Tôi học rất tốt'?", options: ["我学习得很好", "我很好学习", "我学习很好得", "学习我得很好"], ans: "我学习得很好" }
            ]
        },
        {
            lessonId: 13,
            title: "Bài 13: 门开着呢 - Cửa đang mở đấy",
            desc: "Nói về trạng thái tĩnh đang tiếp diễn của sự vật xung quanh.",
            dialogue: [
                { role: "A", zh: "请问，李经理在办公室吗？", pinyin: "Qǐngwèn, Lǐ jīnglǐ zài bàngōngshì ma?", vi: "Xin hỏi, Giám đốc Lý có ở văn phòng không?" },
                { role: "B", zh: "在。门开着呢，你进去吧。", pinyin: "Zài. Mén kāi zhe ne, nǐ jìnqu ba.", vi: "Có ở đấy. Cửa đang mở kia kìa, bạn vào đi." },
                { role: "A", zh: "那个穿着红色衣服的人是谁？", pinyin: "Nàge chuān zhe hóngsè yīfu de rén :  shì shéi?", vi: "Người đang mặc bộ quần áo màu đỏ kia là ai vậy?" },
                { role: "B", zh: "他是我们的新同事。", pinyin: "Tā :  shì wǒmen de xīn tóngshì.", vi: "Anh ấy là đồng nghiệp mới của chúng tôi." }
            ],
            vocab: [
                { id: "cur2_13_1", word: "门", pinyin: "mén", meaning: "cửa, cánh cửa", pos: "n", tip: "Hán tự mô phỏng hình dáng một cánh cổng mở." },
                { id: "cur2_13_2", word: "开", pinyin: "kāi", meaning: "mở, khai mở, lái (xe)", pos: "v", tip: "Mở cửa, mở tiệc, mở máy tính." },
                { id: "cur2_13_3", word: "办公室", pinyin: "bàngōngshì", meaning: "văn phòng, phòng làm việc", pos: "n", tip: "Nơi làm việc hành chính." },
                { id: "cur2_13_4", word: "同事", pinyin: "tóngshì", meaning: "đồng nghiệp", pos: "n", tip: "Đồng (同 - cùng) kết hợp Sự (事 - công việc)." }
            ],
            grammar: "1. Trợ từ '着' chỉ trạng thái duy trì: Sử dụng để miêu tả trạng thái của sự vật vẫn đang giữ nguyên (Ví dụ: 门开着 - Cửa đang mở).\n2. Định ngữ có chứa '着': Biểu tả đặc điểm trạng thái bên ngoài (Ví dụ: 穿着红色衣服的人 - Người đang mặc đồ đỏ).",
            quiz: [
                { q: "Từ nào có nghĩa là 'Văn phòng làm việc'?", options: ["商店", "医院", "办公室", "学校"], ans: "办公室" },
                { q: "Dịch câu 'Cửa đang mở'?", options: ["门开着", "门关着", "门很大", "门在那儿"], ans: "门开着" },
                { q: "Từ '同事' có nghĩa là gì?", options: ["Bạn học", "Đồng nghiệp", "Bạn bè", "Thầy giáo"], ans: "Đồng nghiệp" }
            ]
        },
        {
            lessonId: 14,
            title: "Bài 14: 你看过那个电影吗 - Bạn đã từng xem bộ phim đó chưa",
            desc: "Nói về trải nghiệm trong quá khứ, dùng trợ từ động thái chỉ kinh nghiệm.",
            dialogue: [
                { role: "A", zh: "你看过那个电影吗？", pinyin: "Nǐ kàn guo nàge diànyǐng ma?", vi: "Bạn đã từng xem bộ phim đó chưa?" },
                { role: "B", zh: "我看过一次，很有意思。", pinyin: "Wǒ kàn guo yí cì, hěn yǒu yìsi.", vi: "Tôi từng xem qua một lần rồi, rất có ý nghĩa / thú vị." },
                { role: "A", zh: "你想不想再去看看？", pinyin: "Nǐ xiǎng bù xiǎng zài qù kànkan?", vi: "Bạn có muốn đi xem lại nữa không?" },
                { role: "B", zh: "好啊，我们明天一起去吧。", pinyin: "Hǎo a, wǒmen míngtiān yìqǐ qù ba.", vi: "Được thôi, ngày mai chúng ta cùng đi nhé." }
            ],
            vocab: [
                { id: "cur2_14_1", word: "过", pinyin: "guo", meaning: "qua, đã từng (trợ từ động thái)", pos: "p", tip: "Biểu thị hành động đã từng xảy ra trong quá khứ." },
                { id: "cur2_14_2", word: "电影", pinyin: "diànyǐng", meaning: "phim, điện ảnh", pos: "n", tip: "Điện (电) kết hợp Ảnh (影 - hình ảnh)." },
                { id: "cur2_14_3", word: "意思", pinyin: "yìsi", meaning: "ý nghĩa, ý thú", pos: "n", tip: "Ý (意) kết hợp Tư (思 - suy nghĩ), '有意思' tức là hay, thú vị." },
                { id: "cur2_14_4", word: "次", pinyin: "cì", meaning: "lần (động lượng từ)", pos: "q", tip: "Lượng từ chỉ số lần thực hiện hành động." }
            ],
            grammar: "1. Trợ từ động thái '过': Đặt sau động từ biểu thị một kinh nghiệm, trải nghiệm đã từng có trong quá khứ: 'S + V + 过 + O'. Phủ định dùng '没 + V + 过'.\n2. Cụm từ '有意思': Dùng để nhận xét cái gì đó rất hay, cuốn hút.",
            quiz: [
                { q: "Trợ từ động thái biểu thị kinh nghiệm 'Đã từng làm gì' là chữ nào?", options: ["了", "着", "过", "的"], ans: "过" },
                { q: "Từ phủ định của câu 'Tôi chưa từng xem qua' là câu nào?", options: ["我不看", "我没看过", "我不会看", "我不看过"], ans: "我没看过" },
                { q: "Dịch nghĩa của từ 'Boss'?", options: ["Rất dở", "Thú vị / Hay / Có ý nghĩa", "Chán nản", "Không hiểu"], ans: "Thú vị / Hay / Có ý nghĩa" }
            ]
        },
        {
            lessonId: 15,
            title: "Bài 15: 新年就要到了 - Năm mới sắp đến rồi",
            desc: "Biểu đạt sự việc sắp diễn ra trong tương lai gần, chuẩn bị đón năm mới.",
            dialogue: [
                { role: "A", zh: "新年就要到了，你想去哪儿玩？", pinyin: "Xīnnián jiù yào dào le, nǐ xiǎng qù nǎr wán?", vi: "Năm mới sắp đến rồi, bạn muốn đi đâu chơi?" },
                { role: "B", zh: "我想回家看看爸爸妈妈。", pinyin: "Wǒ xiǎng huí jiā kànkan bàba māma.", vi: "Tôi muốn về nhà thăm bố mẹ." },
                { role: "A", zh: "你买到火车票了吗？", pinyin: "Nǐ mǎi dào huǒchē piào le ma?", vi: "Bạn đã mua được vé tàu hỏa chưa?" },
                { role: "B", zh: "我早就买到了。", pinyin: "Wǒ zǎojiù mǎi dào le.", vi: "Tôi đã mua được từ sớm rồi." }
            ],
            vocab: [
                { id: "cur2_15_1", word: "新年", pinyin: "xīnnián", meaning: "năm mới", pos: "n", tip: "Tân (新) kết hợp Niên (năm)." },
                { id: "cur2_15_2", word: "就要...了", pinyin: "jiù yào...le", meaning: "sắp... rồi", pos: "other", tip: "Cấu trúc biểu thị sự việc chắc chắn sắp sửa diễn ra." },
                { id: "cur2_15_3", word: "玩", pinyin: "wán", meaning: "chơi, vui chơi, thưởng ngoạn", pos: "v", tip: "Giải trí thư giãn đầu óc." },
                { id: "cur2_15_4", word: "票", pinyin: "piào", meaning: "vé, tờ phiếu", pos: "n", tip: "Vé tàu, vé xe, vé xem phim." },
                { id: "cur2_15_5", word: "火车", pinyin: "huǒchē", meaning: "tàu hỏa", pos: "n", tip: "Hỏa (火 - lửa) kết hợp Xa (车 - xe chạy đường ray)." }
            ],
            grammar: "1. Cấu trúc chỉ hành động sắp xảy ra '就要...了': Biểu thị sự việc sắp sửa diễn ra trong thời gian cực ngắn. Có thể đi kèm thời gian cụ thể phía trước (Ví dụ: 下个月就要考试了 - Tháng sau sắp thi rồi).\n2. Bổ ngữ kết quả khẳng định '买到': Đã mua được thành công.",
            quiz: [
                { q: "Cấu trúc dùng để biểu đạt hành động sắp diễn ra 'Sắp... rồi' là cấu trúc nào?", options: ["太...了", "就要...了", "在...呢", "因为...所以..."], ans: "就要...了" },
                { q: "Từ nào có nghĩa là 'Tàu hỏa'?", options: ["飞机", "出租车", "火车", "地铁"], ans: "火车" },
                { q: "Dịch nghĩa của từ 'Ticket'?", options: ["Cái ghế", "Cửa hàng", "Cánh cửa", "Vé / Tờ phiếu"], ans: "Vé / Tờ phiếu" }
            ]
        }
    ],
    3: [
        {
            lessonId: 1,
            title: "Bài 1: 周末你有什么打算 - Cuối tuần bạn có dự định gì",
            desc: "Thảo luận về kế hoạch vui chơi cuối tuần, cách sử dụng cấu trúc lên lịch sớm.",
            dialogue: [
                { role: "A", zh: "周末你有什么打算？", pinyin: "Zhōumò nǐ yǒu shénme dǎsuàn?", vi: "Cuối tuần này bạn có dự định gì chưa?" },
                { role: "B", zh: "我早就打算好了，请你吃饭，看电影。", pinyin: "Wǒ zǎo jiù dǎsuàn hǎo le, qǐng nǐ chīfàn, kàn diànyǐng.", vi: "Tớ đã lên kế hoạch từ lâu rồi, mời cậu đi ăn và xem phim." },
                { role: "A", zh: "真的 ma ？可是我有很多作业要做。", pinyin: "Zhēn de ma? Kěshì wǒ yǒu hěn duō zuòyè yào zuò.", vi: "Thật thế sao? Nhưng tớ có rất nhiều bài tập phải làm." },
                { role: "B", zh: "别着急，明天再做吧。", pinyin: "Bié zháojí, míngtiān zài zuò ba.", vi: "Đừng lo lắng, mai rồi làm." }
            ],
            vocab: [
                { id: "cur3_1_1", word: "周末", pinyin: "zhōumò", meaning: "cuối tuần", pos: "n", tip: "Chu (tuần) kết hợp mạt (cuối)." },
                { id: "cur3_1_2", word: "打算", pinyin: "dǎsuàn", meaning: "dự định, kế hoạch", pos: "v", tip: "Dùng như động từ (dự định) hoặc danh từ (kế hoạch)." },
                { id: "cur3_1_3", word: "可是", pinyin: "kěshì", meaning: "nhưng, tuy nhiên", pos: "conj", tip: "Liên từ chuyển ý tương tự 但是." },
                { id: "cur3_1_4", word: "着急", pinyin: "zháojí", meaning: "lo lắng, sốt ruột", pos: "adj", tip: "Tâm trạng nôn nóng khi gặp chuyện khẩn cấp." }
            ],
            grammar: "1. Biểu đạt kế hoạch: Sử dụng '打算 + Động từ' để nói về ý định.\n2. Nhấn mạnh thời gian sớm: '早就……了' (đã sớm... rồi).\n3. Lời khuyên ngăn: '别 + Động từ/Tính từ' có nghĩa là 'Đừng làm việc gì' (Ví dụ: 别着急).",
            quiz: [
                { q: "Cụm từ 'Đừng sốt ruột/lo lắng' viết bằng chữ Hán nào?", options: ["别着急", "打算", "做什么", "没关系"], ans: "别着急" },
                { q: "Từ nào đồng nghĩa với '但是' (nhưng mà)?", options: ["因为", "可是", "所以", "还有"], ans: "可是" },
                { q: "Dịch nghĩa của từ '打算'?", options: ["Thực hiện", "Dự định", "Học tập", "Làm việc"], ans: "Dự định" }
            ]
        },
        {
            lessonId: 2,
            title: "Bài 2: 桌子上放着一杯咖啡 - Trên bàn đang đặt một tách cà phê",
            desc: "Biểu đạt sự tồn tại duy trì của sự vật trong không gian thực tế.",
            dialogue: [
                { role: "A", zh: "桌子上放着什么？", pinyin: "Zhuōzi shàng fàng zhe shénme?", vi: "Trên bàn đang đặt cái gì vậy?" },
                { role: "B", zh: "桌子上放着一杯热咖啡和一本书。", pinyin: "Zhuōzi shàng fàng zhe yì bēi rè kāfēi hé yì běn shū.", vi: "Trên bàn đang đặt một tách cà phê nóng và một cuốn sách." },
                { role: "A", zh: "那杯咖啡是谁的？", pinyin: "Nà bēi kāfēi :  shì shéi de?", vi: "Tách cà phê kia là của ai vậy?" },
                { role: "B", zh: "是我给经理准备的。", pinyin: "Shì wǒ gěi jīnglǐ zhǔnbèi de.", vi: "Là do tôi chuẩn bị cho Giám đốc đấy." }
            ],
            vocab: [
                { id: "cur3_2_1", word: "桌子", pinyin: "zhuōzi", meaning: "cái bàn", pos: "n", tip: "Vật dụng có chân dùng để làm việc hoặc để đồ." },
                { id: "cur3_2_2", word: "放", pinyin: "fàng", meaning: "đặt, để", pos: "v", tip: "Nơi đặt yên vật thể." },
                { id: "cur3_2_3", word: "着", pinyin: "zhe", meaning: "đang đặt (trợ từ trạng thái)", pos: "p", tip: "Biểu thị trạng thái tồn tại tĩnh duy trì." },
                { id: "cur3_2_4", word: "准备", pinyin: "zhǔnbèi", meaning: "chuẩn bị", pos: "v", tip: "Sửa soạn vật dụng, kế hoạch trước khi bắt đầu." }
            ],
            grammar: "1. Câu tồn hiện chỉ trạng thái duy trì: 'Địa điểm + Động từ + 着 + Danh từ' (Ví dụ: 桌子上放着书).\n2. Trợ từ động thái '着' kết hợp với trợ từ ngữ khí '呢'.\n3. Giới từ '给': Cấu trúc 'A + 给 + B + Động từ' (A làm việc gì đó cho B).",
            quiz: [
                { q: "Trợ từ động thái biểu thị trạng thái tồn tại duy trì kéo dài là chữ nào?", options: ["了", "过", "着", "的"], ans: "着" },
                { q: "Dịch nghĩa của từ '准备'?", options: ["Chuẩn bị", "Lập tức", "Làm việc", "Nghỉ ngơi"], ans: "Chuẩn bị" },
                { q: "Trong câu '桌子上放着一杯咖啡', vật thể được mô tả nằm ở đâu?", options: ["Trong ngăn kéo", "Dưới chân bàn", "Trên bàn", "Bên cạnh bàn"], ans: "Trên bàn" }
            ]
        },
        {
            lessonId: 3,
            title: "Bài 3: 经理对我印象很好 - Giám đốc có ấn tượng rất tốt về tôi",
            desc: "Nói về môi trường công sở, cách biểu đạt ấn tượng và dùng cấu trúc tăng dần.",
            dialogue: [
                { role: "A", zh: "面试怎么样？经理喜欢你吗？", pinyin: "Miànshì zěnmeyàng? Jīnglǐ xǐhuan nǐ ma?", vi: "Phỏng vấn thế nào rồi? Giám đốc có thích bạn không?" },
                { role: "B", zh: "很好，经理对我印象很好。", pinyin: "Hěn hǎo, jīnglǐ duì wǒ yìnxiàng hěn hǎo.", vi: "Rất tốt, Giám đốc có ấn tượng rất tốt về tôi." },
                { role: "A", zh: "真的吗？那你什么时候可以上班？", pinyin: "Zhēn de ma? Nà nǐ shénme shíhou kěyǐ shàngbān?", vi: "Thật sao? Vậy khi nào bạn có thể đi làm?" },
                { role: "B", zh: "下个星期。我的汉语越说越好了！", pinyin: "Xià ge xīngqī. Wǒ de Hànyǔ yuè shuō yuè hǎo le!", vi: "Tuần sau. Tiếng Trung của tôi càng nói càng tốt hơn rồi!" }
            ],
            vocab: [
                { id: "cur3_3_1", word: "面试", pinyin: "miànshì", meaning: "phỏng vấn", pos: "n", tip: "Diện (面 - mặt) đối mặt thi cử thử thách (试)." },
                { id: "cur3_3_2", word: "印象", pinyin: "yìnxiàng", meaning: "ấn tượng", pos: "n", tip: "Cảm giác lưu lại trong tâm trí đối phương." },
                { id: "cur3_3_3", word: "上班", pinyin: "shàngbān", meaning: "đi làm, vào ca", pos: "v", tip: "Ngược nghĩa hoàn toàn với 下班 (xiàbān - tan làm)." },
                { id: "cur3_3_4", word: "越...越...", pinyin: "yuè...yuè...", meaning: "càng... càng...", pos: "other", tip: "Cấu trúc biểu thị sự phát triển tăng tiến theo thời gian." }
            ],
            grammar: "1. Giới từ '对': Cấu trúc 'A + 对 + B + Tính từ / Danh từ' (Cảm xúc hoặc tác động của A hướng tới đối tượng B).\n2. Cấu trúc tăng tiến '越... 越...': Biểu thị mức độ của vế sau thay đổi theo sự phát triển của vế trước (Ví dụ: 越说越好 - càng nói càng hay).",
            quiz: [
                { q: "Cấu trúc nào biểu thị nghĩa 'Càng... Càng...'?", options: ["因为...所以...", "越...越...", "虽然...但是...", "不仅...而且..."], ans: "越...越..." },
                { q: "Để nói 'Giám đốc có ấn tượng tốt về tôi', ta nói thế nào?", options: ["经理对我很好", "经理对我印象很好", "我觉得经理很好", "经理让我去上班"], ans: "经理对我印象很好" },
                { q: "Ngược nghĩa với cụm từ '上班' (đi làm) là cụm từ nào?", options: ["下班", "加班", "迟到", "请假"], ans: "下班" }
            ]
        },
        {
            lessonId: 4,
            title: "Bài 4: 听说你买房了 - Nghe nói bạn mua nhà rồi",
            desc: "Học cách nói về tin đồn hoặc thông tin nghe được, thảo luận chuyện mua sắm tài sản lớn.",
            dialogue: [
                { role: "A", zh: "听说你买房了？在哪儿买的？", pinyin: "Tīngshuō nǐ mǎi fáng le? Zài nǎr mǎi de?", vi: "Nghe nói bạn mua nhà rồi à? Mua ở đâu vậy?" },
                { role: "B", zh: "在公司旁边。哪怕价格很贵，我也要买。", pinyin: "Zài gōngsī pángbiān. Nǎpà jiàgé hěn guì, wǒ yě yào mǎi.", vi: "Ở ngay cạnh công ty. Cho dù giá cả có đắt đỏ, tôi vẫn phải mua." },
                { role: "A", zh: "因为这样上班很方便，对吧？", pinyin: "Yīnwèi zhèyàng shàngbān hěn fāngbiàn, duì ba?", vi: "Bởi vì như thế đi làm rất thuận tiện, đúng không?" },
                { role: "B", zh: "对，每天不用花太多时间在路上。", pinyin: "Duì, měitiān búyòng huā tài duō shíjiān zài lùshàng.", vi: "Đúng thế, mỗi ngày không cần tốn quá nhiều thời gian đi trên đường." }
            ],
            vocab: [
                { id: "cur3_4_1", word: "听说", pinyin: "tīngshuō", meaning: "nghe nói", pos: "v", tip: "Thính (听 - nghe) kết hợp Thuyết (说 - nói)." },
                { id: "cur3_4_2", word: "哪怕", pinyin: "nǎpà", meaning: "cho dù, ngay cả", pos: "conj", tip: "Liên từ biểu thị sự giả thiết nhượng bộ mạnh mẽ." },
                { id: "cur3_4_3", word: "方便", pinyin: "fāngbiàn", meaning: "thuận tiện, tiện lợi", pos: "adj", tip: "Mang lại sự thuận lợi cho sinh hoạt." },
                { id: "cur3_4_4", word: "花", pinyin: "huā", meaning: "tiêu tốn, hoa", pos: "v", tip: "Tiêu tốn tiền bạc (花钱) hoặc thời gian (花时间)." }
            ],
            grammar: "1. Động từ '听说': Đứng ở đầu câu làm trạng ngữ chỉ nguồn gốc thông tin nghe từ người khác.\n2. Liên từ nhượng bộ '哪怕': Thường đi kèm với phó từ '也' ở vế sau biểu thị dù hoàn cảnh có thế nào thì kết quả vẫn giữ nguyên (Ví dụ: 哪怕贵，我也买).\n3. Động từ '花': Mang nghĩa chi tiêu, tốn kém tài nguyên.",
            quiz: [
                { q: "Liên từ '哪怕' thường kết hợp với phó từ nào ở vế sau?", options: ["就", "也", "还", "都"], ans: "也" },
                { q: "Cụm từ 'Tiêu tiền' viết bằng chữ Hán nào?", options: ["花钱", "花时间", "买东西", "送钱"], ans: "花钱" },
                { q: "Dịch nghĩa của từ '方便'?", options: ["Khó khăn", "Thuận tiện", "Đắt đỏ", "Xa xôi"], ans: "Thuận tiện" }
            ]
        },
        {
            lessonId: 5,
            title: "Bài 5: 我跟他是同学 - Tôi với anh ấy là bạn học",
            desc: "Nói về các mối quan hệ xã hội, học cách so sánh tương đồng và bày tỏ ý muốn.",
            dialogue: [
                { role: "A", zh: "你认识那个人吗？", pinyin: "Nǐ rènshi nàge rén ma?", vi: "Bạn quen biết người kia không?" },
                { role: "B", zh: "认识，我跟他是同学。我们关系很好。", pinyin: "Rènshi, wǒ gēn tā shì tóngxué. Wǒmen guānxì hěn hǎo.", vi: "Quen chứ, tôi với anh ấy là bạn học. Mối quan hệ của chúng tôi rất tốt." },
                { role: "A", zh: "我跟他一样，也喜欢打篮球。", pinyin: "Wǒ gēn tā yíyàng, yě xǐhuan dǎ lánqiú.", vi: "Tôi với anh ấy giống nhau, đều thích chơi bóng rổ." },
                { role: "B", zh: "真的吗？那周末我们一起去打球吧！", pinyin: "Zhēn de ma? Nà zhōumò wǒmen yìqǐ qù dǎqiú ba!", vi: "Thật thế sao? Vậy cuối tuần chúng ta cùng đi chơi bóng đi!" }
            ],
            vocab: [
                { id: "cur3_5_1", word: "跟", pinyin: "gēn", meaning: "với, cùng (giới từ liên kết)", pos: "p", tip: "Kết nối hai đối tượng thực hiện hành động song hành." },
                { id: "cur3_5_2", word: "同学", pinyin: "tóngxué", meaning: "bạn học", pos: "n", tip: "Đồng (同 - cùng) kết hợp Học (学 - học tập)." },
                { id: "cur3_5_3", word: "一样", pinyin: "yíyàng", meaning: "giống nhau, như nhau", pos: "adj", tip: "Nhất (一) kết hợp Dạng (样 - kiểu dáng, hình thức)." },
                { id: "cur3_5_4", word: "打篮球", pinyin: "dǎ lánqiú", meaning: "chơi bóng rổ", pos: "v", tip: "Đả (打 - chơi bằng tay) kết hợp Lam cầu (篮球 - bóng rổ)." }
            ],
            grammar: "1. Cấu trúc so sánh bằng '跟... 一样': 'A + 跟 + B + 一样 + (Tính từ)' (A giống B hoặc A giống B về mặt tính chất nào đó).\n2. Giới từ '跟': Biểu thị sự đồng hành cùng ai đó làm việc gì (A + 跟 + B + 一起 + Động từ).",
            quiz: [
                { q: "Cấu trúc dùng để so sánh bằng trong tiếng Trung là gì?", options: ["比...高", "跟...一样", "最...好", "没有...近"], ans: "跟...一样" },
                { q: "Môn thể thao 'Bóng rổ' chơi bằng tay nên động từ đi kèm là chữ nào?", options: ["踢 (đá)", "打 (chơi bằng tay)", "跑", "送"], ans: "打 (chơi bằng tay)" },
                { q: "Dịch câu 'Tôi giống anh ấy'?", options: ["我跟他一样", "他比我大", "我不是他", "我跟他一起"], ans: "我跟他一样" }
            ]
        },
        {
            lessonId: 6,
            title: "Bài 6: 爬山对身体很好 - Leo núi rất tốt cho sức khỏe",
            desc: "Thảo luận về các hoạt động thể thao nâng cao sức khoẻ, dùng cấu trúc tác động ích lợi.",
            dialogue: [
                { role: "A", zh: "周末你有什么爱好？", pinyin: "Zhōumò nǐ yǒu shénme àihào?", vi: "Cuối tuần bạn có sở thích gì không?" },
                { role: "B", zh: "我喜欢爬山。爬山对身体很好。", pinyin: "Wǒ xǐhuan páshān. Páshān duì shēntǐ hěn hǎo.", vi: "Tôi thích leo núi. Leo núi rất tốt cho sức khỏe." },
                { role: "A", zh: "但是爬山累不累？", pinyin: "Dànshì páshān lèi bú lèi?", vi: "Nhưng leo núi có mệt không?" },
                { role: "B", zh: "虽然有点儿累，但是能让人觉得很舒服。", pinyin: "Suīrán yǒudiǎnr lèi, dànshì néng ràng rén juéde hěn shūfu.", vi: "Mặc dù có hơi mệt một chút, nhưng có thể khiến người ta cảm thấy rất dễ chịu." }
            ],
            vocab: [
                { id: "cur3_6_1", word: "爬山", pinyin: "páshān", meaning: "leo núi, đi dã ngoại", pos: "v", tip: "Bò, leo trèo (爬) kết hợp với Núi (山)." },
                { id: "cur3_6_2", word: "舒服", pinyin: "shūfu", meaning: "dễ chịu, thoải mái", pos: "adj", tip: "Thư (舒 - thư thái) kết hợp Phục (服 - trang phục rộng rãi)." },
                { id: "cur3_6_3", word: "虽然...但是...", pinyin: "suīrán...dànshì...", meaning: "tuy... nhưng...", pos: "conj", tip: "Cặp liên từ biểu thị quan hệ nghịch chuyển tương phản." },
                { id: "cur3_6_4", word: "爱好", pinyin: "àihào", meaning: "sở thích", pos: "n", tip: "Ái (爱 - yêu) kết hợp Hảo (hoặc Hiếu 好 - thích)." }
            ],
            grammar: "1. Biểu đạt tác dụng '对... 有好处/很好': Cấu trúc 'A + 对 + B + 很好 / 有好处' (Hành động A có lợi / rất tốt đối với đối tượng B).\n2. Cặp liên từ chỉ sự tương phản '虽然... 但是...': Kết nối hai vế câu có nghĩa tương phản trái ngược nhau.",
            quiz: [
                { q: "Cặp liên từ biểu thị quan hệ tương phản 'Tuy... nhưng...' là cặp từ nào?", options: ["因为...所以...", "虽然...但是...", "不但...而且...", "如果...就..."], ans: "虽然...sử dụng..." },
                { q: "Dịch câu 'Leo núi rất tốt cho cơ thể'?", options: ["爬山对身体很好", "爬山身体不好", "爬山虽然累", "我不喜欢爬山"], ans: "爬山对身体很好" },
                { q: "Chữ '山' trong từ '爬山' mô phỏng hình dạng của cái gì?", options: ["Dòng sông", "Ngọn núi", "Cái cây", "Mặt trời"], ans: "Ngọn núi" }
            ]
        },
        {
            lessonId: 7,
            title: "Bài 7: 电影快要开始了 - Phim sắp sửa bắt đầu rồi",
            desc: "Nói về sự việc sắp xảy ra trong tương lai rất gần, thảo luận về sở thích nghệ thuật.",
            dialogue: [
                { role: "A", zh: "快点儿吧，电影快要开始了！", pinyin: "Kuài diǎnr ba, diànyǐng kuàiyào kāishǐ le!", vi: "Nhanh lên đi, bộ phim sắp sửa bắt đầu rồi kìa!" },
                { role: "B", zh: "别着急，我们现在就去买票。", pinyin: "Bié zháojí, wǒmen xiànzài jiù qù mǎi piào.", vi: "Đừng sốt ruột, chúng ta bây giờ đi mua vé ngay đây." },
                { role: "A", zh: "你对这个电影感兴趣吗？", pinyin: "Nǐ duì zhège diànyǐng gǎn xìngqù ma?", vi: "Bạn có hứng thú với bộ phim này không?" },
                { role: "B", zh: "对，我很喜欢这个演员。", pinyin: "Duì, wǒ hěn xǐhuan zhège yǎnyuán.", vi: "Có chứ, tôi rất thích người diễn viên này." }
            ],
            vocab: [
                { id: "cur3_7_1", word: "快要...了", pinyin: "kuàiyào...le", meaning: "sắp sửa... rồi", pos: "other", tip: "Cấu trúc thời gian biểu thị hành động sắp xảy ra." },
                { id: "cur3_7_2", word: "开始", pinyin: "kāishǐ", meaning: "bắt đầu", pos: "v", tip: "Khai (开) kết hợp Thủy (始 - ban sơ)." },
                { id: "cur3_7_3", word: "感兴趣", pinyin: "gǎn xìngqù", meaning: "có hứng thú, thích thú", pos: "v", tip: "Cảm (感) kết hợp Hứng thú (兴趣)." },
                { id: "cur3_7_4", word: "演员", pinyin: "yǎnyuán", meaning: "diễn viên", pos: "n", tip: "Diễn (演) kết hợp Viên (员 - nhân viên, người làm nghề)." }
            ],
            grammar: "1. Diễn tả tương lai gần '快要... 了': Cấu trúc 'Chủ ngữ + 快要 + Động từ + 了'. Chú ý: Cấu trúc này không đi kèm trạng ngữ chỉ thời gian cụ thể phía trước.\n2. Biểu đạt sở thích '对... 感兴趣': Cấu trúc 'A + 对 + B + 感兴趣' (A có hứng thú đối với B). Phủ định dùng '对... 不感兴趣'.",
            quiz: [
                { q: "Cấu trúc biểu đạt 'A có hứng thú với B' là cấu trúc nào?", options: ["A 比 B 高", "A 对 B 感兴趣", "A 跟 B 一样", "A 离 B 远"], ans: "A 对 B 感兴趣" },
                { q: "Cấu trúc '快要...了' dùng để diễn đạt điều gì?", options: ["Hành động đã xảy ra xong", "Hành động đang tiếp diễn", "Hành động sắp sửa xảy ra", "Sự ngăn cấm"], ans: "Hành động sắp sửa xảy ra" },
                { q: "Dịch nghĩa của từ '演员'?", options: ["Bác sĩ", "Giáo viên", "Diễn viên", "Giám đốc"], ans: "Diễn viên" }
            ]
        },
        {
            lessonId: 8,
            title: "Bài 8: 他的普通话比我说得好 - Tiếng Phổ thông của anh ấy nói tốt hơn tôi",
            desc: "Học cách so sánh nâng cao kết hợp bổ ngữ trạng thái nhận xét kết quả hành động.",
            dialogue: [
                { role: "A", zh: "你觉得大卫的汉语怎么样？", pinyin: "Nǐ juéde Dàwèi de Hànyǔ zěnmeyàng?", vi: "Bạn thấy tiếng Trung của David thế nào?" },
                { role: "B", zh: "非常棒！他的普通话比我说得好。", pinyin: "Fēicháng bàng! Tā de pǔtōnghuà bǐ wǒ shuō de hǎo.", vi: "Cực kỳ giỏi luôn! Tiếng Phổ thông của anh ấy nói còn tốt hơn cả tôi." },
                { role: "A", zh: "真的吗？你学了多长时间了？", pinyin: "Zhēn de ma? Nǐ xué le duō cháng shíjiān le?", vi: "Thật thế sao? Bạn đã học được bao lâu rồi?" },
                { role: "B", zh: "我学了两年了，但是进步很慢。", pinyin: "Wǒ xué le liǎng nián le, dànshì jìnbù hěn màn.", vi: "Tôi học được hai năm rồi, nhưng tiến bộ rất chậm chạp." }
            ],
            vocab: [
                { id: "cur3_8_1", word: "普通话", pinyin: "pǔtōnghuà", meaning: "tiếng Phổ thông, tiếng Trung chuẩn", pos: "n", tip: "Phổ thông (普通) kết hợp Thoại (话 - lời nói)." },
                { id: "cur3_8_2", word: "棒", pinyin: "bàng", meaning: "giỏi, tuyệt vời", pos: "adj", tip: "Khẩu ngữ khen ngợi mức độ xuất sắc cực cao." },
                { id: "cur3_8_3", word: "进步", pinyin: "jìnbù", meaning: "tiến bộ", pos: "v", tip: "Tiến (进 - đi lên) kết hợp Bộ (步 - bước chân)." },
                { id: "cur3_8_4", word: "慢", pinyin: "màn", meaning: "chậm", pos: "adj", tip: "Ngược nghĩa hoàn toàn với 快 (kuài - nhanh chóng)." }
            ],
            grammar: "1. So sánh kết hợp bổ ngữ trạng thái: Cấu trúc 'A + 比 + B + Động từ + 得 + Tính từ' (Ví dụ: 他比我 speak 得好 - Anh ấy nói tốt hơn tôi).\n2. Hỏi thời lượng hành động '多长时间': Cấu trúc 'S + Động từ + (了) + 多长时间 + (了)？'.",
            quiz: [
                { q: "Cấu trúc so sánh kết hợp bổ ngữ trạng thái nào sau đây là đúng ngữ pháp?", options: ["他比我学得快", "他比我快学", "他学得比我快", "A và C đều đúng"], ans: "A và C đều đúng" },
                { q: "Dịch nghĩa của từ '普通话'?", options: ["Tiếng địa phương", "Tiếng Phổ thông", "Ngoại ngữ", "Tiếng lóng"], ans: "Tiếng Phổ thông" },
                { q: "Ngược nghĩa với tính từ '慢' (chậm) là tính từ nào?", options: ["高", "矮", "快", "新"], ans: "快" }
            ]
        },
        {
            lessonId: 9,
            title: "Bài 9: 只要努力，就一定能成功 - Chỉ cần nỗ lực thì nhất định sẽ thành công",
            desc: "Biểu đạt điều kiện cần có để đạt được kết quả, nói về mục tiêu tương lai.",
            dialogue: [
                { role: "A", zh: "你每天学习这么晚，累不累？", pinyin: "Nǐ měitiān xuéxí zhème wǎn, lèi bú lèi?", vi: "Mỗi ngày bạn học muộn như thế, có mệt không?" },
                { role: "B", zh: "累，但是只要努力，就一定能成功。", pinyin: "Lèi, dànshì zhǐyào nǔlì, jiù yídìng néng chénggōng.", vi: "Mệt chứ, nhưng chỉ cần nỗ lực, nhất định sẽ thành công thôi." },
                { role: "A", zh: "我相信你，你一定会实现梦想的。", pinyin: "Wǒ xiāngxìn nǐ, nǐ yídìng huì shíxiàn mèngxiǎng de.", vi: "Tôi tin tưởng bạn, bạn nhất định sẽ thực hiện được ước mơ của mình." },
                { role: "B", zh: "谢谢你的支持！", pinyin: "Xièxie nǐ de zhīchí!", vi: "Cảm ơn sự ủng hộ của bạn nhé!" }
            ],
            vocab: [
                { id: "cur3_9_1", word: "只要...就...", pinyin: "zhǐyào...jiù...", meaning: "chỉ cần... thì...", pos: "conj", tip: "Cặp liên từ chỉ điều kiện đầy đủ tối thiểu." },
                { id: "cur3_9_2", word: "努力", pinyin: "nǔlì", meaning: "nỗ lực, cố gắng", pos: "v", tip: "Nỗ (努力 - dùng sức lực của cơ thể)." },
                { id: "cur3_9_3", word: "成功", pinyin: "chénggōng", meaning: "thành công", pos: "v", tip: "Thành (成) kết hợp Công (功 - công đức, kết quả tốt)." },
                { id: "cur3_9_4", word: "支持", pinyin: "zhīchí", meaning: "ủng hộ, chi viện", pos: "v", tip: "Đứng sau hỗ trợ làm chỗ dựa cho đối phương." }
            ],
            grammar: "1. Cặp liên từ điều kiện '只要... 就...': Biểu thị chỉ cần có điều kiện ở vế trước là vế sau có thể đạt được kết quả.\n2. Phó từ nhấn mạnh mức độ khẳng định '一定': Thường đứng trước động từ chỉ sự chắc chắn.",
            quiz: [
                { q: "Cặp liên từ biểu thị nghĩa 'Chỉ cần... thì...' là cặp từ nào?", options: ["因为...所以...", "虽然...但是...", "只要...就...", "如果...就..."], ans: "只要...就..." },
                { q: "Dịch nghĩa của từ '努力'?", options: ["Nỗ lực / Cố gắng", "Lười biếng", "Từ bỏ", "Thất bại"], ans: "Nỗ lực / Cố gắng" },
                { q: "Từ nào có nghĩa là 'Thành công'?", options: ["成功", "失败", "支持", "努力"], ans: "成功" }
            ]
        },
        {
            lessonId: 10,
            title: "Bài 10: 你把电脑关了吧 - Bạn tắt máy tính đi nhé",
            desc: "Học cấu trúc câu chữ '把' cơ bản, điều khiển và tác động lên đồ vật xung quanh.",
            dialogue: [
                { role: "A", zh: "已经十一点 rồi, 你怎么还不睡觉？", pinyin: "Yǐjīng shíyī diǎn le, nǐ zěnme hái bù shuìjiào?", vi: "Đã mười một giờ rồi, sao bạn vẫn chưa đi ngủ thế?" },
                { role: "B", zh: "我再看一个新闻。你先睡吧。", pinyin: "Wǒ zài kàn yí gè xīnwén. Nǐ xiān shuì ba.", vi: "Tôi xem thêm một tin tức nữa. Bạn ngủ trước đi." },
                { role: "A", zh: "那你早点儿睡，把电脑关了吧。", pinyin: "Nà nǐ zǎo diǎnr shuì, bǎ diànnǎo guān le ba.", vi: "Thế thì bạn ngủ sớm đi nhé, tắt máy tính đi." },
                { role: "B", zh: "好，我马上就关。", pinyin: "Hǎo, wǒ mǎshàng jiù guān.", vi: "Được rồi, tôi tắt ngay đây." }
            ],
            vocab: [
                { id: "cur3_10_1", word: "把", pinyin: "bǎ", meaning: "đưa (giới từ câu chữ 把)", pos: "p", tip: "Giới từ dùng để đưa tân ngữ lên trước động từ chính." },
                { id: "cur3_10_2", word: "关", pinyin: "guān", meaning: "đóng, tắt", pos: "v", tip: "Ngược nghĩa với 开 (kāi - mở, bật)." },
                { id: "cur3_10_3", word: "新闻", pinyin: "xìnwén", meaning: "tin tức, thời sự", pos: "n", tip: "Tân (新 - mới) kết hợp Văn (闻 - nghe thấy)." },
                { id: "cur3_10_4", word: "马上", pinyin: "mǎshàng", meaning: "ngay lập tức", pos: "other", tip: "Phó từ chỉ hành động diễn ra cực kỳ nhanh chóng." }
            ],
            grammar: "1. Câu chữ '把' cơ bản: Cấu trúc dùng để miêu tả hành động tác động lên một đối tượng xác định làm thay đổi trạng thái của nó: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (ví dụ: 了)'.\n2. Phó từ chỉ sự ưu tiên '先': Biểu thị hành động thực hiện trước (Ví dụ: 你先睡 - Bạn ngủ trước đi).",
            quiz: [
                { q: "Cấu trúc câu chữ '把' đúng ngữ pháp là cấu trúc nào?", options: ["S + 把 + O + V + Thành phần khác", "S + V + 把 + O", "把 + S + O + V", "S + O + 把 + V"], ans: "S + 把 + O + V + Thành phần khác" },
                { q: "Ngược nghĩa với động từ '关' (đóng, tắt) là động từ nào?", options: ["放", "开 (mở, bật)", "送", "走"], ans: "开 (mở, bật)" },
                { q: "Dịch câu 'Tôi tắt ngay lập tức'?", options: ["我马上就关", "我不关", "我先关", "我把电脑关了"], ans: "我马上就关" }
            ]
        }
    ]
};