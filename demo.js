import {ParticleNetwork} from './index.js';

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
