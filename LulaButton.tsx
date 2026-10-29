import { ChevronLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";

interface BackButtonProps {
  to: ScreenId;
}

const BackButton = ({ to }: BackButtonProps) => {
  const { navigate } = useApp();
  return (
    <button
      onClick={() => navigate(to)}
      className="w-[34px] h-[34px] rounded-lg bg-bg-tertiary border border-border flex items-center justify-center cursor-pointer text-text-primary shrink-0"
    >
      <ChevronLeft size={18} />
    </button>
  );
};

export default BackButton;
