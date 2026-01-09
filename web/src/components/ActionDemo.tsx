import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "./ui";
export function ActionDemo({
  duration = 4800,
  fail = false,
}: {
  duration?: number;
  fail?: boolean;
}) {
  const [state, setState] = useState<
    "idle" | "busy" | "done" | "error" | "cancelled"
  >("idle");
  const [progress, setProgress] = useState(0);
  const startTime = useRef(0);
  const operationFails = useRef(false);
  useEffect(() => {
    if (state !== "busy") return;
    const timer = window.setInterval(() => {
      const p = Math.min(
        100,
        ((Date.now() - startTime.current) / duration) * 100,
      );
      setProgress(p);
      if (p >= 100) setState(operationFails.current ? "error" : "done");
    }, 80);
    return () => window.clearInterval(timer);
  }, [state, duration]);
  const start = () => {
    startTime.current = Date.now();
    operationFails.current = fail;
    setProgress(0);
    setState("busy");
  };
  return (
    <div className="action-demo">
      <div className="demo-status">
        <span
          className={`status-dot ${state === "done" ? "positive" : state === "error" ? "danger" : ""}`}
        />
        <span key={state} role="status">
          {
            {
              idle: "Ready",
              busy: "Demo in progress",
              done: "Demo complete",
              error: "Demo failed. Try again.",
              cancelled: "Demo cancelled",
            }[state]
          }
        </span>
        <span className="mono">{Math.round(progress)}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Demo progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="action-row">
        <Button
          variant="primary"
          attention={state === "busy" || state === "error"}
          busy={state === "busy"}
          disabled={state === "busy"}
          onClick={start}
        >
          {state === "busy"
            ? "Running"
            : state === "done"
              ? "Run again"
              : state === "error"
                ? "Retry"
                : "Run demo"}
          {state === "done" ? <Check size={20} /> : <ArrowRight size={20} />}
        </Button>
        {state === "busy" && (
          <Button variant="quiet" onClick={() => setState("cancelled")}>
            <X size={18} />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
