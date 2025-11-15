export const translations = {
  zh: {
    // Homepage
    home: {
      title: '出海一站式企业服务平台',
      subtitle: 'Overseas Corporate Services Platform',
      description: '为企业提供海外扩张的全方位服务解决方案',
      businessIncorporation: {
        title: '商业注册',
        description: '完整的KYC和公司注册流程',
        button: '立即开始'
      },
      corpService: {
        title: '企业服务',
        description: '财务报告、年审等企业服务',
        button: '立即开始'
      },
      compliance: {
        title: '合规服务',
        description: '新加坡法规和政策咨询',
        button: '立即开始'
      }
    },
    
    // Business Incorporation
    businessIncorporation: {
      title: '商业注册',
      backToHome: '返回首页',
      step1: '基本信息',
      step2: 'KYC',
      step3: '注册',
      kyc: {
        title: 'KYC背景调查',
        description1: '在进行公司注册之前，我们需要对所有董事和股东进行KYC（了解您的客户）背景调查。',
        subtitle: '此流程确保：',
        point1: '个人未受国际制裁',
        point2: '所有关键人员背景清白',
        point3: '符合新加坡监管要求',
        point4: '防范潜在法律问题',
        description2: '我们使用Oracle等可信数据提供商生成全面的报告。此验证也适用于员工入职尽职调查。',
        nextButton: '下一步：公司注册'
      },
      form: {
        title: '注册详情',
        directors: '董事',
        shareholders: '股东',
        addDirector: '添加董事',
        addShareholder: '添加股东',
        director: '董事',
        shareholder: '股东',
        fullName: '全名',
        fullNamePlaceholder: '例如：张伟',
        passportNumber: '护照号码',
        passportNumberPlaceholder: '例如：E12345678',
        address: '居住地址',
        addressPlaceholder: '例如：新加坡乌节路123号，#05-67，邮编238858',
        phone: '电话',
        phonePlaceholder: '例如：+65 9123 4567',
        email: '邮箱',
        emailPlaceholder: '例如：zhang.wei@email.com',
        backToKYC: '返回KYC',
        submitButton: '提交并返回首页',
        fillAllFields: '请填写所有董事信息',
        fillAllShareholders: '请填写所有股东信息',
        submitSuccess: '商业注册提交成功！'
      }
    },
    
    // Corp Service
    corpService: {
      title: '企业服务',
      backToHome: '返回首页',
      description: '管理公司的重要文件和服务',
      workPass: {
        title: '工作准证申请',
        subtitle: 'EP/S Pass/工作许可申请'
      },
      financialReport: {
        title: '财务报告',
        subtitle: '上传年度财务报表'
      },
      annualReview: {
        title: '年度审查',
        subtitle: 'ACRA要求的年审文件'
      },
      customService: {
        title: '自定义服务',
        subtitle: '其他企业服务需求',
        placeholder: '输入服务名称...'
      },
      uploadPDF: '上传PDF',
      requirements: {
        title: '📋 文件要求',
        point1: '所有文件必须为PDF格式',
        point2: '工作准证申请需提供员工护照、学历证明等相关材料',
        point3: '财务报告应包含最新财年数据',
        point4: '年审文件必须及时更新以保持合规',
        point5: '自定义服务可包括税务申报、许可证或其他企业文件'
      },
      submitButton: '提交并返回首页',
      uploadOneDocument: '请至少上传一份文件',
      submitSuccess: '企业服务提交成功！',
      selectPDF: '请选择PDF文件',
      addCustomService: '添加自定义服务',
      deleteCustomService: '确定要删除这个自定义服务吗？',
      completeCustomServices: '请完整填写所有自定义服务的名称和文件'
    },
    
    // Compliance
    compliance: {
      title: '合规服务',
      backToHome: '返回首页',
      description: '了解新加坡法规和政策',
      infoTitle: '🛡️ 合规中心',
      infoDescription: '获取有关新加坡商业法规、税收政策和就业法的全面信息。保持合规并为您的业务运营做出明智决策。',
      taxPolicy: {
        title: '新加坡税务政策',
        subtitle: 'Singapore Tax Policy',
        learnMore: '了解更多'
      },
      companyLaw: {
        title: '新加坡公司法',
        subtitle: 'Singapore Company Law',
        learnMore: '了解更多'
      },
      employmentLaw: {
        title: '员工雇佣法',
        subtitle: 'Employee Employment Law',
        learnMore: '了解更多'
      },
      returnButton: '返回首页',
      close: '关闭',
      
      // Tax Policy Details
      tax: {
        title: '新加坡税务政策',
        subtitle: 'Singapore Tax Policy',
        overview: '概述',
        overviewText: '新加坡拥有世界上最具竞争力的税收制度之一，实行属地税制，并为企业提供众多激励措施。',
        keyPoints: '要点',
        keyPoint1: '企业税率：17%固定税率',
        keyPoint2: '新创公司税收豁免计划',
        keyPoint3: '无资本利得税或股息税',
        keyPoint4: '广泛的双重征税协定（DTA）网络',
        keyPoint5: '商品及服务税（GST）：9%',
        details: '详细信息',
        detail1: '创业税收豁免（SUTE）：新公司前三个连续评估年度的首10万新元正常应税收入可享受税收豁免。',
        detail2: '部分税收豁免（PTE）：所有公司的应税收入最高可达1万新元（75%豁免）和接下来的19万新元（50%豁免）。',
        detail3: '国家预算定期公布企业所得税回扣计划。',
        resources: '有用资源',
        resource1: 'IRAS官方网站：www.iras.gov.sg',
        resource2: '税收居住地和激励指南',
        resource3: 'GST注册要求'
      },
      
      // Company Law Details
      company: {
        title: '新加坡公司法',
        subtitle: 'Singapore Company Law',
        overview: '概述',
        overviewText: '《公司法》是新加坡监管公司的主要法规，由会计与企业管理局（ACRA）监督。',
        keyPoints: '要点',
        keyPoint1: '至少一名在新加坡常住的董事',
        keyPoint2: '至少一名股东（可以是个人或公司）',
        keyPoint3: '必须在6个月内任命公司秘书',
        keyPoint4: '18个月内必须召开年度股东大会（AGM）',
        keyPoint5: '必须向ACRA提交年度财务报表',
        details: '详细信息',
        detail1: '小型公司如果符合某些标准可免除审计要求。',
        detail2: '董事负有受托责任，必须以公司的最佳利益行事。',
        detail3: '公司必须保持适当的会计记录并编制财务报表。',
        detail4: '必须在规定期限内提交年度申报表，以避免罚款。',
        resources: '有用资源',
        resource1: 'ACRA官方网站：www.acra.gov.sg',
        resource2: '《公司法》指南',
        resource3: '董事职责与责任'
      },
      
      // Employment Law Details
      employment: {
        title: '员工雇佣法',
        subtitle: 'Employee Employment Law',
        overview: '概述',
        overviewText: '新加坡就业法保护雇主和雇员，《雇佣法》是主要法规。',
        keyPoints: '要点',
        keyPoint1: '《雇佣法》涵盖月薪≤4,500新元的所有员工',
        keyPoint2: '强制性公积金（CPF）缴纳',
        keyPoint3: '外籍员工需要工作准证',
        keyPoint4: '最低雇佣条款和条件',
        keyPoint5: '防止不当解雇的保护',
        details: '详细信息',
        detail1: 'CPF缴费率：新加坡公民/永久居民雇主最高缴纳17%，雇员最高缴纳20%。',
        detail2: '工作准证类型：就业准证（专业人士）、S准证（中等技能）、工作许可证（半技能）。',
        detail3: '年假权利：第一年最少7天，随服务年限增加。',
        detail4: '产假：符合条件的在职母亲可享受16周产假。',
        resources: '有用资源',
        resource1: '人力部：www.mom.gov.sg',
        resource2: '《雇佣法》摘要',
        resource3: '工作准证要求和申请'
      }
    }
  },
  
  en: {
    // Homepage
    home: {
      title: 'Overseas Corporate Services Platform',
      subtitle: '出海一站式企业服务平台',
      description: 'Comprehensive service solutions for overseas business expansion',
      businessIncorporation: {
        title: 'Business Incorporation',
        description: 'Complete KYC and incorporation process',
        button: 'Get Started'
      },
      corpService: {
        title: 'Corp Service',
        description: 'Financial reports, annual reviews, and more',
        button: 'Get Started'
      },
      compliance: {
        title: 'Compliance',
        description: 'Singapore regulations and policies',
        button: 'Get Started'
      }
    },
    
    // Business Incorporation
    businessIncorporation: {
      title: 'Business Incorporation',
      backToHome: 'Back to Home',
      step1: 'Basic Info',
      step2: 'KYC',
      step3: 'Incorporation',
      kyc: {
        title: 'KYC Background Check',
        description1: 'Before proceeding with business incorporation, we need to conduct a Know Your Customer (KYC) background check on all directors and shareholders.',
        subtitle: 'This process ensures:',
        point1: 'No individuals are under international sanctions',
        point2: 'Clean background verification for all key personnel',
        point3: 'Compliance with Singapore regulatory requirements',
        point4: 'Protection against potential legal issues',
        description2: 'We use trusted data providers like Oracle to generate comprehensive reports. This verification is also useful for employee onboarding due diligence.',
        nextButton: 'Next to Incorporation'
      },
      form: {
        title: 'Incorporation Details',
        directors: 'Directors',
        shareholders: 'Shareholders',
        addDirector: 'Add Director',
        addShareholder: 'Add Shareholder',
        director: 'Director',
        shareholder: 'Shareholder',
        fullName: 'Full Name',
        fullNamePlaceholder: 'e.g., John William Smith',
        passportNumber: 'Passport Number',
        passportNumberPlaceholder: 'e.g., P1234567',
        address: 'Residential Address',
        addressPlaceholder: 'e.g., 123 Orchard Road, #05-67, Singapore 238858',
        phone: 'Phone',
        phonePlaceholder: 'e.g., +65 9123 4567',
        email: 'Email',
        emailPlaceholder: 'e.g., john.smith@email.com',
        backToKYC: 'Back to KYC',
        submitButton: 'Submit & Return Home',
        fillAllFields: 'Please fill in all director information',
        fillAllShareholders: 'Please fill in all shareholder information',
        submitSuccess: 'Business incorporation submitted successfully!'
      }
    },
    
    // Corp Service
    corpService: {
      title: 'Corporate Services',
      backToHome: 'Back to Home',
      description: "Manage your company's essential documents and services",
      workPass: {
        title: 'Work Pass Application',
        subtitle: 'EP/S Pass/Work Permit Application'
      },
      financialReport: {
        title: 'Financial Report',
        subtitle: 'Upload annual financial statements'
      },
      annualReview: {
        title: 'Annual Review',
        subtitle: 'Annual review documents required by ACRA'
      },
      customService: {
        title: 'Custom Service',
        subtitle: 'Other corporate service needs',
        placeholder: 'Enter service name...'
      },
      uploadPDF: 'Upload PDF',
      requirements: {
        title: '📋 Document Requirements',
        point1: 'All documents must be in PDF format',
        point2: 'Work pass applications require employee passport, educational certificates, and related documents',
        point3: 'Financial reports should include latest fiscal year data',
        point4: 'Annual review documents must be up to date for compliance',
        point5: 'Custom services can include tax filings, licenses, or other corporate documents'
      },
      submitButton: 'Submit & Return Home',
      uploadOneDocument: 'Please upload at least one document',
      submitSuccess: 'Corporate services submitted successfully!',
      selectPDF: 'Please select a PDF file',
      addCustomService: 'Add Custom Service',
      deleteCustomService: 'Are you sure you want to delete this custom service?',
      completeCustomServices: 'Please complete all custom service names and files'
    },
    
    // Compliance
    compliance: {
      title: 'Compliance',
      backToHome: 'Back to Home',
      description: 'Stay informed about Singapore regulations and policies',
      infoTitle: '🛡️ Compliance Hub',
      infoDescription: 'Access comprehensive information about Singapore\'s business regulations, tax policies, and employment laws. Stay compliant and make informed decisions for your business operations.',
      taxPolicy: {
        title: 'Singapore Tax Policy',
        subtitle: '新加坡税务政策',
        learnMore: 'Learn More'
      },
      companyLaw: {
        title: 'Singapore Company Law',
        subtitle: '新加坡公司法',
        learnMore: 'Learn More'
      },
      employmentLaw: {
        title: 'Employee Employment Law',
        subtitle: '员工雇佣法',
        learnMore: 'Learn More'
      },
      returnButton: 'Return Home',
      close: 'Close',
      
      // Tax Policy Details
      tax: {
        title: 'Singapore Tax Policy',
        subtitle: '新加坡税务政策',
        overview: 'Overview',
        overviewText: 'Singapore has one of the most competitive tax systems in the world, with a territorial tax system and numerous incentives for businesses.',
        keyPoints: 'Key Points',
        keyPoint1: 'Corporate Tax Rate: 17% flat rate',
        keyPoint2: 'Tax exemption schemes for new start-up companies',
        keyPoint3: 'No capital gains tax or dividend tax',
        keyPoint4: 'Extensive network of Double Tax Agreements (DTAs)',
        keyPoint5: 'Goods and Services Tax (GST): 9%',
        details: 'Additional Details',
        detail1: 'Start-up Tax Exemption (SUTE): New companies can enjoy tax exemption on the first $100,000 of normal chargeable income for the first 3 consecutive Years of Assessment.',
        detail2: 'Partial Tax Exemption (PTE): Available to all companies on chargeable income up to $10,000 (75% exemption) and next $190,000 (50% exemption).',
        detail3: 'Corporate Income Tax rebate schemes are regularly announced in the national budget.',
        resources: 'Useful Resources',
        resource1: 'IRAS Official Website: www.iras.gov.sg',
        resource2: 'Tax Residency & Incentives Guide',
        resource3: 'GST Registration Requirements'
      },
      
      // Company Law Details
      company: {
        title: 'Singapore Company Law',
        subtitle: '新加坡公司法',
        overview: 'Overview',
        overviewText: 'The Companies Act is the principal legislation regulating companies in Singapore, overseen by the Accounting and Corporate Regulatory Authority (ACRA).',
        keyPoints: 'Key Points',
        keyPoint1: 'Minimum one director who is ordinarily resident in Singapore',
        keyPoint2: 'Minimum one shareholder (can be individual or corporate)',
        keyPoint3: 'Company secretary must be appointed within 6 months',
        keyPoint4: 'Annual General Meeting (AGM) required within 18 months',
        keyPoint5: 'Annual filing of financial statements with ACRA',
        details: 'Additional Details',
        detail1: 'Small companies may be exempted from audit requirements if they meet certain criteria.',
        detail2: 'Directors have fiduciary duties and must act in the best interest of the company.',
        detail3: 'Companies must maintain proper accounting records and prepare financial statements.',
        detail4: 'Annual returns must be filed within specified deadlines to avoid penalties.',
        resources: 'Useful Resources',
        resource1: 'ACRA Official Website: www.acra.gov.sg',
        resource2: 'Companies Act Guide',
        resource3: 'Director Duties & Responsibilities'
      },
      
      // Employment Law Details
      employment: {
        title: 'Employee Employment Law',
        subtitle: '员工雇佣法',
        overview: 'Overview',
        overviewText: 'Singapore employment laws protect both employers and employees, with the Employment Act being the main legislation.',
        keyPoints: 'Key Points',
        keyPoint1: 'Employment Act covers all employees with monthly salary ≤ $4,500',
        keyPoint2: 'Central Provident Fund (CPF) contributions mandatory',
        keyPoint3: 'Work passes required for foreign employees',
        keyPoint4: 'Minimum employment terms and conditions',
        keyPoint5: 'Protection against wrongful dismissal',
        details: 'Additional Details',
        detail1: 'CPF contribution rates: Up to 17% by employer and 20% by employee for Singapore Citizens/PRs.',
        detail2: 'Work Pass types: Employment Pass (professionals), S Pass (mid-skilled), Work Permit (semi-skilled).',
        detail3: 'Annual leave entitlement: Minimum 7 days for first year, increasing with years of service.',
        detail4: 'Maternity leave: 16 weeks for working mothers, with certain conditions.',
        resources: 'Useful Resources',
        resource1: 'Ministry of Manpower: www.mom.gov.sg',
        resource2: 'Employment Act Summary',
        resource3: 'Work Pass Requirements & Application'
      }
    }
  }
};

