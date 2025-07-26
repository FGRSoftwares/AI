from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

CAMINHO_BANCO = os.path.join(os.path.dirname(__file__), 'banco_clientes_completo.db')

@app.route('/pergunta', methods=['POST', 'OPTIONS'])
@cross_origin()
def perguntar():
    if request.method == "OPTIONS":
        return '', 204

    pergunta = request.json.get('pergunta', '').lower()

    try:
        conn = sqlite3.connect(CAMINHO_BANCO)
        cursor = conn.cursor()

        if "quantos clientes" in pergunta:
            cursor.execute("SELECT COUNT(*) FROM clientes")
            total = cursor.fetchone()[0]
            resposta = f"Você tem {total} clientes atualmente."

        elif any(p in pergunta for p in [
            "valor total", "quanto tenho a receber", "valor das minhas obras", "custo total"
        ]):
            cursor.execute("SELECT SUM(valor_a_receber) FROM clientes")
            total = cursor.fetchone()[0]
            resposta = f"O valor total que você tem a receber é R$ {total:,.2f}."

        elif "percentual produzido" in pergunta:
            cursor.execute("SELECT AVG(percentual_produzido) FROM clientes")
            media = cursor.fetchone()[0]
            resposta = f"O percentual médio produzido das obras é {media:.2f}%."

        elif "percentual medido" in pergunta:
            cursor.execute("SELECT AVG(percentual_medido) FROM clientes")
            media = cursor.fetchone()[0]
            resposta = f"O percentual médio medido das obras é {media:.2f}%."

        elif "clientes das minhas obras" in pergunta or "nomes dos clientes" in pergunta:
            cursor.execute("SELECT nome FROM clientes")
            nomes = [linha[0] for linha in cursor.fetchall()]
            resposta = "Seus clientes são: " + ", ".join(nomes) + "."

        elif "obras em andamento" in pergunta:
            cursor.execute("SELECT COUNT(*) FROM clientes WHERE status = 'em andamento'")
            total = cursor.fetchone()[0]
            resposta = f"Você tem {total} obras em andamento."

        elif "média de execução" in pergunta or "média de avanço" in pergunta:
            cursor.execute("SELECT AVG(percentual_produzido) FROM clientes")
            media = cursor.fetchone()[0]
            resposta = f"A média de execução das obras é {media:.2f}%."

        elif "acima de 80%" in pergunta or "mais de 80%" in pergunta:
            cursor.execute("SELECT nome FROM clientes WHERE percentual_produzido > 80")
            obras = [linha[0] for linha in cursor.fetchall()]
            if obras:
                resposta = "Obras com mais de 80% concluídas: " + ", ".join(obras) + "."
            else:
                resposta = "Nenhuma obra está com mais de 80% de conclusão ainda."

        else:
            resposta = "Desculpe, ainda não sei responder essa pergunta."

        conn.close()
        return jsonify(resposta=resposta)

    except Exception as e:
        return jsonify(resposta=f"Erro ao acessar banco de dados: {str(e)}")


# ✅ ESSA PARTE É FUNDAMENTAL PARA FUNCIONAR NO RENDER
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
