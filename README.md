# LogiNext WMS - Recomendador de Planes de Acción Logísticos (Prototipo)

Este repositorio contiene un prototipo funcional full-stack de una herramienta para consultores logísticos. Permite transformar observaciones de auditoría en planes de acción estructurados con dos capas de salida (Cliente y Consultor) utilizando la API de OpenAI.

## Estructura del Proyecto

- `backend/`: Servidor Express (Node.js) que integra OpenAI.
- `frontend/`: Aplicación React (Vite) con la interfaz de usuario profesional.

## Requisitos Previos

- Node.js (v16+)
- npm
- Cuenta de OpenAI y API Key.

## Instalación y Ejecución

### 1. Configuración de Entorno
Crea un archivo `.env.local` en la raíz del proyecto (o usa `.env.example` como base) y añade tus credenciales:
```env
OPENAI_API_KEY=tu_api_key_aqui
OPENAI_MODEL=gpt-4o-mini
```

### 2. Levantar el Backend
```bash
cd backend
npm install
node server.js
```
El servidor correrá en `http://localhost:5000`.

### 3. Levantar el Frontend
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en la URL indicada por Vite (normalmente `http://localhost:5173`).

## Funcionalidades del Prototipo

- **Formulario de Contexto**: Captura objetivos, procesos, observaciones y restricciones.
- **Generación Real vía LLM**: Integración con la API de OpenAI para obtener diagnósticos técnicos y estratégicos.
- **Salida en Dos Capas**:
    - **Capa Cliente**: Texto Markdown dirigido a dirección con tablas de acción priorizadas.
    - **Capa Consultor**: Hallazgos técnicos, Justificación, SUPUESTOS y preguntas de validación.
- **Diseño Profesional**: Layout de dos columnas, paleta de colores corporativa y tipografía limpia.

## Especificaciones Técnicas

- **Frontend**: React, CSS Vanilla (Design System personalizado).
- **Backend**: Express.js, Integración OpenAI SDK.
- **Estilo**: UX Sprint v1 compliance.
