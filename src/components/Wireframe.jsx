import InfoSection from "./InfoSection.jsx";
const IMG = "./images/wireframe.png";

export default function Wireframe() {
    return (
        <section className="panel panel-wireframe">
            <header className="panel-head">
                <span className="head-icon" aria-hidden="true" />
                <div>
                    <h2 className="panel-title">Wireframe</h2>
                    <p className="panel-sub">모바일/데스크톱 화면 구조와 주요 레이아웃 설계</p>
                </div>
            </header>

            <div className="panel-body">
                <InfoSection
                    related="Create / Stage / Magazine / My Page"
                    note="사용자는 탭 내 정렬 버튼을 통해 기본 ‘최신순’ 외에도 ‘인기순·추천순·과거순’으로 콘텐츠를 탐색할 수 있습니다."
                    maxWidth={1280}  /* Wireframe은 중간 */
                    padX={16}
                    gapCol={44}
                    gapRow={16}
                />


                <div className="media-group">
                    <img src={IMG} alt="Wireframe" className="preview-img" />
                </div>
            </div>
        </section>
    );
}
