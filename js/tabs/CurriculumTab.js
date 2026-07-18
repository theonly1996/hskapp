// =========================================================================
// TAB: CHƯƠNG TRÌNH HỌC THEO BÀI (HSK 1 - 2 - 3)
// =========================================================================
const { useState: useStateCurriculum, useMemo: useMemoCurriculum, useEffect: useEffectCurriculum } = React;

const CurriculumTab = ({ curriculumData, progress, bookmarks, lessonProgress = [], onToggleBookmark, onChangeStatus, onShowStroke, onCompleteLesson, jumpTarget, onSwitchTab }) => {
    // BUGFIX (Bug #1): nếu App.js truyền jumpTarget (từ CTA "Vào học ngay" ở
    // Home), mở đúng cấp độ + bài học đó — hành vi này giữ nguyên 100%.
    // Nếu KHÔNG có jumpTarget (mở tab "Học bài" trực tiếp từ thanh điều
    // hướng), trước đây mặc định cứng về Cấp độ 1 - Bài 1 bất kể tiến độ.
    // Nay tự suy ra bài học tiếp theo CHƯA hoàn thành từ lessonProgress
    // (cùng công thức quy đổi lessonId toàn cục <-> nội bộ đang dùng trong
    // file này: LESSONS_PER_LEVEL = 15). Nếu lessonProgress rỗng hoặc đã
    // hoàn thành hết, fallback về đúng hành vi cũ (Cấp độ 1, bài đầu tiên).
    const resolvedInitialTarget = jumpTarget || (() => {
        const sortedProgress = (lessonProgress || []).slice().sort((a, b) => a.lessonId - b.lessonId);
        const nextEntry = sortedProgress.find(l => !l.isCompleted);
        if (!nextEntry) return null;
        const level = nextEntry.level || 1;
        const localLessonId = nextEntry.lessonId - 15 * (level - 1);
        return { level, lessonId: localLessonId };
    })();

    const [curLevel, setCurLevel] = useStateCurriculum(() => (resolvedInitialTarget && resolvedInitialTarget.level) || 1);
    const [selectedIdx, setSelectedIdx] = useStateCurriculum(() => {
        if (!resolvedInitialTarget) return 0;
        const levelLessons = (curriculumData && curriculumData[resolvedInitialTarget.level]) || [];
        const idx = levelLessons.findIndex(les => les.lessonId === resolvedInitialTarget.lessonId);
        return idx >= 0 ? idx : 0;
    }); 
    const [quizAnswers, setQuizAnswers] = useStateCurriculum({});
    const [quizChecked, setQuizChecked] = useStateCurriculum(false);
    const [quizScore, setQuizScore] = useStateCurriculum(null);
    const [isPlayingDialogue, setIsPlayingDialogue] = useStateCurriculum(false);

    const activeLessons = useMemoCurriculum(() => {
        return curriculumData[curLevel] || FALLBACK_CURRICULUM[1];
    }, [curriculumData, curLevel]);

    const currentLesson = useMemoCurriculum(() => {
        return activeLessons[selectedIdx] || activeLessons[0] || { title: "Không có bài học", desc: "Không có dữ liệu bài học nào.", dialogue: [], vocab: [], grammar: "", quiz: [] };
    }, [activeLessons, selectedIdx]);

    // Quy đổi lessonId nội bộ (theo cấp) -> lessonId toàn cục (1-45), giống
    // hệt công thức trong App.js/TodayPlanService — để tra đúng trạng thái
    // hoàn thành của bài đang xem trong Lesson Progress.
    const LESSONS_PER_LEVEL = 15;
    const globalLessonId = (currentLesson.lessonId || 0) + LESSONS_PER_LEVEL * (curLevel - 1);
    const completedLessonIds = useMemoCurriculum(() => {
        return new Set(lessonProgress.filter(l => l.isCompleted).map(l => l.lessonId));
    }, [lessonProgress]);
    const isCurrentLessonDone = completedLessonIds.has(globalLessonId);

    useEffectCurriculum(() => {
        setQuizAnswers({});
        setQuizChecked(false);
        setQuizScore(null);
        setIsPlayingDialogue(false);
        window.speechSynthesis.cancel();
    }, [curLevel, selectedIdx]);

    const playWholeDialogue = async () => {
        if (isPlayingDialogue) {
            window.speechSynthesis.cancel();
            setIsPlayingDialogue(false);
            return;
        }
        setIsPlayingDialogue(true);
        const lines = currentLesson.dialogue;
        for (let i = 0; i < lines.length; i++) {
            if (!window.activeUtterances) break;
            await playAudio(lines[i].zh, 'zh-CN', false);
            await new Promise(r => setTimeout(r, 1200));
        }
        setIsPlayingDialogue(false);
    };

    const selectOption = (qIdx, option) => {
        if (quizChecked) return;
        setQuizAnswers(prev => ({
            ...prev,
            [qIdx]: option
        }));
    };

    const checkAnswers = () => {
        let tempScore = 0;
        currentLesson.quiz.forEach((q, idx) => {
            if (quizAnswers[idx] === q.ans) tempScore++;
        });
        setQuizScore(tempScore);
        setQuizChecked(true);

        if (tempScore === currentLesson.quiz.length) {
            playSoundFeedback('correct');
        } else {
            playSoundFeedback('wrong');
        }

        // Ghi nhận bài học đã hoàn thành ngay khi nộp bài — không cần người
        // dùng phải tự tick hay làm thêm 1 bài luyện dịch riêng để tiến độ
        // ở Home mới nhảy sang bài kế tiếp.
        if (typeof onCompleteLesson === 'function' && currentLesson.lessonId) {
            onCompleteLesson(curLevel, currentLesson.lessonId, tempScore, currentLesson.quiz.length);
        }
    };

    const goToNextLesson = () => {
        if (selectedIdx + 1 < activeLessons.length) {
            setSelectedIdx(selectedIdx + 1);
        } else if (curLevel < 3) {
            setCurLevel(curLevel + 1);
            setSelectedIdx(0);
        }
    };

    const hasNextLesson = selectedIdx + 1 < activeLessons.length || curLevel < 3;

    if (!activeLessons || activeLessons.length === 0) {
        return (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 animate-fade-in">
                <i className="fas fa-graduation-cap text-slate-300 text-4xl mb-3"></i>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Chưa có dữ liệu bài học nào cho cấp độ này.</p>
                <div className="flex gap-2 justify-center mt-4">
                    {[1, 2, 3].map(lvl => (
                        <button key={lvl} onClick={() => setCurLevel(lvl)} className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 rounded-xl text-xs font-bold">HSK {lvl}</button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Chọn Giáo Trình</span>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3].map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => { setCurLevel(lvl); setSelectedIdx(0); }}
                                className={`py-2 rounded-xl text-xs font-bold transition-all ${curLevel === lvl ? 'bg-teal-600 text-white shadow-sm scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
                            >
                                HSK {lvl}
                            </button>
                        ))}
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Danh sách bài học</span>
                    <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1 flex flex-col">
                        {activeLessons.map((les, index) => {
                            const lesGlobalId = les.lessonId + LESSONS_PER_LEVEL * (curLevel - 1);
                            const isDone = completedLessonIds.has(lesGlobalId);
                            return (
                                <button
                                    key={les.lessonId}
                                    onClick={() => setSelectedIdx(index)}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-between gap-2 mb-1 ${selectedIdx === index ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/40' : 'bg-slate-50/50 dark:bg-slate-950/20 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                                >
                                    <span className="truncate pr-2">{les.title}</span>
                                    {isDone ? (
                                        <i className="fas fa-circle-check text-emerald-500 text-xs shrink-0"></i>
                                    ) : (
                                        <i className="fas fa-chevron-right text-[10px] opacity-60 shrink-0"></i>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-5 rounded-3xl border border-indigo-200/20 dark:border-indigo-900/20 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Mục tiêu bài học</span>
                        {isCurrentLessonDone && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <i className="fas fa-circle-check"></i> Đã học
                            </span>
                        )}
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-800 dark:text-white mb-2">{currentLesson.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{currentLesson.desc}</p>
                </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* HỘI THOẠI & BÀI ĐỌC */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-comments text-teal-600"></i> Bài đọc & Hội thoại
                        </h4>
                        <button
                            onClick={playWholeDialogue}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${isPlayingDialogue ? 'bg-red-500 text-white animate-pulse' : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 hover:bg-teal-100'}`}
                        >
                            <i className={`fas ${isPlayingDialogue ? 'fa-stop' : 'fa-play'}`}></i>
                            <span>{isPlayingDialogue ? "Dừng nghe" : "Phát toàn bài"}</span>
                        </button>
                    </div>

                    <div className="space-y-4 pt-2">
                        {currentLesson.dialogue.map((line, idx) => (
                            <div key={idx} className={`flex gap-3 items-start ${line.role === 'A' ? 'justify-start' : 'justify-start flex-row-reverse'}`}>
                                <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${line.role === 'A' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-400' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-400'}`}>
                                    {line.role}
                                </div>
                                <div 
                                    onClick={() => playAudio(line.zh, 'zh-CN')}
                                    className={`group relative max-w-[85%] px-4 py-3 rounded-2xl cursor-pointer border shadow-sm hover:scale-[1.01] transition-all ${line.role === 'A' ? 'bg-slate-50 dark:bg-slate-950/60 border-slate-100 dark:border-slate-800/80' : 'bg-indigo-50/20 dark:bg-indigo-950/10 border-indigo-100/30'}`}
                                    title="Click để nghe phát âm"
                                >
                                    <p className="text-base font-extrabold text-slate-800 dark:text-white mb-0.5 tracking-wide">{line.zh}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 italic mb-1.5 font-semibold">{line.pinyin}</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{line.vi}</p>
                                    <i className="fas fa-volume-up absolute right-3 top-3 text-[10px] text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TỪ VỰNG TRỌNG TÂM TRONG BÀI */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <i className="fas fa-book-open text-indigo-600"></i> Từ vựng trọng tâm bài học
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentLesson.vocab.map(v => {
                            const status = progress[v.id] || 'unlearned';
                            const isBookmarked = bookmarks.some(b => b.id === v.id);
                            
                            const wordObj = {
                                id: v.id,
                                word: v.word,
                                pinyin: v.pinyin,
                                meaning: v.meaning,
                                pos: v.pos,
                                example: "",
                                tip: v.tip
                            };

                            return (
                                <div key={v.id} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex justify-between gap-3 items-start hover:shadow-sm transition-all group animate-fade-in">
                                    <div className="flex gap-2.5">
                                        <button
                                            onClick={() => playAudio(v.word, 'zh-CN')}
                                            className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-extrabold text-lg flex items-center justify-center border dark:border-teal-900/30 cursor-pointer shadow-inner shrink-0 hover:bg-teal-100"
                                        >
                                            {v.word}
                                        </button>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h5 className="font-bold text-xs text-slate-800 dark:text-white">{v.pinyin}</h5>
                                                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200 dark:bg-slate-800 text-slate-500">
                                                    {v.pos}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5 leading-tight">{v.meaning}</p>
                                            {v.tip && <p className="text-[10px] text-amber-600 dark:text-amber-500 italic mt-1 leading-normal">Mẹo: {v.tip}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 items-end shrink-0">
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => onShowStroke(v.word)}
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                title="Luyện viết"
                                            >
                                                <i className="fas fa-pen-fancy"></i>
                                            </button>
                                            <button
                                                onClick={() => onToggleBookmark(wordObj)}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${isBookmarked ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'}`}
                                            >
                                                <i className="fas fa-star"></i>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onChangeStatus(v.id, status === 'mastered' ? 'learning' : 'mastered')}
                                            className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all ${status === 'mastered' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'}`}
                                        >
                                            {status === 'mastered' ? 'Đã thuộc' : 'Chưa thuộc'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* GIẢI THÍCH NGỮ PHÁP */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <i className="fas fa-glasses text-amber-600"></i> Trọng tâm ngữ pháp bài học
                    </h4>
                    <div className="bg-amber-50/40 dark:bg-amber-950/15 p-4 rounded-2xl border border-amber-100/50 dark:border-amber-900/20">
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                            {currentLesson.grammar}
                        </p>
                    </div>
                </div>

                {/* TRẮC NGHIỆM ĐÁNH GIÁ NHANH */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="fas fa-check-double text-emerald-600"></i> Bài tập trắc nghiệm nhanh cuối bài
                        </h4>
                        {quizChecked && (
                            <button 
                                onClick={() => { setQuizAnswers({}); setQuizChecked(false); setQuizScore(null); }}
                                className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                            >
                                Làm lại
                            </button>
                        )}
                    </div>

                    <div className="space-y-6 pt-2">
                        {currentLesson.quiz.map((item, qIdx) => (
                            <div key={qIdx} className="space-y-2.5">
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                    Câu {qIdx + 1}: {item.q}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {item.options.map((opt, oIdx) => {
                                        let btnStyles = "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300";
                                        
                                        if (quizAnswers[qIdx] === opt) {
                                            btnStyles = "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-700 dark:text-teal-400 font-bold";
                                        }

                                        if (quizChecked) {
                                            if (opt === item.ans) {
                                                btnStyles = "bg-emerald-100 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold";
                                            } else if (quizAnswers[qIdx] === opt) {
                                                btnStyles = "bg-rose-100 dark:bg-rose-950/30 border-rose-500 text-rose-700 dark:text-rose-400 font-bold";
                                            } else {
                                                btnStyles = "bg-slate-50 dark:bg-slate-950 border-slate-100 text-slate-400 opacity-60";
                                            }
                                        }

                                        return (
                                            <button
                                                key={oIdx}
                                                onClick={() => selectOption(qIdx, opt)}
                                                disabled={quizChecked}
                                                className={`p-3 rounded-2xl border text-left text-xs transition-all flex justify-between items-center ${btnStyles}`}
                                            >
                                                <span>{opt}</span>
                                                {quizChecked && opt === item.ans && <i className="fas fa-check-circle text-emerald-600"></i>}
                                                {quizChecked && quizAnswers[qIdx] === opt && opt !== item.ans && <i className="fas fa-times-circle text-rose-600"></i>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {!quizChecked ? (
                        <button
                            onClick={checkAnswers}
                            disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                            className="mt-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-2xl shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-paper-plane"></i> Gửi bài nộp chấm điểm
                        </button>
                    ) : (
                        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20 text-center animate-fade-in space-y-3">
                            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                                Đã hoàn thành! Kết quả của bạn: <span className="text-base font-extrabold">{quizScore} / {currentLesson.quiz.length}</span> câu trả lời đúng.
                            </p>
                            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/70">
                                <i className="fas fa-circle-check mr-1"></i> Tiến độ bài học đã được ghi nhận.
                            </p>
                            <button
                                onClick={() => onSwitchTab && onSwitchTab('home')}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-house"></i> Xong! Về Trang chủ
                            </button>
                            {hasNextLesson && (
                                <button
                                    onClick={goToNextLesson}
                                    className="w-full py-2.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    Học thêm bài tiếp theo <i className="fas fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};