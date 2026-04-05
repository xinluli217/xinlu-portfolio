import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

const GITHUB_URL = "https://github.com/xinlulu217/job-agent";

const TAGS = ["Python", "Claude API", "Feishu Bot", "Flask"];

const STATS = [
  { value: "~20s",  label: "Per analysis",      sub: "JD → full report" },
  { value: "4",     label: "Agent layers",       sub: "Orchestration → LLM → Tools → Output" },
  { value: "3",     label: "Interfaces",         sub: "CLI · REPL · Feishu" },
  { value: "5",     label: "Cover letter templates", sub: "Role-specific selection" },
];

const TECH = [
  { group: "Language",   items: ["Python 3.10+"] },
  { group: "LLM",        items: ["Claude API", "Anthropic SDK"] },
  { group: "Web",        items: ["Flask", "httpx", "BeautifulSoup4"] },
  { group: "Messaging",  items: ["Feishu / Lark SDK", "ngrok"] },
  { group: "Data",       items: ["PyYAML", "JSON"] },
];

function TagPill({ children }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: "500",
      padding: "3px 10px", borderRadius: "6px",
      background: "#f5f5f5", color: "#6a6a6a",
      border: "1px solid #e8e8e8",
    }}>
      {children}
    </span>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div style={{
      borderRadius: "12px", padding: "14px 16px",
      background: "#f5f5f5", border: "1px solid #e8e8e8",
    }}>
      <p style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em", margin: "0 0 4px" }}>{value}</p>
      <p style={{ fontSize: "12px", fontWeight: 500, color: "#3a3a3a", margin: "0 0 2px" }}>{label}</p>
      {sub && <p style={{ fontSize: "10.5px", color: "#9a9a9a", margin: 0 }}>{sub}</p>}
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ padding: "28px 0", borderTop: "1px solid #e8e8e8" }}>
      <p style={{
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "#c8c8c8", margin: "0 0 10px",
      }}>
        {label}
      </p>
      <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#3a3a3a", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

function FeatureCard({ title, body }) {
  return (
    <div style={{
      borderRadius: "12px", padding: "18px 20px",
      background: "#f5f5f5", border: "1px solid #e8e8e8",
    }}>
      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 6px" }}>{title}</p>
      <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#6a6a6a", margin: 0 }}>{body}</p>
    </div>
  );
}

export default function JobAgentDetail() {
  const { t } = useTranslation();

  return (
    <InnerLayout wide>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "13px", color: "#FF9398", marginBottom: "20px",
            textDecoration: "none", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#FF9398" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t("detail.back")}
        </Link>

        {/* ── Header ── */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {TAGS.map(tag => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
          <h1 style={{
            fontSize: "21px", fontWeight: 700, letterSpacing: "-0.02em",
            color: "#1a1a1a", margin: "0 0 10px", lineHeight: 1.3,
          }}>
            {t("project.job-agent.title")}
          </h1>
          <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#6a6a6a", margin: "0 0 20px" }}>
            {t("project.job-agent.insight")}
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
            {STATS.map(s => <StatCard key={s.value} {...s} />)}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <a
              href="/job-agent-course/index.html"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "12px", fontWeight: 500,
                padding: "8px 16px", borderRadius: "8px",
                background: "#ffe0e1", color: "#FF9398",
                border: "1px solid rgba(255,147,152,0.3)",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {t("detail.course")}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "12px", fontWeight: 500,
                padding: "8px 16px", borderRadius: "8px",
                background: "#f5f5f5", color: "#1a1a1a",
                border: "1px solid #e8e8e8",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              {t("detail.github")}
            </a>
          </div>
        </div>

        {/* ── Architecture diagram ── */}
        <div style={{
          margin: "28px 0",
          borderRadius: "16px",
          border: "1px solid rgba(255,147,152,0.25)",
          background: "#ffe0e1",
          padding: "32px 36px",
        }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#555555", margin: "0 0 24px",
          }}>
            {t("jobagent.arch.label")}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
            alignItems: "center",
            gap: "8px",
          }}>
            {[
              { step: "01", label: t("jobagent.step.0.label"), sub: t("jobagent.step.0.sub") },
              null,
              { step: "02", label: t("jobagent.step.1.label"), sub: t("jobagent.step.1.sub") },
              null,
              { step: "03", label: t("jobagent.step.2.label"), sub: t("jobagent.step.2.sub") },
              null,
              { step: "04", label: t("jobagent.step.3.label"), sub: t("jobagent.step.3.sub") },
            ].map((item, i) =>
              item === null ? (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(0,0,0,0.12)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ margin: "0 auto" }}>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              ) : (
                <div key={item.step} style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                    color: "#FF9398", margin: "0 0 6px", fontFamily: "monospace",
                  }}>{item.step}</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "11px", lineHeight: 1.5, color: "#555555", margin: 0 }}>{item.sub}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Features ── */}
        <div style={{ padding: "28px 0", borderTop: "1px solid #e8e8e8" }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#c8c8c8", margin: "0 0 14px",
          }}>
            {t("detail.features")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[0, 1, 2, 3].map(i => (
              <FeatureCard
                key={i}
                title={t(`jobagent.feature.${i}.title`)}
                body={t(`jobagent.feature.${i}.body`)}
              />
            ))}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div style={{ padding: "28px 0", borderTop: "1px solid #e8e8e8" }}>
          <p style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#c8c8c8", margin: "0 0 14px",
          }}>
            {t("detail.tech")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
            {TECH.map(({ group, items }) => (
              <div key={group}>
                <p style={{
                  fontSize: "11px", fontWeight: 600, color: "#5a5a5a",
                  margin: "0 0 8px", letterSpacing: "0.02em",
                }}>
                  {group}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {items.map(item => (
                    <span key={item} style={{
                      display: "inline-block", fontSize: "11px",
                      padding: "3px 10px", borderRadius: "6px",
                      background: "#f5f5f5",
                      border: "1px solid #e8e8e8",
                      color: "#6a6a6a",
                      width: "fit-content",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sections ── */}
        <Section label={t("detail.problem")}>
          {t("project.job-agent.problem")}
        </Section>
        <Section label={t("detail.method")}>
          {t("project.job-agent.method")}
        </Section>
        <Section label={t("detail.insight")}>
          {t("project.job-agent.finding")}
        </Section>
        <Section label={t("detail.impact")}>
          {t("project.job-agent.impact")}
        </Section>

        {/* ── Footer CTA ── */}
        <div style={{
          padding: "28px 0 0",
          borderTop: "1px solid #e8e8e8",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "#6a6a6a", margin: 0 }}>
            {t("jobagent.footer")}
          </p>
          <a
            href={GITHUB_URL}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "12px", fontWeight: 500,
              padding: "8px 16px", borderRadius: "8px",
              background: "#f5f5f5", color: "#1a1a1a",
              border: "1px solid #e8e8e8",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            {t("detail.github")}
          </a>
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
