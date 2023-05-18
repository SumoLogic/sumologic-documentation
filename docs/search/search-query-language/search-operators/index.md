---
slug: /search/search-query-language/search-operators
title: Search Operators
sidebar_label: Search Operators
description: Process data in meaningful ways and provide logic to queries with search operators. This section lists the available search operators in Sumo's search query language.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Search operators process data in meaningful ways and provide logic to queries. This page lists the available search operators in the Sumo Logic search query language.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/accum"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>accum</h4></a>
  <p>Calculates the cumulative sum of a field.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/as"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>as</h4></a>
  <p>The as operator, typically used in conjunction with other operators, can also be used standalone to rename fields or to create new constant fields.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/asn-lookup"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>ASN lookup</h4></a>
  <p>Use this to look up an Autonomous System Number (ASN) and organization name by IP address.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/backshift"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>backshift</h4></a>
  <p>The backshift operator helps you compare values as they change over time.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/base64decode"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>base64Decode</h4></a>
  <p>The base64Decode operator takes a base64 string and converts it to an ASCII string.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/base64encode"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>base64Encode</h4></a>
  <p>The base64Encode operator takes an ASCII string and converts it to a base64 string.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/bin"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>bin</h4></a>
  <p>The bin operator assigns output results to user defined bins.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/cat"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>cat</h4></a>
  <p>You can use the cat operator to view the contents of a lookup table. Not supported in live dashboards or scheduled searches.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/cidr"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>CIDR</h4></a>
  <p>Sumo Logic's three CIDR operators work with Classless Inter-Domain Routing, notation to narrow the analysis of IPv4 networks to specific subnets.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/compare"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>compare</h4></a>
  <p>Can be used with the <a href="/docs/search/time-compare">Time Compare button</a> in the Sumo UI, which generates correct syntax and adds it to your aggregate query.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/concat"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>concat</h4></a>
  <p>The concat operator allows you to concatenate or join multiple strings, numbers, and fields into a single user-defined field.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/contains"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>contains</h4></a>
  <p>Compares string values of two parsed fields and returns a boolean result based on whether the second field's value exists in the first.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/dectohex"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>decToHex</h4></a>
  <p>Converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/dedup"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>dedup</h4></a>
  <p>The dedup operator removes duplicate results. You have the option to remove consecutively and by specific fields.</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/diff"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>diff</h4></a>
  <p>The diff operator calculates the rate of change in a field between consecutive rows.</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/fields"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>fields</h4></a>
  <p>The fields operator allows you to specify which fields to display and their order in the results of a query.</p>
  </div>
</div>
<div className="box smallbox17 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/fillmissing"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>fillmissing</h4></a>
  <p>The fillmissing operator allows you to specify groups that should be represented in data output.</p>
  </div>
</div>
<div className="box smallbox18 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/filter"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>filter</h4></a>
  <p>Use the filter operator to filter the output of a search based on the filtering criteria of a child query.</p>
  </div>
</div>
<div className="box smallbox19 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/format"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>format</h4></a>
  <p>The format operator allows you to format and combine data from parsed fields.</p>
  </div>
</div>
<div className="box smallbox20 card">
  <div className="container">
  <a href="/docs/search/search-query-language/search-operators/formatdate"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>formatDate</h4></a>
  <p>Formats dates in log files as a string in a different format, such as U.S. or European date formatting.</p>
  </div>
