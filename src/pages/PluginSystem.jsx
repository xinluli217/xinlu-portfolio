import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

const GITHUB_URL = "https://github.com/xinlulu217/job_application_tracker";

const TAGS = ["Chrome Extension", "Notion API", "Automation", "Vanilla JS"];

const TECH = [
  { group: "Extension",  items: ["Chrome Manifest V3", "Content Script", "Popup UI"] },
  { group: "Extraction", items: ["DOM scraping", "LinkedIn · Indeed · Totaljobs"] },
  { group: "Storage",    items: ["Notion API", "Chrome Storage Local"] },
  { group: "Frontend",   items: ["Vanilla JS", "HTML / CSS", "Chrome Scripting API"] },
  { group: "Optional",   items: ["Anthropic API", "Claude fallback"] },
];

/* ── Shared tokens ── */
const C = {
  ink:      "#2C2A28",
  mid:      "#4A4540",
  muted:    "#6B6560",
  faint:    "#9E9790",
  hair:     "#C4BDB4",
  border:   "#E5DFD6",
  surface:  "#F5F0E8",
  accent:   "#E06B56",
  accentBg: "#FDECEA",
  white:    "#FFFFFF",
};

/* ── Shared components ── */
function TagPill({ children }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: 500,
      padding: "3px 10px", borderRadius: "6px",
      background: C.white, color: C.muted,
      border: `1px solid ${C.border}`,
    }}>
      {children}
    </span>
  );
}

function MetricCard({ value, label, sub }) {
  return (
    <div style={{
      borderRadius: "12px", padding: "16px 14px",
      background: C.white, border: `1px solid ${C.border}`,
    }}>
      <p style={{ fontSize: "22px", fontWeight: 700, color: C.ink, letterSpacing: "-0.03em", margin: "0 0 5px", fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
        {value}
      </p>
      <p style={{ fontSize: "12px", fontWeight: 600, color: C.mid, margin: "0 0 3px" }}>{label}</p>
      {sub && <p style={{ fontSize: "10.5px", color: C.faint, margin: 0, lineHeight: 1.4 }}>{sub}</p>}
    </div>
  );
}

function SectionLabel({ children, accent = false }) {
  return (
    <p style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: accent ? C.accent : C.hair,
      margin: "0 0 12px",
    }}>
      {children}
    </p>
  );
}

function DecisionRow({ num, what, why }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "28px 1fr 1fr",
      gap: "16px",
      alignItems: "start",
      padding: "16px",
      background: C.surface,
      borderRadius: "10px",
      border: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: "24px", height: "24px", borderRadius: "6px",
        background: C.white, border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: 700, color: C.accent,
        fontFamily: "'JetBrains Mono', monospace", flexShrink: 0,
      }}>
        {num}
      </div>
      <div>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.hair, margin: "0 0 5px" }}>Decision</p>
        <p style={{ fontSize: "13px", fontWeight: 600, color: C.ink, margin: 0, lineHeight: 1.5 }}>{what}</p>
      </div>
      <div>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.hair, margin: "0 0 5px" }}>Why — not just what</p>
        <p style={{ fontSize: "13px", color: C.muted, margin: 0, lineHeight: 1.6 }}>{why}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, body }) {
  return (
    <div style={{
      borderRadius: "12px", padding: "18px 20px",
      background: C.white, border: `1px solid ${C.border}`,
    }}>
      <p style={{ fontSize: "13px", fontWeight: 600, color: C.ink, margin: "0 0 6px" }}>{title}</p>
      <p style={{ fontSize: "13px", lineHeight: 1.7, color: C.muted, margin: 0 }}>{body}</p>
    </div>
  );
}

function ActionBtn({ href, download, primary = false, icon, children }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    fontSize: "12px", fontWeight: 500,
    padding: "8px 16px", borderRadius: "8px",
    textDecoration: "none", transition: "opacity 0.15s",
  };
  const style = primary
    ? { ...base, background: C.accentBg, color: C.accent, border: `1px solid rgba(224,107,86,0.3)` }
    : { ...base, background: C.white,    color: C.ink,    border: `1px solid ${C.border}` };

  return (
    <a href={href}
      download={download || undefined}
      target={download ? "_self" : "_blank"}
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      {icon}
      {children}
    </a>
  );
}

const IconGithub = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ══════════════════════════════════════════════
   Main component
