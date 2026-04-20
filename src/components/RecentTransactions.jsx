import React from 'react';
import { Filter, MoreVertical, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const transactions = [
  {
    id: '#TR-8812',
    name: 'Alvin Amadi',
    initials: 'AA',
    type: 'Savings',
    amount: 'KSh 15,000',
    status: 'Completed',
    date: 'Oct 24, 2023',
    color: 'bg-[#cfe5ff] text-[#34495e]',
  },
  {
    id: '#TR-8811',
    name: 'Beatrice Mwangi',
    initials: 'BM',
    type: 'Loan Disb.',
    amount: 'KSh 120,000',
    status: 'Pending Approval',
    date: 'Oct 23, 2023',
    color: 'bg-primary text-white',
    badgeColor: 'bg-tertiary/20 text-tertiary'
  },
  {
    id: '#TR-8810',
    name: 'John Karanja',
    initials: 'JK',
    type: 'Withdrawal',
    amount: 'KSh 45,000',
    status: 'Completed',
    date: 'Oct 23, 2023',
    color: 'bg-[#cfe5ff] text-[#34495e]',
  }
];

export default function RecentTransactions() {
  return (
    <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-8">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-2xl font-serif font-bold text-primary tracking-tight">Recent Transactions</h3>
        
        <button className="flex items-center gap-2 bg-[#f8fafc] px-4 py-2.5 rounded-lg text-xs font-bold text-secondary border border-slate-100 hover:bg-white transition-all">
          <Filter size={14} />
          Filter By Type
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f8fafc] text-[10px] uppercase tracking-[0.15em] text-secondary font-black">
              <th className="px-8 py-5">Transaction ID</th>
              <th className="px-8 py-5">Member Name</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Amount</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tr, idx) => (
              <motion.tr 
                key={tr.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-8 py-6 text-xs font-bold text-primary">{tr.id}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black shadow-sm ${tr.color}`}>
                      {tr.initials}
                    </div>
                    <span className="text-sm font-semibold text-primary">{tr.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold ${tr.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                    {tr.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-black text-primary">{tr.amount}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-secondary">
                    <span className={`w-2 h-2 rounded-full ${tr.status === 'Completed' ? 'bg-secondary' : 'bg-primary'}`}></span>
                    {tr.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-xs text-secondary font-medium">{tr.date}</td>
                <td className="px-8 py-6 text-right">
                  <button className="text-secondary hover:text-primary hover:bg-white p-2 rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-[#f8fafc] flex justify-center border-t border-slate-100">
        <button className="text-xs font-bold text-primary flex items-center gap-3 group hover:underline underline-offset-4 transition-all uppercase tracking-widest">
          View Complete Transaction History
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
