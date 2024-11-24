/**
 * ParticleNetwork Class
 * Creates and manages an interactive particle network animation
 */
class ParticleNetwork {
    constructor(canvas, config = {}) {
        // Canvas setup and context
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true }); // Enable transparency
        if (!this.ctx) {
            throw new Error('Could not initialize canvas context');
        }

        // Validate and set configuration
        this.config = this.validateConfig({
            particleCount: 100,
            minRadius: 2,
            maxRadius: 6,
            particleColor: '#000000',
            lineColor: '#000000',
            lineWidth: 1,
            lineOpacity: 0.2,
            maxDistance: 150,
            moveSpeed: 1,
            backgroundColor: '#ffffff',
            backgroundOpacity: 1,
            particleOpacity: 1,
            mouseRadius: 200,
            mouseInteraction: true,
            pulseEnabled: true,
            pulseSpeed: 0,
            ...config
        });

        // Initialize state
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;
        this.mousePosition = null;
        this.pulseAngle = 0;
        this.boundHandleResize = this.handleResize.bind(this);
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
        
        // Set up initial state
        this.handleResize();
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
        window.addEventListener('resize', this.boundHandleResize);
        this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.addEventListener('mouseleave', this.boundHandleMouseLeave);
    }

    /**
     * Clean up event listeners
     */
    cleanup() {
        window.removeEventListener('resize', this.boundHandleResize);
        this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.removeEventListener('mouseleave', this.boundHandleMouseLeave);
        this.stop();
    }

    /**
     * Handle mouse movement
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseMove(e) {
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
     * Handle resize
     */
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
                dx: (Math.random() - 0.5) * this.config.moveSpeed,
                dy: (Math.random() - 0.5) * this.config.moveSpeed,
                radius: randomSize
            });
        }
    }

    /**
     * Update particle positions and handle boundary collisions
     */
    updateParticles() {
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
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Mouse interaction
            if (this.config.mouseInteraction && this.mousePosition) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    const repelX = Math.cos(angle) * force * 0.5;
                    const repelY = Math.sin(angle) * force * 0.5;
                    particle.dx -= repelX;
                    particle.dy -= repelY;
                }
            }

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.dx = -particle.dx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.dy = -particle.dy;
            }

            // Apply speed limits
            const speed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);
            if (speed > this.config.moveSpeed) {
                particle.dx = (particle.dx / speed) * this.config.moveSpeed;
                particle.dy = (particle.dy / speed) * this.config.moveSpeed;
            }
        });
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
    hexToRgb(hex) {
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
            this.animate();
        }
    }

    /**
     * Main animation loop
     */
    animate() {
        // Clear the canvas
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.globalAlpha = this.config.backgroundOpacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
        
        // Update and draw
        this.updateParticles();
        this.drawParticles();
        this.drawConnections();
        
        // Continue animation
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
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
                const currentSpeed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);
                if (currentSpeed > 0) {
                    particle.dx = (particle.dx / currentSpeed) * value;
                    particle.dy = (particle.dy / currentSpeed) * value;
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

// Initialize the particle network when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle network with default settings
    const canvas = document.getElementById('particleCanvas');
    const particleNetwork = new ParticleNetwork(canvas, {
        particleCount: 100,
        minRadius: 2,
        maxRadius: 6,
        particleColor: '#000000',
        lineColor: '#000000',
        lineWidth: 1,
        lineOpacity: 0.2,
        maxDistance: 150,
        moveSpeed: 1,
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        particleOpacity: 1,
        mouseRadius: 200,
        mouseInteraction: true,
        pulseEnabled: true,
        pulseSpeed: 0
    });
    
    // Start the animation immediately
    particleNetwork.start();

    // Control Panel Functionality
    const controlToggle = document.getElementById('controlToggle');
    const controlPanel = document.querySelector('.control-panel');
    const closePanel = document.querySelector('.close-panel');

    // Toggle panel
    controlToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        controlPanel.classList.toggle('active');
        controlToggle.classList.toggle('active');
    });

    // Close panel with close button
    closePanel.addEventListener('click', () => {
        controlPanel.classList.remove('active');
        controlToggle.classList.remove('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!controlPanel.contains(e.target) && !controlToggle.contains(e.target)) {
            controlPanel.classList.remove('active');
            controlToggle.classList.remove('active');
        }
    });

    // Prevent panel close when clicking inside
    controlPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Store default values for reset
    const defaultValues = {
        particleCount: 100,
        minRadius: 2,
        maxRadius: 6,
        particleColor: '#000000',
        lineColor: '#000000',
        lineWidth: 1,
        lineOpacity: 0.2,
        maxDistance: 150,
        moveSpeed: 1,
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        particleOpacity: 1,
        mouseRadius: 200,
        mouseInteraction: true,
        pulseEnabled: true,
        pulseSpeed: 0,
    };

    // Helper function to update value display
    const updateValueDisplay = (input) => {
        const display = input.parentElement.querySelector('.value-display');
        if (display) {
            let value = input.value;
            // Format the display value based on the input type
            if (input.type === 'range') {
                if (input.id === 'pulseSpeed') {
                    // Convert pulse speed to percentage
                    value = Math.round((value / 0.2) * 100) + '%';
                } else if (input.id.includes('Opacity')) {
                    value = Math.round(value) + '%';
                } else {
                    value = parseFloat(value).toFixed(input.step.includes('.') ? input.step.split('.')[1].length : 0);
                }
            }
            display.textContent = value;
        }
    };

    // Helper function to update hex input
    const updateHexInput = (colorInput, hexInput) => {
        hexInput.value = colorInput.value.toUpperCase();
    };

    // Helper function to validate and format hex color
    const validateHexColor = (hex) => {
        // Remove # if present
        hex = hex.replace(/^#/, '');
        
        // Add # if missing
        if (hex.length === 3 || hex.length === 6) {
            return '#' + hex;
        }
        return null;
    };

    // Helper function to update color with opacity
    const updateColor = (colorInput, opacityInput, property) => {
        const color = colorInput.value;
        const opacity = parseInt(opacityInput.value) / 100;
        
        if (property === 'backgroundColor') {
            particleNetwork.updateConfig('backgroundColor', color);
            particleNetwork.updateConfig('backgroundOpacity', opacity);
        } else if (property === 'particleColor') {
            particleNetwork.updateConfig('particleColor', color);
            particleNetwork.updateConfig('particleOpacity', opacity);
        } else if (property === 'lineColor') {
            particleNetwork.updateConfig('lineColor', color);
            particleNetwork.updateConfig('lineOpacity', opacity);
        }
    };

    // Setup color picker and hex input pairs
    const colorInputs = [
        { color: 'backgroundColor', hex: 'backgroundHex', opacity: 'backgroundOpacity' },
        { color: 'particleColor', hex: 'particleHex', opacity: 'particleOpacity' },
        { color: 'lineColor', hex: 'lineHex', opacity: 'lineOpacity' }
    ];

    colorInputs.forEach(({ color, hex, opacity }) => {
        const colorInput = document.getElementById(color);
        const hexInput = document.getElementById(hex);
        const opacityInput = document.getElementById(opacity);

        // Update hex when color picker changes
        colorInput.addEventListener('input', () => {
            updateHexInput(colorInput, hexInput);
            updateColor(colorInput, opacityInput, color);
        });

        // Update color picker when hex changes
        hexInput.addEventListener('input', (e) => {
            const validHex = validateHexColor(e.target.value);
            if (validHex) {
                colorInput.value = validHex;
                hexInput.value = validHex.toUpperCase();
                updateColor(colorInput, opacityInput, color);
            }
        });

        // Update opacity
        opacityInput.addEventListener('input', () => {
            updateValueDisplay(opacityInput);
            updateColor(colorInput, opacityInput, color);
        });

        // Format hex on blur
        hexInput.addEventListener('blur', () => {
            const validHex = validateHexColor(hexInput.value);
            if (validHex) {
                hexInput.value = validHex.toUpperCase();
            } else {
                hexInput.value = colorInput.value.toUpperCase();
            }
        });
    });

    // Setup event listeners for non-color inputs
    document.querySelectorAll('input').forEach((input) => {
        if (!input.id.includes('Color') && !input.id.includes('Hex') && !input.id.includes('Opacity')) {
            input.addEventListener('input', (e) => {
                let value = e.target.value;
                
                // Convert to number for numeric inputs
                if (e.target.type === 'range' || e.target.type === 'number') {
                    value = parseFloat(value);
                }
                
                // Handle checkbox inputs
                if (e.target.type === 'checkbox') {
                    value = e.target.checked;
                }
                
                // Update value display if it exists
                updateValueDisplay(e.target);
                
                // Update particle network property
                particleNetwork.updateConfig(e.target.id, value);
            });
        }
    });

    // Reset button handler
    document.getElementById('reset').addEventListener('click', () => {
        const defaults = {
            particleCount: 100,
            minRadius: 2,
            maxRadius: 6,
            particleColor: '#000000',
            lineColor: '#000000',
            lineWidth: 1,
            lineOpacity: 0.2,
            maxDistance: 150,
            moveSpeed: 1,
            backgroundColor: '#ffffff',
            backgroundOpacity: 1,
            particleOpacity: 1,
            mouseRadius: 200,
            mouseInteraction: true,
            pulseEnabled: true,
            pulseSpeed: 0,
        };

        // Update all inputs with default values
        Object.entries(defaults).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (!input) return;
            
            if (input.type === 'range' || input.type === 'number') {
                input.value = value;
                updateValueDisplay(input);
            }
            if (input.type === 'checkbox') {
                input.checked = value;
            }
            if (input.type === 'color') {
                input.value = value;
            }
            
            // Update colors with opacity
            if (key === 'backgroundColor') {
                updateColor(input, document.getElementById('backgroundOpacity'), key);
            }
        });
        
        // Reset colors
        updateColor(
            document.getElementById('particleColor'),
            document.getElementById('particleOpacity'),
            'particleColor'
        );
        updateColor(
            document.getElementById('lineColor'),
            document.getElementById('lineOpacity'), 
            'lineColor'
        );
        
        particleNetwork.reset(defaults);
    });

    // Randomize button handler
    document.getElementById('randomize').addEventListener('click', () => {
        // Randomize particle count
        const particleCount = Math.floor(Math.random() * 200) + 50;
        document.getElementById('particleCount').value = particleCount;
        updateValueDisplay(document.getElementById('particleCount'));
        particleNetwork.updateConfig('particleCount', particleCount);
        
        // Generate a random color for both particles and lines
        const randomParticleColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        document.getElementById('particleColor').value = randomParticleColor;
        document.getElementById('lineColor').value = randomParticleColor;
        
        // Update hex inputs
        updateHexInput(document.getElementById('particleColor'), document.getElementById('particleHex'));
        updateHexInput(document.getElementById('lineColor'), document.getElementById('lineHex'));
        
        // Update particle network with the new color
        particleNetwork.updateConfig('particleColor', randomParticleColor);
        particleNetwork.updateConfig('lineColor', randomParticleColor);
        
        // Randomize other numeric values
        const randomize = {
            minRadius: Math.random() * 4 + 1,
            maxRadius: Math.random() * 6 + 4,
            maxDistance: Math.random() * 200 + 100,
            moveSpeed: Math.random() * 1.5 + 0.2,
            mouseRadius: Math.random() * 200 + 100,
            pulseSpeed: Math.random() * 0.2,
            lineOpacity: Math.random() * 0.3 + 0.1,
            particleOpacity: Math.random() * 0.5 + 0.5
        };

        Object.entries(randomize).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) {
                input.value = value;
                updateValueDisplay(input);
                particleNetwork.updateConfig(key, value);
            }
        });
    });
});
