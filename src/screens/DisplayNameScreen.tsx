import StatusBar from "@/components/lulafi/StatusBar";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaInput } from "@/components/lulafi/LulaInput";
import { LulaCard } from "@/components/lulafi/LulaCard";
import lulafiIcon from "@/assets/lulafi-icon.png";

const DisplayNameScreen = () => {
  const { navigate, displayName, setDisplayName } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col px-6 screen-enter">
      <StatusBar />
      <div className="flex flex-col items-center gap-2 mt-8 mb-4">
        <img src={lulafiIcon} alt="LulaFi" className="w-[120px] h-[96px] object-contain" />
        <div className="text-4xl font-semibold text-text-primary tracking-tight">
          lula<span className="text-brand">Fi</span>
        </div>
      </div>
      <LulaCard className="mt-auto mb-auto">
        <div className="text-2xl font-semibold text-text-primary mb-2">Almost there!</div>
        <div className="text-sm text-text-secondary mb-6">Choose a display name for your home screen.</div>
        <div className="mb-6">
          <LulaInput
            label="Display name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </div>
        <LulaButton onClick={() => navigate("home")} className="w-full rounded-full gradient-brand text-white shadow-md">
          Continue
        </LulaButton>
      </LulaCard>
    </div>
  );
};

export default DisplayNameScreen;
