import React, { useState } from 'react';
import { useAI } from '../hooks/useAI';
import './AIAssistantPanel.css';

const AIAssistantPanel = ({ projectId, onClose }) => {
    const [question, setQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [aiSummary, setAiSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { summarizeProject, askQuestion } = useAI();

    const handleSummarize = async () => {
        setIsLoading(true);
        setAiResponse('');
        setAiSummary(null);
        try {
            const response = await summarizeProject(projectId);
            // Check if response has summary and recommendations (new format)
            if (response.summary && response.recommendations) {
                setAiSummary(response);
            } else {
                // Handle fallback response (old format)
                setAiResponse(response.summary || 'Project summary generated successfully.');
            }
        } catch (error) {
            setAiResponse('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAsk = async () => {
        if (!question.trim()) return;

        setIsLoading(true);
        setAiResponse('');
        setAiSummary(null);
        try {
            // For project-level questions, we can pass the projectId
            // In a real app, you might want to ask about specific tasks
            const response = await askQuestion(projectId, question);
            // Check if response has answer and confidence (new format)
            if (response.answer !== undefined && response.confidence !== undefined) {
                setAiResponse(response.answer);
            } else {
                // Handle fallback response (old format)
                setAiResponse(response.answer || response.summary || 'I have an answer for your question.');
            }
        } catch (error) {
            setAiResponse('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content ai-assistant-panel" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-content">
                        <h2>🤖 AI Assistant</h2>
                        <p className="header-subtitle">Your intelligent project companion</p>
                    </div>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="ai-section">
                    <div className="ai-section-header">
                        <div className="section-title">
                            <h3>📊 Project Summary</h3>
                            <p>Get an AI-powered analysis of your project status</p>
                        </div>
                        <button
                            className="summarize-button"
                            onClick={handleSummarize}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing...
                                </>
                            ) : (
                                'Generate Summary'
                            )}
                        </button>
                    </div>

                    {aiSummary && (
                        <div className="ai-response summary-response">
                            <div className="response-content">
                                <div className="summary-main">
                                    <h4>AI Analysis</h4>
                                    <p className="summary-text">{aiSummary.summary}</p>
                                </div>
                                {aiSummary.recommendations && aiSummary.recommendations.length > 0 && (
                                    <div className="recommendations">
                                        <h4>Recommendations:</h4>
                                        <ul>
                                            {aiSummary.recommendations.map((rec, index) => (
                                                <li key={index}>
                                                    <span className="rec-number">#{index + 1}</span>
                                                    <span className="rec-text">{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="ai-section">
                    <div className="ai-section-header">
                        <div className="section-title">
                            <h3>💬 Ask a Question</h3>
                            <p>Get insights about your project or tasks</p>
                        </div>
                    </div>
                    <div className="question-input-container">
                        <input
                            type="text"
                            placeholder="Ask anything about your project..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isLoading}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading && question.trim()) {
                                    handleAsk();
                                }
                            }}
                        />
                        <button
                            className="ask-button"
                            onClick={handleAsk}
                            disabled={isLoading || !question.trim()}
                        >
                            {isLoading ? <span className="spinner"></span> : 'Ask'}
                        </button>
                    </div>

                    {aiResponse && !aiSummary && (
                        <div className="ai-response question-response">
                            <div className="response-content">
                                <h4>AI Response</h4>
                                <p>{aiResponse}</p>
                            </div>
                        </div>
                    )}
                </div>

                {isLoading && !aiResponse && !aiSummary && (
                    <div className="loading-indicator">
                        <div className="spinner-large"></div>
                        <p>AI is thinking...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAssistantPanel;