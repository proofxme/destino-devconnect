
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-devconnect-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-devconnect-primary to-argentina-blue bg-clip-text text-transparent">
                Destino
              </span>
              <span className="text-white ml-1">Devconnect</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your decentralized guide to Argentina Devconnect 2025
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/devconnect" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-gray-300 hover:text-white transition-colors">Accommodations</Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-300 hover:text-white transition-colors">Restaurants</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white transition-colors">Activities</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">About Devconnect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://devconnect.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Official Website</a>
              </li>
              <li>
                <a href="https://devconnect.org/schedule" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Schedule</a>
              </li>
              <li>
                <a href="https://twitter.com/devconnect" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">info@destinodevconnect.com</li>
              <li className="text-gray-300">Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Destino Devconnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
