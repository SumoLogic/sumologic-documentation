---
title: November 30, 2026 - Mobot Is Available in the MCP Server
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - mcp
  - mobot
  - ai assistant
  - plugin
---

Mobot is now a tool in the [Sumo Logic MCP Server](/docs/api/mcp-server). You can run Mobot investigations across your logs, metrics, and telemetry from MCP-compatible clients such as Claude Code, GitHub Copilot, and Cursor, and use the findings alongside your other connected tools without leaving your IDE or terminal. Learn more in [Mobot in the MCP Server](/docs/api/mobot-in-mcp-server).

The MCP server adds four tools: `mobot_invoke`, `mobot_poll`, `mobot_cancel`, and `submit_hitl_feedback`. Mobot in the MCP server has the same functionality as Mobot in the Sumo Logic UI, shares the same daily prompt limit, and records activity in audit logs. Conversations you start from an MCP client also appear in your Mobot conversation history in Sumo Logic.

Install the Sumo Logic plugin for Claude Code, GitHub Copilot, Claude, or the AWS DevOps Agent for automatic routing to Mobot. Administrators can turn Mobot in the MCP server on or off for the org in Feature Management. It is on by default.
