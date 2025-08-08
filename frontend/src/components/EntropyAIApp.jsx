import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Crown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp, FaPalette, FaUserCircle, FaRobot } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import ThemeCustomizer from "./ThemeCustomizer";
import entropyaiLogo from "../assets/entropyai-logo.png";

const EntropyAIApp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyId = searchParams.get("company_id");
  const planId = searchParams.get("plan");

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hello! I'm your EntropyAI assistant. I'm here to help you with questions about your uploaded document. ${
        planId
          ? `You're on the ${planId} plan with premium features!`
          : "You have 10 free messages remaining."
      } How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [userPlan, setUserPlan] = useState(planId || "free");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [themePrefs, setThemePrefs] = useState({
    theme: "auto",
    accent: "#a21caf",
    gradient: "from-purple-600 via-blue-600 to-pink-600",
    bubble: "rounded-2xl",
    font: "font-sans",
  });

  // 🔐 Token check
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    if (!token || !userId) {
      setTokenMissing(true);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("themePrefs");
    if (saved) setThemePrefs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (themePrefs.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (themePrefs.theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [themePrefs.theme]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (userPlan === "free" && messageCount >= 10) {
      toast.error("Message limit reached. Upgrade your plan.");
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    setTimeout(() => {
      const remainingMessages =
        userPlan === "free" ? 9 - messageCount : "unlimited";
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: `I understand you're asking about "${inputMessage}". This is a simulated response. ${
          userPlan === "free"
            ? `You have ${remainingMessages} messages remaining.`
            : "You have unlimited messages with your premium plan!"
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 🔐 Show login required screen if no token
  if (tokenMissing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12  text-white text-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-lg mb-6">
            Please log in to access the EntropyAI Assistant.
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

  return (
    <div
      className={`min-h-[calc(100vh-160px)] pt-20 pb-32 px-4 max-w-5xl mx-auto ${themePrefs.font}`}
    >
      <Toaster position="top-right" />
      {/* Theme Customizer Button */}
      <button
        onClick={() => setShowThemeModal(true)}
        className="fixed top-6 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl p-3"
      >
        <FaPalette className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <img
                  src={entropyaiLogo}
                  alt="EntropyAI Logo"
                  className="w-7 h-7"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">EntropyAI Assistant</h1>
                <p className="text-sm text-gray-300">
                  Document analysis companion
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{messageCount}/10 messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Upload a Document
            </h2>
            <p className="text-sm text-gray-300">
              Supported formats: PDF, DOCX
            </p>
            {uploadedFileName && (
              <p className="text-sm text-green-400 mt-2">
                Uploaded: {uploadedFileName}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              id="fileUpload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setUploadedFileName(file.name);
                  toast.success(`Uploaded: ${file.name}`);
                  // Upload logic to backend here
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:opacity-90"
            >
              Choose File
            </label>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 mb-6 min-h-[300px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 flex items-start gap-2 shadow-md ${
                message.type === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/10 backdrop-blur-lg border border-white/20 text-gray-100"
              }`}
            >
              {message.type === "bot" ? (
                <FaRobot className="w-8 h-8 text-purple-400" />
              ) : (
                <FaUserCircle className="w-8 h-8 text-blue-400" />
              )}
              <div>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-2">
              <FaRobot className="w-8 h-8 text-purple-400" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="ml-2 text-sm text-purple-300">
                AI is analyzing...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 mb-20">
        <div className="flex items-end space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your document..."
            className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-gray-400 text-sm"
            rows="1"
            disabled={(userPlan === "free" && messageCount >= 10) || isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={
              !inputMessage.trim() ||
              isLoading ||
              (userPlan === "free" && messageCount >= 10)
            }
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Buttons */}
      <button
        onClick={() => navigate("/analytics")}
        className="fixed bottom-20 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl p-4"
      >
        <Crown className="w-7 h-7" />
      </button>

      <ThemeCustomizer
        open={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        onChange={setThemePrefs}
      />
    </div>
  );
};

export default EntropyAIApp;
