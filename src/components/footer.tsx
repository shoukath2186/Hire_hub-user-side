// import React from 'react';

function Footer() {
  return (
    <div className="bg-[#635745] text-gray-400 pt-5 mt-[70px]">
      <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <h5 className="text-white mb-4">Company</h5>
            <a className="block text-gray-400 hover:text-white" href="#">About Us</a>
            <a className="block text-gray-400 hover:text-white" href="#">Contact Us</a>
            <a className="block text-gray-400 hover:text-white" href="#">Our Services</a>
            <a className="block text-gray-400 hover:text-white" href="#">Privacy Policy</a>
            <a className="block text-gray-400 hover:text-white" href="#">Terms & Condition</a>
          </div>
          <div>
            <h5 className="text-white mb-4">Quick Links</h5>
            <a className="block text-gray-400 hover:text-white" href="#">About Us</a>
            <a className="block text-gray-400 hover:text-white" href="#">Contact Us</a>
            <a className="block text-gray-400 hover:text-white" href="#">Our Services</a>
            <a className="block text-gray-400 hover:text-white" href="#">Privacy Policy</a>
            <a className="block text-gray-400 hover:text-white" href="#">Terms & Condition</a>
          </div>
          <div>
            <h5 className="text-white mb-4">Contact</h5>
            <p className="mb-2"><i className="fa fa-map-marker-alt mr-3"></i>123 Street, New York, USA</p>
            <p className="mb-2"><i className="fa fa-phone-alt mr-3"></i>+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope mr-3"></i>info@example.com</p>
            <div className="flex space-x-3 pt-2">
              <a className="text-gray-400 hover:text-white" href="#"><i className="fab fa-twitter"></i></a>
              <a className="text-gray-400 hover:text-white" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="text-gray-400 hover:text-white" href="#"><i className="fab fa-youtube"></i></a>
              <a className="text-gray-400 hover:text-white" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div>
            <h5 className="text-white mb-4">Newsletter</h5>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="relative">
              <input className="bg-gray-800 text-white w-full py-3 pl-4 pr-12 rounded" type="text" placeholder="Your email" />
              <button className="bg-blue-600 text-white py-2 px-4 absolute right-0 top-0 mt-2 mr-2 rounded">SignUp</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-center text-sm text-gray-400 sm:text-left">&copy; <a className="text-gray-400 border-b border-gray-600" href="#">Your Site Name</a>, All Rights Reserved.</p>
          <div className="mt-4 sm:mt-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Home</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
              <a href="#" className="text-gray-400 hover:text-white">Help</a>
              <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
