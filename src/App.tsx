// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Login from './pages/login.tsx';
import Register from './pages/Register.tsx';
import OTPRegisterForm from './pages/OtpPage.tsx';
import ForgotPassword from './pages/forgetPassword.tsx';


import Navbar from "./components/Navbar.tsx";
import Footer from './components/footer.tsx';



function App(){


  return (
    <>
    <ToastContainer/>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/otp-verification" element={<OTPRegisterForm />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );


}

export default App;

