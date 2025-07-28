import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-300 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-sm">
            This app is a minimal CRUD interface built using React Query, React Hook Form, and Ant Design. Designed to be fast, simple, and user-friendly.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Add New</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a></li>
            <li>Phone: +998 90 123 45 67</li>
            <li>Location: Tashkent, Uzbekistan</li>
          </ul>
        </div>
      </div>

      
      <div className="text-center text-xs mt-8 text-gray-500">
        © 2025 CRUD App. All rights reserved.
      </div>
    </footer>
  );
};

export default React.memo(Footer);
