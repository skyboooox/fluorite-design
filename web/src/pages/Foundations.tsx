import {
  Check,
  CheckCircle2,
  CircleHelp,
  Clock,
  Copy,
  Gauge,
  Lightbulb,
  Pencil,
  Search,
  Settings2,
  Thermometer,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";
import { palette } from "../data";
import { Button, Section } from "../components/ui";
export function Foundations() {
  const [copied, setCopied] = useState("");
  const copy = async (token: string) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${token}`)
      .trim();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(token);
    } catch {
      setCopied("error");
    }
  };
  return (
    <>
      <Section
        title="Neutral surfaces, semantic accents"
        description="Use color by role. Keep each theme consistent."
      >
        <div className="swatches">
          {palette.map(([token, label]) => (
            <button
              key={token}
              onClick={() => copy(token)}
              aria-label={`Copy ${label} color`}
              className="swatch"
            >
              <span style={{ background: `var(--${token})` }} />
              <div>
                <strong>{label}</strong>
                <code>{token}</code>
                {copied === token ? <Check size={16} /> : <Copy size={16} />}
              </div>
            </button>
          ))}
        </div>
        <p className="muted" role="status">
          {copied === "error"
            ? "Clipboard unavailable."
            : copied
              ? "Color copied"
              : "Select a swatch to copy its value."}
        </p>
        <div className="semantic-row">
          <span className="badge blue">
            <CircleHelp size={16} />
            Key notice
          </span>
          <span className="badge positive">
            <CheckCircle2 size={16} />
            Connected
          </span>
          <span className="badge rose">Secondary series</span>
          <span className="badge danger">
            <X size={16} />
            Connection failed
          </span>
        </div>
      </Section>
      <Section title="Typography" description="Clear UI text. Monospaced numbers.">
        <div className="type-grid">
          <div className="type-sample">
            <span className="eyebrow">CHILLDINGOTHIC</span>
            <h1>Clarity brings calm.</h1>
            <h2>Widget setup</h2>
            <p>Align headings, content, and actions.</p>
            <small>Keep supporting text readable.</small>
          </div>
          <div className="type-sample">
            <span className="eyebrow">IBM PLEX MONO</span>
            <div className="big-number">
              24.6<span>°C</span>
            </div>
            <div className="mono">0123456789 · −128.04</div>
            <p className="muted">Align values and units on the baseline.</p>
          </div>
        </div>
      </Section>
      <Section
        title="Shared dimensions"
        description="4-unit grid. Standard controls are 48 px high."
      >
        <div className="spacing-scale">
          {[4, 8, 12, 16, 24, 32, 48].map((n) => (
            <div key={n}>
              <span style={{ width: n, height: n }} />
              <code>{n}</code>
            </div>
          ))}
        </div>
        <div className="action-row">
          <Button variant="primary">Primary · 48</Button>
          <Button>Secondary</Button>
          <Button variant="quiet">Cancel</Button>
          <Button className="icon-button" aria-label="Edit">
            <Pencil />
          </Button>
        </div>
      </Section>
      <Section
        title="Icons"
        description="24 × 24 grid. Consistent strokes. Name icons by shape."
      >
        <div className="icon-grid">
          {[
            [Search, "Search"],
            [Pencil, "Pencil"],
            [Settings2, "Sliders"],
            [Thermometer, "Thermometer"],
            [Gauge, "Gauge"],
            [Lightbulb, "Light bulb"],
            [Wifi, "Wi-Fi"],
            [Clock, "Clock"],
          ].map(([Icon, name]) => {
            const I = Icon as typeof Search;
            return (
              <div key={String(name)}>
                <I size={24} />
                <span>{String(name)}</span>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
