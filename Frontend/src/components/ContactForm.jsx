import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

const ContactForm = () => {
  return (
    <div className="flex flex-col p-8 bg-[var(--brand)] text-white">
      {/* Contact Us Title */}
      <h2 className="text-center text-2xl font-semibold mb-6">Contact Us</h2>
      
      <div className="flex justify-between items-center">
        {/* Left Side: Social Icons, Email, Contact, Address */}
        <div className="flex flex-col space-y-6">
          {/* Contact Details */}
          <div>
            <p><strong>Email:</strong> contact@company.com</p>
            <p><strong>Phone:</strong> +92 3123152874</p>
            <p><strong>Address:</strong> 123 Main Street, City, Hyderabad</p>
          </div>
        </div>

        {/* Right Side: WhatsApp Icon Button */}
        <div className="flex flex-col justify-center items-center">
          
          
          {/* WhatsApp Icon Button */}
          <a 
            href="https://wa.me/03123152874" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-24 h-24 bg-green-500 text-white rounded-full mt-14"
          >
            <FaWhatsapp className="w-16 h-16" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
