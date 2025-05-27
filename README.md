# CIE IGCSE Study Notes Website

A comprehensive study notes platform for CIE IGCSE students, built with Next.js 13+ and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 13+ using the app directory structure
- **Tailwind CSS**: Fully configured with custom design system
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Educational Theme**: Custom color palette and components designed for learning
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Fast loading with Next.js optimizations

## 🎨 Design System

### Custom Colors
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Cyan tones for secondary elements
- **Accent**: Yellow tones for highlights and call-to-actions
- **Success**: Green tones for positive feedback
- **Warning**: Orange tones for cautions
- **Error**: Red tones for errors

### Typography
- **Font Family**: Inter (Google Fonts)
- **Custom Font Sizes**: Responsive typography scale
- **Line Heights**: Optimized for readability

### Components
Pre-built component classes available:
- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.card` - Card component with shadow
- `.input` - Form input styling

### Custom Shadows
- `.shadow-soft` - Subtle shadow for cards
- `.shadow-medium` - Medium shadow for elevated elements
- `.shadow-large` - Large shadow for modals/overlays

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind directives and custom styles
│   ├── layout.tsx           # Root layout with Inter font
│   └── page.tsx             # Homepage with demo content
├── components/              # Reusable React components (to be added)
└── lib/                     # Utility functions (to be added)
```

## 🎯 Tailwind Configuration

The project includes a comprehensive Tailwind configuration with:

- **Custom Color Palette**: Educational-themed colors
- **Extended Spacing**: Additional spacing utilities
- **Custom Animations**: Fade-in, slide-up, slide-down
- **Typography Scale**: Responsive font sizes
- **Border Radius**: Extended radius options
- **Box Shadows**: Custom shadow utilities

## 🌙 Dark Mode Support

The design system includes full dark mode support with CSS custom properties that automatically adapt based on user preferences.

## 📱 Responsive Design

All components are built mobile-first with responsive breakpoints:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

## 🧩 Next Steps

1. **Add Subject Pages**: Create individual pages for each IGCSE subject
2. **Build Components**: Develop reusable UI components
3. **Add Content Management**: Integrate with a CMS for study notes
4. **User Authentication**: Add user accounts and progress tracking
5. **Search Functionality**: Implement search across all study materials
6. **Interactive Features**: Add quizzes, flashcards, and practice tests

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
