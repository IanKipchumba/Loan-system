# Design Directions — Loan System Verification Dashboard

## Three possible approaches

### 1. Incident Ledger

**Very Brief Intro:** A forensic, editorial audit interface that feels like an operations report spread across a dark graphite workbench. Strong crimson evidence markers and quiet mint verification signals turn raw checks into a readable remediation narrative.

**Probability:** 0.07

### 2. Compliance Studio

**Very Brief Intro:** A warm, document-led assurance portal with ivory paper surfaces, ink-blue typography, and subtle binder-tab navigation. The experience feels composed for an executive review rather than a developer console.

**Probability:** 0.03

### 3. Signal Cabinet

**Very Brief Intro:** A light architectural dashboard built from olive-grey panels, finely ruled lines, and compact typographic labels. It presents technical risk as a controlled inventory of signals and decisions.

**Probability:** 0.09

## Chosen direction: Incident Ledger

### Design Movement

**Forensic editorial design** meets the information density of a security operations console. The page should resemble a meticulously prepared incident ledger: evidence is not decorative, priority is visually explicit, and every interaction helps the visitor move from observation to action.

### Core Principles

1. **Evidence before decoration:** Every visual element must clarify verification state, error severity, or the path to remediation.
2. **Controlled contrast:** Graphite surfaces establish calm focus; bone-white editorial panels are reserved for detailed evidence; crimson is used only to flag urgent risk.
3. **Deliberate asymmetry:** A persistent left rail anchors navigation and identity, while the main workspace unfolds in differently sized report modules rather than a generic equal-card grid.
4. **Layered reading:** The dashboard must scan in three passes—overall health at a glance, flagged issues by priority, then detailed file-level proof.

### Color Philosophy

The interface begins with almost-black graphite to suggest a focused review room, not a generic “dark dashboard.” Ink blue provides structural depth, bone-white document panels create moments of legibility, and signal crimson delivers urgency with discipline. A precise acid-lime verification green indicates a confirmed pass; muted sand and slate carry secondary information without competing for attention.

### Layout Paradigm

The site uses a **fixed evidence rail** on desktop and a report canvas that reads like an inspection dossier. The summary is an offset header with a large risk total and a stacked verification strip. Detailed findings sit in a vertical “case file” sequence: severity stamp, diagnosis, evidence, and a suggested correction. On small screens, the rail compresses into an information header and the case files become a single-column narrative.

### Signature Elements

1. **Severity stamps:** Small, square-edged labels with a colored vertical rule, a risk code, and a status glyph.
2. **Ledger rules:** Fine dotted and solid dividers, used like accounting lines to visually connect evidence and outcomes.
3. **Evidence slips:** Bone-white code excerpts with a tiny file/line header and an angled crimson corner marker for invalid source.

### Interaction Philosophy

Interactions should feel like opening a case file. Navigation anchors scroll smoothly to the relevant section; expanding a finding reveals evidence and recommended action. Hovering a priority card lifts it by only two pixels and reveals a thin evidence line. Buttons are calm, specific, and written as review actions rather than generic calls to action.

### Animation

On load, the status strip and summary figures enter in a short stagger, as if records are being placed onto the desk. Severity bars animate horizontally once, under 450ms, and then remain stable. Case-file panels use opacity and a 10px vertical transform for a restrained entrance. All nonessential motion is removed for `prefers-reduced-motion` users.

### Typography System

**Space Grotesk** is the primary UI face for compact labels, counts, and operational text. **DM Serif Display** is reserved for the report title, key section statements, and the strongest diagnostic callouts. The contrast between measured grotesk and high-contrast serif makes the work feel editorial, specific, and unlike a stock SaaS interface. Use tabular numerals for counts and code-like labels; never use Inter.

### Brand Essence

**A verification command desk for teams that need to turn repository findings into accountable fixes.**

**Personality:** Exacting, composed, candid.

### Brand Voice

Headlines are concise and diagnostic; CTAs read like next review steps; microcopy distinguishes observed facts from recommended action.

Example lines:

> “Five findings stand between this build and a clean release.”

> “Open the evidence, then resolve the cause—not the symptom.”

### Wordmark & Logo

The mark is a **split ledger square**: a dark square divided by a fine vertical audit rule, with a sharp crimson wedge cut from the lower-right corner to imply a flagged line item. The wordmark uses tightly tracked Space Grotesk uppercase lettering with a single offset rule beneath “VERIFY.” The logo must use no text in the graphic asset so it remains readable as a favicon.

### Signature Brand Color

**Ledger Crimson — `#F2523E`**. It appears only on material risk, invalid evidence, and the active incident marker.

## Style Decisions

- The desktop evidence rail must permanently carry the split ledger mark, **VERIFY** wordmark, navigation index, current audit state, and active incident marker; it is a command spine, never empty framing.
- Ledger Crimson `#F2523E` is reserved for material risk, invalid evidence, and the active incident state. Acid-lime is reserved for confirmed pass states or explicit review actions.
- Photography must be presented as filed evidence through labels, ruled overlays, cropped document framing, or corner markers—not treated as decorative atmosphere.
