import SiteNav from "./SiteNav.jsx";

export default function InnerLayout({ children, wide = false }) {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <SiteNav />
      <main style={{
        maxWidth: wide ? "1100px" : "860px",
        margin: "0 auto",
        padding: "60px 40px 96px",
      }}>
        {children}
      </main>
    </div>
  );
}
