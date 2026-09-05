# Himanshu Kumar — Enterprise Portfolio Web Application

> **Software Engineer / Team SME** | Digital Banking Platforms, Reactive Microservices & Kafka Event Streaming

A modular, enterprise-grade React portfolio application developed with **React 18**, **TypeScript (strict mode)**, **Tailwind CSS**, and **Vite**. Engineered using domain-driven feature slicing to demonstrate mission-critical digital banking engineering, technical SME leadership, and patented architectures.

---

## 🏛️ Enterprise Project Architecture

```
ReactUI/
├── public/                    # Static assets & branded SVG favicon
├── src/
│   ├── components/
│   │   ├── common/            # Navbar with scroll-spy, Footer with SLAs & quick links
│   │   ├── layout/            # Responsive container primitives
│   │   └── ui/                # Atomic design system: Button, Card, Badge, Modal, SectionHeader
│   ├── context/               # Global state: ThemeContext (Dark/Light mode persistence)
│   ├── data/                  # Strongly-typed single source of truth portfolio data
│   ├── features/              # Modular domain features
│   │   ├── hero/              # Executive headline, live SME status, metrics strip, terminal preview
│   │   ├── about/             # Engineering narrative, 4 core pillars & manager rating callout
│   │   ├── architecture/      # Interactive Banking & Kafka Event Streaming visualizer
│   │   ├── experience/        # Detailed Cognizant tenure, SME contributions & metrics
│   │   ├── projects/          # Case studies with architecture deep-dive modals
│   │   ├── skills/            # Filterable skills matrix with proficiency badges & sub-tags
│   │   ├── patents/           # Granted IP Patents (No. 202011012664 & No. 202111014541)
│   │   ├── certifications/    # AWS Certified Developer, Azure Fundamentals, GitHub Copilot
│   │   └── contact/           # Contact cards, copy clipboard triggers & interactive form
│   ├── hooks/                 # Custom reusable hooks (useScrollSpy, useClipboard, useTheme)
│   ├── types/                 # Domain TypeScript interfaces (strict typing)
│   ├── utils/                 # Utilities (cn classnames merge)
│   ├── App.tsx                # App composition & layout
│   ├── main.tsx               # DOM mount point
│   └── index.css              # Custom styling, glow gradients, glassmorphism tokens
├── index.html                 # SEO metadata & Google Fonts
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Custom fintech & cyber theme configuration
├── tsconfig.json              # Strict TypeScript configuration
└── vite.config.ts             # Vite bundler configuration with @ path aliases
```

---

## 🚀 Key Highlights & Capabilities

- **Strict Domain Feature Slicing**: Each domain (`architecture`, `experience`, `projects`, `skills`, `patents`) is isolated in its own module with its own components and dependencies.
- **Interactive Banking Architecture Simulator**: Demonstrates real-time event propagation through API Gateway, Spring Boot microservices, and Kafka event streaming broker with zero lag.
- **Single Source of Truth**: All professional experience, metrics, projects, and patent data reside in `src/data/portfolioData.ts`, allowing instant updates without modifying presentation layers.
- **FinTech / High-Tech UI & UX**: Glassmorphic panels, dark/light theme switching with local storage persistence, responsive mobile drawer navigation, and accessible modals.
- **Production Build Ready**: Configured for strict type safety and zero-warning production bundling.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
