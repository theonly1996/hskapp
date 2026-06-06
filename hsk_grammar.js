// File: js/hsk_grammar.js
const hskGrammarDatabase = {
    1: [
        {
            id: "hsk1_g1",
            title: "Câu chữ '是' (Thì, là, ở)",
            structure: "A + 是 + B",
            pinyinStructure: "A + shì + B",
            desc: "Dùng để biểu thị quan hệ tương đương, khẳng định hoặc giải thích đặc trưng giữa chủ ngữ và tân ngữ.",
            examples: [
                {
                    zh: "我是学生。",
                    py: "Wǒ shì xuésheng.",
                    vi: "Tôi là học sinh."
                },
                {
                    zh: "他不是医生。",
                    py: "Tā bú shì yīshēng.",
                    vi: "Anh ấy không phải là bác sĩ.",
                    note: "Không dùng 是 trong phủ định đơn thuần mà dùng 不是."
                }
            ],
            commonMistakes: "Không dùng '是' trước tính từ biểu thị tính chất. (Ví dụ SAI: 我是很高 ❌ -> ĐÚNG: 我很高 ✅).",
            compareWith: {
                note: "Phân biệt '是' (Thì, là) dùng để nối 2 danh từ, với '在' (Ở) dùng để chỉ vị trí tồn tại.",
                targetTitle: "Câu chữ '有'" 
            },
            tips: "Nhấn mạnh từ '是' khi muốn khẳng định chắc chắn một sự thật.",
            tags: ["Cơ bản", "Câu vị ngữ động từ"],
            exercises: [
                {
                    id: "ex1_1",
                    question: "Điền từ thích hợp vào chỗ trống: 他 ___ 老师。",
                    options: ["不", "是", "很", "的"],
                    correctAnswer: 1,
                    explanation: "Dùng '是' (shì) để nối chủ ngữ '他' (Anh ấy) và tân ngữ '老师' (Giáo viên)."
                },
                {
                    id: "ex1_2",
                    question: "Chọn câu viết đúng ngữ pháp:",
                    options: [
                        "我是很好。",
                        "他不学生。",
                        "我不是医生。",
                        "是她中国人。"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu phủ định của 是 là 不是. Lỗi sai câu A: không dùng 是 trước tính từ (很好)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 1 ---
        {
            id: "hsk1_g2",
            title: "Câu chữ '有' (Sở hữu và Tồn tại)",
            structure: "Chủ ngữ / Địa điểm + 有 + Danh từ",
            pinyinStructure: "S / Place + yǒu + Noun",
            desc: "Câu chữ 有 có 2 cách dùng cực kỳ quan trọng:\n1. Chỉ sự sở hữu: Ai đó CÓ cái gì (VD: Tôi có sách).\n2. Chỉ sự tồn tại: Ở đâu đó CÓ cái gì (VD: Trong nhà có người).",
            examples: [
                {
                    zh: "我有一个苹果。",
                    py: "Wǒ yǒu yí gè píngguǒ.",
                    vi: "Tôi có một quả táo.",
                    note: "Nghĩa Sở hữu"
                },
                {
                    zh: "学校里有很多学生。",
                    py: "Xuéxiào lǐ yǒu hěn duō xuésheng.",
                    vi: "Trong trường học có rất nhiều học sinh.",
                    note: "Nghĩa Tồn tại (Địa điểm + 有)"
                },
                {
                    zh: "他没有钱。",
                    py: "Tā méi yǒu qián.",
                    vi: "Anh ấy không có tiền.",
                    note: "Chú ý: Phủ định của 有 BẮT BUỘC phải dùng 没."
                }
            ],
            commonMistakes: "Lỗi kinh điển của người học: Dùng 不 (bù) để phủ định chữ 有 (VD SAI: 我不有钱 ❌ -> ĐÚNG: 我没有钱 ✅). '有' và '不' vĩnh viễn không bao giờ đi chung với nhau.",
            tips: "Khi thấy chữ 有, phản xạ đầu tiên để phủ định phải là 没 (méi).",
            tags: ["Cơ bản", "Sở hữu", "Tồn tại"],
            exercises: [
                {
                    question: "Làm thế nào để nói 'Tôi không có sách' trong tiếng Trung?",
                    options: [
                        "我不有书。",
                        "我是没书。",
                        "我没有书。",
                        "我不书。"
                    ],
                    correctAnswer: 2,
                    explanation: "Quy tắc vàng: Phủ định của 有 (yǒu) luôn luôn là 没 (méi), tạo thành 没有 (méiyǒu)."
                },
                {
                    question: "Câu '桌子上有电脑' (Zhuōzi shang yǒu diànnǎo) mang ý nghĩa gì?",
                    options: [
                        "Cái bàn sở hữu máy tính.",
                        "Trên bàn có máy tính (Sự tồn tại).",
                        "Máy tính là cái bàn.",
                        "Cái bàn là máy tính."
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc: Địa điểm (桌子上 - trên bàn) + 有 + Sự vật (电脑 - máy tính) dùng để chỉ sự tồn tại."
                },
                {
                    question: "Chọn câu viết SAI ngữ pháp:",
                    options: [
                        "他有一个哥哥。",
                        "我家没有狗。",
                        "老师不有时间。",
                        "杯子里有水。"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C sai vì dùng 不 với 有. Phải sửa thành 老师没有时间 (Lão sư không có thời gian)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 2 ---
        {
            id: "hsk1_g3",
            title: "Trợ từ nghi vấn '吗' (Phải không?)",
            structure: "Câu trần thuật + 吗？",
            pinyinStructure: "Statement + ma?",
            desc: "Biến một câu kể sự thật (khẳng định hoặc phủ định) thành một câu hỏi Có/Không (Yes/No Question). Vị trí của 吗 luôn luôn nằm ở CUỐI CÂU.",
            examples: [
                {
                    zh: "你是中国人吗？",
                    py: "Nǐ shì Zhōngguó rén ma?",
                    vi: "Bạn là người Trung Quốc phải không?"
                },
                {
                    zh: "明天你不去吗？",
                    py: "Míngtiān nǐ bú qù ma?",
                    vi: "Ngày mai bạn không đi sao?",
                    note: "Có thể dùng 吗 sau câu phủ định để biểu thị sự ngạc nhiên hoặc xác nhận."
                }
            ],
            commonMistakes: "Tuyệt đối KHÔNG dùng '吗' trong câu đã có sẵn các từ để hỏi (như 什么 cái gì, 谁 ai, 哪儿 ở đâu) hoặc câu hỏi chính phản (A不A). Ví dụ SAI: 你叫什么名字吗？ ❌ (Thừa chữ 吗).",
            tags: ["Từ vựng", "Câu hỏi", "Trợ từ"],
            exercises: [
                {
                    question: "Điền từ vào chỗ trống: 你喜欢喝茶 ___？",
                    options: ["呢", "什么", "吗", "的"],
                    correctAnswer: 2,
                    explanation: "Câu này thiếu một trợ từ nghi vấn ở cuối để tạo thành câu hỏi Có/Không -> Dùng 吗."
                },
                {
                    question: "Câu nào dưới đây bị THỪA ngữ pháp (SAI)?",
                    options: [
                        "他是老师吗？",
                        "你吃不吃饭吗？",
                        "你们去学校吗？",
                        "这不是你的书吗？"
                    ],
                    correctAnswer: 1,
                    explanation: "Câu B dùng cấu trúc hỏi chính phản (吃不吃 - ăn hay không ăn), đã mang nghĩa nghi vấn rồi nên tuyệt đối không được thêm 吗 ở cuối."
                },
                {
                    question: "Sắp xếp các từ sau thành câu đúng: 去 / 吗 / 医院 / 你 / 明天 ?",
                    options: [
                        "明天去你医院吗？",
                        "你去吗医院明天？",
                        "明天你去医院吗？",
                        "你医院去明天吗？"
                    ],
                    correctAnswer: 2,
                    explanation: "Trật tự câu: Thời gian (明天) + Chủ ngữ (你) + Động từ (去) + Địa điểm (医院) + 吗?"
                }
            ]
        },
        // --- BÀI MỚI SỐ 3 ---
        {
            id: "hsk1_g4",
            title: "Trật tự câu hỏi với 什么, 谁, 哪儿",
            structure: "Chủ ngữ + Động từ + Đại từ nghi vấn?",
            pinyinStructure: "S + V + Question Word?",
            desc: "Trong tiếng Trung, TRẬT TỰ TỪ CỦA CÂU HỎI GIỐNG HỆT CÂU TRẢ LỜI. Bạn không cần đảo ngữ hay đưa từ để hỏi lên đầu câu như tiếng Anh. Muốn hỏi thông tin gì, chỉ cần đặt Đại từ nghi vấn (什么: Cái gì, 谁: Ai, 哪儿: Ở đâu) vào đúng vị trí đó.",
            examples: [
                {
                    zh: "你吃什么？",
                    py: "Nǐ chī shénme?",
                    vi: "Bạn ăn cái gì?",
                    note: "Trả lời: 我吃饭 (Tôi ăn cơm). Từ 什么 thay thế thẳng vào vị trí của chữ 饭."
                },
                {
                    zh: "他是谁？",
                    py: "Tā shì shéi?",
                    vi: "Anh ấy là ai?"
                },
                {
                    zh: "你去哪儿？",
                    py: "Nǐ qù nǎ'er?",
                    vi: "Bạn đi đâu?"
                }
            ],
            commonMistakes: "Do ảnh hưởng của tiếng Anh (What do you eat?), người Việt hay đem từ để hỏi lên đầu câu. Ví dụ SAI: 什么你吃？ ❌ -> ĐÚNG: 你吃什么？ ✅.",
            compareWith: {
                note: "Chú ý phân biệt 哪 (nǎ - Nào) và 那 (nà - Kia/Đó). Hai từ này viết gần giống nhau, chỉ khác bộ Khẩu (口) ở phía trước đối với từ dùng để hỏi.",
                targetTitle: "Trợ từ nghi vấn '吗'" 
            },
            tips: "Mẹo: Muốn trả lời như thế nào thì viết câu hỏi y như vậy, chỉ thay cái cần hỏi bằng 什么/谁/哪儿.",
            tags: ["Đại từ", "Câu hỏi", "Cấu trúc"],
            exercises: [
                {
                    question: "Câu nào dịch đúng nghĩa 'Bạn mua cái gì?'",
                    options: [
                        "什么你买？",
                        "买你什么？",
                        "你什么买？",
                        "你买什么？"
                    ],
                    correctAnswer: 3,
                    explanation: "Trật tự từ không đổi: Chủ ngữ (你) + Động từ (买) + Từ để hỏi tân ngữ (什么)."
                },
                {
                    question: "Nếu câu trả lời là '我是医生' (Tôi là bác sĩ), câu hỏi phù hợp nhất là:",
                    options: [
                        "你是谁？",
                        "你去哪儿？",
                        "你做什么？",
                        "你叫什么名字？"
                    ],
                    correctAnswer: 0,
                    explanation: "医生 (Bác sĩ) là danh từ chỉ người, nên từ để hỏi phải là 谁 (shéi - Ai)."
                },
                {
                    question: "Điền từ: 李月在 ____ ？",
                    options: ["什么", "谁", "哪儿", "吗"],
                    correctAnswer: 2,
                    explanation: "Động từ 在 (Ở) chỉ vị trí, vì vậy phải dùng đại từ nghi vấn nơi chốn 哪儿 (Ở đâu)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 4 ---
        {
            id: "hsk1_g5",
            title: "Phân biệt phủ định '不' và '没'",
            structure: "不 / 没 + Động từ / Tính từ",
            pinyinStructure: "bù / méi + Verb / Adjective",
            desc: "Tuy cùng dịch là 'Không', nhưng cách dùng rất khác nhau:\n1. 不 (bù): Phủ định ý muốn (không muốn làm), thói quen, sự thật hiển nhiên, hoặc hành động ở hiện tại/tương lai. 不 dùng được với tính từ.\n2. 没 (méi): Dịch là 'Chưa/Không', chuyên dùng để phủ định hành động ĐÃ KHÔNG XẢY RA trong quá khứ. Đặc biệt, 没 là từ DUY NHẤT được đi với 有.",
            examples: [
                {
                    zh: "我不吃肉。",
                    py: "Wǒ bù chī ròu.",
                    vi: "Tôi không ăn thịt.",
                    note: "Dùng 不: Chỉ thói quen (Tôi ăn chay) hoặc ý muốn chủ quan (Tôi không thích ăn thịt)."
                },
                {
                    zh: "我没吃肉。",
                    py: "Wǒ méi chī ròu.",
                    vi: "Tôi chưa/không ăn thịt.",
                    note: "Dùng 没: Chỉ một sự việc khách quan trong quá khứ (Hôm qua trên bàn có thịt nhưng tôi không gắp miếng nào)."
                },
                {
                    zh: "今天不冷。",
                    py: "Jīntiān bù lěng.",
                    vi: "Hôm nay không lạnh.",
                    note: "Dùng 不 để phủ định tính từ (冷 - lạnh)."
                }
            ],
            commonMistakes: "1. Dùng 没 đi với tính từ (VD SAI: 今天没冷 ❌). 2. Quên quy tắc biến điệu chữ 不: Khi đứng trước từ thanh 4, 不 đọc thành thanh 2 'bú' (VD: 不是 bú shì, 不去 bú qù).",
            tags: ["Phó từ", "Phủ định", "Khó nhầm lẫn"],
            exercises: [
                {
                    question: "Hôm qua tôi ốm nên (đã không đi) trường học. Chọn từ điền vào chỗ trống: 昨天我 ___ 去学校。",
                    options: ["不", "没", "不是", "没有"],
                    correctAnswer: 1,
                    explanation: "Sự việc ĐÃ KHÔNG xảy ra trong quá khứ (昨天 - hôm qua), bắt buộc phải dùng 没 (hoặc 没有) để phủ định hành động 去."
                },
                {
                    question: "Câu nào dưới đây dùng SAI phó từ phủ định?",
                    options: [
                        "我不认识他。",
                        "昨天没下雨。",
                        "这个苹果没好吃。",
                        "我没有钱。"
                    ],
                    correctAnswer: 2,
                    explanation: "好吃 (ngon) là tính từ. '没' không dùng để phủ định tính từ (trừ so sánh). Phải dùng '不好吃' (Không ngon)."
                },
                {
                    question: "Khi nào chữ '不' (bù) phải đọc đổi dấu thành 'bú'?",
                    options: [
                        "Khi đứng trước động từ.",
                        "Khi đứng trước thanh 1, 2, 3.",
                        "Khi đứng trước từ mang thanh 4.",
                        "Chữ 不 không bao giờ đổi dấu."
                    ],
                    correctAnswer: 2,
                    explanation: "Kiến thức ngữ âm: Khi chữ theo sau mang thanh 4 (VD: 是 shì, 去 qù, 看 kàn), chữ 不 (bù) sẽ đọc thành bú."
                },
                {
                    question: "Dịch câu: 'Chủ nhật tôi thường không làm việc' sang tiếng Trung.",
                    options: [
                        "星期日我常常没工作。",
                        "星期日我没常常工作。",
                        "星期日我常常不工作。",
                        "星期日我不常常没工作。"
                    ],
                    correctAnswer: 2,
                    explanation: "Nói về một 'thói quen' (thường xuyên không làm gì), ta phải dùng 不 (bù)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 5 ---
        {
            id: "hsk1_g6",
            title: "Cụm Số Lượng Từ (Số từ + Lượng từ + Danh từ)",
            structure: "Số từ (Number) + Lượng từ (Measure Word) + Danh từ (Noun)",
            pinyinStructure: "Num + MW + Noun",
            desc: "Khác với tiếng Việt (chỉ cần nói '1 người', '3 sách'), trong tiếng Trung bắt buộc phải có LƯỢNG TỪ chen giữa Số từ và Danh từ. \nLượng từ phổ biến nhất và dùng được cho nhiều thứ nhất trong HSK 1 là 个 (gè).",
            examples: [
                {
                    zh: "一个人",
                    py: "yí gè rén",
                    vi: "Một người"
                },
                {
                    zh: "三个苹果",
                    py: "sān gè píngguǒ",
                    vi: "Ba quả táo"
                },
                {
                    zh: "这两本书",
                    py: "zhè liǎng běn shū",
                    vi: "Hai cuốn sách này",
                    note: "Với từ chỉ thị (这/那), cấu trúc là: 这/那 + Số từ + Lượng từ + Danh từ."
                }
            ],
            commonMistakes: "Quên Lượng từ (VD SAI: 我有三苹果 ❌ -> ĐÚNG: 我有三个苹果 ✅).",
            compareWith: {
                note: "Luật vàng: Khi đếm số lượng là 2 (Hai cái gì đó), TUYỆT ĐỐI không dùng 二 (èr) mà BẮT BUỘC phải dùng 两 (liǎng).",
                targetTitle: "Câu chữ '有' (Sở hữu và Tồn tại)" 
            },
            tips: "Nếu lúc thi đột nhiên quên mất lượng từ của một đồ vật là gì (VD quên mất 'sách' đi với 'běn'), hãy dùng tạm chữ 个. Dù không hay nhưng người bản xứ vẫn hiểu được.",
            tags: ["Số đếm", "Lượng từ", "Danh từ"],
            exercises: [
                {
                    question: "Dịch cụm từ 'Hai người học sinh' sang tiếng Trung:",
                    options: [
                        "二学生",
                        "两学生",
                        "二个学生",
                        "两个学生"
                    ],
                    correctAnswer: 3,
                    explanation: "Phải có lượng từ 个. Hơn nữa, đứng trước lượng từ mang nghĩa số đếm là 2 thì phải dùng 两 (liǎng), không dùng 二 (èr)."
                },
                {
                    question: "Cấu trúc nào dưới đây thiếu yếu tố ngữ pháp bắt buộc?",
                    options: [
                        "那个人",
                        "我有一个女儿",
                        "五朋友",
                        "四本书"
                    ],
                    correctAnswer: 2,
                    explanation: "Nguyên tắc Số - Lượng - Danh. '五朋友' (5 bạn bè) thiếu lượng từ, phải viết là '五个朋友'."
                },
                {
                    question: "Nếu muốn nói 'Cái ly này', bạn sẽ nói thế nào? (Biết ly là 杯子 - bēizi)",
                    options: [
                        "这杯子",
                        "这个杯子",
                        "杯子这",
                        "那杯子个"
                    ],
                    correctAnswer: 1,
                    explanation: "Khi dùng 这 (Này) hoặc 那 (Kia) đi trực tiếp với danh từ, ta cũng ngầm hiểu số lượng là 1, nên vẫn phải có lượng từ ở giữa: 这 + 个 + 杯子."
                }
            ]
        }
    ],
    2: [
        // Dữ liệu HSK 2 sẽ được thêm sau...
    ]
};