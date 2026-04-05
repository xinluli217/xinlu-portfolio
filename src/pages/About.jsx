import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { EASE } from "../motion/variants.js";

const TOOLS = [
  "Python", "R", "SQL · PostGIS", "Tableau",
  "QGIS", "Streamlit", "scikit-learn", "GeoPandas", "Git",
];

const STRENGTH_KEYS = ["s0", "s1", "s2", "s3"];
const TIMELINE_KEYS = ["t0", "t1", "t2", "t3"];

const Rule = () => (
  <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "52px 0" }} />
);

const Label = ({ children }) => (
  <p style={{
    fontSize: "11px", fontWeight: "500",
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: "#b0a898", margin: "0 0 20px",
  }}>
    {children}
  </p>
);

export default function About() {
  const { t }   = useTranslation();
  const reduced = useReducedMotion();

  const strengthStagger = reduced ? {} : {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0 } },
  };
  const strengthChild = reduced ? {} : {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <InnerLayout>
      <PageTransition>

        {/* ── 1. Header ── */}
        <h1 style={{
          fontSize: "48px", fontWeight: 700,
          letterSpacing: "-0.025em", color: "#111",
          lineHeight: 1.06, margin: "0 0 10px",
        }}>
          {t("page.about.title")}
        </h1>
        <p style={{ fontSize: "13px", color: "#b0a898", margin: "0 0 36px" }}>
          {t("page.about.subtitle")}
        </p>

        {/* ── 2. Short intro ── */}
        <FadeIn delay={0.1}>
          <p style={{
            fontSize: "19px", lineHeight: 1.68,
            color: "#2a2a2a", margin: 0,
            maxWidth: "620px",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          }}>
            {t("page.about.intro")}
          </p>
        </FadeIn>

        <Rule />

        {/* ── 3. What I Do ── */}
        <FadeIn>
          <Label>{t("page.about.tools_label") === "Tools" ? "What I Do" : "我的工作"}</Label>
          <p style={{
            fontSize: "15px", lineHeight: 1.78,
            color: "#4a4a4a", margin: "0 0 40px",
            maxWidth: "640px",
          }}>
            {t("page.about.statement")}
          </p>
        </FadeIn>

        {/* ── 4. Selected Strengths ── */}
        <FadeIn delay={0.05}>
          <Label>{t("page.about.strengths_label")}</Label>
        </FadeIn>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={strengthStagger}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
        >
          {STRENGTH_KEYS.map(key => (
            <motion.div
              key={key}
              variants={strengthChild}
              style={{
                background: "#f5f5f5",
                borderRadius: "16px",
                padding: "18px 22px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{
                fontSize: "13px", color: "#FF9398",
                fontWeight: "600", flexShrink: 0, marginTop: "1px",
              }}>—</span>
              <p style={{
                fontSize: "13.5px", lineHeight: 1.6,
                color: "#3a3a3a", margin: 0,
              }}>
                {t(`about.${key}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Rule />

        {/* ── 5. Timeline ── */}
        <div>
          {TIMELINE_KEYS.map((key, i) => (
            <FadeIn key={key} delay={i * 0.06} y={20}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "28px",
                padding: "28px 0",
                borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.07)",
                alignItems: "start",
              }}>
                <p style={{
                  fontSize: "11px", fontWeight: "500",
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  color: "#b0a898", margin: 0, paddingTop: "2px",
                  lineHeight: 1.5,
                }}>
                  {t(`about.${key}.period`)}
                </p>
                <div>
                  <p style={{
                    fontSize: "15px", fontWeight: 600,
                    color: "#111", margin: "0 0 6px",
                    letterSpacing: "-0.01em",
                  }}>
                    {t(`about.${key}.title`)}
                  </p>
                  <p style={{ fontSize: "14px", lineHeight: 1.68, color: "#777", margin: 0 }}>
                    {t(`about.${key}.body`)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <Rule />

        {/* ── 6. Tools ── */}
        <FadeIn>
          <Label>{t("page.about.tools_label")}</Label>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reduced ? {} : {
              hidden:  {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
            }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            {TOOLS.map(tool => (
              <motion.span
                key={tool}
                variants={reduced ? {} : {
                  hidden:  { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
                }}
                style={{
                  fontSize: "13px", fontWeight: "500",
                  padding: "6px 14px", borderRadius: "20px",
                  background: "#f5f5f5",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  color: "#444",
                }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </FadeIn>

      </PageTransition>
    </InnerLayout>
  );
}