</div>
    <div className="box smallbox21 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/geo-lookup-map"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>Geo Lookup (Map)</h4></a>
      <p>Sumo Logic can match a parsed IPv4 or IPv6 address to its geographical location on a map.</p>
      </div>
    </div>
    <div className="box smallbox22 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/geoip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>geoip</h4></a>
      <p>Sumo Logic can match a parsed IPv4 or IPv6 address to its geographical location on a map chart.</p>
      </div>
    </div>
    <div className="box smallbox23 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/hash"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>hash</h4></a>
      <p>The hash operator uses a cryptographic hash algorithm to obscure data into a random string value.</p>
      </div>
    </div>
    <div className="box smallbox24 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/haversine"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>haversine</h4></a>
      <p>Returns the distance between latitude and longitude values of two coordinates in kilometers.</p>
      </div>
    </div>
    <div className="box smallbox25 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/hextoascii"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>hexToAscii</h4></a>
      <p>The hexToAscii operator converts a hexadecimal string to an ASCII string.</p>
      </div>
    </div>
    <div className="box smallbox26 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/hextodec"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>hexToDec</h4></a>
      <p>Converts a hexadecimal string of 16 or fewer characters to a long data type using Two's Complement for negative values.</p>
      </div>
    </div>
    <div className="box smallbox27 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/if"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>if, ?</h4></a>
      <p>These expressions are used to evaluate a condition as either true or false, with values assigned for each outcome.</p>
      </div>
    </div>
    <div className="box smallbox28 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/in"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>in</h4></a>
      <p>The in operator returns a Boolean value: true if the specified property is in the specified object, or false if it is not.</p>
      </div>
    </div>
    <div className="box smallbox29 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/ipv4tonumber"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>ipv4ToNumber</h4></a>
      <p>Converts an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format.</p>
      </div>
    </div>
    <div className="box smallbox30 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isNull</h4></a>
      <p>Checks a string and returns a boolean value.</p>
      </div>
    </div>
    <div className="box smallbox31 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isEmpty</h4></a>
      <p>Checks if a string contains no characters and is only whitespace.</p>
      </div>
    </div>
    <div className="box smallbox32 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isBlank</h4></a>
      <p>Checks if a string contains no characters, is only whitespace, and is null.</p>
      </div>
    </div>
    <div className="box smallbox33 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isnumeric"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isNumeric</h4></a>
      <p>The isNumeric operator checks whether a string is a valid Java number.</p>
      </div>
    </div>
    <div className="box smallbox34 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isprivateip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isPrivateIP</h4></a>
      <p>The isPrivateIP operator checks if an IPv4 address is private and returns a boolean.</p>
      </div>
    </div>
    <div className="box smallbox35 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/ispublicip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isPublicIP</h4></a>
      <p>The isPublicIP operator checks if an IPv4 address is public and returns a boolean.</p>
      </div>
    </div>
    <div className="box smallbox36 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isreservedip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isReservedIP</h4></a>
      <p>The isReservedIP operator checks if an IPv4 address is reserved as defined by RFC 5735 and returns a boolean.</p>
      </div>
    </div>
    <div className="box smallbox37 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/isvalidip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isValidIP</h4></a>
      <p>The isValidIP operator checks if the value is a valid IP address.</p>
      </div>
    </div>
    <div className="box smallbox38 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/join"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>join</h4></a>
      <p>The join operator combines records of two or more data streams.</p>
      </div>
    </div>
  <div className="box smallbox39 card">
    <div className="container">
    <a href="/docs/search/search-query-language/search-operators/length"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>length</h4></a>
    <p>The length operator returns the number of characters in a string.</p>
    </div>
  </div>
</div>

<br/>



