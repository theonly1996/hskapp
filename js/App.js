// =========================================================================
// APP COMPONENT CHÍNH (Kết nối tất cả mọi thứ)
// =========================================================================
const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

const App = () => {
    const [activeLevel, setActiveLevel] = useStateApp(1);
    const [activeTab, setActiveTab] = useStateApp('home'); 
    const [words, setWords] = useStateApp([]);
    const [loading, setLoading] = useStateApp(false);
    const [writingWord, setWritingWord] = useStateApp(null);

    const [streak, setStreak] = useStateApp(0);

    const [zhVoice, setZhVoice] = useStateApp(() => localStorage.getItem('hsk_zh_voice') || '');
    const [viVoice, setViVoice] = useStateApp(() => localStorage.getItem('hsk_vi_voice') || '');
    const [speechRate, setSpeechRate] = useStateApp(() => {
        const saved = localStorage.getItem('hsk_speech_rate');
        return saved ? parseFloat(saved) : 0.85;
    });
    const [showVoiceSettings, setShowVoiceSettings] = useStateApp(false);
    const [availableVoices, setAvailableVoices] = useStateApp([]);

    const [curriculumData, setCurriculumData] = useStateApp(FALLBACK_CURRICULUM);
    const [toast, setToast] = useStateApp(null);

    // Điều hướng cho thẻ "Hôm nay học gì" (OverviewTab):
    // - curriculumJumpTarget: yêu cầu CurriculumTab mở đúng { level, lessonId } khi mount.
    // - flashcardStartMode: yêu cầu FlashcardTab mở đúng chế độ khi mount
    //   ('all' mặc định, '__review_due__' khi bấm "Ôn tập ngay").
    const [curriculumJumpTarget, setCurriculumJumpTarget] = useStateApp(null);
    const [flashcardStartMode, setFlashcardStartMode] = useStateApp('all');

    const jumpToCurriculumLesson = (level, lessonId) => {
        setCurriculumJumpTarget({ level, lessonId });
        setActiveTab('curriculum');
    };

    const startTodayReview = () => {
        setFlashcardStartMode('__review_due__');
        setActiveTab('flashcard');
    };

    const startTodayNewWords = (level) => {
        if (typeof level === 'number') setActiveLevel(level);
        setFlashcardStartMode('all');
        setActiveTab('flashcard');
    };

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    useEffectApp(() => {
        window.hskVoiceConfig = {
            zhVoiceName: zhVoice,
            viVoiceName: viVoice,
            rate: speechRate
        };
        localStorage.setItem('hsk_zh_voice', zhVoice);
        localStorage.setItem('hsk_vi_voice', viVoice);
        localStorage.setItem('hsk_speech_rate', speechRate.toString());
    }, [zhVoice, viVoice, speechRate]);

    useEffectApp(() => {
        const loadVoicesList = () => {
            if ('speechSynthesis' in window) {
                const voices = window.speechSynthesis.getVoices();
                setAvailableVoices(voices);

                if (voices.length > 0) {
                    if (!zhVoice) {
                        const bestZh = voices.find(v => v.lang === 'zh-CN' && v.name.includes('Google')) ||
                                       voices.find(v => v.lang === 'zh-CN' && v.name.includes('Microsoft')) ||
                                       voices.find(v => v.lang === 'zh-CN') ||
                                       voices.find(v => v.lang.startsWith('zh'));
                        if (bestZh) setZhVoice(bestZh.name);
                    }
                    if (!viVoice) {
                        const bestVi = voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.includes('Google')) ||
                                       voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.toLowerCase().includes('natural')) ||
                                       voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && v.name.includes('Microsoft')) ||
                                       voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN') ||
                                       voices.find(v => v.lang.startsWith('vi'));
                        if (bestVi) setViVoice(bestVi.name);
                    }
                }
            }
        };

        loadVoicesList();
        if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoicesList;
        }
    }, [zhVoice, viVoice]);

    // TẢI ĐỌC CƠ SỞ DỮ LIỆU ĐOẠN VĂN DÀI (hsk_stories.js)
    useEffectApp(() => {
        const oldScript = document.getElementById('hsk-stories-script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = 'hsk-stories-script';
        script.src = 'hsk_stories.js';
        script.onload = () => {
            console.log("Cơ sở dữ liệu đoạn văn dài được tải thành công.");
        };
        script.onerror = () => {
            window.hskStories = [
                {
                    id: "fallback_1",
                    title: "Học tiếng Trung (学习汉语)",
                    level: "HSK 1-2",
                    zh: "学习汉语非常有意思。虽然汉字有点难，但是我觉得发音很好听。我每天练习说汉语，看中文电影。我相信，只要努力，我就能学好汉语。",
                    pinyin: "Xuéxí Hànyǔ fēicháng yǒu yìsi. Suīrán Hànzì yǒudiǎn nán, dànshì wǒ juéde fāyīn hěn hǎotīng. Wǒ měitiān liànxí shuō Hànyǔ, kàn Zhōngwén diànyǐng. Wǒ xiāngxìn, zhǐyào nǔlì, wǒ jiù néng xuéhǎo Hànyǔ.",
                    vi: "Học tiếng Trung rất thú vị. Mặc dù chữ Hán hơi khó, nhưng tôi thấy phát âm rất hay. Mỗi ngày tôi đều luyện nói tiếng Trung, xem phim Trung Quốc. Tôi tin rằng, chỉ cần chăm chỉ, tôi nhất định có thể học tốt tiếng Trung."
                }
            ];
        };
        document.body.appendChild(script);
    }, []);

    // TẢI ĐỘNG FILE GIÁO TRÌNH HỌC THEO BÀI (hsk_curriculum.js)
    useEffectApp(() => {
        const oldScript = document.getElementById('hsk-curriculum-script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = 'hsk-curriculum-script';
        script.src = 'hsk_curriculum.js';
        script.onload = () => {
            if (window.hskCurriculumData) {
                setCurriculumData(window.hskCurriculumData);
                console.log("Cơ sở dữ liệu giáo trình học theo bài HSK 1-2-3 được liên kết thành công.");
            }
        };
        script.onerror = () => {
            console.warn("Không tìm thấy file hsk_curriculum.js ngoài thực địa, chuyển sang chế độ dự phòng.");
            setCurriculumData(FALLBACK_CURRICULUM);
        };
        document.body.appendChild(script);
    }, []);

    const [darkMode, setDarkMode] = useStateApp(() => {
        const saved = localStorage.getItem('hsk_dark_mode');
        return saved ? saved === 'true' : false;
    });

    useEffectApp(() => {
        localStorage.setItem('hsk_dark_mode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffectApp(() => {
        const currentStreak = window.ProgressService.recordDailyActivity();
        setStreak(currentStreak);
    }, []);

    const [bookmarks, setBookmarks] = useStateApp(() => window.ProgressService.getAllBookmarks());

    const [progress, setProgress] = useStateApp(() => window.ProgressService.getAllVocabularyProgress());

    const changeStatus = (wordId, newStatus) => {
        const updated = window.ProgressService.updateWordProgress(wordId, newStatus);
        setProgress(updated);
        if (newStatus === 'mastered') {
            showToast("Đã thuộc thêm 1 từ vựng!", "success");
        }
    };

    const toggleBookmark = (wordToToggle) => {
        const result = window.ProgressService.toggleBookmark(wordToToggle);
        setBookmarks(result.bookmarks);
        if (result.wasAdded) {
            showToast(`Đã lưu ưu tiên: ${wordToToggle.word}`, "success");
        } else {
            showToast(`Đã bỏ lưu: ${wordToToggle.word}`, "info");
        }
    };

    // TIẾN ĐỘ VỞ BÀI TẬP LUYỆN DỊCH (Lesson Progress): trước đây được quản lý
    // cục bộ bên trong OverviewTab.js. Nay chuyển lên App.js để cả HomeTab
    // (tính "Bài học tiếp theo") lẫn StatsTab (bảng theo dõi luyện dịch đầy
    // đủ) cùng dùng chung MỘT nguồn dữ liệu duy nhất — không đổi logic tính
    // toán, chỉ đổi nơi lưu state để tránh trùng lặp danh sách mặc định.
    const [lessonProgress, setLessonProgress] = useStateApp([]);

    useEffectApp(() => {
        const defaultList = window.hskProData?.defaultProgress || [
            // HSK 1 (Bài 1 - 15)
            { lessonId: 1, level: 1, title: "Bài 1: 你好 — Xin chào", isCompleted: false, currentScore: 0 },
            { lessonId: 2, level: 1, title: "Bài 2: 谢谢你 — Cảm ơn bạn", isCompleted: false, currentScore: 0 },
            { lessonId: 3, level: 1, title: "Bài 3: 你叫什么名字 — Bạn tên là gì", isCompleted: false, currentScore: 0 },
            { lessonId: 4, level: 1, title: "Bài 4: 她是我的汉语老师 — Cô ấy là giáo viên", isCompleted: false, currentScore: 0 },
            { lessonId: 5, level: 1, title: "Bài 5: 她女儿今年二十岁 — Con gái cô ấy 20 tuổi", isCompleted: false, currentScore: 0 },
            { lessonId: 6, level: 1, title: "Bài 6: 我会 say 汉语 — Tôi biết nói tiếng Trung", isCompleted: false, currentScore: 0 },
            { lessonId: 7, level: 1, title: "Bài 7: 今天几号 — Hôm nay ngày mấy", isCompleted: false, currentScore: 0 },
            { lessonId: 8, level: 1, title: "Bài 8: 我想喝茶 — Tôi muốn uống trà", isCompleted: false, currentScore: 0 },
            { lessonId: 9, level: 1, title: "Bài 9: 你兒子在哪里工作 — Con trai bạn làm việc ở đâu", isCompleted: false, currentScore: 0 },
            { lessonId: 10, level: 1, title: "Bài 10: 我能坐这儿吗 — Tôi có thể ngồi đây không", isCompleted: false, currentScore: 0 },
            { lessonId: 11, level: 1, title: "Bài 11: 现在几点 — Bây giờ mấy giờ", isCompleted: false, currentScore: 0 },
            { lessonId: 12, level: 1, title: "Bài 12: 明天天气怎么样 — Ngày mai thời tiết thế nào", isCompleted: false, currentScore: 0 },
            { lessonId: 13, level: 1, title: "Bài 13: 他在学做中国菜呢 — Anh ấy đang học nấu ăn", isCompleted: false, currentScore: 0 },
            { lessonId: 14, level: 1, title: "Bài 14: 她买了不少衣服 — Cô ấy mua không ít quần áo", isCompleted: false, currentScore: 0 },
            { lessonId: 15, level: 1, title: "Bài 15: 我我是坐飞机来的 — Tôi đi máy bay đến", isCompleted: false, currentScore: 0 },

            // HSK 2 (Bài 16 - 30)
            { lessonId: 16, level: 2, title: "Bài 16 (H2-B1): 九月去北京旅游 tốt nhất", isCompleted: false, currentScore: 0 },
            { lessonId: 17, level: 2, title: "Bài 17 (H2-B2): 我每天六点起床", isCompleted: false, currentScore: 0 },
            { lessonId: 18, level: 2, title: "Bài 18 (H2-B3): 左边那个红色的是 shadow", isCompleted: false, currentScore: 0 },
            { lessonId: 19, level: 2, title: "Bài 19 (H2-B4): 这个工作是他帮 me", isCompleted: false, currentScore: 0 },
            { lessonId: 20, level: 2, title: "Bài 20 (H2-B5): 可以这儿写你的名字", isCompleted: false, currentScore: 0 },
            { lessonId: 21, level: 2, title: "Bài 21 (H2-B6): 你怎么 không chī le", isCompleted: false, currentScore: 0 },
            { lessonId: 22, level: 2, title: "Bài 22 (H2-B7): 你家离公司远吗", isCompleted: false, currentScore: 0 },
            { lessonId: 23, level: 2, title: "Bài 23 (H2-B8): 让我想一想再告诉你", isCompleted: false, currentScore: 0 },
            { lessonId: 24, level: 2, title: "Bài 24 (H2-B9): 题太多，我没做完", isCompleted: false, currentScore: 0 },
            { lessonId: 25, level: 2, title: "Bài 25 (H2-B10): 别找了，手机在桌子上呢", isCompleted: false, currentScore: 0 },
            { lessonId: 26, level: 2, title: "Bài 26 (H2-B11): 他比我大三岁", isCompleted: false, currentScore: 0 },
            { lessonId: 27, level: 2, title: "Bài 27 (H2-B12): 你穿得太少了", isCompleted: false, currentScore: 0 },
            { lessonId: 28, level: 2, title: "Bài 28 (H2-B13): 门开着呢", isCompleted: false, currentScore: 0 },
            { lessonId: 29, level: 2, title: "Bài 29 (H2-B14): 你看过那个电影吗", isCompleted: false, currentScore: 0 },
            { lessonId: 30, level: 2, title: "Bài 30 (H2-B15): 新年快到了", isCompleted: false, currentScore: 0 },

            // HSK 3 (Bài 31 - 45)
            { lessonId: 31, level: 3, title: "Bài 31 (H3-B1): 周末你有什么打算", isCompleted: false, currentScore: 0 },
            { lessonId: 32, level: 3, title: "Bài 32 (H3-B2): 他什么时候回来", isCompleted: false, currentScore: 0 },
            { lessonId: 33, level: 3, title: "Bài 33 (H3-B3): 桌子上放着一杯咖啡", isCompleted: false, currentScore: 0 },
            { lessonId: 34, level: 3, title: "Bài 34 (H3-B4): 她总是笑眯眯 de", isCompleted: false, currentScore: 0 },
            { lessonId: 35, level: 3, title: "Bài 35 (H3-B5): 我最近买了一辆 new 车", isCompleted: false, currentScore: 0 },
            { lessonId: 36, level: 3, title: "Bài 36 (H3-B6): 怎么突然变冷了", isCompleted: false, currentScore: 0 },
            { lessonId: 37, level: 3, title: "Bài 37 (H3-B7): 我跟他一样高", isCompleted: false, currentScore: 0 },
            { lessonId: 38, level: 3, title: "Bài 38 (H3-B8): 这里的变化真大", isCompleted: false, currentScore: 0 },
            { lessonId: 39, level: 3, title: "Bài 39 (H3-B9): 她的汉语越来越好", isCompleted: false, currentScore: 0 },
            { lessonId: 40, level: 3, title: "Bài 40 (H3-B10): 数学考试难 không", isCompleted: false, currentScore: 0 },
            { lessonId: 41, level: 3, title: "Bài 41 (H3-B11): 别着急，慢慢来", isCompleted: false, currentScore: 0 },
            { lessonId: 42, level: 3, title: "Bài 42 (H3-B12): 把书放在桌子上", isCompleted: false, currentScore: 0 },
            { lessonId: 43, level: 3, title: "Bài 43 (H3-B13): 我习惯了这里的生活", isCompleted: false, currentScore: 0 },
            { lessonId: 44, level: 3, title: "Bài 44 (H3-B14): 请再检查一下账单", isCompleted: false, currentScore: 0 },
            { lessonId: 45, level: 3, title: "Bài 45 (H3-B15): 终于把 problem 解决了", isCompleted: false, currentScore: 0 }
        ];

        const mergedList = window.ProgressService.syncLessonProgress(defaultList);
        setLessonProgress(mergedList);
    }, []);

    const handleToggleLesson = (lessonId) => {
        const updated = window.ProgressService.toggleLessonProgress(lessonId);
        setLessonProgress(updated);
    };

    useEffectApp(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchHSKData(activeLevel);
            setWords(data);
            setLoading(false);
        };
        loadData();
    }, [activeLevel]);

    const exportData = () => {
        const backupObj = window.ProgressService.exportBackup();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", window.ProgressService.getBackupFilename());
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Xuất dữ liệu tiến trình thành công!", "success");
    };

    const importData = (e) => {
        const fileReader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    const result = window.ProgressService.importBackup(parsed);
                    setBookmarks(result.bookmarks);
                    setProgress(result.progress);
                    showToast("Đã đồng bộ sao lưu dữ liệu thành công!", "success");
                } catch (err) {
                    showToast("Lỗi! Tệp tin sao lưu không chính xác.", "error");
                }
            };
        }
    };

    const progressStats = useMemoApp(() => {
        return window.ProgressService.getVocabularyStatistics(words);
    }, [words, progress]);

    // ĐIỀU HƯỚNG: chỉ giữ lại 5 mục thiết yếu, dùng hằng ngày ở khu vực chính
    // (Trang chủ luôn là mục đầu tiên). Các tính năng ít dùng hơn (Ngữ pháp,
    // Ưu tiên, Thống kê chi tiết) được gom vào menu phụ "Thêm" để giao diện
    // chính không bị rối.
    const primaryTabs = [
        { id: 'home', name: 'Trang chủ', icon: 'fa-house' },
        { id: 'curriculum', name: 'Học bài', icon: 'fa-graduation-cap' },
        { id: 'dictionary', name: 'Từ vựng', icon: 'fa-book' },
        { id: 'flashcard', name: 'Flashcard', icon: 'fa-clone' }
    ];

    const secondaryTabs = [
        { id: 'quiz', name: 'Trắc nghiệm', icon: 'fa-gamepad' },
        { id: 'grammar', name: 'Ngữ pháp', icon: 'fa-layer-group' },
        { id: 'bookmarks', name: 'Ưu tiên', icon: 'fa-star' },
        { id: 'stats', name: 'Thống kê', icon: 'fa-chart-pie' }
    ];

    const isSecondaryTabActive = secondaryTabs.some(t => t.id === activeTab);

    const [showMoreMenu, setShowMoreMenu] = useStateApp(false);
    const [showSettingsMenu, setShowSettingsMenu] = useStateApp(false);

    const goToTab = (tabId) => {
        setActiveTab(tabId);
        if (tabId === 'flashcard') setFlashcardStartMode('all');
        setShowMoreMenu(false);
    };

    const zhVoicesList = useMemoApp(() => {
        return availableVoices.filter(v => v.lang.toLowerCase().includes('zh') || v.lang.toLowerCase().includes('cn'));
    }, [availableVoices]);

    const viVoicesList = useMemoApp(() => {
        return availableVoices.filter(v => v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn'));
    }, [availableVoices]);

    return (
        <>
            <header className="bg-gradient-to-br from-teal-600 to-teal-800 dark:from-slate-900 dark:to-teal-950 text-white pt-8 pb-5 px-4 md:px-8 rounded-b-[32px] shadow-md mb-5 transition-colors relative overflow-hidden">

                <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
                    <i className="fas fa-seedling text-[160px]"></i>
                </div>

                <div className="flex justify-between items-center mb-5 relative z-10">
                    <h1 className="text-lg md:text-xl font-extrabold flex items-center gap-2">
                        <i className="fas fa-yin-yang text-teal-200"></i> Sổ Tay Học HSK
                    </h1>

                    <div className="flex items-center gap-1.5">
                        <div className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold" title="Chuỗi ngày học liên tục">
                            <span className="text-orange-400">🔥</span>
                            <span>{streak}</span>
                        </div>

                        {/* MENU CÀI ĐẶT GỘP: thay vì 4 nút rời rạc (giọng đọc / xuất / nhập / sáng-tối),
                            gộp lại thành 1 nút bánh răng duy nhất để giảm rối mắt trên header. */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettingsMenu(v => !v)}
                                className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs shrink-0"
                                title="Cài đặt"
                            >
                                <i className="fas fa-gear"></i>
                            </button>

                            {showSettingsMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowSettingsMenu(false)}></div>
                                    <div className="absolute right-0 top-11 w-60 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-fade-in">
                                        <button
                                            onClick={() => { setDarkMode(!darkMode); }}
                                            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <i className={`fas ${darkMode ? 'fa-sun text-amber-500' : 'fa-moon text-indigo-500'} w-4`}></i>
                                                Giao diện {darkMode ? 'sáng' : 'tối'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => { setShowVoiceSettings(true); setShowSettingsMenu(false); }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                        >
                                            <i className="fas fa-sliders-h w-4 text-teal-600 dark:text-teal-400"></i>
                                            Giọng đọc &amp; tốc độ
                                        </button>
                                        <button
                                            onClick={() => { exportData(); setShowSettingsMenu(false); }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                                        >
                                            <i className="fas fa-file-export w-4 text-teal-600 dark:text-teal-400"></i>
                                            Xuất dữ liệu (.json)
                                        </button>
                                        <label className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer">
                                            <i className="fas fa-file-import w-4 text-teal-600 dark:text-teal-400"></i>
                                            Nhập dữ liệu (.json)
                                            <input type="file" accept=".json" onChange={(e) => { importData(e); setShowSettingsMenu(false); }} className="hidden" />
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto hide-scrollbar relative z-10">
                    {[1, 2, 3, 4, 5, 6].map(level => (
                        <button
                            key={level}
                            onClick={() => setActiveLevel(level)}
                            className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all text-xs ${
                                activeLevel === level 
                                ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-md scale-105' 
                                : 'bg-teal-700/50 dark:bg-slate-800/40 text-teal-100 dark:text-slate-400 hover:bg-teal-700/80 border border-teal-500/30 dark:border-slate-800/60'
                            }`}
                        >
                            HSK {level}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-4 md:px-6 pb-24 md:pb-6">

                {/* ĐIỀU HƯỚNG DESKTOP: thanh pill ở giữa, chỉ 4 mục thiết yếu + nút "Thêm" */}
                <div className="hidden md:flex justify-center mb-6">
                    <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm inline-flex items-center border border-slate-100 dark:border-slate-800">
                        {primaryTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => goToTab(tab.id)}
                                className={`px-5 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition-all ${
                                    activeTab === tab.id 
                                        ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 shadow-sm' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                            >
                                <i className={`fas ${tab.icon}`}></i>
                                <span>{tab.name}</span>
                            </button>
                        ))}

                        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1"></div>

                        <div className="relative">
                            <button
                                onClick={() => setShowMoreMenu(v => !v)}
                                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition-all ${
                                    isSecondaryTabActive 
                                        ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 shadow-sm' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                            >
                                <i className="fas fa-ellipsis"></i>
                                <span>Thêm</span>
                                {bookmarks.length > 0 && (
                                    <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{bookmarks.length}</span>
                                )}
                            </button>

                            {showMoreMenu && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)}></div>
                                    <div className="absolute right-0 top-11 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-1.5 z-50 animate-fade-in">
                                        {secondaryTabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => goToTab(tab.id)}
                                                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                                                    activeTab === tab.id
                                                        ? (tab.id === 'bookmarks' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400')
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <i className={`fas ${tab.icon} w-4`}></i>
                                                    {tab.name}
                                                </span>
                                                {tab.id === 'bookmarks' && bookmarks.length > 0 && (
                                                    <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{bookmarks.length}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'home' && (
                        <HomeTab
                            progress={progress}
                            bookmarks={bookmarks}
                            curriculumData={curriculumData}
                            words={words}
                            activeLevel={activeLevel}
                            streak={streak}
                            lessonProgress={lessonProgress}
                            onSwitchTab={goToTab}
                            onJumpToLesson={jumpToCurriculumLesson}
                            onStartReview={startTodayReview}
                            onStartNewWords={startTodayNewWords}
                        />
                    )}
                    {activeTab === 'stats' && (
                        <StatsTab
                            progress={progress}
                            bookmarks={bookmarks}
                            onSwitchTab={goToTab}
                            onSwitchLevel={setActiveLevel}
                            streak={streak}
                            lessonProgress={lessonProgress}
                            onToggleLesson={handleToggleLesson}
                        />
                    )}
                    {activeTab === 'curriculum' && (
                        <CurriculumTab
                            curriculumData={curriculumData}
                            progress={progress}
                            bookmarks={bookmarks}
                            onToggleBookmark={toggleBookmark}
                            onChangeStatus={changeStatus}
                            onShowStroke={setWritingWord}
                            jumpTarget={curriculumJumpTarget}
                        />
                    )}
                    {activeTab === 'dictionary' && (
                        <DictionaryTab 
                            words={words} 
                            loading={loading} 
                            bookmarks={bookmarks} 
                            onToggleBookmark={toggleBookmark} 
                            onShowStroke={setWritingWord} 
                            progress={progress}
                            onChangeStatus={changeStatus}
                        />
                    )}
                    {activeTab === 'grammar' && (
                        <GrammarTab 
                            activeLevel={activeLevel}
                        />
                    )}
                    {activeTab === 'flashcard' && (
                        <FlashcardTab 
                            words={words} 
                            loading={loading} 
                            bookmarks={bookmarks} 
                            onToggleBookmark={toggleBookmark} 
                            onShowStroke={setWritingWord} 
                            progress={progress}
                            onChangeStatus={changeStatus}
                            initialLessonId={flashcardStartMode}
                        />
                    )}
                    {activeTab === 'quiz' && (
                        <QuizTab 
                            words={words} 
                            loading={loading} 
                        />
                    )}
                    {activeTab === 'bookmarks' && (
                        <BookmarksTab 
                            bookmarks={bookmarks} 
                            onToggleBookmark={toggleBookmark} 
                            onShowStroke={setWritingWord} 
                            progress={progress}
                            onChangeStatus={changeStatus}
                        />
                    )}
                </div>
            </main>

            {/* ĐIỀU HƯỚNG MOBILE: thanh cố định dưới cùng, 4 mục thiết yếu + "Thêm" —
                giúp người dùng luôn thấy ngay lối vào Trang chủ / học bài mà không
                cần cuộn lên đầu trang. */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-5">
                    {primaryTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => goToTab(tab.id)}
                            className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                                activeTab === tab.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'
                            }`}
                        >
                            <i className={`fas ${tab.icon} text-base`}></i>
                            {tab.name}
                        </button>
                    ))}
                    <button
                        onClick={() => setShowMoreMenu(true)}
                        className={`relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                            isSecondaryTabActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'
                        }`}
                    >
                        <i className="fas fa-ellipsis text-base"></i>
                        Thêm
                        {bookmarks.length > 0 && (
                            <span className="absolute top-1 right-6 bg-amber-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{bookmarks.length}</span>
                        )}
                    </button>
                </div>
            </nav>

            {/* MENU "THÊM" DẠNG BOTTOM-SHEET CHO MOBILE */}
            {showMoreMenu && (
                <div className="md:hidden fixed inset-0 z-50 flex items-end" onClick={() => setShowMoreMenu(false)}>
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"></div>
                    <div className="relative w-full bg-white dark:bg-slate-900 rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
                        <div className="w-10 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4"></div>
                        <div className="grid grid-cols-4 gap-2">
                            {secondaryTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => goToTab(tab.id)}
                                    className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-2xl text-[11px] font-bold transition-colors ${
                                        activeTab === tab.id
                                            ? (tab.id === 'bookmarks' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400')
                                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300'
                                    }`}
                                >
                                    <i className={`fas ${tab.icon} text-lg`}></i>
                                    {tab.name}
                                    {tab.id === 'bookmarks' && bookmarks.length > 0 && (
                                        <span className="absolute top-1 right-1 bg-amber-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{bookmarks.length}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {writingWord && <StrokeModal word={writingWord} onClose={() => setWritingWord(null)} />}

            {/* TOAST SYSTEM */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* MODAL CÀI ĐẶT CẤU HÌNH GIỌNG ĐỌC */}
            {showVoiceSettings && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowVoiceSettings(false)}>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowVoiceSettings(false)} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                        
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center text-xl mx-auto mb-3 border dark:border-teal-900/30">
                                <i className="fas fa-sliders-h"></i>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Cấu hình giọng phát âm & Tốc độ</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Cải thiện chất lượng âm thanh dịch nghĩa tiếng Việt và tiếng Trung Hán ngữ.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Giọng đọc tiếng Trung (zh-CN)</label>
                                <div className="flex gap-2">
                                    <select 
                                        value={zhVoice} 
                                        onChange={(e) => setZhVoice(e.target.value)}
                                        className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-xs font-bold"
                                    >
                                        {zhVoicesList.length === 0 ? (
                                            <option value="">Không có sẵn giọng Trung (Mặc định)</option>
                                        ) : (
                                            zhVoicesList.map(v => (
                                                <option key={v.name} value={v.name}>{v.name} ({v.localService ? 'Ngoại tuyến' : 'Trực tuyến'})</option>
                                            ))
                                        )}
                                    </select>
                                    <button 
                                        onClick={() => playAudio("你好，祝你学习愉快！", "zh-CN")}
                                        className="px-3 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 hover:bg-teal-200 rounded-xl transition-colors shrink-0 text-xs"
                                    >
                                        <i className="fas fa-play"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Giọng đọc tiếng Việt (vi-VN)</label>
                                <div className="flex gap-2">
                                    <select 
                                        value={viVoice} 
                                        onChange={(e) => setViVoice(e.target.value)}
                                        className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500 outline-none text-xs font-bold"
                                    >
                                        {viVoicesList.length === 0 ? (
                                            <option value="">Không tìm thấy giọng Việt (Mặc định)</option>
                                        ) : (
                                            viVoicesList.map(v => (
                                                <option key={v.name} value={v.name}>{v.name} ({v.localService ? 'Ngoại tuyến' : 'Trực tuyến'})</option>
                                            ))
                                        )}
                                    </select>
                                    <button 
                                        onClick={() => playAudio("Chào bạn, chúc bạn học tiếng Trung vui vẻ!", "vi-VN")}
                                        className="px-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 rounded-xl transition-colors shrink-0 text-xs"
                                    >
                                        <i className="fas fa-play"></i>
                                    </button>
                                </div>
                                {viVoicesList.length === 0 && (
                                    <p className="text-[10px] text-amber-500 font-semibold mt-1 leading-normal">
                                        ⚠️ Trình duyệt chưa cài giọng tiếng Việt. Hãy dùng <strong>Google Chrome</strong> hoặc <strong>Microsoft Edge</strong> để tự nạp gói giọng trực tuyến mượt mà.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tốc độ đọc (Rate)</label>
                                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-md border dark:border-teal-900/30">{speechRate.toFixed(2)}x</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0.5" 
                                    max="1.5" 
                                    step="0.05"
                                    value={speechRate}
                                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                    <span>Chậm (0.5x)</span>
                                    <span>Chuẩn (1.0x)</span>
                                    <span>Nhanh (1.5x)</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                            <button 
                                onClick={() => {
                                    setSpeechRate(0.85);
                                    const voices = window.speechSynthesis.getVoices();
                                    const bestZh = voices.find(v => v.lang === 'zh-CN' && v.name.includes('Google')) || voices.find(v => v.lang === 'zh-CN');
                                    const bestVi = voices.find(v => (v.lang === 'vi-VN' || v.lang === 'vi_VN') && v.name.includes('Google')) || voices.find(v => v.lang === 'vi-VN');
                                    if (bestZh) setZhVoice(bestZh.name);
                                    if (bestVi) setViVoice(bestVi.name);
                                }}
                                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-2xl transition-all"
                            >
                                Đặt lại mặc định
                            </button>
                            <button 
                                onClick={() => setShowVoiceSettings(false)}
                                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all"
                            >
                                Xác nhận lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Khởi chạy ứng dụng (Gắn vào thẻ <div id="root">)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);