import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition.jsx";
import InnerLayout from "../components/InnerLayout.jsx";
import SectionLabel from "../components/SectionLabel.jsx";

// ─── SVG chart placeholders (one per notebook section) ───────────────────────

const CHARTS = {
  data: () => (
    <svg viewBox="0 0 220 120" className="w-full h-full">
      {["orders","customers","items","payments","products"].map((t,i) => (
        <g key={t}>
          <rect x={16 + i*40} y={90 - [55,70,45,60,50][i]} width="28" height={[55,70,45,60,50][i]}
            rx="3" fill={i===0?"#c9a84c":"#e8e0d0"} opacity=".85"/>
          <text x={30 + i*40} y="106" textAnchor="middle" fontSize="7" fill="#c8c8c8" fontFamily="system-ui">{t}</text>
        </g>
      ))}
      <line x1="14" y1="91" x2="212" y2="91" stroke="#ebebeb" strokeWidth="1"/>
      <text x="110" y="118" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">5 datasets merged → 100K+ rows</text>
    </svg>
  ),
  eda: () => {
    const months = [12,18,22,28,35,42,38,44,52,48,56,62];
    const maxV = 65;
    return (
      <svg viewBox="0 0 220 120" className="w-full h-full">
        <line x1="18" y1="10" x2="18" y2="95" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="18" y1="95" x2="215" y2="95" stroke="#ebebeb" strokeWidth="1"/>
        {months.map((v,i) => {
          const x = 22 + i * 16;
          const h = (v/maxV) * 80;
          return <rect key={i} x={x} y={95-h} width="12" height={h} rx="2"
            fill="#a8c8d4" opacity={.6 + i*.03}/>;
        })}
        <text x="116" y="112" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">Monthly GMV — strong upward trend</text>
      </svg>
    );
  },
  rfm: () => {
    const segs = [["Champions","#c9a84c",82],["Loyal","#d4ba7a",65],["At Risk","#e9d4a8",50],["Hibernating","#d4cdc4",38],["Lost","#ebebeb",25]];
    return (
      <svg viewBox="0 0 220 130" className="w-full h-full">
        <line x1="74" y1="8" x2="74" y2="112" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="74" y1="112" x2="215" y2="112" stroke="#ebebeb" strokeWidth="1"/>
        {segs.map(([label,color,pct],i) => (
          <g key={label}>
            <text x="70" y={20+i*21} textAnchor="end" fontSize="8.5" fill="#9a9a9a" fontFamily="system-ui">{label}</text>
            <rect x="76" y={10+i*21} width={(pct/100)*132} height="14" rx="2" fill={color}/>
            <text x={80+(pct/100)*132} y={20+i*21} fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">{pct}%</text>
          </g>
        ))}
        <text x="144" y="126" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">Share of customer base</text>
      </svg>
    );
  },
  kmeans: () => {
    const clusters = [
      {cx:68,cy:45,r:22,color:"#c9a84c",label:"High Value"},
      {cx:145,cy:38,r:16,color:"#a8c8d4",label:"Loyalists"},
      {cx:80,cy:82,r:18,color:"#e9d4a8",label:"At Risk"},
      {cx:160,cy:80,r:12,color:"#d4cdc4",label:"Lost"},
    ];
    return (
      <svg viewBox="0 0 220 120" className="w-full h-full">
        <line x1="18" y1="10" x2="18" y2="98" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="18" y1="98" x2="210" y2="98" stroke="#ebebeb" strokeWidth="1"/>
        {clusters.map(c => (
          <g key={c.label}>
            <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} opacity=".5"/>
            <text x={c.cx} y={c.cy+3} textAnchor="middle" fontSize="7" fill="#3a3a3a" fontFamily="system-ui" fontWeight="500">{c.label}</text>
          </g>
        ))}
        <text x="10" y="60" fontSize="7" fill="#c8c8c8" fontFamily="system-ui" transform="rotate(-90,10,60)">Monetary</text>
        <text x="114" y="112" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">Recency → k=4, silhouette-validated</text>
      </svg>
    );
  },
  cohort: () => {
    const rows = [[100,9,6,4,3,3],[100,8,6,4,3,null],[100,10,6,4,null,null],[100,9,5,null,null,null],[100,7,null,null,null,null]];
    const labels = ["Q1","Q2","Q3","Q4","Q1'18"];
    const fill = v => v===null?"#f7f6f2":v===100?"#1a1a1a":v>=8?"#c9a84c":v>=5?"#e9d4a8":"#f0ebe0";
    const ink  = v => v===null?"transparent":v===100||v>=8?"white":"#9a9a9a";
    return (
      <svg viewBox="0 0 220 120" className="w-full h-full">
        {rows.map((row,r) => (
          <g key={r}>
            <text x="27" y={14+r*20+10} textAnchor="end" fontSize="7.5" fill="#9a9a9a" fontFamily="system-ui">{labels[r]}</text>
            {row.map((v,c) => (
              <g key={c}>
                <rect x={30+c*31} y={6+r*20} width="29" height="16" rx="2" fill={fill(v)}/>
                {v!==null && <text x={30+c*31+14.5} y={6+r*20+11} textAnchor="middle" fontSize="7" fill={ink(v)} fontFamily="system-ui">{v===100?"100":v+"%"}</text>}
              </g>
            ))}
          </g>
        ))}
        {["M0","M1","M2","M3","M4","M5"].map((m,c)=>(
          <text key={c} x={30+c*31+14.5} y="112" textAnchor="middle" fontSize="7" fill="#c8c8c8" fontFamily="system-ui">{m}</text>
        ))}
      </svg>
    );
  },
  churn: () => {
    const rf = "18,100 30,72 48,52 72,36 108,24 152,17 195,14";
    const lr = "18,100 38,80 65,63 92,50 130,40 168,33 195,28";
    return (
      <svg viewBox="0 0 220 120" className="w-full h-full">
        <line x1="18" y1="10" x2="18" y2="100" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="18" y1="100" x2="200" y2="100" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="18" y1="100" x2="200" y2="10" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="4,3"/>
        <polygon points={`18,100 ${rf} 200,100`} fill="#c9a84c" opacity=".07"/>
        <polyline points={lr} fill="none" stroke="#e9d4a8" strokeWidth="1.8" strokeLinejoin="round"/>
        <polyline points={rf} fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinejoin="round"/>
        <text x="55" y="38" fontSize="8" fill="#c9a84c" fontFamily="system-ui" fontWeight="500">RF  AUC=0.84</text>
        <text x="120" y="62" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">LR  AUC=0.76</text>
        <text x="110" y="114" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">False Positive Rate →</text>
      </svg>
    );
  },
  revenue: () => {
    const bars=[42,22,14,9,6,4,2,1]; let cum=0;
    const pts=bars.map((b,i)=>{cum+=b; return `${24+i*23+10},${96-(cum/104)*82}`;});
    return (
      <svg viewBox="0 0 220 120" className="w-full h-full">
        <line x1="20" y1="14" x2="20" y2="96" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="20" y1="96" x2="210" y2="96" stroke="#ebebeb" strokeWidth="1"/>
        <line x1="20" y1={96-0.8*82} x2="210" y2={96-0.8*82} stroke="#ebebeb" strokeWidth="1" strokeDasharray="4,3"/>
        <text x="17" y={96-0.8*82-2} textAnchor="end" fontSize="7" fill="#c8c8c8" fontFamily="system-ui">80%</text>
        {bars.map((b,i)=>(
          <rect key={i} x={24+i*23} y={96-(b/44)*82} width="19" height={(b/44)*82} rx="2" fill="#a8c8d4" opacity=".75"/>
        ))}
        <polyline points={pts.join(" ")} fill="none" stroke="#c9a84c" strokeWidth="2.2" strokeLinejoin="round"/>
        <text x="115" y="112" textAnchor="middle" fontSize="7.5" fill="#c8c8c8" fontFamily="system-ui">Customer decile — top 20% → ~80% revenue</text>
      </svg>
    );
  },
};

