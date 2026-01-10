/* --- CONTENT DATA --- */
const sectionContent = {
    aerobics: `
        <div class="content-wrapper">
            <h2>Aerobics</h2>
            <p>Elevate your heart rate and your spirit. Our high-energy aerobics sessions are designed to burn calories while boosting your endorphins. Experience the rhythm of movement.</p>
            <div class="alchemy-grid">
                <div class="alchemy-item">
                    <h3>Cardio Blast</h3>
                    <p>High intensity interval training set to pumping beats.</p>
                </div>
                <div class="alchemy-item">
                    <h3>Step & Tone</h3>
                    <p>Classic step aerobics with a modern, fluid twist.</p>
                </div>
                <div class="alchemy-item">
                    <h3>Endurance</h3>
                    <p>Build stamina and resilience through sustained movement.</p>
                </div>
            </div>
        </div>
    `,
    yoga: `
        <div class="content-wrapper">
            <h2>Yoga</h2>
            <p>Find your center. Our yoga practice combines breath, movement, and mindfulness to align your body and soul. From Vinyasa flow to restorative Hatha, find the path that suits you.</p>
            <div class="alchemy-grid">
                <div class="alchemy-item">
                    <h3>Vinyasa Flow</h3>
                    <p>Dynamic movement syncing breath with motion.</p>
                </div>
                <div class="alchemy-item">
                    <h3>Hatha Align</h3>
                    <p>Focus on posture, alignment, and holding space.</p>
                </div>
                <div class="alchemy-item">
                    <h3>Yin Restoration</h3>
                    <p>Deep stretching to release fascia and stagnant energy.</p>
                </div>
            </div>
        </div>
    `,
    zumba: `
        <div class="content-wrapper">
            <h2>Zumba</h2>
            <p>Ditch the workout, join the party. Unleash your inner dancer with our Zumba classes. A fusion of Latin and international music creates a dynamic, exciting, and effective fitness system.</p>
             <div class="alchemy-grid">
                <div class="alchemy-item">
                    <h3>Latin Fusion</h3>
                    <p>Salsa, Merengue, Cumbia and Reggaeton beats.</p>
                </div>
                <div class="alchemy-item">
                    <h3>Rhythm Core</h3>
                    <p>Dance moves specifically designed to target your core.</p>
                </div>
            </div>
        </div>
    `,
    meditation: `
        <div class="content-wrapper">
            <h2>Meditation</h2>
            <p>Return to stillness. In a world of constant noise, we offer a sanctuary of silence. Our guided meditations help you cultivate mindfulness, reduce stress, and find inner peace.</p>
            <div class="freq-list">
                <div class="freq-item">
                    <span class="freq-hz">Breath</span>
                    <span class="freq-desc">Focusing on the rhythm of life.</span>
                </div>
                <div class="freq-item">
                    <span class="freq-hz">Sound</span>
                    <span class="freq-desc">Using bowls and chimes to guide attention.</span>
                </div>
                <div class="freq-item">
                    <span class="freq-hz">Guidance</span>
                    <span class="freq-desc">Visualizations for mental clarity.</span>
                </div>
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
    if (target && !target.innerHTML.trim() && sectionContent[id]) {
        target.innerHTML = sectionContent[id];
    }

    // Hide OTHER sections
    document.querySelectorAll('main > section').forEach(sec => {
        if (sec.id !== id) { // CRITICAL FIX: Don't hide the target if we just showed it!
            sec.style.opacity = '0';
            sec.style.pointerEvents = 'none';
            // Only set display:none if it's NOT the target. 
            // We use a small timeout to allow opacity fade, but we must ensure we don't accidentally hide our target
            setTimeout(() => {
                if (sec.id !== id) {
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
        title: "Aerobics",
        sub: "Movement",
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
