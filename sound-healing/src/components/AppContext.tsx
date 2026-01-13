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
        speed: 0.15,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' // Purple gradient
    },
    meditation: {
        title: "Mudra",
        sub: "Minds",
        freq: "432Hz",
        bpm: "60 BPM",
        label: "MEDITATION",
        speed: 0.1,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' // Deep purple
    },
    aerobics: {
        title: "Sonic",
        sub: "Energy",
        freq: "128 BPM",
        bpm: "High Energy",
        label: "CARDIO",
        speed: 0.8,
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' // Pink-red energy
    },
    zumba: {
        title: "Zumba",
        sub: "Party",
        freq: "Latin",
        bpm: "145 BPM",
        label: "DANCE",
        speed: 1.2,
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' // Pink-yellow fiesta
    },
    yoga: {
        title: "Yoga",
        sub: "Flow",
        freq: "OM",
        bpm: "Slow Flow",
        label: "BALANCE",
        speed: 0.25,
        color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' // Green calm
    },
    session: {
        title: "Book",
        sub: "Session",
        freq: "LIVE",
        bpm: "Interactive",
        label: "CONNECT",
        speed: 0.2,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' // Cyan-blue connect
    }
};

type AppContextType = {
    activeSection: string;
    activeMode: ModeConfig;
    setActiveSection: (id: string) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState('hero');
    const [activeMode, setActiveMode] = useState(MODE_CONFIGS.hero);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <AppContext.Provider value={{ activeSection, activeMode, setActiveSection, theme, toggleTheme }}>
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
