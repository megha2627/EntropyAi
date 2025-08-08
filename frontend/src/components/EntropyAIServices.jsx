import React from "react";

const EntropyAIServices = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto py-24 px-6 mt-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-400 mb-16 text-center drop-shadow-lg">
          Our Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {/* Card */}
          {[
            {
              title: "AI Chatbot Development",
              desc: "Custom AI chatbots that understand your business and engage customers naturally with intelligent responses.",
            },
            {
              title: "Automatic Website Creation",
              desc: "Our AI builds professional websites automatically, tailored to your specific business requirements.",
            },
            {
              title: "Seamless Integration",
              desc: "Connect chatbots to your existing systems effortlessly with our automated integration technology.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                {service.desc}
              </p>
            </div>
          ))}

          {/* Full Customization Card (spanning full width) */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-2xl w-full">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Full Customization
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                Complete control over design, functionality, and behavior to
                perfectly match your brand identity.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Explore Our Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntropyAIServices;
