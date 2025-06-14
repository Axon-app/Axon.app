# Copilot Instructions - Axon.App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

**Axon.App** is a professional web development portfolio and services website built with:

- **Vite** 6.x as the build tool (optimized for speed)
- **React** 19.x with modern hooks and patterns
- **Tailwind CSS** 4.x for utility-first styling
- **EmailJS** for contact form functionality
- **Canvas API** for dynamic social media images
- **GitHub Pages** for deployment
- **Modern ES6+ JavaScript** with ES modules

## Development Guidelines

### React Patterns

- Use functional components with React hooks exclusively
- Implement proper error boundaries and loading states
- Use React.memo() for performance optimization when needed
- Follow React 19 best practices and concurrent features

### Styling & Responsive Design

- Use **Tailwind CSS** utility classes primarily
- Implement mobile-first responsive design
- Ensure accessibility (WCAG 2.1 AA compliance)
- Use semantic HTML5 elements
- Optimize for Core Web Vitals (LCP, FID, CLS)

### Performance Optimization

- Implement lazy loading for images and components
- Use proper image formats (WebP, AVIF when supported)
- Minimize bundle size with code splitting
- Optimize social media images for different platforms
- Use efficient data structures and algorithms

### Code Quality

- Write clean, readable code with descriptive naming
- Use TypeScript-style JSDoc comments for documentation
- Implement proper error handling and validation
- Follow consistent code formatting and structure

## Project Structure

```
src/
├── components/        # Reusable React components
│   └── UIComponents.jsx
├── data/             # Static data and content
│   ├── content.js
│   └── servicesData.js
├── services/         # API and service integrations
│   └── emailService.js
├── assets/           # Static assets (images, icons)
├── App.jsx           # Main application component
├── main.jsx          # Application entry point
└── index.css         # Global styles and Tailwind imports

public/               # Static assets served directly
├── favicon.ico       # Favicon and icons
├── og-image.png      # Social media preview images
└── logo1.png         # Brand assets

.github/
└── workflows/        # GitHub Actions for deployment
```

## Specific Instructions

### Social Media Integration

- Always maintain og-image.png with logo1.png centered and high-quality
- Ensure meta tags are properly configured for all platforms
- Test social sharing with appropriate validators

### Contact Forms

- Use EmailJS for form submissions
- Implement proper validation and error handling
- Provide clear user feedback for form states

### Brand Consistency

- Use the established color palette (grays, blues, purples)
- Maintain consistent typography and spacing
- Ensure logo1.png is used consistently across all assets

### Performance Targets

- Lighthouse Score: 90+ in all categories
- Core Web Vitals: Green scores
- Bundle size: Keep under 500KB gzipped
- Images: Optimize for multiple screen densities

## Tech Stack Details

- **Build Tool**: Vite 6.x with React plugin
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Fonts**: Google Fonts (Orbitron, Rajdhani)
- **Icons**: Custom brand icons and logos
- **Email**: EmailJS for contact functionality
- **Deployment**: GitHub Pages with GitHub Actions
- **Image Processing**: Canvas API for dynamic generation
