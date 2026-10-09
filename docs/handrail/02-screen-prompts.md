# Handrail: screen prompts (send one at a time, in the same Claude Design project)

Use the Handrail design system for every prompt. After each screen: check it, ask for one change at a time, then move on.

## Screen 2: Waiting for data

```text
Design screen 2 of 6 for Handrail: Waiting for data. Same project, same style as the empty workspace screen.

Context: the user chose the goal "Where users drop off" and connected a real data source. Events are starting to arrive, but the first chart is not ready.

Show:
- The step indicator: "Step 2 of 3".
- A heading: "Building your first chart".
- A line showing the chosen goal: "Goal: where users drop off".
- A calm progress area with a live count: "214 events received so far", and an honest estimate: "About 4 minutes left".
- A thin progress bar, not a spinner.
- A secondary action: "Leave and email me when it's ready".
- A small note: "You can close this tab. We'll keep collecting."

Rules: no tour, no tips carousel, no marketing text. One primary reassurance, one secondary action. Use only this copy.
```

## Screen 3: First result

```text
Design screen 3 of 6 for Handrail: First result. Same project and style.

Context: the first chart is ready, built from the team's own data, for the goal "Where users drop off".

Show:
- The step indicator: "Step 3 of 3".
- A heading: "Here is your first chart".
- A large chart card: a funnel or step-by-step drop-off chart across 4 steps (Visited, Signed up, Created a project, Invited a teammate), with realistic numbers, using the accent colour plus greys.
- A one-line insight directly under the chart: "Most people leave between sign-up and creating a project."
- A primary button: "Save this chart" and a secondary button: "Send to a teammate".

Rules: no tour, no extra widgets, no sidebar. The chart and the insight are the focus. One primary action.
```

## Screen 4: Sample data on

```text
Design screen 4 of 6 for Handrail: Sample data on. Same project and style.

Context: the user chose "Explore with sample data". They are looking at the same kind of chart as the first-result screen, but the numbers are not theirs.

Show:
- A clear info banner across the top of the chart area: "You are looking at sample data." with a button "Connect your data".
- The drop-off chart card below it, with a small "Sample" label on the chart itself.
- The same one-line insight style under the chart, written for sample data: "In this sample, most people leave between sign-up and creating a project."

Rules: the banner must be impossible to miss and impossible to mistake for real data. One primary action: "Connect your data".
```

## Screen 5: Connection failed

```text
Design screen 5 of 6 for Handrail: Connection failed. Same project and style.

Context: the user tried to connect a real data source with an API key and it was rejected.

Show:
- The step indicator: "Step 2 of 3".
- An error banner (use the error style, calm not alarming): "That key was not accepted. Check it was copied without spaces, or create a new one."
- The API key input field with the error state, and a button "Try again".
- A secondary link: "Ask a teammate for access".
- A small link: "Explore with sample data instead".

Rules: say what is likely wrong and what to try. No error codes, no blame, no long help text.
```

## Screen 6: Invited teammate lands

```text
Design screen 6 of 6 for Handrail: Invited teammate lands. Same project and style.

Context: a teammate named Maya was sent a saved chart. She opens the link. She has never used Handrail.

Show:
- A small top note: "Alex shared a chart with you".
- The drop-off chart first, large, with the same filters applied and the one-line insight under it.
- A short introduction below the chart in a quiet card: "Handrail shows how people move through your product. You can explore this chart or ask a question."
- A primary button: "Explore this chart" and a secondary button: "Leave a comment".

Rules: the shared chart comes first, the introduction second. No sign-up wall before she sees the chart.
```

## Clickable prototype (after all six screens look right)

```text
Create one clickable prototype of the Handrail happy path using the screens already in this project: Empty workspace, then Waiting for data, then First result. Add working interactions: choosing a goal card selects it, "Connect real data" moves to Waiting for data, the waiting screen advances to the First result after a short delay, and "Send to a teammate" opens a small invite preview that reads "Send this chart to Maya. She will see it with the same filters." Keep the same visual style and copy.
```
