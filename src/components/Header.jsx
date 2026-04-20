import React from "react";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();

  const displayName = user?.username || user?.email || "Portal User";
  const displayEmail = user?.email || "";

  return (
    <header className="fixed top-0 w-full z-40 bg-primary/95 backdrop-blur-md shadow-sm flex justify-between items-center h-16 px-4 md:px-8">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-300 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
       div.flex
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <div className="hidden lg:flex items-center bg-white/10 rounded-lg px-4 py-2 gap-3 group focus-within:bg-white/20 transition-all">
          <Search
            size={16}
            className="text-slate-400 group-focus-within:text-white"
          />
          <input
            type="text"
            placeholder="Search records..."
            className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-400 w-48 md:w-64"
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-slate-300 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-tertiary rounded-full border-2 border-primary"></span>
          </button>

          <button className="hidden sm:block text-slate-300 hover:text-white transition-colors">
            <HelpCircle size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right mr-2">
              <span className="text-sm font-semibold text-white truncate">
                {displayName}
              </span>
              {displayEmail && (
                <span className="text-xs text-white/70 truncate">
                  {displayEmail}
                </span>
              )}
            </div>
            <div className="h-8 md:h-9 w-8 md:w-9 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer">
              <img
                src="https://picsum.photos/seed/executive/100/100"
                alt={displayEmail || "Manager Avatar"}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
