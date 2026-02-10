const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Eres un Agente Consultor Logístico experto en WMS (Warehouse Management Systems).
Tu objetivo es transformar observaciones de auditoría en planes de acción estructurados.

Debes proporcionar la respuesta en formato JSON estricto con dos campos:
1. "cliente": Un texto en Markdown dirigido a la alta dirección. Debe incluir:
   - Resumen ejecutivo profesional.
   - Tabla de recomendaciones priorizadas (Acción, Prioridad, Impacto, Esfuerzo, Plazo).
   - Siguiente paso sugerido.
2. "consultor": Un texto en Markdown para el equipo técnico. Debe incluir:
   - Hallazgos detallados.
   - Justificación técnica.
   - SUPUESTOS (claramente marcados como "SUPUESTO: ...").
   - Preguntas de validación para el cliente.

TONO: Profesional, directo y técnico-práctico.

JSON SCHEMA:
{
  "cliente": "string (markdown)",
  "consultor": "string (markdown)"
}`;

app.post('/api/generate', async (req, res) => {
  const { objective, process: area, observations, constraints, priority } = req.body;

  console.log('Received generation request for area:', area);

  const userPrompt = `
  OBJETIVO CLIENTE: ${objective}
  ÁREA/PROCESO: ${area}
  OBSERVACIONES: ${observations}
  RESTRICCIONES: ${constraints}
  CRITERIO PRIORIDAD: ${priority}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini", // gpt-4.1-mini no es un modelo estándar, usamos gpt-4o-mini como fallback lógico o el solicitado si existe
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      parsedContent = {
        cliente: "Resumen ejecutivo no disponible en formato estructurado; por favor revise la sección del consultor para detalles manuales.",
        consultor: content
      };
    }

    res.json(parsedContent);

  } catch (apiError) {
    console.error('OpenAI API Error:', apiError);
    res.status(500).json({
      cliente: "Error al conectar con el motor de IA.",
      consultor: apiError.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
