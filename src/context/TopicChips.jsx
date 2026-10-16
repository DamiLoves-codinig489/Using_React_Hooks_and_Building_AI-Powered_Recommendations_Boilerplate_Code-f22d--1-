import { SUGGESTED_TOPICS } from "../config";

function TopicChips({ onPick }) {
    return (
        <section className="panel">
            <div className="section-head">
                <div>
                    <p className="eyebrow accent">Quick start</p>
                    <h2>Try a Topic</h2>
                </div>
            </div>

            <div className="chip-row">
                {SUGGESTED_TOPICS.map((topic) => (
                    <button key={topic} className="chip soft" onClick={() => onPick(topic)}>
                        {topic}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default TopicChips;
