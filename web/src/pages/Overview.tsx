import {
  ArrowDownToLine,
  ArrowUpRight,
  Layers3,
  LayoutDashboard,
  Palette,
  Thermometer,
} from "lucide-react";
import { Button, Metric } from "../components/ui";
import type { PageId } from "../data";
export function Overview({ navigate }: { navigate: (p: PageId) => void }) {
  return (
    <>
      <section className="overview-intro" aria-labelledby="overview-title">
        <div className="overview-copy">
          <span className="eyebrow">FLUORITE DESIGN</span>
          <h1 id="overview-title">
            Bring order
            <br />
            to information.
          </h1>
          <p>
            Clear hierarchy. Precise structure.
            <br />
            Room for content and action.
          </p>
          <div className="action-row">
            <Button variant="primary" onClick={() => navigate("components")}>
              Browse components
              <ArrowUpRight size={20} />
            </Button>
            <a className="button quiet" href="/Fluorite-Design.md" download>
              <span>
                <ArrowDownToLine size={20} />
                Download guide
              </span>
            </a>
          </div>
        </div>
        <div className="overview-specimen" aria-label="Static metric example">
          <div className="specimen-heading">
            <span>Information hierarchy</span>
            <span className="muted">Static example</span>
          </div>
          <Metric
            icon={<Thermometer />}
            name="Ambient temperature"
            value="24.6"
            unit="°C"
            subtitle="12 seconds ago"
          />
          <div className="specimen-caption">
            <span>Name</span>
            <span>Value and unit</span>
            <span>Last updated</span>
          </div>
        </div>
      </section>
      <section className="overview-directory" aria-labelledby="directory-title">
        <div className="section-heading">
          <h2 id="directory-title">Start here</h2>
          <span className="muted">Guidelines · Components · Flows</span>
        </div>
        <div className="overview-links">
          {[
            {
              title: "Foundations",
              text: "Themes, typography, icons, and dimensions.",
              page: "foundations",
              icon: Palette,
            },
            {
              title: "Interactions",
              text: "Inputs, selection, feedback, and overlays.",
              page: "components",
              icon: Layers3,
            },
            {
              title: "Page flows",
              text: "Select data, configure, and add a widget.",
              page: "layouts",
              icon: LayoutDashboard,
            },
          ].map((x) => (
            <button key={x.page} onClick={() => navigate(x.page as PageId)}>
              <x.icon size={24} />
              <h3>{x.title}</h3>
              <p>{x.text}</p>
              <ArrowUpRight size={20} />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
