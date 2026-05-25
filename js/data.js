// =========================================================================
// KHỞI TẠO DỮ LIỆU DỰ PHÒNG CHẤT LƯỢNG CAO (HSK 1 - HSK 6)
// (Sẽ được sử dụng nếu không tải được file hsk1.js, hsk2.js,...)
// =========================================================================
const FALLBACK_VOCABULARY = {
    1: [
        { id: "hsk1_1", word: "爱", pinyin: "ài", meaning: "yêu, thích", pos: "v", example: "我爱吃中国菜。 (Wǒ ài chī Zhōngguó cài.) - Tôi thích ăn món ăn Trung Quốc.", tip: "Chữ 爱 gồm bộ trảo (móng vuốt) phía trên và trái tim (tâm 心) ở giữa, thể hiện tình cảm xuất phát từ đáy lòng." },
        { id: "hsk1_2", word: "苹果", pinyin: "píngguǒ", meaning: "quả táo", pos: "n", example: "我想买几个苹果。 (Wǒ xiǎng mǎi jǐ gè píngguǒ.) - Tôi muốn mua vài quả táo.", tip: "Từ 苹 (bình) có bộ Thảo đầu chỉ cây cỏ, 果 (quả) chỉ trái cây." },
        { id: "hsk1_3", word: "谢谢", pinyin: "xièxie", meaning: "cảm ơn", pos: "v", example: "谢谢你 help 我。 (Xièxie nǐ bāng wǒ.) - Cảm ơn bạn đã giúp tôi.", tip: "謝 gồm bộ Ngôn 言 (nói năng) và Thân 身, thốt lời tri ân từ tấm thân này." },
        { id: "hsk1_4", word: "个", pinyin: "gè", meaning: "cái, chiếc (lượng từ quốc dân)", pos: "q", isMeasureWord: true, example: "一个杯子。 (Yí gè bēizi.) - Một cái ly.", tip: "Lượng từ phổ biến nhất trong tiếng Trung, có thể dùng khi không nhớ lượng từ riêng biệt." },
        { id: "hsk1_5", word: "的", pinyin: "de", meaning: "của (trợ từ sở hữu)", pos: "p", example: "这是我的书。 (Zhè shì wǒ de shū.) - Đây là sách của tôi.", tip: "Trợ từ tần suất sử dụng cao nhất. Định ngữ + 的 + Trung tâm ngữ." }
    ],
    2: [
        { id: "hsk2_1", word: "唱歌", pinyin: "chànggē", meaning: "hát, ca hát", pos: "v_separable", example: "我们去唱歌吧。 (Wǒmen qù chànggē ba.) - Chúng ta đi hát đi.", tip: "Từ ly hợp (Động từ + Tân ngữ). Không được nói 唱歌我, phải nói 唱一首歌." },
        { id: "hsk2_2", word: "便宜", pinyin: "piányi", meaning: "rẻ", pos: "adj", example: "这件衣服很便宜。 (Zhè jiàn yīfu hěn piányi.) - Bộ quần áo này rất rẻ.", tip: "Ngược nghĩa với 贵 (guì - đắt)." },
        { id: "hsk2_3", word: "因为", pinyin: "yīnwèi", meaning: "bởi vì", pos: "conj", example: "因为下雨，所以他没来。 (Yīnwèi xià yǔ, suǒyǐ tā méi lái.) - Vì trời mưa nên anh ấy không đến.", tip: "Thường đi kèm cặp liên từ 因为...所以... (Bởi vì... cho nên...)." },
        { id: "hsk2_4", word: "件", pinyin: "jiàn", meaning: "lượng từ cho quần áo, sự việc", pos: "q", isMeasureWord: true, example: "一件衣服。 (Yí jiàn yīfu.) - Một bộ quần áo.", tip: "Bên trái có bộ Nhân đứng 亻 (người), ý nói quần áo/việc liên quan đến con người." }
    ],
    3: [
        { id: "hsk3_1", word: "帮忙", pinyin: "bāngmáng", meaning: "giúp đỡ", pos: "v_separable", example: "请帮我一个忙。 (Qǐng bāng wǒ yí gè máng.) - Xin hãy giúp tôi một tay.", tip: "Là từ ly hợp điển hình. Không nói 帮忙我, phải dùng 帮我的忙 hoặc giúp tôi một việc." },
        { id: "hsk3_2", word: "洗澡", pinyin: "xǐzǎo", meaning: "tắm rửa", pos: "v_separable", example: "他正在洗澡呢。 (Tā zhèngzài xǐzǎo ne.) - Anh ấy đang tắm đấy.", tip: "Cả hai chữ đều có bộ Thủy 水 (三点水) liên quan trực tiếp đến nước." },
        { id: "hsk3_3", word: "制造", pinyin: "zhìzào", meaning: "chế tạo, sản xuất", pos: "v", example: "中国制造。 (Zhōngguó zhìzào.) - Sản xuất tại Trung Quốc.", tip: "Bộ Đao 刀 bên phải biểu thị dùng công cụ sắc bén gia công." }
    ],
    4: [],
    5: [],
    6: []
};

// =========================================================================
// GIÁO TRÌNH DỰ PHÒNG KHẨN CẤP (FALLBACK)
// (Sẽ được sử dụng nếu file hsk_curriculum.js bị thiếu)
// =========================================================================
const FALLBACK_CURRICULUM = {
    1: [
        {
            lessonId: 1,
            title: "Bài 1: 你好 - Xin chào",
            desc: "Học cách chào hỏi cơ bản và hồi đáp lịch sự xã giao.",
            dialogue: [
                { role: "A", zh: "你好！", pinyin: "Nǐ hǎo!", vi: "Xin chào!" },
                { role: "B", zh: "你好！", pinyin: "Nǐ hǎo!", vi: "Xin chào!" }
            ],
            vocab: [
                { id: "cur1_1_1", word: "你", pinyin: "nǐ", meaning: "bạn", pos: "other", tip: "Chỉ người đối diện." },
                { id: "cur1_1_2", word: "好", pinyin: "hǎo", meaning: "tốt, khỏe", pos: "adj", tip: "Chào hỏi căn bản." }
            ],
            grammar: "Sử dụng '你好' khi gặp một người để thể hiện sự thân thiện xã giao.",
            quiz: [
                { q: "Chào đối phương một cách thông thường ta dùng cụm từ nào?", options: ["你好", "谢谢", "再见", "对不起"], ans: "你好" }
            ]
        }
    ],
    2: [],
    3: []
};

// =========================================================================
// PHÂN LOẠI TỪ LOẠI (Part Of Speech Dictionary)
// =========================================================================
const POS_MAP = {
    'n': { name: 'Danh từ', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    'v': { name: 'Động từ', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    'v_separable': { name: 'Từ ly hợp', color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    'adj': { name: 'Tính từ', color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
    'q': { name: 'Lượng từ', color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
    'conj': { name: 'Liên từ', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
    'p': { name: 'Trợ / Giới từ', color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
    'idiom': { name: 'Thành ngữ', color: 'bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800' },
    'other': { name: 'Khác', color: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200' }
};