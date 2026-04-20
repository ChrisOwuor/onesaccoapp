import React from "react";
import { AlertCircle, UserPlus, FileCheck } from "lucide-react";
import { motion } from "motion/react";

const alerts = [
  {
    id: 1,
    icon: AlertCircle,
    color: "border-tertiary",
    iconColor: "text-tertiary",
    title: "High Withdrawal Request",
    description: "Member #8920 requested KSh 450,000.",
    time: "2 mins ago",
    urgent: true,
  },
  {
    id: 2,
    icon: UserPlus,
    color: "border-primary",
    iconColor: "text-primary",
    title: "New Member Registration",
    description: "Jane Doe (ID: 5543) joined the Sacco.",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: FileCheck,
    color: "border-secondary",
    iconColor: "text-secondary",
    title: "Loan Repayment Confirmed",
    description: "Receipt #RC-9902 processed successfully.",
    time: "4 hours ago",
  },
];

export default function RecentAlerts() {
  return (
    <div className="bg-[#edf4ff]/50 rounded-2xl p-4 h-full flex flex-col border border-slate-100">
      <h3 className="text-lg font-serif font-bold text-primary mb-4 tracking-tight">
        Recent Alerts
      </h3>

      <div className="space-y-3 flex-1">
        {alerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`bg-white p-3 rounded-lg flex gap-3 border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${alert.color}`}
          >
            <div className={`mt-0.5 ${alert.iconColor}`}>
              <alert.icon size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary leading-tight">
                {alert.title}
              </p>
              <p className="text-[12px] text-secondary mt-1 font-medium leading-relaxed">
                {alert.description}
              </p>
              <span className="text-[10px] text-slate-400 mt-2 block font-semibold tracking-wider uppercase">
                {alert.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 bg-white border border-slate-200 text-xs font-bold text-primary hover:bg-slate-50 transition-all rounded-lg shadow-sm">
        View All System Logs
      </button>
    </div>
  );
}
