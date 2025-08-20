// src/components/InfoSection.jsx
export default function InfoSection({ related, note }) {
    return (
        <div className="info-section">
            <div className="info-row">
                <span className="info-label">관련 화면</span>
                <span className="info-text">{related}</span>
            </div>
            <div className="info-row">
                <span className="info-label">비고</span>
                <span className="info-text">{note}</span>
            </div>
        </div>
    );
}