<div className="box-wrapper" markdown="1">

  <div className="box smallbox1 card">
    <div className="container">
    <a href="/docs/search/search-query-language/search-operators/limit"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>limit</h4></a>
      <p>The limit operator reduces the number of raw messages or aggregate results returned.</p>
      </div>
    </div>
    <div className="box smallbox2 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/lookup"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>lookup</h4></a>
      <p>Returns one or more fields from a lookup table hosted by Sumo Logic and add the fields to the log messages returned by your query.</p>
      </div>
    </div>
    <div className="box smallbox3 card">
      <div className="container">
      <a href="/docs/search/search-query-language/search-operators/lookupcontains"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>lookupContains</h4></a>
      <p>Use the lookupContains operator to determine whether a key exists in a lookup table. It will return a boolean value.</p>
      </div>
    </div>
        <div className="box smallbox4 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/lookup-classic"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>lookup (Classic)</h4></a>
          <p>Maps data in your log messages to meaningful information saved in Sumo or on an HTTPS server.</p>
          </div>
        </div>
        <div className="box smallbox5 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/luhn"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>luhn</h4></a>
          <p>Uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers and then validates them.</p>
          </div>
        </div>
        <div className="box smallbox6 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/manually-cast-data-string-number"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>Manually cast data to string or number</h4></a>
          <p>Most data in Sumo Logic is stored as a string data type. Metadata fields are stored as string data and parsed fields are by default parsed as string type data.</p>
          </div>
        </div>
        <div className="box smallbox7 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/matches"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>matches</h4></a>
          <p>The matches operator can be used to match a string to a wildcard pattern or an RE2 compliant regex.</p>
          </div>
        </div>
        <div className="box smallbox8 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/now"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>now</h4></a>
          <p>The now returns the current epoch time in milliseconds.</p>
          </div>
        </div>
        <div className="box smallbox9 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/num"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>num</h4></a>
          <p>Converts a field to a double value, which is twice as accurate as a float value.</p>
          </div>
        </div>
        <div className="box smallbox10 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/outlier"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>outlier</h4></a>
          <p>Identifies values in a sequence that seem unexpected and would trigger an alert/violation.</p>
          </div>
        </div>
        <div className="box smallbox11 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/predict"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>predict</h4></a>
          <p>Uses a series of time-stamped numerical values to predict future values.</p>
          </div>
        </div>
        <div className="box smallbox12 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/queryendtime"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>queryEndTime()</h4></a>
          <p>The queryEndTime() operator returns the end time of the search time range in milliseconds.</p>
          </div>
        </div>
        <div className="box smallbox13 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/querystarttime"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>queryStartTime()</h4></a>
          <p>The queryStartTime() operator returns the start time of the search time range in milliseconds.</p>
          </div>
        </div>
        <div className="box smallbox14 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/querytimerange"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>queryTimeRange()</h4></a>
          <p>The queryTimeRange() operator returns the time duration for the query being executed in milliseconds.</p>
          </div>
        </div>
        <div className="box smallbox15 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/replace"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>replace</h4></a>
          <p>The replace operator allows you to replace all instances of a specified string with another string.</p>
          </div>
        </div>
        <div className="box smallbox16 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/rollingstd"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>rollingstd</h4></a>
          <p>The rollingstd operator finds the rolling standard deviation of a field, allowing you to identify changes over time.</p>
          </div>
        </div>
        <div className="box smallbox17 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/save"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>save</h4></a>
          <p>Allows you to save the results of a query to a lookup table you've already created.</p>
          </div>
        </div>
        <div className="box smallbox18 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/save-classic"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>save (Classic)</h4></a>
          <p>The save (classic) operator works with the classic Lookup Tables feature.</p>
          </div>
        </div>
        <div className="box smallbox19 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/sessionize"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>sessionize</h4></a>
          <p>Uses an extracted value from one log message to find correlating values in log messages from other systems.</p>
          </div>
        </div>
        <div className="box smallbox20 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/smooth"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>smooth</h4></a>
          <p>Calculates the rolling (or moving) average of a field, measuring the average of a value to "smooth" random variation.</p>
          </div>
        </div>
        <div className="box smallbox21 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/sort"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>sort</h4></a>
          <p>The sort operator orders aggregated search results.</p>
          </div>
        </div>
        <div className="box smallbox22 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/substring"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>substring()</h4></a>
          <p>The substring operator allows you to specify an offset that will output only part of a string, referred to as a substring.</p>
          </div>
        </div>
        <div className="box smallbox23 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/threatip"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>threatip()</h4></a>
          <p>Correlates CrowdStrike's threat intelligence data based on IP addresses from your log data, helping you detect threats in your environment.</p>
          </div>
        </div>
        <div className="box smallbox24 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/timeslice"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>timeslice()</h4></a>
          <p>The timeslice operator aggregates data by time period, so you can create bucketed results based on a fixed interval.</p>
          </div>
        </div>
        <div className="box smallbox25 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/timeslice-join"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>Timeslice Join Results</h4></a>
          <p>When you gather data using a join operator, you can slice data by time period using the timeslice operator.</p>
          </div>
        </div>
        <div className="box smallbox26 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/tolowercase-touppercase"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>toLowerCase, toUpperCase</h4></a>
          <p>The toLowerCase operator takes a string and converts it to all lower case letters.</p>
          </div>
        </div>
        <div className="box smallbox27 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/top"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>top</h4></a>
          <p>Use the top operator with the sort operator to reduce the number of sorted results returned.</p>
          </div>
        </div>
        <div className="box smallbox28 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/topk"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>topk</h4></a>
          <p>The topk operator allows you to select the top values from fields and group them by fields.</p>
          </div>
        </div>
        <div className="box smallbox29 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/total"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>total</h4></a>
          <p>The total operator inserts the sum of a set of fields into every row of the set.</p>
          </div>
        </div>
        <div className="box smallbox30 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/tourl"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>tourl</h4></a>
          <p>The tourl operator provides you the ability to assign a short name that describes the URL.</p>
          </div>
        </div>
        <div className="box smallbox31 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/trace"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>trace</h4></a>
          <p>The trace operator acts as a highly sophisticated filter to connect the dots across different log messages.</p>
          </div>
        </div>
        <div className="box smallbox32 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/transpose"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>transpose</h4></a>
          <p>Similar to a Pivot Table in Excel, the transpose operator allows you to take a list and turn it into a table in the Aggregates tab.</p>
          </div>
        </div>
        <div className="box smallbox33 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/trim"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>trim()</h4></a>
          <p>The trim operator eliminates leading and trailing spaces from a string field.</p>
          </div>
        </div>
        <div className="box smallbox34 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/urldecode"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>urldecode</h4></a>
          <p>The urldecode operator decodes a URL you include in a query, returning the decoded (unescaped) URL string.</p>
          </div>
        </div>
        <div className="box smallbox35 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/urlencode"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>urlencode</h4></a>
          <p>The urlencode operator encodes the URL into an ASCII character set.</p>
          </div>
        </div>
        <div className="box smallbox36 card">
          <div className="container">
          <a href="/docs/search/search-query-language/search-operators/where"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>where()</h4></a>
          <p>The where operator allows you to filter results based on a boolean expression.</p>
          </div>
        </div>
</div>
