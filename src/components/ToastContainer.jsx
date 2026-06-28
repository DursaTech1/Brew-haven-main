import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContainer = () => {
    const { toasts, removeToast } = useApp();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-amber-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-400" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            default:
                return <Info className="w-5 h-5 text-amber-500" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'success':
                return 'bg-stone-900 border border-amber-900/30 text-white';
            case 'info':
                return 'bg-stone-900 border border-blue-900/30 text-white';
            case 'warning':
                return 'bg-stone-900 border border-yellow-900/30 text-white';
            default:
                return 'bg-stone-900 border border-amber-900/30 text-white';
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 md:px-0">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className={`${getBgColor(toast.type)} shadow-2xl rounded-xl p-4 flex items-center justify-between gap-3 pointer-events-auto backdrop-blur-md bg-stone-950/90`}
                    >
                        <div className="flex items-center gap-3">
                            {getIcon(toast.type)}
                            <p className="text-sm font-semibold font-sans">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-stone-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
