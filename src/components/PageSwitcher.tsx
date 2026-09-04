import { useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Paintbrush, Globe } from 'lucide-react';

const items = [
  { path: '/', label: 'Prototype', icon: Smartphone },
  { path: '/landing', label: 'Landing Page', icon: Globe },
  { path: '/design-system', label: 'Design System', icon: Paintbrush },
];

const PageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="w-full flex justify-center sm:justify-end px-3 py-2 border-b border-white/10"
      style={{ background: '#0B1C2D' }}
    >
      <div className="flex flex-wrap justify-center gap-1 rounded-lg overflow-hidden border border-white/10">
        {items.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                active
                  ? 'bg-brand text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PageSwitcher;
