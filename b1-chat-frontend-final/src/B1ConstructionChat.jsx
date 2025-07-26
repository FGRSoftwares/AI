import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export default function B1ConstructionChat() {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  const cliente_id = '123'; // Simulado

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;
    setLoading(true);
    setResposta('');
    try {
      const res = await fetch('http://localhost:5000/pergunta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta, cliente_id })
      });
      const data = await res.json();
      setResposta(data.resposta);
    } catch (err) {
      setResposta('Erro ao se comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <h1 className="text-2xl font-bold">Assistente B1Construction</h1>
      <Card>
        <CardContent className="p-4 space-y-2">
          <Input
            placeholder="Digite sua pergunta aqui..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
          />
          <Button onClick={enviarPergunta} disabled={loading}>
            {loading ? 'Consultando...' : 'Enviar'}
          </Button>
        </CardContent>
      </Card>
      {resposta && (
        <Card>
          <CardContent className="p-4">
            <p className="whitespace-pre-line">{resposta}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

