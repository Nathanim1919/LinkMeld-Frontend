# LinkMeld Frontend

<div align="center">
  <img src="public/vite.svg" alt="LinkMeld Logo" width="120" height="120">
  
  **Capture. Organize. Understand Instantly.**
  
  [![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-teal.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 🚀 Overview

LinkMeld is a sophisticated web content capture and knowledge management platform that empowers users to collect, organize, and interact with web content through AI-powered analysis. Built with modern web technologies, it provides an intuitive interface for capturing web pages, organizing them into collections, and leveraging AI to extract insights and answer questions about your saved content.

### ✨ Key Features

- **🌐 Web Content Capture**: Save web pages, articles, and documents with full content extraction
- **🤖 AI-Powered Analysis**: Generate intelligent summaries and chat with AI about your captured content
- **📁 Smart Organization**: Create folders and collections to categorize your knowledge base
- **🔖 Intelligent Bookmarking**: Bookmark important captures for quick access
- **📊 Source Management**: Track and organize content by source websites
- **✍️ Highlight & Annotate**: Add highlights and annotations to captured content
- **🔍 Advanced Search**: Find content quickly with powerful search capabilities
- **📱 Responsive Design**: Seamless experience across desktop and mobile devices

## 🛠️ Technology Stack

### Core Technologies
- **React 19** - Modern React with latest features
- **TypeScript 5.8** - Type-safe JavaScript development
- **Vite 6.3** - Lightning-fast build tool and dev server
- **TanStack Router** - Type-safe routing solution

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon sets

### State Management & Data
- **React Context API** - Built-in state management
- **Axios** - HTTP client for API communication
- **Better Auth** - Modern authentication solution

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React development support

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── account.api.ts     # User account operations
│   ├── capture.api.ts     # Content capture operations
│   ├── chat.api.ts        # AI chat functionality
│   ├── feedback.api.ts    # User feedback system
│   ├── folder.api.ts      # Folder/collection management
│   ├── source.api.ts      # Source website management
│   └── index.ts           # API client configuration
├── components/            # Reusable UI components
│   ├── buttons/           # Button components
│   ├── cards/             # Card-based UI components
│   ├── Chat/              # AI chat interface
│   ├── modals/             # Modal dialogs
│   ├── noteview/          # Note viewing components
│   ├── panels/            # Sidebar panels
│   ├── skeleton/          # Loading skeleton components
│   └── SmartOrganizers/   # AI-powered organization tools
├── context/               # React Context providers
│   ├── CaptureContext.tsx # Capture state management
│   ├── ChatContext.tsx    # Chat state management
│   ├── FolderContext.tsx  # Folder state management
│   ├── sourceContext.tsx  # Source state management
│   └── UIContext.tsx      # UI state management
├── layout/                # Layout components
│   ├── MainShell.tsx      # Main application shell
│   ├── ContentLayout.tsx  # Content area layout
│   ├── FolderLayout.tsx   # Folder-specific layout
│   ├── HomeLayout.tsx     # Home dashboard layout
│   ├── PublicLayout.tsx   # Public pages layout
│   └── SourceLayout.tsx   # Source management layout
├── pages/                 # Route components
│   ├── LoginPage.tsx      # User authentication
│   ├── RegisterPage.tsx   # User registration
│   ├── UserProfile.tsx    # User profile management
│   ├── hero.tsx           # Landing page
│   ├── FAQ.tsx            # Frequently asked questions
│   ├── manifesto.tsx      # Product manifesto
│   └── FeedbackHub.tsx    # User feedback system
├── types/                 # TypeScript type definitions
│   ├── Capture.ts         # Capture data model
│   └── Folder.ts          # Folder data model
├── utils/                 # Utility functions
├── lib/                   # External library configurations
└── services/              # Business logic services
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linkmeld-frontend.git
   cd linkmeld-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit environment variables
   nano .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# Authentication
VITE_AUTH_SECRET=your-auth-secret-here

# Optional: Analytics and Monitoring
VITE_ANALYTICS_ID=your-analytics-id
```

## 🏗️ Build & Deployment

### Development Build
```bash
npm run build
```

### Production Build
```bash
npm run build -- --mode production
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 📖 Usage Guide

### 1. Authentication
- Register a new account or login with existing credentials
- Secure authentication powered by Better Auth

### 2. Content Capture
- Use the browser extension or web interface to capture web content
- Automatic content extraction and processing
- Support for various content types (articles, PDFs, images)

### 3. Organization
- Create folders to organize your captures
- Use AI-powered smart suggestions for categorization
- Bookmark important content for quick access

### 4. AI Interaction
- Generate intelligent summaries of captured content
- Chat with AI about your saved content
- Get contextual answers and insights

### 5. Search & Discovery
- Search across all your captured content
- Filter by folders, sources, or bookmarks
- Advanced search with AI-powered relevance

## 🔧 Configuration

### API Configuration
The application connects to a backend API. Configure the base URL in your environment variables:

```typescript
// src/api/index.ts
export const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
```

### Theme Customization
The application uses Tailwind CSS with custom design tokens. Customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Capture Endpoints
- `GET /captures` - List captures
- `POST /captures` - Create new capture
- `GET /captures/:id` - Get capture details
- `PUT /captures/:id` - Update capture
- `DELETE /captures/:id` - Delete capture

### Folder Endpoints
- `GET /folders` - List folders
- `POST /folders` - Create folder
- `PUT /folders/:id` - Update folder
- `DELETE /folders/:id` - Delete folder

### Chat Endpoints
- `POST /chat/message` - Send chat message
- `GET /chat/history` - Get chat history

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npm run type-check
```

**API Connection Issues**
- Verify API base URL in environment variables
- Check network connectivity
- Ensure backend server is running

### Performance Optimization

- Enable code splitting for better loading performance
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize images and assets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS Team** - For the utility-first CSS framework
- **TanStack Team** - For the excellent routing solution
- **Better Auth Team** - For the modern authentication library


---

<div align="center">
  <p>Made with ❤️ by the Nathanim</p>
  <p>
    <a href="https://linkmeld.com">Website</a> •
    <a href="https://docs.linkmeld.com">Documentation</a> •
    <a href="https://github.com/your-username/linkmeld-frontend/issues">Report Bug</a> •
    <a href="https://github.com/your-username/linkmeld-frontend/issues">Request Feature</a>
  </p>
</div>
