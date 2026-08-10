---
title: August 10, 2026 - MCP Server Publishes Supported OAuth Scopes
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - mcp
  - oauth
  - cimd
  - security
---

The [Sumo Logic MCP Server](/docs/api/mcp-server) now publishes `scopes_supported` in its OAuth Protected Resource Metadata. A properly implemented CIMD client uses this list to request only MCP-relevant scopes during authorization, instead of every scope available in your org, limiting the resulting access token to that smaller set.
