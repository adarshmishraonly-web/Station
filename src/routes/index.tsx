import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Gauge, IndianRupee, ShieldCheck, Search } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listStations, type Station } from "@/lib/stations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StationSense — Know your station before you wait" },
      { name: "description", content: "Find lounges, lockers, washrooms and seating at Indian railway stations with live availability and an interactive map." },
    ],
  }),
  loader: () => listStations(),
  component: Index,
});

function Index() {
  const { stations } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const filtered = q
    ? (stations as Station[]).filter((s) =>
        `${s.name} ${s.code} ${s.city}`.toLowerCase().includes(q.toLowerCase()),
      )
    : (stations as Station[]).slice(0, 4);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 0%, color-mix(in oklab, var(--lounge) 25%, transparent) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, color-mix(in oklab, var(--seating) 20%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live facility data
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                Know Your Station<br /> Before You Wait
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                StationSense shows you what's available at India's busiest railway stations —
                lounges, lockers, washrooms and seating — right when you need them.
              </p>

              <form
                className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm"
                onSubmit={(e) => e.preventDefault()}
              >
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search station, code or city (e.g. Delhi, NDLS)"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button asChild>
                  <Link to="/stations">Browse all</Link>
                </Button>
              </form>

              {filtered.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {filtered.map((s: Station) => (
                    <Link
                      key={s.id}
                      to="/station/$id"
                      params={{ id: s.id }}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm hover:bg-muted"
                    >
                      {s.name} <span className="text-muted-foreground">· {s.code}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<MapPin className="h-5 w-5" />}
              tone="var(--lounge)"
              title="Facility Map"
              desc="Interactive Leaflet map with markers for every facility."
            />
            <FeatureCard
              icon={<Gauge className="h-5 w-5" />}
              tone="var(--seating)"
              title="Live Availability"
              desc="See exact numbers — 8 / 20 lounges, 3 / 10 lockers."
            />
            <FeatureCard
              icon={<IndianRupee className="h-5 w-5" />}
              tone="var(--locker)"
              title="Transparent Pricing"
              desc="Know costs upfront, no surprises at the counter."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              tone="var(--washroom)"
              title="Safety First"
              desc="Emergency contacts and help-desk info for every station."
            />
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/stations">
                Explore stations <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon, title, desc, tone,
}: { icon: React.ReactNode; title: string; desc: string; tone: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
        style={{ backgroundColor: tone }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
