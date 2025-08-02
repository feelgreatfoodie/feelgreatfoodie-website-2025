# FeelGreatFoodie

**Where Heritage Meets Flavor**

A modern, responsive React application celebrating authentic recipes passed down through generations. Built with performance, accessibility, and user experience in mind.

![FeelGreatFoodie Screenshot](./public/screenshot-desktop.png)

## Features

- **Modern Design**: Clean, intuitive interface with smooth animations
- **Fully Responsive**: Works perfectly on all devices and screen sizes
- **High Performance**: Optimized for speed with lazy loading and code splitting
- **Accessible**: WCAG 2.1 compliant with keyboard navigation support
- **Smart Search**: Filter and search recipes with real-time results
- **Favorites System**: Save and manage your favorite recipes
- **Newsletter**: Stay updated with weekly recipe updates
- **PWA Ready**: Installable progressive web app with offline support
- **Analytics**: Built-in performance monitoring and user analytics

## Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/feelgreatfoodie.git

# Navigate to project directory
cd feelgreatfoodie

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   ├── sections/       # Page sections
│   └── ui/             # Basic UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── styles/             # CSS and styling
├── utils/              # Utility functions
└── config/             # Configuration files
```

### Key Technologies

- **React 18** - Modern React with hooks and concurrent features
- **Bootstrap 5** - Responsive CSS framework
- **Context API** - State management
- **Custom Hooks** - Reusable logic
- **Service Workers** - Offline functionality
- **Web Vitals** - Performance monitoring

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized with code splitting
- **Load Time**: < 3s on 3G networks

### Performance Features

- Lazy loading for images and components
- Code splitting by route
- Service worker caching
- Optimized fonts and assets
- Progressive enhancement

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- High contrast mode support
- Focus management
- Semantic HTML structure

### Accessibility Features

- Skip navigation links
- ARIA labels and roles
- Color contrast ratios > 4.5:1
- Keyboard shortcuts
- Focus indicators
- Alt text for images

## Progressive Web App

- Installable on mobile and desktop
- Offline functionality
- Background sync
- Push notifications
- App-like experience

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Testing Strategy

- Unit tests for components and hooks
- Integration tests for user flows
- Accessibility testing
- Performance testing
- Cross-browser testing

## Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Lint code
npm run format     # Format code
npm run analyze    # Analyze bundle size
npm run lighthouse # Run Lighthouse audit
```

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Lint-staged for pre-commit checks

### Environment Variables

Create a `.env.local` file:

```env
REACT_APP_GA_ID=your-google-analytics-id
REACT_APP_API_URL=your-api-url
```

## Deployment

### Build for Production

```bash
npm run build
```

The build folder contains optimized production files.

### Deployment Options

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Use `gh-pages` for static hosting
- **AWS S3**: Host as a static website
- **Docker**: Containerized deployment

### Production Checklist

- [ ] Update environment variables
- [ ] Configure analytics
- [ ] Set up error monitoring
- [ ] Enable HTTPS
- [ ] Configure CDN
- [ ] Test on multiple devices
- [ ] Run Lighthouse audit
- [ ] Check accessibility

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run linting and formatting
6. Submit a pull request

### Code Standards

- Follow React best practices
- Write semantic, accessible HTML
- Use TypeScript for type safety
- Write comprehensive tests
- Document complex logic
- Follow git commit conventions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

- **Frontend**: React, CSS, Accessibility
- **Backend**: Node.js, Express, Database
- **Design**: UI/UX, Branding, Assets
- **DevOps**: Deployment, Monitoring, CI/CD

## Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- Community contributors and testers

## Support

- Email: hello@feelgreatfoodie.com
- Issues: [GitHub Issues](https://github.com/your-username/feelgreatfoodie/issues)
- Discussions: [GitHub Discussions](https://github.com/your-username/feelgreatfoodie/discussions)

---

Made with care by the FeelGreatFoodie team

_Bringing families together, one recipe at a time._
