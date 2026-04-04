import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

const TOOLS = [
  "Python", "R", "QGIS", "Google Earth Engine",
  "PostGIS", "Scikit-learn", "GeoPandas", "Mapbox GL", "D3.js",
];

const TIMELINE_KEYS = ["t0", "t1", "t2", "t3"];

const DIV = (
  <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "48px 0" }} />
);

export default function About() {
  const { t } = useTranslation();

  return (
    <InnerLayout>
      <PageTransition>

        {/* Header */}
        <h1 style={{
          fontSize: "48px", fontWeight: 700,
          letterSpacing: "-0.025em", color: "#111",
          lineHeight: 1.06, margin: "0 0 32px",
        }}>
          {t("page.about.title")}
        </h1>

        {/* Statement */}
        <p style={{
          fontSize: "18px", lineHeight: 1.72,
          color: "#4a4a4a", margin: 0,
          maxWidth: "640px",
          letterSpacing: "-0.005em",
        }}>
          {t("page.about.statement")}
        </p>

        {DIV}

        {/* Timeline */}
        <div>
          {TIMELINE_KEYS.map((key, i) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "32px",
                padding: "32px 0",
                borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.07)",
                alignItems: "start",
              }}
            >
              {/* Period */}
              <p style={{
                fontSize: "11px", fontWeight: "500",
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#b0a898", margin: 0, paddingTop: "3px",
              }}>
                {t(`about.${key}.period`)}
              </p>

              {/* Content */}
              <div>
                <p style={{
                  fontSize: "16px", fontWeight: 600,
                  color: "#111", margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}>
                  {t(`about.${key}.title`)}
                </p>
                <p style={{
                  fontSize: "14.5px", lineHeight: 1.68,
                  color: "#777", margin: 0,
                }}>
                  {t(`about.${key}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {DIV}

        {/* Tools */}
        <div>
          <p style={{
            fontSize: "11px", fontWeight: "500",
            letterSpacing: "0.09em", textTransform: "uppercase",
            color: "#b0a898", margin: "0 0 16px",
          }}>
            {t("page.about.tools_label")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{
                fontSize: "13px", fontWeight: "500",
                padding: "6px 14px", borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                color: "#444",
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>

      </PageTransition>
    </InnerLayout>
  );
}
