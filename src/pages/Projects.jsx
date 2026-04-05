import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects.js";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import { EASE } from "../motion/variants.js";

const MotionLink = motion.create(Link);

const CARD_SHADOW      = "0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)";
const CARD_SHADOW_HOVER = "0 10px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.04)";

export default function Projects() {
  const { t }   = useTranslation();
  const reduced = useReducedMotion();

  return (
    <InnerLayout>
      <PageTransition>

        <h1 style={{
          fontSize: "48px", fontWeight: 700,
          letterSpacing: "-0.025em", color: "#111",
          lineHeight: 1.06, margin: "0 0 48px",
        }}>
          {t("page.projects.title")}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {projects.map((project, i) => (
            <MotionLink
              key={project.id}
              to={`/projects/${project.id}`}
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, ease: EASE, delay: i * 0.08 }}
              whileHover={reduced ? {} : {
                y: -4,
                boxShadow: CARD_SHADOW_HOVER,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              style={{
                display: "block",
                background: "#f5f5f5",
                borderRadius: "24px",
                padding: "40px 44px",
                textDecoration: "none",
                boxShadow: CARD_SHADOW,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px" }}>
                <div style={{ flex: 1 }}>

                  {/* Meta row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: "500",
                      fontFamily: "monospace", letterSpacing: "0.06em", color: "#ccc",
                    }}>
                      {project.meta}
                    </span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "11px", fontWeight: "500",
                          padding: "3px 10px", borderRadius: "20px",
                          background: "#ebebeb", color: "#777",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 style={{
                    fontSize: "22px", fontWeight: 700,
                    color: "#111", margin: "0 0 10px",
                    letterSpacing: "-0.02em", lineHeight: 1.2,
                  }}>
                    {t(`project.${project.id}.title`)}
                  </h2>

                  <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#777", margin: 0 }}>
                    {t(`project.${project.id}.insight`)}
                  </p>

                </div>

                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: "3px" }}>
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </MotionLink>
          ))}
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
