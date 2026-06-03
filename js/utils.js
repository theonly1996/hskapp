// =========================================================================
// HÀM TẢI DỮ LIỆU TỪ VỰNG TỪ FILE ĐỘNG
// =========================================================================
const fetchHSKData = async (level) => {
    return new Promise((resolve) => {
        const oldScript = document.getElementById('hsk-data-script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = 'hsk-data-script';
        script.src = `hsk${level}.js`; 

        script.onload = () => {
            setTimeout(() => {
                if (window.hskData && window.hskData.length > 0) resolve(window.hskData);
                else resolve(FALLBACK_VOCABULARY[level] || FALLBACK_VOCABULARY[1]);
            }, 300);
        };
        script.onerror = () => {
            resolve(FALLBACK_VOCABULARY[level] || FALLBACK_VOCABULARY[1]);
        };
        document.body.appendChild(script);
    });
};

// =========================================================================
// HỆ THỐNG ÂM THANH (WEB AUDIO API & SPEECH SYNTHESIS)
// =========================================================================
window.activeUtterances = [];

// Hàm tạo âm thanh phản hồi Ting/Tò te (Web Audio API)
const playSoundFeedback = (type) => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === 'correct') {
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'wrong') {
            osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
            osc.frequency.setValueAtTime(147, ctx.currentTime + 0.12); // D3
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        }
    } catch (e) {
        console.warn("Hệ thống âm thanh Web Audio chưa được hỗ trợ:", e);
    }
};

// Hàm phát âm tiếng Trung & tiếng Việt (Text-to-Speech)
const playAudio = (text, lang = 'zh-CN', cancelPrevious = true) => {
    const config = window.hskVoiceConfig || { rate: 0.85 };
    const shouldCancel = (cancelPrevious === true || (cancelPrevious && typeof cancelPrevious === 'object'));

    return new Promise((resolve) => {
        if ('speechSynthesis' in window) {
            if (shouldCancel) {
                window.speechSynthesis.cancel();
                window.activeUtterances = [];
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            
            utterance.rate = config.rate || (lang === 'zh-CN' ? 0.8 : 0.85);
            utterance.pitch = 1.0;
            
            const voices = window.speechSynthesis.getVoices();
            let targetVoice = null;
            
            const savedVoiceName = lang === 'zh-CN' ? config.zhVoiceName : config.viVoiceName;
            if (savedVoiceName) {
                targetVoice = voices.find(v => v.name === savedVoiceName);
            }
            
            if (!targetVoice) {
                if (lang === 'zh-CN') {
                    targetVoice = voices.find(v => v.lang === 'zh-CN' && v.name.includes('Google')) ||
                                  voices.find(v => v.lang === 'zh-CN' && v.name.includes('Huihui')) ||
                                  voices.find(v => v.lang === 'zh-CN' && v.name.includes('Microsoft')) ||
                                  voices.find(v => v.lang === 'zh-CN') ||
                                  voices.find(v => v.lang.startsWith('zh'));
                } else if (lang === 'vi-VN') {
                    targetVoice = voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.includes('Google')) ||
                                  voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.toLowerCase().includes('natural')) ||
                                  voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.includes('Microsoft')) ||
                                  voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN') ||
                                  voices.find(v => v.lang.startsWith('vi'));
                }
            }
            
            if (targetVoice) {
                utterance.voice = targetVoice;
            } else if (lang === 'vi-VN') {
                console.warn("Không tìm thấy bộ tổng hợp giọng nói tiếng Việt chuẩn.");
                resolve(false);
                return;
            }

            window.activeUtterances.push(utterance);

            utterance.onend = () => {
                window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
                resolve(true);
            };
            utterance.onerror = (e) => {
                window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
                console.warn("Lỗi phát âm TTS:", e);
                resolve(false);
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Trình duyệt không hỗ trợ Web Speech API.");
            resolve(false);
        }
    });
};

// Kích hoạt load Voice sớm cho trình duyệt
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}

// =========================================================================
// HÀM XỬ LÝ CHUỖI & TÌM KIẾM
// =========================================================================

