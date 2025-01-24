/**
 * ParticleNetwork Class
 * Creates and manages an interactive particle network animation
 */
export class ParticleNetwork {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    config: ParticleNetworkConfig;

    particles: Particle[] = [];
    animationId: number | null = null;
    isRunning: boolean = false;
    mousePosition: MousePosition | null = null;
    pulseAngle: number = 0;
    boundHandleMouseMove: (e: MouseEvent) => void;
    boundHandleMouseLeave: (e: MouseEvent) => void;
    lastTimestamp: DOMHighResTimeStamp | null = null;

    constructor(canvas: HTMLCanvasElement, userConfig: ParticleNetworkConfig) {
        // Canvas setup and context
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true })!; // Enable transparency
        if (!this.ctx) {
            throw new Error('Could not initialize canvas context');
        }

        this.config = createConfig(userConfig);

        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
        this.setupEventListeners();
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.addEventListener('mouseleave', this.boundHandleMouseLeave);
    }

    /**
     * Clean up event listeners
     */
    stop() {
        this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.removeEventListener('mouseleave', this.boundHandleMouseLeave);

        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Handle mouse movement
     */
    handleMouseMove(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    /**
     * Handle mouse leave
     */
    handleMouseLeave() {
        this.mousePosition = null;
    }

    /**
     * Create initial set of particles or increases/decreases to desired particle count.
     */
    private createParticles() {
        const particleCount = this.computeParticleCount();

        // reuse existing particles if some exist
        const newParticles = this.particles.slice(0, Math.min(particleCount, this.particles.length));

        // create additional particles if needed
        for (let i = newParticles.length; i < particleCount; i++) {
            const sizeRange = this.config.maxRadius - this.config.minRadius;
            const randomSize = Math.random() * sizeRange + this.config.minRadius;
            newParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                xSpeed: (Math.random() - 0.5) * this.config.moveSpeed * 2,
                ySpeed: (Math.random() - 0.5) * this.config.moveSpeed * 2,
                radius: randomSize
            });
        }

        return newParticles;
    }

    /**
     * Update particle positions and handle boundary collisions
     */
    updateParticles(timestamp: DOMHighResTimeStamp) {
        const particles = this.createParticles();

        particles.forEach(particle => {
            // Update pulse effect
            if (this.config.pulseEnabled) {
                this.pulseAngle += this.config.pulseSpeed;
                const pulseScale = Math.sin(this.pulseAngle) * 0.5 + 1;
                particle.currentRadius = particle.radius * pulseScale;
            } else {
                particle.currentRadius = particle.radius;
            }

            // Update position
            let dx: number, dy: number;
            if (this.lastTimestamp != null) {
                // time factor adjusts the movement to the screen refresh rate
                const timeFactor = (timestamp - this.lastTimestamp) / 1000;
                dx = timeFactor * particle.xSpeed;
                dy = timeFactor * particle.ySpeed;
            } else {
                dx = 0;
                dy = 0;
            }
            particle.x += dx;
            particle.y += dy;

            // Mouse interaction
            if (this.config.mouseInteraction && this.mousePosition) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    const repelX = Math.cos(angle) * force * this.config.mouseRepelPower;
                    const repelY = Math.sin(angle) * force * this.config.mouseRepelPower;
                    particle.xSpeed -= repelX;
                    particle.ySpeed -= repelY;
                }
            }

            // Bounce off walls / Move back into visible area if canvas size changed
            if (particle.x < 0) {
                particle.xSpeed = -particle.xSpeed;
            }
            if (particle.x > this.canvas.width) {
                particle.x = this.canvas.width;
                particle.xSpeed = Math.abs(particle.xSpeed) * -1;
            }
            if (particle.y < 0) {
                particle.ySpeed = -particle.ySpeed;
            }
            if (particle.y > this.canvas.height) {
                particle.y = this.canvas.height;
                particle.ySpeed = Math.abs(particle.ySpeed) * -1;
            }

            // Apply speed limits
            const speed = Math.sqrt(particle.xSpeed * particle.xSpeed + particle.ySpeed * particle.ySpeed);
            if (speed > this.config.moveSpeed) {
                particle.xSpeed = (particle.xSpeed / speed) * this.config.moveSpeed;
                particle.ySpeed = (particle.ySpeed / speed) * this.config.moveSpeed;
            }
        });

        this.lastTimestamp = timestamp;
        this.particles = particles;
    }

    /**
     * Draw all particles on the canvas
     */
    drawParticles() {
        this.ctx.fillStyle = this.config.particleColor;
        this.ctx.globalAlpha = this.config.particleOpacity;
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.currentRadius || particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    /**
     * Draw connections between nearby particles
     */
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.maxDistance) {
                    const opacity = 1 - (distance / this.config.maxDistance);
                    const color = this.hexToRgb(this.config.lineColor);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${color}, ${opacity * this.config.lineOpacity})`;
                    this.ctx.lineWidth = this.config.lineWidth;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * Convert hex color to RGB values
     * @param {string} hex - Hex color code
     * @returns {string} RGB values as "r,g,b"
     */
    hexToRgb(hex: string) {
        // Remove # if present
        hex = hex.replace(/^#/, '');

        // Convert shorthand hex to full form
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }

        const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            return '255,255,255'; // Fallback to white
        }

        return result.slice(1).map(n => parseInt(n, 16)).join(',');
    }

    /**
     * Start the animation
     */
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate(performance.now());
        }
    }

    /**
     * Main animation loop
     */
    animate(timestamp: DOMHighResTimeStamp) {
        // Clear the canvas
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.globalAlpha = this.config.backgroundOpacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;

        // Update and draw
        this.updateParticles(timestamp);
        this.drawParticles();
        this.drawConnections();

        // Continue animation
        if (this.isRunning) {
            this.animationId = requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.animate(timestamp));
        }
    }

    /**
     * Update configuration and restart animation if needed
     */
    updateConfig(userConfig: ParticleNetworkConfig) {
        const oldConfig = this.config;
        const newConfig = createConfig(userConfig);
        this.config = newConfig;

        // Update speed for all particles if speed changes
        if (oldConfig.moveSpeed != newConfig.moveSpeed) {
            this.particles.forEach(particle => {
                const currentSpeed = Math.sqrt(particle.xSpeed * particle.xSpeed + particle.ySpeed * particle.ySpeed);
                if (currentSpeed > 0) {
                    particle.xSpeed = (particle.xSpeed / currentSpeed) * newConfig.moveSpeed;
                    particle.ySpeed = (particle.ySpeed / currentSpeed) * newConfig.moveSpeed;
                }
            });
        }

        // Update particle sizes if min or max radius changes
        if (oldConfig.minRadius != newConfig.minRadius || oldConfig.maxRadius != newConfig.maxRadius) {
            this.particles.forEach(particle => {
                const sizeRange = oldConfig.maxRadius - oldConfig.minRadius;
                const randomSize = Math.random() * sizeRange + oldConfig.minRadius;
                particle.radius = randomSize;
            });
        }
    }

    private computeParticleCount() {
        return Math.floor(this.config.particleDensity * this.canvas.width * this.canvas.height / (100 * 100));
    }

}

export const defaultConfig: ParticleNetworkConfig = {
    particleDensity: 20,
    minRadius: 2,
    maxRadius: 6,
    particleColor: '#000000',
    lineColor: '#000000',
    lineWidth: 1,
    lineOpacity: 0.2,
    maxDistance: 150,
    moveSpeed: 60,
    backgroundColor: '#ffffff',
    backgroundOpacity: 1,
    particleOpacity: 1,
    mouseRadius: 200,
    mouseInteraction: true,
    mouseRepelPower: 14,
    pulseEnabled: true,
    pulseSpeed: 0,
};

function createConfig(newConfig: ParticleNetworkConfig) {
    const config = Object.assign({}, defaultConfig, newConfig);

    function checkColorValue(color: string) {
        const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
        if (!hexColorRegex.test(color)) {
            throw new Error(`Invalid ${color}: must be a valid hex color`);
        }
    };

    checkColorValue(config.backgroundColor);
    checkColorValue(config.particleColor);
    checkColorValue(config.lineColor);

    return config;
}

interface Particle {
    x: number;
    y: number;

    /** x axis speed (pixels per second) */
    xSpeed: number;

    /** y axis speed (pixels per second) */
    ySpeed: number;

    radius: number;
    currentRadius?: number;
}

interface MousePosition {
    x: number;
    y: number;
}

export interface ParticleNetworkConfig {
    /** in particles per 100x100 pixels square */
    particleDensity: number,

    minRadius: number,
    maxRadius: number,
    particleColor: string,
    lineColor: string,
    lineWidth: number,
    lineOpacity: number,
    maxDistance: number,

    /** base particle speed (pixels per second) */
    moveSpeed: number,

    backgroundColor: string,
    backgroundOpacity: number,
    particleOpacity: number,
    mouseRadius: number,
    mouseInteraction: boolean,
    mouseRepelPower: number;
    pulseEnabled: boolean,
    pulseSpeed: number,
}
