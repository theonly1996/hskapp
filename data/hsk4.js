/**
 * HSKPro Application - HSK 4 Vocabulary Module
 * Filepath: hskproapp/js/hsk4.js
 * Chứa 50 từ vựng cốt lõi đầu tiên của HSK 4 kèm ví dụ và mẹo nhớ trực quan.
 */

window.hskData = [
    { 
        "id": 1, 
        "word": "爱情", 
        "pinyin": "àiqíng", 
        "meaning": "tình yêu", 
        "example": "这是真诚的爱情 (Zhè shì zhēnchéng de àiqíng) - Đây là tình yêu chân thành", 
        "tip": "Ghép từ Ái (爱 - yêu) và Tình (情 - tình cảm, có bộ Tâm đứng 忄). Tình yêu đích thực xuất phát từ sâu thẳm con tim." 
    },
    { 
        "id": 2, 
        "word": "安排", 
        "pinyin": "ānpái", 
        "meaning": "sắp xếp, công việc", 
        "example": "听从老师的安排 (Tīngcóng lǎoshī de ānpái) - Nghe theo sự sắp xếp của thầy cô", 
        "tip": "Chữ Bài (排) có bộ Thủ (扌- tay). Sắp xếp, bài trí công việc ngăn nắp cần dùng đến đôi bàn tay làm việc." 
    },
    { 
        "id": 3, 
        "word": "安全", 
        "pinyin": "ānquán", 
        "meaning": "an toàn", 
        "example": "注意安全 (Zhùyì ānquán) - Chú ý an toàn", 
        "tip": "An (安) là dưới mái nhà (宀) có người phụ nữ (女) thì yên bình. Toàn (全) là vua (王) đội nón bảo hộ bảo vệ giang sơn." 
    },
    { 
        "id": 4, 
        "word": "按时", 
        "pinyin": "ànshí", 
        "meaning": "đúng giờ", 
        "example": "按时吃药 (Ànshí chī yào) - Uống thuốc đúng giờ", 
        "tip": "Án (按) có bộ Thủ (扌- tay), đè tay ấn nút căn chỉnh đúng thời gian (时) quy định." 
    },
    { 
        "id": 5, 
        "word": "按照", 
        "pinyin": "ànzhào", 
        "meaning": "dựa theo, căn cứ vào", 
        "example": "按照规定 (Ànzhào guīdìng) - Dựa theo quy định", 
        "tip": "Chiếu (照) có bộ Hỏa (灬) chiếu sáng bên dưới giúp nhìn rõ để dựa theo thực hiện." 
    },
    { 
        "id": 6, 
        "word": "百分之", 
        "pinyin": "bǎifēnzhī", 
        "meaning": "phần trăm", 
        "example": "百分之百 (Bǎifēnzhī bǎi) - Một trăm phần trăm", 
        "tip": "Bách (百 - trăm) phân (分 - phân chia) chi (之 - của). Nghĩa đen là phân chia của một trăm." 
    },
    { 
        "id": 7, 
        "word": "棒", 
        "pinyin": "bàng", 
        "meaning": "tuyệt vời, giỏi", 
        "example": "你真棒！(Nǐ zhēn bàng!) - Bạn thật tuyệt vời!", 
        "tip": "Có bộ Mộc (木) và chữ Phụng (奉). Chiếc gậy gỗ tôn vinh dành để thưởng cho người giỏi nhất." 
    },
    { 
        "id": 8, 
        "word": "包子", 
        "pinyin": "bāozi", 
        "meaning": "bánh bao", 
        "example": "吃包子 (Chī bāozi) - Ăn bánh bao", 
        "tip": "Chữ Bao (包) giống như bàn tay đang bọc cuộn lấy nhân bánh tròn trịa bên trong." 
    },
    { 
        "id": 9, 
        "word": "保护", 
        "pinyin": "bǎohù", 
        "meaning": "bảo vệ", 
        "example": "保护环境 (Bǎohù huánjìng) - Bảo vệ môi trường", 
        "tip": "Hộ (护) có bộ Thủ (扌- tay), dùng bàn tay che chở bảo vệ ngôi nhà (hộ 户) khỏi giông bão." 
    },
    { 
        "id": 10, 
        "word": "保证", 
        "pinyin": "bǎozhèng", 
        "meaning": "bảo đảm, cam đoan", 
        "example": "我保证完成任务 (Wǒ bǎozhèng wánchéng rènwu) - Tôi bảo đảm hoàn thành nhiệm vụ", 
        "tip": "Chứng (证) có bộ Ngôn (讠), dùng lời nói danh dự của bản thân để cam đoan, bảo chứng." 
    },
    { 
        "id": 11, 
        "word": "抱", 
        "pinyin": "bào", 
        "meaning": "ôm, bế", 
        "example": "抱抱孩子 (Bàobao háizi) - Ôm đứa trẻ", 
        "tip": "Có bộ Thủ (扌- tay) và chữ Bao (包). Dùng hai cánh tay bao bọc lấy đối phương là động tác ôm." 
    },
    { 
        "id": 12, 
        "word": "抱歉", 
        "pinyin": "bàoqiàn", 
        "meaning": "xin lỗi, lấy làm tiếc", 
        "example": "十分抱歉 (Shífēn bàoqiàn) - Rất xin lỗi", 
        "tip": "Áy náy muốn ôm lấy (抱) đối phương để bù đắp cho sự thiếu sót, khiếm khuyết (thiếu 欠) của mình." 
    },
    { 
        "id": 13, 
        "word": "倍", 
        "pinyin": "bèi", 
        "meaning": "lần (gấp đôi, gấp bội)", 
        "example": "收入翻了一倍 (Shōurù fān le yí bèi) - Thu nhập tăng gấp đôi", 
        "tip": "Có bộ Nhân đứng (亻) bên trái biểu thị con người tạo ra hiệu suất gấp bội lần." 
    },
    { 
        "id": 14, 
        "word": "本来", 
        "pinyin": "běnlái", 
        "meaning": "vốn dĩ, ban đầu", 
        "example": "他本来不来 (Tā běnlái bù lái) - Anh ấy vốn dĩ không đến", 
        "tip": "Bản (本) chỉ gốc rễ, Lai (来) là đến. Gốc rễ từ trước đến giờ vốn dĩ là thế." 
    },
    { 
        "id": 15, 
        "word": "笨", 
        "pinyin": "bèn", 
        "meaning": "ngốc nghếch, vụng về", 
        "example": "他不笨 (Tā bú bèn) - Cậu ấy không ngốc", 
        "tip": "Dưới bộ Trúc (⺮) là chữ Bản (本). Tre trúc cứng nhắc, rỗng ruột thì khó uốn nắn, ý chỉ sự chậm hiểu." 
    },
    { 
        "id": 16, 
        "word": "毕业", 
        "pinyin": "bìyè", 
        "meaning": "tốt nghiệp", 
        "example": "大学毕业 (Dàxué bìyè) - Tốt nghiệp đại học", 
        "tip": "Hoàn thành xong toàn bộ (毕) sự nghiệp học hành gian khổ (nghiệp 业)." 
    },
    { 
        "id": 17, 
        "word": "遍", 
        "pinyin": "biàn", 
        "meaning": "lần, lượt (lượng từ)", 
        "example": "请再说一遍 (Qǐng zài shuō yí biàn) - Xin vui lòng nói lại một lần", 
        "isMeasureWord": true, 
        "tip": "Có bộ Sước (辶), đi hết một vòng hành trình lặp đi lặp lại gọi là một biến." 
    },
    { 
        "id": 18, 
        "word": "标准", 
        "pinyin": "biāozhǔn", 
        "meaning": "tiêu chuẩn, chuẩn mực", 
        "example": "普通话很标准 (Pǔtōnghuà hěn biāozhǔn) - Giọng Phổ thông rất chuẩn", 
        "tip": "Chuẩn (准) có bộ Băng (冫) biểu thị sự đông đặc, đo lường chính xác và chuẩn xác không sai lệch." 
    },
    { 
        "id": 19, 
        "word": "表格", 
        "pinyin": "biǎogé", 
        "meaning": "biểu mẫu, tờ khai", 
        "example": "填写表格 (Tiánxiě biǎogé) - Điền vào biểu mẫu", 
        "tip": "Biểu (表 - hiển thị ra ngoài) Cách (格 - các ô vuông được chia ngăn bằng gỗ 木 ngày xưa)." 
    },
    { 
        "id": 20, 
        "word": "表示", 
        "pinyin": "biǎoshì", 
        "meaning": "bày tỏ, biểu thị", 
        "example": "表示感谢 (Biǎoshì gǎnxiè) - Bày tỏ lòng cảm ơn", 
        "tip": "Thị (示) giống như hình cái bàn thờ hiển thị điềm báo, ý nói phơi bày rõ ràng ra ngoài." 
    },
    { 
        "id": 21, 
        "word": "表演", 
        "pinyin": "biǎoyǎn", 
        "meaning": "biểu diễn, trình diễn", 
        "example": "精彩的表演 (Jīngcǎi de biǎoyǎn) - Buổi biểu diễn đặc sắc", 
        "tip": "Diễn (演) có bộ Thủy (氵), sự diễn xuất trôi chảy mượt mà, sống động như dòng nước chảy." 
    },
    { 
        "id": 22, 
        "word": "表扬", 
        "pinyin": "biǎoyáng", 
        "meaning": "khen ngợi, biểu dương", 
        "example": "受到老师的表扬 (Shòudào lǎoshī de biǎoyáng) - Nhận được sự khen ngợi của thầy giáo", 
        "tip": "Dương (扬) có bộ Thủ (扌- tay), giơ tay cao tán dương, tuyên dương thành tích xuất sắc." 
    },
    { 
        "id": 23, 
        "word": "饼干", 
        "pinyin": "bǐnggān", 
        "meaning": "bánh quy", 
        "example": "吃饼干 (Chī bǐnggān) - Ăn bánh quy", 
        "tip": "Bính (饼) có bộ Thực (饣- đồ ăn), Can (干 - khô). Loại bánh nướng khô giòn rụm." 
    },
    { 
        "id": 24, 
        "word": "并且", 
        "pinyin": "bìngqiě", 
        "meaning": "đồng thời, vả lại", 
        "example": "聪明并且努力 (Cōngmíng bìngqiě nǔlì) - Thông minh đồng thời chăm chỉ", 
        "tip": "Bính (并) vẽ hai người đang cùng đứng song hành song song trên một mặt đất." 
    },
    { 
        "id": 25, 
        "word": "不管", 
        "pinyin": "bùguǎn", 
        "meaning": "bất luận, cho dù", 
        "example": "不管多难都要坚持 (Bùguǎn duō nán dōu yào jiānchí) - Cho dù khó thế nào cũng phải kiên trì", 
        "tip": "Bất (不 - không) Quản (管 - dùng thẻ tre để cai trị, quản lý). Không cần quản, không quan tâm." 
    },
    { 
        "id": 26, 
        "word": "不过", 
        "pinyin": "búguò", 
        "meaning": "nhưng, có điều", 
        "example": "他很聪明，不过有点儿懒 (Tā hěn cōngmíng, búguò yǒudiǎnr lǎn) - Cậu ấy rất thông minh, có điều hơi lười", 
        "tip": "Vết bước chân đi (quá 过) không thể vượt qua nổi ranh giới đối lập." 
    },
    { 
        "id": 27, 
        "word": "不仅", 
        "pinyin": "bùjǐn", 
        "meaning": "không những, không chỉ", 
        "example": "不仅会说，还会写 (Bùjǐn huì shuō, hái huì xiě) - Không những biết nói, còn biết viết", 
        "tip": "Cận (仅) có bộ Nhân, ý nói không chỉ giới hạn ở phạm vi nhỏ hẹp của một con người." 
    },
    { 
        "id": 28, 
        "word": "部分", 
        "pinyin": "bùfen", 
        "meaning": "bộ phận, phần", 
        "example": "大部分人 (Dà bùfen rén) - Đại đa số người", 
        "tip": "Bộ (部) là phân khu hành chính, Phân (分) là dùng dao chia nhỏ ra thành từng phần." 
    },
    { 
        "id": 29, 
        "word": "擦", 
        "pinyin": "cā", 
        "meaning": "lau, chùi, quét", 
        "example": "擦桌子 (Cā zhuōzi) - Lau bàn", 
        "tip": "Có bộ Thủ (扌- tay) ở bên trái. Dùng sức bàn tay miết mạnh để tẩy lau sạch vết bẩn." 
    },
    { 
        "id": 30, 
        "word": "猜", 
        "pinyin": "cāi", 
        "meaning": "đoán, suy đoán", 
        "example": "猜谜语 (Cāi míyǔ) - Đoán câu đố", 
        "tip": "Có bộ Khuyển (犭) chỉ hành động rình mò săn mồi nhạy bén của con thú để suy đoán." 
    },
    { 
        "id": 31, 
        "word": "材料", 
        "pinyin": "cáiliào", 
        "meaning": "tài liệu, vật liệu", 
        "example": "准备材料 (Zhǔnbèi cáiliào) - Chuẩn bị tài liệu", 
        "tip": "Tài (材) có bộ Mộc (木 - gỗ). Vật liệu gỗ thô sơ là chất liệu đầu tiên được dùng chế tạo thời xưa." 
    },
    { 
        "id": 32, 
        "word": "参观", 
        "pinyin": "cānguān", 
        "meaning": "tham quan", 
        "example": "参观博物馆 (Cānguān bówùguǎn) - Tham quan bảo tàng", 
        "tip": "Tham (参) dự trực tiếp và dùng mắt (Kiến 见) để quan sát (Quan 观) cảnh vật." 
    },
    { 
        "id": 33, 
        "word": "差不多", 
        "pinyin": "chàbuduō", 
        "meaning": "xấp xỉ, gần như", 
        "example": "时间差不多了 (Shíjiān chàbuduō le) - Thời gian gần đến rồi", 
        "tip": "Sai lệch (差) so với thực tế không có gì là nhiều (不多) cả, nghĩa là gần giống nhau." 
    },
    { 
        "id": 34, 
        "word": "尝", 
        "pinyin": "cháng", 
        "meaning": "nếm thử", 
        "example": "尝一下味道 (Cháng yíxià wèidào) - Nếm thử hương vị", 
        "tip": "Có bộ Khẩu (口) ở dưới cùng, dùng vị giác của miệng để thẩm định thức ăn." 
    },
    { 
        "id": 35, 
        "word": "长城", 
        "pinyin": "Chángchéng", 
        "meaning": "Vạn Lý Trường Thành", 
        "example": "去长城 (Qù Chángchéng) - Đi Trường Thành", 
        "tip": "Trường (长 - dài) Thành (城 - thành trì được bồi đắp kiên cố bằng đất Thổ 土)." 
    },
    { 
        "id": 36, 
        "word": "长江", 
        "pinyin": "Chángjiāng", 
        "meaning": "Sông Trường Giang", 
        "example": "长江很长 (Chángjiāng hěn cháng) - Sông Trường Giang rất dài", 
        "tip": "Giang (江) có bộ Thủy (氵) chỉ con sông lớn nhất và dài nhất Trung Quốc." 
    },
    { 
        "id": 37, 
        "word": "场", 
        "pinyin": "chǎng", 
        "meaning": "trận, buổi (lượng từ)", 
        "example": "一场雨 (Yì chǎng yǔ) - Một trận mưa", 
        "isMeasureWord": true, 
        "tip": "Có bộ Thổ (土) chỉ khu đất rộng, bằng phẳng dùng để diễn ra sự kiện hay trận đấu." 
    },
    { 
        "id": 38, 
        "word": "超过", 
        "pinyin": "chāoguò", 
        "meaning": "vượt quá, vượt qua", 
        "example": "不能超过规定 (Bùnéng chāoguò guīdìng) - Không thể vượt quá quy định", 
        "tip": "Siêu (超) gồm chữ Tẩu (走 - chạy) nhảy qua ranh giới, vượt xa người khác." 
    },
    { 
        "id": 39, 
        "word": "成功", 
        "pinyin": "chénggōng", 
        "meaning": "thành công", 
        "example": "祝你成功 (Zhù nǐ thành công) - Chúc bạn thành công", 
        "tip": "Thành (成) tựu đạt được nhờ bỏ ra nhiều công sức lao động chân chính (Công 功)." 
    },
    { 
        "id": 40, 
        "word": "诚实", 
        "pinyin": "chéngshí", 
        "meaning": "thành thật, trung thực", 
        "example": "诚实的孩子 (Chéngshí de háizi) - Đứa trẻ thành thật", 
        "tip": "Thành (诚) có bộ Ngôn (讠), lời nói xuất phát từ lòng chân thành không dối trá." 
    },
    { 
        "id": 41, 
        "word": "成熟", 
        "pinyin": "chéngshú", 
        "meaning": "trưởng thành, chín chắn", 
        "example": "想法很成熟 (Xiǎngfǎ hěn chéngshú) - Suy nghĩ rất chín chắn", 
        "tip": "Thục (熟) có bộ Hỏa (灬) lửa đun nấu thức ăn chín mềm, chỉ tính cách chín chắn." 
    },
    { 
        "id": 42, 
        "word": "成熟", 
        "pinyin": "chéngwéi", 
        "meaning": "trở thành, biến thành", 
        "example": "成为一名医生 (Chéngwéi yì míng yīshēng) - Trở thành một bác sĩ", 
        "tip": "Nỗ lực hành động (Vi 为) để đạt được kết quả hoàn chỉnh (Thành 成)." 
    },
    { 
        "id": 43, 
        "word": "乘坐", 
        "pinyin": "chéngzuò", 
        "meaning": "đi, đáp, cưỡi (xe, tàu, máy bay)", 
        "example": "乘坐飞机 (Chéngzuò fēijī) - Đi máy bay", 
        "tip": "Thừa (乘) là cưỡi lên cỗ xe gỗ có người đứng bên điều khiển." 
    },
    { 
        "id": 44, 
        "word": "吃惊", 
        "pinyin": "chījīng", 
        "meaning": "giật mình, kinh ngạc", 
        "example": "令人吃惊 (Lìngrén chījīng) - Khiến người ta kinh ngạc", 
        "tip": "Ăn (吃) phải sự kinh hãi giật mình đột ngột (Kinh 惊 có bộ Tâm đứng)." 
    },
    { 
        "id": 45, 
        "word": "重新", 
        "pinyin": "chóngxīn", 
        "meaning": "làm lại, một lần nữa", 
        "example": "重新开始 (Chóngxīn kāishǐ) - Bắt đầu lại từ đầu", 
        "tip": "Trùng (重 - lặp lại) Tân (新 - làm mới). Làm mới lại một lần nữa." 
    },
    { 
        "id": 46, 
        "word": "出发", 
        "pinyin": "chūfā", 
        "meaning": "xuất phát, lên đường", 
        "example": "明天早上出发 (Míngtiān zǎoshang chūfā) - Sáng mai xuất phát", 
        "tip": "Đi ra ngoài (Chất 出) và bắn tên bắn nhanh về phía trước (Phát 发)." 
    },
    { 
        "id": 47, 
        "word": "出差", 
        "pinyin": "chūchāi", 
        "meaning": "đi công tác", 
        "example": "去北京出差 (Qù Běijīng chūchāi) - Đi công tác Bắc Kinh", 
        "tip": "Đi ra ngoài (出) thực hiện nhiệm vụ công tác được sai phái riêng (Sai 差)." 
    },
    { 
        "id": 48, 
        "word": "出生", 
        "pinyin": "chūshēng", 
        "meaning": "sinh ra, chào đời", 
        "example": "他出生于越南 (Tā chūshēng yú Yuènán) - Anh ấy sinh ra ở Việt Nam", 
        "tip": "Bắt đầu bước ra ngoài (出) thế giới và có sự sống mới (Sinh 生)." 
    },
    { 
        "id": 49, 
        "word": "传真", 
        "pinyin": "chuánzhēn", 
        "meaning": "bản fax, máy fax", 
        "example": "发传真 (Fā chuánzhēn) - Gửi bản fax", 
        "tip": "Truyền (传) đi hình ảnh chân thực (Chân 真) thông qua dây cáp tín hiệu." 
    },
    { 
        "id": 50, 
        "word": "词典", 
        "pinyin": "cídiǎn", 
        "meaning": "từ điển", 
        "example": "查词典 (Chá cídiǎn) - Tra từ điển", 
        "tip": "Từ (词) có bộ Ngôn (讠) chỉ từ ngữ, Điển (典) là sách quy chuẩn đặt trên kệ gỗ." 
    },
    { 
        "id": 51, 
        "word": "聪明", 
        "pinyin": "cōngming", 
        "meaning": "thông minh", 
        "example": "这个孩子很聪明 (Zhè ge háizi hěn cōngming) - Đứa trẻ này rất thông minh", 
        "tip": "Chữ Thông (聪) có bộ Nhĩ (耳 - tai) bên trái. Muốn thông minh sáng suốt cần phải biết chăm chú lắng nghe trước." 
    },
    { 
        "id": 52, 
        "word": "粗心", 
        "pinyin": "cūxīn", 
        "meaning": "cẩu thả, vô ý", 
        "example": "他做事很粗心 (Tā zuòshì hěn cūxīn) - Anh ấy làm việc rất cẩu thả", 
        "tip": "Thô (粗) có bộ Mễ (米 - gạo), Tân (心 - lòng). Lòng dạ vụn vặt như hạt gạo, không chu đáo nên cẩu thả." 
    },
    { 
        "id": 53, 
        "word": "答案", 
        "pinyin": "dá'àn", 
        "meaning": "đáp án", 
        "example": "公布正确答案 (Gōngbù zhèngquè dá'àn) - Công bố đáp án chính xác", 
        "tip": "Đáp (答) có bộ Trúc (⺮) viết thư trả lời trên thẻ tre xưa. Án (案) có bộ Mộc (木) là chiếc bàn gỗ kê án thư." 
    },
    { 
        "id": 54, 
        "word": "打扮", 
        "pinyin": "dǎban", 
        "meaning": "trang điểm, ăn mặc", 
        "example": "打扮得漂亮 (Dǎban de piàoliang) - Trang điểm xinh đẹp", 
        "tip": "Cả hai chữ Đả (打) và Phán (扮) đều có bộ Thủ (扌- tay). Dùng đôi bàn tay sửa soạn xiêm y diện mạo." 
    },
    { 
        "id": 55, 
        "word": "打扰", 
        "pinyin": "dǎrǎo", 
        "meaning": "làm phiền", 
        "example": "对不起，打扰一下 (Duìbuqǐ, dǎrǎo yíxià) - Xin lỗi, xin làm phiền một chút", 
        "tip": "Nhiễu (扰) có bộ Thủ (扌- tay) quấy rối, bên phải là chữ Ưu (忧 - lo lắng). Giơ tay làm phiền khiến người khác lo âu." 
    },
    { 
        "id": 56, 
        "word": "打印", 
        "pinyin": "dǎyìn", 
        "meaning": "in ấn", 
        "example": "打印一份文件 (Dǎyìn yí fèn wénjiàn) - In một bản tài liệu", 
        "tip": "Ấn (印) vẽ hình con dấu quan phủ cổ đại. Dùng tay (Thủ 扌) đóng ấn triện xuống văn bản gọi là in ấn." 
    },
    { 
        "id": 57, 
        "word": "打折", 
        "pinyin": "dǎzhé", 
        "meaning": "giảm giá", 
        "example": "商场正在打折 (Shāngchǎng zhèngzài dǎzhé) - Trung tâm thương mại đang giảm giá", 
        "tip": "Chiết (折) có bộ Thủ (扌) và bộ Cân (斤 - cái rìu). Tay cầm rìu chặt đứt, ý chỉ chặt bớt đi một phần giá bán." 
    },
    { 
        "id": 58, 
        "word": "打针", 
        "pinyin": "dǎzhēn", 
        "meaning": "tiêm, chích thuốc", 
        "example": "生病要打针 (Shēngbìng yào dǎzhēn) - Ốm thì phải tiêm thuốc", 
        "tip": "Châm (针) có bộ Kim (钅- kim loại). Chiếc kim bằng sắt nhọn để đâm sâu qua da điều trị bệnh." 
    },
    { 
        "id": 59, 
        "word": "大概", 
        "pinyin": "dàgài", 
        "meaning": "khoảng, đại khái", 
        "example": "大概需要三天 (Dàgài xūyào sān tiān) - Khoảng chừng cần ba ngày", 
        "tip": "Khái (概) có bộ Mộc (木) và chữ Ký (既). Chiếc gạt bằng gỗ dùng để đong đo tương đối thóc lúa ngày xưa." 
    },
    { 
        "id": 60, 
        "word": "大使馆", 
        "pinyin": "dàshǐguǎn", 
        "meaning": "đại sứ quán", 
        "example": "去大使馆办签证 (Qù dàshǐguǎn bàn qiānzhèng) - Đi đại sứ quán làm visa", 
        "tip": "Sứ (使) là người (亻) được phái đi làm việc nước. Quán (馆) có bộ Thực (饣), dinh thự đón khách ngoại bang ăn nghỉ." 
    },
    { 
        "id": 61, 
        "word": "大约", 
        "pinyin": "dàyuē", 
        "meaning": "khoảng chừng", 
        "example": "大约有五十 người (Dàyuē yǒu wǔshí rén) - Khoảng chừng có 50 người", 
        "tip": "Ước (约) có bộ Mịch (纟- sợi tơ). Sợi dây buộc thắt tạm thời để ước lượng khoảng cách hoặc giao ước." 
    },
    { 
        "id": 62, 
        "word": "大夫", 
        "pinyin": "dàifu", 
        "meaning": "bác sĩ, thầy thuốc", 
        "example": "看大夫 (Kàn dàifu) - Đi gặp bác sĩ", 
        "tip": "Đại phu. Phù (夫) vẽ hình người đàn ông trưởng thành cài trâm, chỉ người học rộng tài cao cứu người." 
    },
    { 
        "id": 63, 
        "word": "代替", 
        "pinyin": "dàitì", 
        "meaning": "thay thế", 
        "example": "没有人能代替你 (Méiyǒu rén néng dàitì nǐ) - Không ai có thể thay thế bạn", 
        "tip": "Thế (替) gồm hai chữ Phu (夫) đứng trên chữ Viết (曰). Hai người đứng thay nhau nói chuyện thế vai." 
    },
    { 
        "id": 64, 
        "word": "戴", 
        "pinyin": "dài", 
        "meaning": "đeo, đội, mang (phụ kiện)", 
        "example": "戴眼镜 (Dài yǎnjìng) - Đeo kính", 
        "tip": "Kết cấu chữ gồm戈 (binh khí) nâng đỡ vật báu ở giữa, ý nói đội trang sức quý lên đầu che chở." 
    },
    { 
        "id": 65, 
        "word": "贷款", 
        "pinyin": "dàikuǎn", 
        "meaning": "vay tiền, khoản vay", 
        "example": "申请银行贷款 (Shēnqǐng yínháng dàikuǎn) - Đăng ký vay tiền ngân hàng", 
        "tip": "Khoản (款) có bộ Khiếm (欠 - thiếu thốn). Do thiếu hụt tiền nong nên phải đi thế chấp vay mượn." 
    },
    { 
        "id": 66, 
        "word": "弹", 
        "pinyin": "tán", 
        "meaning": "gảy, đánh (đàn piano, guitar)", 
        "example": "弹钢琴 (Tán gāngqín) - Đánh đàn piano", 
        "tip": "Đạn (弹) có bộ Cung (弓 - cây cung). Động tác kéo căng dây đàn phát ra tiếng vang giống như bắn cung." 
    },
    { 
        "id": 67, 
        "word": "当", 
        "pinyin": "dāng", 
        "meaning": "làm, đảm nhiệm", 
        "example": "当一名老师 (Dāng yì míng lǎoshī) - Làm một giáo viên", 
        "tip": "Đương (当) vẽ hình hai mái nhà đối xứng nhau trên mặt đất, chỉ vị trí xứng đáng gánh vác việc lớn." 
    },
    { 
        "id": 68, 
        "word": "当地", 
        "pinyin": "dāngdì", 
        "meaning": "địa phương, bản địa", 
        "example": "当地的文化 (Dāngdì de wénhuà) - Văn hóa bản địa", 
        "tip": "Đương địa. Ngay tại chính (当) vùng đất thổ nhưỡng (地) nơi đó." 
    },
    { 
        "id": 69, 
        "word": "当时", 
        "pinyin": "dāngshí", 
        "meaning": "lúc đó, khi đó", 
        "example": "当时我很害怕 (Dāngshí wǒ hěn hàipà) - Lúc đó tôi rất sợ hãi", 
        "tip": "Đương thời. Ngay tại chính (当) khoảng thời gian (时) lịch sử diễn ra sự việc." 
    },
    { 
        "id": 70, 
        "word": "刀", 
        "pinyin": "dāo", 
        "meaning": "con dao", 
        "example": "切菜刀 (Qiē cài dāo) - Dao thái rau", 
        "tip": "Chữ tượng hình vẽ lại lưỡi dao sắc bén có chuôi cầm phía trên." 
    },
    { 
        "id": 71, 
        "word": "导游", 
        "pinyin": "dǎoyóu", 
        "meaning": "hướng dẫn viên du lịch", 
        "example": "做一名导游 (Zuò yì míng dǎoyóu) - Làm một hướng dẫn viên", 
        "tip": "Đạo (导) có bộ Thốn (寸 - tay, quy tắc) dẫn đường. Du (游) có bộ Thủy (氵), chu du sông nước núi non." 
    },
    { 
        "id": 72, 
        "word": "倒", 
        "pinyin": "dào", 
        "meaning": "rót, đổ (nước)", 
        "example": "倒一杯水 (Dào yì bēi shuǐ) - Rót một cốc nước", 
        "tip": "Đáo (倒) có bộ Nhân (亻). Người nghiêng mình đổ nước từ bình ra ngoài." 
    },
    { 
        "id": 73, 
        "word": "到处", 
        "pinyin": "dàochù", 
        "meaning": "khắp nơi", 
        "example": "到处都是垃圾 (Dàochù dōu shì lājī) - Khắp nơi đều là rác", 
        "tip": "Đáo xử. Đi đến (Đáo 到) bất kỳ nơi chốn (Xử 处) nào trên thế gian." 
    },
    { 
        "id": 74, 
        "word": "到底", 
        "pinyin": "dàodǐ", 
        "meaning": "rốt cuộc, cuối cùng", 
        "example": "你到底想说什么？(Nǐ dàodǐ xiǎng shuō shénme?) - Rốt cuộc bạn muốn nói gì?", 
        "tip": "Đáo để. Đi thẳng đến (Đáo 到) tận đáy nước thẳm sâu (Để 底) của câu chuyện." 
    },
    { 
        "id": 75, 
        "word": "道歉", 
        "pinyin": "dàoqiàn", 
        "meaning": "xin lỗi, tạ lỗi", 
        "example": "向他道歉 (Xiàng tā dàoqiàn) - Xin lỗi anh ấy", 
        "tip": "Đạo (道) là nói, Khiếm (欠) là thiếu sót. Nói lời bộc bạch bù đắp cho sự thiếu sót của bản thân." 
    },
    { 
        "id": 76, 
        "word": "得意", 
        "pinyin": "déyì", 
        "meaning": "đắc ý, tự mãn", 
        "example": "别得意太早 (Bié déyì tài zǎo) - Đừng đắc ý quá sớm", 
        "tip": "Đắc (得) đạt được thứ mong muốn. Ý (意) là suy nghĩ trong lòng thỏa nguyện sinh tự mãn." 
    },
    { 
        "id": 77, 
        "word": "得", 
        "pinyin": "děi", 
        "meaning": "phải (động từ năng nguyện)", 
        "example": "我得走了 (Wǒ děi zǒu le) - Tôi phải đi rồi", 
        "tip": "Đắc (得) có bộ Sách (彳- bước đi), phải bước chân đi làm việc gì đó một cách bắt buộc." 
    },
    { 
        "id": 78, 
        "word": "灯", 
        "pinyin": "dēng", 
        "meaning": "cái đèn", 
        "example": "开灯 (Kāi dēng) - Bật đèn", 
        "tip": "Đăng (灯) có bộ Hỏa (火 - lửa). Đèn cổ xưa phát sáng nhờ ngọn lửa dầu cháy bập bùng." 
    },
    { 
        "id": 79, 
        "word": "等", 
        "pinyin": "děng", 
        "meaning": "lớp, loại, vân vân (lượng từ)", 
        "example": "一等奖 (Yī děng jiǎng) - Giải nhất (giải hạng nhất)", 
        "isMeasureWord": true, 
        "tip": "Đẳng (等) có bộ Trúc (⺮) và chữ Tự (寺). Các thẻ tre ghi danh sách được phân loại ngăn nắp tại sân chùa." 
    },
    { 
        "id": 80, 
        "word": "低", 
        "pinyin": "dī", 
        "meaning": "thấp, cúi đầu", 
        "example": "低下头 (Dī xià tóu) - Cúi thấp đầu", 
        "tip": "Đê (低) có bộ Nhân (亻) và chữ Đê (氐 - gốc rễ). Người nghiêng thấp sát đất như gốc rễ." 
    },
    { 
        "id": 81, 
        "word": "底", 
        "pinyin": "dǐ", 
        "meaning": "đáy, cuối (tháng, năm)", 
        "example": "年底 (Niándǐ) - Cuối năm", 
        "tip": "Dưới bộ Quảng (广 - mái hiên nhà) là chữ Đê (氐 - gốc). Phần sâu nhất dưới chân tường nhà gọi là đáy." 
    },
    { 
        "id": 82, 
        "word": "地球", 
        "pinyin": "dìqiú", 
        "meaning": "Trái Đất", 
        "example": "保护地球 (Bǎohù dìqiú) - Bảo vệ Trái Đất", 
        "tip": "Cầu (球) có bộ Vương (王 - ngọc báu). Quả đất tròn trịa quý giá như một viên ngọc bích lơ lửng giữa vũ trụ." 
    },
    { 
        "id": 83, 
        "word": "地址", 
        "pinyin": "dìzhǐ", 
        "meaning": "địa chỉ", 
        "example": "写错地址 (Xiě cuò dìzhǐ) - Viết sai địa chỉ", 
        "tip": "Chỉ (址) có bộ Thổ (土 - đất) và chữ Chỉ (止 - dừng lại). Nơi đất đai dừng chân cố định xây nhà." 
    },
    { 
        "id": 84, 
        "word": "调查", 
        "pinyin": "diàochá", 
        "meaning": "điều tra, khảo sát", 
        "example": "进行市场调查 (Jìnxíng shìchǎng diàochá) - Tiến hành khảo sát thị trường", 
        "tip": "Điệu (调) có bộ Ngôn (讠) dùng lời nói. Tra (查) có bộ Mộc (木) lật mở đống hồ sơ gỗ lục tìm chứng cứ." 
    },
    { 
        "id": 85, 
        "word": "掉", 
        "pinyin": "diào", 
        "meaning": "rơi, rụng, mất", 
        "example": "手机掉地上了 (Shǒujī diào dì shang le) - Điện thoại rơi xuống đất rồi", 
        "tip": "Có bộ Thủ (手 - tay) ở bên trái. Bàn tay lỏng lẻo đánh rơi đồ đạc xuống dưới đất." 
    },
    { 
        "id": 86, 
        "word": "丢", 
        "pinyin": "diū", 
        "meaning": "mất, vứt bỏ", 
        "example": "钱包丢了 (Qiánbāo diū le) - Ví tiền mất rồi", 
        "tip": "Chữ gồm Khứ (去 - đi) và một nét phẩy ngược phía trên biểu thị đồ vật bay mất đi mất." 
    },
    { 
        "id": 87, 
        "word": "动作", 
        "pinyin": "dòngzuò", 
        "meaning": "động tác, cử chỉ", 
        "example": "动作很慢 (Dòngzuò hěn màn) - Động tác rất chậm", 
        "tip": "Động (动) có bộ Lực (力), dùng sức cơ bắp để chuyển dịch cơ thể tạo nên cử chỉ." 
    },
    { 
        "id": 88, 
        "word": "堵车", 
        "pinyin": "dǔchē", 
        "meaning": "tắc đường, kẹt xe", 
        "example": "路上堵车 (Lùshàng dǔchē) - Trên đường kẹt xe", 
        "tip": "Đổ (堵) có bộ Thổ (土 - đất cát). Đất đá bồi đắp lấp kín chặn đứng lối đi của xe cộ (车)." 
    },
    { 
        "id": 89, 
        "word": "肚子", 
        "pinyin": "dùzi", 
        "meaning": "cái bụng", 
        "example": "肚子疼 (Dùzi téng) - Đau bụng", 
        "tip": "Đỗ (肚) có bộ Nguyệt (月 - chỉ các bộ phận cơ thể thịt, cơ). Bụng chứa cơ quan tiêu hóa của con người." 
    },
    { 
        "id": 90, 
        "word": "短信", 
        "pinyin": "duǎnxìn", 
        "meaning": "tin nhắn", 
        "example": "发一条短信 (Fā yì tiáo duǎnxìn) - Gửi một tin nhắn", 
        "tip": "Đoản (短) ngắn ngủi. Tín (信) có bộ Nhân (亻) và bộ Ngôn (讠). Lời của con người gửi đi một cách ngắn gọn." 
    },
    { 
        "id": 91, 
        "word": "对话", 
        "pinyin": "duìhuà", 
        "meaning": "đối thoại", 
        "example": "展开对话 (Zhǎnkāi duìhuà) - Triển khai đối thoại", 
        "tip": "Thoại (话) có bộ Ngôn (讠), hai bên trực tiếp đối diện nói chuyện trao đổi thông tin bằng lời." 
    },
    { 
        "id": 92, 
        "word": "对手", 
        "pinyin": "duìshǒu", 
        "meaning": "đối thủ", 
        "example": "强大的对手 (Qiángdà de duìshǒu) - Đối thủ mạnh mẽ", 
        "tip": "Đối (对) chọi. Thủ (手 - bàn tay). Người đối đầu so tài tay đôi với mình trong cuộc chơi." 
    },
    { 
        "id": 93, 
        "word": "对象", 
        "pinyin": "duìxiàng", 
        "meaning": "đối tượng, người yêu", 
        "example": "找对象 (Zhǎo duìxiàng) - Tìm người yêu", 
        "tip": "Tượng (象) vẽ hình con voi, ý chỉ hình mẫu người trong mộng mà mắt ta đang nhắm hướng đối diện." 
    },
    { 
        "id": 94, 
        "word": "对于", 
        "pinyin": "duìyú", 
        "meaning": "đối với, về", 
        "example": "对于这件事 (Duìyú zhè jiàn shì) - Đối với sự việc này", 
        "tip": "Giới từ chỉ hướng mục tiêu đối diện trực tiếp để phân tích đánh giá." 
    },
    { 
        "id": 95, 
        "word": "儿童", 
        "pinyin": "értóng", 
        "meaning": "nhi đồng, trẻ em", 
        "example": "儿童玩具 (Értóng wánjù) - Đồ chơi trẻ em", 
        "tip": "Đồng (童) gồm chữ Lập (立 - đứng) trên chữ Lý (里 - thôn xóm). Đứa trẻ đứng chơi đùa ngoài ngõ xóm." 
    },
    { 
        "id": 96, 
        "word": "而", 
        "pinyin": "ér", 
        "meaning": "mà, nhưng, vả lại (liên từ)", 
        "example": "聪明而努力 (Cōngmíng ér nǔlì) - Thông minh mà lại chăm chỉ", 
        "tip": "Vẽ hình chòm râu dưới cằm mọc rủ nối liền khuôn mặt, mang tính chuyển tiếp liên kết ý câu." 
    },
    { 
        "id": 97, 
        "word": "发生", 
        "pinyin": "fāshēng", 
        "meaning": "xảy ra, phát sinh", 
        "example": "发生意外 (Fāshēng yìwài) - Xảy ra tai nạn ngoài ý muốn", 
        "tip": "Phát (发) bắn tên bay ra ngoài, Sinh (生) nảy nở. Sự việc đột ngột nảy sinh nổ ra." 
    },
    { 
        "id": 98, 
        "word": "发展", 
        "pinyin": "fāzhǎn", 
        "meaning": "phát triển", 
        "example": "经济发展 (Jīngjì fāzhǎn) - Phát triển kinh tế", 
        "tip": "Triển (展) có bộ Thi (尸 - thi thể nằm ngang xưa chỉ đất hoang), kéo căng mở rộng đất đai hoang hóa rộng lớn." 
    },
    { 
        "id": 99, 
        "word": "法律", 
        "pinyin": "fǎlǜ", 
        "meaning": "pháp luật", 
        "example": "遵守法律 (Zūnshǒu fǎlǜ) - Tuân thủ pháp luật", 
        "tip": "Pháp (法) có bộ Thủy (氵), luật pháp cần sự công bằng phẳng lặng như mặt nước không gợn sóng." 
    },
    { 
        "id": 100, 
        "word": "翻译", 
        "pinyin": "fānyì", 
        "meaning": "phiên dịch, dịch thuật", 
        "example": "英文翻译 (Yīngwén fānyì) - Dịch tiếng Anh", 
        "tip": "Dịch (译) có bộ Ngôn (讠). Lật qua lật lại các lớp từ ngữ ngôn ngữ để truyền đạt cho người hiểu." 
    },
    { 
        "id": 101, 
        "word": "反对", 
        "pinyin": "fǎnduì", 
        "meaning": "phản đối", 
        "example": "表示反对 (Biǎoshì fǎnduì) - Bày tỏ sự phản đối", 
        "tip": "Phản (反) có bộ Hựu (又 - tay), giơ tay đẩy ngược hướng, không chấp thuận quan điểm." 
    },
    { 
        "id": 102, 
        "word": "反而", 
        "pinyin": "fǎn'ér", 
        "meaning": "trái lại, ngược lại", 
        "example": "不冷反而热了 (Bù lěng fǎn'ér rè le) - Không lạnh trái lại còn nóng hơn", 
        "tip": "Phản (反) quay lưng lại đối lập, liên kết với Nhi (而) tạo nghĩa chuyển ngoặt tương phản hoàn toàn." 
    },
    { 
        "id": 103, 
        "word": "反映", 
        "pinyin": "fǎnyìng", 
        "meaning": "phản ánh, bộc lộ", 
        "example": "反映真实情况 (Fǎnyìng zhēnshí qíngkuàng) - Phản ánh tình hình thực tế", 
        "tip": "Ánh (映) có bộ Nhật (日 - mặt trời), ánh sáng chiếu rọi vào giúp hiện rõ sự thật khách quan ra ngoài." 
    },
    { 
        "id": 104, 
        "word": "范围", 
        "pinyin": "fànwéi", 
        "meaning": "phạm vi, giới hạn", 
        "example": "工作范围 (Gōngzuò fànwéi) - Phạm vi công việc", 
        "tip": "Vi (围) có bộ Vi (囗- vây quanh rào kín). Ranh giới bao bọc xung quanh không cho vượt quá." 
    },
    { 
        "id": 105, 
        "word": "方法", 
        "pinyin": "fāngfǎ", 
        "meaning": "phương pháp, cách thức", 
        "example": "好方法 (Hǎo fāngfǎ) - Phương pháp tốt", 
        "tip": "Phương (方) vẽ cái cày dọn đất vuông vức ngăn nắp, phép tắc chuẩn mực để hành sự." 
    },
    { 
        "id": 106, 
        "word": "方面", 
        "pinyin": "fāngmiàn", 
        "meaning": "phương diện, khía cạnh", 
        "example": "在学习方面 (Zài xuéxí fāngmiàn) - Về khía cạnh học tập", 
        "tip": "Diện (面 - khuôn mặt, bề mặt). Xem xét sự việc từ nhiều góc độ bề mặt khác nhau." 
    },
    { 
        "id": 107, 
        "word": "方向", 
        "pinyin": "fāngxiàng", 
        "meaning": "phương hướng", 
        "example": "迷失方向 (Míshī fāngxiàng) - Mất phương hướng", 
        "tip": "Hướng (向) có bộ Khẩu (口) bên trong, miệng hỏi đường đi theo la bàn hướng về phía trước." 
    },
    { 
        "id": 108, 
        "word": "房东", 
        "pinyin": "fángdōng", 
        "meaning": "chủ nhà trọ", 
        "example": "联系房东 (Liánxì fángdōng) - Liên hệ với chủ nhà", 
        "tip": "Đông (东 - phía Đông). Theo quan niệm phong thủy xưa vị trí chủ nhà ngồi bên hướng Đông đón khách." 
    },
    { 
        "id": 109, 
        "word": "放弃", 
        "pinyin": "fàngqì", 
        "meaning": "từ bỏ, từ bỏ", 
        "example": "绝不放弃 (Jué bù fàngqì) - Quyết không từ bỏ", 
        "tip": "Khí (弃) có bộ Thủ (扌- tay) nâng cái rổ đổ rác thải ra ngoài đất, rũ bỏ hết." 
    },
    { 
        "id": 110, 
        "word": "放暑假", 
        "pinyin": "fàng shǔjià", 
        "meaning": "nghỉ hè", 
        "example": "什么时候放暑假？(Shénme shíhou fàng shǔjià?) - Khi nào được nghỉ hè?", 
        "tip": "Thử (暑) có bộ Nhật (日) chỉ ánh nắng chói chang, nóng bức đỉnh điểm của mùa hè." 
    },
    { 
        "id": 111, 
        "word": "放松", 
        "pinyin": "fàngsōng", 
        "meaning": "thả lỏng, thư giãn", 
        "example": "放松心情 (Fàngsōng xīnqíng) - Thả lỏng tâm trạng", 
        "tip": "Tùng (松) có bộ Mộc (木 - cây thông lỏng lẻo). Thả trôi không khí căng thẳng tựa như lá thông reo nhẹ." 
    },
    { 
        "id": 112, 
        "word": "费用", 
        "pinyin": "fèiyòng", 
        "meaning": "chi phí, lệ phí", 
        "example": "生活费用 (Shēnghuó fèiyòng) - Chi phí sinh hoạt", 
        "tip": "Phí (费) có bộ Bối (贝 - tiền cổ biển). Tiền bạc dùng tiêu hao chi trả cho nhu cầu." 
    },
    { 
        "id": 113, 
        "word": "份", 
        "pinyin": "fèn", 
        "meaning": "bản, phần (lượng từ)", 
        "example": "一份报纸 (Yí fèn bàozhǐ) - Một tờ báo", 
        "isMeasureWord": true, 
        "tip": "Phần (份) có bộ Nhân (亻) chia đều tài liệu công việc ra từng phần cho từng người gánh vác." 
    },
    { 
        "id": 114, 
        "word": "丰富", 
        "pinyin": "fēngfù", 
        "meaning": "phong phú, dồi dào", 
        "example": "内容很丰富 (Nèiróng hěn fēngfù) - Nội dung rất phong phú", 
        "tip": "Phong (丰) vẽ cành cây trĩu quả xum xuê đầy cành. Phú (富) có bộ Miên (宀 - mái nhà ấm no dồi dào của cải)." 
    },
    { 
        "id": 115, 
        "word": "风景", 
        "pinyin": "fēngjǐng", 
        "meaning": "phong cảnh, cảnh đẹp", 
        "example": "美丽的风景 (Měilì de fēngjǐng) - Phong cảnh đẹp đẽ", 
        "tip": "Phong (风 - gió). Cảnh (景) có bộ Nhật (日 - ánh nắng mặt trời rực rỡ chiếu rọi cảnh vật)." 
    },
    { 
        "id": 116, 
        "word": "否则", 
        "pinyin": "fǒuzé", 
        "meaning": "nếu không thì, bằng không", 
        "example": "快点，否则迟到了 (Kuài diǎn, fǒuzé chídào le) - Nhanh lên, nếu không sẽ muộn đấy", 
        "tip": "Phủ (否 - không đồng ý) kết hợp Tắc (则 - quy tắc luật lệ). Nếu không theo quy định đã định." 
    },
    { 
        "id": 117, 
        "word": "符合", 
        "pinyin": "fúhé", 
        "meaning": "phù hợp, khớp với", 
        "example": "符合要求 (Fúhé yāoqiú) - Phù hợp với yêu cầu", 
        "tip": "Phù (符) có bộ Trúc (⺮) binh phù bằng tre xẻ đôi khớp hai nửa hoàn chỉnh với nhau." 
    },
    { 
        "id": 118, 
        "word": "服务员", 
        "pinyin": "fúwùyuán", 
        "meaning": "nhân viên phục vụ", 
        "example": "服务员，点单 (Fúwùyuán, diǎndān) - Phục vụ ơi, gọi món", 
        "tip": "Vụ (务) có bộ Lực (力) nỗ lực làm việc. Viên (员) có bộ Bối (贝) nhận thù lao phục vụ thực khách." 
    },
    { 
        "id": 119, 
        "word": "富", 
        "pinyin": "fù", 
        "meaning": "giàu có, phú quý", 
        "example": "富裕的生活 (Fùyù de shēnghuó) - Cuộc sống giàu có", 
        "tip": "Dưới mái nhà (宀) có một mẫu ruộng (đọc là khẩu 口 và điền 田), cuộc sống ấm no dồi dào lúa gạo." 
    },
    { 
        "id": 120, 
        "word": "附近", 
        "pinyin": "fùjìn", 
        "meaning": "lân cận, gần đây", 
        "example": "学校附近 (Xuéxiào fùjìn) - Gần trường học", 
        "tip": "Cận (近) có bộ Sước (辶- bước chân đi ngắn), chỉ quãng đường đi bộ vài bước chân là tới nơi." 
    },
    { 
        "id": 121, 
        "word": "父亲", 
        "pinyin": "fùqīn", 
        "meaning": "người cha, phụ thân", 
        "example": "我的父亲 (Wǒ de fùqīn) - Cha của tôi", 
        "tip": "Phụ (父) vẽ tay cầm roi giáo huấn răn đe. Thân (亲) có bộ Kiến (见), người ruột thịt luôn kề cận bảo ban." 
    },
    { 
        "id": 122, 
        "word": "复印", 
        "pinyin": "fùyìn", 
        "meaning": "photocopy, nhân bản", 
        "example": "复印资料 (Fùyìn zīliào) - Photocopy tài liệu", 
        "tip": "Phục (复) làm lại lặp lại một lần nữa. Ấn (印) là đóng dấu mộc tạo ra bản sao giống hệt." 
    },
    { 
        "id": 123, 
        "word": "复杂", 
        "pinyin": "fùzá", 
        "meaning": "phức tạp, rắc rối", 
        "example": "这个问题很复杂 (Wèntí hěn fùzá) - Vấn đề này rất phức tạp", 
        "tip": "Tạp (杂) có bộ Mộc (木) kết hợp bộ Y (衣), các sợi chỉ dệt quần áo đan chéo rắc rối lộn xộn." 
    },
    { 
        "id": 124, 
        "word": "负责", 
        "pinyin": "fùzé", 
        "meaning": "chịu trách nhiệm, gánh vác", 
        "example": "对工作负责 (Duì gōngzuò fùzé) - Chịu trách nhiệm với công việc", 
        "tip": "Trách (责) gồm chữ Chủ (主) và bộ Bối (贝 - tiền nong thuế khóa). Người làm chủ gánh vác tiền thuế tài sản." 
    },
    { 
        "id": 125, 
        "word": "改变", 
        "pinyin": "gǎibiàn", 
        "meaning": "thay đổi, cải biến", 
        "example": "改变计划 (Gǎibiàn jìhuà) - Thay đổi kế hoạch", 
        "tip": "Cải (改) có bộ Phộc (攵- roi gõ sửa sai lỗi). Động tác gõ tay uốn nắn hành vi sửa đổi cho tốt hơn." 
    },
    { 
        "id": 126, 
        "word": "干净", 
        "pinyin": "gānjìng", 
        "meaning": "sạch sẽ", 
        "example": "房间很干净 (Fángjiān hěn gānjìng) - Căn phòng rất sạch sẽ", 
        "tip": "Tịnh (净) có bộ Băng (冫- sương tuyết đông). Bề mặt nước đóng băng trong suốt sạch sẽ không tì vết." 
    },
    { 
        "id": 127, 
        "word": "感冒", 
        "pinyin": "gǎnmào", 
        "meaning": "cảm cúm, bị cảm", 
        "example": "我不小心感冒了 (Wǒ bù xiǎoxīn gǎnmào le) - Tôi vô ý bị cảm lạnh rồi", 
        "tip": "Mạo (冒) vẽ hình che đậy kín đầu từ thời tiết gió tuyết buốt lạnh thâm nhập cơ thể." 
    },
    { 
        "id": 128, 
        "word": "感情", 
        "pinyin": "gǎnqíng", 
        "meaning": "tình cảm, cảm xúc", 
        "example": "感情深厚 (Gǎnqíng shēnhòu) - Tình cảm sâu đậm", 
        "tip": "Cảm (感) có bộ Tâm (心) rung động từ tim. Tình (情) có bộ Tâm đứng (忄) cảm xúc nội tâm sâu sắc." 
    },
    { 
        "id": 129, 
        "word": "感谢", 
        "pinyin": "gǎnxiè", 
        "meaning": "cảm tạ, biết ơn", 
        "example": "表示真诚感谢 (Biǎoshì zhēnchéng gǎnxiè) - Bày tỏ lòng biết ơn chân thành", 
        "tip": "Tạ (谢) có bộ Ngôn (讠) dâng lời nói tri ân sâu đậm từ đáy lòng đối phương." 
    },
    { 
        "id": 130, 
        "word": "敢", 
        "pinyin": "gǎn", 
        "meaning": "dũng cảm, dám", 
        "example": "我不敢说 (Wǒ bù gǎn shuō) - Tôi không dám nói", 
        "tip": "Chữ gồm bộ Phộc (攵- roi da răn đe). Tay cầm vũ khí đối đầu quái thú thể hiện lòng dũng cảm." 
    },
    { 
        "id": 131, 
        "word": "赶", 
        "pinyin": "gǎn", 
        "meaning": "đuổi theo, vội vã", 
        "example": "赶火车 (Gǎn huǒchē) - Đuổi kịp tàu hỏa", 
        "tip": "Cật (赶) gồm chữ Tẩu (走 - chạy nhanh) để đuổi kịp (Khanh 干 - va chạm) lấy cơ hội." 
    },
    { 
        "id": 132, 
        "word": "阳光", 
        "pinyin": "yángguāng", 
        "meaning": "ánh nắng, tươi sáng", 
        "example": "温暖的阳光 (Wēnnuǎn de yángguāng) - Ánh nắng ấm áp", 
        "tip": "Dương (阳) có bộ Phụ (阝- gò đất) và chữ Dịch (易 - mặt trời mọc tỏa nắng ấm rực rỡ)." 
    },
    { 
        "id": 133, 
        "word": "刚好", 
        "pinyin": "gānghǎo", 
        "meaning": "vừa vặn, đúng lúc", 
        "example": "我刚好到家 (Wǒ gānghǎo dào jiā) - Tôi vừa vặn về tới nhà", 
        "tip": "Cương (刚) có bộ Đao (刀 - dao băm vát dứt khoát). Cắt đứt chuẩn xác đúng thời điểm ranh giới." 
    },
    { 
        "id": 134, 
        "word": "感觉", 
        "pinyin": "gǎnjué", 
        "meaning": "cảm giác, cảm thấy", 
        "example": "感觉很不舒服 (Gǎnjué hěn bù shūfu) - Cảm thấy rất khó chịu", 
        "tip": "Giác (觉) có bộ Kiến (见 - nhìn thấy). Trải qua việc nghe thấy bằng các giác quan tạo ra nhận thức." 
    },
    { 
        "id": 135, 
        "word": "高速公路", 
        "pinyin": "gāosù gōnglù", 
        "meaning": "đường cao tốc", 
        "example": "开上高速公路 (Kāi shàng gāosù gōnglù) - Lái xe lên đường cao tốc", 
        "tip": "Tốc (速) có bộ Sước (辶- chạy nhảy nhanh). Lộ (路) có bộ Túc (足), đường dành cho bánh xe lăn đi." 
    },
    { 
        "id": 136, 
        "word": "胳膊", 
        "pinyin": "gēbo", 
        "meaning": "cánh tay", 
        "example": "胳膊疼 (Gēbo téng) - Đau cánh tay", 
        "tip": "Cả hai chữ Các (胳) Bác (膊) đều có bộ Nguyệt (月 - thịt cơ). Các múi cơ tạo nên bắp tay khỏe mạnh." 
    },
    { 
        "id": 137, 
        "word": "各", 
        "pinyin": "gè", 
        "meaning": "các, mỗi (loại)", 
        "example": "各抒己见 (Gèshūjǐjiàn) - Mỗi người bày tỏ ý kiến riêng", 
        "tip": "Các (各) gồm bộ Tuy (夊- bước chân đi ngược lại) trên chữ Khẩu (口). Mỗi miệng nói một hướng đi khác nhau." 
    },
    { 
        "id": 138, 
        "word": "工资", 
        "pinyin": "gōngzī", 
        "meaning": "tiền lương, thu nhập", 
        "example": "发工资了 (Fā gōngzī le) - Phát lương rồi", 
        "tip": "Tư (资) có bộ Bối (贝 - tiền bạc của cải tài nguyên). Tài sản thưởng cho công sức lao động (Công 工)." 
    },
    { 
        "id": 139, 
        "word": "公平", 
        "pinyin": "gōngpíng", 
        "meaning": "công bằng", 
        "example": "公平竞争 (Gōngpíng jìngzhēng) - Cạnh tranh công bằng", 
        "tip": "Công (公 - chung, công hữu). Bình (平 - cân bằng bằng phẳng). Chia tài sản chung một cách thăng bằng bằng phẳng." 
    },
    { 
        "id": 140, 
        "word": "公共汽车", 
        "pinyin": "gōnggòng qìchē", 
        "meaning": "xe buýt", 
        "example": "坐公共汽车 (Zuò gōnggòng qìchē) - Đi xe buýt", 
        "tip": "Cộng (共) vẽ hình hai tay nâng đồ dâng hiến phục vụ lợi ích chung của toàn thể cộng đồng." 
    },
    { 
        "id": 141, 
        "word": "公寓", 
        "pinyin": "gōngyù", 
        "meaning": "căn hộ, chung cư", 
        "example": "单身公寓 (Dānshēn gōngyù) - Căn hộ độc thân", 
        "tip": "Ngự (寓) có bộ Miên (宀 - mái nhà) nuôi nấng bảo vệ nơi cư ngụ dừng chân lâu dài." 
    },
    { 
        "id": 142, 
        "word": "公斤", 
        "pinyin": "gōngjīn", 
        "meaning": "ki-lô-gam (cân)", 
        "example": "一公斤苹果 (Yì gōngjīn píngguǒ) - Một cân táo", 
        "tip": "Cân (斤 - cái rìu). Đơn vị đo trọng lượng chuẩn hóa bằng kim khí đúc cân xưa kia." 
    },
    { 
        "id": 143, 
        "word": "公司", 
        "pinyin": "gōngsī", 
        "meaning": "công ty", 
        "example": "在外企公司工作 (Zài wàiqǐ gōngsī gōngzuò) - Làm việc ở công ty nước ngoài", 
        "tip": "Ty (司) có bộ Khẩu (口) chỉ cơ quan phát lệnh điều hành quản lý công việc hành chính." 
    },
    { 
        "id": 144, 
        "word": "功夫", 
        "pinyin": "gōngfu", 
        "meaning": "võ thuật, kungfu, thời gian rảnh", 
        "example": "中国功夫 (Zhōngguó gōngfu) - Võ thuật Trung Hoa", 
        "tip": "Công phu. Sức mạnh bỏ ra bền bỉ lâu dài của người đàn ông trưởng thành (Phu 夫) có chí khí gánh vác." 
    },
    { 
        "id": 145, 
        "word": "共同", 
        "pinyin": "gòngtóng", 
        "meaning": "chung, cùng nhau", 
        "example": "共同努力 (Gòngtóng nǔlì) - Cùng nhau nỗ lực", 
        "tip": "Đồng (同) có bộ Vi bao quanh chữ Khẩu, mọi người đồng lòng hướng về một chiếc miệng chung." 
    },
    { 
        "id": 146, 
        "word": "够", 
        "pinyin": "gòu", 
        "meaning": "đủ, đầy đủ", 
        "example": "钱不够 (Qián bú gòu) - Tiền không đủ", 
        "tip": "Cấu (够) gồm chữ Đa (多 - nhiều) và chữ Câu (句 - câu nói). Nói nhiều câu lặp lại liên tục biểu thị đã quá đủ." 
    },
    { 
        "id": 147, 
        "word": "估计", 
        "pinyin": "gūjì", 
        "meaning": "ước lượng, đánh giá", 
        "example": "我估计他不会来 (Wǒ gūjì tā bú huì lái) - Tôi ước chừng cậu ấy sẽ không đến", 
        "tip": "Kế (计) có bộ Ngôn (讠) và chữ Thập (十). Dùng lời nói tính toán đếm số từ một đến mười." 
    },
    { 
        "id": 148, 
        "word": "鼓励", 
        "pinyin": "gǔlì", 
        "meaning": "khuyến khích, cổ vũ", 
        "example": "老师鼓励我 (Lǎoshī gǔlì wǒ) - Thầy cô khuyến khích tôi", 
        "tip": "Lệ (励) có bộ Lực (力), cổ vũ tiếp thêm sức mạnh cơ bắp dũng khí vượt qua thử thách khó khăn." 
    },
    { 
        "id": 149, 
        "word": "故意", 
        "pinyin": "gùyì", 
        "meaning": "cố ý, cố tình", 
        "example": "他不是故意的 (Tā bú shì gùyì de) - Cậu ấy không phải cố ý đâu", 
        "tip": "Cố (故 - nguyên nhân cũ kĩ). Ý (意) là suy nghĩ sắp đặt có mục đích từ trước trong tâm khảm." 
    },
    { 
        "id": 150, 
        "word": "顾客", 
        "pinyin": "gùkè", 
        "meaning": "khách hàng", 
        "example": "顾客是上帝 (Gùkè shì Shàngdì) - Khách hàng là Thượng đế", 
        "tip": "Khách (客) có bộ Miên (宀 - nhà) và chữ Các (各). Những vị khách ghé thăm nghỉ ngơi tại tệ xá." 
    },
    { 
        "id": 151, 
        "word": "挂", 
        "pinyin": "guà", 
        "meaning": "treo, mắc", 
        "example": "把大衣挂在墙上 (Bǎ dàyī guà zài qiáng shàng) - Treo áo khoác lên tường", 
        "tip": "Quái (挂) có bộ Thủ (扌- tay) và chữ Quái (卦 - quẻ bói). Dùng tay treo quẻ bói lên tường để xem." 
    },
    { 
        "id": 152, 
        "word": "关键", 
        "pinyin": "guānjiàn", 
        "meaning": "mấu chốt, then chốt", 
        "example": "问题的关键 (Wèntí de guānjiàn) - Mấu chốt của vấn đề", 
        "tip": "Quan (关 - cửa ải), Kiện (键) có bộ Kim (钅- kim loại) chỉ chiếc chốt cửa sắt then chốt khóa chặt." 
    },
    { 
        "id": 153, 
        "word": "观众", 
        "pinyin": "guānzhòng", 
        "meaning": "khán giả", 
        "example": "台下的观众 (Tái xià de guānzhòng) - Khán giả phía dưới khán đài", 
        "tip": "Quan (观) là nhìn ngắm bằng mắt (Kiến 见). Chúng (众) gồm ba chữ Nhân (人) tượng trưng cho đám đông quần chúng." 
    },
    { 
        "id": 154, 
        "word": "管理", 
        "pinyin": "guǎnlǐ", 
        "meaning": "quản lý", 
        "example": "管理公司 (Guǎnlǐ gōngsī) - Quản lý công ty", 
        "tip": "Quản (管) dùng thẻ tre (⺮) cai trị đất nước. Lý (理) có bộ Vương (王 - vua), vua xử lý công việc chuẩn mực như mài ngọc." 
    },
    { 
        "id": 155, 
        "word": "光", 
        "pinyin": "guāng", 
        "meaning": "ánh sáng / chỉ / hết sạch", 
        "example": "把钱花光了 (Bǎ qián huā guāng le) - Tiêu hết sạch tiền rồi", 
        "tip": "Quang (光) vẽ hình ngọn lửa bùng cháy trên đầu con người, chiếu rọi ánh sáng." 
    },
    { 
        "id": 156, 
        "word": "广播", 
        "pinyin": "guǎngbō", 
        "meaning": "phát thanh, truyền hình", 
        "example": "听广播新闻 (Tīng guǎngbō xīnwén) - Nghe tin tức phát thanh", 
        "tip": "Quảng (广 - không gian rộng lớn). Ba (播) có bộ Thủ (扌- tay) gieo vãi hạt giống âm thanh đi muôn phương." 
    },
    { 
        "id": 157, 
        "word": "广告", 
        "pinyin": "guǎnggào", 
        "meaning": "quảng cáo", 
        "example": "看广告 (Kàn guǎnggào) - Xem quảng cáo", 
        "tip": "Quảng (广) rộng rãi. Cáo (告) gồm chữ Ngưu (牛 - trâu) và chữ Khẩu (口). Miệng tuyên bố to rõ như tiếng trâu rống giữa đất trống." 
    },
    { 
        "id": 158, 
        "word": "逛", 
        "pinyin": "guàng", 
        "meaning": "đi dạo, dạo chơi", 
        "example": "逛街 (Guàngjiē) - Đi dạo phố, mua sắm", 
        "tip": "Cuồng (逛) gồm bộ Sước (辶- bước đi) và chữ Cuồng (狂 - điên cuồng). Bước chân đi chơi tung tăng thoải mái dạo chơi." 
    },
    { 
        "id": 159, 
        "word": "规定", 
        "pinyin": "guīdìng", 
        "meaning": "quy định, quy tắc", 
        "example": "遵守规定 (Zūnshǒu guīdìng) - Tuân thủ quy định", 
        "tip": "Quy (规) có bộ Kiến (见 - nhìn thấy) quy chuẩn khuôn mẫu rõ ràng để áp dụng cố định (Định 定)." 
    },
    { 
        "id": 160, 
        "word": "国籍", 
        "pinyin": "guójí", 
        "meaning": "quốc tịch", 
        "example": "中国国籍 (Zhōngguó guójí) - Quốc tịch Trung Quốc", 
        "tip": "Tịch (籍) có bộ Trúc (⺮) và chữ Tích (昔 - xưa kia). Sổ sách ghi danh nhân khẩu gốc gác trên thẻ tre xưa." 
    },
    { 
        "id": 161, 
        "word": "国际", 
        "pinyin": "guójì", 
        "meaning": "quốc tế", 
        "example": "国际大都市 (Guójì dà dūshì) - Đô thị lớn tầm cỡ quốc tế", 
        "tip": "Tế (际) có bộ Phụ (阝- gò đất ranh giới) và chữ Kỳ (示 - biểu thị). Ranh giới giao thoa giữa các quốc gia." 
    },
    { 
        "id": 162, 
        "word": "果然", 
        "pinyin": "guǒrán", 
        "meaning": "quả nhiên, đúng như dự đoán", 
        "example": "他果然没来 (Tā guǒrán méi lái) - Anh ấy quả nhiên không đến", 
        "tip": "Quả (果) kết quả thực tế, Nhiên (然) có bộ Hỏa (灬) đốt lửa nướng thịt chín là lẽ đương nhiên phải thế." 
    },
    { 
        "id": 163, 
        "word": "过", 
        "pinyin": "guò", 
        "meaning": "qua, đón (tết, sinh nhật)", 
        "example": "过生日 (Guò shēngrì) - Đón sinh nhật, ăn mừng sinh nhật", 
        "tip": "Quá (过) gồm bộ Sước (辶- di chuyển) nâng bước chân vượt qua ranh giới thời gian hoặc không gian." 
    },
    { 
        "id": 164, 
        "word": "过程", 
        "pinyin": "guòchéng", 
        "meaning": "quá trình", 
        "example": "学习的过程 (Xuéxí de guòchéng) - Quá trình học tập", 
        "tip": "Trình (程) có bộ Hòa (禾 - cây lúa). Đo đạc cân đo quá trình phát triển trưởng thành của bông lúa." 
    },
    { 
        "id": 165, 
        "word": "海洋", 
        "pinyin": "hǎiyáng", 
        "meaning": "đại dương", 
        "example": "保护海洋生物 (Bǎohù hǎiyáng shēngwù) - Bảo vệ sinh vật đại dương", 
        "tip": "Cả Hải (海) và Dương (洋) đều có bộ Thủy (氵). Vùng nước mênh mông chứa đầy tôm cá, sóng vỗ dập dềnh." 
    },
    { 
        "id": 166, 
        "word": "害羞", 
        "pinyin": "hàixiū", 
        "meaning": "xấu hổ, ngượng ngùng", 
        "example": "女孩子很害羞 (Nǚ háizi hěn hàixiū) - Cô bé rất ngượng ngùng", 
        "tip": "Tu (羞) có bộ Dương (羊 - con dê) ngoan ngoãn, rụt rè cúi đầu sợ hãi xấu hổ." 
    },
    { 
        "id": 167, 
        "word": "寒假", 
        "pinyin": "hánjià", 
        "meaning": "nghỉ đông", 
        "example": "放寒假 (Fàng hánjià) - Nghỉ đông", 
        "tip": "Hàn (寒) có hai dấu chấm băng (冫) buốt giá dưới mái nhà (宀), chỉ cái lạnh thấu xương của mùa đông." 
    },
    { 
        "id": 168, 
        "word": "汗", 
        "pinyin": "hàn", 
        "meaning": "mồ hôi", 
        "example": "流了很多汗 (Liú le hěn duō hàn) - Chảy rất nhiều mồ hôi", 
        "tip": "Hãn (汗) gồm bộ Thủy (氵- nước) và chữ Can (干 - khô). Nước thoát ra da để giữ cơ thể khô ráo." 
    },
    { 
        "id": 169, 
        "word": "好处", 
        "pinyin": "hǎochu", 
        "meaning": "lợi ích, điểm tốt", 
        "example": "多吃蔬菜有好处 (Duō chī shūcài yǒu hǎochu) - Ăn nhiều rau có lợi ích", 
        "tip": "Xử (处) nơi chốn tốt đẹp (好) mang lại phúc lợi giá trị cho con người." 
    },
    { 
        "id": 170, 
        "word": "好像", 
        "pinyin": "hǎoxiàng", 
        "meaning": "dường như, giống như", 
        "example": "好像要下雨了 (Hǎoxiàng yào xiàyǔ le) - Dường như sắp mưa rồi", 
        "tip": "Tượng (像) có bộ Nhân (亻) mô phỏng lại hình dáng to lớn của con voi (Tượng 象)." 
    },
    { 
        "id": 171, 
        "word": "号码", 
        "pinyin": "hàomǎ", 
        "meaning": "số, số hiệu", 
        "example": "电话号码 (Diànhuà hàomǎ) - Số điện thoại", 
        "tip": "Mã (码) có bộ Thạch (石 - đá). Ngày xưa dùng các quân cờ bằng đá có khắc ký hiệu chữ số để tính toán." 
    },
    { 
        "id": 172, 
        "word": "合格", 
        "pinyin": "hégé", 
        "meaning": "hợp cách, đạt tiêu chuẩn", 
        "example": "合格的产品 (Hégé de chǎnpǐn) - Sản phẩm đạt tiêu chuẩn", 
        "tip": "Cát (格) có bộ Mộc (木). Các ô ngăn gỗ được đóng chuẩn kích thước kiểm tra hàng hóa lọt hay không." 
    },
    { 
        "id": 173, 
        "word": "合适", 
        "pinyin": "héshì", 
        "meaning": "thích hợp, phù hợp", 
        "example": "穿这件衣服很合适 (Chuān zhè jiàn yīfu hěn héshì) - Mặc bộ quần áo này rất thích hợp", 
        "tip": "Thích (适) có bộ Sước (辶- bước chân đi), bước chân đi đúng hướng thoải mái gọi là phù hợp thích hợp." 
    },
    { 
        "id": 174, 
        "word": "盒子", 
        "pinyin": "hézi", 
        "meaning": "cái hộp", 
        "example": "木头盒子 (Mùtou hézi) - Hộp gỗ", 
        "tip": "Hạp (盒) có bộ Mãnh (皿 - bát đĩa, đồ đựng). Cái hộp dùng để chứa bảo quản đồ vật." 
    },
    { 
        "id": 175, 
        "word": "后悔", 
        "pinyin": "hòuhuǐ", 
        "meaning": "hối hận", 
        "example": "不要后悔你的决定 (Búyào hòuhuǐ nǐ de juédìng) - Đừng hối hận vì quyết định của bạn", 
        "tip": "Hối (悔) có bộ Tâm (忄- lòng lo lắng) và chữ Mỗi (每). Mỗi ngày đều suy nghĩ dằn vặt lo âu trong lòng." 
    },
    { 
        "id": 176, 
        "word": "厚", 
        "pinyin": "hòu", 
        "meaning": "dày", 
        "example": "厚厚的雪 (Hòuhòu de xuě) - Tuyết dày cộp", 
        "tip": "Chữ vẽ sườn núi dốc đứng kiên cố vững chãi, chỉ lớp đất đá bồi đắp dày dặn." 
    },
    { 
        "id": 177, 
        "word": "互联网", 
        "pinyin": "hùliánwǎng", 
        "meaning": "mạng internet", 
        "example": "使用互联网 (Shǐyòng hùliánwǎng) - Sử dụng mạng internet", 
        "tip": "Võng (网) vẽ mạng lưới đánh cá xưa, nay đại diện cho lưới kết nối mạng máy tính toàn cầu." 
    },
    { 
        "id": 178, 
        "word": "互相", 
        "pinyin": "hùxiāng", 
        "meaning": "lẫn nhau, tương hỗ", 
        "example": "互相学习 (Hùxiāng xuéxí) - Học hỏi lẫn nhau", 
        "tip": "Hỗ (互) vẽ hình hai tay kéo dây đan chéo móc nối qua lại chặt chẽ với nhau." 
    },
    { 
        "id": 179, 
        "word": "护照", 
        "pinyin": "hùzhào", 
        "meaning": "hộ chiếu", 
        "example": "办签证需要护照 (Bàn qiānzhèng xūyào hùzhào) - Làm visa cần hộ chiếu", 
        "tip": "Hộ (护) có bộ Thủ (扌- dùng tay che chở) bảo vệ quyền lợi công dân khi đi ra nước ngoài." 
    },
    { 
        "id": 180, 
        "word": "花", 
        "pinyin": "huā", 
        "meaning": "tiêu (tiền, thời gian)", 
        "example": "花很多时间 (Huā hěn duō shíjiān) - Tiêu tốn nhiều thời gian", 
        "tip": "Hoa (花) có bộ Thảo (艹). Tiêu pha tiền của phân tán ra nhanh chóng hao hụt như hoa nở mau tàn." 
    },
    { 
        "id": 181, 
        "word": "花园", 
        "pinyin": "huāyuán", 
        "meaning": "vườn hoa", 
        "example": "美丽的花园 (Měilì de huāyuán) - Vườn hoa xinh đẹp", 
        "tip": "Viên (园) có bộ Vi (囗- tường vây quanh rào chắn bảo vệ vườn cây trái sum sê bên trong)." 
    },
    { 
        "id": 182, 
        "word": "怀疑", 
        "pinyin": "huáiyí", 
        "meaning": "hoài nghi, nghi ngờ", 
        "example": "我怀疑这件事 (Wǒ huáiyí zhè jiàn shì) - Tôi nghi ngờ việc này", 
        "tip": "Hoài (怀) có bộ Tâm (忄) ôm giữ trong lòng. Nghi (疑) vẽ hình người lạc đường chống gậy ngơ ngác phân vân." 
    },
    { 
        "id": 183, 
        "word": "欢迎", 
        "pinyin": "huānyíng", 
        "meaning": "hoan nghênh, chào mừng", 
        "example": "欢迎来到越南 (Huānyíng lái dào Yuènán) - Chào mừng đến với Việt Nam", 
        "tip": "Nghênh (迎) có bộ Sước (辶- di chuyển). Đi từng bước nồng hậu ra đón khách phương xa ghé thăm." 
    },
    { 
        "id": 184, 
        "word": "环境", 
        "pinyin": "huánjìng", 
        "meaning": "môi trường", 
        "example": "保护环境 (Bǎohù huánjìng) - Bảo vệ môi trường", 
        "tip": "Cảnh (境) có bộ Thổ (土 - đất đai). Ranh giới vùng đất thổ nhưỡng bao bọc sinh sống." 
    },
    { 
        "id": 185, 
        "word": "换", 
        "pinyin": "huàn", 
        "meaning": "đổi, trao đổi", 
        "example": "换钱 (Huàn qián) - Đổi tiền", 
        "tip": "Hoán (换) có bộ Thủ (扌- tay). Dùng đôi tay trao đổi chuyền tay nhau món đồ vật." 
    },
    { 
        "id": 186, 
        "word": "活泼", 
        "pinyin": "huópō", 
        "meaning": "hoạt bát, nhanh nhẹn", 
        "example": "活泼的孩子 (Huópō de háizi) - Đứa trẻ hoạt bát nhanh nhẹn", 
        "tip": "Bát (泼) có bộ Thủy (氵), dội nước té nước ào ào vui tươi rộn rã đầy sức sống." 
    },
    { 
        "id": 187, 
        "word": "活跃", 
        "pinyin": "huóyuè", 
        "meaning": "hoạt bát, nhộn nhịp", 
        "example": "课堂气氛活跃 (Kètáng qìfēn huóyuè) - Bầu không khí lớp học nhộn nhịp", 
        "tip": "Dược (跃) có bộ Túc (足 - chân). Đôi chân nhảy múa rộn ràng hoạt náo tạo không khí sôi động." 
    },
    { 
        "id": 188, 
        "word": "火", 
        "pinyin": "huǒ", 
        "meaning": "lửa / nổi tiếng, hot", 
        "example": "最近这部电影很火 (Zuìjìn zhè bù diànyǐng hěn huǒ) - Gần đây bộ phim này rất hot", 
        "tip": "Chữ tượng hình vẽ lại ngọn lửa đỏ rực đang cháy bùng lên mạnh mẽ." 
    },
    { 
        "id": 189, 
        "word": "获得", 
        "pinyin": "huòdé", 
        "meaning": "giành được, thu được", 
        "example": "获得一等奖 (Huòdé yī děng jiǎng) - Giành giải nhất", 
        "tip": "Hoạch (获) có bộ Khuyển (犭) dắt chó đi săn lùng bắt dứt khoát con mồi ngoài đồng cỏ." 
    },
    { 
        "id": 190, 
        "word": "积极", 
        "pinyin": "jījí", 
        "meaning": "tích cực", 
        "example": "积极地面对生活 (Jījí de miànduì shēnghuó) - Đối mặt tích cực với cuộc sống", 
        "tip": "Cực (极) có bộ Mộc (木 - xà nhà nóc nhà cao nhất). Nỗ lực phấn đấu trèo lên đỉnh nóc nhà thành công." 
    },
    { 
        "id": 191, 
        "word": "积累", 
        "pinyin": "jīlěi", 
        "meaning": "tích lũy", 
        "example": "积累工作经验 (Jīlěi gōngzuò jīngyàn) - Tích lũy kinh nghiệm làm việc", 
        "tip": "Lũy (累) gồm Điền (田 - ruộng) và Mịch (纟- sợi tơ). Gom góp dệt từng sợi chỉ thâu đêm trồng trọt tươm tất." 
    },
    { 
        "id": 192, 
        "word": "基础", 
        "pinyin": "jīchǔ", 
        "meaning": "cơ sở, nền tảng", 
        "example": "零基础学汉语 (Líng jīchǔ xué Hànyǔ) - Học tiếng Trung từ con số không (không nền tảng)", 
        "tip": "Sở (础) có bộ Thạch (石 - đá kê cột nhà). Viên đá tảng đặt dưới móng cột nhà gánh đỡ ngôi nhà vững chắc." 
    },
    { 
        "id": 193, 
        "word": "激动", 
        "pinyin": "jīdòng", 
        "meaning": "kích động, xúc động", 
        "example": "心情很激动 (Xīnqíng hěn jīdòng) - Tâm trạng rất xúc động", 
        "tip": "Kích (激) gồm bộ Thủy (氵- nước chảy siết xiết va đập đá bọt nước tung trắng xóa nổ ra cảm xúc)." 
    },
    { 
        "id": 194, 
        "word": "及时", 
        "pinyin": "jíshí", 
        "meaning": "kịp thời, đúng lúc", 
        "example": "及时解决问题 (Jíshí jiějué wèntí) - Giải quyết vấn đề kịp thời", 
        "tip": "Cập (及) vẽ tay níu kéo giữ người chạy đằng trước lại thành công ngay lúc đó." 
    },
    { 
        "id": 195, 
        "word": "即使", 
        "pinyin": "jíshǐ", 
        "meaning": "ngay cả, cho dù", 
        "example": "即使下雨也去 (Jíshǐ xiàyǔ yě qù) - Cho dù trời mưa cũng đi", 
        "tip": "Tức (即) vẽ một người đang quỳ kề sát bát thức ăn định thưởng thức, chỉ trạng thái tiếp cận sát sườn." 
    },
    { 
        "id": 196, 
        "word": "计划", 
        "pinyin": "jìhuà", 
        "meaning": "kế hoạch, lên kế hoạch", 
        "example": "制定学习计划 (Zhìdìng xuéxí jìhuà) - Lên kế hoạch học tập", 
        "tip": "Vạch (划) có bộ Đao (刀 - dao sắc). Dùng dao khắc vạch phân chia ranh giới kế hoạch chi tiết." 
    },
    { 
        "id": 197, 
        "word": "计算机", 
        "pinyin": "jìsuànjī", 
        "meaning": "máy tính, máy điện toán", 
        "example": "计算机专业 (Jìsuànjī zhuānyè) - Chuyên ngành khoa học máy tính", 
        "tip": "Toán (算) gồm bộ Trúc (⺮) dụng cụ đếm bằng thẻ tre và hai bàn tay nâng niu mưu tính số liệu." 
    },
    { 
        "id": 198, 
        "word": "记者", 
        "pinyin": "jìzhě", 
        "meaning": "nhà báo, phóng viên", 
        "example": "接受记者采访 (Jiēshòu jìzhě cǎifǎng) - Tiếp nhận phóng viên phỏng vấn", 
        "tip": "Ký (记) có bộ Ngôn (讠) dùng lời nói ghi chép lại thông tin trung thực của xã hội." 
    },
    { 
        "id": 199, 
        "word": "技术", 
        "pinyin": "jìshù", 
        "meaning": "kỹ thuật", 
        "example": "技术水平高 (Jìshù shuǐpíng gāo) - Trình độ kỹ thuật cao", 
        "tip": "Kỹ (技) có bộ Thủ (扌- đôi bàn tay khéo léo). Đôi tay rèn giũa tạo nên tay nghề tinh xảo chất lượng." 
    },
    { 
        "id": 200, 
        "word": "既然", 
        "pinyin": "jìrán", 
        "meaning": "đã, dẫu rằng (giới từ liên kết)", 
        "example": "既然来了就别走 (Jìrán lái le jiù bié zǒu) - Đã đến rồi thì đừng đi vội", 
        "tip": "Ký (既) vẽ hình người ăn xong quay lưng bỏ đi. Sự việc đã diễn ra xong xuôi không quay đầu lại." 
    },
    { 
        "id": 201, 
        "word": "继续", 
        "pinyin": "jìxù", 
        "meaning": "tiếp tục", 
        "example": "继续努力 (Jìxù nǔlì) - Tiếp tục nỗ lực", 
        "tip": "Tục (续) có bộ Mịch (纟- sợi tơ). Nối tiếp sợi chỉ đứt dệt liên tiếp không để gián đoạn." 
    },
    { 
        "id": 202, 
        "word": "寄", 
        "pinyin": "jì", 
        "meaning": "gửi (thư, bưu phẩm)", 
        "example": "寄快递 (Jì kuàidì) - Gửi chuyển phát nhanh", 
        "tip": "Ký (寄) dưới mái nhà (宀) là chữ Kỳ (奇). Ký gửi đồ đạc xa lạ nương nhờ tạm bợ nhà người khác." 
    },
    { 
        "id": 203, 
        "word": "加班", 
        "pinyin": "jiābān", 
        "meaning": "tăng ca, làm thêm giờ", 
        "example": "今天不加班 (Jīntiān bù jiābān) - Hôm nay không tăng ca làm việc", 
        "tip": "Gia (加) có bộ Lực (力) và Khẩu (口). Dùng sức và miệng hò hét tăng ca gia công sản xuất." 
    },
    { 
        "id": 204, 
        "word": "加油站", 
        "pinyin": "jiāyóuzhàn", 
        "meaning": "trạm xăng, cây xăng", 
        "example": "去加油站加满油 (Qù jiāyóuzhàn jiā mǎn yóu) - Đi cây xăng đổ đầy bình", 
        "tip": "Trạm (站) gồm chữ Lập (立 - đứng) và chữ Chiêm. Nơi dừng chân đứng đợi xe cộ lấy năng lượng." 
    },
    { 
        "id": 205, 
        "word": "家具", 
        "pinyin": "jiājù", 
        "meaning": "đồ gia dụng, đồ gỗ trong nhà", 
        "example": "买一套新家具 (Mǎi yí tào xīn jiājù) - Mua một bộ đồ gỗ gia dụng mới", 
        "tip": "Cụ (具) vẽ chiếc hòm báu có hai chân gánh đỡ, chứa công cụ tiện ích sinh hoạt trong nhà." 
    },
    { 
        "id": 206, 
        "word": "价格", 
        "pinyin": "jiāgè", 
        "meaning": "giá cả", 
        "example": "价格便宜 (Jiāgè piányi) - Giá cả rẻ hạt dẻ", 
        "tip": "Giá (价) có bộ Nhân đứng (亻). Con người đứng thương lượng thẩm định giá trị món đồ." 
    },
    { 
        "id": 207, 
        "word": "假", 
        "pinyin": "jiǎ", 
        "meaning": "giả, không thật", 
        "example": "假消息 (Jiǎ xiāoxi) - Tin tức giả mạo, tin vịt", 
        "tip": "Giả (假) có bộ Nhân (亻) mượn chữ Gia đằng sau. Con người làm ra đồ nhân tạo không có nguồn gốc tự nhiên." 
    },
    { 
        "id": 208, 
        "word": "坚持", 
        "pinyin": "jiānchí", 
        "meaning": "kiên trì", 
        "example": "坚持到底就是胜利 (Jiānchí dàodǐ jiùshì shènglì) - Kiên trì đến cùng chính là chiến thắng", 
        "tip": "Trì (持) có bộ Thủ (扌- tay). Giơ tay cầm giữ khư khư lấy mục tiêu không chịu buông bỏ." 
    },
    { 
        "id": 209, 
        "word": "减肥", 
        "pinyin": "jiǎnféi", 
        "meaning": "giảm béo, giảm cân", 
        "example": "计划减肥 (Jìhuà jiǎnféi) - Lên kế hoạch giảm cân béo", 
        "tip": "Phì (肥) có bộ Nguyệt (月 - thịt mỡ cơ thể). Mỡ thừa tích tụ nhiều khiến bắp thịt trương to phì nhiêu." 
    },
    { 
        "id": 210, 
        "word": "减少", 
        "pinyin": "jiǎnshǎo", 
        "meaning": "giảm bớt, cắt giảm", 
        "example": "减少工作时间 (Jiǎnshǎo gōngzuò shíjiān) - Cắt giảm bớt thời gian làm việc", 
        "tip": "Giảm (减) có bộ Băng (冫- sương giá buốt lạnh làm teo tóp co hẹp kích thước đồ vật lại)." 
    },
    { 
        "id": 211, 
        "word": "建议", 
        "pinyin": "jiànyì", 
        "meaning": "kiến nghị, đề xuất", 
        "example": "提出好建议 (Tíchū hǎo jiànyì) - Đề xuất kiến nghị hay xuất sắc", 
        "tip": "Nghị (议) gồm Ngôn (讠) phát biểu và Nghĩa (义) đúng đắn chuẩn mực hợp tình hợp lý." 
    },
    { 
        "id": 212, 
        "word": "将来", 
        "pinyin": "jiānglái", 
        "meaning": "tương lai, mai sau", 
        "example": "美好的将来 (Měihǎo de jiānglái) - Tương lai tươi sáng tốt đẹp", 
        "tip": "Tương (将) mang nghĩa chuẩn bị sẽ diễn ra nối liền với Lai (来 - sắp đến)." 
    },
    { 
        "id": 213, 
        "word": "奖金", 
        "pinyin": "jiǎngjīn", 
        "meaning": "tiền thưởng", 
        "example": "发年终奖金 (Fā niánzhōng jiǎngjīn) - Phát tiền thưởng cuối năm", 
        "tip": "Tưởng (奖) gồm chữ Tương đứng trên bộ Đại (大) và Bối (贝 - của cải). Thưởng tiền nong khích lệ nỗ lực lớn." 
    },
    { 
        "id": 214, 
        "word": "降低", 
        "pinyin": "jiàngdī", 
        "meaning": "hạ thấp, giảm xuống", 
        "example": "降低产品价格 (Jiàngdī chǎnpǐn jiāgè) - Giảm giá hạ thấp giá thành sản phẩm", 
        "tip": "Giáng (降) có bộ Phụ (阝- gò đất đồi dốc). Bước từng bước đi lùi từ trên dốc thoải xuống mặt đất phẳng." 
    },
    { 
        "id": 215, 
        "word": "交", 
        "pinyin": "jiāo", 
        "meaning": "nộp, giao, kết bạn", 
        "example": "交学费 (Jiāo xuéfèi) - Nộp học phí", 
        "tip": "Giao (交) vẽ hình người đứng vắt chéo chân giao lưu tiếp xúc trao đổi qua lại." 
    },
    { 
        "id": 216, 
        "word": "交流", 
        "pinyin": "jiāoliú", 
        "meaning": "giao lưu, trao đổi", 
        "example": "跟外国人交流 (Gēn wàiguórén jiāoliú) - Giao lưu đối thoại với người nước ngoài", 
        "tip": "Lưu (流) có bộ Thủy (氵) chỉ sự giao lưu trôi chảy xuyên suốt dào dạt như dòng nước chảy xiết." 
    },
    { 
        "id": 217, 
        "word": "交通", 
        "pinyin": "jiāotōng", 
        "meaning": "giao thông", 
        "example": "交通工具 (Jiāotōng gōngjù) - Phương tiện giao thông", 
        "tip": "Thông (通) gồm bộ Sước (辶- di chuyển bước đi). Đường sá thông thoáng giúp bánh xe lăn đều." 
    },
    { 
        "id": 218, 
        "word": "郊区", 
        "pinyin": "jiāoqū", 
        "meaning": "ngoại ô, ngoại thành", 
        "example": "住在市中心还是郊区？(Zhù zài shìzhōngxīn háishi jiāoqū?) - Sống ở trung tâm thành phố hay ngoại thành?", 
        "tip": "Giao (郊) gồm chữ Giao vắt chéo và bộ ấp (阝- vùng đất). Vùng đất giáp ranh ranh giới giữa đô thị và nông thôn." 
    },
    { 
        "id": 219, 
        "word": "骄傲", 
        "pinyin": "jiāo'ào", 
        "meaning": "kiêu ngạo, tự hào", 
        "example": "我为你感到骄傲 (Wǒ wèi nǐ gǎndào jiāo'ào) - Tôi tự hào vì bạn", 
        "tip": "Kiêu (骄) có bộ Mã (马 - con ngựa). Con tuấn mã tốt mã vươn cổ ngẩng cao đầu phi nước kiêu hãnh kiêu ngạo." 
    },
    { 
        "id": 220, 
        "word": "饺子", 
        "pinyin": "jiǎozu", 
        "meaning": "sủi cảo, bánh chẻo", 
        "example": "吃包子还是饺子？(Chī bāozi háishi jiǎozu?) - Ăn bánh bao hay bánh sủi cảo?", 
        "tip": "Giảo (饺) có bộ Thực (饣- đồ ăn thức uống). Loại bánh làm từ bột gạo gói nhân thịt nướng thơm lừng." 
    },
    { 
        "id": 221, 
        "word": "教授", 
        "pinyin": "jiàoshòu", 
        "meaning": "giáo sư", 
        "example": "大学教授 (Dàxué jiàoshòu) - Giáo sư trường đại học", 
        "tip": "Thụ (授) có bộ Thủ (扌- đôi tay). Thầy giáo dùng đôi tay nâng đỡ truyền thụ tri thức cho học trò." 
    },
    { 
        "id": 222, 
        "word": "教育", 
        "pinyin": "jiàoyù", 
        "meaning": "giáo dục", 
        "example": "家庭教育 (Jiātíng jiàoyù) - Giáo dục gia đình", 
        "tip": "Dục (育) có bộ Nguyệt chỉ cơ thể con người. Nuôi nấng dạy dỗ đứa trẻ khôn lớn khỏe mạnh." 
    },
    { 
        "id": 223, 
        "word": "接受", 
        "pinyin": "jiēshòu", 
        "meaning": "tiếp nhận, chấp nhận", 
        "example": "接受礼物 (Jiēshòu lǐwù) - Nhận món quà tặng", 
        "tip": "Tiếp (接) có bộ Thủ (扌- tay). Giơ đôi bàn tay đón nhận đồ vật trực tiếp từ đối phương." 
    },
    { 
        "id": 224, 
        "word": "接着", 
        "pinyin": "jiēzhe", 
        "meaning": "tiếp theo, nối tiếp", 
        "example": "他想了想，接着说 (Tā xiǎng le xiǎng, jiēzhe shuō) - Anh ấy suy nghĩ một lát rồi tiếp tục nói", 
        "tip": "Trước (着) có bộ Mục (目) nhìn chăm chú dõi theo bước đi nối tiếp nhau không dời mắt." 
    },
    { 
        "id": 225, 
        "word": "节", 
        "pinyin": "jié", 
        "meaning": "tiết, lượng từ môn học / lễ tết", 
        "example": "一节课 (Yì jié kè) - Một tiết học, giờ học", 
        "isMeasureWord": true, 
        "tip": "Tiết (节) có bộ Trúc (⺮- tre trúc). Đốt tre trúc chia ngăn định kỳ, chỉ ngày lễ hoặc khoảng giờ chuẩn hóa." 
    },
    { 
        "id": 226, 
        "word": "节约", 
        "pinyin": "jiéyuē", 
        "meaning": "tiết kiệm", 
        "example": "节约用水 (Jiéyuē yòngshuǐ) - Tiết kiệm sử dụng nước sạch", 
        "tip": "Ước (约) có bộ Mịch (纟- tơ dây). Thắt dây buộc chặt chi tiêu chừng mực không phung phí hoang phí." 
    },
    { 
        "id": 227, 
        "word": "结果", 
        "pinyin": "jiéguǒ", 
        "meaning": "kết quả", 
        "example": "正确的考试结果 (Zhèngquè de kǎoshì jiéguǒ) - Kết quả kiểm tra chính xác", 
        "tip": "Kết (结) có bộ Mịch (纟- sợi tơ tằm dệt). Thắt nút hoàn chỉnh sợi tơ dệt nên quả ngọt trĩu cành (Quả 果)." 
    },
    { 
        "id": 228, 
        "word": "解释", 
        "pinyin": "jiěshì", 
        "meaning": "giải thích", 
        "example": "听我解释一下 (Tīng wǒ jiěshì yíxià) - Nghe tôi giải thích một chút", 
        "tip": "Giải (解) dùng dao cắt sừng trâu phân tích. Thích (释) lật lật gỡ bỏ gút mắc tìm ra nguyên nhân." 
    },
    { 
        "id": 229, 
        "word": "尽管", 
        "pinyin": "jǐnguǎn", 
        "meaning": "cho dù, mặc dù", 
        "example": "尽管很累，他仍然坚持学习 (Jǐnguǎn hěn lèi, tā réngrán jiānchí xuéxí) - Cho dù rất mệt mỏi anh ấy vẫn kiên trì học tập", 
        "tip": "Tẫn (尽) vẽ chiếc chổi quét dọn hết sạch sẽ mọi trở ngại khó khăn để đi đến mục đích." 
    },
    { 
        "id": 230, 
        "word": "紧张", 
        "pinyin": "jǐnzhāng", 
        "meaning": "căng thẳng, hồi hộp", 
        "example": "考试前感觉很紧张 (Kǎoshì qián gǎnjué hěn jǐnzhāng) - Cảm thấy rất căng thẳng hồi hộp trước kỳ thi", 
        "tip": "Trương (张) gồm bộ Cung (弓) kéo căng dây cung rúng động nổ phát súng, chỉ không khí căng thẳng buốt giá." 
    },
    { 
        "id": 231, 
        "word": "进行", 
        "pinyin": "jìnxíng", 
        "meaning": "tiến hành", 
        "example": "进行科学实验 (Jìnxíng kēxué shíyàn) - Tiến hành thí nghiệm khoa học", 
        "tip": "Tiến (进) gồm bộ Sước (辶- di chuyển bước đi). Thúc giục bước chân đi nhanh lên phía trước làm việc." 
    },
    { 
        "id": 232, 
        "word": "禁止", 
        "pinyin": "jìnzhǐ", 
        "meaning": "cấm, nghiêm cấm", 
        "example": "禁止拍照 (Jìnzhǐ pāizhào) - Nghiêm cấm chụp ảnh", 
        "tip": "Cấm (禁) có bộ Lâm (林 - rừng rậm hoang dã linh thiêng xưa) đặt biển báo quy tắc tôn nghiêm cấm thâm nhập." 
    },
    { 
        "id": 233, 
        "word": "精彩", 
        "pinyin": "jīngcǎi", 
        "meaning": "đặc sắc, tuyệt vời", 
        "example": "精彩的表演 (Jīngcǎi de biǎoyǎn) - Buổi biểu diễn đặc sắc tuyệt vời", 
        "tip": "Tinh (精) có bộ Mễ (米 - gạo trắng được sàng lọc sạch sẽ tốt nhất). Thể hiện nét đặc sắc đẹp đẽ tinh túy." 
    },
    { 
        "id": 234, 
        "word": "精神", 
        "pinyin": "jīngshén", 
        "meaning": "tinh thần, hoạt bát", 
        "example": "非常有精神 (Fēicháng yǒu jīngshén) - Rất có tinh thần, hoạt bát tràn đầy năng lượng", 
        "tip": "Thần (神) có bộ Thị (示 - điềm báo bàn thờ). Sức mạnh tâm linh nội tại tạo dũng khí tinh anh rực rỡ." 
    },
    { 
        "id": 235, 
        "word": "经常", 
        "pinyin": "jīngcháng", 
        "meaning": "thường xuyên", 
        "example": "我经常去运动 (Wǒ jīngcháng qù yùndòng) - Tôi thường xuyên đi tập thể dục", 
        "tip": "Kinh (经) dệt sợi tơ thẳng tắp làm nền móng vững chắc lặp đi lặp lại bền vững lâu dài." 
    },
    { 
        "id": 236, 
        "word": "经验", 
        "pinyin": "jīngyàn", 
        "meaning": "kinh nghiệm", 
        "example": "丰富的经验 (Fēngfù de jīngyàn) - Kinh nghiệm phong phú", 
        "tip": "Nghiệm (验) có bộ Mã (马 - ngựa). Thử nghiệm kiểm chứng phi nước ngựa chạy trên thao trường." 
    },
    { 
        "id": 237, 
        "word": "经历", 
        "pinyin": "jīnglì", 
        "meaning": "trải qua, kinh nghiệm sống", 
        "example": "经历了很多困难 (Jīnglì le hěn duō kùnnan) - Trải qua rất nhiều khó khăn thử thách", 
        "tip": "Lịch (历) gồm gò đá che chắn sườn núi hiểm trở gập ghềnh trải qua hành trình dài dằng dặc." 
    },
    { 
        "id": 238, 
        "word": "经济", 
        "pinyin": "jīngjì", 
        "meaning": "kinh tế", 
        "example": "经济大国 (Jīngjì dàguó) - Cường quốc kinh tế lớn", 
        "tip": "Tế (济) có bộ Thủy (氵- nước chảy). Cứu giúp phân bổ tài nguyên lưu thông trôi chảy cứu đói dân nghèo." 
    },
    { 
        "id": 239, 
        "word": "警察", 
        "pinyin": "jǐngchá", 
        "meaning": "cảnh sát", 
        "example": "报警叫警察 (Bàojǐng jiào jǐngchá) - Báo cảnh sát giúp đỡ", 
        "tip": "Cảnh (警) có bộ Ngôn (讠) phát lời cảnh báo giáo huấn nghiêm khắc răn đe hành vi phạm pháp." 
    },
    { 
        "id": 240, 
        "word": "京剧", 
        "pinyin": "jīngjù", 
        "meaning": "kinh kịch", 
        "example": "看一场京剧表演 (Kàn yì chǎng jīngjù biǎoyǎn) - Xem một trận biểu diễn kinh kịch cổ", 
        "tip": "Kịch (剧) có bộ Đao (刀) phân vai võ tướng dũng mãnh múa giáo gươm kịch tính trên sân khấu nghệ thuật." 
    },
    { 
        "id": 241, 
        "word": "竟然", 
        "pinyin": "jìngrán", 
        "meaning": "mà lại, ngạc nhiên thay", 
        "example": "你竟然不知道？(Nǐ jìngrán bù zhīdào?) - Cậu mà lại không biết sao? (ngạc nhiên thay)", 
        "tip": "Kính (竟) gồm chữ Lập (立 - đứng) trên chữ Khẩu, chỉ sự đứng thẳng dõng dạc nói lời dứt khoát hoàn thành." 
    },
    { 
        "id": 242, 
        "word": "竞争", 
        "pinyin": "jìngzhēng", 
        "meaning": "cạnh tranh", 
        "example": "市场竞争激烈 (Shìchǎng jìngzhēng jīliè) - Cạnh tranh thị trường khốc liệt dữ dội", 
        "tip": "Tranh (争) vẽ hai bàn tay đang ra sức giành giật kéo giật sợi dây thừng về phía mình." 
    },
    { 
        "id": 243, 
        "word": "镜子", 
        "pinyin": "jìngzi", 
        "meaning": "cái gương", 
        "example": "照镜子 (Zhào jìngzi) - Soi gương", 
        "tip": "Kính (镜) có bộ Kim (金 - đồng thau sắt báu). Gương cổ đúc bằng tấm đồng mài nhẵn loáng chiếu rọi dung nhan." 
    },
    { 
        "id": 244, 
        "word": "究竟", 
        "pinyin": "jiūjìng", 
        "meaning": "rốt cuộc, cuối cùng", 
        "example": "你究竟想要什么？(Nǐ jiūjìng xiǎng yào shénme?) - Rốt cuộc cậu thực sự muốn thứ gì?", 
        "tip": "Cứu (究) dưới hang đá sâu thẳm (Huyệt 穴) là chín năm (Cửu 九) miệt mài nghiên cứu đào bới rốt cuộc ra chân lý." 
    },
    { 
        "id": 245, 
        "word": "举", 
        "pinyin": "jǔ", 
        "meaning": "giơ lên, nâng / cử hành", 
        "example": "举手回答 (Jǔshǒu huídá) - Giơ tay phát biểu trả lời câu hỏi", 
        "tip": "Giơ (举) gồm hai bàn tay nâng vật báu to lớn phía trên cao thể hiện hành động nâng giơ." 
    },
    { 
        "id": 246, 
        "word": "举办", 
        "pinyin": "jǔbàn", 
        "meaning": "tổ chức, cử hành", 
        "example": "举办一次比赛 (Jǔbàn yí cì bǐsài) - Tổ chức một lần thi đấu giao hữu", 
        "tip": "Biện (办) có bộ Lực (力) và hai bên là lực đẩy. Dốc toàn bộ dũng khí lực lượng tổ chức công việc lớn." 
    },
    { 
        "id": 247, 
        "word": "举行", 
        "pinyin": "jǔxíng", 
        "meaning": "tiến hành, tổ chức", 
        "example": "会议正在举行呢 (Huìyì zhèngzài jǔxíng ne) - Cuộc họp đang được tiến hành tổ chức", 
        "tip": "Hành (行) vẽ lối ngã tư giao lộ đường phố thông suốt tiến hành bước chân rộn rã." 
    },
    { 
        "id": 248, 
        "word": "拒绝", 
        "pinyin": "jùjué", 
        "meaning": "từ choi, khước từ", 
        "example": "拒绝他的要求 (Jùjué tā de yāoqiú) - Từ chối yêu cầu của anh ấy", 
        "tip": "Tuyệt (绝) có bộ Mịch (纟) và đao (刀) chặt đứt lìa sợi tơ lụa, thể hiện thái độ khước từ dứt khoát." 
    },
    { 
        "id": 249, 
        "word": "距离", 
        "pinyin": "jùlí", 
        "meaning": "khoảng cách, cự ly", 
        "example": "学校距离我家很近 (Xuéxiào jùlí wǒ jiā hěn jìn) - Trường học cách nhà tôi rất gần", 
        "tip": "Ly (离) vẽ hình chim hoang dã tung cánh bay vút xa ranh giới, chỉ sự cách biệt tách rời." 
    },
    { 
        "id": 250, 
        "word": "聚会", 
        "pinyin": "jùhuì", 
        "meaning": "tụ họp, tụ tập, liên hoan", 
        "example": "参加好朋友的聚会 (Cānjiā hǎo péngyou de jùhuì) - Tham gia liên hoan họp mặt của bạn thân", 
        "tip": "Tụ (聚) có bộ Nhĩ (耳) lắng nghe và chúng nhân ngồi vây quanh tâm sự sẻ chia liên hoan mệt mỏi." 
    },
    { 
        "id": 251, 
        "word": "开玩笑", 
        "pinyin": "kāi wánxiào", 
        "meaning": "nói đùa, trêu chọc", 
        "example": "别开玩笑了 (Bié kāi wánxiào le) - Đừng nói đùa nữa", 
        "tip": "Khai (开) là mở ra, Ngoạn (玩) là chơi đùa, Tiếu (笑) là cười có bộ Trúc (⺮) ở trên. Mở đầu một câu chuyện vui để mang lại tiếng cười thoải mái." 
    },
    { 
        "id": 252, 
        "word": "看法", 
        "pinyin": "kànfǎ", 
        "meaning": "cách nhìn, quan điểm", 
        "example": "谈谈你的看法 (Tán tán nǐ de kànfǎ) - Hãy nói về quan điểm của bạn", 
        "tip": "Khán (看) là đặt tay (Thủ 扌) che trên mắt (Mục 目) để nhìn xa. Pháp (法) là phương pháp, cách thức. Nghĩa đen là cách thức mắt nhìn nhận một vấn đề." 
    },
    { 
        "id": 253, 
        "word": "考虑", 
        "pinyin": "kǎolǜ", 
        "meaning": "suy nghĩ, cân nhắc", 
        "example": "我需要考虑一下 (Wǒ xūyào kǎolǜ yíxià) - Tôi cần cân nhắc một chút", 
        "tip": "Khảo (考) chỉ sự già giặn, lão luyện. Lự (虑) có bộ Hổ (虍) và bộ Tâm (心). Suy nghĩ cẩn trọng cần tâm tính phải mạnh mẽ như hổ và sâu sắc từ tim." 
    },
    { 
        "id": 254, 
        "word": "科学", 
        "pinyin": "kēxué", 
        "meaning": "khoa học", 
        "example": "科学技术 (Kēxué jìshù) - Kỹ thuật khoa học", 
        "tip": "Khoa (科) gồm bộ Hòa (禾 - cây lúa) và chữ Đấu (斗 - cái đấu đong thóc). Cân đo, phân chia sản vật một cách chính xác, hệ thống chính là cơ sở của khoa học." 
    },
    { 
        "id": 255, 
        "word": "棵", 
        "pinyin": "kē", 
        "meaning": "cây (lượng từ)", 
        "example": "一棵树 (Yì kē shù) - Một cái cây", 
        "isMeasureWord": true, 
        "tip": "Có bộ Mộc (木) chỉ cây cối ở bên trái và chữ Quả (果) ở bên phải. Lượng từ chuyên dùng để đếm các loại cây trồng có gốc rễ sinh quả." 
    },
    { 
        "id": 256, 
        "word": "可怜", 
        "pinyin": "kělián", 
        "meaning": "đáng thương, tội nghiệp", 
        "example": "那个孩子真可怜 (Nàge háizi zhēn kělián) - Đứa trẻ đó thật tội nghiệp", 
        "tip": "Khả (可) là có thể, Liên (怜) có bộ Tâm đứng (忄) chỉ cảm xúc. Trong lòng dấy lên sự đồng cảm, trắc ẩn có thể thương xót cho ai đó." 
    },
    { 
        "id": 257, 
        "word": "可是", 
        "pinyin": "kěshì", 
        "meaning": "nhưng, cơ mà", 
        "example": "虽然累，可是很高兴 (Suīrán lèi, kěshì hěn gāoxíng) - Tuy mệt nhưng rất vui", 
        "tip": "Khả (可) kết hợp với Thị (是 - đúng vậy). Thừa nhận vế trước đúng, nhưng (可是) ngay lập tức rẽ hướng sang một thực tế khác đối lập." 
    },
    { 
        "id": 258, 
        "word": "可惜", 
        "pinyin": "kěxī", 
        "meaning": "đáng tiếc", 
        "example": "太可惜了 (Tài kěxī le) - Đáng tiếc quá", 
        "tip": "Tích (惜) có bộ Tâm đứng (忄) và chữ Tích (昔 - ngày xưa). Nuối tiếc những điều tốt đẹp đã qua trong quá khứ làm cho lòng đau nhói." 
    },
    { 
        "id": 259, 
        "word": "客厅", 
        "pinyin": "kètīng", 
        "meaning": "phòng khách", 
        "example": "坐在客厅看电视 (Zuò zài kètīng kàn diànshì) - Ngồi ở phòng khách xem tivi", 
        "tip": "Khách (客) là người đến nhà chơi. Thính (厅) có bộ Quảng (广 - mái nhà lớn). Gian phòng rộng rãi dưới mái nhà chuyên dùng để tiếp đón khách khứa." 
    },
    { 
        "id": 260, 
        "word": "肯定", 
        "pinyin": "kěndìng", 
        "meaning": "khẳng định, chắc chắn", 
        "example": "他肯定会来 (Tā kěndìng huì lái) - Anh ấy chắc chắn sẽ đến", 
        "tip": "Khẳng (肯) có bộ Nguyệt (月 - xương thịt), nghĩa gốc là đồng ý. Định (定) là cố định. Ý nói lời khẳng định chắc nịch, kiên định từ trong xương tủy." 
    },
    { 
        "id": 261, 
        "word": "空气", 
        "pinyin": "kōngqì", 
        "meaning": "không khí", 
        "example": "这里的空气很好 (Zhè lǐ de kōngqì hěn hǎo) - Không khí ở đây rất tốt", 
        "tip": "Không (空) dưới bộ Huyệt (穴 - hang động) là chữ Công (工). Khoảng trống không gian bên trong hang đá. Khí (气) là luồng hơi luân chuyển xung quanh." 
    },
    { 
        "id": 262, 
        "word": "苦", 
        "pinyin": "kǔ", 
        "meaning": "đắng, khổ cực", 
        "example": "药很苦 (Yào hěn kǔ) - Thuốc rất đắng", 
        "tip": "Khổ (苦) có bộ Thảo (艹 - cây cỏ) ở trên và chữ Cổ (古 - xưa cũ) ở dưới. Các loại thảo mộc nếm vào có vị đắng ngắt từ ngàn xưa, ví như nỗi gian khổ." 
    },
    { 
        "id": 263, 
        "word": "宽", 
        "pinyin": "kuān", 
        "meaning": "rộng, rộng rãi", 
        "example": "这条马路很宽 (Zhè tiáo mǎlù hěn kuān) - Con đường này rất rộng rãi", 
        "tip": "Khoan (宽) dưới mái nhà (宀) là chữ Kiến (见) mang nghĩa nhìn thấy rộng mở. Ngôi nhà có không gian bao la, nhìn đâu cũng thấy thông thoáng." 
    },
    { 
        "id": 264, 
        "word": "困", 
        "pinyin": "kùn", 
        "meaning": "buồn ngủ / khốn đốn, vây hãm", 
        "example": "我困了，想睡觉 (Wǒ kùn le, xiǎng shuìjiào) - Tôi buồn ngủ rồi, muốn đi ngủ", 
        "tip": "Khốn (困) có bộ Vi (囗) bao quanh bên ngoài cây gỗ (Mộc 木). Cây bị rào kín không thể phát triển, ví như cơ thể mệt mỏi bị vây hãm, chỉ muốn nhắm mắt." 
    },
    { 
        "id": 265, 
        "word": "扩大", 
        "pinyin": "kuòdà", 
        "meaning": "mở rộng", 
        "example": "扩大工作范围 (Kuòdà gōngzuò fànwéi) - Mở rộng phạm vi công việc", 
        "tip": "Khuếch (扩) có bộ Thủ (扌- tay) và chữ Quảng (广 - rộng). Dùng đôi bàn tay ra sức kéo giãn, mở rộng không gian ra bốn bề." 
    },
    { 
        "id": 266, 
        "word": "拉", 
        "pinyin": "lā", 
        "meaning": "kéo, lôi", 
        "example": "把门拉开 (Bǎ mén lā kāi) - Kéo cửa ra", 
        "tip": "Lạp (拉) có bộ Thủ (扌- tay) ở bên trái và chữ Lập (立 - đứng) ở bên phải. Dùng sức của bàn tay để lôi kéo một vật đang đứng yên chuyển động về phía mình." 
    },
    { 
        "id": 267, 
        "word": "垃圾桶", 
        "pinyin": "lājītǒng", 
        "meaning": "thùng rác", 
        "example": "扔进垃圾桶 (Rēng jìn lājītǒng) - Vứt vào thùng rác", 
        "tip": "Thùng (桶) có bộ Mộc (木), ngày xưa làm bằng gỗ. Chiếc xô gỗ chuyên dùng để chứa đất cát, chất thải (垃圾 - lạp tạp đều có bộ Thổ 土)." 
    },
    { 
        "id": 268, 
        "word": "辣", 
        "pinyin": "là", 
        "meaning": "cay", 
        "example": "这个菜 tai 辣了 (Zhè ge cài tài là le) - Món ăn này cay quá", 
        "tip": "Lạt (辣) gồm bộ Tân (辛 - cay đắng, vất vả) và chữ Thúc (束 - bó buộc). Cảm giác vị giác bị kích thích mạnh mẽ, tê dại như bị bó chặt lại khi ăn phải ớt." 
    },
    { 
        "id": 269, 
        "word": "来不及", 
        "pinyin": "láibují", 
        "meaning": "không kịp", 
        "example": "快点，要来不及了 (Kuài diǎn, yào láibují le) - Nhanh lên, sắp không kịp rồi", 
        "tip": "Lai (来 - đến) bất (不 - không) cập (及 - bắt kịp). Dù có vội vã đến nơi cũng không thể bắt kịp tiến độ hoặc thời gian quy định nữa." 
    },
    { 
        "id": 270, 
        "word": "来得及", 
        "pinyin": "láidejí", 
        "meaning": "còn kịp, kịp", 
        "example": "现在去还来得及 (Xiànzài qù hái láidejí) - Bây giờ đi vẫn còn kịp", 
        "tip": "Lai (来) đắc (得 - đạt được) cập (及 - đuổi kịp). Hành động kịp thời giúp bản thân có thể đuổi kịp mục tiêu, giữ vững được cơ hội." 
    },
    { 
        "id": 271, 
        "word": "懒", 
        "pinyin": "lǎn", 
        "meaning": "lười biếng", 
        "example": "他有点儿懒 (Tā yǒudiǎnr lǎn) - Anh ấy hơi lười một chút", 
        "tip": "Lãn (懒) có bộ Tâm đứng (忄) chỉ tâm trạng, bên phải là chữ Lại (赖 - dựa dẫm). Tâm lý chỉ muốn dựa dẫm vào người khác, không chịu tự mình vận động." 
    },
    { 
        "id": 272, 
        "word": "浪费", 
        "pinyin": "làngfèi", 
        "meaning": "lãng phí", 
        "example": "不要浪费时间 (Búyào làngfèi shíjiān) - Đừng lãng phí thời gian", 
        "tip": "Lãng (浪) có bộ Thủy (氵) chỉ sóng nước xô đẩy tiêu tán. Phí (费) có bộ Bối (贝) chỉ tiền bạc. Tiền của trôi đi vèo vèo như sóng nước mà không đem lại giá trị." 
    },
    { 
        "id": 273, 
        "word": "浪漫", 
        "pinyin": "làngmàn", 
        "meaning": "lãng mạn", 
        "example": "浪漫的爱情 (Làngmàn de àiqíng) - Tình yêu lãng mạn", 
        "tip": "Cả Lãng (浪) và Mạn (漫) đều có bộ Thủy (氵). Cảm xúc ngọt ngào trào dâng, tràn trề, phóng khoáng tựa như làn nước mát nhẹ nhàng vỗ về tâm hồn." 
    },
    { 
        "id": 274, 
        "word": "老虎", 
        "pinyin": "lǎohǔ", 
        "meaning": "con hổ", 
        "example": "一只老虎 (Yì zhī lǎohǔ) - Một con hổ", 
        "tip": "Hổ (虎) là chữ tượng hình phác họa lại cái đầu dữ tợn và vằn vện của chúa sơn lâm. Thêm chữ Lão (老) đứng trước để tôn xưng sự uy nghiêm của loài thú này." 
    },
    { 
        "id": 275, 
        "word": "冷静", 
        "pinyin": "lěngjìng", 
        "meaning": "bình tĩnh", 
        "example": "遇到事情要冷静 (Yùdào shìqíng yào lěngjìng) - Gặp chuyện phải bình tĩnh", 
        "tip": "Lãnh (冷) có bộ Băng (冫) làm dịu cái đầu nóng. Tịnh (净) biểu thị sự trong suốt, tĩnh lặng. Đầu óc mát lạnh, thông suốt giúp đưa ra quyết định sáng suốt." 
    },
    { 
        "id": 276, 
        "word": "礼貌", 
        "pinyin": "lǐmào", 
        "meaning": "lễ phép, lịch sự", 
        "example": "对人有礼貌 (Duì rén yǒu lǐmào) - Lễ phép với mọi người", 
        "tip": "Lễ (礼) có bộ Thị (示 - nghi lễ tôn nghiêm). Mạo (貌) là diện mạo, dáng vẻ gương mặt. Dáng vẻ cung kính, đúng chuẩn mực đạo đức khi giao tiếp." 
    },
    { 
        "id": 277, 
        "word": "理发", 
        "pinyin": "lǐfà", 
        "meaning": "cắt tóc", 
        "example": "去理发店理发 (Qù lǐfàdiàn lǐfà) - Đi đến tiệm cắt tóc để cắt tóc", 
        "tip": "Lý (理) là sửa sang, chỉnh đốn. Phát (发) là tóc tai trên đầu. Động tác sửa sang, cắt tỉa lại mái tóc cho gọn gàng, tươm tất." 
    },
    { 
        "id": 278, 
        "word": "理解", 
        "pinyin": "lǐjiě", 
        "meaning": "thấu hiểu, hiểu cho", 
        "example": "请理解我的决定 (Qǐng lǐjiě wǒ de juédìng) - Xin hãy thấu hiểu cho quyết định của tôi", 
        "tip": "Lý (理) có bộ Vương (王 - mài ngọc theo thớ vân). Giải (解) dùng dao cắt sừng trâu. Thấu suốt thớ vân của ngọc và tháo gỡ rắc rối để thực sự thấu hiểu bản chất." 
    },
    { 
        "id": 279, 
        "word": "理想", 
        "pinyin": "lǐxiǎng", 
        "meaning": "lý tưởng", 
        "example": "实现理想 (Shíxiàn lǐxiǎng) - Thực hiện lý tưởng", 
        "tip": "Tưởng (想) gồm chữ Tương (相 - xem xét) trên bộ Tâm (心 - suy nghĩ). Những suy nghĩ nung nấu, khao khát cao đẹp nhất được thiết lập một cách có lý trí (理)." 
    },
    { 
        "id": 280, 
        "word": "力气", 
        "pinyin": "lìqi", 
        "meaning": "sức lực, sức mạnh", 
        "example": "花了很多力气 (Huā le hěn duō lìqi) - Tốn rất nhiều sức lực", 
        "tip": "Lực (力) vẽ bắp tay cuồn cuộn sức mạnh cơ bắp. Khí (气) là năng lượng lưu thông bên trong. Sự kết hợp giữa năng lượng và cơ bắp tạo nên sức lực gánh vác." 
    },
    { 
        "id": 281, 
        "word": "厉害", 
        "pinyin": "lìhai", 
        "meaning": "lợi hại, dữ dội, ghê gớm", 
        "example": "他打羽毛球很厉害 (Tā dǎ yǔmáoqiú hěn lìhai) - Anh ấy đánh cầu lông rất lợi hại", 
        "tip": "Lợi (厉) dưới sườn núi dốc là chữ Vạn (万), chỉ sự mài giũa dữ dội. Hại (害) dưới mái nhà có lời nói (Khẩu 口) gây tổn thương. Ý chỉ năng lực cực kỳ xuất sắc." 
    },
    { 
        "id": 282, 
        "word": "俩", 
        "pinyin": "liǎ", 
        "meaning": "hai, đôi (lượng từ rút gọn)", 
        "example": "我们俩 (Wǒmen liǎ) - Hai chúng tôi", 
        "tip": "Lưỡng (俩) có bộ Nhân đứng (亻) bên trái và chữ Lưỡng (两 - hai) bên phải. Chuyên dùng để chỉ đích danh hai người đang đứng song hành mà không cần thêm từ '个'." 
    },
    { 
        "id": 283, 
        "word": "连", 
        "pinyin": "lián", 
        "meaning": "ngay cả... cũng / liền, liên tục", 
        "example": "连他都不知道 (Lián tā dōu bù zhīdào) - Ngay cả anh ấy cũng không biết", 
        "tip": "Liên (连) gồm bộ Sước (辶- di chuyển bước đi) nâng đỡ chiếc xe (Xa 车). Những cỗ xe nối đuôi nhau hành quân liên tục trên đường không đứt đoạn." 
    },
    { 
        "id": 284, 
        "word": "联系", 
        "pinyin": "liánxì", 
        "meaning": "liên hệ, liên lạc", 
        "example": "保持联系 (Bǎochí liánxì) - Giữ liên lạc", 
        "tip": "Hệ (系) vẽ hình sợi tơ thắt nút kết nối. Kết nối các mối quan hệ qua lại liên tục (连) như các sợi dây cáp thông tin được nối liền mạch." 
    },
    { 
        "id": 285, 
        "word": "凉快", 
        "pinyin": "liángkuai", 
        "meaning": "mát mẻ, dễ chịu", 
        "example": "今天很凉快 (Jīntiān hěn liángkuai) - Hôm nay rất mát mẻ", 
        "tip": "Lương (凉) có bộ Băng (冫- se lạnh). Khoái (快) có bộ Tâm đứng (忄- lòng vui sướng). Tiết trời se lạnh mang lại cảm giác sảng khoái, dễ chịu từ sâu trong lòng." 
    },
    { 
        "id": 286, 
        "word": "亮", 
        "pinyin": "liàng", 
        "meaning": "sáng, tỏa sáng", 
        "example": "天亮了 (Tiān liàng le) - Trời sáng rồi", 
        "tip": "Lượng (亮) gồm phần trên giống mái hiên cao ráo đón ánh ban mai rực rỡ, chiếu rọi vạn vật hiện rõ mồn một không còn tối tăm." 
    },
    { 
        "id": 287, 
        "word": "流行", 
        "pinyin": "liúxíng", 
        "meaning": "phổ biến, thịnh hành", 
        "example": "流行 歌曲 (Liúxíng gēqǔ) - Ca khúc thịnh hành", 
        "tip": "Lưu (流) là dòng nước tuôn chảy xiết. Hành (行) là bước chân đi trên đường lớn. Xu hướng mới lan truyền nhanh chóng, trôi chảy đi khắp muôn phương như dòng nước." 
    },
    { 
        "id": 288, 
        "word": "流泪", 
        "pinyin": "liúlèi", 
        "meaning": "chảy nước mắt, khóc", 
        "example": "感动得流泪 (Gǎndòng de liúlèi) - Cảm động phát khóc (chảy nước mắt)", 
        "tip": "Lệ (泪) gồm bộ Thủy (氵- nước) bên cạnh con mắt (Mục 目). Nước tuôn ra từ khóe mắt rơi rụng xuống chính là giọt nước mắt dạt dào cảm xúc." 
    },
    { 
        "id": 289, 
        "word": "留", 
        "pinyin": "liú", 
        "meaning": "ở lại, giữ lại", 
        "example": "留下来吃饭 (Liú xiàlai chīfàn) - Ở lại ăn cơm đi", 
        "tip": "Lưu (留) gồm chữ Mão (卯 - mở cửa) ở trên bộ Điền (田 - ruộng đất). Định cư, gắn bó lâu dài bên mảnh ruộng quê hương không rời đi xứ khác." 
    },
    { 
        "id": 290, 
        "word": "流利", 
        "pinyin": "liúlì", 
        "meaning": "lưu loát, trôi chảy", 
        "example": "汉语说得很流利 (Hànyǔ shuō de hěn liúlì) - Nói tiếng Trung rất lưu loát", 
        "tip": "Lợi (利) có bộ Đao (刀) cắt vật bén ngọt, dứt khoát. Ngôn từ tuôn chảy mượt mà như dòng nước (流) và sắc bén, gãy gọn không bị vấp váp." 
    },
    { 
        "id": 291, 
        "word": "乱", 
        "pinyin": "luàn", 
        "meaning": "lộn xộn, bừa bãi", 
        "example": "房间很乱 (Fángjiān hěn luàn) - Căn phòng rất bừa bãi", 
        "tip": "Loạn (乱) có bộ Ất (乙 - hình sợi dây uốn éo rối rắm). Các cuộn tơ lụa bị rối tung lên lung tung khiến không gian mất trật tự, bừa bộn." 
    },
    { 
        "id": 292, 
        "word": "律师", 
        "pinyin": "lǜshī", 
        "meaning": "luật sư", 
        "example": "请律师帮忙 (Qǐng lǜshī bāngmáng) - Mời luật sư giúp đỡ", 
        "tip": "Luật (律) có bộ Sách (彳- bước đi theo quy tắc phép tắc). Sư (师) là người thầy chuyên nghiệp. Người gánh vác việc dẫn dắt luật pháp, bảo vệ công lý." 
    },
    { 
        "id": 293, 
        "word": "麻烦", 
        "pinyin": "máfan", 
        "meaning": "phiền phức, làm phiền", 
        "example": "给你带来麻烦 (Gěi nǐ dàilái máfan) - Mang lại phiền phức cho bạn", 
        "tip": "Ma (麻) là cây gai rậm rạp dưới mái nhà. Phiền (烦) có bộ Hỏa (火) thiêu đốt bên cạnh cái đầu (Hiệt 页). Đầu óc nóng bừng như lửa đốt vì vướng vào đống gai rắc rối." 
    },
    { 
        "id": 294, 
        "word": "马虎", 
        "pinyin": "mǎhu", 
        "meaning": "qua loa, cẩu thả", 
        "example": "做事不能马虎 (Zuòshì bùnéng mǎhu) - Làm việc không được qua loa cẩu thả", 
        "tip": "Ghép từ con Ngựa (马) và con Hổ (虎). Người thợ vẽ cái đầu hổ nhưng thân mình ngựa, tính khí cẩu thả, mập mờ dẫn đến việc làm hỏng việc." 
    },
    { 
        "id": 295, 
        "word": "满", 
        "pinyin": "mǎn", 
        "meaning": "đầy, thỏa mãn", 
        "example": "把油箱加满 (Bǎ yóuxiāng jiā mǎn) - Đổ đầy bình xăng", 
        "tip": "Mãn (满) có bộ Thủy (氵- nước). Nước dâng lên ngập tràn, mấp mé bờ đê biểu thị trạng thái đầy ắp, trọn vẹn, không còn thiếu thốn." 
    },
    { 
        "id": 296, 
        "word": "毛巾", 
        "pinyin": "máojīn", 
        "meaning": "khăn mặt, khăn tắm", 
        "example": "一条干净的毛巾 (Yì tiáo gānjìng de máojīn) - Một chiếc khăn mặt sạch sẽ", 
        "tip": "Mao (毛) là sợi lông, sợi bông mịn màng. Cân (巾) là miếng vải dệt thời xưa. Miếng vải có bề mặt bông mềm mại chuyên dùng để lau chùi cơ thể." 
    },
    { 
        "id": 297, 
        "word": "免费", 
        "pinyin": "miǎnfèi", 
        "meaning": "miễn phí", 
        "example": "免费 参观 (Miǎnfèi cānguān) - Tham quan miễn phí", 
        "tip": "Miễn (免) là bãi bỏ, cởi bỏ chiếc mũ quan trường xưa. Phí (费) là tiền của tiêu hao. Bãi bỏ hoàn toàn các khoản tiền tài cần chi trả." 
    },
    { 
        "id": 298, 
        "word": "目的", 
        "pinyin": "mùdì", 
        "meaning": "mục đích", 
        "example": "达到目的 (Dádào mùdì) - Đạt được mục đích", 
        "tip": "Mục (目) là con mắt nhìn hướng thẳng. Đích (的) ban đầu chỉ tâm điểm của bia bắn cung xưa. Con mắt luôn tập trung hướng về hồng tâm để ngắm bắn chuẩn xác." 
    },
    { 
        "id": 299, 
        "word": "内容", 
        "pinyin": "nèiróng", 
        "meaning": "nội dung", 
        "example": "内容很丰富 (Nèiróng hěn fēngfù) - Nội dung rất phong phú", 
        "tip": "Nội (内) là bước vào bên trong ranh giới. Dung (容) có bộ Miên (宀 - mái nhà) dùng để chứa đựng. Tất cả những giá trị, thông tin cốt lõi được chứa đựng bên trong." 
    },
    { 
        "id": 300, 
        "word": "耐心", 
        "pinyin": "nàixīn", 
        "meaning": "kiên nhẫn, nhẫn nại", 
        "example": "对孩子要有耐心 (Duì háizi yào yǒu nàixīn) - Đối với trẻ con phải có lòng kiên nhẫn", 
        "tip": "Nại (耐) có bộ Nhi (而 - chòm râu dưới cằm cần thời gian dài nuôi dưỡng). Tân (心) là tấm lòng. Giữ vững tấm lòng thản nhiên, tĩnh lặng chịu đựng thử thách theo thời gian." 
    }

];

// Cơ chế đồng bộ hóa thông minh tương thích ngược với code cũ của bạn
if (typeof window.hskData === 'undefined' || window.currentLevel === 4) {
    window.hskData = window.hskData4;
}