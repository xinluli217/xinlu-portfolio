import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

const tools = [
  "Python", "R", "ArcGIS Pro", "QGIS", "Google Earth Engine",
  "PostGIS", "Scikit-learn", "GeoPandas", "Mapbox GL", "D3.js",
];

const TIMELINE_KEYS = ["t0", "t1", "t2", "t3"];

export default function About() {
  const { t } = useTranslation();

  return (
    <InnerLayout>
      <PageTransition>
        <h2
          className="text-[22px] font-bold mb-1"
          style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
        >
          {t("page.about.title")}
        </h2>
        <p className="text-[13px] mb-6" style={{ color: "#9a9a9a" }}>
          {t("page.about.subtitle")}
        </p>

        {/* Statement */}
        <p className="text-[15px] leading-relaxed mb-7" style={{ color: "#3a3a3a" }}>
          {t("page.about.statement")}
        </p>

        <div className="h-px bg-[#f0f0f0] mb-6" />

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-[5px] top-2 bottom-2 w-px"
            style={{ background: "#ebebeb" }}
          />
          <div className="space-y-5 pl-6">
            {TIMELINE_KEYS.map((key) => (
              <div key={key} className="relative">
                <div
                  className="absolute -left-[19px] top-[5px] w-[9px] h-[9px] rounded-full"
                  style={{ background: "#c9a84c", border: "2px solid white" }}
                />
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: "#c8c8c8" }}
                >
                  {t(`about.${key}.period`)}
                </p>
                <p className="text-[14px] font-semibold mb-0.5" style={{ color: "#1a1a1a" }}>
                  {t(`about.${key}.title`)}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#9a9a9a" }}>
                  {t(`about.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#f0f0f0] my-6" />

        {/* Tools */}
        <p
          className="text-[10px] font-bold tracking-widest uppercase mb-3"
          style={{ color: "#c8c8c8" }}
        >
          {t("page.about.tools_label")}
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[12px] font-medium px-2.5 py-1 rounded-lg"
              style={{ background: "#f5f4f0", color: "#3a3a3a" }}
            >
              {tool}
            </span>
          ))}
        </div>
      </PageTransition>
    </InnerLayout>
  );
}
