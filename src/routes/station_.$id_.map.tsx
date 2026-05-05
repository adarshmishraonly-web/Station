import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { lazy, Suspense } from "react";
import { z } from "zod";
import { ClientOnly } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CrowdBadge, facilityColor } from "@/components/facility-meta";
import { getStationDetail, type Facility } from "@/lib/stations";
import { getSession } from "@/lib/session";

const StationMap = lazy(() => import("@/components/station-map"));

export const Route = createFileRoute("/station_/$id_/map")({
  validateSearch: (s) => z.object({ facility: z.string().uuid().optional() }).parse(s),
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !getSession()) {
      throw redirect({ to: "/login", search: { redirect: location.pathname } as never });
    }
  },
  loader: ({ params }) => getStationDetail(params.id),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.station ? `Map · ${loaderData.station.name} — StationSense` : "Map — StationSense" },
    ],
  }),
  component: MapPage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-sm text-destructive">{error.message}</div>
  ),
});

function MapPage() {
  const { station, facilities, crowd } = Route.useLoaderData();
  const { facility: facilityId } = Route.useSearch();

  if (!station) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold">Station not found</h1>
        <Link to="/stations" className="mt-3 inline-block text-sm underline">Back to stations</Link>
      </div>
    );
  }

  const target = facilityId ? (facilities as Facility[]).find((f) => f.id === facilityId) : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Map */}
      <ClientOnly fallback={<div className="grid h-full w-full place-items-center text-muted-foreground">Loading map…</div>}>
        <Suspense fallback={<div className="grid h-full w-full place-items-center text-muted-foreground">Loading map…</div>}>
          <StationMap station={station} facilities={facilities as Facility[]} highlightId={facilityId ?? null} />
        </Suspense>
      </ClientOnly>

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[400] p-3 sm:p-4">
        <div className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur">
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/station/$id" params={{ id: station.id }}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <div className="min-w-0 flex-1 text-center">
            <div className="truncate text-sm font-semibold">{station.name}</div>
            <div className="text-[11px] text-muted-foreground">{station.code} · {station.city}</div>
          </div>
          <CrowdBadge level={crowd} />
        </div>
      </div>

      {/* Bottom highlight panel */}
      {target && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[400] p-3 sm:p-4">
          <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: facilityColor[target.type] }}
              >
                {target.type[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{target.name}</div>
                <div className="text-xs text-muted-foreground">
                  {target.type} · ₹{Number(target.price).toFixed(0)} · {target.distance_m} m
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold tabular-nums">
                  {target.available_units}<span className="text-sm text-muted-foreground"> / {target.total_capacity}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">available</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {!target && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-[400] -translate-x-1/2">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-card/95 px-4 py-2 text-xs shadow-md backdrop-blur">
            {(["Lounge","Locker","Washroom","Seating"] as const).map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: facilityColor[t] }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
