---
title: September 24, 2026 - MCP Server Filters Tools by Role Permissions
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - mcp
  - oauth
  - permissions
  - scopes
---

The [Sumo Logic MCP Server](/docs/api/mcp-server) now filters the tools an MCP client sees based on the OAuth scopes in the user's access token, which map to their role's Sumo Logic capabilities. Users without Cloud SIEM access no longer see Cloud SIEM tools, and users without partition or field management scopes no longer see the partition and field discovery tools. See [What MCP tools are available?](/docs/api/mcp-server#what-mcp-tools-are-available) for the scope each tool requires.