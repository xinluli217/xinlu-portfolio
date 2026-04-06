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
        borderColor: "#E5DFD6",
        background: "#F5F0E8",
        height: "26px",
      }}
      title="Switch language"
    >
      <span
        className="px-2.5 h-full flex items-center transition-colors duration-150"
        style={{
          color: isEN ? "#2C2A28" : "#C4BDB4",
          background: isEN ? "#FFFFFF" : "transparent",
          boxShadow: isEN ? "0 1px 4px rgba(44,42,40,0.08)" : "none",
          borderRadius: "9999px",
        }}
      >
        EN
      </span>
      <span
        className="px-2.5 h-full flex items-center transition-colors duration-150"
        style={{
          color: !isEN ? "#2C2A28" : "#C4BDB4",
          background: !isEN ? "#FFFFFF" : "transparent",
          boxShadow: !isEN ? "0 1px 4px rgba(44,42,40,0.08)" : "none",
          borderRadius: "9999px",
        }}
      >
        中
      </span>
    </motion.button>
  );
}
