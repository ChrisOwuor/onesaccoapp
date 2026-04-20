/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Search,
  Bell,
  HelpCircle,
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  ArrowUpFromLine,
  BarChart3,
  UserCog,
  Settings,
  LogOut,
  Download,
  UserPlus,
  TrendingUp,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";

export default function Members() {
  const members = [
    {
      name: "Samuel K. Otieno",
      id: "MV-9402-ENG",
      node: "Unit 04: Mombasa Central",
      assets: "KES 842,500",
      allocation: 75,
      status: "Active",
      avatar: "https://picsum.photos/seed/engineer1/100/100",
    },
    {
      name: "Fatima Zahra",
      id: "MV-1185-LOG",
      node: "Unit 09: Kilindini Port",
      assets: "KES 1,240,000",
      allocation: 90,
      status: "Active",
      avatar: "https://picsum.photos/seed/manager1/100/100",
    },
    {
      name: "David Chen",
      id: "MV-4421-SUP",
      node: "Unit 02: Pwani Refinery",
      assets: "KES 45,200",
      allocation: 15,
      status: "On Probation",
      avatar: "https://picsum.photos/seed/worker1/100/100",
    },
    {
      name: "Linda Muthoni",
      id: "MV-0042-DIR",
      node: "Corporate HQ",
      assets: "KES 4,120,000",
      allocation: 100,
      status: "Active",
      avatar: "https://picsum.photos/seed/exec1/100/100",
    },
    {
      name: "Hassan Omar",
      id: "MV-8821-MNT",
      node: "Unit 11: Export Hub",
      assets: "KES 215,600",
      allocation: 45,
      status: "Suspended",
      avatar: "https://picsum.photos/seed/specialist1/100/100",
    },
  ];

  return (
    <>
      {/* Main Content Area */}

      <>
        {/* Hero Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
              Refinery Network
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
              Member Registry
            </h1>
            <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
              Centralized directory of all industrial partners and refinery
              personnel within the Mvita Oils Sacco ecosystem.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export List
            </button>
            <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Onboard Member
            </button>
          </div>
        </header>

        {/* Registry Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-surface-container overflow-hidden"
        >
          <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-surface-container bg-slate-50/50">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                  <option>All Categories</option>
                  <option>Refinery Staff</option>
                  <option>Logistics Partners</option>
                  <option>Equity Members</option>
                </select>
              </div>
              <div className="relative flex-1 md:w-48">
                <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                  <option>Status: All</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing 1-10 of 1,482 members
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 text-slate-500">
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Partner Identity
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Refinery Node
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Asset Allocation
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Compliance Status
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm">
                          <img
                            alt={member.name}
                            className="w-full h-full object-cover"
                            src={member.avatar}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-primary group-hover:text-tertiary transition-colors text-sm">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter mt-0.5">
                            {member.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-surface-container text-primary text-[9px] font-black uppercase tracking-widest rounded border border-primary/5 shadow-sm">
                        {member.node}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="space-y-1">
                        <p className="text-[13px] font-serif font-black text-primary">
                          {member.assets}
                        </p>
                        <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${member.allocation}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                            }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                          member.status === "Active"
                            ? "text-emerald-600"
                            : member.status === "Suspended"
                              ? "text-red-600"
                              : "text-tertiary"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === "Active"
                              ? "bg-emerald-500"
                              : member.status === "Suspended"
                                ? "bg-red-500"
                                : "bg-tertiary"
                          } animate-pulse`}
                        ></span>
                        {member.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
            <button
              className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-lg bg-primary text-white font-black text-xs shadow-lg shadow-primary/20">
                1
              </button>
              <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
                2
              </button>
              <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
                3
              </button>
              <span className="px-2 text-slate-300 font-bold">...</span>
              <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
                148
              </button>
            </div>
            <button className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Footer Compliance Note */}
        <footer className="mt-16 py-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
              Authorized Security Access Only | 256-Bit Industrial Encryption
            </p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2024 Mvita Oils Sacco. All industrial data protected.
          </p>
        </footer>
      </>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 h-16 w-16 bg-tertiary text-white rounded-2xl shadow-2xl shadow-tertiary/20 flex items-center justify-center z-50 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </>
  );
}

function NavItem({ icon: Icon, label, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative ${
        active
          ? "text-primary font-black bg-surface-container-low shadow-sm translate-x-1"
          : "text-slate-500 hover:text-primary hover:bg-surface-container-low/50 hover:translate-x-1"
      }`}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-tertiary rounded-l-full"
        />
      )}
      <Icon
        className={`w-5 h-5 ${active ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}
      />
      <span className="text-sm font-semibold tracking-tight">{label}</span>
    </a>
  );
}

function StatCard({
  label,
  value,
  trend = null,
  trendIcon: TrendIcon = null,
  description = null,
  dark = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-7 rounded-2xl shadow-sm border border-surface-container relative overflow-hidden h-full flex flex-col justify-between transition-all ${
        dark
          ? "bg-primary text-white shadow-xl shadow-primary/20"
          : "bg-white text-primary"
      }`}
    >
      {/* Decorative Background Element */}
      <div
        className={`absolute top-0 right-0 w-16 h-1 w-full opacity-10 ${
          label === "Total Partners"
            ? "bg-tertiary"
            : label === "Active Savings"
              ? "bg-primary"
              : "bg-slate-300"
        }`}
      />

      <div>
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${dark ? "text-white/60" : "text-slate-400"}`}
        >
          {label}
        </p>
        <p
          className={`text-3xl font-serif font-black tracking-tight mb-2 ${dark ? "text-white" : "text-primary"}`}
        >
          {value}
        </p>
      </div>

      <div className="mt-4">
        {trend && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase tracking-wider">
            {TrendIcon && <TrendIcon className="w-3.5 h-3.5" />}
            {trend}
          </div>
        )}
        {description && (
          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-white/80" : "text-slate-400"}`}
          >
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
