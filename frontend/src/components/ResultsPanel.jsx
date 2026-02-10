import React, { useState } from 'react';

const ResultsPanel = ({ data }) => {
    const [activeTab, setActiveTab] = useState('cliente');

    if (!data) return null;

    // The backend now returns simplified structure: { cliente, consultor } 
    // where both are Markdown strings.
    const content = activeTab === 'cliente' ? data.cliente : data.consultor;

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

            <div className="tab-content" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                <div className="markdown-body">
                    {/* Basic rendering of Markdown as text with pre-wrap for now, 
                        preserving headers and lists if they are simple text. 
                        For a real product, we'd use react-markdown here. */}
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ResultsPanel;
