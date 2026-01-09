import { useState, type RefObject } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { sampleEntities } from "../data";
import { Button, CheckBox, Modal, SelectField, Toggle } from "./ui";
import { WidgetPreview, type Widget } from "./WidgetPreview";
export function WidgetEditor({
  open,
  widget,
  returnFocusRef,
  onClose,
  onSave,
  onDelete,
}: {
  open: boolean;
  widget: Widget | null;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSave: (widget: Widget) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Widget>(() =>
    widget
      ? { ...widget, ids: [...widget.ids] }
      : {
          id: crypto.randomUUID(),
          ids: [],
          title: "New widget",
          style: "list",
          icon: true,
        },
  );
  const [step, setStep] = useState(widget ? 1 : 0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [onlySelected, setOnlySelected] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const numeric = draft.ids.every((id) =>
    Number.isFinite(Number(sampleEntities.find((e) => e.id === id)?.value)),
  );
  const shown = sampleEntities.filter(
    (e) =>
      (category === "All" || e.category === category) &&
      e.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!onlySelected || draft.ids.includes(e.id)),
  );
  const changeIds = (ids: string[]) =>
    setDraft((current) => ({
      ...current,
      ids,
      style: ids.some(
        (id) =>
          !Number.isFinite(
            Number(sampleEntities.find((e) => e.id === id)?.value),
          ),
      )
        ? "list"
        : current.style,
    }));
  const move = (index: number, delta: number) => {
    const ids = [...draft.ids];
    [ids[index], ids[index + delta]] = [ids[index + delta], ids[index]];
    changeIds(ids);
  };
  return (
    <Modal
      title={
        confirmDelete
          ? "Delete widget?"
          : step === 0
            ? "Select data"
            : widget
              ? "Edit widget"
              : "Configure widget"
      }
      description={
        confirmDelete
          ? `Remove “${widget?.title}”? The data source will stay unchanged.`
          : "Sample data"
      }
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
      returnFocusRef={returnFocusRef}
    >
      {confirmDelete ? (
        <footer className="dialog-footer">
          <Button variant="quiet" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => widget && onDelete(widget.id)}
          >
            Delete widget
          </Button>
        </footer>
      ) : (
        <>
          <div className="step-label" aria-label={`Step ${step + 1} of 2`}>
            <span className={step === 0 ? "active" : ""}>Select data</span>
            <span className={step === 1 ? "active" : ""}>Configure and preview</span>
          </div>
          {step === 0 ? (
            <>
              <div className="dialog-body selector-body configuration-step">
                <div className="input-icon">
                  <Search size={20} />
                  <input
                    aria-label="Search data"
                    placeholder="Search data"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <Button
                      variant="quiet"
                      className="icon-button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
                <div className="selector-toolbar">
                  <div
                    className="category-tabs"
                    role="group"
                    aria-label="Data categories"
                  >
                    {["All", "Environment", "Energy", "Devices"].map((c) => (
                      <button
                        key={c}
                        aria-pressed={c === category}
                        className={c === category ? "active" : ""}
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="quiet"
                    className={onlySelected ? "selected-filter" : ""}
                    aria-pressed={onlySelected}
                    onClick={() => setOnlySelected(!onlySelected)}
                  >
                    Selected only · {draft.ids.length}
                  </Button>
                </div>
                <div className="entity-list" aria-label="Data list">
                  {shown.map((e) => (
                    <div key={e.id} className="entity-row">
                      <CheckBox
                        label={e.name}
                        checked={draft.ids.includes(e.id)}
                        onChange={(value) =>
                          changeIds(
                            value
                              ? [...draft.ids, e.id]
                              : draft.ids.filter((id) => id !== e.id),
                          )
                        }
                      />
                      <span className="mono">
                        {e.value}
                        {e.unit && <small> {e.unit}</small>}
                      </span>
                    </div>
                  ))}
                  {shown.length === 0 && (
                    <div className="empty">
                      <strong>No matching data</strong>
                      <Button
                        variant="quiet"
                        onClick={() => {
                          setSearch("");
                          setCategory("All");
                          setOnlySelected(false);
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <footer className="dialog-footer">
                <span className="muted">{draft.ids.length} selected</span>
                <Button variant="quiet" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  disabled={!draft.ids.length}
                  onClick={() => setStep(1)}
                >
                  Next
                  <ArrowRight size={20} />
                </Button>
              </footer>
            </>
          ) : (
            <>
              <div className="dialog-body configure-grid configuration-step">
                <div className="configuration">
                  <div className="field-group">
                    <label htmlFor="widget-title">Title</label>
                    <input
                      id="widget-title"
                      maxLength={64}
                      value={draft.title}
                      onChange={(e) =>
                        setDraft({ ...draft, title: e.target.value })
                      }
                    />
                    {!draft.title.trim() && (
                      <span className="error-text">Enter a title</span>
                    )}
                  </div>
                  <SelectField
                    label="Widget type"
                    value={draft.style}
                    onChange={(value) =>
                      setDraft({ ...draft, style: value as Widget["style"] })
                    }
                    options={[
                      { value: "list", label: "Entity list" },
                      {
                        value: "number",
                        label: "Metric",
                        disabled: !numeric,
                      },
                    ]}
                  />
                  {!numeric && (
                    <p className="muted">Includes state data. Use an entity list.</p>
                  )}
                  <Toggle
                    label="Show icons"
                    checked={draft.icon}
                    onChange={(value) => setDraft({ ...draft, icon: value })}
                  />
                  <div className="selected-data-heading">
                    <span>Data and order · {draft.ids.length}</span>
                    <Button variant="quiet" onClick={() => setStep(0)}>
                      Change data
                    </Button>
                  </div>
                  <div className="selected-data">
                    {draft.ids.map((id, index) => (
                      <div className="selected-data-row" key={id}>
                        <span>
                          {sampleEntities.find((e) => e.id === id)?.name}
                        </span>
                        <div>
                          <Button
                            variant="quiet"
                            className="icon-button"
                            aria-label={`Move up: ${sampleEntities.find((e) => e.id === id)?.name}`}
                            disabled={index === 0}
                            onClick={() => move(index, -1)}
                          >
                            <ArrowUp size={18} />
                          </Button>
                          <Button
                            variant="quiet"
                            className="icon-button"
                            aria-label={`Move down: ${sampleEntities.find((e) => e.id === id)?.name}`}
                            disabled={index === draft.ids.length - 1}
                            onClick={() => move(index, 1)}
                          >
                            <ArrowDown size={18} />
                          </Button>
                          <Button
                            variant="quiet"
                            className="icon-button"
                            aria-label={`Remove ${sampleEntities.find((e) => e.id === id)?.name}`}
                            onClick={() =>
                              changeIds(draft.ids.filter((item) => item !== id))
                            }
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!draft.ids.length && (
                    <p className="error-text">Select at least one item.</p>
                  )}
                </div>
                <div className="draft-preview">
                  <span className="eyebrow">Preview · Sample data</span>
                  <h3>{draft.title.trim() || "Untitled widget"}</h3>
                  <WidgetPreview widget={draft} />
                </div>
              </div>
              <footer className="dialog-footer">
                {widget && (
                  <Button
                    variant="quiet"
                    className="delete-widget"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <Trash2 size={18} />
                    Delete
                  </Button>
                )}
                <Button variant="quiet" onClick={() => setStep(0)}>
                  Back to selection
                </Button>
                <Button variant="quiet" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  disabled={!draft.title.trim() || !draft.ids.length}
                  onClick={() =>
                    onSave({ ...draft, title: draft.title.trim() })
                  }
                >
                  {widget ? "Save changes" : "Add widget"}
                </Button>
              </footer>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
