import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/trips', label: 'Trips' },
    { path: '/customize', label: 'Customize Trip' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent border-b"
      style={{ borderColor: 'var(--primary-lighter)' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Hache Viajes home">
            <Plane className="h-8 w-8" style={{ color: 'var(--primary)' }} />
            <span className="text-xl font-bold glow-text">Hache Viajes</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 nav-link ${
                  isActive(link.path) ? 'text-[color:var(--primary)]' : ''
                }`}
                style={!isActive(link.path) ? { color: 'var(--text-secondary)' } : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
