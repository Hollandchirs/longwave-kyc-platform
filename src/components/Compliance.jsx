import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Building, Users, ExternalLink, X, Plus, FileText, Save, Trash2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Compliance = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].compliance;
  
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // 从localStorage加载自定义法规
  const loadCustomRegulations = () => {
    try {
      const stored = localStorage.getItem('customRegulations');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading custom regulations:', e);
    }
    return [];
  };

  const [customRegulations, setCustomRegulations] = useState(loadCustomRegulations());
  const [editingCard, setEditingCard] = useState(null);

  // 保存自定义法规到localStorage
  useEffect(() => {
    localStorage.setItem('customRegulations', JSON.stringify(customRegulations));
  }, [customRegulations]);

  const defaultTopics = [
    {
      id: 'tax',
      title: t.taxPolicy.title,
      subtitle: t.taxPolicy.subtitle,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      content: t.tax,
      isDefault: true
    },
    {
      id: 'company-law',
      title: t.companyLaw.title,
      subtitle: t.companyLaw.subtitle,
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      content: t.company,
      isDefault: true
    },
    {
      id: 'employment',
      title: t.employmentLaw.title,
      subtitle: t.employmentLaw.subtitle,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      content: t.employment,
      isDefault: true
    }
  ];

  const handleAddNewCard = () => {
    const newCard = {
      id: `custom-${Date.now()}`,
      title: '',
      subtitle: '',
      overview: '',
      keyPoints: ['', '', ''],
      details: ['', ''],
      resources: [''],
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      isCustom: true,
      isEditing: true
    };
    setEditingCard(newCard);
  };

  const handleSaveCustomCard = (cardData) => {
    // 验证必填字段
    if (!cardData.title || !cardData.subtitle || !cardData.overview) {
      alert(language === 'zh' ? '请填写标题、副标题和概述' : 'Please fill in title, subtitle and overview');
      return;
    }

    // 过滤掉空的要点和详情
    const filteredKeyPoints = cardData.keyPoints.filter(point => point.trim() !== '');
    const filteredDetails = cardData.details.filter(detail => detail.trim() !== '');
    const filteredResources = cardData.resources.filter(resource => resource.trim() !== '');

    if (filteredKeyPoints.length === 0) {
      alert(language === 'zh' ? '请至少添加一个要点' : 'Please add at least one key point');
      return;
    }

    const savedCard = {
      ...cardData,
      keyPoints: filteredKeyPoints,
      details: filteredDetails,
      resources: filteredResources,
      isEditing: false,
      content: {
        title: cardData.title,
        subtitle: cardData.subtitle,
        overview: language === 'zh' ? '概述' : 'Overview',
        overviewText: cardData.overview,
        keyPoints: language === 'zh' ? '要点' : 'Key Points',
        keyPoint1: filteredKeyPoints[0] || '',
        keyPoint2: filteredKeyPoints[1] || '',
        keyPoint3: filteredKeyPoints[2] || '',
        keyPoint4: filteredKeyPoints[3] || '',
        keyPoint5: filteredKeyPoints[4] || '',
        details: language === 'zh' ? '详细信息' : 'Additional Details',
        detail1: filteredDetails[0] || '',
        detail2: filteredDetails[1] || '',
        detail3: filteredDetails[2] || '',
        resources: language === 'zh' ? '有用资源' : 'Useful Resources',
        resource1: filteredResources[0] || '',
        resource2: filteredResources[1] || '',
        resource3: filteredResources[2] || ''
      }
    };

    setCustomRegulations([...customRegulations, savedCard]);
    setEditingCard(null);
    
    // 自动添加下一个新卡片
    setTimeout(() => {
      handleAddNewCard();
    }, 300);
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  const handleDeleteCustomCard = (cardId) => {
    if (window.confirm(language === 'zh' ? '确定要删除这个法规吗？' : 'Are you sure you want to delete this regulation?')) {
      setCustomRegulations(customRegulations.filter(card => card.id !== cardId));
    }
  };

  const EditCardForm = ({ card, onSave, onCancel }) => {
    const [formData, setFormData] = useState(card);

    const updateField = (field, value) => {
      setFormData({ ...formData, [field]: value });
    };

    const updateArrayField = (field, index, value) => {
      const newArray = [...formData[field]];
      newArray[index] = value;
      setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
      setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayItem = (field, index) => {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {language === 'zh' ? '新增自定义法规' : 'Add Custom Regulation'}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '标题 *' : 'Title *'}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder={language === 'zh' ? '例如：数据保护法' : 'e.g., Data Protection Act'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '副标题 *' : 'Subtitle *'}
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder={language === 'zh' ? '例如：个人数据保护法规' : 'e.g., Personal Data Protection Regulations'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '概述 *' : 'Overview *'}
            </label>
            <textarea
              value={formData.overview}
              onChange={(e) => updateField('overview', e.target.value)}
              placeholder={language === 'zh' ? '简要描述这个法规...' : 'Brief description of this regulation...'}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Key Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '要点 *' : 'Key Points *'}
            </label>
            {formData.keyPoints.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => updateArrayField('keyPoints', index, e.target.value)}
                  placeholder={`${language === 'zh' ? '要点' : 'Point'} ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {formData.keyPoints.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('keyPoints', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('keyPoints')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              {language === 'zh' ? '添加要点' : 'Add Point'}
            </button>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '详细信息（可选）' : 'Additional Details (Optional)'}
            </label>
            {formData.details.map((detail, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={detail}
                  onChange={(e) => updateArrayField('details', index, e.target.value)}
                  placeholder={`${language === 'zh' ? '详细信息' : 'Detail'} ${index + 1}`}
                  rows={2}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {formData.details.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('details', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('details')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              {language === 'zh' ? '添加详情' : 'Add Detail'}
            </button>
          </div>

          {/* Resources */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'zh' ? '资源链接（可选）' : 'Resources (Optional)'}
            </label>
            {formData.resources.map((resource, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resource}
                  onChange={(e) => updateArrayField('resources', index, e.target.value)}
                  placeholder={language === 'zh' ? '例如：官方网站链接或文档名称' : 'e.g., Official website link or document name'}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {formData.resources.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('resources', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('resources')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              {language === 'zh' ? '添加资源' : 'Add Resource'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </button>
            <button
              onClick={() => onSave(formData)}
              className="flex items-center px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {language === 'zh' ? '保存' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TopicModal = ({ topic, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">{topic.content.title}</h2>
            <p className="text-gray-500">{topic.content.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{topic.content.overview}</h3>
            <p className="text-gray-700 leading-relaxed">{topic.content.overviewText}</p>
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{topic.content.keyPoints}</h3>
            <ul className="space-y-2">
              {topic.content.keyPoint1 && (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{topic.content.keyPoint1}</span>
                </li>
              )}
              {topic.content.keyPoint2 && (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{topic.content.keyPoint2}</span>
                </li>
              )}
              {topic.content.keyPoint3 && (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{topic.content.keyPoint3}</span>
                </li>
              )}
              {topic.content.keyPoint4 && (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{topic.content.keyPoint4}</span>
                </li>
              )}
              {topic.content.keyPoint5 && (
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{topic.content.keyPoint5}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Details */}
          {(topic.content.detail1 || topic.content.detail2 || topic.content.detail3) && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{topic.content.details}</h3>
              <div className="space-y-3">
                {topic.content.detail1 && (
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {topic.content.detail1}
                  </p>
                )}
                {topic.content.detail2 && (
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {topic.content.detail2}
                  </p>
                )}
                {topic.content.detail3 && (
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {topic.content.detail3}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Resources */}
          {(topic.content.resource1 || topic.content.resource2 || topic.content.resource3) && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{topic.content.resources}</h3>
              <ul className="space-y-2">
                {topic.content.resource1 && (
                  <li className="flex items-center text-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{topic.content.resource1}</span>
                  </li>
                )}
                {topic.content.resource2 && (
                  <li className="flex items-center text-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{topic.content.resource2}</span>
                  </li>
                )}
                {topic.content.resource3 && (
                  <li className="flex items-center text-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{topic.content.resource3}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );

  const allTopics = [...defaultTopics, ...customRegulations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
            <defs>
              <linearGradient id="logoGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="24" fill="url(#logoGrad3)" />
            <path d="M12 24C12 24 15 18 18 18C21 18 21 24 24 24C27 24 27 18 30 18C33 18 36 24 36 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M12 28C12 28 15 22 18 22C21 22 21 28 24 28C27 28 27 22 30 22C33 22 36 28 36 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
          </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Longwaves
                </span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 mt-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.backToHome}
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>

        {/* Info Banner */}
        <div className="max-w-6xl mx-auto bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-indigo-900 mb-2">{t.infoTitle}</h3>
          <p className="text-indigo-800 text-sm">
            {t.infoDescription}
          </p>
        </div>

        {/* Topic Cards Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8">
          {/* Default Topics */}
          {allTopics.map((topic) => (
            <div key={topic.id} className="relative">
              <button
                onClick={() => setSelectedTopic(topic)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-2 w-full"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${topic.color} mb-4`}>
                  <topic.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
                <p className="text-gray-500 mb-4">{topic.subtitle}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  {language === 'zh' ? '了解更多' : 'Learn More'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </button>
              {/* Delete button for custom cards */}
              {topic.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCustomCard(topic.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {/* Add New Card Button or Edit Form */}
          {editingCard ? (
            <div className="md:col-span-3">
              <EditCardForm
                card={editingCard}
                onSave={handleSaveCustomCard}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <button
              onClick={handleAddNewCard}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-orange-400"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'zh' ? '添加自定义法规' : 'Add Custom Regulation'}
              </h3>
              <p className="text-gray-500">
                {language === 'zh' ? '添加您自己的法律法规卡片' : 'Add your own legal regulation card'}
              </p>
            </button>
          )}
        </div>

        {/* Return Home Button */}
        <div className="max-w-6xl mx-auto flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {t.returnButton}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      )}
    </div>
  );
};

export default Compliance;
