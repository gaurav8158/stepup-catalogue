import { FaFacebookF, FaYoutube } from "react-icons/fa";
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
            <li>+971 4 583 9744</li>
            <li>rashi@step-up.earth</li>
            <li>Vibrant Venture LLC</li>
            <li>Sharjah Media City</li>
            <li>Sharjah, UAE</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com/wordpress.slider.revolution"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm hover:bg-green-600 hover:text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/revslider"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm hover:bg-green-600 hover:text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/user/ThemePunch"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm hover:bg-green-600 hover:text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              <FaYoutube />
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
              <a
                href="https://api.whatsapp.com/send/?phone=971523717837&text=Hi&type=phone_number&app_absent=0"
                className="hover:underline"
              >
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
