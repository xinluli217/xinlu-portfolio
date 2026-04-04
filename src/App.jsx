import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Each page is a separate JS chunk — loaded only when that route is first visited.
// Home is still fetched immediately on app start (it's the entry route),
// but About / Connect / Projects / ProjectDetail are deferred until navigation.
const Home          = lazy(() => import("./pages/Home.jsx"));
const Projects      = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const OlistDetail   = lazy(() => import("./pages/OlistDetail.jsx"));
const AirbnbDetail  = lazy(() => import("./pages/AirbnbDetail.jsx"));
const PluginSystem  = lazy(() => import("./pages/PluginSystem.jsx"));
const About         = lazy(() => import("./pages/About.jsx"));
const Connect       = lazy(() => import("./pages/Connect.jsx"));

// Minimal fallback — a single pulsing gold dot so there's no jarring blank flash
// while the chunk loads. Matches the app background so it feels seamless.
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#f7f6f2" }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: "#c9a84c", opacity: 0.6 }}
      />
    </div>
  );
}

// Suspense wraps the entire route tree so any lazy page that hasn't loaded yet
// shows PageLoader. AnimatePresence is inside Suspense so transitions still work
// correctly once the chunk resolves.
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<Home />} />
          <Route path="/projects"             element={<Projects />} />
          <Route path="/projects/olist-churn"   element={<OlistDetail />} />
          <Route path="/projects/airbnb-london" element={<AirbnbDetail />} />
          <Route path="/projects/plugin-system"  element={<PluginSystem />} />
          <Route path="/projects/:id"         element={<ProjectDetail />} />
          <Route path="/about"       element={<About />} />
          <Route path="/connect"     element={<Connect />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
