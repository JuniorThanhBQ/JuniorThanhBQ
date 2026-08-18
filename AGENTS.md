# Portfolio website about JuniorThanhBQ

## Description
This is a portfolio website about JuniorThanh, and details about him are in README.md.  This website will be deployed on the Vercel platform as a stateless app with no database, while still supporting dynamic UI/UX.

Your role is an AI Agent virtual assistant that helps me build an outstanding UI/UX while still maintaining stability. The aim is learning over perfection.

## Core rule
You must stick to three modes: [PLAN], [CODE], and [DOCS]. The default mode, if it is not included in the prompt, is [PLAN]:
1. Only code when [CODE] is in the prompt. Always code unit test for the code/function which just created
2. [PLAN] You read the request; always read the related files again for clues and updates; max file read is 5-7. If the prompt is not clear enough and took a lot of effort to think, ask the developer again instead of thinking by yourself.
3. [DOCS] You will create a .md file according to the developer's request; no coding or plan required.

## Techstacks and design rule
### Backend (JuniorThanhBQ/server/)
NestJS should be developed with GraphQL and WebSockets to build real-time functionality (even though we don't have a database), using the standard list of libraries for NestJS according to its docs.
Backend must be developed with:
1. Domain-Driven Modular Monolith Software Architecture
2. Maintain SOLID quality (No strict enforcement needed, but still recommended)
3. Build Hybrid RAG Retrieval with the capability to read a raw vector context file (I will create it manually) for a chatbot based on the Groq API.
4. No comments in code unless it is very necessary (one change causes a lot of problems)
5. Maximum file length allowance: 400 lines

### Frontend (JuniorThanhBQ/web/)
React with TypeScript, built with Vite. I suggest a UI/UX based on Awwwards design, with three main tones: navy blue, white, and light blue.
Frontend must be developed with:
1. Domain-Driven Modular Monolith Software Architecture
2. All standard UI/UX libraries like shadcn/ux is recommend to use
3. If you want to use a new library, suggest it first in [PLAN] mode if needed.
4. All services and business logic must be put in NestJS; the frontend only handles user interaction.
5. Learn about AI UI/UX patterns and create a list called "AI_UI_UX_BAN_DESIGN.md" to ensure there is no sticking with AI UI/UX design interference.

### CI/CD
Deploying a CI/CD pipeline on GitHub Actions.
I want a three-phase CI pipeline below:
1. CI in local include: pre-commit (standard pre-commit file), Gitleaks, linting checks for frontend and backend, commitlint (standard)
2. CI GitHub Actions Workflows: Test Build ---> Secret Scan ---> Linting check ---> Security check (frontend, backend, Semgrep, Trivy test library) ---> Run automation test (unit, integration tests).
3. CD GitHub Actions Workflows: Only in branch main, manually deploy to Vercel when CI passes. Also, Vercel should not automatically update code because it must depend on CD workflows.
4. Also, Dependabot and CodeQL need to be configured in this project.
5. Dependabot runs and checks for package updates every week (group patch and minor versions)

## Automation tools with Golang
Using Mage in Golang to automatic command like build, lint, and test instead of MakeFiles.
You should also read this file after reading AGENTS.md.
