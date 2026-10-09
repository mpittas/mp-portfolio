# Handrail: design brief (paste this into Claude Design)

## Product
Handrail is a concept self-serve product analytics tool for small teams (think 5 to 30 people). This brief covers only onboarding: the first session of a new workspace.

## Goal
Get a new team to its first useful chart from their own data in one session, without a product tour.

## Activation definition
Activated = saw a first chart built from the team's own data.
Sharing that chart with a teammate is an early retention signal, not the activation moment.

## Design principles
1. Value before tour: nothing that explains the product comes before something that uses it.
2. Real data first, sample data second: sample data beats an empty screen, as long as it is always labelled.
3. One next step at a time: show one task, then the one after it. Never a list of five open tasks.
4. Invite with context: send teammates the result, not a generic invite.

## The first session, in five steps
1. Ask one question: "What do you want to find out first?" Four plain-language goals (for example: where users drop off, which features get used). The answer picks the first chart.
2. Choose a data path: "Connect real data" or "Explore with sample data". Both are one click and neither is hidden.
3. Show the first result: as soon as events arrive, build the chart for the chosen goal with a one-line insight underneath.
4. Make it theirs: name and save the chart, add it to a dashboard.
5. Bring a teammate: send the saved chart with the same filters applied.

## The six states to design
| # | State | What the person sees | Next step |
|---|-------|----------------------|-----------|
| 1 | Empty workspace | The goal question and two data paths | Pick a goal |
| 2 | Waiting for data | Events received so far and an estimated time | Leave and get an email when ready |
| 3 | First result | The chart with a one-line insight | Save it and share it |
| 4 | Sample data on | A banner on every chart that says it is sample data | Connect real data |
| 5 | Connection failed | The plain reason and the one fix most likely to work | Retry, or ask a teammate for access |
| 6 | Invited teammate lands | The shared chart first, then a short introduction | Explore it, or comment |

## Microcopy to use exactly
- Goal question: "What do you want to find out first?"
- Next-step hint: "One step left before your first chart: connect a data source."
- Connection error: "That key was not accepted. Check it was copied without spaces, or create a new one."
- Invite: "Send this chart to Maya. She will see it with the same filters."
- Sample data banner: "You are looking at sample data." with a button "Connect your data".

## Visual direction (starting point, change if you like)
Calm, neutral SaaS. Light theme, near-white background, one accent colour (a deep blue), dark grey text. One typeface (Inter or similar). 8px spacing scale, 8px corner radius, thin borders instead of shadows. Charts use one accent plus greys. Desktop 1440px wide.

## Rules for every screen
- One primary action per screen.
- No sidebar tour, no welcome modal, no multi-task checklist.
- Use the exact copy above. Do not invent extra marketing text.
- Keep it honest: this is a concept with sample numbers only.
