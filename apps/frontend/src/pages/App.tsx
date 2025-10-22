import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Home from './Home';
import Trips from './Trips';
import TripDetails from './TripDetails';
import Customize from './Customize';
import Admin from './admin/Admin';

export default function App() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent),radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.04),_transparent)] min-h-screen pb-20">
      <NavBar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </div>
  );
}
