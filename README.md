# 🌐 Animated Particle Network Background

<div align="center">
  [![GitHub stars](https://img.shields.io/github/stars/cloudwerxlab/particle-network-background.svg?style=social&label=Star&maxAge=2592000)](https://github.com/cloudwerxlab/particle-network-background/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/cloudwerxlab/particle-network-background.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/cloudwerxlab/particle-network-background/network)
  [![GitHub issues](https://img.shields.io/github/issues/cloudwerxlab/particle-network-background.svg)](https://github.com/cloudwerxlab/particle-network-background/issues)
  <img src="favicon.svg" alt="Particle Network Logo" width="120">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
</div>

## 🚀 Overview

An elegant and interactive particle network animation that creates a dynamic, interconnected background effect. Perfect for modern web applications, portfolios, or any project requiring an engaging visual element. The animation features smooth particle movements, dynamic connections, and responsive mouse interactions, all rendered efficiently on an HTML5 canvas.

### ✨ Features

- 🎯 Smooth particle animations with configurable movement speed
- 🔄 Interactive mouse tracking with force-based particle repulsion
- 📱 Fully responsive design that adapts to any screen size
- 🎨 Extensive customization options through an intuitive UI panel
- 🖥️ Efficient canvas-based rendering with optimized performance
- ⚡ Real-time parameter adjustments with live preview
- 🎭 Dynamic particle pulsing effects
- 🌈 Customizable colors with hex input support
- 🔗 Adjustable connection line properties
- 🎮 Toggle-able features and effects

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animated-particle-network.git
   ```

2. Navigate to the project directory:
   ```bash
   cd animated-particle-network
   ```

3. Open `index.html` in your browser or serve it using a local server.

## 💻 Usage

### Basic Implementation

Include the necessary files in your project:

```html
<link rel="stylesheet" href="styles.css">
<canvas id="particleCanvas"></canvas>
<script src="script.js"></script>
```

### Customization

Initialize the particle network with custom options:

```javascript
const particleNetwork = new ParticleNetwork(canvas, {
    particleCount: 100,      // Number of particles
    minRadius: 2,           // Minimum particle radius
    maxRadius: 6,           // Maximum particle radius
    particleColor: '#000000', // Particle color (hex)
    lineColor: '#000000',    // Connection line color (hex)
    lineWidth: 1,           // Connection line width
    lineOpacity: 0.2,       // Connection line opacity
    maxDistance: 150,       // Maximum connection distance
    moveSpeed: 1,           // Particle movement speed
    backgroundColor: '#ffffff', // Background color (hex)
    backgroundOpacity: 1,    // Background opacity
    particleOpacity: 1,     // Particle opacity
    mouseRadius: 200,       // Mouse interaction radius
    mouseInteraction: true, // Enable mouse interaction
    pulseEnabled: true,     // Enable pulse animation
    pulseSpeed: 0          // Pulse animation speed (0-0.2)
});
```

## 🎮 Controls

### Interactive Settings Panel

Access the settings panel by clicking the gear icon in the top-right corner. The panel includes:

1. **Background Settings**
   - Color picker with hex input
   - Opacity control

2. **Particle Settings**
   - Particle count
   - Movement speed
   - Size range
   - Color with hex input
   - Opacity control

3. **Connection Settings**
   - Maximum connection distance
   - Line width
   - Color with hex input
   - Opacity control

4. **Effect Settings**
   - Mouse interaction radius
   - Pulse animation speed
   - Toggle mouse interaction
   - Toggle pulse animation

### Quick Actions
- **Reset**: Restore all settings to default values
- **Randomize**: Generate random colors for particles and connections

## 🎨 Styling

### CSS Variables

The project uses CSS variables for consistent theming:

```css
:root {
    --primary-color: #000000;
    --text-color: #333333;
    --panel-bg: rgba(255, 255, 255, 0.95);
    --border-color: rgba(0, 0, 0, 0.1);
    --blur-amount: 10px;
}
```

### Glass Effect

The UI elements feature a modern glass effect with:
- Backdrop blur
- Subtle transparency
- Soft shadows
- Smooth transitions

## 🔧 Advanced Configuration

### Performance Optimization

The animation is optimized for performance through:
- Request Animation Frame usage
- Efficient particle updates
- Canvas clearing optimization
- Event throttling

### Mobile Considerations

The animation automatically adapts to mobile devices by:
- Adjusting particle count
- Optimizing touch interactions
- Responsive UI adjustments
- Performance-based rendering

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a new branch: `git checkout -b feature/your-feature-name`
3. 💻 Make your changes
4. ✅ Commit your changes: `git commit -m 'Add some feature'`
5. 🚀 Push to the branch: `git push origin feature/your-feature-name`
6. 📥 Submit a pull request

### Issues and Bug Reports

Found a bug or have a suggestion? Please check these steps:

1. 🔍 Search the [existing issues](https://github.com/cloudwerxlab/particle-network-background/issues) first
2. 📝 If not found, [create a new issue](https://github.com/cloudwerxlab/particle-network-background/issues/new)
   - Include a clear title and description
   - Add steps to reproduce the bug (if applicable)
   - Include screenshots if helpful

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by particle system animations
- Built with modern web technologies
- Optimized for performance and usability

---

<div align="center">
  Made with ❤️ by <a href="https://cloudwerxlab.com">CloudWerx Lab</a> | <a href="https://github.com/cloudwerxlab/particle-network-background">GitHub Project</a>
</div>
