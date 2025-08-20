import { useState } from "react";
import "./App.css";
import Flowchart from "./components/Flowchart";
import IA from "./components/IA";
import Wireframe from "./components/Wireframe";

export default function App() {
  const [active, setActive] = useState("ia"); // 시작 탭(원하면 wireframe/ia로 변경)

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img src="./images/logo.png" alt="DesignHub logo" />
          </div>

          <div className="tabs">
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
              Flowchart
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


      <main className="container">
        {active === "ia" && <IA />}
        {active === "flowchart" && <Flowchart />}
        {active === "wireframe" && <Wireframe />}
      </main>
    </div>
  );
}
