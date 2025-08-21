# Flow - AI-Powered Web App Builder

import { Callout } from 'nextra/components'

<Callout type="info" emoji="ℹ️">
  Flow is a clone inspired by Lovable, enabling users to build custom web apps using natural language prompts powered by AI agents.
</Callout>

## Tech Stack

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="p-4 border rounded-lg">Next.js</div>
  <div className="p-4 border rounded-lg">React</div>
  <div className="p-4 border rounded-lg">Prisma</div>
  <div className="p-4 border rounded-lg">TRPC</div>
  <div className="p-4 border rounded-lg">Inngest</div>
  <div className="p-4 border rounded-lg">OpenAI (via OpenRouter)</div>
  <div className="p-4 border rounded-lg">e2b Sandboxes</div>
  <div className="p-4 border rounded-lg">Shadcn UI</div>
  <div className="p-4 border rounded-lg">Tailwind CSS</div>
  <div className="p-4 border rounded-lg">Clerk Authentication</div>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [API](#api)
- [Environment Variables](#environment-variables)
- [Contribution Guide](#contribution-guide)
- [Support & Contact](#support--contact)

## Introduction

Flow is an innovative platform that leverages AI agents to generate and iterate on web applications based on user prompts. Using a multi-agent system powered by Inngest and e2b sandboxes, Flow allows users to describe their desired app in natural language, and the system builds, deploys, and previews it in real-time.

Whether you're prototyping a new idea or iterating on an existing project, Flow streamlines the development process by automating code generation and providing an interactive messaging interface for refinements.

## Key Features

- **User Authentication**: Secure sign-in and sign-up powered by Clerk.
- **Project Management**: Create and manage multiple projects, each with its own chat history and generated fragments.
- **Prompt-Based Code Generation**: Describe your app in natural language, and AI agents build it using Next.js in isolated sandboxes.
- **Interactive Messaging**: Iterate on your app by sending follow-up messages, with AI responses generating updated code.
- **Sandbox Previews**: Live previews of generated apps in embedded iframes, with file explorers and code views.
- **Dark Mode Support**: Seamless theme switching for better user experience.
- **Responsive Design**: Mobile-friendly interface using Tailwind and Shadcn UI components.

<details>
  <summary>More on AI Agent Workflow</summary>
  The AI agent constructs a knowledge graph of the codebase (inspired by Neo4j concepts), uses retrieval-augmented generation for context, and generates responses via dynamic agents.
</details>

## Installation Guide

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/flow.git
   cd flow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Configure environment variables (see below).

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

1. Sign up or sign in using Clerk.
2. On the home page, enter a prompt to create a new project (e.g., "Build a todo list app").
3. View the generated app preview in the project page.
4. Send additional messages to iterate (e.g., "Add dark mode support").
5. Explore files, code, and live preview in tabs.

Example Prompt:
```
Create a simple blog with posts and comments.
```

## API

Flow uses TRPC for type-safe API calls. Key endpoints:

- `/api/trpc/projects`: Create and list projects.
- `/api/trpc/messages`: Create and retrieve messages for a project.
- `/api/inngest`: Handles background jobs for AI processing.

For detailed API documentation, refer to the TRPC routers in `src/trpc/routers`.

## Environment Variables

Create a `.env` file in the root with:

```
DATABASE_URL=postgresql://user:password@localhost:5432/flow
CLERK_SECRET_KEY=your_clerk_secret
OPENROUTER_API_KEY=your_openrouter_key
E2B_API_KEY=your_e2b_key (if needed)
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
```

## Contribution Guide

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

For major changes, open an issue first to discuss.

## Support & Contact

For support, open an issue on GitHub or contact us at support@flow.app.

Join our community on Discord: [Flow Discord](https://discord.gg/flow)

Follow us on Twitter: [@flow_ai](https://twitter.com/flow_ai)
