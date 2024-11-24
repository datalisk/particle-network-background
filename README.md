# 🌐 Animated Particle Network Background

<div align="center">
  <img src="favicon.svg" alt="Particle Network Logo" width="120">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
</div>

> A stunning, interactive particle network animation for modern web backgrounds. Built with pure JavaScript and HTML5 Canvas.

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
