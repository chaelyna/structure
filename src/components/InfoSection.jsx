// src/components/InfoSection.jsx
export default function InfoSection({
    related,
    note,
    maxWidth = 1280, // 섹션 전체 최대 가로폭
    padX = 16,       // 좌우 패딩(px)
    gapCol = 51,     // 좌/우 컬럼 간격
    gapRow = 20,     // 각 줄(행) 간격
}) {
    return (
        <div
            className="info-auto-wrap"
            style={{ maxWidth: `${maxWidth}px`, padding: `0 ${padX}px` }}
        >
            <div className="info-auto" style={{ gap: `${gapCol}px` }}>
                {/* 왼쪽 라벨 2줄: 고정폭 49px, 가운데 정렬 */}
                <div
                    className="info-col-labels"
                    style={{ width: "49px", gap: `${gapRow}px` }}
                >
                    <span className="info-label">관련 화면</span>
                    <span className="info-label">비고</span>
                </div>

                {/* 오른쪽 설명 2줄: 유동폭(flex:1), 왼쪽 정렬 */}
                <div className="info-col-texts" style={{ gap: `${gapRow}px` }}>
                    <span className="info-text">{related}</span>
                    <span className="info-text">{note}</span>
                </div>
            </div>
        </div>
    );
}
