import { useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Paintbrush } from 'lucide-react';

const PageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesignSystem = location.pathname === '/design-system';

  return (
    <div className="fixed top-4 right-4 z-[9999] flex rounded-lg overflow-hidden border border-white/10 shadow-lg">
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
          !isDesignSystem
            ? 'bg-brand text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
        }`}
      >
        <Smartphone className="w-4 h-4" />
        Prototype
      </button>
      <button
        onClick={() => navigate('/design-system')}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
          isDesignSystem
            ? 'bg-brand text-white'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
        }`}
      >
        <Paintbrush className="w-4 h-4" />
        Design System
      </button>
    </div>
  );
};

export default PageSwitcher;
