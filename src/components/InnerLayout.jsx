import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle.jsx";

export default function InnerLayout({ children, wide = false }) {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { key: "nav.projects", to: "/projects" },
    { key: "nav.about",    to: "/about"    },
    { key: "nav.connect",  to: "/connect"  },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 md:p-8">
      <div
        className="w-full bg-white overflow-hidden"
        style={{
          maxWidth: wide ? "56rem" : "42rem",
          borderRadius: "24px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
          minHeight: "540px",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pt-6 pb-0 gap-3"
          style={{ padding: wide ? "24px 40px 0" : "24px 28px 0" }}>
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-60 flex-shrink-0"
            style={{ color: "#1a1a1a" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L9.6 6.2H14.6L10.5 9L12.1 13.7L8 11L3.9 13.7L5.5 9L1.4 6.2H6.4L8 1.5Z" fill="#c9a84c" />
            </svg>
            {t("brand.name")}
          </Link>

          {/* Nav + toggle */}
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[13px] transition-all duration-150 whitespace-nowrap"
                  style={{
                    color: active ? "#1a1a1a" : "#9a9a9a",
                    fontWeight: active ? "500" : "400",
                    textDecoration: active ? "underline" : "none",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <LanguageToggle />
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: wide ? "20px 40px 32px" : "20px 28px 28px" }}>{children}</div>
      </div>
    </div>
  );
}
