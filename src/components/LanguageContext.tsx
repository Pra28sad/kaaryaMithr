import React, {createContext, useContext, useState, ReactNode} from 'react';
type Language = 'en' | 'hi' | 'te';
const LangCtx = createContext<{lang: Language; setLang: (l: Language)=>void}>(
  {lang:'en', setLang:()=>{}}
);
export const useLang = () => useContext(LangCtx);
export const LanguageProvider: React.FC<{initial: Language; children:ReactNode}> =
  ({initial, children}) => {
    // Try to load language from localStorage, fallback to initial
    const getInitialLang = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('km-lang');
        if (stored === 'en' || stored === 'hi' || stored === 'te') return stored as Language;
      }
      return initial;
    };
    const [lang, setLangState] = useState<Language>(getInitialLang());
    // When setLang is called, update both state and localStorage
    const setLang = (l: Language) => {
      setLangState(l);
      if (typeof window !== 'undefined') {
        localStorage.setItem('km-lang', l);
      }
    };
    return <LangCtx.Provider value={{lang, setLang}}>{children}</LangCtx.Provider>;
  };