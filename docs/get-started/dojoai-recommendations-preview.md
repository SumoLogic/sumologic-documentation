---
id: dojoai-recommendations-preview
title: DojoAI Recommendations
description: DojoAI Recommendations proactively flags platform issues, like duplicate logs and slow queries, with previewable fixes you apply instantly.
keywords:
  - dojoai
  - recommendations
  - platform optimization agent
  - proactive monitoring
  - ingestion cost
  - query performance
  - dashboard sprawl
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-extended">Extended Preview</span></a></p>

:::info
This feature is in Extended Preview. For more information, contact your Sumo Logic account representative.
:::

Sumo Logic's Platform Optimization Agent, part of [DojoAI](/docs/get-started/ai-machine-learning/#dojoai), is evolving from an on-demand Q&A agent into an always-on, proactive intelligence layer. Instead of waiting for you to ask [Mobot](/docs/search/mobot) a question or for your next quarterly business review, for example, the agent continuously monitors your environment and surfaces cost and performance issues, such as duplicate logs, debug-log overload, slow queries, and dashboard sprawl, before they affect your workflows or your bill.

These proactive insights live on the **Recommendations** page: a single list of issues to review and fix, each with a plain-language explanation and a previewable fix you can apply instantly.

## Who Recommendations is for

* **Practitioners**. Dashboard owners, query and monitor authors, and partition and ingestion owners can act on individual recommendations to fix slow queries, prune bloated dashboards, and tune noisy debug logs.
* **Admins, buyers, and FinOps teams**. Platform managers and other decision-makers can use Recommendations to manage collections and cut wasted log ingestion.

## Recommendation types

Recommendations fall into three operational areas, matching the **Outcome** category you see in the Recommendations list: cutting ingestion cost, speeding up slow queries and dashboards, and closing telemetry gaps.

* **Cost**
   * **Duplicate Log Ingestion**. Detects identical log streams being ingested multiple times and flags the redundant spend. Shown in the UI as **Remove Duplicate Logs**, with an expected GB/day reduction in average daily ingestion.
   * **Debug Log Overhead**. Flags active production debug logs running continuously so you can trim unnecessary log volume.
* **Performance**
   * **Query Optimization**. Identifies inefficient, resource-heavy searches and suggests a rewritten query for faster results and lower compute load. Shown in the UI as **Reduce Query Latency**.
   * **Dashboard Layout Optimization**. Highlights slow-loading or bloated dashboards and suggests structural fixes to speed up page load times. Shown in the UI as **Reduce Dashboard Load Time**.
* **Manageability**
   * **Data Source Gaps**. Scans your telemetry environment to pinpoint missing sources, so you have complete observability across critical infrastructure and services. Shown in the UI as **Add Missing Telemetry**.

## View your Recommendations

