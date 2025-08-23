import { useState, useEffect } from "react";
import "./App.css";
import Flowchart from "./components/Flowchart";
import IA from "./components/IA";
import Wireframe from "./components/Wireframe";

export default function App() {
  // URL 해시에서 현재 탭을 읽어오는 함수
  const getInitialTab = () => {
    const hash = window.location.hash.replace("#", "");
    return hash || "ia"; // 해시가 없으면 기본은 ia
  };

  const [active, setActive] = useState(getInitialTab);

  // 해시 변경 감지 → active 갱신
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActive(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img src="./images/logo.png" alt="DesignHub logo" />
          </div>

          <div className="tabs">
            <button
              onClick={() => (window.location.hash = "ia")}
              className={`tab-btn ${active === "ia" ? "tab-active" : ""}`}
            >
              IA
            </button>

            <button
              onClick={() => (window.location.hash = "flowchart")}
              className={`tab-btn ${active === "flowchart" ? "tab-active" : ""}`}
            >
              Flowchart
            </button>

            <button
              onClick={() => (window.location.hash = "wireframe")}
              className={`tab-btn ${active === "wireframe" ? "tab-active" : ""}`}
            >
              Wireframe
            </button>
          </div>
        </div>
      </nav>

      <main className="container">
        {active === "ia" && <IA />}
        {active === "flowchart" && <Flowchart />}
        {active === "wireframe" && <Wireframe />}
      </main>
    </div>
  );
}