// Xóa dấu Pinyin để tìm kiếm dễ dàng (ví dụ: ài -> ai)
const removePinyinTones = (str) => {
    if (!str) return "";
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[āáǎà]/g, "a")
        .replace(/[ēéěè]/g, "e")
        .replace(/[īíǐì]/g, "i")
        .replace(/[ōóǒò]/g, "o")
        .replace(/[ūúǔù]/g, "u")
        .replace(/[ǖǘǚǜ]/g, "v")
        .replace(/ü/g, "v");
};

// Xóa dấu Tiếng Việt
const removeVietnameseTones = (str) => {
    if (!str) return "";
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
        .replace(/[èéẹẻẽêềếệểễ]/g, "e")
        .replace(/[ìíịỉĩ]/g, "i")
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
        .replace(/[ùúụủũưừứựửữ]/g, "u")
        .replace(/[ỳýỵỷỹ]/g, "y");
};

// Tách câu ví dụ thành 3 phần: Tiếng Trung, Pinyin và Nghĩa Tiếng Việt
const parseExample = (exampleStr) => {
    if (!exampleStr) return { zh: "", pinyin: "", vi: "" };
    try {
        const mainParts = exampleStr.split(' - ');
        const leftSide = mainParts[0] || "";
        const vi = mainParts[1] || "";

        const zhMatch = leftSide.match(/^([^\(]+)/);
        const pinyinMatch = leftSide.match(/\(([^\)]+)\)/);

        return {
            zh: zhMatch ? zhMatch[1].trim() : leftSide.trim(),
            pinyin: pinyinMatch ? pinyinMatch[1].trim() : "",
            vi: vi.trim()
        };
    } catch (e) {
        return { zh: exampleStr, pinyin: "", vi: "" };
    }
};

// =========================================================================
// TIỆN ÍCH PHÂN TÍCH & TRÍCH XUẤT BỘ THỦ CHỮ HÁN CHUYÊN SÂU
// =========================================================================

