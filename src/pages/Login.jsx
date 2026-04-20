import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Factory,
  IdCard,
  Lock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async () => {
    setLoading(true);
    setError(null);
    // credentials shape: try username first, then memberId
    const creds = { email: memberId, password };
    const res = await login(creds);
    setLoading(false);
    if (res?.ok) {
      navigate("/app", { replace: true });
    } else {
      setError(res?.error || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen items-center justify-center "
    >
      {/* Left Side: Login Form */}
      <div className="flex justify-center w-full lg:w-1/2 px-8 sm:px-16 lg:px-24 bg-brand-surface relative z-10 py-20 lg:py-0">
        {/* Brand Anchor */}

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <header className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-3">
              Member Access
            </h1>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Secure login to your industrial financial portal
            </p>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
            className="space-y-6"
          >
            <div>
              <label
                className="block text-xs font-bold text-brand-primary mb-2 uppercase tracking-[0.15em]"
                htmlFor="member_id"
              >
                Member Identification
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-accent transition-colors">
                  <IdCard className="w-5 h-5" />
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-4 bg-brand-surface-container/30 border-2 border-transparent rounded-xl text-brand-primary placeholder:text-gray-400 focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 outline-none"
                  id="member_id"
                  placeholder="e.g. admin@example.com or MV-2024-001"
                  type="text"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-xs font-bold text-brand-primary uppercase tracking-[0.15em]"
                  htmlFor="password"
                >
                  Secure Password
                </label>
                <a
                  className="text-[11px] font-bold text-brand-primary hover:text-brand-accent transition-colors uppercase tracking-widest"
                  href="#"
                >
                  Forgot Access?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-accent transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-4 bg-brand-surface-container/30 border-2 border-transparent rounded-xl text-brand-primary placeholder:text-gray-400 focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 outline-none"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary cursor-pointer transition-colors"
                id="remember"
                type="checkbox"
              />
              <label
                className="ml-2 text-sm text-gray-600 font-medium select-none cursor-pointer"
                htmlFor="remember"
              >
                Trust this device for 30 days
              </label>
            </div>

            <div>
              {error && (
                <div className="text-sm text-red-600 mb-2">{error}</div>
              )}
              <button
                className="w-full flex justify-center items-center gap-3 py-4 px-6 bg-brand-primary text-white font-bold rounded-xl shadow-xl shadow-brand-primary/20 hover:bg-brand-secondary transition-all active:scale-[0.98] group disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Signing in…" : "Login"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <footer className="mt-12 text-center lg:text-left">
            <p className="text-sm text-gray-600 font-medium">
              Interested in joining the Sacco?
              <a
                className="text-brand-primary font-black hover:underline ml-2"
                href="#"
              >
                Apply for Membership
              </a>
            </p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}
