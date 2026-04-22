import React from "react";
import {
  LayoutDashboard,
  Users,
  Banknote,
  Receipt,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// normal loop items only
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/app" },
  { icon: Users, label: "Members", to: "/app/members" },
  { icon: Receipt, label: "Ledger", to: "/app/ledger" },
  { icon: Banknote, label: "Accounts", to: "/app/my-account" },
];

const loanItems = [
  { label: "All Loans", to: "/app/loans" },
  { label: "My Loans", to: "/app/loans/my-loans" },
  { label: "Loan Products", to: "/app/loans/products" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  const location = useLocation();

  const [openMenus, setOpenMenus] = React.useState({
    Loans: location.pathname.startsWith("/app/loans"),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (location.pathname.startsWith("/app/loans")) {
      setOpenMenus((prev) => ({ ...prev, Loans: true }));
    }
  }, [location.pathname]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleChildClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
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
        className="fixed left-0 top-0 lg:top-16 h-full lg:h-[calc(100vh-64px)] w-64 bg-[#f8fafc] border-r border-[#e2e8f0]/40 flex flex-col py-6 z-50 lg:z-30 shadow-2xl lg:shadow-none"
      >
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {/* normal items */}
          {navItems.map((item) => (
            <motion.div key={item.label} whileHover={{ x: 4 }}>
              <NavLink
                to={item.to}
                end={item.to === "/app"}
                onClick={handleChildClick}
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

          {/* settings as single entity */}
          <motion.div whileHover={{ x: 4 }}>
            <NavLink
              to="/app/settings"
              onClick={handleChildClick}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold bg-white shadow-sm border-r-4 border-tertiary"
                    : "text-secondary hover:bg-white hover:shadow-sm"
                }`
              }
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </NavLink>
          </motion.div>

          {/* loans dropdown only */}
          <div className="mt-2 space-y-1">
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => toggleMenu("Loans")}
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-secondary transition-all duration-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Banknote size={20} />
                <span className="text-sm font-medium">Loans</span>
              </div>

              <motion.span
                animate={{ rotate: openMenus["Loans"] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {openMenus["Loans"] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden ml-4 space-y-1"
                >
                  {loanItems.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.to}
                      end={child.to === "/app/loans"}
                      onClick={handleChildClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                          isActive
                            ? "bg-white text-primary font-bold shadow-sm border-r-4 border-tertiary"
                            : "text-secondary hover:bg-white hover:shadow-sm"
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
