# Mateo Urrutia - Personal Portfolio Site

A professional, dark-mode-first personal portfolio website built with Jekyll for GitHub Pages.

## Features

- **Dark Mode First**: Beautiful dark theme with optional light mode toggle
- **Particle Network Animation**: Interactive particle background in hero section
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Smooth Animations**: Scroll-triggered reveal animations and smooth transitions
- **Modern Tech Stack**: Jekyll, Sass, Vanilla JavaScript
- **Performance Optimized**: Fast load times, compressed assets
- **SEO Ready**: Meta tags, Open Graph, and semantic HTML

## Local Development

### Prerequisites

- Ruby (2.7 or higher)
- Bundler

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bundle install
   ```

### Running Locally

Start the Jekyll development server:

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

The site will automatically rebuild when you make changes to files.

## Project Structure

```
maturrutia.github.io/
├── _config.yml          # Jekyll configuration
├── _data/               # Data files (resume, skills, navigation)
├── _includes/           # Reusable components (header, footer, sections)
├── _layouts/            # Page layouts
├── _sass/               # Sass stylesheets
├── assets/              # Static assets (CSS, JS)
├── index.html           # Homepage
└── Gemfile              # Ruby dependencies
```

## Updating Content

### Resume Information

Edit `_data/resume.yml` to update your:
- Name, title, contact info
- Professional summary
- Work experience
- Education
- Certifications

### Skills

Edit `_data/skills.yml` to add or modify skill categories and individual skills.

### Navigation

Edit `_data/navigation.yml` to customize the navigation menu items.

### Styling

Modify files in `_sass/` directory:
- `_variables.scss` - Colors, fonts, spacing
- `_sections.scss` - Section-specific styles
- `_components.scss` - Reusable components

### Theme Colors

To change the color scheme, edit the CSS custom properties in `_sass/_variables.scss`:

```scss
:root[data-theme="dark"] {
  --accent-cyan: #00d9ff;
  --accent-purple: #a855f7;
  // ... more variables
}
```

## Deployment

### GitHub Pages

1. Push your changes to the `main` branch
2. GitHub Pages will automatically build and deploy your site
3. Visit `https://maturrutia.github.io` to see your live site

The site typically updates within 1-2 minutes after pushing.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## Performance

- Total page weight: ~50KB (compressed)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## Credits

Built with:
- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Google Fonts](https://fonts.google.com/) - Space Grotesk & Inter fonts

## License

This project is open source and available under the MIT License.
