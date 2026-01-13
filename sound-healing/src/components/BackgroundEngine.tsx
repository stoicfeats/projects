'use client';

import { useEffect, useRef } from 'react';
import { useApp } from './AppContext';

type BlobData = {
    el: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function BackgroundEngine() {
    const { activeMode } = useApp();
    const containerRef = useRef<HTMLDivElement>(null);
    const blobsRef = useRef<BlobData[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear existing blobs
        containerRef.current.innerHTML = '';
        blobsRef.current = [];

        // Initialize Blobs - smaller, slower, lighter
        const blobCount = 2;
        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.className = 'blob';
            const size = Math.random() * 120 + 10; // Much smaller: 80-200px instead of 200-500px
            blob.style.width = size + 'px';
            blob.style.height = size + 'px';

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;

            blob.style.left = startX + '%';
            blob.style.top = startY + '%';
            blob.style.background = activeMode.color;
            blob.style.opacity = '0.35'; // More visible

            containerRef.current.appendChild(blob);

            blobsRef.current.push({
                el: blob,
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 0.05, // Much slower base speed
                vy: (Math.random() - 0.5) * 0.05
            });
        }

        const animate = () => {
            blobsRef.current.forEach(b => {
                // Update velocity based on active mode speed
                // Note: In the original, they just multiplied vx/vy. Here we should probably smooth it or just clamp it.
                // But the original `updateMode` actually RESET the vx/vy with new randomness * speed.
                // We will do that in a separate effect when mode changes.

                b.x += b.vx;
                b.y += b.vy;

                if (b.x < -10 || b.x > 110) b.vx *= -1;
                if (b.y < -10 || b.y > 110) b.vy *= -1;

                b.el.style.left = b.x + '%';
                b.el.style.top = b.y + '%';
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationRef.current);
    }, []); // Run once on mount

    // Effect to handle mode updates for existing blobs
    useEffect(() => {
        blobsRef.current.forEach(b => {
            b.vx = (Math.random() - 0.5) * activeMode.speed * 0.15; // Reduced speed multiplier
            b.vy = (Math.random() - 0.5) * activeMode.speed * 0.15;
            b.el.style.background = activeMode.color;
        });
    }, [activeMode]);

    return (
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <div id="canvas" ref={containerRef} className="canvas-container" />
        </>
    );
}
