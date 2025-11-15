import { useNavigate } from 'react-router-dom';
import { Building2, Briefcase, Shield, Languages } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const HomePage = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].home;

  const services = [
    {
      title: t.businessIncorporation.title,
      description: t.businessIncorporation.description,
      icon: Building2,
      path: '/business-incorporation',
      color: 'from-blue-500 to-blue-600',
      button: t.businessIncorporation.button
    },
    {
      title: t.corpService.title,
      description: t.corpService.description,
      icon: Briefcase,
      path: '/corp-service',
      color: 'from-teal-500 to-teal-600',
      button: t.corpService.button
    },
    {
      title: t.compliance.title,
      description: t.compliance.description,
      icon: Shield,
      path: '/compliance',
      color: 'from-indigo-500 to-indigo-600',
      button: t.compliance.button
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Logo and Company Name */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Logo SVG */}
          <div className="relative">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
              {/* Background Circle with Gradient */}
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="24" fill="url(#logoGradient)" />
              
              {/* Wave Pattern */}
              <path
                d="M12 24C12 24 15 18 18 18C21 18 21 24 24 24C27 24 27 18 30 18C33 18 36 24 36 24"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12 28C12 28 15 22 18 22C21 22 21 28 24 28C27 28 27 22 30 22C33 22 36 28 36 28"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
          
          {/* Company Name */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Longwaves
                  </span>
                  <span className="text-xs text-gray-500 tracking-wider">
                    {language === 'zh' ? '企业出海服务平台' : 'Corporate Services'}
                  </span>
                </div>
        </div>
      </div>

      {/* Language Toggle Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
          <Languages className="w-5 h-5" />
          <span>{language === 'zh' ? 'English' : '中文'}</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.description}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => navigate(service.path)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left overflow-hidden transform hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-4`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  {service.button}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
