'use client';

import { useEffect, useState } from 'react';

export function BrowserCheck() {
    const [isSupported, setIsSupported] = useState(true);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // Check browser capabilities
        const checkBrowserSupport = () => {
            const hasBasicSupport =
                typeof window !== 'undefined' &&
                'fetch' in window &&
                'Promise' in window &&
                Array.isArray([].includes);

            const hasMediumSupport =
                hasBasicSupport &&
                'requestAnimationFrame' in window &&
                'localStorage' in window;

            const hasFullSupport =
                hasMediumSupport &&
                'crypto' in window &&
                'IntersectionObserver' in window;

            if (!hasBasicSupport) {
                setIsSupported(false);
                setShowWarning(true);
                return false;
            }

            // Warn but don't block if missing some features
            if (!hasFullSupport) {
                console.warn('Some features may not work correctly on this browser');
            }

            return true;
        };

        checkBrowserSupport();
    }, []);

    if (!isSupported) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                color: '#fff',
                textAlign: 'center',
                padding: '20px'
            }}>
                <div style={{ maxWidth: '500px' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Browser Not Supported</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#ccc' }}>
                        Your browser is too old to run this application.
                    </p>
                    <p style={{ fontSize: '1rem', color: '#999', marginBottom: '30px' }}>
                        Please upgrade to a modern browser:
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer"
                            style={{ padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
                            Chrome
                        </a>
                        <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer"
                            style={{ padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
                            Firefox
                        </a>
                        <a href="https://www.apple.com/safari/" target="_blank" rel="noopener noreferrer"
                            style={{ padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
                            Safari
                        </a>
                        <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer"
                            style={{ padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
                            Edge
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
