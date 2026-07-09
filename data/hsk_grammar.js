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
        },
        // --- BÀI MỚI SỐ 6 ---
        {
            id: "hsk1_g7",
            title: "Đại từ chỉ thị '这' (Này) và '那' (Kia)",
            structure: "这 / 那 + (Số từ) + Lượng từ + Danh từ",
            pinyinStructure: "zhè / nà + (Num) + MW + Noun",
            desc: "Dùng để chỉ định người hoặc sự vật cụ thể. '这' (zhè) dùng cho khoảng cách gần người nói (này, đây), '那' (nà) dùng cho khoảng cách xa (kia, đó).",
            examples: [
                {
                    zh: "这个人是谁？",
                    py: "Zhè gè rén shì shéi?",
                    vi: "Người này là ai?"
                },
                {
                    zh: "那本书是我的。",
                    py: "Nà běn shū shì wǒ de.",
                    vi: "Cuốn sách kia là của tôi."
                }
            ],
            commonMistakes: "Người mới học thường ghép trực tiếp 这/那 với Danh từ mà bỏ qua Lượng từ (VD SAI: 这人, 那书 ❌ -> ĐÚNG: 这个人, 那本书 ✅).",
            tips: "Khi số lượng là 1, có thể ẩn số từ '一' nhưng BẮT BUỘC phải giữ lại lượng từ.",
            tags: ["Đại từ", "Chỉ thị", "Cơ bản"],
            exercises: [
                {
                    question: "Điền từ thích hợp: ___ 杯子是我的。 (Cái ly kia là của tôi)",
                    options: ["这", "那个", "那", "这个"],
                    correctAnswer: 1,
                    explanation: "Chỉ khoảng cách xa (kia) dùng '那', và phải kèm theo lượng từ '个' trước danh từ '杯子'."
                },
                {
                    question: "Chọn câu ĐÚNG ngữ pháp:",
                    options: [
                        "这书很好看。",
                        "我喜欢这手机。",
                        "那个苹果很大。",
                        "那是三个学生。"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C đúng vì có đủ chỉ từ (那) + lượng từ (个) + danh từ (苹果). Các câu A và B thiếu lượng từ."
                }
            ]
        },
        // --- BÀI MỚI SỐ 7 ---
        {
            id: "hsk1_g8",
            title: "Trạng từ chỉ mức độ '很' (Rất)",
            structure: "Chủ ngữ + 很 + Tính từ",
            pinyinStructure: "S + hěn + Adj",
            desc: "Dùng để miêu tả tính chất, trạng thái. Trong câu khẳng định miêu tả, thường bắt buộc phải có '很' trước tính từ để làm từ nối, ngay cả khi người nói không cố ý nhấn mạnh chữ 'rất'.",
            examples: [
                {
                    zh: "我很好。",
                    py: "Wǒ hěn hǎo.",
                    vi: "Tôi rất khỏe / Tôi ổn."
                },
                {
                    zh: "今天很冷。",
                    py: "Jīntiān hěn lěng.",
                    vi: "Hôm nay rất lạnh."
                }
            ],
            commonMistakes: "Sử dụng '是' thay vì '很' trước tính từ (VD SAI: 我是很好 ❌ -> ĐÚNG: 我很好 ✅). Tính từ trong tiếng Trung có thể trực tiếp làm vị ngữ mà không cần động từ 'to be'.",
            compareWith: {
                note: "Phủ định của '很 + Tính từ' là '不 + Tính từ' (không dùng 很 nữa). VD: 今天不冷 (Hôm nay không lạnh).",
                targetTitle: "Phân biệt phủ định '不' và '没'" 
            },
            tips: "Nếu không có '很' (hoặc các trạng từ mức độ khác), câu sẽ mang hàm ý so sánh. VD: '他高' thường ám chỉ 'Anh ta cao (hơn ai đó)'.",
            tags: ["Trạng từ", "Tính từ", "Miêu tả"],
            exercises: [
                {
                    question: "Câu nào dưới đây miêu tả 'Cô ấy rất đẹp' đúng ngữ pháp?",
                    options: [
                        "她是漂亮。",
                        "她很漂亮。",
                        "她漂亮很。",
                        "她是不漂亮。"
                    ],
                    correctAnswer: 1,
                    explanation: "Dùng trạng từ '很' đặt trước tính từ '漂亮', không dùng động từ '是'."
                },
                {
                    question: "Đâu là câu phủ định đúng của '汉语很难' (Tiếng Trung rất khó)?",
                    options: [
                        "汉语很不难。",
                        "汉语没难。",
                        "汉语不很难。",
                        "汉语不难。"
                    ],
                    correctAnswer: 3,
                    explanation: "Trong câu phủ định tính từ, ta bỏ '很' và thêm '不' trực tiếp trước tính từ."
                }
            ]
        },
        // --- BÀI MỚI SỐ 8 ---
        {
            id: "hsk1_g9",
            title: "Câu hỏi chính phản (A不A / V不V)",
            structure: "Chủ ngữ + Động từ + 不 + Động từ + (Tân ngữ)?",
            pinyinStructure: "S + V + bù + V + (O)?",
            desc: "Là dạng câu hỏi lựa chọn 'Có... không?'. Bằng cách ghép thể khẳng định và phủ định của động từ (hoặc tính từ) lại với nhau, ta tạo thành một câu hỏi Yes/No mà không cần dùng trợ từ nghi vấn.",
            examples: [
                {
                    zh: "你去不去学校？",
                    py: "Nǐ qù bu qù xuéxiào?",
                    vi: "Bạn có đi đến trường không?"
                },
                {
                    zh: "这个苹果大不大？",
                    py: "Zhège píngguǒ dà bu dà?",
                    vi: "Quả táo này to không?"
                }
            ],
            commonMistakes: "Thêm trợ từ '吗' vào cuối câu hỏi chính phản (VD SAI: 你去不去吗？ ❌ -> ĐÚNG: 你去不去？ ✅).",
            compareWith: {
                note: "Câu hỏi chính phản có chức năng tương đương hoàn toàn với câu hỏi dùng '吗'. Có thể chọn dùng 1 trong 2 cấu trúc, nhưng tuyệt đối không gộp chung cả hai.",
                targetTitle: "Trợ từ nghi vấn '吗'" 
            },
            tips: "Khi động từ có 2 âm tiết (VD: 喜欢 - xǐhuan), có thể nói tắt âm tiết thứ 2 ở cụm đầu tiên: 喜不喜欢 (xǐ bu xǐhuan).",
            tags: ["Câu hỏi", "Cấu trúc"],
            exercises: [
                {
                    question: "Đâu là câu hỏi chính phản ĐÚNG ngữ pháp?",
                    options: [
                        "你是不是老师吗？",
                        "他吃不吃中国菜？",
                        "你们喜不欢喝茶？",
                        "好不好看这本小说？"
                    ],
                    correctAnswer: 1,
                    explanation: "Câu B đúng cấu trúc V不V. Câu A sai vì dư '吗'. Câu C sai vì nói tắt sai (phải là 喜不喜欢). Câu D sai trật tự từ."
                },
                {
                    question: "Biến đổi câu '你是越南人吗？' thành dạng câu hỏi chính phản:",
                    options: [
                        "你不越南人？",
                        "你是越南人不？",
                        "你是不是越南人？",
                        "你是越南人不是？"
                    ],
                    correctAnswer: 2,
                    explanation: "Áp dụng cấu trúc V不V với động từ '是', ta có '是不是'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 9 ---
        {
            id: "hsk1_g10",
            title: "Trợ từ kết cấu '的' (Sở hữu / Định ngữ)",
            structure: "Định ngữ (Chủ sở hữu / Đặc điểm) + 的 + Trung tâm ngữ (Danh từ)",
            pinyinStructure: "Modifier + de + Noun",
            desc: "Dùng để biểu thị quan hệ sở hữu (của) hoặc dùng để nối phần miêu tả với danh từ. Phần ĐỨNG TRƯỚC '的' bổ nghĩa cho phần ĐỨNG SAU '的'. Trật tự này NGƯỢC LẠI hoàn toàn so với tiếng Việt.",
            examples: [
                {
                    zh: "我的书",
                    py: "wǒ de shū",
                    vi: "Sách của tôi",
                    note: "Nghĩa sở hữu."
                },
                {
                    zh: "很高兴的老师",
                    py: "hěn gāoxìng de lǎoshī",
                    vi: "Người giáo viên (rất) vui vẻ",
                    note: "Tính từ miêu tả + 的 + Danh từ."
                }
            ],
            commonMistakes: "Dịch word-by-word theo trật tự từ tiếng Việt (VD SAI: 书的我 ❌ -> ĐÚNG: 我的书 ✅). Luôn nhớ quy tắc bất di bất dịch: Danh từ chính phải đứng sau cùng.",
            tips: "Có thể LƯỢC BỎ '的' khi quan hệ sở hữu rất thân thuộc và gần gũi (như người thân trong gia đình, quốc gia, cơ quan). VD: 我妈妈 (Mẹ tôi) thay vì 我的妈妈.",
            tags: ["Trợ từ", "Sở hữu", "Cấu trúc"],
            exercises: [
                {
                    question: "Dịch cụm từ 'Máy tính của anh ấy' sang tiếng Trung:",
                    options: [
                        "他的电脑",
                        "电脑的他",
                        "他电脑的",
                        "的电脑他"
                    ],
                    correctAnswer: 0,
                    explanation: "Quy tắc: Người sở hữu (他) + 的 + Đồ vật (电脑)."
                },
                {
                    question: "Trong trường hợp nào dưới đây có thể LƯỢC BỎ chữ '的'?",
                    options: [
                        "我(的)书",
                        "好(的)朋友",
                        "红(的)苹果",
                        "我(的)爸爸"
                    ],
                    correctAnswer: 3,
                    explanation: "Có thể bỏ '的' đối với các mối quan hệ ruột thịt thân thuộc như người thân trong gia đình (爸爸 - Bố)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 10 ---
        {
            id: "hsk1_g11",
            title: "Giới từ '在' chỉ địa điểm (Ở đâu làm gì)",
            structure: "Chủ ngữ + 在 + Địa điểm + Động từ + (Tân ngữ)",
            pinyinStructure: "S + zài + Place + V + (O)",
            desc: "Biểu thị hành động xảy ra tại một không gian/địa điểm nào đó. Chú ý: TRẬT TỰ CÂU KHÁC TIẾNG VIỆT. Trong tiếng Trung, cụm 'Ở + Địa điểm' bắt buộc phải đứng TRƯỚC Động từ hành động.",
            examples: [
                {
                    zh: "我在家吃饭。",
                    py: "Wǒ zài jiā chī fàn.",
                    vi: "Tôi ăn cơm ở nhà.",
                    note: "Tiếng Việt: Ăn cơm (V) ở nhà (Place). Tiếng Trung: Ở nhà (zài jiā) ăn cơm (chī fàn)."
                },
                {
                    zh: "他们在学校看书。",
                    py: "Tāmen zài xuéxiào kàn shū.",
                    vi: "Họ đọc sách ở trường."
                }
            ],
            commonMistakes: "Lỗi sai kinh điển của người Việt: Sắp xếp theo thứ tự tiếng mẹ đẻ (VD SAI: 我吃饭在家 ❌ -> ĐÚNG: 我在家吃饭 ✅).",
            compareWith: {
                note: "'在' cũng có thể tự làm Động từ chính trong câu, mang nghĩa 'Có mặt ở đâu đó' mà không cần hành động phía sau. VD: 我在家 (Tôi ở nhà).",
                targetTitle: "Câu chữ '有' (Sở hữu và Tồn tại)" 
            },
            tips: "Mẹo tư duy: Hãy nhớ quy tắc logic thời gian. Bạn phải 'đến địa điểm đó' trước rồi mới 'thực hiện hành động' được, nên cụm địa điểm phải đứng trước.",
            tags: ["Giới từ", "Địa điểm", "Cấu trúc"],
            exercises: [
                {
                    question: "Dịch câu: 'Ngày mai tôi mua sách ở cửa hàng'.",
                    options: [
                        "明天我买书在商店。",
                        "明天在商店我买书。",
                        "明天我在商店买书。",
                        "我明天买在商店书。"
                    ],
                    correctAnswer: 2,
                    explanation: "Cấu trúc đúng: Thời gian (明天) + S (我) + 在 địa điểm (在商店) + Hành động (买书)."
                },
                {
                    question: "Câu nào dưới đây bị SAI ngữ pháp?",
                    options: [
                        "他在医院工作。",
                        "我喝茶在饭店。",
                        "老师在学校。",
                        "你在哪儿睡觉？"
                    ],
                    correctAnswer: 1,
                    explanation: "Câu B sai vì đặt cụm địa điểm (在饭店) sau động từ (喝茶). Phải đảo lên trước: 我在饭店喝茶."
                }
            ]
        },
    
    // --- BÀI MỚI SỐ 11 ---
        {
            id: "hsk1_g12",
            title: "Động từ năng nguyện '会' (Biết)",
            structure: "Chủ ngữ + 会 + Động từ + (Tân ngữ)",
            pinyinStructure: "S + huì + V + (O)",
            desc: "Dùng để biểu thị một kỹ năng hoặc khả năng có được thông qua quá trình học tập, rèn luyện (VD: biết bơi, biết lái xe, biết nói ngoại ngữ).",
            examples: [
                {
                    zh: "我会说汉语。",
                    py: "Wǒ huì shuō Hànyǔ.",
                    vi: "Tôi biết nói tiếng Trung."
                },
                {
                    zh: "他不会做饭。",
                    py: "Tā bú huì zuò fàn.",
                    vi: "Anh ấy không biết nấu ăn.",
                    note: "Dùng '不会' (bú huì) để phủ định khả năng."
                }
            ],
            commonMistakes: "Người học hay nhầm lẫn '会' (biết qua học tập) với '知道' (zhīdào - biết thông tin). Ví dụ SAI: 我知道游泳 ❌ -> ĐÚNG: 我会游泳 ✅ (Tôi biết bơi).",
            tips: "Khi thấy các hành động đòi hỏi phải học mới làm được (ngôn ngữ, thể thao, nghệ thuật, nấu nướng), hãy phản xạ ngay với chữ '会'.",
            tags: ["Động từ năng nguyện", "Khả năng"],
            exercises: [
                {
                    question: "Điền từ: 妈妈，我 ___ 写汉字。(Mẹ ơi, con biết viết chữ Hán rồi).",
                    options: ["想", "能", "会", "是"],
                    correctAnswer: 2,
                    explanation: "Viết chữ Hán là kỹ năng cần phải học, do đó dùng '会' (huì)."
                },
                {
                    question: "Câu nào dưới đây dịch đúng ý nghĩa 'Cô ấy không biết lái xe'?",
                    options: [
                        "她没会开车。",
                        "她不认识开车。",
                        "她不知道开车。",
                        "她不会开车。"
                    ],
                    correctAnswer: 3,
                    explanation: "Phủ định của '会' là '不会'. Lái xe (开车) là kỹ năng qua đào tạo."
                }
            ]
        },
        // --- BÀI MỚI SỐ 12 ---
        {
            id: "hsk1_g13",
            title: "Hỏi số lượng '几' và '多少' (Mấy, Bao nhiêu)",
            structure: "几 + Lượng từ + Danh từ / 多少 + (Lượng từ) + Danh từ",
            pinyinStructure: "jǐ + MW + Noun / duōshao + (MW) + Noun",
            desc: "Đều dùng để hỏi số lượng, nhưng có sự khác biệt rõ rệt:\n1. 几 (Mấy): Dùng để hỏi số lượng nhỏ (thường dưới 10). BẮT BUỘC phải có Lượng từ đi kèm.\n2. 多少 (Bao nhiêu): Dùng để hỏi số lượng lớn (thường từ 10 trở lên). CÓ THỂ BỎ Lượng từ.",
            examples: [
                {
                    zh: "你有几个苹果？",
                    py: "Nǐ yǒu jǐ gè píngguǒ?",
                    vi: "Bạn có mấy quả táo?",
                    note: "Hỏi số lượng ít, phải có lượng từ 个."
                },
                {
                    zh: "学校有多少(个)学生？",
                    py: "Xuéxiào yǒu duōshao (gè) xuésheng?",
                    vi: "Trường học có bao nhiêu học sinh?",
                    note: "Hỏi số lượng nhiều, lượng từ 个 có thể giữ hoặc bỏ."
                }
            ],
            commonMistakes: "Quên dùng lượng từ sau '几'. (Ví dụ SAI: 几书？ ❌ -> ĐÚNG: 几本书？ ✅).",
            tips: "Khi đi chợ mua đồ, người Trung Quốc luôn dùng '多少钱' (Bao nhiêu tiền) chứ không bao giờ hỏi '几钱'.",
            tags: ["Đại từ", "Câu hỏi", "Số lượng"],
            exercises: [
                {
                    question: "Điền từ: 你的班有 ___ 学生？ (Lớp của bạn có bao nhiêu học sinh?)",
                    options: ["什么", "几", "多少", "谁"],
                    correctAnswer: 2,
                    explanation: "Số học sinh trong một lớp thường nhiều hơn 10, nên dùng '多少' (duōshao) là tự nhiên nhất."
                },
                {
                    question: "Câu nào sau đây SAI ngữ pháp?",
                    options: [
                        "你有几本书？",
                        "几个老师？",
                        "你买几苹果？",
                        "多少钱？"
                    ],
                    correctAnswer: 2,
                    explanation: "Sau '几' bắt buộc phải có lượng từ. Quả táo dùng lượng từ 个. Phải sửa thành: '你买几个苹果？'"
                }
            ]
        },
        // --- BÀI MỚI SỐ 13 ---
        {
            id: "hsk1_g14",
            title: "Cấu trúc cảm thán '太...了' (Quá... rồi)",
            structure: "太 + Tính từ + 了",
            pinyinStructure: "tài + Adj + le",
            desc: "Dùng để biểu thị mức độ cực kỳ cao của một tính chất, thường mang sắc thái cảm xúc mạnh mẽ (có thể là khen ngợi ngạc nhiên, hoặc phàn nàn chê bai).",
            examples: [
                {
                    zh: "太漂亮了！",
                    py: "Tài piàoliang le!",
                    vi: "Đẹp quá đi mất!"
                },
                {
                    zh: "今天太冷了。",
                    py: "Jīntiān tài lěng le.",
                    vi: "Hôm nay lạnh quá."
                },
                {
                    zh: "这个字不太难。",
                    py: "Zhège zì bú tài nán.",
                    vi: "Chữ này không khó lắm.",
                    note: "Dạng phủ định là 不太 + Tính từ (KHÔNG có 了 ở cuối)."
                }
            ],
            commonMistakes: "Bỏ sót chữ '了' ở cuối câu khẳng định. Cấu trúc đầy đủ giống như một chiếc bánh mì kẹp, '太' và '了' phải ôm lấy tính từ ở giữa.",
            tags: ["Cảm thán", "Mức độ", "Tính từ"],
            exercises: [
                {
                    question: "Điền từ để hoàn thiện câu cảm thán: 他的汉语 ___ 好了！",
                    options: ["很", "真", "太", "非常"],
                    correctAnswer: 2,
                    explanation: "Chỉ có '太' (tài) mới đi chung với trợ từ '了' ở cuối câu để tạo thành cấu trúc '太...了' (Quá... rồi)."
                },
                {
                    question: "Đâu là câu phủ định ĐÚNG của '太贵了' (Đắt quá)?",
                    options: [
                        "没太贵了。",
                        "不太贵了。",
                        "不太贵。",
                        "没太贵。"
                    ],
                    correctAnswer: 2,
                    explanation: "Dạng phủ định của cấu trúc này là '不太 + Tính từ'. Tuyệt đối không giữ lại chữ '了' ở cuối khi đã dùng phủ định."
                }
            ]
        },
        // --- BÀI MỚI SỐ 14 ---
        {
            id: "hsk1_g15",
            title: "Vị trí của Từ chỉ Thời gian",
            structure: "Thời gian + Chủ ngữ + V... / Chủ ngữ + Thời gian + V...",
            pinyinStructure: "Time + S + V... / S + Time + V...",
            desc: "Trong tiếng Trung, từ chỉ thời gian CÓ THỂ đứng đầu câu (trước Chủ ngữ) hoặc đứng ngay sau Chủ ngữ, nhưng TUYỆT ĐỐI PHẢI ĐỨNG TRƯỚC ĐỘNG TỪ (Hành động).",
            examples: [
                {
                    zh: "昨天我去看医生。",
                    py: "Zuótiān wǒ qù kàn yīshēng.",
                    vi: "Hôm qua tôi đi khám bác sĩ.",
                    note: "Thời gian đứng trước Chủ ngữ."
                },
                {
                    zh: "我昨天去看医生。",
                    py: "Wǒ zuótiān qù kàn yīshēng.",
                    vi: "Tôi hôm qua đi khám bác sĩ.",
                    note: "Thời gian đứng sau Chủ ngữ. Cả 2 cách đều đúng hoàn toàn."
                }
            ],
            commonMistakes: "Lỗi rất hay gặp do dịch word-by-word từ tiếng Việt: Đặt thời gian ở cuối câu (VD SAI: 我去医院明天 ❌ -> ĐÚNG: 我明天去医院 ✅).",
            compareWith: {
                note: "Nhớ nguyên tắc: Nếu câu có cả Thời gian và Địa điểm, thứ tự luôn là: Thời gian -> Địa điểm -> Hành động.",
                targetTitle: "Giới từ '在' chỉ địa điểm" 
            },
            tips: "Để không bao giờ sai, hãy tập thói quen luôn đặt từ chỉ thời gian ở NGAY SAU chủ ngữ: Ai đó -> Khi nào -> Ở đâu -> Làm gì.",
            tags: ["Thời gian", "Trật tự câu", "Cấu trúc"],
            exercises: [
                {
                    question: "Sắp xếp các từ: 买书 / 明天下午 / 我 / 去商店",
                    options: [
                        "我买书去商店明天下午。",
                        "我明天下午去商店买书。",
                        "明天下午去商店我买书。",
                        "去商店买书我明天下午。"
                    ],
                    correctAnswer: 1,
                    explanation: "Trật tự chuẩn: Chủ ngữ (我) + Thời gian (明天下午) + Địa điểm (去商店) + Hành động (买书)."
                },
                {
                    question: "Câu nào dưới đây dịch ĐÚNG câu: 'Năm sau anh ấy kết hôn'?",
                    options: [
                        "他结婚明年。",
                        "结婚他明年。",
                        "他明年结婚。",
                        "结婚明年他。"
                    ],
                    correctAnswer: 2,
                    explanation: "Từ chỉ thời gian '明年' (năm sau) phải đứng trước động từ '结婚' (kết hôn)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 15 ---
        {
            id: "hsk1_g16",
            title: "Câu liên động với '去' (Đi đâu làm gì)",
            structure: "Chủ ngữ + 去 + Nơi chốn + Động từ (Mục đích)",
            pinyinStructure: "S + qù + Place + V (Purpose)",
            desc: "Là dạng câu có hai động từ xảy ra liên tiếp theo một trình tự logic. Động từ thứ nhất thường là 去 (đi) báo hiệu việc di chuyển đến một nơi nào đó, và động từ thứ hai nêu rõ MỤC ĐÍCH của việc di chuyển ấy.",
            examples: [
                {
                    zh: "我们去饭店吃饭。",
                    py: "Wǒmen qù fàndiàn chī fàn.",
                    vi: "Chúng tôi đi nhà hàng ăn cơm.",
                    note: "去 (đi) đến nhà hàng (饭店) để làm gì? Để ăn cơm (吃饭)."
                },
                {
                    zh: "他去中国学习汉语。",
                    py: "Tā qù Zhōngguó xuéxí Hànyǔ.",
                    vi: "Anh ấy đi Trung Quốc học tiếng Trung."
                }
            ],
            commonMistakes: "Đảo ngược trật tự hành động (VD SAI: 我吃饭去饭店 ❌ -> ĐÚNG: 我去饭店吃饭 ✅).",
            tips: "Luôn bám sát trình tự logic của sự việc trong thực tế: Bước 1 là phải 'Đi đến địa điểm' -> Bước 2 mới 'Thực hiện hành động'. Cứ theo trình tự đó mà sắp xếp câu.",
            tags: ["Động từ", "Câu liên động", "Cấu trúc"],
            exercises: [
                {
                    question: "Chọn câu viết đúng ngữ pháp:",
                    options: [
                        "我买菜去市场。",
                        "我去买菜市场。",
                        "我去市场买菜。",
                        "去买菜我市场。"
                    ],
                    correctAnswer: 2,
                    explanation: "Trình tự đúng: Chủ ngữ (我) + 去 + Địa điểm (市场 - chợ) + Hành động mục đích (买菜 - mua thức ăn)."
                },
                {
                    question: "Dịch: 'Bạn đi đâu mua sách?' sang tiếng Trung:",
                    options: [
                        "你买书去哪儿？",
                        "你去哪儿买书？",
                        "哪儿去你买书？",
                        "去哪儿买书你？"
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc Đi đâu + Làm gì: 去 + Nơi chốn hỏi (哪儿) + Hành động (买书)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 16 ---
        {
            id: "hsk1_g17",
            title: "Đại từ nghi vấn '怎么' (Làm thế nào / Bằng cách nào)",
            structure: "怎么 + Động từ",
            pinyinStructure: "zěnme + Verb",
            desc: "Dùng để hỏi về cách thức, phương pháp thực hiện một hành động nào đó. Nó luôn phải đứng TRƯỚC động từ.",
            examples: [
                {
                    zh: "请问，去火车站怎么走？",
                    py: "Qǐngwèn, qù huǒchēzhàn zěnme zǒu?",
                    vi: "Xin hỏi, đi đến ga tàu hỏa đi như thế nào?",
                    note: "Hỏi đường đi (đi theo hướng nào)."
                },
                {
                    zh: "这个汉字怎么读？",
                    py: "Zhège Hànzì zěnme dú?",
                    vi: "Chữ Hán này đọc như thế nào?"
                }
            ],
            commonMistakes: "Người Việt hay đặt từ để hỏi ở cuối câu do thói quen dịch word-by-word (VD SAI: 读怎么？ ❌ -> ĐÚNG: 怎么读？ ✅).",
            compareWith: {
                note: "'怎么' dùng để hỏi về cách thức của hành động, còn '怎么样' (học ở bài sau) dùng để hỏi về tính chất, tình trạng của sự vật/sự việc.",
                targetTitle: "Đại từ nghi vấn '怎么样' (Ra sao / Như thế nào)" 
            },
            tips: "Khi đi mua sắm, để hỏi 'Bán thế nào?' (ý nói giá cả), người ta thường dùng '怎么卖' (zěnme mài) thay vì hỏi thẳng giá tiền.",
            tags: ["Đại từ", "Câu hỏi", "Cách thức"],
            exercises: [
                {
                    question: "Sắp xếp thành câu đúng: 写 / 怎么 / 这个 / 字 / ？",
                    options: [
                        "怎么这个字写？",
                        "写怎么这个字？",
                        "这个字写怎么？",
                        "这个字怎么写？"
                    ],
                    correctAnswer: 3,
                    explanation: "Chủ đề (这个字) + 怎么 + Động từ (写)."
                },
                {
                    question: "Điền từ thích hợp: 你明天 ___ 去北京？ (Ngày mai bạn đi Bắc Kinh bằng phương tiện gì?)",
                    options: ["什么", "怎么", "哪儿", "谁"],
                    correctAnswer: 1,
                    explanation: "Hỏi về phương tiện / cách thức di chuyển, bắt buộc dùng '怎么' đứng trước động từ '去'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 17 ---
        {
            id: "hsk1_g18",
            title: "Đại từ nghi vấn '怎么样' (Ra sao / Như thế nào)",
            structure: "Chủ ngữ / Sự việc + 怎么样？",
            pinyinStructure: "Subject / Situation + zěnmeyàng?",
            desc: "Dùng để hỏi thăm về tình hình, trạng thái của người/vật, hoặc dùng ở cuối câu để thăm dò ý kiến của người khác (Thấy thế nào? Được không?).",
            examples: [
                {
                    zh: "今天天气怎么样？",
                    py: "Jīntiān tiānqì zěnmeyàng?",
                    vi: "Thời tiết hôm nay thế nào?",
                    note: "Hỏi về tình trạng, tính chất (Thời tiết)."
                },
                {
                    zh: "我们去看电影，怎么样？",
                    py: "Wǒmen qù kàn diànyǐng, zěnmeyàng?",
                    vi: "Chúng ta đi xem phim, được không (thấy thế nào)?",
                    note: "Đưa ra gợi ý và hỏi ý kiến người nghe."
                }
            ],
            commonMistakes: "Sử dụng '怎么样' trước động từ để hỏi cách thức (VD SAI: 怎么样做？ ❌ -> ĐÚNG: 怎么做？ ✅). Nhớ rằng '怎么样' thường đứng một mình ở cuối câu làm vị ngữ.",
            tags: ["Đại từ", "Câu hỏi", "Ý kiến", "Tính chất"],
            exercises: [
                {
                    question: "Câu nào dưới đây dùng sai '怎么' hoặc '怎么样'?",
                    options: [
                        "这本小说怎么样？",
                        "你身体怎么样？",
                        "我们去喝茶，怎么？",
                        "这个菜怎么做？"
                    ],
                    correctAnswer: 2,
                    explanation: "Hỏi ý kiến ở cuối câu phải dùng '怎么样' (Được không/Thế nào). Không được dùng rút gọn thành '怎么' ở trường hợp này."
                },
                {
                    question: "Để hỏi thăm sức khỏe của bạn bè: 'Dạo này sức khỏe cậu thế nào?', bạn sẽ nói:",
                    options: [
                        "你身体什么？",
                        "你怎么身体？",
                        "身体你的怎么样？",
                        "你身体怎么样？"
                    ],
                    correctAnswer: 3,
                    explanation: "Chủ ngữ (你身体 - Sức khỏe của bạn) + 怎么样 (Thế nào)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 18 ---
        {
            id: "hsk1_g19",
            title: "Động từ năng nguyện '想' (Muốn / Nhớ / Nghĩ)",
            structure: "Chủ ngữ + 想 + Động từ + (Tân ngữ)",
            pinyinStructure: "S + xiǎng + V + (O)",
            desc: "Biểu thị một mong muốn, dự định chủ quan của người nói (muốn làm gì đó). Ngoài ra, nếu theo sau không phải là động từ mà là danh từ/đại từ, '想' mang nghĩa là 'Nhớ' hoặc 'Nghĩ'.",
            examples: [
                {
                    zh: "我想去中国。",
                    py: "Wǒ xiǎng qù Zhōngguó.",
                    vi: "Tôi muốn đi Trung Quốc.",
                    note: "想 + Động từ: Biểu thị mong muốn."
                },
                {
                    zh: "我很想妈妈。",
                    py: "Wǒ hěn xiǎng māma.",
                    vi: "Tôi rất nhớ mẹ.",
                    note: "想 + Danh từ (chỉ người): Mang nghĩa là nhớ nhung."
                },
                {
                    zh: "我不想吃苹果。",
                    py: "Wǒ bù xiǎng chī píngguǒ.",
                    vi: "Tôi không muốn ăn táo.",
                    note: "Phủ định của 想 là 不想."
                }
            ],
            commonMistakes: "Quên dùng '不' để phủ định. (VD SAI: 我没想去 ❌ -> ĐÚNG: 我不想去 ✅ - vì mong muốn là trạng thái ở hiện tại/tương lai).",
            compareWith: {
                note: "'想' (Muốn) ở HSK 1 thường biểu thị ý muốn chủ quan, có thể thực hiện hoặc không. Sau này bạn sẽ học '要' (Phải/Muốn) mang sắc thái quyết tâm và bắt buộc cao hơn.",
                targetTitle: "Động từ năng nguyện '会' (Biết)" 
            },
            tags: ["Động từ năng nguyện", "Mong muốn"],
            exercises: [
                {
                    question: "Câu 'Tôi muốn mua một cái máy tính' dịch sang tiếng Trung là:",
                    options: [
                        "我想买一个电脑。",
                        "买一个电脑我想。",
                        "我买想一个电脑。",
                        "我想买一电脑。"
                    ],
                    correctAnswer: 0,
                    explanation: "Chủ ngữ (我) + 想 + Động từ (买) + Cụm Số-Lượng-Danh (一个电脑)."
                },
                {
                    question: "Khi bạn nói '我想你', câu này có nghĩa là gì?",
                    options: [
                        "Tôi muốn bạn.",
                        "Tôi nhớ bạn.",
                        "Tôi biết bạn.",
                        "Tôi nghĩ giống bạn."
                    ],
                    correctAnswer: 1,
                    explanation: "Khi 想 đi trực tiếp với đại từ/danh từ chỉ người, nó mang ý nghĩa là 'Nhớ nhung'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 19 ---
        {
            id: "hsk1_g20",
            title: "Trật tự diễn đạt Ngày - Tháng - Năm",
            structure: "Năm (年) + Tháng (月) + Ngày (日 / 号)",
            pinyinStructure: "Year + nián + Month + yuè + Day + rì / hào",
            desc: "Khác HOÀN TOÀN với tiếng Việt, người Trung Quốc có thói quen tư duy từ cái vĩ mô (lớn) đến cái vi mô (nhỏ). Vì vậy, đơn vị thời gian LỚN NHẤT phải đứng TRƯỚC: Năm -> Tháng -> Ngày -> Giờ -> Phút.",
            examples: [
                {
                    zh: "2024年5月10号",
                    py: "èrlíngèrsì nián wǔ yuè shí hào",
                    vi: "Ngày 10 tháng 5 năm 2024",
                    note: "Đọc số năm: Đọc từng chữ số một (2-0-2-4), không đọc là hai nghìn không trăm hai mươi tư."
                },
                {
                    zh: "今天是八月一号。",
                    py: "Jīntiān shì bā yuè yī hào.",
                    vi: "Hôm nay là ngày 1 tháng 8.",
                    note: "号 (hào) thường dùng trong văn nói, 日 (rì) thường dùng trong văn viết."
                }
            ],
            commonMistakes: "Dịch theo thói quen tiếng mẹ đẻ: Ngày -> Tháng -> Năm (VD SAI: 10号5月2024年 ❌ -> ĐÚNG: 2024年5月10号 ✅).",
            tips: "Ghi nhớ thần chú: 'Lớn trước, Nhỏ sau'. Tư duy này áp dụng cho mọi thứ trong tiếng Trung: Thời gian, Địa chỉ nhà, Tên người (Họ đứng trước Tên).",
            tags: ["Thời gian", "Ngày tháng", "Quy tắc tư duy"],
            exercises: [
                {
                    question: "Cách nói 'Ngày 25 tháng 12 năm 2023' nào dưới đây là ĐÚNG?",
                    options: [
                        "25号12月2023年",
                        "2023年12月25号",
                        "12月25号2023年",
                        "2023年25号12月"
                    ],
                    correctAnswer: 1,
                    explanation: "Quy tắc Lớn đến Nhỏ: Năm (2023年) -> Tháng (12月) -> Ngày (25号)."
                },
                {
                    question: "Khi đọc số năm '1998年', ta sẽ đọc thế nào?",
                    options: [
                        "yī qiān jiǔ bǎi jiǔ shí bā nián (Một ngàn chín trăm chín mươi tám)",
                        "yī jiǔ jiǔ bā nián (Một chín chín tám)",
                        "yī jiǔ bā jiǔ nián",
                        "yī qiān bā nián"
                    ],
                    correctAnswer: 1,
                    explanation: "Cách đọc năm trong tiếng Trung là đọc rời TỪNG CHỮ SỐ (1-9-9-8)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 20 ---
        {
            id: "hsk1_g21",
            title: "Liên từ '和' (Và)",
            structure: "Danh từ / Đại từ 1 + 和 + Danh từ / Đại từ 2",
            pinyinStructure: "N/Pro 1 + hé + N/Pro 2",
            desc: "Dùng để nối các từ có cùng từ loại (thường là Danh từ hoặc Đại từ) có vai trò bình đẳng nhau trong câu.",
            examples: [
                {
                    zh: "我和你",
                    py: "Wǒ hé nǐ",
                    vi: "Tôi và bạn"
                },
                {
                    zh: "爸爸和妈妈都在家。",
                    py: "Bàba hé māma dōu zài jiā.",
                    vi: "Bố và mẹ đều ở nhà.",
                    note: "Nối 2 danh từ chỉ người."
                }
            ],
            commonMistakes: "Người học rất hay dùng '和' để nối hai MỆNH ĐỀ (câu) hoặc hai ĐỘNG TỪ, vì dịch từ chữ 'and' hoặc 'và'. (VD SAI: 我吃饭和看书 ❌ - Tôi ăn cơm và đọc sách). Tiếng Trung tuyệt đối KHÔNG dùng '和' để nối các vế câu hoặc hành động dài.",
            tips: "Nếu có 3 danh từ trở lên, chỉ dùng chữ '和' ở trước danh từ cuối cùng (VD: 我、爸爸和妈妈). Các danh từ phía trước dùng dấu phẩy (hoặc dấu chấm tranh 、).",
            tags: ["Liên từ", "Kết nối"],
            exercises: [
                {
                    question: "Câu nào dưới đây dùng SAI chữ '和'?",
                    options: [
                        "苹果和水",
                        "老师和学生",
                        "我去商店和买苹果",
                        "我和他"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C dùng '和' để nối hai hành động 'đi cửa hàng' (去商店) và 'mua táo' (买苹果). Trong tiếng Trung, để nối 2 hành động liên tiếp, ta để nguyên hoặc dùng các cấu trúc câu liên động chứ không dùng '和'."
                },
                {
                    question: "Chọn câu viết đúng ngữ pháp:",
                    options: [
                        "我有三个苹果和一个杯子。",
                        "他很高和很漂亮。",
                        "昨天和下雨了。",
                        "你是中国人和我也是中国人。"
                    ],
                    correctAnswer: 0,
                    explanation: "Câu A nối hai cụm danh từ (ba quả táo VÀ một cái ly), dùng 和 là hoàn toàn chính xác."
                }
            ]
        },
        // --- BÀI MỚI SỐ 21 ---
        {
            id: "hsk1_g22",
            title: "Trợ từ ngữ khí '呢' (Thế còn... / Ở đâu)",
            structure: "Đại từ / Danh từ + 呢？",
            pinyinStructure: "Pronoun / Noun + ne?",
            desc: "Trợ từ '呢' khi đặt ở cuối câu hoặc đi trực tiếp sau một danh từ/đại từ có 2 cách dùng chính:\n1. Hỏi ngược lại: Mang nghĩa 'Thế còn... thì sao?' (tránh lặp lại câu hỏi trước đó).\n2. Hỏi vị trí: Mang nghĩa '... đâu rồi?' (dùng để tìm kiếm người hoặc vật).",
            examples: [
                {
                    zh: "我很好，你呢？",
                    py: "Wǒ hěn hǎo, nǐ ne?",
                    vi: "Tôi rất khỏe, còn bạn thì sao?",
                    note: "Hỏi ngược lại ý 'Sức khỏe của bạn thế nào?'."
                },
                {
                    zh: "我的手机呢？",
                    py: "Wǒ de shǒujī ne?",
                    vi: "Điện thoại của tôi đâu rồi?",
                    note: "Tương đương với câu hỏi '我的手机在哪儿？' (Điện thoại của tôi ở đâu?)."
                }
            ],
            commonMistakes: "Dùng '呢' thay cho '吗' trong câu hỏi Yes/No bình thường. (VD SAI: 你是学生呢？ ❌ -> ĐÚNG: 你是学生吗？ ✅).",
            tips: "Khi lười nói một câu dài để hỏi ai đó đang ở đâu, bạn chỉ cần gọi tên đồ vật/người đó rồi thêm chữ '呢'. Rất tiện lợi và tự nhiên!",
            tags: ["Trợ từ", "Câu hỏi", "Ngữ khí"],
            exercises: [
                {
                    question: "Câu '他不在家，他去哪儿了呢？' (Anh ấy không ở nhà, anh ấy đi đâu rồi nhỉ?) thể hiện chức năng gì của '呢'?",
                    options: [
                        "Hỏi ngược lại (Còn anh ấy thì sao?).",
                        "Hỏi vị trí của anh ấy.",
                        "Tạo sự mềm mại, băn khoăn cho câu hỏi.",
                        "Biểu thị sự khẳng định."
                    ],
                    correctAnswer: 2,
                    explanation: "Trong câu đã có sẵn từ để hỏi '哪儿', chữ '呢' ở cuối lúc này chỉ làm trợ từ ngữ khí giúp câu bớt cộc lốc và mang sắc thái băn khoăn thắc mắc."
                },
                {
                    question: "A: 你叫什么名字？(Bạn tên là gì?) / B: 我叫李月，___ ？(Tôi tên là Lý Nguyệt, ...?)",
                    options: [
                        "你什么？",
                        "你在哪儿？",
                        "你是谁？",
                        "你呢？"
                    ],
                    correctAnswer: 3,
                    explanation: "Để hỏi ngược lại thông tin giống y hệt câu hỏi trước đó (Còn bạn tên là gì?), ta dùng '你呢？' (Còn bạn thì sao?)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 22 ---
        {
            id: "hsk1_g23",
            title: "Phó từ '都' (Đều / Tất cả)",
            structure: "Chủ ngữ (Số nhiều) + 都 + Động từ / Tính từ",
            pinyinStructure: "S (Plural) + dōu + V / Adj",
            desc: "Dùng để nhấn mạnh sự bao quát, tổng thể, chỉ ra rằng tất cả mọi người hoặc mọi vật được nhắc đến đều có chung một đặc điểm hoặc hành động. Chủ ngữ đi kèm BẮT BUỘC phải là số nhiều.",
            examples: [
                {
                    zh: "我们都是中国人。",
                    py: "Wǒmen dōu shì Zhōngguó rén.",
                    vi: "Chúng tôi ĐỀU là người Trung Quốc."
                },
                {
                    zh: "昨天和今天都很冷。",
                    py: "Zuótiān hé jīntiān dōu hěn lěng.",
                    vi: "Hôm qua và hôm nay đều rất lạnh.",
                    note: "Hai ngày trở lên tính là số nhiều."
                },
                {
                    zh: "他们都不去。",
                    py: "Tāmen dōu bú qù.",
                    vi: "Bọn họ đều không đi.",
                    note: "Phủ định thì đặt 不/没 ở SAU chữ 都."
                }
            ],
            commonMistakes: "Đặt '都' sai vị trí, đưa nó lên trước Chủ ngữ (VD SAI: 都我们是学生 ❌ -> ĐÚNG: 我们都是学生 ✅). Phó từ luôn phải đứng SAU chủ ngữ và TRƯỚC động/tính từ.",
            compareWith: {
                note: "Chú ý phân biệt '都不' (đều không - phủ định toàn bộ) và '不都' (không phải đều - phủ định một phần). VD: 不都是学生 (không phải tất cả đều là học sinh, có người là giáo viên).",
                targetTitle: "Phân biệt phủ định '不' và '没'" 
            },
            tags: ["Phó từ", "Phạm vi", "Cấu trúc"],
            exercises: [
                {
                    question: "Sắp xếp câu: 都 / 喜欢 / 我们 / 喝茶",
                    options: [
                        "我们都喜欢喝茶。",
                        "我们喜欢都喝茶。",
                        "都我们喜欢喝茶。",
                        "喜欢我们都喝茶。"
                    ],
                    correctAnswer: 0,
                    explanation: "Trật tự: Chủ ngữ số nhiều (我们) + 都 + Hành động (喜欢喝茶)."
                },
                {
                    question: "Câu nào sai ngữ pháp?",
                    options: [
                        "这些苹果都不好吃。",
                        "我和他都不认识字。",
                        "他都是我的好朋友。",
                        "你们都有电脑吗？"
                    ],
                    correctAnswer: 2,
                    explanation: "Chữ '他' (Anh ấy) là chủ ngữ SỐ ÍT, không thể đi kèm với '都' (Đều). Phải sửa thành 他们 (Họ) hoặc lược bỏ 都."
                }
            ]
        },
        // --- BÀI MỚI SỐ 23 ---
        {
            id: "hsk1_g24",
            title: "Động từ năng nguyện '能' (Có thể)",
            structure: "Chủ ngữ + 能 + Động từ + (Tân ngữ)",
            pinyinStructure: "S + néng + V + (O)",
            desc: "Biểu thị sự 'có thể' nhờ vào: \n1. Năng lực bản thân (có sức mạnh/khả năng làm được).\n2. Điều kiện khách quan cho phép hoặc hoàn cảnh đồng ý.",
            examples: [
                {
                    zh: "我能坐这儿吗？",
                    py: "Wǒ néng zuò zhè'er ma?",
                    vi: "Tôi có thể ngồi ở đây không?",
                    note: "Hỏi sự cho phép của hoàn cảnh/người khác."
                },
                {
                    zh: "今天下雨，我不能去学校。",
                    py: "Jīntiān xià yǔ, wǒ bù néng qù xuéxiào.",
                    vi: "Hôm nay trời mưa, tôi không thể đi học.",
                    note: "Điều kiện khách quan (mưa) không cho phép."
                }
            ],
            commonMistakes: "Sử dụng lẫn lộn giữa '会' (Biết - do học tập mà có) và '能' (Có thể - do điều kiện cho phép). VD: Bạn biết bơi (你会游泳), nhưng hôm nay bạn ốm nên không thể đi bơi (你不能去游泳).",
            compareWith: {
                note: "So sánh: '我会说汉语' = Tôi biết nói tiếng Trung (kỹ năng). '我能说汉语' = Tôi có thể nói tiếng Trung (VD: trong cuộc họp này họ cho phép dùng tiếng Trung).",
                targetTitle: "Động từ năng nguyện '会' (Biết)" 
            },
            tags: ["Động từ năng nguyện", "Khả năng"],
            exercises: [
                {
                    question: "Điền từ: 明天上午我有工作，___ 跟你去买东西。(Sáng mai tôi có công việc, KHÔNG THỂ đi mua sắm với bạn được).",
                    options: ["不会", "不想", "不能", "不是"],
                    correctAnswer: 2,
                    explanation: "Vì bị kẹt lịch làm việc (điều kiện khách quan không cho phép), nên dùng '不能' (không thể)."
                },
                {
                    question: "Khi bạn vào nhà hàng và muốn xin phép: 'Tôi có thể xem thực đơn (菜单 - càidān) được không?', bạn nói:",
                    options: [
                        "我会看菜单吗？",
                        "我能看菜单吗？",
                        "我想看菜单吗？",
                        "我是看菜单吗？"
                    ],
                    correctAnswer: 1,
                    explanation: "Hỏi sự cho phép, xin phép làm gì đó, ta dùng cấu trúc '能...吗？' (Có thể... không?)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 24 ---
        {
            id: "hsk1_g25",
            title: "Trợ từ '了' (Sự thay đổi / Đã xảy ra)",
            structure: "Cuối câu: ... + 了 / Sau động từ: V + 了 + O",
            pinyinStructure: "... + le / V + le + O",
            desc: "Trợ từ '了' (le) có cách dùng vô cùng phong phú, nhưng ở mức độ HSK 1, ta tập trung vào 2 ý nghĩa:\n1. Báo hiệu một sự thay đổi trạng thái (Trời mưa 'rồi', Tôi 20 tuổi 'rồi'). Đặt ở cuối câu.\n2. Biểu thị hành động đã xảy ra và hoàn thành (Tôi 'đã' ăn cơm). Thường đặt sau động từ.",
            examples: [
                {
                    zh: "下雨了。",
                    py: "Xià yǔ le.",
                    vi: "Trời mưa rồi.",
                    note: "Sự thay đổi: Trước đó không mưa, bây giờ bắt đầu mưa."
                },
                {
                    zh: "我买了一本书。",
                    py: "Wǒ mǎi le yì běn shū.",
                    vi: "Tôi đã mua một cuốn sách.",
                    note: "Hành động (mua) đã hoàn tất."
                },
                {
                    zh: "我不去医院了。",
                    py: "Wǒ bú qù yīyuàn le.",
                    vi: "Tôi không đi bệnh viện nữa.",
                    note: "Thay đổi ý định (lúc đầu định đi, giờ không đi 'nữa')."
                }
            ],
            commonMistakes: "Người Việt thường mặc định chữ '了' dịch là 'rồi', và mang nó nhét vào mọi chỗ có chữ 'rồi' trong tiếng Việt. Nhưng hãy cẩn thận, '了' không mang thì quá khứ cho mọi câu, nó chủ yếu báo hiệu tính 'hoàn thành' hoặc 'thay đổi'.",
            compareWith: {
                note: "Trong câu phủ định hành động ở quá khứ, ta BẮT BUỘC dùng '没' (méi) và TUYỆT ĐỐI BỎ chữ '了'. VD: Tôi chưa ăn cơm -> 我没吃饭 (Đúng) / 我没吃饭了 (SAI).",
                targetTitle: "Phân biệt phủ định '不' và '没'" 
            },
            tags: ["Trợ từ", "Hoàn thành", "Thay đổi"],
            exercises: [
                {
                    question: "Câu '他今年五十岁了' mang ý nghĩa gì?",
                    options: [
                        "Anh ấy đã từng 50 tuổi.",
                        "Anh ấy năm nay 50 tuổi rồi.",
                        "Anh ấy không muốn tuổi 50.",
                        "Năm nay anh ấy muốn 50 tuổi."
                    ],
                    correctAnswer: 1,
                    explanation: "Chữ '了' ở cuối câu mang ý nghĩa xác nhận một trạng thái mới (Năm nay đã đạt đến mốc 50 tuổi)."
                },
                {
                    question: "Đâu là câu phủ định ĐÚNG của '昨天他去商店了' (Hôm qua anh ấy đã đi cửa hàng)?",
                    options: [
                        "昨天他不去商店了。",
                        "昨天他没去商店了。",
                        "昨天他不去商店。",
                        "昨天他没去商店。"
                    ],
                    correctAnswer: 3,
                    explanation: "Khi phủ định sự việc trong quá khứ, dùng 没 và bắt buộc phải xóa bỏ chữ 了."
                }
            ]
        },
        // --- BÀI MỚI SỐ 25 ---
        {
            id: "hsk1_g26",
            title: "Cách diễn đạt Giờ - Phút",
            structure: "Số + 点 (Giờ) + Số + 分 (Phút)",
            pinyinStructure: "Number + diǎn + Number + fēn",
            desc: "Dùng để biểu đạt thời gian trong ngày. '点' (diǎn) mang nghĩa là 'giờ', và '分' (fēn) mang nghĩa là 'phút'.",
            examples: [
                {
                    zh: "现在是八点。",
                    py: "Xiànzài shì bā diǎn.",
                    vi: "Bây giờ là 8 giờ."
                },
                {
                    zh: "九点二十分",
                    py: "Jiǔ diǎn èrshí fēn",
                    vi: "9 giờ 20 phút."
                },
                {
                    zh: "两点半",
                    py: "Liǎng diǎn bàn",
                    vi: "2 giờ rưỡi.",
                    note: "半 (bàn) nghĩa là 'rưỡi' (30 phút). Đi với 2 giờ bắt buộc dùng 两 (liǎng), không dùng 二."
                }
            ],
            commonMistakes: "Dùng 二 (èr) thay vì 两 (liǎng) khi nói 2 giờ. (VD SAI: 二点 ❌ -> ĐÚNG: 两点 ✅). Chú ý: 2 giờ là 两点, nhưng 2 phút hay 20 phút thì vẫn dùng 二 (èr).",
            compareWith: {
                note: "Nhớ kết hợp các buổi trong ngày đặt TRƯỚC giờ để rõ nghĩa (VD: Sáng 8 giờ -> 上午八点).",
                targetTitle: "Trật tự diễn đạt Ngày - Tháng - Năm" 
            },
            tips: "Khi số phút nhỏ hơn 10 (từ 1 đến 9), người Trung Quốc thường thêm chữ '零' (líng - không) vào trước số phút. VD: 8h05 -> 八点零五分 (bā diǎn líng wǔ fēn).",
            tags: ["Thời gian", "Giờ giấc", "Số đếm"],
            exercises: [
                {
                    question: "Cách nói '2 giờ 15 phút' nào sau đây là ĐÚNG?",
                    options: [
                        "二点十五分",
                        "两点十五分",
                        "二点一五分",
                        "两点一五分"
                    ],
                    correctAnswer: 1,
                    explanation: "2 giờ bắt buộc dùng 两 (liǎng). 15 phút đọc bình thường là 十五 (mười lăm)."
                },
                {
                    question: "Dịch: 'Bây giờ là 10 rưỡi sáng'.",
                    options: [
                        "十点半上午",
                        "上午半十点",
                        "十点上午半",
                        "上午十点半"
                    ],
                    correctAnswer: 3,
                    explanation: "Quy tắc Lớn đến Nhỏ: Buổi sáng (上午) to hơn -> Giờ (十点半) nhỏ hơn."
                }
            ]
        },
  // --- BÀI MỚI SỐ 26 ---
        {
            id: "hsk1_g27",
            title: "Hỏi tuổi tác với '多大' và '几岁'",
            structure: "Chủ语 + 多大 (了)？ / 几岁 (了)？",
            pinyinStructure: "S + duō dà (le)? / jǐ suì (le)?",
            desc: "Để hỏi tuổi trong tiếng Trung, có 2 cách phổ biến phụ thuộc vào đối tượng được hỏi:\n1. 几岁 (jǐ suì - mấy tuổi): Dành cho trẻ em (thường dưới 10 tuổi).\n2. 多大 (duō dà - bao lớn): Dành cho người lớn hoặc người có tuổi tác xấp xỉ người hỏi.",
            examples: [
                {
                    zh: "你女儿今年几岁了？",
                    py: "Nǐ nǚ'ér jīnnián jǐ suì le?",
                    vi: "Con gái bạn năm nay mấy tuổi rồi?",
                    note: "Hỏi trẻ em dưới 10 tuổi."
                },
                {
                    zh: "你今年多大了？",
                    py: "Nǐ jīnnián duō dà le?",
                    vi: "Năm nay bạn bao nhiêu tuổi rồi?",
                    note: "Hỏi người lớn, bạn bè."
                }
            ],
            commonMistakes: "Người mới học thường lắp ráp từ chữ 'bao nhiêu' (多少) và 'tuổi' (岁) thành '多少岁' (duōshao suì). Mặc dù người bản xứ vẫn hiểu, nhưng cách nói chuẩn và tự nhiên nhất phải là '多大'.",
            tips: "Khi hỏi tuổi người già (các bậc trưởng bối) để thể hiện sự tôn trọng, người ta thường dùng: 您多大年纪了？ (Nín duō dà niánjì le?).",
            tags: ["Câu hỏi", "Tuổi tác", "Giao tiếp"],
            exercises: [
                {
                    question: "Để hỏi tuổi một đứa bé khoảng 5 tuổi, bạn dùng câu nào?",
                    options: [
                        "你多少岁？",
                        "你多大？",
                        "你几岁？",
                        "你多岁？"
                    ],
                    correctAnswer: 2,
                    explanation: "Dùng '几岁' để hỏi tuổi trẻ nhỏ (dưới 10 tuổi)."
                },
                {
                    question: "Điền từ: 老师，您今年 ___ 了？ (Thưa thầy, năm nay thầy bao nhiêu tuổi rồi?)",
                    options: ["多大", "几岁", "多少", "几个"],
                    correctAnswer: 0,
                    explanation: "Hỏi tuổi người lớn bắt buộc dùng '多大'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 27 ---
        {
            id: "hsk1_g28",
            title: "Câu cầu khiến với '请' (Xin, mời)",
            structure: "请 + Động từ + (Tân ngữ)",
            pinyinStructure: "Qǐng + V + (O)",
            desc: "Dùng để yêu cầu, đề nghị hoặc mời ai đó làm gì một cách vô cùng lịch sự. '请' luôn luôn đứng ở vị trí ĐẦU CÂU hoặc ngay sau cụm xưng hô.",
            examples: [
                {
                    zh: "请坐。",
                    py: "Qǐng zuò.",
                    vi: "Mời ngồi."
                },
                {
                    zh: "请喝茶。",
                    py: "Qǐng hē chá.",
                    vi: "Mời uống trà."
                },
                {
                    zh: "请问，医院在哪儿？",
                    py: "Qǐngwèn, yīyuàn zài nǎ'er?",
                    vi: "Xin hỏi, bệnh viện ở đâu?",
                    note: "请问 (Xin hỏi) là cụm từ cửa miệng cực kỳ phổ biến trước khi muốn nhờ vả hay hỏi đường."
                }
            ],
            commonMistakes: "Đặt '请' ở cuối câu giống từ 'please' trong tiếng Anh (VD SAI: 坐请 ❌ -> ĐÚNG: 请坐 ✅).",
            tags: ["Cầu khiến", "Lịch sự", "Giao tiếp"],
            exercises: [
                {
                    question: "Khi bạn muốn lịch sự mời khách vào nhà, bạn sẽ nói: ___ 进 (jìn - vào).",
                    options: ["叫", "想", "能", "请"],
                    correctAnswer: 3,
                    explanation: "Dùng '请' (Mời) đứng trước động từ để thể hiện sự lịch sự: 请进 (Mời vào)."
                },
                {
                    question: "Câu nào dưới đây thể hiện sự hỏi han lịch sự với người lạ?",
                    options: [
                        "我问你...",
                        "请问...",
                        "你问请...",
                        "问请..."
                    ],
                    correctAnswer: 1,
                    explanation: "'请问' (Xin hỏi) là cách mở lời chuẩn mực khi muốn hỏi đường hoặc hỏi thông tin từ người khác."
                }
            ]
        },
        // --- BÀI MỚI SỐ 28 ---
        {
            id: "hsk1_g29",
            title: "Đại từ nghi vấn '什么时候' (Khi nào)",
            structure: "Chủ语 + 什么时候 + Động từ？ / 什么时候 + Chủ语 + Động từ？",
            pinyinStructure: "S + shénme shíhou + V? / shénme shíhou + S + V?",
            desc: "Dùng để hỏi về thời gian (tương đương với 'When' trong tiếng Anh). Có thể đặt ngay sau Chủ ngữ hoặc đứng ở đầu câu, nhưng luôn phải đứng TRƯỚC Động từ.",
            examples: [
                {
                    zh: "你什么时候去北京？",
                    py: "Nǐ shénme shíhou qù Běijīng?",
                    vi: "Khi nào bạn đi Bắc Kinh?"
                },
                {
                    zh: "爸爸什么时候回家？",
                    py: "Bàba shénme shíhou huí jiā?",
                    vi: "Khi nào bố về nhà?"
                }
            ],
            commonMistakes: "Người học hay đặt '什么时候' ở cuối câu (VD SAI: 你去北京什么时候？ ❌ -> ĐÚNG: 你什么时候去北京？ ✅). Nhớ quy tắc: Trật tự câu hỏi giống hệt câu trả lời.",
            compareWith: {
                note: "Chú ý phân biệt '时候' (shíhou - lúc, khi) chỉ thời gian chung chung và '时间' (shíjiān - thời gian) chỉ khoảng thời gian hoặc khái niệm thời gian vật lý.",
                targetTitle: "Vị trí của Từ chỉ Thời gian" 
            },
            tags: ["Câu hỏi", "Thời gian"],
            exercises: [
                {
                    question: "Dịch: 'Khi nào chúng ta đi xem phim?'",
                    options: [
                        "我们去看看电影什么时候？",
                        "什么时候去电影我们看？",
                        "我们什么时候去看电影？",
                        "我们去什么时候看电影？"
                    ],
                    correctAnswer: 2,
                    explanation: "Chủ ngữ (我们) + Thời gian (什么时候) + Hành động (去看电影)."
                },
                {
                    question: "Trả lời cho câu hỏi '什么时候' (Khi nào) phải là gì?",
                    options: [
                        "在学校 (Ở trường)",
                        "很好 (Rất tốt)",
                        "星期三 (Thứ Tư)",
                        "两个人 (Hai người)"
                    ],
                    correctAnswer: 2,
                    explanation: "'什么时候' hỏi về mốc thời gian, do đó '星期三' (Thứ Tư) là câu trả lời hợp lý nhất."
                }
            ]
        },
        // --- BÀI MỚI SỐ 29 ---
        {
            id: "hsk1_g30",
            title: "Cấu trúc cụm chữ '的' (Lược bỏ danh từ)",
            structure: "Đại từ / Danh từ / Tính từ + 的",
            pinyinStructure: "Pro / Noun / Adj + de",
            desc: "Khi danh từ trung tâm (đứng sau chữ '的') ĐÃ ĐƯỢC NHẮC ĐẾN từ trước, hoặc trong ngữ cảnh cả 2 người đều ngầm hiểu đang nói về cái gì, ta CÓ THỂ LƯỢC BỎ danh từ đó đi. Lúc này, cụm '...的' sẽ đóng vai trò như một danh từ độc lập.",
            examples: [
                {
                    zh: "这本书是我的。",
                    py: "Zhè běn shū shì wǒ de.",
                    vi: "Cuốn sách này là của tôi.",
                    note: "Thay vì nói lặp từ '是我的书' (là sách của tôi), ta chỉ cần nói '是我的' (là CỦA TÔI)."
                },
                {
                    zh: "我喜欢大的，不喜欢小的。",
                    py: "Wǒ xǐhuan dà de, bù xǐhuan xiǎo de.",
                    vi: "Tôi thích cái to, không thích cái nhỏ.",
                    note: "Ngầm hiểu 'cái' ở đây là một đồ vật mà cả 2 người đang cùng nhìn vào/đang mua."
                }
            ],
            commonMistakes: "Cố gắng lặp đi lặp lại danh từ khiến câu nói trở nên cồng kềnh, thiếu tự nhiên. (Ví dụ: 这支笔是我的笔 - Cây bút này là cây bút của tôi -> Hơi dài dòng).",
            compareWith: {
                note: "Hãy liên tưởng đến đại từ sở hữu trong tiếng Anh (mine, yours) hoặc đại từ 'one' (the big one).",
                targetTitle: "Trợ từ kết cấu '的' (Sở hữu / Định ngữ)" 
            },
            tags: ["Sở hữu", "Đại từ", "Giao tiếp"],
            exercises: [
                {
                    question: "Hoàn thiện câu trả lời: A: 这是谁的手机？(Đây là điện thoại của ai?) / B: 这是 ___。 (Đây là của anh ấy).",
                    options: [
                        "他",
                        "他的手机的",
                        "他的",
                        "他手机"
                    ],
                    correctAnswer: 2,
                    explanation: "Chỉ cần dùng đại từ + 的 (他的 - của anh ấy) là đủ để trả lời, không cần lặp lại từ '手机'."
                },
                {
                    question: "Cụm '红的' (hóng de) trong câu '我要红的' (Tôi muốn lấy cái màu đỏ) đóng vai trò gì?",
                    options: [
                        "Động từ",
                        "Danh từ",
                        "Tính từ",
                        "Lượng từ"
                    ],
                    correctAnswer: 1,
                    explanation: "Cụm chữ '的' (Tính từ/Đại từ + 的) được dùng thay thế cho một danh từ (Ví dụ: Cái màu đỏ, Quả màu đỏ...)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 30 ---
        {
            id: "hsk1_g31",
            title: "Phương vị từ cơ bản (Trên, Dưới, Trong, Ngoài)",
            structure: "Danh từ + 上 / 下 / 里 / 前 / 后",
            pinyinStructure: "Noun + shàng / xià / lǐ / qián / hòu",
            desc: "Trong tiếng Trung, để chỉ vị trí của một vật (trên bàn, trong phòng...), từ chỉ phương hướng (Phương vị từ) BẮT BUỘC phải ĐỨNG SAU Danh từ. Trật tự này ngược hoàn toàn với tiếng Việt.",
            examples: [
                {
                    zh: "桌子上",
                    py: "zhuōzi shàng",
                    vi: "Trên bàn",
                    note: "Tiếng Việt: Trên (Phương hướng) + Bàn (Danh từ). Tiếng Trung: 桌子 (Bàn) + 上 (Trên)."
                },
                {
                    zh: "学校里",
                    py: "xuéxiào lǐ",
                    vi: "Trong trường học"
                },
                {
                    zh: "我家前面有一个饭店。",
                    py: "Wǒ jiā qiánmiàn yǒu yí gè fàndiàn.",
                    vi: "Phía trước nhà tôi có một nhà hàng.",
                    note: "前 (trước) có thể kết hợp với 面 (miàn) thành 前面 (phía trước)."
                }
            ],
            commonMistakes: "Dịch trực tiếp từ tiếng Việt sang (VD SAI: 上桌子 ❌, 里房间 ❌ -> ĐÚNG: 桌子上 ✅, 房间里 ✅).",
            compareWith: {
                note: "Nhớ kết hợp phương vị từ này với giới từ '在' để chỉ không gian hoàn chỉnh (在 + Danh từ + Phương vị từ). VD: 在桌子上 (Ở trên bàn).",
                targetTitle: "Giới từ '在' chỉ địa điểm (Ở đâu làm gì)" 
            },
            tips: "Hãy coi cái Bàn / Căn phòng là một cái gốc tọa độ, bạn phải gọi tên cái gốc đó ra trước (桌子), rồi mới trỏ mũi tên chỉ hướng (上 / 下 / 里).",
            tags: ["Địa điểm", "Phương hướng", "Danh từ"],
            exercises: [
                {
                    question: "Dịch: 'Trong ly có nước' sang tiếng Trung:",
                    options: [
                        "里杯子有水。",
                        "杯子里有水。",
                        "有水里杯子。",
                        "有水杯子里。"
                    ],
                    correctAnswer: 1,
                    explanation: "Danh từ (杯子 - ly) + Phương vị từ (里 - trong) tạo thành chủ ngữ địa điểm + 有 + Sự vật tồn tại (水)."
                },
                {
                    question: "Sắp xếp từ: 睡觉 / 小猫 / 在 / 椅子下",
                    options: [
                        "小猫睡觉在椅子下。",
                        "在椅子下小猫睡觉。",
                        "小猫在椅子下睡觉。",
                        "椅子下在小猫睡觉。"
                    ],
                    correctAnswer: 2,
                    explanation: "Chủ ngữ (小猫 - con mèo nhỏ) + Cụm địa điểm (在椅子下 - ở dưới cái ghế) + Động từ (睡觉 - ngủ)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 31 ---
        {
            id: "hsk1_g32",
            title: "Phó từ '也' (Cũng)",
            structure: "Chủ ngữ + 也 + Động từ / Tính từ",
            pinyinStructure: "S + yě + V / Adj",
            desc: "Dùng để biểu thị sự tương đồng, giống nhau về hành động hoặc tính chất với một đối tượng đã được nhắc đến trước đó. '也' BẮT BUỘC phải đứng TRƯỚC động từ hoặc tính từ.",
            examples: [
                {
                    zh: "我是学生，他也是学生。",
                    py: "Wǒ shì xuésheng, tā yě shì xuésheng.",
                    vi: "Tôi là học sinh, anh ấy CŨNG là học sinh."
                },
                {
                    zh: "我不去，他也不去。",
                    py: "Wǒ bú qù, tā yě bú qù.",
                    vi: "Tôi không đi, anh ấy cũng không đi.",
                    note: "Trong câu phủ định, '也' đứng TRƯỚC '不/没'."
                }
            ],
            commonMistakes: "Đặt '也' ở cuối câu giống tiếng Việt (VD SAI: 我是学生也 ❌ -> ĐÚNG: 我也是学生 ✅).",
            compareWith: {
                note: "Khi câu có cả '也' (cũng) và '都' (đều), thứ tự bắt buộc là: 也 + 都 + Động/Tính từ (Cũng đều...). VD: 我们也都喜欢吃苹果 (Chúng tôi CŨNG ĐỀU thích ăn táo).",
                targetTitle: "Phó từ '都' (Đều / Tất cả)" 
            },
            tags: ["Phó từ", "Sự tương đồng"],
            exercises: [
                {
                    question: "Sắp xếp thành câu đúng: 是 / 也 / 中国人 / 我妈妈。",
                    options: [
                        "我妈妈也是中国人。",
                        "我妈妈是中国人也。",
                        "也是我妈妈中国人。",
                        "我妈妈是也中国人。"
                    ],
                    correctAnswer: 0,
                    explanation: "Trật tự: Chủ ngữ (我妈妈) + Phó từ (也) + Động từ (是) + Tân ngữ (中国人)."
                },
                {
                    question: "Câu nào dưới đây dịch đúng ý: 'Hôm qua không mưa, hôm nay cũng không mưa'?",
                    options: [
                        "昨天没下雨，今天不也下雨。",
                        "昨天没下雨，今天也没下雨。",
                        "昨天不下雨，今天不也下雨。",
                        "昨天没下雨，今天没下雨也。"
                    ],
                    correctAnswer: 1,
                    explanation: "'也' phải đứng trước từ phủ định '没'. Hành động ở quá khứ/đã xảy ra nên dùng '没' thay vì '不'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 32 ---
        {
            id: "hsk1_g33",
            title: "Phó từ mức độ '真' (Thật sự / Quá)",
            structure: "真 + Tính từ",
            pinyinStructure: "zhēn + Adj",
            desc: "Dùng để biểu đạt cảm xúc khen ngợi, ngạc nhiên hoặc than vãn. '真' mang sắc thái cảm xúc cá nhân mạnh mẽ hơn '很' (rất) và thường dùng trong văn nói.",
            examples: [
                {
                    zh: "你真漂亮！",
                    py: "Nǐ zhēn piàoliang!",
                    vi: "Bạn thật đẹp!"
                },
                {
                    zh: "今天天气真冷。",
                    py: "Jīntiān tiānqì zhēn lěng.",
                    vi: "Thời tiết hôm nay thật sự lạnh."
                }
            ],
            commonMistakes: "Dùng '真' trong câu phủ định. (VD SAI: 真不漂亮 ❌ - Rất ít dùng. Thường dùng 不太漂亮 hoặc 很不漂亮).",
            compareWith: {
                note: "'很' mang tính chất miêu tả khách quan, trong khi '真' và '太...了' mang nặng cảm xúc chủ quan của người nói.",
                targetTitle: "Trạng từ chỉ mức độ '很' (Rất)" 
            },
            tips: "Khi thấy một món đồ đẹp hoặc một món ăn ngon, hãy bật ra câu '真好看！' (Thật đẹp/dễ nhìn) hoặc '真好吃！' (Thật ngon) - đây là cách giao tiếp cực kỳ tự nhiên của người bản xứ.",
            tags: ["Phó từ", "Mức độ", "Cảm thán"],
            exercises: [
                {
                    question: "Câu 'Cái máy tính này thật đắt' dịch là:",
                    options: [
                        "这个电脑真贵。",
                        "这电脑贵真。",
                        "这个真电脑贵。",
                        "这个电脑真贵了。"
                    ],
                    correctAnswer: 0,
                    explanation: "Cấu trúc: Chủ đề + 真 + Tính từ (贵 - đắt). Không cần thêm '了' như cấu trúc '太...了'."
                },
                {
                    question: "Đâu KHÔNG phải là một câu cảm thán đúng?",
                    options: [
                        "真好吃！",
                        "你真好！",
                        "今天真下雨！",
                        "这本书真好看！"
                    ],
                    correctAnswer: 2,
                    explanation: "'真' dùng với tính từ. '下雨' (đổ mưa) là động từ, không dùng '真下雨' để cảm thán mức độ."
                }
            ]
        },
        // --- BÀI MỚI SỐ 33 ---
        {
            id: "hsk1_g34",
            title: "Trợ từ ngữ khí '吧' (Nhé / Đi / Nào)",
            structure: "Câu đề nghị / Gợi ý + 吧",
            pinyinStructure: "Suggestion / Request + ba",
            desc: "Đặt ở cuối câu để biểu thị sự thương lượng, đề nghị, rủ rê hoặc thúc giục một cách nhẹ nhàng. Làm cho câu nói bớt mang tính ra lệnh và mềm mại hơn.",
            examples: [
                {
                    zh: "我们去吃饭吧。",
                    py: "Wǒmen qù chī fàn ba.",
                    vi: "Chúng ta đi ăn cơm đi."
                },
                {
                    zh: "给你，喝点水吧。",
                    py: "Gěi nǐ, hē diǎn shuǐ ba.",
                    vi: "Cho bạn này, uống chút nước đi.",
                    note: "Lời khuyên nhủ nhẹ nhàng."
                },
                {
                    zh: "好吧！",
                    py: "Hǎo ba!",
                    vi: "Được thôi! / Ok!",
                    note: "Biểu thị sự đồng ý (đôi khi có chút miễn cưỡng)."
                }
            ],
            commonMistakes: "Dùng '吧' thay cho '吗' trong câu hỏi lấy thông tin. '吧' chỉ dùng trong câu rủ rê, khuyên nhủ, hoặc câu hỏi đoán (VD: Bạn là người Việt Nam nhỉ? - 你是越南人吧？).",
            tags: ["Trợ từ", "Ngữ khí", "Giao tiếp"],
            exercises: [
                {
                    question: "Câu 'Chúng ta về nhà thôi' nói thế nào cho tự nhiên nhất?",
                    options: [
                        "我们回家呢。",
                        "我们回家吗。",
                        "我们回家吧。",
                        "我们回家了。"
                    ],
                    correctAnswer: 2,
                    explanation: "Dùng '吧' ở cuối câu rủ rê (Chúng ta cùng làm gì đó đi/thôi/nào)."
                },
                {
                    question: "Câu '他是你的老师吧？' mang ý nghĩa gì?",
                    options: [
                        "Anh ấy là giáo viên của bạn phải không? (Hỏi chưa biết rõ).",
                        "Anh ấy là giáo viên của bạn nhỉ? (Đoán và chờ xác nhận).",
                        "Anh ấy hãy làm giáo viên của bạn đi.",
                        "Anh ấy không phải giáo viên của bạn."
                    ],
                    correctAnswer: 1,
                    explanation: "Khi dùng '吧' trong câu hỏi, nó thể hiện sự phỏng đoán của người nói (chắc đến 80% rồi nhưng hỏi lại cho chắc chắn)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 34 ---
        {
            id: "hsk1_g35",
            title: "Biểu đạt Tiền tệ (块/元)",
            structure: "Số từ + 块/元 + (Số từ + 毛/角) + (钱)",
            pinyinStructure: "Number + kuài/yuán + (Number + máo/jiǎo) + (qián)",
            desc: "Đơn vị tiền tệ cơ bản của Trung Quốc (Nhân dân tệ). \n- Văn NÓI: 块 (kuài - đồng) và 毛 (máo - hào).\n- Văn VIẾT / Giá niêm yết: 元 (yuán) và 角 (jiǎo).\n(1 块 = 10 毛).",
            examples: [
                {
                    zh: "五块钱",
                    py: "wǔ kuài qián",
                    vi: "5 tệ (đồng)",
                    note: "Chữ '钱' (tiền) ở cuối có thể có hoặc bỏ."
                },
                {
                    zh: "十五块八(毛)",
                    py: "shí wǔ kuài bā (máo)",
                    vi: "15 tệ 8 hào (15.8 tệ)",
                    note: "Khi có cả Đồng và Hào, đơn vị nhỏ (毛) ở cuối thường được lược bỏ trong văn nói."
                }
            ],
            commonMistakes: "Nhầm lẫn giữa văn nói và văn viết. Khi giao tiếp mua bán hàng ngày ở chợ/siêu thị, người ta luôn dùng '块', rất hiếm khi dùng '元' (nghe giống ngôn ngữ truyền hình/ngân hàng).",
            compareWith: {
                note: "Nhớ quy tắc số 2: Khi nói 2 tệ, BẮT BUỘC dùng '两块' (liǎng kuài), không dùng '二块' (èr kuài).",
                targetTitle: "Cụm Số Lượng Từ (Số từ + Lượng từ + Danh từ)" 
            },
            tags: ["Số lượng", "Tiền tệ", "Mua sắm"],
            exercises: [
                {
                    question: "Giá niêm yết trên bảng là '¥ 20.5'. Khi nói với người bán hàng, bạn sẽ đọc giá này thế nào?",
                    options: [
                        "二十元五角",
                        "二零块五",
                        "二十块五",
                        "二十毛五块"
                    ],
                    correctAnswer: 2,
                    explanation: "Văn nói dùng 块. 20 là 二十. Phần lẻ 0.5 tệ tức là 5 hào (五毛), đọc nối lại là 二十块五 (máo được lược bỏ)."
                },
                {
                    question: "Chọn cách nói ĐÚNG cho '2 tệ':",
                    options: [
                        "二块钱",
                        "两块钱",
                        "双块钱",
                        "二元钱"
                    ],
                    correctAnswer: 1,
                    explanation: "Đứng trước lượng từ tiền tệ '块', số 2 luôn phải đọc là 两 (liǎng)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 35 ---
        {
            id: "hsk1_g36",
            title: "Cách đọc Mã số / Số điện thoại (1 = yāo)",
            structure: "Đọc rời từng chữ số. Đặc biệt số 1 đọc là 'yāo'.",
            pinyinStructure: "yāo",
            desc: "Khi đọc chuỗi số dài như số điện thoại, số phòng, số xe buýt, biển số xe... người Trung Quốc sẽ đọc RỜI TỪNG CHỮ SỐ. \nCực kỳ quan trọng: Số 1 (yī) phải được biến âm đọc thành 'yāo' để tránh nhầm lẫn qua điện thoại với số 7 (qī).",
            examples: [
                {
                    zh: "我的电话号码是：138 0011 5214",
                    py: "Wǒ de diànhuà hàomǎ shì: yāo sān bā, líng líng yāo yāo, wǔ èr yāo sì.",
                    vi: "Số điện thoại của tôi là: 13800115214."
                },
                {
                    zh: "我住在 101 房间。",
                    py: "Wǒ zhù zài yāo líng yāo fángjiān.",
                    vi: "Tôi sống ở phòng 101."
                }
            ],
            commonMistakes: "Vẫn đọc số 1 là 'yī' khi đọc số điện thoại. Dù người ta có thể hiểu, nhưng điều này bộc lộ ngay bạn là người mới học tiếng Trung.",
            compareWith: {
                note: "Nhớ rằng quy tắc '1 = yāo' CHỈ áp dụng cho chuỗi mã số (điện thoại, số phòng). KHÔNG áp dụng cho Toán học, Số lượng (1 cái) hay Thời gian (Ngày 1, Tháng 1).",
                targetTitle: "Trật tự diễn đạt Ngày - Tháng - Năm" 
            },
            tips: "Khi đọc số điện thoại dài 11 số của TQ, người ta thường ngắt nhịp theo cụm 3-4-4 (VD: 138 - 0011 - 5214) để dễ nhớ.",
            tags: ["Số đếm", "Giao tiếp", "Quy tắc đặc biệt"],
            exercises: [
                {
                    question: "Số phòng khách sạn của bạn là 114. Bạn sẽ báo số phòng cho lễ tân như thế nào?",
                    options: [
                        "yī bǎi yī shí sì (Một trăm mười bốn)",
                        "yī yī sì",
                        "yāo yāo sì",
                        "yī yāo sì"
                    ],
                    correctAnswer: 2,
                    explanation: "Số phòng là dạng chuỗi mã số. Đọc rời từng số và biến âm tất cả số 1 thành 'yāo'."
                },
                {
                    question: "Trường hợp nào dưới đây KHÔNG đọc số 1 là 'yāo'?",
                    options: [
                        "11月1号 (Ngày 1 tháng 11)",
                        "110 (Số cảnh sát)",
                        "公交车 11 路线 (Xe buýt tuyến số 11)",
                        "电话 159... (SĐT 159...)"
                    ],
                    correctAnswer: 0,
                    explanation: "Thời gian (Ngày, tháng, năm) là số đếm lượng thông thường, vẫn giữ nguyên cách đọc là 'yī'."
                }
            ]
        }
        
],
    2: [
        // --- BÀI MỚI SỐ 1 (HSK 2) ---
        {
            id: "hsk2_g1",
            title: "Trợ từ động thái '着' (Đang / Vẫn đang)",
            structure: "Chủ ngữ + Động từ + 着 + (Tân ngữ)",
            pinyinStructure: "S + V + zhe + (O)",
            desc: "Dùng để biểu thị một trạng thái hoặc hành động đang được duy trì, tiếp diễn. Khác với '正在' nhấn mạnh hành động đang xảy ra, '着' nhấn mạnh TRẠNG THÁI là kết quả của hành động đó vẫn đang tiếp tục.",
            examples: [
                {
                    zh: "门开着。",
                    py: "Mén kāi zhe.",
                    vi: "Cửa đang mở."
                },
                {
                    zh: "她穿着红色的衣服。",
                    py: "Tā chuān zhe hóngsè de yīfu.",
                    vi: "Cô ấy đang mặc chiếc áo màu đỏ."
                }
            ],
            commonMistakes: "Nhầm lẫn giữa '在' (đang làm gì) và '着' (đang duy trì trạng thái). VD: 他在穿衣服 (Đang mặc vào người) vs 他穿着衣服 (Đang mặc sẵn trên người).",
            tags: ["Trợ từ động thái", "Trạng thái", "Tiếp diễn"],
            exercises: [
                {
                    question: "Câu '外面下着雨' (Wàimiàn xià zhe yǔ) có nghĩa là gì?",
                    options: ["Bên ngoài sắp mưa.", "Bên ngoài đã tạnh mưa.", "Bên ngoài đang mưa.", "Bên ngoài không có mưa."],
                    correctAnswer: 2,
                    explanation: "Động từ 下 (rơi/xuống) đi kèm với 着 biểu thị trạng thái mưa vẫn đang tiếp tục diễn ra."
                },
                {
                    question: "Chọn câu viết SAI ngữ pháp:",
                    options: ["他看着我。", "门没开着。", "我不带着钱。", "墙上挂着一幅画。"],
                    correctAnswer: 2,
                    explanation: "Phủ định của cấu trúc 'V + 着' BẮT BUỘC phải dùng '没' (méi). Phải sửa thành: 我没带着钱 (Tôi không mang theo tiền)."
                },
                {
                    question: "Điền từ thích hợp: 老师 ___ 站在教室里。 (Giáo viên đang đứng trong lớp)",
                    options: ["正在", "了", "着", "过"],
                    correctAnswer: 2,
                    explanation: "Trạng thái 'đứng' đang được duy trì, dùng 站着 (zhàn zhe)."
                },
                {
                    question: "Dịch sang tiếng Trung: 'Cửa sổ (窗户) đang mở.'",
                    options: ["窗户开在。", "窗户开着。", "窗户开了。", "窗户开过。"],
                    correctAnswer: 1,
                    explanation: "Trạng thái 'mở' đang duy trì -> 开着."
                },
                {
                    question: "Chức năng của chữ 着 trong câu: '他笑着说' (Anh ấy cười và nói) là gì?",
                    options: ["Chỉ quá khứ.", "Chỉ hành động đang xảy ra đồng thời làm bối cảnh cho hành động khác.", "Chỉ tương lai.", "Chỉ sở hữu."],
                    correctAnswer: 1,
                    explanation: "V1 + 着 + V2 biểu thị hành động 1 (cười) làm trạng thái/phương thức cho hành động 2 (nói)."
                },
                {
                    question: "Đâu là câu hỏi chính phản đúng của '你带着雨伞吗？' (Bạn có mang ô không?)",
                    options: ["你带着不带着雨伞？", "你带不带雨伞？", "你带着没带着雨伞？", "你带着雨伞没有？"],
                    correctAnswer: 3,
                    explanation: "Câu hỏi chính phản của 着 thường dùng '没有' ở cuối câu: V + 着 + (O) + 没有？"
                },
                {
                    question: "Sắp xếp thành câu đúng: 挂着 / 墙上 / 照片 / 一张",
                    options: ["挂着一张照片墙上。", "墙上挂着一张照片。", "墙上照片挂着一张。", "照片挂着一张墙上。"],
                    correctAnswer: 1,
                    explanation: "Cấu trúc tồn tại: Địa điểm (墙上) + V着 (挂着) + Cụm danh từ (一张照片)."
                },
                {
                    question: "Chọn cách nói đúng cho 'Tôi đang cầm (拿) một cuốn sách':",
                    options: ["我拿书了。", "我拿着一本书。", "我拿在书。", "我不拿着书。"],
                    correctAnswer: 1,
                    explanation: "Cầm trên tay và duy trì trạng thái đó dùng '拿着'."
                },
                {
                    question: "Điền từ: 桌子上 ___ 一杯茶。(Trên bàn đang đặt một ly trà - 放: đặt/để)",
                    options: ["放着", "放了", "放在", "放下"],
                    correctAnswer: 0,
                    explanation: "Chỉ sự tồn tại trạng thái đồ vật ở một địa điểm, dùng V + 着 -> 放着."
                },
                {
                    question: "Trong câu '我没带着手机', từ '没' đóng vai trò gì?",
                    options: ["Phủ định sự việc trong tương lai.", "Phủ định một thói quen.", "Phủ định trạng thái đang được duy trì.", "Thay thế cho '不'."],
                    correctAnswer: 2,
                    explanation: "Với cấu trúc V着, bắt buộc dùng 没 để phủ định, mang nghĩa 'không duy trì trạng thái đó'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 2 (HSK 2) ---
        {
            id: "hsk2_g2",
            title: "Câu so sánh hơn với '比' (Hơn)",
            structure: "A + 比 + B + Tính từ + (Số lượng / Mức độ)",
            pinyinStructure: "A + bǐ + B + Adj + (Num / Degree)",
            desc: "Dùng để so sánh sự khác biệt giữa hai đối tượng. Chủ thể A (thường là cái có mức độ cao hơn) sẽ được đặt ở đầu câu.",
            examples: [
                {
                    zh: "哥哥比我高。",
                    py: "Gēge bǐ wǒ gāo.",
                    vi: "Anh trai cao hơn tôi."
                },
                {
                    zh: "今天比昨天冷一点儿。",
                    py: "Jīntiān bǐ zuótiān lěng yìdiǎnr.",
                    vi: "Hôm nay lạnh hơn hôm qua một chút."
                }
            ],
            commonMistakes: "Tuyệt đối KHÔNG ĐƯỢC thêm các phó từ chỉ mức độ (như 很, 非常, 太) vào trước Tính từ trong câu chữ 比. (VD SAI: 哥哥比我很高 ❌ -> ĐÚNG: 哥哥比我高 ✅).",
            tags: ["So sánh", "Tính từ", "Cấu trúc"],
            exercises: [
                {
                    question: "Chọn câu viết ĐÚNG cấu trúc so sánh chữ 比:",
                    options: ["飞机比火车非常快。", "飞机很比火车快。", "飞机比火车快。", "比飞机火车快。"],
                    correctAnswer: 2,
                    explanation: "Không được phép dùng '非常' hay '很' trước tính từ trong câu so sánh."
                },
                {
                    question: "Dịch: 'Tiếng Trung của tôi tốt hơn anh ấy một chút'.",
                    options: ["我的汉语比他一点儿好。", "我的汉语比他好一点儿。", "我的汉语一点儿比他好。", "我的汉语比他好很。"],
                    correctAnswer: 1,
                    explanation: "Từ chỉ mức độ chênh lệch (一点儿) phải được đặt ở SAU CÙNG, ngay sau Tính từ (好)."
                },
                {
                    question: "Để diễn đạt 'Anh trai lớn hơn tôi 3 tuổi', ta nói:",
                    options: ["哥哥比我三大岁。", "哥哥比我大三岁。", "哥哥三岁比我大。", "哥哥比三大岁我。"],
                    correctAnswer: 1,
                    explanation: "Cấu trúc: A (哥哥) + 比 + B (我) + Tính từ (大) + Số lượng (三岁)."
                },
                {
                    question: "Đâu là câu phủ định đúng của '苹果比西瓜贵' (Táo đắt hơn dưa hấu)?",
                    options: ["苹果不比西瓜贵。", "苹果没有西瓜贵。", "Cả hai câu trên đều được dùng nhưng sắc thái khác nhau.", "Cả hai đều sai."],
                    correctAnswer: 2,
                    explanation: "'A不比B' mang nghĩa bác bỏ (A không đắt hơn B đâu). 'A没有B' mang nghĩa so sánh kém (A không đắt bằng B). Cả 2 đều đúng ngữ pháp."
                },
                {
                    question: "Sắp xếp câu: 热 / 昨天 / 今天 / 得多 / 比",
                    options: ["今天比昨天热得多。", "今天热得多比昨天。", "比昨天今天热得多。", "今天比昨天得多热。"],
                    correctAnswer: 0,
                    explanation: "A (今天) + 比 + B (昨天) + Tính từ (热) + Mức độ sâu (得多)."
                },
                {
                    question: "Điền từ: 西瓜 ___ 苹果大。(Dưa hấu to hơn táo)",
                    options: ["比", "和", "没", "都"],
                    correctAnswer: 0,
                    explanation: "Câu so sánh hơn dùng 比."
                },
                {
                    question: "Trong câu '他比我跑得快', chữ '得' có tác dụng gì?",
                    options: ["Bổ ngữ khả năng.", "Bổ ngữ trạng thái kết hợp với so sánh.", "Sở hữu.", "Quá khứ."],
                    correctAnswer: 1,
                    explanation: "Khi so sánh một hành động (chạy), ta kết hợp 比 với bổ ngữ trạng thái: A 比 B + V + 得 + Adj."
                },
                {
                    question: "Chọn lỗi sai trong câu: '这件衣服比那件衣服很漂亮'。",
                    options: ["这件", "比", "那件", "很"],
                    correctAnswer: 3,
                    explanation: "Trong câu chữ 比, trước tính từ không được dùng phó từ chỉ mức độ tuyệt đối như '很'."
                },
                {
                    question: "Dịch: 'Hôm qua không lạnh bằng hôm nay'.",
                    options: ["昨天比今天冷。", "昨天没今天冷。", "昨天不比今天没冷。", "今天比昨天不冷。"],
                    correctAnswer: 1,
                    explanation: "So sánh không bằng (A không... bằng B) dùng cấu trúc A + 没(有) + B + Adj."
                },
                {
                    question: "Cụm '多了' (duō le) trong câu '他比我胖多了' nghĩa là gì?",
                    options: ["Nhiều rồi.", "Hơn rất nhiều.", "Không nhiều.", "Nhiều người."],
                    correctAnswer: 1,
                    explanation: "Đặt sau tính từ trong câu so sánh để nhấn mạnh sự chênh lệch lớn (Béo hơn rất nhiều)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 3 (HSK 2) ---
        {
            id: "hsk2_g3",
            title: "Trợ từ kết cấu '得' (Bổ ngữ trạng thái)",
            structure: "Động từ + 得 + (很) + Tính từ",
            pinyinStructure: "V + de + (hěn) + Adj",
            desc: "Dùng để đánh giá, nhận xét, miêu tả về kết quả hoặc mức độ của một hành động. BẮT BUỘC phải có chữ '得' nối giữa Động từ và Tính từ.",
            examples: [
                {
                    zh: "他跑得很快。",
                    py: "Tā pǎo de hěn kuài.",
                    vi: "Anh ấy chạy rất nhanh."
                },
                {
                    zh: "我起得不早。",
                    py: "Wǒ qǐ de bù zǎo.",
                    vi: "Tôi dậy không sớm."
                }
            ],
            commonMistakes: "Bỏ quên chữ '得'. Hoặc đặt sai từ phủ định (VD SAI: 他不做得好 ❌ -> ĐÚNG: 他做得不好 ✅).",
            tags: ["Bổ ngữ", "Đánh giá", "Trợ từ"],
            exercises: [
                {
                    question: "Câu nào miêu tả 'Cô ấy múa rất đẹp' ĐÚNG ngữ pháp?",
                    options: ["她跳舞很漂亮。", "她跳得很漂亮。", "很漂亮她跳舞。", "她跳漂亮很。"],
                    correctAnswer: 1,
                    explanation: "Phải dùng trợ từ '得' nối giữa động từ (跳 - múa/nhảy) và cụm tính từ nhận xét (很漂亮)."
                },
                {
                    question: "Trong câu phủ định, chữ '不' phải đặt ở đâu? (Dịch: Tôi viết chữ Hán không đẹp).",
                    options: ["我不写汉字得好看。", "我写汉字得不好看。", "我写汉字不写得好看。", "我写汉字写得不好看。"],
                    correctAnswer: 3,
                    explanation: "Với câu có tân ngữ (汉字), phải lặp lại động từ (写). Chữ 不 đặt sau '得'. Cấu trúc đúng: S + V + O + V + 得 + 不 + Adj."
                },
                {
                    question: "Đâu là câu hỏi chính phản đúng của '他说得很快' (Anh ấy nói rất nhanh)?",
                    options: ["他说得快不快？", "他说不说得快？", "他说得不快吗？", "他说快不快得？"],
                    correctAnswer: 0,
                    explanation: "Để tạo câu hỏi chính phản, ta ghép Khẳng định và Phủ định của Tính từ ở sau chữ 得: V + 得 + Adj + 不 + Adj."
                },
                {
                    question: "Sắp xếp câu: 好 / 做 / 饭 / 妈妈 / 得很",
                    options: ["妈妈做饭很好得。", "妈妈饭做得好。", "妈妈做饭做得很好。", "做妈妈好得吃饭。"],
                    correctAnswer: 2,
                    explanation: "S (妈妈) + V (做) + O (饭) + V (做) + 得 + Adj (很好)."
                },
                {
                    question: "Dịch sang tiếng Trung: 'Hôm qua anh ấy ngủ rất muộn'.",
                    options: ["昨天他睡得晚很。", "昨天他睡得很晚。", "昨天他很晚睡觉。", "昨天他睡觉得很晚。"],
                    correctAnswer: 1,
                    explanation: "Động từ (睡) + 得 + Tính từ nhận xét (很晚)."
                },
                {
                    question: "Nếu bỏ tân ngữ đi, câu '你说汉语说得真好' có thể rút gọn thành:",
                    options: ["汉语说真好得。", "你说汉语得真好。", "汉语你说得真好。", "你说汉语真好。"],
                    correctAnswer: 2,
                    explanation: "Có thể đưa Tân ngữ (汉语) lên làm chủ đề ở đầu câu, sau đó chỉ cần một Động từ: 汉语 + 你 + 说 + 得 + 真好."
                },
                {
                    question: "Điền từ: 弟弟跑 ___ 比我快。",
                    options: ["的", "地", "得", "了"],
                    correctAnswer: 2,
                    explanation: "Đứng sau động từ (跑) để bổ nghĩa trạng thái, bắt buộc dùng 得 (de)."
                },
                {
                    question: "Câu '我昨天没睡得好' sai ở đâu?",
                    options: ["昨天", "没", "睡", "得好"],
                    correctAnswer: 1,
                    explanation: "Phủ định của bổ ngữ trạng thái luôn dùng 不 đặt SAU 得 (睡得不好), không dùng 没 đặt trước động từ, dù là ở quá khứ."
                },
                {
                    question: "Câu nào dưới đây đúng?",
                    options: ["他做饭很好。", "他做饭做很好。", "他做饭做得很好。", "他做的饭做得很好。"],
                    correctAnswer: 2,
                    explanation: "Có tân ngữ (饭) thì phải lặp lại động từ (做) rồi mới thêm 得."
                },
                {
                    question: "Hỏi: 你考得怎么样？ (Bạn thi thế nào?) - Đáp án phù hợp:",
                    options: ["我不考。", "考得不好。", "我没考得。", "我考得不怎么样。"],
                    correctAnswer: 1,
                    explanation: "Hỏi V+得+怎么样, trả lời cũng là V+得+Tính từ (考得不好)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 4 (HSK 2) ---
        {
            id: "hsk2_g4",
            title: "Trợ từ động thái '过' (Đã từng)",
            structure: "Chủ ngữ + Động từ + 过 + (Tân ngữ)",
            pinyinStructure: "S + V + guo + (O)",
            desc: "Biểu thị một hành động hoặc sự việc đã từng xảy ra VÀ kết thúc trong quá khứ, không còn kéo dài đến hiện tại. Nó nhấn mạnh vào việc bạn đã có 'trải nghiệm' đó.",
            examples: [
                {
                    zh: "我去过北京。",
                    py: "Wǒ qù guo Běijīng.",
                    vi: "Tôi đã từng đi Bắc Kinh."
                },
                {
                    zh: "我没看过这个电影。",
                    py: "Wǒ méi kàn guo zhège diànyǐng.",
                    vi: "Tôi chưa từng xem bộ phim này."
                }
            ],
            commonMistakes: "Nhầm lẫn giữa '了' (đã xảy ra/vừa xong) và '过' (đã từng trong quá khứ). Phủ định của 过 phải dùng '没' và KHÔNG bỏ 过.",
            tags: ["Trợ từ động thái", "Quá khứ", "Trải nghiệm"],
            exercises: [
                {
                    question: "Câu 'Tôi chưa từng ăn món ăn Trung Quốc' dịch sang tiếng Trung là:",
                    options: ["我不吃过中国菜。", "我没吃过中国菜。", "我吃没过中国菜。", "我不吃中国菜过。"],
                    correctAnswer: 1,
                    explanation: "Phủ định của '过' (trải nghiệm) bắt buộc phải dùng '没' (hoặc 没有) đứng trước Động từ."
                },
                {
                    question: "Sự khác biệt lớn nhất giữa '我买了一本书' và '我买过这本书' là gì?",
                    options: ["Giống hệt nhau.", "Câu trước chỉ hành động vừa mua xong, câu sau chỉ tôi đã từng mua cuốn này trong quá khứ.", "Câu trước sai ngữ pháp.", "Câu trước là quá khứ, câu sau là tương lai."],
                    correctAnswer: 1,
                    explanation: "'了' báo hiệu sự hoàn thành (tôi vừa mua xong), '过' báo hiệu trải nghiệm quá khứ (trước đây tôi từng mua rồi)."
                },
                {
                    question: "Để hỏi 'Bạn đã từng đi Việt Nam chưa?', ta dùng câu:",
                    options: ["你去过越南吗？", "你去越南了没有？", "你没去越南过？", "你去越南过没有过？"],
                    correctAnswer: 0,
                    explanation: "Dùng V + 过 + O + 吗？ để hỏi về trải nghiệm."
                },
                {
                    question: "Câu hỏi dạng chính phản của '看过' (từng xem) là:",
                    options: ["看没看过？", "看过没看过？", "看不看过？", "看过没有？"],
                    correctAnswer: 3,
                    explanation: "Cách hỏi chính phản phổ biến nhất cho trợ từ động thái (过/了) là đặt '没有' ở cuối câu."
                },
                {
                    question: "Điền từ: 以前我来 ___ 这里。(Trước đây tôi từng đến chỗ này).",
                    options: ["了", "着", "过", "的"],
                    correctAnswer: 2,
                    explanation: "Từ '以前' (trước đây) là dấu hiệu mạnh mẽ cho trải nghiệm trong quá khứ, dùng 过."
                },
                {
                    question: "Sắp xếp câu: 没 / 听说过 / 名字 / 这个 / 我",
                    options: ["我没听说过这个名字。", "我听说过没这个名字。", "这个名字没我听说过。", "听说过这个名字我没。"],
                    correctAnswer: 0,
                    explanation: "S + 没 + V (听说) + 过 + O (这个名字)."
                },
                {
                    question: "Chọn lỗi sai trong câu '昨天我不去过超市'。",
                    options: ["昨天", "不", "去过", "超市"],
                    correctAnswer: 1,
                    explanation: "Phủ định hành động trong quá khứ và phủ định của '过' luôn luôn dùng '没', tuyệt đối không dùng '不'."
                },
                {
                    question: "Dịch: 'Anh ấy đã từng làm bác sĩ'.",
                    options: ["他做了医生。", "他做过医生。", "他没做过医生。", "他是个医生。"],
                    correctAnswer: 1,
                    explanation: "Trải nghiệm từng làm nghề gì đó trong quá khứ (bây giờ không làm nữa) dùng V + 过."
                },
                {
                    question: "Từ '过' trong '过生日' (Đón sinh nhật) và '去过' (Đã từng đi) có giống nhau không?",
                    options: ["Giống hoàn toàn.", "Khác nhau. Từ trước là Động từ (đón/qua), từ sau là Trợ từ (đã từng).", "Cả hai đều là trợ từ.", "Cả hai đều là động từ."],
                    correctAnswer: 1,
                    explanation: "'过' có thể là động từ độc lập (qua đường, đón lễ tết), cũng có thể là trợ từ động thái đứng sau động từ khác."
                },
                {
                    question: "Điền từ: 你吃 ___ 早饭了吗？ (Bạn ăn sáng chưa?)",
                    options: ["着", "过", "了", "的"],
                    correctAnswer: 2,
                    explanation: "Hỏi về việc ăn sáng của ngày hôm nay (hành động hoàn thành) thì dùng 了 tự nhiên hơn là hỏi về 'trải nghiệm' ăn sáng (过)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 5 (HSK 2) ---
        {
            id: "hsk2_g5",
            title: "Phó từ '就' (Thì, Liền, Sớm)",
            structure: "Chủ ngữ + Thời gian / Điều kiện + 就 + Động từ + (了)",
            pinyinStructure: "S + Time / Condition + jiù + V + (le)",
            desc: "Nhấn mạnh sự việc xảy ra RẤT SỚM, nhanh chóng hoặc diễn ra thuận lợi theo cảm nhận của người nói. Hoặc dùng để đưa ra một kết luận dựa trên điều kiện phía trước.",
            examples: [
                {
                    zh: "我早上六点就起床了。",
                    py: "Wǒ zǎoshang liù diǎn jiù qǐchuáng le.",
                    vi: "Mới 6 giờ sáng tôi ĐÃ dậy rồi."
                },
                {
                    zh: "如果你喜欢，就买吧。",
                    py: "Rúguǒ nǐ xǐhuan, jiù mǎi ba.",
                    vi: "Nếu bạn thích, THÌ mua đi."
                }
            ],
            commonMistakes: "Phó từ '就' LUÔN LUÔN phải đứng TRƯỚC Động từ chính, không được đứng ở đầu câu trước Chủ ngữ.",
            tags: ["Phó từ", "Thời gian", "Kết luận"],
            exercises: [
                {
                    question: "Câu '同学们七点半 ___ 来教室了' (Mới 7h30 các bạn học sinh đã đến rồi) điền từ gì phù hợp nhất?",
                    options: ["很", "才", "就", "也"],
                    correctAnswer: 2,
                    explanation: "Để nhấn mạnh hành động xảy ra sớm, ta dùng phó từ '就'."
                },
                {
                    question: "Sắp xếp thành câu đúng: 明天 / 我 / 去医院 / 就",
                    options: ["我就明天去医院。", "明天就我去医院。", "我明天去就医院。", "我明天就去医院。"],
                    correctAnswer: 3,
                    explanation: "Trật tự chuẩn: S (我) + Thời gian (明天) + Phó từ (就) + V (去) + O."
                },
                {
                    question: "Câu '如果明天下雨，我们就不去了' có nghĩa là:",
                    options: ["Ngày mai mưa chúng ta vẫn đi.", "Nếu mai mưa, thì chúng ta không đi nữa.", "Ngày mai không mưa thì không đi.", "Mưa thì đi sớm."],
                    correctAnswer: 1,
                    explanation: "Cấu trúc Nếu (如果) ... Thì (就)..."
                },
                {
                    question: "Trái nghĩa với '就' (nhấn mạnh sự việc xảy ra SỚM) là phó từ nào (nhấn mạnh sự việc xảy ra MUỘN)?",
                    options: ["都 (đều)", "才 (mới)", "还 (vẫn)", "也 (cũng)"],
                    correctAnswer: 1,
                    explanation: "'才' dùng để phàn nàn/chỉ hành động diễn ra muộn. VD: 10点才起床 (10h mới dậy)."
                },
                {
                    question: "Cấu trúc '一... 就...' (yī... jiù...) dùng để biểu thị gì?",
                    options: ["Vừa ... liền ... (hai hành động xảy ra liên tiếp nhau).", "Một chút ... thì ...", "Cùng nhau ...", "Tuyệt đối không ..."],
                    correctAnswer: 0,
                    explanation: "Ví dụ: 他一到家就睡觉 (Anh ấy VỪA về đến nhà LIỀN đi ngủ)."
                },
                {
                    question: "Điền từ: 吃了饭 ___ 睡觉。 (Ăn cơm xong là ngủ ngay)",
                    options: ["就", "才", "还", "都"],
                    correctAnswer: 0,
                    explanation: "Hành động liên tiếp nhau (xong cái này là làm ngay cái kia), dùng 就."
                },
                {
                    question: "Chọn câu viết đúng:",
                    options: ["就我明天去北京。", "明天我就去北京。", "我明天去就北京。", "我明天去北京就。"],
                    correctAnswer: 1,
                    explanation: "就 phải đứng ngay TRƯỚC động từ chính (去)."
                },
                {
                    question: "Trong câu '我早就知道了' (Tôi đã biết từ sớm rồi), chữ 就 mang ý nghĩa:",
                    options: ["Kết luận.", "Chỉ sự thuận lợi.", "Nhấn mạnh thời gian xảy ra rất sớm.", "Số lượng ít."],
                    correctAnswer: 2,
                    explanation: "早就 + V: Đã làm gì đó từ rất sớm rồi."
                },
                {
                    question: "Dịch: 'Bên ngoài lạnh lắm, bạn đừng đi ra ngoài thì hơn'.",
                    options: ["外面很冷，你别去。", "外面很冷，你就别去了。", "外面很冷，就你别去了。", "外面很冷，别就去了。"],
                    correctAnswer: 1,
                    explanation: "就 ở đây dùng để đưa ra lời khuyên/kết luận dựa trên điều kiện thời tiết lạnh (thì đừng đi nữa)."
                },
                {
                    question: "Điền từ: 不懂 ___ 问老师。(Không hiểu THÌ hỏi giáo viên)",
                    options: ["了", "就", "着", "的"],
                    correctAnswer: 1,
                    explanation: "Kết luận/Giải pháp cho tình huống 'không hiểu'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 6 (HSK 2) ---
        {
            id: "hsk2_g6",
            title: "Cặp liên từ '虽然... 但是...' (Mặc dù... Nhưng...)",
            structure: "虽然 + (Chủ ngữ) + Sự thật / Hoàn cảnh, 但是 + (Chủ ngữ) + Kết quả ngược lại",
            pinyinStructure: "Suīrán ..., dànshì ...",
            desc: "Dùng để biểu thị quan hệ nhượng bộ (chuyển ngoặt). Khác với tiếng Việt có thể bỏ chữ 'nhưng' trong câu 'Mặc dù...', tiếng Trung BẮT BUỘC phải đi theo cặp '虽然... 但是...', hoặc ít nhất phải có chữ '但是' (nhưng) ở vế sau.",
            examples: [
                {
                    zh: "虽然外面下雨，但是我还要去学校。",
                    py: "Suīrán wàimiàn xià yǔ, dànshì wǒ hái yào qù xuéxiào.",
                    vi: "Mặc dù bên ngoài trời mưa, nhưng tôi vẫn phải đi học."
                },
                {
                    zh: "虽然汉字很难，但是很有意思。",
                    py: "Suīrán Hànzì hěn nán, dànshì hěn yǒu yìsi.",
                    vi: "Mặc dù chữ Hán rất khó, nhưng rất thú vị."
                }
            ],
            commonMistakes: "Lược bỏ chữ '但是' ở vế thứ hai do thói quen tiếng Việt. Trong tiếng Trung, mệnh đề chuyển ngoặt phía sau bắt buộc phải có liên từ báo hiệu (但是 / 可是 / 不过).",
            tags: ["Liên từ", "Nhượng bộ", "Chuyển ngoặt"],
            exercises: [
                {
                    question: "Điền từ: ___ 他生病了，但是他还在工作。 (Mặc dù anh ấy ốm, nhưng anh ấy vẫn đang làm việc)",
                    options: ["如果", "因为", "虽然", "所以"],
                    correctAnswer: 2,
                    explanation: "Cặp liên từ chỉ sự nhượng bộ, đi kèm với '但是' (nhưng) ở vế sau là '虽然' (mặc dù)."
                },
                {
                    question: "Chọn câu viết ĐÚNG ngữ pháp nhất:",
                    options: [
                        "虽然我没有钱，我想买电脑。",
                        "虽然我没有钱，但是我想买电脑。",
                        "但是我想买电脑，虽然我没有钱。",
                        "我没有钱虽然，但是我想买电脑。"
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc chuẩn: 虽然 + Mệnh đề 1, 但是 + Mệnh đề 2."
                },
                {
                    question: "Sắp xếp các từ sau: 喜欢 / 虽然 / 很贵 / 这个手机 / 但是 / 我",
                    options: [
                        "虽然我喜欢这个手机很贵但是。",
                        "虽然我喜欢但是这个手机很贵。",
                        "虽然这个手机很贵，但是我喜欢。",
                        "虽然很贵这个手机，但是我喜欢。"
                    ],
                    correctAnswer: 2,
                    explanation: "Mệnh đề hoàn cảnh (手机很贵) đi với 虽然, mệnh đề kết quả ngược lại (我喜欢) đi với 但是."
                },
                {
                    question: "Câu '天气很冷，但是我不穿大衣' (Trời rất lạnh, nhưng tôi không mặc áo khoác) có thể thêm từ nào vào đầu câu?",
                    options: ["因为", "所以", "如果", "虽然"],
                    correctAnswer: 3,
                    explanation: "Đã có 但是 ở vế sau thì vế trước có thể thêm 虽然 để tạo thành cặp."
                },
                {
                    question: "Từ nào có thể dùng thay thế cho '但是' trong cấu trúc này?",
                    options: ["和 (hé)", "可是 (kěshì)", "都 (dōu)", "也 (yě)"],
                    correctAnswer: 1,
                    explanation: "可是 (kěshì) cũng mang nghĩa là 'nhưng', dùng thay thế được cho 但是 trong văn nói hằng ngày."
                },
                {
                    question: "Chọn vế sau phù hợp: 虽然我认识他，___。",
                    options: [
                        "但是我不知道他的名字",
                        "所以他是我的朋友",
                        "因为他很好",
                        "如果他来"
                    ],
                    correctAnswer: 0,
                    explanation: "Mặc dù tôi biết/quen anh ta -> Vế sau phải là ý ngược lại: NHƯNG tôi không biết tên anh ta."
                },
                {
                    question: "Điền từ: 苹果 ___ 好吃，___ 太贵了。",
                    options: ["因为 - 所以", "虽然 - 但是", "如果 - 就", "一 - 就"],
                    correctAnswer: 1,
                    explanation: "Táo NGON (ưu điểm) <-> QUÁ ĐẮT (nhược điểm). Hai ý trái ngược nhau dùng 虽然... 但是..."
                },
                {
                    question: "Chủ ngữ nên đặt ở đâu nếu cả 2 vế câu CÙNG CHUNG một chủ ngữ (Ví dụ: Tôi mặc dù mệt, nhưng tôi vẫn đi)?",
                    options: [
                        "Bắt buộc đứng trước 虽然.",
                        "Bắt buộc đứng sau 虽然.",
                        "Có thể đứng trước hoặc sau 虽然 đều được.",
                        "Bắt buộc lược bỏ ở vế đầu."
                    ],
                    correctAnswer: 2,
                    explanation: "Khi chung chủ ngữ, S có thể đứng trước hoặc sau 虽然 (我虽然很累 / 虽然我很累). Cả hai đều đúng."
                },
                {
                    question: "Câu nào sai logic?",
                    options: [
                        "虽然今天下雨，但是他不带伞。",
                        "虽然汉语很难，但是我很喜欢学。",
                        "虽然他没学习，但是他考得很好。",
                        "虽然我每天跑步，但是我越来越胖所以。"
                    ],
                    correctAnswer: 3,
                    explanation: "Thừa chữ 所以 ở cuối câu. Không bao giờ gộp 虽然... 但是 với 所以."
                },
                {
                    question: "Dịch: 'Mặc dù anh ấy không nói, nhưng tôi đều biết'.",
                    options: [
                        "虽然他不说话，但是我都知道。",
                        "虽然他不说，因为我都知道。",
                        "他不说话虽然，但是我都知道。",
                        "虽然他没有说，但是我也都不知道。"
                    ],
                    correctAnswer: 0,
                    explanation: "虽然 (mặc dù) + 他不说 (anh ấy không nói) + 但是 (nhưng) + 我都知道 (tôi đều biết)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 7 (HSK 2) ---
        {
            id: "hsk2_g7",
            title: "Phó từ '还' (Vẫn / Còn / Lại)",
            structure: "Chủ ngữ + 还 + Động từ / Tính từ",
            pinyinStructure: "S + hái + V / Adj",
            desc: "Phó từ '还' (hái) có 3 nghĩa chính trong HSK 2:\n1. Vẫn đang: Biểu thị một hành động/trạng thái đang tiếp diễn chưa kết thúc (VD: Anh ấy vẫn đang ngủ).\n2. Còn, thêm nữa: Biểu thị sự bổ sung, tăng thêm về số lượng/mức độ (VD: Tôi mua táo, còn mua thêm dưa hấu).\n3. Tàm tạm, vẫn ổn: Mức độ chấp nhận được (VD: 还好 - vẫn tốt).",
            examples: [
                {
                    zh: "十点了，他还在睡觉。",
                    py: "Shí diǎn le, tā hái zài shuìjiào.",
                    vi: "10 giờ rồi, anh ấy VẪN ĐANG ngủ.",
                    note: "Nghĩa tiếp diễn (Vẫn)."
                },
                {
                    zh: "我买了一本书，还买了一个本子。",
                    py: "Wǒ mǎi le yì běn shū, hái mǎi le yí gè běnzi.",
                    vi: "Tôi đã mua một cuốn sách, CÒN mua thêm một cuốn vở.",
                    note: "Nghĩa bổ sung (Còn / Thêm)."
                },
                {
                    zh: "这件衣服还可以。",
                    py: "Zhè jiàn yīfu hái kěyǐ.",
                    vi: "Bộ quần áo này TẠM ĐƯỢC / VẪN ỔN."
                }
            ],
            commonMistakes: "Hay nhầm '还' (hái - còn/thêm) với '也' (yě - cũng). '也' dùng khi chủ thể A giống chủ thể B (Anh ta đi, tôi CŨNG đi). Còn '还' dùng khi MỘT chủ thể làm thêm hành động thứ 2 (Tôi đi Bắc Kinh, CÒN đi Thượng Hải).",
            tags: ["Phó từ", "Tiếp diễn", "Bổ sung"],
            exercises: [
                {
                    question: "Câu '外面还在下雨吗？' nghĩa là gì?",
                    options: [
                        "Bên ngoài còn mưa thêm không?",
                        "Bên ngoài vẫn đang mưa phải không?",
                        "Bên ngoài tạnh mưa chưa?",
                        "Bên ngoài cũng đang mưa à?"
                    ],
                    correctAnswer: 1,
                    explanation: "'还在' + Động từ biểu thị hành động vẫn đang tiếp tục diễn ra (vẫn đang mưa)."
                },
                {
                    question: "Điền từ: 我吃了一个苹果，___ 想吃一个。(Tôi đã ăn 1 quả táo, CÒN muốn ăn thêm 1 quả nữa)",
                    options: ["也", "还", "都", "就"],
                    correctAnswer: 1,
                    explanation: "Bổ sung thêm hành động của cùng một chủ thể, dùng '还'."
                },
                {
                    question: "Phân biệt 还 và 也. Chọn từ điền vào: 爸爸是医生，妈妈 ___ 是医生。(Bố là bác sĩ, mẹ CŨNG là bác sĩ).",
                    options: ["还", "再", "就", "也"],
                    correctAnswer: 3,
                    explanation: "Hai chủ thể khác nhau (Bố - Mẹ) có chung đặc điểm, dùng 也 (Cũng)."
                },
                {
                    question: "Khi ai đó hỏi '你的身体怎么样？' (Sức khỏe bạn thế nào?), trả lời '还可以' có nghĩa là:",
                    options: ["Rất tồi tệ.", "Tạm được, không tồi nhưng cũng không quá tốt.", "Rất xuất sắc.", "Tôi có thể làm được."],
                    correctAnswer: 1,
                    explanation: "Cụm '还可以' (hái kěyǐ) là câu cửa miệng chỉ mức độ trung bình, chấp nhận được (tạm ổn)."
                },
                {
                    question: "Sắp xếp câu: 在 / 学习 / 弟弟 / 还 / 吗 / ？",
                    options: [
                        "弟弟在学习还吗？",
                        "还弟弟在学习吗？",
                        "弟弟还在学习吗？",
                        "弟弟在还学习吗？"
                    ],
                    correctAnswer: 2,
                    explanation: "Phó từ 还 đứng trước 在 + Động từ: 弟弟 + 还在 + 学习 + 吗？ (Em trai VẪN ĐANG học à?)"
                },
                {
                    question: "Chọn lỗi sai: '昨天很冷，今天也很冷。'",
                    options: ["昨天", "很冷", "今天", "Câu này KHÔNG sai."],
                    correctAnswer: 3,
                    explanation: "Hôm qua lạnh, hôm nay CŨNG lạnh. Dùng 也 là chính xác, biểu thị sự lặp lại/tương đồng. (Dùng 今天还很冷 cũng được, mang nghĩa trạng thái lạnh vẫn tiếp diễn)."
                },
                {
                    question: "Dịch: 'Anh ấy vẫn chưa đến'.",
                    options: ["他还没来。", "他不还来。", "他还来没。", "没他还来。"],
                    correctAnswer: 0,
                    explanation: "Vẫn chưa = 还 + 没 (hái méi)."
                },
                {
                    question: "Điền từ: 我会说汉语，___ 会说英语。(Tôi biết nói tiếng Trung, CÒN biết nói cả tiếng Anh).",
                    options: ["也", "都", "还", "才"],
                    correctAnswer: 2,
                    explanation: "Cùng một người (我) có 2 kỹ năng, kỹ năng sau là bổ sung thêm -> dùng 还."
                },
                {
                    question: "Trường hợp nào '还' đọc là 'huán' (hoàn/trả) chứ KHÔNG đọc là 'hái'?",
                    options: [
                        "还书给图书馆 (Trả sách cho thư viện).",
                        "还在家 (Vẫn ở nhà).",
                        "还想吃 (Vẫn muốn ăn).",
                        "还可以 (Tạm được)."
                    ],
                    correctAnswer: 0,
                    explanation: "Chữ '还' là từ nhiều âm đọc. Khi nó là Động từ mang nghĩa 'Trả lại', nó đọc là 'huán'. Khi là phó từ, đọc là 'hái'."
                },
                {
                    question: "Câu '你还要什么吗？' thường nghe thấy ở đâu?",
                    options: [
                        "Trong thư viện, khi mượn sách.",
                        "Trong nhà hàng/quầy thanh toán, khi nhân viên hỏi 'Quý khách còn cần gì thêm không?'.",
                        "Trong bệnh viện.",
                        "Khi tạm biệt nhau."
                    ],
                    correctAnswer: 1,
                    explanation: "还要什么 (Còn muốn gì nữa không) là câu cửa miệng dùng để hỏi khách hàng có muốn mua/gọi thêm đồ không."
                }
            ]
        },
        // --- BÀI MỚI SỐ 8 (HSK 2) ---
        {
            id: "hsk2_g8",
            title: "Lựa chọn với '还是' và '或者' (Hay là / Hoặc là)",
            structure: "A 还是 B？ / A 或者 B",
            pinyinStructure: "A háishì B? / A huòzhě B",
            desc: "Cả hai đều dùng để chỉ sự lựa chọn giữa 2 phương án, nhưng khác nhau hoàn toàn về loại câu:\n1. 还是 (Háishì): Dịch là 'Hay là', LUÔN LUÔN dùng trong CÂU HỎI.\n2. 或者 (Huòzhě): Dịch là 'Hoặc là', LUÔN LUÔN dùng trong CÂU TRẦN THUẬT (câu kể/câu khẳng định).",
            examples: [
                {
                    zh: "你喝茶还是喝咖啡？",
                    py: "Nǐ hē chá háishì hē kāfēi?",
                    vi: "Bạn uống trà HAY LÀ uống cà phê?",
                    note: "Dùng 还是 để đưa ra sự lựa chọn trong câu hỏi."
                },
                {
                    zh: "星期六或者星期日，我都在家。",
                    py: "Xīngqīliù huòzhě xīngqīrì, wǒ dōu zài jiā.",
                    vi: "Thứ Bảy HOẶC LÀ Chủ Nhật, tôi đều ở nhà.",
                    note: "Dùng 或者 để kể lại các phương án trong câu trần thuật."
                }
            ],
            commonMistakes: "Dùng '或者' (hoặc là) vào trong câu hỏi. (VD SAI: 你去或者不去？ ❌ -> ĐÚNG: 你去还是不去？ ✅).",
            tags: ["Liên từ", "Lựa chọn", "Câu hỏi", "Câu kể"],
            exercises: [
                {
                    question: "Điền từ: 晚上我们吃米饭 ___ 吃面条？ (Tối nay chúng ta ăn cơm HAY LÀ ăn mì?)",
                    options: ["还是", "或者", "和", "也"],
                    correctAnswer: 0,
                    explanation: "Vì đây là một câu hỏi nghi vấn (có dấu ?), nên phải dùng liên từ lựa chọn '还是'."
                },
                {
                    question: "Điền từ: 你坐火车 ___ 坐飞机去都可以。 (Bạn đi tàu hỏa HOẶC LÀ đi máy bay đều được).",
                    options: ["还是", "或者", "都", "和"],
                    correctAnswer: 1,
                    explanation: "Đây là câu trần thuật đưa ra 2 phương án lựa chọn, dùng '或者'."
                },
                {
                    question: "Câu nào dưới đây dùng SAI?",
                    options: [
                        "他是老师还是医生？",
                        "你明天去还是后天去？",
                        "你喜欢吃肉或者吃鱼？",
                        "看电影或者看书，我都喜欢。"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C là một câu hỏi lựa chọn, không được phép dùng '或者'. Phải dùng '还是'."
                },
                {
                    question: "Dịch: 'Cái màu đỏ hay là cái màu đen?' (Hỏi khi mua hàng)",
                    options: [
                        "红的或者黑的？",
                        "红色的还是黑色的？",
                        "红的还是黑的吗？",
                        "红的和黑的？"
                    ],
                    correctAnswer: 1,
                    explanation: "Câu hỏi lựa chọn dùng 还是 (Không được thêm 吗 ở cuối)."
                },
                {
                    question: "Trường hợp nào có thể dùng CẢ '还是' VÀ '或者'?",
                    options: [
                        "Không có trường hợp nào. Chúng loại trừ nhau (Câu hỏi vs Câu trần thuật).",
                        "Đều dùng được trong câu hỏi.",
                        "Đều dùng được trong câu trần thuật.",
                        "Khi nối 2 danh từ."
                    ],
                    correctAnswer: 0,
                    explanation: "Quy tắc ngữ pháp HSK 2 phân biệt rất rạch ròi: 还是 cho câu hỏi, 或者 cho câu kể."
                },
                {
                    question: "Sắp xếp câu: 北京 / 去 / 你 / 上海 / 还是 / 去 / ？",
                    options: [
                        "你去北京去还是上海？",
                        "你去还是北京去上海？",
                        "你去北京还是去上海？",
                        "北京去还是你上海去？"
                    ],
                    correctAnswer: 2,
                    explanation: "Cấu trúc A (去北京) 还是 B (去上海)."
                },
                {
                    question: "Trong câu '我不知道他来还是不来' (Tôi không biết anh ấy đến hay không), tại sao lại dùng 还是 dù không có dấu chấm hỏi?",
                    options: [
                        "Vì đây là lỗi sai.",
                        "Vì '还是' cũng mang nghĩa 'hoặc'.",
                        "Vì vế '他来还是不来' là một mệnh đề nghi vấn ngầm (mệnh đề mang tính lựa chọn chưa rõ ràng) làm tân ngữ cho chữ 知道.",
                        "Vì chủ ngữ là 我."
                    ],
                    correctAnswer: 2,
                    explanation: "Dù là câu trần thuật, nhưng bản chất của vế sau mang tính chất của một câu hỏi ngầm (đến hay không đến) nên vẫn dùng 还是."
                },
                {
                    question: "Câu '苹果或者西瓜，我都喜欢' có nghĩa là:",
                    options: [
                        "Tôi thích táo hơn dưa hấu.",
                        "Táo hay dưa hấu, tôi đều thích.",
                        "Tôi không thích táo lẫn dưa hấu.",
                        "Táo là dưa hấu."
                    ],
                    correctAnswer: 1,
                    explanation: "Liệt kê 2 lựa chọn trong câu trần thuật, đi kèm với 都 (đều thích cả 2)."
                },
                {
                    question: "Chọn cách nói TỰ NHIÊN NHẤT khi mời bạn bè uống nước:",
                    options: [
                        "你喝茶还是咖啡？",
                        "你喝茶或者咖啡？",
                        "你喝茶和咖啡？",
                        "你喝茶还是喝不喝咖啡？"
                    ],
                    correctAnswer: 0,
                    explanation: "Lược bỏ động từ trùng lặp ở vế B để câu ngắn gọn: 喝茶 还是 (喝)咖啡？"
                },
                {
                    question: "Nếu có 3 sự lựa chọn (A, B, C) trong câu trần thuật, bạn sẽ đặt '或者' ở đâu?",
                    options: [
                        "A 或者 B 或者 C",
                        "或者 A 或者 B 或者 C",
                        "A, B 或者 C",
                        "A 或者 B, C"
                    ],
                    correctAnswer: 2,
                    explanation: "Giống như chữ 'or' trong tiếng Anh, nếu có nhiều liệt kê, người ta dùng dấu phẩy và chỉ đặt 或者 ở trước sự lựa chọn cuối cùng."
                }
            ]
        },
        // --- BÀI MỚI SỐ 9 (HSK 2) ---
        {
            id: "hsk2_g9",
            title: "Cấu trúc hành động sắp xảy ra '快...了 / 就要...了'",
            structure: "(Thời gian) + 就要 + Động từ + 了 / 快(要) + Động từ + 了",
            pinyinStructure: "(Time) + jiù yào + V + le / kuài (yào) + V + le",
            desc: "Dùng để diễn tả một hành động, sự việc hoặc trạng thái CHUẨN BỊ / SẮP sửa xảy ra trong tương lai rất gần. Dịch là: Sắp... rồi.\n\nĐặc biệt chú ý:\n1. Nếu trong câu KHÔNG CÓ từ chỉ thời gian cụ thể (VD: Ngày mai, Tháng sau): Dùng 快...了, 快要...了 hoặc 就要...了 đều được.\n2. Nếu trong câu ĐÃ CÓ từ chỉ thời gian cụ thể (VD: 8 giờ, Ngày mai): BẮT BUỘC chỉ được dùng 就要...了.",
            examples: [
                {
                    zh: "快下雨了。",
                    py: "Kuài xià yǔ le.",
                    vi: "Sắp mưa rồi.",
                    note: "Không có thời gian cụ thể."
                },
                {
                    zh: "我们快要考试了。",
                    py: "Wǒmen kuài yào kǎoshì le.",
                    vi: "Chúng ta sắp thi rồi."
                },
                {
                    zh: "下个月我们就要回国了。",
                    py: "Xià gè yuè wǒmen jiù yào huí guó le.",
                    vi: "Tháng sau chúng tôi sẽ về nước rồi.",
                    note: "Có mốc thời gian cụ thể (下个月), BẮT BUỘC dùng 就要...了."
                }
            ],
            commonMistakes: "Lỗi kinh điển: Dùng 快...了 khi có thời gian cụ thể. VD SAI: 明天快下雨了 ❌ (Ngày mai sắp mưa rồi) -> ĐÚNG: 明天就要下雨了 ✅.",
            tags: ["Tương lai gần", "Sắp xếp", "Cấu trúc"],
            exercises: [
                {
                    question: "Câu 'Sắp 8 giờ rồi' nói thế nào là chuẩn nhất?",
                    options: [
                        "八点快了。",
                        "快八点了。",
                        "八点快要了。",
                        "要八点了。"
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc 快 + Mốc thời gian/Tuổi tác + 了 (Sắp đến lúc nào đó rồi)."
                },
                {
                    question: "Điền từ: 明天我们 ___ 考试了。(Ngày mai chúng ta sẽ thi rồi).",
                    options: ["快", "快要", "就要", "要"],
                    correctAnswer: 2,
                    explanation: "Trong câu ĐÃ CÓ mốc thời gian cụ thể (明天 - ngày mai), bắt buộc phải dùng 就要...了."
                },
                {
                    question: "Chọn câu SAI ngữ pháp:",
                    options: [
                        "快下课了。",
                        "他就要来了。",
                        "下个星期他快要结婚了。",
                        "新年就要到了。"
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C có mốc thời gian '下个星期' (tuần sau), không được dùng '快要'. Phải sửa thành '下个星期他就要结婚了'."
                },
                {
                    question: "Dịch: 'Bên ngoài sắp mưa rồi, bạn có mang ô không?'",
                    options: [
                        "外面快下雨了，你带伞吗？",
                        "外面就要下雨了，你带伞吗？",
                        "外面要下雨了，你带伞吗？",
                        "Cả 3 câu trên đều đúng."
                    ],
                    correctAnswer: 3,
                    explanation: "Vì không có mốc thời gian cụ thể, nên dùng 快...了, 就要...了, hoặc 要...了 đều đúng."
                },
                {
                    question: "Sắp xếp câu: 了 / 到 / 就要 / 火车",
                    options: [
                        "火车到了就要。",
                        "就要火车到了。",
                        "火车到了就要。",
                        "火车就要到了。"
                    ],
                    correctAnswer: 3,
                    explanation: "Chủ ngữ (火车 - Tàu hỏa) + 就要 + Động từ (到 - đến) + 了."
                },
                {
                    question: "Vai trò của chữ '了' trong cấu trúc này là gì?",
                    options: [
                        "Biểu thị hành động đã xảy ra trong quá khứ.",
                        "Biểu thị một sự thay đổi sắp diễn ra (trạng thái mới sắp xuất hiện).",
                        "Không có ý nghĩa gì, chỉ đứng cho đẹp.",
                        "Làm từ nối."
                    ],
                    correctAnswer: 1,
                    explanation: "Chữ 了 ở cuối câu mang tính chất của '了 ngữ khí' - báo hiệu một sự thay đổi (Ví dụ: Từ trạng thái tạnh ráo sắp đổi sang trạng thái mưa)."
                },
                {
                    question: "Khi bạn thấy bạn mình đang chạy hộc tốc về phía trạm xe buýt, bạn nói '快跑！公共汽车快走了！', chữ 快 trong 快走了 có nghĩa là:",
                    options: [
                        "Nhanh (tính từ).",
                        "Sắp... rồi (Chỉ tương lai gần).",
                        "Vui vẻ.",
                        "Đã rời đi."
                    ],
                    correctAnswer: 1,
                    explanation: "快 (Nhanh lên) + 跑 (Chạy đi) -> 公共汽车 (Xe buýt) + 快走了 (SẮP rời đi rồi)."
                },
                {
                    question: "Điền từ: 妈妈，我 ___ 十岁了！ (Mẹ ơi, con sắp 10 tuổi rồi!)",
                    options: ["快", "就", "也", "都"],
                    correctAnswer: 0,
                    explanation: "快 + [Số lượng / Tuổi tác] + 了."
                },
                {
                    question: "Câu '下个月就要考试了' có chủ ngữ là gì?",
                    options: [
                        "下个月",
                        "考试",
                        "了",
                        "Chủ ngữ bị ẩn (ngầm hiểu là Chúng tôi / Tôi)."
                    ],
                    correctAnswer: 3,
                    explanation: "Trong tiếng Trung đàm thoại, chủ ngữ (我, 我们) thường xuyên được lược bỏ nếu bối cảnh đã rõ ràng."
                },
                {
                    question: "Từ nào KHÔNG được đặt vào chỗ trống: ___ 电影 ___ 开始了。 (Phim sắp bắt đầu rồi).",
                    options: [
                        "快 ... 了",
                        "就要 ... 了",
                        "快要 ... 了",
                        "还 ... 了"
                    ],
                    correctAnswer: 3,
                    explanation: "Không có cấu trúc 还...了 để chỉ tương lai gần."
                }
            ]
        },
        // --- BÀI MỚI SỐ 10 (HSK 2) ---
        {
            id: "hsk2_g10",
            title: "Bổ ngữ kết quả (完, 到, 见, 好, 错)",
            structure: "Động từ + Bổ ngữ kết quả + (了) + (Tân ngữ)",
            pinyinStructure: "V + Result Complement + (le) + (O)",
            desc: "Dùng để nói rõ KẾT QUẢ của một hành động. Bổ ngữ kết quả đứng NGAY SAU Động từ chính.\nCác bổ ngữ kết quả phổ biến trong HSK 2:\n1. 完 (wán): Xong, hết (VD: 吃完 - ăn xong).\n2. 到 (dào): Đạt được mục đích, hoặc đến một nơi/thời điểm nào đó (VD: 找到 - tìm thấy, 买到 - mua được).\n3. 见 (jiàn): Nhận biết bằng giác quan (VD: 看见 - nhìn thấy, 听见 - nghe thấy).\n4. 好 (hǎo): Hoàn thành và đạt kết quả tốt / sẵn sàng (VD: 准备好 - chuẩn标准 xong xuôi).\n5. 错 (cuò): Sai (VD: 写错 - viết sai).",
            examples: [
                {
                    zh: "我看完了这本书。",
                    py: "Wǒ kàn wán le zhè běn shū.",
                    vi: "Tôi đã đọc xong cuốn sách này rồi."
                },
                {
                    zh: "我没听见他说话。",
                    py: "Wǒ méi tīng jiàn tā shuōhuà.",
                    vi: "Tôi không nghe thấy anh ấy nói gì.",
                    note: "Phủ định BẮT BUỘC dùng 没 đặt trước Động từ (没 + V + Bổ ngữ)."
                },
                {
                    zh: "对不起，我写错你的名字了。",
                    py: "Duìbuqǐ, wǒ xiě cuò nǐ de míngzi le.",
                    vi: "Xin lỗi, tôi viết sai tên của bạn rồi."
                }
            ],
            commonMistakes: "Người Việt hay nhét Tân ngữ vào giữa Động từ và Bổ ngữ (VD SAI: 看书完 ❌ - Đọc sách xong -> ĐÚNG: 看完书 ✅ - Đọc xong sách). Bổ ngữ kết quả phải dính chặt vào động từ.",
            tags: ["Bổ ngữ", "Kết quả", "Động từ"],
            exercises: [
                {
                    question: "Câu 'Tôi đã ăn xong cơm rồi' dịch sang tiếng Trung là:",
                    options: [
                        "我吃饭完了。",
                        "我吃完饭了。",
                        "我完吃饭了。",
                        "我吃饭完了。"
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc: Động từ (吃) + BN kết quả (完) + Tân ngữ (饭) + 了."
                },
                {
                    question: "Điền bổ ngữ thích hợp: 昨天我去超市，但是没买 ___ 苹果。(Hôm qua tôi đi siêu thị nhưng không mua ĐƯỢC táo).",
                    options: ["完", "错", "见", "到"],
                    correctAnswer: 3,
                    explanation: "到 biểu thị hành động đạt được mục đích (买到 - mua được / mua thấy)."
                },
                {
                    question: "Đâu là câu phủ định ĐÚNG của '看见' (Nhìn thấy)?",
                    options: [
                        "看不见",
                        "没看",
                        "没看见",
                        "不见看"
                    ],
                    correctAnswer: 2,
                    explanation: "Phủ định của Bổ ngữ kết quả chỉ một việc chưa xảy ra/chưa đạt kết quả trong quá khứ là 没 + V + BNKQ (没看见 - chưa nhìn thấy)."
                },
                {
                    question: "Từ '好' trong '准备好了' (zhǔnbèi hǎo le) mang nghĩa là gì?",
                    options: [
                        "Rất tốt (Tính từ).",
                        "Hoàn thành xong xuôi, sẵn sàng (Bổ ngữ kết quả).",
                        "Chào hỏi.",
                        "Người tốt."
                    ],
                    correctAnswer: 1,
                    explanation: "Khi 好 đứng sau động từ, nó báo hiệu việc đó đã được làm xong một cách thỏa đáng, sẵn sàng (Làm xong rồi / Chuẩn bị xong rồi)."
                },
                {
                    question: "Người phục vụ mang ra sai món ăn, bạn nói: 'Xin lỗi, bạn mang ___ rồi.'",
                    options: ["完", "见", "错", "好"],
                    correctAnswer: 2,
                    explanation: "错 (cuò) mang nghĩa là Sai. 上错菜 (mang lên sai món)."
                },
                {
                    question: "Sắp xếp câu: 没 / 找到 / 我 / 手机 / 我的",
                    options: [
                        "我的手机我没找到。",
                        "我没找到我的手机。",
                        "找到没我的手机我。",
                        "我找没到我的手机。"
                    ],
                    correctAnswer: 1,
                    explanation: "Chủ ngữ (我) + 没 + Động từ (找) + Bổ ngữ (到) + Tân ngữ (我的手机)."
                },
                {
                    question: "Sự khác biệt giữa 听 (Nghe) và 听见 (Nghe thấy) là gì?",
                    options: [
                        "Giống hệt nhau.",
                        "听 là quá trình (đang lắng nghe), còn 听见 là kết quả (đã tiếp nhận được âm thanh vào tai).",
                        "听 dùng cho người, 听见 dùng cho vật.",
                        "听见 là sai ngữ pháp."
                    ],
                    correctAnswer: 1,
                    explanation: "Nghe (听) là hành động, còn việc bạn có thực sự bắt được âm thanh đó không (như có người gọi bạn trong ồn ào) thì là 听见 (Nghe thấy)."
                },
                {
                    question: "Trong câu '电影八点看到十点' (Xem phim từ 8h đến 10h), chữ '到' có vai trò gì?",
                    options: [
                        "Chỉ phương hướng.",
                        "Động từ chính (đến).",
                        "Bổ ngữ kết quả chỉ thời gian hành động kéo dài đến.",
                        "Lượng từ."
                    ],
                    correctAnswer: 2,
                    explanation: "V + 到 + Mốc thời gian: Biểu thị hành động kéo dài cho đến tận mốc thời gian đó."
                },
                {
                    question: "Chọn lỗi sai: '老师，我写这个汉字错了吗？'",
                    options: ["老师", "写", "这个汉字错", "了"],
                    correctAnswer: 2,
                    explanation: "Sai vị trí tân ngữ. Phải là V + 错 + Tân ngữ: 我写错这个汉字了吗？ (Em viết sai chữ Hán này phải không?)."
                },
                {
                    question: "Hỏi: '作业你做完了吗？' (Bài tập bạn làm xong chưa?). Đáp án nào PHÙ HỢP nhất?",
                    options: [
                        "我做完了。",
                        "我不做完。",
                        "我做错。",
                        "我做完好。"
                    ],
                    correctAnswer: 0,
                    explanation: "Hỏi 做完了吗, trả lời khẳng định là 做完了 (Làm xong rồi), hoặc phủ định là 还没做完 (Vẫn chưa làm xong)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 11 (HSK 2) ---
        {
            id: "hsk2_g11",
            title: "Câu hỏi tu từ '不是...吗' (Chẳng phải... sao?)",
            structure: "不是 + Sự thật / Khẳng định + 吗？",
            pinyinStructure: "Bú shì + Fact + ma?",
            desc: "Dùng để nhấn mạnh, nhắc nhở hoặc khẳng định lại một sự thật mà người nói cho rằng người nghe ĐÃ BIẾT hoặc LẼ RA PHẢI BIẾT. Tuy mang hình thức là câu hỏi (phủ định), nhưng thực chất nó mang ý nghĩa KHẲNG ĐỊNH rất mạnh.",
            examples: [
                {
                    zh: "你不是喜欢吃苹果吗？",
                    py: "Nǐ bú shì xǐhuan chī píngguǒ ma?",
                    vi: "Chẳng phải bạn thích ăn táo sao?",
                    note: "Hàm ý: Tôi nhớ là bạn rất thích ăn táo mà (sao giờ lại không ăn?)."
                },
                {
                    zh: "他不是昨天回国了吗？",
                    py: "Tā bú shì zuótiān huí guó le ma?",
                    vi: "Chẳng phải hôm qua anh ấy đã về nước rồi sao?"
                }
            ],
            commonMistakes: "Người học thường dịch sát nghĩa là 'Không phải là... sao' và bị bối rối khi trả lời. Khi ai đó hỏi câu này, họ không thực sự chờ bạn trả lời 'Có' hay 'Không', mà họ đang thắc mắc/nhắc nhở về một điều trái với lẽ thường.",
            tags: ["Câu hỏi tu từ", "Nhấn mạnh", "Giao tiếp"],
            exercises: [
                {
                    question: "Câu '你不是有明天吗？' (Nǐ bú shì yǒu míngtiān ma?) thường mang hàm ý gì?",
                    options: [
                        "Hỏi xem ngày mai bạn có rảnh không.",
                        "Khuyên nhủ/Nhắc nhở: Chẳng phải bạn còn có ngày mai sao? (Đừng buồn nữa).",
                        "Hỏi xem hôm nay là thứ mấy.",
                        "Từ chối lời mời."
                    ],
                    correctAnswer: 1,
                    explanation: "Dùng 不是...吗 để nhắc nhở người nghe về một sự thật hiển nhiên (bạn vẫn còn tương lai) nhằm an ủi."
                },
                {
                    question: "Điền từ: 你 ___ 说今天不来 ___？ 怎么又来了？ (Chẳng phải bạn nói hôm nay không đến sao? Sao lại đến rồi?)",
                    options: ["不...吗", "没...吗", "不是...吗", "是不是...呢"],
                    correctAnswer: 2,
                    explanation: "Cấu trúc kinh điển của câu hỏi phản vấn (vặn hỏi lại): 不是 + [Sự thật] + 吗？"
                },
                {
                    question: "Người A hỏi: '我们什么时候去？' (Khi nào chúng ta đi?). Người B trả lời: '你不是知道吗？'. Thái độ của B là:",
                    options: [
                        "Rất vui vẻ muốn trả lời.",
                        "Thắc mắc: Chẳng phải cậu biết rồi sao? (Sao còn hỏi lại).",
                        "Không biết câu trả lời.",
                        "Đang xin lỗi A."
                    ],
                    correctAnswer: 1,
                    explanation: "B dùng câu hỏi tu từ để chỉ ra rằng A lẽ ra đã biết thông tin này rồi."
                },
                {
                    question: "Sắp xếp câu: 吗 / 不是 / 中国人 / 你 / ？",
                    options: [
                        "你中国人不是吗？",
                        "不是你中国人吗？",
                        "你不是中国人吗？",
                        "中国人不是你吗？"
                    ],
                    correctAnswer: 2,
                    explanation: "Chủ ngữ (你) + 不是 + Khẳng định (中国人) + 吗？"
                },
                {
                    question: "Câu nào đồng nghĩa với '你不是去过北京吗？'?",
                    options: [
                        "你没去过北京。",
                        "我知道你去过北京 (sao giờ lại bảo chưa đi / sao không biết đường?).",
                        "你想去北京吗？",
                        "北京不好玩。"
                    ],
                    correctAnswer: 1,
                    explanation: "Người nói tin chắc rằng đối phương đã từng đi Bắc Kinh."
                },
                {
                    question: "Chọn lỗi sai: '明天不是不下雨了？'",
                    options: ["明天", "不是", "不", "了"],
                    correctAnswer: 3,
                    explanation: "Cấu trúc này BẮT BUỘC phải có trợ từ nghi vấn '吗' ở cuối câu. Phải là: 明天不是不下雨了吗？"
                },
                {
                    question: "Dịch: 'Chẳng phải anh ấy là bạn trai của bạn sao?'",
                    options: [
                        "他是不是你的男朋友？",
                        "他不是你的男朋友吗？",
                        "他是你的男朋友不是吗？",
                        "他没是你的男朋友吗？"
                    ],
                    correctAnswer: 1,
                    explanation: "他 + 不是 + 你的男朋友 + 吗？"
                },
                {
                    question: "Có thể rút gọn '不是...吗' thành '不...吗' trong trường hợp nào?",
                    options: [
                        "Khi đứng trước động từ/tính từ (Ví dụ: 你不冷吗？ - Bạn không lạnh sao?).",
                        "Khi đứng trước danh từ.",
                        "Khi là câu mệnh lệnh.",
                        "Không bao giờ được rút gọn."
                    ],
                    correctAnswer: 0,
                    explanation: "Nếu phía sau không phải là danh từ (không cần động từ 是), ta có thể nói tắt: 你不吃吗？ (Chẳng phải bạn ăn sao? / Bạn không ăn à?)."
                },
                {
                    question: "Đáp án nào KHÔNG phù hợp khi ai đó vặn hỏi bạn: '你不是没钱吗？' (Chẳng phải cậu hết tiền rồi sao?) - khi thấy bạn mua đồ xịn?",
                    options: [
                        "这是我妈妈买的。 (Mẹ tớ mua đấy).",
                        "我刚发工资。 (Tớ vừa nhận lương).",
                        "对啊，我没钱。 (Đúng vậy, tớ hết tiền rồi - Vô lý vì đang mua đồ).",
                        "借朋友的。 (Mượn của bạn đấy)."
                    ],
                    correctAnswer: 2,
                    explanation: "Câu C sai logic hoàn cảnh vì thực tế người đó đang có tiền để mua đồ."
                },
                {
                    question: "Cấu trúc này có thể dùng để khen ngợi không?",
                    options: [
                        "Không, chỉ dùng để mắng.",
                        "Có. Ví dụ: '这个衣服不是很好看吗！' (Bộ này chẳng phải rất đẹp sao!).",
                        "Chỉ dùng để hỏi đường.",
                        "Chỉ dùng cho người lớn tuổi."
                    ],
                    correctAnswer: 1,
                    explanation: "Hoàn toàn có thể dùng để khen ngợi, đồng tình một cách mạnh mẽ."
                }
            ]
        },
        // --- BÀI MỚI SỐ 12 (HSK 2) ---
        {
            id: "hsk2_g12",
            title: "Đại từ nghi vấn phiếm chỉ (什么都..., 谁都...)",
            structure: "Đại từ nghi vấn (什么/谁/哪儿) + 都 / 也 + Động từ (Khẳng định/Phủ định)",
            pinyinStructure: "Question Word + dōu / yě + V",
            desc: "Khi kết hợp Đại từ nghi vấn với '都' (đều) hoặc '也' (cũng), chúng không còn dùng để hỏi nữa, mà dùng để NHẤN MẠNH sự bao quát toàn bộ (Không có ngoại lệ).\n- 什么都...: Cái gì cũng... (Tất cả mọi thứ)\n- 谁都...: Ai cũng... (Tất cả mọi người)\n- 哪儿都...: Đâu cũng... (Tất cả mọi nơi)",
            examples: [
                {
                    zh: "我什么都吃。",
                    py: "Wǒ shénme dōu chī.",
                    vi: "Tôi CÁI GÌ CŨNG ăn.",
                    note: "Khẳng định toàn bộ."
                },
                {
                    zh: "他谁都不认识。",
                    py: "Tā shéi dōu bù rènshi.",
                    vi: "Anh ấy KHÔNG QUEN AI CẢ.",
                    note: "Phủ định toàn bộ. Đặt 不 / 没 SAU 都/也."
                },
                {
                    zh: "周末我哪儿也没去。",
                    py: "Zhōumò wǒ nǎ'er yě méi qù.",
                    vi: "Cuối tuần tôi CHẢ ĐI ĐÂU CẢ."
                }
            ],
            commonMistakes: "Đặt sai vị trí từ phủ định. (VD SAI: 我不什么都吃 ❌ -> ĐÚNG: 我什么都不吃 ✅ - Tôi chả ăn cái gì cả). Phải đặt 不/没 ở ngay trước động từ chính.",
            tags: ["Đại từ", "Phiếm chỉ", "Nhấn mạnh", "Cấu trúc"],
            exercises: [
                {
                    question: "Dịch: 'Tôi không biết gì cả' sang tiếng Trung:",
                    options: [
                        "我不什么都知道。",
                        "我不知道什么都。",
                        "我什么都不知道。",
                        "什么我都不知道。"
                    ],
                    correctAnswer: 2,
                    explanation: "S (我) + Đại từ nghi vấn (什么) + 都 + Phủ định (不) + Động từ (知道)."
                },
                {
                    question: "Điền từ: 这个问题很简单，___ 都知道。 (Câu hỏi này rất đơn giản, AI cũng biết).",
                    options: ["什么", "哪儿", "怎么", "谁"],
                    correctAnswer: 3,
                    explanation: "Chỉ người (Ai cũng) -> dùng 谁 (shéi)."
                },
                {
                    question: "Câu '他哪儿都不想去' có nghĩa là:",
                    options: [
                        "Anh ấy muốn đi mọi nơi.",
                        "Anh ấy không muốn đi đâu cả.",
                        "Anh ấy muốn đi đâu?",
                        "Anh ấy không đi đâu cả đâu."
                    ],
                    correctAnswer: 1,
                    explanation: "哪儿都 + 不想去 = Đâu cũng + không muốn đi."
                },
                {
                    question: "Để nói 'Cửa hàng này cái gì cũng bán', ta nói:",
                    options: [
                        "这个商店什么都买。",
                        "这个商店什么都卖。",
                        "这个商店卖都什么。",
                        "什么这个商店都卖。"
                    ],
                    correctAnswer: 1,
                    explanation: "Bán là 卖 (mài). Cấu trúc: 商店 + 什么 + 都 + 卖."
                },
                {
                    question: "Chọn lỗi sai: '昨天我太累了，什么也吃没'。",
                    options: ["昨天", "太累了", "什么也", "吃没"],
                    correctAnswer: 3,
                    explanation: "Phủ định của quá khứ (没) phải đứng TRƯỚC động từ. Phải là: 什么也没吃 (Chả ăn cái gì cả)."
                },
                {
                    question: "Nếu muốn nói 'Tôi thích tất cả (cái gì cũng thích)', bạn dùng:",
                    options: [
                        "我喜欢什么都。",
                        "我什么喜欢都。",
                        "我什么都喜欢。",
                        "什么我喜欢都。"
                    ],
                    correctAnswer: 2,
                    explanation: "S + 什么都 + V."
                },
                {
                    question: "Trong cấu trúc này, có thể thay thế '都' bằng từ nào?",
                    options: ["很", "也", "就", "还"],
                    correctAnswer: 1,
                    explanation: "也 và 都 có thể dùng thay thế cho nhau trong cấu trúc phiếm chỉ này (VD: 什么都吃 = 什么也吃)."
                },
                {
                    question: "Điền từ vào chỗ trống: 今天我不舒服，___ 也不想做。 (Hôm nay tôi không khỏe, CHẢ MUỐN LÀM GÌ CẢ).",
                    options: ["谁", "怎么", "哪儿", "什么"],
                    correctAnswer: 3,
                    explanation: "Hành động 做 (làm) tác động lên sự vật/việc -> dùng 什么 (Cái gì)."
                },
                {
                    question: "Sắp xếp câu: 都 / 觉得 / 谁 / 他 / 很好",
                    options: [
                        "他谁都觉得很好。",
                        "谁觉得他都很好。",
                        "谁都觉得他很好。",
                        "觉得他谁都很好。"
                    ],
                    correctAnswer: 2,
                    explanation: "Chủ ngữ lớn (谁都 - ai cũng) + Động từ (觉得 - cảm thấy) + Mệnh đề nhỏ (他很好 - anh ấy rất tốt)."
                },
                {
                    question: "Khi nào thì dùng cấu trúc này?",
                    options: [
                        "Khi muốn hỏi một thông tin cụ thể.",
                        "Khi muốn nhấn mạnh sự bao quát 100% (không có ngoại lệ).",
                        "Khi muốn so sánh.",
                        "Khi muốn chỉ sự thay đổi."
                    ],
                    correctAnswer: 1,
                    explanation: "Đây là dạng câu khẳng định hoặc phủ định tuyệt đối (Tất cả đều... / Tất cả đều không...)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 13 (HSK 2) ---
        {
            id: "hsk2_g13",
            title: "Câu kiêm ngữ (请 / 让 / 叫)",
            structure: "Chủ ngữ 1 + 请 / 让 / 叫 + Tân ngữ 1 (Chủ ngữ 2) + Động từ 2 + (Tân ngữ 2)",
            pinyinStructure: "S1 + qǐng / ràng / jiào + O1 (S2) + V2 + (O2)",
            desc: "Dùng để biểu đạt việc ai đó YÊU CẦU, BẢO, hoặc MỜI ai đó làm gì. Gọi là 'kiêm ngữ' vì từ ở giữa (Tân ngữ 1) đóng 2 vai trò: Vừa là đối tượng bị yêu cầu (của S1), vừa là người trực tiếp thực hiện hành động (của V2).\n- 请 (qǐng): Mời (lịch sự).\n- 让 (ràng): Bảo / Để cho (trung tính, phổ biến nhất).\n- 叫 (jiào): Gọi / Bảo (khẩu ngữ, mệnh lệnh).",
            examples: [
                {
                    zh: "我请他吃饭。",
                    py: "Wǒ qǐng tā chī fàn.",
                    vi: "Tôi mời anh ấy ăn cơm.",
                    note: "他 vừa là người được mời, vừa là người ăn cơm."
                },
                {
                    zh: "妈妈让我去买苹果。",
                    py: "Māma ràng wǒ qù mǎi píngguǒ.",
                    vi: "Mẹ bảo tôi đi mua táo."
                },
                {
                    zh: "老师叫大家读书。",
                    py: "Lǎoshī jiào dàjiā dú shū.",
                    vi: "Thầy giáo bảo mọi người đọc sách."
                }
            ],
            commonMistakes: "Người Việt có thói quen dùng chữ '说' (nói) để dịch chữ 'bảo' (VD SAI: 妈妈说我去买苹果 ❌ - Mẹ nói tôi đi mua táo). Trong tiếng Trung, để SAI KHIẾN ai làm gì, bắt buộc dùng 让 hoặc 叫.",
            tags: ["Câu kiêm ngữ", "Cầu khiến", "Động từ"],
            exercises: [
                {
                    question: "Câu 'Giám đốc BẢO tôi ngày mai đi Bắc Kinh' dùng động từ nào là chính xác nhất?",
                    options: ["说 (shuō)", "问 (wèn)", "让 (ràng)", "给 (gěi)"],
                    correctAnswer: 2,
                    explanation: "Dùng '让' (ràng) để biểu thị mệnh lệnh/yêu cầu ai đó làm gì."
                },
                {
                    question: "Dịch câu: 'Tôi mời bạn xem phim'.",
                    options: [
                        "我请你看电影。",
                        "我让你看电影。",
                        "我叫你看电影。",
                        "我说你看电影。"
                    ],
                    correctAnswer: 0,
                    explanation: "Dùng 请 (mời) thể hiện sự lịch sự, đãi khách."
                },
                {
                    question: "Trong câu '医生让他多喝水', ai là người phải '多喝水' (uống nhiều nước)?",
                    options: [
                        "Bác sĩ (医生)",
                        "Anh ấy (他)",
                        "Cả hai người",
                        "Không ai cả"
                    ],
                    correctAnswer: 1,
                    explanation: "他 (Anh ấy) là kiêm ngữ, nhận mệnh lệnh từ Bác sĩ và là người phải thực hiện hành động Uống nước."
                },
                {
                    question: "Sắp xếp câu: 去 / 我 / 老师 / 叫 / 办公室",
                    options: [
                        "老师我去叫办公室。",
                        "老师叫办公室我去。",
                        "老师叫我去办公室。",
                        "我叫老师去办公室。"
                    ],
                    correctAnswer: 2,
                    explanation: "S1 (老师) + 叫 + O1/S2 (我) + V2 (去办公室). Thầy giáo bảo tôi đến văn phòng."
                },
                {
                    question: "Câu phủ định của câu kiêm ngữ đặt '不/没' ở đâu? (Ví dụ: Mẹ KHÔNG bảo tôi đi).",
                    options: [
                        "妈妈让我不去。",
                        "妈妈不让我去。",
                        "不妈妈让我去。",
                        "妈妈让我去不。"
                    ],
                    correctAnswer: 1,
                    explanation: "Từ phủ định đặt TRƯỚC động từ cầu khiến thứ nhất (让/叫). (Mẹ không cho phép/bảo tôi đi)."
                },
                {
                    question: "Động từ '叫' (jiào) trong HSK 1 nghĩa là 'Tên là/Gọi là', còn trong HSK 2 cấu trúc này nó nghĩa là gì?",
                    options: ["Kêu la.", "Bảo / Yêu cầu ai đó làm gì.", "Đánh thức.", "Hét lên."],
                    correctAnswer: 1,
                    explanation: "Trong câu kiêm ngữ, 叫 mang nghĩa là 'Bảo' (khẩu ngữ thường ngày)."
                },
                {
                    question: "Điền từ: 请 ___ 我想一想。(Xin hãy ĐỂ tôi suy nghĩ một chút).",
                    options: ["让", "给", "想", "看"],
                    correctAnswer: 0,
                    explanation: "让 ngoài nghĩa là 'bảo', còn có nghĩa là 'nhường / để cho' ai đó làm gì."
                },
                {
                    question: "Chọn lỗi sai: '哥哥说我给他买一杯茶。' (Anh trai bảo tôi mua cho anh ấy ly trà).",
                    options: ["说", "给", "买", "杯"],
                    correctAnswer: 0,
                    explanation: "Tuyệt đối không dùng '说' (nói) để ra lệnh. Phải đổi thành '让' hoặc '叫'."
                },
                {
                    question: "Dịch: 'Bố không cho (không để) tôi chơi điện thoại'.",
                    options: [
                        "爸爸不叫我玩手机。",
                        "爸爸不让我玩手机。",
                        "Cả hai câu đều đúng.",
                        "Cả hai câu đều sai."
                    ],
                    correctAnswer: 2,
                    explanation: "不让 hoặc 不叫 đều có nghĩa là 'không cho phép / không bảo' ai làm gì."
                },
                {
                    question: "Trong bữa tiệc, bạn nói '今天我请客' (Hôm nay tôi mời khách) tức là:",
                    options: [
                        "Bạn sẽ nấu ăn.",
                        "Bạn sẽ trả tiền (bao cả hội).",
                        "Bạn là khách.",
                        "Bạn đi về."
                    ],
                    correctAnswer: 1,
                    explanation: "请客 (qǐng kè) - Mời khách, ngầm hiểu là người nói sẽ chịu trách nhiệm thanh toán chi phí."
                }
            ]
        },
        // --- BÀI MỚI SỐ 14 (HSK 2) ---
        {
            id: "hsk2_g14",
            title: "Giới từ '离' (Cách - Khoảng cách)",
            structure: "A 离 B + (很) + 远 / 近",
            pinyinStructure: "A lí B + (hěn) + yuǎn / jìn",
            desc: "Dùng để biểu thị khoảng cách về không gian hoặc thời gian giữa 2 điểm. A và B có thể là Địa điểm hoặc Mốc thời gian.\n- 远 (yuǎn): Xa\n- 近 (jìn): Gần",
            examples: [
                {
                    zh: "我家离学校很远。",
                    py: "Wǒ jiā lí xuéxiào hěn yuǎn.",
                    vi: "Nhà tôi cách trường học rất xa."
                },
                {
                    zh: "火车站离这儿不近。",
                    py: "Huǒchēzhàn lí zhè'er bù jìn.",
                    vi: "Ga tàu hỏa cách đây không gần."
                },
                {
                    zh: "现在离春节还有一个月。",
                    py: "Xiànzài lí Chūnjié hái yǒu yí gè yuè.",
                    vi: "Bây giờ cách Tết Âm lịch vẫn còn 1 tháng.",
                    note: "Khoảng cách về thời gian."
                }
            ],
            commonMistakes: "Dùng từ chỉ khoảng cách trực tiếp (VD SAI: 我家远学校 ❌ -> ĐÚNG: 我家离学校很远 ✅). Bắt buộc phải có giới từ 离 đứng giữa 2 địa điểm.",
            tags: ["Giới từ", "Khoảng cách", "Địa điểm"],
            exercises: [
                {
                    question: "Câu 'Công ty cách nhà tôi rất gần' dịch là:",
                    options: [
                        "公司很近我家。",
                        "公司近离我家。",
                        "公司离我家很近。",
                        "我家离公司很远。"
                    ],
                    correctAnswer: 2,
                    explanation: "Cấu trúc: A (公司) + 离 + B (我家) + 很近 (rất gần)."
                },
                {
                    question: "Để HỎI KHOẢNG CÁCH 'Bệnh viện cách đây bao xa?', ta dùng câu nào?",
                    options: [
                        "医院离这儿多远？",
                        "医院离这儿多少远？",
                        "医院这儿离多远？",
                        "医院离这儿很远吗？"
                    ],
                    correctAnswer: 0,
                    explanation: "Hỏi bao xa dùng '多远' (duō yuǎn) đặt ở cuối câu."
                },
                {
                    question: "Điền từ: 离我的生日还有 ___ 天。(Cách sinh nhật của tôi còn 3 ngày nữa).",
                    options: ["三", "远", "近", "从"],
                    correctAnswer: 0,
                    explanation: "Sau cấu trúc 离... 还有... có thể kết hợp với con số thời gian cụ thể (3 ngày)."
                },
                {
                    question: "Chọn lỗi sai: '他家离北京远不远？'",
                    options: ["他家", "离", "北京", "Câu này KHÔNG sai."],
                    correctAnswer: 3,
                    explanation: "Câu hỏi chính phản của khoảng cách: A 离 B + 远不远 / 近不近？ (Cách có xa không / gần không?). Hoàn toàn đúng ngữ pháp."
                },
                {
                    question: "Từ '这儿' (zhè'er - ở đây) có thể dùng làm điểm B trong cấu trúc này không?",
                    options: [
                        "Không, B phải là một danh từ địa danh cụ thể.",
                        "Có. Ví dụ: 饭店离这儿很远 (Nhà hàng cách đây rất xa).",
                        "Chỉ dùng được ở điểm A.",
                        "Chỉ dùng khi hỏi."
                    ],
                    correctAnswer: 1,
                    explanation: "这儿 (đây) / 那儿 (kia) là các đại từ chỉ nơi chốn, hoàn toàn dùng được làm điểm mốc."
                },
                {
                    question: "Sắp xếp câu: 不太 / 离 / 远 / 超市 / 医院",
                    options: [
                        "超市不太远离医院。",
                        "离医院超市不太远。",
                        "超市离医院不太远。",
                        "远超市离医院不太。"
                    ],
                    correctAnswer: 2,
                    explanation: "A (超市) + 离 + B (医院) + Tính từ phủ định (不太远 - không xa lắm)."
                },
                {
                    question: "Dịch: 'Bây giờ cách giờ tan học còn 10 phút'.",
                    options: [
                        "现在十分钟离下课。",
                        "下课离现在十分钟。",
                        "现在离下课还有十分钟。",
                        "十分钟离现在下课。"
                    ],
                    correctAnswer: 2,
                    explanation: "Áp dụng cho thời gian: A (现在 - Bây giờ) + 离 + B (下课 - Tan học) + 还有 (vẫn còn) + Khoảng cách thời gian (十分钟 - 10 phút)."
                },
                {
                    question: "Cặp trái nghĩa của cấu trúc này là:",
                    options: [
                        "远 (yuǎn) - 大 (dà)",
                        "远 (yuǎn) - 近 (jìn)",
                        "高 (gāo) - 低 (dī)",
                        "长 (cháng) - 短 (duǎn)"
                    ],
                    correctAnswer: 1,
                    explanation: "远 là xa, 近 là gần."
                },
                {
                    question: "Câu 'A 离 B 走路十分钟' nghĩa là gì?",
                    options: [
                        "A cách B 10 mét.",
                        "A và B đều đi bộ 10 phút.",
                        "Từ A đến B đi bộ mất 10 phút.",
                        "A đi bộ nhanh hơn B 10 phút."
                    ],
                    correctAnswer: 2,
                    explanation: "Thay vì dùng 远/近, người ta có thể đo khoảng cách bằng thời gian di chuyển (走路十分钟 - đi bộ 10 phút)."
                },
                {
                    question: "Điền từ: 飞机场 ___ 市中心 (trung tâm thành phố) 远吗？",
                    options: ["在", "从", "去", "离"],
                    correctAnswer: 3,
                    explanation: "Hỏi về khoảng cách giữa 2 địa điểm, luôn dùng '离'."
                }
            ]
        },
        // --- BÀI MỚI SỐ 15 (HSK 2) ---
        {
            id: "hsk2_g15",
            title: "Giới từ '从... 到...' (Từ... Đến...)",
            structure: "从 + Điểm A + 到 + Điểm B",
            pinyinStructure: "Cóng + A + dào + B",
            desc: "Dùng để biểu thị điểm khởi đầu (从 - từ) và điểm kết thúc (到 - đến). Điểm A và B có thể là Thời gian hoặc Không gian (Địa điểm).",
            examples: [
                {
                    zh: "从北京到上海很远。",
                    py: "Cóng Běijīng dào Shànghǎi hěn yuǎn.",
                    vi: "Từ Bắc Kinh đến Thượng Hải rất xa.",
                    note: "Chỉ không gian (địa lý)."
                },
                {
                    zh: "从星期一到星期五，我都很忙。",
                    py: "Cóng xīngqīyī dào xīngqīwǔ, wǒ dōu hěn máng.",
                    vi: "Từ thứ Hai đến thứ Sáu, tôi đều rất bận.",
                    note: "Chỉ thời gian."
                },
                {
                    zh: "他从中国回来了。",
                    py: "Tā cóng Zhōngguó huí lai le.",
                    vi: "Anh ấy TỪ Trung Quốc về rồi.",
                    note: "Có thể chỉ dùng một vế '从 + Địa điểm + V' (Từ đâu làm gì/đến)."
                }
            ],
            commonMistakes: "Người Việt đôi khi nhầm lẫn giữa '从' (từ - chỉ điểm bắt đầu) và '离' (cách - chỉ khoảng cách). '从 A 到 B' nhấn mạnh vào một QUÁ TRÌNH trải dài.",
            tags: ["Giới từ", "Thời gian", "Không gian", "Quá trình"],
            exercises: [
                {
                    question: "Dịch: 'Từ 8 giờ sáng đến 5 giờ chiều'.",
                    options: [
                        "离上午八点离下午五点。",
                        "从上午八点到下午五点。",
                        "到上午八点从下午五点。",
                        "上午八点从下午五点到。"
                    ],
                    correctAnswer: 1,
                    explanation: "Cấu trúc: 从 + Mốc TG bắt đầu + 到 + Mốc TG kết thúc."
                },
                {
                    question: "Câu nào dưới đây dùng đúng?",
                    options: [
                        "从我家离学校很远。",
                        "我家从学校很远。",
                        "从我家到学校很远。",
                        "我家离到学校很远。"
                    ],
                    correctAnswer: 2,
                    explanation: "Từ nhà (A) đến trường (B) rất xa -> 从我家到学校很远. (Hoặc có thể dùng: 我家离学校很远)."
                },
                {
                    question: "Điền từ: ___ 前面一直走。(TỪ phía trước cứ đi thẳng).",
                    options: ["离", "在", "去", "从"],
                    correctAnswer: 3,
                    explanation: "Chỉ điểm xuất phát của hành động đi -> dùng 从 (Từ)."
                },
                {
                    question: "Trong câu '我从美国来' (Tôi đến từ Mỹ), chữ '从' đóng vai trò gì?",
                    options: [
                        "Động từ chính.",
                        "Giới từ chỉ xuất xứ / điểm bắt đầu.",
                        "Trợ từ.",
                        "Đại từ."
                    ],
                    correctAnswer: 1,
                    explanation: "Giới từ chỉ nơi xuất phát."
                },
                {
                    question: "Sắp xếp câu: 要 / 小时 / 从 / 到 / 广州 / 坐火车 / 三个 / 这里",
                    options: [
                        "从这里到广州坐火车要三个小时。",
                        "坐火车从这里要到广州三个小时。",
                        "三个小时要从这里到广州坐火车。",
                        "到广州从这里坐火车要三个小时。"
                    ],
                    correctAnswer: 0,
                    explanation: "Cụm 'Từ A đến B' (从这里到广州) + Phương thức (坐火车) + Động từ chi phí (要) + Thời lượng (三个小时)."
                },
                {
                    question: "Chọn lỗi sai: '离星期一到星期五，我们不上课。'",
                    options: ["离", "到", "我们", "不上课"],
                    correctAnswer: 0,
                    explanation: "Chỉ khoảng thời gian từ A đến B phải dùng '从', không được dùng '离'."
                },
                {
                    question: "Cấu trúc '从...开始' (cóng... kāishǐ) có nghĩa là gì?",
                    options: [
                        "Đến khi nào.",
                        "Bắt đầu TỪ... (một mốc thời gian/sự việc).",
                        "Kết thúc ở...",
                        "Luôn luôn."
                    ],
                    correctAnswer: 1,
                    explanation: "Ví dụ: 从明天开始，我不吃肉了 (Bắt đầu từ ngày mai, tôi không ăn thịt nữa)."
                },
                {
                    question: "Dịch: 'Bạn TỪ đâu đến?'",
                    options: [
                        "你从哪儿去？",
                        "你离哪儿来？",
                        "你到哪儿去？",
                        "你从哪儿来？"
                    ],
                    correctAnswer: 3,
                    explanation: "Từ đâu (从哪儿) + Đến/Tới (来)."
                },
                {
                    question: "Câu '从第一课到第十课' có nghĩa là:",
                    options: [
                        "Mười bài học.",
                        "Từ bài 1 đến bài 10.",
                        "Bài 1 cách bài 10.",
                        "Khó từ bài 1 đến bài 10."
                    ],
                    correctAnswer: 1,
                    explanation: "第一课 (Bài 1) và 第十课 (Bài 10) là điểm khởi đầu và kết thúc của một quá trình học."
                },
                {
                    question: "Có thể kết hợp 从...到... với các số từ đếm không? (VD: Từ 1 đến 100).",
                    options: [
                        "Không, chỉ dùng cho Địa điểm.",
                        "Không, chỉ dùng cho Thời gian.",
                        "Có. Ví dụ: 从一数到一百 (Đếm từ 1 đến 100).",
                        "Chỉ dùng khi tính tiền."
                    ],
                    correctAnswer: 2,
                    explanation: "Hoàn toàn có thể. Cấu trúc này biểu thị quá trình trải dài nên áp dụng được cho cả không gian, thời gian, con số."
                }
            ]
        },
        // --- BÀI MỚI SỐ 16 (HSK 2) ---
        {
            id: "hsk2_g16",
            title: "Liên từ nguyên nhân - kết quả '因为... 所以...'",
            structure: "因为 + Nguyên nhân, 所以 + Kết quả",
            pinyinStructure: "Yīnwèi + Reason, suǒyǐ + Result",
            desc: "Dùng để nối hai mệnh đề, chỉ ra mối quan hệ nhân - quả (Bởi vì... Cho nên...). Có thể dùng cả cặp, hoặc có thể lược bỏ một trong hai từ tùy ngữ cảnh giao tiếp.",
            examples: [
                {
                    zh: "因为下雨，所以我没去学校。",
                    py: "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù xuéxiào.",
                    vi: "Bởi vì trời mưa, cho nên tôi không đến trường."
                },
                {
                    zh: "因为我很累，就先去睡觉了。",
                    py: "Yīnwèi wǒ hěn lèi, jiù xiān qù shuìjiào le.",
                    vi: "Bởi vì tôi rất mệt, (nên) đi ngủ trước đây.",
                    note: "Có thể bỏ 所以 ở vế sau."
                }
            ],
            commonMistakes: "Dùng chung '因为' với '但是' (VD SAI: 因为天下雨，但是我不去). Nhân - Quả là một cặp, Nhượng bộ - Chuyển ngoặt (虽然...但是) là một cặp, tuyệt đối không được ghép chéo.",
            tags: ["Liên từ", "Nguyên nhân", "Kết quả"],
            exercises: [
                {
                    question: "Điền từ: ___ 身体不好，___ 他今天没去上班。",
                    options: ["因为 - 所以", "虽然 - 但是", "如果 - 就", "从 - 到"],
                    correctAnswer: 0,
                    explanation: "Bởi vì (Sức khỏe không tốt) -> Cho nên (Hôm nay không đi làm). Đây là quan hệ nhân quả."
                },
                {
                    question: "Câu '所以我学习汉语' (Cho nên tôi học tiếng Trung) có thể ghép với vế nào phía trước?",
                    options: [
                        "虽然汉语很难",
                        "因为我想去中国",
                        "明天不下雨",
                        "我有一个弟弟"
                    ],
                    correctAnswer: 1,
                    explanation: "Vế trước bắt buộc phải đưa ra lý do (因为...). Bởi vì tôi muốn đi TQ, nên tôi học tiếng Trung."
                },
                {
                    question: "Sắp xếp câu: 太贵了 / 没有买 / 因为 / 这个手机 / 所以 / 我",
                    options: [
                        "因为这个手机我没有买，所以太贵了。",
                        "因为太贵了，所以这个手机我没有买。",
                        "因为这个手机太贵了，所以我没有买。",
                        "所以我没有买，因为这个手机太贵了。"
                    ],
                    correctAnswer: 2,
                    explanation: "因为 + Lý do (Cái điện thoại này đắt quá), 所以 + Kết quả (Tôi không mua)."
                },
                {
                    question: "Trong văn nói, có thể LƯỢC BỎ phần nào trong cấu trúc này?",
                    options: [
                        "Không thể lược bỏ phần nào.",
                        "Chỉ có thể bỏ 因为.",
                        "Chỉ có thể bỏ 所以.",
                        "Có thể bỏ 因为 hoặc bỏ 所以 tùy ngữ cảnh."
                    ],
                    correctAnswer: 3,
                    explanation: "Cả 因为 và 所以 đều có thể đứng độc lập trong câu nếu ngữ cảnh đã ngầm cho biết vế còn lại."
                },
                {
                    question: "Chọn lỗi sai: '因为他很聪明，但是老师很喜欢他。'",
                    options: ["因为", "但是", "很", "喜欢"],
                    correctAnswer: 1,
                    explanation: "Bởi vì thông minh -> nên giáo viên thích (nhân quả). Không thể dùng '但是' (nhưng) ở đây, phải sửa thành '所以'."
                },
                {
                    question: "Dịch: 'Tôi không ăn cơm vì tôi không đói'.",
                    options: [
                        "我不吃饭，虽然我不饿。",
                        "我不吃饭，因为我不饿。",
                        "因为我不吃饭，所以我不饿。",
                        "我不吃饭，所以我不饿。"
                    ],
                    correctAnswer: 1,
                    explanation: "Vế chỉ nguyên nhân (không đói) đưa ra sau, dùng 因为."
                },
                {
                    question: "Điền từ: ___ 昨天没下雨，___ 我们去踢足球了。",
                    options: ["因为 - 所以", "虽然 - 但是", "不是 - 吗", "因为 - 但是"],
                    correctAnswer: 0,
                    explanation: "Nguyên nhân: Hôm qua không mưa. Kết quả: Đi đá bóng."
                },
                {
                    question: "Câu hỏi cho câu trả lời '因为我喜欢' (Bởi vì tôi thích) là gì?",
                    options: [
                        "你什么时候买的？",
                        "你为什么买这个？",
                        "你在哪儿买这个？",
                        "你买这个吗？"
                    ],
                    correctAnswer: 1,
                    explanation: "Trả lời bằng 因为 (bởi vì) thì câu hỏi phải dùng 为什么 (tại sao)."
                },
                {
                    question: "Câu nào sai logic?",
                    options: [
                        "因为他不学习，所以考得不好。",
                        "因为下雨，所以他不带伞。",
                        "因为我生病了，所以我想休息。",
                        "因为这是我的书，所以我可以看。"
                    ],
                    correctAnswer: 1,
                    explanation: "Trời mưa thì phải mang ô. Việc 'không mang ô' (不带伞) không thể là kết quả thuận logic của việc 'trời mưa' được."
                },
                {
                    question: "Chủ ngữ nên đặt ở đâu trong vế có '因为'?",
                    options: [
                        "Bắt buộc trước 因为.",
                        "Bắt buộc sau 因为.",
                        "Đứng trước hoặc sau 因为 đều được.",
                        "Không được có chủ ngữ."
                    ],
                    correctAnswer: 2,
                    explanation: "Ví dụ: '因为我喜欢' và '我因为喜欢' đều được chấp nhận."
                }
            ]
        },
        // --- BÀI MỚI SỐ 17 (HSK 2) ---
        {
            id: "hsk2_g17",
            title: "Hỏi nguyên nhân: '为什么' và '怎么'",
            structure: "Chủ ngữ + 为什么 + Động từ？ / Chủ ngữ + 怎么 + Động từ？",
            pinyinStructure: "S + wèi shénme + V? / S + zěnme + V?",
            desc: "Cả hai đều dùng để hỏi lý do, nhưng có sắc thái khác nhau:\n1. 为什么 (wèi shénme - Tại sao): Hỏi nguyên nhân một cách khách quan, trung tính.\n2. 怎么 (zěnme - Sao lại / Thế nào mà): Ngoài việc hỏi phương thức (làm thế nào), '怎么' khi hỏi nguyên nhân còn mang nặng thái độ ngạc nhiên, thắc mắc, khó hiểu trước một sự việc bất thường.",
            examples: [
                {
                    zh: "你为什么不吃饭？",
                    py: "Nǐ wèi shénme bù chī fàn?",
                    vi: "Tại sao bạn không ăn cơm?",
                    note: "Hỏi lý do bình thường (Có thể do bạn đau dạ dày, do bạn no...)."
                },
                {
                    zh: "你怎么没来？",
                    py: "Nǐ zěnme méi lái?",
                    vi: "Sao cậu lại không đến?",
                    note: "Thể hiện sự ngạc nhiên: Đã hẹn rồi cơ mà, sao lại không thấy mặt?"
                }
            ],
            commonMistakes: "Người mới học hay quên mất chức năng hỏi nguyên nhân của '怎么', chỉ nhớ nghĩa 'làm thế nào' (怎么做). Khi thấy '怎么 + V' mà dịch là 'làm thế nào' bị vô lý (VD: 怎么没去 - làm thế nào không đi? ❌), hãy đổi ngay sang nghĩa 'Sao lại' (Sao lại không đi?).",
            tags: ["Đại từ", "Câu hỏi", "Nguyên nhân", "Ngạc nhiên"],
            exercises: [
                {
                    question: "Dịch: 'Tại sao anh ấy thích học tiếng Trung?'",
                    options: [
                        "他怎么喜欢学汉语？",
                        "他喜欢学汉语为什么？",
                        "为什么他喜欢学汉语？",
                        "他什么喜欢学汉语？"
                    ],
                    correctAnswer: 2,
                    explanation: "Hỏi nguyên nhân trung tính dùng 为什么. Có thể đặt ở đầu câu hoặc ngay sau chủ ngữ."
                },
                {
                    question: "Câu '你怎么不高兴？' (Nǐ zěnme bù gāoxìng?) thể hiện thái độ gì?",
                    options: [
                        "Hỏi xem làm cách nào để không vui.",
                        "Tức giận vì đối phương không vui.",
                        "Ngạc nhiên, quan tâm: Sao cậu lại không vui thế? (Đang có chuyện gì tốt cơ mà).",
                        "Không quan tâm."
                    ],
                    correctAnswer: 2,
                    explanation: "Dùng 怎么 để hỏi nguyên nhân thường mang sắc thái ngạc nhiên, thắc mắc."
                },
                {
                    question: "Điền từ: ___ 他昨天没来上课？ (Hỏi lý do)",
                    options: ["怎么", "为什么", "什么", "Cả A và B đều được"],
                    correctAnswer: 3,
                    explanation: "Hỏi lý do anh ấy không đi học thì dùng 为什么 (hỏi khách quan) hay 怎么 (hỏi với sự ngạc nhiên) đều hợp lý về mặt ngữ pháp."
                },
                {
                    question: "Trong câu '这个字怎么读？' (Chữ này đọc thế nào?), chữ 怎么 mang nghĩa là:",
                    options: [
                        "Tại sao",
                        "Sao lại",
                        "Phương thức / Làm thế nào",
                        "Cái gì"
                    ],
                    correctAnswer: 2,
                    explanation: "Khi đi với động từ hành động như 读 (đọc), 做 (làm), 去 (đi), 怎么 mang nghĩa hỏi cách thức thực hiện (HSK 1)."
                },
                {
                    question: "Sắp xếp câu: 不 / 你 / 喝茶 / 为什么 / ？",
                    options: [
                        "不你为什么喝茶？",
                        "你不为什么喝茶？",
                        "你为什么不喝茶？",
                        "为什么你喝茶不？"
                    ],
                    correctAnswer: 2,
                    explanation: "Chủ ngữ (你) + 为什么 + Từ phủ định (不) + Động từ (喝茶)."
                },
                {
                    question: "Chọn cách đáp lại phù hợp cho câu: '你为什么学汉语？'",
                    options: [
                        "在学校学。",
                        "跟老师学。",
                        "因为我想去中国工作。",
                        "我学得很好。"
                    ],
                    correctAnswer: 2,
                    explanation: "Hỏi 为什么 (Tại sao) thì trả lời bằng 因为 (Bởi vì)."
                },
                {
                    question: "Câu '你怎么还不睡觉？' (Sao giờ này cậu VẪN CHƯA ngủ?) dùng 怎么 để làm gì?",
                    options: [
                        "Hỏi cách thức ngủ.",
                        "Hỏi nguyên nhân kèm theo sự thắc mắc/ngạc nhiên (Khuya rồi sao chưa ngủ).",
                        "Khẳng định người đó không ngủ.",
                        "Chào hỏi."
                    ],
                    correctAnswer: 1,
                    explanation: "Mang đậm sắc thái tu từ, thắc mắc trước một sự việc bất thường (thức quá khuya)."
                },
                {
                    question: "Từ nào có thể dùng để hỏi lý do giống như '为什么' nhưng ngắn gọn hơn trong khẩu ngữ?",
                    options: ["干嘛 (gàn má)", "怎么 (zěnme)", "Cả A và B", "什么 (shénme)"],
                    correctAnswer: 2,
                    explanation: "Trong văn nói, người ta rất hay dùng 怎么 (sao lại) hoặc 干嘛 (làm gì thế / sao thế) để hỏi lý do."
                },
                {
                    question: "Dịch: 'Sao bên ngoài lại mưa rồi?' (Ngạc nhiên vì vừa nãy còn nắng)",
                    options: [
                        "外面为什么下雨了？",
                        "外面怎么下雨了？",
                        "怎么外面下雨了？",
                        "Cả B và C đều được."
                    ],
                    correctAnswer: 3,
                    explanation: "怎么 có thể đứng trước hoặc sau chủ ngữ (外面) để thể hiện sự ngạc nhiên."
                },
                {
                    question: "Lỗi sai trong câu: '为什么你不高兴吗？'",
                    options: ["为什么", "你", "不高兴", "吗"],
                    correctAnswer: 3,
                    explanation: "为什么 đã là đại từ nghi vấn (Tại sao), nên tuyệt đối không được thêm trợ từ nghi vấn '吗' (Phải không) ở cuối câu."
                }
            ]
        },
        // --- BÀI MỚI SỐ 18 (HSK 2) ---
        {
            id: "hsk2_g18",
            title: "Bổ ngữ thời lượng (Khoảng thời gian)",
            structure: "Động từ + (了) + Khoảng thời gian",
            pinyinStructure: "V + (le) + Time Duration",
            desc: "Dùng để biểu thị một hành động kéo dài trong BAO LÂU (Khoảng thời gian: 2 tiếng, 3 ngày, 1 năm...). \nKhác với 'Thời điểm' (lúc 8 giờ, năm 2024) phải đứng TRƯỚC động từ, 'Thời lượng' (Khoảng thời gian) BẮT BUỘC phải đứng SAU động từ.",
            examples: [
                {
                    zh: "我睡了八个小时。",
                    py: "Wǒ shuì le bā gè xiǎoshí.",
                    vi: "Tôi đã ngủ 8 tiếng đồng hồ.",
                    note: "Động từ (睡) + 了 + Thời lượng (八个小时)."
                },
                {
                    zh: "他学了一年汉语。",
                    py: "Tā xué le yì nián Hànyǔ.",
                    vi: "Anh ấy đã học tiếng Trung 1 năm.",
                    note: "Nếu có tân ngữ (汉语): V + 了 + Thời lượng + (的) + Tân ngữ."
                },
                {
                    zh: "我等了你半天。",
                    py: "Wǒ děng le nǐ bàntiān.",
                    vi: "Tôi đã đợi bạn nửa ngày.",
                    note: "Nếu tân ngữ là Đại từ chỉ người (你, 他): V + Đại từ + Thời lượng."
                }
            ],
            commonMistakes: "Lỗi kinh điển của người Việt: Đặt khoảng thời gian lên trước động từ (VD SAI: 我两个小时看书 ❌ - giống ý nghĩa 'tôi lúc 2 giờ đọc sách' hơn). Nhớ kỹ: Thời điểm đứng trước, Thời lượng đứng sau.",
            tags: ["Bổ ngữ", "Thời gian", "Cấu trúc"],
            exercises: [
                {
                    question: "Cụm '三个小时' (3 tiếng đồng hồ) là Thời điểm hay Thời lượng?",
                    options: [
                        "Thời điểm (Lúc mấy giờ).",
                        "Thời lượng (Khoảng thời gian kéo dài).",
                        "Cả hai đều đúng.",
                        "Không phải thời gian."
                    ],
                    correctAnswer: 1,
                    explanation: "Nó chỉ độ dài của hành động (Bao lâu), nên nó là Thời lượng, phải đặt sau Động từ."
                },
                {
                    question: "Chọn câu viết ĐÚNG ngữ pháp:",
                    options: [
                        "我学习一年了。",
                        "我一年学习了。",
                        "学习我一年了。",
                        "一年我学习了。"
                    ],
                    correctAnswer: 0,
                    explanation: "Động từ (学习) + Thời lượng (一年) + 了."
                },
                {
                    question: "Khi có tân ngữ chỉ vật (书 - sách), cấu trúc nào ĐÚNG?",
                    options: [
                        "我看书三个小时。",
                        "我看了三个小时书。",
                        "我三个小时看书。",
                        "你看书三个小时了。"
                    ],
                    correctAnswer: 1,
                    explanation: "V + 了 + Thời lượng + Tân ngữ (看了三个小时书 - Đã đọc sách được 3 tiếng)."
                },
                {
                    question: "Dịch: 'Tôi đã đợi anh ấy 20 phút'.",
                    options: [
                        "我等二十分钟他。",
                        "我二十分钟等他。",
                        "我等了他二十分钟。",
                        "我等他了二十分钟。"
                    ],
                    correctAnswer: 2,
                    explanation: "Khi tân ngữ là Đại từ (他), trật tự phải là: V (等) + 了 + Đại từ (他) + Thời lượng (二十分钟)."
                },
                {
                    question: "Sự khác biệt giữa '我学了一年汉语' và '我学了一年汉语了' (có thêm chữ 了 ở cuối) là gì?",
                    options: [
                        "Không có gì khác biệt.",
                        "Câu 1: Học 1 năm nhưng giờ không học nữa. Câu 2: Đã học được 1 năm và BÂY GIỜ VẪN ĐANG HỌC.",
                        "Câu 1 là tương lai, câu 2 là quá khứ.",
                        "Câu 2 sai ngữ pháp."
                    ],
                    correctAnswer: 1,
                    explanation: "Chữ 了 thứ 2 ở cuối câu biểu thị hành động vẫn còn tiếp diễn cho đến hiện tại."
                },
                {
                    question: "Để hỏi về THỜI LƯỢNG (Bao lâu), ta dùng từ để hỏi nào?",
                    options: [
                        "什么时候 (shénme shíhou)",
                        "几点 (jǐ diǎn)",
                        "多长时间 (duō cháng shíjiān)",
                        "怎么 (zěnme)"
                    ],
                    correctAnswer: 2,
                    explanation: "多长时间 (Bao lâu) chuyên dùng để hỏi khoảng thời gian kéo dài của hành động."
                },
                {
                    question: "Sắp xếp câu: 玩 / 手机 / 了 / 两个小时 / 弟弟",
                    options: [
                        "弟弟玩两个小时手机了。",
                        "弟弟玩了手机两个小时。",
                        "弟弟玩了两个小时手机。",
                        "弟弟两个小时玩手机了。"
                    ],
                    correctAnswer: 2,
                    explanation: "S (弟弟) + V (玩) + 了 + Thời lượng (两个小时) + O (手机)."
                },
                {
                    question: "Từ nào dưới đây là Thời điểm (đứng trước động từ), KHÔNG PHẢI Thời lượng?",
                    options: [
                        "三天 (3 ngày)",
                        "星期三 (Thứ Tư)",
                        "半年 (Nửa năm)",
                        "两个月 (2 tháng)"
                    ],
                    correctAnswer: 1,
                    explanation: "星期三 (Thứ Tư) là mốc thời gian cụ thể (thời điểm), phải đứng trước hành động. Các từ còn lại là khoảng thời gian kéo dài (thời lượng)."
                },
                {
                    question: "Có một cách khác để nói '我看书看了一个小时' (Tôi đọc sách 1 tiếng), đó là cách nào?",
                    options: [
                        "我看书一个小时了。",
                        "我看了书一个小时。",
                        "我一个小时看书了。",
                        "我看了这书一个小时。"
                    ],
                    correctAnswer: 0,
                    explanation: "Ngoài cách chèn thời lượng vào giữa V và O (看了一个小时书), ta có thể lặp lại động từ: 看书(V1) + 看(V2) + 了 + 一个小时."
                },
                {
                    question: "Điền từ: 昨天晚上下雨下 ___ 两个小时。 (Đêm qua mưa suốt 2 tiếng).",
                    options: ["了", "的", "过", "着"],
                    correctAnswer: 0,
                    explanation: "Hành động đã xảy ra và kéo dài trong quá khứ, dùng 了 nối giữa V và Thời lượng."
                }
            ]
        },
        // --- BÀI MỚI SỐ 19 (HSK 2) ---
        {
            id: "hsk2_g19",
            title: "Phó từ '再' và '又' (Lại / Nữa)",
            structure: "再 / 又 + Động từ",
            pinyinStructure: "zài / yòu + V",
            desc: "Cả hai đều biểu thị sự lặp lại của hành động (dịch là 'Lại...'). Tuy nhiên, sự khác biệt là cực kỳ lớn:\n1. 再 (zài): Dùng cho sự lặp lại CHƯA XẢY RA (sẽ lặp lại trong tương lai hoặc là lời khuyên/yêu cầu).\n2. 又 (yòu): Dùng cho sự lặp lại ĐÃ XẢY RA (trong quá khứ).",
            examples: [
                {
                    zh: "欢迎下次再来！",
                    py: "Huānyíng xià cì zài lái!",
                    vi: "Hoan nghênh lần sau LẠI đến!",
                    note: "Hành động đến chơi (来) sẽ lặp lại ở lần sau (tương lai) -> Dùng 再."
                },
                {
                    zh: "他今天又迟到了。",
                    py: "Tā jīntiān yòu chídào le.",
                    vi: "Hôm nay anh ấy LẠI đến muộn rồi.",
                    note: "Hành động đến muộn đã xảy ra rồi (quá khứ) -> Dùng 又."
                }
            ],
            commonMistakes: "Người Việt chỉ có một chữ 'lại' nên hay dùng lẫn lộn. (VD SAI: 昨天他再来了 ❌ -> ĐÚNG: 昨天他又来了 ✅ - Hôm qua anh ấy lại đến). Hãy nhớ: Quá khứ = 又, Tương lai = 再.",
            tags: ["Phó từ", "Lặp lại", "Khó nhầm lẫn"],
            exercises: [
                {
                    question: "Điền từ: 明天我 ___ 来看你。 (Ngày mai tôi LẠI đến thăm bạn).",
                    options: ["又", "再", "还", "也"],
                    correctAnswer: 1,
                    explanation: "Ngày mai (明天) là tương lai, hành động chưa xảy ra nên dùng 再."
                },
                {
                    question: "Điền từ: 昨天去商店，今天他 ___ 去商店了。 (Hôm qua đi cửa hàng, hôm nay anh ấy LẠI đi cửa hàng rồi).",
                    options: ["又", "再", "都", "就"],
                    correctAnswer: 0,
                    explanation: "Hành động 'đi' của ngày hôm nay đã xảy ra rồi (có chữ 了 ở cuối), lặp lại việc của hôm qua -> dùng 又."
                },
                {
                    question: "Trong từ '再见' (zàijiàn - Tạm biệt / Hẹn gặp lại), chữ '再' mang nghĩa là gì?",
                    options: [
                        "Tạm thời.",
                        "Sẽ lặp lại việc gặp mặt (见) trong tương lai.",
                        "Không gặp nữa.",
                        "Rất vui."
                    ],
                    correctAnswer: 1,
                    explanation: "再见 dịch word-by-word là 'Lại gặp' (Hẹn tương lai gặp lại)."
                },
                {
                    question: "Câu '他又买了一个苹果' có nghĩa là:",
                    options: [
                        "Anh ấy sẽ mua thêm 1 quả táo.",
                        "Anh ấy đã mua thêm 1 quả táo nữa rồi.",
                        "Anh ấy không mua táo.",
                        "Anh ấy lại không mua táo."
                    ],
                    correctAnswer: 1,
                    explanation: "又 + 买 + 了: Hành động lặp lại (mua thêm) ĐÃ XẢY RA."
                },
                {
                    question: "Khi giáo viên nói '请再说一次' (Qǐng zài shuō yí cì - Xin nói lại một lần nữa), tại sao dùng 再?",
                    options: [
                        "Vì học sinh đã nói sai trong quá khứ.",
                        "Vì giáo viên yêu cầu học sinh thực hiện hành động nói lặp lại ở NGAY SAU ĐÓ (Tương lai gần).",
                        "Vì 再 đi với 请.",
                        "Vì 又 chỉ dùng cho người."
                    ],
                    correctAnswer: 1,
                    explanation: "Câu cầu khiến (đề nghị ai làm gì) thì hành động đó chưa diễn ra, nên phải dùng 再."
                },
                {
                    question: "Chọn câu viết SAI ngữ pháp:",
                    options: [
                        "你怎么又没做作业？",
                        "我不想再看了。",
                        "明天他又要走了。",
                        "昨天我再去学校了。"
                    ],
                    correctAnswer: 3,
                    explanation: "昨天 (Hôm qua) là quá khứ, không thể đi cùng với 再. Phải sửa thành 昨天我又去学校了."
                },
                {
                    question: "Có thể dùng '又' cho việc chưa xảy ra không?",
                    options: [
                        "Không bao giờ.",
                        "Có, nhưng chỉ khi dự đoán một sự lặp lại chắc chắn sẽ xảy ra (thường mang ý phàn nàn). VD: 明天又要下雨了 (Mai LẠI sắp mưa rồi).",
                        "Chỉ dùng trong câu hỏi.",
                        "Có, dùng thay thế hoàn toàn cho 再."
                    ],
                    correctAnswer: 1,
                    explanation: "Trường hợp đặc biệt, 又...了 có thể dùng cho tương lai nếu đó là một sự việc có tính chu kỳ/quy luật và người nói biết chắc nó sẽ lặp lại (thường là than vãn: Lại sắp thứ Hai rồi!)."
                },
                {
                    question: "Dịch: 'Món này ngon quá, tôi muốn ăn thêm bát nữa'.",
                    options: [
                        "很好吃，我想又吃一碗。",
                        "很好吃，我想再吃一碗。",
                        "很好吃，我又想吃一碗。",
                        "很好吃，我再想吃一碗。"
                    ],
                    correctAnswer: 1,
                    explanation: "Mong muốn làm gì đó trong tương lai (ăn thêm) -> dùng 再. (想再吃)."
                },
                {
                    question: "Điền từ: 昨天买的书我没看懂，今天 ___ 看了一次，可是 ___ 没懂。(Sách hôm qua mua đọc không hiểu, hôm nay LẠI đọc thêm lần nữa, nhưng VẪN chưa hiểu).",
                    options: ["再 - 又", "又 - 再", "又 - 还", "再 - 还"],
                    correctAnswer: 2,
                    explanation: "Hôm nay đã đọc rồi (quá khứ) -> 又看了一次. Nhưng VẪN (tiếp diễn trạng thái không hiểu) -> 还没懂."
                },
                {
                    question: "Trong cấu trúc 先... 再... (Trước tiên... Sau đó...), chữ 再 đóng vai trò gì?",
                    options: [
                        "Chỉ sự lặp lại.",
                        "Chỉ trình tự hành động (sau khi làm việc A thì MỚI làm việc B ở tương lai).",
                        "Chỉ quá khứ.",
                        "Chỉ lý do."
                    ],
                    correctAnswer: 1,
                    explanation: "Ví dụ: 我们先吃饭，再去看电影 (Chúng ta ăn cơm trước, LÁT NỮA / SAU ĐÓ đi xem phim)."
                }
            ]
        },
        // --- BÀI MỚI SỐ 20 (HSK 2) ---
        {
            id: "hsk2_g20",
            title: "Giới từ '对' (Đối với / Với)",
            structure: "A + 对 + B + Động từ / Tính từ",
            pinyinStructure: "A + duì + B + V / Adj",
            desc: "Giới từ '对' (duì) dùng để chỉ ra ĐỐI TƯỢNG (B) chịu sự tác động của thái độ, hành động hoặc tính chất từ chủ thể (A). \nDịch sang tiếng Việt thường là 'đối với' hoặc 'với'.",
            examples: [
                {
                    zh: "老师对学生很好。",
                    py: "Lǎoshī duì xuésheng hěn hǎo.",
                    vi: "Giáo viên ĐỐI VỚI học sinh rất tốt.",
                    note: "Biểu thị thái độ của A đối với B."
                },
                {
                    zh: "吃苹果对身体很好。",
                    py: "Chī píngguǒ duì shēntǐ hěn hǎo.",
                    vi: "Ăn táo rất tốt CHO sức khỏe.",
                    note: "Biểu thị tác dụng (có lợi/có hại) đối với cái gì đó."
                },
                {
                    zh: "他对我说：“谢谢！”",
                    py: "Tā duì wǒ shuō: “Xièxiè!”",
                    vi: "Anh ấy nói VỚI tôi: 'Cảm ơn!'",
                    note: "Biểu thị hướng của hành động (Nói với ai, Cười với ai)."
                }
            ],
            commonMistakes: "Do thói quen tiếng Việt, người học hay đặt '对' ở cuối (VD SAI: 老师很好对学生 ❌). Hãy nhớ quy tắc: Cụm giới từ (对 + Đối tượng) BẮT BUỘC phải đứng TRƯỚC tính từ hoặc động từ.",
            tags: ["Giới từ", "Đối tượng", "Giao tiếp"],
            exercises: [
                {
                    question: "Câu 'Uống nhiều nước rất tốt cho sức khỏe' dịch sang tiếng Trung là:",
                    options: [
                        "多喝水很好对身体。",
                        "多喝水对身体很好。",
                        "对身体多喝水很好。",
                        "多喝水身体很好对。"
                    ],
                    correctAnswer: 1,
                    explanation: "Chủ ngữ (多喝水 - Uống nhiều nước) + 1 cụm giới từ (对身体 - Đối với cơ thể) + Tính từ (很好 - rất tốt)."
                },
                {
                    question: "Điền từ: 妈妈 ___ 我说：“早点睡觉吧！” (Mẹ nói VỚI tôi...)",
                    options: ["和", "跟", "对", "Cả B và C đều được"],
                    correctAnswer: 3,
                    explanation: "Khi biểu thị 'nói với ai đó', có thể dùng '跟我说' hoặc '对我说' đều được."
                },
                {
                    question: "Sắp xếp câu: 对 / 不太好 / 眼睛 / 看手机 / 经常",
                    options: [
                        "经常看手机对眼睛不太好。",
                        "对眼睛经常看手机不太好。",
                        "经常看手机不太好对眼睛。",
                        "不太好经常看手机对眼睛。"
                    ],
                    correctAnswer: 0,
                    explanation: "S (经常看手机 - thường xuyên xem điện thoại) + 对 + B (眼睛 - mắt) + Adj (不太好 - không tốt lắm)."
                },
                {
                    question: "Trong câu '他对我很热情' (Anh ấy rất nhiệt tình với tôi), chữ '对' dùng để làm gì?",
                    options: [
                        "Chỉ hướng chuyển động.",
                        "Chỉ thái độ của một người đối với người khác.",
                        "Chỉ sự đúng đắn (Đúng/Sai).",
                        "Chỉ thời gian."
                    ],
                    correctAnswer: 1,
                    explanation: "Biểu thị thái độ cư xử (nhiệt tình, tốt bụng, khắt khe...) của A đối với B."
                },
                {
                    question: "Chọn lỗi sai: '这个药很好对我的病。'",
                    options: ["这个药", "很好", "对", "我的病"],
                    correctAnswer: 2,
                    explanation: "Cụm '对我的病' phải đưa lên TRƯỚC tính từ '很好'. Sửa thành: 这个药对我的病很好 (Thuốc này rất tốt cho bệnh của tôi)."
                },
                {
                    question: "Câu '我对北京很了解' có nghĩa là:",
                    options: [
                        "Tôi không biết Bắc Kinh.",
                        "Tôi hiểu rất rõ về Bắc Kinh.",
                        "Bắc Kinh rất hiểu tôi.",
                        "Tôi muốn đi Bắc Kinh."
                    ],
                    correctAnswer: 1,
                    explanation: "A (Tôi) + 对 (đối với) + B (Bắc Kinh) + V (很了解 - rất hiểu rõ/am hiểu)."
                },
                {
                    question: "Đâu là câu phủ định ĐÚNG của cấu trúc này?",
                    options: [
                        "吃太多肉对身体不好。",
                        "吃太多肉不对身体好。",
                        "吃太多肉对不身体好。",
                        "不吃太多肉对身体好。"
                    ],
                    correctAnswer: 0,
                    explanation: "Từ phủ định (不/没) thường đặt trước tính từ/động từ chính (不好). Có một số ít trường hợp đặt trước 对 (不对他好), nhưng phổ biến nhất vẫn là đặt ở vị ngữ (对身体不好 - Không tốt cho sức khỏe)."
                },
                {
                    question: "Điền từ: 每天跑步 ___ 减肥有帮助。(Chạy bộ mỗi ngày CÓ ích CHOn việc giảm cân).",
                    options: ["为", "给", "对", "让"],
                    correctAnswer: 2,
                    explanation: "Cấu trúc 对...有帮助 (Có sự giúp ích / Có ích đối với việc gì đó)."
                },
                {
                    question: "Chữ '对' trong cấu trúc này khác với chữ '对' trong câu '你说得对' (Bạn nói đúng) như thế nào?",
                    options: [
                        "Giống hệt nhau.",
                        "Chữ trước là Giới từ (Đối với), chữ sau là Tính từ (Đúng).",
                        "Chữ trước là Tính từ, chữ sau là Giới từ.",
                        "Chữ trước là Động từ, chữ sau là Danh từ."
                    ],
                    correctAnswer: 1,
                    explanation: "Trong tiếng Trung, 1 từ có thể có nhiều từ loại. 对 có thể là Tính từ (Đúng/Chính xác), cũng có thể là Giới từ (Đối với)."
                },
                {
                    question: "Dịch: 'Giáo viên cười với tôi'.",
                    options: [
                        "老师笑对我。",
                        "老师对我笑。",
                        "对老师我笑。",
                        "我笑对老师。"
                    ],
                    correctAnswer: 1,
                    explanation: "A (老师) + 对 + B (我) + Hành động (笑 - cười). Hướng hành động về phía người khác."
                }
            ]
        }

    ]
};