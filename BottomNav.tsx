import { ReactNode } from "react";

import phoneFrame from "@/assets/phone-frame.png";

interface PhoneProps {
  children: ReactNode;
  className?: string;
}

/** Realistic device frame. Swap the children to drop in real app screens later. */
const Phone = ({ children, className = "" }: PhoneProps) => (
  <div
    className={`relative w-[228px] drop-shadow-[0_24px_48px_hsla(0,0%,0%,0.35)] sm:w-[256px] ${className}`}
    style={{ aspectRatio: "568 / 1178" }}
  >
    {/* Screen */}
    <div
      className="absolute overflow-hidden bg-bg-primary"
      style={{
        left: "5.1%",
        right: "3.9%",
        top: "1.8%",
        bottom: "2%",
        borderRadius: "12.7%/5.5%",
      }}
    >
      <div className="h-full w-full overflow-hidden">{children}</div>
    </div>

    {/* Frame overlay */}
    <img
      src={phoneFrame}
      alt=""
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
    />
  </div>
);

export default Phone;
