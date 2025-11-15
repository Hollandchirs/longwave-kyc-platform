import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, CheckCircle, XCircle, Download, Clock, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const BusinessIncorporation = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].businessIncorporation;
  
  // 从localStorage加载数据
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('businessIncorporationData');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return null;
  };

  const initialData = loadFromStorage();
  
  const [step, setStep] = useState(initialData?.step || 1); // 1: Basic Info, 2: KYC, 3: Incorporation
  
  // Company Information
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [registeredCapital, setRegisteredCapital] = useState(initialData?.registeredCapital || '');
  const [companyType, setCompanyType] = useState(initialData?.companyType || '');
  const [registeredAddress, setRegisteredAddress] = useState(initialData?.registeredAddress || '');
  
  // Directors and Shareholders
  const [directors, setDirectors] = useState(initialData?.directors || [{
    fullName: '',
    passportNumber: '',
    address: '',
    phone: '',
    email: ''
  }]);
  const [shareholders, setShareholders] = useState(initialData?.shareholders || [{
    fullName: '',
    passportNumber: '',
    address: '',
    phone: '',
    email: ''
  }]);

  // KYC Status (demo: approved)
  const [kycApproved, setKycApproved] = useState(true);

  // 保存到localStorage
  useEffect(() => {
    const dataToSave = {
      step,
      companyName,
      registeredCapital,
      companyType,
      registeredAddress,
      directors,
      shareholders
    };
    localStorage.setItem('businessIncorporationData', JSON.stringify(dataToSave));
  }, [step, companyName, registeredCapital, companyType, registeredAddress, directors, shareholders]);

  const addDirector = () => {
    setDirectors([...directors, {
      fullName: '',
      passportNumber: '',
      address: '',
      phone: '',
      email: ''
    }]);
  };

  const removeDirector = (index) => {
    if (directors.length > 1) {
      setDirectors(directors.filter((_, i) => i !== index));
    }
  };

  const updateDirector = (index, field, value) => {
    const updated = [...directors];
    updated[index][field] = value;
    setDirectors(updated);
  };

  const addShareholder = () => {
    setShareholders([...shareholders, {
      fullName: '',
      passportNumber: '',
      address: '',
      phone: '',
      email: ''
    }]);
  };

  const removeShareholder = (index) => {
    if (shareholders.length > 1) {
      setShareholders(shareholders.filter((_, i) => i !== index));
    }
  };

  const updateShareholder = (index, field, value) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  const validateBasicInfo = () => {
    if (!companyName || !registeredCapital || !companyType || !registeredAddress) {
      alert(language === 'zh' ? '请填写所有公司信息' : 'Please fill in all company information');
      return false;
    }
    for (const director of directors) {
      if (!director.fullName || !director.passportNumber || !director.address || 
          !director.phone || !director.email) {
        alert(t.form.fillAllFields);
        return false;
      }
    }
    for (const shareholder of shareholders) {
      if (!shareholder.fullName || !shareholder.passportNumber || !shareholder.address || 
          !shareholder.phone || !shareholder.email) {
        alert(t.form.fillAllShareholders);
        return false;
      }
    }
    return true;
  };

  const handleBasicInfoSubmit = () => {
    if (validateBasicInfo()) {
      setStep(2);
    }
  };

  const handleDownload = () => {
    // Download the PDF file
    const link = document.createElement('a');
    link.href = '/Bizfile_ASTAR GLOBAL EDUCATION PTE. LTD..pdf';
    link.download = 'Bizfile_ASTAR GLOBAL EDUCATION PTE. LTD..pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (window.confirm(language === 'zh' ? '确定要清除所有数据并重新开始吗？' : 'Are you sure you want to clear all data and start over?')) {
      // 清除 localStorage
      localStorage.removeItem('businessIncorporationData');
      // 重置所有状态
      setStep(1);
      setCompanyName('');
      setRegisteredCapital('');
      setCompanyType('');
      setRegisteredAddress('');
      setDirectors([{
        fullName: '',
        passportNumber: '',
        address: '',
        phone: '',
        email: ''
      }]);
      setShareholders([{
        fullName: '',
        passportNumber: '',
        address: '',
        phone: '',
        email: ''
      }]);
      // 提示成功
      alert(language === 'zh' ? '数据已清除，已恢复到初始状态' : 'Data cleared, restored to initial state');
    }
  };

  const PersonForm = ({ person, index, type, onUpdate, onRemove, canRemove }) => (
    <div className="bg-gray-50 rounded-lg p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-700">{type} #{index + 1}</h4>
        {canRemove && (
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.fullName}</label>
          <input
            type="text"
            value={person.fullName}
            onChange={(e) => onUpdate(index, 'fullName', e.target.value)}
            placeholder={t.form.fullNamePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.passportNumber}</label>
          <input
            type="text"
            value={person.passportNumber}
            onChange={(e) => onUpdate(index, 'passportNumber', e.target.value)}
            placeholder={t.form.passportNumberPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.address}</label>
          <input
            type="text"
            value={person.address}
            onChange={(e) => onUpdate(index, 'address', e.target.value)}
            placeholder={t.form.addressPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.phone}</label>
          <input
            type="tel"
            value={person.phone}
            onChange={(e) => onUpdate(index, 'phone', e.target.value)}
            placeholder={t.form.phonePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.email}</label>
          <input
            type="email"
            value={person.email}
            onChange={(e) => onUpdate(index, 'email', e.target.value)}
            placeholder={t.form.emailPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="24" fill="url(#logoGrad)" />
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
          <h1 className="text-4xl font-bold text-gray-800">{t.title}</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <span className="ml-2 mr-4 font-medium">{language === 'zh' ? '基本信息' : 'Basic Info'}</span>
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            {/* Step 2 */}
            <div className={`ml-4 flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <span className="ml-2 mr-4 font-medium">KYC</span>
            <div className={`w-24 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            {/* Step 3 */}
            <div className={`ml-4 flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
            <span className="ml-2 font-medium">{language === 'zh' ? '注册' : 'Incorporation'}</span>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {language === 'zh' ? '基本信息' : 'Basic Information'}
            </h2>
            
            {/* Company Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh' ? '公司信息' : 'Company Information'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司名称' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={language === 'zh' ? '例如：新加坡科技有限公司' : 'e.g., Singapore Tech Pte. Ltd.'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '注册资本金' : 'Registered Capital'}
                  </label>
                  <input
                    type="text"
                    value={registeredCapital}
                    onChange={(e) => setRegisteredCapital(e.target.value)}
                    placeholder={language === 'zh' ? '例如：SGD 100,000' : 'e.g., SGD 100,000'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司经营范围' : 'Company Type'}
                  </label>
                  <input
                    type="text"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    placeholder={language === 'zh' ? '例如：科技咨询服务' : 'e.g., Technology Consulting'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司注册地址' : 'Registered Address'}
                  </label>
                  <input
                    type="text"
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    placeholder={language === 'zh' ? '例如：新加坡乌节路123号' : 'e.g., 123 Orchard Road, Singapore'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Directors Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{t.form.directors}</h3>
                <button
                  onClick={addDirector}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t.form.addDirector}
                </button>
              </div>
              {directors.map((director, index) => (
                <PersonForm
                  key={index}
                  person={director}
                  index={index}
                  type={t.form.director}
                  onUpdate={updateDirector}
                  onRemove={removeDirector}
                  canRemove={directors.length > 1}
                />
              ))}
            </div>

            {/* Shareholders Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{t.form.shareholders}</h3>
                <button
                  onClick={addShareholder}
                  className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t.form.addShareholder}
                </button>
              </div>
              {shareholders.map((shareholder, index) => (
                <PersonForm
                  key={index}
                  person={shareholder}
                  index={index}
                  type={t.form.shareholder}
                  onUpdate={updateShareholder}
                  onRemove={removeShareholder}
                  canRemove={shareholders.length > 1}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center pt-6 border-t border-gray-200">
              <button
                onClick={handleBasicInfoSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {language === 'zh' ? '下一步：KYC审核' : 'Next: KYC Review'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: KYC Review */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center justify-center mb-8">
              {kycApproved ? (
                <>
                  <CheckCircle className="w-24 h-24 text-green-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {language === 'zh' ? 'KYC审核通过' : 'KYC Approved'}
                  </h2>
                  <p className="text-gray-600 text-center mb-8">
                    {language === 'zh' 
                      ? '您的背景调查已通过审核，可以继续进行公司注册流程。' 
                      : 'Your background check has been approved. You can proceed with the incorporation process.'}
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-24 h-24 text-red-500 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {language === 'zh' ? 'KYC审核未通过' : 'KYC Not Approved'}
                  </h2>
                  <p className="text-gray-600 text-center mb-8">
                    {language === 'zh' 
                      ? '您的背景调查未通过审核，请检查并更新您的基本信息。' 
                      : 'Your background check was not approved. Please review and update your information.'}
                  </p>
                </>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === 'zh' ? '📋 审核详情' : '📋 Review Details'}
              </h3>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {language === 'zh' ? '个人信息验证完成' : 'Personal information verified'}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {language === 'zh' ? '无国际制裁记录' : 'No international sanctions found'}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {language === 'zh' ? '背景清白验证通过' : 'Clean background verified'}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {language === 'zh' ? '符合监管要求' : 'Regulatory compliance confirmed'}
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {language === 'zh' ? '返回修改信息' : 'Back to Basic Info'}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!kycApproved}
                className={`flex-1 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg ${
                  kycApproved 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {language === 'zh' ? '继续注册' : 'Continue to Incorporation'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Incorporation */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {language === 'zh' ? '公司注册状态' : 'Incorporation Status'}
            </h2>

            {/* Status Timeline */}
            <div className="space-y-6 mb-8">
              {/* Pending Status */}
              <div className="flex items-start p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '待处理' : 'Pending'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'zh' 
                      ? '您的申请正在处理中，预计1-2个工作日完成。' 
                      : 'Your application is being processed. Expected completion in 1-2 business days.'}
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="ml-2 text-sm text-gray-500">
                      {language === 'zh' ? '处理中' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approved Status */}
              <div className="flex items-start p-6 bg-green-50 rounded-lg border-2 border-green-500">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {language === 'zh' ? '已批准' : 'Approved'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'zh' 
                      ? '恭喜！您的公司注册已获批准，所有文件已准备就绪。' 
                      : 'Congratulations! Your company incorporation has been approved. All documents are ready.'}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="ml-2 text-sm font-semibold text-green-700">
                      {language === 'zh' ? '已完成' : 'Completed'}
                    </span>
                  </div>
                  
                  {/* Download Section */}
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {language === 'zh' ? '下载注册文件' : 'Download Registration Documents'}
                    </h4>
                    <button
                      onClick={handleDownload}
                      className="flex items-center w-full justify-between bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Bizfile - ASTAR GLOBAL EDUCATION</p>
                          <p className="text-sm text-gray-500">PDF • {language === 'zh' ? '公司注册文件' : 'Company Registration'}</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-blue-600 group-hover:translate-y-1 transition-transform" />
                    </button>
                    
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        {language === 'zh' 
                          ? '✓ 所有合规文件已生成并可供下载' 
                          : '✓ All compliance documents have been generated and are ready for download'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                {language === 'zh' ? '重新开始' : 'Start Over'}
              </button>
              
              {/* Return Home Button */}
              <button
                onClick={() => {
                  alert(language === 'zh' ? '注册流程完成！' : 'Incorporation process completed!');
                  navigate('/');
                }}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {language === 'zh' ? '返回首页' : 'Return to Home'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessIncorporation;
