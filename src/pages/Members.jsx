/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Search,
  Bell,
  HelpCircle,
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  ArrowUpFromLine,
  BarChart3,
  UserCog,
  Settings,
  LogOut,
  Download,
  UserPlus,
  TrendingUp,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../context/AuthContext";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const filteredMembers = members.filter((member) => {
    const normalizedSearch = searchTerm.toLowerCase();
    return [member.username, member.email, member.memberNumber, member.role]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  useEffect(() => {
    if (accessToken) {
      fetchMembers();
    } else {
      setLoading(false);
      setError("Not authenticated");
    }
  }, [page, accessToken]);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${apiUrl}/api/users?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {/* Main Content Area */}

      <>
        {/* Hero Header Section */}
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
              Member Registry
            </h1>
            <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
              Centralized directory of all industrial partners and refinery
              personnel within the Mvita Oils Sacco ecosystem.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export List
            </button>
            <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Onboard Member
            </button>
          </div>
        </header>

        {/* Registry Table */}
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
                <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                  <option>All Categories</option>
                  <option>Refinery Staff</option>
                  <option>Logistics Partners</option>
                  <option>Equity Members</option>
                </select>
              </div>
              <div className="relative flex-1 md:w-48">
                <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                  <option>Status: All</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>
            <div className="relative flex-1 min-w-[280px] md:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID or email..."
                className="w-full bg-white border border-surface-container py-2 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>
          </div>
          <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredMembers.length} of {totalElements} loaded members
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 text-slate-500">
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Partner Identity
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Refinery Node
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Asset Allocation
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Compliance Status
                  </th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Loading members...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-red-500"
                    >
                      Error: {error}
                    </td>
                  </tr>
                ) : filteredMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/app/members/${member.id}`)}
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm">
                            <img
                              alt={member.username}
                              className="w-full h-full object-cover"
                              src={`https://picsum.photos/seed/${member.username}/100/100`}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-primary group-hover:text-tertiary transition-colors text-sm">
                              {member.username}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter mt-0.5">
                              {member.memberNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-surface-container text-primary text-[9px] font-black uppercase tracking-widest rounded border border-primary/5 shadow-sm">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          <p className="text-[13px] font-serif font-black text-primary">
                            {member.email}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {member.phoneNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div
                          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                            member.status === "ACTIVE"
                              ? "text-emerald-600"
                              : member.status === "SUSPENDED"
                                ? "text-red-600"
                                : "text-tertiary"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              member.status === "ACTIVE"
                                ? "bg-emerald-500"
                                : member.status === "SUSPENDED"
                                  ? "bg-red-500"
                                  : "bg-tertiary"
                            } animate-pulse`}
                          ></span>
                          {member.status}
                        </div>
                        {member.accountApproved && (
                          <div className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest mt-1">
                            Approved
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
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
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(0, page - 2) + i;
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-8 w-8 rounded-lg font-black text-xs ${
                      pageNum === page
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-600 hover:bg-slate-100 transition-colors"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              {totalPages > 5 && page < totalPages - 3 && (
                <span className="px-2 text-slate-300 font-bold">...</span>
              )}
              {totalPages > 5 && page < totalPages - 3 && (
                <button
                  onClick={() => handlePageChange(totalPages - 1)}
                  className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors"
                >
                  {totalPages}
                </button>
              )}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Footer Compliance Note */}
        <footer className="mt-16 py-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">
              Authorized Security Access Only | 256-Bit Industrial Encryption
            </p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2024 Mvita Oils Sacco. All industrial data protected.
          </p>
        </footer>
      </>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 h-16 w-16 bg-tertiary text-white rounded-2xl shadow-2xl shadow-tertiary/20 flex items-center justify-center z-50 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </>
  );
}
