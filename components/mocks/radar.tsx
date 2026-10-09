import {
  LuCheck,
  LuCircleAlert,
  LuClock,
  LuFileText,
  LuInbox,
  LuLayoutDashboard,
  LuLock,
  LuMinus,
  LuPlus,
  LuRadar,
  LuRefreshCw,
  LuRotateCw,
  LuSearch,
  LuSettings,
  LuTriangleAlert,
  LuUsers,
} from "react-icons/lu";
import { FitFrame } from "@/components/mocks/fit-frame";

type Tone = "red" | "amber" | "green" | "gray";

const ROWS: {
  n: string;
  i: string;
  bg: string;
  fg: string;
  owner: string;
  renews: string;
  date: string;
  left: string;
  tone: Tone;
  cost: string;
}[] = [
  {
    n: "Orbit Analytics",
    i: "O",
    bg: "#e0deff",
    fg: "#3b34b5",
    owner: "Dana K.",
    renews: "Dec 1",
    date: "Nov 12",
    left: "5 days",
    tone: "red",
    cost: "€14,400",
  },
  {
    n: "Northwind CRM",
    i: "N",
    bg: "#ddf1ff",
    fg: "#0b5a8a",
    owner: "Priya S.",
    renews: "Dec 15",
    date: "Nov 18",
    left: "11 days",
    tone: "amber",
    cost: "€22,800",
  },
  {
    n: "Helio Docs",
    i: "H",
    bg: "#ffe8d6",
    fg: "#9a4b10",
    owner: "Tom R.",
    renews: "Dec 15",
    date: "Nov 30",
    left: "23 days",
    tone: "amber",
    cost: "€3,600",
  },
  {
    n: "Pixelforge",
    i: "P",
    bg: "#e3f4eb",
    fg: "#17714a",
    owner: "Mei L.",
    renews: "Jan 14",
    date: "Dec 14",
    left: "37 days",
    tone: "green",
    cost: "€7,200",
  },
  {
    n: "Tandem Chat",
    i: "T",
    bg: "#fde3f0",
    fg: "#9b1c5e",
    owner: "Operations",
    renews: "Jan 30",
    date: "Dec 31",
    left: "54 days",
    tone: "green",
    cost: "€9,600",
  },
  {
    n: "Quillnote",
    i: "Q",
    bg: "#edeef5",
    fg: "#5c6380",
    owner: "No owner",
    renews: "Feb 19",
    date: "Jan 20",
    left: "74 days",
    tone: "gray",
    cost: "€1,200",
  },
  {
    n: "Cobalt Backup",
    i: "C",
    bg: "#e6f0ff",
    fg: "#1d4ed8",
    owner: "Sam W.",
    renews: "Mar 4",
    date: "Feb 2",
    left: "87 days",
    tone: "green",
    cost: "€4,800",
  },
];

function ToneIcon({ tone }: { tone: Tone }) {
  if (tone === "red") return <LuTriangleAlert size={12} />;
  if (tone === "amber") return <LuClock size={12} />;
  if (tone === "green") return <LuCheck size={12} />;
  return <LuMinus size={12} />;
}

function Checkbox({ on = false }: { on?: boolean }) {
  return (
    <span className={`mk-cb ${on ? "on" : ""}`}>
      {on ? <LuCheck size={11} strokeWidth={3} /> : null}
    </span>
  );
}

function Row({
  row,
  active = false,
  selected = false,
}: {
  row: (typeof ROWS)[number];
  active?: boolean;
  selected?: boolean;
}) {
  return (
    <div className={`mk-tr ${active ? "act" : ""} ${selected ? "sel" : ""}`}>
      <Checkbox on={selected} />
      <div className="mk-sub-n">
        <i style={{ background: row.bg, color: row.fg }}>{row.i}</i>
        <div style={{ minWidth: 0 }}>
          <b>{row.n}</b>
          <span>
            {row.owner} &middot; renews {row.renews}
          </span>
        </div>
      </div>
      <span className={`mk-pill ${row.tone}`}>
        <ToneIcon tone={row.tone} />
        {row.date} &middot; {row.left}
      </span>
      <span className="num">{row.cost}</span>
    </div>
  );
}

