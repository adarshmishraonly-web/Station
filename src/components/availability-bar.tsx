import { cn } from "@/lib/utils";

type Props = {
  available: number | null | undefined;
  total: number | null | undefined;
  className?: string;
};

export function AvailabilityBar({ available, total, className }: Props) {
  if (available == null || total == null || total <= 0) {
    return <p className={cn("text-sm text-muted-foreground", className)}>Availability unknown</p>;
  }
  const ratio = available / total;
  const tone =
    ratio > 0.6 ? "bg-emerald-500" : ratio >= 0.3 ? "bg-amber-500" : "bg-red-500";
  const label =
    ratio > 0.6 ? "text-emerald-700" : ratio >= 0.3 ? "text-amber-700" : "text-red-700";
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between">
        <span className={cn("text-2xl font-bold tabular-nums", label)}>
          {available}
          <span className="ml-0.5 text-base font-medium text-muted-foreground">/ {total}</span>
        </span>
        <span className="text-xs text-muted-foreground">available</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", tone)}
          style={{ width: `${Math.max(2, Math.min(100, ratio * 100))}%` }}
        />
      </div>
    </div>
  );
}
