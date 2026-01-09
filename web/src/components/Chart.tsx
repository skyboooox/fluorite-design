import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../data";
export function Chart() {
  return (
    <div
      className="chart"
      role="img"
      aria-label="Sample temperature chart from 14:00 to 15:00, approximately 24 to 26 degrees Celsius"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 12, right: 24, bottom: 4, left: 0 }}
        >
          <CartesianGrid stroke="var(--grid)" vertical={false} />
          <XAxis
            dataKey="time"
            minTickGap={50}
            interval="preserveStartEnd"
            padding={{ left: 12, right: 12 }}
            tickMargin={12}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--grid)" }}
            tickLine={false}
          />
          <YAxis
            domain={[23, 26]}
            ticks={[23, 24, 25, 26]}
            width={52}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            unit="°"
          />
          <Tooltip
            contentStyle={{
              border: "1px solid var(--edge)",
              borderRadius: 0,
              background: "var(--surface)",
              color: "var(--ink)",
            }}
            labelStyle={{ color: "var(--muted)" }}
            formatter={(v) => [`${v} °C`, "Ambient temperature"]}
          />
          <Line
            type="linear"
            dataKey="temperature"
            stroke="var(--ink)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
