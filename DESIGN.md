# Fluorite Design specification

## Layout

- One primary task and confirmation per page; navigation supports content and actions.
- Use lists for continuous data and cards for independent content. Avoid nested borders.
- Reuse components and tokens for the same role; prefer established libraries and platform APIs.
- Use a 4-unit grid with spacing of 8/12/16/24/32 and shared alignment guides.
- Reflow or collapse responsively; never scale down the whole page. Long text, translations and values must not crowd actions.
- Keep the overview focused on entry points. Place interaction and motion examples with their components.

## Theme

Light and dark themes share structure and use neutral grayscale backgrounds. Each is complete; do not mix large light and dark panels.

| Token | Light | Dark |
| --- | --- | --- |
| paper | #EFEFEF | #111111 |
| surface | #FAFAFA | #1C1C1C |
| field | #FFFFFF | #252525 |
| ink | #202020 | #EFEFEF |
| muted | #626262 | #B0B0B0 |
| grid | #D4D4D4 | #393939 |
| edge | #888888 | #747474 |
| primary | #FFD429 | #FFD429 |
| onPrimary | #161616 | #161616 |
| accentBlue | #2E6485 | #89B8D8 |
| positive | #237A53 | #72C59A |
| accentRose | #AD2E68 | #E47FAA |
| warning | #865312 | #D6A968 |
| danger | #B7403B | #F18D83 |

Yellow: primary confirmation, thin selection outlines and enabled controls. Blue: important entry points or notices. Green: verified positive status. Rose: emphasis or series distinction. Apply color by meaning, never by data source or decoration quota. Pair status colors with text or shapes.

Contrast: ≥4.5:1 for normal text; ≥3:1 for large text, essential control boundaries and focus. Use `grid` only for subtle dividers.

## Typography and icons

- UI text: ChillDINGothic. Numbers and code: IBM Plex Mono. Use licensed fonts and actual weights; no synthetic bold.
- Size values by hierarchy and baseline-align units. Keep technical IDs in details. Use numbering, bilingual labels and scales only when informative.
- Organize icons by shape name and category; keep entity mappings separate. Prefer a consistent icon library.
- Source grid: 24×24; stroke: 1.8–2. Display sizes: 20/24/28/32, independent of container size. Reclaim space when icons or units are absent.
- Give icon actions accessible names. Touch interfaces must not depend on tooltips.

## Dimensions and controls

Adapt logical dimensions to platform density.

| Element | Default |
| --- | --- |
| Button / icon action | Height 48, icon 24; touch target ≥48×48 |
| Primary action | Width 160–192; adjust for translation |
| Cancel | 96×48; no fill or border |
| Compact desktop control | Height 36–40 |
| List row | Height 56–80 |
| Dialog heading / close | Height 48 / target 48×48 |
| Structural line | 1; pixel-aligned |
| Body / supporting text | 16–20 / 14–16 |

- Buttons are complete rectangles with zero radius and no cut corners. Primary: yellow; secondary: neutral; cancel: quiet.
- Cover default, hover, pressed, focus, selected, disabled, pending and failed states. Define focus separately from selection.
- Switches: theme color when on; track 64×36, thumb 24, inset 6.
- Checkboxes use an internal X and retain checkbox semantics. Separate selection and detail targets.
- Radio options are mutually exclusive. Inputs require labels; placeholders do not replace them.
- Size selectors show grid icons only, with equal-sized squares. Accessible names describe dimensions.

## Selection and configuration

- Complete simple tasks in place. Complex creation uses a shared draft; editing opens the existing configuration directly.
- Adding preserves existing content; editing changes only the current item. Confirm deletion.
- Fix headings, toolbars and footers. Categories and results scroll and clip independently; highlights stay within bounds.
- Preserve selection across search, filters and sources. Support review, removal and ordering; counts include hidden selections.
- Back preserves the draft; cancel discards it; confirmation persists it. Use “Close” to leave immediate settings.
- Show compatible settings only. Group complex parameters or use tabs. Preview beside content on wide screens, above or below it on narrow screens.
- Reuse production components for live previews. Previewing, editing and filtering must not trigger business writes.

## Data and feedback

- Use confirmed units and conversions. Distinguish raw, missing, unavailable, stale and unverified values. Show “—” for missing data, never 0.
- Handle time zones and unknown timestamps correctly. Use direct relative time, such as “12 seconds ago”, without redundant prefixes.
- Downsampling preserves density, trends and extrema. Leave gaps for disconnections. Align extrema backgrounds with curve coordinates; never invent trends or thresholds.
- Separate current and target values. Request acceptance is not success. Prevent duplicate requests at every entry point while pending; support recovery and optimistic rollback.
- Label sample sources. Do not present samples as live data or persist them as user data.

## Decoration and motion

- Use grids, thin lines, dots and local corner marks. Avoid meaningless texture, glass effects, large gradients and neon. Overlays may use subtle shadows.
- Diagonal stripes have edge-band and full-surface variants. Full-surface stripes cover the component and loop seamlessly from left to right.
- Use full-surface stripes only for notices, states, pending feedback or actions that need attention. Ordinary buttons have none by default; remove them when attention is no longer required.
- Dashboard cards may use blue marks at all four corners: 20×20, arm width 2. Keep them consistent, outside content and independent of status.
- Press: 120 ms; switch: 180 ms; enter: 240 ms; exit: 120 ms. Use gentle ease-out, displacement 2–8 and subtle overlay scaling.
- Animate expansion height and preview entry gently. Do not flash data or delay input and dragging.
- Respect reduced motion and pause loops in the background. Fall back to static stripes. Do not create looping motion in Figma.

## Accessibility and delivery

- Support main flows by keyboard with visible focus. Overlays manage focus and Escape/back; restore focus on close.
- Support font scaling and platform input. Keep language resources separate and debugging instructions out of the UI.
- Keep Figma text, vectors, components and variables editable. Separate foundations, components and page examples into Pages; keep experiments and archives separate.
- Keep Figma, Web and rules aligned. Validate new directions on representative pages before extending them to all states.
- Record platform adaptations in the host DESIGN.md. Validate delivery against [REVIEW.md](REVIEW.md).
