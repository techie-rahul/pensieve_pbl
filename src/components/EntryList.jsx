import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntryList({ entries }) {
    const [expandedId, setExpandedId] = useState(null);

    if (!entries || entries.length === 0) {
        return (
            <div className="entry-list-empty">
                <p className="entry-list-empty-icon">📝</p>
                <p className="entry-list-empty-text">No entries yet</p>
                <p className="entry-list-empty-hint">
                    Start writing to see your journal entries here.
                </p>
            </div>
        );
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPreview = (text, maxLen = 120) => {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen).trim() + '…';
    };

    const getWordCount = (text) => {
        return text.trim().split(/\s+/).filter(Boolean).length;
    };

    return (
        <div className="entry-list">
            {entries.map((entry, index) => {
                const isExpanded = expandedId === entry.id;

                return (
                    <motion.div
                        key={entry.id}
                        className={`entry-card ${isExpanded ? 'expanded' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    >
                        <div className="entry-card-header">
                            <div className="entry-date-group">
                                <span className="entry-date">{formatDate(entry.timestamp)}</span>
                                <span className="entry-time">{formatTime(entry.timestamp)}</span>
                            </div>
                            <div className="entry-meta">
                                <span className="entry-word-count">
                                    {getWordCount(entry.text)} words
                                </span>
                                <span className={`entry-expand-icon ${isExpanded ? 'rotated' : ''}`}>
                                    ▸
                                </span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    key="full"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="entry-full-text"
                                >
                                    <p>{entry.text}</p>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="preview"
                                    className="entry-preview"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {getPreview(entry.text)}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
