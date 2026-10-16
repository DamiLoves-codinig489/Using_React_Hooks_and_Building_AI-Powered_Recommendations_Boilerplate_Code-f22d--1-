function ChatWindow({ messages, loading, bottomRef }) {
    return (
        <section className="panel chat-panel">
            <div className="section-head">
                <div>
                    <p className="eyebrow accent">Conversation</p>
                    <h2>Study Chat</h2>
                </div>
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`bubble ${message.role === "user" ? "user" : "assistant"}`}
                    >
                        <p className="bubble-role">
                            {message.role === "user" ? "You" : "Study Buddy"}
                        </p>
                        <p className="bubble-text">{message.text}</p>
                    </div>
                ))}

                {loading && (
                    <div className="bubble assistant typing-bubble">
                        <p className="bubble-role">Study Buddy</p>
                        <div className="typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>
        </section>
    );
}

export default ChatWindow;
