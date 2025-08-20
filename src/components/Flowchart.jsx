import { useEffect, useMemo, useRef, useState } from "react";
import InfoSection from "./InfoSection.jsx";

const IMG1 = "./images/flowchart_1.png";
const IMG2 = "./images/flowchart_2.png";
const ALIGN = "center";

export default function Flowchart() {
    const [nat1, setNat1] = useState({ w: 0, h: 0 });
    const [nat2, setNat2] = useState({ w: 0, h: 0 });
    const wrapRef = useRef(null);
    const [vw, setVw] = useState(1360); // ← 1360 기준

    useEffect(() => {
        const a = new Image();
        a.src = IMG1;
        a.onload = () => setNat1({ w: a.naturalWidth, h: a.naturalHeight });
        const b = new Image();
        b.src = IMG2;
        b.onload = () => setNat2({ w: b.naturalWidth, h: b.naturalHeight });
    }, []);

    useEffect(() => {
        const update = () => {
            const el = wrapRef.current;
            if (!el) return;
            const w = Math.min(1360, Math.round(el.clientWidth || 0)); // ← 1360까지
            if (w > 0) setVw(w);
        };
        update();
        const ro = new ResizeObserver(update);
        if (wrapRef.current) ro.observe(wrapRef.current);
        window.addEventListener("resize", update);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    const segments = useMemo(() => (!nat1.w ? 0 : Math.ceil(nat1.w / 1920)), [nat1.w]);
    const scale = useMemo(() => (vw ? vw / 1920 : 1), [vw]);

    useEffect(() => {
        const ensureSwiper = async () => {
            if (![...document.styleSheets].some(s => (s?.href || "").includes("swiper-bundle"))) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
                document.head.appendChild(link);
            }
            if (!window.Swiper) {
                await new Promise((resolve) => {
                    const js = document.createElement("script");
                    js.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
                    js.onload = resolve;
                    document.body.appendChild(js);
                });
            }
            initSwiper();
        };
        ensureSwiper();
    }, []);

    useEffect(() => {
        if (window.Swiper) initSwiper();
    }, [segments, vw]);

    const initSwiper = () => {
        const el = document.querySelector(".mySwiper");
        if (!el || !window.Swiper) return;
        if (el.swiper) el.swiper.destroy(true, true);
        new window.Swiper(".mySwiper", {
            pagination: { el: ".swiper-pagination", clickable: true },
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
        });
    };

    const displayH1 = nat1.h ? Math.round(nat1.h * scale) : 400;
    const displayH2 = nat2.h ? Math.round(nat2.h * scale) : displayH1;
    const alignClass = ALIGN === "left" ? "fc-align-left" : "fc-align-center";

    return (
        <section className="panel panel-flowchart">
            <header className="panel-head">
                <span className="head-icon" aria-hidden="true" />
                <div>
                    <h2 className="panel-title">Flowchart</h2>
                    <p className="panel-sub">서비스 이용 과정을 시각적으로 보여주는 흐름도</p>
                </div>
            </header>

            <div className="panel-body">
                <InfoSection
                    related="Create / Stage / Magazine / My Page"
                    note={
                        "이 Flow Chart는 큰 UX 경로 단위의 탐색 흐름을 표현한 것입니다. 각 플로우(Create, Stage, Magazine, My Page 등)는 독립적으로 나뉘어 있으나,\n 실제 경험에서는 각 플로우가 상호보완적으로 연결되어 하나의 통합 서비스 경험을 제공합니다."
                    }
                />

                <div className="media-group">
                    <div className={`fc-wrap ${alignClass}`} ref={wrapRef}>
                        {/* 1: 슬라이드 이미지 */}
                        <div className="swiper mySwiper fc-swiper">
                            <div className="swiper-wrapper">
                                {Array.from({ length: segments || 1 }).map((_, idx) => (
                                    <div className="swiper-slide" key={idx}>
                                        <div className="fc-viewport" style={{ width: `${vw}px`, height: `${displayH1}px` }}>
                                            <img
                                                src={IMG1}
                                                alt={`Flowchart 1 - part ${idx + 1}`}
                                                style={{
                                                    display: "block",
                                                    width: `${nat1.w * scale}px`,
                                                    height: "auto",
                                                    transform: `translateX(-${vw * idx}px)`,
                                                    transformOrigin: "top left",
                                                    border: "none",
                                                    boxShadow: "none",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination fc-pagination" />
                        </div>

                        {/* 2: 이어지는 이미지 */}
                        <div className="fc-viewport" style={{ width: `${vw}px`, height: `${displayH2}px` }}>
                            <img
                                src={IMG2}
                                alt="Flowchart 2"
                                style={{
                                    display: "block",
                                    width: `${nat2.w * scale}px`,
                                    height: "auto",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
