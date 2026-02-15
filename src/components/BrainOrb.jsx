import { motion } from 'framer-motion';

export default function BrainOrb({ isTyping = false }) {
    return (
        <div className="brain-orb-container">
            {/* Outer glow rings */}
            <motion.div
                className="brain-orb-ring ring-outer"
                animate={
                    isTyping
                        ? {
                            scale: [1, 1.25, 1],
                            opacity: [0.15, 0.4, 0.15],
                        }
                        : {
                            scale: [1, 1.06, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }
                }
                transition={{
                    duration: isTyping ? 1.4 : 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="brain-orb-ring ring-mid"
                animate={
                    isTyping
                        ? {
                            scale: [1, 1.18, 1],
                            opacity: [0.2, 0.45, 0.2],
                        }
                        : {
                            scale: [1, 1.04, 1],
                            opacity: [0.15, 0.28, 0.15],
                        }
                }
                transition={{
                    duration: isTyping ? 1.0 : 3.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.3,
                }}
            />

            {/* Core orb */}
            <motion.div
                className="brain-orb-core"
                animate={
                    isTyping
                        ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                                '0 0 16px rgba(45, 212, 191, 0.3), inset 0 0 16px rgba(45, 212, 191, 0.15)',
                                '0 0 32px rgba(45, 212, 191, 0.5), inset 0 0 24px rgba(45, 212, 191, 0.3)',
                                '0 0 16px rgba(45, 212, 191, 0.3), inset 0 0 16px rgba(45, 212, 191, 0.15)',
                            ],
                        }
                        : {
                            scale: [1, 1.02, 1],
                            boxShadow: [
                                '0 0 12px rgba(45, 212, 191, 0.2), inset 0 0 12px rgba(45, 212, 191, 0.08)',
                                '0 0 20px rgba(45, 212, 191, 0.35), inset 0 0 16px rgba(45, 212, 191, 0.15)',
                                '0 0 12px rgba(45, 212, 191, 0.2), inset 0 0 12px rgba(45, 212, 191, 0.08)',
                            ],
                        }
                }
                transition={{
                    duration: isTyping ? 1.0 : 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Inner light shimmer */}
                <motion.div
                    className="brain-orb-shimmer"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: isTyping ? 4 : 10,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </motion.div>
        </div>
    );
}
