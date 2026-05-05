import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, LifeBuoy, Star, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/lib/stations";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety & Help — StationSense" },
      { name: "description", content: "Emergency contacts, help-desk info and feedback for Indian railway stations." },
    ],
  }),
  component: SafetyPage,
});

const contacts = [
  { label: "Railway Emergency", number: "139", note: "Security, medical & general help" },
  { label: "Police", number: "100", note: "All India" },
  { label: "Ambulance", number: "108", note: "Medical emergency" },
  { label: "Fire", number: "101", note: "Fire emergency" },
  { label: "Women Helpline", number: "1091", note: "24x7 support" },
  { label: "RPF Helpline", number: "182", note: "Railway Protection Force" },
];

const schema = z.object({
  message: z.string().trim().min(3, "Tell us a bit more").max(1000),
  rating: z.number().int().min(1).max(5),
});

function SafetyPage() {
  const { session } = useSession();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ message, rating });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    try {
      await submitFeedback({ ...parsed.data, userId: session?.id ?? null });
      toast.success("Thanks for your feedback!");
      setMessage("");
      setRating(5);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Safety &amp; Help</h1>
        <p className="mt-2 text-muted-foreground">
          Important emergency contacts and help-desk info for travellers.
        </p>

        <section className="mt-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <AlertTriangle className="h-4 w-4" /> Emergency contacts
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <li key={c.number}>
                <a
                  href={`tel:${c.number}`}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="font-semibold">{c.label}</div>
                    <div className="text-xs text-muted-foreground">{c.note}</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-primary">
                    <Phone className="h-4 w-4" />
                    <span className="font-bold tabular-nums">{c.number}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <LifeBuoy className="h-4 w-4" /> Station help desk
          </div>
          <p className="mt-2 text-sm">
            Help desks are located on the main concourse near platform 1. Look for
            officials in dark blue uniforms or visit the "May I Help You" booth.
            Lost & found is handled by the RPF office.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Share your feedback</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Help us improve StationSense — what worked, what didn't?
          </p>

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
              <div className="mb-1 text-sm font-medium">Rating</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    aria-label={`${n} stars`}
                  >
                    <Star
                      className={cn(
                        "h-7 w-7 transition-transform hover:scale-110",
                        n <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message…"
                maxLength={1000}
                rows={4}
              />
              <div className="mt-1 text-right text-[11px] text-muted-foreground">
                {message.length}/1000
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Sending…" : "Send feedback"}
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
