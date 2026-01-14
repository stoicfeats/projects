'use client';

import { useApp } from './AppContext';
import { motion } from 'framer-motion';

export default function SectionsManager() {
    const { activeSection, activeMode } = useApp();

    return (
        <main>
            {/* HERO SECTION */}
            <section id="hero" className={activeSection === 'hero' ? 'active' : ''}>
                {/* First Screen - Centered Title */}
                <div className="hero-landing">
                    <div className="meta">
                        <span>{activeMode.freq}</span>
                        <span>{activeMode.bpm}</span>
                        <span>{activeMode.label}</span>
                    </div>
                    <h1>
                        <span className="word-wrapper">
                            <motion.span
                                key={activeMode.title}
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="word"
                            >
                                {activeMode.title}
                            </motion.span>
                        </span>
                        <span className="word-wrapper">
                            <motion.span
                                key={activeMode.sub}
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="word"
                            >
                                {activeMode.sub}
                            </motion.span>
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#888', fontStyle: 'italic', marginBottom: '8px' }}>
                        "नाद ब्रह्म" — Nāda Brahma
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>
                        Scroll to explore ↓
                    </p>
                </div>

                {/* Below Content - Info Left, Quick Book Right */}
                <div className="hero-content-below">
                    <div className="hero-grid">
                        {/* Left Side - Sound Healing Info */}
                        <div className="hero-info">
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px', background: 'linear-gradient(to right, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Welcome to Mudra Minds
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#999', lineHeight: '1.8', marginBottom: '40px' }}>
                                Sound is the Divine. Ancient wisdom teaches that the universe was created through sound vibration. 
                                Our practice combines sacred frequencies with modern wellness for complete transformation.
                            </p>

                            {/* Sanskrit Concepts Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <p style={{ fontSize: '2rem', marginBottom: '8px' }}>ॐ</p>
                                    <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>OM (Aum)</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Primordial sound of creation</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <p style={{ fontSize: '2rem', marginBottom: '8px' }}>प्राण</p>
                                    <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>Prāṇa</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Life force within breath</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <p style={{ fontSize: '2rem', marginBottom: '8px' }}>शांति</p>
                                    <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>Shānti</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Peace & tranquility</p>
                                </div>
                            </div>

                            {/* What is Sound Healing */}
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
                                    What is Sound Healing?
                                </h3>
                                <p style={{ fontSize: '1rem', color: '#888', lineHeight: '1.8', marginBottom: '16px' }}>
                                    <strong style={{ color: '#bbb' }}>Nāda Yoga</strong> (नाद योग) is the ancient yoga of sound. 
                                    "Nāda" means sound or flow, and this practice uses vibrations to harmonize body, mind, and spirit.
                                </p>
                                <p style={{ fontSize: '1rem', color: '#888', lineHeight: '1.8' }}>
                                    Through instruments like <strong style={{ color: '#bbb' }}>Singing Bowls</strong>, 
                                    <strong style={{ color: '#bbb' }}> Gongs</strong>, and <strong style={{ color: '#bbb' }}>Tuning Forks</strong> 
                                    tuned to healing frequencies (432Hz, 528Hz), we create immersive sound experiences that promote deep relaxation and healing.
                                </p>
                            </div>

                            {/* Benefits Cards */}
                            <h3 style={{ fontSize: '1.4rem', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                                Benefits of Sound Healing
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🧘</p>
                                    <p style={{ fontSize: '0.95rem', color: '#ccc', fontWeight: '500', marginBottom: '4px' }}>Deep Relaxation</p>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>Activates parasympathetic nervous system</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>😴</p>
                                    <p style={{ fontSize: '0.95rem', color: '#ccc', fontWeight: '500', marginBottom: '4px' }}>Better Sleep</p>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>Reduces insomnia and anxiety</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🧠</p>
                                    <p style={{ fontSize: '0.95rem', color: '#ccc', fontWeight: '500', marginBottom: '4px' }}>Mental Clarity</p>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>Improves focus and concentration</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>💆</p>
                                    <p style={{ fontSize: '0.95rem', color: '#ccc', fontWeight: '500', marginBottom: '4px' }}>Stress Relief</p>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>Lowers cortisol levels naturally</p>
                                </div>
                            </div>

                            {/* Our Services */}
                            <h3 style={{ fontSize: '1.4rem', color: '#fff', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                                Our Services
                            </h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>🎵</span>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: '500', marginBottom: '2px' }}>Sound Bath Sessions</p>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Immersive 432Hz healing experience</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>🧘‍♀️</span>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: '500', marginBottom: '2px' }}>Yoga & Meditation</p>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Traditional Hatha, Vinyasa & Pranayama</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>💃</span>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: '500', marginBottom: '2px' }}>Aerobics & Zumba</p>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>High-energy fitness with rhythm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar - Quick Book */}
                        <div className="hero-sidebar">
                            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Quick Book</h4>
                            
                            <div style={{ marginBottom: '24px' }}>
                                <p style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>Next Session</p>
                                <p style={{ fontSize: '1rem', color: '#fff', marginBottom: '4px' }}>Morning Yoga Flow</p>
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>Tomorrow, 6:00 AM</p>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <p style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>Sound Bath</p>
                                <p style={{ fontSize: '1rem', color: '#fff', marginBottom: '4px' }}>432Hz Healing Circle</p>
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>Saturday, 7:00 PM</p>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '20px' }}>
                                <p style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '12px' }}>Contact</p>
                                <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>📍 Mumbai, India</p>
                                <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>📞 +91 98765 43210</p>
                                <p style={{ fontSize: '0.9rem', color: '#aaa' }}>✉️ namaste@mudra.in</p>
                            </div>

                            <button 
                                onClick={() => {}} 
                                style={{ 
                                    width: '100%', 
                                    background: '#fff', 
                                    color: '#000', 
                                    border: 'none', 
                                    padding: '14px 20px', 
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* AEROBICS SECTION - Business offering with meaning and benefits */}
            <section id="aerobics" className={`content-section ${activeSection === 'aerobics' ? 'active' : ''}`}>
                <div className="content-wrapper">
                    {/* Section Intro */}
                    <div className="section-intro">
                        <h2>Aerobics</h2>
                        <p className="section-tagline">High-energy rhythmic movement to boost cardiovascular health and transform your fitness journey.</p>
                        
                        <div className="meaning">
                            <strong>What is Aerobics?</strong> Aerobics, derived from the Greek word "aero" meaning air, is a form of physical exercise that combines rhythmic aerobic movements with stretching and strength training routines. Our aerobics program is designed to improve all elements of fitness through structured, music-driven workouts that elevate your heart rate while keeping you engaged and motivated.
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="text-block">
                        <h3>Our Aerobics Programs</h3>
                        <p>We offer a variety of aerobics classes tailored to different fitness levels and goals. Each session is crafted by certified instructors who blend traditional techniques with modern fitness science.</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Cardio Blast</h3>
                            <p>An intense 45-minute high-intensity interval session designed for maximum caloric burn. Perfect for those looking to shed weight quickly while building endurance. Expect to burn 400-600 calories per session.</p>
                        </div>
                        <div className="service-card">
                            <h3>Step & Tone</h3>
                            <p>Classic step aerobics reimagined with modern choreography. This class combines cardiovascular exercise with lower body toning, using adjustable step platforms to customize intensity levels.</p>
                        </div>
                        <div className="service-card">
                            <h3>Endurance Builder</h3>
                            <p>Long-form 60-minute sessions focused on building stamina and mental resilience. Ideal for marathon preparation or anyone seeking to improve their overall cardiovascular capacity.</p>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="text-block">
                        <h3>Benefits of Regular Aerobic Exercise</h3>
                        <p>Scientific research consistently shows that regular aerobic exercise provides numerous health benefits that extend far beyond weight management.</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="icon">❤️</span>
                            <h4>Heart Health</h4>
                            <p>Strengthens the heart muscle, improves blood circulation, and reduces risk of cardiovascular disease by up to 50%.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🫁</span>
                            <h4>Lung Capacity</h4>
                            <p>Increases oxygen intake efficiency and expands lung capacity, making everyday activities easier.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">⚡</span>
                            <h4>Energy Boost</h4>
                            <p>Regular practice boosts metabolic rate and increases sustained energy levels throughout the day.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">😊</span>
                            <h4>Mood Enhancement</h4>
                            <p>Releases endorphins and serotonin, acting as a natural antidepressant and stress reliever.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">💪</span>
                            <h4>Muscle Tone</h4>
                            <p>Tones and defines muscles while improving overall body composition and posture.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🧠</span>
                            <h4>Cognitive Function</h4>
                            <p>Improves memory, focus, and mental clarity by increasing blood flow to the brain.</p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="info-box">
                        <h4>What to Expect in Your First Class</h4>
                        <ul>
                            <li>Warm welcome from our certified instructors</li>
                            <li>5-minute warm-up to prepare your body</li>
                            <li>30-40 minutes of choreographed routines</li>
                            <li>Cool-down and stretching session</li>
                            <li>Modifications available for all fitness levels</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* YOGA SECTION - Clean layout with cards and text */}
            <section id="yoga" className={`content-section ${activeSection === 'yoga' ? 'active' : ''}`}>
                <div className="content-wrapper">
                    {/* Section Intro */}
                    <div className="section-intro">
                        <h2>Yoga</h2>
                        <p className="section-tagline">Align breath and body through mindful movement and ancient sequences passed down through generations.</p>
                        
                        <div className="meaning">
                            <strong>What is Yoga?</strong> Yoga is a 5,000-year-old practice originating from ancient India, combining physical postures (asanas), breath control (pranayama), and meditation (dhyana) to create union between mind, body, and spirit. The word "Yoga" itself comes from the Sanskrit root "yuj," meaning to join or unite. At our studio, we honor these ancient traditions while making them accessible to modern practitioners of all levels.
                        </div>
                    </div>

                    {/* Philosophy Quote */}
                    <div className="text-block">
                        <p style={{ fontStyle: 'italic', fontSize: '1.25rem', color: '#ccc', borderLeft: '3px solid #444', paddingLeft: '24px' }}>
                            "The body is the bow, the asana is the arrow, and the soul is the target." — Ancient Yogic Wisdom
                        </p>
                    </div>

                    {/* Our Yoga Programs */}
                    <div className="text-block">
                        <h3>Our Yoga Programs</h3>
                        <p>We offer diverse yoga styles to match your needs, whether you seek dynamic movement, deep stretching, or meditative stillness. Each class is led by experienced instructors trained in traditional yogic practices.</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Surya Namaskar</h3>
                            <p>The Sun Salutation — a powerful sequence of 12 yoga poses performed in a flowing manner. This foundational practice warms the body, stretches all muscle groups, and creates a meditative rhythm. Ideal for morning practice to energize your day.</p>
                        </div>
                        <div className="service-card">
                            <h3>Chandra Namaskar</h3>
                            <p>The Moon Salutation — a cooling, calming sequence designed to harness lunar energy. Perfect for evening practice, this sequence promotes relaxation, reduces stress, and prepares the body for restful sleep.</p>
                        </div>
                        <div className="service-card">
                            <h3>Hatha Yoga</h3>
                            <p>The foundation of all physical yoga practices. Hatha focuses on holding postures to build strength, flexibility, and body awareness. Perfect for beginners and those seeking a slower, more deliberate practice.</p>
                        </div>
                        <div className="service-card">
                            <h3>Vinyasa Flow</h3>
                            <p>Dynamic, breath-synchronized movement linking poses in a continuous flow. This practice builds heat, strength, and cardiovascular endurance while maintaining mindful awareness.</p>
                        </div>
                        <div className="service-card">
                            <h3>Pranayama</h3>
                            <p>The art of breath control. Learn ancient breathing techniques including Kapalabhati, Anulom Vilom, and Bhramari to regulate energy, calm the mind, and enhance overall well-being.</p>
                        </div>
                        <div className="service-card">
                            <h3>Restorative Yoga</h3>
                            <p>A gentle, therapeutic practice using props to support the body in restful poses held for extended periods. Ideal for stress relief, injury recovery, and deep relaxation.</p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="text-block">
                        <h3>Benefits of Regular Yoga Practice</h3>
                        <p>Consistent yoga practice transforms not just the body, but the entire quality of life. Here's what you can expect:</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="icon">🧘</span>
                            <h4>Flexibility</h4>
                            <p>Gradually increases range of motion in joints and lengthens muscles, reducing stiffness and injury risk.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🏋️</span>
                            <h4>Strength</h4>
                            <p>Builds functional strength through body-weight resistance, particularly in core, arms, and legs.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🧠</span>
                            <h4>Mental Clarity</h4>
                            <p>Reduces mental chatter, improves concentration, and enhances decision-making abilities.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">😴</span>
                            <h4>Better Sleep</h4>
                            <p>Regulates the nervous system and reduces cortisol levels, promoting deeper, more restful sleep.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🫀</span>
                            <h4>Stress Reduction</h4>
                            <p>Activates the parasympathetic nervous system, lowering blood pressure and reducing anxiety.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">✨</span>
                            <h4>Spiritual Growth</h4>
                            <p>Develops self-awareness, inner peace, and a deeper connection to your authentic self.</p>
                        </div>
                    </div>

                    {/* Two Column Philosophy */}
                    <div className="two-column" style={{ marginTop: '3rem' }}>
                        <div className="info-box">
                            <h4>The Philosophy of Flow</h4>
                            <p>Our yoga practice is more than just physical exercise; it is a moving meditation. By synchronizing breath with movement, we bridge the gap between body and mind, creating a state of harmony and inner peace that extends beyond the mat into daily life.</p>
                        </div>
                        <div className="info-box">
                            <h4>For Every Body</h4>
                            <p>Whether you are a complete beginner or an advanced practitioner, our sessions adapt to your needs. We believe yoga is for everyone — regardless of age, flexibility, or fitness level. Modified poses ensure safe progression while honoring your body's unique journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ZUMBA SECTION */}
            <section id="zumba" className={`content-section ${activeSection === 'zumba' ? 'active' : ''}`}>
                <div className="content-wrapper">
                    {/* Section Intro */}
                    <div className="section-intro">
                        <h2>Zumba</h2>
                        <p className="section-tagline">Dance functionality meets fitness in this Latin-inspired workout that makes exercise feel like a celebration.</p>
                        
                        <div className="meaning">
                            <strong>What is Zumba?</strong> Zumba is a dance-fitness program created in the 1990s by Colombian dancer and choreographer Alberto "Beto" Pérez. It combines Latin and international music with dance moves, creating a dynamic, exciting, and effective fitness system. The word "Zumba" is a Colombian slang term meaning to move fast and have fun. Our Zumba classes transform traditional workouts into an exhilarating dance party where you'll burn calories without even realizing you're exercising.
                        </div>
                    </div>

                    {/* Our Zumba Programs */}
                    <div className="text-block">
                        <h3>Our Zumba Programs</h3>
                        <p>Every Zumba class is designed to feel like a party. Our certified Zumba instructors bring energy, passion, and expertise to create an unforgettable fitness experience.</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Latin Fusion</h3>
                            <p>The heart of Zumba! Experience the rhythms of Salsa, Merengue, Cumbia, and Reggaeton. This class combines authentic Latin dance moves with effective cardio exercises for a full-body workout that celebrates Latin culture.</p>
                        </div>
                        <div className="service-card">
                            <h3>Zumba Toning</h3>
                            <p>Add strength training to your dance party! Using lightweight toning sticks (like maracas), this class targets abs, thighs, and arms while you dance to your favorite beats. Sculpt and tone while you move.</p>
                        </div>
                        <div className="service-card">
                            <h3>Strong Nation</h3>
                            <p>High-intensity interval training synced to music that drives the workout. Every squat, lunge, and burpee is matched to a beat, pushing you to new limits. Burns up to 1,000 calories per session.</p>
                        </div>
                        <div className="service-card">
                            <h3>Aqua Zumba</h3>
                            <p>Take the Zumba party to the pool! Water resistance adds an extra challenge while being gentle on joints. Perfect for all ages and fitness levels, especially those recovering from injuries.</p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="text-block">
                        <h3>Benefits of Zumba Fitness</h3>
                        <p>Zumba is more than just a workout — it's a lifestyle that brings joy to fitness. Here's why millions worldwide have made Zumba their go-to exercise:</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="icon">🔥</span>
                            <h4>Calorie Burning</h4>
                            <p>Burn 400-1000 calories per hour depending on intensity. It's one of the most effective calorie-burning workouts available.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">💃</span>
                            <h4>Coordination</h4>
                            <p>Improves motor skills, rhythm, and body coordination through structured dance movements.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🎉</span>
                            <h4>Social Connection</h4>
                            <p>Build community and friendships in our supportive, judgment-free environment. Dance together, grow together.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🧠</span>
                            <h4>Mental Wellness</h4>
                            <p>Releases dopamine and serotonin, reducing stress and anxiety while boosting confidence and self-esteem.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">💪</span>
                            <h4>Full Body Workout</h4>
                            <p>Engages all muscle groups — arms, core, glutes, and legs — for comprehensive fitness development.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🌍</span>
                            <h4>Cultural Experience</h4>
                            <p>Explore music and dance styles from around the world while getting fit.</p>
                        </div>
                    </div>

                    {/* What to Expect */}
                    <div className="two-column" style={{ marginTop: '3rem' }}>
                        <div className="info-box">
                            <h4>No Experience Needed</h4>
                            <p>You don't need to be a professional dancer to enjoy Zumba. Our instructors break down every move, making it easy to follow along. There are no wrong moves in Zumba — if you're moving and having fun, you're doing it right!</p>
                        </div>
                        <div className="info-box">
                            <h4>Total Body Transformation</h4>
                            <p>Zumba targets every muscle group. From head rolls to toe taps, you'll tone your arms, core, and legs while burning calories in a fun, party-like atmosphere. Expect visible results within 4-6 weeks of consistent practice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MEDITATION SECTION */}
            <section id="meditation" className={`content-section ${activeSection === 'meditation' ? 'active' : ''}`}>
                <div className="content-wrapper">
                    {/* Section Intro */}
                    <div className="section-intro">
                        <h2>Meditation</h2>
                        <p className="section-tagline">Find stillness and clarity in the chaos through ancient mindfulness practices and sonic topography.</p>
                        
                        <div className="meaning">
                            <strong>What is Meditation?</strong> Meditation is a practice of training the mind to achieve a state of focused awareness, mental clarity, and emotional calm. Rooted in traditions thousands of years old, meditation has evolved into a scientifically-backed practice for mental wellness. At our studio, we combine traditional techniques with modern neuroscience insights, including the therapeutic power of specific sound frequencies (432Hz and 528Hz) to create transformative experiences.
                        </div>
                    </div>

                    {/* Our Meditation Programs */}
                    <div className="text-block">
                        <h3>Our Meditation Programs</h3>
                        <p>From guided sessions for beginners to advanced breathwork practices, our meditation offerings cater to all levels of experience and various personal goals.</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Mindfulness Meditation</h3>
                            <p>Cultivate present-moment awareness through guided attention training. Learn to observe thoughts without judgment, reduce mental chatter, and develop a calm, focused mind that serves you in daily life.</p>
                        </div>
                        <div className="service-card">
                            <h3>Sound Bath</h3>
                            <p>Immerse yourself in healing frequencies using crystal singing bowls, Tibetan bells, and gongs tuned to 432Hz. Experience deep relaxation as acoustic resonance washes away tension and restores cellular harmony.</p>
                        </div>
                        <div className="service-card">
                            <h3>Breathwork (Pranayama)</h3>
                            <p>Harness the power of conscious breathing with techniques like Holotropic Breathwork, Wim Hof Method, and traditional Pranayama. Unlock emotional releases, boost energy, and achieve altered states of consciousness.</p>
                        </div>
                        <div className="service-card">
                            <h3>Transcendental Meditation</h3>
                            <p>A mantra-based technique practiced 20 minutes twice daily. This effortless approach allows the mind to settle into a state of restful alertness, reducing stress at its deepest levels.</p>
                        </div>
                        <div className="service-card">
                            <h3>Body Scan Meditation</h3>
                            <p>Systematically move attention through the body, releasing tension and increasing body awareness. Excellent for stress relief, pain management, and improving the mind-body connection.</p>
                        </div>
                        <div className="service-card">
                            <h3>Loving-Kindness (Metta)</h3>
                            <p>Develop compassion for yourself and others through structured intention-setting. This practice has been shown to increase positive emotions, empathy, and social connection.</p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="text-block">
                        <h3>Science-Backed Benefits of Meditation</h3>
                        <p>Decades of research confirm what practitioners have known for millennia — meditation fundamentally transforms brain structure and function.</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="icon">🧠</span>
                            <h4>Brain Changes</h4>
                            <p>Increases grey matter density in areas governing learning, memory, and emotional regulation while shrinking the amygdala (fear center).</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">😌</span>
                            <h4>Stress Reduction</h4>
                            <p>Lowers cortisol levels by up to 50%, reducing chronic stress and its associated health risks.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">💗</span>
                            <h4>Heart Health</h4>
                            <p>Reduces blood pressure, heart rate, and risk of cardiovascular disease through activation of the relaxation response.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🎯</span>
                            <h4>Enhanced Focus</h4>
                            <p>Improves attention span, concentration, and cognitive performance through regular practice.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">😴</span>
                            <h4>Better Sleep</h4>
                            <p>Reduces insomnia and improves sleep quality by calming the nervous system and reducing racing thoughts.</p>
                        </div>
                        <div className="benefit-card">
                            <span className="icon">🌟</span>
                            <h4>Emotional Balance</h4>
                            <p>Increases emotional intelligence, resilience, and the ability to respond rather than react to life's challenges.</p>
                        </div>
                    </div>

                    {/* Scientific Note */}
                    <div className="info-box" style={{ marginTop: '3rem' }}>
                        <h4>The Science of Sound Healing (432Hz)</h4>
                        <p>Our sound bath sessions utilize instruments tuned to 432Hz, often called the "natural frequency of the universe." Research suggests this frequency resonates with the body's natural vibrations, promoting cellular healing, reducing anxiety, and inducing states of deep relaxation. Combined with meditation, sound healing creates a synergistic effect that accelerates mental and physical restoration.</p>
                    </div>

                    <div className="two-column" style={{ marginTop: '2rem' }}>
                        <div className="info-box">
                            <h4>For Beginners</h4>
                            <p>New to meditation? Start with our guided 10-minute sessions. We recommend practicing daily for 2 weeks to experience initial benefits. Our instructors provide patient, supportive guidance as you develop your practice.</p>
                        </div>
                        <div className="info-box">
                            <h4>Recommended Practice</h4>
                            <ul>
                                <li>Beginners: 10-15 minutes daily</li>
                                <li>Intermediate: 20-30 minutes daily</li>
                                <li>Advanced: 45-60 minutes or more</li>
                                <li>Consistency matters more than duration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SESSION SECTION */}
            <section id="session" className={`content-section ${activeSection === 'session' ? 'active' : ''}`}>
                <div className="content-wrapper">
                    {/* Section Intro */}
                    <div className="section-intro">
                        <h2>Sessions</h2>
                        <p className="section-tagline">Join our live frequencies and become part of a transformative wellness community.</p>
                        
                        <div className="meaning">
                            <strong>Book Your Journey</strong> Whether you're looking for high-energy workouts, peaceful meditation, or transformative yoga, our sessions are designed to meet you where you are. Each class is led by certified professionals in intimate group settings that foster connection and growth. Reserve your spot below and take the first step toward a healthier, more balanced life.
                        </div>
                    </div>

                    <div className="two-column" style={{ alignItems: 'start' }}>
                        {/* Booking Form */}
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <form className="session-form" onSubmit={(e) => e.preventDefault()}>
                                <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #444', paddingBottom: '16px', marginBottom: '24px' }}>Book a Spot</h3>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="email@address.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" placeholder="+1 (555) 123-4567" />
                                </div>
                                <div className="form-group">
                                    <label>Interest</label>
                                    <select>
                                        <option>Select a Program</option>
                                        <option>Aerobics - Cardio Blast</option>
                                        <option>Aerobics - Step & Tone</option>
                                        <option>Yoga - Surya Namaskar</option>
                                        <option>Yoga - Hatha</option>
                                        <option>Yoga - Vinyasa Flow</option>
                                        <option>Zumba - Latin Fusion</option>
                                        <option>Zumba - Strong Nation</option>
                                        <option>Meditation - Mindfulness</option>
                                        <option>Meditation - Sound Bath</option>
                                        <option>Bhanga Special Session</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Experience Level</label>
                                    <select>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Message (Optional)</label>
                                    <input type="text" placeholder="Any special requirements or questions?" />
                                </div>
                                <button type="submit" className="submit-btn">Reserve Spot</button>
                            </form>
                        </div>

                        {/* Right Column - Info & Special Session */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* SPECIAL BHANGA SESSION CARD */}
                            <div className="service-card" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,100,100,0.1) 100%)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '2rem', border: 'none', margin: 0, padding: 0 }}>Bhanga<br />Session</h3>
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: '#fff', color: '#000', padding: '4px 12px', borderRadius: '4px' }}>MONTHLY</span>
                                </div>
                                <p style={{ color: '#ccc', marginBottom: '20px', fontSize: '1.1rem' }}>
                                    A unique monthly immersion combining intense physical Bhanga movement with high-frequency sound landscapes. This signature session pushes boundaries and creates breakthrough experiences.
                                </p>
                                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#888' }}>
                                    NEXT: Feb 15, 2026<br />
                                    TIME: 20:00 - 22:00<br />
                                    SPOTS: Limited to 20 participants
                                </div>
                            </div>

                            {/* Session Info */}
                            <div className="info-box">
                                <h4>What's Included</h4>
                                <ul>
                                    <li>Access to all equipment and props</li>
                                    <li>Post-session herbal tea service</li>
                                    <li>Personalized guidance from instructors</li>
                                    <li>Community connection opportunities</li>
                                    <li>Progress tracking and recommendations</li>
                                </ul>
                            </div>

                            {/* Pricing */}
                            <div className="info-box">
                                <h4>Pricing Options</h4>
                                <ul>
                                    <li>Drop-in Single Session: $25</li>
                                    <li>5-Class Pack: $100 (Save 20%)</li>
                                    <li>Monthly Unlimited: $149</li>
                                    <li>Annual Membership: $1,299 (Best Value)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-block" style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ maxWidth: '100%', margin: '0 auto' }}>
                            Questions? Contact us at <strong style={{ color: '#fff' }}>hello@soundhealing.studio</strong> or call <strong style={{ color: '#fff' }}>+1 (555) 432-HZ00</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* Frequency Viz - Persistent */}
            <div className="frequency-viz" id="viz">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="bar" style={{ animationDelay: `${i * 0.05}s`, animationDuration: `${2 / activeMode.speed}s` }} />
                ))}
            </div>
        </main>
    );
}
