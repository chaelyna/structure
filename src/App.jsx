import { useState } from "react";
import "./App.css";
import FlowChart from "./components/Flowchart";
import IA from "./components/IA";
import Wireframe from "./components/Wireframe";

export default function App() {
  // 스샷처럼 시작 탭을 Wireframe으로 보고 싶다면 "wireframe"
  const [active, setActive] = useState("wireframe");

  return (
    <div className="app">
      {/* 상단 탭 네비게이션 */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            {/* 이미지 경로는 요청대로 ./images/... */}
            <img src="./images/logo.png" alt="DesignHub logo" />
          </div>

          <div className="tabs">
            <button
              onClick={() => setActive("flowchart")}
              className={`tab-btn ${active === "flowchart" ? "tab-active" : ""}`}
            >
              Flowchart
            </button>
            <button
              onClick={() => setActive("ia")}
              className={`tab-btn ${active === "ia" ? "tab-active" : ""}`}
            >
              IA
            </button>
            <button
              onClick={() => setActive("wireframe")}
              className={`tab-btn ${active === "wireframe" ? "tab-active" : ""}`}
            >
              Wireframe
            </button>
          </div>
        </div>
      </nav>

      {/* 본문 */}
      <main className="container">
        {active === "ia" && <IA />}
        {active === "flowchart" && <FlowChart />}
        {active === "wireframe" && <Wireframe />}
      </main>
    </div>
  );
}
