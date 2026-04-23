import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Wallet,
  Landmark,
  HandCoins,
  PiggyBank,
  RefreshCw,
  X,
  Eye,
  LoaderCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const ACCOUNT_ICON_MAP = {
  "1001": Landmark,
  "1002": Wallet,
  "1003": Wallet,
  "2001": PiggyBank,
  "1004": HandCoins,
};

const STATUS_STYLES = {
  POSTED: "text-emerald-600",
  PENDING: "text-amber-600",
  REVERSED: "text-red-600",
};

const STATUS_DOT_STYLES = {
  POSTED: "bg-emerald-500",
  PENDING: "bg-amber-500",
  REVERSED: "bg-red-500",
};

function formatCurrency(amount) {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function BalanceCardSkeleton() {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-3 animate-pulse">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-8 w-8 rounded-md bg-white/10 shrink-0" />
        <div className="min-w-0 space-y-2">
          <div className="h-3 w-28 rounded bg-white/10" />
          <div className="h-2 w-16 rounded bg-white/10" />
        </div>
      </div>
      <div className="space-y-2 text-right">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-2 w-20 rounded bg-white/10" />
      </div>
    </div>
  );
}

function LedgerTableSkeleton() {
  return (
    <tbody className="divide-y divide-slate-100">
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index}>
          <td className="px-4 py-4">
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-28 rounded bg-slate-200" />
              <div className="h-2 w-20 rounded bg-slate-100" />
            </div>
          </td>
          <td className="px-4 py-4">
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-2 w-16 rounded bg-slate-100" />
            </div>
          </td>
          <td className="px-4 py-4">
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-40 rounded bg-slate-200" />
              <div className="h-3 w-28 rounded bg-slate-100" />
            </div>
          </td>
          <td className="px-4 py-4">
            <div className="animate-pulse h-3 w-24 rounded bg-slate-200 ml-auto" />
          </td>
          <td className="px-4 py-4">
            <div className="animate-pulse h-3 w-16 rounded bg-slate-200" />
          </td>
          <td className="px-4 py-4">
            <div className="animate-pulse h-8 w-8 rounded-lg bg-slate-100 ml-auto" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function LedgerRow({ row, onView }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="hover:bg-slate-50/80 transition-colors group"
    >
      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary">
            {formatDate(row.transactionDate)}
          </p>
          <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tight">
            {row.transactionNo}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary">
            {row.transactionType?.replaceAll("_", " ")}
          </p>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
            {row.channel}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <p className="text-[13px] font-serif font-black text-primary">
          {row.narration}
        </p>
        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">
          {row.createdBy}
        </p>
      </td>

      <td className="px-4 py-3">
        <p className="text-sm font-black text-primary text-right">
          {formatCurrency(row.totalAmount)}
        </p>
      </td>

      <td className="px-4 py-3">
        <div
          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${
            STATUS_STYLES[row.status] || "text-slate-500"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              STATUS_DOT_STYLES[row.status] || "bg-slate-400"
            }`}
          />
          {row.status}
        </div>
      </td>

      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onView(row.id)}
          className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg inline-flex items-center justify-center"
        >
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </motion.tr>
  );
}

export default function SaccoLedger() {
  const { accessToken } = useAuth();

  const [accountBalances, setAccountBalances] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsRefreshing, setAccountsRefreshing] = useState(false);
  const [accountsError, setAccountsError] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsRefreshing, setTransactionsRefreshing] = useState(false);
  const [transactionsError, setTransactionsError] = useState("");
  const [tablePage, setTablePage] = useState(0);
  const [tableSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const totalBalance = useMemo(() => {
    return accountBalances.reduce(
      (sum, account) => sum + Number(account.balance || 0),
      0
    );
  }, [accountBalances]);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return transactions.filter((item) => {
      const matchesStatus =
        statusFilter === "ALL" ? true : item.status === statusFilter;

      const matchesSearch =
        !normalizedSearch ||
        item.transactionNo?.toLowerCase().includes(normalizedSearch) ||
        item.narration?.toLowerCase().includes(normalizedSearch) ||
        item.transactionType?.toLowerCase().includes(normalizedSearch) ||
        item.channel?.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [transactions, search, statusFilter]);

  const fetchCoreAccountBalances = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setAccountsRefreshing(true);
        } else {
          setAccountsLoading(true);
        }

        setAccountsError("");

        const response = await fetch(
          `${apiUrl}/api/ledger/core-account-balances`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load core account balances");
        }

        const data = await response.json();
        setAccountBalances(Array.isArray(data) ? data : []);
      } catch (error) {
        setAccountsError(error.message || "Failed to load balances");
      } finally {
        setAccountsLoading(false);
        setAccountsRefreshing(false);
      }
    },
    [accessToken]
  );

  const fetchTransactions = useCallback(
    async (page = 0, isRefresh = false) => {
      try {
        if (isRefresh) {
          setTransactionsRefreshing(true);
        } else {
          setTransactionsLoading(true);
        }

        setTransactionsError("");

        const response = await fetch(
          `${apiUrl}/api/ledger/transactions?page=${page}&size=${tableSize}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load ledger transactions");
        }

        const data = await response.json();

        setTransactions(Array.isArray(data.content) ? data.content : []);
        setTotalPages(data.totalPages ?? 0);
        setTotalElements(data.totalElements ?? 0);
        setTablePage(data.number ?? page);
      } catch (error) {
        setTransactionsError(error.message || "Failed to load transactions");
      } finally {
        setTransactionsLoading(false);
        setTransactionsRefreshing(false);
      }
    },
    [accessToken, tableSize]
  );

  const fetchTransactionDetails = useCallback(
    async (transactionId) => {
      try {
        setDetailsLoading(true);
        setDetailsError("");
        setTransactionDetails(null);

        const response = await fetch(
          `${apiUrl}/api/ledger/transactions/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load transaction details");
        }

        const data = await response.json();
        setTransactionDetails(data);
      } catch (error) {
        setDetailsError(error.message || "Failed to load transaction details");
      } finally {
        setDetailsLoading(false);
      }
    },
    [accessToken]
  );

  const handleOpenDetails = async (transactionId) => {
    setSelectedTransactionId(transactionId);
    setDetailsOpen(true);
    await fetchTransactionDetails(transactionId);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedTransactionId(null);
    setTransactionDetails(null);
    setDetailsError("");
  };

  useEffect(() => {
    fetchCoreAccountBalances();
  }, [fetchCoreAccountBalances]);

  useEffect(() => {
    fetchTransactions(0);
  }, [fetchTransactions]);

  const currentStart =
    totalElements === 0 ? 0 : Math.min(tablePage * tableSize + 1, totalElements);
  const currentEnd = Math.min((tablePage + 1) * tableSize, totalElements);

  return (
    <>
      <header className="mb-10 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase font-sans">
              Financial Control Desk
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-black text-primary leading-tight tracking-tight">
              Sacco Ledger
            </h1>

            <p className="text-secondary/80 max-w-2xl text-lg font-medium leading-relaxed">
              Centralized oversight of sacco financial movements across global
              accounts and posted ledger transactions.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap pt-2">
            <button className="px-6 py-3.5 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2 group shadow-sm">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Export Ledger
            </button>

            <button className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg shadow-xl shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Entry
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-primary text-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                Accounts
              </p>
              <h3 className="text-sm font-serif font-black text-white">
                Balance Snapshot
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[11px] font-black text-white/70">
                {formatCurrency(totalBalance)}
              </p>
              <button
                type="button"
                onClick={() => fetchCoreAccountBalances(true)}
                disabled={accountsRefreshing}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${
                    accountsRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/10 min-h-[280px]">
            {accountsLoading ? (
              <>
                <BalanceCardSkeleton />
                <BalanceCardSkeleton />
                <BalanceCardSkeleton />
                <BalanceCardSkeleton />
              </>
            ) : accountsError ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-bold text-red-200">{accountsError}</p>
                <button
                  type="button"
                  onClick={() => fetchCoreAccountBalances(true)}
                  className="mt-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-black uppercase tracking-widest"
                >
                  Retry
                </button>
              </div>
            ) : accountBalances.length === 0 ? (
              <div className="px-4 py-8 text-center text-white/70 text-sm font-bold">
                No core account balances found
              </div>
            ) : (
              accountBalances.map((item) => {
                const Icon = ACCOUNT_ICON_MAP[item.accountCode] || Wallet;

                return (
                  <div
                    key={item.accountId}
                    className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-white truncate">
                          {item.accountName}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/60">
                          <span>{item.accountCode}</span>
                          <span>•</span>
                          <span>{item.accountType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-serif font-black text-white">
                        {formatCurrency(item.balance)}
                      </p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-1">
                        Dr {formatCurrency(item.totalDebits)} • Cr{" "}
                        {formatCurrency(item.totalCredits)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
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
            <div className="relative flex-1 md:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white border border-surface-container py-2 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              >
                <option value="ALL">Status: All</option>
                <option value="POSTED">Posted</option>
                <option value="PENDING">Pending</option>
                <option value="REVERSED">Reversed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[280px] md:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by txn no, type, channel or narration..."
                className="w-full bg-white border border-surface-container py-2 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => fetchTransactions(tablePage, true)}
              disabled={transactionsRefreshing}
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
            Showing {currentStart} - {currentEnd} of {totalElements} ledger
            transactions
          </span>
          {transactionsLoading ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Loading transactions
            </span>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500">
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Entry Date
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Transaction
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Transaction Narrative
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Amount
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Action
                </th>
              </tr>
            </thead>

            {transactionsLoading ? (
              <LedgerTableSkeleton />
            ) : transactionsError ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-sm font-bold text-red-600">
                      {transactionsError}
                    </p>
                    <button
                      type="button"
                      onClick={() => fetchTransactions(tablePage, true)}
                      className="mt-3 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-black uppercase tracking-widest text-primary"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              </tbody>
            ) : filteredTransactions.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-sm font-bold text-slate-400"
                  >
                    No transactions found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((row) => (
                  <LedgerRow key={row.id} row={row} onView={handleOpenDetails} />
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => fetchTransactions(tablePage - 1)}
            disabled={tablePage <= 0 || transactionsLoading}
            className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            Page {totalPages === 0 ? 0 : tablePage + 1} of {totalPages}
          </div>

          <button
            type="button"
            onClick={() => fetchTransactions(tablePage + 1)}
            disabled={tablePage >= totalPages - 1 || transactionsLoading}
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
            Authorized Financial Access Only | 256-Bit Ledger Security
          </p>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 Mvita Oils Sacco. All financial records protected.
        </p>
      </footer>

      <AnimatePresence>
        {detailsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
              className="fixed inset-0 bg-black/30 z-40"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col"
            >
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                    Ledger Transaction
                  </p>
                  <h3 className="text-lg font-serif font-black text-primary">
                    Transaction Details
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {detailsLoading ? (
                  <div className="py-16 flex flex-col items-center justify-center text-slate-500">
                    <LoaderCircle className="w-6 h-6 animate-spin mb-3" />
                    <p className="text-sm font-bold">Loading transaction details...</p>
                  </div>
                ) : detailsError ? (
                  <div className="py-10 text-center">
                    <p className="text-sm font-bold text-red-600">{detailsError}</p>
                    <button
                      type="button"
                      onClick={() => fetchTransactionDetails(selectedTransactionId)}
                      className="mt-3 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-black uppercase tracking-widest text-primary"
                    >
                      Retry
                    </button>
                  </div>
                ) : transactionDetails ? (
                  <div className="space-y-6">
                    <section className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Transaction No
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {transactionDetails.transactionNo}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Status
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {transactionDetails.status}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Type
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {transactionDetails.transactionType?.replaceAll(
                              "_",
                              " "
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Channel
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {transactionDetails.channel}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Amount
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {formatCurrency(transactionDetails.totalAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Date
                          </p>
                          <p className="mt-1 text-sm font-bold text-primary">
                            {formatDate(transactionDetails.transactionDate)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Narration
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {transactionDetails.narration}
                        </p>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-serif font-black text-primary">
                          Journal Entries
                        </h4>

                        <button
                          type="button"
                          onClick={() => fetchTransactionDetails(selectedTransactionId)}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Refresh
                        </button>
                      </div>

                      <div className="space-y-3">
                        {transactionDetails.journalEntries?.length ? (
                          transactionDetails.journalEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className="rounded-2xl border border-slate-100 bg-white p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p
                                    className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                      entry.entryType === "DEBIT"
                                        ? "text-emerald-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {entry.entryType}
                                  </p>
                                  <p className="mt-1 text-sm font-bold text-primary">
                                    {entry.accountCode} - {entry.accountName}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500 font-medium">
                                    {entry.narration || "No narration"}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm font-serif font-black text-primary">
                                    {formatCurrency(entry.amount)}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                                    Line {entry.entryOrder}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm font-bold text-slate-400">
                            No journal entries found
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                ) : null}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}