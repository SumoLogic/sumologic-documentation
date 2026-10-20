---
id: usage-costs-rate-limits
title: MCP Usage, Costs, and Rate Limits
sidebar_label: Usage, Costs, and Rate Limits ✨
description: Understand when to use the MCP server, what drives cost, and the rate limits.
keywords:
  - mcp server
  - rate limits
  - cost
---


## Usage guidance and cost controls

### When to use MCP

Use MCP for:
* Conversational investigations.
* Multi-step workflows.
* Agent-to-agent communication.

Do not use MCP for:
* Bulk data extraction (use the [Search Job API](/docs/api/search-job) instead).
* Model training.
* High-volume automated queries.

### What drives MCP cost?

MCP endpoints are cost-amplifying by design. A single conversational request can trigger multiple agent steps, tool calls, retries, and retrieval operations. Valid requests that appear reasonable can generate significantly higher costs than anticipated, particularly when:

* Queries trigger broad semantic searches with high retrieval limits.
* Requests induce multi-step reasoning or planning workflows.
* Tool calls fail and trigger automatic retries.
* Workflows continue executing after client disconnect.

MCP is designed for conversational, agent-level interaction where cost per request is understood and monitored. For raw data access or high-volume operations, standard APIs remain more efficient and cost-effective.

:::note
If you're on [Flex pricing](/docs/manage/partitions/flex), cost-amplifying patterns in log search tool calls — broad queries, multi-step investigations, retries — translate directly into scan costs. Monitor usage closely when connecting MCP clients to a Flex account.
:::

For detailed guidance on securing MCP against cost-based attacks, see our blog post: [Token Torching: How I'd burn your AI budget (so you can fix it)](https://www.sumologic.com/blog/token-torching-ai-attack).

## What are the MCP server rate limits?

The Sumo Logic MCP server applies rate limits to keep the platform reliable and ensure fair access for all customers. Your use of the MCP server is subject to Sumo Logic's [standard API rate limits](/docs/api/about-apis/getting-started/#rate-limiting): 4 requests per second per user and 10 concurrent in-flight requests per access key. MCP requests count toward these account-wide limits, along with your other API usage.

| Limit | Scope | Value |
| :--- | :--- | :--- |
| Requests per second | Per user | 4 requests per second |
| Concurrent in-flight requests | Per access key | 10 requests |
| Log search timeout | Per search call (MCP only) | 2 minutes |

### How do the rate limits work?

Two controls do different things:
* **Requests per second (4 per second)**. How many new requests you can start each second. When you exceed it, new requests are rejected until the rate drops.
* **Concurrent in-flight requests (10)**. How many requests can be in progress at the same time. Even at a safe per-second rate, if requests stay open faster than they finish, you can reach this cap.

Log search runs as a single request: you send a query and get the results back. Like every tool, it counts toward your overall request limits. A search can run for up to 2 minutes, which is the gateway timeout for the synchronous call. Most searches finish well within this, but searches over wide time ranges or broad data scopes can reach it. If a search times out, the tool returns an error stating that the time limit was exceeded, with guidance to retry using a smaller time range or more specific source categories, so an agent can adjust its query and try again.

### How to handle rate limits

When you exceed a limit, the server returns an `HTTP 429 (Too Many Requests)` response with a `Retry-After` header (for example, `Retry-After: 1`). You'll see these errors in your MCP client, measured as an average over a short window, when:
* An agent sends more than 4 requests per second through your MCP connection without pausing between calls.
* More than 10 of a user's requests are in progress at the same time.

A log search that runs longer than 2 minutes returns a separate timeout error, not a rate-limit error. Retry it with a narrower time range or tighter source scope.

To stay within the limits, your MCP client should:
* **Back off and retry**. Retry after a short delay, increasing the wait on repeated 429 responses (exponential backoff).
* **Pace requests**. Space out or batch calls instead of sending them in a tight loop.
* **Scope searches**. Narrow log searches by source category and time range to reduce both load and the chance of a timeout.

:::note
Rate limits may be increased for customers with higher needs. Contact your Sumo Logic account representative. Sumo Logic may adjust these rate limits over time.
:::

## Security

For how Sumo Logic secures MCP access, including audit trails and IP allowlisting, see the [MCP FAQ](/docs/dojo-ai/mcp-server/troubleshooting-faq#how-does-sumo-logic-secure-mcp-access).
