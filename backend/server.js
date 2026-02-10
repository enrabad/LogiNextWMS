const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock LLM Response logic based on the spec
const generateResponse = (data) => {
  const { objective, process, observations, constraints, priority } = data;

  return {
    capaCliente: {
      resumenEjecutivo: `Se ha realizado un diagnóstico inicial enfocado en el área de ${process} con el objetivo de mejorar el ${objective}. Tras analizar las observaciones, se detectan oportunidades críticas para optimizar el flujo operativo.`,
      recomendaciones: [
        {
          accion: "Reorganización de flujos en zona de Picking",
          prioridad: "Alta",
          impacto: "Alto",
          esfuerzo: "Medio",
          responsable: "Jefe de Almacén",
          kpi: "Líneas/hora",
          plazo: "2 semanas"
        },
        {
          accion: "Implementación de control de inventario cíclico",
          prioridad: "Media",
          impacto: "Medio",
          esfuerzo: "Bajo",
          responsable: "Responsable Stock",
          kpi: "Exactitud Inventario",
          plazo: "1 semana"
        }
      ],
      riesgos: "Dependencia de la disponibilidad de personal para la reorganización física del layout.",
      siguientePaso: "Validar los tiempos medios de picking actuales para cuantificar el ahorro potencial."
    },
    capaConsultor: {
      hallazgos: `Se observa que en ${process} los problemas principales son: ${observations}. Las restricciones de ${constraints} limitan las opciones de automatización inmediata.`,
      justificacion: [
        "La reorganización se justifica por la alta congestión observada en pasillos centrales.",
        "El control cíclico mitigará los descuadres frecuentes reportados en SKUs de alta rotación."
      ],
      supuestos: [
        "SUPUESTO: Se asume que el WMS actual permite la reubicación lógica de productos sin paradas de sistema.",
        "SUPUESTO: Los operarios tienen formación básica en el uso de terminales de radiofrecuencia."
      ],
      preguntasValidacion: [
        "¿Cuál es el volumen exacto de líneas/pedido en horas pico?",
        "¿Se dispone de un histórico de errores de picking por zona?",
        "¿Qué capacidad de expansión física tiene el área de expedición?"
      ],
      planMedicion: "Monitorizar la productividad diaria durante la primera semana post-cambio y comparar con el histórico del mes anterior."
    }
  };
};

app.post('/api/generate', (req, res) => {
  console.log('Received generation request:', req.body);
  const response = generateResponse(req.body);
  // Simulate processing time
  setTimeout(() => {
    res.json(response);
  }, 1500);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
