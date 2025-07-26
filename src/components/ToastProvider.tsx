import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number; // ms
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

let toastCounter = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, ...toast }]);
    const duration = toast.duration ?? 4000;
    // auto-remove
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(({ id, message, actionLabel, onAction }) => (
          <div
            key={id}
            className="flex items-center bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in"
          >
            <span className="flex-1 pr-2 text-sm">{message}</span>
            {actionLabel && onAction && (
              <button
                onClick={() => {
                  onAction();
                  removeToast(id);
                }}
                className="text-orange-400 text-xs font-semibold mr-2 hover:underline"
              >
                {actionLabel}
              </button>
            )}
            <button onClick={() => removeToast(id)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// tailwind animation (optional): add this to global styles if not present
// .animate-slide-in { @apply transform transition ease-out duration-300 translate-y-4 opacity-0; }
// .animate-slide-in { to { @apply translate-y-0 opacity-100; } }
