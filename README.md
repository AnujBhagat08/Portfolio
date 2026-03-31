# 🚀 Anuj Bhagat - Portfolio Website

A modern, responsive portfolio website built with React and Vite, featuring smooth animations, interactive UI components, and a clean design to showcase projects, skills, and experience.

## 🔗 Live Portfolio

**Check out the live portfolio**: [https://portfolio-ri4u.vercel.app/]

## ✨ Features

- **Modern Design** - Clean and professional UI with dark theme
- **Smooth Animations** - Framer Motion animations for engaging user experience
- **Responsive Design** - Works seamlessly on all devices (mobile, tablet, desktop)
- **Interactive Components** - Custom cursor, overlay menu, particle background
- **Social Integration** - Links to GitHub, LinkedIn, Twitter, and contact via EmailJS
- **Fast Performance** - Built with Vite for optimized production builds
- **SEO Optimized** - Proper meta tags and structure

## 🛠️ Tech Stack

- **Frontend**: React 19.2.1
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Animations**: Framer Motion 12.23.24
- **Icons**: React Icons, Lucide React
- **Email Service**: EmailJS
- **Routing**: React Router DOM
- **Notifications**: React Toastify

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AnujBhagat08/Portfolio.git
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_SERVICE_ID = your_emailjs_service_id
VITE_TEMPLATE_ID = your_emailjs_template_id
VITE_PUBLIC_ID = your_emailjs_public_id
```

### 4. Run Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation bar
│   ├── CustomCursor.jsx # Custom cursor animation
│   ├── ParticlesBackground.jsx # Background particles
│   ├── OverlayMenu.jsx # Overlay navigation menu
│   ├── IntroAnimation.jsx # Intro animation
│   └── ui/             # UI components
├── sections/           # Page sections
│   ├── Home.jsx        # Hero section
│   ├── About.jsx       # About me section
│   ├── Experience.jsx  # Experience section
│   ├── Skills.jsx      # Skills section
│   ├── Projects.jsx    # Projects showcase
│   ├── Testimonials.jsx # Client testimonials
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Footer section
├── assets/             # Images and static files
├── App.jsx            # Main app component
├── index.css          # Global styles
└── main.jsx           # Entry point

```


## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment.

### Important Deployment Notes

- Build uses case-sensitive file paths (important for Linux/production servers)
- Assets are optimized and minified
- Ensure all image imports use correct casing
- Favicon and assets are included in build

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow the guidelines above:

1. Fork the repository
2. Create a feature branch
3. Follow commit conventions
4. Submit a pull request

## ❓ Troubleshooting

### Build Fails with Module Not Found
- Ensure all dependencies are installed: `npm install`
- Check image import paths are case-sensitive
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### EmailJS Not Working
- Verify environment variables in `.env`
- Check EmailJS credentials are correct
- Ensure service is enabled in EmailJS dashboard

### Asset Not Found in Production
- Check file names match exactly (case-sensitive)
- Ensure assets are in `src/assets/` folder
- Rebuild: `npm run build`

## 📞 Contact & Support

For questions or issues, please:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact via the portfolio contact form

---

**Happy Coding!** 🎉