function TableHead() {
  return (
    <div className="mk-tr th">
      <span />
      <span>Subscription</span>
      <span>Cancel by</span>
      <span className="num">Per year</span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="mk-side">
      <div className="mk-logo">
        <i>
          <LuRadar size={13} />
        </i>
        Radar
      </div>
      <div className="mk-nav-i">
        <LuLayoutDashboard size={15} /> Overview
      </div>
      <div className="mk-nav-i on">
        <LuRefreshCw size={15} /> Renewals
      </div>
      <div className="mk-nav-i">
        <LuFileText size={15} /> Contracts
      </div>
      <div className="mk-nav-i">
        <LuUsers size={15} /> People
      </div>
      <div className="mk-nav-i">
        <LuSettings size={15} /> Settings
      </div>
      <div className="mk-ws">
        <b>Northwind Ltd</b>
        <span>Finance workspace</span>
      </div>
    </aside>
  );
}

function Panel() {
  return (
    <aside className="mk-panel">
      <div>
        <h4>Orbit Analytics</h4>
        <div style={{ marginTop: 8 }}>
          <span className="mk-pill red">
            <LuTriangleAlert size={12} /> Cancel by Nov 12 &middot; 5 days
          </span>
        </div>
      </div>
      <div className="mk-facts">
        <div className="mk-fact">
          <span>Renews</span>
          <b>Dec 1</b>
        </div>
        <div className="mk-fact">
          <span>Per year</span>
          <b>&euro;14,400</b>
        </div>
        <div className="mk-fact">
          <span>Notice period</span>
          <b>30 days</b>
        </div>
        <div className="mk-fact">
          <span>Owner</span>
          <b>Dana K.</b>
        </div>
      </div>
      <div>
        <p className="mk-label">Seat usage, last 60 days</p>
        <div className="mk-meter">
          <i style={{ width: "63%" }} />
        </div>
        <div className="mk-meter-cap">
          <span>38 of 60 seats active</span>
          <span>22 idle</span>
        </div>
      </div>
      <div className="mk-rec">
        <b>Reduce to 40 seats</b>
        <p>
          22 seats had no activity in 60 days. Cutting to 40 saves about
          &euro;4,800 a year.
        </p>
        <div>
          <span className="mk-rbtn sm">Accept</span>
          <span className="mk-rbtn sm sec">Dismiss</span>
        </div>
      </div>
      <div>
        <p className="mk-label">Activity</p>
        <div className="mk-log">
          <div>
            <i />
            <span>
              <b>Dana K.</b> was set as owner, Oct 2
            </span>
          </div>
          <div>
            <i />
            <span>Price rose 8% at the last renewal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Window() {
  return (
    <div className="mk-win">
      <div className="mk-bar" aria-hidden>
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-dot" />
        <span className="mk-url">renewalradar.app/renewals</span>
      </div>
      <div className="mk-app">
        <Sidebar />
        <main className="mk-main">
          <div className="mk-head">
            <div>
              <h4>Renewals</h4>
              <p>Next 90 days, sorted by the date you can still act</p>
            </div>
            <span className="mk-rbtn">
              <LuPlus size={14} /> Add subscription
            </span>
          </div>
          <div className="mk-kpis">
            <div className="mk-kpi warn">
              <span>Needs a decision</span>
              <strong>3</strong>
              <em style={{ color: "var(--r-red)" }}>1 due this week</em>
            </div>
            <div className="mk-kpi">
              <span>Renewing in 90 days</span>
              <strong>&euro;63,600</strong>
              <em style={{ color: "var(--r-mute)" }}>7 subscriptions</em>
            </div>
            <div className="mk-kpi">
              <span>Possible savings</span>
              <strong>&euro;6,400</strong>
              <em style={{ color: "var(--r-green)" }}>2 suggestions</em>
            </div>
          </div>
          <div className="mk-filters">
            <span className="mk-fchip on">Decide soon &middot; 3</span>
            <span className="mk-fchip">All &middot; 7</span>
            <span className="mk-fchip">No owner &middot; 1</span>
            <span style={{ flex: 1 }} />
            <span className="mk-fchip">
              <LuSearch size={12} /> Search
            </span>
          </div>
          <div className="mk-table">
            <TableHead />
            {ROWS.map((row, index) => (
              <Row key={row.n} row={row} active={index === 0} />
            ))}
          </div>
        </main>
        <Panel />
      </div>
    </div>
  );
}

/** The main dashboard. Scrolls sideways on small screens so it stays legible. */
export function RadarDashboard() {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-[#e9eaf5]">
      <div className="mk mk-rr min-w-[760px] p-4 md:p-8">
        <FitFrame width={1160} height={740}>
          <div style={{ padding: 20 }}>
            <Window />
          </div>
        </FitFrame>
      </div>
    </div>
  );
}

export function RadarCover() {
  return (
    <FitFrame width={1000} height={625} mode="contain">
      <div
        className="mk mk-rr"
        style={{ position: "relative", width: 1000, height: 625 }}
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 84,
            transform: "scale(0.86)",
            transformOrigin: "top left",
          }}
        >
          <Window />
        </div>
        <div
          style={{
            position: "absolute",
            left: 34,
            bottom: 46,
            width: 270,
            transform: "rotate(-2.5deg)",
            borderRadius: 16,
            background: "#fff",
            padding: 8,
            boxShadow: "0 24px 50px -16px rgba(20,26,46,.45)",
          }}
        >
          <div className="mk-rec">
            <b>Reduce to 40 seats</b>
            <p>
              Saves about &euro;4,800 a year. 22 seats were idle for 60 days.
            </p>
            <div>
              <span className="mk-rbtn sm">Accept</span>
              <span className="mk-rbtn sm sec">Dismiss</span>
            </div>
          </div>
        </div>
      </div>
    </FitFrame>
  );
}

