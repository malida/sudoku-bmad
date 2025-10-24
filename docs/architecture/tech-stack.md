# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| Frontend Language | JavaScript | ES6+ (ES2015+) | Core application logic | Modern language features (modules, arrow functions, const/let, template literals) with universal browser support |
| Frontend Framework | None (Vanilla JS) | N/A | Application structure | Zero dependencies reduces complexity, load time, and learning curve; sufficient for project scope |
| UI Component Library | None | N/A | UI components | Custom DOM manipulation adequate for simple single-screen interface |
| State Management | Custom (Plain Objects) | N/A | Game state tracking | Simple object/array state sufficient; no need for Redux/MobX complexity |
| Backend Language | None | N/A | Server-side logic | Client-side only application per PRD requirements |
| Backend Framework | None | N/A | API/Services | No backend needed |
| API Style | None | N/A | Data exchange | No API layer; all data generated client-side |
| Database | None | N/A | Data persistence | Puzzles generated on-demand; no persistence required for MVP |
| Cache | Browser Memory | N/A | Runtime state | Simple in-memory JavaScript objects |
| File Storage | None | N/A | Asset storage | HTML/CSS/JS served as static files from hosting |
| Authentication | None | N/A | User management | No user accounts or authentication needed |
| Frontend Testing | Manual | N/A | Code verification | Per PRD: manual exploratory testing for MVP |
| Backend Testing | N/A | N/A | API/Service testing | No backend to test |
| E2E Testing | Manual | N/A | End-to-end flows | Manual browser testing sufficient for MVP scope |
| Build Tool | None | N/A | Build process | Raw files deployed directly; no transpilation/bundling |
| Bundler | None | N/A | Module bundling | ES6 modules loaded natively by browser |
| IaC Tool | None | N/A | Infrastructure provisioning | Static hosting requires no infrastructure code |
| CI/CD | Git Push | N/A | Deployment automation | GitHub Pages deploys automatically on push to main/gh-pages branch |
| Monitoring | Browser DevTools | N/A | Error tracking | Console logging for development; no analytics per NFR8 |
| Logging | console.log | N/A | Debug logging | Browser console sufficient for development/debugging |
| CSS Framework | None (Custom CSS) | N/A | Styling | CSS Grid for layout; custom styles for complete control and zero dependencies |