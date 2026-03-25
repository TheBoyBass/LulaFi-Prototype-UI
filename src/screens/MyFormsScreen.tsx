import ScreenLayout from "@/components/lulafi/ScreenLayout";
import Logo from "@/components/lulafi/Logo";

import { Search } from "lucide-react";

const MyFormsScreen = () => {
  return (
    <ScreenLayout activeTab="forms">
      <div className="flex flex-col min-h-full">
        <div className="px-6 flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <Logo />
            <div className="text-xl font-semibold text-text-primary mt-2">My Forms</div>
          </div>
          <div className="flex items-center gap-3 bg-bg-secondary border border-border rounded-lg py-3 px-4">
            <Search size={15} className="text-text-muted shrink-0" />
            <input type="text" placeholder="Search my forms..." className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted" />
          </div>
          <div className="flex flex-col gap-3">
            {[
              { name: "Municipal I-Help form", date: "Submitted on March 20, 2026" },
              { name: "Municipal I-Help form", date: "Submitted on March 20, 2026" },
            ].map((form, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-bg-secondary border border-border rounded-xl cursor-pointer hover:border-brand transition-colors">
                <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{form.name}</div>
                  <div className="text-xs text-text-muted mt-0.5">{form.date}</div>
                </div>
                <div className="text-text-muted text-base">›</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default MyFormsScreen;
