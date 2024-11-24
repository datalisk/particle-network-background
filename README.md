# 🌐 Animated Particle Network Background

<div align="center">
  <img src="favicon.svg" alt="Particle Network Logo" width="120">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
</div>

> A stunning, interactive particle network animation for modern web backgrounds. Built with pure JavaScript and HTML5 Canvas.

<div align="center">
  <img src="https://i.imgur.com/ZraTCeT.png" alt="Particle Network Demo" width="100%" style="max-width: 800px;">
</div>

## ✨ Features

- **Interactive Particle Network** - Dynamic particles that respond to mouse movements
- **Real-time Customization** - Adjust settings on the fly with an intuitive control panel
- **Modern Design** - Clean, glass-morphism UI with smooth animations
- **Performance Optimized** - Efficient canvas rendering and animation frames
- **Responsive** - Adapts seamlessly to any screen size
- **Zero Dependencies** - Built with vanilla JavaScript, no external libraries required

## 🚀 Quick Start

1. **Include in your project:**
   ```html
   <!-- Add to your HTML -->
   <canvas id="particleCanvas"></canvas>
   <link rel="stylesheet" href="styles.css">
   <script src="script.js"></script>
   ```

2. **Initialize the canvas:**
   ```javascript
   // The animation will start automatically
   // All configuration is handled through the UI
   ```

3. **Open in browser:**
   - Launch `index.html` in a modern web browser
   - Use the settings panel (⚙️) to customize the animation

## 🎨 Customization

### Visual Settings

- **Background**
  - Color with opacity control
  - Seamless color transitions

- **Particles**
  - Count (10-300)
  - Size range (0.5-10px)
  - Color with opacity
  - Movement speed

- **Connections**
  - Maximum distance
  - Line width
  - Color with opacity
  - Dynamic connection behavior

### Interactive Features

- **Mouse Interaction**
  - Adjustable influence radius
  - Particle attraction/repulsion
  - Real-time response

- **Animation Effects**
  - Pulse animation
  - Speed control
  - Toggle interactions

## 🛠️ Technical Details

### Canvas Optimization

- **Efficient Rendering**
  - RequestAnimationFrame for smooth animations
  - Optimized particle updates
  - Smart connection calculations

- **Performance Tips**
  - Adjust particle count based on device capability
  - Reduce connection distance on mobile devices
  - Lower opacity for better performance

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📱 Responsive Design

The animation and control panel automatically adapt to different screen sizes:

- **Desktop:** Full-featured experience with expanded controls
- **Tablet:** Optimized layout with touch-friendly controls
- **Mobile:** Condensed interface with essential settings

## 🔧 Advanced Configuration

### Parameters Reference

All available configuration parameters for the particle network:

```javascript
const defaultConfig = {
  // Particle Settings
  particleCount: 120,      // Number of particles (10-300)
  minRadius: 1,           // Minimum particle radius (0.5-5)
  maxRadius: 5,           // Maximum particle radius (2-10)
  particleColor: '#000000', // Particle color in hex
  particleOpacity: 1,     // Particle opacity (0-1)
  
  // Movement Settings
  moveSpeed: 0.504,       // Particle movement speed (0.1-2)
  mouseRadius: 200,       // Mouse interaction radius (50-400)
  mouseInteraction: true, // Enable mouse interaction
  
  // Connection Settings
  connectDistance: 150,   // Maximum connection distance (50-300)
  lineWidth: 2,          // Connection line width (0.5-5)
  lineColor: '#000000',   // Connection line color in hex
  lineOpacity: 0.2,      // Connection line opacity (0-1)
  
  // Background Settings
  backgroundColor: '#ffffff', // Background color in hex
  backgroundOpacity: 1,    // Background opacity (0-1)
  
  // Animation Settings
  pulseEnabled: true,     // Enable pulse animation
  pulseSpeed: 0.0001      // Pulse animation speed (0.0001-0.2)
}
```

### Parameter Details

#### Particle Settings
- `particleCount`: Total number of particles rendered
  - Higher values create denser networks but impact performance
  - Recommended: 80-150 for desktop, 30-80 for mobile
  
- `minRadius` & `maxRadius`: Particle size range
  - Particles are randomly sized within this range
  - Smaller particles (1-3px) work best for dense networks
  - Larger particles (4-10px) create bold, sparse networks

