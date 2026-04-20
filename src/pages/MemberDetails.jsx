import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  PlusCircle,
  Mail,
  PhoneCall,
  MapPin,
  Zap,
  TrendingUp,
  PiggyBank,
  Landmark,
  Gift,
  Lock,
  ArrowUpRight,
  Headset,
  Bell,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const colors = {
  primary: "#162839",
  container: "#2C3E50",
  surface: "#f7f9ff",
  surfaceLow: "#edf4ff",
  surfaceHigh: "#d1e4fb",
  accent: "#ffb961",
  tertiary: "#ffddb9",
  onSurface: "#43474c",
};

export default function MemberDetails() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (

        <>
          {/* Dashboard Header */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-on-surface text-[10px] md:text-[11px] mb-4 uppercase tracking-[0.2em] font-bold">
                <span className="opacity-60">Members</span>
                <ChevronRight size={12} className="opacity-40" />
                <span className="text-primary-navy">Profile Details</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-navy tracking-tight leading-tight">
                John M. Mutua
              </h1>
              <p className="text-on-surface mt-2 font-medium">
                Member ID: MV-8923-OIL • Premium Tier
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex-1 md:flex-none bg-white text-primary-navy px-6 py-3 font-bold flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                <Edit size={18} />
                Edit Profile
              </button>
              <button className="flex-1 md:flex-none bg-primary-navy text-white px-6 py-3 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md">
                <PlusCircle size={18} />
                New Contribution
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Profile Info Sidebar (Span 4) */}
            <div className="xl:col-span-4 space-y-8">
              <div className="bg-white p-8 shadow-sm border border-slate-100 ring-1 ring-slate-900/5">
                <div className="relative w-32 h-32 mx-auto mb-8 group">
                  <div className="absolute inset-0 bg-primary-navy/10 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYs8lt-NDvhiXTtmyfBvW0Dm64FvUK30_NBkr_Bv-LvlPu2it5gNI4X0zoxocZWslHW0aBvsU2ZkUVv0V9f_X8lR7H4N82KOrm9emh9RnjDk3SzBHPNG8NV5n87fttX5MrvpOgysY7tOFrCzmxwHh2aVvDE3Oe7_GHUE4na9465D46xDcjYssTi7tTy-IWt2WDEmjQAibD-GHRTNqhjDBXvgQ1KzuRSh0isMCZQVyQdz5bU6QSBBshRUrE5MV_j8a3CyEVBRuk0Sew"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-sm grayscale contrast-125 border-4 border-white shadow-inner"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent-safety-orange rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <Zap
                      size={14}
                      className="text-primary-navy fill-primary-navy"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2 mb-10">
                  <h3 className="font-serif text-3xl font-bold text-primary-navy">
                    Senior Supervisor
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Industrial Processing Plant A
                  </p>
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-100">
                  <ContactItem
                    icon={<Mail size={18} />}
                    label="Email Address"
                    value="john.mutua@mvitaoils.com"
                  />
                  <ContactItem
                    icon={<PhoneCall size={18} />}
                    label="Phone Number"
                    value="+254 712 345 678"
                  />
                  <ContactItem
                    icon={<MapPin size={18} />}
                    label="Residency"
                    value="Mombasa, Industrial Area"
                  />
                </div>
              </div>

              {/* Loan Eligibility Card */}
              <div className="bg-primary-container-slate p-8 text-white relative overflow-hidden group shadow-xl">
                <div className="relative z-10">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50 mb-6">
                    Loan Eligibility
                  </h4>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl font-serif font-black">2.4M</span>
                    <span className="text-xs font-bold text-white/60">
                      KES Available
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-accent-safety-orange h-full"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 mt-4 font-bold italic tracking-wider">
                    Based on current multiplier of 3.0x savings
                  </p>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-5 transform rotate-12 transition-transform duration-700 group-hover:scale-110">
                  <TrendingUp size={160} />
                </div>
              </div>
            </div>

            {/* Financial Content Area (Span 8) */}
            <div className="xl:col-span-8 space-y-8">
              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard
                  icon={<PiggyBank size={24} className="text-primary-navy" />}
                  label="TOTAL SAVINGS"
                  value="842,500"
                  sub="KES"
                  trend="+12% vs last quarter"
                  theme="blue-light"
                />
                <StatCard
                  icon={<Landmark size={24} className="text-primary-navy" />}
                  label="ACTIVE LOANS"
                  value="1.2M"
                  sub="KES"
                  trend="Next due: Oct 15th"
                  theme="blue-heavy"
                />
                <StatCard
                  icon={<TrendingUp size={24} className="text-primary-navy" />}
                  label="DIVIDENDS '23"
                  value="104,200"
                  sub="KES"
                  trend="Payable Jan 2024"
                  theme="orange"
                />
              </div>

              {/* Transaction Tabs Container */}
              <div className="bg-white shadow-sm border border-slate-100 ring-1 ring-slate-900/5">
                <div className="flex border-b border-slate-100 px-4 md:px-8">
                  <button className="px-4 md:px-6 py-6 border-b-2 border-primary-navy text-primary-navy font-black text-xs md:text-sm tracking-widest uppercase">
                    Recent Transactions
                  </button>
                  <button className="px-4 md:px-6 py-6 text-slate-400 font-bold text-xs md:text-sm tracking-widest uppercase hover:text-primary-navy transition-colors">
                    Loan History
                  </button>
                  <button className="px-4 md:px-6 py-6 text-slate-400 font-bold text-xs md:text-sm tracking-widest uppercase hover:text-primary-navy transition-colors">
                    Beneficiaries
                  </button>
                </div>

                <div className="p-4 md:p-8">
                  <div className="space-y-4">
                    <TransactionItem
                      icon={<PlusCircle className="text-blue-500" />}
                      title="Monthly Contribution"
                      meta="Sept 28, 2023 • M-Pesa Ref: QK29J8K9"
                      amount="+ 25,000.00"
                      status="Completed"
                    />
                    <TransactionItem
                      icon={<CreditCard className="text-slate-500" />}
                      title="Loan Repayment"
                      meta="Sept 15, 2023 • Payroll Deduction"
                      amount="- 42,500.00"
                      status="Completed"
                      negative
                    />
                    <TransactionItem
                      icon={<Gift className="text-accent-safety-orange" />}
                      title="Christmas Hamper Fund"
                      meta="Sept 05, 2023 • Internal Transfer"
                      amount="+ 2,500.00"
                      status="Bonus"
                      isBonus
                    />
                  </div>

                  <button className="w-full mt-10 py-5 border-2 border-dashed border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 hover:border-primary-navy/20 transition-all">
                    View All Statement Records
                  </button>
                </div>
              </div>

              {/* Footer Grid Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface-low p-8 border border-slate-100 shadow-sm">
                  <h4 className="font-serif text-2xl font-bold text-primary-navy mb-8">
                    Guarantorship Status
                  </h4>
                  <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Risk Exposure</span>
                    <span className="text-primary-navy">Low (15%)</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-primary-navy w-[15%]" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    Currently guaranteeing 2 members (Sarah W. and Kevin O.) for
                    a total of{" "}
                    <span className="text-primary-navy font-bold">
                      KES 450,000
                    </span>
                    .
                  </p>
                </div>

                <div className="bg-primary-navy p-8 text-white relative shadow-lg group overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                      <Lock size={20} className="text-accent-safety-orange" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold">
                      Security Vault
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
                    Access your secure documents, certificates, and digital
                    shares ledger.
                  </p>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                    Enter Vault
                    <ArrowUpRight size={16} />
                  </button>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>
        </>
    

     
  
  );
}



function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-12 h-12 bg-surface-low border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary-navy group-hover:bg-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-primary-navy group-hover:translate-x-1 transition-transform">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, trend, theme }) {
  const themes = {
    "blue-light": "bg-surface-low",
    "blue-heavy": "bg-surface-high",
    orange: "bg-tertiary-fixed border-b-4 border-accent-safety-orange",
  };

  return (
    <div
      className={`${themes[theme]} p-8 h-44 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 bg-white/80 rounded-sm flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <span className="text-[9px] font-black bg-white/60 px-2 py-1 text-primary-navy tracking-widest">
          {label}
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-serif font-black text-primary-navy">
            {value}
          </span>
          <span className="text-[10px] font-bold text-primary-navy/60">
            {sub}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-bold tracking-wide mt-1">
          {trend}
        </p>
      </div>
    </div>
  );
}

function TransactionItem({
  icon,
  title,
  meta,
  amount,
  status,
  negative = false,
  isBonus = false,
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-primary-navy">
      <div className="flex items-center gap-5">
        <div
          className={`w-14 h-14 bg-white shadow-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110`}
        >
          {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
        </div>
        <div>
          <h5 className="font-bold text-primary-navy group-hover:text-accent-safety-orange transition-colors">
            {title}
          </h5>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
            {meta}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-xl font-serif font-black ${negative ? "text-red-500" : "text-primary-navy"}`}
        >
          {amount}
        </p>
        <p
          className={`text-[9px] uppercase font-black tracking-widest mt-1 ${isBonus ? "text-accent-safety-orange" : "text-slate-400"}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
