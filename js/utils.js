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

// Cơ sở dữ liệu ánh xạ chữ Hán sang bộ thủ tương ứng (Đã mở rộng toàn diện cho HSK 1 - HSK 6)
const radicalToChars = {
    "人": "你他们们你您他她它什传亿代仙仪估伴倍伶伸伺似但位住体何作伯低佣佳使例侍依侠侧侦偶偏停健便值倾假偌做傅傲傻像儡优會众伞仓仑化信保候俭修俗倒伤借值停偶偏像个也介仍仔仕仗付仰仲件价任份仿企伊伍伐休众优伙会伞伟传伤估住所体佣债倾值假偿做停健偶像僧儒僻儡再先克免入内两八六共他她它地池驰防房访仿妨芳舫把爸吧爬坝",
    "亻": "你他们们你您他她它什传亿代仙仪估伴倍伶伸伺似但位住体何作伯低佣佳使例侍依侠侧侦偶偏停健便值倾假偌做傅傲傻像儡优会信保候俭修俗倒伤借值停偶偏像个也介仍仔仕仗付仰仲件价任份仿企伊伍伐休众优伙会伞伟传伤估住所体佣债倾值假偿做停健偶像僧儒僻儡他她它地池驰防房访仿妨芳舫把爸吧爬坝",
    "口": "吃喝叫听吧哈呀呢哪哦吗喔喂叹呀唤嘱嘲嘴嚷嘿器嚣哭噪嗓啸啊咸哥右叶占召只史叮古句另叩只司叹台吃各吆合吉吊同名吐向吓呀呆呈吴吞味哈咸哄哑响哎员哥哦哨哩哭哲哺哼唁唇啊唐唤唧售唯唱唾啃商问唯唾喧喔喘喜喝喂喇叭喊喷喋嘘嘴嚣嚷囔如和知名各倍解感",
    "氵": "没汉海洗澡汁江河湖海洋流波浪清温渐演准深洒派活汽油泥泪浇测凉减港游湿渴湾满源准备漂流注决法治波洒洗津洪洲活洽派流济测渐渔渡渣湘湾湿满源演漂漏灌汁汀求汇汗污池江汰汹汽汾沁沂沃沈沉沙沛沟没沣沦沧沪沫沮沱河沸油治沼沽沾沿泄泉泊泌泓法泡波泣泥注泪泫泰泳泵洁洋洒洗洛洞津洪泄活洽派流浅浆浇浈浊测济浑浓浒浔浙滨浦浩浪浮浴海浸涂涅消涉涌涛涝涟涡涣涤润涧涨涩淅渊渐淇淋淌淑淘淡淤淦淫淬深淮混淹添清渴渔渗渡渣渤温游湾湿溃溅源溜溟溢溥溪温溯溶溺溲滋滑滞滩滚满滤滥漂漓演漫漱漳漾潇潍潘潜潦潭潮澎澜澄澈浇澎澳激濒滨漂灌灏红江扛空恐功攻项贡",
    "水": "没汉海洗澡汁江河湖海洋流波浪清温渐演准深洒派活汽油泥泪浇测凉减港游湿渴湾满源准备漂流注决法治波洒洗津洪洲活洽派流济测渐渔渡渣湘湾湿满源演漂漏灌汁汀求汇汗污池江汰汹汽汾沁沂沃沈沉沙沛沟没沣沦沧沪沫沮沱河沸油治沼沽沾沿泄泉泊泌泓法泡波泣泥注泪泫泰泳泵洁洋洒洗洛洞津洪泄活洽派流浅浆浇浈浊测济浑浓浒浔浙滨浦浩浪浮浴海浸涂涅消涉涌涛涝涟涡涣涤润涧涨涩淅渊渐淇淋淌淑淘淡淤淦淫淬深淮混淹添清渴渔渗渡渣渤温游湾湿溃溅源溜溟溢溥溪温溯溶溺溲滋滑滞滩滚满滤滥漂漓演漫漱漳漾潇潍潘潜潦潭潮澎澜澄澈浇澎澳激濒滨漂灌灏红江扛空恐功攻项贡",
    "女": "妈姐好妹奶妻始姑娘姓如妙妥妨妇她娱乐娶嫌奴奶奸她如妇好妃妄妆妥妨妮始姑姓委姜姿姨姻姿威娘娱娲娜娟娶婆婚婪婶婷媚媛嫌媲孀她妨",
    "讠": "说语请谢课议论设证识讲译试读谈该详诉词评诡诈诀许设访谁认讥讨让讪讫训议讯记讲讳诀讷设访许论讼讽设访诀许设评词译诉诊证诈诏评译词详试诗诘该详诧诡诠诘话该详诫诬语诚诞误说诵请诸诺读课诽谁调谀谄谅谆谈谊谋谍谎谏谐谑谒谓谕谦谨谬谱谴谵谶访",
    "言": "说语请谢课议论设证识讲译试读谈该详诉词评诡诈诀许设访谁认讥讨让讪讫训议讯记讲讳诀讷设访许论讼讽设访诀许设评词译诉诊证诈诏评译词详试诗诘该详诧诡诠诘话该详诫诬语诚诞误说诵请诸诺读课诽谁调谀谄谅谆谈谊谋谍谎谏谐谑谒谓谕谦谨谬谱谴谵谶访",
    "辶": "这进远迎运还过近返迫述迷迭送逃逆透逐递途通逛逝逞速造逢连遍逾遇游道遣遥逊边达迁迅迈违迟迹追退适选逗逻逼遁遂遏遗遭遮避邀遵还退",
    "木": "样机桌椅校样根极林森枝板杯柜架染柔某查柬柴桌条梦梳检棉棒棚楚楼概榜模横果苹果本李杏染柜枚杰松板极构枇杷枉枋析林枚果枝枢枯柄柒柔查染某柔柬柯柳柴栅标栈栋栏树栓栖栗校株核样根格栽桂桃桅框案桌桥桦桶梁梅梦梳检棉棋棒棚栋森椅植椒椰棵椭楚楼榄榜模横樱橘橱檐笨本来想杯极",
    "艹": "茶菜草药花芬芳芽劳若苦英茂范茉莉茹荣草荐荒荫幕薄薛薪藏蓝苹薯藤艺艾节芋芍芒芝芙芭芟芦芩芭苏苑苒苓苔苗苛苞苟若苦苫苯英苳茁茂范茫茄茧茹茱草荆荐荒荔荣药荷荻莉莎莓荷莅莞莘莹莺莫莫莱莲莳莹莼菁菡菲菠萝菡萁萌萎萘萧萨落葆著葛葵董葫葬葱葵蒂蒋蒐蒲蒸蔚蓄蓝蓟蓬蔑蔓蔗蔚蔡蔽蕉蕊蕙薇薅薄薪薛蕾藉薰藏藤藓藉藕藜藤芳芭苞",
    "日": "是时明昨晴晚晒晶映昭旬晃晋晌晏晕晨普景暖暗暴曜星易映旦旧旨早旬旭时旺旻昂昆昌明昏易昔昕昙映春昧昨昭是昵昼显晃晋晌晏晒晓晚晖暂晨普景晰晴晶智晾暖暗暝暮暴暹曜曝曩意最明时昨晴晚晒晨春",
    "土": "在地产场墙坊坏坚坛坝坞坟坡坦坪坯型垒垌城域培基堂堆塞境墓墙增墨去城坦垫塞境土圣在圭地圳圻坂址均坊坍坎坏坐坑坡坤坦坪坯垄垒型垩垢城埔域培基堂堆堑堕堵境墓墙增墨壁坛壑壤坝垃圾",
    "手": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押拆拉拌拍抬抱抵拖拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探描掩措掸描手才扎扑扒打扔托扛扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描手扎打扔扑扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描看扮扛把抱",
    "手 (手)": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押拆拉拌拍抬抱抵拖拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探描掩措掸描手才扎扑扒打扔托扛扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描手扎打扔扑扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描看扮扛把抱",
    "手 (扌)": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押拆拉拌拍抬抱抵拖拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探描掩措掸描手才扎扑扒打扔托扛扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描手扎打扔扑扣执扩扫扬扭扮扯折抚Powell抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描看扮扛把抱",
    "扌": "打找提拿把推拉排掉挂接扫折抄抗抉找技批扯扼抚抛投抖抗折抹抽押拆拉拌拍抬抱抵拖拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探描掩措掸描手才扎扑扒打扔托扛扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描手扎打扔扑扣执扩扫扬扭扮扯折抚抛投抖抗折抹抽押抽拆拉拌拍抬抱抵抹拖拆拼招挂指按挑挖挠挡挤捞损振挺挽捂捉捌挫捶捷捏授掉掌排探捶描推掩措掸描看扮扛把抱",
    "心": "想怕快忙情感急怎怒怨忽态思怠怪怜怡恢复恬恰恤恨恒恋恼恐恳恕息悉悔悟悠患悲惠惬想惹愁愈意愚感慈愿慢懂懒您心必忆忌忍忐忑忒忑忏忖志忙忡忧忪快忱忸忾怀态怂m怃念怜忽忿怎怏怔怕怖怜怡怠急性怨怪怯恤恬恰恨恒恍恐恕恙息恳恩恸患悠您悻惆惊惜惭悼惬惮惰惯想惹愁愈意愚感愧愿慈m慎懂懈懊懒懦懵恨恐忿急怀",
    "忄": "想怕快忙情感急怎怒怨忽态思怠怪怜怡恢复恬恰恤恨恒恋恼恐恳恕息悉悔悟悠患悲惠惬想惹愁愈意愚感慈愿慢懂懒您心必忆忌忍忐忑忒忑忏忖志忙忡忧忪快忱忸忾怀态怂m怃念怜忽忿怎怏怔怕怖怜怡怠急性怨怪怯恤恬恰恨恒恍恐恕恙息恳恩恸患悠您悻惆惊惜惭悼惬惮惰惯想惹愁愈意愚感愧愿慈m慎懂懈懊懒懦懵恨恐忿急怀",
    "囗": "国回因团园围图圆圈固囚四囡囤囫园轮围囿圊国图囿圄圈圉圈",
    "大": "太天因奇奢奎奏契奔奖套奥夫央夺夯奇奈奉奏契奢大夭央夯失头夸夹夺夼奁奇奈奉奋奏契奔奖套奥女奴奶奸她如夺美",
    "子": "学字孩孤季孙孪孕孔子孑孓孔孕字存孚孛孜孝孟孢季孤学孩孪孵孙孰孱孩",
    "月": "明脸脚脑肌肋肚朋肥肩股肢肤胀胃胚胎胖胞胡能胁脉脊脑胶胸胺脸脾膜服有背胆胜月有朋服朔朗望朝期朦胧肌肋肘肚肛股肢肤肥肩肪肯育肺胃背胎胖胚胜胞胡胤脉胯胱胸胺能脂脆脊脑脱脸脾腆腊腋腑腔腕腥腮腰腹腺腿膀膈膊膏膘膛膜膝膛臀臂朦胧能胞肘明",
    "火": "点热烧灯灰灿灶灼灾炎炒炊炕炉炖炙炔烘烤烦烟烈烹焊焕焙焚焦焰然煮熏熙熟熊照烫煤火灭灯灰灵灾灶灸灼灾灾灿炀炉炊炎炒炔炕炙炜炬炭炮炯贴烘烙烤烦烧烛烟烩烫烬热烯烷烹焖焖焙焚焦焰然煅喧煊煌炼煎煞煤照煨煮煲煽熄熊熏熔熙熟熬熹燃燎燕燥爆爝炮",
    "灬": "点热烧灯灰灿灶灼灾炎炒炊炕炉炖炙炔烘烤烦烟烈烹焊焕焙焚焦焰然煮熏熙熟熊照烫煤火灭灯灰灵灾灶灸灼灾灾灿炀炉炊炎炒炔炕炙炜炬炭炮炯贴烘烙烤烦烧烛烟烩烫烬热烯烷烹焖焖焙焚焦焰然煅喧煊煌炼煎煞煤照煨煮煲煽熄熊熏熔熙熟熬熹燃燎燕燥爆冾炮",
    "纟": "红绿给纸级纽线练组细终织绍经绕绘给练级绍细终经绑给绘绝继绩缆纠纡红纣纤纥约级纨纪纫纬纭纯纰纱纲纳纵轮纷纸纹纺纽纾线练组绅细织终绍绎经紧绯绻绘给绚绛络绝绞统丝绢绣绥继绩绪绫续绮绯绰绳维绵绶绷绸绻综绽绿缀缄缅缆缎缓缔缕编缘缙缚缤缝缠缮缴缰续绩纂缆红级",
    "糸": "红绿给纸级纽线练组细终织绍经绕绘给练级绍细终经绑给绘绝继绩缆纠纡红纣纤纥约级纨纪纫纬纭纯纰纱纲纳纵轮纷纸纹纺纽纾线练组绅细织终绍绎经紧绯绻绘给绚绛络绝绞统丝绢绣绥继绩绪绫续绮绯绰绳维绵绶绷绸绻综绽绿缀缄缅缆缎缓缔缕编缘缙缚缤缝缠缮缴缰续绩纂缆红级",
    "饣": "饭饱馆饮饲饰饺饼饵餐馆馁馑馈馋饣饥饦饧饨饩饪饫饬饭饮饯饰饱饲饴饺饵饼饷馁饿馆馁馋馏馐馒馑馈馔馓馔餐饱",
    "食": "饭饱馆饮饲饰饺饼饵餐馆馁馑馈馋饣饥饦饧饨饩饪饫饬饭饮饯饰饱饲饴饺饵饼饷馁饿馆馁馋馏馐馒馑馈馔馓馔餐饱",
    "钅": "钱错钟针钉钗钓钙钢钾铁铃铜铝铲银铸链销锁锅铺锐锚锻键镰钅钆钇针钉钊钋钌钍钎钏钐钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钥钦钧钨钩钪钫钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铌铍铎磁铜铝铲银铸链销锁锅铺锐锚锻键镰银",
    "金": "钱错钟针钉钗钓钙钢钾铁铃铜铝铲银铸链销锁锅铺锐锚锻键镰钅钆钇针钉钊钋钌钍钎钏钐钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钥钦钧钨钩钪钫钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铌铍铎磁铜铝铲银铸链销锁锅铺锐锚锻键镰银",
    "𧾷": "路跳跑践跌跑跬跨路跳践跺踊踏踢蹭蹲足趵趸趿趾跃跄跑跖跚跛距践跤跨跪路跳践跺踊踏踢蹭蹲路跟跨跪路跳践跺踊踏踢蹭蹲跑",
    "足": "路跳跑践跌跑跬跨路跳践跺踊踏踢蹭蹲足趵趸趿趾跃跄跑跖跚跛距践跤跨跪路跳践跺踊踏踢蹭蹲路跟跨跪路跳践跺踊踏踢蹭蹲跑",
    "目": "看眼睡盯盲直相盼盾省眇眈眉看着睁睐睑眼睛睡督瞧瞩目盯盲直相盼盾省眇眈眉看着睁睐睑眼睛睡督瞧瞩盼盾眨眯眠眩眷眸眺眼着睁睇睐睑睡瞧瞩瞪瞬瞻矗相省着算",
    "禾": "和秋科秒秧秦秩秘租秤积程稠稚稳稻稼稿穆禾秃秀私秉秋科秒秘租秣秤秦秧秩积称秸移稀税稆程稍税稀稚稠稳稻稼稽稿穆穑穗收获和",
    "⺮": "笔等答筛筒筹策签简管簿籍箱竹竿笃笋笑笔笛笙笠等筋筐筒答策筛筹签简管筷箩箫籍簿篮筹籍笨算",
    "竹": "笔等答筛筒筹策签简管簿籍箱竹竿笃笋笑笔笛笙笠等筋筐筒答策筛筹签简管筷箩箫籍簿篮筹籍笨算",
    "犭": "狗猫猪犯犹狂狐狠独狮猎猜猴猾犯犴状犹狂狐狗狙狠狡独侠狮狰猜猛猎猖猩猫猬猴犹猢猹猾猿獗独獭獭猸",
    "犬": "狗猫猪犯犹狂狐狠独狮猎猜猴猾犯犴状犹狂狐狗狙狠狡独侠狮狰猜猛猎猖猩猫猬猴犹猢猹猾猿獗独獭獭猸",
    "贝": "贵员货负贡财责贤败账货质贩贪贫贬购贮贯贴贵贷贸费贺贼贾资赋赌赎赏赔赖赘赚赛贝贞负贡财责贤败账货质贩贪贫贬购贮贯贴贵贷贸费贺贼贾资赋赌赎赏赔赖赘赚赛贡贫",
    "车": "辆输轮轨轩转软轰轻载轿较辅辈输辖辕舆车轧轨轩转轮软轰轸轻轱轲轳轴轶轷较辄辅辆辇辈辉辍辊辋辍辕辖舆输毂辕",
    "门": "问间闭闪闭闩闯闰闲阅闽阁阀闺闻闽阂阅阎阐阔阖门闩闪闭开闰闲间闵闷闸闹闺闻阁闽阀阅阎阐阔阖阐们问间闻闷闯闹",
    "阝": "阳院阴那邮郊防阵阶阻阿附降限陕陛除陪陈陵陶陷陆隅隆隔障隐隧队阶防阳阴阵阻阿陀陂附际陆陇陈陋降限陕陡院除陪阴陲陵陶陷隅隆隈隔隘隙障隧防",
    "又": "友双欢难对戏邓叹观艰难变受取叔叙又叉及友双反发叔取受叙叛叠最对级极吸圾急艰",
    "戈": "我战戏戴成戒或战戚戈戊戌戌戍戎戏成我戒或截戮战戴感",
    "巾": "师帮常带帆帖帐帕帷幅幕幢布希席帽幔巾币市布帅帆师希帐帕帖帙带帷常幅幕幢帮幛",
    "广": "店底府庞庄庆庇床序庙庖度座庭康庸废廖厅应库廉广庄庆庇床序庐庑库店庙府底庖度座庭康庸废底度座庭康廉",
    "厂": "医历厅厉压厌厕厘厚原厢厦厨厩厂历厅历厉压厌厕厘厚原厢厦厨",
    "疒": "病疼疗疚疝疟疠疡疣疤疥疫疲疳疼疹疽症痊痒痔痕痘痛痞痢痣瘦痰痴瘟瘢瘤瘪瘫瘾疤",
    "礻": "祝票礼社祀祁神祥祭祺福祷禧禅示礼社祀祁神祥票祭祺福礼祷禧禅祥",
    "示": "祝票礼社祀祁神祥祭祺福祷禧禅示礼社祀祁神祥票祭祺福礼祷禧禅祥",
    "衣": "衬衫被衰衲裹制衩裤褂裸褶襁袭袋装裁衣补表衩衫衬衰衲袅袈袋袍袒袖袜被袭裁裂装裆褂褴褶襟",
    "衤": "衬衫被衰衲裹制衩裤褂裸褶襁袭袋装裁衣补表衩衫衬衰衲袅袈袋袍袒袖袜被袭裁裂装裆褂褴褶襟",
    "页": "题颜顺顶顷项须顼顽顿顾颁颂预颇领颉颐频颓颖额颠颤颧页顶顷项顺须顽顿顾颁颂预颇领颉颐频颓颖题颜额颠颤烦项颁",
    "鸟": "鸡鸭鸣鸥鸦鸯鸳袅鸵鸽鸿鹂鹃鹄鹅鹤鹦鹳鸟鸠鸡鸢鸣鸥鸦鸭鸯鸳袅鸵鸽鸿鹂鹃鹄鹅鹤",
    "隹": "难准谁雀雁雅雄集雇雉雌雕双雏隹难雀雁雅雄集雇雉雌雕双雏",
    "雨": "雪零雷雯雳雾雹需震霉霍霓霖霜霞霾雨雪雯零雷需震霄霉霍霓霖霜霞霾雹",
    "马": "骑骗验驰驮驯驳驻驼驾骏骋马驭驮驯驰驱驳驴驻驼驾骁骄验惊骏骋骑骗吗妈骂码闯",
    "方": "放旅旁施旗族方放旁旃旅族旗旖防房访仿妨芳舫",
    "斤": "新听断斯斤斥斧斩斯新断",
    "欠": "次欢歌欲欣欧欺款欠次欣欧欲欺款歌歉",
    "止": "正此步武歧歪止正此步武歧歪",
    "歹": "死残殃歼殆殉殊殓殖歹死歼殁殃殆殉殊残殖殓",
    "殳": "段毅毁殴段",
    "比": "毕比皆毙比皆毕毙",
    "毛": "毯毫尾毛氏毯毫",
    "气": "汽氛氧气气氖氛氟氢氧氪",
    "片": "版牌牍片版牌",
    "牛": "物特牛牧牲牺特牛牝牟牡牢牦牧物牲特牺解",
    "牜": "物特牛牧牲牺特牛牝牟牡牢牦牧物牲特牺解",
    "王": "玩班理玉玲珍玻珀珊珠球瑞瑶璃璀玉玩玟玲珍玻珀珊珠球理瑞瑶璃璀环",
    "玉": "玩班理玉玲珍玻珀珊珠球瑞瑶璃璀玉玩玟玲珍玻珀珊珠球理瑞瑶璃璀环",
    "瓜": "瓢瓣瓜瓢瓣",
    "瓦": "瓶瓷瓦瓮瓶瓷瓦",
    "甘": "甜甚甘甜某甚甜",
    "生": "产甥生产甥生",
    "用": "甫甭用甩甫用甩",
    "田": "男界留电略番田甲申由毕疆田甲由申电男甸界留略番画畸毕思富累胃",
    "白": "百 of 白百的皎皓 của 百皆皇魄",
    "皮": "皱皴皮皱皴",
    "皿": "盘盒皿盂盅盆盐监盟皿盂盅盆盈监盒盘盟盆",
    "矢": "短矮矢知矩矢知矩短矮知",
    "石": "研破石砍砖码磨磁石矶矾矿码研砖斩破砝砥砧砰破砸砺砻砾础硅研砖碰磁磨码",
    "立": "站章立竞章竣端立产辛章竟童竦竭端倍意音暗",
    "龙": "龚袭龙庞龚袭龙",
    "矛": "柔矜矛柔矜",
    "网": "罗罚网罚罢罗罹",
    "罒": "罗罚网罚罢罗罹",
    "羊": "美差羊美羔羞群羡义羊差美羔羞群羡义美差详样祥洋痒鲜群着",
    "羽": "习翻羽翁翅翌翔翻羽翁翅翌翔翕翻",
    "老": "考者老考耆考者老考耄耆",
    "而": "耐耍而耐耍端而耍耐耐",
    "耒": "耕耒耕耗耘耕耗耘",
    "耳": "听聪耳耶耽耿聊联聪声耳取耽耿聂聊联聘聚聪明最闻",
    "聿": "律聿律建肃聿聿肃肄肆",
    "自": "臭自臭臬自臭",
    "至": "致至致台屋至致台屋",
    "臼": "舀臼舀舅舆",
    "舌": "甜舌甜辞乱舌甜辞乱",
    "舟": "船舟航般船舰舱舟航般舫船舱舰舫",
    "艮": "限艮跟根良限艮良艰跟限眼很恨银退",
    "色": "艳色艳艴",
    "虍": "虎虍虑虚虞虎虍虎虑虔虚虞",
    "chữ gốc": "",
    "虫": "蛋虾虫蚊蚕虽蛮蛋蜜蜡融蠢蟹独虫虬虱虹虽虾蚀蚁蚊蚌蚓蚕蚜蚝蚣蚤蚩蚪蚯蚱蚨蚺蛀蛇蛋蛐蛔蛞蛤蛮蜓蛰蛱蜕蜂蜘蜜蜡融蠢蟹",
    "血": "Huyết血衄衅",
    "西": "要漂票覆西要覆晒",
    "西 (覀)": "要漂票覆西要覆晒",
    "覀": "要漂票覆西要覆晒",
    "见": "观视规觉见规视览觉观见规觅视览觉窥观",
    "角": "解角解触嘴角解觥触解",
    "谷": "豁谷欲谿豁谷欲",
    "豆": "短豆豇豌豉短豆",
    "豕": "象豕象豪豫豕象豪豫",
    "豸": "豹豸貌猫",
    "赤": "赫赤赦赫赭赤赦赫",
    "走": "起越走超赶走赴起超赶越趋走赴起趁赶越超趋",
    "刀": "分刀切刃分判刑列创初删利判刮到制刷券刺刻剃剪副割解份粉盼芬扮颁盆忿贫",
    "刂": "分刀切刃分判刑列创初删利判刮到制刷券刺刻剃剪副割解份粉盼芬扮颁盆忿贫",
    "米": "粉米类粉糖粒粗粘粮米籼粉粒粕粗粘粟粮糖糟粉",
    "行": "街行街衙行街衙衡",
    "力": "办功加务动劣劫励劲劳势勃勇勉勋力功",
    "尸": "尺尼尽尾尿局屁居届屈屋屎屏屑展屠属尸",
    "酉": "酒酉配酒酸醋醉醒酉酌配酎酒酗酝酣酥酪酬酩酪酬酩酰酵酷酸醋醉醒",
    "身": "躺身躬躲躺躯身躬躲躺躯射",
    "宀": "家安室字容富审宴宫宾客家宋宏宕定宛宜宽宾害家容宽审寒察富宀宁宇宅安宋完宏宕定宛宜宝实宠审客宣室宦宪宫宰宴宾家容宽宾宿寂寄寒富察寡寝寤寥宽它守",
    "寸": "导寸寺寻对导寿封射将尉尊寸对寺寻导寿封射将尉尊对导夺耐封射将尊寻寺付守讨村疗肘",
    "小": "少小少尖尘恭小少尔尖尘省",
    "夕": "外夕外多夜梦岁夕外多夜梦名",
    "山": "岁山岁岂岗岩岭峰岳山岂屹岁岂岗岘岚岛岭峰峻崇峪崎崔崖崩巅",
    "工": "左工巧左巩巫差工巧左巨巩巫差红江扛空恐功攻项贡左",
    "己": "已己已巳巴巽己已巳巴爸把吧爬坝",
    "干": "平年并干幸平年并幸干干平年并幸",
    "弓": "张弓引弗弘弦张强弹弯弓引弗弘弟弦张强弹弯",
    "彳": "行彳彷役彻往征径待很律徐徒得循微德彳役彻往征径待很律徐得徘徙徜御循微德徼很",
    "户": "房户房所扁扇扉户房所扁扇扉房",
    "文": "齐文齐斋斑斐文斋斐斑",
    "斗": "料斗料斜斟斡斗料斜斟",
    "无": "既无既抚无既",
    "曰": "曲曰曲更最曹曰更最最",
    "毋": "每毋每毒贯",
    "爪": "爬爪爬爱爵采爬",
    "爫": "爬爪爬爱爵采爬",
    "父": "爸父爸爷父爸爷爸",
    "穴": "空穴究空穿突窃窄容窗窟穷窍穴究空穿突窃窄窈窕窑窗窟窥窬窳穷空",
    "卜": "占卜卡卢占卧卦",
    "卩": "卫卩卫印却即卿卷卩卫印却卵即卿卷",
    "厶": "参去丢县台厶去参县台私能能",
    "几": "亮凭几朵设机凡凤凯几凡凤凭凯凳几凡凤凭凯",
    "凵": "凶凵凶出击函画",
    "勹": "包勹勺勾匆包匆匈匍勹勺勾勿匆包匈匍包饱跑抱泡炮胞刨雹苞",
    "匕": "北匕化北此旨匕化北此旨能",
    "匚": "匠匚区匹巨医匡匪匚区匹医匡匠匪",
    "匸": "区匸区医匿",
    "十": "千十千午升半协卒博南毕",
    "儿": "儿元先光克免兔党元先光克免兔党兆兄晚",
    "入": "内入内全两入内全",
    "八": "公八公六兮共兵其具兼",
    "冂": "冈冂内冈网册",
    "冖": "冗亮冗军冠写农幂冖写军农冠幂",
    "冫": "冬冫冬冰冷准凉减凑冫冬冰冷准冱凉凋减凑凛",
    "士": "声士壬声志壮吉壳壹士壮声志",
    "夂": "条夂条备复夏各",
    "夊": "复夏各",
    "一": "还杯怀坏环否",
    "乙": "也他她它地池驰",
    "乚": "也他她它地池驰",
    "青": "青静晴情请清精睛靓靛",
    "鱼": "鱼鲜鲁鳄鲸鲨鳞鲤鲍鱿鲇鲈鲱",
    "魚": "鱼鲜鲁鳄鲸鲨鳞鲤鲍鱿鲇鲈鲱"
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
        // Làm sạch tối đa các ký tự ngăn cách trong chuỗi định nghĩa bộ thủ
        const cleanRadical = item.radical.replace(/[\s\(\)\[\]\{\}\/\\,\-—|：:]/g, '');
        for (let i = 0; i < word.length; i++) {
            if (cleanRadical.includes(word[i])) {
                return true;
            }
        }
        
        // --- CÁCH 2: Đối chiếu thông minh qua Radical Mapping Dictionary ---
        // Trích xuất các biểu tượng bộ thủ đơn lẻ (Ví dụ "人 (亻)" -> ["人", "体", "亻"...])
        const radicalSymbols = [...cleanRadical];
        
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