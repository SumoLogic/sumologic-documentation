---
id: feature-management
title: Feature Management
description: Turn Mobot, Parse Assist, the SOC Analyst Agent, and MCP server access on or off for your organization, and audit DojoAI activity.
keywords:
  - feature management
  - opt out
  - ai features
  - dojo ai
  - mobot
  - soc analyst agent
  - mcp server
  - audit
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MSSPfeatureMgmt from '../reuse/mssp-feat-mgmt.md';

**Feature Management** is where administrators turn Mobot, Parse Assist, the SOC Analyst Agent, and MCP server access on or off for your organization. It's available to any user with the Administrator role or the **Manage Organization Settings** permission.

<img src={useBaseUrl('img/ai/mobot/feature-management.png')} alt="Feature Management page showing the AI features, MCP Server access, and SOC Analyst Agent toggles" style={{border: '1px solid gray'}} width="800" />

## Can I opt out of AI features?

AI features are on by default. You can opt out in two ways:

* **Through your account team or support**. Contact your Sumo Logic account team or open a support ticket to opt out of specific AI features or all AI features. If you opt out of all AI features, your tenant is automatically exempted from future AI feature releases.
* **In the product**. Platform administrators can opt out of all AI features under **Administration** > **Feature Management**. Disabling AI at the admin level automatically exempts your tenant from future AI feature rollouts.

In Feature Management, Mobot and Parse Assist share a single **AI features** toggle. The SOC Analyst Agent and the MCP server each have their own toggle (**SOC Analyst Agent** and **MCP Server access**).

<MSSPfeatureMgmt/>

## Can I control DojoAI access for individual users?

Not at this time. DojoAI is enabled at the platform level, and you can't turn it on or off for individual users or roles. All AI interactions enforce user-level permissions, so users can't access data or run platform actions they aren't authorized to perform manually.

## How do I audit DojoAI usage?

Administrators can audit all DojoAI activity with the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/). Run a targeted audit query to see both user activity and the actions agents perform in your environment.

```sumo
_index=sumologic_audit_events
| where invocationdetails.agentname in ("mobot", "soc_analyst_agent")
```

The audit includes:

* **User activity**. Individual user prompts, queries, and shared Mobot conversation threads.
* **Actions on customer data**. Log searches, playbook executions, and triage steps performed by agents across the platform.

Log searches that Mobot runs on your behalf are also tracked in the [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/). See [Audit Mobot queries](/docs/ai/mobot/#audit-mobot-queries).
