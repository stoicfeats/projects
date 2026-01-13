'use client';

import { useApp } from './AppContext';

export default function Navbar() {
    const { setActiveSection, activeSection } = useApp();

    const navItems = [
        { name: 'Aerobics', id: 'aerobics' },
        { name: 'Yoga', id: 'yoga' },
        { name: 'Zumba', id: 'zumba' },
        { name: 'Meditation', id: 'meditation' },
        { name: 'Sessions', id: 'session' },
    ];

    return (
        <header>
            <div
                className="logo"
                onClick={() => setActiveSection('hero')}
            >
                Mudra Minds
            </div>
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={activeSection === item.id ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection(item.id);
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
