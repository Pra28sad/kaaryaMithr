import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Briefcase, Camera, Save, X } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';
type UserRole = 'worker' | 'employer';

interface EditProfileProps {
  user: any;
  language: Language;
  userRole: UserRole | null;
  onBack: () => void;
  onSave: (updatedUser: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, language, userRole, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    location: user.location || '',
    phoneNumber: user.phoneNumber || '',
    categories: user.categories || [],
    bio: user.bio || '',
    experience: user.experience || '',
    companyName: user.companyName || '',
    businessType: user.businessType || ''
  });

  const [newCategory, setNewCategory] = useState('');

  const content = {
    en: {
      title: "Edit Profile",
      name: "Full Name",
      location: "Location",
      phone: "Phone Number",
      bio: "Bio",
      experience: "Experience",
      categories: "Work Categories",
      companyName: "Company Name",
      businessType: "Business Type",
      addCategory: "Add Category",
      save: "Save Changes",
      cancel: "Cancel",
      profilePhoto: "Profile Photo",
      changePhoto: "Change Photo"
    },
    hi: {
      title: "प्रोफाइल संपादित करें",
      name: "पूरा नाम",
      location: "स्थान",
      phone: "फोन नंबर",
      bio: "बायो",
      experience: "अनुभव",
      categories: "काम की श्रेणियां",
      companyName: "कंपनी का नाम",
      businessType: "व्यापार का प्रकार",
      addCategory: "श्रेणी जोड़ें",
      save: "परिवर्तन सहेजें",
      cancel: "रद्द करें",
      profilePhoto: "प्रोफाइल फोटो",
      changePhoto: "फोटो बदलें"
    },
    te: {
      title: "ప్రొఫైల్ ఎడిట్ చేయండి",
      name: "పూర్తి పేరు",
      location: "స్థానం",
      phone: "ఫోన్ నంబర్",
      bio: "బయో",
      experience: "అనుభవం",
      categories: "పని వర్గాలు",
      companyName: "కంపెనీ పేరు",
      businessType: "వ్యాపార రకం",
      addCategory: "వర్గం జోడించండి",
      save: "మార్పులను సేవ్ చేయండి",
      cancel: "రద్దు చేయండి",
      profilePhoto: "ప్రొఫైల్ ఫోటో",
      changePhoto: "ఫోటో మార్చండి"
    }
  };

  const currentContent = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((cat: string) => cat !== categoryToRemove)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
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
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{currentContent.save}</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-600">{currentContent.changePhoto}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.name}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={currentContent.name}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.location}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={currentContent.location}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.phone}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={currentContent.phone}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentContent.bio}
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={`Tell us about yourself...`}
            />
          </div>

          {/* Worker-specific fields */}
          {userRole === 'worker' && (
            <>
              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.experience}
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 5 years"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.categories}
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={currentContent.addCategory}
                    onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  />
                  <button
                    onClick={addCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category: string) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => removeCategory(category)}
                        className="ml-2 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Employer-specific fields */}
          {userRole === 'employer' && (
            <>
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.companyName}
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={currentContent.companyName}
                  />
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.businessType}
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select business type</option>
                  <option value="construction">Construction</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Cancel Button */}
        <div className="mt-6">
          <button
            onClick={onBack}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {currentContent.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
