import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneVolume,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Section 1 */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-yellow-400">PRO</span>BUZIN
              </h3>
              <p className="mb-4">
                "Probuzin" could be interpreted as a catchy brand name
                suggesting something professional, trendy, or health-focused,
                fitting well for a shake café or a healthy beverage business.
              </p>
              <div className="flex space-x-4 text-xl">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transform transition duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transform transition duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transform transition duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transform transition duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Another Link
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold mb-4">
                Contact Information
              </h5>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  className="mr-2 transform transition duration-300 hover:scale-110 hover:text-gray-400"
                />
                +91 9975510628
              </p>
              <p className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 transform transition duration-300 hover:scale-110 hover:text-gray-400"
                />
                probuzin@gmail.com
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="mr-2 transform transition duration-300 hover:scale-110 hover:text-gray-400"
                />
                Maharashtra, India.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-center py-4 text-gray-400">
        <p>@Probuzin</p>
      </div>
    </>
  );
};

export default Footer;
