/* --- CONTENT DATA --- */
const sectionContent = {
    aerobics: `
        <div class="content-wrapper">
            <h2>Aerobics</h2>
            <p>High-energy rhythmic movement to boost cardiovascular health.</p>
            <div class="alchemy-grid">
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Cardio Blast</h3>
                    <p>Intense interval training for max caloric burn.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Step & Tone</h3>
                    <p>Classic step routines with a modern twist.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Endurance</h3>
                    <p>Long-form sessions to build stamina.</p>
                </div>
            </div>
        </div>
    `,
    yoga: `
        <div class="content-wrapper">
            <h2>Yoga</h2>
            <p>Align breath and body through mindful movement.</p>
            <div class="alchemy-grid">
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Vinyasa Flow</h3>
                    <p>Fluid sequences connecting breath to motion.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Power Yoga</h3>
                    <p>Strength-building poses for core stability.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Restorative</h3>
                    <p>Gentle stretching to release deep tension.</p>
                </div>
            </div>
        </div>
    `,
    zumba: `
        <div class="content-wrapper">
            <h2>Zumba</h2>
            <p>Dance functionality meets fitness in this Latin-inspired workout.</p>
            <div class="alchemy-grid">
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Latin Fusion</h3>
                    <p>Salsa, Merengue, and Cumbia rhythms.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Hip Hop</h3>
                    <p>Urban beats and high-energy choreography.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Strong Nation</h3>
                    <p>Beat-synced high intensity interval training.</p>
                </div>
            </div>
        </div>
    `,
    meditation: `
        <div class="content-wrapper">
            <h2>Meditation</h2>
            <p>Find stillness and clarity in the chaos.</p>
            <div class="alchemy-grid">
                 <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Mindfulness</h3>
                    <p>Cultivating present-moment awareness.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Sound Bath</h3>
                    <p>Deep relaxation through acoustic resonance.</p>
                </div>
                <div class="alchemy-item" style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 12px; backdrop-filter: blur(5px);">
                    <h3>Breathwork</h3>
                    <p>Harnessing the power of conscious breathing.</p>
                </div>
            </div>
        </div>
    `,
    session: `
        <div class="content-wrapper">
            <h2>Book a Session</h2>
            <p>Start your journey with us.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 40px; border-radius: 16px; backdrop-filter: blur(10px); max-width: 500px;">
                <form class="session-form">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="email@address.com">
                    </div>
                    <div class="form-group">
                        <label>Interest</label>
                        <select>
                            <option>Aerobics</option>
                            <option>Yoga</option>
                            <option>Zumba</option>
                            <option>Meditation</option>
                        </select>
                    </div>
                    <button type="button" class="submit-btn" onclick="alert('Booking received!')">Reserve Spot</button>
                </form>
            </div>
        </div>
    `
};

/* Navigation Logic */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');

        // Update Mode based on section
        if (modes[targetId]) {
            updateMode(targetId);
        } else {
            // Default or mapped modes if names don't match exactly
            if (targetId === 'yoga') updateMode('flow');
            else if (targetId === 'aerobics') updateMode('aerobic');
            // Zumba is Zumba
            else if (targetId === 'zumba') updateMode('zumba');
            else if (targetId === 'meditation') updateMode('meditation');
        }

        showSection(targetId);

        // Update URL without reload
        history.pushState(null, null, `#${targetId}`);

        // Update Active Link
        document.querySelectorAll('nav a').forEach(l => l.style.opacity = '0.5');
        link.style.opacity = '1';
    });
});

// Logo Click -> Home
document.querySelector('.logo').addEventListener('click', () => {
    showSection('hero');
    history.pushState(null, null, ' ');
});