function StateCard({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`mk-st ${wide ? "wide" : ""}`}>
      <header>{label}</header>
      {children}
    </section>
  );
}

function Sheet() {
  const skeleton = [
    ["46%", "26%"],
    ["38%", "22%"],
    ["52%", "30%"],
    ["34%", "24%"],
  ];
  return (
    <div className="mk-sheet">
      <div className="mk-sheet-grid">
        <StateCard label="Empty">
          <div className="mk-st-body">
            <span className="mk-st-ico">
              <LuInbox size={20} />
            </span>
            <h4>Nothing to decide this week</h4>
            <p>Every renewal due in the next 7 days already has a decision.</p>
            <div className="acts">
              <span className="mk-rbtn sm sec">See the next 30 days</span>
            </div>
          </div>
        </StateCard>
        <StateCard label="Loading">
          <div className="mk-skel">
            {skeleton.map(([a, b], index) => (
              <div key={index}>
                <i className="sq" />
                <i style={{ width: a }} />
                <i style={{ width: b, marginLeft: "auto" }} />
              </div>
            ))}
          </div>
        </StateCard>
        <StateCard label="Error">
          <div className="mk-st-body">
            <span className="mk-st-ico red">
              <LuCircleAlert size={20} />
            </span>
            <h4>We could not load renewals</h4>
            <p>
              Your data is safe. This one is on our side. Try again, or check
              the status page.
            </p>
            <div className="acts">
              <span className="mk-rbtn sm">
                <LuRotateCw size={12} /> Try again
              </span>
              <span className="mk-rbtn sm sec">Status page</span>
            </div>
          </div>
        </StateCard>
        <StateCard label="No permission">
          <div className="mk-st-body">
            <span className="mk-st-ico gray">
              <LuLock size={20} />
            </span>
            <h4>Costs are hidden for your role</h4>
            <p>
              You can see renewal dates. Cost details are limited to finance.
              Ask an admin for access.
            </p>
            <div className="acts">
              <span className="mk-rbtn sm sec">Request access</span>
            </div>
          </div>
        </StateCard>
        <StateCard label="Rows selected" wide>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "0 0 16px",
            }}
          >
            <div>
              <TableHead />
              <Row row={ROWS[1]} selected />
              <Row row={ROWS[2]} selected />
              <Row row={ROWS[3]} />
            </div>
            <div className="mk-bulkbar">
              <span>2 selected</span>
              <b>Assign owner</b>
              <b>Set reminder</b>
              <b className="hot">Mark for cancel</b>
            </div>
          </div>
        </StateCard>
      </div>
    </div>
  );
}

export function RadarStates() {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <div className="mk mk-rr min-w-[760px]">
        <FitFrame width={1120} height={590}>
          <Sheet />
        </FitFrame>
      </div>
    </div>
  );
}

