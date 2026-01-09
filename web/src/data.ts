import { Compass, Layers3, LayoutDashboard, Palette } from "lucide-react";
export const pages = [
  {
    id: "overview",
    label: "Overview",
    icon: Compass,
    summary: "Precise structure. Clear feedback.",
  },
  {
    id: "foundations",
    label: "Foundations",
    icon: Palette,
    summary: "Color, typography, and shared dimensions.",
  },
  {
    id: "components",
    label: "Components",
    icon: Layers3,
    summary: "Explore every state and interaction.",
  },
  {
    id: "layouts",
    label: "Layouts",
    icon: LayoutDashboard,
    summary: "Keep your draft from selection to configuration.",
  },
] as const;
export type PageId = (typeof pages)[number]["id"];
export const palette = [
  ["paper", "Page"],
  ["surface", "Surface"],
  ["field", "Inputs"],
  ["ink", "Body text"],
  ["muted", "Secondary text"],
  ["grid", "Divider"],
  ["edge", "Border"],
  ["primary", "Primary action"],
  ["blue", "Key entry"],
  ["positive", "Positive status"],
  ["rose", "Series distinction"],
  ["danger", "Failure"],
];
export const sampleEntities = [
  {
    id: "temperature",
    name: "Ambient temperature",
    category: "Environment",
    value: "24.6",
    unit: "°C",
  },
  {
    id: "humidity",
    name: "Relative humidity",
    category: "Environment",
    value: "48",
    unit: "%",
  },
  {
    id: "power",
    name: "Device power",
    category: "Energy",
    value: "1.28",
    unit: "kW",
  },
  {
    id: "voltage",
    name: "Supply voltage",
    category: "Energy",
    value: "229.4",
    unit: "V",
  },
  { id: "light", name: "Task lighting", category: "Devices", value: "On", unit: "" },
  { id: "mode", name: "Operating mode", category: "Devices", value: "Automatic", unit: "" },
];
export const chartData = Array.from({ length: 61 }, (_, i) => ({
  time: `${String(14 + Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`,
  temperature: +(24.6 + Math.sin(i / 9) * 0.6 + i * 0.003).toFixed(2),
  humidity: +(48 + Math.cos(i / 11) * 2).toFixed(1),
}));