- `particleColor`: Color of individual particles
  - Accepts hex color codes
  - Use lighter colors for dark backgrounds
  - Darker colors work best on light backgrounds

- `particleOpacity`: Particle transparency
  - 1 = fully opaque
  - 0.5-0.8 creates subtle depth
  - Lower values work well with higher particle counts

#### Movement Settings
- `moveSpeed`: Controls particle velocity
  - 0.1 = very slow, dreamy movement
  - 0.5 = balanced, natural movement
  - 1.0+ = fast, energetic movement
  
- `mouseRadius`: Mouse interaction area
  - Larger radius = more particles affected
  - Smaller radius = more precise interaction
  - Adjust based on particle density

- `mouseInteraction`: Toggle mouse effects
  - When true, particles respond to mouse movement
  - False disables all mouse-related effects
  - Useful for static backgrounds

#### Connection Settings
- `connectDistance`: Maximum line length
  - Affects network density significantly
  - Larger values create more connections
  - Consider performance with high particle counts

- `lineWidth`: Connection thickness
  - Thin lines (0.5-1) for subtle networks
  - Thicker lines (2-5) for bold visuals
  - Impacts rendering performance

- `lineColor`: Connection line color
  - Can match or contrast particle color
  - Semi-transparent lines work well
  - Consider contrast with background

- `lineOpacity`: Line transparency
  - Lower values (0.1-0.3) for subtle connections
  - Higher values (0.4-1) for prominent networks
  - Affects visual density perception

#### Background Settings
- `backgroundColor`: Canvas background
  - Sets base color for animation
  - Consider contrast with particles
  - Can be fully transparent

- `backgroundOpacity`: Background transparency
  - 1 = solid background
  - 0 = fully transparent
  - Useful for overlaying on other content

#### Animation Settings
- `pulseEnabled`: Toggle size animation
  - Adds subtle life to static scenes
  - Works well with slower move speeds
  - Minimal performance impact

- `pulseSpeed`: Animation timing
  - 0.0001-0.001 = very subtle pulse
  - 0.001-0.01 = noticeable rhythm
  - 0.01-0.2 = dramatic pulsing

### Usage Example

```javascript
// Create a dreamy, subtle network
const dreamyConfig = {
  particleCount: 100,
  minRadius: 1,
  maxRadius: 3,
  particleColor: '#4a90e2',
  particleOpacity: 0.7,
  moveSpeed: 0.3,
  connectDistance: 120,
  lineWidth: 1,
  lineColor: '#4a90e2',
  lineOpacity: 0.15,
  backgroundColor: '#1a1a1a',
  backgroundOpacity: 1,
  pulseEnabled: true,
  pulseSpeed: 0.0005
};

// Create an energetic, bold network
const energeticConfig = {
  particleCount: 150,
  minRadius: 2,
  maxRadius: 4,
  particleColor: '#ff4444',
  particleOpacity: 1,
  moveSpeed: 0.8,
  connectDistance: 180,
  lineWidth: 2,
  lineColor: '#ff4444',
  lineOpacity: 0.3,
  backgroundColor: '#ffffff',
  backgroundOpacity: 1,
  pulseEnabled: true,
  pulseSpeed: 0.01
};
```

### Custom Integration

1. **Canvas Setup**
   ```javascript
   const canvas = document.getElementById('particleCanvas');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   ```

2. **Event Handling**
   ```javascript
   window.addEventListener('resize', () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
   });
   ```

### Performance Optimization

- Use appropriate particle counts:
  - Desktop: 100-300 particles
  - Tablet: 50-150 particles
  - Mobile: 30-100 particles

- Adjust connection distance:
  - Desktop: 150px
  - Tablet: 100px
  - Mobile: 80px

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Guidelines

- Follow existing code style
- Add comments for complex logic
- Test across different browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by particle network visualizations
- Built with modern web technologies
- Community feedback and contributions

## 🔍 Examples

### Use Cases
- Website backgrounds
- Interactive headers
- Loading screens
- Data visualizations
- Creative portfolios

### Tips
- Adjust opacity for text overlay visibility
- Use color schemes that match your brand
- Consider user device capabilities
- Test performance on various devices

---

<div align="center">
  Made with ❤️ by <a href="https://cloudwerxlab.com">CloudWerx Lab</a>
</div>
