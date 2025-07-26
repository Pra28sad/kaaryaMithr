import React, { useState } from 'react';
import { useLang } from './components/LanguageContext';
import SplashScreen from './components/SplashScreen';
import LanguageSelection from './components/LanguageSelection';
// Removed import of PermissionsScreen
import RoleSelection from './components/RoleSelection';
import PhoneLogin from './components/PhoneLogin';
import WorkerDashboard from './components/WorkerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import WorkerRegistration from './components/WorkerRegistration';
import Profile from './components/Profile';
import JobPostForm from './components/JobPostForm';
import WorkersList from './components/WorkersList';
import EnhancedChatScreen from './components/EnhancedChatScreen';
import EarningsScreen from './components/EarningsScreen';

type Screen = 'splash' | 'language' | 'role' | 'login' | 'worker-registration' | 'worker-dashboard' | 'employer-dashboard' | 'profile' | 'job-post' | 'workers-list' | 'chat' | 'earnings';
type Language = 'te' | 'hi' | 'en';
type UserRole = 'worker' | 'employer';

function App() {

  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const { lang: selectedLanguage, setLang } = useLang();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleLanguageSelect = (language: Language) => {
    setLang(language);
    localStorage.setItem('km-lang', language);
    setCurrentScreen('role'); // Directly go to role selection, skipping permissions
  };

  // Removed handlePermissionsComplete function

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    if (userRole === 'worker' && !userData.isRegistered) {
      setCurrentScreen('worker-registration');
    } else if (userRole === 'worker') {
      setCurrentScreen('worker-dashboard');
    } else {
      setCurrentScreen('employer-dashboard');
    }
  };

  const handleRegistrationComplete = (registrationData: any) => {
    setUser({ ...user, ...registrationData, isRegistered: true });
    setCurrentScreen('worker-dashboard');
  };

  const handleJobPost = (jobData: any) => {
    console.log('Job posted:', jobData);
    setCurrentScreen('employer-dashboard');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleNavigateToJobPost = () => {
    setCurrentScreen('job-post');
  };

  const handleNavigateToWorkersList = () => {
    setCurrentScreen('workers-list');
  };

  const handleNavigateToChat = (contactName: string, contactType: 'worker' | 'employer') => {
    setCurrentScreen('chat');
  };

  const handleNavigateToEarnings = () => {
    setCurrentScreen('earnings');
  };

  const handleBackToDashboard = () => {
    if (userRole === 'worker') {
      setCurrentScreen('worker-dashboard');
    } else {
      setCurrentScreen('employer-dashboard');
    }
  };

  const handleSwitchRole = () => {
    // Directly switch role and navigate to opposite dashboard
    if (userRole === 'worker') {
      console.log('[APP] switching role to employer');
      setUserRole('employer');
      setCurrentScreen('employer-dashboard');
    } else {
      console.log('[APP] switching role to worker');
      setUserRole('worker');
      setCurrentScreen('worker-dashboard');
    }
  };

  // Debug: log screen and role changes
  React.useEffect(() => {
    console.log('[APP] screen:', currentScreen, 'role:', userRole);
  }, [currentScreen, userRole]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('language')} />;
      case 'language':
        return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
      // Removed 'permissions' case
      case 'role':
        return <RoleSelection onRoleSelect={handleRoleSelect} language={selectedLanguage} />;
      case 'login':
        return <PhoneLogin onLoginSuccess={handleLoginSuccess} language={selectedLanguage} />;
      case 'worker-registration':
        return <WorkerRegistration onComplete={handleRegistrationComplete} language={selectedLanguage} />;
      case 'worker-dashboard':
        return <WorkerDashboard key={`worker-${selectedLanguage}`} 
          user={user} 
           
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToChat={handleNavigateToChat}
          onNavigateToEarnings={handleNavigateToEarnings}
          onSwitchRole={handleSwitchRole}
        />;
      case 'employer-dashboard':
        return <EmployerDashboard key={`employer-${selectedLanguage}`} 
          user={user} 
           
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToJobPost={handleNavigateToJobPost}
          onNavigateToWorkersList={handleNavigateToWorkersList}
          onNavigateToChat={handleNavigateToChat}
          onSwitchRole={handleSwitchRole}
        />;
      case 'profile':
        return <Profile 
          language={selectedLanguage} 
          user={user} 
           
          userRole={userRole} 
          onBack={handleBackToDashboard} 
          onSwitchRole={handleSwitchRole}
          onUserUpdate={(updatedUser) => setUser(updatedUser)}
          onLanguageChange={(newLanguage) => setLang(newLanguage)}
          onLogout={() => {
            setUser(null);
            setUserRole(null);
            setCurrentScreen('splash');
          }}
        />;
      case 'job-post':
        return <JobPostForm onBack={handleBackToDashboard} onSubmit={handleJobPost} language={selectedLanguage} />;
      case 'workers-list':
        return <WorkersList onBack={handleBackToDashboard} language={selectedLanguage} />;
      case 'chat':
        return <EnhancedChatScreen 
          onBack={handleBackToDashboard} 
           
          contactName="Demo Contact" 
          contactType="worker" language={selectedLanguage}
          userId={user?.id || 'user1'}
          contactId="contact1"
        />;
      case 'earnings':
        return <EarningsScreen onBack={handleBackToDashboard} language={selectedLanguage} />;
      default:
        return <SplashScreen onComplete={() => setCurrentScreen('language')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
