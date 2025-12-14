import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaCarSide } from 'react-icons/fa';

interface IntroAnimationProps {
    onAnimationComplete?: () => void;
    className?: string;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({
    onAnimationComplete,
    className = ''
}) => {
    const [animationStage, setAnimationStage] = useState<'entry' | 'reveal' | 'finish'>('entry');
    const [showFrontCar, setShowFrontCar] = useState(true);
    const [showSideCar, setShowSideCar] = useState(false);

    useEffect(() => {
        // Entry stage: FaCar zooms in slowly (0-3s)
        const entryTimer = setTimeout(() => {
            setAnimationStage('reveal'); // Skip transition, go straight to reveal
            setShowFrontCar(false);
            setShowSideCar(true);
        }, 3000);

        return () => clearTimeout(entryTimer);
    }, []);

    useEffect(() => {
        if (animationStage === 'reveal') {
            // Reveal: Car moves right, text appears (3.0-6.0s)
            const finishTimer = setTimeout(() => {
                setAnimationStage('finish');
                setShowSideCar(false);
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }, 3000);

            return () => clearTimeout(finishTimer);
        }
    }, [animationStage, onAnimationComplete]);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative flex items-center justify-center h-32 w-full max-w-2xl overflow-visible">

                {/* Entry Animation: FaCar (Front view) zooming in SLOWLY */}
                <AnimatePresence>
                    {showFrontCar && (
                        <motion.div
                            initial={{ scale: 0.1, opacity: 0 }}
                            animate={{ scale: 1.8, opacity: 1 }}
                            exit={{ scale: 2.2, opacity: 0 }}
                            transition={{
                                duration: 3.0, // Very slow zoom
                                ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
                            }}
                            className="absolute"
                        >
                            <FaCar className="text-orange-500 text-9xl" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reveal Animation: FaCarSide moving right with text reveal */}
                <div className="relative flex items-center justify-start w-full">
                    <AnimatePresence>
                        {showSideCar && (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{
                                    x: animationStage === 'reveal' ? 280 : -100, // Move further to clear the text
                                    opacity: animationStage === 'reveal' ? [0, 1, 1, 0] : 1 // Fade in, stay, then fade out
                                }}
                                transition={{
                                    x: {
                                        duration: 3.0,
                                        ease: [0.22, 1, 0.36, 1]
                                    },
                                    opacity: {
                                        duration: 3.0,
                                        times: [0, 0.1, 0.85, 1] // Fade in quickly, stay visible, fade out at end
                                    }
                                }}
                                className="absolute z-20 left-0"
                            >
                                <FaCarSide className="text-orange-500 text-8xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Text Reveal Effect - appears as car moves */}
                    {(animationStage === 'reveal' || animationStage === 'finish') && (
                        <div className="relative overflow-hidden ml-0">
                            <motion.div
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{
                                    duration: 2.5,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.3 // Start revealing slightly after car starts moving
                                }}
                            >
                                <h1
                                    className="text-7xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent whitespace-nowrap font-['Poppins','Inter',sans-serif] tracking-[0.02em]"
                                >
                                    EasyGo
                                </h1>
                            </motion.div>
                        </div>
                    )}

                    {/* Final State: Just the text */}
                    {animationStage === 'finish' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute left-0"
                        >
                            <h1
                                className="text-7xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent whitespace-nowrap font-['Poppins','Inter',sans-serif] tracking-[0.02em]"
                            >
                                EasyGo
                            </h1>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntroAnimation;
