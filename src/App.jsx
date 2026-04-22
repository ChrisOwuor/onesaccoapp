
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Members from './pages/Members.jsx';
import MemberDetails from './pages/MemberDetails.jsx';
import LoanDetails from './pages/LoanDetails.jsx';
import Loans from './pages/Loans.jsx';
import SaccoLedger from './pages/SaccoLedger.jsx';
import LoanProducts from './pages/LoanProducts.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import AllAccountsPage from './pages/AllAccountsPage.jsx';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:memberId" element={<MemberDetails />} />
        <Route path="savings" element={<div>Savings (placeholder)</div>} />
        <Route path="loans" element={<Loans />} />
        <Route path="loans/:loanId" element={<LoanDetails />} />
        <Route path="ledger" element={<SaccoLedger />} />
        <Route path="loans/products" element={<LoanProducts />} />
        <Route path="my-account" element={<AccountsPage />} />
        <Route path="accounts" element={<AllAccountsPage />} />
        <Route path="reports" element={<div>Reports (placeholder)</div>} />
        <Route path="settings" element={<div>Settings (placeholder)</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
