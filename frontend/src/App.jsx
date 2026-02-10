import React, { useState } from 'react';
import ContextForm from './components/ContextForm';
import ResultsPanel from './components/ResultsPanel';

function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [chat, setChat] = useState([
        { role: 'agent', text: 'Hola. Pega tus observaciones de la visita y completa el objetivo del cliente. Te devolveré un diagnóstico estructurado y un plan de acción priorizado (Capa Cliente + Capa Consultor).' }
    ]);

    const handleGenerate = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setResult(data);
            setChat(prev => [...prev,
            { role: 'user', text: `Solicitud de plan para ${formData.process} con objetivo ${formData.objective}` },
            { role: 'agent', text: 'Listo. He generado el plan de acción. Puedes revisarlo en el panel de resultados.' }
            ]);
        } catch (error) {
            console.error('Error:', error);
            alert('Error conectando con el backend. Asegúrate de que el servidor esté corriendo en el puerto 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            {loading && <div className="loading-overlay">Generando borrador...</div>}

            <header className="header">
                <h1 style={{ fontSize: '1.4rem' }}>LogiNext WMS - Recomendador de Planes de Acción</h1>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Consultor: Demo | Proyecto: Auditoría Almacén V1</div>
            </header>

            <main className="main-layout">
                <ContextForm onGenerate={handleGenerate} loading={loading} />

                <section className="content-area">
                    <div className="card chat-area" style={{ flex: '0 0 auto', maxHeight: '300px', overflowY: 'auto' }}>
                        {chat.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.role}`}>
                                <strong>{msg.role === 'agent' ? 'Agente: ' : 'Tú: '}</strong>
                                <span>{msg.text}</span>
                            </div>
                        ))}
                    </div>

                    <ResultsPanel data={result} />
                </section>
            </main>
        </div>
    );
}

export default App;
