/**
 * Incident Ledger design reminder: forensic editorial audit dashboard with graphite workspace,
 * bone-white evidence slips, ledger-crimson risk markers, and a deliberately asymmetric report flow.
 */
import { useState } from "react";
import {
  ArrowDownRight,
  Check,
  ChevronRight,
  CircleAlert,
  Code2,
  ExternalLink,
  FileWarning,
  Github,
  Menu,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";

const heroArt = "/assets/incident-ledger-hero.png";
const evidenceArt = "/assets/incident-ledger-evidence.png";
const riskArt = "/assets/incident-ledger-risk.png";
const ledgerMark = "/assets/incident-ledger-mark.png";

const checks = [
  { label: "TypeScript", command: "pnpm run check", status: "Pass", tone: "pass" },
  { label: "ESLint", command: "pnpm run lint", status: "Pass + warning", tone: "watch" },
  { label: "Unit tests", command: "pnpm run test", status: "2 pass · 1 skipped", tone: "watch" },
  { label: "Server build", command: "pnpm run build", status: "Pass", tone: "pass" },
  { label: "Expo export", command: "expo export --platform web", status: "Retry passed", tone: "watch" },
  { label: "Dependency audit", command: "pnpm audit --prod", status: "Blocked", tone: "risk" },
];

type Severity = "critical" | "high" | "medium";

const findings: Array<{
  id: string;
  severity: Severity;
  code: string;
  title: string;
  location: string;
  summary: string;
  evidence: string[];
  resolution: string;
}> = [
  {
    id: "assets",
    severity: "high",
    code: "F-01",
    title: "Broken standalone asset paths",
    location: "Loan/index.html · lines 13–15",
    summary:
      "The standalone Loan page requests a stylesheet and script at paths that are not tracked by the repository, leaving the page unstyled and emitting missing-file requests.",
    evidence: ['<link rel="stylesheet" href="css/index.css">', '<script src="js/index.js"></script>'],
    resolution:
      "Point the stylesheet at index.css and remove the script tag unless the missing JavaScript file is intentionally added.",
  },
  {
    id: "css",
    severity: "high",
    code: "F-02",
    title: "Stylesheet contains invalid CSS",
    location: "Loan/index.css · lines 2–51",
    summary:
      "Several declarations are malformed or ineffective, including an unmatched selector boundary, invalid shadow lengths, invalid flex-direction values, and selectors that do not match the document.",
    evidence: [
      "filter: drop-shadow(0.0.0.35em #434242);",
      "flex-direction: inline;",
      "repayment due { … }",
    ],
    resolution:
      "Normalize the reset selector, use row for flex direction, correct the shadow lengths, and target .repayment_due and .loantime exactly.",
  },
  {
    id: "auth",
    severity: "medium",
    code: "F-03",
    title: "Logout coverage is skipped and the fixture fails",
    location: "tests/auth.logout.test.ts · line 45",
    summary:
      "The logout suite is skipped in the normal run. When temporarily enabled, the mock request fails because it omits the hostname consumed by the cookie helper.",
    evidence: [
      "TypeError: Cannot read properties of undefined (reading 'includes')",
      "at server/_core/cookies.ts:8",
    ],
    resolution:
      "Add hostname: \"localhost\" to the fixture, remove describe.skip, and retain the regression assertion for cookie clearing.",
  },
  {
    id: "dependencies",
    severity: "critical",
    code: "F-04",
    title: "Production dependency audit is unresolved",
    location: "pnpm audit --prod --audit-level high",
    summary:
      "The production tree reports 2 critical, 76 high, 45 moderate, and 6 low advisories across 891 dependencies. Many arrive through Expo tooling, but tRPC is a direct dependency needing attention.",
    evidence: ["shell-quote@1.8.3", "tar@7.5.2", "@trpc/server@11.7.2", "minimatch advisories"],
    resolution:
      "Update Expo and React Native as a compatible group, move tRPC to a patched release, regenerate the lockfile, then re-run the audit.",
  },
];

function SeverityIcon({ severity }: { severity: Severity }) {
  if (severity === "critical") return <ShieldAlert aria-hidden="true" size={18} />;
  if (severity === "high") return <CircleAlert aria-hidden="true" size={18} />;
  return <FileWarning aria-hidden="true" size={18} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSeverity, setActiveSeverity] = useState<"all" | Severity>("all");
  const shownFindings = activeSeverity === "all" ? findings : findings.filter((finding) => finding.severity === activeSeverity);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="ledger-shell">
      <aside className="ledger-rail" aria-label="Report navigation">
        <a className="brand-lockup" href="#overview" aria-label="Incident Ledger overview">
          <img src={ledgerMark} alt="" className="brand-mark" />
          <span className="brand-type">
            <b>INCIDENT</b>
            <span>LEDGER / VERIFY</span>
          </span>
        </a>

        <div className="rail-rule" />
        <p className="rail-label">Verification dossier</p>
        <nav className="rail-nav">
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#checks"><span>02</span> Check ledger</a>
          <a href="#findings"><span>03</span> Findings <em>04</em></a>
          <a href="#remediation"><span>04</span> Remediation</a>
        </nav>

        <div className="rail-footer">
          <div className="audit-state">
            <span className="state-label">Current audit state</span>
            <b><i />ACTION REQUIRED</b>
            <p>04 active findings · audit held</p>
          </div>
          <div className="source-stamp">
            <span>Repository</span>
            <b>IanKipchumba/Loan-system</b>
          </div>
          <a className="github-link" href="https://github.com/IanKipchumba/Loan-system" target="_blank" rel="noreferrer">
            <Github size={15} aria-hidden="true" /> Open repository <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </aside>

      <header className="mobile-ledger-bar">
        <a className="brand-lockup" href="#overview" aria-label="Incident Ledger overview">
          <img src={ledgerMark} alt="" className="brand-mark" />
          <span className="brand-type"><b>INCIDENT</b><span>LEDGER / VERIFY</span></span>
        </a>
        <button className="menu-trigger" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}<span className="sr-only">Toggle navigation</span>
        </button>
        {menuOpen && (
          <nav id="mobile-nav" className="mobile-nav">
            <a href="#overview" onClick={closeMenu}>Overview</a>
            <a href="#checks" onClick={closeMenu}>Check ledger</a>
            <a href="#findings" onClick={closeMenu}>Findings</a>
            <a href="#remediation" onClick={closeMenu}>Remediation</a>
          </nav>
        )}
      </header>

      <main className="ledger-main">
        <section id="overview" className="hero-casefile">
          <div className="hero-art" style={{ backgroundImage: `url(${heroArt})` }} aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-topline">
            <span className="eyebrow light">REPOSITORY VERIFICATION · 23 AUG 2026</span>
            <span className="clean-badge"><Check size={14} aria-hidden="true" /> Working tree clean</span>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">Loan-system / inspection report</p>
            <h1>Five findings<br />stand between this build<br />and a <i>clean release.</i></h1>
            <p className="hero-summary">A focused verification dossier for the standalone Loan page and the Expo/React Native workspace—separating passed checks from work that requires action.</p>
            <a className="hero-action" href="#findings">Open the evidence <ArrowDownRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="hero-count">
            <span>UNRESOLVED</span>
            <strong>04</strong>
            <small>confirmed findings</small>
          </div>
        </section>

        <section className="signal-band" aria-label="Audit summary">
          <article className="signal-note">
            <span className="eyebrow">Verification status</span>
            <p>Core application checks passed. Security hygiene and the standalone page still require intervention.</p>
          </article>
          <article className="risk-totals">
            <span className="eyebrow">Production audit · 891 dependencies</span>
            <div className="total-grid">
              <span><b>02</b> Critical</span>
              <span><b>76</b> High</span>
              <span><b>45</b> Moderate</span>
              <span><b>06</b> Low</span>
            </div>
          </article>
          <div className="signal-art-wrap">
            <img src={riskArt} alt="Abstract risk signal sculpture" />
            <span className="art-file-tag">FIG. A / AUDIT SIGNAL</span>
          </div>
        </section>

        <section id="checks" className="section ledger-section">
          <div className="section-heading split-heading">
            <div>
              <span className="section-index">02 / CHECK LEDGER</span>
              <h2>The work that <i>held.</i></h2>
            </div>
            <p>Checks were run from a frozen lockfile. The mobile project remains type-safe and buildable; the record below makes its caveats explicit.</p>
          </div>
          <div className="checks-ledger">
            {checks.map((check, index) => (
              <article className={`check-row ${check.tone}`} key={check.label}>
                <span className="check-number">0{index + 1}</span>
                <div className="check-title"><b>{check.label}</b><code>{check.command}</code></div>
                <div className="check-result"><span className={`status-dot ${check.tone}`} />{check.status}</div>
                {check.tone === "pass" ? <ShieldCheck size={19} aria-hidden="true" /> : <Terminal size={19} aria-hidden="true" />}
              </article>
            ))}
          </div>
          <div className="annotation-note"><span>Note</span> The initial Expo export hit a NativeWind cache SHA-1 error. A clean retry passed; monitor the behavior rather than treating it as a deterministic failure.</div>
        </section>

        <section id="findings" className="section findings-section">
          <div className="findings-intro">
            <div>
              <span className="section-index crimson">03 / CONFIRMED FINDINGS</span>
              <h2>Observed facts.<br /><i>Actionable causes.</i></h2>
            </div>
            <div className="severity-filter" aria-label="Filter findings by severity">
              {(["all", "critical", "high", "medium"] as const).map((severity) => (
                <button type="button" key={severity} className={activeSeverity === severity ? "active" : ""} onClick={() => setActiveSeverity(severity)}>
                  {severity === "all" ? "All 04" : severity}
                </button>
              ))}
            </div>
          </div>
          <div className="findings-layout">
            <div className="findings-stack">
              {shownFindings.map((finding) => (
                <details className={`finding-card ${finding.severity}`} key={finding.id} open={finding.severity === "critical"}>
                  <summary>
                    <span className="severity-stamp"><SeverityIcon severity={finding.severity} /><b>{finding.severity}</b><em>{finding.code}</em></span>
                    <span className="finding-summary"><b>{finding.title}</b><small>{finding.location}</small></span>
                    <ChevronRight className="finding-chevron" size={20} aria-hidden="true" />
                  </summary>
                  <div className="finding-detail">
                    <p>{finding.summary}</p>
                    <div className="evidence-grid">
                      <div className="evidence-slip">
                        <span><Code2 size={14} aria-hidden="true" /> EVIDENCE</span>
                        {finding.evidence.map((line) => <code key={line}>{line}</code>)}
                      </div>
                      <div className="resolution-box">
                        <span>RECOMMENDED CORRECTION</span>
                        <p>{finding.resolution}</p>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <aside className="evidence-aside">
              <span className="evidence-corner" aria-hidden="true" />
              <span className="evidence-figure">FIG. B / FILED OBSERVATION</span>
              <img src={evidenceArt} alt="Editorial evidence slip on an audit folder" />
              <div className="aside-caption"><span>Filed observation</span><p>Do not use broad force resolutions. Trace the dependency path, update compatible package groups, then repeat the audit.</p></div>
            </aside>
          </div>
        </section>

        <section id="remediation" className="section remediation-section">
          <div className="remediation-rail">
            <span className="section-index light">04 / REMEDIATION ORDER</span>
              <h2>Resolve the cause—<br /><i>not the symptom.</i></h2>
            <p>Prioritize user-visible failures first, restore test coverage second, then make the dependency chain accountable.</p>
          </div>
          <div className="remediation-list">
            {[
              ["01", "Repair the standalone page", "Fix asset references, malformed inline HTML, and selectors so the Loan page can render as authored."],
              ["02", "Restore logout coverage", "Provide hostname: \"localhost\" in the mock request, remove describe.skip, and keep the regression test active."],
              ["03", "Make formatting repeatable", "Run Prettier and add a stable format:check script without shell glob ambiguity."],
              ["04", "Update the dependency chain", "Move Expo/React Native together, update tRPC to a patched compatible release, regenerate the lockfile, and audit again."],
              ["05", "Watch the NativeWind export cache", "If the SHA-1 error recurs in CI, introduce deterministic cache cleanup and recheck the Metro configuration."],
            ].map(([number, title, description]) => (
              <article className="remediation-step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowDownRight size={19} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <footer className="ledger-footer">
          <div><span className="eyebrow">SOURCE RECORD</span><p>Repository inspection performed 23 August 2026. Findings are based on the recorded verification run and dependency audit.</p></div>
          <a href="https://github.com/IanKipchumba/Loan-system" target="_blank" rel="noreferrer">View source repository <ExternalLink size={15} /></a>
        </footer>
      </main>
    </div>
  );
}
