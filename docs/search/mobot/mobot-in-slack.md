---
id: mobot-in-slack
title: Mobot in Slack
description: Ask Mobot about your Sumo Logic data without leaving Slack. Mention @Sumo in a channel or send a direct message, and get answers that link back to Sumo Logic.
keywords:
  - mobot
  - dojoai
  - slack
  - sumo-set-org
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

<img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot icon" width="35"/>

The Sumo Logic Slack app lets your team use [Mobot](/docs/search/mobot/) directly from Slack. Mention `@Sumo` in any channel, or investigate alerts and data in Sumo Logic by direct message.

Responses are scoped to your Sumo Logic role and org, and every response includes a link back to the relevant entity in Sumo Logic. Sumo Logic passes the full thread context to Mobot automatically, so you do not need to re-explain what your team has already discussed.

## Prerequisites

### In Sumo Logic

* Your role needs the following capabilities to install the Sumo Logic Slack Extension and connect Slack:
  * **View Integrations**. Lets you open the **Integrations** tab in the App Catalog.
  * **Manage Integrations**. Lets you start the installation and connect or disconnect a workspace.
* You install the Sumo Logic Slack Extension from Sumo Logic, not from the Slack Marketplace.
* An administrator needs to enable CIMD for your org. Installation does not work without it. Learn more in [Enable CIMD](/docs/manage/security/oauth/#enable-cimd).

:::note
Mobot in Slack is available in the US1, US2, EU, DE, AU, JP, CA, KR, and CH deployments. It is not available in FedRAMP or European Sovereign Cloud (ESC) deployments.
:::

### In Slack

* To install the app, you need to be a Workspace Admin or Owner, or your workspace needs to allow members to install apps.
* If your workspace restricts app installs, a Slack Admin needs to approve the app before it works.

## Connect Slack

Connect your Slack workspace to your Sumo Logic org so your team can use Mobot in Slack. You start in Sumo Logic and finish by approving the app in Slack.

1. In Sumo Logic, select **App Catalog** in the navigation menu, and then click the **Integrations** tab.<br/><img src={useBaseUrl('img/search/mobot/slack-app-catalog-integrations.png')} alt="App Catalog page with the Integrations tab and App Catalog menu item highlighted" style={{border: '1px solid gray'}} width="800" />
1. In the left pane, select **Inbound Integrations**.
1. Find the **Sumo Logic Slack Extension** tile. You can search with a keyword to find it faster.<br/><img src={useBaseUrl('img/search/mobot/slack-inbound-integrations.png')} alt="Inbound Integrations page with the Sumo Logic Slack Extension tile highlighted" style={{border: '1px solid gray'}} width="800" />
1. Click the tile, and then click the **Workspaces** tab.
1. Click **+ Connect Workspace**. You are redirected to Slack.<br/><img src={useBaseUrl('img/search/mobot/slack-connect-workspace.png')} alt="Workspaces tab of the Sumo Logic Slack Extension with the Connect Workspace button highlighted" style={{border: '1px solid gray'}} width="800" />
1. If you are not already signed in to Slack, enter your workspace's Slack URL, click **Continue**, and then sign in.<br/><img src={useBaseUrl('img/search/mobot/slack-sign-in-workspace.png')} alt="Slack sign-in page asking for the workspace URL" style={{border: '1px solid gray'}} width="400" />
1. On the Slack authorization screen, use the dropdown menu to confirm the correct workspace, review the permissions, and then click **Allow**. See [Slack permissions](#slack-permissions) for the scopes Sumo Logic requests.<br/><img src={useBaseUrl('img/search/mobot/slack-authorize-app.png')} alt="Slack authorization screen with the workspace dropdown and Allow button highlighted" style={{border: '1px solid gray'}} width="600" />
1. Back in Sumo Logic, confirm that the workspace appears in the **Workspaces** tab with the status **Connected**.

If your Slack workspace restricts app installs, the authorization screen shows **Request App Approval** instead of **Allow**. Click it to send the request to your Slack Admin. You only need to send it once. After the Slack Admin approves the request, connect the workspace again from Sumo Logic to finish the setup. Until then, the workspace is not linked to your Sumo Logic org.

### Disconnect Slack

Disconnect a workspace when you no longer want your team to use Mobot in Slack from it. This removes the link between your Sumo Logic org and that Slack workspace.

1. In Sumo Logic, select **App Catalog** in the navigation menu, and then click the **Integrations** tab.
1. Select **Inbound Integrations**, and then click the **Sumo Logic Slack Extension** tile.
1. In the **Workspaces** tab, click the three-dot menu on the workspace row.
1. Select **Disconnect**.<br/><img src={useBaseUrl('img/search/mobot/slack-disconnect-workspace.png')} alt="Workspaces tab with the three-dot menu and Disconnect option highlighted" style={{border: '1px solid gray'}} width="800" />

## Connect your Sumo Logic account

The first time you mention `@Sumo`, you need to connect your Sumo Logic account to Slack.

1. In Slack, mention `@Sumo` with your question in a channel or direct message. Sumo Logic sends you a private prompt that only you can see.
1. In the prompt, choose to connect your Sumo Logic account. You are redirected to Sumo Logic.
1. If multiple orgs are connected to your Slack workspace, choose the org you want to use.
1. Complete the OAuth login to authenticate.
1. Sumo Logic processes your original question automatically and posts the response in Slack.

## Use Sumo Logic in Slack

### Mention Sumo Logic in a channel or thread

Type `@Sumo` followed by your question in any channel. If Sumo Logic has not joined the channel, Slack prompts you to add it. Confirm the prompt, and Sumo Logic joins the channel and processes your question. Sumo Logic responds in a thread with a footer that shows which org was queried, for example `<org-name>(us2) · <org-id>`, and links to the relevant entities in Sumo Logic. If you mention Sumo Logic inside an existing thread, Sumo Logic reads all prior messages in the thread for context before it responds.

<img src={useBaseUrl('img/search/mobot/slack-mobot-thread.png')} alt="Slack thread in an incident channel where a user mentions Sumo Logic and receives a root cause analysis with recommended actions" style={{border: '1px solid gray'}} width="800" />

### Send a direct message

Open a direct message with Sumo Logic from the **Apps** section of the Slack sidebar. Each message starts a new conversation thread. Replies within a thread continue the same conversation with full context.

## Slash commands

| Command | Description |
|:--|:--|
| `/sumo-set-org` | Sets your default Sumo Logic org for all `@Sumo` mentions. Options include any org you are authenticated to, plus an **Always Ask** preference that shows the org picker on every mention. Use this command if you work across multiple Sumo Logic orgs. |

## Slack permissions

Sumo Logic requests the following Slack OAuth scopes when you connect a Slack workspace. Slack owns the authorization screen where users review and approve these permissions. Sumo Logic controls only which scopes it requests.

| Scope | What it enables |
|:--|:--|
| `app_mentions:read` | Detect when `@Sumo` is mentioned in a channel or thread. |
| `channels:history` | Read public channel messages in channels where Sumo Logic has joined, to assemble thread context before responding. |
| `groups:history` | Read private channel messages in channels where Sumo Logic has joined, to assemble thread context before responding. |
| `im:history` | Read direct message conversations with Sumo Logic. |
| `chat:write` | Post messages as `@Sumo`. |
| `chat:write.public` | Post in public channels before Sumo Logic has been explicitly invited, which enables just-in-time channel joins. |
| `reactions:write` | Add or remove the ⏳ reaction when Sumo Logic receives a mention. |
| `im:write` | Send private messages to users who have not yet authenticated. |
| `commands` | Enable Sumo Logic slash commands. |
| `channels:read` | View channel names, used to reference channels in responses. |
| `users:read` | View workspace member names, used to attribute thread messages to their senders. |
| `users:read.email` | View member email addresses, used to match Slack users to their Sumo Logic accounts during authentication. |
| `team:read` | View the workspace name and domain, used to populate the workspace row in the **Configure** tab. |

## Rate limits

Mobot in Slack shares the same daily quota as Mobot in the UI. There is no separate Slack allowance. A user's prompt limit is shared across all surfaces. Learn more in [Is there a limit to how many prompts I can send?](/docs/search/mobot/#is-there-a-limit-to-how-many-prompts-i-can-send)

## FAQ

### Does Sumo Logic read all messages in my Slack workspace?

No. Sumo Logic reads messages only in channels it has been explicitly added to, and only when someone mentions it or in an active direct message. It does not monitor channels passively.

### What happens if multiple people mention Sumo Logic in the same thread at the same time?

Sumo Logic processes each request independently and in parallel. Each user's query is scoped to that user's own permissions and org. Responses appear as they are ready, with no guaranteed order. Sumo Logic assigns each user a separate conversation ID for audit purposes.
