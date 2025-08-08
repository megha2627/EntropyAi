import React from "react";
import Footer from "./Footer";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    subtitle: "per month",
    button: "Get Started",
    features: [
      "1 AI Chatbot",
      "500 Conversations/month",
      "Basic Website Integration",
      "Email Support",
      "Standard Templates",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹2999",
    subtitle: "per month",
    button: "Choose Plan",
    features: [
      "5 AI Chatbots",
      "Unlimited Conversations",
      "Advanced Website Builder",
      "Priority Support",
      "Custom Branding",
      "Analytics Dashboard",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹9999",
    subtitle: "per month",
    button: "Contact Sales",
    features: [
      "Unlimited Chatbots",
      "Unlimited Everything",
      "White-label Solution",
      "24/7 Support",
      "Custom AI Training",
      "Advanced Security",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center mb-8">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-300 mb-16 text-center max-w-2xl mx-auto">
          Select the perfect plan for your business needs and unlock the power
          of AI with{" "}
          <span className="text-purple-300 font-semibold">EntropyAI</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 backdrop-blur-lg border border-white/10 transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:-translate-y-3 transform ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-800/30 to-indigo-900/30 border-2 border-purple-500 shadow-purple-700/40 z-10 scale-105"
                  : "bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl shadow-md">
                  Most Popular
                </span>
              )}

              <h3 className="text-3xl font-bold text-cyan-300 mb-2">
                {plan.name}
              </h3>
              <p className="text-5xl font-extrabold text-white mb-1">
                {plan.price}
              </p>
              <p className="text-sm text-gray-400 mb-6">{plan.subtitle}</p>

              <ul className="space-y-3 text-base text-gray-100 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-2" /> {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
