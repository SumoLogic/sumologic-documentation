---
id: influence-the-logreduce-outcome
title: Influence the LogReduce Outcome
description: You can influence the algorithm by editing a signature to make the results more general, or see more granular results by splitting a signature.
---


The algorithm used for the LogReduce&reg; operator uses fuzzy logic and soft matching to group messages with similar structures and common repeated text strings into **Signatures**, providing a quick investigative view, or snapshot, for the keywords or time range provided. LogReduce data is based on the data available to the algorithm during the time range of your search.

In some cases, this data sampling produces results that don't meet the needs of your organization. You can see more granular results by [splitting a signature](#splitting-a-signature). In addition, you can promote or demote a signature to help Sumo Logic understand what data is the most relevant to you.

The following icons allow you to change the results of a LogReduce report:

| Icon | Action |
| :-- | :-- |
| ![Promote .png](/img/search/logreduce/Promote.png) | Promote a signature to the top position of the **Signatures** tab. |
| ![Demote.png](/img/search/logreduce/Demote.png) | Demote a signature to move it to the bottom of the last page of the **Signatures** tab. |
| ![Split.png](/img/search/logreduce/Split.png) | Split a signature into multiple signature. |
| ![Edit.png](/img/search/logreduce/Edit.png) | Edit the signature. |
| ![Undo.png](/img/search/logreduce/Undo.png) | Undo the last action or step back through the history of changes. |
| ![Redo.png](/img/search/logreduce/Redo.png) | Redo the last action. Repeat to redo the history of undos. |

## Promoting or Demoting a LogReduce Signature

Relevance is one factor in LogReduce, but it is a global factor. Members of your org can promote and demote signatures related to your Search. 

To influence the relevance of signatures, select the **Signatures** tab and:

* **Promote** a signature by clicking the Thumbs-Up icon for a signature to indicate to Sumo Logic that the data included in the signature is relevant to you. This feedback is taken into consideration when you run LogReduce the next time.   

    ![LogReducePromote.png](/img/search/logreduce/LogReducePromote.png)

* **Demote** a signature by clicking the Thumbs-Down icon for a signature to indicate that this signature is not relevant to you.  

    ![LogReduceDemote.png](/img/search/logreduce/LogReduceDemote.png)

If no one in your account has ever promoted or demoted a signature the default [relevance score](understand-the-logreduce-relevance-column.md) calculated by Sumo Logic is displayed. If you have never promoted or demoted a signature but someone else in your account has, then you will see the global setting for this signature. If you have promoted or demoted a signature, then you will see your personally calculated relevance score.

## Splitting a Signature

If you'd like to see more granular results, you can **split** a signature. When you split a signature, you will notice that fewer wildcard asterisks will appear; instead specific values are included in the signatures. Even though the data is more specific, the results after splitting a signature will still be fuzzy because the LogReduce algorithm bases results only on the window of time you've run the search against.

Click the **Split** icon next to the signature you'd like to split.

:::important
When you split a signature, those changes are perpetuated organization-wide from now on. 
:::

After you split a signature, the position of the signatures may move (one may even move to another page of results). Each line is still highlighted so you can easily identify them.

For example, in your Windows logs you've selected a signature to split. The Category shouldn't be generic; by splitting the signature you should get more specific results.

![LogReduceSplit.png](/img/search/logreduce/LogReduceSplit.png)

After splitting, you will see that each signature has specific data:

![SplitResult.png](/img/search/logreduce/SplitResult.png)

 
