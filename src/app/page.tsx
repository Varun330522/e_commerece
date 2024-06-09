/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { useState, useEffect } from 'react';
import { Header } from "./_components/header";
import { SignUp } from "./pages/sign_up";
import { Login } from "./pages/login";
import { Verification } from './pages/verification';
import { HomePage } from './pages/home';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState('');
  const [verificationData, setVerificationData] = useState<{ name: string, email: string, password: string } | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setToken(token);
        setCurrentComponent('HOME_PAGE');
      } else {
        setCurrentComponent('SIGN_UP');
      }
    } else {
      setCurrentComponent('SIGN_UP');
    }
  }, []);

  const handleVerification = (name: string,email: string, password: string) => {
    setVerificationData({name,email,password});
    setCurrentComponent('VERIFICATION');
  };


  const renderComponent = () => {
    switch (currentComponent) {
      case 'SIGN_UP':
        return <SignUp onVerification={handleVerification} onLogin={() => setCurrentComponent('LOGIN')} />;
      case 'LOGIN':
        return <Login onSignUp={() => setCurrentComponent('SIGN_UP')} onLogin={() => setCurrentComponent('HOME_PAGE')} />;
      case 'VERIFICATION':
        return <Verification reset={undefined} data={verificationData!} onVerified={() => setCurrentComponent('HOME_PAGE')} />;
      case 'HOME_PAGE':
        return <HomePage/>;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <main>
      <Header />
      {renderComponent()}
    </main>
  );
}
