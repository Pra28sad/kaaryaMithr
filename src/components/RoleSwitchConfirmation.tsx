import React from 'react';
import { User, Briefcase, ArrowRight, X } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';
type UserRole = 'worker' | 'employer';

interface RoleSwitchConfirmationProps {
  currentRole: UserRole;
  targetRole: UserRole;
  language: Language;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const RoleSwitchConfirmation: React.FC<RoleSwitchConfirmationProps> = ({
  currentRole,
  targetRole,
  language,
  onConfirm,
  onCancel,
  isVisible
}) => {
  const content = {
    en: {
      title: "Switch Role",
      subtitle: "Are you sure you want to switch your role?",
      currentRole: "Current Role",
      newRole: "New Role",
      worker: "Worker",
      employer: "Employer",
      workerDesc: "Find and apply for jobs",
      employerDesc: "Post jobs and hire workers",
      confirm: "Switch Role",
      cancel: "Cancel",
      note: "You can switch back anytime from your profile"
    },
    hi: {
      title: "भूमिका बदलें",
      subtitle: "क्या आप वाकई अपनी भूमिका बदलना चाहते हैं?",
      currentRole: "वर्तमान भूमिका",
      newRole: "नई भूमिका",
      worker: "कामगार",
      employer: "नियोक्ता",
      workerDesc: "नौकरियां खोजें और आवेदन करें",
      employerDesc: "नौकरियां पोस्ट करें और कामगारों को काम पर रखें",
      confirm: "भूमिका बदलें",
      cancel: "रद्द करें",
      note: "आप अपनी प्रोफ़ाइल से कभी भी वापस स्विच कर सकते हैं"
    },
    te: {
      title: "పాత్రను మార్చండి",
      subtitle: "మీరు నిజంగా మీ పాత్రను మార్చాలనుకుంటున్నారా?",
      currentRole: "ప్రస్తుత పాత్र",
      newRole: "కొత్త పాత్র",
      worker: "కార్మికుడు",
      employer: "యజమాని",
      workerDesc: "ఉద్యోగాలను కనుగొనండి మరియు దరఖాస్తు చేయండి",
      employerDesc: "ఉద్యోగాలను పోస్ట్ చేయండి మరియు కార్మికులను నియమించండి",
      confirm: "పాత్రను మార్చండి",
      cancel: "రద్దు చేయండి",
      note: "మీరు మీ ప్రొఫైల్ నుండి ఎప్పుడైనా తిరిగి మార్చవచ్చు"
    }
  };

  const currentContent = content[language];

  const getRoleInfo = (role: UserRole) => ({
    name: role === 'worker' ? currentContent.worker : currentContent.employer,
    desc: role === 'worker' ? currentContent.workerDesc : currentContent.employerDesc,
    icon: role === 'worker' ? User : Briefcase,
    color: role === 'worker' ? 'from-blue-400 to-blue-600' : 'from-green-400 to-green-600'
  });

  const currentRoleInfo = getRoleInfo(currentRole);
  const targetRoleInfo = getRoleInfo(targetRole);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{currentContent.title}</h2>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-green-100 text-sm mt-1">{currentContent.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Role Transition Visual */}
          <div className="flex items-center justify-between mb-6">
            {/* Current Role */}
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentRoleInfo.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <currentRoleInfo.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs text-gray-500 mb-1">{currentContent.currentRole}</div>
              <div className="font-semibold text-gray-800">{currentRoleInfo.name}</div>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {/* Target Role */}
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${targetRoleInfo.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <targetRoleInfo.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs text-gray-500 mb-1">{currentContent.newRole}</div>
              <div className="font-semibold text-gray-800">{targetRoleInfo.name}</div>
            </div>
          </div>

          {/* Role Description */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              {targetRoleInfo.name} {currentContent.newRole}
            </h3>
            <p className="text-gray-600 text-sm">{targetRoleInfo.desc}</p>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-blue-800 text-sm text-center">{currentContent.note}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {currentContent.cancel}
            </button>
            <button
              onClick={() => {
                console.log('Role switch confirm button clicked in dialog'); // Debug log
                onConfirm();
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors font-medium"
            >
              {currentContent.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitchConfirmation;
