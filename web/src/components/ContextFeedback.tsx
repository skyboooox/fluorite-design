import { useEffect, useRef, useState } from "react";
import { CheckCircle2, CircleAlert, RotateCcw, WifiOff } from "lucide-react";
import { AttentionPanel, Button } from "./ui";

export function ContextFeedback({
  kind = "connection",
}: {
  kind?: "connection" | "data";
}) {
  const [state, setState] = useState<"attention" | "busy" | "done">(
    "attention",
  );
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const retry = () => {
    setState("busy");
    timer.current = window.setTimeout(() => setState("done"), 1400);
  };
  const isData = kind === "data",
    attention = state !== "done";
  const Icon = state === "done" ? CheckCircle2 : isData ? CircleAlert : WifiOff;
  const title =
    state === "done"
      ? isData
        ? "Data refreshed"
        : "Connection restored"
      : state === "busy"
        ? isData
          ? "Refreshing"
          : "Reconnecting"
        : isData
          ? "Data stale"
          : "Disconnected";
  return (
    <AttentionPanel
      active={attention}
      className={`context-feedback ${isData ? "status-feedback" : "connection-feedback"}`}
    >
      <div className="context-feedback-label">
        <Icon size={20} />
        <span>{isData ? "Data status" : "Connection status"}</span>
        <small>Demo</small>
      </div>
      <div key={state} className="feedback-copy" role="status">
        <h3>{title}</h3>
        <p>
          {state === "done"
            ? "Local demo complete. No external devices connected."
            : isData
              ? "The last reading is out of date."
              : "No recent data. Check the connection."}
        </p>
      </div>
      <div className="action-row">
        {state === "done" ? (
          <Button variant="quiet" onClick={() => setState("attention")}>
            <RotateCcw size={18} />
            Reset demo
          </Button>
        ) : (
          <Button
            className="feedback-action"
            busy={state === "busy"}
            disabled={state === "busy"}
            onClick={retry}
          >
            {state === "busy" ? "Working" : isData ? "Refresh demo" : "Retry demo"}
          </Button>
        )}
      </div>
    </AttentionPanel>
  );
}
