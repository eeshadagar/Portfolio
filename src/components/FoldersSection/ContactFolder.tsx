import { X, Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactFolder = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      formData,
      PUBLIC_KEY
    ).then(
      () => {
        alert("Message sent!");
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        console.error(error);
        alert("Message failed to send. Try again later.");
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed m-10 h-fit w-fit sm:left-1/2 sm:-translate-x-1/2 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl sm:w-[900px] max-w-full shadow-2xl max-h-[90vh] overflow-hidden">
      {/* Window Header */}
      <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-800 font-medium">Contact</span>
        </div>
        <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's Connect!</h2>
          <p className="text-gray-800">Feel free to reach out for opportunities, collaborations, or just to say hi!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg hover:shadow-lg transition-shadow">
                <Mail className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-800">eesha5950@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg hover:shadow-lg transition-shadow">
                <Phone className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-800">+91 78274 91307</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg hover:shadow-lg transition-shadow">
                <MapPin className="w-6 h-6 text-red-500 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-800">Gurgaon, Haryana</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-bold text-gray-900 mb-3">Find me on</h4>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/eeshadagar" target="_blank" rel="noopener noreferrer">
                  <button className="p-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600/80 transition-colors border border-white/30">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </a>
                <a href="https://github.com/eeshadagar" target="_blank" rel="noopener noreferrer">
                  <button className="p-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-900/80 transition-colors border border-white/30">
                    <Github className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-900 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-900 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-900 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical text-gray-900"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500/80 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-blue-600/80 transition-colors font-semibold flex items-center justify-center border border-white/30"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFolder;
