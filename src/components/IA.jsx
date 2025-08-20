// src/components/IA.jsx
import InfoSection from "./InfoSection.jsx";

const IMG = "./images/IA.png";

export default function IA() {
    return (
        <section className="panel">
            <header className="panel-head">
                <h2 className="panel-title">Information Architecture</h2>
                <p className="panel-sub">앱의 콘텐츠와 기능을 체계적으로 정리한 구조 설계</p>
            </header>

            <div className="panel-body">
                <div className="panel-content">
                    {/* ↑ 이미지 위에: 관련 화면 / 비고 */}
                    <InfoSection
                        related="Create / Stage / Magazine / My Page"
                        note="IA는 중요도와 사용 빈도에 따라 정보의 깊이를 차등화하였으며, 주요 카테고리는 상위에, 세부 속성은 하위에 두어 Progressive Disclosure 원칙을 반영하였습니다."
                    />

                    {/* 텍스트와 이미지 사이 여백 */}
                    <div className="fc-spacer-xl" />

                    {/* 이미지 */}
                    <img src={IMG} alt="Information Architecture" className="preview-img" />
                </div>
            </div>
        </section>
    );
}
