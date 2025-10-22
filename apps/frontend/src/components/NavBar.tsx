import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl mt-4">
        <div className="glass flex items-center justify-between px-6 py-3">
          <Link to="/" className="font-bold text-2xl text-white drop-shadow">Hache Viajes</Link>
          <nav className="flex gap-6 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/trips', label: 'Available Trips' },
              { to: '/customize', label: 'Customize Your Trip' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'text-white' : ''}`}>
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>{item.label}</motion.span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
