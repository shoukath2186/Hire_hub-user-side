
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Login from './pages/login.tsx';
import Register from './pages/Register.tsx';
import OTPRegisterForm from './pages/OtpPage.tsx';
import ForgotPassword from './pages/forgetPassword.tsx';
import ResetPassword from './pages/resetPassword.tsx';
import Home from './commonPages/home.tsx';


import Navbar from "./components/Navbar.tsx";
import Footer from './components/footer.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AuthRedirect from './components/AuthRedirect.tsx';

import { GoogleOAuthProvider } from "@react-oauth/google"
import { googleId } from './googleConfig.ts';

function App(){


  return (
    <>
    <ToastContainer/>
    <GoogleOAuthProvider clientId={googleId}>
    <Router>
      <Navbar/>
      <Routes>

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          
            <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
          
          <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />
          <Route path="/otp-verification" element={<AuthRedirect><OTPRegisterForm /></AuthRedirect>} />
          <Route path="/forget-password" element={<AuthRedirect><ForgotPassword /></AuthRedirect>} />
          <Route path="/reset-password" element={<AuthRedirect><ResetPassword /></AuthRedirect>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
      <Footer/>
    </Router>
    </GoogleOAuthProvider>
    </>
  );


}

export default App;

