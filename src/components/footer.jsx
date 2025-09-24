import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-gray-800 py-10 pb-4 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="no-underline">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png" // Replace with your actual path
                alt="Aramya Logo"
                className="h-20 w-auto"
              />
            </div>
          </Link>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <ul className="space-y-1 text-gray/90">
            <li>
              <a className="decoration-0" href="tel:+971522726979">
                +971 522726979
              </a>
            </li>
            <li>
              <a href="mailto:connect@step-up.earth">connect@step-up.earth</a>
            </li>

            <li>Vibrant Venture LLC</li>
            <li>Sharjah Media City</li>
            <li>Sharjah, UAE</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=61558704577431"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm hover:bg-green-600 hover:text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/step.upearth?igsh=M3p5YW80YWp1dmhv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm hover:bg-green-600 hover:text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Things To Do */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Things To Do</h2>
          <ul className="space-y-2 text-gray/90">
            <li>
              <a href="/" className="hover:underline">
                Buy Uniforms
              </a>
            </li>
            <li>
              <a href="/user/add" className="hover:underline">
                Sell/Donate Uniforms
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar (Optional) */}
      <div className="text-center text-gray/80 text-sm mt-10">
        © {new Date().getFullYear()} StepUp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
