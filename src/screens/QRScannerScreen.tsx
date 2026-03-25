import { useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaCard } from "@/components/lulafi/LulaCard";
import qrIcon from "@/assets/qr-icon.png";

const QRScannerScreen = () => {
  const { navigate } = useApp();
  const [scanning, setScanning] = useState(false);

  if (scanning) {
    return (
      <ScreenLayout activeTab="home">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 relative bg-neutral-800 rounded-lg mx-4 mt-2 mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900" />
            <div className="absolute top-[15%] left-[18%] w-10 h-10 border-l-[3px] border-t-[3px] border-white rounded-tl-sm" />
            <div className="absolute top-[15%] right-[18%] w-10 h-10 border-r-[3px] border-t-[3px] border-white rounded-tr-sm" />
            <div className="absolute bottom-[25%] left-[18%] w-10 h-10 border-l-[3px] border-b-[3px] border-white rounded-bl-sm" />
            <div className="absolute bottom-[25%] right-[18%] w-10 h-10 border-r-[3px] border-b-[3px] border-white rounded-br-sm" />
            <div className="scan-line" />
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2">
              <div className="bg-black/60 text-white text-sm px-4 py-2 rounded-md whitespace-nowrap">
                Position QR code within the frame
              </div>
            </div>
          </div>
          <div className="px-6 pb-4 flex flex-col gap-3">
            <LulaButton onClick={() => navigate("org")} className="w-full rounded-full gradient-brand text-white shadow-md">
              Use System Scanner
            </LulaButton>
            <LulaButton variant="secondary" onClick={() => setScanning(false)} className="w-full rounded-full border-brand text-brand">
              Close Scanner
            </LulaButton>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout activeTab="home">
      <div className="flex justify-between items-center px-6 pb-4">
        <BackButton to="home" />
      </div>
      <div className="px-6 flex flex-col items-center gap-6 text-center pb-6">
        <img src={qrIcon} alt="QR Code" className="w-20 h-20 object-contain" loading="lazy" />
        <div>
          <div className="text-2xl font-semibold text-text-primary mb-2">Scan QR Code</div>
          <div className="text-sm text-text-secondary">Scan a provider's QR code to access their form</div>
        </div>
        <LulaCard className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-md bg-brand/10 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="3" height="3" fill="currentColor" />
                <rect x="18" y="14" width="3" height="3" fill="currentColor" />
                <rect x="14" y="18" width="3" height="3" fill="currentColor" />
                <rect x="18" y="18" width="3" height="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Use Camera</div>
              <div className="text-xs text-text-muted mt-0.5">Point your camera at a QR code to scan and continue</div>
            </div>
          </div>
          <LulaButton onClick={() => setScanning(true)} className="w-full rounded-full gradient-brand text-white shadow-md">
            Open Scanner
          </LulaButton>
        </LulaCard>
        <div className="w-full text-left flex gap-3">
          <span className="text-brand text-[17px] shrink-0">ℹ</span>
          <div>
            <div className="text-sm font-semibold text-text-primary mb-1">How it works</div>
            <div className="text-sm text-text-secondary">Organizations provide QR codes that contain form details. Scan to securely access their forms.</div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default QRScannerScreen;