function showSection(id) {
    // Content Injection Logic
    const target = document.getElementById(id);
    // CRITICAL: Always inject if different, OR just inject if empty. 
    // Since we only have static content, empty check is fine.
    if (target && !target.innerHTML.trim() && sectionContent[id]) {
        target.innerHTML = sectionContent[id];
    }

    // Hide OTHER sections
    document.querySelectorAll('main > section').forEach(sec => {
        if (sec.id !== id) {
            sec.style.opacity = '0';
            sec.style.pointerEvents = 'none';
            setTimeout(() => {
                if (sec.id !== id) { // Double check inside timeout
                    sec.style.display = 'none';
                }
            }, 500);
        }
    });

    // Valid target check
    if (target) {
        // Ensure target displays
        target.style.display = 'flex';
        // Trigger reflow
        void target.offsetWidth;
        target.style.opacity = '1';
        target.style.pointerEvents = 'all';
    }
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        // Sync mode
        if (modes[hash]) updateMode(hash);
        else if (hash === 'yoga') updateMode('flow');
        else if (hash === 'aerobics') updateMode('aerobic');

        showSection(hash);
    }
    else showSection('hero');
});

// Initial Load
const initialHash = window.location.hash.substring(1);
if (initialHash) {
    if (modes[initialHash]) updateMode(initialHash);
    else if (initialHash === 'yoga') updateMode('flow');
    else if (initialHash === 'aerobics') updateMode('aerobic');
    showSection(initialHash);
}

// Initialize Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Initialize Mercury Blobs
const canvas = document.getElementById('canvas');
const blobCount = 6;
const blobs = [];

for (let i = 0; i < blobCount; i++) {
    const blob = document.createElement('div');
    blob.className = 'blob';
    const size = Math.random() * 300 + 200;
    blob.style.width = size + 'px';
    blob.style.height = size + 'px';
    blob.style.left = Math.random() * 100 + '%';
    blob.style.top = Math.random() * 100 + '%';
    canvas.appendChild(blob);
    blobs.push({
        el: blob,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
    });
}

// Create Frequency Bars
const viz = document.getElementById('viz');
for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.animationDelay = (i * 0.05) + 's';
    viz.appendChild(bar);
}

// Animation Loop
function animate() {
    blobs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -10 || b.x > 110) b.vx *= -1;
        if (b.y < -10 || b.y > 110) b.vy *= -1;

        b.el.style.left = b.x + '%';
        b.el.style.top = b.y + '%';
    });
    requestAnimationFrame(animate);
}
animate();

// Mode Switching Logic
const modes = {
    meditation: {
        title: "Mudra",
        sub: "Minds",
        freq: "432Hz",
        bpm: "60 BPM",
        label: "MEDITATION",
        speed: 0.1,
        color: 'linear-gradient(135deg, #8e8e8e 0%, #ffffff 50%, #4a4a4a 100%)'
    },
    aerobic: {
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
    flow: { // Yoga
        title: "Yoga",
        sub: "Flow",
        freq: "OM",
        bpm: "Slow Flow",
        label: "BALANCE",
        speed: 0.3,
        color: 'linear-gradient(135deg, #00ff88 0%, #ffffff 50%, #0088ff 100%)'
    }
};

window.updateMode = function (modeKey, btn) {
    // Handle simplified mode keys or direct matches
    let data = modes[modeKey];
    if (!data) return; // verification

    // Text Animations (Only if on Hero, or we can update the "Mudra Minds" logo text if we wanted, but let's stick to Hero text for now)
    // Actually, when we are NOT on hero, we might not see these.
    // But the request implies "Change name... then activities". The Hero title IS the name.

    // Check if we are checking the hero-title
    const title = document.getElementById('hero-title');
    const sub = document.getElementById('hero-subtitle');

    if (title && sub) {
        title.style.animation = 'none';
        sub.style.animation = 'none';
        void title.offsetWidth; // trigger reflow

        title.innerText = data.title;
        sub.innerText = data.sub;
        title.style.animation = 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        sub.style.animation = 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.1s';
    }

    if (document.getElementById('meta-freq')) document.getElementById('meta-freq').innerText = data.freq;
    if (document.getElementById('meta-bpm')) document.getElementById('meta-bpm').innerText = data.bpm;
    if (document.getElementById('meta-label')) document.getElementById('meta-label').innerText = data.label;

    // Fluid Updates
    blobs.forEach(b => {
        b.vx = (Math.random() - 0.5) * data.speed;
        b.vy = (Math.random() - 0.5) * data.speed;
        b.el.style.background = data.color;
    });

    // Viz Updates
    document.querySelectorAll('.bar').forEach(bar => {
        bar.style.animationDuration = (2 / data.speed) + 's';
    });
}

// Parallax Move on Mouse
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});
