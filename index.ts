/**
 * ParticleNetwork Class
 * Creates and manages an interactive particle network animation
 */
export class ParticleNetwork {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    config: ParticleNetworkConfig;

    particles: Particle[] = [];
    animationId: number | null;
    isRunning: boolean;
    mousePosition: MousePosition | null;
    pulseAngle: number;
    boundHandleMouseMove;
    boundHandleMouseLeave;
    lastTimestamp: DOMHighResTimeStamp | null = null;

    constructor(canvas: HTMLCanvasElement, config: ParticleNetworkConfig) {
        // Canvas setup and context
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true })!; // Enable transparency
        if (!this.ctx) {
            throw new Error('Could not initialize canvas context');
        }

        this.config = config;
        // TODO move outside
        // // Validate and set configuration
        // this.config = this.validateConfig({
        //     particleCount: 100,
        //     minRadius: 2,
        //     maxRadius: 6,
        //     particleColor: '#000000',
        //     lineColor: '#000000',
        //     lineWidth: 1,
        //     lineOpacity: 0.2,
        //     maxDistance: 150,
        //     moveSpeed: 1,
        //     backgroundColor: '#ffffff',
        //     backgroundOpacity: 1,
        //     particleOpacity: 1,
        //     mouseRadius: 200,
        //     mouseInteraction: true,
        //     pulseEnabled: true,
        //     pulseSpeed: 0,
        //     ...config
        // });

        // Initialize state
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;
        this.mousePosition = null;
        this.pulseAngle = 0;
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
        
        // Set up initial state
        this.createParticles();
        this.setupEventListeners();
    }

    /**
     * Validate configuration parameters
     * @param {Object} config - Configuration object
     * @returns {Object} Validated configuration
     */
    validateConfig(config) {
        // Validate numeric parameters
        const numericParams = [
            'particleCount', 'minRadius', 'maxRadius', 'lineWidth', 
            'lineOpacity', 'maxDistance', 'moveSpeed', 'backgroundOpacity', 
            'particleOpacity', 'mouseRadius', 'pulseSpeed'
        ];
        numericParams.forEach(param => {
            if (typeof config[param] !== 'number' || isNaN(config[param])) {
                throw new Error(`Invalid ${param}: must be a number`);
            }
        });

        // Validate boolean parameters
        const booleanParams = ['mouseInteraction', 'pulseEnabled'];
        booleanParams.forEach(param => {
            if (typeof config[param] !== 'boolean') {
                throw new Error(`Invalid ${param}: must be a boolean`);
            }
        });

        // Validate color parameters
        const colorParams = ['backgroundColor', 'particleColor', 'lineColor'];
        const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
        colorParams.forEach(param => {
            if (!hexColorRegex.test(config[param])) {
                throw new Error(`Invalid ${param}: must be a valid hex color`);
            }
        });

        return config;
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
    cleanup() {
        this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.removeEventListener('mouseleave', this.boundHandleMouseLeave);
        this.stop();
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
     * Create initial set of particles with random positions
     */
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            const sizeRange = this.config.maxRadius - this.config.minRadius;
            const randomSize = Math.random() * sizeRange + this.config.minRadius;
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                xSpeed: (Math.random() - 0.5) * this.config.moveSpeed * 2,
                ySpeed: (Math.random() - 0.5) * this.config.moveSpeed * 2,
                radius: randomSize
            });
        }
    }
    
    /**
     * Update particle positions and handle boundary collisions
     */
    updateParticles(timestamp: DOMHighResTimeStamp) {
        this.particles.forEach(particle => {
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

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.xSpeed = -particle.xSpeed;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.ySpeed = -particle.ySpeed;
            }

            // Apply speed limits
            const speed = Math.sqrt(particle.xSpeed * particle.xSpeed + particle.ySpeed * particle.ySpeed);
            if (speed > this.config.moveSpeed) {
                particle.xSpeed = (particle.xSpeed / speed) * this.config.moveSpeed;
                particle.ySpeed = (particle.ySpeed / speed) * this.config.moveSpeed;
            }
        });

        this.lastTimestamp = timestamp;
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
     * Stop the animation and clean up
     */
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
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
     * @param {string} property - Property to update
     * @param {any} value - New value
     */
    updateConfig(property, value) {
        // Update the configuration value
        this.config[property] = value;
        
        // Recreate particles if count changes
        if (property === 'particleCount') {
            this.createParticles();
        }
        
        // Update speed for all particles if speed changes
        if (property === 'moveSpeed') {
            this.particles.forEach(particle => {
                const currentSpeed = Math.sqrt(particle.xSpeed * particle.xSpeed + particle.ySpeed * particle.ySpeed);
                if (currentSpeed > 0) {
                    particle.xSpeed = (particle.xSpeed / currentSpeed) * value;
                    particle.ySpeed = (particle.ySpeed / currentSpeed) * value;
                }
            });
        }

        // Update particle sizes if min or max radius changes
        if (property === 'minRadius' || property === 'maxRadius') {
            this.particles.forEach(particle => {
                const sizeRange = this.config.maxRadius - this.config.minRadius;
                const randomSize = Math.random() * sizeRange + this.config.minRadius;
                particle.radius = randomSize;
            });
        }
    }

    /**
     * Reset to default configuration
     * @param {Object} defaults - Default configuration
     */
    reset(defaults) {
        this.config = this.validateConfig(defaults);
        this.createParticles();
        this.stop();
        this.start();
    }
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
    particleCount: number,
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
