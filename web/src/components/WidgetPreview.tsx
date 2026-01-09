import { Droplets, Gauge, Lightbulb, Thermometer, Zap } from "lucide-react";
import { sampleEntities } from "../data";
export type Widget = {
  id: string;
  ids: string[];
  title: string;
  style: "list" | "number";
  icon: boolean;
};
const icons = {
  temperature: Thermometer,
  humidity: Droplets,
  power: Zap,
  voltage: Zap,
  light: Lightbulb,
  mode: Gauge,
};
export function WidgetPreview({ widget }: { widget: Widget }) {
  return (
    <div
      key={widget.style}
      className={`widget-preview ${widget.style === "number" ? "number-preview" : ""}`}
    >
      {widget.ids
        .map((id) => sampleEntities.find((e) => e.id === id))
        .filter((e) => !!e)
        .map((e) => {
          const Icon = icons[e.id as keyof typeof icons];
          return (
            <div key={e.id} className="widget-value">
              {widget.icon && <Icon size={20} />}
              <span>{e.name}</span>
              <strong className="mono">
                {e.value}
                {e.unit && <small>{e.unit}</small>}
              </strong>
            </div>
          );
        })}
    </div>
  );
}
