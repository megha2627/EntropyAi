import React from "react";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-white pt-16 pb-8 px-6 mt-16 border-t shadow-inner"
      style={{
        background: "linear-gradient(to top right, #2a0140, #3d025e)",
        borderColor: "#4a036b",
        boxShadow: "inset 0 1px 4px #4a036b",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-indigo-400 tracking-tight">
            Entropy AI
          </h2>
          <p className="text-sm text-purple-200 mt-3 leading-relaxed">
            AI-powered solutions for smarter businesses. Build, automate, and
            innovate with Entropy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-purple-800 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-purple-200">
            <li>
              <a href="/" className="hover:text-indigo-400 transition-all">
                Home
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="hover:text-indigo-400 transition-all"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="hover:text-indigo-400 transition-all"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-400 transition-all"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-purple-800 pb-1">
            Connect
          </h3>
          <div className="flex items-center space-x-4 mt-3">
            <a
              href="https://facebook.com"
              className="bg-purple-800 hover:bg-blue-600 p-2 rounded-full transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="bg-purple-800 hover:bg-sky-500 p-2 rounded-full transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="bg-purple-800 hover:bg-pink-500 p-2 rounded-full transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://github.com"
              className="bg-purple-800 hover:bg-gray-700 p-2 rounded-full transition"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-purple-800 pb-1">
            Stay Updated
          </h3>
          <p className="text-sm text-purple-200 mb-4">
            Get updates and new features in your inbox.
          </p>
          <div className="flex items-center bg-purple-800 border border-purple-700 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-transparent text-sm text-white placeholder-purple-300 focus:outline-none"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 transition">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-purple-300">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">Entropy AI</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
