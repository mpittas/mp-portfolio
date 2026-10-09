import type { ReactNode } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuCreditCard,
  LuInfo,
  LuLandmark,
  LuLock,
  LuSmartphone,
} from "react-icons/lu";
import { FitFrame } from "@/components/mocks/fit-frame";

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mk-phone">
      <div className="mk-screen">
        <span className="mk-notch" aria-hidden />
        <div className="mk-status" aria-hidden>
          <span>9:41</span>
          <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="18"
              height="10"
              rx="3"
              stroke="currentColor"
              opacity="0.5"
            />
            <rect
              x="2"
              y="2"
              width="13"
              height="7"
              rx="1.8"
              fill="currentColor"
            />
            <rect
              x="19.6"
              y="3.6"
              width="1.6"
              height="3.8"
              rx="0.8"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>
        <div className="mk-body">{children}</div>
      </div>
    </div>
  );
}

function Nav({ title }: { title: string }) {
  return (
    <div className="mk-nav">
      <span className="mk-back">
        <LuChevronLeft size={16} />
      </span>
      {title}
    </div>
  );
}

export function ClearingAmount() {
  return (
    <Phone>
      <Nav title="Buy Bitcoin" />
      <div className="mk-amount">
        <div>
          <small>You pay</small>
          <strong>&euro;100</strong>
        </div>
        <span className="mk-cur">
          EUR <LuChevronDown size={13} />
        </span>
      </div>
      <div className="mk-get">
        <span>
          You get <b>&asymp; 0.00131 BTC</b>
        </span>
        <span className="mk-chip">
          <LuLock size={10} /> Rate locked 0:45
        </span>
      </div>
      <div className="mk-card">
        <div className="mk-row">
          <span>Our fee, included</span>
          <b>&euro;1.99</b>
        </div>
        <div className="mk-row total">
          <span>Total you pay</span>
          <b>&euro;101.99</b>
        </div>
        <div className="mk-more">
          See how this is calculated <LuChevronDown size={13} />
        </div>
      </div>
      <p className="mk-note" style={{ marginTop: 12 }}>
        <LuInfo size={13} />
        You will not be charged anything else for this order.
      </p>
      <div className="mk-btns">
        <div className="mk-btn">Continue</div>
      </div>
    </Phone>
  );
}

export function ClearingVerify() {
  return (
    <Phone>
      <Nav title="Buy Bitcoin" />
      <h4 className="mk-h">Verify your identity</h4>
      <p className="mk-sub">3 steps, about 2 minutes</p>
      <div className="mk-seg" aria-hidden>
        <i className="on" />
        <i className="half" />
        <i />
      </div>
      <div className="mk-steps">
        <div className="mk-step done">
          <span className="mk-ico done">
            <LuCheck size={12} />
          </span>
          <div>
            <b>Email confirmed</b>
            <span>alex@example.com</span>
          </div>
        </div>
        <div className="mk-step now">
          <span className="mk-ico now">2</span>
          <div>
            <b>ID document</b>
            <span>Passport or ID card. Takes about a minute.</span>
          </div>
        </div>
        <div className="mk-step">
          <span className="mk-ico">3</span>
          <div>
            <b>Selfie check</b>
            <span>A quick photo to match your ID.</span>
          </div>
        </div>
      </div>
      <div className="mk-link">
        <LuInfo size={13} /> Why do we need this?
      </div>
      <p className="mk-note">We only use your ID to confirm who you are.</p>
      <div className="mk-btns">
        <div className="mk-btn">Scan my ID</div>
        <div className="mk-btn ghost">Save and finish later</div>
      </div>
    </Phone>
  );
}

