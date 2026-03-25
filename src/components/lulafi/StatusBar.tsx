const StatusBar = () => (
  <div className="flex justify-between items-center px-6 pt-[38px] pb-2 shrink-0 text-xs font-semibold text-text-primary tracking-wide bg-bg-primary">
    <span className="text-[13px] font-semibold">15:19</span>
    <div className="flex items-center gap-1.5">
      {/* WiFi */}
      <div className="relative w-[15px] h-[12px]">
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[14px] h-[9px] border-[1.5px] border-text-primary border-b-0 rounded-t-full opacity-40 block" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[9px] h-[6px] border-[1.5px] border-text-primary border-b-0 rounded-t-full opacity-70 block" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[3px] border-[1.5px] border-text-primary border-b-0 rounded-t-full block" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-text-primary" />
      </div>
      {/* Signal */}
      <div className="flex items-end gap-[1.5px] h-3">
        <div className="bg-text-primary rounded-[1px] w-[3px] h-[3px]" />
        <div className="bg-text-primary rounded-[1px] w-[3px] h-[6px]" />
        <div className="bg-text-primary rounded-[1px] w-[3px] h-[9px]" />
        <div className="bg-text-primary rounded-[1px] w-[3px] h-[12px]" />
      </div>
      {/* Battery */}
      <div className="flex items-center gap-[1px]">
        <div className="w-[22px] h-[11px] border-[1.5px] border-text-primary rounded-[2.5px] p-[1.5px] flex items-center">
          <div className="h-full w-[70%] bg-text-primary rounded-[1px]" />
        </div>
        <div className="w-[2px] h-[5px] bg-text-primary rounded-r-[1px] opacity-60" />
      </div>
    </div>
  </div>
);

export default StatusBar;
