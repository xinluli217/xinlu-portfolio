import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import SectionLabel from "../components/SectionLabel.jsx";

// ─── Chart images ────────────────────────────────────────────────────────────

const CHART_IMGS = {
  device_cvr:      "/charts/ab-testing/chart_device_cvr.png",
  funnel:          "/charts/ab-testing/chart_funnel.png",
  funnel_compare:  "/charts/ab-testing/chart_funnel_compare.png",
  power:           "/charts/ab-testing/chart_power.png",
  posterior:       "/charts/ab-testing/chart_posterior.png",
  forest:          "/charts/ab-testing/chart_forest.png",
};

// ─── Shared components (matching Olist style) ────────────────────────────────

function Divider() {
  return <div className="h-px my-5" style={{ background: "#EEEBE5" }} />;
}

function TagPill({ children }) {
  return (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: "#FFFFFF", color: "#6B6560" }}>
      {children}
    </span>
  );
}

function ActionBtn({ href, primary, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-lg transition-all duration-150 hover:opacity-80"
      style={primary
        ? { background: "#FDECEA", color: "#E06B56", border: "1px solid rgba(224,107,86,0.3)" }
        : { background: "#FFFFFF", color: "#6B6560", border: "1px solid #E5DFD6" }}>
      {children}
    </a>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: "#FFFFFF", border: "1px solid #E5DFD6" }}>
      <p className="text-[20px] font-bold leading-none mb-1" style={{ color: "#2C2A28", letterSpacing: "-0.03em" }}>{value}</p>
      <p className="text-[12px] font-medium mb-0.5" style={{ color: "#4A4540" }}>{label}</p>
      {sub && <p className="text-[10.5px]" style={{ color: "#9E9790" }}>{sub}</p>}
    </div>
  );
}

function StorySection({ section, index }) {
  const imgSrc = CHART_IMGS[section.chart];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="py-5 border-t"
      style={{ borderColor: "#EEEBE5" }}
    >
      <div className="flex gap-5 items-center">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#C4BDB4" }}>
            {section.title}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "#4A4540" }}>
            {section.body}
          </p>
        </div>
        {imgSrc && (
          <div className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: "320px", background: "#FFFFFF", border: "1px solid #E5DFD6", marginTop: "6px" }}>
            <img src={imgSrc} alt={section.title} className="w-full h-auto block"
              style={{ objectFit: "contain" }} loading="lazy" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const TAGS = ["Python", "Streamlit", "Claude API", "A/B Testing", "Bayesian"];

const SECTIONS = [
  {
    id: "eda",
    chart: "device_cvr",
    titleKey: "abtesting.section.0.title",
    bodyKey: "abtesting.section.0.body",
  },
  {
    id: "funnel",
    chart: "funnel",
    titleKey: "abtesting.section.1.title",
    bodyKey: "abtesting.section.1.body",
  },
  {
    id: "segment",
    chart: "funnel_compare",
    titleKey: "abtesting.section.2.title",
    bodyKey: "abtesting.section.2.body",
  },
  {
    id: "power",
    chart: "power",
    titleKey: "abtesting.section.3.title",
    bodyKey: "abtesting.section.3.body",
  },
  {
    id: "bayesian",
    chart: "posterior",
    titleKey: "abtesting.section.4.title",
    bodyKey: "abtesting.section.4.body",
  },
  {
    id: "segments",
    chart: "forest",
    titleKey: "abtesting.section.5.title",
    bodyKey: "abtesting.section.5.body",
  },
];

export default function ABTestingDetail() {
  const { t } = useTranslation();

  const stats = [
    { value: "903K", label: t("abtesting.metric.0.label"), sub: t("abtesting.metric.0.sub") },
    { value: "0.41%", label: t("abtesting.metric.1.label"), sub: t("abtesting.metric.1.sub") },
    { value: "68.1%", label: t("abtesting.metric.2.label"), sub: t("abtesting.metric.2.sub") },
    { value: "£142K", label: t("abtesting.metric.3.label"), sub: t("abtesting.metric.3.sub") },
  ];

  return (
    <InnerLayout wide>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          className="inline-flex items-center gap-1.5 text-[13px] mb-5 transition-opacity hover:opacity-60"
          style={{ color: "#E06B56" }}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#E06B56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t("detail.back")}
        </Link>

        {/* ── Header ── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {TAGS.map(tag => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
          <h1 className="text-[21px] font-bold leading-snug mb-2"
            style={{ color: "#2C2A28", letterSpacing: "-0.02em", fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            {t("project.ab-testing.title")}
          </h1>
          <p className="text-[13.5px] leading-relaxed mb-4" style={{ color: "#6B6560" }}>
            {t("project.ab-testing.insight")}
          </p>

          {/* ── Stats ── */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {stats.map(s => <StatCard key={s.value} {...s} />)}
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-wrap gap-2 mt-2">
            <ActionBtn href="https://ga-ab-testing-agent-kyfknyjgmr2dxhxzoufcd3.streamlit.app/" primary>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              {t("detail.demo")}
            </ActionBtn>
            <ActionBtn href="https://github.com/xinluli217/ga-ab-testing-agent">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              {t("detail.github")}
            </ActionBtn>
          </div>
        </div>

        <Divider />

        {/* ── AI Agent ── */}
        <div style={{ marginBottom: "8px" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#C4BDB4" }}>
            {t("detail.agent")}
          </p>

          <div style={{
            borderRadius: "16px", border: "1px solid rgba(224,107,86,0.25)",
            background: "#FDECEA", padding: "20px 24px", marginBottom: "10px",
          }}>
            <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#4A4540", margin: 0 }}>
              {t("abtesting.agent.intro")}
            </p>
          </div>

          {/* 6 tool cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                borderRadius: "12px", padding: "14px 16px",
                background: "#FFFFFF", border: "1px solid #E5DFD6",
              }}>
                <p style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#E06B56", margin: "0 0 5px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#2C2A28", margin: "0 0 4px" }}>
                  {t(`abtesting.tool.${i}.title`)}
                </p>
                <p style={{ fontSize: "11.5px", lineHeight: 1.55, color: "#6B6560", margin: 0 }}>
                  {t(`abtesting.tool.${i}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Analysis sections ── */}
        <div className="mb-1">
          <SectionLabel className="mb-0">Analysis</SectionLabel>
          {SECTIONS.map((s, i) => (
            <StorySection key={s.id} section={{ ...s, title: t(s.titleKey), body: t(s.bodyKey) }} index={i} />
          ))}
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
