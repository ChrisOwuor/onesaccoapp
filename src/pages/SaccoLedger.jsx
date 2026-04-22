import React from "react";
import { motion } from "motion/react";
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Wallet,
  Landmark,
  HandCoins,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

const LedgerRow = ({
  date,
  refId,
  account,
  channel,
  description,
  amount,
  status,
}) => {
  const statusStyles = {
    COMPLETED: "text-emerald-600",
    PROCESSING: "text-amber-600",
    FLAGGED: "text-red-600",
    PENDING: "text-tertiary",
  };

  const dotStyles = {
    COMPLETED: "bg-emerald-500",
    PROCESSING: "bg-amber-500",
    FLAGGED: "bg-red-500",
    PENDING: "bg-tertiary",
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="hover:bg-slate-50/80 transition-colors group"
    >
      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary">{date}</p>
          <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tight">
            {refId}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary">{account}</p>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
            {channel}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <p className="text-[13px] font-serif font-black text-primary">
          {description}
        </p>
      </td>

      <td className="px-4 py-3">
        <p className="text-sm font-black text-primary text-right">{amount}</p>
      </td>

      <td className="px-4 py-3">
        <div
          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${statusStyles[status]}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${dotStyles[status]} animate-pulse`}
          ></span>
          {status}
        </div>
      </td>

      <td className="px-4 py-3 text-right">
        <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </motion.tr>
  );
};

export default function SaccoLedger() {
  const ledgerRows = [
    {
      date: "24 Oct 2023",
      refId: "GL-TRX-9920110",
      account: "M-Pesa Collection",
      channel: "Mobile Money",
      description: "Loan disbursement to member account",
      amount: "KES 45,000.00",
      status: "COMPLETED",
    },
    {
      date: "23 Oct 2023",
      refId: "GL-TRX-9920109",
      account: "Equity Bank Main",
      channel: "Bank Deposit",
      description: "Member savings contribution settlement",
      amount: "KES 120,000.00",
      status: "COMPLETED",
    },
    {
      date: "23 Oct 2023",
      refId: "GL-TRX-9920108",
      account: "Operations Float",
      channel: "Internal Transfer",
      description: "Branch maintenance and logistics expense",
      amount: "KES 4,500.00",
      status: "PROCESSING",
    },
    {
      date: "22 Oct 2023",
      refId: "GL-TRX-9920107",
      account: "Main Ledger Control",
      channel: "Reconciliation",
      description: "Unmatched C2B settlement under review",
      amount: "KES 82,400.00",
      status: "FLAGGED",
    },
    {
      date: "21 Oct 2023",
      refId: "GL-TRX-9920106",
      account: "Loan Recovery Pool",
      channel: "Standing Order",
      description: "Monthly loan repayment inflow",
      amount: "KES 63,200.00",
      status: "COMPLETED",
    },
  ];

  const accountSummary = [
    {
      name: "M-Pesa Float",
      value: "KES 4.82M",
      icon: Wallet,
      trend: "+4.2%",
      positive: true,
    },
    {
      name: "Bank Reserve",
      value: "KES 12.45M",
      icon: Landmark,
      trend: "+1.8%",
      positive: true,
    },
    {
      name: "Savings Pool",
      value: "KES 18.20M",
      icon: PiggyBank,
      trend: "+7.1%",
      positive: true,
    },
    {
      name: "Loans Receivable",
      value: "KES 8.12M",
      icon: HandCoins,
      trend: "-2.4%",
      positive: false,
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="mb-10 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
              Financial Control Desk
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
              Sacco Ledger
            </h1>

            <p className="text-secondary/80 max-w-2xl text-lg font-medium leading-relaxed">
              Centralized oversight of sacco financial movements across member
              savings, bank reserves, loan disbursements, and mobile money
              channels.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap pt-2">
            <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export Ledger
            </button>
            <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Entry
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-primary text-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header (smaller now) */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                Accounts
              </p>
              <h3 className="text-sm font-serif font-black text-white">
                Balance Snapshot
              </h3>
            </div>

            <p className="text-[11px] font-black text-white/70">KES 43.59M</p>
          </div>

          {/* Compact List */}
          <div className="divide-y divide-white/10">
            {accountSummary.map((item) => {
              const Icon = item.icon;
              const TrendIcon = item.positive ? TrendingUp : TrendingDown;

              return (
                <div
                  key={item.name}
                  className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                >
                  {/* Left */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white truncate">
                        {item.name}
                      </p>
                      <div
                        className={`mt-0.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${
                          item.positive ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        <TrendIcon className="w-3 h-3" />
                        {item.trend}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-serif font-black text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </header>

      {/* Ledger Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-surface-container overflow-hidden"
      >
        {/* Filters */}
        <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-surface-container bg-slate-50/50">
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:w-56">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>All Accounts</option>
                <option>Bank Ledger</option>
                <option>M-Pesa Ledger</option>
                <option>Loan Ledger</option>
                <option>Savings Ledger</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>Status: All</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Flagged</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="relative flex-1 min-w-[280px] md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ref, account or description..."
              className="w-full bg-white border border-surface-container py-2 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Table Meta */}
        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing 5 of 1,248 ledger transactions
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Entry Date
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Ledger Account
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Transaction Narrative
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Amount
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {ledgerRows.map((row, index) => (
                <LedgerRow key={index} {...row} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 font-black text-xs">
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
              12
            </button>
          </div>

          <button className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
            Next
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 py-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
            Authorized Financial Access Only | 256-Bit Ledger Security
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 Mvita Oils Sacco. All financial records protected.
        </p>
      </footer>
    </>
  );
}
