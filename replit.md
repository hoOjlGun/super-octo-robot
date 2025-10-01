# AI Система - Универсальный ИИ Агент

## Overview

AI Система - это универсальная бесплатная AI-платформа с двухагентной архитектурой, работающая полностью в браузере без необходимости регистрации или использования API ключей. Система предоставляет VSCode-подобный интерфейс с полной поддержкой русского языка для СНГ региона.

Ключевые возможности:
- **Браузерные AI модели** через WebLLM и WebGPU для полной приватности
- **Двухагентная система**: главный агент генерирует решения, агент-ревизор проверяет и улучшает их
- **Многофункциональность**: терминал рассуждений, IDE с Monaco Editor, генератор офферов, игра "Змейка", украинское радио
- **Полная приватность**: все вычисления происходят локально в браузере пользователя
- **Офлайн режим**: использование IndexedDB для хранения истории и контекста

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- Shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Design approach combines Fluent Design and Material Design principles
- Dark theme as primary with light theme support

**State Management**:
- React Query (@tanstack/react-query) for server state and API interactions
- Local state with React hooks (useState, useEffect)
- LocalStorage for user preferences (active module, theme, snake high scores)
- IndexedDB planned for offline mode and conversation history

**Routing & Navigation**:
- Module-based navigation without traditional routing
- ActivityBar component manages active module state
- Six core modules: Terminal, IDE, Offers, Snake, Radio, Settings

**Key Design Patterns**:
- Component composition with separation of concerns
- Module pages as containers that render feature components
- Shared UI components in `/components/ui` directory
- Feature components in `/components` directory
- Custom hooks in `/hooks` directory

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Minimal Backend Approach**:
- Currently implements basic server setup with minimal routes
- Designed to support primarily client-side operations
- Storage abstraction layer (IStorage interface) for potential database integration
- In-memory storage (MemStorage) as default implementation

**Future Integration Points**:
- WebLLM integration for browser-based AI models (Meta Llama, Mistral, Phi)
- OpenRouter API support for optional server-side AI capabilities
- GitHub and forum API integrations for data collection

**Build & Deployment**:
- Development mode uses Vite middleware for HMR
- Production build bundles both client (Vite) and server (esbuild)
- Static file serving for production deployment

### Data Layer

**Current Schema** (PostgreSQL with Drizzle ORM):
- Users table with basic authentication fields
- Prepared for extension with conversation history, agent states, and user preferences

**Planned Storage Strategy**:
- Browser-side: IndexedDB for offline data, LocalStorage for settings
- Server-side: PostgreSQL for optional data persistence
- Hybrid approach allowing full offline functionality with optional cloud sync

### AI Agent Architecture

**Dual-Agent System**:

1. **Main Agent** (Главный агент):
   - Generates code, creative content, and solutions
   - Executes commands and tasks
   - Manages offer generation
   - State: idle → thinking → completed

2. **Revisor Agent** (Агент-ревизор):
   - Reviews and validates main agent output
   - Provides improvements and corrections
   - Forms final refined responses
   - State: idle → thinking → completed

**Communication**:
- Planned implementation using Web Workers and MessageChannel
- Local WebSocket support when backend is available
- Event-based message passing between agents

**AI Model Integration** (Planned):
- WebLLM with WebGPU for in-browser model execution
- Support for Meta Llama, Mistral, and Phi models
- Monaco Editor integration for code editing with AI assistance

### Module System

**Core Modules**:

1. **Terminal Page**: AI conversation interface with dual-agent status display
2. **IDE Page**: Code editor using Monaco with AI-powered assistance
3. **Offers Page**: Marketing offer generator with tone customization
4. **Snake Page**: Classic snake game with local high score tracking
5. **Radio Page**: Ukrainian radio station player with volume controls
6. **Settings Page**: System configuration for themes and agent settings

**Module Architecture**:
- Each module is a self-contained page component
- Shared layout with ActivityBar and StatusBar
- Module state persisted in localStorage
- Lazy loading ready for performance optimization

## External Dependencies

### Core UI Libraries
- **Radix UI**: Complete set of accessible UI primitives (@radix-ui/react-*)
- **Shadcn/ui**: Pre-built components based on Radix UI
- **Lucide React**: Icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### Data & State Management
- **@tanstack/react-query**: Server state management and data fetching
- **Drizzle ORM**: TypeScript ORM for PostgreSQL with Drizzle Kit for migrations
- **Zod**: Schema validation library (drizzle-zod for schema integration)

### Database
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **PostgreSQL**: Primary database (configured via DATABASE_URL)

### Build Tools & Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type safety across the entire stack
- **PostCSS & Autoprefixer**: CSS processing

### Fonts
- **Google Fonts**: 
  - Inter: Primary UI font with Cyrillic support
  - JetBrains Mono: Monospace font for code editor and terminal

### Planned AI Integration
- **WebLLM**: Browser-based LLM execution (to be integrated)
- **WebGPU**: GPU acceleration for models (to be integrated)
- **Monaco Editor**: VS Code editor component (to be integrated)
- **OpenRouter**: Optional AI routing service
- **FreeGPT/gpt4free**: Alternative free AI access

### Security & Protection (Planned)
- Code obfuscation for frontend protection
- Cloaking for crawler protection
- Anti-scraping measures