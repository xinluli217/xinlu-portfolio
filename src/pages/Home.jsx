import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SiteNav from "../components/SiteNav.jsx";
import { EASE, PAGE_VARIANTS } from "../motion/variants.js";

// ─── Motion variants ──────────────────────────────────────────────────────────

const GRID_CONTAINER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const CELL = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
};

const HERO_TEXT = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.0 } },
};

const HERO_LINE = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ─── Style tokens ─────────────────────────────────────────────────────────────

const CARD      = { background: "#FFFFFF", borderRadius: "24px", boxShadow: "0 1px 4px rgba(44,42,40,0.04), 0 0 0 1px rgba(44,42,40,0.06)" };
const WARM_CARD = { background: "#FFFFFF", borderRadius: "24px", boxShadow: "0 0 0 1px rgba(44,42,40,0.05)" };
const HOVER_SHADOW = "0 10px 32px rgba(44,42,40,0.08), 0 0 0 1px rgba(44,42,40,0.06)";


// ─── Featured projects data ───────────────────────────────────────────────────

const FEATURED = [
  {
    to:    "/projects/job-agent",
    tags:  ["Python", "Claude API", "AI Agent"],
    title: "AI Job Application Agent",
    descKey: "featured.jobagent.desc",
    metrics: [
      { value: "~20s", label: "vs 23 min" },
      { value: "3",    label: "Outputs"   },
      { value: "2",    label: "Markets"   },
    ],
    thumb: "/charts/chart_jobagent_thumb.png",
  },
  {
    to:    "/projects/olist-churn",
    tags:  ["Python", "Machine Learning", "Analytics"],
    title: "Olist Churn Prevention",
    descKey: "featured.olist.desc",
    metrics: [
      { value: "97%+",  label: "Single-buy" },
      { value: "3–5×",  label: "ROI"        },
      { value: "100K+", label: "Records"    },
    ],
    thumb: "/charts/chart_olist_thumb.png",
  },
];

const CHIPS = ["Python", "SQL", "ML", "Claude API", "Tableau", "Product"];

