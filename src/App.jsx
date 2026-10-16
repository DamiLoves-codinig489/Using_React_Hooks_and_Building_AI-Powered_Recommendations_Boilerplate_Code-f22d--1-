import { useEffect, useRef, useState } from "react";
import { GROQ_API_KEY, GROQ_URL, MODEL } from "./config";
import Header from "./components/Header";
import AgeModePicker from "./components/AgeModePicker";
import TopicChips from "./components/TopicChips";
import ChatWindow from "./components/ChatWindow";
import QuestionForm from "./components/QuestionForm";
import StatusCard from "./components/StatusCard";
import "./App.css";

const starterMessage = {
  id: 1,
  role: "assistant",
  text: "Hi! I am your AI Study Buddy. Ask me any school topic, and I will explain it clearly for your age group."
};

function buildPrompt(question, ageMode) {
  const levelGuide = {
    Kids: "Use simple words, short sentences, a friendly tone, and one easy real-life example.",
    Teens: "Use clear explanations, a slightly deeper level, and one relatable example.",
    Adults: "Use clear but more complete explanations with useful detail and practical understanding."
  };

  return [
    {
      role: "system",
      content:
        "You are an educational AI tutor. Always explain concepts safely, clearly, and accurately. Structure every reply with: 1) What it is, 2) Why it matters, 3) Simple example, 4) Quick recap."
    },
    {
      role: "user",
      content: `Age mode: ${ageMode}. Instruction: ${levelGuide[ageMode]} Student question: ${question}`
    }
  ];
}

async function fetchAiReply(question, ageMode) {
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: buildPrompt(question, ageMode),
      temperature: 0.6,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error("Could not get an AI response. Check your Groq API key and try again.");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "I could not generate a response right now.";
}

function App() {
  const [ageMode, setAgeMode] = useState("Kids");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([starterMessage]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async (presetQuestion) => {
    const finalQuestion = (presetQuestion || question).trim();

    if (!finalQuestion) {
      setError("Please type a question before asking the AI.");
      return;
    }

    if (!GROQ_API_KEY || GROQ_API_KEY === "your_groq_api_key_here") {
      setError("Please add your Groq API key inside the .env file.");
      return;
    }

    setError("");
    setLoading(true);

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: finalQuestion
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const reply = await fetchAiReply(finalQuestion, ageMode);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: reply
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Header />

      <div className="layout">
        <div className="left-column">
          <AgeModePicker activeMode={ageMode} onChange={setAgeMode} />
          <TopicChips onPick={handleAsk} />
          <StatusCard ageMode={ageMode} error={error} />
        </div>

        <div className="right-column">
          <ChatWindow messages={messages} loading={loading} bottomRef={bottomRef} />
          <QuestionForm
            question={question}
            onChange={setQuestion}
            onSubmit={() => handleAsk()}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
w