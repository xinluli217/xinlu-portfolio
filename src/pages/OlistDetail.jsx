import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import SectionLabel from "../components/SectionLabel.jsx";

// ─── Chart image map (one PNG per section) ───────────────────────────────────

const CHART_IMGS = {
  data:     "/charts/chart_data.png",      // spending distribution + top categories
  eda:      "/charts/chart_eda.png",       // monthly GMV + order volume
  repeat:   "/charts/chart_repeat.png",   // orders per customer + MAU
  rfm:      "/charts/chart_rfm.png",       // RFM segments 3-panel
  kmeans:   "/charts/chart_kmeans.png",    // elbow + silhouette
  clusters: "/charts/chart_clusters.png", // K-means scatter + crosstab
  cohort:   "/charts/chart_cohort.png",    // cohort retention heatmap
  clv:      "/charts/chart_clv.png",       // CLV distribution + KDE
  churn:    "/charts/chart_churn.png",     // ROC + confusion matrix + feature importance
  revenue:  "/charts/chart_revenue.png",  // Lorenz / Pareto curve
};

// ─── Small shared components ─────────────────────────────────────────────────

function Divider() {
  return <div className="h-px my-5" style={{ background: "#f0f0f0" }} />;
}

function TagPill({ children }) {
  return (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: "#f5f5f5", color: "#6a6a6a" }}>
      {children}
    </span>
  );
}

function ActionBtn({ href, download, primary, children }) {
  return (
    <a href={href} download={download || undefined}
      target={download ? "_self" : "_blank"} rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-lg transition-all duration-150 hover:opacity-80"
      style={primary
        ? { background: "#ffe0e1", color: "#FF9398", border: "1px solid rgba(255,147,152,0.3)" }
        : { background: "#f5f5f5", color: "#6a6a6a", border: "1px solid #e8e8e8" }}>
      {children}
    </a>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: "#f5f5f5", border: "1px solid #e8e8e8" }}>
      <p className="text-[20px] font-bold leading-none mb-1" style={{ color: "#1a1a1a", letterSpacing: "-0.03em" }}>{value}</p>
      <p className="text-[12px] font-medium mb-0.5" style={{ color: "#3a3a3a" }}>{label}</p>
      {sub && <p className="text-[10.5px]" style={{ color: "#9a9a9a" }}>{sub}</p>}
    </div>
  );
}

// ─── Story section: left text + right chart image ────────────────────────────

function StorySection({ section, index }) {
  const imgSrc = CHART_IMGS[section.chart];
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="py-5 border-t"
      style={{ borderColor: "#f0f0f0" }}
    >
      <div className="flex gap-5 items-center">
        {/* Left — text */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#c8c8c8" }}>
            {section.title}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "#3a3a3a" }}>
            {section.body}
          </p>
          {section.snippet && (
            <button
              onClick={() => setShowCode(v => !v)}
              className="mt-2.5 text-[11px] font-medium transition-opacity hover:opacity-60 flex items-center gap-1"
              style={{ color: "#9a9a9a" }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="5 3 10 8 5 13"/>
              </svg>
              {showCode ? "Hide code" : "View code"}
            </button>
          )}
          <AnimatePresence>
            {showCode && section.snippet && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <pre className="mt-2 rounded-lg overflow-x-auto text-[10.5px] leading-relaxed p-3"
                  style={{ background: "#f5f5f5", color: "#3a3a3a", fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                  {section.snippet}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — chart image */}
        {imgSrc && (
          <div className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: "320px", background: "#f5f5f5", border: "1px solid #e8e8e8", marginTop: "6px" }}>
            <img
              src={imgSrc}
              alt={section.title}
              className="w-full h-auto block"
              style={{ objectFit: "contain" }}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const TAGS = ["Python", "Machine Learning", "Customer Analytics"];

export default function OlistDetail() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/olist_sections.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <InnerLayout wide>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          className="inline-flex items-center gap-1.5 text-[13px] mb-5 transition-opacity hover:opacity-60"
          style={{ color: "#FF9398" }}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#FF9398" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t("detail.back")}
        </Link>

        {/* ── Header ── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {TAGS.map(tag => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
          <h1 className="text-[21px] font-bold leading-snug mb-2"
            style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}>
            Olist Customer Intelligence &amp; Churn Prevention
          </h1>
          <p className="text-[13.5px] leading-relaxed mb-4" style={{ color: "#6a6a6a" }}>
            {data?.subtitle ?? "97% of customers buy only once — an end-to-end ML pipeline to predict who's about to leave, segment who's worth saving, and quantify the cost of doing nothing."}
          </p>

          {/* ── Stats ── */}
          {data?.stats && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {data.stats.map(s => <StatCard key={s.value} {...s}/>)}
            </div>
          )}

          {/* ── Action buttons ── */}
          <div className="flex flex-wrap gap-2 mt-2">
            <ActionBtn href="/sample-size-calculator.html" primary>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              A/B Test Calculator
            </ActionBtn>
            <ActionBtn href="/olist_customer_intelligence.ipynb" download="olist_customer_intelligence.ipynb">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download .ipynb
            </ActionBtn>
          </div>
        </div>

        <Divider />

        {/* ── AI Agent ── */}
        <div style={{ marginBottom: "8px" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#c8c8c8" }}>
            {t("detail.agent")}
          </p>

          {/* intro */}
          <div style={{
            borderRadius: "16px",
            border: "1px solid rgba(255,147,152,0.25)",
            background: "#ffe0e1",
            padding: "20px 24px",
            marginBottom: "10px",
          }}>
            <div style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: "24px",
              flexWrap: "wrap",
            }}>
              <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#3a3a3a", margin: 0, flex: 1 }}>
                {t("olist.agent.intro")}
              </p>
              <a
                href="https://github.com/xinlulu217/olist-customer-intelligence"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", fontWeight: 600,
                  padding: "7px 14px", borderRadius: "8px",
                  background: "#ffffff", color: "#1a1a1a",
                  border: "1px solid rgba(255,147,152,0.3)",
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "opacity 0.15s", flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                {t("detail.github")}
              </a>
            </div>
          </div>

          {/* 7 tool cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                style={{
                  borderRadius: "12px", padding: "14px 16px",
                  background: "#f5f5f5", border: "1px solid #e8e8e8",
                }}
              >
                <p style={{
                  fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#FF9398", margin: "0 0 5px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>
                  {t(`olist.tool.${i}.title`)}
                </p>
                <p style={{ fontSize: "11.5px", lineHeight: 1.55, color: "#6a6a6a", margin: 0 }}>
                  {t(`olist.tool.${i}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Data story sections ── */}
        <div className="mb-1">
          <SectionLabel className="mb-0">Analysis</SectionLabel>
          {data?.sections
            ? data.sections.map((s, i) => <StorySection key={s.id} section={s} index={i}/>)
            : <p className="text-[13px] py-6 text-center" style={{ color: "#c8c8c8" }}>Loading…</p>
          }
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
