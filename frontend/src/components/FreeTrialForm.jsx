import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sparkles, Rocket, Bot, ArrowRight, CheckCircle } from "lucide-react";

const FreeTrialForm = () => {
  const [formData, setFormData] = useState({
    domain_name: "",
    tone: "",
    custom_tone: "",
    company_description: "",
    chatbot_expectations: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenMissing, setTokenMissing] = useState(false);
  const [companyExists, setCompanyExists] = useState(false); // 🔥 New State
  const [existingDetails, setExistingDetails] = useState(null); // 🔥 New State
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      setTokenMissing(true);
      return;
    }

    // 🔥 Fetch company details
    axios
      .get(`http://localhost:8000/get-company-details/${userId}`)
      .then((res) => {
        if (res.data && res.data.company) {
          setCompanyExists(true);
          setExistingDetails(res.data.company);
        }
      })
      .catch((err) => {
        // No existing company details – show form
        console.log("No existing company details found.");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      setMessage("User not logged in. Please login first.");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData, created_by: user_id };
      const response = await axios.post(
        "http://localhost:8000/add-company-details",
        payload
      );

      const companyId = response.data.company_id;
      if (companyId) localStorage.setItem("company_id", companyId);

      setMessage(response.data.message || "Successfully submitted!");
      setFormData({
        domain_name: "",
        tone: "",
        custom_tone: "",
        company_description: "",
        chatbot_expectations: "",
      });

      setTimeout(() => navigate("/chatbot"), 1000);
    } catch (error) {
      const backendMessage =
        error.response?.data?.detail || error.response?.data?.message;
      setMessage(backendMessage || "Company ID already exists");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Block UI if JWT is missing
  if (tokenMissing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 text-white text-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-lg mb-6">
            Please log in to access the Free Trial form.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ If company details already exist, show them
  if (companyExists && existingDetails) {
    return (
      <div className="min-h-screen pt-32 px-6 text-white text-left max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Company Details</h1>
        <div className="space-y-4 bg-white/10 p-6 rounded-xl shadow-lg border border-white/20 backdrop-blur-md">
          <p><strong>Domain:</strong> {existingDetails.domain_name}</p>
          <p><strong>Tone:</strong> {existingDetails.tone}</p>
          <p><strong>Custom Tone:</strong> {existingDetails.custom_tone}</p>
          <p><strong>Description:</strong> {existingDetails.company_description}</p>
          <p><strong>Chatbot Expectations:</strong> {existingDetails.chatbot_expectations}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 bg-transparent relative overflow-hidden">
      {/* Blurred animated gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300 shadow-lg shadow-purple-500/50"></div>
        <div className="absolute top-32 right-32 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-700 shadow-lg shadow-blue-500/50"></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce delay-1000 shadow-lg shadow-indigo-500/50"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-bounce delay-1500 shadow-lg shadow-purple-500/50"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Rocket className="w-16 h-16 text-purple-400 animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
              Start Your Free Trial
            </h2>

            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <Sparkles className="w-6 h-6 text-purple-400 mx-4 animate-pulse" />
              <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"></div>
            </div>

            <p className="text-xl text-gray-300 font-medium">
              Fill out the details below to get started with your personalized
              AI chatbot.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Domain */}
            <FormInput
              label="Company Domain Name"
              name="domain_name"
              value={formData.domain_name}
              onChange={handleChange}
              placeholder="e.g. example.com"
              required
            />

            {/* Tone */}
            <FormSelect
              label="Preferred Tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              options={["formal", "casual", "friendly", "professional"]}
              required
            />

            {/* Custom Tone */}
            <FormInput
              label="Custom Tone (Optional)"
              name="custom_tone"
              value={formData.custom_tone}
              onChange={handleChange}
              placeholder="e.g. witty, empathetic"
            />

            {/* Description */}
            <FormTextarea
              label="Company Description"
              name="company_description"
              value={formData.company_description}
              onChange={handleChange}
              placeholder="Tell us about your company"
              required
            />

            {/* Expectations */}
            <FormTextarea
              label="Chatbot Expectations"
              name="chatbot_expectations"
              value={formData.chatbot_expectations}
              onChange={handleChange}
              placeholder="What do you expect from your chatbot?"
              required
            />

            {/* Submit Button */}
            <div className="relative group">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-5 rounded-xl font-bold text-white text-xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 border-2 border-white/20 hover:border-white/40 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <>
                    <Bot className="w-6 h-6 animate-spin" />
                    <span className="relative z-10">
                      Creating Your Chatbot...
                    </span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6 animate-pulse" />
                    <span className="relative z-10">Start Free Trial</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className="relative">
                <div className="backdrop-blur-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <p className="text-green-300 font-medium text-lg">
                    {message}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Inputs

const FormInput = ({ label, name, value, onChange, placeholder, required }) => (
  <div className="group">
    <label className="block font-bold text-gray-200 mb-3 text-lg">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-lg backdrop-blur-sm group-hover:border-white/40"
    />
  </div>
);

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="group">
    <label className="block font-bold text-gray-200 mb-3 text-lg">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={4}
      className="w-full px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-lg backdrop-blur-sm resize-none group-hover:border-white/40"
    ></textarea>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options, required }) => (
  <div className="group">
    <label className="block font-bold text-gray-200 mb-3 text-lg">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-lg backdrop-blur-sm group-hover:border-white/40"
    >
      <option value="" className="bg-gray-800">
        Select Tone
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-gray-800 capitalize">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FreeTrialForm;
