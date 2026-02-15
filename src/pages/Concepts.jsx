import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import conceptsData from '../data/concepts.json';

export default function Concepts() {
    const [expandedId, setExpandedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConcepts = useMemo(() => {
        if (!searchQuery.trim()) return conceptsData;
        const q = searchQuery.toLowerCase();
        return conceptsData.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
    }, [searchQuery]);

    const toggle = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="concepts-page">
            <motion.div
                className="concepts-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="concepts-header">
                    <h1 className="concepts-title">Concept Library</h1>
                    <p className="concepts-subtitle">
                        The psychological and philosophical frameworks behind Pensieve's reflections.
                    </p>
                </div>

                {/* Search bar */}
                <div className="timeline-search-wrapper">
                    <input
                        type="text"
                        className="timeline-search-input"
                        placeholder="Search by concept name or keyword…"
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

                {/* Concept cards */}
                {filteredConcepts.length === 0 ? (
                    <div className="search-no-results">
                        <p className="search-no-results-text">
                            No concepts found for "{searchQuery}"
                        </p>
                    </div>
                ) : (
                    <div className="concepts-grid">
                        {filteredConcepts.map((concept, index) => {
                            const isExpanded = expandedId === concept.id;

                            return (
                                <motion.div
                                    key={concept.id}
                                    className={`concept-card ${isExpanded ? 'expanded' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <div className="concept-card-main">
                                        <h3 className="concept-name">{concept.name}</h3>
                                        <p className="concept-citation">{concept.citation}</p>
                                        <p className="concept-description">{concept.description}</p>

                                        {/* Keyword tags */}
                                        <div className="concept-tags">
                                            {concept.keywords.slice(0, 5).map((kw) => (
                                                <span className="concept-tag" key={kw}>{kw}</span>
                                            ))}
                                            {concept.keywords.length > 5 && (
                                                <span className="concept-tag concept-tag-more">
                                                    +{concept.keywords.length - 5}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            className="concept-toggle"
                                            onClick={() => toggle(concept.id)}
                                        >
                                            {isExpanded ? 'Show Less' : 'Learn More'}
                                        </button>
                                    </div>

                                    {/* Expandable section */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                className="concept-expanded"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="concept-expanded-inner">
                                                    <div className="concept-detail-section">
                                                        <h4 className="concept-detail-label">Why Pensieve Uses This</h4>
                                                        <p className="concept-detail-text">
                                                            {concept.whyExplanation
                                                                .replace('{matchedKeywords}', concept.keywords.slice(0, 3).join(', '))
                                                                .replace('{frequency}', 'multiple occurrences')
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="concept-detail-section">
                                                        <h4 className="concept-detail-label">Example Trigger Words</h4>
                                                        <div className="concept-tags">
                                                            {concept.keywords.map((kw) => (
                                                                <span className="concept-tag" key={kw}>{kw}</span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="concept-detail-section">
                                                        <h4 className="concept-detail-label">Sample Insight</h4>
                                                        <p className="concept-detail-text concept-detail-insight">
                                                            {concept.insightTemplate
                                                                .replace('{hitCount}', '3')
                                                                .replace('{totalEntries}', '5')
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
