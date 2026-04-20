import React, { useState } from 'react';
import { motion } from 'motion/react';

const Sidebar = ({ activeTab = 'loans' }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'members', icon: 'group', label: 'Members' },
    { id: 'savings', icon: 'account_balance_wallet', label: 'Savings' },
    { id: 'loans', icon: 'payments', label: 'Loans' },
    { id: 'repayments', icon: 'receipt_long', label: 'Repayments' },
    { id: 'withdrawals', icon: 'outbox', label: 'Withdrawals' },
    { id: 'reports', icon: 'analytics', label: 'Reports' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-background dark:bg-[#091d2e] flex flex-col py-4 border-r border-primary/10 z-40 hidden md:flex">
      <div className="px-6 mb-8">
        <h1 className="font-serif text-lg font-bold text-primary dark:text-white">Industrial Sacco</h1>
        <p className="text-xs font-medium tracking-wide opacity-60">Management Portal</p>
      </div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`flex items-center px-6 py-3 space-x-3 transition-all ${
              item.id === activeTab
                ? 'text-primary dark:text-white font-bold bg-surface-container-low dark:bg-[#2C3E50] border-r-4 border-orange-600 translate-x-1'
                : 'text-primary/60 dark:text-white/60 hover:bg-surface-container-low dark:hover:bg-[#2C3E50]'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-sans font-medium text-sm tracking-wide">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="w-full h-16 sticky top-0 z-50 bg-primary/95 backdrop-blur-md flex justify-between items-center px-6">
      <div className="flex items-center space-x-4">
        <span className="md:hidden material-symbols-outlined text-white cursor-pointer">menu</span>
        <span className="font-serif font-bold tracking-tight text-xl text-white">Mvita Oils Sacco</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-4 text-white/70">
          <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors">notifications</span>
          <span className="material-symbols-outlined cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors">help</span>
        </div>
        <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
          <div className="text-right hidden lg:block">
            <p className="text-white text-sm font-bold">Admin Portal</p>
            <p className="text-white/60 text-xs">Mombasa Branch</p>
          </div>
          <img
            alt="User profile avatar"
            className="w-10 h-10 rounded-full border border-orange-500/30"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8BFqq7bauX0qGOVlFT_JgDMsPTW_nuTlofwWuQcq2zcqaWFBpGanld0A6JHbJgW0p2OriRYy0MG94YCf0rm38Fx6JQYnjhGasLeX4xfE1W1EpsMLWqZlLiR0ISqIRpWOFh0naT71BDYcbDG00uU7y9R-P1zcn3I4-efzpeZclkliLjhwoAjBwK8ZaCVIHNzda6BVvo0-uA7hqeqpa26svcqOnM-HcU31sPajmwb04bNPW_lJ5mMLHzJqN9uBkqzzmsgrbIP2H1tXp"
          />
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <div className="px-8 py-10 bg-primary-container text-white flex flex-col md:flex-row justify-between items-end gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5C87.5,14.1,81.6,28.2,73.1,40.7C64.6,53.2,53.5,64.1,40.4,71.5C27.3,78.9,12.2,82.8,-2.6,87.4C-17.5,92,-32.1,97.3,-45.5,92.5C-58.9,87.7,-71.2,72.9,-79.8,57.7C-88.4,42.5,-93.3,26.9,-93.8,11.2C-94.4,-4.5,-90.6,-20.3,-82.9,-34C-75.1,-47.7,-63.4,-59.3,-50.3,-66.7C-37.2,-74.1,-22.7,-77.3,-7.4,-78.6C7.9,-79.8,15.8,-79.2,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2">Loan Portfolio</h2>
        <p className="text-white/70 max-w-lg">Manage and monitor all active industrial loans and applications. Strategic capital oversight for industrial growth.</p>
      </div>
      <button className="relative z-10 bg-[#ffb961] hover:bg-tertiary hover:text-white text-primary px-6 py-3 rounded font-bold transition-all flex items-center space-x-2 shadow-lg active:scale-95 cursor-pointer">
        <span className="material-symbols-outlined">add_circle</span>
        <span>New Loan Application</span>
      </button>
    </div>
  );
};

const MetricCard = ({ title, value, icon, colorClass, footer }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-surface-container-lowest p-6 rounded-xl border-b-4 ${colorClass} transition-all`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest">{title}</span>
        <span className={`material-symbols-outlined ${colorClass.replace('border-', 'text-')}`}>{icon}</span>
      </div>
      <div className="font-serif text-3xl font-bold text-primary">{value}</div>
      {footer}
    </motion.div>
  );
};

