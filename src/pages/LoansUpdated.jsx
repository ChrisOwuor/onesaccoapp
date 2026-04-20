
import {
  Search,
  Download,
  UserPlus,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOANS_TABLE = [
  {
    id: '#LN-8821',
    name: 'James Murungi',
    initial: 'JM',
    product: 'Asset Finance',
    principal: '2,500,000',
    balance: '1,120,400',
    int: '9%',
    term: '36 months',
    status: 'Active',
    statusClass: 'bg-[#b5c8df] text-primary',
    due: '15 Apr 2026'
  },
  {
    id: '#LN-9012',
    name: 'Amina Kadzo',
    initial: 'AK',
    product: 'Emergency',
    principal: '150,000',
    balance: '150,000',
    int: '12%',
    term: '6 months',
    status: 'Pending',
    statusClass: 'bg-[#ffddb9] text-[#2b1700]',
    due: '20 Apr 2026'
  },
  {
    id: '#LN-8776',
    name: 'David Okoth',
    initial: 'DO',
    product: 'Development',
    principal: '8,000,000',
    balance: '7,850,000',
    int: '7.5%',
    term: '60 months',
    status: 'Active',
    statusClass: 'bg-[#b5c8df] text-primary',
    due: '10 May 2026'
  },
  {
    id: '#LN-8501',
    name: 'Sarah Wanjiku',
    initial: 'SW',
    product: 'Emergency',
    principal: '45,000',
    balance: '0',
    int: '12%',
    term: '3 months',
    status: 'Completed',
    statusClass: 'bg-surface-container-low text-secondary',
    due: 'Completed'
  },
  {
    id: '#LN-9234',
    name: 'Michael Kiprop',
    initial: 'MK',
    product: 'Working Capital',
    principal: '500,000',
    balance: '320,000',
    int: '10%',
    term: '12 months',
    status: 'Active',
    statusClass: 'bg-[#b5c8df] text-primary',
    due: '25 Apr 2026'
  },
  {
    id: '#LN-9456',
    name: 'Grace Nyambura',
    initial: 'GN',
    product: 'Asset Finance',
    principal: '1,200,000',
    balance: '1,200,000',
    int: '8.5%',
    term: '24 months',
    status: 'Approved',
    statusClass: 'bg-[#c8e6c9] text-[#1b5e20]',
    due: '30 Apr 2026'
  },
  {
    id: '#LN-9678',
    name: 'Peter Oduya',
    initial: 'PO',
    product: 'Development',
    principal: '3,500,000',
    balance: '2,800,000',
    int: '7%',
    term: '48 months',
    status: 'Active',
    statusClass: 'bg-[#b5c8df] text-primary',
    due: '5 May 2026'
  },
  {
    id: '#LN-9890',
    name: 'Lucy Achieng',
    initial: 'LA',
    product: 'Emergency',
    principal: '75,000',
    balance: '75,000',
    int: '12%',
    term: '4 months',
    status: 'Pending',
    statusClass: 'bg-[#ffddb9] text-[#2b1700]',
    due: '18 Apr 2026'
  }
];

export default function LoansUpdated() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Products');
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const navigate = useNavigate();

  const filteredLoans = LOANS_TABLE.filter((loan) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesSearch = [loan.id, loan.name, loan.product]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));

    const matchesStatus =
      statusFilter === 'All Statuses' || loan.status === statusFilter;

    const matchesType =
      typeFilter === 'All Products' || loan.product === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / size));
  const pagedLoans = filteredLoans.slice(page * size, page * size + size);

  const totalLoans = LOANS_TABLE.length;
  const activeLoans = LOANS_TABLE.filter((loan) => loan.status === 'Active').length;
  const pendingLoans = LOANS_TABLE.filter((loan) => loan.status === 'Pending').length;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
            Lonsa Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
            Loans Updated
          </h1>
          <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
            Updated loan registry using the Lonsa table fields and the same design pattern as the member directory.
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            Export Loans
          </button>
          <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            New Loan
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-surface-container bg-slate-50 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400 font-bold">Total Loans</p>
          <p className="mt-3 text-2xl font-serif font-black text-primary">{totalLoans}</p>
          <p className="mt-1 text-xs text-slate-500">Total loan records in the Lonsa dataset.</p>
        </div>
        <div className="rounded-2xl border border-surface-container bg-slate-50 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400 font-bold">Active Loans</p>
          <p className="mt-3 text-2xl font-serif font-black text-primary">{activeLoans}</p>
          <p className="mt-1 text-xs text-slate-500">Loans currently marked as active.</p>
        </div>
        <div className="rounded-2xl border border-surface-container bg-slate-50 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400 font-bold">Pending Review</p>
          <p className="mt-3 text-2xl font-serif font-black text-primary">{pendingLoans}</p>
          <p className="mt-1 text-xs text-slate-500">Loans awaiting approval or funding.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-surface-container overflow-hidden"
      >
        <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-surface-container bg-slate-50/50">
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:w-56">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              >
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="relative flex-1 md:w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              >
                <option>All Products</option>
                <option>Asset Finance</option>
                <option>Emergency</option>
                <option>Development</option>
                <option>Working Capital</option>
              </select>
            </div>
          </div>
          <div className="relative flex-1 min-w-[280px] md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              placeholder="Search by loan ID, member or product..."
              className="w-full bg-white border border-surface-container py-2 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>
        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {filteredLoans.length} matching loans
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Loan ID</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Member</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Product</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">Principal</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">Balance</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-center">Interest</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-center">Term</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">Due</th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pagedLoans.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-slate-500">
                    No loans match your search.
                  </td>
                </tr>
              ) : (
                pagedLoans.map((loan, index) => (
                  <motion.tr
                    key={loan.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/app/loans/${loan.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-mono text-primary">{loan.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
                          {loan.initial}
                        </div>
                        <span className="font-medium text-primary">{loan.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{loan.product}</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{loan.principal}</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{loan.balance}</td>
                    <td className="px-4 py-3 text-center text-sm text-secondary">{loan.int}</td>
                    <td className="px-4 py-3 text-center text-sm text-secondary">{loan.term}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${loan.statusClass}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-secondary">{loan.due}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`h-8 w-8 rounded-lg font-black text-xs ${index === page ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-slate-100 transition-colors'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
