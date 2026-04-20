/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  HardHat,
  Factory,
  Users,
  Wallet,
  Banknote,
  Download,
  Bell,
  CircleHelp,
  ChevronRight,
  ShieldAlert,
  Zap,
  Globe,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#091d2e] font-sans selection:bg-industrial-highlight/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#162839]/90 backdrop-blur-md shadow-sm flex justify-between items-center h-16 px-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-xl md:text-2xl font-bold font-serif text-white tracking-tight">
            Mvita Oils Sacco
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-white font-bold border-b-2 border-industrial-gold font-sans text-sm tracking-wide py-1"
            href="#home"
          >
            Home
          </a>
          <a
            className="text-slate-300 hover:text-white transition-colors font-sans text-sm tracking-wide"
            href="#savings"
          >
            Savings
          </a>
          <a
            className="text-slate-300 hover:text-white transition-colors font-sans text-sm tracking-wide"
            href="#loans"
          >
            Loans
          </a>
          <a
            className="text-slate-300 hover:text-white transition-colors font-sans text-sm tracking-wide"
            href="#about"
          >
            About Us
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white opacity-70 hover:opacity-100 p-2 transition-all">
            <Bell size={20} />
          </button>
          <button className="text-white opacity-70 hover:opacity-100 p-2 transition-all">
            <CircleHelp size={20} />
          </button>
          <button className="bg-industrial-highlight text-[#663e00] px-5 py-2 text-xs font-bold rounded-lg uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-industrial-highlight/20">
         <a href="/login">
            Portal Login
            </a>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#162839]"
        >
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              src="https://picsum.photos/seed/refinery/1920/1080?grayscale"
              alt="Industrial background"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#162839] via-[#162839]/80 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20">
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 bg-[#583500]/30 border-l-4 border-industrial-highlight">
                <span className="text-industrial-highlight text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                  Forging Financial Security
                </span>
              </div>
              <h1 className="text-6xl md:text-5xl font-black text-white leading-[0.85] tracking-tighter ">
                Industrial <br />
                <span className=" text-industrial-highlight/90">
                  Integrity.
                </span>
              </h1>
              <p className="text-lg md:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
                Precision-engineered financial solutions for the backbone of
                Mvita Oils. We treat your capital with the same rigor you apply
                to manufacturing excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-industrial-highlight text-[#2b1700] px-8 py-4 font-bold rounded-md flex items-center gap-3 group transition-all hover:scale-105 active:scale-95 shadow-xl shadow-industrial-highlight/20">
                  JOIN THE SACCO
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button className="border border-white/20 text-white px-8 py-4 font-bold rounded-md hover:bg-white/10 transition-all backdrop-blur-sm">
                  VIEW DIVIDENDS
                </button>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block lg:col-span-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-xl border border-white/10 shadow-2xl space-y-8">
                <h3 className="text-white font-serif text-3xl font-semibold border-b border-white/10 pb-4">
                  Current Yields
                </h3>
                <div className="space-y-8">
                  <div className="flex justify-between items-end group">
                    <span className="text-slate-400 text-xs uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                      Savings ROI
                    </span>
                    <span className="text-4xl font-serif text-industrial-highlight font-bold">
                      12.4%
                    </span>
                  </div>
                  <div className="flex justify-between items-end group">
                    <span className="text-slate-400 text-xs uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                      Loan Interest
                    </span>
                    <span className="text-4xl font-serif text-white font-bold">
                      0.85%
                    </span>
                  </div>
                  <div className="flex justify-between items-end group">
                    <span className="text-slate-400 text-xs uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                      Asset Base
                    </span>
                    <span className="text-2xl font-serif text-white font-medium">
                      KSh 4.2B+
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Ticker */}
        <div className="bg-[#edf4ff] border-y border-slate-200/50 py-6 overflow-hidden">
          <motion.div
            className="container mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 md:gap-x-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <Factory size={18} className="text-[#162839]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4b6076]">
                Industrial Standard Compliance
              </span>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#162839]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4b6076]">
                Secured by Structural Reserves
              </span>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <TrendingUp size={18} className="text-[#162839]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4b6076]">
                Quarterly Growth: +14.2%
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Ecosystem */}
        <section id="savings" className="py-24 md:py-32 bg-white px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-[#162839] mb-6 font-serif">
                Core Ecosystem
              </h2>
              <div className="w-32 h-2 bg-industrial-highlight"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Savings Card */}
              <motion.div
                className="md:col-span-8 bg-[#d1e4fb] p-8 md:p-14 rounded-xl flex flex-col justify-between group overflow-hidden relative min-h-[450px]"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative z-10">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#162839] uppercase mb-6 block">
                    Asset Accumulation
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif font-black text-[#162839] mb-8 leading-tight">
                    Heavy Industry <br /> Savings Protocols
                  </h3>
                  <p className="text-[#43474c] max-w-md leading-relaxed text-lg">
                    Scalable savings plans designed for industrial workers. From
                    daily wages to corporate bonuses, our vaults ensure your
                    capital appreciates with industrial stability.
                  </p>
                </div>
                <div className="relative z-10 mt-12">
                  <button className="bg-[#162839] text-white px-8 py-4 rounded-md flex items-center gap-3 font-bold hover:gap-6 transition-all shadow-xl shadow-blue-900/20">
                    EXPLORE PLANS <TrendingUp size={20} />
                  </button>
                </div>
                <div className="absolute right-[-5%] bottom-[-10%] opacity-15 transition-transform duration-700 group-hover:scale-110">
                  <Banknote
                    size={400}
                    className="text-[#162839]"
                    strokeWidth={0.5}
                  />
                </div>
              </motion.div>

              {/* Loans Card */}
              <motion.div
                className="md:col-span-4 bg-[#162839] text-white p-8 md:p-14 rounded-xl flex flex-col justify-between min-h-[450px] shadow-2xl"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-industrial-highlight/80 uppercase mb-6 block">
                    Liquidity Access
                  </span>
                  <h3 className="text-3xl font-serif font-black mb-8 leading-tight">
                    Machinery & <br /> Asset Financing
                  </h3>
                  <ul className="space-y-6 text-slate-300">
                    <li className="flex items-center gap-3 group">
                      <ShieldCheck
                        size={20}
                        className="text-industrial-highlight"
                      />
                      <span className="group-hover:text-white transition-colors">
                        Instant Mobile Loans
                      </span>
                    </li>
                    <li className="flex items-center gap-3 group">
                      <ShieldCheck
                        size={20}
                        className="text-industrial-highlight"
                      />
                      <span className="group-hover:text-white transition-colors">
                        Vehicle Acquisition
                      </span>
                    </li>
                    <li className="flex items-center gap-3 group">
                      <ShieldCheck
                        size={20}
                        className="text-industrial-highlight"
                      />
                      <span className="group-hover:text-white transition-colors">
                        Project Development
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  id="loans"
                  className="border border-white/20 hover:border-industrial-highlight hover:text-industrial-highlight px-6 py-4 font-bold rounded-md transition-all mt-12 bg-white/5"
                >
                  APPLY FOR CREDIT
                </button>
              </motion.div>

              {/* Welfare Card */}
              <motion.div
                className="md:col-span-4 bg-[#edf4ff] p-8 md:p-14 rounded-xl flex flex-col justify-between min-h-[450px] border border-slate-200"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div>
                  <Users
                    size={48}
                    strokeWidth={1.5}
                    className="text-[#162839] mb-8"
                  />
                  <h3 className="text-3xl font-serif font-black text-[#162839] mb-6 leading-tight">
                    Welfare & <br /> Insurance
                  </h3>
                  <p className="text-[#43474c] leading-relaxed text-lg">
                    Beyond finance, we provide a safety net. Comprehensive
                    industrial risk coverage for you and your kin.
                  </p>
                </div>
                <a
                  className="text-[#162839] font-bold flex items-center gap-3 group mt-12 text-sm tracking-widest uppercase"
                  href="#"
                >
                  VIEW BENEFITS{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </a>
              </motion.div>

              {/* Industrial Partners */}
              <motion.div
                className="md:col-span-8 bg-white border border-slate-200 p-8 md:p-14 rounded-xl flex flex-col justify-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-12 py-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <span className="text-[#162839] font-serif text-xl md:text-3xl font-black tracking-tighter">
                    MVITA ENERGY
                  </span>
                  <span className="text-[#162839] font-serif text-xl md:text-3xl font-black tracking-tighter">
                    COAST REFINERIES
                  </span>
                  <span className="text-[#162839] font-serif text-xl md:text-3xl font-black tracking-tighter">
                    LOGISTICS HUB
                  </span>
                  <span className="text-[#162839] font-serif text-xl md:text-3xl font-black tracking-tighter">
                    FOUNDRY GRP
                  </span>
                </div>
                <div className="relative mt-8 pt-8 border-t border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.5em] font-semibold">
                    Official Financial Partner of the Coastal Industrial Cluster
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section
          id="about"
          className="bg-[#f0f4f8] py-24 md:py-32 relative overflow-hidden"
        >
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-[#162839] overflow-hidden rounded-2xl shadow-3xl group">
                  <img
                    className="w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-[2000ms] group-hover:scale-110"
                    src="https://picsum.photos/seed/engineer/800/800"
                    alt="Industrial worker"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162839] to-transparent opacity-40"></div>
                </div>
                <motion.div
                  className="absolute -bottom-10 -right-4 md:-right-10 bg-white/70 backdrop-blur-2xl p-6 md:p-10 rounded-xl border border-white/40 shadow-2xl max-w-xs"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[#162839] italic font-serif text-xl mb-6 leading-snug">
                    "The structural integrity of this Sacco allows us to build
                    real legacies for our families."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-industrial-gold"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4b6076]">
                      Senior Engineer, Mvita Oils
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="w-20 h-1.5 bg-industrial-highlight"></div>
                  <h2 className="text-5xl md:text-7xl font-black text-[#162839] leading-tight font-serif">
                    Engineered <br /> For Prosperity.
                  </h2>
                  <p className="text-xl text-[#43474c] leading-relaxed font-light">
                    Joining Mvita Oils Sacco isn't just about a bank account.
                    It's about collective bargaining power and high-yield asset
                    management.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3 group">
                    <h4 className="text-xl font-bold text-[#162839] font-serif group-hover:text-industrial-gold transition-colors flex items-center gap-2">
                      <Zap size={18} className="text-industrial-highlight" />{" "}
                      Annual Dividends
                    </h4>
                    <p className="text-sm text-[#50657b] leading-relaxed">
                      Consistent double-digit growth since inception, shared
                      fairly among all members based on participation.
                    </p>
                  </div>
                  <div className="space-y-3 group">
                    <h4 className="text-xl font-bold text-[#162839] font-serif group-hover:text-industrial-gold transition-colors flex items-center gap-2">
                      <Globe size={18} className="text-industrial-highlight" />{" "}
                      Education Loans
                    </h4>
                    <p className="text-sm text-[#50657b] leading-relaxed">
                      Zero-fee processing for school and professional
                      development loans to empower your dependents.
                    </p>
                  </div>
                  <div className="space-y-3 group">
                    <h4 className="text-xl font-bold text-[#162839] font-serif group-hover:text-industrial-gold transition-colors flex items-center gap-2">
                      <ShieldAlert
                        size={18}
                        className="text-industrial-highlight"
                      />{" "}
                      Mortgage Support
                    </h4>
                    <p className="text-sm text-[#50657b] leading-relaxed">
                      Strategic partnerships with industrial developers to
                      provide affordable housing for our members.
                    </p>
                  </div>
                  <div className="space-y-3 group">
                    <h4 className="text-xl font-bold text-[#162839] font-serif group-hover:text-industrial-gold transition-colors flex items-center gap-2">
                      <ShieldCheck
                        size={18}
                        className="text-industrial-highlight"
                      />{" "}
                      Digital Portal
                    </h4>
                    <p className="text-sm text-[#50657b] leading-relaxed">
                      Real-time tracking of your dividends and loan status
                      through our secure industrial-grade portal.
                    </p>
                  </div>
                </div>

                <button className="bg-[#162839] text-white px-10 py-5 font-bold rounded-md shadow-2xl flex items-center gap-4 hover:brightness-125 transition-all group active:scale-95">
                  DOWNLOAD CHARTER (PDF)
                  <Download
                    size={22}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[#162839] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[100px] border-white/5 rounded-full blur-3xl scale-125"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight">
                Ready to Anchor <br /> Your Future?
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light">
                Join over 12,000 industrial professionals who trust Mvita Oils
                Sacco with their financial foundation.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <input
                  className="bg-white/5 border border-white/10 text-white px-8 py-5 rounded-md w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-industrial-gold/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  placeholder="Enter your payroll ID or email"
                  type="email"
                />
                <button className="bg-industrial-highlight text-[#2b1700] px-10 py-5 font-bold rounded-md hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-industrial-highlight/20 whitespace-nowrap">
                  START APPLICATION
                </button>
              </div>
              <p className="text-slate-500 text-xs mt-10 uppercase tracking-[0.4em] font-bold">
                A Licensed Tier 1 Deposit Taking Sacco
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8">
              <span className="text-3xl font-serif font-black text-[#162839] block tracking-tighter leading-none">
                Mvita Oils <br /> Sacco
              </span>
              <p className="text-sm text-[#50657b] leading-relaxed max-w-xs">
                Precision, Integrity, Prosperity. The financial engine of the
                Mvita industrial community since 1994.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#162839] hover:bg-industrial-highlight hover:text-[#2b1700] transition-all cursor-pointer">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-[#162839] uppercase mb-10 border-b border-slate-100 pb-2 inline-block">
                Operations
              </h4>
              <ul className="space-y-5 text-sm text-[#50657b]">
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Savings Schemes
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Loan Products
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Asset Financing
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Welfare Fund
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-[#162839] uppercase mb-10 border-b border-slate-100 pb-2 inline-block">
                Corporate
              </h4>
              <ul className="space-y-5 text-sm text-[#50657b]">
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Bylaws & Governance
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Annual Reports
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Board of Directors
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-industrial-gold transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />{" "}
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-[#f0f4f8] p-8 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold tracking-[0.3em] text-[#162839] uppercase mb-8">
                Industrial Hub
              </h4>
              <address className="not-italic text-sm text-[#50657b] space-y-6">
                <div className="flex gap-3">
                  <div className="text-industrial-gold">
                    <HardHat size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#162839]">
                      Mvita Oils Complex, Gate 4
                    </p>
                    <p>Industrial Area, Mombasa</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-industrial-gold">
                    <Banknote size={18} />
                  </div>
                  <div>
                    <p>P.O. Box 90210-00100</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 mt-4">
                  <p className="text-[#162839] font-black text-xl tracking-tighter">
                    +254 (0) 41 222 000
                  </p>
                </div>
              </address>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs text-[#74777d] font-medium">
              © 2026 Mvita Oils Sacco Society Ltd. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-8">
              <a
                className="text-xs text-[#74777d] hover:text-[#162839] transition-colors font-bold tracking-widest uppercase"
                href="#"
              >
                Privacy Protocol
              </a>
              <a
                className="text-xs text-[#74777d] hover:text-[#162839] transition-colors font-bold tracking-widest uppercase"
                href="#"
              >
                Security Standards
              </a>
              <a
                className="text-xs text-[#74777d] hover:text-[#162839] transition-colors font-bold tracking-widest uppercase"
                href="#"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
