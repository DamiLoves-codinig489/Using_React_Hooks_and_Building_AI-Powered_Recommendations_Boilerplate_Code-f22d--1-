import { AGE_MODES } from "../config";

function AgeModePicker({ activeMode, onChange }) {
    return (
        <section className="panel">
            <div className="section-head">
                <div>
                    <p className="eyebrow accent">Personalise</p>
                    <h2>Choose Age Mode</h2>
                </div>
            </div>

            <div className="chip-row">
                {AGE_MODES.map((mode) => (
                    <button
                        key={mode}
                        className={`chip ${activeMode === mode ? "selected" : ""}`}
                        onClick={() => onChange(mode)}
                    >
                        {mode}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default AgeModePicker;