══════════════════════════════════════════════ */
export default function PluginSystem() {
  const { t } = useTranslation();

  const METRICS = ["0", "1", "2", "3"];
  const DECISIONS = [
    { num: "01", whatKey: "plugin.decision.0.what", whyKey: "plugin.decision.0.why" },
    { num: "02", whatKey: "plugin.decision.1.what", whyKey: "plugin.decision.1.why" },
    { num: "03", whatKey: "plugin.decision.2.what", whyKey: "plugin.decision.2.why" },
  ];

  return (
    <InnerLayout wide>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "13px", color: C.accent, marginBottom: "20px",
            textDecoration: "none", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t("detail.back")}
        </Link>

        {/* ── 1. Header ── */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {TAGS.map(tag => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
          <h1 style={{
            fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em",
            color: C.ink, margin: "0 0 14px", lineHeight: 1.3,
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
          }}>
            {t("project.plugin-system.title")}
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: C.mid, margin: 0 }}>
            {t("plugin.hook")}
          </p>
        </div>

        {/* ── 2. Metrics block ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
          {METRICS.map(key => (
            <MetricCard
              key={key}
              value={t(`plugin.metric.${key}.value`)}
              label={t(`plugin.metric.${key}.label`)}
              sub={t(`plugin.metric.${key}.sub`)}
            />
          ))}
        </div>

        {/* ── 3. Action buttons ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <ActionBtn href={GITHUB_URL} icon={IconGithub}>
            {t("detail.github")}
          </ActionBtn>
        </div>

        {/* ── 4. The Problem ── */}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}`, marginTop: "24px" }}>
          <SectionLabel>{t("plugin.situation.label")}</SectionLabel>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: C.mid, margin: 0 }}>
            {t("plugin.situation.body")}
          </p>
        </div>

        {/* ── 5. The Insight (highlighted) ── */}
        <div style={{
          padding: "28px",
          borderRadius: "16px",
          background: C.accentBg,
          border: `1px solid rgba(224,107,86,0.2)`,
          marginBottom: "4px",
        }}>
          <SectionLabel accent>{t("plugin.insight.label")}</SectionLabel>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: C.mid, margin: "0 0 16px" }}>
            {t("plugin.insight.body")}
          </p>
          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: "16px" }}>
            <p style={{ fontSize: "13.5px", fontWeight: 500, color: C.accent, margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
              "{t("plugin.insight.quote")}"
            </p>
          </div>
        </div>

        {/* ── 6. Key Decisions ── */}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}` }}>
          <SectionLabel>{t("plugin.decisions.label")}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {DECISIONS.map(d => (
              <DecisionRow
                key={d.num}
                num={d.num}
                what={t(d.whatKey)}
                why={t(d.whyKey)}
              />
            ))}
          </div>
        </div>

        {/* ── 7. Workflow diagram ── */}
        <div style={{
          borderRadius: "16px",
          border: `1px solid rgba(224,107,86,0.25)`,
          background: C.accentBg,
          padding: "28px 32px",
          marginBottom: "4px",
        }}>
          <SectionLabel>Workflow</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
            alignItems: "center",
            gap: "8px",
          }}>
            {[
              { step: "01", label: "Browse", sub: "Visit any job listing page" },
              null,
              { step: "02", label: "Extract", sub: "Claude AI parses title, company & role" },
              null,
              { step: "03", label: "Review", sub: "Confirm fields in the popup" },
              null,
              { step: "04", label: "Log", sub: "Record written to Notion database" },
            ].map((item, i) =>
              item === null ? (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(44,42,40,0.15)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ margin: "0 auto" }}>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              ) : (
                <div key={item.step} style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                    color: C.accent, margin: "0 0 6px", fontFamily: "'JetBrains Mono', monospace",
                  }}>{item.step}</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: C.ink, margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "11px", lineHeight: 1.5, color: C.muted, margin: 0 }}>{item.sub}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── 8. What I'd Do Differently ── */}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}`, marginTop: "4px" }}>
          <SectionLabel>{t("plugin.reflection.label")}</SectionLabel>
          <div style={{
            padding: "16px 18px",
            background: C.surface,
            borderRadius: "10px",
            borderLeft: `3px solid ${C.border}`,
          }}>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: C.mid, margin: 0 }}>
              {t("plugin.reflection.body")}
            </p>
          </div>
        </div>

        {/* ── 9. Features ── */}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}` }}>
          <SectionLabel>{t("detail.features")}</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[0, 1, 2, 3].map(i => (
              <FeatureCard
                key={i}
                title={t(`plugin.feature.${i}.title`)}
                body={t(`plugin.feature.${i}.body`)}
              />
            ))}
          </div>
        </div>

        {/* ── 10. Tech Stack ── */}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${C.border}` }}>
          <SectionLabel>{t("detail.tech")}</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
            {TECH.map(({ group, items }) => (
              <div key={group}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: C.muted, margin: "0 0 8px", letterSpacing: "0.02em" }}>
                  {group}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {items.map(item => (
                    <span key={item} style={{
                      display: "inline-block", fontSize: "11px",
                      padding: "3px 10px", borderRadius: "6px",
                      background: C.white, border: `1px solid ${C.border}`,
                      color: C.muted, width: "fit-content",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 11. Footer CTA ── */}
        <div style={{
          padding: "24px 0 0",
          borderTop: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: C.muted, margin: 0 }}>
            Source code, setup guide, and install instructions on GitHub.
          </p>
          <ActionBtn href={GITHUB_URL} icon={IconGithub}>
            {t("detail.github")}
          </ActionBtn>
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
