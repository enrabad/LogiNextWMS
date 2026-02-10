# LogiNext WMS - Recomendador de Planes de Acción Logísticos (Prototipo)

Este repositorio contiene un prototipo funcional full-stack de una herramienta para consultores logísticos. Permite transformar observaciones de auditoría en planes de acción estructurados con dos capas de salida: una ejecutiva para el cliente y otra técnica para el consultor.

## Estructura del Proyecto

- `backend/`: Servidor Express (Node.js) que genera las recomendaciones.
- `frontend/`: Aplicación React (Vite) con la interfaz de usuario profesional.

## Requisitos Previos

- Node.js (v16+)
- npm

## Instalación y Ejecución

### 1. Levantar el Backend
```bash
cd backend
npm install
node server.js
```
El servidor correrá en `http://localhost:5000`.

### 2. Levantar el Frontend
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en la URL indicada por Vite (normalmente `http://localhost:5173`).

## Funcionalidades del Prototipo

- **Formulario de Contexto**: Captura objetivos, procesos, observaciones y restricciones.
- **Chat Contextual**: Simulación de interacción con el agente logístico.
- **Salida en Dos Capas**:
    - **Capa Cliente**: Resumen ejecutivo y tabla de plan de acción.
    - **Capa Consultor**: Hallazgos detallados, SUPUESTOS y preguntas de validación.
- **Diseño Profesional**: Layout de dos columnas, paleta de colores corporativa y tipografía limpia.

## Especificaciones Técnicas

- **Frontend**: React, CSS Vanilla (Design System personalizado).
- **Backend**: Express.js, Mock de motor LLM estructurado.
- **Estilo**: UX Sprint v1 compliance.
