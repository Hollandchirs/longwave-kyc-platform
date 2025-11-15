import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import HomePage from './components/HomePage';
import BusinessIncorporation from './components/BusinessIncorporation';
import CorpService from './components/CorpService';
import Compliance from './components/Compliance';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-incorporation" element={<BusinessIncorporation />} />
          <Route path="/corp-service" element={<CorpService />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
