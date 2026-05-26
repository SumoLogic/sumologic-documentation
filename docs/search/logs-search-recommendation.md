---
id: logs-search-recommendation
title: Logs Search Recommendation
sidebar_label: Logs Search Recommendation
description: Logs Search Recommendation surfaces matching macros inline as you type in the Log Search query editor, helping you reuse saved query logic faster.
keywords:
  - log search
  - macro
  - query recommendation
  - search suggestion
  - query editor
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

Logs Search Recommendation helps you discover and reuse existing [macros](/docs/manage/macro) directly from the Log Search query editor. As you type, a <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button appears near the editor and surfaces macros whose names or definitions match the expression you are building, so you can insert existing query logic without leaving the editor or remembering exact macro names.

## How it works

When you begin typing a query in Log Search, the recommendation engine compares your partial expression against the macros defined in your organization. If a match is found, the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button activates near the query editor. Clicking it opens a suggestion panel listing the matching macros, each with an **Accept** and a **Remove** button.

- **Accept**. Inserts the macro reference into your query at the current cursor position using backtick syntax (`` `macro_name` ``). After a macro is accepted, the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button changes to the <img src={useBaseUrl('img/search/log-search-eye-icon.png')} alt="Eye button" width="25" /> button.
- **Remove**. Dismisses that specific suggestion from the list without inserting it.
- **Info button**. Each macro in the suggestion list has an <img src={useBaseUrl('img/search/log-search-info-icon.png')} alt="Info button" width="25" /> button. Clicking it displays the macro's name, definition, and a usage example, along with an arrow link that takes you directly to the selected macro's detail page in [Macros](/docs/manage/macro).
- **Eye button**. Click the <img src={useBaseUrl('img/search/log-search-eye-icon.png')} alt="Eye button" width="25" /> button (visible after accepting a macro) to view the definition of the accepted macro.

:::info
Suggestions are scoped to your organization's macros and respect your role-based access permissions.
:::

## Use Logs Search Recommendation

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs** > **Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.<br/>
[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Log Search** page.
1. Begin typing your query in the query editor.
1. When part of your expression matches an existing macro, the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button appears near the query editor.<br/><img src={useBaseUrl('img/search/log-search-recommendations-lightbulb.png')} alt="Macro recommendations button" style={{border: '1px solid gray'}} width="800" />
1. Click the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button to open the recommendation panel.<br/><img src={useBaseUrl('img/search/log-search-recommendations-panel.png')} alt="Macro recommendations button" style={{border: '1px solid gray'}} width="700" />
1. Review the suggested macros. For each suggestion:
   - Click **Accept** to insert the macro into your query.
   - Click **Remove** to dismiss the suggestion.
   - Click the <img src={useBaseUrl('img/search/log-search-info-icon.png')} alt="Info button" width="25" /> button to see the macro's name, definition, and a usage example. Use the arrow link in the info panel to navigate directly to that macro's detail page.<br/><img src={useBaseUrl('img/search/log-search-recommendations-info.png')} alt="Macro recommendations button" style={{border: '1px solid gray'}} width="500" />
1. After accepting a macro, the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button changes to the <img src={useBaseUrl('img/search/log-search-eye-icon.png')} alt="Eye button" style={{border: '1px solid gray'}} width="25" /> button. Click it to view the definition of the accepted macro.<br/><img src={useBaseUrl('img/search/log-search-recommendations-accepted.png')} alt="Macro recommendations button" style={{border: '1px solid gray'}} width="800" />
1. Run your query as usual.

:::tip
To learn more about creating and managing macros, see [Macros](/docs/manage/macro). For general query autocompletion and syntax suggestions, see [Logs Query Assist](/docs/search/query-assist).
:::

## Limitations

- Recommendations are only shown when your partial expression matches an existing macro name or definition. If no match is found, the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button does not appear.
- Only macros you have permission to view are surfaced in recommendations.
- Nested macro references are supported on insertion, but the recommendation panel displays only top-level macros.

## FAQ

### What is Logs Search Recommendation in Sumo Logic?

Logs Search Recommendation is a Private Preview feature in Sumo Logic Log Search that surfaces matching macros as you type in the query editor. The <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button appears near the editor when part of your expression matches an existing macro in your organization, letting you insert reusable query logic without leaving the editor.

### What triggers the recommendation button in Log Search?

The <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button appears when any part of your typed query expression matches the name or content of an existing macro defined in your organization. If no match is found, the button does not appear.

### What does the info button do on each macro suggestion?

Each macro in the recommendation panel has an <img src={useBaseUrl('img/search/log-search-info-icon.png')} alt="Info button" width="25" /> button. Clicking it opens an info panel showing the macro's name, definition, and a usage example. The panel also includes an arrow link that takes you directly to that macro's detail page in [Macros](/docs/manage/macro).

### What does the eye button do in the Log Search query editor?

The <img src={useBaseUrl('img/search/log-search-eye-icon.png')} alt="Eye button" width="25" /> button appears in place of the <img src={useBaseUrl('img/search/log-search-recommendations.png')} alt="Macro recommendations button" width="25" /> button after you accept a macro suggestion. Clicking it displays the definition of the accepted macro.

### How is Logs Search Recommendation different from Logs Query Assist?

[Logs Query Assist](/docs/search/query-assist) provides real-time syntax suggestions, operator completions, and schema-based field hints as you type. Logs Search Recommendation focuses specifically on surfacing your organization's saved [macros](/docs/manage/macro) when your expression partially matches one, helping you reuse complex, predefined query logic.

### Do you need special permissions to see macro suggestions?

You need access to the macros in your organization. Only macros you have permission to view are surfaced in the recommendation panel. Role-based access controls apply. If you do not have access to a macro, it will not appear in suggestions.
