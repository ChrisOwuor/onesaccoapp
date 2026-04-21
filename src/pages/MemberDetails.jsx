import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Mail,
  PhoneCall,
  MapPin,
  ArrowLeft,
  Edit,
  Lock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MemberDetails() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!accessToken) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    if (!memberId) return;
    fetchMember();
  }, [memberId, accessToken]);

  async function fetchMember() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/api/users/${memberId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Unable to load member");
      const data = await res.json();
      setMember(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <SimpleState message="Loading member..." />;
  if (error)
    return (
      <SimpleState
        message={`Error: ${error}`}
        onBack={() => navigate("/app/members")}
      />
    );
  if (!member)
    return (
      <SimpleState
        message="Member not found"
        onBack={() => navigate("/app/members")}
      />
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/app/members")}
            className="text-sm text-[color:var(--color-secondary)] hover:text-[color:var(--color-primary)] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 text-[color:var(--color-brand-primary)] hover:text-[color:var(--color-primary)]  font-bold rounded-md flex items-center gap-2">
            <Edit size={14} /> Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside
          className="lg:col-span-4 bg-[color:var(--color-surface-base)] rounded-lg p-6 shadow-sm border"
          style={{ borderColor: "var(--color-surface-container-low)" }}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2"
              style={{ borderColor: "var(--color-primary-container)" }}
            >
              <img
                src={`https://picsum.photos/seed/${member.username}/300/300`}
                alt={member.username}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-lg font-bold text-[color:var(--color-primary-navy)]">
              {member.username}
            </h3>
            <p className="text-sm text-[color:var(--color-secondary)]">
              {member.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${member.status === "ACTIVE" ? "bg-[color:var(--color-surface-container)] text-green-700" : "bg-[color:var(--color-tertiary-container)] text-[color:var(--color-tertiary)]"}`}
              >
                {member.status || "UNKNOWN"}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ContactRow
              icon={<Mail size={16} />}
              label="Email"
              value={member.email}
            />
            <ContactRow
              icon={<PhoneCall size={16} />}
              label="Phone"
              value={member.phoneNumber || "—"}
            />
            <ContactRow
              icon={<MapPin size={16} />}
              label="Member since"
              value={new Date(member.createdAt).toLocaleDateString()}
            />
          </div>
        </aside>

        <main className="lg:col-span-8 space-y-6">
          <section
            className="bg-white rounded-lg p-6 shadow-sm border"
            style={{ borderColor: "var(--color-surface-container-low)" }}
          >
            <h4 className="text-sm font-black uppercase tracking-wider text-[color:var(--color-secondary)] mb-4">
              Member Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" value={member.username} />
              <Field label="Role" value={member.role} />
              <Field
                label="Account approved"
                value={member.accountApproved ? "Yes" : "No"}
              />
              <Field
                label="Created"
                value={new Date(member.createdAt).toLocaleString()}
              />
              <Field
                label="Updated"
                value={new Date(member.updatedAt).toLocaleString()}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-[color:var(--color-surface-low)] rounded-lg p-6">
              <h4 className="font-serif text-xl font-bold text-[color:var(--color-primary-navy)] mb-4">
                Account Summary
              </h4>
              <div className="space-y-3 text-sm text-[color:var(--color-secondary)]">
                <SummaryRow
                  label="Member ID"
                  value={member.memberNumber || member.id}
                />
                <SummaryRow
                  label="Status"
                  value={member.status}
                  valueStyle={
                    member.status === "ACTIVE"
                      ? "text-green-700"
                      : "text-yellow-700"
                  }
                />
                <SummaryRow
                  label="Approved"
                  value={member.accountApproved ? "Yes" : "No"}
                />
              </div>
            </section>

            <section className="bg-[color:var(--color-brand-primary)] text-white rounded-lg p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                  <Lock size={18} />
                </div>
                <h4 className="font-serif text-lg font-bold">Member Actions</h4>
              </div>
              <p className="text-sm text-white/70 mb-6">
                Manage member account settings and access controls.
              </p>
              <button className="w-full py-3 bg-white text-[color:var(--color-primary-navy)] font-bold rounded-md flex items-center justify-center gap-2">
                <ArrowUpRight size={14} /> Manage Account
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function SimpleState({ message, onBack }) {
  return (
    <div className="min-h-[45vh] flex items-center justify-center">
      <div className="text-center">
        <p className="mb-4 text-[color:var(--color-secondary)]">{message}</p>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-[color:var(--color-brand-accent)] text-white rounded-md"
          >
            Back to members
          </button>
        )}
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="text-sm">
        <div className="text-xs text-[color:var(--color-secondary)] uppercase font-black tracking-wider">
          {label}
        </div>
        <div className="font-bold text-[color:var(--color-primary-navy)]">
          {value}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-[color:var(--color-secondary)] uppercase font-black tracking-wider mb-1">
        {label}
      </div>
      <div className="font-medium text-[color:var(--color-primary-navy)]">
        {value}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueStyle }) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xs text-[color:var(--color-secondary)] uppercase tracking-widest">
        {label}
      </div>
      <div
        className={`font-bold ${valueStyle || "text-[color:var(--color-primary-navy)]"}`}
      >
        {value}
      </div>
    </div>
  );
}
