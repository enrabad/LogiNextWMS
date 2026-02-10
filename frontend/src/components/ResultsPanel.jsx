import React, { useState } from 'react';

const ResultsPanel = ({ data }) => {
    const [activeTab, setActiveTab] = useState('cliente');

    if (!data) return null;

    return (
        <div className="card">
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'cliente' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cliente')}
                >
                    Capa Cliente
                </div>
                <div
                    className={`tab ${activeTab === 'consultor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('consultor')}
                >
                    Capa Consultor
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'cliente' ? (
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Resumen Ejecutivo</h3>
                        <p>{data.capaCliente.resumenEjecutivo}</p>

                        <h3 style={{ margin: '1.5rem 0 1rem' }}>Top Recomendaciones Priorizadas</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Acción</th>
                                    <th>Prioridad</th>
                                    <th>Impacto</th>
                                    <th>Esfuerzo</th>
                                    <th>Plazo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.capaCliente.recomendaciones.map((rec, i) => (
                                    <tr key={i}>
                                        <td>{rec.accion}</td>
                                        <td><span className={`badge ${rec.prioridad.toLowerCase()}`}>{rec.prioridad}</span></td>
                                        <td>{rec.impacto}</td>
                                        <td>{rec.esfuerzo}</td>
                                        <td>{rec.plazo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="next-step">
                            <strong>Siguiente Paso:</strong> {data.capaCliente.siguientePaso}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>Hallazgos Detallados</h3>
                        <p>{data.capaConsultor.hallazgos}</p>

                        <h3 style={{ marginTop: '1.5rem' }}>Justificación</h3>
                        <ul>
                            {data.capaConsultor.justificacion.map((j, i) => <li key={i}>{j}</li>)}
                        </ul>

                        <h3 style={{ marginTop: '1.5rem' }}>SUPUESTOS</h3>
                        <ul style={{ color: '#666', fontStyle: 'italic' }}>
                            {data.capaConsultor.supuestos.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>

                        <h3 style={{ marginTop: '1.5rem' }}>Preguntas de Validación</h3>
                        <ul>
                            {data.capaConsultor.preguntasValidacion.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsPanel;
