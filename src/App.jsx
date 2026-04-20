
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Members from './pages/Members.jsx';
import MemberDetails from './pages/MemberDetails.jsx';
import LoansUpdated from './pages/LoansUpdated.jsx';
import LoanDetails from './pages/LoanDetails.jsx';


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
    
        <Route path="loans" element={<LoanDetails />} />
        <Route path="loans/:loanId" element={<LoanDetails />} />
        <Route path="reports" element={<div>Reports (placeholder)</div>} />
        <Route path="settings" element={<div>Settings (placeholder)</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
