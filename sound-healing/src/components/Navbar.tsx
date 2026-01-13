'use client';

import { useApp } from './AppContext';
import { useState } from 'react';

// Sun icon for light mode
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

export default function Navbar() {
    const { setActiveSection, activeSection, theme, toggleTheme } = useApp();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Aerobics', id: 'aerobics' },
        { name: 'Yoga', id: 'yoga' },
        { name: 'Zumba', id: 'zumba' },
        { name: 'Meditation', id: 'meditation' },
    ];

    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setMobileMenuOpen(false);
    };

    return (
        <header>
            <div
                className="logo"
                onClick={() => handleNavClick('hero')}
            >
                Mudra Minds
            </div>
            
            {/* Center Navigation */}
            <nav className="nav-center">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={activeSection === item.id ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.id);
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Right Actions */}
            <div className="nav-actions">
                <span 
                    className={`nav-action ${activeSection === 'session' ? 'active' : ''}`}
                    onClick={() => handleNavClick('session')}
                >
                    Sessions
                </span>
                <span 
                    className="nav-action"
                    onClick={() => handleNavClick('session')}
                >
                    Contact Us
                </span>
                <button 
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeSection === item.id ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.id);
                        }}
                    >
                        {item.name}
                    </a>
                ))}
                <div className="mobile-menu-divider"></div>
                <a
                    href="#session"
                    className={activeSection === 'session' ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('session');
                    }}
                >
                    Sessions
                </a>
                <a
                    href="#session"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('session');
                    }}
                >
                    Contact Us
                </a>
                <div className="mobile-menu-divider"></div>
                <button 
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </header>
    );
}
