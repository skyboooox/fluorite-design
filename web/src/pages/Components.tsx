import { useState } from "react";
import {
  Accordion,
  AlertDialog,
  DropdownMenu,
  Dialog,
  RadioGroup,
  Slider,
  Tabs,
  Toast,
} from "radix-ui";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  Ellipsis,
  FileText,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  Button,
  CheckBox,
  Modal,
  Section,
  SelectField,
  Tip,
  Toggle,
} from "../components/ui";
import { ActionDemo } from "../components/ActionDemo";
import { Chart } from "../components/Chart";
import { ContextFeedback } from "../components/ContextFeedback";
import { sampleEntities } from "../data";

const groups = [
  { id: "actions", name: "Actions" },
  { id: "inputs", name: "Inputs" },
  { id: "selection", name: "Selection" },
  { id: "navigation", name: "Navigation" },
  { id: "data", name: "Data and feedback" },
  { id: "overlays", name: "Overlays" },
];
export function Components() {
  const [checked, setChecked] = useState(true),
    [selected, setSelected] = useState(["temperature"]),
    [level, setLevel] = useState(48),
    [mode, setMode] = useState("auto"),
    [search, setSearch] = useState(""),
    [name, setName] = useState("Workspace"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [page, setPage] = useState(1),
    [deleted, setDeleted] = useState(false),
    [simulateFailure, setSimulateFailure] = useState(false),
    [formOpen, setFormOpen] = useState(false);
  const notify = (text: string) => setNotice(text);
  return (
    <>
      <Tabs.Root defaultValue="actions">
        <Tabs.List className="tabs" aria-label="Component categories">
          {groups.map((g) => (
            <Tabs.Trigger key={g.id} value={g.id}>
              {g.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="actions">
          <Section
            title="Action hierarchy"
            description="Emphasize the primary action. Keep secondary actions neutral and cancellation quiet."
          >
            <div className="showcase">
              <div className="action-row">
                <Button
                  variant="primary"
                  onClick={() => notify("Primary action triggered")}
                >
                  Save selection
                  <ArrowRight size={20} />
                </Button>
                <Button onClick={() => notify("Secondary action triggered")}>
                  Browse entities
                  <ChevronRight size={20} />
                </Button>
                <Button variant="quiet" onClick={() => notify("Cancelled")}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => notify("Destructive action demo. No data was deleted.")}
                >
                  Delete
                </Button>
              </div>
              <div className="action-row">
                <Tip text="This example is disabled">
                  <Button disabled>Unavailable</Button>
                </Tip>
                <Button
                  className="icon-button"
                  aria-label="Edit example"
                  onClick={() => notify("Edit demo opened")}
                >
                  <Pencil />
                </Button>
                <Button
                  className="icon-button"
                  variant="quiet"
                  aria-label="Download guide"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = "/Fluorite-Design.md";
                    a.download = "Fluorite-Design.md";
                    a.click();
                  }}
                >
                  <Download />
                </Button>
              </div>
            </div>
          </Section>
          <Section
            title="Localized emphasis"
            description="Use a stripe band on review actions. Keep the content area clear."
          >
            <div className="showcase action-row">
              <Button
                variant="primary"
                stripe
                onClick={() => notify("Configuration reviewed")}
              >
                Review setup
                <ArrowRight size={20} />
              </Button>
              <Button onClick={() => notify("Review closed")}>Close</Button>
            </div>
          </Section>
          <Section
            title="Pending and recovery"
            description="Prevent duplicate actions while pending. Allow cancellation."
          >
            <div className="showcase narrow">
              <Toggle
                label="Simulate failure"
                checked={simulateFailure}
                onChange={setSimulateFailure}
              />
              <ActionDemo fail={simulateFailure} />
            </div>
          </Section>
        </Tabs.Content>
        <Tabs.Content value="inputs">
          <Section
            title="Labeled inputs"
            description="Show errors inline. Edit existing values directly."
          >
            <form
              className="showcase form-grid"
              onSubmit={(e) => {
                e.preventDefault();
                if (!name.trim()) setError("Enter a workspace name");
                else {
                  setError("");
                  notify(`Saved: ${name.trim()}`);
                }
              }}
            >
              <div className="field-group">
                <label htmlFor="workspace">Workspace name</label>
                <input
                  id="workspace"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "name-error" : undefined}
                />
                {error && (
                  <span id="name-error" className="error-text">
                    {error}
                  </span>
                )}
              </div>
              <div className="field-group">
                <label htmlFor="search-demo">Search</label>
                <div className="input-icon">
                  <Search size={20} />
                  <input
                    id="search-demo"
                    placeholder="Search components"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <Button
                      variant="quiet"
                      className="icon-button"
                      aria-label="Clear search"
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="interval">Recording interval (seconds)</label>
                <input
                  id="interval"
                  type="number"
                  min={1}
                  max={60}
                  defaultValue={5}
                />
              </div>
              <div className="field-group">
                <label htmlFor="date">Date</label>
                <input id="date" type="date" defaultValue="2026-10-11" />
              </div>
              <div className="field-group wide">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" rows={3} placeholder="Optional" />
              </div>
              <div className="action-row wide">
                <Button type="submit" variant="primary">
                  Save setup
                </Button>
              </div>
            </form>
          </Section>
        </Tabs.Content>
        <Tabs.Content value="selection">
          <Section
            title="Switches and checkboxes"
            description="Use the primary color for on states and an X for checked boxes."
          >
            <div className="selection-grid">
              <div className="showcase">
                <Toggle
                  label="Enable recording"
                  checked={checked}
                  onChange={setChecked}
                />
                <Toggle
                  label="Background recording unavailable"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
                <hr />
                <CheckBox
                  label="Select all data"
                  checked={
                    selected.length === sampleEntities.length
                      ? true
                      : selected.length
                        ? "indeterminate"
                        : false
                  }
                  onChange={(v) =>
                    setSelected(v ? sampleEntities.map((x) => x.id) : [])
                  }
                />
                {sampleEntities.map((e) => (
                  <CheckBox
                    key={e.id}
                    label={e.name}
                    checked={selected.includes(e.id)}
                    onChange={(v) =>
                      setSelected(
                        v
                          ? [...selected, e.id]
                          : selected.filter((x) => x !== e.id),
                      )
                    }
                  />
                ))}
              </div>
              <div className="showcase">
                <SelectField
                  label="Operating mode"
                  value={mode}
                  onChange={setMode}
                  options={[
                    { value: "auto", label: "Automatic" },
                    { value: "eco", label: "Eco" },
                    { value: "manual", label: "Manual" },
                  ]}
                />
                <div className="field-group">
                  <span id="theme-choice">Timestamp</span>
                  <RadioGroup.Root
                    className="radio-group"
                    defaultValue="updated"
                    aria-labelledby="theme-choice"
                  >
                    {[
                      ["hidden", "Hidden"],
                      ["updated", "Last updated"],
                      ["changed", "Last changed"],
                    ].map(([v, l]) => (
                      <label key={v}>
                        <RadioGroup.Item value={v} className="radio">
                          <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        {l}
                      </label>
                    ))}
                  </RadioGroup.Root>
                </div>
                <div className="field-group">
                  <label id="brightness-label">
                    Brightness <output className="mono">{level}%</output>
                  </label>
                  <Slider.Root
                    className="slider"
                    value={[level]}
                    onValueChange={(v) => setLevel(v[0])}
                    min={0}
                    max={100}
                    aria-labelledby="brightness-label"
                  >
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb aria-label="Brightness" />
                  </Slider.Root>
                </div>
              </div>
            </div>
          </Section>
        </Tabs.Content>
        <Tabs.Content value="navigation">
          <Section
            title="Hierarchy and disclosure"
            description="Show the current location. Reveal settings as needed."
          >
            <div className="showcase">
              <nav className="breadcrumbs" aria-label="Example location">
                <button onClick={() => notify("Back to components")}>Components</button>
                <ChevronRight size={16} />
                <span aria-current="page">Navigation</span>
              </nav>
              <Accordion.Root
                type="single"
                collapsible
                className="accordion"
                defaultValue="general"
              >
                {[
                  [
                    "general",
                    "General settings",
                    "Keep basic settings visible. Reveal advanced options as needed.",
                  ],
                  [
                    "advanced",
                    "Advanced settings",
                    "Use clear labels and descriptions. Avoid showing every option at once.",
                  ],
                  ["help", "Help", "Use the keyboard to navigate. Press Enter or Space to expand."],
                ].map(([v, l, d]) => (
                  <Accordion.Item key={v} value={v}>
                    <Accordion.Header>
                      <Accordion.Trigger>
                        {l}
                        <ChevronDown size={20} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <div className="accordion-inner">
                        <p>{d}</p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
              <p role="status">
                Page {page} ·{" "}
                {groups
                  .slice((page - 1) * 2, page * 2)
                  .map((x) => x.name)
                  .join(", ")}
              </p>
              <div className="pagination">
                <Button
                  className="icon-button"
                  aria-label="Previous page"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                {[1, 2, 3].map((n) => (
                  <Button
                    key={n}
                    className="icon-button"
                    variant={page === n ? "primary" : "quiet"}
                    aria-label={`Page ${n}`}
                    aria-current={page === n ? "page" : undefined}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </Button>
                ))}
                <Button
                  className="icon-button"
                  aria-label="Next page"
                  disabled={page === 3}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </Section>
        </Tabs.Content>
        <Tabs.Content value="data">
          <Section
            title="Lists and charts"
            description="Sample data. Use lists for related items and shared axes for trends."
          >
            <div className="data-grid">
              <div className="showcase table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Current value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleEntities.slice(0, 4).map((e) => (
                      <tr key={e.id}>
                        <td>{e.name}</td>
                        <td className="mono">
                          {e.value} <small>{e.unit}</small>
                        </td>
                        <td>
                          <span className="badge positive">Available</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="showcase">
                <div className="card-heading">
                  <h3>Ambient temperature</h3>
                  <span className="mono">24.6 °C</span>
                </div>
                <Chart />
              </div>
            </div>
          </Section>
          <Section title="Status feedback">
            <div className="feedback-grid">
              <ContextFeedback />
              <ContextFeedback kind="data" />
              <div className="empty">
                <FileText size={28} />
                <strong>No data yet</strong>
                <span>Add an item to get started.</span>
              </div>
              <div className="skeleton-card" aria-label="Loading data">
                <span />
                <span />
                <span />
              </div>
            </div>
          </Section>
        </Tabs.Content>
        <Tabs.Content value="overlays">
          <Section
            title="Dialogs and menus"
            description="Move focus into the overlay and restore it on close. Support Escape."
          >
            <div className="showcase action-row">
              <Modal
                title="New workspace"
                open={formOpen}
                onOpenChange={setFormOpen}
                description="Interactive demo. No external devices are connected."
                trigger={<Button variant="primary">Open dialog</Button>}
              >
                <DemoForm
                  key={String(formOpen)}
                  onSave={(text) => {
                    notify(text);
                    setFormOpen(false);
                  }}
                />
              </Modal>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button>
                    More actions
                    <Ellipsis size={20} />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="dropdown-menu"
                    sideOffset={6}
                  >
                    <DropdownMenu.Item
                      onSelect={() => notify("Duplicate demo triggered")}
                    >
                      Duplicate widget
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={() => {
                        setChecked(true);
                        setSelected(["temperature"]);
                        setLevel(48);
                        setMode("auto");
                        setSearch("");
                        setName("Workspace");
                        setError("");
                        setPage(1);
                        setDeleted(false);
                        setSimulateFailure(false);
                        notify("Demo options reset");
                      }}
                    >
                      Reset options
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                      className="danger-text"
                      onSelect={() => notify("Remove demo triggered")}
                    >
                      Remove widget
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <Button variant="danger">
                    <Trash2 size={18} />
                    Delete example
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="overlay" />
                  <AlertDialog.Content className="dialog compact">
                    <AlertDialog.Title>Delete this example?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This changes only the demo state. You can restore it.
                    </AlertDialog.Description>
                    <div className="dialog-footer">
                      <AlertDialog.Cancel asChild>
                        <Button variant="quiet">Cancel</Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button
                          variant="danger"
                          onClick={() => setDeleted(true)}
                        >
                          Delete
                        </Button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
              <Modal
                title="Help"
                description="Interactive example"
                trigger={
                  <Button className="icon-button" aria-label="Help">
                    <CircleHelp />
                  </Button>
                }
              >
                <div className="dialog-body">
                  <p>
                    Press Escape to close the dialog and restore focus. Demo actions affect only this page.
                  </p>
                </div>
                <footer className="dialog-footer">
                  <Dialog.Close asChild>
                    <Button variant="primary">Close</Button>
                  </Dialog.Close>
                </footer>
              </Modal>
            </div>
            {deleted && (
              <div className="message">
                <span>Example deleted.</span>
                <Button variant="quiet" onClick={() => setDeleted(false)}>
                  Restore
                </Button>
              </div>
            )}
          </Section>
        </Tabs.Content>
      </Tabs.Root>
      {notice && (
        <Toast.Root
          key={notice}
          className="toast"
          open={!!notice}
          onOpenChange={(v) => {
            if (!v) setNotice("");
          }}
          duration={5000}
        >
          <Toast.Title>{notice}</Toast.Title>
          <Toast.Close asChild>
            <Button
              variant="quiet"
              className="icon-button"
              aria-label="Dismiss notification"
            >
              <X size={18} />
            </Button>
          </Toast.Close>
        </Toast.Root>
      )}
    </>
  );
}
function DemoForm({ onSave }: { onSave: (text: string) => void }) {
  const [name, setName] = useState("Workspace");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(`Demo workspace saved: ${name.trim()}`);
      }}
    >
      <div className="dialog-body field-group">
        <label htmlFor="new-workspace">Name</label>
        <input
          id="new-workspace"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <footer className="dialog-footer">
        <Dialog.Close asChild>
          <Button variant="quiet" type="button">
            Cancel
          </Button>
        </Dialog.Close>
        <Button variant="primary" type="submit" disabled={!name.trim()}>
          Save
        </Button>
      </footer>
    </form>
  );
}
