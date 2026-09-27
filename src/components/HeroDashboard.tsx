import type { SiteContent } from "@/content/types";
import { Logo } from "./Logo";
import { SteadyCurveChart } from "./SteadyCurveChart";

type HeroDashboardProps = {
  chart: SiteContent["hero"]["chart"];
  dashboard: SiteContent["hero"]["dashboard"];
  metrics: SiteContent["proofStrip"]["metrics"];
};

// The hero's product panel as a dashboard screen (after the Tailark
// hero-section-1 reference, built from our own parts, tj 2026-09-27):
// a sidebar with the workspace and a nav, a top bar with filter chips, an
// overview row of metric tiles (the three numbers from the content file)
// and the activity chart — the steady-state curve, live as everywhere.
// Chrome is decorative (`aria-hidden`); the chart keeps its own label.
// Tone only: `surface-raised` panel, `surface` sidebar and tiles, `line`
// hairlines, one accent (`signal`) for the active item and the curve.
export function HeroDashboard({ chart, dashboard, metrics }: HeroDashboardProps) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-line bg-surface-raised">
      <aside
        aria-hidden="true"
        className="hidden w-[184px] shrink-0 flex-col gap-space-6 border-r border-line bg-surface p-space-4 lg:flex"
      >
        <div className="flex items-center gap-space-2 px-space-2 pt-space-1">
          <Logo size="sm" />
        </div>
        <ul className="flex flex-col gap-space-1 text-small">
          {dashboard.nav.map((item, index) => (
            <li
              key={item}
              className={`rounded-sm px-space-2 py-[6px] ${index === 0 ? "bg-surface-raised text-ink" : "text-ink-muted"}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          aria-hidden="true"
          className="flex items-center gap-space-2 border-b border-line px-space-6 py-space-4"
        >
          <span className="text-small text-ink">{dashboard.workspace}</span>
          <span className="ml-auto flex gap-space-2">
            {dashboard.filters.map((filter) => (
              <span
                key={filter}
                className="rounded-sm border border-line px-space-2 py-1 text-label text-ink-muted"
              >
                {filter}
              </span>
            ))}
          </span>
        </div>

        <div className="flex flex-col gap-space-6 p-space-6">
          <div aria-hidden="true" className="flex flex-col gap-space-4">
            <span className="text-small text-ink">{dashboard.overview}</span>
            <div className="grid grid-cols-3 gap-space-4">
              {metrics.map((metric) => (
                <div
                  key={metric.caption}
                  className="flex flex-col gap-space-2 rounded-md border border-line bg-surface p-space-4"
                >
                  <span className="font-mono text-[22px] leading-none text-ink">{metric.value}</span>
                  <span className="line-clamp-2 text-label normal-case tracking-normal text-ink-muted">
                    {metric.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-space-4">
            <div className="flex flex-col gap-space-1">
              <span aria-hidden="true" className="text-small text-ink">{dashboard.activity}</span>
              <div className="flex flex-col gap-space-1 text-label text-ink-muted md:flex-row md:justify-between">
                <span className="uppercase">{chart.captionLeft}</span>
                <span className="uppercase">{chart.captionRight}</span>
              </div>
            </div>
            <SteadyCurveChart content={chart} />
          </div>
        </div>
      </div>
    </div>
  );
}
