// =========================================================================
// TAB: TỪ VỰNG ĐÃ LƯU (Bookmarks)
// =========================================================================
const BookmarksTab = ({ bookmarks, onToggleBookmark, onShowStroke, progress, onChangeStatus }) => {
    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center animate-fade-in max-w-md mx-auto">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-2xl flex items-center justify-center text-3xl mb-4">
                    <i className="far fa-star"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Không tìm thấy từ vựng nào</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">Nhấp chọn dấu ngôi sao trên góc mỗi từ vựng quan trọng ở Tab Từ Vựng để xem nhanh danh sách ưu tiên tại đây.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 p-4 rounded-2xl text-amber-900 dark:text-amber-400 flex items-center justify-between shadow-sm mb-6">
                <div className="flex items-center gap-2.5 text-xs font-bold">
                    <i className="fas fa-star text-amber-500"></i>
                    <p>Đang lưu giữ <strong>{bookmarks.length}</strong> từ vựng quan trọng cần rà soát lại.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.map((word) => (
                    <WordCard 
                        key={`bookmark-${word.id}`} 
                        word={word} 
                        isBookmarked={true}
                        onToggleBookmark={onToggleBookmark}
                        onShowStroke={onShowStroke}
                        learningStatus={progress[word.id] || 'unlearned'}
                        onChangeStatus={onChangeStatus}
                    />
                ))}
            </div>
        </div>
    );
};