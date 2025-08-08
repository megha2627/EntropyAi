import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Zap,
  Shield,
  Users,
  Globe,
} from "lucide-react";

const EntropyAILanding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/trial");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-24 px-4 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 drop-shadow-2xl mb-2 animate-pulse">
            Bizzbot
          </h1>
          <span className="text-lg text-gray-300 mb-6 block font-semibold tracking-wide">
            by EntropyAI
          </span>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 leading-relaxed font-semibold">
            Instantly turn your business documents into an AI-powered chatbot.
            Upload your PDF or Word files and let Bizzbot answer your questions,
            extract insights, and help you make smarter decisions — all in
            seconds.
          </p>
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 relative z-10 font-black">
              Try Bizzbot Now — It's Free!
            </span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* What is Bizzbot Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What is Bizzbot?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Bizzbot is your intelligent business companion that transforms how
              you interact with your company documents and data.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-white" />}
              title="Smart Document Analysis"
              description="Upload your PDFs, Word documents, or provide company URLs. Bizzbot instantly analyzes and understands your content, making it searchable and interactive through natural conversations."
              gradient="from-blue-500 to-purple-500"
            />
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-white" />}
              title="AI-Powered Conversations"
              description="Chat naturally with your documents. Ask questions, get insights, and receive intelligent responses based on your company's specific data and context."
              gradient="from-green-500 to-blue-500"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-white" />}
              title="Lightning Fast"
              description="Get instant responses to your business queries. Bizzbot processes information in real-time."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-white" />}
              title="Enterprise Security"
              description="Your data is protected with enterprise-grade security."
              gradient="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-white" />}
              title="Team Collaboration"
              description="Share insights with your team."
              gradient="from-indigo-500 to-purple-500"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-white" />}
              title="WhatsApp Integration"
              description="Coming soon! Access Bizzbot directly through WhatsApp."
              gradient="from-teal-500 to-green-500"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of businesses already using Bizzbot. Start your free
            trial now!
          </p>
          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 relative z-10 font-black">
              Start Your Free Trial Now
            </span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
    <div
      className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6`}
    >
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

export default EntropyAILanding;
