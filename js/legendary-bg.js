/* ============================================================
   LEGENDARY COSMIC BACKGROUND — Nebula + Aurora + Constellations
   ============================================================ */

(function () {
    'use strict';

    // ── Canvas Setup ──────────────────────────────────────────
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouseX = W / 2;
    let mouseY = H / 2;
    let frame = 0;
    let animId;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        initAll();
    }

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ── Colour Palette ──────────────────────────────────────
    const PALETTE = {
        primary: { h: 245, s: 100, l: 69 },   // violet
        accent: { h: 165, s: 100, l: 50 },   // cyan-teal
        warm: { h: 32, s: 100, l: 60 },   // amber
        magenta: { h: 300, s: 90, l: 65 },   // magenta
        sky: { h: 200, s: 100, l: 65 },   // sky blue
    };

    function hsl(h, s, l, a = 1) {
        return `hsla(${h},${s}%,${l}%,${a})`;
    }

    // ── Stars ─────────────────────────────────────────────
    const STAR_COUNT = 280;
    let stars = [];

    class Star {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : -4;
            this.r = Math.random() * 1.4 + 0.2;
            this.baseOpacity = Math.random() * 0.7 + 0.3;
            this.opacity = this.baseOpacity;
            this.twinkleSpeed = Math.random() * 0.02 + 0.005;
            this.twinkleOffset = Math.random() * Math.PI * 2;
            this.hue = [245, 165, 200, 300, 32][Math.floor(Math.random() * 5)];
            this.colorChance = Math.random();
        }
        update(t) {
            this.opacity = this.baseOpacity * (0.6 + 0.4 * Math.sin(t * this.twinkleSpeed + this.twinkleOffset));
        }
        draw() {
            const color = this.colorChance > 0.6
                ? hsl(this.hue, 80, 85, this.opacity)
                : hsl(0, 0, 95, this.opacity);
            ctx.save();
            ctx.shadowBlur = 6;
            ctx.shadowColor = color;
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ── Nebula Clouds (GPU-efficient Gaussian blobs) ──────
    const NEBULA_COUNT = 7;
    let nebulae = [];

    class Nebula {
        constructor(i) {
            const angle = (i / NEBULA_COUNT) * Math.PI * 2;
            const dist = 0.2 + Math.random() * 0.35;
            this.cx = W * 0.5 + Math.cos(angle) * W * dist;
            this.cy = H * 0.5 + Math.sin(angle) * H * dist;
            this.rx = W * (0.25 + Math.random() * 0.2);
            this.ry = H * (0.2 + Math.random() * 0.15);
            this.rot = Math.random() * Math.PI;
            this.speed = (Math.random() * 0.0005 + 0.0002) * (Math.random() > 0.5 ? 1 : -1);
            const keys = Object.keys(PALETTE);
            const pal = PALETTE[keys[i % keys.length]];
            this.h = pal.h;
            this.s = pal.s;
            this.alphaBase = 0.055 + Math.random() * 0.04;
            this.alphaOsc = 0.02;
            this.oscSpeed = 0.001 + Math.random() * 0.001;
            this.oscOffset = Math.random() * Math.PI * 2;
            this.driftX = (Math.random() - 0.5) * 0.06;
            this.driftY = (Math.random() - 0.5) * 0.06;
        }
        update(t) {
            this.rot += this.speed;
            this.cx += this.driftX;
            this.cy += this.driftY;
            if (this.cx < -this.rx) this.cx = W + this.rx;
            if (this.cx > W + this.rx) this.cx = -this.rx;
            if (this.cy < -this.ry) this.cy = H + this.ry;
            if (this.cy > H + this.ry) this.cy = -this.ry;
            this.alpha = this.alphaBase + this.alphaOsc * Math.sin(t * this.oscSpeed + this.oscOffset);
        }
        draw() {
            ctx.save();
            ctx.translate(this.cx, this.cy);
            ctx.rotate(this.rot);
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(this.rx, this.ry));
            grad.addColorStop(0, hsl(this.h, this.s, 70, this.alpha * 1.6));
            grad.addColorStop(0.4, hsl(this.h, this.s, 55, this.alpha));
            grad.addColorStop(1, hsl(this.h, this.s, 40, 0));
            ctx.scale(1, this.ry / this.rx);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, this.rx, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ── Aurora Bands ──────────────────────────────────────
    const AURORA_COUNT = 4;
    let auroras = [];

    class Aurora {
        constructor(i) {
            this.y = H * (0.05 + i * 0.22 + Math.random() * 0.08);
            this.h = [245, 165, 300, 200][i];
            this.h2 = [165, 300, 245, 165][i];
            this.amp = 60 + Math.random() * 80;
            this.freq = 0.002 + Math.random() * 0.002;
            this.speed = 0.0008 + Math.random() * 0.0006;
            this.phase = Math.random() * Math.PI * 2;
            this.thickness = 80 + Math.random() * 120;
            this.alpha = 0.04 + Math.random() * 0.04;
        }
        update(t) {
            this.phase += this.speed;
        }
        draw(t) {
            const points = 60;
            const step = W / points;

            ctx.save();
            ctx.beginPath();
            for (let j = 0; j <= points; j++) {
                const x = j * step;
                const y = this.y + Math.sin(x * this.freq + this.phase) * this.amp
                    + Math.sin(x * this.freq * 2.3 + this.phase * 1.7) * this.amp * 0.4;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            const grad = ctx.createLinearGradient(0, this.y - this.thickness, 0, this.y + this.thickness);
            grad.addColorStop(0, hsl(this.h, 90, 65, 0));
            grad.addColorStop(0.3, hsl(this.h, 90, 65, this.alpha * 1.5));
            grad.addColorStop(0.5, hsl(this.h2, 80, 70, this.alpha));
            grad.addColorStop(0.7, hsl(this.h, 90, 65, this.alpha * 0.8));
            grad.addColorStop(1, hsl(this.h, 90, 65, 0));

            ctx.strokeStyle = grad;
            ctx.lineWidth = this.thickness;
            ctx.shadowBlur = 40;
            ctx.shadowColor = hsl(this.h, 90, 65, 0.15);
            ctx.stroke();
            ctx.restore();
        }
    }

    // ── Shooting Stars ─────────────────────────────────────
    let shooters = [];

    class Shooter {
        constructor() { this.spawn(); }
        spawn() {
            this.x = Math.random() * W;
            this.y = Math.random() * H * 0.5;
            this.len = 120 + Math.random() * 200;
            this.speed = 14 + Math.random() * 12;
            this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4;
            this.life = 0;
            this.maxLife = (this.len / this.speed) * 1.5;
            this.h = [245, 165, 300, 200, 32][Math.floor(Math.random() * 5)];
            this.active = true;
        }
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.life++;
            if (this.life > this.maxLife || this.x > W + 50 || this.y > H + 50) {
                this.active = false;
            }
        }
        draw() {
            const progress = this.life / this.maxLife;
            const opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
            const tailX = this.x - Math.cos(this.angle) * this.len;
            const tailY = this.y - Math.sin(this.angle) * this.len;

            const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
            grad.addColorStop(0, hsl(this.h, 90, 80, 0));
            grad.addColorStop(0.7, hsl(this.h, 90, 80, opacity * 0.4));
            grad.addColorStop(1, 'rgba(255,255,255,' + (opacity * 0.9) + ')');

            ctx.save();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = hsl(this.h, 90, 80, opacity);
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            // Head sparkle
            ctx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ── Constellation Grid (node + edge network) ─────────
    const NODE_COUNT = 50;
    let nodes = [];

    class Node {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.r = Math.random() * 2 + 0.8;
            const keys = Object.keys(PALETTE);
            const pal = PALETTE[keys[Math.floor(Math.random() * keys.length)]];
            this.h = pal.h;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }
        update() {
            // Mouse repulsion
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 180) {
                const force = (1 - d / 180) * 0.4;
                this.vx += (dx / d) * force;
                this.vy += (dy / d) * force;
            }
            this.vx *= 0.99;
            this.vy *= 0.99;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0) { this.x = 0; this.vx *= -1; }
            if (this.x > W) { this.x = W; this.vx *= -1; }
            if (this.y < 0) { this.y = 0; this.vy *= -1; }
            if (this.y > H) { this.y = H; this.vy *= -1; }
        }
        draw(t) {
            const pulse = 0.6 + 0.4 * Math.sin(t * 0.02 + this.pulseOffset);
            ctx.save();
            ctx.shadowBlur = 10 * pulse;
            ctx.shadowColor = hsl(this.h, 90, 70, 0.6);
            ctx.fillStyle = hsl(this.h, 90, 80, pulse);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawEdges() {
        const maxDist = 160;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < maxDist) {
                    const a = (1 - d / maxDist) * 0.18;
                    ctx.save();
                    ctx.strokeStyle = hsl(nodes[i].h, 80, 70, a);
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    // ── Radial Mouse Glow ──────────────────────────────────
    function drawMouseGlow() {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 260);
        grad.addColorStop(0, hsl(245, 100, 70, 0.07));
        grad.addColorStop(0.4, hsl(165, 100, 55, 0.04));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    }

    // ── Central Radial Vignette from Center ────────────────
    function drawCentralGlow() {
        const cx = W / 2, cy = H / 2;
        const r = Math.max(W, H) * 0.65;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, hsl(245, 60, 12, 0.35));
        g.addColorStop(0.5, hsl(245, 40, 8, 0.2));
        g.addColorStop(1, hsl(240, 20, 4, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    // ── Vignette Edges ─────────────────────────────────────
    function drawVignette() {
        const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
        g.addColorStop(0, 'transparent');
        g.addColorStop(1, 'rgba(4,4,12,0.72)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    // ── Hex Grid Subtle Overlay ────────────────────────────
    function drawHexGrid(t) {
        const size = 60;
        const cols = Math.ceil(W / (size * 1.732)) + 2;
        const rows = Math.ceil(H / (size * 1.5)) + 2;
        const offX = ((t * 0.015) % (size * 1.732));
        const offY = 0;

        ctx.save();
        ctx.strokeStyle = hsl(245, 80, 65, 0.025);
        ctx.lineWidth = 0.5;

        for (let r = -1; r < rows + 1; r++) {
            for (let c = -1; c < cols + 1; c++) {
                const x = c * size * 1.732 + (r % 2) * size * 0.866 - offX;
                const y = r * size * 1.5 + offY;
                hexPath(x, y, size * 0.95);
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    function hexPath(cx, cy, r) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
    }

    // ── Floating Energy Orbs ───────────────────────────────
    const ORB_COUNT = 6;
    let orbs = [];

    class Orb {
        constructor(i) {
            this.angle = (i / ORB_COUNT) * Math.PI * 2;
            this.radius = W * (0.18 + Math.random() * 0.22);
            this.speed = (0.0003 + Math.random() * 0.0003) * (i % 2 === 0 ? 1 : -1);
            this.cx = W / 2;
            this.cy = H / 2;
            const keys = Object.keys(PALETTE);
            const pal = PALETTE[keys[i % keys.length]];
            this.h = pal.h;
            this.size = 60 + Math.random() * 80;
            this.alpha = 0.06 + Math.random() * 0.06;
            this.pulseS = 0.001 + Math.random() * 0.001;
            this.pulseO = Math.random() * Math.PI * 2;
        }
        update() {
            this.angle += this.speed;
        }
        draw(t) {
            const x = this.cx + Math.cos(this.angle) * this.radius;
            const y = this.cy + Math.sin(this.angle) * this.radius * 0.5;
            const pulse = 0.7 + 0.3 * Math.sin(t * this.pulseS + this.pulseO);
            const r = this.size * pulse;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
            grad.addColorStop(0, hsl(this.h, 100, 75, this.alpha * 2));
            grad.addColorStop(0.5, hsl(this.h, 90, 60, this.alpha));
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ── Init All Systems ───────────────────────────────────
    function initAll() {
        stars = Array.from({ length: STAR_COUNT }, () => new Star());
        nebulae = Array.from({ length: NEBULA_COUNT }, (_, i) => new Nebula(i));
        auroras = Array.from({ length: AURORA_COUNT }, (_, i) => new Aurora(i));
        nodes = Array.from({ length: NODE_COUNT }, () => new Node());
        orbs = Array.from({ length: ORB_COUNT }, (_, i) => new Orb(i));
        shooters = [];
    }

    // ── Spawn shooters occasionally ────────────────────────
    let shooterTimer = 0;
    function maybeSpawnShooter() {
        shooterTimer++;
        if (shooterTimer > 180 + Math.random() * 300) {
            shooterTimer = 0;
            shooters.push(new Shooter());
            if (Math.random() > 0.6) shooters.push(new Shooter());
        }
        shooters = shooters.filter(s => s.active);
    }

    // ── Main Render Loop ───────────────────────────────────
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    function render(t) {
        animId = requestAnimationFrame(render);
        
        const deltaTime = t - lastTime;
        if (deltaTime < frameInterval) return;
        
        lastTime = t - (deltaTime % frameInterval);
        
        frame++;

        // Deep background
        ctx.fillStyle = 'hsl(240,15%,4%)';
        ctx.fillRect(0, 0, W, H);

        // Layers back to front:
        // 1. Nebula clouds
        nebulae.forEach(n => { n.update(t); n.draw(); });

        // 2. Aurora bands
        auroras.forEach(a => { a.update(t); a.draw(t); });

        // 3. Hex grid
        drawHexGrid(t);

        // 4. Stars
        stars.forEach(s => { s.update(t); s.draw(); });

        // 5. Constellation edges
        nodes.forEach(n => n.update());
        drawEdges();
        nodes.forEach(n => n.draw(t));

        // 6. Energy orbs
        orbs.forEach(o => { o.update(); o.draw(t); });

        // 7. Shooting stars
        maybeSpawnShooter();
        shooters.forEach(s => { s.update(); s.draw(); });

        // 8. Central glow + Mouse glow
        drawCentralGlow();
        drawMouseGlow();

        // 9. Edge vignette (keep site dark at edges)
        drawVignette();
    }

    // ── Bootstrap ─────────────────────────────────────────
    canvas.width = W;
    canvas.height = H;
    initAll();
    requestAnimationFrame(render);

})();
