import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, FileText, Search, ChevronRight, ChevronDown } from 'lucide-react';

type Language = 'te' | 'hi' | 'en';

interface HelpSupportProps {
  language: Language;
  onBack: () => void;
}

const HelpSupport: React.FC<HelpSupportProps> = ({ language, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const content = {
    en: {
      title: "Help & Support",
      search: "Search for help",
      searchPlaceholder: "Type your question here...",
      contactUs: "Contact Us",
      faq: "Frequently Asked Questions",
      guides: "User Guides",
      chat: "Live Chat",
      chatDesc: "Chat with our support team",
      phone: "Phone Support",
      phoneDesc: "Call us for immediate help",
      email: "Email Support",
      emailDesc: "Send us your questions",
      documentation: "Documentation",
      docDesc: "Browse our help articles",
      faqs: [
        {
          question: "How do I find jobs on KaaryaMithr?",
          answer: "Browse available jobs on your dashboard, filter by location and category, and apply directly through the app."
        },
        {
          question: "How do I post a job as an employer?",
          answer: "Go to your employer dashboard, click 'Post New Job', fill in the job details, and publish your listing."
        },
        {
          question: "How do I change my profile information?",
          answer: "Go to Profile > Edit Profile to update your personal information, skills, and work categories."
        },
        {
          question: "How do I contact workers or employers?",
          answer: "Use the built-in chat feature to communicate directly with other users through the app."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we use industry-standard security measures to protect your data. Check our Privacy Policy for details."
        }
      ]
    },
    hi: {
      title: "सहायता और समर्थन",
      search: "सहायता खोजें",
      searchPlaceholder: "यहाँ अपना प्रश्न टाइप करें...",
      contactUs: "हमसे संपर्क करें",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      guides: "उपयोगकर्ता गाइड",
      chat: "लाइव चैट",
      chatDesc: "हमारी सपोर्ट टीम से चैट करें",
      phone: "फोन सपोर्ट",
      phoneDesc: "तत्काल सहायता के लिए हमें कॉल करें",
      email: "ईमेल सपोर्ट",
      emailDesc: "हमें अपने प्रश्न भेजें",
      documentation: "दस्तावेज़ीकरण",
      docDesc: "हमारे सहायता लेख ब्राउज़ करें",
      faqs: [
        {
          question: "मैं कार्य मित्र पर नौकरियां कैसे खोजूं?",
          answer: "अपने डैशबोर्ड पर उपलब्ध नौकरियां ब्राउज़ करें, स्थान और श्रेणी के अनुसार फ़िल्टर करें, और ऐप के माध्यम से सीधे आवेदन करें।"
        },
        {
          question: "मैं नियोक्ता के रूप में नौकरी कैसे पोस्ट करूं?",
          answer: "अपने नियोक्ता डैशबोर्ड पर जाएं, 'नई नौकरी पोस्ट करें' पर क्लिक करें, नौकरी का विवरण भरें, और अपनी लिस्टिंग प्रकाशित करें।"
        },
        {
          question: "मैं अपनी प्रोफ़ाइल जानकारी कैसे बदलूं?",
          answer: "अपनी व्यक्तिगत जानकारी, कौशल और कार्य श्रेणियों को अपडेट करने के लिए प्रोफ़ाइल > प्रोफ़ाइल संपादित करें पर जाएं।"
        },
        {
          question: "मैं कामगारों या नियोक्ताओं से कैसे संपर्क करूं?",
          answer: "ऐप के माध्यम से अन्य उपयोगकर्ताओं के साथ सीधे संवाद करने के लिए अंतर्निहित चैट सुविधा का उपयोग करें।"
        },
        {
          question: "क्या मेरी व्यक्तिगत जानकारी सुरक्षित है?",
          answer: "हां, हम आपके डेटा की सुरक्षा के लिए उद्योग-मानक सुरक्षा उपायों का उपयोग करते हैं। विवरण के लिए हमारी गोपनीयता नीति देखें।"
        }
      ]
    },
    te: {
      title: "సహాయం & మద్దతు",
      search: "సహాయం కోసం వెతకండి",
      searchPlaceholder: "ఇక్కడ మీ ప్రశ్నను టైప్ చేయండి...",
      contactUs: "మమ్మల్ని సంప్రదించండి",
      faq: "తరచుగా అడిగే ప్రశ్నలు",
      guides: "వినియోగదారు గైడ్‌లు",
      chat: "లైవ్ చాట్",
      chatDesc: "మా సపోర్ట్ టీమ్‌తో చాట్ చేయండి",
      phone: "ఫోన్ సపోర్ట్",
      phoneDesc: "తక్షణ సహాయం కోసం మమ్మల్ని కాల్ చేయండి",
      email: "ఇమెయిల్ సపోర్ట్",
      emailDesc: "మీ ప్రశ్నలను మాకు పంపండి",
      documentation: "డాక్యుమెంటేషన్",
      docDesc: "మా సహాయ కథనాలను బ్రౌజ్ చేయండి",
      faqs: [
        {
          question: "కార్య మిత్రలో నేను ఉద్యోగాలను ఎలా కనుగొనగలను?",
          answer: "మీ డాష్‌బోర్డ్‌లో అందుబాటులో ఉన్న ఉద్యోగాలను బ్రౌజ్ చేయండి, లొకేషన్ మరియు కేటగిరీ ద్వారా ఫిల్టర్ చేయండి మరియు యాప్ ద్వారా నేరుగా దరఖాస్తు చేయండి।"
        },
        {
          question: "యజమానిగా నేను ఉద్యోగాన్ని ఎలా పోస్ట్ చేయగలను?",
          answer: "మీ యజమాని డాష్‌బోర్డ్‌కు వెళ్లండి, 'కొత్త ఉద్యోగాన్ని పోస్ట్ చేయండి'పై క్లిక్ చేయండి, ఉద్యోగ వివరాలను పూరించండి మరియు మీ లిస్టింగ్‌ను ప్రచురించండి।"
        },
        {
          question: "నేను నా ప్రొఫైల్ సమాచారాన్ని ఎలా మార్చగలను?",
          answer: "మీ వ్యక్తిగత సమాచారం, నైపుణ్యాలు మరియు పని వర్గాలను అప్‌డేట్ చేయడానికి ప్రొఫైల్ > ప్రొఫైల్ ఎడిట్ చేయండికి వెళ్లండి।"
        },
        {
          question: "నేను కార్మికులు లేదా యజమానులను ఎలా సంప్రదించగలను?",
          answer: "యాప్ ద్వారా ఇతర వినియోగదారులతో నేరుగా కమ్యూనికేట్ చేయడానికి అంతర్నిర్మిత చాట్ ఫీచర్‌ను ఉపయోగించండి।"
        },
        {
          question: "నా వ్యక్తిగత సమాచారం సురక్షితంగా ఉందా?",
          answer: "అవును, మేము మీ డేటాను రక్షించడానికి పరిశ్రమ-ప్రామాణిక భద్రతా చర్యలను ఉపయోగిస్తాము. వివరాల కోసం మా గోప్యతా విధానాన్ని చూడండి।"
        }
      ]
    }
  };

  const currentContent = content[language];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = currentContent.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
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
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{currentContent.search}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentContent.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.contactUs}</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{currentContent.chat}</div>
                  <div className="text-sm text-gray-500">{currentContent.chatDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{currentContent.phone}</div>
                  <div className="text-sm text-gray-500">{currentContent.phoneDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{currentContent.email}</div>
                  <div className="text-sm text-gray-500">{currentContent.emailDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{currentContent.documentation}</div>
                  <div className="text-sm text-gray-500">{currentContent.docDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">{currentContent.faq}</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredFaqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-gray-800">{faq.question}</span>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <div className="ml-8 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{currentContent.guides}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <HelpCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Getting Started</div>
              </div>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">User Manual</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
