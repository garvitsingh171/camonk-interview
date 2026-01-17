import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <h3 className="text-xl font-bold text-white">CA Monk</h3>
            </div>
            <p className="text-sm text-gray-400">
              Empowering finance professionals with insightful articles on career growth and finance trends.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary text-sm">Home</a></li>
              <li><a href="#blogs" className="text-gray-400 hover:text-primary text-sm">All Blogs</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary text-sm">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#finance" className="text-gray-400 hover:text-primary text-sm">Finance</a></li>
              <li><a href="#accounting" className="text-gray-400 hover:text-primary text-sm">Accounting</a></li>
              <li><a href="#career" className="text-gray-400 hover:text-primary text-sm">Career Growth</a></li>
              <li><a href="#tech" className="text-gray-400 hover:text-primary text-sm">Technology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-primary" />
                <a href="mailto:hello@camonk.com" className="text-gray-400 hover:text-primary">hello@camonk.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-primary" />
                <a href="tel:+919999999999" className="text-gray-400 hover:text-primary">+91 9999 999 999</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-400">Srinagar, Uttarakhand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; {currentYear} CA Monk. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#facebook" className="text-gray-400 hover:text-primary"><Facebook size={20} /></a>
            <a href="#twitter" className="text-gray-400 hover:text-primary"><Twitter size={20} /></a>
            <a href="#linkedin" className="text-gray-400 hover:text-primary"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
