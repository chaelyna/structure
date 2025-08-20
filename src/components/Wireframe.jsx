// src/components/Wireframe.jsx
import InfoSection from "./InfoSection.jsx";

const IMG = "./images/wireframe.png";

export default function Wireframe() {
    return (
        <section className="panel">
            <header className="panel-head">
                <h2 className="panel-title">Wireframe</h2>
                <p className="panel-sub">모바일/데스크톱 화면 구조와 주요 레이아웃 설계</p>
            </header>

            <div className="panel-body">
                <div className="panel-content">
                    {/* ↑ 이미지 위에: 관련 화면 / 비고 */}
                    <InfoSection
                        related="Create / Stage / Magazine / My Page"
                        note="사용자는 탭 내 정렬 버튼을 통해 기본 ‘최신순’ 외에도 ‘인기순·추천순·과거순’으로 콘텐츠를 탐색할 수 있습니다."
                    />

                    {/* 텍스트와 이미지 사이 여백 */}
                    <div className="fc-spacer-xl" />

                    {/* 이미지 */}
                    <img src={IMG} alt="Wireframe" className="preview-img" />
                </div>
            </div>
        </section>
    );
}
