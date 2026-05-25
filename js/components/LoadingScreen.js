// =========================================================================
// MÀN HÌNH CHỜ LOADING CHUNG
// =========================================================================
const LoadingScreen = ({ message }) => (
    <div className="text-center py-20 text-slate-500 dark:text-slate-400 animate-fade-in">
        <i className="fas fa-circle-notch fa-spin text-4xl mb-4 text-teal-600 dark:text-teal-400"></i>
        <p className="font-semibold text-sm">{message}</p>
    </div>
);