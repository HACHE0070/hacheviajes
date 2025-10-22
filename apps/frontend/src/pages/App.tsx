import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Home from './Home';
import Trips from './Trips';
import TripDetails from './TripDetails';
import Customize from './Customize';
// Admin panel removed

export default function App() {
  return (
    <div className="bg-clouds min-h-screen pb-20">
      <NavBar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/customize" element={<Customize />} />
          {/** Admin route removed */}
        </Routes>
      </motion.div>
    </div>
  );
}
