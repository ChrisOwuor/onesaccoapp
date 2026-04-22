import React from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Plus,
  Download,
  MoreVertical,
  BadgePercent,
  Clock3,
  Wallet,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const loanProducts = [
  {
    id: 1,
    name: "Emergency Loan",
    code: "LP-001",
    description:
      "Short-term credit facility for urgent personal or household needs.",
    interestRate: "8%",
    maxAmount: "KES 50,000",
    term: "6 Months",
    status: "ACTIVE",
    eligibility: "Active member for 3+ months",
  },
  {
    id: 2,
    name: "Development Loan",
    code: "LP-002",
    description:
      "Medium-term loan designed for business growth, school fees, or asset purchase.",
    interestRate: "12%",
    maxAmount: "KES 300,000",
    term: "24 Months",
    status: "ACTIVE",
    eligibility: "Consistent savings history required",
  },
  {
    id: 3,
    name: "Salary Advance",
    code: "LP-003",
    description: "Quick access facility against expected monthly income.",
    interestRate: "5%",
    maxAmount: "KES 20,000",
    term: "1 Month",
    status: "ACTIVE",
    eligibility: "Available to salaried members only",
  },
  {
    id: 4,
    name: "School Fees Loan",
    code: "LP-004",
    description:
      "Flexible education support facility for school and college fee payments.",
    interestRate: "10%",
    maxAmount: "KES 150,000",
    term: "12 Months",
    status: "REVIEW",
    eligibility: "Guarantors may be required",
  },
];

const statusStyles = {
  ACTIVE: "text-emerald-600 bg-emerald-50",
  REVIEW: "text-amber-600 bg-amber-50",
  INACTIVE: "text-slate-500 bg-slate-100",
};

export default function LoanProducts() {
  return (
    <>
      {/* Header */}
      <header className="mb-10 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
              Credit Services
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
              Loan Products
            </h1>

            <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
              Browse available loan facilities, compare terms, and submit
              customer loan requests from a single credit products workspace.
            </p>
          </motion.div>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export Products
            </button>

            <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Product
            </button>
          </div>
        </div>

        {/* Right Summary */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-primary text-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
              Product Metrics
            </p>
            <h3 className="mt-1 text-sm font-serif font-black text-white">
              Lending Snapshot
            </h3>
          </div>

          <div className="divide-y divide-white/10">
            <div className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white truncate">
                    Active Products
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-serif font-black text-white">03</p>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <BadgePercent className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white truncate">
                    Best Rate
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-sky-300">
                    Monthly
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-serif font-black text-white">5%</p>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <Clock3 className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white truncate">
                    Longest Term
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-300">
                    Product Window
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-serif font-black text-white">24M</p>
              </div>
            </div>
          </div>
        </motion.div>
      </header>



      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-surface-container overflow-hidden"
      >
        {/* Filters */}
        <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-surface-container bg-slate-50/50">
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:w-56">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>All Products</option>
                <option>Active Products</option>
                <option>Under Review</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>Sort: Latest</option>
                <option>Highest Amount</option>
                <option>Lowest Interest</option>
              </select>
            </div>
          </div>

          <div className="relative flex-1 min-w-[280px] md:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by product name or code..."
              className="w-full bg-white border border-surface-container py-2.5 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Meta */}
        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {loanProducts.length} loan products
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Product
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Code
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Interest
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Max Amount
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Term
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loanProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-bold text-primary text-sm">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">
                        {product.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tight">
                      {product.code}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-black text-primary">
                      {product.interestRate}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-black text-primary">
                      {product.maxAmount}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-primary">
                      {product.term}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusStyles[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-50 hover:bg-slate-100 text-primary transition-colors">
                        Request
                      </button>
                      <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 py-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
            Authorized Credit Access Only | Product Terms Subject To Approval
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 Mvita Oils Sacco. All lending products protected.
        </p>
      </footer>
    </>
  );
}
