import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflectionCard({ reflection }) {
    const [expanded, setExpanded] = useState(false);

    if (!reflection) return null;

    return (
        <motion.div
            className="reflection-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Header */}
            <div className="reflection-header">
                <div className="reflection-concept-badge">
                    <span className="reflection-badge-icon">✦</span>
                    <span>{reflection.conceptName}</span>
                </div>
                <div className="reflection-confidence">
                    <span className="confidence-label">Confidence</span>
                    <div className="confidence-bar-track">
                        <motion.div
                            className="confidence-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${reflection.confidence}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                        />
                    </div>
                    <span className="confidence-value">{reflection.confidence}%</span>
                </div>
            </div>

            {/* Insight Text */}
            <p className="reflection-insight">{reflection.insightText}</p>

            {/* Citation */}
            <div className="reflection-citation">
                <span className="citation-icon">📚</span>
                <span>
                    Based on: <em>{reflection.citation}</em>
                </span>
            </div>

            {/* Expandable "Why this insight?" section */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="reflection-why-toggle"
            >
                <span>{expanded ? '▾' : '▸'} Why this insight?</span>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className="reflection-why-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <p className="why-explanation">{reflection.whyText}</p>

                        {/* Keyword frequency breakdown */}
                        <div className="keyword-breakdown">
                            <h4 className="keyword-breakdown-title">Detected Keywords</h4>
                            <div className="keyword-tags">
                                {Object.entries(reflection.keywordCounts).map(
                                    ([keyword, count]) => (
                                        <span key={keyword} className="keyword-tag">
                                            "{keyword}" <span className="keyword-count">× {count}</span>
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Matched entries preview */}
                        <div className="matched-entries">
                            <h4 className="matched-entries-title">
                                Found in {reflection.hitCount} of {reflection.totalEntries}{' '}
                                entries
                            </h4>
                            <div className="matched-entries-list">
                                {reflection.matchedEntries.slice(0, 5).map((me) => (
                                    <div key={me.entryId} className="matched-entry-item">
                                        <span className="matched-entry-date">
                                            {new Date(me.timestamp).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="matched-entry-preview">
                                            {me.preview}...
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Disclaimer */}
            <div className="reflection-disclaimer">
                <span className="disclaimer-icon">ℹ️</span>
                <span>
                    Pensieve is not therapy or medical advice. It only supports reflection.
                </span>
            </div>
        </motion.div>
    );
}
