// =========================================================================
// APP COMPONENT CHÍNH (Kết nối tất cả mọi thứ)
// =========================================================================
const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

const App = () => {
    const [activeLevel, setActiveLevel] = useStateApp(1);
    const [activeTab, setActiveTab] = useStateApp('overview'); 
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

    const tabs = [
        { id: 'overview', name: 'Tổng quan', icon: 'fa-chart-pie' },
        { id: 'curriculum', name: 'Học theo Bài', icon: 'fa-graduation-cap' }, 
        { id: 'dictionary', name: 'Từ vựng', icon: 'fa-book' },
        { id: 'grammar', name: 'Ngữ pháp', icon: 'fa-layer-group' }, 
        { id: 'flashcard', name: 'Flashcard', icon: 'fa-clone' },
        { id: 'quiz', name: 'Trắc nghiệm', icon: 'fa-gamepad' },
        { id: 'bookmarks', name: 'Ưu tiên', icon: 'fa-star' }
    ];

    const zhVoicesList = useMemoApp(() => {
        return availableVoices.filter(v => v.lang.toLowerCase().includes('zh') || v.lang.toLowerCase().includes('cn'));
    }, [availableVoices]);

    const viVoicesList = useMemoApp(() => {
        return availableVoices.filter(v => v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn'));
    }, [availableVoices]);

    return (
        <>
            <header className="bg-gradient-to-br from-teal-600 to-teal-800 dark:from-slate-900 dark:to-teal-950 text-white pt-10 pb-6 px-4 md:px-8 rounded-b-[42px] shadow-md mb-6 transition-colors relative overflow-hidden">
                
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
                    <i className="fas fa-seedling text-[200px]"></i>
                </div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-2">
                            <i className="fas fa-yin-yang text-teal-200 animate-spin animate-duration-[10s]"></i> Sổ Tay Học HSK Pro
                        </h1>
                        <p className="text-teal-100 text-[11px] md:text-xs font-semibold opacity-90 mt-1">
                            Hệ thống Spaced Repetition (Lặp lại ngắt quãng) & Mẹo Nhớ Từ Toàn Diện
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                        <div className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold mr-1" title="Chuỗi ngày học liên tục">
                            <span className="text-orange-400 animate-pulse">🔥</span>
                            <span>{streak} Ngày</span>
                        </div>
                        
                        <button 
                            onClick={() => setShowVoiceSettings(true)}
                            className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs shrink-0"
                            title="Cấu hình giọng nói & tốc độ"
                        >
                            <i className="fas fa-sliders-h"></i>
                        </button>

                        <button 
                            onClick={exportData}
                            className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs shrink-0"
                            title="Tải tệp sao lưu dữ liệu (.json)"
                        >
                            <i className="fas fa-file-export"></i>
                        </button>
                        <label 
                            className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs cursor-pointer shrink-0"
                            title="Nhập tệp sao lưu tiến trình (.json)"
                        >
                            <i className="fas fa-file-import"></i>
                            <input type="file" accept=".json" onChange={importData} className="hidden" />
                        </label>
                        <button 
                            onClick={() => setDarkMode(!darkMode)} 
                            className="bg-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs shrink-0"
                            title={darkMode ? "Giao diện sáng" : "Giao diện tối"}
                        >
                            <i className={`fas ${darkMode ? 'fa-sun text-amber-300' : 'fa-moon'}`}></i>
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 relative z-10">
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

                <div className="mt-4 bg-black/15 dark:bg-black/30 p-3 rounded-2xl relative z-10 border border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-teal-100 mb-1.5 uppercase tracking-wider">
                        <span>Tiến độ HSK {activeLevel} của phiên học</span>
                        <span>Đã thuộc: {progressStats.mastered} / {progressStats.total} ({progressStats.masteredPercent}%)</span>
                    </div>
                    <div className="w-full bg-black/25 rounded-full h-2.5 overflow-hidden flex">
                        <div className="bg-emerald-400 h-full rounded-l-full transition-all duration-500" style={{ width: `${progressStats.masteredPercent}%` }} title="Đã thuộc"></div>
                        <div className="bg-indigo-400 h-full transition-all duration-500" style={{ width: `${progressStats.learningPercent}%` }} title="Đang học"></div>
                    </div>
                </div>
            </header>

            <main className="px-4 md:px-6">
                
                <div className="flex justify-start md:justify-center mb-6 overflow-x-auto hide-scrollbar">
                    <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm inline-flex border border-slate-100 dark:border-slate-800 min-w-max">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 sm:px-5 py-2 rounded-xl font-bold flex items-center gap-2 text-xs md:text-sm transition-all ${
                                    activeTab === tab.id 
                                        ? (tab.id === 'bookmarks' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shadow-sm' : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 shadow-sm') 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                            >
                                <i className={`fas ${tab.icon} ${activeTab === tab.id ? 'animate-bounce' : ''}`}></i>
                                <span>{tab.name}</span>
                                {tab.id === 'bookmarks' && bookmarks.length > 0 && (
                                    <span className="ml-0.5 bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                        {bookmarks.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'overview' && (
                        <OverviewTab 
                            progress={progress}
                            bookmarks={bookmarks}
                            onSwitchTab={setActiveTab}
                            onSwitchLevel={setActiveLevel}
                            streak={streak}
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