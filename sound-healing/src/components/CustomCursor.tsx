'use client';

import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            id="cursor"
            style={{
                x: mouseX,
                y: mouseY,
                position: 'fixed',
                left: 0,
                top: 0,
                pointerEvents: 'none'
            }}
        />
    );
}
