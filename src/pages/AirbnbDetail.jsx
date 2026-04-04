import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

function TagPill({ children }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: "500",
      padding: "3px 10px", borderRadius: "6px",
      background: "#f5f4f0", color: "#6a6a6a",
    }}>
      {children}
    </span>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div style={{
      borderRadius: "12px", padding: "14px 16px",
      background: "#fafaf9", border: "1px solid #f0f0f0",
    }}>
      <p style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em", margin: "0 0 4px" }}>{value}</p>
      <p style={{ fontSize: "12px", fontWeight: 500, color: "#3a3a3a", margin: "0 0 2px" }}>{label}</p>
      {sub && <p style={{ fontSize: "10.5px", color: "#9a9a9a", margin: 0 }}>{sub}</p>}
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ padding: "28px 0", borderTop: "1px solid #f0f0f0" }}>
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

const TAGS = ["R", "Tableau", "Spatial Analysis"];

const STATS = [
  { value: "60K+", label: "Listings", sub: "Inside Airbnb 2025" },
  { value: "33",   label: "Neighbourhoods", sub: "London boroughs" },
  { value: "3",    label: "Datasets", sub: "listings · calendar · reviews" },
  { value: "1",    label: "Dashboard", sub: "15 worksheets · Tableau" },
];

export default function AirbnbDetail() {
  const { t } = useTranslation();

  return (
    <InnerLayout wide>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "13px", color: "#c9a84c", marginBottom: "20px",
            textDecoration: "none", opacity: 1, transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
            {t("project.airbnb-london.title")}
          </h1>
          <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#6a6a6a", margin: "0 0 20px" }}>
            {t("project.airbnb-london.insight")}
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
            {STATS.map(s => <StatCard key={s.value} {...s} />)}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <a
              href="https://public.tableau.com/app/profile/xinlu.li5162/viz/airbnb_london_ds_tableau/1_1"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "12px", fontWeight: 500,
                padding: "8px 14px", borderRadius: "8px",
                background: "#f5ead8", color: "#c9a84c",
                border: "1px solid #e8d8b8", textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {t("detail.demo")}
            </a>
            <a
              href="/airbnb_london_tableau.twb"
              download="airbnb_london_tableau.twb"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "12px", fontWeight: 500,
                padding: "8px 14px", borderRadius: "8px",
                background: "#fafaf8", color: "#6a6a6a",
                border: "1px solid #ebebeb", textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download .twb
            </a>
          </div>
        </div>

        {/* ── Live dashboard embed ── */}
        <div style={{
          margin: "28px 0",
          borderRadius: "16px", overflow: "hidden",
          border: "1px solid #ebebeb",
          background: "#fafaf9",
        }}>
          <iframe
            src="https://public.tableau.com/views/airbnb_london_ds_tableau/1_1?:embed=yes&:showVizHome=no&:toolbar=yes&:animate_transition=yes"
            width="100%"
            height="820"
            style={{ display: "block", border: "none" }}
            title="London Airbnb Market Dashboard"
            allowFullScreen
          />
        </div>

        {/* ── Sections ── */}
        <Section label={t("detail.problem")}>
          {t("project.airbnb-london.problem")}
        </Section>

        <Section label={t("detail.method")}>
          {t("project.airbnb-london.method")}
        </Section>

        <Section label={t("detail.insight")}>
          {t("project.airbnb-london.finding")}
        </Section>

        <Section label={t("detail.impact")}>
          {t("project.airbnb-london.impact")}
        </Section>

      </PageTransition>
    </InnerLayout>
  );
}
