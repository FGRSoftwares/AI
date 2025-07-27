
import React, { useState } from "react";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    "Olá, sou o Jarvis, seu engenheiro e especialista em dados. Me pergunte o que quiser! Como posso te ajudar neste momento?"
  ]);

  const handleSend = async () => {
  if (input.trim()) {
    const novaPergunta = input.trim();
    setMessages([...messages, novaPergunta]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/pergunta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pergunta: novaPergunta })
      });

      const data = await response.json();
      setMessages(prev => [...prev, `Jarvis: ${data.resposta}`]);

    } catch (error) {
      setMessages(prev => [...prev, "Jarvis: Erro ao se comunicar com o servidor."]);
      console.error("Erro ao enviar pergunta:", error);
    }
  }
};


  return (
    <div style={{
      backgroundColor: "#f5f7fa",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <div style={{
        width: "60%",
        height: "70%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 10
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              backgroundColor: idx === 0 ? "#e0f0ff" : "#d9fdd3",
              padding: 10,
              borderRadius: 8,
              marginBottom: 5
            }}>{msg}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 16
            }}
          />
          <button onClick={handleSend} style={{
            padding: "10px 20px",
            fontSize: 16,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4
          }}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
