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