const SWATCHES = [
  { c: "#141a2e", n: "Ink", u: "Text" },
  { c: "#5c6380", n: "Muted", u: "Secondary text" },
  { c: "#e3e5f0", n: "Line", u: "Borders" },
  { c: "#ffffff", n: "Surface", u: "Cards" },
  { c: "#4f46e5", n: "Brand", u: "Actions" },
  { c: "#b42318", n: "Danger", u: "Deadline" },
  { c: "#8a5a00", n: "Warning", u: "Review" },
  { c: "#17714a", n: "Success", u: "On track" },
];

function System() {
  return (
    <div className="mk-ds">
      <div className="mk-ds-col">
        <div>
          <h4>Colour</h4>
          <div className="mk-sw">
            {SWATCHES.map((s) => (
              <div key={s.n}>
                <i style={{ background: s.c }} />
                <b>{s.n}</b>
                {s.c}
                <br />
                {s.u}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4>Type</h4>
          <div className="mk-type">
            <div>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                Renewals
              </span>
              <small>Title 22 / 28, semibold</small>
            </div>
            <div>
              <span style={{ fontSize: 14 }}>
                Next 90 days, sorted by deadline
              </span>
              <small>Body 14 / 20</small>
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 500 }}>Cancel by</span>
              <small>Label 12 / 16, medium</small>
            </div>
            <div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                &euro;14,400
              </span>
              <small>Numbers, tabular</small>
            </div>
          </div>
        </div>
        <div>
          <h4>Spacing</h4>
          <div className="mk-space">
            {[4, 8, 12, 16, 24, 32].map((s) => (
              <div key={s}>
                <i style={{ width: s, height: s }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mk-ds-col">
        <div>
          <h4>Buttons</h4>
          <div className="mk-comp" style={{ marginBottom: 12 }}>
            <span className="mk-rbtn">Primary</span>
            <span className="mk-rbtn sec">Secondary</span>
            <span className="mk-rbtn ghost">Ghost</span>
            <span className="mk-rbtn danger">Mark for cancel</span>
          </div>
          <div className="mk-comp">
            <span className="mk-state-lab">States</span>
            <span className="mk-rbtn">Default</span>
            <span className="mk-rbtn hover">Hover</span>
            <span className="mk-rbtn focus">Focus</span>
            <span className="mk-rbtn disabled">Disabled</span>
          </div>
        </div>
        <div>
          <h4>Fields</h4>
          <div
            className="mk-comp"
            style={{ alignItems: "flex-start", gap: 14 }}
          >
            <div className="mk-field">
              <label>Owner</label>
              <div style={{ color: "#8a90a8" }}>Choose a person</div>
            </div>
            <div className="mk-field">
              <label>Owner</label>
              <div className="focus">Dana K.</div>
            </div>
            <div className="mk-field">
              <label>Owner</label>
              <div className="err" style={{ color: "#8a90a8" }}>
                Choose a person
              </div>
              <p>Pick an owner to set a reminder.</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Status</h4>
          <div className="mk-comp">
            <span className="mk-pill red">
              <LuTriangleAlert size={12} /> Decide now
            </span>
            <span className="mk-pill amber">
              <LuClock size={12} /> Review
            </span>
            <span className="mk-pill green">
              <LuCheck size={12} /> On track
            </span>
            <span className="mk-pill gray">
              <LuMinus size={12} /> No owner
            </span>
          </div>
          <p style={{ marginTop: 8, fontSize: 11, color: "var(--r-mute)" }}>
            Every status pairs an icon with a label, so colour is never the only
            signal.
          </p>
        </div>
        <div>
          <h4>Table row states</h4>
          <div className="mk-rowdemo">
            {[
              { label: "Default", cls: "", row: ROWS[3] },
              { label: "Hover", cls: "hov", row: ROWS[4] },
              { label: "Keyboard focus", cls: "foc", row: ROWS[6] },
            ].map(({ label, cls, row }) => (
              <div key={label} className={`mk-tr ${cls}`}>
                <Checkbox />
                <div className="mk-sub-n">
                  <i style={{ background: row.bg, color: row.fg }}>{row.i}</i>
                  <div>
                    <b>{row.n}</b>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "var(--r-mute)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadarSystem() {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <div className="mk mk-rr min-w-[760px]">
        <FitFrame width={1120} height={640}>
          <System />
        </FitFrame>
      </div>
    </div>
  );
}
