"use client"

import { motion } from "motion/react"

function LoadingCircleSpinner() {
    return (
        <div className="container">
            <motion.div
                className="spinner"
                animate={{ transform: "rotate(360deg)" }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;    
                border-radius: 8px;
            }

            .spinner {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 3px solid #E5E7EB;
                border-top-color: #FFFFFF;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingCircleSpinner
