---
id: sentry
title: Sentry
description: Learn about the collection process for the Sumo Logic Sentry integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/sentry-logo.png')} alt="Thumbnail icon" width="50"/>

The Sentry app for Sumo Logic helps you monitor received issues, comments, detected errors, issue alerts, and metric alerts. This app is built on Sentry's internal integration using webhooks, which provides seamless integration between Sentry and Sumo Logic. The app helps proactively identify and address critical issues, reducing downtime and ensuring a seamless user experience.

Sentry is an open-source error monitoring platform that helps developers identify, track, and resolve software issues in real-time, enhancing the stability and reliability of applications and websites. You can use a webhook in the Sentry platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor received issues, comments, detected errors, issue alerts, and metric alerts in Sumo Logic. For more details, refer to the [Sentry documentation](https://docs.sentry.io/).

## Event types

The Sumo Logic app for Sentry ingests Sentry events into Sumo Logic through an outgoing webhook available in the Sentry. Following event types are ingested through the Sentry webhook:
- Issues
- Comments
- Errors
- Issue Alerts
- Metric Alerts

### Sample log messages

<details>
<summary>Issue</summary>

```json
{
   "action": "created",
   "installation": {
      "uuid": "04ff0c7e-ead5-4b0a-93d6-5b571468239d"
   },
   "data": {
      "issue": {
         "url": "https://zorlinaxomrel.xyz/api/0/organizations/cal-ia/issues/1752473492887/",
         "web_url": "https://zorlinaxomrel.xyz/issues/1752473492887/",
         "project_url": "https://zorlinaxomrel.xyz/issues/?project=SnapFlow",
         "id": 1752473492887,
         "shareId": null,
         "shortId": "PYTHON-2",
         "title": "ZeroDivisionError: division by zero",
         "culprit": "__main__ in &lt;module&gt;",
         "permalink": null,
         "logger": null,
         "level": "error",
         "status": "resolved",
         "statusDetails": {},
         "substatus": "resolved",
         "isPublic": false,
         "platform": "python",
         "project": {
            "id": 2,
            "name": "python",
            "slug": "python",
            "platform": "python"
         },
         "type": "error",
         "metadata": {
            "value": "division by zero",
            "type": "ZeroDivisionError",
            "filename": "sentry.py",
            "function": "&lt;module&gt;",
            "in_app_frame_mix": "in-app-only",
            "sdk": {
               "name": "sentry.python",
               "name_normalized": "sentry.python"
            },
            "initial_priority": 75
         },
         "numComments": 0,
         "assignedTo": null,
         "isBookmarked": false,
         "isSubscribed": false,
         "subscriptionDetails": null,
         "hasSeen": false,
         "annotations": [],
         "issueType": "error",
         "issueCategory": "error",
         "priority": "high",
         "priorityLockedAt": null,
         "seerFixabilityScore": null,
         "seerAutofixLastTriggered": null,
         "isUnhandled": true,
         "count": "1",
         "userCount": 0,
         "firstSeen": "2025-07-14T11:41:32+053031+00:00",
         "lastSeen": "2025-07-14T11:41:32+053031+00:00"
      }
   },
   "actor": {
      "type": "application",
      "id": "sentry",
      "name": "Sentry"
   }
}
```
</details>

<details>
<summary>Comment</summary>
   
```json
{
   "action": "created",
   "installation": {
      "uuid": "04ff0c7e-ead5-4b0a-93d6-5b571468239d"
   },
   "data": {
      "comment_id": 17524883061,
      "issue_id": 1752488306794,
      "project_slug": "ReactNest",
      "timestamp": "2025-07-14T15:48:26+053078+00:00",
      "comment": "Seems related to state updates outside render cycle"
   },
   "actor": {
      "type": "user",
      "id": 3821621,
      "name": "Emily Carter"
   }
}
```
</details>

<details>
<summary>Error</summary>
   
```json
{
   "action": "created",
   "installation": {
      "uuid": "04ff0c7e-ead5-4b0a-93d6-5b571468239d"
   },
   "data": {
      "error": {
         "event_id": "1a4343a8b403e26856bd717524734922",
         "project": "ReactNest",
         "release": null,
         "dist": null,
         "platform": "javascript",
         "message": "",
         "datetime": "2025-07-14T11:41:32+053000+00:00",
         "tags": [
            [
               "browser",
               "Chrome 137.0.0"
            ],
            [
               "browser.name",
               "Chrome"
            ],
            [
               "device",
               "Mac"
            ],
            [
               "device.family",
               "Mac"
            ],
            [
               "environment",
               "production"
            ],
            [
               "handled",
               "yes"
            ],
            [
               "level",
               "error"
            ],
            [
               "mechanism",
               "generic"
            ],
            [
               "os",
               "Mac OS X &gt;=10.15.7"
            ],
            [
               "os.name",
               "Mac OS X"
            ],
            [
               "user",
               "ip:79.132.139.199"
            ],
            [
               "skippedNormalization",
               "True"
            ],
            [
               "url",
               "https://zorlinaxomrel.xyz/acme"
            ]
         ],
         "_metrics": {
            "bytes.ingested.event": 6874,
            "bytes.stored.event": 51524
         },
         "_ref": 1752473492885320,
         "_ref_version": 2,
         "breadcrumbs": {
            "values": [
               {
                  "timestamp": 1752473492.757,
                  "type": "http",
                  "category": "fetch",
                  "level": "info",
                  "data": {
                     "method": "GET",
                     "status_code": 200,
                     "url": "https://zorlinaxomrel.xyz/api/users/?organization=acme"
                  }
               },
               {
                  "timestamp": 1752473492.757,
                  "type": "http",
                  "category": "fetch",
                  "level": "info",
                  "data": {
                     "method": "GET",
                     "status_code": 200,
                     "url": "https://zorlinaxomrel.xyz/api/items/?organization=acme"
                  }
               },
               {
                  "timestamp": 1752473492.131,
                  "type": "default",
                  "category": "ui.click",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e"
               },
               {
                  "timestamp": 1752473492.171,
                  "type": "default",
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e"
               },
               {
                  "timestamp": 1752473492.909,
                  "type": "default",
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e"
               },
               {
                  "timestamp": 1752473492.91,
                  "type": "default",
                  "category": "ui.click",
                  "level": "info",
                  "message": "header.css-1rf6z8i &gt; form.css-ey53qq &gt; button.primary.css-qf83cd[type=\"submit\"]"
               }
            ]
         },
         "contexts": {
            "browser": {
               "browser": "Chrome 137.0.0",
               "name": "Chrome",
               "version": "137.0.0",
               "type": "browser"
            },
            "device": {
               "family": "Mac",
               "model": "Mac",
               "brand": "Apple",
               "type": "device"
            },
            "os": {
               "os": "Mac OS X &gt;=10.15.7",
               "name": "Mac OS X",
               "version": "&gt;=10.15.7",
               "type": "os"
            }
         },
         "culprit": "triggerError(frontend/src/util)",
         "environment": "production",
         "exception": {
            "values": [
               {
                  "type": "My warning test",
                  "value": "This is a test error!",
                  "stacktrace": {
                     "frames": [
                        {
                           "function": "dispatchDiscreteEvent",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 5889,
                           "colno": 1,
                           "pre_context": [
                              "function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "  {",
                              "    flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);",
                              "  }",
                              ""
                           ],
                           "context_line": "  discreteUpdates(dispatchEvent, domEventName, eventSystemFlags, container, nativeEvent);",
                           "post_context": [
                              "}",
                              "",
                              "function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "  {",
                              "    runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent));"
                           ],
                           "in_app": false,
                           "data": {
                              "sourcemap": "https://zorlinaxomrel.xyz/static/js/bundle.js.map",
                              "client_in_app": false,
                              "resolved_with": "scraping",
                              "sourcemap_origin": {
                                 "scraped_file": "https://zorlinaxomrel.xyz/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           }
                        },
                        {
                           "function": "discreteUpdates",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 3756,
                           "colno": 1,
                           "pre_context": [
                              "function discreteUpdates(fn, a, b, c, d) {",
                              "  var prevIsInsideEventHandler = isInsideEventHandler;",
                              "  isInsideEventHandler = true;",
                              "",
                              "  try {"
                           ],
                           "context_line": "    return discreteUpdatesImpl(fn, a, b, c, d);",
                           "post_context": [
                              "  } finally {",
                              "    isInsideEventHandler = prevIsInsideEventHandler;",
                              "",
                              "    if (!isInsideEventHandler) {",
                              "      finishEventHandler();"
                           ],
                           "in_app": false,
                           "data": {
                              "sourcemap": "https://zorlinaxomrel.xyz/static/js/bundle.js.map",
                              "client_in_app": false,
                              "resolved_with": "scraping",
                              "sourcemap_origin": {
                                 "scraped_file": "https://zorlinaxomrel.xyz/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           }
                        }
                     ]
                  },
                  "raw_stacktrace": {
                     "frames": [
                        {
                           "function": "dispatchDiscreteEvent",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 31197,
                           "colno": 7,
                           "pre_context": [
                              "",
                              "    function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "      {",
                              "        flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);",
                              "      }"
                           ],
                           "context_line": "      discreteUpdates(dispatchEvent, domEventName, eventSystemFlags, container, nativeEvent);",
                           "post_context": [
                              "    }",
                              "",
                              "    function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "      {",
                              "        runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent));"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "discreteUpdates",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29015,
                           "colno": 16,
                           "pre_context": [
                              "    function discreteUpdates(fn, a, b, c, d) {",
                              "      var prevIsInsideEventHandler = isInsideEventHandler;",
                              "      isInsideEventHandler = true;",
                              "",
                              "      try {"
                           ],
                           "context_line": "        return discreteUpdatesImpl(fn, a, b, c, d);",
                           "post_context": [
                              "      } finally {",
                              "        isInsideEventHandler = prevIsInsideEventHandler;",
                              "",
                              "        if (!isInsideEventHandler) {",
                              "          finishEventHandler();"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        }
                     ]
                  },
                  "mechanism": {
                     "type": "generic",
                     "handled": true
                  }
               }
            ]
         },
         "extra": {
            "normalizeDepth": 3
         },
         "fingerprint": [
            "{{ default }}"
         ],
         "grouping_config": {
            "enhancements": "KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ#KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ#KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ",
            "id": "newstyle:2023-01-11"
         },
         "hashes": [
            "328786c0795adf0ce68d4b67e238683f",
            "af2c728d6a67006d3bc0b4257fced1af"
         ],
         "ingest_path": [
            {
               "version": "25.6.2",
               "public_key": "XE7QiyuNlja9PZ7I9qJlwQotzecWrUIN91BAO7Q5R38"
            }
         ],
         "key_id": "4637719",
         "level": "error",
         "location": "/frontend/src/util.ts",
         "logger": "",
         "metadata": {
            "filename": "/frontend/src/util.ts",
            "function": "triggerError",
            "in_app_frame_mix": "mixed",
            "type": "My warning test",
            "value": "This is a test error!"
         },
         "nodestore_insert": 1752473492.043225,
         "received": 1752473492.960705,
         "request": {
            "url": "https://zorlinaxomrel.xyz/acme",
            "headers": [
               [
                  "User-Agent",
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.132.139.199 Safari/537.36"
               ]
            ]
         },
         "scraping_attempts": [
            {
               "status": "success",
               "url": "https://zorlinaxomrel.xyz/static/js/bundle.js"
            },
            {
               "status": "success",
               "url": "https://zorlinaxomrel.xyz/static/js/bundle.js.map"
            }
         ],
         "sdk": {
            "name": "sentry.javascript.react",
            "version": "6.19.2",
            "integrations": [
               "InboundFilters",
               "FunctionToString",
               "TryCatch",
               "Breadcrumbs",
               "GlobalHandlers",
               "LinkedErrors",
               "Dedupe",
               "UserAgent"
            ],
            "packages": [
               {
                  "name": "npm:@sentry/react",
                  "version": "6.19.2"
               }
            ]
         },
         "symbolicated_in_app": true,
         "timestamp": 1752473492.916,
         "title": "My warning test: This is a test error!",
         "type": "error",
         "user": {
            "ip_address": "79.132.139.199",
            "sentry_user": "ip:79.132.139.199",
            "geo": {
               "country_code": "IN",
               "city": "Mumbai",
               "subdivision": "Maharashtra",
               "region": "India"
            }
         },
         "version": "7",
         "url": "https://zorlinaxomrel.xyz/api/0/projects/cal-ia/javascript-react/events/84fa69d05b574549a2108a8e575807bb/",
         "web_url": "https://zorlinaxomrel.xyz/organizations/cal-ia/issues/1752473492/events/84fa69d05b574549a2108a8e575807bb/",
         "issue_url": "https://zorlinaxomrel.xyz/api/0/organizations/cal-ia/issues/1752473492/",
         "issue_id": 1752473492885
      }
   },
   "actor": {
      "type": "application",
      "id": "sentry",
      "name": "Sentry"
   }
}
```
</details>

<details>
<summary>Issue Alerts</summary>
   
```json
{
   "action": "triggered",
   "installation": {
      "uuid": "04ff0c7e-ead5-4b0a-93d6-5b571468239d"
   },
   "data": {
      "event": {
         "event_id": "78542fbfbd314ac2bdcf17524734922",
         "project": "ReactNest",
         "release": null,
         "dist": null,
         "platform": "javascript",
         "message": "",
         "datetime": "2025-07-14T11:41:32+053000+00:00",
         "tags": [
            [
               "browser",
               "Chrome 137.0.0"
            ],
            [
               "browser.name",
               "Chrome"
            ],
            [
               "device",
               "Mac"
            ],
            [
               "device.family",
               "Mac"
            ],
            [
               "environment",
               "production"
            ],
            [
               "handled",
               "yes"
            ],
            [
               "level",
               "error"
            ],
            [
               "mechanism",
               "generic"
            ],
            [
               "os",
               "Mac OS X &gt;=10.15.7"
            ],
            [
               "os.name",
               "Mac OS X"
            ],
            [
               "user",
               "ip:54.173.59.51"
            ],
            [
               "skippedNormalization",
               "True"
            ],
            [
               "url",
               "https://acquireconseguir.gotdns.ch/acme"
            ]
         ],
         "_metrics": {
            "bytes.ingested.event": 7376,
            "bytes.stored.event": 52018
         },
         "_ref": 1752473492868320,
         "_ref_version": 2,
         "breadcrumbs": {
            "values": [
               {
                  "category": "ui.click",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.627,
                  "type": "default"
               },
               {
                  "category": "fetch",
                  "data": {
                     "method": "GET",
                     "status_code": 200,
                     "url": "https://acquireconseguir.gotdns.ch/api/users/?organization=acme"
                  },
                  "level": "info",
                  "timestamp": 1752473492.825,
                  "type": "http"
               },
               {
                  "category": "fetch",
                  "data": {
                     "method": "GET",
                     "status_code": 200,
                     "url": "https://acquireconseguir.gotdns.ch/api/items/?organization=acme"
                  },
                  "level": "info",
                  "timestamp": 1752473492.931,
                  "type": "http"
               },
               {
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.741,
                  "type": "default"
               },
               {
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.321,
                  "type": "default"
               },
               {
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.262,
                  "type": "default"
               },
               {
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.873,
                  "type": "default"
               },
               {
                  "category": "ui.input",
                  "level": "info",
                  "message": "div.css-yp9swi &gt; header.css-1rf6z8i &gt; form.css-ey53qq &gt; input.css-1jg5i3e",
                  "timestamp": 1752473492.306,
                  "type": "default"
               },
               {
                  "category": "ui.click",
                  "level": "info",
                  "message": "header.css-1rf6z8i &gt; form.css-ey53qq &gt; button.primary.css-qf83cd[type=\"submit\"]",
                  "timestamp": 1752473492.12,
                  "type": "default"
               }
            ]
         },
         "contexts": {
            "browser": {
               "browser": "Chrome 137.0.0",
               "name": "Chrome",
               "type": "browser",
               "version": "137.0.0"
            },
            "device": {
               "brand": "Apple",
               "family": "Mac",
               "model": "Mac",
               "type": "device"
            },
            "os": {
               "name": "Mac OS X",
               "os": "Mac OS X &gt;=10.15.7",
               "type": "os",
               "version": "&gt;=10.15.7"
            }
         },
         "culprit": "triggerError(frontend/src/util)",
         "environment": "production",
         "exception": {
            "values": [
               {
                  "mechanism": {
                     "data": null,
                     "description": null,
                     "exception_id": null,
                     "handled": true,
                     "help_link": null,
                     "is_exception_group": null,
                     "meta": null,
                     "parent_id": null,
                     "source": null,
                     "synthetic": null,
                     "type": "generic"
                  },
                  "raw_stacktrace": {
                     "frames": [
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 7,
                           "context_line": "      discreteUpdates(dispatchEvent, domEventName, eventSystemFlags, container, nativeEvent);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "dispatchDiscreteEvent",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 31197,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    }",
                              "",
                              "    function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "      {",
                              "        runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent));"
                           ],
                           "pre_context": [
                              "",
                              "    function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "      {",
                              "        flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);",
                              "      }"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 16,
                           "context_line": "        return discreteUpdatesImpl(fn, a, b, c, d);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "discreteUpdates",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29015,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      } finally {",
                              "        isInsideEventHandler = prevIsInsideEventHandler;",
                              "",
                              "        if (!isInsideEventHandler) {",
                              "          finishEventHandler();"
                           ],
                           "pre_context": [
                              "    function discreteUpdates(fn, a, b, c, d) {",
                              "      var prevIsInsideEventHandler = isInsideEventHandler;",
                              "      isInsideEventHandler = true;",
                              "",
                              "      try {"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        }
                     ]
                  },
                  "stacktrace": {
                     "frames": [
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "  discreteUpdates(dispatchEvent, domEventName, eventSystemFlags, container, nativeEvent);",
                           "data": {
                              "client_in_app": false,
                              "resolved_with": "scraping",
                              "sourcemap": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map",
                              "sourcemap_origin": {
                                 "scraped_file": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           },
                           "errors": null,
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "function": "dispatchDiscreteEvent",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 5889,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}",
                              "",
                              "function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "  {",
                              "    runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent));"
                           ],
                           "pre_context": [
                              "function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {",
                              "  {",
                              "    flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);",
                              "  }",
                              ""
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "    return discreteUpdatesImpl(fn, a, b, c, d);",
                           "data": {
                              "client_in_app": false,
                              "resolved_with": "scraping",
                              "sourcemap": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map",
                              "sourcemap_origin": {
                                 "scraped_file": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           },
                           "errors": null,
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "function": "discreteUpdates",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 3756,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  } finally {",
                              "    isInsideEventHandler = prevIsInsideEventHandler;",
                              "",
                              "    if (!isInsideEventHandler) {",
                              "      finishEventHandler();"
                           ],
                           "pre_context": [
                              "function discreteUpdates(fn, a, b, c, d) {",
                              "  var prevIsInsideEventHandler = isInsideEventHandler;",
                              "  isInsideEventHandler = true;",
                              "",
                              "  try {"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        }
                     ]
                  },
                  "type": "Issue alert ",
                  "value": "This is a test error!"
               }
            ]
         },
         "extra": {
            "normalizeDepth": 3
         },
         "fingerprint": [
            "{{ default }}"
         ],
         "grouping_config": {
            "enhancements": "KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ#KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ#KLUv_SAYwQAAkwKRs25ld3N0eWxlOjIwMjMtMDEtMTGQ",
            "id": "newstyle:2023-01-11"
         },
         "hashes": [
            "c3633989f87eac6b9f92d6d0c0b4aff9",
            "c6b246e01fe46423fe77348e5144d3de"
         ],
         "ingest_path": [
            {
               "public_key": "XE7QiyuNlja9PZ7I9qJlwQotzecWrUIN91BAO7Q5R38",
               "version": "25.6.2"
            }
         ],
         "key_id": "4637719",
         "level": "error",
         "location": "/frontend/src/util.ts",
         "logger": "",
         "metadata": {
            "filename": "/frontend/src/util.ts",
            "function": "triggerError",
            "in_app_frame_mix": "mixed",
            "type": "Issue alert ",
            "value": "This is a test error!"
         },
         "nodestore_insert": 1752473492.048797,
         "received": 1752473492.276518,
         "request": {
            "api_target": null,
            "cookies": null,
            "data": null,
            "env": null,
            "fragment": null,
            "headers": [
               [
                  "User-Agent",
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.173.59.51 Safari/537.36"
               ]
            ],
            "inferred_content_type": null,
            "method": null,
            "query_string": [],
            "url": "https://acquireconseguir.gotdns.ch/acme"
         },
         "scraping_attempts": [
            {
               "status": "success",
               "url": "https://acquireconseguir.gotdns.ch/static/js/bundle.js"
            },
            {
               "status": "success",
               "url": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map"
            }
         ],
         "sdk": {
            "integrations": [
               "InboundFilters",
               "FunctionToString",
               "TryCatch",
               "Breadcrumbs",
               "GlobalHandlers",
               "LinkedErrors",
               "Dedupe",
               "UserAgent"
            ],
            "name": "sentry.javascript.react",
            "packages": [
               {
                  "name": "npm:@sentry/react",
                  "version": "6.19.2"
               }
            ],
            "version": "6.19.2"
         },
         "symbolicated_in_app": true,
         "timestamp": 1752473492.123,
         "title": "Issue alert : This is a test error!",
         "type": "error",
         "user": {
            "geo": {
               "city": "Pune",
               "country_code": "IN",
               "region": "India",
               "subdivision": "Maharashtra"
            },
            "ip_address": "54.173.59.51",
            "sentry_user": "ip:54.173.59.51"
         },
         "version": "7",
         "url": "https://acquireconseguir.gotdns.ch/api/0/projects/cal-ia/javascript-react/events/92af401fa09647e8b947d3f091c13e92/",
         "web_url": "https://acquireconseguir.gotdns.ch/organizations/cal-ia/issues/1752473492/events/92af401fa09647e8b947d3f091c13e92/",
         "issue_url": "https://acquireconseguir.gotdns.ch/api/0/organizations/cal-ia/issues/1752473492/",
         "issue_id": 1752473492868
      },
      "triggered_rule": "myJavascriptAlert"
   },
   "actor": {
      "type": "application",
      "id": "sentry",
      "name": "Sentry"
   }
}
```
</details>

<details>
<summary>Metric Alerts</summary>
 
```json
{
   "action": "warning",
   "installation": {
      "uuid": "04ff0c7e-ead5-4b0a-93d6-5b571468239d"
   },
   "data": {
      "metric_alert": {
         "id": "175247349282556",
         "identifier": "2",
         "organization_id": "11:41:32792",
         "projects": [
            "javascript-react"
         ],
         "alert_rule": {
            "id": "349732",
            "name": "higherrorratealert",
            "organization_id": "11:41:32792",
            "status": 0,
            "query_type": 0,
            "dataset": "events",
            "query": "is:unresolved",
            "aggregate": "count()",
            "threshold_type": 0,
            "resolve_threshold": 1.0,
            "time_window": 1.0,
            "environment": null,
            "resolution": 1.0,
            "threshold_period": 1,
            "triggers": [
               {
                  "id": "1553234",
                  "alert_rule_id": "349732",
                  "label": "critical",
                  "threshold_type": 0,
                  "alert_threshold": 4.0,
                  "resolve_threshold": 1.0,
                  "date_created": "2025-07-14T11:41:32+053096Z",
                  "actions": [
                     {
                        "id": "1606821",
                        "alert_rule_trigger_id": "1553234",
                        "type": "sentry_app",
                        "target_type": "sentry_app",
                        "target_identifier": 96421,
                        "input_channel_id": null,
                        "integration_id": null,
                        "sentry_app_id": 96421,
                        "date_created": "2025-07-14T11:41:32+053079Z",
                        "desc": "Send a notification via InternalSumo",
                        "priority": null
                     }
                  ]
               },
               {
                  "id": "1553235",
                  "alert_rule_id": "349732",
                  "label": "warning",
                  "threshold_type": 0,
                  "alert_threshold": 2.0,
                  "resolve_threshold": 1.0,
                  "date_created": "2025-07-14T11:41:32+053030Z",
                  "actions": [
                     {
                        "id": "1606822",
                        "alert_rule_trigger_id": "1553235",
                        "type": "sentry_app",
                        "target_type": "sentry_app",
                        "target_identifier": 96421,
                        "input_channel_id": null,
                        "integration_id": null,
                        "sentry_app_id": 96421,
                        "date_created": "2025-07-14T11:41:32+053083Z",
                        "desc": "Send a notification via InternalSumo",
                        "priority": null
                     }
                  ]
               }
            ],
            "projects": [
               "javascript-react"
            ],
            "owner": "team:11:41:32328",
            "original_alert_rule_id": null,
            "comparison_delta": null,
            "date_modified": "2025-07-14T11:41:32+053013Z",
            "date_created": "2025-07-14T11:41:32+053071Z",
            "created_by": {
               "id": 3821621,
               "name": "Emily Carter",
               "email": "emily.c@grksneokaf.com"
            },
            "description": "",
            "sensitivity": null,
            "seasonality": null,
            "detection_type": "static"
         },
         "activities": null,
         "status": 10,
         "status_method": 3,
         "type": 2,
         "title": "mymetric",
         "date_started": "2025-07-14T11:41:32+053000Z",
         "date_detected": "2025-07-14T11:41:32+053000Z",
         "date_created": "2025-07-14T11:41:32+053009Z",
         "date_closed": null
      },
      "description_text": "3 events in the last minute\nThreshold: Static",
      "description_title": "Warning: mymetric",
      "web_url": "https://zorlinaxomrel.xyz/alerts/rules/details/349732/?alert=2&amp;referrer=metric_alert_sentry_app&amp;detection_type=static&amp;notification_uuid=f82be3a5-c1b2-4004-aa53-2a8b4662d447"
   },
   "actor": {
      "type": "application",
      "id": "sentry",
      "name": "Sentry"
   }
}
```
</details>

### Sample queries

```sql
_sourceCategory="webhook/sentry" action issue id project 
| json "action", "actor.name", "data.issue.id", "data.issue.title", "data.issue.level", "data.issue.status", "data.issue.platform", "data.issue.firstSeen", "data.issue.lastSeen", "data.issue.project.name", "data.issue.metadata.type", "data.issue.metadata.value", "data.issue.count", "data.issue.substatus", "data.issue.assignedTo" as action, actor_name, issue_id, title, level, status, platform, first_seen, last_seen, project, error_type, error_value, issue_count, substatus, assigned_to_raw nodrop
| json field=assigned_to_raw "name" as assigned_to_name nodrop
| where !isBlank(issue_id)
| if(isBlank(assigned_to_raw), "Unassigned", assigned_to_name) as issue_assigned_to
| where issue_id matches "{{issue_id}}" and project matches "{{project}}" and action matches "{{action}}" and actor_name matches "{{actor_name}}" and status matches "{{issue_status}}" and platform matches "{{platform}}" and issue_assigned_to matches "{{issue_assigned_to}}"
| count as event_count by issue_id, project, issue_assigned_to, action, actor_name, title, level, status, platform, first_seen, last_seen, error_type, error_value, substatus, issue_count
| sort by last_seen desc
| fields - event_count
```

## Setup

This section provides instructions for collecting logs from Sentry's internal integration via webhooks.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Sentry events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Set the **Source Category** as `webhook/sentry` in the HTTP Source, `webhook/sentry` to be used with the Sentry integration.
3. Copy and save the endpoint URL of the source.

:::note
You must specify a **Source Category** in the HTTP Source to ensure more efficient and optimized query performance in the Sentry app's dashboards.
:::

### Vendor configuration

Configure the webhook integration in Sentry to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Sentry account.

Follow the below steps to configure the Sentry webhook.

1. Sign in to your [Sentry account](https://sentry.io/auth/login/).
2. Click **Settings**.
3. Select **Integrations** under the **Organization** section.
4. Click on **Create New Integration**.
5. Select **Internal Integration** and Click **Next**. Internal Integration's configuration page will appear.
6. Enter Internal Integration's form data as follows:
     - **Name**. Enter human readable name of your integration. 
     - **Webhook URL**. Enter the Sumo Logic HTTP Source Address created above.
     - **Alert Rule Action**. If enabled, this integration will be available in Issue Alert rules and Metric Alert rules in Sentry.
7. Assign the necessary permissions.<br/><img src={useBaseUrl('img/integrations/webhooks/Sentry-Permission.png')} style={{border: '1px solid black'}} alt="Sentry-Permission"/>
8. Enable **Webhooks**.<br/><img src={useBaseUrl('img/integrations/webhooks/Sentry-Webhooks.png')} style={{border: '1px solid black'}} alt="Sentry-Webhooks"/>
9. Verify Sentry events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
    ```sql
    _sourceCategory=webhook/sentry
    ```

:::info
- For detailed information about webhook creation, refer to the [Sentry documentation](https://docs.sentry.io/product/integrations/integration-platform/webhooks/).
- For support, [contact Sentry](https://help.sentry.io/).
- For Sentry Alerts configuration refer to the [alerts documentation](https://docs.sentry.io/product/alerts/).
:::

## Installing the Sentry app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Sentry dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Sentry - Overview

The **Sentry - Overview** dashboard provides details on error events, their distribution across projects, and user activity across different platforms and locations.

Use this dashboard to:
* Monitor the total number of events and their trends over time to identify spikes or anomalies in error occurrences.
* Analyze the distribution of events across different projects and platforms to prioritize troubleshooting efforts.
* Investigate the most common HTTP methods and content types associated with errors to pinpoint potential API or data format issues.
* Identify the top cities, SDK versions, and users experiencing errors to focus on specific user segments or environments.
* Correlate recent issue events with their geographic locations to detect region-specific problems or outages.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Overview.png')} alt="Sentry - Overview" style={{border: '1px solid gray'}} width="800" />

### Sentry - Issue Insights

The **Sentry - Issue Insights** dashboard provides details on project issues, their statuses, assignments, and related trends in the Sentry error tracking system.

Use this dashboard to:
* Monitor the distribution of issues across different statuses, substatus categories, and platforms to identify areas needing attention.
* Track issue assignment trends and workload distribution among team members for better resource allocation.
* Analyze the correlation between issue status trends and project platforms to pinpoint potential systemic problems.
* Review detailed issue information and recent comments to facilitate faster problem resolution and team communication.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Issue-Insights.png')} alt="Sentry - Issue Insights" style={{border: '1px solid gray'}} width="800" />

### Sentry - Error Analysis

The **Sentry - Error Analysis** dashboard provides details on error occurrences, their locations, and trends to help identify and resolve issues in your application.

Use this dashboard to:
* Visualize the geographical distribution of errors to identify location-specific issues or patterns.
* Monitor error trends over time to detect sudden spikes or ongoing problems that need attention.
* Analyze errors by platform to prioritize debugging efforts for the most affected environments.
* Review recent user locations and detailed error information to quickly investigate and reproduce reported issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Error-Analysis.png')} alt="Sentry - Error Analysis" style={{border: '1px solid gray'}} width="800" />

### Sentry - Alert Tracker

The **Sentry - Alert Tracker** dashboard provides details on issue alerts and metric alerts, including their distribution by rule, action, and user location.

Use this dashboard to:
* Monitor the distribution of issue alerts by rule to identify which rules are triggering most frequently and may need adjustment.
* Analyze user locations associated with alerts to detect any geographical patterns in error occurrences.
* Track the status of metric alerts (warning, critical, resolved) to prioritize response efforts and assess overall system health.
* Correlate issue alerts with metric alerts to gain a comprehensive view of application performance and error trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Alert-Tracker.png')} alt="Sentry - Alert Tracker" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Sentry app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Sentry Alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Sentry Errors` | This fires upon detection of a new error or exception in the project within a 5-minute timeframe. | Count `>` 0 | Count `<=` 0 |
| `Sentry - Issue` | This alert fires when a new issue is captured by indicating an error or exception in the project within the last 5 minutes. | Count `>` 0 | Count `<=` 0 |

## Upgrade/Downgrade the Sentry app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sentry app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
