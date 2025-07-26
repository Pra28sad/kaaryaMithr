import React from 'react';
import { ArrowLeft, Check, Globe } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';

interface LanguageSettingsProps {
  currentLanguage: Language;
  onBack: () => void;
  onLanguageChange: (language: Language) => void;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ 
  currentLanguage, 
  onBack, 
  onLanguageChange 
}) => {
  const content = {
    en: {
      title: "Language Settings",
      subtitle: "Choose your preferred language",
      languages: {
        en: "English",
        hi: "हिंदी (Hindi)",
        te: "తెలుగు (Telugu)"
      },
      restart: "App will restart to apply language changes"
    },
    hi: {
      title: "भाषा सेटिंग्स",
      subtitle: "अपनी पसंदीदा भाषा चुनें",
      languages: {
        en: "English",
        hi: "हिंदी (Hindi)",
        te: "తెలుగు (Telugu)"
      },
      restart: "भाषा परिवर्तन लागू करने के लिए ऐप पुनः आरंभ होगा"
    },
    te: {
      title: "భాష సెట్టింగ్స్",
      subtitle: "మీ ఇష్టమైన భాషను ఎంచుకోండి",
      languages: {
        en: "English",
        hi: "हिंदी (Hindi)",
        te: "తెలుగు (Telugu)"
      },
      restart: "భాష మార్పులను వర్తింపజేయడానికి యాప్ పునఃప్రారంభమవుతుంది"
    }
  };

  const currentContent = content[currentLanguage];
  const languages: Language[] = ['en', 'hi', 'te'];

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    // Simulate app restart notification
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            {currentContent.title}
          </h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Header Info */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {currentContent.title}
          </h2>
          <p className="text-gray-600">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Language Options */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {languages.map((language, index) => (
            <button
              key={language}
              onClick={() => handleLanguageSelect(language)}
              className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${
                index !== languages.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  currentLanguage === language 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300'
                }`}>
                  {currentLanguage === language && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 text-lg">
                    {currentContent.languages[language]}
                  </div>
                  {currentLanguage === language && (
                    <div className="text-sm text-green-600 font-medium">
                      Current Language
                    </div>
                  )}
                </div>
              </div>
              
              {/* Language Flag/Icon */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {language.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <p className="text-blue-800 text-sm">
              {currentContent.restart}
            </p>
          </div>
        </div>

        {/* Language Preview */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Preview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Welcome Message:</span>
              <span className="font-medium">
                {currentLanguage === 'en' && 'Welcome to Kaarya Mithr'}
                {currentLanguage === 'hi' && 'कार्य मित्र में आपका स्वागत है'}
                {currentLanguage === 'te' && 'కార్య మిత్రకు స్వాగతం'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Dashboard:</span>
              <span className="font-medium">
                {currentLanguage === 'en' && 'Dashboard'}
                {currentLanguage === 'hi' && 'डैशबोर्ड'}
                {currentLanguage === 'te' && 'డాష్‌బోర్డ్'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Profile:</span>
              <span className="font-medium">
                {currentLanguage === 'en' && 'Profile'}
                {currentLanguage === 'hi' && 'प्रोफाइल'}
                {currentLanguage === 'te' && 'ప్రొఫైల్'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
