function StatusCard({ ageMode, error }) {
    return (
        <section className="panel status-card">
            <div className="section-head">
                <div>
                    <p className="eyebrow accent">App status</p>
                    <h2>Current Setup</h2>
                </div>
            </div>

            <div className="status-list">
                <div className="status-row">
                    <span>Selected Mode</span>
                    <strong>{ageMode}</strong>
                </div>
                <div className="status-row">
                    <span>AI Provider</span>
                    <strong>Groq API</strong>
                </div>
                <div className="status-row">
                    <span>Status</span>
                    <strong>{error ? "Needs attention" : "Ready"}</strong>
                </div>
            </div>

            {error && <p className="error-text">{error}</p>}
        </section>
    );
}

export default StatusCard;