// ─── Small shared components ─────────────────────────────────────────────────

function Divider() {
  return <div className="h-px my-5" style={{ background: "#f0f0f0" }} />;
}

function TagPill({ children }) {
  return (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
      style={{ background: "#f5f4f0", color: "#6a6a6a" }}>
      {children}
    </span>
  );
}

function ActionBtn({ href, download, primary, children }) {
  return (
    <a href={href} download={download || undefined}
      target={download ? "_self" : "_blank"} rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-lg transition-all duration-150 hover:opacity-80"
      style={primary
        ? { background: "#f5ead8", color: "#c9a84c", border: "1px solid #e8d8b8" }
        : { background: "#fafaf8", color: "#6a6a6a", border: "1px solid #ebebeb" }}>
      {children}
    </a>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: "#fafaf9", border: "1px solid #f0f0f0" }}>
      <p className="text-[20px] font-bold leading-none mb-1" style={{ color: "#1a1a1a", letterSpacing: "-0.03em" }}>{value}</p>
      <p className="text-[12px] font-medium mb-0.5" style={{ color: "#3a3a3a" }}>{label}</p>
      {sub && <p className="text-[10.5px]" style={{ color: "#9a9a9a" }}>{sub}</p>}
    </div>
  );
}

// ─── Story section: left text + right chart ──────────────────────────────────

