import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Moon, Sun, Volume2, VolumeX, Smartphone, Globe, Database, Trash2 } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';

interface SettingsProps {
  language: Language;
  onBack: () => void;
  onLanguageChange: (language: Language) => void;
}

const Settings: React.FC<SettingsProps> = ({ language, onBack, onLanguageChange }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const content = {
    en: {
      title: "Settings",
      preferences: "Preferences",
      notifications: "Notifications",
      notificationsDesc: "Receive job alerts and messages",
      darkMode: "Dark Mode",
      darkModeDesc: "Switch to dark theme",
      sound: "Sound Effects",
      soundDesc: "Play sounds for notifications",
      language: "Language",
      languageDesc: "Choose your preferred language",
      privacy: "Privacy & Security",
      locationSharing: "Location Sharing",
      locationDesc: "Share location for better job matches",
      dataPrivacy: "Data Privacy",
      dataPrivacyDesc: "Manage your data and privacy settings",
      storage: "Storage",
      clearCache: "Clear Cache",
      clearCacheDesc: "Free up storage space",
      deleteAccount: "Delete Account",
      deleteAccountDesc: "Permanently delete your account",
      about: "About",
      version: "App Version",
      terms: "Terms of Service",
      privacy_policy: "Privacy Policy"
    },
    hi: {
      title: "सेटिंग्स",
      preferences: "प्राथमिकताएं",
      notifications: "सूचनाएं",
      notificationsDesc: "नौकरी अलर्ट और संदेश प्राप्त करें",
      darkMode: "डार्क मोड",
      darkModeDesc: "डार्क थीम पर स्विच करें",
      sound: "ध्वनि प्रभाव",
      soundDesc: "सूचनाओं के लिए ध्वनि बजाएं",
      language: "भाषा",
      languageDesc: "अपनी पसंदीदा भाषा चुनें",
      privacy: "गोपनीयता और सुरक्षा",
      locationSharing: "स्थान साझाकरण",
      locationDesc: "बेहतर नौकरी मैच के लिए स्थान साझा करें",
      dataPrivacy: "डेटा गोपनीयता",
      dataPrivacyDesc: "अपने डेटा और गोपनीयता सेटिंग्स प्रबंधित करें",
      storage: "भंडारण",
      clearCache: "कैश साफ़ करें",
      clearCacheDesc: "भंडारण स्थान खाली करें",
      deleteAccount: "खाता हटाएं",
      deleteAccountDesc: "अपना खाता स्थायी रूप से हटाएं",
      about: "के बारे में",
      version: "ऐप संस्करण",
      terms: "सेवा की शर्तें",
      privacy_policy: "गोपनीयता नीति"
    },
    te: {
      title: "సెట్టింగ్స్",
      preferences: "ప్రాధాన్యతలు",
      notifications: "నోటిఫికేషన్లు",
      notificationsDesc: "ఉద్యోగ హెచ్చరికలు మరియు సందేశాలను స్వీకరించండి",
      darkMode: "డార్క్ మోడ్",
      darkModeDesc: "డార్క్ థీమ్‌కు మారండి",
      sound: "సౌండ్ ఎఫెక్ట్స్",
      soundDesc: "నోటిఫికేషన్ల కోసం సౌండ్లు ప్లే చేయండి",
      language: "భాష",
      languageDesc: "మీ ఇష్టమైన భాషను ఎంచుకోండి",
      privacy: "గోప్యత & భద్రత",
      locationSharing: "లొకేషన్ షేరింగ్",
      locationDesc: "మెరుగైన ఉద్యోగ మ్యాచ్‌ల కోసం లొకేషన్ షేర్ చేయండి",
      dataPrivacy: "డేటా గోప్యత",
      dataPrivacyDesc: "మీ డేటా మరియు గోప్యత సెట్టింగ్లను నిర్వహించండి",
      storage: "నిల్వ",
      clearCache: "కాష్ క్లియర్ చేయండి",
      clearCacheDesc: "నిల్వ స్థలాన్ని ఖాళీ చేయండి",
      deleteAccount: "ఖాతాను తొలగించండి",
      deleteAccountDesc: "మీ ఖాతాను శాశ్వతంగా తొలగించండి",
      about: "గురించి",
      version: "యాప్ వెర్షన్",
      terms: "సేవా నిబంధనలు",
      privacy_policy: "గోప్యతా విధానం"
    }
  };

  const currentContent = content[language];

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-green-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    action, 
    danger = false 
  }: { 
    icon: any; 
    title: string; 
    description: string; 
    action: React.ReactNode; 
    danger?: boolean;
  }) => (
    <div className={`flex items-center justify-between p-4 ${danger ? 'text-red-600' : 'text-gray-800'}`}>
      <div className="flex items-center space-x-4">
        <Icon className="w-6 h-6" />
        <div>
          <div className="font-medium">{title}</div>
          <div className={`text-sm ${danger ? 'text-red-500' : 'text-gray-500'}`}>{description}</div>
        </div>
      </div>
      {action}
    </div>
  );

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

      <div className="px-6 py-6 space-y-6">
        {/* Preferences Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.preferences}</h2>
          </div>
          
          <SettingItem
            icon={Bell}
            title={currentContent.notifications}
            description={currentContent.notificationsDesc}
            action={
              <ToggleSwitch
                enabled={notifications}
                onToggle={() => setNotifications(!notifications)}
              />
            }
          />
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={darkMode ? Moon : Sun}
              title={currentContent.darkMode}
              description={currentContent.darkModeDesc}
              action={
                <ToggleSwitch
                  enabled={darkMode}
                  onToggle={() => setDarkMode(!darkMode)}
                />
              }
            />
          </div>
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={soundEnabled ? Volume2 : VolumeX}
              title={currentContent.sound}
              description={currentContent.soundDesc}
              action={
                <ToggleSwitch
                  enabled={soundEnabled}
                  onToggle={() => setSoundEnabled(!soundEnabled)}
                />
              }
            />
          </div>
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={Globe}
              title={currentContent.language}
              description={currentContent.languageDesc}
              action={
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="te">తెలుగు</option>
                </select>
              }
            />
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.privacy}</h2>
          </div>
          
          <SettingItem
            icon={Smartphone}
            title={currentContent.locationSharing}
            description={currentContent.locationDesc}
            action={
              <ToggleSwitch
                enabled={locationSharing}
                onToggle={() => setLocationSharing(!locationSharing)}
              />
            }
          />
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={Shield}
              title={currentContent.dataPrivacy}
              description={currentContent.dataPrivacyDesc}
              action={
                <button className="text-green-600 font-medium">View</button>
              }
            />
          </div>
        </div>

        {/* Storage Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.storage}</h2>
          </div>
          
          <SettingItem
            icon={Database}
            title={currentContent.clearCache}
            description={currentContent.clearCacheDesc}
            action={
              <button className="text-blue-600 font-medium">Clear</button>
            }
          />
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={Trash2}
              title={currentContent.deleteAccount}
              description={currentContent.deleteAccountDesc}
              action={
                <button className="text-red-600 font-medium">Delete</button>
              }
              danger={true}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.about}</h2>
          </div>
          
          <SettingItem
            icon={Smartphone}
            title={currentContent.version}
            description="1.0.0"
            action={<span className="text-gray-400">Latest</span>}
          />
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={Shield}
              title={currentContent.terms}
              description=""
              action={
                <button className="text-green-600 font-medium">View</button>
              }
            />
          </div>
          
          <div className="border-t border-gray-100">
            <SettingItem
              icon={Shield}
              title={currentContent.privacy_policy}
              description=""
              action={
                <button className="text-green-600 font-medium">View</button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