const LoanTable = () => {
  const loans = [
    { id: '#LN-8821', name: 'James Murungi', initial: 'JM', type: 'Machinery', principal: '2,500,000', balance: '1,120,400', int: '9%', status: 'Active', statusClass: 'bg-[#b5c8df] text-primary' },
    { id: '#LN-9012', name: 'Amina Kadzo', initial: 'AK', type: 'Emergency', principal: '150,000', balance: '150,000', int: '12%', status: 'Pending', statusClass: 'bg-[#ffddb9] text-[#2b1700]', pending: true },
    { id: '#LN-8776', name: 'David Okoth', initial: 'DO', type: 'Development', principal: '8,000,000', balance: '7,850,000', int: '7.5%', status: 'Active', statusClass: 'bg-[#b5c8df] text-primary' },
    { id: '#LN-8501', name: 'Sarah Wanjiku', initial: 'SW', type: 'Emergency', principal: '45,000', balance: '0', int: '12%', status: 'Completed', statusClass: 'bg-surface-container-low text-secondary' },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-on-background/5">
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Loan ID</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Member Name</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Principal</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Balance</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Int.</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-on-background/5">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-5 font-mono text-sm text-primary">{loan.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${loan.pending ? 'bg-orange-600' : 'bg-primary-container'} text-white flex items-center justify-center rounded text-xs font-bold mr-3`}>
                      {loan.initial}
                    </div>
                    <span className="font-medium text-primary">{loan.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs bg-surface-container-low px-2 py-1 rounded">{loan.type}</span>
                </td>
                <td className="px-6 py-5 text-right font-medium text-primary">{loan.principal}</td>
                <td className="px-6 py-5 text-right font-medium text-primary">{loan.balance}</td>
                <td className="px-6 py-5 text-center text-sm text-secondary">{loan.int}</td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${loan.statusClass}`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    {loan.pending && (
                      <>
                        <button className="text-green-600 hover:scale-110 transition-transform cursor-pointer" title="Approve">
                          <span className="material-symbols-outlined">check_circle</span>
                        </button>
                        <button className="text-red-600 hover:scale-110 transition-transform cursor-pointer" title="Reject">
                          <span className="material-symbols-outlined">cancel</span>
                        </button>
                      </>
                    )}
                    <button className="text-primary hover:text-orange-600 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center border-t border-on-background/5">
        <span className="text-xs text-secondary font-medium">Showing 4 of 128 active loan entries</span>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-primary hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-primary text-xs font-bold">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-primary text-xs font-bold">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-lowest text-primary hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Loans() {
  const [activeTab, setActiveTab] = useState('loans');

  return (
    <>
     


        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 relative z-20">
          <MetricCard
            title="Total Active Loans"
            value="KES 42.8M"
            icon="account_balance"
            colorClass="border-primary"
            footer={
              <div className="mt-2 flex items-center text-xs text-secondary">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                <span>+12.4% from last quarter</span>
              </div>
            }
          />
          <MetricCard
            title="Pending Applications"
            value="24"
            icon="pending_actions"
            colorClass="border-orange-500"
            footer={
              <div className="mt-2 flex items-center text-xs text-orange-600">
                <span className="material-symbols-outlined text-sm mr-1">priority_high</span>
                <span>6 requiring urgent review</span>
              </div>
            }
          />
          <MetricCard
            title="Average Interest Rate"
            value="8.5%"
            icon="percent"
            colorClass="border-blue-200"
            footer={
              <div className="mt-2 flex items-center text-xs text-secondary">
                <span className="material-symbols-outlined text-sm mr-1">info</span>
                <span>Based on current industrial prime rate</span>
              </div>
            }
          />
        </div>

        <div className="px-8 pb-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 bg-surface-container-low px-3 py-2 rounded">
            <span className="material-symbols-outlined text-secondary text-sm">filter_list</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-tight">Status</span>
            <select className="bg-transparent border-none text-sm focus:ring-0 font-medium text-primary cursor-pointer outline-none">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 bg-surface-container-low px-3 py-2 rounded">
            <span className="material-symbols-outlined text-secondary text-sm">category</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-tight">Loan Type</span>
            <select className="bg-transparent border-none text-sm focus:ring-0 font-medium text-primary cursor-pointer outline-none">
              <option>All Types</option>
              <option>Emergency</option>
              <option>Development</option>
              <option>Machinery</option>
            </select>
          </div>
          <div className="ml-auto flex items-center bg-surface-container-low px-4 py-2 rounded min-w-[280px]">
            <span className="material-symbols-outlined text-secondary mr-2">search</span>
            <input className="bg-transparent border-none w-full text-sm focus:ring-0 outline-none" placeholder="Search by name or ID..." type="text" />
          </div>
        </div>

        <div className="px-8 pb-12">
          <LoanTable />
        </div>

        <footer className="px-8 pb-8 text-center mt-auto">
          <p className="text-xs text-secondary/40 font-medium">Mvita Oils Sacco Industrial Management Portal © 2024. All financial activities are regulated under industrial audit standards.</p>
        </footer>
    
    </>
  );
}
