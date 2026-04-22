import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  Plus,
  Send,
  ArrowDownLeft,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const recentTransactions = [
  {
    id: "TXN-100231",
    date: "24 Apr 2026",
    type: "Savings Deposit",
    channel: "M-Pesa",
    amount: "+ KES 12,000.00",
    status: "COMPLETED",
  },
  {
    id: "TXN-100230",
    date: "23 Apr 2026",
    type: "Loan Repayment",
    channel: "Standing Order",
    amount: "- KES 8,500.00",
    status: "COMPLETED",
  },
  {
    id: "TXN-100229",
    date: "22 Apr 2026",
    type: "Withdrawal Request",
    channel: "Mobile App",
    amount: "- KES 5,000.00",
    status: "PROCESSING",
  },
  {
    id: "TXN-100228",
    date: "21 Apr 2026",
    type: "Interest Posting",
    channel: "System",
    amount: "+ KES 1,240.00",
    status: "COMPLETED",
  },
  {
    id: "TXN-100227",
    date: "19 Apr 2026",
    type: "Shares Contribution",
    channel: "Bank Transfer",
    amount: "+ KES 15,000.00",
    status: "COMPLETED",
  },
];

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

export default function AccountsPage() {
  const apiUrl = import.meta.env.VITE_API_URL;


  const { accessToken, user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [accountsError, setAccountsError] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    if (!accessToken || !user?.id) {
      setLoadingAccounts(false);
      return;
    }

    fetchMemberAccounts();
    console.log({ apiUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user?.id]);

  const fetchMemberAccounts = async () => {
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
        },
      );

      let data = [];
      try {
        data = await response.json();
      } catch {
        data = [];
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Failed to fetch member accounts",
        );
      }

      const normalizedAccounts = Array.isArray(data) ? data : [];
      setAccounts(normalizedAccounts);

      const primary =
        normalizedAccounts.find((account) => account.primaryAccount) ||
        normalizedAccounts[0] ||
        null;

      setSelectedAccountId(primary?.id ?? null);
    } catch (error) {
      setAccountsError(error.message || "Failed to fetch member accounts");
    } finally {
      setLoadingAccounts(false);
    }
  };

  const selectedAccount = useMemo(() => {
    if (!accounts.length) return null;

    return (
      accounts.find((account) => account.id === selectedAccountId) ||
      accounts.find((account) => account.primaryAccount) ||
      accounts[0]
    );
  }, [accounts, selectedAccountId]);

  const totalBalance = useMemo(() => {
    if (!accounts.length) return "KES 0.00";

    const balances = accounts.map((account) => account.balance || "KES 0.00");

    const numericTotal = balances.reduce((sum, balance) => {
      const value = Number(String(balance).replace(/[^\d.-]/g, "")) || 0;
      return sum + value;
    }, 0);

    return `KES ${numericTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [accounts]);

  const formatAccountNumber = (value) => {
    if (!value) return "N/A";
    return value;
  };

  return (
    <>
      {/* Header */}
      <header className="mb-1 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <div className="gap-8 items-start mb-10">
          {/* LEFT */}
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

          {/* RIGHT */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-container shadow-xl shadow-slate-200/40 overflow-hidden"
          >
            <div className="p-6 md:p-7 bg-slate-50/50 space-y-6">
              {loadingAccounts ? (
                <div className="text-sm font-semibold text-slate-500">
                  Loading account summary...
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
                            className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${isActive
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

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-[#4b6076] text-white rounded-xl overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-[#1f2b37] to-[#2f3e4d] rounded-xl p-5 shadow-xl overflow-hidden min-h-[230px]">
            {loadingAccounts ? (
              <div className="relative z-10 text-sm text-white/80 font-semibold">
                Loading account card...
              </div>
            ) : accountsError ? (
              <div className="relative z-10 text-sm text-red-200 font-semibold">
                {accountsError}
              </div>
            ) : !selectedAccount ? (
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
                      {selectedAccount.accountName || "OneSacco"}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">
                      Balance
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <p className="text-sm font-black text-white">
                        {selectedAccount.balance || "KES 0.00"}
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
                  
                </div>

                <div className="relative z-10 flex ">
                  <p className="tracking-[0.18em] text-base md:text-lg font-mono font-semibold break-all">
                    {formatAccountNumber(selectedAccount.accountNumber)}
                  </p>
                  <div className="ml-auto flex items-center gap-6 text-sm font-bold text-white">
                    <p>{selectedAccount.owner || user?.username || "N/A"}</p>
                    <p>{selectedAccount.type || "N/A"}</p>
                  </div>
                </div>
              </>
            )}  
          </div>
        </motion.div>
      </header>

      <hr />

      {/* Transactions Table */}
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
              <select className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary pl-10 pr-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>All Transactions</option>
                <option>Deposits</option>
                <option>Withdrawals</option>
                <option>Repayments</option>
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <select className="w-full bg-white border border-surface-container py-2.5 rounded-xl text-sm font-bold text-primary px-4 appearance-none focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                <option>Status: All</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="relative flex-1 min-w-[280px] md:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by transaction or channel..."
              className="w-full bg-white border border-surface-container py-2.5 pl-10 pr-4 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>

        <div className="p-4 border-b border-surface-container bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {recentTransactions.length} recent transactions
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[980px]">
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
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-right">
                  Amount
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
              {recentTransactions.map((tx, index) => {
                const styles = getStatusStyles(tx.status);
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
                        {tx.date}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tight">
                        {tx.id}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-bold text-primary text-sm">
                        {tx.type}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-primary">
                        {tx.channel}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-black text-primary">
                        {tx.amount}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <div
                        className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${styles.text}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse`}
                        ></span>
                        {tx.status}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-300 hover:text-primary transition-colors p-2 hover:bg-slate-200/50 rounded-lg">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 font-black text-xs">
              1
            </button>
            <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
              2
            </button>
            <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
              3
            </button>
            <span className="px-2 text-slate-300 font-bold">...</span>
            <button className="h-8 w-8 rounded-lg text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">
              8
            </button>
          </div>

          <button className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
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