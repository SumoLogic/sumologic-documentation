---
slug: /search/search-query-language/parse-operators
title: Parse Operators
description: Sumo Logic provides a number of ways to parse fields in your log messages.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Parse operators allow you to extract fields from log messages within a query manually and on an ad-hoc basis.

For best practices use Parse operators to build [Field Extraction Rules](/docs/manage/field-extractions) to automatically extract field values and use them to extend your query.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-variable-patterns-using-regex"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse Variable Patterns Using Regex</h4></a>
  <p>Allows you to extract nested fields and other complex data from log lines.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-json-formatted-logs"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse JSON Formatted Logs</h4></a>
  <p>Allows you to extract values from JSON logs with most JSONPath expressions.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse Predictable Patterns Using an Anchor</h4></a>
  <p>Parses strings and labels anchors as fields for use in subsequent aggregation functions.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-field-option"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse Field option</h4></a>
  <p>Parses on previously extracted fields, or initial parsing on a metadata field value, like a collector or source.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-delimited-logs-using-split"> <img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/> <h4>Parse Delimited Logs Using Split</h4></a>
  <p>Allows you to split strings into multiple strings and parse delimited log entries.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-keyvalue-formatted-logs"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse Keyvalue Formatted Logs</h4></a>
  <p>Allows you to get values from a log message by specifying the key paired with each value.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-nodrop-option"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse nodrop option</h4></a>
  <p>Forces results to also include messages that don't match any segment of the parse expression.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parsedate"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>parseDate operator</h4></a>
  <p>Extracts a date or time from a string and provides a timestamp in milliseconds. </p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-csv-formatted-logs"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse CSV Formatted Logs</h4></a>
  <p>Allows you to parse CSV-formatted log entries using a comma as the default delimiter.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parse-xml-formatted-logs"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Parse XML Formatted Logs</h4></a>
  <p>Allows you to parse specified fields from an XML log using an XPath reference.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/search/search-query-language/parse-operators/parsehex"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>parseHex</h4></a>
  <p>Allows you to convert a hexadecimal string of 16 or fewer characters to a number.</p>
  </div>
</div>
</div>
