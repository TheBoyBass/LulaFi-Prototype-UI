import lulafiIcon from "@/assets/lulafi-icon.png";

interface LogoProps {
  size?: "sm" | "md";
}

const Logo = ({ size = "md" }: LogoProps) => {
  const sm = size === "sm";
  return (
    <div className="flex items-center gap-1.5">
      <img
        src={lulafiIcon}
        alt="lulaFi"
        className={sm ? "w-[38px] h-[30px] object-contain" : "w-[60px] h-[48px] object-contain"}
      />
      <div
        className={`${sm ? "text-xl" : "text-[1.875rem]"} font-semibold text-text-primary tracking-tight`}
      >
        lula<span className="text-brand">Fi</span>
      </div>
    </div>
  );
};

export default Logo;
