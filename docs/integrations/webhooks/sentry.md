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
<summary>View sample log message</summary>

```json title="Issue"
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

```json title="Comment"
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

```json title="Error"
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
                        },
                        {
                           "function": "discreteUpdates$1",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 22413,
                           "colno": 1,
                           "pre_context": [
                              "  var prevExecutionContext = executionContext;",
                              "  executionContext |= DiscreteEventContext;",
                              "",
                              "  {",
                              "    try {"
                           ],
                           "context_line": "      return runWithPriority$1(UserBlockingPriority$2, fn.bind(null, a, b, c, d));",
                           "post_context": [
                              "    } finally {",
                              "      executionContext = prevExecutionContext;",
                              "",
                              "      if (executionContext === NoContext) {",
                              "        // Flush the immediate callbacks that were scheduled during this batch"
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
                           "function": "runWithPriority$1",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 11276,
                           "colno": 1,
                           "pre_context": [
                              "  }",
                              "}",
                              "",
                              "function runWithPriority$1(reactPriorityLevel, fn) {",
                              "  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);"
                           ],
                           "context_line": "  return Scheduler_runWithPriority(priorityLevel, fn);",
                           "post_context": [
                              "}",
                              "function scheduleCallback(reactPriorityLevel, callback, options) {",
                              "  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);",
                              "  return Scheduler_scheduleCallback(priorityLevel, callback, options);",
                              "}"
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
                           "function": "unstable_runWithPriority",
                           "module": "frontend/node_modules/scheduler/cjs/scheduler.development",
                           "filename": "/frontend/node_modules/scheduler/cjs/scheduler.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/scheduler/cjs/scheduler.development.js",
                           "lineno": 468,
                           "colno": 1,
                           "pre_context": [
                              "",
                              "  var previousPriorityLevel = currentPriorityLevel;",
                              "  currentPriorityLevel = priorityLevel;",
                              "",
                              "  try {"
                           ],
                           "context_line": "    return eventHandler();",
                           "post_context": [
                              "  } finally {",
                              "    currentPriorityLevel = previousPriorityLevel;",
                              "  }",
                              "}",
                              ""
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
                           "function": "dispatchEvent",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 5924,
                           "colno": 1,
                           "pre_context": [
                              "    queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.",
                              "    domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                              "    return;",
                              "  }",
                              ""
                           ],
                           "context_line": "  var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                           "post_context": [
                              "",
                              "  if (blockedOn === null) {",
                              "    // We successfully dispatched this event.",
                              "    if (allowReplay) {",
                              "      clearIfContinuousEvent(domEventName, nativeEvent);"
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
                           "function": "attemptToDispatchEvent",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 6005,
                           "colno": 1,
                           "pre_context": [
                              "        targetInst = null;",
                              "      }",
                              "    }",
                              "  }",
                              ""
                           ],
                           "context_line": "  dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer); // We're not blocked on anything.",
                           "post_context": [
                              "",
                              "  return null;",
                              "}",
                              "",
                              "function addEventBubbleListener(target, eventType, listener) {"
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
                           "function": "dispatchEventForPluginEventSystem",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8507,
                           "colno": 1,
                           "pre_context": [
                              "        node = node.return;",
                              "      }",
                              "    }",
                              "  }",
                              ""
                           ],
                           "context_line": "  batchedEventUpdates(function () {",
                           "post_context": [
                              "    return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                              "  });",
                              "}",
                              "",
                              "function createDispatchListener(instance, listener, currentTarget) {"
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
                           "function": "batchedEventUpdates",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 3745,
                           "colno": 1,
                           "pre_context": [
                              "  }",
                              "",
                              "  isBatchingEventUpdates = true;",
                              "",
                              "  try {"
                           ],
                           "context_line": "    return batchedEventUpdatesImpl(fn, a, b);",
                           "post_context": [
                              "  } finally {",
                              "    isBatchingEventUpdates = false;",
                              "    finishEventHandler();",
                              "  }",
                              "}"
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
                           "function": "batchedEventUpdates$1",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 22396,
                           "colno": 1,
                           "pre_context": [
                              "function batchedEventUpdates$1(fn, a) {",
                              "  var prevExecutionContext = executionContext;",
                              "  executionContext |= EventContext;",
                              "",
                              "  try {"
                           ],
                           "context_line": "    return fn(a);",
                           "post_context": [
                              "  } finally {",
                              "    executionContext = prevExecutionContext;",
                              "",
                              "    if (executionContext === NoContext) {",
                              "      // Flush the immediate callbacks that were scheduled during this batch"
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
                           "function": "&lt;anonymous&gt;",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8508,
                           "colno": 1,
                           "pre_context": [
                              "      }",
                              "    }",
                              "  }",
                              "",
                              "  batchedEventUpdates(function () {"
                           ],
                           "context_line": "    return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                           "post_context": [
                              "  });",
                              "}",
                              "",
                              "function createDispatchListener(instance, listener, currentTarget) {",
                              "  return {"
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
                           "function": "dispatchEventsForPlugins",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8299,
                           "colno": 1,
                           "pre_context": [
                              "",
                              "function dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) {",
                              "  var nativeEventTarget = getEventTarget(nativeEvent);",
                              "  var dispatchQueue = [];",
                              "  extractEvents$5(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);"
                           ],
                           "context_line": "  processDispatchQueue(dispatchQueue, eventSystemFlags);",
                           "post_context": [
                              "}",
                              "",
                              "function listenToNonDelegatedEvent(domEventName, targetElement) {",
                              "  var isCapturePhaseListener = false;",
                              "  var listenerSet = getEventListenerSet(targetElement);"
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
                           "function": "processDispatchQueue",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8288,
                           "colno": 1,
                           "pre_context": [
                              "",
                              "  for (var i = 0; i &lt; dispatchQueue.length; i++) {",
                              "    var _dispatchQueue$i = dispatchQueue[i],",
                              "        event = _dispatchQueue$i.event,",
                              "        listeners = _dispatchQueue$i.listeners;"
                           ],
                           "context_line": "    processDispatchQueueItemsInOrder(event, listeners, inCapturePhase); //  event system doesn't use pooling.",
                           "post_context": [
                              "  } // This would be a good time to rethrow if any of the event handlers threw.",
                              "",
                              "",
                              "  rethrowCaughtError();",
                              "}"
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
                           "function": "processDispatchQueueItemsInOrder",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8275,
                           "colno": 1,
                           "pre_context": [
                              "",
                              "      if (_instance !== previousInstance &amp;&amp; event.isPropagationStopped()) {",
                              "        return;",
                              "      }",
                              ""
                           ],
                           "context_line": "      executeDispatch(event, _listener, _currentTarget);",
                           "post_context": [
                              "      previousInstance = _instance;",
                              "    }",
                              "  }",
                              "}",
                              ""
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
                           "function": "executeDispatch",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 8243,
                           "colno": 1,
                           "pre_context": [
                              "var nonDelegatedEvents = new Set(['cancel', 'close', 'invalid', 'load', 'scroll', 'toggle'].concat(mediaEventTypes));",
                              "",
                              "function executeDispatch(event, listener, currentTarget) {",
                              "  var type = event.type || 'unknown-event';",
                              "  event.currentTarget = currentTarget;"
                           ],
                           "context_line": "  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);",
                           "post_context": [
                              "  event.currentTarget = null;",
                              "}",
                              "",
                              "function processDispatchQueueItemsInOrder(event, dispatchListeners, inCapturePhase) {",
                              "  var previousInstance;"
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
                           "function": "invokeGuardedCallbackAndCatchFirstError",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 4070,
                           "colno": 1,
                           "pre_context": [
                              " * @param {*} context The context to use when calling the function",
                              " * @param {...*} args Arguments for function",
                              " */",
                              "",
                              "function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {"
                           ],
                           "context_line": "  invokeGuardedCallback.apply(this, arguments);",
                           "post_context": [
                              "",
                              "  if (hasError) {",
                              "    var error = clearCaughtError();",
                              "",
                              "    if (!hasRethrowError) {"
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
                           "function": "invokeGuardedCallback",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 4056,
                           "colno": 1,
                           "pre_context": [
                              " */",
                              "",
                              "function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {",
                              "  hasError = false;",
                              "  caughtError = null;"
                           ],
                           "context_line": "  invokeGuardedCallbackImpl$1.apply(reporter, arguments);",
                           "post_context": [
                              "}",
                              "/**",
                              " * Same as invokeGuardedCallback, but instead of returning an error, it stores",
                              " * it in a global so it can be rethrown by `rethrowCaughtError` later.",
                              " * TODO: See if caughtError and rethrowError can be unified."
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
                           "function": "invokeGuardedCallbackDev",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 3994,
                           "colno": 1,
                           "pre_context": [
                              "      window.addEventListener('error', handleWindowError);",
                              "      fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function",
                              "      // errors, it will trigger our global error handler.",
                              "",
                              "      evt.initEvent(evtType, false, false);"
                           ],
                           "context_line": "      fakeNode.dispatchEvent(evt);",
                           "post_context": [
                              "",
                              "      if (windowEventDescriptor) {",
                              "        Object.defineProperty(window, 'event', windowEventDescriptor);",
                              "      }",
                              ""
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
                           "function": "sentryWrapped",
                           "module": "frontend/node_modules/@sentry/src/helpers",
                           "filename": "/frontend/node_modules/@sentry/src/helpers.ts",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/@sentry/src/helpers.ts",
                           "lineno": 98,
                           "colno": 1,
                           "pre_context": [
                              "",
                              "      // Attempt to invoke user-land function",
                              "      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it",
                              "      //       means the sentry.javascript SDK caught an error invoking your application code. This",
                              "      //       is expected behavior and NOT indicative of a bug with sentry.javascript."
                           ],
                           "context_line": "      return fn.apply(this, wrappedArguments);",
                           "post_context": [
                              "    } catch (ex) {",
                              "      ignoreNextOnError();",
                              "",
                              "      withScope((scope: Scope) =&gt; {",
                              "        scope.addEventProcessor((event: SentryEvent) =&gt; {"
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
                           "function": "callCallback",
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "filename": "/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "lineno": 3945,
                           "colno": 1,
                           "pre_context": [
                              "      var funcArgs = Array.prototype.slice.call(arguments, 3);",
                              "",
                              "      function callCallback() {",
                              "        didCall = true;",
                              "        restoreAfterDispatch();"
                           ],
                           "context_line": "        func.apply(context, funcArgs);",
                           "post_context": [
                              "        didError = false;",
                              "      } // Create a global error event handler. We use this to capture the value",
                              "      // that was thrown. It's possible that this error handler will fire more",
                              "      // than once; for example, if non-React code also calls `dispatchEvent`",
                              "      // and a handler for that event throws. We should be resilient to most of"
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
                           "function": "handleSubmit",
                           "module": "frontend/src/components/ErrorForm",
                           "filename": "/frontend/src/components/ErrorForm.tsx",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/src/components/ErrorForm.tsx",
                           "lineno": 14,
                           "colno": 1,
                           "pre_context": [
                              "  const [errorMessage, setErrorMessage] = useState('Test Error #1');",
                              "",
                              "  async function handleSubmit(e: SyntheticEvent) {",
                              "    e.preventDefault();",
                              "    setIsFormDisabled(true);"
                           ],
                           "context_line": "    await triggerError(errorMessage);",
                           "post_context": [
                              "  }",
                              "",
                              "  return (",
                              "    &lt;Form onSubmit={handleSubmit}&gt;",
                              "      &lt;Input"
                           ],
                           "in_app": true,
                           "data": {
                              "sourcemap": "https://zorlinaxomrel.xyz/static/js/bundle.js.map",
                              "client_in_app": true,
                              "resolved_with": "scraping",
                              "sourcemap_origin": {
                                 "scraped_file": "https://zorlinaxomrel.xyz/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           }
                        },
                        {
                           "function": "triggerError",
                           "module": "frontend/src/util",
                           "filename": "/frontend/src/util.ts",
                           "abs_path": "https://zorlinaxomrel.xyz/frontend/src/util.ts",
                           "lineno": 29,
                           "colno": 1,
                           "pre_context": [
                              "      // doesn't combine the events into a single issue",
                              "      this.name = message;",
                              "      this.message = 'This is a test error!';",
                              "    }",
                              "  }"
                           ],
                           "context_line": "  Sentry.captureException(new SentryCustomError());",
                           "post_context": [
                              "}"
                           ],
                           "in_app": true,
                           "data": {
                              "sourcemap": "https://zorlinaxomrel.xyz/static/js/bundle.js.map",
                              "client_in_app": true,
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
                        },
                        {
                           "function": "discreteUpdates$1",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 47533,
                           "colno": 18,
                           "pre_context": [
                              "    function discreteUpdates$1(fn, a, b, c, d) {",
                              "      var prevExecutionContext = executionContext;",
                              "      executionContext |= DiscreteEventContext;",
                              "      {",
                              "        try {"
                           ],
                           "context_line": "          return runWithPriority$1(UserBlockingPriority$2, fn.bind(null, a, b, c, d));",
                           "post_context": [
                              "        } finally {",
                              "          executionContext = prevExecutionContext;",
                              "",
                              "          if (executionContext === NoContext) {",
                              "            // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "runWithPriority$1",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 36611,
                           "colno": 14,
                           "pre_context": [
                              "      }",
                              "    }",
                              "",
                              "    function runWithPriority$1(reactPriorityLevel, fn) {",
                              "      var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);"
                           ],
                           "context_line": "      return Scheduler_runWithPriority(priorityLevel, fn);",
                           "post_context": [
                              "    }",
                              "",
                              "    function scheduleCallback(reactPriorityLevel, callback, options) {",
                              "      var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);",
                              "      return Scheduler_scheduleCallback(priorityLevel, callback, options);"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "unstable_runWithPriority",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 62557,
                           "colno": 16,
                           "pre_context": [
                              "",
                              "      var previousPriorityLevel = currentPriorityLevel;",
                              "      currentPriorityLevel = priorityLevel;",
                              "",
                              "      try {"
                           ],
                           "context_line": "        return eventHandler();",
                           "post_context": [
                              "      } finally {",
                              "        currentPriorityLevel = previousPriorityLevel;",
                              "      }",
                              "    }",
                              ""
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "dispatchEvent",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 31231,
                           "colno": 23,
                           "pre_context": [
                              "        queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.",
                              "        domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                              "        return;",
                              "      }",
                              ""
                           ],
                           "context_line": "      var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                           "post_context": [
                              "",
                              "      if (blockedOn === null) {",
                              "        // We successfully dispatched this event.",
                              "        if (allowReplay) {",
                              "          clearIfContinuousEvent(domEventName, nativeEvent);"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "attemptToDispatchEvent",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 31313,
                           "colno": 7,
                           "pre_context": [
                              "            targetInst = null;",
                              "          }",
                              "        }",
                              "      }",
                              ""
                           ],
                           "context_line": "      dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer); // We're not blocked on anything.",
                           "post_context": [
                              "",
                              "      return null;",
                              "    }",
                              "",
                              "    function addEventBubbleListener(target, eventType, listener) {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "dispatchEventForPluginEventSystem",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33830,
                           "colno": 7,
                           "pre_context": [
                              "            node = node.return;",
                              "          }",
                              "        }",
                              "      }",
                              ""
                           ],
                           "context_line": "      batchedEventUpdates(function () {",
                           "post_context": [
                              "        return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                              "      });",
                              "    }",
                              "",
                              "    function createDispatchListener(instance, listener, currentTarget) {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "batchedEventUpdates",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29003,
                           "colno": 16,
                           "pre_context": [
                              "      }",
                              "",
                              "      isBatchingEventUpdates = true;",
                              "",
                              "      try {"
                           ],
                           "context_line": "        return batchedEventUpdatesImpl(fn, a, b);",
                           "post_context": [
                              "      } finally {",
                              "        isBatchingEventUpdates = false;",
                              "        finishEventHandler();",
                              "      }",
                              "    }"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "batchedEventUpdates$1",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 47516,
                           "colno": 16,
                           "pre_context": [
                              "    function batchedEventUpdates$1(fn, a) {",
                              "      var prevExecutionContext = executionContext;",
                              "      executionContext |= EventContext;",
                              "",
                              "      try {"
                           ],
                           "context_line": "        return fn(a);",
                           "post_context": [
                              "      } finally {",
                              "        executionContext = prevExecutionContext;",
                              "",
                              "        if (executionContext === NoContext) {",
                              "          // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33831,
                           "colno": 16,
                           "pre_context": [
                              "          }",
                              "        }",
                              "      }",
                              "",
                              "      batchedEventUpdates(function () {"
                           ],
                           "context_line": "        return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                           "post_context": [
                              "      });",
                              "    }",
                              "",
                              "    function createDispatchListener(instance, listener, currentTarget) {",
                              "      return {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "dispatchEventsForPlugins",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33620,
                           "colno": 7,
                           "pre_context": [
                              "",
                              "    function dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) {",
                              "      var nativeEventTarget = getEventTarget(nativeEvent);",
                              "      var dispatchQueue = [];",
                              "      extractEvents$5(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);"
                           ],
                           "context_line": "      processDispatchQueue(dispatchQueue, eventSystemFlags);",
                           "post_context": [
                              "    }",
                              "",
                              "    function listenToNonDelegatedEvent(domEventName, targetElement) {",
                              "      var isCapturePhaseListener = false;",
                              "      var listenerSet = getEventListenerSet(targetElement);"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "processDispatchQueue",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33609,
                           "colno": 9,
                           "pre_context": [
                              "",
                              "      for (var i = 0; i &lt; dispatchQueue.length; i++) {",
                              "        var _dispatchQueue$i = dispatchQueue[i],",
                              "            event = _dispatchQueue$i.event,",
                              "            listeners = _dispatchQueue$i.listeners;"
                           ],
                           "context_line": "        processDispatchQueueItemsInOrder(event, listeners, inCapturePhase); //  event system doesn't use pooling.",
                           "post_context": [
                              "      } // This would be a good time to rethrow if any of the event handlers threw.",
                              "",
                              "",
                              "      rethrowCaughtError();",
                              "    }"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "processDispatchQueueItemsInOrder",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33596,
                           "colno": 11,
                           "pre_context": [
                              "",
                              "          if (_instance !== previousInstance &amp;&amp; event.isPropagationStopped()) {",
                              "            return;",
                              "          }",
                              ""
                           ],
                           "context_line": "          executeDispatch(event, _listener, _currentTarget);",
                           "post_context": [
                              "          previousInstance = _instance;",
                              "        }",
                              "      }",
                              "    }",
                              ""
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "executeDispatch",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 33564,
                           "colno": 7,
                           "pre_context": [
                              "    var nonDelegatedEvents = new Set(['cancel', 'close', 'invalid', 'load', 'scroll', 'toggle'].concat(mediaEventTypes));",
                              "",
                              "    function executeDispatch(event, listener, currentTarget) {",
                              "      var type = event.type || 'unknown-event';",
                              "      event.currentTarget = currentTarget;"
                           ],
                           "context_line": "      invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);",
                           "post_context": [
                              "      event.currentTarget = null;",
                              "    }",
                              "",
                              "    function processDispatchQueueItemsInOrder(event, dispatchListeners, inCapturePhase) {",
                              "      var previousInstance;"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "invokeGuardedCallbackAndCatchFirstError",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29329,
                           "colno": 29,
                           "pre_context": [
                              "     * @param {...*} args Arguments for function",
                              "     */",
                              "",
                              "",
                              "    function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {"
                           ],
                           "context_line": "      invokeGuardedCallback.apply(this, arguments);",
                           "post_context": [
                              "",
                              "      if (hasError) {",
                              "        var error = clearCaughtError();",
                              "",
                              "        if (!hasRethrowError) {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "invokeGuardedCallback",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29314,
                           "colno": 35,
                           "pre_context": [
                              "     */",
                              "",
                              "    function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {",
                              "      hasError = false;",
                              "      caughtError = null;"
                           ],
                           "context_line": "      invokeGuardedCallbackImpl$1.apply(reporter, arguments);",
                           "post_context": [
                              "    }",
                              "    /**",
                              "     * Same as invokeGuardedCallback, but instead of returning an error, it stores",
                              "     * it in a global so it can be rethrown by `rethrowCaughtError` later.",
                              "     * TODO: See if caughtError and rethrowError can be unified."
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "Object.invokeGuardedCallbackDev",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29254,
                           "colno": 20,
                           "pre_context": [
                              "          window.addEventListener('error', handleWindowError);",
                              "          fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function",
                              "          // errors, it will trigger our global error handler.",
                              "",
                              "          evt.initEvent(evtType, false, false);"
                           ],
                           "context_line": "          fakeNode.dispatchEvent(evt);",
                           "post_context": [
                              "",
                              "          if (windowEventDescriptor) {",
                              "            Object.defineProperty(window, 'event', windowEventDescriptor);",
                              "          }",
                              ""
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "HTMLUnknownElement.sentryWrapped",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 5494,
                           "colno": 17,
                           "pre_context": [
                              "      }); // Attempt to invoke user-land function",
                              "      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it",
                              "      //       means the sentry.javascript SDK caught an error invoking your application code. This",
                              "      //       is expected behavior and NOT indicative of a bug with sentry.javascript.",
                              ""
                           ],
                           "context_line": "      return fn.apply(this, wrappedArguments);",
                           "post_context": [
                              "    } catch (ex) {",
                              "      ignoreNextOnError();",
                              "      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.withScope)(function (scope) {",
                              "        scope.addEventProcessor(function (event) {",
                              "          if (options.mechanism) {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "HTMLUnknownElement.callCallback",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 29205,
                           "colno": 18,
                           "pre_context": [
                              "          var funcArgs = Array.prototype.slice.call(arguments, 3);",
                              "",
                              "          function callCallback() {",
                              "            didCall = true;",
                              "            restoreAfterDispatch();"
                           ],
                           "context_line": "            func.apply(context, funcArgs);",
                           "post_context": [
                              "            didError = false;",
                              "          } // Create a global error event handler. We use this to capture the value",
                              "          // that was thrown. It's possible that this error handler will fire more",
                              "          // than once; for example, if non-React code also calls `dispatchEvent`",
                              "          // and a handler for that event throws. We should be resilient to most of"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "handleSubmit",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 453,
                           "colno": 62,
                           "pre_context": [
                              "  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Test Error #1');",
                              "",
                              "  async function handleSubmit(e) {",
                              "    e.preventDefault();",
                              "    setIsFormDisabled(true);"
                           ],
                           "context_line": "    await (0,_util__WEBPACK_IMPORTED_MODULE_2__.triggerError)(errorMessage);",
                           "post_context": [
                              "  }",
                              "",
                              "  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Form, {",
                              "    onSubmit: handleSubmit,",
                              "    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Input, {"
                           ],
                           "in_app": true,
                           "data": {
                              "client_in_app": true
                           }
                        },
                        {
                           "function": "triggerError",
                           "filename": "/static/js/bundle.js",
                           "abs_path": "https://zorlinaxomrel.xyz/static/js/bundle.js",
                           "lineno": 2527,
                           "colno": 63,
                           "pre_context": [
                              "      this.message = 'This is a test error!';",
                              "    }",
                              "",
                              "  }",
                              ""
                           ],
                           "context_line": "  _sentry_react__WEBPACK_IMPORTED_MODULE_0__.captureException(new SentryCustomError());",
                           "post_context": [
                              "}",
                              "",
                              "const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;",
                              "const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(",
                              "\t$ReactRefreshModuleId$"
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

```json title="Issue Alerts"
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
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 18,
                           "context_line": "          return runWithPriority$1(UserBlockingPriority$2, fn.bind(null, a, b, c, d));",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "discreteUpdates$1",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 47533,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "        } finally {",
                              "          executionContext = prevExecutionContext;",
                              "",
                              "          if (executionContext === NoContext) {",
                              "            // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "pre_context": [
                              "    function discreteUpdates$1(fn, a, b, c, d) {",
                              "      var prevExecutionContext = executionContext;",
                              "      executionContext |= DiscreteEventContext;",
                              "      {",
                              "        try {"
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
                           "colno": 14,
                           "context_line": "      return Scheduler_runWithPriority(priorityLevel, fn);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "runWithPriority$1",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 36611,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    }",
                              "",
                              "    function scheduleCallback(reactPriorityLevel, callback, options) {",
                              "      var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);",
                              "      return Scheduler_scheduleCallback(priorityLevel, callback, options);"
                           ],
                           "pre_context": [
                              "      }",
                              "    }",
                              "",
                              "    function runWithPriority$1(reactPriorityLevel, fn) {",
                              "      var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);"
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
                           "context_line": "        return eventHandler();",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "unstable_runWithPriority",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 62557,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      } finally {",
                              "        currentPriorityLevel = previousPriorityLevel;",
                              "      }",
                              "    }",
                              ""
                           ],
                           "pre_context": [
                              "",
                              "      var previousPriorityLevel = currentPriorityLevel;",
                              "      currentPriorityLevel = priorityLevel;",
                              "",
                              "      try {"
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
                           "colno": 23,
                           "context_line": "      var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "dispatchEvent",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 31231,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "      if (blockedOn === null) {",
                              "        // We successfully dispatched this event.",
                              "        if (allowReplay) {",
                              "          clearIfContinuousEvent(domEventName, nativeEvent);"
                           ],
                           "pre_context": [
                              "        queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.",
                              "        domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                              "        return;",
                              "      }",
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
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 7,
                           "context_line": "      dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer); // We're not blocked on anything.",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "attemptToDispatchEvent",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 31313,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "      return null;",
                              "    }",
                              "",
                              "    function addEventBubbleListener(target, eventType, listener) {"
                           ],
                           "pre_context": [
                              "            targetInst = null;",
                              "          }",
                              "        }",
                              "      }",
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
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 7,
                           "context_line": "      batchedEventUpdates(function () {",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "dispatchEventForPluginEventSystem",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33830,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "        return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                              "      });",
                              "    }",
                              "",
                              "    function createDispatchListener(instance, listener, currentTarget) {"
                           ],
                           "pre_context": [
                              "            node = node.return;",
                              "          }",
                              "        }",
                              "      }",
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
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 16,
                           "context_line": "        return batchedEventUpdatesImpl(fn, a, b);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "batchedEventUpdates",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29003,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      } finally {",
                              "        isBatchingEventUpdates = false;",
                              "        finishEventHandler();",
                              "      }",
                              "    }"
                           ],
                           "pre_context": [
                              "      }",
                              "",
                              "      isBatchingEventUpdates = true;",
                              "",
                              "      try {"
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
                           "context_line": "        return fn(a);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "batchedEventUpdates$1",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 47516,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      } finally {",
                              "        executionContext = prevExecutionContext;",
                              "",
                              "        if (executionContext === NoContext) {",
                              "          // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "pre_context": [
                              "    function batchedEventUpdates$1(fn, a) {",
                              "      var prevExecutionContext = executionContext;",
                              "      executionContext |= EventContext;",
                              "",
                              "      try {"
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
                           "context_line": "        return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": null,
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33831,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      });",
                              "    }",
                              "",
                              "    function createDispatchListener(instance, listener, currentTarget) {",
                              "      return {"
                           ],
                           "pre_context": [
                              "          }",
                              "        }",
                              "      }",
                              "",
                              "      batchedEventUpdates(function () {"
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
                           "colno": 7,
                           "context_line": "      processDispatchQueue(dispatchQueue, eventSystemFlags);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "dispatchEventsForPlugins",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33620,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    }",
                              "",
                              "    function listenToNonDelegatedEvent(domEventName, targetElement) {",
                              "      var isCapturePhaseListener = false;",
                              "      var listenerSet = getEventListenerSet(targetElement);"
                           ],
                           "pre_context": [
                              "",
                              "    function dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) {",
                              "      var nativeEventTarget = getEventTarget(nativeEvent);",
                              "      var dispatchQueue = [];",
                              "      extractEvents$5(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);"
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
                           "colno": 9,
                           "context_line": "        processDispatchQueueItemsInOrder(event, listeners, inCapturePhase); //  event system doesn't use pooling.",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "processDispatchQueue",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33609,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      } // This would be a good time to rethrow if any of the event handlers threw.",
                              "",
                              "",
                              "      rethrowCaughtError();",
                              "    }"
                           ],
                           "pre_context": [
                              "",
                              "      for (var i = 0; i &lt; dispatchQueue.length; i++) {",
                              "        var _dispatchQueue$i = dispatchQueue[i],",
                              "            event = _dispatchQueue$i.event,",
                              "            listeners = _dispatchQueue$i.listeners;"
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
                           "colno": 11,
                           "context_line": "          executeDispatch(event, _listener, _currentTarget);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "processDispatchQueueItemsInOrder",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33596,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "          previousInstance = _instance;",
                              "        }",
                              "      }",
                              "    }",
                              ""
                           ],
                           "pre_context": [
                              "",
                              "          if (_instance !== previousInstance &amp;&amp; event.isPropagationStopped()) {",
                              "            return;",
                              "          }",
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
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 7,
                           "context_line": "      invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "executeDispatch",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 33564,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      event.currentTarget = null;",
                              "    }",
                              "",
                              "    function processDispatchQueueItemsInOrder(event, dispatchListeners, inCapturePhase) {",
                              "      var previousInstance;"
                           ],
                           "pre_context": [
                              "    var nonDelegatedEvents = new Set(['cancel', 'close', 'invalid', 'load', 'scroll', 'toggle'].concat(mediaEventTypes));",
                              "",
                              "    function executeDispatch(event, listener, currentTarget) {",
                              "      var type = event.type || 'unknown-event';",
                              "      event.currentTarget = currentTarget;"
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
                           "colno": 29,
                           "context_line": "      invokeGuardedCallback.apply(this, arguments);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "invokeGuardedCallbackAndCatchFirstError",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29329,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "      if (hasError) {",
                              "        var error = clearCaughtError();",
                              "",
                              "        if (!hasRethrowError) {"
                           ],
                           "pre_context": [
                              "     * @param {...*} args Arguments for function",
                              "     */",
                              "",
                              "",
                              "    function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {"
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
                           "colno": 35,
                           "context_line": "      invokeGuardedCallbackImpl$1.apply(reporter, arguments);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "invokeGuardedCallback",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29314,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    }",
                              "    /**",
                              "     * Same as invokeGuardedCallback, but instead of returning an error, it stores",
                              "     * it in a global so it can be rethrown by `rethrowCaughtError` later.",
                              "     * TODO: See if caughtError and rethrowError can be unified."
                           ],
                           "pre_context": [
                              "     */",
                              "",
                              "    function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {",
                              "      hasError = false;",
                              "      caughtError = null;"
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
                           "colno": 20,
                           "context_line": "          fakeNode.dispatchEvent(evt);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "Object.invokeGuardedCallbackDev",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29254,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "          if (windowEventDescriptor) {",
                              "            Object.defineProperty(window, 'event', windowEventDescriptor);",
                              "          }",
                              ""
                           ],
                           "pre_context": [
                              "          window.addEventListener('error', handleWindowError);",
                              "          fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function",
                              "          // errors, it will trigger our global error handler.",
                              "",
                              "          evt.initEvent(evtType, false, false);"
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
                           "colno": 17,
                           "context_line": "      return fn.apply(this, wrappedArguments);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "HTMLUnknownElement.sentryWrapped",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 5494,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    } catch (ex) {",
                              "      ignoreNextOnError();",
                              "      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.withScope)(function (scope) {",
                              "        scope.addEventProcessor(function (event) {",
                              "          if (options.mechanism) {"
                           ],
                           "pre_context": [
                              "      }); // Attempt to invoke user-land function",
                              "      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it",
                              "      //       means the sentry.javascript SDK caught an error invoking your application code. This",
                              "      //       is expected behavior and NOT indicative of a bug with sentry.javascript.",
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
                           "abs_path": "https://acquireconseguir.gotdns.ch/static/js/bundle.js",
                           "addr_mode": null,
                           "colno": 18,
                           "context_line": "            func.apply(context, funcArgs);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "HTMLUnknownElement.callCallback",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29205,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "            didError = false;",
                              "          } // Create a global error event handler. We use this to capture the value",
                              "          // that was thrown. It's possible that this error handler will fire more",
                              "          // than once; for example, if non-React code also calls `dispatchEvent`",
                              "          // and a handler for that event throws. We should be resilient to most of"
                           ],
                           "pre_context": [
                              "          var funcArgs = Array.prototype.slice.call(arguments, 3);",
                              "",
                              "          function callCallback() {",
                              "            didCall = true;",
                              "            restoreAfterDispatch();"
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
                           "colno": 62,
                           "context_line": "    await (0,_util__WEBPACK_IMPORTED_MODULE_2__.triggerError)(errorMessage);",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "handleSubmit",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 453,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  }",
                              "",
                              "  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Form, {",
                              "    onSubmit: handleSubmit,",
                              "    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Input, {"
                           ],
                           "pre_context": [
                              "  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Test Error #1');",
                              "",
                              "  async function handleSubmit(e) {",
                              "    e.preventDefault();",
                              "    setIsFormDisabled(true);"
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
                           "colno": 63,
                           "context_line": "  _sentry_react__WEBPACK_IMPORTED_MODULE_0__.captureException(new SentryCustomError());",
                           "data": {
                              "client_in_app": true
                           },
                           "errors": null,
                           "filename": "/static/js/bundle.js",
                           "function": "triggerError",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 2527,
                           "lock": null,
                           "module": null,
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}",
                              "",
                              "const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;",
                              "const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(",
                              "\t$ReactRefreshModuleId$"
                           ],
                           "pre_context": [
                              "      this.message = 'This is a test error!';",
                              "    }",
                              "",
                              "  }",
                              ""
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
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/node_modules/react-dom/cjs/react-dom.development.js",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "      return runWithPriority$1(UserBlockingPriority$2, fn.bind(null, a, b, c, d));",
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
                           "function": "discreteUpdates$1",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 22413,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    } finally {",
                              "      executionContext = prevExecutionContext;",
                              "",
                              "      if (executionContext === NoContext) {",
                              "        // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "pre_context": [
                              "  var prevExecutionContext = executionContext;",
                              "  executionContext |= DiscreteEventContext;",
                              "",
                              "  {",
                              "    try {"
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
                           "context_line": "  return Scheduler_runWithPriority(priorityLevel, fn);",
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
                           "function": "runWithPriority$1",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 11276,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}",
                              "function scheduleCallback(reactPriorityLevel, callback, options) {",
                              "  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);",
                              "  return Scheduler_scheduleCallback(priorityLevel, callback, options);",
                              "}"
                           ],
                           "pre_context": [
                              "  }",
                              "}",
                              "",
                              "function runWithPriority$1(reactPriorityLevel, fn) {",
                              "  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/node_modules/scheduler/cjs/scheduler.development.js",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "    return eventHandler();",
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
                           "filename": "/frontend/node_modules/scheduler/cjs/scheduler.development.js",
                           "function": "unstable_runWithPriority",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 468,
                           "lock": null,
                           "module": "frontend/node_modules/scheduler/cjs/scheduler.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  } finally {",
                              "    currentPriorityLevel = previousPriorityLevel;",
                              "  }",
                              "}",
                              ""
                           ],
                           "pre_context": [
                              "",
                              "  var previousPriorityLevel = currentPriorityLevel;",
                              "  currentPriorityLevel = priorityLevel;",
                              "",
                              "  try {"
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
                           "context_line": "  var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);",
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
                           "function": "dispatchEvent",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 5924,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "  if (blockedOn === null) {",
                              "    // We successfully dispatched this event.",
                              "    if (allowReplay) {",
                              "      clearIfContinuousEvent(domEventName, nativeEvent);"
                           ],
                           "pre_context": [
                              "    queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.",
                              "    domEventName, eventSystemFlags, targetContainer, nativeEvent);",
                              "    return;",
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
                           "context_line": "  dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer); // We're not blocked on anything.",
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
                           "function": "attemptToDispatchEvent",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 6005,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "  return null;",
                              "}",
                              "",
                              "function addEventBubbleListener(target, eventType, listener) {"
                           ],
                           "pre_context": [
                              "        targetInst = null;",
                              "      }",
                              "    }",
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
                           "context_line": "  batchedEventUpdates(function () {",
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
                           "function": "dispatchEventForPluginEventSystem",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8507,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
                              "  });",
                              "}",
                              "",
                              "function createDispatchListener(instance, listener, currentTarget) {"
                           ],
                           "pre_context": [
                              "        node = node.return;",
                              "      }",
                              "    }",
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
                           "context_line": "    return batchedEventUpdatesImpl(fn, a, b);",
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
                           "function": "batchedEventUpdates",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 3745,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  } finally {",
                              "    isBatchingEventUpdates = false;",
                              "    finishEventHandler();",
                              "  }",
                              "}"
                           ],
                           "pre_context": [
                              "  }",
                              "",
                              "  isBatchingEventUpdates = true;",
                              "",
                              "  try {"
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
                           "context_line": "    return fn(a);",
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
                           "function": "batchedEventUpdates$1",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 22396,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  } finally {",
                              "    executionContext = prevExecutionContext;",
                              "",
                              "    if (executionContext === NoContext) {",
                              "      // Flush the immediate callbacks that were scheduled during this batch"
                           ],
                           "pre_context": [
                              "function batchedEventUpdates$1(fn, a) {",
                              "  var prevExecutionContext = executionContext;",
                              "  executionContext |= EventContext;",
                              "",
                              "  try {"
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
                           "context_line": "    return dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, ancestorInst);",
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
                           "function": "&lt;anonymous&gt;",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8508,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  });",
                              "}",
                              "",
                              "function createDispatchListener(instance, listener, currentTarget) {",
                              "  return {"
                           ],
                           "pre_context": [
                              "      }",
                              "    }",
                              "  }",
                              "",
                              "  batchedEventUpdates(function () {"
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
                           "context_line": "  processDispatchQueue(dispatchQueue, eventSystemFlags);",
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
                           "function": "dispatchEventsForPlugins",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8299,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}",
                              "",
                              "function listenToNonDelegatedEvent(domEventName, targetElement) {",
                              "  var isCapturePhaseListener = false;",
                              "  var listenerSet = getEventListenerSet(targetElement);"
                           ],
                           "pre_context": [
                              "",
                              "function dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) {",
                              "  var nativeEventTarget = getEventTarget(nativeEvent);",
                              "  var dispatchQueue = [];",
                              "  extractEvents$5(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);"
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
                           "context_line": "    processDispatchQueueItemsInOrder(event, listeners, inCapturePhase); //  event system doesn't use pooling.",
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
                           "function": "processDispatchQueue",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8288,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  } // This would be a good time to rethrow if any of the event handlers threw.",
                              "",
                              "",
                              "  rethrowCaughtError();",
                              "}"
                           ],
                           "pre_context": [
                              "",
                              "  for (var i = 0; i &lt; dispatchQueue.length; i++) {",
                              "    var _dispatchQueue$i = dispatchQueue[i],",
                              "        event = _dispatchQueue$i.event,",
                              "        listeners = _dispatchQueue$i.listeners;"
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
                           "context_line": "      executeDispatch(event, _listener, _currentTarget);",
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
                           "function": "processDispatchQueueItemsInOrder",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8275,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "      previousInstance = _instance;",
                              "    }",
                              "  }",
                              "}",
                              ""
                           ],
                           "pre_context": [
                              "",
                              "      if (_instance !== previousInstance &amp;&amp; event.isPropagationStopped()) {",
                              "        return;",
                              "      }",
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
                           "context_line": "  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);",
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
                           "function": "executeDispatch",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 8243,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  event.currentTarget = null;",
                              "}",
                              "",
                              "function processDispatchQueueItemsInOrder(event, dispatchListeners, inCapturePhase) {",
                              "  var previousInstance;"
                           ],
                           "pre_context": [
                              "var nonDelegatedEvents = new Set(['cancel', 'close', 'invalid', 'load', 'scroll', 'toggle'].concat(mediaEventTypes));",
                              "",
                              "function executeDispatch(event, listener, currentTarget) {",
                              "  var type = event.type || 'unknown-event';",
                              "  event.currentTarget = currentTarget;"
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
                           "context_line": "  invokeGuardedCallback.apply(this, arguments);",
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
                           "function": "invokeGuardedCallbackAndCatchFirstError",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 4070,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "  if (hasError) {",
                              "    var error = clearCaughtError();",
                              "",
                              "    if (!hasRethrowError) {"
                           ],
                           "pre_context": [
                              " * @param {*} context The context to use when calling the function",
                              " * @param {...*} args Arguments for function",
                              " */",
                              "",
                              "function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {"
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
                           "context_line": "  invokeGuardedCallbackImpl$1.apply(reporter, arguments);",
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
                           "function": "invokeGuardedCallback",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 4056,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}",
                              "/**",
                              " * Same as invokeGuardedCallback, but instead of returning an error, it stores",
                              " * it in a global so it can be rethrown by `rethrowCaughtError` later.",
                              " * TODO: See if caughtError and rethrowError can be unified."
                           ],
                           "pre_context": [
                              " */",
                              "",
                              "function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {",
                              "  hasError = false;",
                              "  caughtError = null;"
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
                           "context_line": "      fakeNode.dispatchEvent(evt);",
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
                           "function": "invokeGuardedCallbackDev",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 3994,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "",
                              "      if (windowEventDescriptor) {",
                              "        Object.defineProperty(window, 'event', windowEventDescriptor);",
                              "      }",
                              ""
                           ],
                           "pre_context": [
                              "      window.addEventListener('error', handleWindowError);",
                              "      fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function",
                              "      // errors, it will trigger our global error handler.",
                              "",
                              "      evt.initEvent(evtType, false, false);"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/node_modules/@sentry/src/helpers.ts",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "      return fn.apply(this, wrappedArguments);",
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
                           "filename": "/frontend/node_modules/@sentry/src/helpers.ts",
                           "function": "sentryWrapped",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 98,
                           "lock": null,
                           "module": "frontend/node_modules/@sentry/src/helpers",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "    } catch (ex) {",
                              "      ignoreNextOnError();",
                              "",
                              "      withScope((scope: Scope) =&gt; {",
                              "        scope.addEventProcessor((event: SentryEvent) =&gt; {"
                           ],
                           "pre_context": [
                              "",
                              "      // Attempt to invoke user-land function",
                              "      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it",
                              "      //       means the sentry.javascript SDK caught an error invoking your application code. This",
                              "      //       is expected behavior and NOT indicative of a bug with sentry.javascript."
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
                           "context_line": "        func.apply(context, funcArgs);",
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
                           "function": "callCallback",
                           "image_addr": null,
                           "in_app": false,
                           "instruction_addr": null,
                           "lineno": 3945,
                           "lock": null,
                           "module": "frontend/node_modules/react-dom/cjs/react-dom.development",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "        didError = false;",
                              "      } // Create a global error event handler. We use this to capture the value",
                              "      // that was thrown. It's possible that this error handler will fire more",
                              "      // than once; for example, if non-React code also calls `dispatchEvent`",
                              "      // and a handler for that event throws. We should be resilient to most of"
                           ],
                           "pre_context": [
                              "      var funcArgs = Array.prototype.slice.call(arguments, 3);",
                              "",
                              "      function callCallback() {",
                              "        didCall = true;",
                              "        restoreAfterDispatch();"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/src/components/ErrorForm.tsx",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "    await triggerError(errorMessage);",
                           "data": {
                              "client_in_app": true,
                              "resolved_with": "scraping",
                              "sourcemap": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map",
                              "sourcemap_origin": {
                                 "scraped_file": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           },
                           "errors": null,
                           "filename": "/frontend/src/components/ErrorForm.tsx",
                           "function": "handleSubmit",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 14,
                           "lock": null,
                           "module": "frontend/src/components/ErrorForm",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "  }",
                              "",
                              "  return (",
                              "    &lt;Form onSubmit={handleSubmit}&gt;",
                              "      &lt;Input"
                           ],
                           "pre_context": [
                              "  const [errorMessage, setErrorMessage] = useState('Test Error #1');",
                              "",
                              "  async function handleSubmit(e: SyntheticEvent) {",
                              "    e.preventDefault();",
                              "    setIsFormDisabled(true);"
                           ],
                           "raw_function": null,
                           "source_link": null,
                           "symbol": null,
                           "symbol_addr": null,
                           "trust": null,
                           "vars": null
                        },
                        {
                           "abs_path": "https://acquireconseguir.gotdns.ch/frontend/src/util.ts",
                           "addr_mode": null,
                           "colno": 1,
                           "context_line": "  Sentry.captureException(new SentryCustomError());",
                           "data": {
                              "client_in_app": true,
                              "resolved_with": "scraping",
                              "sourcemap": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map",
                              "sourcemap_origin": {
                                 "scraped_file": "https://acquireconseguir.gotdns.ch/static/js/bundle.js.map#1752473492"
                              },
                              "symbolicated": true
                           },
                           "errors": null,
                           "filename": "/frontend/src/util.ts",
                           "function": "triggerError",
                           "image_addr": null,
                           "in_app": true,
                           "instruction_addr": null,
                           "lineno": 29,
                           "lock": null,
                           "module": "frontend/src/util",
                           "package": null,
                           "platform": null,
                           "post_context": [
                              "}"
                           ],
                           "pre_context": [
                              "      // doesn't combine the events into a single issue",
                              "      this.name = message;",
                              "      this.message = 'This is a test error!';",
                              "    }",
                              "  }"
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

```json title="Metric Alerts"
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
