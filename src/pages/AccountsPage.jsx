import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  LoaderCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const getAccountStatusTone = (status) => {
  switch (status) {
    case "ACTIVE":
      return "text-emerald-300";
    case "PENDING":
      return "text-amber-300";
    case "SUSPENDED":
      return "text-red-300";
    case "CLOSED":
      return "text-slate-300";
    default:
      return "text-slate-300";
  }
};

const getTransactionStatusLabel = (entryType) => {
  switch (entryType) {
    case "CREDIT":
      return "COMPLETED";
    case "DEBIT":
      return "COMPLETED";
    default:
      return "COMPLETED";
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case "COMPLETED":
      return {
        text: "text-emerald-600",
        dot: "bg-emerald-500",
      };
    case "PROCESSING":
      return {
        text: "text-amber-600",
        dot: "bg-amber-500",
      };
    case "FAILED":
      return {
        text: "text-red-600",
        dot: "bg-red-500",
      };
    default:
      return {
        text: "text-slate-500",
        dot: "bg-slate-400",
      };
  }
};

const formatCurrency = (value) => {
  const numeric = Number(value || 0);
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatAccountNumber = (value) => {
  if (!value) return "N/A";
  return value;
};

const prettifyEnum = (value) => {
  if (!value) return "N/A";
  return value.replaceAll("_", " ");
};

export default function AccountsPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { accessToken, user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [accountsError, setAccountsError] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const [accountDashboard, setAccountDashboard] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardRefreshing, setDashboardRefreshing] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactionsRefreshing, setTransactionsRefreshing] = useState(false);
  const [transactionsError, setTransactionsError] = useState(null);
  const [transactionsPage, setTransactionsPage] = useState(0);
  const [transactionsSize] = useState(10);
  const [transactionsTotalPages, setTransactionsTotalPages] = useState(0);
  const [transactionsTotalElements, setTransactionsTotalElements] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [entryFilter, setEntryFilter] = useState("ALL");

  const selectedAccount = useMemo(() => {
    if (!accounts.length) return null;

    return (
      accounts.find((account) => account.id === selectedAccountId) ||
      accounts.find((account) => account.primaryAccount) ||
      accounts[0]
    );
  }, [accounts, selectedAccountId]);

  const totalBalance = useMemo(() => {
    const balances = accounts.map((account) => Number(account.balance || 0));
    const total = balances.reduce((sum, value) => sum + value, 0);
    return formatCurrency(total);
  }, [accounts]);

  const filteredTransactions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return transactions.filter((tx) => {
      const matchesType =
        typeFilter === "ALL" ? true : tx.transactionType === typeFilter;

      const matchesEntry =
        entryFilter === "ALL" ? true : tx.entryType === entryFilter;

      const matchesSearch =
        !search ||
        tx.transactionNo?.toLowerCase().includes(search) ||
        tx.transactionType?.toLowerCase().includes(search) ||
        tx.channel?.toLowerCase().includes(search) ||
        tx.narration?.toLowerCase().includes(search);

      return matchesType && matchesEntry && matchesSearch;
    });
  }, [transactions, searchTerm, typeFilter, entryFilter]);

  const fetchMemberAccounts = useCallback(async () => {
    if (!accessToken || !user?.id) {
      setLoadingAccounts(false);
      return;
    }

    setLoadingAccounts(true);
    setAccountsError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/member-accounts/member/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = [];
      try {
        data = await response.json();
      } catch {
        data = [];
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Failed to fetch member accounts"
        );
      }

      const normalizedAccounts = Array.isArray(data) ? data : [];
      setAccounts(normalizedAccounts);

      const primary =
        normalizedAccounts.find((account) => account.primaryAccount) ||
        normalizedAccounts[0] ||
        null;

      setSelectedAccountId((current) => current ?? primary?.id ?? null);
    } catch (error) {
      setAccountsError(error.message || "Failed to fetch member accounts");
    } finally {
      setLoadingAccounts(false);
    }
  }, [accessToken, apiUrl, user?.id]);

  const fetchAccountDashboard = useCallback(
    async (memberAccountId, isRefresh = false) => {
      if (!memberAccountId || !accessToken) return;

      try {
        if (isRefresh) {
          setDashboardRefreshing(true);
        } else {
          setLoadingDashboard(true);
        }

        setDashboardError(null);

        const response = await fetch(
          `${apiUrl}/api/member-accounts/${memberAccountId}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(
            data?.message || data?.error || "Failed to fetch account dashboard"
          );
        }

        setAccountDashboard(data);
      } catch (error) {
        setDashboardError(error.message || "Failed to fetch account dashboard");
        setAccountDashboard(null);
      } finally {
        setLoadingDashboard(false);
        setDashboardRefreshing(false);
      }
    },
    [accessToken, apiUrl]
  );

  const fetchAccountTransactions = useCallback(
    async (memberAccountId, page = 0, isRefresh = false) => {
      if (!memberAccountId || !accessToken) return;

      try {
        if (isRefresh) {
          setTransactionsRefreshing(true);
        } else {
          setLoadingTransactions(true);
        }

        setTransactionsError(null);

        const response = await fetch(
          `${apiUrl}/api/member-accounts/${memberAccountId}/transactions?page=${page}&size=${transactionsSize}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
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
              "Failed to fetch account transactions"
          );
        }

        setTransactions(Array.isArray(data?.content) ? data.content : []);
        setTransactionsPage(data?.number ?? page);
        setTransactionsTotalPages(data?.totalPages ?? 0);
        setTransactionsTotalElements(data?.totalElements ?? 0);
      } catch (error) {
        setTransactionsError(
          error.message || "Failed to fetch account transactions"
        );
        setTransactions([]);
      } finally {
        setLoadingTransactions(false);
        setTransactionsRefreshing(false);
      }
    },
    [accessToken, apiUrl, transactionsSize]
  );

  useEffect(() => {
    fetchMemberAccounts();
  }, [fetchMemberAccounts]);

  useEffect(() => {
    if (!selectedAccountId) return;

    fetchAccountDashboard(selectedAccountId);
    fetchAccountTransactions(selectedAccountId, 0);
  }, [selectedAccountId, fetchAccountDashboard, fetchAccountTransactions]);

  const currentStart =
    transactionsTotalElements === 0
      ? 0
      : Math.min(transactionsPage * transactionsSize + 1, transactionsTotalElements);

  const currentEnd = Math.min(
    (transactionsPage + 1) * transactionsSize,
    transactionsTotalElements
  );

  return (
    <>
      <header className="mb-1 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <div className="gap-8 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
              Member Accounts
            </span>

            <h1 className="text-xl md:text-4xl font-serif font-black text-primary leading-tight tracking-tight">
              My Sacco Account
            </h1>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-container shadow-xl shadow-slate-200/40 overflow-hidden"
          >
            <div className="p-6 md:p-7 bg-slate-50/50 space-y-6">
              {loadingAccounts ? (
                <div className="text-sm font-semibold text-slate-500">
                  Loading account list...
                </div>
              ) : accountsError ? (
                <div className="text-sm font-semibold text-red-500">
                  {accountsError}
                </div>
              ) : (
                <>
                  {accounts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {accounts.map((account) => {
                        const isActive = selectedAccount?.id === account.id;
                        return (
                          <button
                            key={account.id}
                            onClick={() => setSelectedAccountId(account.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                              isActive
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white text-primary border-surface-container hover:bg-slate-50"
                            }`}
                          >
                            {account.accountName || account.type || "Account"}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-6 sm:gap-8">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-secondary/60 font-bold">
                        Total Balance
                      </p>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">
                        {totalBalance}
                      </h3>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-secondary/60 font-bold">
                        Active Account
                      </p>
                      <p className="text-lg font-semibold text-tertiary">
                        {selectedAccount?.accountName || "N/A"}
                      </p>
                    </div>

                    <div className="group cursor-pointer">
                      <p className="text-[11px] uppercase tracking-widest text-secondary/60 font-bold mb-1">
                        Action
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Plus className="w-4 h-4 opacity-70 group-hover:opacity-100 transition" />
                        <span className="group-hover:underline">Add Funds</span>
                      </div>
                    </div>

                    <div className="group cursor-pointer">
                      <p className="text-[11px] uppercase tracking-widest text-secondary/60 font-bold mb-1">
                        Statement
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Download className="w-4 h-4 opacity-70 group-hover:opacity-100 transition" />
                        <span className="group-hover:underline">
                          Download Statement
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-[#4b6076] text-white rounded-xl overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-[#1f2b37] to-[#2f3e4d] rounded-xl p-5 shadow-xl overflow-hidden min-h-[230px]">
            {loadingDashboard ? (
              <div className="relative z-10 text-sm text-white/80 font-semibold flex items-center gap-2">
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Loading account card...
              </div>
            ) : dashboardError ? (
              <div className="relative z-10">
                <div className="text-sm text-red-200 font-semibold">
                  {dashboardError}
                </div>
                <button
                  onClick={() => fetchAccountDashboard(selectedAccountId, true)}
                  className="mt-3 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-black uppercase tracking-widest"
                >
                  Retry
                </button>
              </div>
            ) : !accountDashboard ? (
              <div className="relative z-10 text-sm text-white/80 font-semibold">
                No account found.
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                      Sacco Account
                    </p>
                    <h3 className="text-lg font-serif font-black mt-1">
                      {selectedAccount?.accountName ||
                        accountDashboard.accountType ||
                        "OneSacco"}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">
                      Balance
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <p className="text-sm font-black text-white">
                        {formatCurrency(accountDashboard.balance)}
                      </p>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 mb-6 flex items-center justify-between gap-4 relative z-10">
                  <div className="w-10 h-7 rounded-md bg-yellow-400/80 shadow-inner" />

                  <button
                    onClick={() => fetchAccountDashboard(selectedAccountId, true)}
                    disabled={dashboardRefreshing}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-black uppercase tracking-widest disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${
                        dashboardRefreshing ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </button>
                </div>

                <div className="relative z-10 flex">
                  <p className="tracking-[0.18em] text-base md:text-lg font-mono font-semibold break-all">
                    {formatAccountNumber(accountDashboard.accountNumber)}
                  </p>
                  <div className="ml-auto flex items-center gap-6 text-sm font-bold text-white">
                    <p>{accountDashboard.owner || user?.username || "N/A"}</p>
                    <p>{prettifyEnum(accountDashboard.accountType)}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between text-xs uppercase tracking-widest font-black">
                  <span className={getAccountStatusTone(accountDashboard.status)}>
                    {accountDashboard.status}
                  </span>
                  <span className="text-white/60">
                    {accountDashboard.primaryAccount ? "Primary Account" : "Secondary Account"}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </header>

      <hr />

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl mt-1 shadow-xl shadow-slate-200/50 border border-surface-container overflow-hidden"
      >
        <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-surface-container bg-slate-50/50">
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:w-56">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              >
                <option value="ALL">All Transactions</option>
                <option value="DEPOSIT">Deposits</option>
                <option value="WITHDRAWAL">Withdrawals</option>
                <option value="DIVIDEND">Dividend</option>
                <option value="LOAN_REPAYMENT">Loan Repayment</option>
                <option value="PENALTY">Penalty</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select
                value={entryFilter}
                onChange={(e) => setEntryFilter(e.target.value)}
                className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              >
                <option value="ALL">Entry: All</option>
                <option value="CREDIT">Credit</option>
                <option value="DEBIT">Debit</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[280px] md:w-[340px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by transaction, channel or narration..."
                className="w-full bg-white border border-surface-container py-2.5 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            <button
              onClick={() =>
                selectedAccountId &&
                fetchAccountTransactions(selectedAccountId, transactionsPage, true)
              }
              disabled={transactionsRefreshing || !selectedAccountId}
              className="h-11 w-11 shrink-0 rounded-xl border border-surface-container bg-white hover:bg-slate-50 flex items-center justify-center disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 text-primary ${
                  transactionsRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between gap-3">
          <span>
            Showing {currentStart} - {currentEnd} of {transactionsTotalElements} transactions
          </span>

          {loadingTransactions ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Loading transactions
            </span>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Date
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Reference
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Transaction
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Channel
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Entry
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Amount
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Running Balance
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
              {loadingTransactions ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={9} className="px-4 py-4">
                      <div className="h-5 rounded bg-slate-100 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : transactionsError ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center">
                    <p className="text-sm font-semibold text-red-500">
                      {transactionsError}
                    </p>
                    <button
                      onClick={() =>
                        selectedAccountId &&
                        fetchAccountTransactions(selectedAccountId, transactionsPage, true)
                      }
                      className="mt-3 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-black uppercase tracking-widest text-primary"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center">
                    <p className="text-sm font-semibold text-slate-500">
                      No transactions found
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx, index) => {
                  const statusLabel = getTransactionStatusLabel(tx.entryType);
                  const styles = getStatusStyles(statusLabel);
                  const isCredit = tx.entryType === "CREDIT";

                  return (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-primary">
                          {formatDateTime(tx.transactionDate)}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tight">
                          {tx.transactionNo || "N/A"}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-bold text-primary text-sm">
                          {prettifyEnum(tx.transactionType)}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {tx.narration || "No narration"}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-primary">
                          {prettifyEnum(tx.channel)}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                            isCredit
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {tx.entryType}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <p
                          className={`text-sm font-black ${
                            isCredit ? "text-emerald-700" : "text-red-700"
                          }`}
                        >
                          {isCredit ? "+" : "-"} {formatCurrency(tx.amount)}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <p className="text-sm font-black text-primary">
                          {formatCurrency(tx.runningBalance)}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <div
                          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${styles.text}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse`}
                          ></span>
                          {statusLabel}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() =>
              selectedAccountId &&
              fetchAccountTransactions(selectedAccountId, transactionsPage - 1)
            }
            disabled={transactionsPage <= 0 || loadingTransactions || !selectedAccountId}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500">
              Page {transactionsTotalPages === 0 ? 0 : transactionsPage + 1} of{" "}
              {transactionsTotalPages}
            </span>
          </div>

          <button
            onClick={() =>
              selectedAccountId &&
              fetchAccountTransactions(selectedAccountId, transactionsPage + 1)
            }
            disabled={
              loadingTransactions ||
              !selectedAccountId ||
              transactionsPage >= transactionsTotalPages - 1
            }
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
            Authorized Member Access Only | Account Activity Securely Protected
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 Mvita Oils Sacco. All member account data protected.
        </p>
      </footer>
    </>
  );
}