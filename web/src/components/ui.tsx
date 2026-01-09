import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
  Ref,
} from "react";
import { useId } from "react";
import { Checkbox, Dialog, Select, Switch, Tooltip } from "radix-ui";
import { Check, ChevronDown, X, Minus } from "lucide-react";

export function Button({
  variant = "secondary",
  stripe = false,
  attention = false,
  busy = false,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet" | "danger";
  stripe?: boolean;
  attention?: boolean;
  busy?: boolean;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      {...props}
      aria-busy={busy || undefined}
      className={`button ${variant} ${stripe && !attention ? "striped" : ""} ${attention ? "attention-surface" : ""} ${busy ? "busy" : ""} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
}
export function AttentionPanel({
  children,
  active = true,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return (
    <div
      {...props}
      className={`attention-panel ${active ? "attention-surface" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={label}
        className="switch"
      >
        <Switch.Thumb className="switch-thumb" />
      </Switch.Root>
    </label>
  );
}
export function CheckBox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean | "indeterminate";
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="check-row">
      <Checkbox.Root
        className="checkbox"
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
      >
        <Checkbox.Indicator>
          {checked === "indeterminate" ? <Minus size={16} /> : <X size={16} />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span>{label}</span>
    </label>
  );
}
export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  const id = useId();
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger id={id} aria-label={label} className="select-trigger">
          <Select.Value />
          <Select.Icon>
            <ChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="select-menu"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport>
              {options.map((o) => (
                <Select.Item
                  className="select-item"
                  key={o.value}
                  value={o.value}
                  disabled={o.disabled}
                >
                  <Select.ItemText>{o.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
export function Modal({
  title,
  description,
  trigger,
  children,
  open,
  onOpenChange,
  returnFocusRef,
}: {
  title: string;
  description?: string;
  trigger?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content
          className="dialog"
          onCloseAutoFocus={(e) => {
            if (returnFocusRef?.current) {
              e.preventDefault();
              returnFocusRef.current.focus();
            }
          }}
        >
          <header>
            <div>
              <Dialog.Title>{title}</Dialog.Title>
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              {!description && (
                <Dialog.Description className="sr-only">
                  {title}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <Button className="icon-button" variant="quiet" aria-label="Close">
                <X />
              </Button>
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Tip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="tooltip" sideOffset={6}>
          {text}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
export function Section({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
export function Metric({
  icon,
  name,
  value,
  unit,
  subtitle,
}: {
  icon: ReactNode;
  name: string;
  value: string;
  unit?: string;
  subtitle?: string;
}) {
  return (
    <article className="metric">
      <i />
      <i />
      <i />
      <i />
      <header>
        {icon}
        <span>{name}</span>
      </header>
      <div className="metric-value">
        <strong>{value}</strong>
        {unit && <span>{unit}</span>}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </article>
  );
}
