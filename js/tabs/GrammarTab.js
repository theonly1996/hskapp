// =========================================================================
// TAB: NGỮ PHÁP (GRAMMAR TAB)
// =========================================================================
const GrammarTab = ({ activeLevel }) => {
    const grammarDatabase = {
        1: [
            {
                title: "Câu chữ '是' (Thì, là, ở)",
                structure: "A + 是 + B",
                desc: "Dùng để biểu thị quan hệ tương đương, khẳng định hoặc giải thích đặc trưng giữa chủ ngữ và tân ngữ.",
                example: "我是学生。 (Wǒ shì xuésheng.) - Tôi là học sinh."
            },
            {
                title: "Định ngữ kết hợp trợ từ '的'",
                structure: "Định ngữ + 的 + Trung tâm ngữ (Danh từ)",
                desc: "Trợ từ '的' dùng để biểu đạt mối quan hệ sở hữu hoặc bổ nghĩa, làm rõ tính chất cho danh từ chính đứng sau.",
                example: "我的电脑。 (Wǒ de diànnǎo.) - Máy tính của tôi."
            },
            {
                title: "Phó từ phủ định '不' (Không)",
                structure: "不 + Động từ / Tính từ",
                desc: "Dùng phủ định một hành động ở hiện tại, tương lai hoặc phủ định một tính chất, trạng thái.",
                example: "他不吃肉。 (Tā bù chī ròu.) - Anh ấy không ăn thịt."
            }
        ],
        2: [
            {
                title: "Quan hệ nhân quả '因为...所以...'",
                structure: "因为 + Nguyên nhân, 所以 + Kết quả",
                desc: "Dùng kết nối hai vế câu biểu đạt quan hệ nguyên nhân và kết quả một cách mạch lạc.",
                example: "因为今天下雨，所以我们没去公园。 (Yīnwèi jīntiān xià yǔ, suǒyǐ wǒmen méi qù gōngyuán.) - Vì hôm nay trời mưa, nên chúng tôi không đi công viên."
            },
            {
                title: "Cấu trúc so sánh hơn với '比'",
                structure: "A + 比 + B + Tính từ",
                desc: "Dùng để so sánh sự khác biệt về mức độ tính chất giữa chủ thể A và B.",
                example: "他比我高。 (Tā bǐ wǒ gāo.) - Anh ấy cao hơn tôi."
            },
            {
                title: "Động thái trợ từ '过' (Đã từng)",
                structure: "Động từ + 过",
                desc: "Biểu thị một hành động hoặc trải nghiệm đã từng xảy ra trong quá khứ và nay đã kết thúc hoàn toàn.",
                example: "我去过北京。 (Wǒ qùguo Běijīng.) - Tôi đã từng đi Bắc Kinh."
            }
        ],
        3: [
            {
                title: "Câu chữ '把' (Câu chủ động xử lý)",
                structure: "Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (Kết quả/Xu hướng)",
                desc: "Nhấn mạnh sự tác động, xử lý của hành động lên một đối tượng xác định và mang lại một kết quả cụ thể.",
                example: "请把书放在桌子上。 (Qǐng bǎ shū fàng zài zhuōzi shàng.) - Hãy đặt cuốn sách ở trên bàn."
            },
            {
                title: "So sánh không bằng với '没有'",
                structure: "A + 没有 + B + Tính từ",
                desc: "Biểu thị chủ thể A không đạt đến mức độ tính chất như chủ thể B.",
                example: "今天没有昨天热。 (Jīntiān méiyǒu zuótiān rè.) - Hôm nay không nóng bằng hôm qua."
            },
            {
                title: "Trạng thái tiếp diễn với trợ từ '着'",
                structure: "Động từ + 着",
                desc: "Dùng miêu tả trạng thái đang được duy trì liên tục hoặc một hành động đang được tiến hành song hành.",
                example: "门开着呢。 (Mén kāizhe ne.) - Cửa đang mở đấy."
            }
        ],
        4: [
            {
                title: "Cấu trúc nhấn mạnh '是...的'",
                structure: "是 + [Thời gian/Địa điểm/Phương thức] + Động từ + 的",
                desc: "Nhấn mạnh các chi tiết cụ thể của một sự việc đã xảy ra trong quá khứ.",
                example: "我们是去年认识的。 (Wǒmen shì qùnián rènshi de.) - Chúng tôi quen nhau từ năm ngoái."
            },
            {
                title: "Liên từ tăng tiến 'Không những... mà còn...'",
                structure: "不但 / 不仅... 而且... / 也...",
                desc: "Biểu thị mối quan hệ phát triển, tăng tiến mức độ giữa hai vế câu.",
                example: "他不仅会说汉语，还会说英语。 (Tā bùjǐn huì shuō Hànyǔ, hái huì shuō Yīngyǔ.) - Anh ấy không những biết nói tiếng Trung, mà còn biết nói tiếng Anh."
            }
        ],
        5: [
            {
                title: "Giả thuyết nhượng bộ 'Cho dù... cũng...'",
                structure: "即使 / 哪怕... 也 / 还...",
                desc: "Đặt ra một trường hợp giả thuyết mang tính cực đoan, nhưng kết quả vế sau vẫn không đổi.",
                example: "即使明天不下雨，我也不去。 (Jíshǐ míngtiān bù xià yǔ, wǒ yě bú qù.) - Cho dù ngày mai không mưa, tôi cũng không đi."
            }
        ],
        6: [
            {
                title: "Cấu trúc lựa chọn 'Thay vì... thà rằng...'",
                structure: "与其... 不如... / 宁可...",
                desc: "So sánh giữa hai phương án hành động, loại bỏ phương án đầu để lựa chọn phương án thứ hai tốt hơn.",
                example: "与其坐着等，不如我们现在就走。 (Yǔqí zuòzhe děng, bùrú wǒmen xiànzài jiù zǒu.) - Thay vì ngồi chờ đợi, chi bằng chúng ta đi ngay bây giờ."
            }
        ]
    };

    const activeGrammar = grammarDatabase[activeLevel] || grammarDatabase[1];

    return (
        <div className="animate-fade-in space-y-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                    <i className="fas fa-layer-group text-teal-600"></i> Ngữ pháp trọng tâm HSK {activeLevel}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tổng hợp các cấu trúc ngữ pháp quan trọng nhất thường xuyên xuất hiện ở cấp độ HSK {activeLevel}.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {activeGrammar.map((g, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border dark:border-slate-800/85 shadow-sm space-y-3">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                            <span className="w-5 h-5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 text-[10px] rounded-full flex items-center justify-center font-bold">
                                {idx + 1}
                            </span>
                            {g.title}
                        </h4>
                        <div className="p-3 bg-teal-50/50 dark:bg-teal-950/10 border border-dashed border-teal-100 dark:border-teal-900/40 rounded-2xl">
                            <span className="text-[10px] uppercase font-extrabold text-teal-600 dark:text-teal-400 block mb-1 tracking-wider">Cấu trúc mẫu</span>
                            <p className="font-bold text-sm text-teal-700 dark:text-teal-400">{g.structure}</p>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Cách dùng & Chú giải:</span>
                            {g.desc}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Ví dụ minh họa</span>
                            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{g.example.split(' - ')[0]}</p>
                            <p className="text-slate-500 dark:text-slate-400 font-semibold">{g.example.split(' - ')[1]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};