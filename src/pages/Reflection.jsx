import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReflectionCard from '../components/ReflectionCard';
import { checkReflectionUnlock } from '../utils/storage';
import { generateReflection } from '../utils/reflectionEngine';

export default function Reflection() {
    const [unlockStatus, setUnlockStatus] = useState(null);
    const [reflection, setReflection] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Small delay for dramatic effect
        const timer = setTimeout(() => {
            const status = checkReflectionUnlock();
            setUnlockStatus(status);

            if (status.unlocked) {
                const result = generateReflection();
                setReflection(result);
            }

            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="reflection-page">
                <div className="reflection-loading">
                    <motion.div
                        className="reflection-loading-orb"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <p className="reflection-loading-text">Analyzing your entries…</p>
                </div>
            </div>
        );
    }

    if (!unlockStatus?.unlocked) {
        return (
            <div className="reflection-page">
                <motion.div
                    className="reflection-locked"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="locked-icon-container">
                        <span className="locked-icon">🔒</span>
                    </div>
                    <h2 className="locked-title">Reflections Locked</h2>
                    <p className="locked-reason">{unlockStatus?.reason}</p>

                    <div className="locked-progress">
                        <div className="locked-progress-item">
                            <span className="progress-check">
                                {(unlockStatus?.entriesCount || 0) >= 3 ? '✓' : '○'}
                            </span>
                            <span>
                                At least 3 entries ({unlockStatus?.entriesCount || 0}/3)
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/write')}
                        className="locked-cta"
                    >
                        Start Writing
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="reflection-page">
            <motion.div
                className="reflection-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="reflection-page-header">
                    <h1 className="reflection-page-title">Your Reflection</h1>
                    <p className="reflection-page-subtitle">
                        Based on patterns detected across your journal entries.
                    </p>
                </div>

                {reflection ? (
                    <ReflectionCard reflection={reflection} />
                ) : (
                    <motion.div
                        className="no-patterns"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="no-patterns-icon">🔍</span>
                        <h3 className="no-patterns-title">No Strong Patterns Found</h3>
                        <p className="no-patterns-text">
                            Pensieve couldn&apos;t find recurring themes that appear in 3 or
                            more entries. Keep journaling — patterns may emerge over time.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
