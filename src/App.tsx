import * as React from 'react';
import './App.css';
import initCornerstone from './components/cornerstone/init';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './page/Main';
import { PasscodeProvider } from './context/code/CodeContext';
import LoginPage from './page/LoginPage';

const App: React.FC = () => {
  // File Loader
  initCornerstone();

  return (
    <PasscodeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </PasscodeProvider>
  );
};

export default App;
