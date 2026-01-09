import { lazy, Suspense, useEffect, useState } from "react";
import { Dialog, DropdownMenu, Toast, Tooltip } from "radix-ui";
import { ArrowUpRight, Menu, Moon, Settings2, Sun, X } from "lucide-react";
import { pages, type PageId } from "./data";
import { Button } from "./components/ui";
import type { Widget } from "./components/WidgetPreview";
import { Overview } from "./pages/Overview";
const Foundations = lazy(() =>
  import("./pages/Foundations").then((m) => ({ default: m.Foundations })),
);
const Components = lazy(() =>
  import("./pages/Components").then((m) => ({ default: m.Components })),
);
const Layouts = lazy(() =>
  import("./pages/Layouts").then((m) => ({ default: m.Layouts })),
);
function stored(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage may be unavailable in private browsing. */
  }
}
export function App() {
  const [page, setPage] = useState<PageId>(() =>
    pages.some((p) => p.id === location.hash.slice(1))
      ? (location.hash.slice(1) as PageId)
      : "overview",
  );
  const [theme, setTheme] = useState(() =>
    stored(
      "fluorite-theme",
      matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    ),
  );
  const [reduced, setReduced] = useState(
    () => stored("fluorite-motion", "false") === "true",
  );
  const [menu, setMenu] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "environment",
      ids: ["temperature", "humidity"],
      title: "Environment",
      style: "list",
      icon: true,
    },
  ]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    persist("fluorite-theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.reduced = String(reduced);
    persist("fluorite-motion", String(reduced));
  }, [reduced]);
  useEffect(() => {
    const changed = () => {
      document.documentElement.dataset.hidden = String(document.hidden);
    };
    document.addEventListener("visibilitychange", changed);
    changed();
    return () => document.removeEventListener("visibilitychange", changed);
  }, []);
  useEffect(() => {
    const changed = () => {
      const p = location.hash.slice(1);
      if (pages.some((x) => x.id === p)) setPage(p as PageId);
      else {
        setPage("overview");
        history.replaceState(null, "", "#overview");
      }
    };
    changed();
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  const navigate = (id: PageId) => {
    setPage(id);
    location.hash = id;
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const current = pages.find((p) => p.id === page)!;
  const nav = (
    <>
      <a
        href="#overview"
        className="brand"
        onClick={(e) => {
          e.preventDefault();
          navigate("overview");
        }}
      >
        <img src="/favicon.svg" alt="" />
        <span>
          Fluorite
          <br />
          <small>Design</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(p.id)}
            aria-current={p.id === page ? "page" : undefined}
          >
            <p.icon size={20} />
            <span>{p.label}</span>
            {p.id === page && <span className="nav-marker" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        <span>Components and interactions</span>
        <a
          href="https://www.figma.com/design/zRND6JG1dfnxrT4djl7qY8/Fluorite-Design"
          target="_blank"
          rel="noreferrer"
        >
          Figma design
          <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
  return (
    <Tooltip.Provider delayDuration={200}>
      <Toast.Provider>
        <a
          className="skip-link"
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main")?.focus();
          }}
        >
          Skip to content
        </a>
        <div className="app-shell">
          <aside className="sidebar">{nav}</aside>
          <div className="main-area">
            <header className="topbar">
              <Dialog.Root open={menu} onOpenChange={setMenu}>
                <Dialog.Trigger asChild>
                  <Button
                    variant="quiet"
                    className="icon-button mobile-menu"
                    aria-label="Open menu"
                  >
                    <Menu />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="overlay" />
                  <Dialog.Content className="nav-drawer">
                    <Dialog.Title className="sr-only">Main navigation</Dialog.Title>
                    <Dialog.Description className="sr-only">
                      Choose an example page
                    </Dialog.Description>
                    <Dialog.Close asChild>
                      <Button
                        variant="quiet"
                        className="icon-button drawer-close"
                        aria-label="Close menu"
                      >
                        <X />
                      </Button>
                    </Dialog.Close>
                    {nav}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <div className="topbar-title">
                <span>Fluorite Design</span>
                <span>/</span>
                <strong>{current.label}</strong>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button
                    variant="quiet"
                    className="icon-button appearance-menu"
                    aria-label="Display preferences"
                  >
                    <Settings2 />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="dropdown-menu"
                    sideOffset={6}
                    align="end"
                  >
                    <DropdownMenu.CheckboxItem
                      checked={reduced}
                      onCheckedChange={setReduced}
                    >
                      <span>Reduce motion</span>
                      <DropdownMenu.ItemIndicator>
                        <X size={16} />
                      </DropdownMenu.ItemIndicator>
                    </DropdownMenu.CheckboxItem>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <Button
                variant="quiet"
                className="icon-button theme-switch"
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
            </header>
            <main id="main" tabIndex={-1}>
              {page !== "overview" && (
                <div className="page-heading">
                  <div>
                    <span className="eyebrow">DESIGN SYSTEM</span>
                    <h1>{current.label}</h1>
                    <p>{current.summary}</p>
                  </div>
                  <span className="page-index mono">
                    0{pages.indexOf(current) + 1} / 0{pages.length}
                  </span>
                </div>
              )}
              <div className="page-content" key={page}>
                <Suspense
                  fallback={
                    <div className="page-loading" role="status">
                      Loading components…
                    </div>
                  }
                >
                  {page === "overview" ? (
                    <Overview navigate={navigate} />
                  ) : page === "foundations" ? (
                    <Foundations />
                  ) : page === "components" ? (
                    <Components />
                  ) : (
                    <Layouts widgets={widgets} setWidgets={setWidgets} />
                  )}
                </Suspense>
              </div>
              <footer className="site-footer">
                <span>Fluorite Design</span>
                <span>Clarity · Order · Restraint</span>
              </footer>
            </main>
          </div>
        </div>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </Tooltip.Provider>
  );
}
