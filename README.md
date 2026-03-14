# 🌊 Flow - AI-Powered Web App Generator
lol jbjvvjvj
<div align="center">

![Flow Logo](https://img.shields.io/badge/Flow-AI%20Web%20Generator-blue?style=for-the-badge&logo=react)

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![E2B](https://img.shields.io/badge/E2B-Sandbox-orange?style=flat-square)](https://e2b.dev/)

*Create something in the flow.*

**Craft AI-generated web app designs with intelligent code generation and live preview**

[![Demo](https://img.youtube.com/vi/kfgcxzgMtZM/0.jpg)](https://www.youtube.com/watch?v=kfgcxzgMtZM)

<img width="1097" height="933" alt="sequence" src="https://github.com/user-attachments/assets/e70b1cf9-cfcb-4d27-8134-56bdbafc0343" />


</div>

---

## 📋 Table of Contents

- [🎯 Introduction](#-introduction)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Installation](#-installation)
- [📖 Usage](#-usage)
- [🏗 Project Structure](#-project-structure)
- [🔌 API Reference](#-api-reference)
- [🌍 Environment Variables](#-environment-variables)
- [🤖 AI Structure](#-ai-architecture)
- [🤝 Contributing](#-contributing)


---

## 🎯 Introduction

**Flow** is a revolutionary AI-powered web application generator that transforms natural language descriptions into fully functional, production-ready web applications. Built with cutting-edge technologies including Next.js 15, TypeScript, and E2B sandboxes, Flow provides an intuitive chat-based interface where users can describe their vision and watch as AI agents generate complete web applications with live previews.

### 🌟 What Makes Flow Special?

- **🧠 Intelligent AI Agents**: Powered by advanced language models and agent frameworks
- **⚡ Real-time Code Generation**: Watch your ideas come to life instantly
- **🔒 Sandboxed Execution**: Safe, isolated environments for code execution
- **📱 Responsive Design**: Mobile-first approach with beautiful UI/UX
- **🎨 Modern UI Components**: Built with Shadcn/ui and Tailwind CSS
- **🔐 Secure Authentication**: Clerk-powered user management

---

## ✨ Key Features

### 🚀 Core Capabilities

| Feature | Description |
|---------|-------------|
| **AI Code Generation** | Transform natural language prompts into complete web applications |
| **Live Preview** | Instant preview of generated applications in isolated sandboxes |
| **Project Management** | Organize and manage multiple AI-generated projects |
| **Template Library** | Pre-built templates for common use cases |
| **Real-time Chat** | Interactive conversation with AI agents |
| **Code Exploration** | Browse and understand generated code structure |

### 🎯 Supported Project Types

- 🌟 **Tech Startup Landing Pages** - Modern, conversion-focused designs
- 🛒 **E-Commerce Storefronts** - Full-featured online shopping experiences
- 💼 **Personal Portfolios** - Professional developer showcases
- 📝 **Blog Platforms** - Content-rich publishing sites
- 📅 **Event Landing Pages** - Engaging conference and event sites
- 📋 **Task Management Apps** - Productive workflow tools
- 📦 **CRM Dashboards** - Professional business management interfaces
- 🏠 **Property Listings** - Real estate showcase platforms
- 📊 **Kanban Boards** - Project management tools
- 🧑‍🏫 **Online Course Platforms** - Educational content delivery

### 🎨 Design Excellence

- **Dark/Light Mode Support** - Seamless theme switching
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion powered interactions
- **Modern UI Components** - Shadcn/ui component library
- **Accessibility First** - WCAG compliant interfaces

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 15.3.4](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.9.2](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Database
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Prisma](https://prisma.io/)** - Database ORM
- **[PostgreSQL](https://postgresql.org/)** - Relational database
- **[Inngest](https://inngest.com/)** - Workflow orchestration

### AI & Sandboxing
- **[E2B](https://e2b.dev/)** - Code execution sandboxes
- **[OpenAI](https://openai.com/)** - Language models via OpenRouter
- **[Inngest Agent Kit](https://inngest.com/)** - AI agent framework

### Authentication & Infrastructure
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Vercel](https://vercel.com/)** - Deployment and hosting

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flow.git
cd flow
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in the required environment variables (see [Environment Variables](#-environment-variables) section).

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📚 Usage

### 🎯 Getting Started

1. **Sign Up/Login**: Create an account or sign in using Clerk authentication
2. **Create a Project**: Click "Create New Project" or use a template
3. **Describe Your Vision**: Write a detailed description of what you want to build
4. **Watch the Magic**: AI agents will generate your application in real-time
5. **Preview & Iterate**: View the live preview and make adjustments

### 💡 Writing Effective Prompts

```markdown
**Good Prompt Example:**
"Create a modern e-commerce website for a clothing brand. Include a hero section with featured products, product grid with filtering, shopping cart functionality, and a clean checkout process. Use a minimalist design with blue and white colors, and ensure it's mobile-responsive with dark mode support."

**Tips for Better Results:**
- Be specific about functionality
- Mention design preferences
- Specify target audience
- Include technical requirements
- Request responsive design
- Ask for dark mode support
```

### 🎨 Using Templates

Flow provides pre-built templates for common use cases:

```typescript
// Available templates include:
- Tech Startup Landing Page
- E-Commerce Storefront  
- Personal Portfolio
- Simple Blog
- Event Landing Page
- Task Manager App
- CRM Dashboard
- Property Listing Website
- Kanban Board
- Online Course Platform
```

---

## 🏗 Project Structure

```
flow/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (home)/             # Home page group
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── constants.ts       # Project templates
│   │   │   └── 📁 ui/             # Home UI components
│   │   ├── 📁 projects/           # Project pages
│   │   │   ├── 📁 [projectId]/    # Dynamic project routes
│   │   │   └── 📁 ui/             # Project UI components
│   │   ├── 📁 api/                # API routes
│   │   │   ├── 📁 trpc/           # tRPC endpoints
│   │   │   └── 📁 inngest/        # Inngest webhooks
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   ├── 📁 components/             # Reusable components
│   │   └── 📁 ui/                 # Shadcn/ui components
│   ├── 📁 modules/                # Feature modules
│   │   ├── 📁 home/               # Home module
│   │   ├── 📁 projects/           # Projects module
│   │   └── 📁 messages/           # Messages module
│   ├── 📁 trpc/                   # tRPC configuration
│   ├── 📁 inngest/                # AI agent functions
│   ├── 📁 hooks/                  # Custom React hooks
│   ├── middleware.ts              # Clerk middleware
│   └── types.ts                   # Global types
├── 📁 prisma/                     # Database schema & migrations
├── 📁 sandbox-templates/          # E2B sandbox templates
└── 📁 public/                     # Static assets
```

### 📁 Key Directories Explained

- **`src/app/`**: Next.js 15 App Router with file-based routing
- **`src/components/ui/`**: Shadcn/ui components for consistent design
- **`src/modules/`**: Feature-based modules for better code organization
- **`src/inngest/`**: AI agent functions and workflow orchestration
- **`prisma/`**: Database schema, migrations, and seeding
- **`sandbox-templates/`**: E2B sandbox configurations for code execution

---

## 🔌 API Reference

### tRPC Procedures

Flow uses tRPC for type-safe API communication. Here are the main procedures:

#### Projects

```typescript
// Create a new project
trpc.projects.create.mutate({
  value: "Build a todo app with dark mode"
})

// Get user's projects
trpc.projects.getMany.useQuery()

// Get specific project
trpc.projects.getOne.useQuery({ id: projectId })
```

#### Messages

```typescript
// Get project messages
trpc.messages.getMany.useQuery({ projectId })

// Create a new message
trpc.messages.create.mutate({
  projectId,
  content: "Add a user authentication system"
})
```

### Database Schema

```prisma
model Project {
  id        String   @id @default(uuid())
  name      String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  message   Message[]
}

model Message {
  id        String      @id @default(uuid())
  content   String
  role      MessageRole
  type      MessageType
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  
  fragment  Fragment?
  
  projectId String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Fragment {
  id         String   @id @default(uuid())
  messageId  String   @unique
  message    Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)
  
  sandboxUrl String
  title      String
  files      Json
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## 🌍 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flow_db"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# AI & Code Generation
OPENROUTER_API_KEY="sk-or-v1-..."
E2B_API_KEY="e2b_..."

# Inngest
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 🔐 Required Services

1. **PostgreSQL Database**: Set up a PostgreSQL database and add the connection URL
2. **Clerk Account**: Create a Clerk application for authentication
3. **OpenRouter API**: Get API key for AI model access
4. **E2B Account**: Sign up for code sandbox execution
5. **Inngest Account**: For workflow orchestration

---

## 🤖 AI Components

#### 1. Code Agent
```typescript
const codeAgent = createAgent<AgentState>({
  name: "code-agent",
  description: "Expert coding agent",
  system: PROMPT, // Comprehensive system prompt
  model: openai({
    baseUrl: "https://openrouter.ai/api/v1",
    model: "openrouter/horizon-beta",
  }),
  tools: [
    terminalTool,
    createOrUpdateFilesTool,
    readFilesTool
  ]
})
```

#### 2. Available Tools

- **Terminal Tool**: Execute commands in the sandbox
- **File Operations**: Create, read, and update files
- **Package Management**: Install npm packages
- **Code Generation**: Generate React/Next.js components

#### 3. Sandbox Environment

Each project runs in an isolated E2B sandbox with:
- Next.js 15.3.3 pre-installed
- Shadcn/ui components available
- Tailwind CSS configured
- TypeScript support
- Hot reload enabled

---

## 🤝 Contributing

We welcome contributions to Flow! Here's how you can help:

### 🐛 Reporting Issues

1. Check existing issues first
2. Use the issue template
3. Provide detailed reproduction steps
4. Include environment information

### 🔧 Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### 📝 Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add documentation for new features
- Ensure all tests pass
- Update the README if needed

### 🏷️ Coding Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write self-documenting code
- Add JSDoc comments for complex functions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by Amandeep**

</div>
