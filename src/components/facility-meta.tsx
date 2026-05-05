import { cn } from "@/lib/utils";
import type { CrowdLevel } from "@/lib/stations";

export function CrowdBadge({ level }: { level: CrowdLevel }) {
  const map: Record<CrowdLevel, string> = {
    Low: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Medium: "bg-amber-100 text-amber-800 ring-amber-200",
    High: "bg-red-100 text-red-800 ring-red-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        map[level],
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          level === "Low" ? "bg-emerald-500" : level === "Medium" ? "bg-amber-500" : "bg-red-500",
        )}
      />
      Crowd: {level}
    </span>
  );
}

export const facilityColor: Record<string, string> = {
  Lounge: "var(--lounge)",
  Locker: "var(--locker)",
  Washroom: "var(--washroom)",
  Seating: "var(--seating)",
};
