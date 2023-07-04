---
slug: /cse/rules
title: CSE Rules
description: Learn about Cloud SIEM Enterprise (CSE) rules, including how to write rules, rules syntax, and CSE built-in rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide has information about Cloud SIEM Enterprise (CSE) rules, including how to write rules, rules syntax, and CSE built-in rules.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/cse/rules/about-cse-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>About CSE Rules</h4></a>
  <p>Learn about CSE rules, rules syntax, and how to write rules.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/cse/rules/before-writing-custom-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Before You Write a Custom Rule</h4></a>
  <p>Learn how to plan a custom rule and prototype rule expressions.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/cse/rules/cse-rules-syntax"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Rules Syntax</h4></a>
  <p>Learn about the functions you can use when writing CSE Rules.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/cse/rules/write-match-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Match Rule</h4></a>
  <p>Learn how to write a match rule.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/cse/rules/write-chain-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Chain Rule</h4></a>
  <p>Learn how to write a chain rule.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/cse/rules/write-aggregation-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Aggregation Rule</h4></a>
  <p>Learn how to write an Aggregation rule.</p>
  </div>  
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/cse/rules/write-threshold-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Threshold Rule</h4></a>
  <p>Learn how to write a Threshold rule.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/cse/rules/write-first-seen-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>First Seen Rule</h4></a>
  <p>Learn how to write a First Seen rule.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/cse/rules/write-outlier-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Outlier Rule</h4></a>
  <p>Learn how to write an Outlier rule.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/cse/rules/cse-built-in-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Built-In Rules</h4></a>
  <p>Look at the various page lists and CSE's built-in rules.</p>
</div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/cse/rules/import-yara-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Import YARA Rules</h4></a>
  <p>Learn how to import YARA rules from GitHub into CSE.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/cse/rules/normalized-authentication-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Normalized Authentication Rules</h4></a>
  <p>Detect activities that compromise accounts using authentication logs.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/cse/rules/normalized-threat-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Normalized Threat Rules</h4></a>
  <p>Learn about CSE’s built-in normalized threat rules.</p>
  </div>  
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/cse/rules/rule-tuning-expressions"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Rule Tuning</h4></a>
  <p>Learn how to create and use tuning expressions for rules.</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/cse/rules/tailor-global-rule"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Tailor a Global Rule</h4></a>
  <p>Learn how to tailor global (built-in) rules in CSE.</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/cse/rules/insight-trainer"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="icon" width="40"/><h4>Insight Trainer</h4></a>
  <p>Learn how to adjust rules to improve Insight generation.</p>
  </div>
</div>
</div>
