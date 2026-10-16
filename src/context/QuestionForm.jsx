function QuestionForm({ question, onChange, onSubmit, disabled }) {
    return (
        <section className="panel">
            <div className="section-head">
                <div>
                    <p className="eyebrow accent">Ask anything</p>
                    <h2>Enter Your Question</h2>
                </div>
            </div>

            <div className="form-wrap">
                <textarea
                    value={question}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Type your study question here..."
                    rows="4"
                />
                <button className="primary-btn" onClick={onSubmit} disabled={disabled}>
                    {disabled ? "Thinking..." : "Ask Study Buddy"}
                </button>
            </div>
        </section>
    );
}

export default QuestionForm;
