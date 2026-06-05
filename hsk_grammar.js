// File: hsk_grammar.js (Đặt tại thư mục gốc)
const hskGrammarDatabase = {
    1: [
        {
            id: "hsk1_g1",
            title: "Câu chữ '是' (Thì, là, ở)",
            structure: "A + 是 + B",
            pinyinStructure: "A + shì + B",
            desc: "Dùng để biểu thị quan hệ tương đương, khẳng định hoặc giải thích đặc trưng giữa chủ ngữ và tân ngữ.",
            // Tùy biến: Tách hẳn mảng ví dụ để sau này có thể làm tính năng click phát âm thanh từng câu
            examples: [
                {
                    zh: "我是学生。",
                    py: "Wǒ shì xuésheng.",
                    vi: "Tôi là học sinh.",
                    audio: "audio/grammar/hsk1_g1_ex1.mp3" // Sẵn sàng cho tính năng audio
                },
                {
                    zh: "他 không phải là bác sĩ (Không dùng 是 trong phủ định đơn thuần mà dùng 不是)",
                    zhCorrect: "他不是医生。",
                    py: "Tā bú shì yīshēng.",
                    vi: "Anh ấy không phải là bác sĩ.",
                    note: "Thể phủ định: A + 不是 + B"
                }
            ],
            // Tùy biến: Thêm mẹo học và lỗi sai để dữ liệu "đậm đặc" kiến thức hơn
            commonMistakes: "Không dùng '是' trước tính từ biểu thị tính chất. (Ví dụ SAI: 我是很高 X -> ĐÚNG: 我很高).",
            tips: "Nhấn mạnh từ '是' khi muốn khẳng định chắc chắn một sự thật.",
            tags: ["Cơ bản", "Câu vị ngữ động từ"]
        }
    ],
    2: [
        // Dữ liệu HSK 2 tương tự...
    ]
};

// Nếu dự án của bạn dùng cơ chế ES Modules (Import/Export):
// export default hskGrammarDatabase;