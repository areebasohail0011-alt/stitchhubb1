import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public & Auth Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer Pages
import { BrowseTailorsPage } from './pages/customer/BrowseTailorsPage';
import { BrowseCouriersPage } from './pages/customer/BrowseCouriersPage';
import { TailorProfilePage } from './pages/customer/TailorProfilePage';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { BookTailorPage } from './pages/customer/BookTailorPage';
import { MyOrdersPage } from './pages/customer/MyOrdersPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { UploadMeasurementsPage } from './pages/customer/UploadMeasurementsPage';

// Role Dashboards
import { TailorDashboard } from './pages/tailor/TailorDashboard';
import { CourierDashboard } from './pages/courier/CourierDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// AI Assistant Dedicated View
import { AIChatbotPage } from './pages/ai/AIChatbotPage';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-sans mesh-bg text-slate-800 antialiased selection:bg-purple-500 selection:text-white">
            <Navbar />

            <main className="flex-1">
              <Routes>
                {/* Public & Auth */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Customer Views */}
                <Route path="/browse-tailors" element={<BrowseTailorsPage />} />
                <Route path="/browse-couriers" element={<BrowseCouriersPage />} />
                <Route path="/tailor-profile/:tailorId" element={<TailorProfilePage />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/customer/book" element={<BookTailorPage />} />
                <Route path="/customer/orders" element={<MyOrdersPage />} />
                <Route path="/customer/track/:orderId" element={<OrderTrackingPage />} />
                <Route path="/customer/measurements" element={<UploadMeasurementsPage />} />

                {/* Role Dashboards */}
                <Route path="/tailor" element={<TailorDashboard />} />
                <Route path="/courier" element={<CourierDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />

                {/* AI Assistant Dedicated Page */}
                <Route path="/chatbot" element={<AIChatbotPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
