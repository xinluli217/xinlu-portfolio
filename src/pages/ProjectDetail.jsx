import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
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
    <InnerLayout wide>
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
          <p className="text-[14px] leading-relaxed mb-3" style={{ color: "#6a6a6a" }}>
            {t(`project.${id}.insight`)}
          </p>

          {/* Live tool link — only shown for projects with a demoUrl */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-60"
              style={{ color: "#c9a84c" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t("detail.demo")}
            </a>
          )}
        </div>

        <div className="h-px bg-[#f0f0f0] mb-5" />

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.key}>
              <SectionLabel>{t(s.labelKey)}</SectionLabel>
              <p className="text-[15px] leading-relaxed" style={{ color: "#3a3a3a" }}>
                {t(`project.${id}.${s.key}`)}
              </p>
            </div>
          ))}
        </div>
      </PageTransition>
    </InnerLayout>
  );
}
