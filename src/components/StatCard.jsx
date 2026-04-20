import React from "react";
import { motion } from "motion/react";
import { Info } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  period,
  isUrgent,
}) {
  const cardClasses = isUrgent
    ? "bg-primary p-3 rounded-lg border border-white/10"
    : "bg-white p-3 rounded-lg border border-primary/10";

  const iconWrapperClasses = isUrgent ? "bg-white/10" : "bg-surface-container";

  const iconClasses = isUrgent ? "text-white" : "text-primary";

  const labelClasses = isUrgent
    ? "text-white/70 text-[11px]"
    : "text-secondary text-[11px]";

  const valueClasses = isUrgent ? "text-white text-xl" : "text-primary text-xl";

  const periodClasses = isUrgent
    ? "text-white/50 text-[10px]"
    : "text-secondary/60 text-[10px]";

  const trendClasses = isUrgent
    ? "text-tertiary text-xs"
    : "text-secondary text-xs";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cardClasses}
    >
      {/* Top */}
      <div className="flex justify-between items-center mb-2">
        <div className={`p-1.5 rounded-md ${iconWrapperClasses}`}>
          <Icon size={16} className={iconClasses} />
        </div>

        {period ? (
          <span className={`uppercase tracking-wide ${periodClasses}`}>
            {period}
          </span>
        ) : (
          <Info
            size={14}
            className={isUrgent ? "text-white/40" : "text-secondary/40"}
          />
        )}
      </div>

      {/* Label */}
      <p className={`${labelClasses} mb-1`}>{label}</p>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span className={`font-semibold ${valueClasses}`}>{value}</span>

        {trend && <span className={`${trendClasses}`}>{trend}</span>}
      </div>
    </motion.div>
  );
}