function StorySection({ section, index }) {
  const Chart = CHARTS[section.chart];
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="py-5 border-t"
      style={{ borderColor: "#f0f0f0" }}
    >
      <div className="flex gap-5 items-start">
        {/* Left — text */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#c8c8c8" }}>
            {section.title}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "#3a3a3a" }}>
            {section.body}
          </p>
          {section.snippet && (
            <button
              onClick={() => setShowCode(v => !v)}
              className="mt-2.5 text-[11px] font-medium transition-opacity hover:opacity-60 flex items-center gap-1"
              style={{ color: "#9a9a9a" }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="5 3 10 8 5 13"/>
              </svg>
              {showCode ? "Hide code" : "View code"}
            </button>
          )}
          <AnimatePresence>
            {showCode && section.snippet && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <pre className="mt-2 rounded-lg overflow-x-auto text-[10.5px] leading-relaxed p-3"
                  style={{ background: "#f5f4f0", color: "#3a3a3a", fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
                  {section.snippet}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — chart */}
        {Chart && (
          <div className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: "180px", height: "130px", background: "#fafaf9", border: "1px solid #ebebeb", padding: "10px" }}>
            <Chart />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Notebook iframe panel ───────────────────────────────────────────────────

function NotebookPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #ebebeb" }}>
      {/* header row */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: "#fafaf9", borderBottom: open ? "1px solid #ebebeb" : "none" }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {["#ffbf57","#57c4ff","#57ff8a"].map((c,i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }}/>
            ))}
          </div>
          <span className="text-[11px] font-mono" style={{ color: "#9a9a9a" }}>
            olist_customer_intelligence.ipynb
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ActionBtn href="/olist_notebook.html" primary>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View full
          </ActionBtn>
          <ActionBtn href="/olist_customer_intelligence.ipynb" download>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            .ipynb
          </ActionBtn>
          <button
            onClick={() => setOpen(v => !v)}
            className="text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-all hover:opacity-70"
            style={{ color: "#6a6a6a", background: "#f0f0f0" }}>
            {open ? "Collapse ↑" : "Preview ↓"}
          </button>
        </div>
      </div>

      {/* iframe */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 480 }} exit={{ height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <iframe
              src="/olist_notebook.html"
              title="Olist notebook preview"
              className="w-full border-0"
              style={{ height: "480px", display: "block" }}
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const TAGS = ["Python", "Machine Learning", "Customer Analytics"];

export default function OlistDetail() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/olist_sections.json")
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <InnerLayout>
      <PageTransition>

        {/* ── Back ── */}
        <Link to="/projects"
          className="inline-flex items-center gap-1.5 text-[13px] mb-5 transition-opacity hover:opacity-60"
          style={{ color: "#c9a84c" }}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 12L1 6.5 7 1" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t("detail.back")}
        </Link>

        {/* ── Header ── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {TAGS.map(tag => <TagPill key={tag}>{tag}</TagPill>)}
          </div>
          <h1 className="text-[21px] font-bold leading-snug mb-2"
            style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}>
            Olist Customer Intelligence &amp; Churn Prevention
          </h1>
          <p className="text-[13.5px] leading-relaxed mb-4" style={{ color: "#6a6a6a" }}>
            {data?.subtitle ?? "97% of customers buy only once — an end-to-end ML pipeline to predict who's about to leave, segment who's worth saving, and quantify the cost of doing nothing."}
          </p>

          {/* ── Stats ── */}
          {data?.stats && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {data.stats.map(s => <StatCard key={s.value} {...s}/>)}
            </div>
          )}
        </div>

        <Divider />

        {/* ── Data story sections ── */}
        <div className="mb-1">
          <SectionLabel className="mb-0">Analysis</SectionLabel>
          {data?.sections
            ? data.sections.map((s, i) => <StorySection key={s.id} section={s} index={i}/>)
            : <p className="text-[13px] py-6 text-center" style={{ color: "#c8c8c8" }}>Loading…</p>
          }
        </div>

        <Divider />

        {/* ── Notebook embed ── */}
        <SectionLabel className="mb-3">Notebook</SectionLabel>
        <NotebookPanel />

      </PageTransition>
    </InnerLayout>
  );
}
