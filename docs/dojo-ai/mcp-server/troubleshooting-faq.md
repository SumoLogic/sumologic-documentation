---
id: troubleshooting-faq
title: MCP Troubleshooting and FAQ
sidebar_label: Troubleshooting and FAQ ✨
description: Resolve common Sumo Logic MCP server errors and find answers to frequently asked questions.
keywords:
  - mcp server
  - troubleshooting
  - faq
---

## Troubleshooting

### MCP tool calls fail with 401 Request blocked by IP allowlist policy

#### Symptom

One or more MCP tool calls fail with `401 "Request blocked by IP allowlist policy"`.

#### Cause

Your org has an IP allowlist configured and the client IP making the MCP request is not on it.

#### Resolution

1. Confirm your client's IP address is included in your org's IP allowlist. See [Create an Allowlist for IP or CIDR Addresses](/docs/manage/security/create-allowlist-ip-cidr-addresses/).
1. If the IP is already allowlisted and calls are still failing, note the exact error text, the failing tool name, and the time of failure in UTC.
1. Contact [Sumo Logic Support](https://support.sumologic.com/support/s) with those details and your deployment region.

## FAQ

### Can MCP handle multiple operations in a single request?

Yes. MCP supports multi-tool calls within a single conversational interaction.

### How does MCP affect my Sumo Logic usage?

MCP-triggered actions can consume Sumo Logic resources in the same way equivalent UI or API actions do. For example, if an AI client uses MCP to run a log search, that search may consume search resources. See [What drives MCP cost?](/docs/dojo-ai/mcp-server/usage-costs-rate-limits#what-drives-mcp-cost) for details. For bulk data retrieval or model training, use the [Search Job API](/docs/api/search-job) instead.

### Where does my agent run?

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.

### What happens if you disable the MCP server?

MCP clients can no longer connect, but no data is deleted. Disabling MCP Server access does not affect Mobot, Parse Assist, or the SOC Analyst Agent, since each has its own toggle.

### Is customer data used to train AI models?

No. Sumo Logic never uses customer data to train AI models, regardless of which MCP tools or clients you connect. See [How does Sumo Logic secure MCP access?](#how-does-sumo-logic-secure-mcp-access).

### Can I use my org subdomain in the MCP server URL?

Yes. Add your subdomain to the front of your deployment's MCP server URL, for example `https://<subdomain>.mcp.us2.sumologic.com/mcp`. MCP clients that authenticate with CIMD then go directly to your org's login page instead of asking users to enter the subdomain first. See [How to use your org subdomain in the MCP server URL](/docs/dojo-ai/mcp-server/connect-mcp-client#how-to-use-your-org-subdomain-in-the-mcp-server-url).

### What client authentication does MCP require?

MCP clients authenticate with OAuth 2.0. CIMD is the recommended mechanism and requires no manually created credentials; clients that don't support CIMD can connect with a manually created, pre-registered OAuth client instead.

### Why does an MCP tool call fail with 401 Request blocked by IP allowlist policy?

Your org has an IP allowlist configured and the client IP making the request is not on it. Check that your client's IP is included in your allowlist. See [MCP tool calls fail with 401 Request blocked by IP allowlist policy](#mcp-tool-calls-fail-with-401-request-blocked-by-ip-allowlist-policy) for troubleshooting steps.

### How does Sumo Logic secure MCP access?

* **Permissioned access**. All integrations occur through secure, controlled interfaces.
* **Customer control**. You retain full control over how your data is accessed and used by connected AI tools.
* **No model training**. Customer data is never used to train AI models.
* **Audit trails**. All MCP interactions are logged for compliance and security review.
* **Multi-tenant isolation**. Tenant-level security controls are enforced at the gateway.

### Does IP allowlisting apply to all MCP tools?

Yes. All MCP tools forward your original client IP to Sumo Logic, so IP allowlisting works consistently across all tools, including log search (`runLogSearch`) and [Mobot](/docs/dojo-ai/mobot).
