import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SiteNav from "../components/SiteNav.jsx";
import { EASE, PAGE_VARIANTS, PAGE_TRANSITION } from "../motion/variants.js";

// ─── Motion variants (Home-specific) ────────────────────────────────────────

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

// ─── Static style tokens ─────────────────────────────────────────────────────

const CARD      = { background: "#fff",     borderRadius: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)" };
const WARM_CARD = { background: "#ede8df",  borderRadius: "24px", boxShadow: "0 0 0 1px rgba(0,0,0,0.04)" };
const HOVER_BOX_SHADOW = "0 10px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.04)";

const MotionLink = motion.create(Link);

export default function Home() {
  const { t }       = useTranslation();
  const reduced     = useReducedMotion();
  const greetingLines = t("hero.greeting").split("\n");

  const navCards = [
    { to: "/projects", label: t("nav.projects"), num: "01" },
    { to: "/about",    label: t("nav.about"),    num: "02" },
    { to: "/connect",  label: t("nav.connect"),  num: "03" },
  ];

  return (
    <motion.div
      variants={reduced ? {} : { ...PAGE_VARIANTS, animate: { opacity: 1 } }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={reduced ? { duration: 0.15 } : { duration: 0.4, ease: EASE }}
      style={{ minHeight: "100vh", background: "#f5f1ea" }}
    >
      <SiteNav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 40px 80px" }}>

        {/* ── Stagger grid container ── */}
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
              "nav1     nav2     nav3"
            `,
            gap: "10px",
          }}
        >

          {/* ── Greeting ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              ...CARD,
              gridArea: "greeting",
              padding: "52px 56px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "280px",
            }}
          >
            <motion.p
              variants={reduced ? {} : CELL}
              style={{
                fontSize: "11px", fontWeight: "500",
                letterSpacing: "0.11em", textTransform: "uppercase",
                color: "#b0a898", marginBottom: "22px",
              }}
            >
              {t("hero.role").replace("\n", " ")}
            </motion.p>

            {/* Staggered headline lines */}
            <motion.h1
              variants={reduced ? {} : HERO_TEXT}
              style={{
                fontSize: "clamp(44px, 4.8vw, 70px)",
                fontWeight: 700, lineHeight: 1.06,
                letterSpacing: "-0.03em", color: "#111",
                margin: 0,
              }}
            >
              {greetingLines.map((line, i) => (
                <motion.span
                  key={i}
                  variants={reduced ? {} : HERO_LINE}
                  style={{ display: "block" }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* ── Photo (with subtle zoom on hover) ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              gridArea: "photo",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            <motion.img
              src="/bg.jpg"
              alt=""
              whileHover={reduced ? {} : { scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>

          {/* ── Statement ── */}
          <motion.div
            variants={reduced ? {} : CELL}
            style={{
              ...WARM_CARD,
              gridArea: "desc",
              padding: "30px 40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5a5248", margin: 0 }}>
              {t("page.about.statement")}
            </p>
          </motion.div>

          {/* ── Nav cards ── */}
          {navCards.map((card, i) => (
            <MotionLink
              key={card.to}
              to={card.to}
              variants={reduced ? {} : CELL}
              whileHover={reduced ? {} : {
                y: -4,
                boxShadow: HOVER_BOX_SHADOW,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              style={{
                ...CARD,
                gridArea: `nav${i + 1}`,
                padding: "26px 30px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "116px",
              }}
            >
              <span style={{
                fontSize: "11px", fontWeight: "500",
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#ccc",
              }}>
                {card.num}
              </span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "17px", fontWeight: 600, color: "#111", letterSpacing: "-0.01em" }}>
                  {card.label}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#c8c8c8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </MotionLink>
          ))}

        </motion.div>
      </div>
    </motion.div>
  );
}
