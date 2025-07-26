import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './components/ToastProvider';
import { LanguageProvider } from './components/LanguageContext';
import './index.css';

const initialLang = (localStorage.getItem('km-lang') as 'en'|'hi'|'te') || 'en';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider initial={initialLang}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LanguageProvider>
  </StrictMode>
);
