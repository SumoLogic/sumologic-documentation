# Claude Code Context — sumologic-documentation

## Project Overview
Open-source Sumo Logic documentation site built with Docusaurus 3.
Docs live in /docs, written in Markdown. Contributions follow the Sumo Logic style guide.

## Repository
@https://github.com/SumoLogic/sumologic-documentation

## Key Folders
@https://github.com/SumoLogic/sumologic-documentation/tree/main/docs

## Skills
- .claude/skills/sumo-style/SKILL.md — Sumo Logic writing conventions. Claude fetches the live style guide and applies it automatically when writing or editing docs.
- .claude/skills/docusaurus/SKILL.md — Docusaurus 3 syntax, frontmatter templates, and sidebar config patterns.

## App Documentation Workflow

When creating a new app doc with `/new-app-doc`, always present all available integration categories:

1. `aiml` - AI and Machine Learning platforms
2. `amazon-aws` - AWS services
3. `app-development` - Development tools (GitHub, Jenkins, Jira)
4. `bigdata` - Big data platforms
5. `cloud-security-monitoring-analytics` - Cloud security platforms
6. `containers-orchestration` - Kubernetes, Docker, containers
7. `databases` - Database systems
8. `global-intelligence` - Global intelligence integrations
9. `google` - Google Cloud services
10. `hosts-operating-systems` - OS monitoring (Linux, Windows)
11. `microsoft-azure` - Azure services
12. `pci-compliance` - PCI compliance integrations
13. `product-list` - Product integrations
14. `saas-cloud` - SaaS cloud applications
15. `saml` - SAML authentication providers
16. `security-threat-detection` - Security and threat tools
17. `sumo-apps` - Sumo Logic native apps
18. `web-servers` - Web servers (Nginx, Apache)
19. `webhooks` - Webhook integrations
