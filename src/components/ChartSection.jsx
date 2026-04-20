import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const chartData = [
  { month: "JAN", height: "45%", value: "8.2M" },
  { month: "FEB", height: "75%", value: "12.4M" },
  { month: "MAR", height: "60%", value: "10.8M", primary: true },
  { month: "APR", height: "90%", value: "18.2M" },
  { month: "MAY", height: "55%", value: "9.6M" },
  { month: "JUN", height: "85%", value: "15.4M" },
];

export default function ChartSection() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col h-72 md:h-96">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-primary tracking-tight">
            Loan Portfolio Growth
          </h3>
          <p className="text-xs text-secondary mt-1 font-medium">
            Monthly disbursement vs collection trends
          </p>
        </div>

        <button className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg text-xs font-bold text-primary border border-slate-100 shadow-sm hover:bg-white transition-all">
          Last 6 Months
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex-1 flex items-end justify-between gap-3 px-2">
        {chartData.map((data, idx) => (
          <div
            key={data.month}
            className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[56px]"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: data.height }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className={`w-full rounded-t-md transition-all duration-300 cursor-pointer relative ${
                data.primary
                  ? "bg-primary"
                  : "bg-surface-container-high group-hover:bg-primary/80"
              }`}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] px-2 py-1 rounded-md font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                KSh {data.value}
              </div>
            </motion.div>
            <span className="text-[10px] mt-4 font-bold text-secondary tracking-widest">
              {data.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
