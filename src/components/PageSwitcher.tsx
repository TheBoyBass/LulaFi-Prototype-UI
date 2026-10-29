import { useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Paintbrush, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const items = [
  { path: '/', label: 'Prototype', icon: Smartphone },
  { path: '/landing', label: 'Landing Page', icon: Globe },
  { path: '/portal/login', label: 'Web Portal', icon: Globe },
  { path: '/design-system', label: 'Design System', icon: Paintbrush },
];

const PageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="w-full flex justify-center sm:justify-end px-3 py-2 border-b border-portal-sidebar-foreground/10"
      style={{ background: '#0B1C2D' }}
    >
      <div className="flex flex-wrap justify-center gap-1 rounded-lg overflow-hidden border border-portal-sidebar-foreground/10">
        {items.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Button
              variant="ghost"
              key={path}
              onClick={() => navigate(path)}
              aria-current={active ? 'page' : undefined}
              className={`flex h-auto min-h-11 items-center gap-2 rounded-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                active
                  ? 'bg-brand text-primary-foreground hover:bg-brand'
                  : 'bg-portal-sidebar text-portal-sidebar-foreground hover:bg-portal-sidebar hover:underline'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PageSwitcher;
