import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Plus, Upload, X, Briefcase, Trash2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const CorpService = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].corpService;
  
  // 从localStorage加载初始数据
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('corpServiceData');
      if (stored) {
        const data = JSON.parse(stored);
        return {
          workPass: data.workPass ? { name: data.workPass, size: 0, type: 'application/pdf' } : null,
          financialReport: data.financialReport ? { name: data.financialReport, size: 0, type: 'application/pdf' } : null,
          annualReview: data.annualReview ? { name: data.annualReview, size: 0, type: 'application/pdf' } : null,
          customServices: (data.customServices || []).map(service => ({
            id: service.id,
            name: service.name || '',
            file: service.fileName ? { name: service.fileName, size: 0, type: 'application/pdf' } : null
          }))
        };
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return null;
  };

  const initialData = loadFromStorage();
  const [workPass, setWorkPass] = useState(initialData?.workPass || null);
  const [financialReport, setFinancialReport] = useState(initialData?.financialReport || null);
  const [annualReview, setAnnualReview] = useState(initialData?.annualReview || null);
  const [customServices, setCustomServices] = useState(initialData?.customServices || []);

  // 保存到localStorage
  useEffect(() => {
    const dataToSave = {
      workPass: workPass?.name || null,
      financialReport: financialReport?.name || null,
      annualReview: annualReview?.name || null,
      customServices: customServices.map(service => ({
        id: service.id,
        name: service.name,
        fileName: service.file?.name || null
      }))
    };
    localStorage.setItem('corpServiceData', JSON.stringify(dataToSave));
  }, [workPass, financialReport, annualReview, customServices]);

  const handleFileSelect = (e, setter) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setter(file);
    } else if (file) {
      alert(t.selectPDF);
      e.target.value = '';
    }
  };

  const handleAddCustomService = () => {
    const newService = {
      id: `custom-${Date.now()}`,
      name: '',
      file: null
    };
    setCustomServices([...customServices, newService]);
  };

  const handleDeleteCustomService = (serviceId) => {
    if (window.confirm(language === 'zh' ? '确定要删除这个自定义服务吗？' : 'Are you sure you want to delete this custom service?')) {
      setCustomServices(customServices.filter(service => service.id !== serviceId));
    }
  };

  const handleUpdateCustomServiceName = (serviceId, name) => {
    setCustomServices(customServices.map(service => 
      service.id === serviceId ? { ...service, name } : service
    ));
  };

  const handleUpdateCustomServiceFile = (serviceId, file) => {
    setCustomServices(customServices.map(service => 
      service.id === serviceId ? { ...service, file } : service
    ));
  };

  const handleSubmit = () => {
    if (!workPass && !financialReport && !annualReview && customServices.length === 0) {
      alert(t.uploadOneDocument);
      return;
    }
    // 检查自定义服务是否都填写完整
    for (const service of customServices) {
      if (!service.name || !service.file) {
        alert(language === 'zh' ? '请完整填写所有自定义服务的名称和文件' : 'Please complete all custom service names and files');
        return;
      }
    }
    alert(t.submitSuccess);
    navigate('/');
  };

  const ServiceCard = ({ title, subtitle, icon: Icon, file, onFileChange, onRemove, color, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition-all">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${color} mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      
      {children}
      
      {!file ? (
        <label className="block">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => onFileChange(e)}
            className="hidden"
          />
          <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <Upload className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-600 font-medium">{t.uploadPDF}</span>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
          <div className="flex items-center flex-1 min-w-0">
            <FileText className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
          </div>
          <button
            onClick={onRemove}
            className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  const CustomServiceCard = ({ service, onDelete, onUpdateName, onUpdateFile }) => (
    <div className="relative bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition-all">
      {/* 删除按钮 */}
      <button
        onClick={() => onDelete(service.id)}
        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors z-10"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 mb-4">
        <Plus className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{t.customService.title}</h3>
      <p className="text-gray-600 mb-4">{t.customService.subtitle}</p>
      
      <input
        type="text"
        value={service.name}
        onChange={(e) => onUpdateName(service.id, e.target.value)}
        placeholder={t.customService.placeholder}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />

      {!service.file ? (
        <label className="block">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.type === 'application/pdf') {
                onUpdateFile(service.id, file);
              } else if (file) {
                alert(t.selectPDF);
                e.target.value = '';
              }
            }}
            className="hidden"
          />
          <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
            <Upload className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-600 font-medium">{t.uploadPDF}</span>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between bg-purple-50 px-4 py-3 rounded-lg border border-purple-200">
          <div className="flex items-center flex-1 min-w-0">
            <FileText className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">{service.file.name}</span>
          </div>
          <button
            onClick={() => onUpdateFile(service.id, null)}
            className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
            <defs>
              <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="24" fill="url(#logoGrad2)" />
            <path d="M12 24C12 24 15 18 18 18C21 18 21 24 24 24C27 24 27 18 30 18C33 18 36 24 36 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M12 28C12 28 15 22 18 22C21 22 21 28 24 28C27 28 27 22 30 22C33 22 36 28 36 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Longwave
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

        {/* Service Cards */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Work Pass Application */}
          <ServiceCard
            title={t.workPass.title}
            subtitle={t.workPass.subtitle}
            icon={Briefcase}
            file={workPass}
            onFileChange={(e) => handleFileSelect(e, setWorkPass)}
            onRemove={() => setWorkPass(null)}
            color="from-indigo-500 to-indigo-600"
          />

          {/* Financial Report */}
          <ServiceCard
            title={t.financialReport.title}
            subtitle={t.financialReport.subtitle}
            icon={FileText}
            file={financialReport}
            onFileChange={(e) => handleFileSelect(e, setFinancialReport)}
            onRemove={() => setFinancialReport(null)}
            color="from-blue-500 to-blue-600"
          />

          {/* Annual Review */}
          <ServiceCard
            title={t.annualReview.title}
            subtitle={t.annualReview.subtitle}
            icon={Calendar}
            file={annualReview}
            onFileChange={(e) => handleFileSelect(e, setAnnualReview)}
            onRemove={() => setAnnualReview(null)}
            color="from-teal-500 to-teal-600"
          />

          {/* Custom Services */}
          {customServices.map((service) => (
            <CustomServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteCustomService}
              onUpdateName={handleUpdateCustomServiceName}
              onUpdateFile={handleUpdateCustomServiceFile}
            />
          ))}

          {/* Add Custom Service Button */}
          <button
            onClick={handleAddCustomService}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-purple-400"
          >
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {language === 'zh' ? '添加自定义服务' : 'Add Custom Service'}
            </h3>
            <p className="text-gray-500">
              {language === 'zh' ? '添加您自己的企业服务' : 'Add your own corporate service'}
            </p>
          </button>
        </div>

        {/* Information Box */}
        <div className="max-w-7xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">{t.requirements.title}</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• {t.requirements.point1}</li>
            <li>• {t.requirements.point2}</li>
            <li>• {t.requirements.point3}</li>
            <li>• {t.requirements.point4}</li>
            <li>• {t.requirements.point5}</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {t.submitButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorpService;
