# KYC Platform - 出海一站式企业服务平台 (Overseas Corporate Services Platform)

A comprehensive bilingual platform for business incorporation, corporate services, and compliance management. Built for the TRAE Hackathon.

## 🎯 Overview

This platform addresses the key pain points of information asymmetry and fragmentation that companies face when expanding overseas. It provides:

- **AI KYC Due Diligence**: Background checks for directors and shareholders
- **Business Incorporation**: Complete company registration process
- **Corporate Services**: Document management for financial reports, annual reviews, and custom services
- **Compliance Hub**: Singapore tax policies, company law, and employment regulations

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)

## 📁 Project Structure

```
kyc-platform/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx              # Landing page with language toggle
│   │   ├── BusinessIncorporation.jsx # KYC and incorporation forms
│   │   ├── CorpService.jsx          # Document upload for corp services
│   │   └── Compliance.jsx           # Singapore regulations information
│   ├── LanguageContext.jsx          # Language state management
│   ├── translations.js              # All Chinese/English translations
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles with Tailwind
├── public/
├── index.html
├── 语言切换说明.md                   # Language toggle documentation (Chinese)
├── 快速开始.md                       # Quick start guide (Chinese)
├── DEMO_GUIDE.md                    # Presentation guide (English)
├── README.md                        # Main documentation (English)
└── package.json
```

## 🎨 Features

### 0. Language Toggle
- **Bilingual Support**: Chinese (中文) and English
- **Toggle Button**: Located in top-right corner of homepage
- **Full Coverage**: All pages, forms, and content support both languages
- **No Mixed Languages**: Clean separation between Chinese and English
- **Default Language**: Chinese (zh)

### 1. Business Incorporation
- **Step 1: KYC Background Check**
  - Comprehensive information about KYC requirements
  - Uses data providers like Oracle for background verification
  
- **Step 2: Incorporation Form**
  - Dynamic forms for multiple directors and shareholders
  - Fields: Full name, passport number, address, phone, email
  - Add/remove functionality for multiple entries
  - Form validation

### 2. Corporate Services
- **Financial Report (财报)**: Upload PDF documents
- **Annual Review (年审)**: Upload compliance documents
- **Custom Services (自定义服务)**: User-defined services with document upload

### 3. Compliance Hub
- **Singapore Tax Policy (新加坡税务政策)**: Corporate tax rates, exemptions, GST
- **Singapore Company Law (新加坡公司法)**: ACRA requirements, director duties
- **Employee Employment Law (员工雇佣法)**: Employment Act, CPF, work passes

## 💡 Key Design Decisions

- **Frontend Only**: No backend or database - ideal for MVP/demo
- **Client-side Storage**: Form data managed in React state
- **PDF Upload**: File selection UI (files not actually uploaded)
- **Responsive Design**: Mobile-first approach with Tailwind
- **Modern UI**: Gradient backgrounds, card-based layouts, hover effects

## 🎭 Demo Flow

1. **Start** at homepage → View three service options
2. **Business Incorporation** → Complete KYC info → Fill director/shareholder forms → Submit
3. **Return Home** → Access corporate services
4. **Corp Service** → Upload PDFs for various services → Submit
5. **Return Home** → Access compliance information
6. **Compliance** → Browse Singapore regulations → Learn about policies
7. **Return Home** → Complete demo

## 🌐 Use Cases

### Primary Users
- **Enterprise Service Providers**: Offering KYC and incorporation services
- **Enterprise Customers**: Companies expanding overseas

### Key Benefits
- Centralized platform for all overseas company requirements
- Clear visualization of each step in the incorporation process
- Easy document management and tracking
- Access to compliance information in one place

## 🔧 Development Notes

- Built in ~3 hours for hackathon MVP
- No authentication or user management
- No data persistence (refresh clears state)
- All data validation is client-side only
- PDF uploads are cosmetic (not sent to server)

## 📝 Future Enhancements

- Backend API integration
- User authentication and authorization
- Database for data persistence
- Actual KYC data provider integration (Oracle, etc.)
- Document storage and retrieval
- Email notifications
- Multi-language support (English/Chinese)
- Payment processing
- Admin dashboard
- Analytics and reporting

## 📄 License

Built for TRAE Hackathon 2025

## 🤝 Contact

For questions or demo requests, please contact the development team.