export function ClearingPay() {
  return (
    <Phone>
      <Nav title="Payment" />
      <div className="mk-card" style={{ marginTop: 8 }}>
        <div className="mk-row">
          <span>You pay</span>
          <b>&euro;101.99</b>
        </div>
        <div className="mk-row">
          <span>You get</span>
          <b>&asymp; 0.00131 BTC</b>
        </div>
        <div className="mk-row">
          <span>Arrives in</span>
          <b>about 5 min</b>
        </div>
      </div>
      <p
        className="mk-label-s"
        style={{ margin: "14px 0 0", fontSize: 12, fontWeight: 600 }}
      >
        Pay with
      </p>
      <div className="mk-pay">
        <div className="mk-method sel">
          <span className="mk-card-ico">
            <LuCreditCard size={14} />
          </span>
          <div>
            Card ending 4242
            <span>Instant</span>
          </div>
          <em />
        </div>
        <div className="mk-method">
          <span className="mk-card-ico">
            <LuSmartphone size={14} />
          </span>
          <div>
            Apple Pay
            <span>Instant</span>
          </div>
          <em />
        </div>
        <div className="mk-method">
          <span className="mk-card-ico">
            <LuLandmark size={14} />
          </span>
          <div>
            Bank transfer
            <span>No card fee, 1 to 2 days</span>
          </div>
          <em />
        </div>
      </div>
      <p className="mk-note">
        <LuInfo size={13} />
        Your bank may ask you to confirm this payment.
      </p>
      <div className="mk-btns">
        <div className="mk-btn">Pay &euro;101.99</div>
      </div>
    </Phone>
  );
}

export function ClearingStatus() {
  return (
    <Phone>
      <div className="mk-done">
        <LuCheck size={28} strokeWidth={2.4} />
      </div>
      <h4 className="mk-h" style={{ margin: "0 0 3px" }}>
        Payment received
      </h4>
      <p className="mk-sub">We are buying your Bitcoin now.</p>
      <div className="mk-card mk-tl">
        <div className="mk-tl-i done">
          <span className="mk-ico done">
            <LuCheck size={12} />
          </span>
          <div>
            <b>Payment received</b>
            <span>12:04</span>
          </div>
        </div>
        <div className="mk-tl-i">
          <span className="mk-ico now pulse">2</span>
          <div>
            <b>Buying your Bitcoin</b>
            <span>About 2 minutes</span>
          </div>
        </div>
        <div className="mk-tl-i">
          <span className="mk-ico">3</span>
          <div>
            <b>Sent to your wallet</b>
            <span>About 3 minutes after</span>
          </div>
        </div>
      </div>
      <p className="mk-note">
        <LuInfo size={13} />
        Taking longer than 10 minutes? We will tell you why, and you can reach
        support from here.
      </p>
      <div className="mk-btns">
        <div className="mk-btn ghost">View receipt</div>
        <div className="mk-btn">Done</div>
      </div>
    </Phone>
  );
}

const STEPS = [
  { label: "Amount", screen: <ClearingAmount /> },
  { label: "Verify", screen: <ClearingVerify /> },
  { label: "Pay", screen: <ClearingPay /> },
  { label: "Status", screen: <ClearingStatus /> },
];

/** The full four-screen flow, in real pixels. Scrolls sideways on small screens. */
export function ClearingFlow() {
  return (
    <div
      className="mk mk-cl mk-flow-stage"
      role="img"
      aria-label="Four mobile screens: enter an amount with the fee shown, verify identity in steps, choose how to pay, and track the status of the purchase."
    >
      {STEPS.map((step, index) => (
        <div key={step.label} className="mk-flow-item">
          <span className="mk-flow-label">
            <i>{index + 1}</i>
            {step.label}
          </span>
          {step.screen}
        </div>
      ))}
    </div>
  );
}

/** Two phones on a tinted plate, for cards and the case study header. */
export function ClearingCover() {
  return (
    <FitFrame width={1000} height={625} mode="contain">
      <div
        className="mk mk-cl"
        style={{ position: "relative", width: 1000, height: 625 }}
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 70,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "#cfe3d2",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: 40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#f2e6c9",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 250,
            top: 62,
            transform: "rotate(-5deg)",
          }}
        >
          <ClearingAmount />
        </div>
        <div
          style={{
            position: "absolute",
            left: 520,
            top: 118,
            transform: "rotate(4deg)",
          }}
        >
          <ClearingStatus />
        </div>
      </div>
    </FitFrame>
  );
}
