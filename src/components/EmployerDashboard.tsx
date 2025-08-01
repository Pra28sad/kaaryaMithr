import React, { useState } from 'react';
import { useLang } from './LanguageContext';
import RoleSwitchConfirmation from './RoleSwitchConfirmation';
import { Plus, Search, MapPin, Users, Briefcase, MessageCircle, User, Volume2 } from 'lucide-react';
import Profile from './Profile';
import EarningsScreen from './EarningsScreen';



interface EmployerDashboardProps {
  user: any;
  onNavigateToProfile: () => void;
  onNavigateToJobPost: () => void;
  onNavigateToWorkersList: () => void;
  onNavigateToChat: (contactName: string, contactType: 'worker' | 'employer') => void;
  onSwitchRole: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ 
  user, 
  onNavigateToProfile, 
  onNavigateToJobPost, 
  onNavigateToWorkersList, 
  onNavigateToChat, 
  onSwitchRole
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const { lang: language } = useLang();
  const [showRoleSwitchConfirmation, setShowRoleSwitchConfirmation] = useState(false);
  const userRole = 'employer';

  const content = {
    en: {
      greeting: "Good morning",
      postJob: "Post New Job",
      findWorkers: "Find Workers",
      myJobs: "My Posted Jobs",
      noJobs: "You haven't posted any jobs yet",
      tabs: {
        home: "Home",
        workers: "Workers",
        chat: "Chat",
        jobs: "My Jobs",
        profile: "Profile"
      }
    },
    hi: {
      greeting: "सुप्रभात",
      postJob: "नया काम पोस्ट करें",
      findWorkers: "कामगार खोजें",
      myJobs: "मेरे पोस्ट किए गए काम",
      noJobs: "आपने अभी तक कोई काम पोस्ट नहीं किया है",
      tabs: {
        home: "घर",
        workers: "कामगार",
        chat: "चैट",
        jobs: "मेरे काम",
        profile: "प्रोफाइल"
      }
    },
    te: {
      greeting: "శుభోదయం",
      postJob: "కొత్త పని పోస్ట్ చేయండి",
      findWorkers: "కార్మికులను కనుగొనండి",
      myJobs: "నా పోస్ట్ చేసిన పనులు",
      noJobs: "మీరు ఇంకా ఎటువంటి పనులు పోస్ట్ చేయలేదు",
      tabs: {
        home: "హోమ్",
        workers: "కార్మికులు",
        chat: "చాట్",
        jobs: "నా పనులు",
        profile: "ప్రొఫైల్"
      }
    }
  };

  const currentContent = content[language];

  const sampleChats = [
    { id: 1, name: 'Ravi Kumar', lastMessage: 'Need 2 workers tomorrow', unread: 1 },
    { id: 2, name: 'Seema Patel', lastMessage: 'Can you send quote?', unread: 0 },
    { id: 3, name: 'Anil Singh', lastMessage: 'Job completed, thanks!', unread: 0 },
  ];

  const postedJobs = [
    { id: 1, title: 'Harvest Help', applicants: 3, status: 'Open' },
    { id: 2, title: 'Field Cleaning', applicants: 5, status: 'In Progress' },
    { id: 3, title: 'Loading Truck', applicants: 2, status: 'Closed' },
  ];

  const renderChatTab = () => (
    <div className="space-y-3">
      {sampleChats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onNavigateToChat(chat.name, 'worker')}
          className="w-full bg-white rounded-xl shadow flex items-center justify-between p-4 hover:shadow-md transition"
        >
          <div className="text-left">
            <p className="font-semibold text-gray-800">{chat.name}</p>
            <p className="text-sm text-gray-600 truncate max-w-xs">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
              {chat.unread}
            </span>
          )}
        </button>
      ))}
      {sampleChats.length === 0 && (
        <p className="text-center text-gray-600 py-12">No chats yet</p>
      )}
    </div>
  );

  const renderJobsTab = () => (
    <div className="space-y-3">
      {postedJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="font-semibold text-gray-800">{job.title}</p>
            <p className="text-sm text-gray-600">Applicants: {job.applicants}</p>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
            job.status === 'Open'
              ? 'bg-green-100 text-green-700'
              : job.status === 'In Progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {job.status}
          </span>
        </div>
      ))}
      {postedJobs.length === 0 && (
        <p className="text-center text-gray-600 py-12">You haven't posted any jobs yet</p>
      )}
    </div>
  );

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{currentContent.greeting}, {user.name}</h2>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => setShowRoleSwitchConfirmation(true)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 transition"
            >
              Switch to Worker
            </button>
            <Volume2 className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={onNavigateToJobPost}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">{currentContent.postJob}</h3>
              <p className="text-orange-100">Find workers for your tasks</p>
            </div>
          </div>
        </button>

        <button 
          onClick={onNavigateToWorkersList}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">{currentContent.findWorkers}</h3>
              <p className="text-blue-100">Browse available workers</p>
            </div>
          </div>
        </button>
      </div>

      {/* My Jobs */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {currentContent.myJobs}
        </h3>
        {postedJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">{currentContent.noJobs}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {postedJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-md transition">
                <div>
                  <p className="font-medium text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-600">Applicants: {job.applicants}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  job.status === 'Open'
                    ? 'bg-green-100 text-green-700'
                    : job.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'workers':
        // Workers list is handled in higher-level component; nothing to render here.
        return null;
      case 'chat':
        return renderChatTab();
      case 'jobs':
        return renderJobsTab();
      case 'profile':
        return <Profile user={user} userRole={userRole} onBack={() => setActiveTab('home')} onSwitchRole={onSwitchRole} />;
      case 'earnings':
        return <EarningsScreen language={language} onBack={() => setActiveTab('home')} />;
      default:
        return renderHomeTab();
    }
  };

  const handleConfirmSwitch = () => {
    setShowRoleSwitchConfirmation(false);
    onSwitchRole();
  };

  const handleCancelSwitch = () => setShowRoleSwitchConfirmation(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header - Empty for now */}
        <div className="h-2 bg-white shadow-sm"></div>

        {/* Main Content */}
        <div className="px-6 py-4 pb-24">
          {renderTabContent()}
        </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around">
          {[
            { id: 'home', icon: Briefcase, label: currentContent.tabs.home },
            { id: 'workers', icon: Users, label: currentContent.tabs.workers },
            { id: 'chat', icon: MessageCircle, label: currentContent.tabs.chat },
            { id: 'jobs', icon: Briefcase, label: currentContent.tabs.jobs },
            { id: 'profile', icon: User, label: currentContent.tabs.profile }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'workers') {
                  onNavigateToWorkersList();
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Role Switch Confirmation from Home */}
    <RoleSwitchConfirmation
      currentRole={userRole}
      targetRole="worker"
      language={language}
      onConfirm={handleConfirmSwitch}
      onCancel={handleCancelSwitch}
      isVisible={showRoleSwitchConfirmation}
    />
    </>
  );
};

export default EmployerDashboard;