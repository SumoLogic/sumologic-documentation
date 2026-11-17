---
id: mobot-in-slack
title: Mobot in Slack
description: Ask Mobot about your Sumo Logic data without leaving Slack by @mentioning Sumo Logic in channels, sending direct messages, or using the Sumo Logic app panel.
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

The Sumo Logic Slack app lets your team use [Mobot](/docs/search/mobot/) directly from Slack. Mention `@Sumo` in an incident channel, investigate alerts and log data by direct message, or run multi-step investigations from the Sumo Logic app panel, all without leaving Slack.

Responses are scoped to your Sumo Logic role and org, and every response includes a link back to the relevant entity in Sumo Logic. Sumo Logic passes the full thread context to Mobot automatically, so you do not need to re-explain what your team has already discussed.

<img src={useBaseUrl('img/search/mobot/slack-mobot-thread.png')} alt="Slack thread in an incident channel where a user mentions Sumo Logic and receives a root cause analysis with recommended actions" style={{border: '1px solid gray'}} width="800" />

## What you can do

* **Ask in channels and threads.** Mention `@Sumo` in any channel or thread to get AI-generated answers from your Sumo Logic data.
* **Ask privately.** Send direct messages to Sumo Logic for private, exploratory queries.
* **Run investigations.** Run multi-step investigations from the Sumo Logic app panel in the Slack sidebar.
* **Jump back to Sumo Logic.** Use the links in each response to open the log search, alert, or dashboard that Sumo Logic referenced.
* **Work across orgs.** Use Sumo Logic across multiple orgs from a single Slack workspace.

## Requirements

### In Sumo Logic

* You need the Administrator role to install the integration and connect a Slack workspace.
* You install the integration from the Sumo Logic product, not from the Slack Marketplace.
* Your Sumo Logic org must be in one of the following deployments: US1, US2, EU, DE, AU, JP, CA, KR, or CH. FedRAMP and ESC deployments are not currently supported.

### In Slack

* To install an app in an unrestricted workspace, you need Workspace Admin or Owner permissions, or the workspace must allow member-initiated installs.
* For restricted workspaces, a Slack Admin must approve the app before it activates.
* Mobot in Slack is supported on all Slack plans: Free, Pro, Business+, and Enterprise Grid.

## How it works

An administrator starts the installation from inside Sumo Logic, under **Integrations**. The installation binds the Slack workspace to the correct Sumo Logic org and establishes the OAuth trust needed for user-level authentication.

After installation, any channel member can add Sumo Logic to a channel with `/invite @Sumo`. The first time you mention Sumo Logic, you receive a private prompt to connect your Sumo Logic account. After a brief OAuth login, Sumo Logic processes your original query automatically. Later mentions work without any extra steps.

Responses are scoped to the role and permissions of the user who mentions Sumo Logic. In a shared channel, different users who query the same thread can receive different answers based on their individual access levels.

## Connect a Slack workspace

A Sumo Logic administrator needs to connect your Slack workspace.

1. In Sumo Logic, select **App Catalog** > **Integrations** in the navigation menu.
1. Find the **Sumo Logic Slack Extension** tile.
1. Click **+ Connect Workspace**. The Slack authorization screen opens.
1. In the top-right dropdown menu, confirm that the correct workspace is selected, and then click **Allow**.
1. Go to the **Configure** tab. The workspace appears with the status **Connected**.

If your Slack workspace restricts app installs, the authorization screen shows **Request App Approval** instead of **Allow**. Submit the request. You do not need to submit it again. Follow up with your Slack Admin to get the request approved. After the Slack Admin approves it in Slack, the workspace appears as **Connected** on the **Configure** tab automatically. Until then, the workspace is not listed.

### Disconnect a workspace

To disconnect a workspace, open the overflow menu on the workspace row in the **Configure** tab and select **Disconnect workspace**. This disassociates your Sumo Logic org from that Slack workspace.

## Add Sumo Logic to channels

After installation, Sumo Logic exists as a bot user in your Slack workspace, but it is not in any channel. You can add Sumo Logic to a channel in either of the following ways:

* **Explicit invite.** Any channel member with invite permissions can type `/invite @Sumo` in the channel. Sumo Logic joins and is immediately available to mention.
* **Just-in-time invite.** If you mention Sumo Logic in a channel it has not joined, Slack prompts you to invite it. Confirm the prompt, and Sumo Logic joins the channel and processes your original query.

## Connect your Sumo Logic account

You do not need to run any command or complete any setup before you use Sumo Logic in Slack. The first time you mention Sumo Logic, the experience depends on how many Sumo Logic orgs are mapped to your Slack workspace:

* **One org mapped.** If you are not yet authenticated, you receive a private prompt that only you can see. The prompt asks you to connect your Sumo Logic account. You are redirected to Sumo Logic for a brief OAuth login, and then Sumo Logic processes your original query automatically.
* **Multiple orgs mapped.** Sumo Logic shows all available orgs as buttons. Select an org. If you are already authenticated to that org, the query runs. If not, you complete the OAuth login for that org, and then the query runs.

The private prompt is visible only to you. Other channel members are not affected.

## Use Sumo Logic in Slack

### Mention Sumo Logic in a channel or thread

Type `@Sumo` followed by your question in any channel that Sumo Logic has joined. Sumo Logic reacts with a ⏳ to confirm that it received your message, and then responds in a thread. If you mention Sumo Logic inside an existing thread, Sumo Logic reads all prior messages in the thread for context before it responds.

### Send a direct message

Open a direct message with Sumo Logic from the **Apps** section of the Slack sidebar. Each message starts a new conversation thread. Replies within a thread continue the same conversation with full context.

### Response elements

Every Sumo Logic response includes the following:

* **Org label.** A footer that shows which Sumo Logic org was queried, for example `acme-corp · us2.sumologic.com`.
* **Links to Sumo Logic.** Contextual links to Sumo Logic entities where applicable, for example **View this log search in Sumo Logic**.

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

## FAQ

### Does Sumo Logic read all messages in my Slack workspace?

No. Sumo Logic reads messages only in channels it has been explicitly added to, and only when someone mentions it or in an active direct message. It does not monitor channels passively.

### Are responses scoped to my Sumo Logic permissions?

Yes. Every response is generated against the role and org of the user who mentions Sumo Logic. You cannot receive data through Sumo Logic in Slack that you cannot access in Sumo Logic directly.

### Can I connect multiple Sumo Logic orgs to one Slack workspace?

Yes. An administrator can map multiple orgs to a workspace from the **Configure** tab. You can query any of those orgs and use `/sumo-set-org` to manage your default.

### What happens if multiple people mention Sumo Logic in the same thread at the same time?

Sumo Logic processes each request independently and in parallel. Each user's query is scoped to that user's own permissions and org. Responses appear as they are ready, with no guaranteed order. Sumo Logic assigns each user a separate conversation ID for audit purposes.

### Is FedRAMP supported?

Not currently. Support for FedRAMP and ESC deployments is planned for a future release.

### Can I install Sumo Logic from the Slack Marketplace?

No. Installation must start from inside Sumo Logic. This requirement ensures that your Slack workspace is correctly bound to your Sumo Logic org.

### What if my Slack workspace restricts app installs?

An administrator can still start the installation from Sumo Logic. Slack sends an approval request to your Slack Admin. After the Slack Admin approves the request, the workspace status updates to **Connected** automatically.
