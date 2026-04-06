import { useTranslation } from "react-i18next";

const EMAIL_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const LINKEDIN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GITHUB_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const DOWNLOAD_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/**
 * Contact / links block (formerly the Connect page), embedded on About.
 */
export default function ConnectSection() {
  const { t, i18n } = useTranslation();
  const resumeFile = i18n.language === "zh" ? "/Xinlu.Li_cv_CN.pdf" : "/Xinlu.Li_cv_EN.pdf";

  const links = [
    {
      label: t("connect.email.label"),
      value: t("connect.email.value"),
      href: "mailto:xinluli217@gmail.com",
      icon: EMAIL_ICON,
    },
    {
      label: t("connect.linkedin.label"),
      value: t("connect.linkedin.value"),
      href: "https://www.linkedin.com/in/xinlu-li-39386a3a6",
      icon: LINKEDIN_ICON,
    },
    {
      label: t("connect.github.label"),
      value: t("connect.github.value"),
      href: "https://github.com/xinluli217",
      icon: GITHUB_ICON,
    },
    {
      label: t("connect.resume.label"),
      value: t("connect.resume.value"),
      href: resumeFile,
      icon: DOWNLOAD_ICON,
      download: true,
    },
  ];

  return (
    <section id="connect" aria-labelledby="about-connect-heading">
      <h2
        id="about-connect-heading"
        style={{
          fontSize: "48px", fontWeight: 700,
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
          letterSpacing: "-0.025em", color: "#2C2A28",
          lineHeight: 1.06, margin: "0 0 12px",
        }}
      >
        {t("page.connect.title")}
      </h2>
      <p style={{ fontSize: "15px", color: "#6B6560", margin: "0 0 52px" }}>
        {t("page.connect.subtitle")}
      </p>

      <div>
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target={link.download ? "_self" : "_blank"}
            rel="noopener noreferrer"
            {...(link.download ? { download: true } : {})}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px 0",
              borderTop: i === 0 ? "none" : "1px solid #E5DFD6",
              textDecoration: "none",
              cursor: "pointer",
              transition: "opacity 0.18s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              border: "1px solid #E5DFD6",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6B6560", flexShrink: 0,
            }}>
              {link.icon}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: "11px", fontWeight: "500",
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#9E9790", margin: "0 0 3px",
              }}>
                {link.label}
              </p>
              <p style={{
                fontSize: "15px", fontWeight: "500",
                color: "#2C2A28", margin: 0,
                letterSpacing: "-0.01em",
              }}>
                {link.value}
              </p>
            </div>

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(44,42,40,0.22)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        ))}
      </div>

      <p style={{
        fontSize: "12px", textAlign: "center",
        color: "#C4BDB4", marginTop: "64px",
      }}>
        {t("page.connect.footer")}
      </p>
    </section>
  );
}
