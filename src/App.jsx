import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Write from './pages/Write';
import Timeline from './pages/Timeline';
import Reflection from './pages/Reflection';
import Concepts from './pages/Concepts';

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        {/* Navigation */}
        <nav className="app-navbar">
          <div className="navbar-inner">
            <div className="navbar-brand">
              <span className="brand-orb">◉</span>
              <span className="brand-text">Pensieve</span>
            </div>

            <div className="navbar-links">
              <NavLink to="/write" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Write
              </NavLink>
              <NavLink to="/timeline" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Timeline
              </NavLink>
              <NavLink to="/reflection" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Reflection
              </NavLink>
              <NavLink to="/concepts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Concepts
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <motion.main
          className="app-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/write" replace />} />
            <Route path="/write" element={<Write />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/reflection" element={<Reflection />} />
            <Route path="/concepts" element={<Concepts />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}
