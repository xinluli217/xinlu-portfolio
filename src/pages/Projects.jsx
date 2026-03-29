import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import { projects } from "../data/projects.js";

function TagPill({ label }) {
  return (
    <span
      className="text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: "#f5f4f0", color: "#6a6a6a" }}
    >
      {label}
    </span>
  );
}

export default function Projects() {
  const { t } = useTranslation();

  return (
    <InnerLayout>
      <PageTransition>
        <h2
          className="text-[22px] font-bold mb-6"
          style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
        >
          {t("page.projects.title")}
        </h2>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block group py-5 border-t border-[#f0f0f0] last:border-b transition-colors duration-150 hover:bg-[#fafaf8] -mx-2 px-2 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[11px] font-mono" style={{ color: "#c8c8c8" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-[15px] font-semibold leading-snug group-hover:text-[#c9a84c] transition-colors duration-150"
                      style={{ color: "#1a1a1a" }}
                    >
                      {t(`project.${project.id}.title`)}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-relaxed mb-3 pl-7" style={{ color: "#9a9a9a" }}>
                    {t(`project.${project.id}.insight`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pl-7">
                    {project.tags.map((tag) => (
                      <TagPill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
                <svg
                  width="7" height="12" viewBox="0 0 7 12" fill="none"
                  className="flex-shrink-0 mt-1 opacity-20 group-hover:opacity-60 transition-opacity"
                >
                  <path d="M1 1l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </PageTransition>
    </InnerLayout>
  );
}
