// =========================================================================
// HANZI CHARACTER ANIMATOR (Nét chữ Hán & Modal)
// =========================================================================
const HanziCharacter = ({ char }) => {
    const ref = React.useRef(null);
    const writerRef = React.useRef(null);

    React.useEffect(() => {
        if (ref.current && /[\u4e00-\u9fa5]/.test(char)) {
            ref.current.innerHTML = '';
            writerRef.current = HanziWriter.create(ref.current, char, {
                width: 130,
                height: 130,
                padding: 8,
                showOutline: true,
                strokeAnimationSpeed: 1.2,
                delayBetweenStrokes: 150,
                strokeColor: '#0f766e', 
                radicalColor: '#d97706', 
                outlineColor: '#cbd5e1', 
                highlightOnComplete: true
            });
            setTimeout(() => writerRef.current.animateCharacter(), 400);
        }
    }, [char]);

    const playAnimation = () => {
        if (writerRef.current) writerRef.current.animateCharacter();
    };

    const startQuiz = () => {
        if (writerRef.current) writerRef.current.quiz();
    };

    if (!/[\u4e00-\u9fa5]/.test(char)) return null;

    return (
        <div className="flex flex-col items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 w-36">
            <div 
                ref={ref} 
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 relative" 
            ></div>
            <div className="flex gap-1.5 w-full">
                <button onClick={playAnimation} className="flex-1 py-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 rounded-lg text-xs font-semibold hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors">
                    <i className="fas fa-play mr-1"></i> Xem
                </button>
                <button onClick={startQuiz} className="flex-1 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors">
                    <i className="fas fa-edit mr-1"></i> Viết
                </button>
            </div>
        </div>
    );
};

const StrokeModal = ({ word, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-2xl w-full text-center relative shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <i className="fas fa-times"></i>
                </button>
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-slate-800 dark:text-white">Hướng dẫn viết: <span className="text-teal-600 dark:text-teal-400">{word}</span></h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-xs md:text-sm">
                    Bấm <span className="font-semibold text-teal-600 dark:text-teal-400">Xem</span> để theo dõi thứ tự nét vẽ. 
                    Bấm <span className="font-semibold text-amber-600 dark:text-amber-400">Viết</span> để tự tập viết ngay trên ô lưới nét vẽ.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 max-h-[350px] overflow-y-auto p-2">
                    {word.split('').map((char, index) => (
                        <HanziCharacter key={`${char}-${index}`} char={char} />
                    ))}
                </div>
            </div>
        </div>
    );
};