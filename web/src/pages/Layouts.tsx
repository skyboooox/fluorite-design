import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { LayoutGrid, Pencil, Plus } from "lucide-react";
import { Button, Section } from "../components/ui";
import { Chart } from "../components/Chart";
import { WidgetEditor } from "../components/WidgetEditor";
import { WidgetPreview, type Widget } from "../components/WidgetPreview";
export function Layouts({
  widgets,
  setWidgets,
}: {
  widgets: Widget[];
  setWidgets: Dispatch<SetStateAction<Widget[]>>;
}) {
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const addRef = useRef<HTMLButtonElement | null>(null);
  const [editing, setEditing] = useState<Widget | null>(null);
  const [open, setOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [notice, setNotice] = useState("");
  const start = (widget: Widget | null, button: HTMLButtonElement) => {
    returnFocusRef.current = button;
    setEditing(widget);
    setEditorKey((key) => key + 1);
    setOpen(true);
  };
  return (
    <>
      <Section
        title="Dashboard"
        description="Sample data. Changes apply only to this demo."
        action={
          <Button
            ref={addRef}
            variant="primary"
            onClick={(e) => start(null, e.currentTarget)}
          >
            <Plus size={20} />
            Add widget
          </Button>
        }
      >
        <div className="dashboard">
          {widgets.map((widget) => (
            <article className="widget-card" key={widget.id}>
              <div className="card-heading">
                <h3>{widget.title}</h3>
                <Button
                  variant="quiet"
                  className="icon-button"
                  aria-label={`Edit ${widget.title}`}
                  onClick={(e) => start(widget, e.currentTarget)}
                >
                  <Pencil size={20} />
                </Button>
              </div>
              <WidgetPreview widget={widget} />
            </article>
          ))}
          <article className="widget-card">
            <div className="card-heading">
              <h3>Temperature history</h3>
              <span className="badge">1 hour</span>
            </div>
            <Chart />
            <p className="muted">Sample chart</p>
          </article>
        </div>
        {notice && (
          <p
            key={notice}
            className="message positive layout-notice"
            role="status"
          >
            {notice}
          </p>
        )}
      </Section>
      <div className="layout-note">
        <LayoutGrid size={20} />
        <span>Select data → Configure and preview → Add to dashboard</span>
      </div>
      <WidgetEditor
        key={editorKey}
        open={open}
        widget={editing}
        returnFocusRef={returnFocusRef}
        onClose={() => setOpen(false)}
        onSave={(draft) => {
          setWidgets((current) =>
            editing
              ? current.map((w) => (w.id === editing.id ? draft : w))
              : [...current, draft],
          );
          setNotice(editing ? "Widget updated" : "Widget added");
          setOpen(false);
        }}
        onDelete={(id) => {
          setWidgets((current) => current.filter((w) => w.id !== id));
          returnFocusRef.current = addRef.current;
          setNotice("Widget deleted");
          setOpen(false);
        }}
      />
    </>
  );
}
