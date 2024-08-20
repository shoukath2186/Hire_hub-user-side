import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/login.tsx';
import Register from './pages/Register.tsx';
import OTPRegisterForm from './pages/OtpPage.tsx';
import ForgotPassword from './pages/forgetPassword.tsx';
import ResetPassword from './pages/resetPassword.tsx';

import Home from './commonPages/home.tsx';
import Job from './commonPages/job.tsx';
import About from './commonPages/about.tsx';
import Contact from './commonPages/contact.tsx';

import LayoutProfile from './commonPages/Layout/layoutProfile.tsx';

import Navbar from "./components/Navbar.tsx";
import Footer from './components/footer.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AuthRedirect from './components/AuthRedirect.tsx';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleId } from './googleConfig.ts';

function App() {
  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId={googleId}>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
                <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />
                <Route path="/otp-verification" element={<AuthRedirect><OTPRegisterForm /></AuthRedirect>} />
                <Route path="/forget-password" element={<AuthRedirect><ForgotPassword /></AuthRedirect>} />
                <Route path="/reset-password" element={<AuthRedirect><ResetPassword /></AuthRedirect>} />
                <Route path="/profile" element={<ProtectedRoute><LayoutProfile /></ProtectedRoute>} />
                <Route path="/job" element={<ProtectedRoute><Job /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
