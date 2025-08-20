// src/components/Wireframe.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import InfoSection from "./InfoSection.jsx";

const IMG = "./images/wireframe_raw.png"; // ← 새 파일명
const ALIGN = "left"; // 디자인 요구대로 좌측 정렬 (center로 바꾸면 가운데 정렬)

export default function Wireframe() {
    const [nat, setNat] = useState({ w: 0, h: 0 });
    const wrapRef = useRef(null);
    const [vw, setVw] = useState(1280); // panel-wireframe .media-group의 기준 폭

    // 원본 이미지 크기 읽기
    useEffect(() => {
        const a = new Image();
        a.src = IMG;
        a.onload = () => setNat({ w: a.naturalWidth, h: a.naturalHeight });
    }, []);

    // 컨테이너 폭 측정(반응형)
    useEffect(() => {
        const update = () => {
            const el = wrapRef.current;
            if (!el) return;
            // Wireframe은 CSS에서 max-width:1280px → 여기서도 1280을 상한으로
            const w = Math.min(1280, Math.round(el.clientWidth || 0));
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

    // 슬라이드 개수(원본 1920px 단위)
    const segments = useMemo(() => {
        if (!nat.w) return 0;
        return Math.ceil(nat.w / 1920);
    }, [nat.w]);

    // 추가 축소 비율 (1.0 = 원래, 0.8 = 20% 축소, 0.6 = 40% 축소)
    const ZOOM = 0.9;

    // 기존: const scale = useMemo(() => (vw ? vw / 1920 : 1), [vw]);
    const scale = useMemo(() => (vw ? (vw / 1920) * ZOOM : 1), [vw]);

    // Swiper 로드 & 초기화 (Wireframe 전용 클래스 사용)
    useEffect(() => {
        const ensureSwiper = async () => {
            // CSS
            if (![...document.styleSheets].some(s => (s?.href || "").includes("swiper-bundle"))) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
                document.head.appendChild(link);
            }
            // JS
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
        const el = document.querySelector(".wfSwiper");
        if (!el || !window.Swiper) return;
        if (el.swiper) el.swiper.destroy(true, true);
        // eslint-disable-next-line no-new
        new window.Swiper(".wfSwiper", {
            pagination: { el: ".wf-pagination", clickable: true },
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
        });
    };

    const displayH = nat.h ? Math.round(nat.h * scale) : 400;
    const alignClass = ALIGN === "left" ? "fc-align-left" : "fc-align-center";

    return (
        <section className="panel panel-wireframe">
            <header className="panel-head">
                <span className="head-icon" aria-hidden="true" />
                <div>
                    <h2 className="panel-title">Wireframe</h2>
                    <p className="panel-sub">화면 레이아웃 구체화</p>
                </div>
            </header>

            <div className="panel-body">
                <InfoSection
                    related="Create / Stage / Magazine / My Page"
                    note="사용자는 탭 내 정렬 버튼을 통해 기본 ‘최신순’ 외에도 ‘인기순·추천순·과거순’으로 콘텐츠를 탐색할 수 있습니다."
                />

                {/* 이미지 묶음 (보더 없음, 좌우 24px 마진은 App.css의 .media-group 규칙 적용) */}
                <div className="media-group">
                    <div className={`fc-wrap ${alignClass}`} ref={wrapRef}>
                        {/* wireframe_raw: 1920 단위 슬라이드로 분할 표시 */}
                        <div className="swiper wfSwiper fc-swiper">
                            <div className="swiper-wrapper">
                                {Array.from({ length: segments || 1 }).map((_, idx) => (
                                    <div className="swiper-slide" key={idx}>
                                        <div
                                            className="fc-viewport"
                                            style={{ width: `${vw}px`, height: `${displayH}px` }}
                                        >
                                            <img
                                                src={IMG}
                                                alt={`Wireframe - part ${idx + 1}`}
                                                style={{
                                                    display: "block",
                                                    width: `${nat.w * scale}px`,
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
                            {/* 페이지네이션: Flowchart와 동일한 간격 규칙 쓰려고 fc-pagination 클래스 같이 사용 */}
                            <div className="swiper-pagination wf-pagination fc-pagination" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
