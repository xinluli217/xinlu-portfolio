import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isEN = i18n.language === "en";

  function toggle() {
    i18n.changeLanguage(isEN ? "zh" : "en");
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      className="flex items-center gap-0 rounded-full overflow-hidden border text-[12px] font-medium select-none"
      style={{
        borderColor: "#ebebeb",
        background: "#f5f5f5",
        height: "26px",
      }}
      title="Switch language"
    >
      <span
        className="px-2.5 h-full flex items-center transition-colors duration-150"
        style={{
          color: isEN ? "#1a1a1a" : "#c8c8c8",
          background: isEN ? "#ffffff" : "transparent",
          boxShadow: isEN ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          borderRadius: "9999px",
        }}
      >
        EN
      </span>
      <span
        className="px-2.5 h-full flex items-center transition-colors duration-150"
        style={{
          color: !isEN ? "#1a1a1a" : "#c8c8c8",
          background: !isEN ? "#ffffff" : "transparent",
          boxShadow: !isEN ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          borderRadius: "9999px",
        }}
      >
        中
      </span>
    </motion.button>
  );
}
