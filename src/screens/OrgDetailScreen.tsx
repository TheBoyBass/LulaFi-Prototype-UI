import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaCard } from "@/components/lulafi/LulaCard";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { Search, FileText, Clock } from "lucide-react";

const forms = [
  { name: "Loan Application Form", desc: "Apply for financial assistance by submitting personal, employment, and financial information.", fields: "15 questions", date: "Updated 2/19/2026" },
  { name: "Municipal I-Help Form", desc: "Submit questions or concerns about municipal services.", fields: "3 questions", date: "Updated 2/18/2026" },
  { name: "Customer Feedback Form", desc: "Share your experience and help improve services.", fields: "5 questions", date: "Updated 3/1/2026" },
];

const OrgDetailScreen = () => {
  const { navigate } = useApp();

  return (
    <ScreenLayout activeTab="services">
      <div className="flex justify-between items-center px-6 pb-4">
        <BackButton to="svc" />
        <div className="flex-1 text-center text-[15px] font-medium text-text-primary">18012715663</div>
        <div className="w-[34px]" />
      </div>
      <div className="px-6 flex flex-col gap-6 pb-6">
        <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-md py-3 px-4">
          <Search size={15} className="text-text-muted shrink-0" />
          <input type="text" placeholder="Search forms within this organization..." className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted" />
        </div>
        <LulaCard className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <LulaBadge variant="success">● Active</LulaBadge>
            <LulaBadge variant="neutral"><FileText size={12} className="inline" /> 10 forms</LulaBadge>
          </div>
          <div className="h-px bg-border w-full" />
          <div className="flex flex-col gap-2">
            <div className="text-sm text-text-secondary"><span className="text-text-muted">Category:</span> Medical</div>
            <div className="text-sm text-text-secondary"><span className="text-text-muted">Location:</span> Dolorum ducimus mod</div>
            <div className="text-sm text-text-secondary"><span className="text-text-muted">Website:</span> <span className="text-brand">kac.info</span></div>
          </div>
        </LulaCard>
        <div className="flex flex-col gap-3">
          {forms.map((f, i) => (
            <button
              key={i}
              onClick={() => navigate("consent")}
              className="bg-bg-secondary border border-border-primary rounded-lg p-6 cursor-pointer hover:border-brand transition-colors text-left"
            >
              <div className="text-[15px] font-medium text-text-primary">{f.name}</div>
              <div className="text-sm text-text-secondary mt-2">{f.desc}</div>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1 text-[11px] text-text-muted">≡ {f.fields}</div>
                <div className="flex items-center gap-1 text-[11px] text-text-muted"><Clock size={11} /> {f.date}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default OrgDetailScreen;
