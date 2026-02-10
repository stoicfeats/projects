'use client';

import { AppProvider } from '@/components/AppContext';
import { BrowserCheck } from '@/components/BrowserCheck';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize Firebase on client side only
        import('@/lib/firebase').catch((error) => {
            console.error('Failed to initialize Firebase:', error);
        });
    }, []);

    return (
        <AppProvider>
            <BrowserCheck />
            {children}
        </AppProvider>
    );
}