// Cơ sở dữ liệu ánh xạ chữ Hán sang bộ thủ tương ứng (Hỗ trợ toàn diện HSK 1 - HSK 6)
const radicalToChars = {
    "人": "你他们什传亿代仙仪估伴伶伸伺似amp但位住体何作伯低佣佳使例侍依侠侧侦偶偏停健侧便值倾假偌做傅傲傻像儡优会众伞仓仑似化信保候俭修俗倒伤借值停偶偏像儿元先克免入内全两八六共兵其具典兼册再",
    "亻": "你他们什传亿代仙仪估伴伶伸伺似但位住体何作伯低佣佳使例侍依侠侧侦偶偏停健侧便值倾假偌做傅傲傻像儡优会信保候俭修俗倒伤借值停偶偏像",
    "口": "吃喝叫听吧哈呀呢哪哦吗喔喂叹呀唤嘱嘲嘴嚷嘿嘴器嚣哭器噪嗓啸唤啊咸哥右叶占召只史叮古句另叩只司叹台吃各吆合吉吊同名吐向吓呀呆呈吴吞味哈哈咸哄哑响哈",
    "氵": "没汉海洗澡汁江河湖海洋流波浪清温渐演渐准深洒派活汽油泥泪浇测凉减港游湖湿温渴湾满源准备漂流注决法治波洒洗津洪洲活洽派流济测渐渔渡渣温港渴游湖湘湾湿满源演漂漏灌",
    "水": "没汉海洗澡汁江河湖海洋流波浪清温渐演渐准深洒派活汽油泥泪浇测凉减港游湖湿温渴湾满源准备漂流注决法治波洒洗津洪洲活洽派流济测渐渔渡渣温港渴游湖湘湾湿满源演漂漏灌",
    "女": "妈姐好妹奶妻始姑娘姓如妙妥妨妇她妈妙娱娶嫌她",
    "讠": "说语请谢课议论设证识讲译试读谈该详诉词评诡诈诀许设访诀许设",
    "言": "说语请谢课议论设证识讲译试读谈该详诉词评诡诈诀许设访诀许设",
    "辶": "这进远迎运还这过近返迫述迷迭送逃逆透逐递途通逛逝逞速造逢连遍逾遇游道遣遥逊递",
    "木": "样机桌椅校样根极林森枝板杯柜架染柔某查柬柴桌条梦梳検棉棒棚森楚楼概榜模横样果苹果本李杏染柜林枚",
    "艹": "茶菜草药花芬芳芽劳若苦英茂范茉莉茹荣药草荐荒荣荫药幕薄薛薪藏蓝苹薯藤",
    "日": "是时明昨晴昨晚晒晶映昭旬晃晋晌晏晏晒晕晚晨普景晴暖暗暴曜星易映",
    "土": "在地产场墙坊坏坚坛坝坞坟坡坦坪坯型垒垌城域培基堂堆塞境墓墙增墨去城坦垫塞境",
    "手": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描",
    "手 (扌)": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描",
    "扌": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描",
    "心": "想怕快忙情感急怎怒怨忽态怎思怠急性怨怪怕怜怡恢复恬恰恤恨恒恋恼恐恳恕息悉悔悟悠患悲惠惬想惹愁愈意愚感慈愿慢懂懒您",
    "忄": "想怕快忙情感急怎怒怨忽态怎思怠急性怨怪怕怜怡恢复恬恰恤恨恒恋恼恐恳恕息悉悔悟悠患悲惠惬想惹愁愈意愚感慈愿慢懂懒",
    "囗": "国回因团园围图圆圈固国图圈",
    "大": "太天因奇奢奎奏契奔奖奖套奥夫央夺夯奇奈奉奏契奢",
    "子": "学字孩孤季孙孩孪孕孔孩",
    "月": "明脸脚脑肌肋肚朋肥肩股肢肤胀胃胚胎胖胞胡能胁脉脊脑胶胸胺能脸脾膜服有胃背肤胞胆胜",
    "火": "点热烧灯灰灿灶灼灾炎炒炊炕炎炉炊炖炙炕炔烘烤烦烧烟热烈烹焊焕焙焚焦焰然煮焙熏熙熟熊照烈烫煤",
    "灬": "点热烧灯灰灿灶灼灾炎炒炊炕炎炉炊炖炙炕炔烘烤烦烧烟热烈烹焊焕焙焚焦焰然煮焙熏熙熟熊照烈烫煤",
    "纟": "红绿给纸级纽线练组细终织绍经 绕绘给 sử dụng tơ lụa 练级绍细终经绑给绘绝继绩缆",
    "饣": "饭饱馆饮饲饱饰饺饼饵餐馆馁馑馈馋",
    "食": "饭饱馆饮饲饱饰饺饼饵餐馆馁馑馈馋",
    "钅": "钱错钟针钉钗钓钙钢钾铁铃铜铝铲银铸链销锁锅错铺锐锚锻锅铲键镰",
    "金": "钱错钟针钉钗钓钙钢钾铁铃铜铝铲银铸链销锁锅错铺锐锚锻锅铲键镰",
    "𧾷": "路跳跑践跌跑跬跨路跳践跺踊踏踢蹭蹲",
    "足": "路跳跑践跌跑跬跨路跳践跺踊踏踢蹭蹲",
    "目": "看眼睡盯盲直相盼盾省眇眈眉看着睁睐睑眼睛睡督瞧瞩",
    "禾": "和秋科秒秧秦秩秘租秤积程稠稚稳稻稼稿穆",
    "⺮": "笔等答筛筒答筹策签简管簿籍箱",
    "竹": "笔等答筛筒答筹策签简管簿籍箱",
    "犭": "狗猫猪犯犹狂狐狗狠独狮猎猜猫猪猴猾",
    "犬": "狗猫猪犯犹狂狐狗狠独狮猎猜猫猪猴猾",
    "贝": "贵员货负贡财责贤败账货质贩贪贫贬购贮贯贴贵贷贸费贺贼贾资赋赌赎赏赔赖赘赚赛",
    "车": "辆输轮轨轩转轮软轰轻载轿较辅辆辈输辖辕舆",
    "门": "问间闭闪闭闩问闯闰闲阅闽阁阀闺闻闽阂阅阎阐阔阖",
    "阝": "阳院阴那邮郊防阵阶阻阿附降限陕陛院阵除陪阴陈陵陶陷陆阳隅隆隔障隐隧",
    "又": "友双欢难对戏邓双叹观戏艰难变受取叔叙",
    "戈": "我 hoặc 战戏戴戏成戒我或战戚",
    "巾": "师帮常带帆帖帐帕带帷常幅幕幢帮布希席帽幔",
    "广": "店底府庞庄庆庇床序店庙府底庖度座庭康庸废廖厅应库底度座庭康廉",
    "厂": "医历厅历厉压厌厕厘厚原厢厦厨厩",
    "疒": "病疼 gầy 疔疗疚疝疟疠疡疣疤疥疫疲疳疼疹疼疽疾病症痊痒痔痕痘痛痞痢痣瘦痰痴瘟瘢瘤瘪瘫瘾",
    "礻": "祝票礼社祀祁神祥票祭祺福礼祷禧禅",
    "示": "祝票礼社祀祁神祥票祭祺福礼祷禧禅",
    "衣": "衬衫被衬衫衰衲裹制衩衫衬裤褂裸褶襁袭袋装裁",
    "衤": "衬衫被衬衫衰衲裹制衩衫衬裤褂裸褶襁袭袋装裁",
    "页": "题颜顺顶顷项顺须顼顽顿顾顿颁颂预颇领颉颐频颓颖题颜额颠颤颧",
    "鸟": "鸡鸭鸣鸡鸣鸥鸦鸭鸯鸳袅鸯鸵鸽鸿鹂鹃鹄鹅鹤鹦鹳",
    "隹": "难准谁难雀雁雅雄集雇雉雌雕双雏",
    "雨": "雪零雷雨雪雯雳雾雹雷零需震霉霍霓霖霜霞霾",
    "马": "骑骗验驰驮驯驳驻驼驾骏骋",
    "方": "放旅旁方施旁旗旅族",
    "斤": "新听断斯",
    "欠": "次欢歌欲欣欧欺款歌",
    "止": "正此步武歧歪步",
    "歹": "死残殃歼殆殉殊殓殖",
    "殳": "段毅毁殴段",
    "比": "毕比皆毙",
    "毛": "毯毫尾毛毯氏毫",
    "气": "汽氛氧气",
    "片": "版牌牍片版牌",
    "牛": "物特牛牧牲牺特",
    "牜": "物特牛牧牲牺特",
    "王": "玩班理玉玩玲珍玻珀珊珠球理瑞瑶璃璀",
    "玉": "玩班理玉玩玲珍玻珀珊珠球理瑞瑶璃璀",
    "瓜": "瓢瓣瓜瓢瓣",
    "瓦": "瓶瓷瓦瓮瓶瓷",
    "甘": "甜甚甘甜某",
    "生": "产甥生产甥",
    "用": "甫甭用甩甫",
    "田": "男界留电略番田甲申由男界毕略番留疆",
    "白": "百的白百的皎皓",
    "皮": "皱皴皮皱皴",
    "皿": "盘盒皿盂盅盆盐监盒盘盟",
    "矢": "短矮矢知矩短矮",
    "石": "研破石砍研砖破码磨磁",
    "立": "站章立站竞章竣端",
    "龙": "龚袭龙庞龚袭",
    "矛": "柔矜矛柔矜",
    "网": "罗罚网罚罢罗罹",
    "罒": "罗罚网罚罢罗罹",
    "羊": "美差羊美羔羞群羡义",
    "羽": "习翻羽翁翅翌翌翔翻",
    "老": "考者老考耆考者",
    "而": "耐耍而耐耍端",
    "耒": "耕耒耕耗耘",
    "耳": "听聪耳耶耽耿聊联聪声",
    "聿": "律聿律建肃聿",
    "自": "臭自臭臬",
    "至": "致至致台屋",
    "臼": "舀臼舀舅舆",
    "舌": "甜舌甜辞乱",
    "舟": "船舟航般船舰舱",
    "艮": "限艮跟根良限",
    "色": "艳色艳艴",
    "虍": "虎虍虑虚虞虎",
    "chữ gốc": "",
    "虫": "蛋虾虫蚊蚕虽蛮蛋蜜蜡融蠢蟹独",
    "血": "Huyết血衄衅",
    "西": "要漂票覆",
    "西 (覀)": "要漂票覆",
    "覀": "要漂票覆",
    "见": "观视规觉见规视览觉观",
    "角": "解角解触嘴",
    "谷": "豁谷欲谿豁",
    "豆": "短豆豇豌豉短",
    "豕": "象豕象豪豫",
    "豸": "豹豸貌猫",
    "赤": "赫赤赦赫赭",
    "走": "起越走超赶走赴起超赶越趋",
    "刀": "分刀切刃分判刑列创初删利判刮到制刷券刺刻剃剪副割",
    "刂": "分刀切刃分判刑列创初删利判刮到制刷券刺刻剃剪副割",
    "米": "粉米类粉糖粒粗粘粮",
    "行": "街行街衙",
    "酉": "酒酉配酒酸醋醉醒",
    "身": "躺身躬躲躺躯",
    "宀": "家安室字容富审宴宫宾客家宋宏宕定宛宜宽宾害家容宽审寒察富",
    "寸": "导寸寺寻对导寿封射将尉尊",
    "小": "少小少尖尘恭",
    "夕": "外夕外多夜梦岁",
    "山": "岁山岁岂岗岩岭峰岳",
    "工": "左工巧左巩巫差",
    "己": "已己已巳巴巽",
    "干": "平年并干幸平年并幸干",
    "弓": "张弓引弗弘弦张强弹弯",
    "彳": "行彳彷役彻往征径待很律徐徒得循微德",
    "户": "房户房所扁扇扉",
    "文": "齐文齐斋斑斐",
    "斗": "料斗料斜斟斡",
    "无": "既无既抚",
    "曰": "曲曰曲更最曹",
    "毋": "每毋每毒贯",
    "爪": "爬爪爬爱爵采",
    "爫": "爬爪爬爱爵采",
    "父": "爸父爸爷",
    "穴": "空穴究空穿突窃窄容窗窟穷窍",
    "卜": "占卜卡卢占卧卦",
    "卩": "卫卩卫印却即卿卷",
    "厶": "参去丢县台厶去参县台私能",
    "几": "亮凭几朵设机凡凤凯几凡凤凭凯凳",
    "凵": "凶凵凶出击函画",
    "勹": "包勹勺勾匆包匆匈匍",
    "匕": "北匕化北此旨",
    "匚": "匠匚区匹巨医匡匪",
    "匸": "区匸区医匿",
    "十": "千十千午升半协卒博南",
    "儿": "儿元先光克免兔党元先光克免兔党兆兄",
    "入": "内入内全两",
    "八": "公八公六兮共兵其具兼",
    "冂": "冈冂内冈网册",
    "冖": "冗亮冗军冠写农幂冖写军农冠幂",
    "冫": "冬冫冬冰冷准凉减凑",
    "士": "声士壬声志壮吉壳壹",
    "夂": "条夂条备复夏",
    "夊": "复夏",
    "广": "店底府庞庄庆庇床序店庙府底庖度座庭康庸废廖厅应库底度座庭康廉"
};

