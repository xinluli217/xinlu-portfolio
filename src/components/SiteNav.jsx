import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle.jsx";

export default function SiteNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { key: "nav.projects", to: "/projects" },
    { key: "nav.about",    to: "/about" },
    { key: "nav.connect",  to: "/connect" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "0 40px", height: "58px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{
          fontSize: "14px", fontWeight: "600",
          color: "#111", textDecoration: "none",
          letterSpacing: "-0.01em",
        }}>
          {t("brand.name")}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {navItems.map(item => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link"
                style={{
                  fontSize: "13px",
                  fontWeight: active ? "500" : "400",
                  color: active ? "#111" : "#888",
                  textDecoration: "none",
                }}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
