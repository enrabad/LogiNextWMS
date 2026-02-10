import React, { useState } from 'react';

const ContextForm = ({ onGenerate, loading }) => {
    const [formData, setFormData] = useState({
        objective: 'OTIF',
        process: 'Picking',
        observations: '',
        constraints: '',
        priority: 'Servicio'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(formData);
    };

    return (
        <aside className="sidebar">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contexto de la Auditoría</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Objetivo del Cliente</label>
                    <select name="objective" value={formData.objective} onChange={handleChange}>
                        <option value="OTIF">OTIF (On-Time In-Full)</option>
                        <option value="Coste">Reducción de Costes</option>
                        <option value="Capacidad">Aumento de Capacidad</option>
                        <option value="Lead Time">Mejora de Lead Time</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Proceso / Área</label>
                    <select name="process" value={formData.process} onChange={handleChange}>
                        <option value="Recepción">Recepción</option>
                        <option value="Picking">Picking / Preparación</option>
                        <option value="Expedición">Expedición</option>
                        <option value="Inventario">Inventario</option>
                        <option value="Layout">Layout / Flujos</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Observaciones del Consultor</label>
                    <textarea
                        name="observations"
                        placeholder="Ej: Cuellos de botella en packing, recorridos largos..."
                        value={formData.observations}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Restricciones</label>
                    <textarea
                        name="constraints"
                        placeholder="Presupuesto limitado, falta de personal..."
                        value={formData.constraints}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Criterio de Priorización</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="Servicio">Servicio al Cliente</option>
                        <option value="Coste">Mínimo Coste</option>
                        <option value="Rapidez">Rapidez de Implementación</option>
                        <option value="Riesgo">Mínimo Riesgo</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Generando...' : 'Generar Plan de Acción'}
                </button>
            </form>
        </aside>
    );
};

export default ContextForm;
