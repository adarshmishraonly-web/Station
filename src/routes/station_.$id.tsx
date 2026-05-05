import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, MapPin, IndianRupee, Navigation as NavIcon, Map as MapIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { AvailabilityBar } from "@/components/availability-bar";
import { CrowdBadge, facilityColor } from "@/components/facility-meta";
import { getStationDetail, type Facility } from "@/lib/stations";
import { getSession } from "@/lib/session";

export const Route = createFileRoute("/station_/$id")({
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !getSession()) {
      throw redirect({ to: "/login", search: { redirect: location.pathname } as never });
    }
  },
  loader: ({ params }) => getStationDetail(params.id),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.station ? `${loaderData.station.name} — StationSense` : "Station — StationSense" },
      { name: "description", content: "Live facility availability and station map." },
    ],
  }),
  component: StationPage,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-semibold">Station not found</h1>
      <Link to="/stations" className="mt-3 inline-block text-sm underline">Back to stations</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-sm text-destructive">{error.message}</div>
  ),
});

function StationPage() {
  const { station, facilities, crowd } = Route.useLoaderData();

  if (!station) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-3xl p-10 text-center">
          <h1 className="text-2xl font-semibold">Station not found</h1>
          <Link to="/stations" className="mt-3 inline-block text-sm underline">
            Back to stations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/stations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Stations
        </Link>

        <header className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{station.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {station.code} · {station.city}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CrowdBadge level={crowd} />
            <Button asChild variant="outline" className="gap-2">
              <Link to="/station/$id/map" params={{ id: station.id }}>
                <MapIcon className="h-4 w-4" /> Open map
              </Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {(facilities as Facility[]).map((f) => (
            <FacilityCard key={f.id} facility={f} stationId={station.id} />
          ))}
          {facilities.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
              No facilities listed for this station yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function FacilityCard({ facility, stationId }: { facility: Facility; stationId: string }) {
  const tone = facilityColor[facility.type];
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-semibold shadow-sm"
            style={{ backgroundColor: tone }}
            aria-hidden
          >
            {facility.type[0]}
          </span>
          <div>
            <h3 className="text-base font-semibold">{facility.name}</h3>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{facility.type}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="inline-flex items-center font-medium">
            <IndianRupee className="h-3.5 w-3.5" />
            {Number(facility.price).toFixed(0)}
          </div>
          <div className="text-xs text-muted-foreground">{facility.distance_m} m away</div>
        </div>
      </div>

      <div className="mt-4">
        <AvailabilityBar available={facility.available_units} total={facility.total_capacity} />
      </div>

      <div className="mt-5">
        <Button asChild className="w-full gap-2">
          <Link
            to="/station/$id/map"
            params={{ id: stationId }}
            search={{ facility: facility.id } as never}
          >
            <NavIcon className="h-4 w-4" /> Navigate
          </Link>
        </Button>
      </div>
    </article>
  );
}
