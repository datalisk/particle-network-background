# 🌐 Animated Particle Network Background

<div align="center">
  <img src="favicon.svg" alt="Particle Network Logo" width="120">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
</div>

## 🚀 Overview

An elegant and interactive particle network animation that creates a dynamic, interconnected background effect. Perfect for modern web applications, portfolios, or any project requiring an engaging visual element.

### ✨ Features

- 🎯 Smooth particle animations
- 🔄 Interactive mouse tracking
- 📱 Fully responsive design
- 🎨 Customizable appearance
- 🖥️ Canvas-based rendering
- ⚡ Optimized performance

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd animated-backgrounds-particle-network
   ```

3. Open `index.html` in your browser or serve it using a local server.

## 💻 Usage

### Basic Implementation

Simply include the following files in your project:

```html
<link rel="stylesheet" href="styles.css">
<canvas id="particleCanvas"></canvas>
<script src="script.js"></script>
```

### Customization

You can customize the particle network by passing options when initializing:

```javascript
new ParticleNetwork({
    particleCount: 120,      // Number of particles
    connectDistance: 150,    // Maximum connection distance
    moveSpeed: 0.6,         // Particle movement speed
    maxRadius: 5,           // Maximum particle radius
    mouseRadius: 200,       // Mouse interaction radius
    pulseSpeed: 0.02,       // Particle pulse animation speed
    lineWidth: 2           // Connection line width
});
```

#### Available Parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| particleCount | 100 | Total number of particles |
| connectDistance | 150 | Maximum distance for particle connections |
| moveSpeed | 0.5 | Speed of particle movement |
| particleColor | 'rgba(0, 0, 0, 0.6)' | Color of particles |
| lineColor | 'rgba(0, 0, 0, 0.2)' | Color of connection lines |
| minRadius | 1 | Minimum particle radius |
| maxRadius | 5 | Maximum particle radius |
| lineWidth | 2 | Thickness of connection lines |
| mouseInteraction | true | Enable/disable mouse interaction |
| mouseRadius | 150 | Radius of mouse interaction |
| pulseEnabled | true | Enable/disable particle pulsing animation |
| pulseSpeed | 0.01 | Speed of pulse animation |
| particleLife | null | Particle lifetime (null for infinite) |

### Interactive Features

1. **Mouse Interaction**
   - Particles react to mouse movement
   - Configurable interaction radius
   - Smooth force-based movement

2. **Particle Animation**
   - Pulsing size effect
   - Configurable animation speed
   - Optional particle lifetime

3. **Visual Effects**
   - Dynamic opacity based on distance
   - Smooth edge bouncing
   - Customizable colors and sizes

### Advanced Usage Examples

```javascript
// Minimal setup with basic parameters
new ParticleNetwork({
    particleCount: 80,
    connectDistance: 100,
    moveSpeed: 0.3
});

// Full customization with all parameters
new ParticleNetwork({
    particleCount: 150,
    connectDistance: 200,
    moveSpeed: 0.8,
    particleColor: 'rgba(66, 135, 245, 0.7)',
    lineColor: 'rgba(66, 135, 245, 0.2)',
    minRadius: 2,
    maxRadius: 6,
    lineWidth: 1.5,
    mouseInteraction: true,
    mouseRadius: 180,
    pulseEnabled: true,
    pulseSpeed: 0.015,
    particleLife: 300
});

// Performance-focused setup
new ParticleNetwork({
    particleCount: 50,
    connectDistance: 120,
    moveSpeed: 0.4,
    pulseEnabled: false,
    mouseInteraction: false
});
```

## 🎨 Styling

The particle network can be styled by adjusting the CSS variables:

```css
#particleCanvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
```

## 🔧 Advanced Configuration

### Particle Properties

Each particle has the following properties:
- Position (x, y)
- Radius (1-5 pixels)
- Velocity (vx, vy)
- Connection opacity based on distance

### Connection Logic

Connections between particles are drawn when:
1. Distance between particles is less than `connectDistance`
2. Opacity is calculated based on distance
3. Line width increases for closer particles

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern web design trends
- Built with vanilla JavaScript for maximum compatibility
- Optimized for performance and responsiveness

---

<div align="center">
  <h2>💫 Created with passion by</h2>
  
  <img src="https://img.shields.io/badge/Developer-Tyler%20Doering-blue?style=for-the-badge&logo=visualstudiocode&logoColor=white&labelColor=2b3137" alt="Developer Badge"/>
  
  <h3>🏢 CloudWerx Lab</h3>
  <p><em>Innovating the Future of Web Development</em></p>
  
  <div align="center">
    <a href="https://cloudwerxlab.com" target="_blank">
      <img src="https://img.shields.io/badge/Website-cloudwerxlab.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=2b3137" alt="Website"/>
    </a>
    <br/>
    <a href="mailto:cloudwerxlabs@gmail.com">
      <img src="https://img.shields.io/badge/Email-cloudwerxlabs%40gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white&labelColor=2b3137" alt="Email"/>
    </a>
  </div>

  <br/>
  
  <div align="center">
    <a href="https://github.com/cloudwerx" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Follow-2b3137?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    </a>
    <a href="https://linkedin.com/in/tylerdoering" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
    </a>
  </div>

  <br/>
  
  <div align="center">
    <img src="https://img.shields.io/badge/Tech%20Stack-Frontend%20Development-2b3137?style=for-the-badge&logo=html5&logoColor=white" alt="Tech Stack"/>
    <br/>
    <img src="https://img.shields.io/badge/Specialization-UI%2FUX%20Design-2b3137?style=for-the-badge&logo=figma&logoColor=white" alt="Specialization"/>
  </div>

  <br/>
  
  <div>
    <p><strong>🌟 "Crafting digital experiences that inspire"</strong></p>
    <p>Specialized in creating elegant, performant, and user-centric web solutions</p>
  </div>

  <br/>
  
  <div align="center">
    <table>
      <tr>
        <td align="center">
          <img src="https://img.shields.io/badge/Available-Freelance%20Projects-success?style=for-the-badge&logo=upwork&logoColor=white" alt="Freelance"/>
        </td>
        <td align="center">
          <img src="https://img.shields.io/badge/Open%20To-Collaboration-success?style=for-the-badge&logo=handshake&logoColor=white" alt="Collaboration"/>
        </td>
      </tr>
    </table>
  </div>

  <br/>
  
  <sub> 2024 CloudWerx Lab. All rights reserved.</sub>
  <br/>
  <sub>Made with 💻 in Silicon Valley, California</sub>
</div>
