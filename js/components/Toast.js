// =========================================================================
// TOAST NOTIFICATIONS (Hệ thống thông báo góc màn hình)
// =========================================================================
const Toast = ({ message, type = 'info', onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: 'bg-emerald-600 border-emerald-500 text-white',
        error: 'bg-rose-600 border-rose-500 text-white',
        info: 'bg-teal-600 border-teal-500 text-white',
        warning: 'bg-amber-500 border-amber-400 text-slate-950'
    };

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    return (
        <div className={`fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border animate-fade-in ${styles[type]}`}>
            <i className={`fas ${icons[type]} text-lg`}></i>
            <p className="text-xs font-bold leading-tight flex-1">{message}</p>
            <button onClick={onClose} className="opacity-75 hover:opacity-100 transition-opacity ml-2">
                <i className="fas fa-times text-xs"></i>
            </button>
        </div>
    );
};