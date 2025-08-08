import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://127.0.0.1:8000/auth";


const LoginSignup = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === "login" ? "/login" : "/register";

      const payload =
        formType === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              email: formData.email,
              password: formData.password,
              first_name: formData.first_name,
              last_name: formData.last_name,
            };

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Something went wrong");
      }

      // ✅ Success Handling
      alert(data.message);

      if (formType === "login") {
        // ⭐ Store JWT token and user details in localStorage
        if (data.token) {
          localStorage.setItem("access_token", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("user_id", data.user.id); // <-- Add this line to store user_id separately
        }

        // ✅ Navigate to Home
        navigate("/");
      } else {
        // After Signup, switch to login form
        setFormType("login");
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
      {/* Animated Blurred Background Lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-48 -right-32 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600 rounded-full blur-2xl opacity-10 animate-ping animation-delay-2000" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">
              {formType === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 text-sm">
              {formType === "login"
                ? "Login to continue your journey"
                : "Get started in just a few steps"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {formType === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  icon={<User />}
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <InputField
                  icon={<User />}
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            )}
            <InputField
              icon={<Mail />}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative">
              <InputField
                icon={<Lock />}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition hover:scale-[1.02] duration-200 flex justify-center items-center gap-2"
            >
              {formType === "login" ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Register
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              {formType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              onClick={() =>
                setFormType(formType === "login" ? "signup" : "login")
              }
              className="text-purple-400 hover:text-pink-400 font-medium transition mt-2"
            >
              {formType === "login" ? "Sign Up Now" : "Sign In Instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable input field component
const InputField = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
      required
    />
  </div>
);

export default LoginSignup;
