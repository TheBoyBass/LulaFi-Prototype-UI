import lulafiIcon from "@/assets/lulafi-icon.png";

const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={lulafiIcon} alt="LulaFi" className="w-[60px] h-[48px] object-contain" />
    <div className="text-[1.875rem] font-semibold text-text-primary tracking-tight">
      lula<span className="text-brand">Fi</span>
    </div>
  </div>
);

export default Logo;
