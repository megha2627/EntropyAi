import React from "react";
import {
  Sparkles,
  Users,
  Target,
  BookOpen,
  ArrowRight,
  Zap,
  Heart,
  Award,
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          EntropyAI
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
     

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute top-1/2 left-16 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-3/4 right-16 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-2500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl mr-4">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-indigo-400 drop-shadow-2xl">
              About Us
            </h2>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8 rounded-full shadow-lg"></div>
        </div>

        {/* Intro Paragraph */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 mb-20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed text-center">
            At <span className="text-cyan-400 font-semibold">EntropyAI</span>,
            we are passionate about revolutionizing the way businesses interact
            with technology. Founded with a vision to harness the power of
            artificial intelligence, our mission is to empower companies with
            intelligent chatbots, automated websites, and seamless integrations
            tailored to their unique needs.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-20">
          {[
            {
              title: "Our Story",
              icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
              content:
                "EntropyAI was born from a simple idea: to make AI accessible and impactful for every business. Starting as a small team of innovators, we've grown into a trusted partner for companies worldwide, delivering cutting-edge solutions that save time and enhance customer experiences.",
              gradient: "from-cyan-500/20 to-blue-500/20",
              accent: "cyan-400",
            },
            {
              title: "Our Mission",
              icon: <Target className="w-8 h-8 text-purple-400" />,
              content:
                "Our mission is to simplify complex technologies and provide customizable AI tools that drive growth. We believe in creating solutions that are not just innovative but also user-friendly, ensuring every business can thrive in the digital age.",
              gradient: "from-purple-500/20 to-indigo-500/20",
              accent: "purple-400",
            },
            {
              title: "Our Team",
              icon: <Users className="w-8 h-8 text-indigo-400" />,
              content:
                "Our team consists of AI experts, developers, and designers who are dedicated to pushing the boundaries of what's possible. With diverse skills and a shared passion for technology, we work tirelessly to bring your vision to life.",
              gradient: "from-indigo-500/20 to-violet-500/20",
              accent: "indigo-400",
            },
          ].map((section, i) => (
            <div
              key={i}
              className={`group backdrop-blur-lg bg-gradient-to-br ${section.gradient} border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-${section.accent}/20 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden`}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${section.accent}/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Icon container */}
              <div
                className={`relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${section.accent}/20 to-transparent rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {section.icon}
              </div>

              <h3
                className={`relative z-10 text-3xl font-bold text-${section.accent} mb-6 group-hover:text-white transition-colors duration-300`}
              >
                {section.title}
              </h3>

              <p className="relative z-10 text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                {section.content}
              </p>

              {/* Decorative corner */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-${section.accent}/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              number: "100+",
              label: "Happy Clients",
              icon: <Heart className="w-6 h-6 text-pink-400" />,
            },
            {
              number: "500+",
              label: "Projects Completed",
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
            },
            {
              number: "24/7",
              label: "Support Available",
              icon: <Award className="w-6 h-6 text-emerald-400" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group text-center backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="relative inline-block">
            <button className="group bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-600 hover:from-cyan-600 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 active:scale-95 border-2 border-white/20 hover:border-white/40">
              <div className="flex items-center gap-3">
                <span>Join Us Today</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse scale-110 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
