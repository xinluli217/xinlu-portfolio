import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import { projects } from "../data/projects.js";

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  const project = projects.find((p) => p.id === id);

  const sections = [
    { key: "problem", labelKey: "detail.problem" },
    { key: "method",  labelKey: "detail.method"  },
    { key: "finding", labelKey: "detail.insight"  },
    { key: "impact",  labelKey: "detail.impact"  },
  ];

  if (!project) {
    return (
      <InnerLayout>
        <p style={{ color: "#9a9a9a" }}>Project not found.</p>
      </InnerLayout>
    );
  }

  return (
    <InnerLayout>
      <PageTransition>
        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-[13px] mb-5 transition-opacity hover:opacity-60"
          style={{ color: "#c9a84c" }}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("detail.back")}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                style={{ background: "#f5f4f0", color: "#6a6a6a" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="text-[24px] font-bold leading-tight mb-2"
            style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
          >
            {t(`project.${id}.title`)}
          </h1>
          <p className="text-[14px] leading-relaxed" style={{ color: "#6a6a6a" }}>
            {t(`project.${id}.insight`)}
          </p>
        </div>

        <div className="h-px bg-[#f0f0f0] mb-5" />

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((s) => (
            <div key={s.key}>
              <p
                className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                style={{ color: "#c8c8c8" }}
              >
                {t(s.labelKey)}
              </p>
              <p className="text-[14px] leading-relaxed" style={{ color: "#3a3a3a" }}>
                {t(`project.${id}.${s.key}`)}
              </p>
            </div>
          ))}
        </div>
      </PageTransition>
    </InnerLayout>
  );
}
