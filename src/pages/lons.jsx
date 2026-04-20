import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Banknote, 
  FileText, 
  LogOut, 
  LineChart, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  Download, 
  PlusCircle, 
  Factory, 
  Shield, 
  ChevronRight 
} from 'lucide-react';
import { motion } from 'motion/react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <a 
    href="#" 
    className={`flex items-center px-6 py-3 transition-all duration-200 ${
      active 
        ? 'text-primary font-bold bg-surface-container-low border-r-4 border-orange-600 translate-x-1' 
        : 'text-primary/60 hover:bg-surface-container-low hover:translate-x-1'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-sans font-medium text-sm tracking-wide">{label}</span>
  </a>
);

const MetricCard = ({ label, value }) => (
  <div className="bg-surface-container-low p-6">
    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">{label}</p>
    <p className="font-headline text-xl text-primary">{value}</p>
  </div>
);

const GuarantorCard = ({ initials, name, id, amount, highlight = false }) => (
  <div className={`bg-surface-container-low p-4 flex items-center space-x-4 border-l-4 ${highlight ? 'border-primary' : 'border-primary/40'}`}>
    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary font-bold">
      {initials}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-primary leading-tight">{name}</p>
      <p className="text-[10px] text-on-surface-variant">ID: {id}</p>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-primary">KES {amount}</p>
      <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Guaranteed</p>
    </div>
  </div>
);

export default function Lons() {
  const profileAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDVNZETCJqWjSeaNan0dGAhbq-wGs7EZ5C2pbhszy1Oe8FOiyNgwuPUs5c2mFwXAEVWjp7cVrftTcGMPrXu1e1EElJQKDu9eXJCwNe_RLvnUZPvq81tIWdybwH3KyDs5xbivPcHutihbyvKPLtH5hNdba18JVjQLNNOOBz8X_vOb2kGVmNg60rqgvyt80_VOHKU4biYYcdmhUEGF3AnYUsBtaxxupghRdr7HC712kxrlDdF3v32unWZeP0-eUWxjL8wDlaYrtWy0Al5";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 bg-background border-r border-on-surface/10 z-50">
        <div className="px-6 py-8 mb-4">
          <h1 className="font-headline text-lg font-bold text-primary">Industrial Sacco</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60">Management Portal</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={Users} label="Members" />
          <SidebarItem icon={Wallet} label="Savings" />
          <SidebarItem icon={Banknote} label="Loans" active />
          <SidebarItem icon={FileText} label="Repayments" />
          <SidebarItem icon={LogOut} label="Withdrawals" />
          <SidebarItem icon={LineChart} label="Reports" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header */}
        <header className="h-16 sticky top-0 z-40 bg-primary/95 backdrop-blur-md flex justify-between items-center px-6 text-background">
          <div className="flex items-center space-x-4">
            <span className="font-headline font-bold tracking-tight text-xl">Mvita Oils Sacco</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-primary-container/50 rounded px-3 py-1.5 border-b border-orange-500/30">
              <Search className="w-4 h-4 mr-2 opacity-70" />
              <input 
                type="text" 
                placeholder="Search loans..." 
                className="bg-transparent border-none focus:ring-0 text-sm placeholder-white/40 w-48"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-white/70 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold leading-none">Profile</p>
                  <p className="text-[10px] text-white/50">Admin Account</p>
                </div>
                <img 
                  src={profileAvatar}
                  alt="Admin Profile"
                  className="w-8 h-8 rounded bg-surface-container shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-surface-container-lowest p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-tertiary-fixed-dim text-tertiary font-bold px-3 py-1 text-xs tracking-widest rounded-sm">ACTIVE</span>
                    <span className="text-on-surface-variant font-mono text-sm">#MVI-LN-2023-8942</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
                    Loan Details: <span className="text-on-surface-variant">Asset Financing</span>
                  </h2>
                  <p className="mt-4 text-on-surface-variant max-w-md">
                    Loan issued to David Mwangi for the acquisition of industrial oil processing machinery.
                  </p>
                </div>
                
                <div className="mt-12 flex flex-wrap gap-4 relative z-10">
                  <button className="px-6 py-3 bg-primary text-white font-bold text-sm rounded shadow-sm hover:translate-y-[-2px] transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Statement
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary font-bold text-sm rounded hover:bg-primary-container/5 transition-all flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Request Top-up
                  </button>
                </div>
                
                {/* Background Decor */}
                <Factory className="absolute right-0 bottom-0 text-primary/5 w-40 h-40 -mr-8 -mb-8 pointer-events-none" />
              </div>

              {/* Summary Cards */}
              <div className="bg-primary-container text-on-primary-container p-8 flex flex-col justify-center space-y-6 shadow-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Principal Amount</p>
                  <p className="text-4xl font-headline font-bold text-white">KES 1,250,000</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Remaining Balance</p>
                  <p className="text-4xl font-headline font-bold text-tertiary-fixed-dim">KES 485,200</p>
                </div>
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Interest Rate</p>
                    <p className="font-bold text-white">12.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Duration</p>
                    <p className="font-bold text-white">24 Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 rounded-lg overflow-hidden border border-outline-variant/10 shadow-sm">
              <MetricCard label="Start Date" value="15 Jan 2023" />
              <MetricCard label="End Date" value="15 Jan 2025" />
              <MetricCard label="Last Payment" value="12 Oct 2023" />
              <MetricCard label="Next Due" value="15 Nov 2023" />
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              {/* Repayment Schedule */}
              <div className="xl:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-headline font-bold text-primary">Repayment Schedule</h3>
                  <span className="text-xs text-on-surface-variant font-medium">10 of 24 Installments Paid</span>
                </div>
                
                <div className="overflow-x-auto bg-surface-container-lowest rounded-sm shadow-sm border border-outline-variant/5">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
                        <th className="px-6 py-4 font-bold text-xs">#</th>
                        <th className="px-6 py-4 font-bold text-xs">Due Date</th>
                        <th className="px-6 py-4 font-bold text-xs">Principal</th>
                        <th className="px-6 py-4 font-bold text-xs">Interest</th>
                        <th className="px-6 py-4 font-bold text-xs text-right">Total</th>
                        <th className="px-6 py-4 font-bold text-xs text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-outline-variant/10">
                      {[ 
                        { id: '08', date: '15 Aug 2023', p: '52,083', i: '13,020', t: '65,103', s: 'PAID' },
                        { id: '09', date: '15 Sep 2023', p: '52,083', i: '12,478', t: '64,561', s: 'PAID' },
                        { id: '10', date: '15 Oct 2023', p: '52,083', i: '11,935', t: '64,018', s: 'PENDING' },
                        { id: '11', date: '15 Nov 2023', p: '52,083', i: '11,392', t: '63,475', s: 'UPCOMING' },
                        { id: '12', date: '15 Dec 2023', p: '52,083', i: '10,849', t: '62,932', s: 'UPCOMING' },
                      ].map((row, idx) => (
                        <tr key={row.id} className={row.s === 'PENDING' ? 'bg-surface-container-low/50' : row.s === 'UPCOMING' ? 'opacity-60' : ''}>
                          <td className="px-6 py-4 text-on-surface-variant font-mono">{row.id}</td>
                          <td className="px-6 py-4 font-medium">{row.date}</td>
                          <td className="px-6 py-4 text-on-surface-variant">{row.p}</td>
                          <td className="px-6 py-4 text-on-surface-variant">{row.i}</td>
                          <td className="px-6 py-4 text-right font-bold text-primary">{row.t}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.s === 'PAID' ? 'bg-green-100 text-green-800' :
                              row.s === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                              'bg-surface-container text-on-surface-variant'
                            }`}>
                              {row.s}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Guarantors */}
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold text-primary">Loan Guarantors</h3>
                <div className="space-y-3">
                  <GuarantorCard initials="SM" name="Sarah Muthoni" id="MVA-7721" amount="300,000" highlight />
                  <GuarantorCard initials="JK" name="John Kamau" id="MVA-4490" amount="250,000" />
                  <GuarantorCard initials="AN" name="Alice Njeri" id="MVA-1209" amount="700,000" />
                </div>
                
                {/* Risk Indicator */}
                <div className="mt-6 p-4 bg-tertiary/5 rounded-sm border border-tertiary-fixed-dim/20 flex gap-3">
                  <Shield className="w-5 h-5 text-tertiary shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-tertiary">Guarantor Risk Level: Low</p>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">
                      Total collateral coverage exceeds loan value by 1.2x. Asset remains under lien by Mvita Oils Sacco.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-auto p-6 bg-surface-container-low text-center border-t border-outline-variant/10 text-on-surface-variant">
          <p className="text-[10px] uppercase tracking-widest">
            © 2023 Mvita Oils Sacco • Industrial Finance Management System • Secure Audit Log Enabled
          </p>
        </footer>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-lg flex justify-around items-center h-16 text-white/70 z-50">
        <a href="#" className="flex flex-col items-center">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[9px] mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center text-white border-b-2 border-orange-500 pb-1">
          <Banknote className="w-5 h-5" />
          <span className="text-[9px] mt-1">Loans</span>
        </a>
        <a href="#" className="flex flex-col items-center">
          <Users className="w-5 h-5" />
          <span className="text-[9px] mt-1">Members</span>
        </a>
        <a href="#" className="flex flex-col items-center">
          <Settings className="w-5 h-5" />
          <span className="text-[9px] mt-1">Settings</span>
        </a>
      </nav>
    </div>
  );
}
