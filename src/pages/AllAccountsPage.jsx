import {
  Search,
  Wallet,
  Landmark,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter,
  CreditCard,
  Smartphone,
  TrendingUp,
  TrendingDown,
  X,
  Power,
  ArrowDownCircle,
  LoaderCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AllAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    empty: true,
  });

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);

  const [depositForm, setDepositForm] = useState({
    amount: "",
    channel: "BANK",
    narration: "",
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const { accessToken, user } = useAuth();

  const accountSummary = [
    {
      code: "1001",
      name: "Sacco Bank Account",
      value: "KES 31.24M",
      trend: "+4.8%",
      positive: true,
      icon: Landmark,
      description: "Main sacco bank account",
    },
    {
      code: "1002",
      name: "Sacco M-Pesa Account",
      value: "KES 12.35M",
      trend: "+1.9%",
      positive: true,
      icon: Smartphone,
      description: "Main sacco mpesa account",
    },
  ];

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchAccounts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/member-accounts?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch member accounts");
      }

      const data = await response.json();

      setAccounts(data.content || []);
      setPagination({
        page: data.page ?? 0,
        size: data.size ?? 10,
        totalElements: data.totalElements ?? 0,
        totalPages: data.totalPages ?? 0,
        first: data.first ?? true,
        last: data.last ?? true,
        empty: data.empty ?? true,
      });
    } catch (err) {
      setError(err.message || "Something went wrong while loading accounts");
    } finally {
      setLoading(false);
    }
  }

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return accounts;

    return accounts.filter((account) =>
      [
        account.accountName,
        account.accountNumber,
        account.type,
        account.owner,
        account.status,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [accounts, searchTerm]);

  const pageNumbers = useMemo(() => {
    const total = pagination.totalPages || 0;
    return Array.from({ length: total }, (_, i) => i);
  }, [pagination.totalPages]);

  const formatType = (type) => {
    if (!type) return "N/A";
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const formatStatus = (status) => {
    if (!status) return "N/A";
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const openActionDrawer = (account) => {
    setSelectedAccount(account);
    setIsActionDrawerOpen(true);
    setDepositForm({
      amount: "",
      channel: "BANK",
      narration: "",
    });
    setActionMessage("");
    setActionError("");
  };

  const closeActionDrawer = () => {
    if (actionLoading) return;
    setIsActionDrawerOpen(false);
    setSelectedAccount(null);
    setDepositForm({
      amount: "",
      channel: "BANK",
      narration: "",
    });
    setActionMessage("");
    setActionError("");
  };

  const getNextStatusAction = (status) => {
    if (status === "ACTIVE") {
      return {
        label: "Deactivate Account",
        nextStatus: "SUSPENDED",
      };
    }

    return {
      label: "Activate Account",
      nextStatus: "ACTIVE",
    };
  };

  const handleToggleStatus = async () => {
    if (!selectedAccount) return;

    const { nextStatus } = getNextStatusAction(selectedAccount.status);

    try {
      setActionLoading(true);
      setActionError("");
      setActionMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/member-accounts/${selectedAccount.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
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
          data?.message || data?.error || "Failed to update account status",
        );
      }

      setAccounts((prev) =>
        prev.map((account) =>
          account.id === selectedAccount.id
            ? { ...account, status: nextStatus }
            : account,
        ),
      );

      setSelectedAccount((prev) =>
        prev ? { ...prev, status: nextStatus } : prev,
      );

      setActionMessage(`Account status updated to ${nextStatus}.`);
    } catch (err) {
      setActionError(err.message || "Failed to update account status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleTopUpSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAccount) return;

    if (!depositForm.amount || Number(depositForm.amount) <= 0) {
      setActionError("Enter a valid deposit amount.");
      return;
    }

    if (!depositForm.channel) {
      setActionError("Select a transaction channel.");
      return;
    }

    if (!depositForm.narration.trim()) {
      setActionError("Narration is required.");
      return;
    }

    try {
      setActionLoading(true);
      setActionError("");
      setActionMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/savings/deposit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberAccountNumber: selectedAccount.accountNumber,
            amount: Number(depositForm.amount),
            channel: depositForm.channel,
            narration: depositForm.narration.trim(),
            createdBy: user?.username || "system",
          }),
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
            "Failed to deposit savings",
        );
      }

      setDepositForm({
        amount: "",
        channel: "BANK",
        narration: "",
      });

      setActionMessage("Savings deposit completed successfully.");

      await fetchAccounts();
    } catch (err) {
      setActionError(err.message || "Failed to deposit savings");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <header className="mb-10 grid grid-cols-1 xl:grid-cols-[1fr_1.15fr] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
            Member Accounts
          </span>

          <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
            Account Registry
          </h1>

          <p className="text-secondary/80 max-w-xl text-lg font-medium leading-relaxed">
            View and manage all member accounts, balances, and linked actions
            from one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-primary text-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                Top Level Accounts
              </p>
              <h3 className="text-sm font-serif font-black text-white">
                Sacco Balance Snapshot
              </h3>
            </div>

            <p className="text-[11px] font-black text-white/70">KES 43.59M</p>
          </div>

          <div className="divide-y divide-white/10">
            {accountSummary.map((item) => {
              const Icon = item.icon;
              const TrendIcon = item.positive ? TrendingUp : TrendingDown;

              return (
                <div
                  key={item.code}
                  className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white truncate">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/45">
                          {item.code}
                        </p>

                        <div
                          className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${
                            item.positive ? "text-emerald-300" : "text-red-300"
                          }`}
                        >
                          <TrendIcon className="w-3 h-3" />
                          {item.trend}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-serif font-black text-white">
                      {item.value}
                    </p>
                    <p className="text-[9px] text-white/45 font-bold truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
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
                <option>All Account Types</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>Status: All</option>
              </select>
            </div>
          </div>

          <div className="relative flex-1 min-w-[280px] md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by account, number or owner..."
              className="w-full bg-white border border-surface-container py-2 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>

        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          {loading
            ? "Loading accounts..."
            : `Showing ${filteredAccounts.length} of ${pagination.totalElements} accounts`}
        </div>

        {error && (
          <div className="px-4 py-4 text-sm font-bold text-red-600 bg-red-50 border-b border-red-100">
            {error}
          </div>
        )}

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Account Identity
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Type
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Owner
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Balance
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {!loading && filteredAccounts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No accounts found.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center shadow-sm">
                          <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-primary text-sm group-hover:text-tertiary transition-colors">
                            {account.accountName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                            {account.accountNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-surface-container text-primary text-[9px] font-black uppercase tracking-widest rounded border border-primary/5 shadow-sm">
                        {formatType(account.type)}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-[13px] font-semibold text-primary">
                        {account.owner}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-[14px] font-serif font-black text-primary">
                        {account.balance}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div
                        className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                          account.status === "ACTIVE"
                            ? "text-emerald-600"
                            : account.status === "SUSPENDED"
                              ? "text-red-600"
                              : "text-tertiary"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            account.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : account.status === "SUSPENDED"
                                ? "bg-red-500"
                                : "bg-tertiary"
                          }`}
                        ></span>
                        {formatStatus(account.status)}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openActionDrawer(account)}
                        className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-slate-100">
          {!loading && filteredAccounts.length === 0 ? (
            <div className="px-4 py-10 text-center text-slate-500">
              No accounts found.
            </div>
          ) : (
            filteredAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-primary text-sm truncate">
                        {account.accountName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono font-bold mt-1">
                        {account.accountNumber}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openActionDrawer(account)}
                    className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-100 rounded-lg shrink-0"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Type
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatType(account.type)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Balance
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {account.balance}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Owner
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {account.owner}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Status
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatStatus(account.status)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={pagination.first || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {pageNumbers.length === 0 ? (
              <span className="text-xs text-slate-400 font-bold">No pages</span>
            ) : (
              pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 w-8 rounded-lg font-black text-xs ${
                    pageNumber === pagination.page
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-slate-600 hover:bg-slate-100 transition-colors"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              ))
            )}
          </div>

          <button
            disabled={pagination.last || loading}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isActionDrawerOpen && selectedAccount && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeActionDrawer}
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
                      Account Actions
                    </span>
                    <h2 className="text-3xl font-serif font-black text-primary leading-tight">
                      {selectedAccount.accountName}
                    </h2>
                    <p className="text-sm text-secondary/80 max-w-md font-medium leading-relaxed">
                      Manage this account status and post savings deposits.
                    </p>
                  </div>

                  <button
                    onClick={closeActionDrawer}
                    disabled={actionLoading}
                    className="h-11 w-11 rounded-xl bg-white border border-surface-container text-slate-500 hover:text-primary hover:bg-slate-50 transition-all flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="rounded-3xl border border-surface-container bg-slate-50/70 p-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Account Number
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1 break-all">
                      {selectedAccount.accountNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Status
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatStatus(selectedAccount.status)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Owner
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {selectedAccount.owner}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Balance
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {selectedAccount.balance}
                    </p>
                  </div>
                </div>

                
                <form
                  onSubmit={handleTopUpSubmit}
                  className="rounded-3xl border border-surface-container bg-white p-5 space-y-5"
                >
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                      Deposit Savings
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Post a savings deposit to this member account.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Amount
                    </label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={depositForm.amount}
                      onChange={(e) =>
                        setDepositForm((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      placeholder="Enter amount"
                      className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Channel
                    </label>
                    <select
                      value={depositForm.channel}
                      onChange={(e) =>
                        setDepositForm((prev) => ({
                          ...prev,
                          channel: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all"
                    >
                      <option value="BANK">BANK</option>
                      <option value="MPESA">MPESA</option>
                      <option value="CASH">CASH</option>
                      <option value="SYSTEM">SYSTEM</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Narration
                    </label>
                    <textarea
                      rows={4}
                      value={depositForm.narration}
                      onChange={(e) =>
                        setDepositForm((prev) => ({
                          ...prev,
                          narration: e.target.value,
                        }))
                      }
                      placeholder="Enter transaction narration"
                      className="w-full rounded-2xl border border-surface-container bg-white px-4 py-3.5 text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all resize-none"
                    />
                  </div>

                  {actionError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      {actionError}
                    </div>
                  )}

                  {actionMessage && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                      {actionMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary text-white font-bold hover:opacity-95 transition-all shadow-lg shadow-tertiary/20 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowDownCircle className="w-4 h-4" />
                        Submit Deposit
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}