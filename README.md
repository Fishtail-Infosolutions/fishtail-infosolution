# Fishtail Infosolutions - Official Website

Welcome to the official repository for **Fishtail Infosolutions**, a modern, high-performance company website built with the latest web technologies. This project focuses on delivering a premium user experience with smooth animations, responsive layouts, and a clean, professional aesthetic.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons:** [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/)
- **3D Elements:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)

## ✨ Key Features

- **Premium Design:** Modern UI with glassmorphism, gradients, and dynamic micro-animations.
- **Dark & Light Mode:** Seamlessly switch between themes using `next-themes`.
- **Responsive Layout:** Optimized for all screen sizes, from mobile to ultra-wide displays.
- **Dynamic Content:** Data-driven pages for Careers, Projects, and Blogs, managed via organized constants.
- **Interactive Elements:**
  - Direction-aware hover effects.
  - Animated text flips and gradient banners.
  - Smooth-scrolling stack for projects.
  - Testimonial carousel with localized content.
- **Contact & Applications:** Fully functional contact forms and job application flows with robust validation.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   ├── homepage/         # Home section-specific components
│   ├── blogpage/         # Blog section-specific components
│   ├── careerpage/       # Career section-specific components
│   ├── ui/               # Core Shadcn/custom UI primitives
│   └── self-made-ui/     # Custom high-impact UI elements
├── constants/            # Centralized data files (Team, Jobs, Blogs, etc.)
├── public/               # Static assets (Logos, Images, Icons)
├── lib/                  # Utility functions and shared logic
└── package.json          # Project dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sandeshsubedi9/fishtail-infosolution.git
   cd fishtail-infosolution
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## 📄 License

This project is private and intended for the internal use of Fishtail Infosolutions.

---

Developed with ❤️ by the **Fishtail Infosolutions Team**.
