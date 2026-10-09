import type { Project } from "@/lib/types";

const KYG = "/media/notion/know-your-geo";
const KLNDR = "/media/notion/klndr";
const SONG = "/media/notion/songrates";

/*
 * Copy rules for this file:
 * - "shipped" projects only describe things that exist in the live product.
 * - "concept" projects are self-initiated. They never claim users, research
 *   results or metrics. Validation is written as a plan, not as a finding.
 * - No em dashes or en dashes in any string.
 */
export const projects: Project[] = [
  {
    slug: "know-your-geo",
    title: "KnowYourGeo",
    kind: "shipped",
    year: "2026",
    tagline: "An AI coach that turns every GeoGuessr round into a lesson.",
    summary:
      "A free training app for players who want to improve, not just chase a score. I designed and built the practice flow, the AI round review and the field guides.",
    role: "Product design, UX, UI and front-end build",
    scope: ["Product design", "UX", "UI", "Front end"],
    platform: "Responsive web",
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Google Gemini",
      "Supabase",
    ],
    links: [
      { label: "Live product", href: "https://knowyourgeo.vercel.app" },
      { label: "Code", href: "https://github.com/mpittas/knowyourgeo" },
    ],
    tone: "#1f2a1a",
    cover: {
      type: "media",
      fit: "cover",
      media: {
        src: `${KYG}/cover-poster.jpg`,
        alt: "KnowYourGeo home page shown on a tilted screen",
        ratio: 16 / 9,
      },
    },
    video: { src: `${KYG}/cover.mp4`, poster: `${KYG}/cover-poster.jpg` },
    seoDescription:
      "Case study: designing KnowYourGeo, a free GeoGuessr training app with Street View drills, an AI coach and field guides.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "A score tells you that you lost. It does not tell you why.",
        body: [
          "GeoGuessr players get better by noticing small clues: the shape of a bollard, the colour of a utility pole, how a road line is painted. That knowledge is scattered across videos and forum posts, and the end-of-game score does not point at what you missed.",
          "KnowYourGeo is built around one idea: after every round, show the player which clues they missed, then let them practise exactly that.",
        ],
      },
      {
        type: "points",
        eyebrow: "Design goals",
        heading: "What the product had to do",
        items: [
          {
            title: "Explain misses, not only scores",
            body: "Feedback should name the clue, not just the distance.",
          },
          {
            title: "Fit the player's practice",
            body: "A beginner drilling one continent and an expert drilling No Move on a timer need the same screen.",
          },
          {
            title: "Keep the loop short",
            body: "A session is five rounds. Setup should take seconds, not a settings page.",
          },
          {
            title: "Teach now, reference later",
            body: "Short feedback in the round, longer field guides when the player wants depth.",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: `${KYG}/home.jpg`,
          alt: "KnowYourGeo play screen with World and Custom tabs, a Moving and No Move toggle, timer options and continent cards",
          ratio: 16 / 9,
        },
        caption:
          "The play screen: world or continent maps, plus Moving / No Move and timer constraints in a single panel.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Five decisions that shaped the product",
        items: [
          {
            title: "Review inside the round result",
            why: "The best moment to learn a clue is right after missing it. The AI review lives in the round result, not on a separate stats page, so feedback arrives while the scene is still fresh.",
            tradeoff:
              "It could slow the loop, so it only runs when the player taps Analyze and can be closed straight away.",
          },
          {
            title: "Show the evidence, not a verdict",
            why: "The review draws boxes on the Street View frame around the clues it used, such as a street sign, the architecture or a storm drain, and shows a confidence level with its reasoning. Players can disagree with it and learn to read the scene themselves.",
          },
          {
            title: "Constraints are toggles, not modes",
            why: "Moving, No Move and the 20, 40 and 60 second timers combine with any map. A player can set up a focused drill in one glance instead of choosing from a long list of fixed modes.",
          },
          {
            title: "Maps by continent, or a custom mix",
            why: "Continent cards show the country count so players can judge the size of a drill before starting. The Custom tab adds search and country chips for targeted practice.",
          },
          {
            title: "Field guides next to the practice",
            why: "Guides cover the clue families players meet in rounds, such as road furniture, plates and utility poles, and sit in the main navigation. Profiles journal sessions and weak spots, so the next drill can be chosen from evidence.",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: `${KYG}/guides.jpg`,
          alt: "A KnowYourGeo field guide article about bollards and road furniture with a table of contents",
          ratio: 16 / 9,
        },
        caption:
          "A field guide article: a table of contents on the left, a practical checklist in the body.",
      },
      {
        type: "text",
        eyebrow: "Design and build together",
        heading: "One person, one backlog",
        body: [
          "Because I designed and built it, trade-offs were made in one place. AI analysis runs on secured, rate-limited server routes so keys never reach the browser, which means slow or unavailable responses are real states the interface has to handle, not edge cases to ignore.",
          "Sign-in works with email or Google, and profiles keep a journal of sessions and weak spots.",
        ],
      },
      {
        type: "next",
        eyebrow: "Next",
        heading: "What I would do next",
        items: [
          "Usability-test the first session with players who have never used a coaching tool.",
          "Check whether players who open the AI review return more often than those who skip it.",
          "Turn a player's most-missed clues into a ready-made drill.",
        ],
      },
    ],
  },
  {
    slug: "clearing",
    title: "Clearing",
    kind: "concept",
    year: "2026",
    tagline:
      "A first crypto purchase with no surprises: the full cost up front, verification explained, status you can trust.",
    summary:
      "A concept for a card-to-crypto on-ramp. I designed a four-step first-purchase flow around trust: fees on the first screen, plain-language identity checks and an honest status timeline.",
    role: "Product design, UX, UI and microcopy",
    scope: ["Fintech", "Onboarding", "UX writing", "Mobile"],
    platform: "Mobile web",
    tools: ["React", "Tailwind CSS", "Screens built in code"],
    links: [],
    tone: "#e6efe4",
    cover: { type: "mock", id: "clearing-cover" },
    seoDescription:
      "Concept case study: a calmer first-purchase flow for a card-to-crypto on-ramp, with fees up front, explained verification and a clear status timeline.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading:
          "Paying real money for something unfamiliar needs a calm interface.",
        body: [
          "Buying crypto for the first time means paying real money, handing over ID and then waiting for a result you cannot see. Fees that appear late, identity checks with no explanation and a status screen that is just a spinner are likely points where trust breaks.",
          "I treated those as hypotheses to design against. Clearing is a concept for how a first purchase could feel instead: clear, steady and recoverable. The screens below are built in code, so spacing and states are real, and all values are illustrative.",
        ],
      },
      {
        type: "points",
        eyebrow: "Design principles",
        heading: "Four rules every screen has to pass",
        items: [
          {
            title: "Total cost first",
            body: "What you pay, the fee and what you get are on the first screen, not the last.",
          },
          {
            title: "Explain every ask",
            body: "Each verification step says why we need it, how long it takes and what happens to the data.",
          },
          {
            title: "Never a dead end",
            body: "Any step can be saved and resumed. Errors say what to do next.",
          },
          {
            title: "Status is a story",
            body: "After paying, show where the money is in plain steps, with honest timing.",
          },
        ],
      },
      {
        type: "mock",
        id: "clearing-flow",
        label: "The flow",
        caption:
          "Amount, verify, pay, status. Mobile screens built as React components. Values are illustrative.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the design makes a stand",
        items: [
          {
            title: "Fee breakdown on the amount screen",
            why: "A surprise at the last step is where trust breaks. The first screen shows a single total line, with a collapsed breakdown for people who want the detail.",
            tradeoff:
              "More information on the first screen. The breakdown is collapsed by default so the amount stays the hero.",
          },
          {
            title: "A rate lock with a quiet timer",
            why: "Prices move. A short rate lock with a visible countdown is honest about volatility and lets the user commit without anxiety. If it expires, the quote refreshes and the screen says so instead of silently changing the total.",
            tradeoff:
              "A timer adds pressure, so it is small, neutral in colour and can be extended once.",
          },
          {
            title: "Verification as a checklist with a time estimate",
            why: "ID checks are a likely point of drop-off. Showing the steps, how long they take and a why-we-ask link, plus Save and finish later, respects intent without hiding the requirement.",
          },
          {
            title: "A status timeline with a fallback line",
            why: "Payment received, buying, sent to your wallet. Each step has an estimate, and one line explains what happens if it takes longer. Waiting feels shorter when you know what is happening.",
          },
        ],
      },
      {
        type: "copy",
        eyebrow: "UX writing",
        heading: "Microcopy, before and after",
        intro:
          "Jargon is a design problem. These are the rewrites I would put in front of users first.",
        pairs: [
          {
            before: "Spread: 1.2%",
            after: "Our margin is included in the rate you see.",
            note: "Say what it is, not what the industry calls it.",
          },
          {
            before: "KYC required to proceed",
            after: "We check your ID once. It takes about 2 minutes.",
            note: "Replace the acronym with the benefit and the time.",
          },
          {
            before: "Transaction pending",
            after: "Payment received. We are buying your Bitcoin now.",
            note: "Tell people which step they are in.",
          },
          {
            before: "Error 402",
            after:
              "Your bank declined the payment. Try another card or pay by bank transfer.",
            note: "Every error ends with something the person can do.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Validation plan",
        heading: "How I would test it",
        intro:
          "No users were involved in this concept, so there are no results here. This is the plan I would run.",
        items: [
          {
            title: "Task test with 5 to 8 first-time buyers",
            body: "Task: buy 50 euros of Bitcoin. Watch for hesitation at the fee line and at the ID step. Success means people explain what they will pay without prompting.",
          },
          {
            title: "Comprehension check after the amount screen",
            body: "Ask: how much will leave your account? Almost everyone should answer correctly without scrolling.",
          },
          {
            title: "Fee placement test",
            body: "Fee on the first screen against fee at the review step. Compare completion rate and support contacts.",
          },
          {
            title: "Accessibility pass",
            body: "Large text, screen reader order on the timeline, and contrast on status chips.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Constraints",
        heading: "What a real team would add",
        items: [
          "Regulatory wording differs by region, so compliance would review the copy and the verification steps.",
          "The identity provider decides how much of the verification flow can be designed.",
          "Failed and delayed payments need their own flows, including support handoff.",
        ],
      },
    ],
  },
  {
    slug: "klndr",
    title: "klndr",
    kind: "shipped",
    year: "2026",
    tagline:
      "A day planner you shape by dragging, not a to-do list you hope fits.",
    summary:
      "A visual planner for people who time-block. I designed the month-to-day flow, the drag-and-snap timeline and the phone patterns, then built it.",
    role: "Product design, UX, UI and front-end build",
    scope: ["Product design", "Interaction design", "UI", "Mobile"],
    platform: "Responsive web",
    tools: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS", "Firebase"],
    links: [
      { label: "Live product", href: "https://klndr-v1.vercel.app" },
      { label: "Code", href: "https://github.com/mpittas/klndr" },
    ],
    tone: "#0f1226",
    cover: {
      type: "media",
      fit: "cover",
      media: {
        src: `${KLNDR}/cover-poster.jpg`,
        alt: "klndr landing page shown on a tilted screen",
        ratio: 16 / 9,
      },
    },
    video: { src: `${KLNDR}/cover.mp4`, poster: `${KLNDR}/cover-poster.jpg` },
    seoDescription:
      "Case study: designing klndr, a visual day planner with a month view, a drag-and-snap timeline and a phone layout built around bottom sheets.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "A to-do list says what. A timeline says when.",
        body: [
          "Lists only grow, because nothing on them has a time. klndr gives each task a slot, so you can see whether your day fits before it starts.",
          "The product bridges the month calendar and the hour-by-hour plan, so planning feels like zooming in on a day, not switching tools.",
        ],
      },
      {
        type: "figure",
        media: {
          src: `${KLNDR}/compare.jpg`,
          alt: "A to-do list of six items beside the same tasks placed on a day timeline",
          ratio: 16 / 9,
        },
        caption:
          "The core idea in one frame: the same six tasks as a list, and as a day that either fits or does not.",
      },
      {
        type: "points",
        eyebrow: "Design goals",
        heading: "What the product had to do",
        items: [
          {
            title: "See the month, plan one day",
            body: "The calendar and the timeline should feel like one thing at two zoom levels.",
          },
          {
            title: "Make time tangible",
            body: "Blocks have length, so a packed day looks packed before you commit to it.",
          },
          {
            title: "Cut the cost of planning",
            body: "Repeat activities should be one drag away, not retyped every day.",
          },
          {
            title: "Work with mouse, keyboard and touch",
            body: "Dragging is the headline, but it cannot be the only way to move a block.",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: `${KLNDR}/planner.jpg`,
          alt: "klndr day view with an activity library on the left and a quarter-hour timeline with a live now-line on the right",
          ratio: 16 / 9,
        },
        caption:
          "Day view: activity library on the left, a quarter-hour timeline with a live now-line on the right, routines along the top.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Five decisions that shaped the product",
        items: [
          {
            title: "A month view that shows blocks, not dots",
            why: "Each date lists its blocks with start times, and busy days show an overflow count. You can spot packed and open days at a glance, then jump into any of them.",
          },
          {
            title: "Quarter-hour snapping, with keyboard nudging",
            why: "Blocks move and resize in 15-minute steps. Finer is fiddly and coarser cannot model a real day. A focused block can also be nudged with the arrow keys, which makes the timeline usable without a mouse.",
          },
          {
            title:
              "Reusable activities with a colour, an emoji and a usual length",
            why: "Make an activity once, then drag it into any day. Colour and category give the timeline its rhythm, and the usual length means a new block lands at a sensible size.",
          },
          {
            title: "Routines are a checklist, not blocks",
            why: "Vitamins, water and a stretch are small and repeat daily. Keeping them in a row above the timeline stops them from cluttering the schedule while still being one tap to tick off.",
          },
          {
            title: "A phone layout designed for thumbs",
            why: "On a phone the sidebar becomes bottom sheets and blocks are placed with large tap targets, pressing and holding to move them. Dragging inside a scrolling timeline fights the scroll on touch screens, so it is not the primary gesture there.",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: `${KLNDR}/features.jpg`,
          alt: "klndr feature overview showing the month view, the activity editor, daily routines, notes and the phone layout",
          ratio: 16 / 9,
        },
        caption:
          "The supporting pieces: month view, activity editor, routines, a markdown note for every day and the phone layout.",
      },
      {
        type: "text",
        eyebrow: "Design and build together",
        heading: "Planning has to feel instant",
        body: [
          "An interaction like drag, snap and nudge lives or dies on feel, and feel is hard to specify in a static file. Building the timeline myself meant I could tune it in the browser until it behaved the way I had designed it.",
          "Accounts use Google sign-in and sync across devices, and there is a light and dark theme that follows the system or can be set by hand.",
        ],
      },
      {
        type: "next",
        eyebrow: "Next",
        heading: "What I would do next",
        items: [
          "Test the first plan: how long it takes a new user to place a first block, and where they hesitate.",
          "Explore recurring blocks so a weekly workout does not need to be placed every week.",
          "Review the timeline with a screen reader and refine the keyboard model.",
        ],
      },
    ],
  },
  {
    slug: "renewal-radar",
    title: "Renewal Radar",
    kind: "concept",
    year: "2026",
    tagline:
      "A renewals dashboard that sorts by the date that matters: when you must cancel, not when you are billed.",
    summary:
      "A B2B concept for finance and ops teams who lose money to forgotten software renewals. A dense table, a decision-focused detail panel and a small design system.",
    role: "Product design, UX, UI and design system",
    scope: ["B2B SaaS", "Data-dense UI", "Design system", "Desktop"],
    platform: "Desktop web",
    tools: ["React", "Tailwind CSS", "Screens built in code"],
    links: [],
    tone: "#e8e8f4",
    cover: { type: "mock", id: "radar-cover" },
    seoDescription:
      "Concept case study: a B2B software renewals dashboard with a deadline-first table, a detail panel with evidence-backed recommendations and a small design system.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "The date that matters is the cancellation deadline.",
        body: [
          "Software subscriptions renew quietly. By the time a team notices an annual renewal, the notice window to cancel or downsize can already have closed. Renewal Radar is a concept dashboard for one question: what needs a decision this month, and by when?",
          "It is a self-initiated exercise in designing a dense, decision-focused B2B interface. The screens are built in code, and all names and numbers are made up.",
        ],
      },
      {
        type: "points",
        eyebrow: "Assumed users",
        heading: "Three people, three jobs",
        intro: "These are assumptions to validate, not research findings.",
        items: [
          {
            title: "Finance lead",
            body: "Needs to know what is renewing, what it costs and what can still be changed.",
          },
          {
            title: "Team owner",
            body: "Needs to say keep, reduce or cancel without learning a finance tool.",
          },
          {
            title: "Admin",
            body: "Needs to see who has access and which seats are actually used.",
          },
        ],
      },
      {
        type: "mock",
        id: "radar-dashboard",
        label: "The dashboard",
        caption:
          "A deadline-first table with a detail panel. Built as React components with sample data.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the design makes a stand",
        items: [
          {
            title: "Sort by the notice deadline, not the renewal date",
            why: "A subscription that renews in 60 days but must be cancelled in 5 is more urgent than one renewing tomorrow with no notice period. The deadline gets the status chip and the sort order.",
            tradeoff:
              "Two dates in one row can confuse. The renewal date stays as quiet secondary text.",
          },
          {
            title: "A side panel, not a new page",
            why: "Triage means looking at many items in a row. A panel keeps the list, the scroll position and the filters in place, so working through a queue is fast.",
            tradeoff:
              "It needs width. Below 1024 pixels the panel becomes a full-screen sheet.",
          },
          {
            title: "Recommendations that show their evidence",
            why: "Reduce seats from 60 to 40 is easy to ignore on its own. Next to 38 of 60 seats used and the last activity date, it can be accepted in one click.",
          },
          {
            title: "Bulk actions appear only on selection",
            why: "A permanent toolbar adds noise to a table people scan all day. Selecting rows reveals assign owner, set reminder and mark for cancel, and nothing else.",
          },
          {
            title: "The unhappy states are designed, not defaulted",
            why: "Empty, loading, error and no-permission states each have a layout, copy and a next step. These are the moments where trust is won or lost, so they are part of the product.",
          },
        ],
      },
      {
        type: "mock",
        id: "radar-states",
        label: "States",
        caption:
          "Empty, loading, error and no-permission states, each with a next step.",
      },
      {
        type: "mock",
        id: "radar-system",
        label: "Design system",
        caption:
          "A small token and component set. The screens above use these primitives directly, so the spacing and states are real.",
      },
      {
        type: "steps",
        eyebrow: "Validation plan",
        heading: "How I would test it",
        intro:
          "No users were involved in this concept, so there are no results here. This is the plan I would run.",
        items: [
          {
            title: "Task test with 5 finance or ops people",
            body: "Task: find what needs a decision this week and say what you would do. Success means they land on the deadline column without help.",
          },
          {
            title: "Recommendation test",
            body: "Show the seat recommendation with and without usage evidence. Compare how often people accept it and how confident they say they feel.",
          },
          {
            title: "Navigation check",
            body: "Ask people where they would look for a contract end date, an owner and a cost history. Fix labels that miss.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Constraints",
        heading: "What a real team would add",
        items: [
          "Getting data in is the hardest part. CSV import, accounting integrations and forwarded invoices each need their own design.",
          "Permissions and audit history need a proper model before any bulk action ships.",
          "Reminders need a delivery design: email, Slack or calendar, and who gets nudged.",
        ],
      },
    ],
  },
  {
    slug: "songrates",
    title: "Songrates",
    kind: "shipped",
    year: "2026",
    tagline: "Find a song, rate it, and build a shared catalog of opinions.",
    summary:
      "A music discovery app built on one loop: find something, then rate it. I designed the rating flow, the album pages and the profile levels, then built it.",
    role: "Product design, UX, UI and front-end build",
    scope: ["Product design", "UX", "UI", "Gamification"],
    platform: "Responsive web",
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Apple Music API",
    ],
    links: [
      { label: "Live product", href: "https://songrates.vercel.app" },
      { label: "Code", href: "https://github.com/mpittas/songrates" },
    ],
    tone: "#2a1414",
    cover: {
      type: "media",
      fit: "cover",
      media: {
        src: `${SONG}/cover-poster.jpg`,
        alt: "Songrates home page shown on a tilted screen",
        ratio: 16 / 9,
      },
    },
    video: { src: `${SONG}/cover.mp4`, poster: `${SONG}/cover-poster.jpg` },
    seoDescription:
      "Case study: designing Songrates, a music discovery app where people find songs and albums, rate them track by track and level up their profiles.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "One loop: find something, then rate it.",
        body: [
          "Songrates turns casual listening into a shared catalog of opinions, playlists and fully rated releases. The product is built around a single repeatable action, so every screen has to make the next rating one step away.",
          "Guests can rate straight away. Signing in keeps progress and unlocks profile perks.",
        ],
      },
      {
        type: "figure",
        media: {
          src: `${SONG}/home.jpg`,
          alt: "Songrates home page with a search field, a strip of album covers and a trending songs list with star buttons",
          ratio: 16 / 9,
        },
        caption:
          "Home: a search-first headline, a moving strip of album covers and a trending list where each row ends in a star.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Five decisions that shaped the product",
        items: [
          {
            title: "Search first, with the catalog in motion",
            why: "The home page asks one question, what are you rating, and gives a search field right under it. A moving strip of covers shows that the catalog is alive and gives browsers something to tap.",
          },
          {
            title: "One consistent control at the end of every row",
            why: "Songs, playlist tracks and album tracks all end in the same star button next to the public score. People learn the action once and find it everywhere.",
          },
          {
            title: "Track-by-track scoring on album pages",
            why: "The album header separates the public rating from your own, and each track below can be scored. Rating a whole album becomes a list of small, quick decisions.",
          },
          {
            title: "Levels unlocked by fully rated albums",
            why: "Profiles level up when albums are completed, not when ratings are tapped fast. That rewards finishing a listening session and keeps the catalog useful.",
          },
          {
            title: "Guests can rate before signing in",
            why: "The first rating should not sit behind a sign-up wall. Accounts become valuable once there is progress to keep.",
          },
        ],
      },
      {
        type: "figure",
        media: {
          src: `${SONG}/album.jpg`,
          alt: "Songrates album page with a public rating and your rating bar above a tracklist with a star on every row",
          ratio: 16 / 9,
        },
        caption:
          "Album page: the cover colour tints the page, a dark bar separates the public rating from yours, and the tracklist is ready to score.",
      },
      {
        type: "figure",
        media: {
          src: `${SONG}/playlist.jpg`,
          alt: "Songrates playlist page for the Apple Music Top 100 Global playlist",
          ratio: 16 / 9,
        },
        caption:
          "Playlists use the same page structure as albums, so the rating habit transfers.",
      },
      {
        type: "next",
        eyebrow: "Next",
        heading: "What I would do next",
        items: [
          "Test whether track-by-track scoring is quicker than rating the album as a whole.",
          "Design the empty state for new profiles so the first ten ratings feel guided.",
          "Prototype the planned 3D vinyl view and decide whether it adds meaning or only polish.",
        ],
      },
    ],
  },
  {
    slug: "handrail",
    title: "Handrail",
    kind: "concept",
    year: "2026",
    tagline:
      "Onboarding that gets a new team to its first real result in one session, without a product tour.",
    summary:
      "A concept for onboarding a self-serve analytics tool. I redefined activation around a first useful result, mapped the first session as a flow, and designed the states tours usually forget: empty workspaces, sample data and invited teammates.",
    role: "Product design, UX strategy and UX writing",
    scope: ["Onboarding", "Activation", "B2B SaaS", "UX writing"],
    platform: "Web app",
    tools: ["Flow mapping", "State matrix", "Written specs"],
    links: [],
    tone: "#f1e4cf",
    cover: { type: "type", mark: "1st" },
    seoDescription:
      "Concept case study: redesigning onboarding for a self-serve analytics tool around a first useful result, with an activation definition, a first-session flow, a state matrix and a validation plan.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading:
          "Most onboarding explains the product. New users want a result.",
        body: [
          "A typical onboarding is organised around the product's features: a welcome modal, a tour of the sidebar, a checklist that mirrors the navigation. A new user arrives with a different question: will this tell me something I did not know about my own product?",
          "Handrail is a concept for onboarding a self-serve product analytics tool for small teams. I picked analytics on purpose. First value depends on data that does not exist yet, so the empty state is the hardest problem, and it is where a design can do the most work.",
          "There is no real product, data or user behind this concept. It is a written design exercise: the reasoning, the flow, the states and the plan for testing it.",
        ],
      },
      {
        type: "points",
        eyebrow: "Design principles",
        heading: "Four rules for the first session",
        items: [
          {
            title: "Value before tour",
            body: "Nothing that explains the product comes before something that uses it.",
          },
          {
            title: "Real data first, sample data second",
            body: "Real data proves value. Sample data beats an empty screen, as long as it is always labelled.",
          },
          {
            title: "One next step at a time",
            body: "A checklist that shows five open tasks feels like homework. Show one, and the one after it.",
          },
          {
            title: "Invite with context",
            body: "Teammates join to look at something specific. Send them the result, not a generic invite.",
          },
        ],
      },
      {
        type: "table",
        eyebrow: "Activation",
        heading: "What counts as activated?",
        intro:
          "Onboarding design depends on the definition of success. These are the candidates I would compare, and why I would not pick the first two.",
        columns: ["Candidate", "Why it might work", "Risk"],
        rows: [
          [
            "Created an account",
            "Easy to count and available on day one.",
            "Measures sign-up, not value.",
          ],
          [
            "Connected a data source",
            "Required before anything else works.",
            "Setup is a means, not the goal. People can connect and still leave.",
          ],
          [
            "Saw a first chart from their own data",
            "The first moment the product answers a real question.",
            "Depends on data arriving quickly, so the design has to cover the wait.",
          ],
          [
            "Shared that chart with a teammate",
            "Signals the team will keep using it.",
            "Often lags the first session, so it is a retention signal, not the activation moment.",
          ],
        ],
      },
      {
        type: "text",
        eyebrow: "Hypothesis",
        heading: "The first chart is the moment to design for.",
        body: [
          "My working hypothesis is that activation is the first chart built from the team's own data, and that sharing it is the early sign of retention. Every decision below is judged by one question: does it shorten the path to that chart, or lengthen it?",
        ],
      },
      {
        type: "steps",
        eyebrow: "The flow",
        heading: "The first session, in five steps",
        intro:
          "Each step has one job and one primary action. Anything else is secondary or deferred.",
        items: [
          {
            title: "Ask one question",
            body: "What do you want to find out first? Four plain-language goals, such as where users drop off or which features get used. The answer picks the first chart.",
          },
          {
            title: "Choose a data path",
            body: "Connect real data, or explore with sample data. Both are one click, and neither is hidden behind the other.",
          },
          {
            title: "Show the first result",
            body: "As soon as events arrive, build the chart that answers the chosen goal and add a one-line insight underneath it.",
          },
          {
            title: "Make it theirs",
            body: "Name and save the chart, and add it to a dashboard that already exists. Saving is the first act of ownership.",
          },
          {
            title: "Bring a teammate",
            body: "Send the saved chart to someone, with the same filters applied. The invite carries the result, so the recipient lands on something worth opening.",
          },
        ],
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the design makes a stand",
        items: [
          {
            title: "Ask one question, not five",
            why: "Role, team size, goal, tools and budget make a long form that feels like a sales call. One question is enough to choose a first chart. Everything else can be inferred or asked later, when it helps.",
            tradeoff:
              "Less segmentation data on day one. It can be collected progressively, once the person has seen value.",
          },
          {
            title: "Sample data is a path, clearly labelled",
            why: "Waiting for a data connection should not mean staring at nothing. Sample data lets people explore while setup finishes. A banner on every chart says they are looking at sample data, so nobody mistakes it for their own numbers.",
            tradeoff:
              "Some people will stay in sample data. The banner always offers a one-click way to connect real data.",
          },
          {
            title: "A checklist that disappears, instead of a tour",
            why: "A tour interrupts the task to describe it. A single-item checklist keeps the task in front of the person and goes away when it is done. It never returns as a banner.",
          },
          {
            title: "Make the wait visible",
            why: "Connecting a source can take minutes. The screen shows how many events have arrived and a rough estimate, and lets the person leave and get an email when the first chart is ready. Progress that is honest feels shorter than a spinner.",
          },
          {
            title: "Invite with the result attached",
            why: "A generic invite asks the recipient to trust a stranger's tool. An invite that contains the chart, with a line saying what it shows, gives them a reason to click.",
          },
        ],
      },
      {
        type: "table",
        eyebrow: "States",
        heading: "The states a tour forgets",
        intro:
          "A flow is only as good as its worst state. These are the ones I would design before polishing the happy path.",
        columns: ["State", "What the person sees", "Next step"],
        rows: [
          [
            "Empty workspace",
            "The goal question and two data paths.",
            "Pick a goal.",
          ],
          [
            "Waiting for data",
            "Events received so far and an estimated time.",
            "Leave and get an email when ready.",
          ],
          [
            "Connection failed",
            "The plain reason and the one fix most likely to work.",
            "Retry, or ask a teammate for access.",
          ],
          [
            "Sample data on",
            "A banner on every chart that says it is sample data.",
            "Connect real data.",
          ],
          [
            "First result",
            "The chart with a one-line insight.",
            "Save it and share it.",
          ],
          [
            "Invited teammate lands",
            "The shared chart first, then a short introduction.",
            "Explore it, or ask a question in a comment.",
          ],
        ],
      },
      {
        type: "copy",
        eyebrow: "UX writing",
        heading: "Microcopy, before and after",
        pairs: [
          {
            before: "Welcome to Handrail! Take a quick tour.",
            after: "What do you want to find out first?",
            note: "Start with the person's goal, not the product's introduction.",
          },
          {
            before: "Setup incomplete (2 of 5)",
            after:
              "One step left before your first chart: connect a data source.",
            note: "Name the next step and what it unlocks.",
          },
          {
            before: "Error: invalid API key",
            after:
              "That key was not accepted. Check it was copied without spaces, or create a new one.",
            note: "Say what is likely wrong and what to try.",
          },
          {
            before: "Invite your team!",
            after:
              "Send this chart to Maya. She will see it with the same filters.",
            note: "Make the invite about the work, not the tool.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Validation plan",
        heading: "How I would test it",
        intro:
          "No users were involved in this concept, so there are no results here. This is the plan I would run.",
        items: [
          {
            title: "Task test with 6 to 8 small-team product people",
            body: "Task: get to a first chart from your own data. Measure time to first chart and where people hesitate, and ask what they thought the product was for.",
          },
          {
            title: "Five-second test of the goal question",
            body: "Show the goal screen for five seconds and ask what it is asking. If people cannot say, the wording is wrong.",
          },
          {
            title: "Checklist against tour",
            body: "Run both in a prototype. Compare completion of the first chart and what people remember about the product afterwards.",
          },
          {
            title: "Instrument the flow",
            body: "Track goal chosen, data path chosen, first event received, first chart viewed, chart saved and teammate invited, so every drop-off has a name.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Constraints",
        heading: "What a real team would add",
        items: [
          "Every data connector has its own failure modes and needs its own error copy.",
          "Invites touch permissions and billing, so they need review with the people who own both.",
          "Sample data has to be believable for each goal, which is a content job as much as a design one.",
        ],
      },
    ],
  },
  {
    slug: "open-checkout",
    title: "Open Checkout",
    kind: "concept",
    year: "2026",
    tagline:
      "A checkout that works with a keyboard, a screen reader and a bad connection, and is easier for everyone else too.",
    summary:
      "A concept accessibility project: how I would audit and redesign a typical e-commerce checkout against WCAG 2.2 AA. The audit method, the checkout moments that most often break, form and error patterns, and how to keep it accessible after launch.",
    role: "Product design, accessibility and UX writing",
    scope: ["Accessibility", "WCAG 2.2", "E-commerce", "Forms"],
    platform: "Responsive web",
    tools: ["WCAG 2.2", "Keyboard and screen reader testing", "Written specs"],
    links: [],
    tone: "#dbe7f3",
    cover: { type: "type", mark: "AA" },
    seoDescription:
      "Concept case study: auditing and redesigning an e-commerce checkout against WCAG 2.2 AA, with an audit method, critical checkout moments, form and error patterns and a plan to keep it accessible.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "Checkout is where accessibility stops being optional.",
        body: [
          "A checkout is a long form with money attached. It has timeouts, validation, address and payment fields, order summaries that stick to the screen, and a third-party payment step. Every one of those is a place where a keyboard user, a screen reader user, or someone on a small screen with large text can get stuck, and where a stuck customer is a lost sale.",
          "Open Checkout is a concept for how I would audit and redesign a typical e-commerce checkout against WCAG 2.2 level AA. It is not an audit of a real site. It is the method, the patterns and the priorities I would bring to one.",
          "I build interfaces in React and have worked from design files that missed states and focus order, so I care about the places where design and implementation meet. Accessibility is mostly that.",
        ],
      },
      {
        type: "points",
        eyebrow: "Design principles",
        heading: "Four rules for an accessible checkout",
        items: [
          {
            title: "Native first",
            body: "Real labels, buttons, inputs and fieldsets before any custom widget. ARIA only where HTML cannot say it.",
          },
          {
            title: "Errors that help",
            body: "Say what went wrong, where, and how to fix it, in text, at the field and in a summary.",
          },
          {
            title: "Never ask twice",
            body: "Do not make people re-enter what they already gave. Offer billing as the same as shipping.",
          },
          {
            title: "Nothing hides the focus",
            body: "Sticky headers, order summaries and cookie banners must not cover the focused control.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Audit method",
        heading: "How I would audit it",
        intro:
          "Automated tools catch the obvious. They do not tell you whether a person can finish a purchase. I would layer the methods.",
        items: [
          {
            title: "Automated scan",
            body: "Run an automated checker such as axe in CI and in the browser. It finds missing labels, contrast failures and invalid ARIA quickly. It cannot judge focus order, wording or flow.",
          },
          {
            title: "Keyboard-only purchase",
            body: "Complete the entire purchase with the keyboard alone. Check that every control is reachable, the order is logical, focus is always visible and nothing traps it.",
          },
          {
            title: "Screen reader pass",
            body: "Repeat with a screen reader on a desktop and a phone. Listen for labels, error announcements, changes in the order summary and the status of the payment step.",
          },
          {
            title: "Zoom and text spacing",
            body: "Test at 400 percent zoom and with increased text spacing. Content should reflow without horizontal scrolling or overlapping text.",
          },
          {
            title: "Cognitive review",
            body: "Look for time limits, jargon, hidden fees, unclear errors and steps that cannot be reversed. These rarely fail a checker and often decide whether someone finishes.",
          },
          {
            title: "Test with disabled customers",
            body: "Nothing replaces watching real people try. I would recruit keyboard, screen reader and low vision users and ask them to complete a real task.",
          },
        ],
      },
      {
        type: "table",
        eyebrow: "The risky moments",
        heading: "What I check, and why checkout is risky",
        intro:
          "WCAG 2.2 AA has criteria that matter a lot in checkout, including several that are new in 2.2. These are the ones I would look at first.",
        columns: [
          "Criterion",
          "Where it bites in checkout",
          "What good looks like",
        ],
        rows: [
          [
            "1.3.5 Identify Input Purpose",
            "Name, address, email and card fields.",
            "Correct autocomplete tokens so browsers and assistive tools can fill them.",
          ],
          [
            "2.4.11 Focus Not Obscured (Minimum)",
            "Sticky order summaries, headers and cookie banners.",
            "The focused control is never fully hidden behind sticky content.",
          ],
          [
            "2.5.8 Target Size (Minimum)",
            "Quantity steppers, remove buttons and small links.",
            "Targets at least 24 by 24 CSS pixels, or enough spacing around them.",
          ],
          [
            "3.3.1 and 3.3.3 Error Identification and Suggestion",
            "Address, postcode and card validation.",
            "Errors in text at the field, with a suggestion, and a summary that takes focus.",
          ],
          [
            "3.3.4 Error Prevention",
            "Placing the order.",
            "A review step before payment, and a way to correct mistakes.",
          ],
          [
            "3.3.7 Redundant Entry",
            "Billing address repeating shipping.",
            "Information entered once is reused or selectable.",
          ],
          [
            "3.3.8 Accessible Authentication (Minimum)",
            "Account login and card verification.",
            "No cognitive tests such as memorising or transcribing. Allow password managers and paste.",
          ],
          [
            "4.1.3 Status Messages",
            "Coupon applied, totals changed, payment processing.",
            "Changes announced to screen readers without moving focus.",
          ],
        ],
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the design makes a stand",
        items: [
          {
            title: "One column, one clear step at a time on small screens",
            why: "A single column with a visible step label, such as Step 2 of 4: Delivery, reduces scanning and works at high zoom. On wide screens the order summary sits beside the form.",
            tradeoff:
              "More steps on mobile. Each step is short, and progress is always visible and reversible.",
          },
          {
            title: "Labels above fields, never placeholders as labels",
            why: "A placeholder disappears as soon as someone types, fails contrast and is not a reliable name for assistive tools. A visible label stays put and gives a larger target.",
          },
          {
            title: "Errors at the field and in a summary",
            why: "On submit, focus moves to a summary that lists each problem as a link to its field. Each field then shows its own message in text, with an icon, not only a red border. Fixing one error removes it from both places.",
            tradeoff:
              "Two places for the same message. They stay in sync from one source of truth.",
          },
          {
            title: "A sticky summary that respects focus",
            why: "A pinned order summary helps people keep their total in view, but it can cover the control they are on. It collapses on small screens and uses scroll padding so focused fields are never hidden.",
          },
          {
            title: "A review step before payment",
            why: "Showing the order, address, delivery and total once more, with edit links, prevents costly mistakes and satisfies error prevention. It also gives screen reader users one place to check everything.",
          },
          {
            title: "Payment that does not rely on memory tests",
            why: "Support autofill, wallets and password managers, and avoid image puzzles. If the bank requires a verification step, explain it in advance and offer another route.",
          },
        ],
      },
      {
        type: "snippet",
        eyebrow: "Pattern",
        heading: "A field with an accessible error",
        intro:
          "A small example of the markup I would specify with the design, so the behaviour is part of the handoff.",
        language: "html",
        code: `<label for="postcode">Postcode</label>
<input
  id="postcode"
  name="postcode"
  autocomplete="postal-code"
  aria-invalid="true"
  aria-describedby="postcode-error"
/>
<p id="postcode-error">
  Enter your postcode, for example 1000.
</p>`,
        caption:
          "Visible label, autocomplete token, error linked to the input by id, and a message that says what to do.",
      },
      {
        type: "copy",
        eyebrow: "UX writing",
        heading: "Error messages, before and after",
        pairs: [
          {
            before: "Invalid input",
            after: "Enter your postcode, for example 1000.",
            note: "Say what to enter, with an example.",
          },
          {
            before: "Card declined",
            after:
              "Your bank declined the payment. Try another card, or pay by bank transfer.",
            note: "Name the cause if you know it and give a way forward.",
          },
          {
            before: "Required",
            after: "Enter your email so we can send your receipt.",
            note: "Give the reason, so the question feels fair.",
          },
          {
            before: "Session expired",
            after:
              "Your session timed out. Your basket is saved, so you can sign in and continue.",
            note: "Reassure first, then tell people what to do.",
          },
        ],
      },
      {
        type: "points",
        eyebrow: "Prioritising",
        heading: "How I would rank what the audit finds",
        intro:
          "An audit produces a long list. A ranking turns it into a plan teams can act on.",
        items: [
          {
            title: "Blockers",
            body: "A person cannot complete a purchase. Fix first, usually inside the redesign.",
          },
          {
            title: "Major",
            body: "A purchase is possible but only with great effort or outside help. Fix in the next release.",
          },
          {
            title: "Minor",
            body: "Friction or inconsistency. Bundle into component work so it is fixed once, everywhere.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Validation plan",
        heading: "How I would test it",
        intro:
          "No customers were involved in this concept, so there are no results here. This is the plan I would run.",
        items: [
          {
            title: "Moderated sessions with assistive technology users",
            body: "Five to eight people who use keyboards, screen readers or magnification. Task: buy a product and change the delivery address. Success is completing it without help.",
          },
          {
            title: "Conformance check",
            body: "An independent review against WCAG 2.2 AA, with the findings ranked into blockers, major and minor.",
          },
          {
            title: "Regression tests",
            body: "Automated accessibility checks in the build and keyboard path tests for the checkout, so fixes do not quietly disappear.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Keeping it accessible",
        heading: "After launch",
        items: [
          "Add an accessibility line to every design review and to the definition of done.",
          "Put accessible patterns in the design system so each fix lands everywhere at once.",
          "Re-audit when the payment provider, cookie tool or theme changes, because third parties break things.",
        ],
      },
    ],
  },
  {
    slug: "common-ground",
    title: "Common Ground",
    kind: "concept",
    year: "2026",
    tagline:
      "A design system plan for three product teams that currently copy each other's buttons.",
    summary:
      "A concept for introducing a design system to a company with three products and no shared components: token architecture, a contribution model, a migration plan and how to measure adoption without forcing it.",
    role: "Design systems strategy and product design",
    scope: ["Design systems", "Tokens", "Governance", "Adoption"],
    platform: "Web products",
    tools: ["Design tokens", "Storybook", "Written specs"],
    links: [],
    tone: "#e6def3",
    cover: { type: "type", mark: "Aa" },
    seoDescription:
      "Concept case study: a design system plan for a company with three products, covering token architecture, contribution model, migration phases and adoption measures.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "Three products, three versions of the same button.",
        body: [
          "Picture a company with three web products built by three teams. Each has its own buttons, form fields and tables, copied from one another and drifting apart. A change to a brand colour is three tickets. An accessibility fix is three fixes. A new designer learns three sets of rules.",
          "Common Ground is a concept for introducing a design system in that situation. It is a plan, not a library: how to decide what to build first, how the pieces fit together, who is allowed to change them and how to know it is working.",
          "I have seen both sides. As a developer I customised MUI and Ant Design components to match product designs. As a designer I handed interfaces to engineers who then had to interpret them. A good system makes that handoff boring.",
        ],
      },
      {
        type: "points",
        eyebrow: "Goals",
        heading: "What the system is for",
        items: [
          {
            title: "Consistency",
            body: "A person moving between products should recognise how things work.",
          },
          {
            title: "Speed",
            body: "A new screen should start from components, not from blank frames.",
          },
          {
            title: "Accessibility by default",
            body: "Keyboard behaviour, focus and contrast solved once, in the component.",
          },
          {
            title: "A shared language",
            body: "Designers and developers use the same names for the same things.",
          },
        ],
      },
      {
        type: "table",
        eyebrow: "Token architecture",
        heading: "Three layers, with one rule each",
        intro:
          "Tokens are the foundation, so the structure matters more than any single value.",
        columns: ["Layer", "Example", "Rule"],
        rows: [
          [
            "Primitive",
            "color.blue.600",
            "Raw values. Never used directly in a component.",
          ],
          [
            "Semantic",
            "color.action.primary",
            "Names the purpose. Components use these, and themes remap them.",
          ],
          [
            "Component",
            "button.primary.background",
            "Only when a component needs to differ from the semantic default.",
          ],
        ],
      },
      {
        type: "snippet",
        eyebrow: "Tokens",
        heading: "What it looks like in code",
        intro:
          "Tokens are stored in a tool-neutral format so design tools, documentation and code all read from one source.",
        language: "json",
        code: `{
  "color": {
    "blue": {
      "600": { "$value": "#2F5BEA", "$type": "color" }
    },
    "action": {
      "primary": { "$value": "{color.blue.600}", "$type": "color" }
    }
  },
  "button": {
    "primary": {
      "background": { "$value": "{color.action.primary}", "$type": "color" }
    }
  }
}`,
        caption:
          "Each layer references the one below it, so changing a primitive updates everything that depends on it. Values are illustrative.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the plan makes a stand",
        items: [
          {
            title: "Start from an audit of what teams already copy",
            why: "A system built from a blank page tends to solve problems nobody has. Listing the components that appear in all three products shows what to build first and gives teams something recognisable.",
            tradeoff:
              "The first release will look unambitious. It earns trust by replacing real duplicates.",
          },
          {
            title: "Tokens before components",
            why: "Colour, type, spacing and radius decisions underpin everything. Settling them first lets each team adopt the foundations without touching a single component.",
          },
          {
            title: "Accessibility is part of the definition of done",
            why: "A component is not finished until it has documented keyboard behaviour, a focus style, correct roles and checked contrast. Teams inherit that work for free.",
          },
          {
            title: "A contribution model, not a gate",
            why: "Any team can propose a change. A small core group reviews it against a published checklist, with a target response time. This keeps the system alive without making the core team a bottleneck.",
            tradeoff:
              "Slower than letting every team fork. That cost is the price of staying consistent.",
          },
          {
            title: "Docs next to the code",
            why: "Usage guidance, do and do not examples, and the design spec live with the component in Storybook. Documentation that sits away from the code goes stale.",
          },
          {
            title: "Versioning and deprecation, planned from day one",
            why: "Semantic versions, a changelog and a deprecation window of a few releases let teams upgrade without fear. Where possible, ship a codemod with each breaking change.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Migration plan",
        heading: "Five phases, each with something to show",
        intro:
          "Adoption fails when it needs a big-bang rewrite. Each phase delivers value on its own.",
        items: [
          {
            title: "Inventory",
            body: "Catalogue every component and style across the three products. Group duplicates and note the variants that exist for a reason.",
          },
          {
            title: "Foundations",
            body: "Ship tokens for colour, type, spacing, radius and elevation, with light and dark themes. Teams can adopt these without changing a component.",
          },
          {
            title: "Core components",
            body: "Build the shared set first: button, input, select, checkbox, modal, tabs and table. Each ships with docs, accessibility notes and tests.",
          },
          {
            title: "Pilot",
            body: "Pick one team and one real feature. Build it with the system, record every friction point and fix them before anyone else migrates.",
          },
          {
            title: "Roll out and retire",
            body: "Migrate screen by screen. Deprecate the old components with a date, and track what remains.",
          },
        ],
      },
      {
        type: "points",
        eyebrow: "Governance",
        heading: "Four questions the system has to answer",
        items: [
          {
            title: "Who can add a component?",
            body: "Anyone can propose one. It is accepted when it appears in at least two products or fills a clear gap.",
          },
          {
            title: "How is a change reviewed?",
            body: "Against a checklist: need, accessibility, naming, documentation, tests and visual review.",
          },
          {
            title: "How do breaking changes ship?",
            body: "In a major version, with a changelog, a migration guide and a deprecation window.",
          },
          {
            title: "How do we know it works?",
            body: "Through the adoption and quality measures below, reviewed every quarter.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Measuring",
        heading: "What I would track, and how I would validate it",
        intro:
          "No team or product was involved in this concept, so there are no results here. These are the measures and tests I would use.",
        items: [
          {
            title: "Adoption",
            body: "The share of production UI built from system components, tracked per product.",
          },
          {
            title: "Speed",
            body: "How long a new screen takes from design to merged code, before and after the system, on comparable work.",
          },
          {
            title: "Quality",
            body: "Accessibility defects and visual inconsistencies reported per release.",
          },
          {
            title: "Friction",
            body: "The number of one-off overrides and requests for new variants. Many overrides mean the system does not fit the work.",
          },
          {
            title: "Interviews",
            body: "Short conversations with three designers and three developers after the pilot, asking what they would change first.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Constraints",
        heading: "What a real team would add",
        items: [
          "Teams on different frameworks need a plan for sharing tokens even when components differ.",
          "Someone has to own the system. Without a named team and time, it decays.",
          "Brand and marketing surfaces often need more freedom than product surfaces, so the system needs a clear line between them.",
        ],
      },
    ],
  },
  {
    slug: "sidekick",
    title: "Sidekick",
    kind: "concept",
    year: "2026",
    tagline:
      "An AI reply assistant for support agents that earns trust: it shows its sources, admits uncertainty and never sends on its own.",
    summary:
      "A concept for adding an AI drafting assistant to a customer support inbox. I designed the confidence, source, edit and handoff states, and defined what the assistant must never do.",
    role: "Product design, AI interaction design and UX writing",
    scope: ["AI product design", "Trust and safety", "B2B SaaS", "UX writing"],
    platform: "Web app",
    tools: ["Behaviour specs", "State matrix", "Written specs"],
    links: [],
    tone: "#f3dfe0",
    cover: { type: "type", mark: "AI" },
    seoDescription:
      "Concept case study: designing an AI reply assistant for support agents, with source citations, honest uncertainty, clear handoff rules, microcopy and an evaluation plan.",
    blocks: [
      {
        type: "text",
        eyebrow: "Overview",
        heading: "The hard part of an AI feature is the moment it is wrong.",
        body: [
          "Adding a model that drafts replies is easy to demo. Designing it so a support agent trusts it on a busy Monday is harder. Agents are accountable for what they send, so a tool that is confidently wrong is worse than no tool.",
          "Sidekick is a concept for an AI drafting assistant inside a customer support inbox. I focused on the parts that decide whether people use it: how it shows where an answer came from, how it says it does not know, what it refuses to do, and how an agent corrects it.",
          "There is no real model, product or data behind this concept. It is a design exercise, so the behaviour is specified and the evaluation is a plan.",
        ],
      },
      {
        type: "points",
        eyebrow: "Design principles",
        heading: "Five rules for an assistant people can trust",
        items: [
          {
            title: "A human sends, always",
            body: "The assistant drafts. An agent reads, edits and sends. Nothing leaves without a person.",
          },
          {
            title: "Show the sources",
            body: "Every claim points to the help article or policy it came from.",
          },
          {
            title: "Say when it does not know",
            body: "No guess is better than a confident wrong answer. The honest state is a first-class design.",
          },
          {
            title: "Cheap to correct",
            body: "Editing and flagging a draft should take one action, and the correction should matter.",
          },
          {
            title: "Fail quietly and safely",
            body: "If the assistant is down, the inbox keeps working exactly as before.",
          },
        ],
      },
      {
        type: "table",
        eyebrow: "States",
        heading: "What the assistant does in each situation",
        intro:
          "Designing the situations first keeps the interface honest. The happy path is one row of six.",
        columns: ["Situation", "What the agent sees", "Why"],
        rows: [
          [
            "Enough evidence",
            "A draft in the composer with two or three source chips, ready to edit.",
            "Speeds the common case while keeping the evidence visible.",
          ],
          [
            "Weak evidence",
            "No draft. A note that nothing close was found, with the nearest articles listed.",
            "A wrong draft costs more than a missing one.",
          ],
          [
            "Sensitive topic",
            "No draft. A prompt to route to a specialist, such as billing disputes or legal.",
            "Some replies should never start from a model.",
          ],
          [
            "Policy conflict",
            "A draft with an inline warning that it may contradict a policy, and a link to it.",
            "Surfaces the risk where the agent is already looking.",
          ],
          [
            "Different language",
            "A draft in the customer's language with a translation preview for the agent.",
            "Agents must be able to check what they send.",
          ],
          [
            "Assistant unavailable",
            "A quiet note. The inbox works as normal.",
            "The tool must never block the work it is meant to speed up.",
          ],
        ],
      },
      {
        type: "snippet",
        eyebrow: "Behaviour spec",
        heading: "The rules, written down",
        intro:
          "A short decision spec like this is part of the design. It lets product, engineering and support review behaviour without reading code.",
        language: "text",
        code: `IF no sources found
   -> show related articles, no draft

IF topic is sensitive (billing dispute, legal, safety)
   -> route to specialist, no draft

IF sources found AND confidence is low
   -> show draft labelled "Needs review", sources visible

IF draft conflicts with a published policy
   -> show draft with inline warning and policy link

ELSE
   -> show draft with sources

NEVER send without an agent action`,
        caption:
          "Thresholds and the sensitive topic list would be set with the support team and revisited as real tickets are reviewed.",
      },
      {
        type: "decisions",
        eyebrow: "Key decisions",
        heading: "Where the design makes a stand",
        items: [
          {
            title: "Drafts appear in the composer as a suggestion",
            why: "The draft sits where the agent already writes, so editing is the default action. It is visibly marked as a draft and never fills in silently.",
            tradeoff:
              "One extra look at the draft before sending. That is the point.",
          },
          {
            title: "Sources are chips that open the exact passage",
            why: "A link to a whole article makes checking slow, so agents stop checking. A chip that opens the specific paragraph keeps verification to a glance.",
          },
          {
            title: "Confidence in words and actions, not a percentage",
            why: "A number like 0.62 suggests precision it does not have, and agents cannot act on it. Labels such as Needs review change what the interface offers, which is what an agent needs.",
          },
          {
            title: "Corrections that count",
            why: "Beside each draft, agents can mark it as good or flag what was wrong from three reasons: wrong fact, wrong tone or missing detail. The reasons feed review of the knowledge base as well as the model.",
            tradeoff:
              "Feedback takes effort, so it is one tap with an optional reason, never a form.",
          },
          {
            title: "A visible boundary",
            why: "A short list of what the assistant will not draft, available from the composer, sets expectations. People trust a tool more when they know where it stops.",
          },
        ],
      },
      {
        type: "copy",
        eyebrow: "UX writing",
        heading: "Microcopy, before and after",
        intro:
          "With AI features the words carry the trust. These are the first rewrites I would test.",
        pairs: [
          {
            before: "AI-generated response",
            after: "Draft from 3 help articles. Check it before sending.",
            note: "Say where it came from and what the agent should do.",
          },
          {
            before: "Confidence: 0.62",
            after:
              "I am not sure about this one. Here are the closest articles.",
            note: "Replace a score with honest language and a next step.",
          },
          {
            before: "Something went wrong",
            after:
              "The assistant is unavailable. You can keep replying as usual.",
            note: "Reassure first, then say what still works.",
          },
          {
            before: "Regenerate",
            after: "Try a shorter version",
            note: "Offer the specific change people actually want.",
          },
        ],
      },
      {
        type: "steps",
        eyebrow: "Evaluation plan",
        heading: "How I would test it",
        intro:
          "No model, agents or customers were involved in this concept, so there are no results here. This is the plan I would run.",
        items: [
          {
            title: "Offline review set",
            body: "Collect past tickets and have experienced agents grade drafts for accuracy, tone and policy fit. Use it to set thresholds before anyone sees the tool.",
          },
          {
            title: "Shadow mode",
            body: "Generate drafts in the background without showing them. Compare them with what agents actually sent to find gaps safely.",
          },
          {
            title: "Small live pilot",
            body: "Release to a few agents. Track acceptance rate, how much drafts are edited, time to first reply and customer satisfaction, and read the flagged drafts every week.",
          },
          {
            title: "Red-team the boundaries",
            body: "Try to make it draft sensitive topics, contradict policy or reveal internal notes. Fix what leaks and add it to the test set.",
          },
        ],
      },
      {
        type: "next",
        eyebrow: "Constraints",
        heading: "What a real team would add",
        items: [
          "Privacy and retention rules decide what customer data the assistant may see and store.",
          "Streaming text needs a careful screen reader design so it is announced politely and not on every word.",
          "Cost per draft, languages supported and model updates all change behaviour, so the evaluation set needs to be run again after each change.",
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    index,
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
