// import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-10  mb-0">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="mb-8">
        <h5 className="text-white text-lg font-semibold mb-4">Company</h5>
        <ul className="space-y-2">
          {['About Us', 'Contact Us', 'Our Services', 'Privacy Policy', 'Terms & Condition'].map((item) => (
            <li key={item}>
              <a className="hover:text-blue-400 transition duration-300" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h5 className="text-white text-lg font-semibold mb-4">Quick Links</h5>
        <ul className="space-y-2">
          {['About Us', 'Contact Us', 'Our Services', 'Privacy Policy', 'Terms & Condition'].map((item) => (
            <li key={item}>
              <a className="hover:text-blue-400 transition duration-300" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h5 className="text-white text-lg font-semibold mb-4">Contact</h5>
        <ul className="space-y-2">
          <li className="flex items-center"><i className="fas fa-map-marker-alt mr-3 text-blue-400"></i>123 Street, New York, USA</li>
          <li className="flex items-center"><i className="fas fa-phone-alt mr-3 text-blue-400"></i>+012 345 67890</li>
          <li className="flex items-center"><i className="fas fa-envelope mr-3 text-blue-400"></i>info@example.com</li>
        </ul>
        <div className="flex space-x-4 mt-4">
          {['twitter', 'facebook-f', 'youtube', 'linkedin-in'].map((icon) => (
            <a key={icon} className="text-gray-400 hover:text-blue-400 transition duration-300" href="#">
              <i className={`fab fa-${icon} text-lg`}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h5 className="text-white text-lg font-semibold mb-4">Newsletter</h5>
        <p className="mb-4">Stay updated with our latest news and offers.</p>
        <form className="flex flex-col sm:flex-row">
          <input 
            className="bg-gray-700 text-white py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 sm:mb-0" 
            type="email" 
            placeholder="Your email" 
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
  <div className="border-t border-gray-700 mt-8 pt-8 pb-6">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm mb-4 sm:mb-0">
          &copy; 2024 <a className="text-blue-400 hover:underline" href="/">HireHub</a>. All Rights Reserved.
        </p>
        <div className="flex space-x-4">
          {['Home', 'Cookies', 'Help', 'FAQs'].map((item) => (
            <a key={item} href="#" className="text-sm hover:text-blue-400 transition duration-300">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </div>
</footer> 
  );
}

export default Footer;
