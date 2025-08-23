import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/screens/Dashboard';
import AvailabilityBoard from '@/components/screens/AvailabilityBoard';
import ReservationWizard from '@/components/screens/ReservationWizard';
import CheckInOut from '@/components/screens/CheckInOut';
import Housekeeping from '@/components/screens/Housekeeping';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/availability" element={<AvailabilityBoard />} />
            <Route path="/reservation" element={<ReservationWizard />} />
            <Route path="/checkin" element={<CheckInOut type="checkin" />} />
            <Route path="/checkout" element={<CheckInOut type="checkout" />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;