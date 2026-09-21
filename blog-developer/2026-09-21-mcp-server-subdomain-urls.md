---
title: September 21, 2026 - MCP Server Supports Subdomain URLs
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - mcp
  - cimd
  - subdomain
  - oauth
---

The [Sumo Logic MCP Server](/docs/api/mcp-server) now supports [subdomain URLs](/docs/api/mcp-server#how-to-use-your-org-subdomain-in-the-mcp-server-url) in all deployments that support the MCP server. When you add your org's subdomain to the MCP server URL, MCP clients that authenticate with CIMD send users directly to your org's login page, so they no longer enter the subdomain manually first. This is especially useful for orgs that sign in with SAML on a subdomain.
