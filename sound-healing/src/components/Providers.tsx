'use client';

import { AppProvider } from '@/components/AppContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            {children}
        </AppProvider>
    );
}
