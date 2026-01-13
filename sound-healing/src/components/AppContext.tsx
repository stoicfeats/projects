'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ModeConfig = {
    title: string;
    sub: string;
    freq: string;
    bpm: string;
    label: string;
    speed: number;
    color: string;
};

const MODE_CONFIGS: Record<string, ModeConfig> = {
    hero: {
        title: "Sound",
        sub: "Healing",
        freq: "432Hz",
        bpm: "60 BPM",
        label: "DEEP REST",
        speed: 0.1,
        color: 'linear-gradient(135deg, #8e8e8e 0%, #ffffff 50%, #4a4a4a 100%)'
    },
    meditation: {
        title: "Mudra",
        sub: "Minds",
        freq: "432Hz",
        bpm: "60 BPM",
        label: "MEDITATION",
        speed: 0.1,
        color: 'linear-gradient(135deg, #8e8e8e 0%, #ffffff 50%, #4a4a4a 100%)'
    },
    aerobics: {
        title: "Sonic",
        sub: "Nature",
        freq: "128 BPM",
        bpm: "High Energy",
        label: "CARDIO",
        speed: 0.8,
        color: 'linear-gradient(135deg, #00f2ff 0%, #ffffff 50%, #0066ff 100%)'
    },
    zumba: {
        title: "Zumba",
        sub: "Party",
        freq: "Latin",
        bpm: "145 BPM",
        label: "DANCE",
        speed: 1.5,
        color: 'linear-gradient(135deg, #ff0055 0%, #ffffff 50%, #ffcc00 100%)'
    },
    yoga: {
        title: "Yoga",
        sub: "Flow",
        freq: "OM",
        bpm: "Slow Flow",
        label: "BALANCE",
        speed: 0.3,
        color: 'linear-gradient(135deg, #00ff88 0%, #ffffff 50%, #0088ff 100%)'
    },
    session: {
        title: "Book",
        sub: "Session",
        freq: "LIVE",
        bpm: "Interactive",
        label: "CONNECT",
        speed: 0.2,
        color: 'linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #888888 100%)'
    }
};

type AppContextType = {
    activeSection: string;
    activeMode: ModeConfig;
    setActiveSection: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState('hero');
    const [activeMode, setActiveMode] = useState(MODE_CONFIGS.hero);

    useEffect(() => {
        // Map section IDs to modes
        let modeKey = activeSection;
        if (!MODE_CONFIGS[modeKey]) {
            // Fallbacks if section name doesn't exactly match a mode config
            if (activeSection === 'sessions') modeKey = 'session';
            else modeKey = 'hero';
        }
        setActiveMode(MODE_CONFIGS[modeKey] || MODE_CONFIGS.hero);
    }, [activeSection]);

    return (
        <AppContext.Provider value={{ activeSection, activeMode, setActiveSection }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
