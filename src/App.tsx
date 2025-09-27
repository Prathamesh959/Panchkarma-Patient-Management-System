import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import TherapyProgress from "./pages/TherapyProgress";
import Notifications from "./pages/Notifications";
import Billing from "./pages/Billing";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            <Route path="/appointment" element={
              <DashboardLayout>
                <Appointment />
              </DashboardLayout>
            } />
            <Route path="/therapy-progress" element={
              <DashboardLayout>
                <TherapyProgress />
              </DashboardLayout>
            } />
            <Route path="/notifications" element={
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            } />
            <Route path="/billing" element={
              <DashboardLayout>
                <Billing />
              </DashboardLayout>
            } />
            <Route path="/feedback" element={
              <DashboardLayout>
                <Feedback />
              </DashboardLayout>
            } />
            <Route path="/support" element={
              <DashboardLayout>
                <Support />
              </DashboardLayout>
            } />
            <Route path="/profile" element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            } />
            <Route path="/analytics" element={
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
