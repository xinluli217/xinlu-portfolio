import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle.jsx";

export default function Home() {
  const { t } = useTranslation();

  const navLinks = [
    { key: "nav.projects", to: "/projects" },
    { key: "nav.about",    to: "/about"    },
    { key: "nav.connect",  to: "/connect"  },
  ];

  // Split greeting on literal \n so it renders two lines
  const greetingLines = t("hero.greeting").split("\n");
  const roleLines     = t("hero.role").split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(20,20,18,0.18)" }}
    >
      <div
        className="w-full max-w-2xl bg-white relative overflow-hidden"
        style={{
          borderRadius: "28px",
          boxShadow: "0 4px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          minHeight: "420px",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-7 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L9.6 6.2H14.6L10.5 9L12.1 13.7L8 11L3.9 13.7L5.5 9L1.4 6.2H6.4L8 1.5Z" fill="#c9a84c" />
            </svg>
            <span className="text-[13px] text-[#1a1a1a] font-medium">{t("brand.name")}</span>
          </div>

          {/* Year + toggle */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <span className="text-[13px] text-[#9a9a9a]">{t("brand.year")}</span>
          </div>
        </div>

        {/* Main content — 2-column */}
        <div className="flex items-center justify-between px-8 pt-10 pb-4 gap-6">
          {/* Left: headline */}
          <div className="flex-1">
            <h1
              className="text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em]"
              style={{ fontWeight: 800, color: "#1a1a1a" }}
            >
              {greetingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < greetingLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>

          {/* Right: circular photo */}
          <div className="flex-shrink-0">
            <div
              className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            >
              {/* Replace this div with <img src="your-photo.jpg" className="w-full h-full object-cover" /> */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #e8e0d0 0%, #d4c8b4 100%)" }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a89878" strokeWidth="1.2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-8 pb-8 mt-2">
          {/* Left: pill + nav links */}
          <div className="flex flex-col gap-4">
            <div
              className="h-1.5 rounded-full"
              style={{ width: "80px", background: "#ebebeb" }}
            />
            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group text-[13px] font-medium text-[#9a9a9a] transition-colors duration-150 hover:text-[#1a1a1a]"
                >
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-0 group-hover:w-3 transition-all duration-200 overflow-hidden text-[#c9a84c]">
                      →
                    </span>
                    {t(link.key)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: role */}
          <p className="text-[13px] text-[#9a9a9a] text-right leading-snug">
            {roleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < roleLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
