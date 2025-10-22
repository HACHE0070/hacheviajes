import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div className="particles" />
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="https://cdn.coverr.co/videos/coverr-the-desert-9713/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow">Dream Morocco. Book the Journey.</h1>
          <p className="text-white/85 max-w-2xl mx-auto mb-8">Kites in Dakhla, riads in Marrakesh, surf in Agadir — curated, flexible, magical.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/trips" className="btn">Explore Trips</Link>
            <Link to="/customize" className="btn">Customize Yours</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