// Hàm tự động quét và bóc tách bộ thủ thời gian thực vô cùng chính xác
const findRadicalsInWord = (word) => {
    if (!word || typeof word !== 'string') return [];
    
    // Thu thập danh sách bộ thủ từ cấu trúc dữ liệu global hskProData
    const coreRadicals = window.hskProData?.coreRadicals || [];
    if (coreRadicals.length === 0) return [];

    return coreRadicals.filter(item => {
        if (!item.radical) return false;
        
        // --- CÁCH 1: Đối chiếu trực tiếp (Ký tự bộ thủ là một chữ đơn trong từ) ---
        const cleanRadical = item.radical.replace(/[\s\(\)]/g, '');
        for (let i = 0; i < word.length; i++) {
            if (cleanRadical.includes(word[i])) {
                return true;
            }
        }
        
        // --- CÁCH 2: Đối chiếu thông minh qua Radical Mapping Dictionary (Hỗ trợ cấu trúc chữ ghép) ---
        // Trích xuất các biểu tượng bộ thủ đơn lẻ (Ví dụ "人 (亻)" -> ["人", "亻"])
        const radicalSymbols = [...item.radical.replace(/[\s\(\)]/g, '')];
        
        for (let symbol of radicalSymbols) {
            const mappedChars = radicalToChars[symbol];
            if (mappedChars) {
                // Quét từng chữ trong từ xem có nằm trong danh sách được ánh xạ của bộ thủ này không
                for (let i = 0; i < word.length; i++) {
                    if (mappedChars.includes(word[i])) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
};

// Đưa hàm ra phạm vi global window để các tab và component con có thể trực tiếp sử dụng
window.findRadicalsInWord = findRadicalsInWord;