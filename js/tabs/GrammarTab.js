// File: js/tabs/GrammarTab.js

const GrammarTab = ({ activeLevel }) => {
    // Gọi trực tiếp biến từ file hsk_grammar.js bên ngoài
    const activeGrammar = hskGrammarDatabase[activeLevel] || hskGrammarDatabase[1];

    return (
        <div className="animate-fade-in space-y-4">
            {/* ... Phần header giữ nguyên ... */}

            <div className="grid grid-cols-1 gap-4">
                {activeGrammar.map((g, idx) => (
                    <div key={g.id || idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border dark:border-slate-800/85 shadow-sm space-y-4">
                        
                        {/* Tiêu đề & Bảng thẻ phân loại (Tags) */}
                        <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                                <span className="w-5 h-5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {idx + 1}
                                </span>
                                {g.title}
                            </h4>
                            {g.tags && (
                                <div className="flex gap-1">
                                    {g.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cấu trúc mẫu */}
                        <div className="p-3 bg-teal-50/50 dark:bg-teal-950/10 border border-dashed border-teal-100 dark:border-teal-900/40 rounded-2xl">
                            <span className="text-[10px] uppercase font-extrabold text-teal-600 dark:text-teal-400 block mb-1 tracking-wider">Cấu trúc mẫu</span>
                            <p className="font-bold text-sm text-teal-700 dark:text-teal-400">{g.structure}</p>
                            {g.pinyinStructure && <p className="text-xs text-teal-600/70 dark:text-teal-400/60 italic">{g.pinyinStructure}</p>}
                        </div>

                        {/* Giải thích */}
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Cách dùng & Chú giải:</span>
                            {g.desc}
                        </div>

                        {/* Mảng ví dụ minh họa (Đã tối ưu tùy biến) */}
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Ví dụ minh họa</span>
                            {g.examples.map((ex, exIdx) => (
                                <div key={exIdx} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs space-y-1 relative group">
                                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{ex.zh}</p>
                                    <p className="text-slate-500 dark:text-slate-400 font-semibold">{ex.py}</p>
                                    <p className="text-slate-600 dark:text-slate-300 italic">{ex.vi}</p>
                                    {ex.note && <p className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md inline-block mt-1">Lưu ý: {ex.note}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Lỗi thường gặp (Nếu có sẽ hiển thị) */}
                        {g.commonMistakes && (
                            <div className="p-3 bg-rose-50/60 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/30 rounded-2xl text-xs">
                                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">⚠️ Lỗi thường gặp:</span>
                                <p className="text-rose-600 dark:text-rose-400/90 font-medium">{g.commonMistakes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};