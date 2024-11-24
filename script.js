class ParticleNetwork {
    constructor(options = {}) {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: null, y: null };
        
        // Customizable parameters with defaults
        this.particleCount = options.particleCount || 100;
        this.connectDistance = options.connectDistance || 150;
        this.moveSpeed = options.moveSpeed || 0.5;
        this.particleColor = options.particleColor || 'rgba(0, 0, 0, 0.6)';
        this.lineColor = options.lineColor || 'rgba(0, 0, 0, 0.2)';
        this.minRadius = options.minRadius || 1;
        this.maxRadius = options.maxRadius || 5;
        this.lineWidth = options.lineWidth || 2;
        this.mouseInteraction = options.mouseInteraction !== undefined ? options.mouseInteraction : true;
        this.mouseRadius = options.mouseRadius || 150;
        this.pulseEnabled = options.pulseEnabled !== undefined ? options.pulseEnabled : true;
        this.pulseSpeed = options.pulseSpeed || 0.01;
        this.particleLife = options.particleLife || null; // null for infinite life

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                vx: (Math.random() - 0.5) * this.moveSpeed,
                vy: (Math.random() - 0.5) * this.moveSpeed,
                life: this.particleLife ? Math.random() * this.particleLife : null,
                pulse: 0
            });
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        if (this.mouseInteraction) {
            window.addEventListener('mousemove', (e) => {
                this.mousePosition.x = e.clientX;
                this.mousePosition.y = e.clientY;
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawParticles();
        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx = -particle.vx;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy = -particle.vy;

            // Update pulse
            if (this.pulseEnabled) {
                particle.pulse += this.pulseSpeed;
                if (particle.pulse > Math.PI * 2) particle.pulse = 0;
            }

            // Handle particle life
            if (particle.life !== null) {
                particle.life--;
                if (particle.life <= 0) {
                    // Reset particle
                    particle.x = Math.random() * this.canvas.width;
                    particle.y = Math.random() * this.canvas.height;
                    particle.life = this.particleLife;
                }
            }

            // Mouse interaction
            if (this.mouseInteraction && this.mousePosition.x !== null) {
                const dx = particle.x - this.mousePosition.x;
                const dy = particle.y - this.mousePosition.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouseRadius) {
                    const force = (this.mouseRadius - distance) / this.mouseRadius;
                    particle.vx += (dx / distance) * force * 0.02;
                    particle.vy += (dy / distance) * force * 0.02;
                }
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            const radius = this.pulseEnabled ? 
                particle.radius * (1 + Math.sin(particle.pulse) * 0.1) : 
                particle.radius;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.particleColor;
            this.ctx.fill();
        });
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectDistance) {
                    const opacity = 1 - (distance / this.connectDistance);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.lineColor.replace('0.2', opacity * 0.3);
                    this.ctx.lineWidth = this.lineWidth;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize the particle network when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork({
        particleCount: 120,
        connectDistance: 150,
        moveSpeed: 0.504,
        maxRadius: 5,
        mouseRadius: 200,
        pulseSpeed: 0.0168,
        lineWidth: 2
    });
});