export default function Home() {
  const { t }     = useTranslation();
  const reduced   = useReducedMotion();
  const nameLines = t("brand.name").split("\n");


  return (
    <motion.div
      variants={reduced ? {} : PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={reduced ? { duration: 0.15 } : { duration: 0.4, ease: EASE }}
      style={{ minHeight: "100vh", background: "#FAF7F2" }}
    >
      <SiteNav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 40px 80px" }}>

        {/* ── Bento grid ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reduced ? {} : GRID_CONTAINER}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateAreas: `
              "greeting greeting photo"
              "desc     desc     photo"
            `,
            gap: "10px",
          }}
        >

          {/* ── Greeting card ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              gridArea: "greeting",
              padding: "48px 52px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "280px",
            }}
          >
            {/* Role label */}
            <motion.p
              variants={reduced ? {} : CELL}
              style={{
                fontSize: "11px", fontWeight: "600",
                letterSpacing: "0.11em", textTransform: "uppercase",
                color: "#E06B56", marginBottom: "16px",
              }}
            >
              {t("hero.role")}
            </motion.p>

            {/* Name headline */}
            <motion.h1
              variants={reduced ? {} : HERO_TEXT}
              style={{
                fontSize: "clamp(44px, 4.8vw, 70px)",
                fontWeight: 800, lineHeight: 1.06,
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                letterSpacing: "-0.03em", color: "#2C2A28",
                margin: "0 0 14px",
              }}
            >
              {nameLines.map((line, i) => (
                <motion.span key={i} variants={reduced ? {} : HERO_LINE} style={{ display: "block" }}>
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              variants={reduced ? {} : CELL}
              style={{ fontSize: "15px", color: "#6B6560", lineHeight: 1.65, margin: "0 0 24px" }}
            >
              {t("hero.sub")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={reduced ? {} : CELL} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Link
                to="/projects"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 600,
                  padding: "10px 20px", borderRadius: "8px",
                  background: "#E06B56", color: "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                {t("hero.cta.primary")} ↗
              </Link>
              <a
                href={`/Xinlu.Li_cv_EN.pdf`}
                download
                style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 500,
                  padding: "10px 20px", borderRadius: "8px",
                  background: "transparent", color: "#6B6560",
                  border: "1px solid #E5DFD6",
                  textDecoration: "none",
                }}
              >
                {t("hero.cta.secondary")}
              </a>
            </motion.div>
          </motion.div>

          {/* ── Photo — circular avatar, no card wrapper ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              gridArea: "photo",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.img
              src="/bg.jpg"
              alt="Xinlu Li"
              whileHover={reduced ? {} : { scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                width: "220px", height: "220px",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 4px 24px rgba(44,42,40,0.12)",
              }}
            />
          </motion.div>

          {/* ── Statement + chips ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              ...WARM_CARD,
              gridArea: "desc",
              padding: "26px 40px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#6B6560", margin: 0, flex: 1, minWidth: "200px" }}>
              {t("hero.statement")}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flexShrink: 0 }}>
              {CHIPS.map(chip => (
                <span key={chip} style={{
                  fontSize: "11px", fontWeight: 500,
                  padding: "4px 11px", borderRadius: "6px",
                  background: "#F7F4EF", color: "#6B6560",
                  border: "1px solid #E5DFD6",
                }}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>


        </motion.div>

        {/* ── Divider ── */}
        <div style={{ height: "1px", background: "#EEEBE5", margin: "10px 0 16px" }} />

        {/* ── Featured Work ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <p style={{
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#C4BDB4", margin: 0,
            }}>
              {t("featured.label")}
            </p>
            <Link to="/projects" style={{
              fontSize: "12px", fontWeight: 500,
              color: "#E06B56", textDecoration: "none",
            }}>
              {t("featured.all")} →
            </Link>
          </div>

          {/* Horizontal project cards */}
          {FEATURED.map((proj, i) => (
            <motion.div
              key={proj.to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.1, ease: EASE }}
              style={{
                ...CARD,
                display: "flex",
                alignItems: "stretch",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              {/* Left — text */}
              <div style={{
                flex: 1,
                padding: "28px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: "10px", fontWeight: 500,
                      padding: "2px 9px", borderRadius: "5px",
                      background: "#F7F4EF", color: "#9E9790",
                      border: "1px solid #E5DFD6",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={{
                  fontSize: "18px", fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  color: "#2C2A28", letterSpacing: "-0.02em",
                  lineHeight: 1.3, margin: 0,
                }}>
                  {proj.title}
                </p>
                <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.7, margin: 0 }}>
                  {t(proj.descKey)}
                </p>
                <Link
                  to={proj.to}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    fontSize: "12px", fontWeight: 600,
                    color: "#E06B56", textDecoration: "none",
                    marginTop: "auto",
                  }}
                >
                  {t("featured.cta")} →
                </Link>
              </div>

              {/* Right — thumbnail + metrics */}
              <div style={{
                width: "260px",
                flexShrink: 0,
                background: "#F7F4EF",
                borderLeft: "1px solid #E5DFD6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "24px",
              }}>
                {/* Thumbnail placeholder / image */}
                <div style={{
                  width: "100%", height: "90px",
                  borderRadius: "8px",
                  background: "#EEEBE5",
                  border: "1px solid #E5DFD6",
                  overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <img
                    src={proj.thumb}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                </div>

                {/* Metric pills */}
                <div style={{ display: "flex", gap: "6px", width: "100%", justifyContent: "center" }}>
                  {proj.metrics.map(m => (
                    <div key={m.label} style={{
                      flex: 1,
                      background: "#FFFFFF",
                      border: "1px solid #E5DFD6",
                      borderRadius: "8px",
                      padding: "8px 6px",
                      textAlign: "center",
                    }}>
                      <div style={{
                        fontSize: "15px", fontWeight: 700,
                        color: "#E06B56", letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: "9px", color: "#9E9790", marginTop: "3px" }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
}
