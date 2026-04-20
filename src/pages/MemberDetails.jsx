import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  PlusCircle,
  Mail,
  PhoneCall,
  MapPin,
  Zap,
  TrendingUp,
  PiggyBank,
  Landmark,
  Gift,
  Lock,
  ArrowUpRight,
  Headset,
  Bell,
  HelpCircle,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AuthContext, { useAuth } from "../context/AuthContext";

const colors = {
  primary: "#162839",
  container: "#2C3E50",
  surface: "#f7f9ff",
  surfaceLow: "#edf4ff",
  surfaceHigh: "#d1e4fb",
  accent: "#ffb961",
  tertiary: "#ffddb9",
  onSurface: "#43474c",
};

export default function MemberDetails() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  

  useEffect(() => {
    if (accessToken && memberId) {
      fetchMember();
    } else if (!accessToken) {
      setLoading(false);
      setError('Not authenticated');
    }
  }, [memberId, accessToken]);

  const fetchMember = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/users/${memberId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch member details');
      }
      const data = await response.json();
      setMember(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading member details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => navigate('/app/members')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Member not found</p>
          <button
            onClick={() => navigate('/app/members')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate('/app/members')}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Members
      </button>

      {/* Dashboard Header */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-on-surface text-[10px] md:text-[11px] mb-4 uppercase tracking-[0.2em] font-bold">
            <span className="opacity-60">Members</span>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-primary-navy">Profile Details</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-navy tracking-tight leading-tight">
            {member.username}
          </h1>
          <p className="text-on-surface mt-2 font-medium">
            Member ID: {member.memberNumber} • {member.role}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex-1 md:flex-none bg-white text-primary-navy px-6 py-3 font-bold flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            <Edit size={18} />
            Edit Profile
          </button>
          <button className="flex-1 md:flex-none bg-primary-navy text-white px-6 py-3 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md">
            <PlusCircle size={18} />
            New Contribution
          </button>
        </div>
      </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Profile Info Sidebar (Span 4) */}
            <div className="xl:col-span-4 space-y-8">
              <div className="bg-white p-8 shadow-sm border border-slate-100 ring-1 ring-slate-900/5">
                <div className="relative w-32 h-32 mx-auto mb-8 group">
                  <div className="absolute inset-0 bg-primary-navy/10 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={`https://picsum.photos/seed/${member.username}/200/200`}
                    alt={member.username}
                    className="w-full h-full object-cover rounded-sm grayscale contrast-125 border-4 border-white shadow-inner"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent-safety-orange rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <Zap
                      size={14}
                      className="text-primary-navy fill-primary-navy"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2 mb-10">
                  <h3 className="font-serif text-3xl font-bold text-primary-navy">
                    {member.role}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Status: {member.status}
                  </p>
                  {member.accountApproved && (
                    <p className="text-green-600 text-xs font-bold uppercase tracking-widest">
                      Account Approved
                    </p>
                  )}
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-100">
                  <ContactItem
                    icon={<Mail size={18} />}
                    label="Email Address"
                    value={member.email}
                  />
                  <ContactItem
                    icon={<PhoneCall size={18} />}
                    label="Phone Number"
                    value={member.phoneNumber || 'Not provided'}
                  />
                  <ContactItem
                    icon={<MapPin size={18} />}
                    label="Member Since"
                    value={new Date(member.createdAt).toLocaleDateString()}
                  />
                </div>
              </div>

              {/* Member Status Card */}
              <div className="bg-primary-container-slate p-8 text-white relative overflow-hidden group shadow-xl">
                <div className="relative z-10">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50 mb-6">
                    Account Status
                  </h4>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-serif font-black">
                      {member.status}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      member.accountApproved
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {member.accountApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 mt-4 font-bold italic tracking-wider">
                    Member since {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[10px] text-white/40 mt-2 font-bold italic tracking-wider">
                    Last updated: {new Date(member.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-5 transform rotate-12 transition-transform duration-700 group-hover:scale-110">
                  <TrendingUp size={160} />
                </div>
              </div>
            </div>

            {/* Member Information Area (Span 8) */}
            <div className="xl:col-span-8 space-y-8">
              {/* Member Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InfoCard
                  icon={<Users size={24} className="text-primary-navy" />}
                  label="MEMBER NUMBER"
                  value={member.memberNumber}
                  theme="blue-light"
                />
                <InfoCard
                  icon={<Mail size={24} className="text-primary-navy" />}
                  label="EMAIL"
                  value={member.email}
                  theme="blue-heavy"
                />
                <InfoCard
                  icon={<PhoneCall size={24} className="text-primary-navy" />}
                  label="PHONE"
                  value={member.phoneNumber || 'Not provided'}
                  theme="orange"
                />
              </div>

              {/* Member Details Container */}
              <div className="bg-white shadow-sm border border-slate-100 ring-1 ring-slate-900/5">
                <div className="flex border-b border-slate-100 px-4 md:px-8">
                  <button className="px-4 md:px-6 py-6 border-b-2 border-primary-navy text-primary-navy font-black text-xs md:text-sm tracking-widest uppercase">
                    Member Information
                  </button>
                </div>

                <div className="p-4 md:p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Full Name
                        </h4>
                        <p className="text-lg font-serif font-bold text-primary-navy">
                          {member.username}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Role
                        </h4>
                        <p className="text-lg font-serif font-bold text-primary-navy">
                          {member.role}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Status
                        </h4>
                        <p className={`text-lg font-serif font-bold ${
                          member.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {member.status}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Account Approved
                        </h4>
                        <p className={`text-lg font-serif font-bold ${
                          member.accountApproved ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {member.accountApproved ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Created At
                        </h4>
                        <p className="text-lg font-serif font-bold text-primary-navy">
                          {new Date(member.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Updated At
                        </h4>
                        <p className="text-lg font-serif font-bold text-primary-navy">
                          {new Date(member.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Grid Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface-low p-8 border border-slate-100 shadow-sm">
                  <h4 className="font-serif text-2xl font-bold text-primary-navy mb-8">
                    Account Summary
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        Member ID
                      </span>
                      <span className="text-primary-navy font-bold">
                        {member.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        Status
                      </span>
                      <span className={`font-bold ${
                        member.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        Approved
                      </span>
                      <span className={`font-bold ${
                        member.accountApproved ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {member.accountApproved ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-navy p-8 text-white relative shadow-lg group overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                      <Lock size={20} className="text-accent-safety-orange" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold">
                      Member Actions
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed">
                    Manage member account settings, permissions, and access controls.
                  </p>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                    Manage Account
                    <ArrowUpRight size={16} />
                  </button>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>
        </>
  );
}



function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-12 h-12 bg-surface-low border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary-navy group-hover:bg-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-primary-navy group-hover:translate-x-1 transition-transform">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, theme }) {
  const themes = {
    "blue-light": "bg-surface-low",
    "blue-heavy": "bg-surface-high",
    orange: "bg-tertiary-fixed border-b-4 border-accent-safety-orange",
  };

  return (
    <div
      className={`${themes[theme]} p-8 h-44 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 bg-white/80 rounded-sm flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <span className="text-[9px] font-black bg-white/60 px-2 py-1 text-primary-navy tracking-widest">
          {label}
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-serif font-black text-primary-navy break-all">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

function TransactionItem({
  icon,
  title,
  meta,
  amount,
  status,
  negative = false,
  isBonus = false,
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-primary-navy">
      <div className="flex items-center gap-5">
        <div
          className={`w-14 h-14 bg-white shadow-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110`}
        >
          {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
        </div>
        <div>
          <h5 className="font-bold text-primary-navy group-hover:text-accent-safety-orange transition-colors">
            {title}
          </h5>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
            {meta}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-xl font-serif font-black ${negative ? "text-red-500" : "text-primary-navy"}`}
        >
          {amount}
        </p>
        <p
          className={`text-[9px] uppercase font-black tracking-widest mt-1 ${isBonus ? "text-accent-safety-orange" : "text-slate-400"}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
