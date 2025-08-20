import { useState } from "react";
import "./App.css";
import FlowChart from "./components/Flowchart";
import IA from "./components/IA";
import Wireframe from "./components/Wireframe";


export default function App() {
  const [active, setActive] = useState("ia"); // 기본 탭을 IA로 시작하고 싶으면 여기 "ia" 로 설정

  return (
    <div>
      <nav className="nav">
        <div className="nav-inner">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="brand">
              <img src="./images/logo.png" alt="DesignHub logo" />
            </div>
            <div className="tabs">
              {/* IA → FlowChart → Wireframe 순서 */}
              <button
                onClick={() => setActive("ia")}
                className={`tab-btn ${active === "ia" ? "tab-active" : ""}`}
              >
                IA
              </button>
              <button
                onClick={() => setActive("flowchart")}
                className={`tab-btn ${active === "flowchart" ? "tab-active" : ""}`}
              >
                FlowChart
              </button>
              <button
                onClick={() => setActive("wireframe")}
                className={`tab-btn ${active === "wireframe" ? "tab-active" : ""}`}
              >
                Wireframe
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container">
        {active === "ia" && <IA />}
        {active === "flowchart" && <FlowChart />}
        {active === "wireframe" && <Wireframe />}
      </main>
    </div>
  );
}
