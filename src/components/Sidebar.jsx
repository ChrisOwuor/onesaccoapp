import React from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Banknote,
  Receipt,
  ArrowUpFromLine,
  FileText,
  UserCog,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/app" },
  { icon: Users, label: "Members", to: "/app/members" },
  { icon: Wallet, label: "Savings / Accounts", to: "/app/savings" },
  { icon: Banknote, label: "Loans", to: "/app/loans" },
  { icon: Receipt, label: "Repayments", to: "/app/repayments" },
  { icon: ArrowUpFromLine, label: "Withdrawals", to: "/app/withdrawals" },
  { icon: FileText, label: "Reports", to: "/app/reports" },
  { icon: UserCog, label: "Users", to: "/app/users" },
  { icon: Settings, label: "Settings", to: "/app/settings" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={isMobile ? { x: -256 } : { x: 0 }}
        animate={isMobile ? { x: isOpen ? 0 : -256 } : { x: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 lg:top-16 h-full lg:h-[calc(100vh-64px)] w-64 bg-[#f8fafc] border-r border-[#e2e8f0]/40 flex flex-col py-6 z-50 lg:z-30 shadow-2xl lg:shadow-none`}
      >
        

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <motion.div key={item.label} whileHover={{ x: 4 }}>
              <NavLink
                to={item.to}
                end={item.to === "/app"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary font-bold bg-white shadow-sm border-r-4 border-tertiary"
                      : "text-secondary hover:bg-white hover:shadow-sm"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="px-4 mt-auto pt-6 border-t border-outline-variant/10">
          <LogoutButton />
        </div>
      </motion.aside>
    </>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-4 px-4 py-3 text-error font-medium rounded-lg hover:bg-red-50 transition-colors"
    >
      <LogOut size={20} />
      <span className="text-sm">Logout</span>
    </button>
  );
}