1. In the left nav, click **Recommendations**. An info tooltip next to the page title summarizes the feature: "Save money, work faster, and run your environment better."<br/><img src={useBaseUrl('img/get-started/dojoai-recommendations/recommendations-list.png')} alt="Recommendations list in the left nav, showing the Recommendation, Outcome, Impact, Status, Generated, and Actions columns" style={{border: '1px solid gray'}} width="800" />
1. Browse the list. Recommendations are automatically ranked by confidence, impact, and relevance to you, and each row shows:
   - **Recommendation**. The issue and the specific resource it affects, for example **Reduce Query Latency | MySQL - Excessive Slow Query Detected**, with a short description of the expected outcome, such as a percentage reduction in query latency.
   - **Outcome**. **Performance**, **Cost**, or **Manageability** — see [Recommendation types](#recommendation-types).
   - **Impact**. The expected impact of applying the fix: **High** or **Medium**.
   - **Status**. **Active**, **Applied**, **Rejected**, or **Obsolete** (the recommendation expired because the underlying configuration changed). A recommendation drops out of the active queue after you act on it, the next time the list refreshes.
   - **Generated**. How long ago the recommendation was generated.
   - **Actions**. Click **Preview** to see the fix before applying it.
1. Use the **Search recommendations** field or **Status** filter to narrow the list. You can also sort or filter by type, outcome, and impact.

Dashboard Layout Optimization recommendations also surface directly on the affected dashboard: an optimization icon appears in the dashboard toolbar, and clicking it opens the same preview, with **Accept** and **Reject** controls, without leaving the page.

## Review and apply a fix

Click **Preview**, in the **Actions** column, on any recommendation to open its detail panel.<br/><img src={useBaseUrl('img/get-started/dojoai-recommendations/recommendations-list-preview-click.png')} alt="Recommendations list with the Preview link in the Actions column highlighted" style={{border: '1px solid gray'}} width="800" /><br/><img src={useBaseUrl('img/get-started/dojoai-recommendations/recommendation-preview.png')} alt="Recommendation detail panel showing the expected outcome, recommended actions, a query diff, and Apply, Change at Source, and Reject buttons" style={{border: '1px solid gray'}} width="800" />

The panel shows:

* **Status chips**. Repeats the status, impact, and generated-time from the list, plus which Platform Optimization teammate generated it.
* **Expected Outcome**. The measurable benefit of applying the fix.
* **Recommended Actions**. A plain-language explanation of what the fix changes and why, including which monitor, dashboard, or other resource it affects, and whether applying it changes query results.
* **Recommended Query**. A diff of the current query and the recommended query. Toggle between **Combined** (one query, with removed lines in red and added lines in green) and **Side-by-side** (the **Current Query** and **Recommended Query** shown in separate columns) views, or click **Copy Recommended Query** to copy it without applying it.<br/><img src={useBaseUrl('img/get-started/dojoai-recommendations/recommendation-preview-side-by-side.png')} alt="Recommended Query shown in Side-by-side view, with Current Query and Recommended Query in separate columns" style={{border: '1px solid gray'}} width="800" />

What you can do from the panel depends on your permissions on the affected resource:

* **If you have edit access**, you see **Apply** and **Change at Source**:
   * **Apply**. Executes the change right away.
   * **Change at Source**. Opens the underlying resource's own edit page, such as a monitor's **Trigger Conditions** step, with the query field pre-filled with the recommended query and flagged by an info banner ("This query is filled with Recommended query"). Press **Enter** in the query editor to execute the query, then click **Save** to apply it from there.
* **If you don't have edit access**, you see **Contact Owner** instead, which shows the name of the resource's owner so you can ask them to apply the fix.

Everyone can also:

* **Reject**. Opens a confirmation dialog where you can optionally select a reason (**Not relevant**, **Incorrect recommendation**, **Already handled**, **Don't want this change**, or **Other**) before clicking **Confirm Rejection**.<br/><img src={useBaseUrl('img/get-started/dojoai-recommendations/reject-recommendation-dialog.png')} alt="Reject Recommendation confirmation dialog with optional rejection reasons and a warning that rejecting is irreversible and org-wide" style={{border: '1px solid gray'}} width="700" />

   :::caution
   Rejecting a recommendation makes it unavailable for your entire organization, not just for you. This action is irreversible.
   :::
* Click the thumbs up or thumbs down under **Was this Recommendation useful?** to send feedback on the recommendation.

:::note
Clicking **Apply** executes the change right away. Click **Change at Source** instead if you want to review or modify it manually before applying it.
:::

## Limitations

The following apply during Extended Preview:

* **No real-time alerts or email notifications**. Recommendations are generated during a daily background run and surfaced in-product only. Email summaries and real-time alerts are being considered for a future release.
* **No cross-org rollup view**. Admins and FinOps users see the same Recommendations page as practitioners, with standard view and edit permissions. A dedicated executive-level, cross-org rollup view is planned for a future release.
* **Changes made outside Sumo Logic**. If the underlying resource is changed outside the Sumo Logic UI, such as through Terraform or an API script, the recommendation is marked **Obsolete** rather than **Applied**.
* **No open-text feedback**. You can select a reason when rejecting a recommendation, but there's no free-text feedback field yet.

## FAQ

### What is DojoAI Recommendations?

DojoAI Recommendations is the proactive side of the [Platform Optimization Agent](/docs/get-started/ai-machine-learning/#dojoai), part of [DojoAI](/docs/get-started/ai-machine-learning/#dojoai). Instead of answering questions on demand, it continuously monitors your environment for cost and performance issues, such as duplicate logs, debug-log overload, slow queries, and dashboard sprawl, and surfaces them with plain-language insights and previewable fixes on the **Recommendations** page.

### How is this different from asking Mobot a question?

[Mobot](/docs/search/mobot) is on-demand: you ask a question and the Platform Optimization Agent answers it. Recommendations is proactive: the same agent continuously monitors your environment and surfaces issues automatically, without you having to ask.

### Can I access Recommendations from Mobot?

Not yet. During Extended Preview, you can only view and act on recommendations from the **Recommendations** page or the in-context entry point on the Dashboard page. Viewing and acting on recommendations directly inside Mobot is planned for a future release.

### Can I turn off DojoAI Recommendations?

Yes. Contact your Sumo Logic account team or open a support ticket to opt out, the same way you can for other DojoAI capabilities. See [Can I opt out of AI features?](/docs/get-started/ai-machine-learning/#can-i-opt-out-of-ai-features)

### What are Mission Control and DojoAI Studio?

They're other surfaces inside DojoAI, alongside Recommendations. <!--TODO Add a short description of each and link to their own doc pages once available.-->

## Additional resources

* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). How DojoAI Recommendations fits alongside Mobot, the Root Cause Agent, the SOC Analyst Agent, and the Sumo Logic MCP server.
* [Mobot](/docs/search/mobot). The conversational interface for DojoAI — ask the Platform Optimization Agent a question directly.
