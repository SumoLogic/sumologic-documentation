---
id: mobot-in-slack
title: Mobot in Slack
description: Ask Mobot about your Sumo Logic data without leaving Slack by @mentioning Sumo Logic in channels or sending direct messages.
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

The Sumo Logic Slack app lets your team use [Mobot](/docs/search/mobot/) directly from Slack. Mention `@Sumo` in any channel or investigate alerts and data in Sumo Logic by direct message, all without leaving Slack.

Responses are scoped to your Sumo Logic role and org, and every response includes a link back to the relevant entity in Sumo Logic. Sumo Logic passes the full thread context to Mobot automatically, so you do not need to re-explain what your team has already discussed.

<img src={useBaseUrl('img/search/mobot/slack-mobot-thread.png')} alt="Slack thread in an incident channel where a user mentions Sumo Logic and receives a root cause analysis with recommended actions" style={{border: '1px solid gray'}} width="800" />

## What you can do

* **Ask in channels and threads.** Mention `@Sumo` in any channel or thread to get AI-generated answers from your Sumo Logic data.
* **Ask privately.** Send direct messages to Sumo Logic for private, exploratory queries.
* **Jump back to Sumo Logic.** Use the links in each response to open the log search, alert, or dashboard that Mobot referenced.
* **Work across orgs.** Use Sumo Logic across multiple orgs from a single Slack workspace.

## Requirements

### In Sumo Logic

* You need the Administrator role or any role with the Manage Integrations capability to install the Sumo Logic Slack App and connect Slack.
* You install the Sumo Logic Slack App from the Sumo Logic product, not from the Slack Marketplace.
* An administrator needs to enable CIMD for your org, or installation will not work. Learn more in [Enable CIMD](/docs/manage/security/oauth/#enable-cimd).
* Your Sumo Logic org must be in one of the following deployments: US1, US2, EU, DE, AU, JP, CA, KR, or CH. FedRAMP and ESC deployments are not currently supported.

### In Slack

* To install an app in an unrestricted workspace, you need Workspace Admin or Owner permissions, or the workspace must allow member-initiated installs.
* For restricted workspaces, a Slack Admin must approve the app before it activates.
* Mobot in Slack is supported on all Slack plans: Free, Pro, Business+, and Enterprise Grid.

## How it works

An administrator starts the installation from inside Sumo Logic, under **App Catalog** > **Integrations** > **Inbound Integrations** > **Sumo Logic Slack App Extension**. The installation binds the Slack workspace to the correct Sumo Logic org and establishes the OAuth trust needed for user-level authentication.

After installation, add Sumo Logic to a channel like any other Slack app. The first time you mention Sumo Logic, you receive a private prompt to connect your Sumo Logic account. After a brief OAuth login, Sumo Logic processes your original query automatically. Later mentions work without any extra steps.

Responses are scoped to the role and permissions of the user who mentions Sumo Logic. In a shared channel, different users who query the same thread can receive different answers based on their individual access levels.

## Connect Slack

A Sumo Logic administrator needs to connect Slack to your org.

1. In Sumo Logic, select **App Catalog** > **Integrations** > **Inbound Integrations** in the navigation menu.
1. Find the **Sumo Logic Slack App Extension** tile.
1. Click **+ Connect Workspace**. The Slack authorization screen opens.
1. In the top-right dropdown menu, confirm that the correct workspace is selected, and then click **Allow**.
1. The workspace appears with the status **Connected**.

<!--TODO: Add screenshot of the Sumo Logic Slack Extension tile in App Catalog > Integrations with the + Connect Workspace button.-->

<!--TODO: Add screenshot of the Configure tab showing a workspace with the status Connected.-->

If your Slack workspace restricts app installs, the authorization screen shows **Request App Approval** instead of **Allow**. Submit the request. You do not need to submit it again. Follow up with your Slack Admin to get the request approved. After the Slack Admin approves it in Slack, you must reconnect the workspace to your Sumo Logic org to finish the installation. Until then, the workspace is not linked to your Sumo Logic org.

### Disconnect Slack

You need the Administrator role or any role with the Manage Integrations capability to disconnect Slack. To disconnect, open the overflow menu on the workspace row in the **Configure** tab and select **Disconnect workspace**. This disassociates your Sumo Logic org from that Slack workspace.

## Add Sumo Logic to channels

After installation, Sumo Logic is not in any channel. Add it to a channel like any other Slack app. If you mention Sumo Logic in a channel it has not joined, Slack prompts you to add it. Confirm the prompt, and Sumo Logic joins the channel and processes your original query.

## Connect your Sumo Logic account

You do not need to run any command or complete any setup before you use Sumo Logic in Slack. The first time you mention Sumo Logic, you receive a private prompt that only you can see. The prompt asks you to connect your Sumo Logic account. You are redirected to Sumo Logic for a brief OAuth login, and then Sumo Logic processes your original query automatically.

If multiple orgs are connected to your Slack, choose the org and authenticate.

The private prompt is visible only to you. Other channel members are not affected.

<!--TODO: Add screenshot of the private prompt that asks the user to connect their Sumo Logic account.-->

## Use Sumo Logic in Slack

### Mention Sumo Logic in a channel or thread

Type `@Sumo` followed by your question in any channel that Sumo Logic has joined. Sumo Logic processes your question and then responds in a thread. If you mention Sumo Logic inside an existing thread, Sumo Logic reads all prior messages in the thread for context before it responds.

### Send a direct message

Open a direct message with Sumo Logic from the **Apps** section of the Slack sidebar. Each message starts a new conversation thread. Replies within a thread continue the same conversation with full context.

<!--TODO: Add screenshot of a direct message conversation with Sumo Logic from the Apps section of the Slack sidebar.-->

### Response elements

Every Sumo Logic response includes the following:

* **Org label.** A footer that shows which Sumo Logic org was queried, for example `proddata(us2) · 0000000000124DBA`.
* **Links to Sumo Logic.** Contextual links to Sumo Logic entities where applicable, for example **View this log search in Sumo Logic**.

<!--TODO: Add screenshot of a response that shows the org label footer and a link to a Sumo Logic entity.-->

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

Mobot in Slack shares the same daily quota as Mobot in the UI. There is no separate Slack allowance. A user's prompt limit is shared across all surfaces.

## FAQ

### Does Sumo Logic read all messages in my Slack workspace?

No. Sumo Logic reads messages only in channels it has been explicitly added to, and only when someone mentions it or in an active direct message. It does not monitor channels passively.

### Are responses scoped to my Sumo Logic permissions?

Yes. Every response is generated against the role and org of the user who mentions Sumo Logic. You cannot receive data through Sumo Logic in Slack that you cannot access in Sumo Logic directly.

### What happens if multiple people mention Sumo Logic in the same thread at the same time?

Sumo Logic processes each request independently and in parallel. Each user's query is scoped to that user's own permissions and org. Responses appear as they are ready, with no guaranteed order. Sumo Logic assigns each user a separate conversation ID for audit purposes.

### Is FedRAMP supported?

Not currently. Support for FedRAMP and ESC deployments is planned for a future release.

### Can I install Sumo Logic from the Slack Marketplace?

No. Installation must start from inside Sumo Logic. This requirement ensures that your Slack workspace is correctly bound to your Sumo Logic org.

### What if my Slack workspace restricts app installs?

An administrator can still start the installation from Sumo Logic. Slack sends an approval request to your Slack Admin. After the Slack Admin approves the request, you must reconnect the workspace to your Sumo Logic org to finish the installation. Until then, the workspace is not linked to your Sumo Logic org.
