import React from "react";
import { motion } from "motion/react";
import { Users, Banknote, Wallet, Clock, Download, Plus, UserPlus } from "lucide-react";

import StatCard from "../components/StatCard.jsx";
import ChartSection from "../components/ChartSection.jsx";
import RecentAlerts from "../components/RecentAlerts.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";

export default function DashboardHome() {
  return (
    <>
      

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
            Management Dashboard
          </h1>
          <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
            Strategic overview of{" "}
            <span className="text-primary font-bold">Mvita Oils Sacco</span>{" "}
            performance.
          </p>
        </motion.div>

       
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Members"
          value="1,284"
          trend="+12%"
          period="THIS QUARTER"
        />
        <StatCard
          icon={Banknote}
          label="Total Savings"
          value="KSh 42.8M"
          period="Active"
        />
        <StatCard icon={Wallet} label="Active Loans" value="KSh 18.2M" />
        <StatCard
          icon={Clock}
          label="Pending Approvals"
          value="24"
          trend="Needs Review"
          isUrgent={true}
          period="URGENT"
        />
      </div>

      {/* Analytics & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartSection />
        </div>
        <div className="lg:col-span-1">
          <RecentAlerts />
        </div>
      </div>

      {/* Transactions Section */}
      <RecentTransactions />

      <footer className="mt-8 text-center text-secondary/40 text-[11px] font-bold tracking-widest uppercase pb-6">
        Mvita Oils Sacco &copy; 2026 • Industrial Financial Security Systems
      </footer>
    </>
  );
}
