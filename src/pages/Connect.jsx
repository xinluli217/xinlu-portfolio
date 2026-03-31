import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";

const EMAIL_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GITHUB_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3v10m0 0l-4-4m4 4l4-4M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function Connect() {
  const { t, i18n } = useTranslation();
  const resumeFile = i18n.language === "zh"
    ? "/Xinlu.Li_cv_CN.pdf"
    : "/Xinlu.Li_cv_EN.pdf";

  const links = [
    {
      labelKey: "connect.email.label",
      valueKey: "connect.email.value",
      href: "mailto:xinluli217@gmail.com",
      icon: EMAIL_ICON,
    },
    {
      labelKey: "connect.linkedin.label",
      valueKey: "connect.linkedin.value",
      href: "https://www.linkedin.com/in/xinlu-li-39386a3a6",
      icon: LINKEDIN_ICON,
    },
    {
      labelKey: "connect.github.label",
      valueKey: "connect.github.value",
      href: "https://github.com/xinluli217",
      icon: GITHUB_ICON,
    },
    {
      labelKey: "connect.resume.label",
      valueKey:  "connect.resume.value",
      href: resumeFile,
      download: true,
      icon: <DownloadIcon />,
    },
  ];

  return (
    <InnerLayout>
      <PageTransition>
        <h2
          className="text-[22px] font-bold mb-1"
          style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
        >
          {t("page.connect.title")}
        </h2>
        <p className="text-[13px] mb-6" style={{ color: "#9a9a9a" }}>
          {t("page.connect.subtitle")}
        </p>

        <div className="space-y-0">
          {links.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              target={link.download ? "_self" : "_blank"}
              rel="noopener noreferrer"
              {...(link.download ? { download: true } : {})}
              className="group flex items-center gap-3.5 py-4 border-t border-[#f0f0f0] last:border-b -mx-2 px-2 rounded-lg transition-colors duration-150 hover:bg-[#fafaf8]"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#f5f4f0", color: "#6a6a6a" }}
              >
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#c8c8c8" }}>
                  {t(link.labelKey)}
                </p>
                <p
                  className="text-[14px] font-medium truncate group-hover:text-[#c9a84c] transition-colors duration-150"
                  style={{ color: "#1a1a1a" }}
                >
                  {t(link.valueKey)}
                </p>
              </div>
              <svg
                width="7" height="12" viewBox="0 0 7 12" fill="none"
                className="flex-shrink-0 opacity-20 group-hover:opacity-50 transition-opacity"
              >
                <path d="M1 1l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>

        <p className="text-[12px] text-center mt-8" style={{ color: "#c8c8c8" }}>
          {t("page.connect.footer")}
        </p>
      </PageTransition>
    </InnerLayout>
  );
}
