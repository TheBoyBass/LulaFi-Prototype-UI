import { useMemo, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { appointments } from "@/data/providers";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, Clock } from "lucide-react";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const statusStyle: Record<string, string> = {
  Confirmed: "text-success bg-success/10",
  Pending: "text-warning bg-warning/10",
  Rescheduled: "text-info bg-info/10",
};

const toKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const CalendarScreen = () => {
  const { navigate } = useApp();
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selected, setSelected] = useState<string | null>(toKey(today.getFullYear(), today.getMonth(), today.getDate()));

  const byDate = useMemo(() => {
    const map: Record<string, typeof appointments> = {};
    appointments.forEach(a => {
      map[a.date] = [...(map[a.date] ?? []), a];
    });
    return map;
  }, []);

  const firstDay = new Date(cursor.year, cursor.month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const shift = (delta: number) => {
    const d = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
  };

  const listed = selected
    ? byDate[selected] ?? []
    : appointments.filter(a => a.date.startsWith(`${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}`));

  const upcoming = appointments
    .filter(a => a.date >= toKey(today.getFullYear(), today.getMonth(), today.getDate()))
    .slice(0, 5);

  return (
    <ScreenLayout
      activeTab="home"
      header={
        <div className="px-6 pt-2 pb-3 flex items-center gap-3">
          <BackButton to="home" />
          <div>
            <h1 className="text-base font-semibold text-text-primary leading-tight">Calendar</h1>
            <p className="text-[11px] text-text-muted">Appointments booked through your forms</p>
          </div>
        </div>
      }
    >
      <div className="pb-6">
        <div className="px-6">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => shift(-1)}
                className="w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-secondary"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="text-sm font-semibold text-text-primary">
                {MONTHS[cursor.month]} {cursor.year}
              </div>
              <button
                onClick={() => shift(1)}
                className="w-8 h-8 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-secondary"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-[10px] font-medium text-text-muted py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={`e${i}`} />;
                const key = toKey(cursor.year, cursor.month, day);
                const hasEvents = Boolean(byDate[key]?.length);
                const isToday = key === toKey(today.getFullYear(), today.getMonth(), today.getDate());
                const isSelected = key === selected;
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(isSelected ? null : key)}
                    className={`h-9 rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
                      isSelected
                        ? "bg-brand text-bg-primary font-semibold"
                        : isToday
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-text-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {day}
                    <span
                      className={`w-1 h-1 rounded-full ${
                        hasEvents ? (isSelected ? "bg-bg-primary" : "bg-brand") : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          <div className="text-base font-semibold text-text-primary mb-3">
            {selected ? "Appointments on this day" : `Appointments in ${MONTHS[cursor.month]}`}
          </div>

          {listed.length > 0 ? (
            <div className="flex flex-col gap-3">
              {listed.map(a => (
                <button
                  key={a.id}
                  onClick={() => navigate("mf")}
                  className="text-left p-4 bg-bg-secondary border border-border-primary rounded-xl hover:border-brand transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-brand">{a.initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-medium text-text-primary truncate">{a.title}</div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyle[a.status]}`}>
                          {a.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-text-secondary mt-0.5">
                        {a.provider} · {a.ref}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {a.time}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={12} /> {a.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-primary rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center shrink-0">
                <CalendarDays size={17} className="text-text-muted" />
              </div>
              <div className="text-sm text-text-muted">No appointments scheduled for this date.</div>
            </div>
          )}
        </div>

        {selected && (
          <div className="px-6 mt-6">
            <div className="text-base font-semibold text-text-primary mb-3">Upcoming</div>
            <div className="flex flex-col gap-2">
              {upcoming.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a.date)}
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-bg-secondary border border-border-primary rounded-xl text-left hover:border-brand transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-text-primary truncate">{a.title}</div>
                    <div className="text-[11px] text-text-muted">{a.provider}</div>
                  </div>
                  <div className="text-[11px] text-text-secondary shrink-0">
                    {a.date.slice(8)} {MONTHS[Number(a.date.slice(5, 7)) - 1].slice(0, 3)} · {a.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
};

export default CalendarScreen;
