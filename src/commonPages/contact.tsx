// import React from 'react';
import { Phone, Email, LocationOn, Facebook, Twitter, LinkedIn } from '@mui/icons-material';

interface ContactItemProps {
  icon: React.ReactElement;
  title: string;
  content: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content }) => (
  <div className="flex items-center mb-6">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const SocialLink: React.FC<{ icon: React.ReactElement; href: string }> = ({ icon, href }) => (
  <a href={href} className="text-gray-400 hover:text-blue-500 transition duration-300">
    {icon}
  </a>
);

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Contact Us</h1>
        
        <p className="text-xl text-center text-gray-700 mb-12">
          Have questions or need assistance? We're here to help you navigate your career journey with HireHub.
        </p>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
                <ContactItem 
                  icon={<Phone fontSize="large" />}
                  title="Phone"
                  content="+1 (555) 123-4567"
                />
                <ContactItem 
                  icon={<Email fontSize="large" />}
                  title="Email"
                  content="support@hirehub.com"
                />
                <ContactItem 
                  icon={<LocationOn fontSize="large" />}
                  title="Address"
                  content="123 Job Street, Career City, WK 12345"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <SocialLink icon={<Facebook fontSize="large" />} href="#" />
            <SocialLink icon={<Twitter fontSize="large" />} href="#" />
            <SocialLink icon={<LinkedIn fontSize="large" />} href="#" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;