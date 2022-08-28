import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from './components/authentication/LoginPage';
import { SignUpPage } from './components/authentication/SignUpPage';
import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './components/authentication/Auth';

function App() {
  const [username, setUserName] = useState("");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    })
  }, [auth]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<AuthProvider><Dashboard /></AuthProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
