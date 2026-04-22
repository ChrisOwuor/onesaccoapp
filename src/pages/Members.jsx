/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Search,
  Download,
  UserPlus,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Plus,
  X,
  LoaderCircle,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const [isActivateDrawerOpen, setIsActivateDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activating, setActivating] = useState(false);
  const [activateError, setActivateError] = useState(null);
  const [activateSuccess, setActivateSuccess] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setMembers(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err.message || "Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    setFormErrors({});
  };

  const closeDrawer = () => {
    if (submitting) return;
    setIsDrawerOpen(false);
    setForm(initialForm);
    setFormErrors({});
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const openActivateDrawer = (member) => {
    setSelectedMember(member);
    setActivateError(null);
    setActivateSuccess(null);
    setIsActivateDrawerOpen(true);
  };

  const closeActivateDrawer = () => {
    if (activating) return;
    setIsActivateDrawerOpen(false);
    setSelectedMember(null);
    setActivateError(null);
    setActivateSuccess(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!form.username.trim()) {
      errors.username = "Username is required";
    } else if (form.username.length > 50) {
      errors.username = "Username must be at most 50 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Invalid email format";
    } else if (form.email.length > 100) {
      errors.email = "Email must be at most 100 characters";
    }

    if (!form.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (form.phoneNumber.length > 20) {
      errors.phoneNumber = "Phone number must be at most 20 characters";
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
    } else if (form.password.length < 8 || form.password.length > 100) {
      errors.password = "Password must be between 8 and 100 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          password: form.password,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            data?.details ||
            "Failed to register member",
        );
      }

      setSubmitSuccess(
        `Member ${data?.username || form.username} created successfully.`,
      );

      setForm(initialForm);

      if (page !== 0) {
        setPage(0);
      } else {
        await fetchMembers();
      }

      setTimeout(() => {
        setIsDrawerOpen(false);
        setSubmitSuccess(null);
      }, 900);
    } catch (err) {
      setSubmitError(err.message || "Failed to register member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleActivateMember = async () => {
    if (!selectedMember?.id) return;

    setActivateError(null);
    setActivateSuccess(null);
    setActivating(true);

    try {
      const response = await fetch(
        `${apiUrl}/api/users/members/${selectedMember.id}/activate`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            data?.details ||
            "Failed to activate member",
        );
      }

      setActivateSuccess(
        data?.message ||
          `${selectedMember.username} has been activated successfully.`,
      );

      await fetchMembers();

      setTimeout(() => {
        closeActivateDrawer();
      }, 900);
    } catch (err) {
      setActivateError(err.message || "Failed to activate member");
    } finally {
      setActivating(false);
    }
  };

  return (
    <>
      <div className="relative">
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

            <button
              onClick={openDrawer}
              className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Onboard Member
            </button>
          </div>
        </header>

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
                        <div className="flex items-center justify-end gap-2">
                          {member.status !== "ACTIVE" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openActivateDrawer(member);
                              }}
                              className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                            >
                              <UserCheck className="w-4 h-4" />
                              Activate
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
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
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white z-50 shadow-2xl border-l border-surface-container flex flex-col"
            >
              <div className="px-6 py-5 border-b border-surface-container bg-slate-50/70">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase">
                      Member Onboarding
                    </span>
                    <h2 className="text-3xl font-serif font-black text-primary leading-tight">
                      Add New Member
                    </h2>
                    <p className="text-sm text-secondary/80 max-w-md font-medium leading-relaxed">
                      Register a new sacco member and create their profile access
                      credentials.
                    </p>
                  </div>

                  <button
                    onClick={closeDrawer}
                    disabled={submitting}
                    className="h-11 w-11 rounded-xl bg-white border border-surface-container text-slate-500 hover:text-primary hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={handleCreateMember}
                className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                  />
                  {formErrors.username && (
                    <p className="text-xs font-semibold text-red-500">
                      {formErrors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                  />
                  {formErrors.email && (
                    <p className="text-xs font-semibold text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-xs font-semibold text-red-500">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                  />
                  {formErrors.password && (
                    <p className="text-xs font-semibold text-red-500">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {submitError}
                  </div>
                )}

                {submitSuccess && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {submitSuccess}
                  </div>
                )}

                <div className="rounded-3xl border border-surface-container bg-slate-50/70 p-5 space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                    Request Payload
                  </h3>
                  <div className="text-xs text-slate-500 font-mono leading-6 break-all">
                    POST {apiUrl}/api/auth/register
                  </div>
                </div>
              </form>

              <div className="px-6 py-5 border-t border-surface-container bg-white flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={closeDrawer}
                  disabled={submitting}
                  className="px-5 py-3 rounded-xl border border-surface-container text-primary font-bold hover:bg-slate-50 transition-all disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={handleCreateMember}
                  disabled={submitting}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Create Member
                    </>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActivateDrawerOpen && selectedMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeActivateDrawer}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white z-50 shadow-2xl border-l border-surface-container flex flex-col"
            >
              <div className="px-6 py-5 border-b border-surface-container bg-slate-50/70">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase">
                      Member Activation
                    </span>
                    <h2 className="text-3xl font-serif font-black text-primary leading-tight">
                      Activate Member
                    </h2>
                    <p className="text-sm text-secondary/80 max-w-md font-medium leading-relaxed">
                      Confirm activation for this member and submit the request
                      to the server.
                    </p>
                  </div>

                  <button
                    onClick={closeActivateDrawer}
                    disabled={activating}
                    className="h-11 w-11 rounded-xl bg-white border border-surface-container text-slate-500 hover:text-primary hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="rounded-3xl border border-surface-container bg-slate-50/70 p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Member Name
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary">
                      {selectedMember.username}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Member Number
                    </p>
                    <p className="mt-1 text-sm font-mono font-bold text-primary">
                      {selectedMember.memberNumber || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {selectedMember.email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Current Status
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {selectedMember.status || "N/A"}
                    </p>
                  </div>
                </div>

                {activateError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {activateError}
                  </div>
                )}

                {activateSuccess && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {activateSuccess}
                  </div>
                )}

                <div className="rounded-3xl border border-surface-container bg-slate-50/70 p-5 space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                    Request
                  </h3>
                  <div className="text-xs text-slate-500 font-mono leading-6 break-all">
                    PATCH {apiUrl}/api/users/members/{selectedMember.id}/activate
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 border-t border-surface-container bg-white flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={closeActivateDrawer}
                  disabled={activating}
                  className="px-5 py-3 rounded-xl border border-surface-container text-primary font-bold hover:bg-slate-50 transition-all disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleActivateMember}
                  disabled={activating}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {activating ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Activate Member
                    </>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openDrawer}
        className="fixed bottom-8 right-8 h-16 w-16 bg-tertiary text-white rounded-2xl shadow-2xl shadow-tertiary/20 flex items-center justify-center z-30 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </>
  );
}