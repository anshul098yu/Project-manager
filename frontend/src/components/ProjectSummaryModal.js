import React from 'react';
import './ProjectSummaryModal.css';

const ProjectSummaryModal = ({ summary, onClose }) => {
    // Function to clean text by removing markdown asterisks
    const cleanText = (text) => {
        if (!text) return '';
        return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
    };

    // Function to format the summary text
    const formatSummaryText = (text) => {
        if (!text) return null;

        // Clean the text
        const cleaned = cleanText(text);

        // Split into sections
        const sections = cleaned.split('\n\n');

        return sections.map((section, index) => {
            // If it looks like a recommendation item (starts with number)
            if (section.match(/^\d+\.\s/)) {
                return (
                    <div key={index} className="recommendation-item-simple">
                        <p>{section}</p>
                    </div>
                );
            }

            // Regular paragraph
            return (
                <p key={index} className="summary-paragraph">
                    {section}
                </p>
            );
        });
    };

    // Function to format recommendations
    const formatRecommendations = (recommendations) => {
        if (!recommendations) return null;

        // Handle both array and string formats
        let items = [];

        if (Array.isArray(recommendations)) {
            items = recommendations.map(item => cleanText(item));
        } else if (typeof recommendations === 'string') {
            // Clean and split the string
            const cleaned = cleanText(recommendations);
            items = cleaned.split(/\n\d+\.\s*/).filter(item => item.trim() !== '');
        }

        return items.map((item, index) => (
            <li key={index} className="recommendation-item">
                <div className="rec-icon">✨</div>
                <div className="rec-content">
                    <span className="rec-number">#{index + 1}</span>
                    <span className="rec-text">{item.trim()}</span>
                </div>
            </li>
        ));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content project-summary-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-content">
                        <h2>📊 Project Summary</h2>
                        <p className="header-subtitle">AI-Powered Analysis & Recommendations</p>
                    </div>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="summary-content">
                    <div className="summary-section">
                        <div className="section-header">
                            <h3>📋 AI Analysis</h3>
                            <div className="divider"></div>
                        </div>
                        <div className="summary-text-container">
                            {formatSummaryText(summary.summary)}
                        </div>
                    </div>

                    {summary.recommendations && summary.recommendations.length > 0 && (
                        <div className="recommendations-section">
                            <div className="section-header">
                                <h3>💡 Recommendations</h3>
                                <div className="divider"></div>
                            </div>
                            <ul className="recommendations-list">
                                {formatRecommendations(summary.recommendations)}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <div className="footer-content">
                        <button className="close-footer-button" onClick={onClose}>
                            ✅ Close Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSummaryModal;