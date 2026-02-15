import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import EntryList from '../components/EntryList';
import { getEntries } from '../utils/storage';
import { analyzeEmotionTrends } from '../utils/emotionTrends';

export default function Timeline() {
    const [entries, setEntries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setEntries(getEntries());
    }, []);

    // Emotion trends — recomputes when entries change
    const emotionTrends = useMemo(() => analyzeEmotionTrends(entries), [entries]);

    // Filtered entries based on search
    const filteredEntries = useMemo(() => {
        if (!searchQuery.trim()) return entries;
        const q = searchQuery.toLowerCase();
        return entries.filter((e) => e.text.toLowerCase().includes(q));
    }, [entries, searchQuery]);

    const totalWords = entries.reduce((sum, e) => {
        return sum + e.text.trim().split(/\s+/).filter(Boolean).length;
    }, 0);

    const daySpan =
        entries.length >= 2
            ? Math.floor(
                (new Date(entries[0].timestamp) -
                    new Date(entries[entries.length - 1].timestamp)) /
                (1000 * 60 * 60 * 24)
            )
            : 0;

    // Find the max count for bar scaling
    const maxCount = Math.max(...emotionTrends.map((e) => e.count), 1);

    return (
        <div className="timeline-page">
            <motion.div
                className="timeline-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="timeline-header">
                    <div>
                        <h1 className="timeline-title">Your Journal</h1>
                        <p className="timeline-subtitle">
                            A record of your thoughts, privately stored.
                        </p>
                    </div>
                </div>

                {/* Stats bar */}
                {entries.length > 0 && (
                    <motion.div
                        className="timeline-stats"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="stat-item">
                            <span className="stat-value">{entries.length}</span>
                            <span className="stat-label">Entries</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-value">{totalWords.toLocaleString()}</span>
                            <span className="stat-label">Words</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-value">{daySpan}</span>
                            <span className="stat-label">Day Span</span>
                        </div>
                    </motion.div>
                )}

                {/* Emotion Trends Dashboard */}
                {entries.length > 0 && (
                    <motion.div
                        className="emotion-dashboard"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="emotion-dashboard-title">Emotional Trends</h3>
                        <p className="emotion-dashboard-subtitle">
                            Based on recurring emotion-related keywords across entries
                        </p>
                        <div className="emotion-trends-grid">
                            {emotionTrends.map((trend) => (
                                <div className="emotion-trend-card" key={trend.name}>
                                    <span className="emotion-trend-name">{trend.name}</span>
                                    <div className="emotion-trend-count">
                                        <span className="emotion-trend-number" style={{ color: trend.color }}>
                                            {trend.count}
                                        </span>
                                        <span className="emotion-trend-label">
                                            {trend.count === 1 ? 'entry' : 'entries'}
                                        </span>
                                    </div>
                                    <div className="emotion-trend-bar-track">
                                        <motion.div
                                            className="emotion-trend-bar-fill"
                                            style={{ background: trend.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: trend.count > 0 ? `${(trend.count / maxCount) * 100}%` : '0%' }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {emotionTrends[0]?.count > 0 && (
                            <p className="emotion-dashboard-top">
                                Most frequent signal: <strong>{emotionTrends[0].name}</strong>
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Search bar */}
                <div className="timeline-search-wrapper">
                    <input
                        type="text"
                        className="timeline-search-input"
                        placeholder="Search entries…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="timeline-search-clear"
                            onClick={() => setSearchQuery('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Filtered entry list */}
                {searchQuery && filteredEntries.length === 0 ? (
                    <div className="search-no-results">
                        <p className="search-no-results-text">
                            No entries found for "{searchQuery}"
                        </p>
                    </div>
                ) : (
                    <EntryList entries={filteredEntries} />
                )}
            </motion.div>
        </div>
    );
}
