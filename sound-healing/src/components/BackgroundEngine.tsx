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

        // Initialize Blobs - multiple colorful blobs
        const blobCount = 5;
        const blobColors = [
            'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', // warm orange-red
            'linear-gradient(135deg, #5f27cd 0%, #48dbfb 100%)', // purple-cyan
            'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)', // teal-blue
            'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)', // pink-magenta
            'linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)', // green-emerald
        ];
        
        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.className = 'blob';
            const size = Math.random() * 200 + 150; // Bigger: 150-350px
            blob.style.width = size + 'px';
            blob.style.height = size + 'px';

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;

            blob.style.left = startX + '%';
            blob.style.top = startY + '%';
            // Use section color if available, otherwise use rotating colors
            blob.style.background = activeMode.color !== 'linear-gradient(135deg, #8e8e8e 0%, #ffffff 50%, #4a4a4a 100%)' 
                ? activeMode.color 
                : blobColors[i % blobColors.length];
            blob.style.opacity = '0.4';

            containerRef.current.appendChild(blob);

            blobsRef.current.push({
                el: blob,
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08
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
        const blobColors = [
            'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
            'linear-gradient(135deg, #5f27cd 0%, #48dbfb 100%)',
            'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
            'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)',
            'linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)',
        ];
        
        blobsRef.current.forEach((b, i) => {
            b.vx = (Math.random() - 0.5) * activeMode.speed * 0.2;
            b.vy = (Math.random() - 0.5) * activeMode.speed * 0.2;
            // Use section-specific color, or colorful defaults for hero/neutral sections
            const isNeutral = activeMode.color === 'linear-gradient(135deg, #8e8e8e 0%, #ffffff 50%, #4a4a4a 100%)' ||
                             activeMode.color === 'linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #888888 100%)';
            b.el.style.background = isNeutral ? blobColors[i % blobColors.length] : activeMode.color;
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
