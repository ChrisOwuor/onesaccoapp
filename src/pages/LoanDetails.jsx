import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Download,
  PlusCircle,
  Factory,
  Shield,
  ArrowLeft,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const MetricCard = ({ label, value }) => (
  <div className="bg-surface-container-low p-6">
    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
      {label}
    </p>
    <p className="font-headline text-xl text-primary">{value}</p>
  </div>
);

const GuarantorCard = ({ initials, name, id, amount, highlight = false }) => (
  <div
    className={`bg-surface-container-low p-4 flex items-center space-x-4 border-l-4 ${highlight ? "border-primary" : "border-primary/40"}`}
  >
    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary font-bold">
      {initials}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-primary leading-tight">{name}</p>
      <p className="text-[10px] text-on-surface-variant">ID: {id}</p>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-primary">KES {amount}</p>
      <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">
        Guaranteed
      </p>
    </div>
  </div>
);

export default function LoanDetails() {
  const profileAvatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVNZETCJqWjSeaNan0dGAhbq-wGs7EZ5C2pbhszy1Oe8FOiyNgwuPUs5c2mFwXAEVWjp7cVrftTcGMPrXu1e1EElJQKDu9eXJCwNe_RLvnUZPvq81tIWdybwH3KyDs5xbivPcHutihbyvKPLtH5hNdba18JVjQLNNOOBz8X_vOb2kGVmNg60rqgvyt80_VOHKU4biYYcdmhUEGF3AnYUsBtaxxupghRdr7HC712kxrlDdF3v32unWZeP0-eUWxjL8wDlaYrtWy0Al5";

  return (
    <div>
      {/* Sidebar - Desktop */}

      {/* Main Content Area */}
      <div>
        {/* Content */}
        <main className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-surface-container-lowest p-5 md:p-6 flex flex-col justify-between relative overflow-hidden shadow-sm rounded-lg border border-white/10">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="bg-industrial-highlight text-[#2b1700] font-bold px-3 py-1 text-[10px] tracking-[0.2em] rounded-sm">
                      ACTIVE
                    </span>
                    <span className="text-on-surface-variant font-mono text-xs">
                      #MVI-LN-2023-8942
                    </span>
                  </div>

                  <h2 className="text-xl md:text-3xl font-headline font-bold text-primary leading-tight">
                    Loan Details:{" "}
                    <span className="text-on-surface-variant">
                      Asset Financing
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-on-surface-variant max-w-md leading-relaxed">
                    Loan issued to David Mwangi for the acquisition of
                    industrial oil processing machinery.
                  </p>

                  {/* Compact Metrics */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        Start Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        15 Jan 2023
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        End Date
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        15 Jan 2025
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        Last Payment
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        12 Oct 2023
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        Next Due
                      </p>
                      <p className="mt-1 text-sm font-semibold text-industrial-highlight">
                        15 Nov 2023
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 relative z-10">
                  <button className="px-6 py-3 bg-primary text-white font-bold text-sm rounded shadow-sm hover:translate-y-[-2px] transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Statement
                  </button>

                  <button className="px-6 py-3 border border-primary text-primary font-bold text-sm rounded hover:bg-primary-container/5 transition-all flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Request Top-up
                  </button>
                </div>

                {/* Background Decor */}
                <Factory className="absolute right-0 bottom-0 text-primary/5 w-40 h-40 -mr-8 -mb-8 pointer-events-none" />
              </div>

              {/* Summary Cards */}
              <div className="bg-primary-container text-on-primary-container p-4 flex flex-col justify-center space-y-6 shadow-sm rounded-lg border border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                    Principal Amount
                  </p>
                  <p className="text-2xl font-headline font-bold text-white">
                    KES 1,250,000
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                    Remaining Balance
                  </p>
                  <p className="text-2xl font-headline font-bold text-[#ffb961]">
                    KES 485,200
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">
                      Interest Rate
                    </p>
                    <p className="font-bold text-white">12.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">
                      Duration
                    </p>
                    <p className="font-bold text-white">24 Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              {/* Repayment Schedule */}
              <div className="xl:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-headline font-bold text-primary">
                    Repayment Schedule
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium">
                    10 of 24 Installments Paid
                  </span>
                </div>

                <div className="overflow-x-auto bg-surface-container-lowest rounded-sm shadow-sm border border-outline-variant/5">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
                        <th className="px-6 py-4 font-bold text-xs">#</th>
                        <th className="px-6 py-4 font-bold text-xs">
                          Due Date
                        </th>
                        <th className="px-6 py-4 font-bold text-xs">
                          Principal
                        </th>
                        <th className="px-6 py-4 font-bold text-xs">
                          Interest
                        </th>
                        <th className="px-6 py-4 font-bold text-xs text-right">
                          Total
                        </th>
                        <th className="px-6 py-4 font-bold text-xs text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-outline-variant/10">
                      {[
                        {
                          id: "08",
                          date: "15 Aug 2023",
                          p: "52,083",
                          i: "13,020",
                          t: "65,103",
                          s: "PAID",
                        },
                        {
                          id: "09",
                          date: "15 Sep 2023",
                          p: "52,083",
                          i: "12,478",
                          t: "64,561",
                          s: "PAID",
                        },
                        {
                          id: "10",
                          date: "15 Oct 2023",
                          p: "52,083",
                          i: "11,935",
                          t: "64,018",
                          s: "PENDING",
                        },
                        {
                          id: "11",
                          date: "15 Nov 2023",
                          p: "52,083",
                          i: "11,392",
                          t: "63,475",
                          s: "UPCOMING",
                        },
                        {
                          id: "12",
                          date: "15 Dec 2023",
                          p: "52,083",
                          i: "10,849",
                          t: "62,932",
                          s: "UPCOMING",
                        },
                      ].map((row, idx) => (
                        <tr
                          key={row.id}
                          className={
                            row.s === "PENDING"
                              ? "bg-surface-container-low/50"
                              : row.s === "UPCOMING"
                                ? "opacity-60"
                                : ""
                          }
                        >
                          <td className="px-6 py-4 text-on-surface-variant font-mono">
                            {row.id}
                          </td>
                          <td className="px-6 py-4 font-medium">{row.date}</td>
                          <td className="px-6 py-4 text-on-surface-variant">
                            {row.p}
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant">
                            {row.i}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-primary">
                            {row.t}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.s === "PAID"
                                  ? "bg-green-100 text-green-800"
                                  : row.s === "PENDING"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-surface-container text-on-surface-variant"
                              }`}
                            >
                              {row.s}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Guarantors */}
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold text-primary">
                  Loan Guarantors
                </h3>
                <div className="space-y-3">
                  <GuarantorCard
                    initials="SM"
                    name="Sarah Muthoni"
                    id="MVA-7721"
                    amount="300,000"
                    highlight
                  />
                  <GuarantorCard
                    initials="JK"
                    name="John Kamau"
                    id="MVA-4490"
                    amount="250,000"
                  />
                  <GuarantorCard
                    initials="AN"
                    name="Alice Njeri"
                    id="MVA-1209"
                    amount="700,000"
                  />
                </div>

                {/* Risk Indicator */}
                <div className="mt-6 p-4 bg-tertiary/5 rounded-sm border border-tertiary-fixed-dim/20 flex gap-3">
                  <Shield className="w-5 h-5 text-tertiary shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-tertiary">
                      Guarantor Risk Level: Low
                    </p>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">
                      Total collateral coverage exceeds loan value by 1.2x.
                      Asset remains under lien by Mvita Oils Sacco.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        {/* Footer Compliance Note */}
        <footer className="mt-16 py-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
              Authorized Security Access Only | 256-Bit Industrial Encryption
            </p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Mvita Oils Sacco. All industrial data protected.
          </p>
        </footer>
      </div>
    </div>
  );
}
