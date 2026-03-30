/**
 * SectionLabel
 *
 * Shared uppercase micro-label used above content sections throughout the site.
 * Appears in: ProjectDetail (4×), About timeline (4×), About tools (1×).
 *
 * Props:
 *   children  — label text (already translated by the caller via t())
 *   className — Tailwind margin override; defaults to "mb-1.5"
 *               Pass e.g. "mb-0.5" or "mb-3" to adjust per-context spacing.
 */
export default function SectionLabel({ children, className = "mb-1.5" }) {
  return (
    <p
      className={`text-[10px] font-bold tracking-widest uppercase ${className}`}
      style={{ color: "#c8c8c8" }}
    >
      {children}
    </p>
  );
}
