import React, { useState } from "react";

export default function ChatPage() {
  const [mensagens, setMensagens] = useState([
    {
      remetente: "Jarvis",
      texto:
        "Olá, sou o Fernando, seu engenheiro e especialista em dados, me pergunte o que quiser! Como posso te ajudar neste momento?",
    },
  ]);
  const [pergunta, setPergunta] = useState("");

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    const novaPergunta = { remetente: "Você", texto: pergunta };
    setMensagens([...mensagens, novaPergunta]);

    try {
      const response = await fetch("http://localhost:5000/perguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta }),
      });

      const data = await response.json();
      setMensagens((prev) => [
        ...prev,
        { remetente: "Jarvis", texto: data.resposta },
      ]);
    } catch (err) {
      setMensagens((prev) => [
        ...prev,
        {
          remetente: "Jarvis",
          texto: "Erro ao se comunicar com o servidor.",
        },
      ]);
    }

    setPergunta("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita quebra de linha
      enviarPergunta();
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {mensagens.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.remetente === "Você"
                ? "bg-blue-500 text-white self-end"
                : "bg-white text-gray-800 self-start shadow"
            }`}
          >
            <strong>{msg.remetente}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-md px-3 py-2"
          placeholder="Digite sua pergunta..."
        />
        <button
          onClick={enviarPergunta}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
