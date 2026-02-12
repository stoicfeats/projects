'use client';

import { useEffect, useState } from 'react';

export function BrowserCheck() {
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Only block ancient browsers (IE11 and below)
        const checkBrowserSupport = () => {
            try {
                // Check for basic ES6 support
                const hasES6 = typeof Promise !== 'undefined' && 
                               typeof Array.prototype.includes === 'function' &&
                               typeof Object.assign === 'function';
                
                // Check for fetch API (not in IE11)
                const hasFetch = typeof fetch === 'function';
                
                // Detect IE11 explicitly (using user agent as TypeScript-safe approach)
                const isIE11 = /Trident\/7\.0/.test(navigator.userAgent);
                
                // Only block if it's IE11 or missing critical features
                if (isIE11 || !hasES6 || !hasFetch) {
                    console.error('Browser not supported:', { isIE11, hasES6, hasFetch });
                    setIsSupported(false);
                    return false;
                }

                // Log browser info for debugging
                console.log('Browser check passed:', {
                    userAgent: navigator.userAgent,
                    hasES6,
                    hasFetch
                });

                return true;
            } catch (error) {
                // If any check fails, assume unsupported
                console.error('Browser check error:', error);
                setIsSupported(false);
                return false;
            }
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
