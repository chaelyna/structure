import InfoSection from "./InfoSection.jsx";
const IMG = "./images/IA.png";

export default function IA() {
    return (
        <section className="panel panel-ia">
            <header className="panel-head">
                <span className="head-icon" aria-hidden="true" />
                <div>
                    <h2 className="panel-title">Information Architecture</h2>
                    <p className="panel-sub">서비스 기능의 전체 구조</p>
                </div>
            </header>

            <div className="panel-body">
                <InfoSection
                    related="Create / Stage / Magazine / My Page"
                    note="IA는 중요도와 사용 빈도에 따라 정보의 깊이를 차등화하였으며, 주요 카테고리는 상위에, 세부 속성은 하위에 두어 Progressive Disclosure 원칙을 반영하였습니다."
                />


                <div className="media-group">
                    <img src={IMG} alt="Information Architecture" className="preview-img" />
                </div>
            </div>
        </section>
    );
}

