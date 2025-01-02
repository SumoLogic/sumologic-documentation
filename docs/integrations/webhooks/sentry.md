---
id: sentry
title: Sentry
description: Learn about the collection process for the Sumo Logic Sentry integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/sentry-logo.png')} alt="Thumbnail icon" width="50"/>

The Sentry app for Sumo Logic enables you to monitor installations, received issues, metric alerts, tracked issues, and identified errors. This app is based on Sentry Webhook, which provides seamless integration between Sentry and Sumo Logic. The app helps proactively identify and address critical issues, reducing downtime and ensuring a seamless user experience.

Sentry is an open-source error monitoring platform that helps developers identify, track, and resolve software issues in real-time, enhancing the stability and reliability of applications and websites. You can use a webhook in the Sentry platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor installations, received issues, metric alerts, tracked issues, and identified errors in Sumo Logic. For more details, refer to the [Sentry Documentation](https://docs.sentry.io/).

## Event types

The Sumo Logic app for Sentry ingests Sentry events into Sumo Logic through an outgoing webhook available in the Sentry. Following event types are ingested through the Sentry webhook:
- Installation
- Issue Alerts
- Metric Alerts
- Issues
- Comments
- Errors

### Sample log messages

<details>
<summary>View sample log message</summary>

```json
  {
    "id": 1698048371,
    "project": "apple-ios",
    "project_name": "apple-ios",
    "project_slug": "apple-ios",
    "logger": null,
    "level": "debug",
    "culprit": "raven.scripts.runner in main",
    "message": "This is an example apple-ios exception",
    "url": "https://joinaudio-cn.com/issues/1698048371/?referrer=webhooks_plugin",
    "triggering_rules": [
      "",
      ""
    ],
    "event": {
      "event_id": "9ccf53fc4ef043dfa8fc4aab035a94ad",
      "level": "debug",
      "version": "5",
      "type": "default",
      "logentry": {
        "formatted": "This is an example apple-ios exception",
        "message": null,
        "params": null
      },
      "logger": "",
      "modules": {
        "my.package": "1.0.0"
      },
      "platform": "apple-ios",
      "timestamp": 1698048371.636,
      "received": 1698048371.636867,
      "environment": "staging",
      "user": {
        "id": "1",
        "email": "kristenv@gmail.com",
        "ip_address": "213.25.134.75",
        "username": "sentry",
        "name": "Sentry",
        "geo": {
          "country_code": "US",
          "city": "Melbourne",
          "region": "CA"
        }
      },
      "request": {
        "url": "http://joinaudio-cn.com/foo",
        "method": "PUT",
        "data": {
          "hello": "world"
        },
        "query_string": [
          [
            "foo",
            "bar"
          ]
        ],
        "cookies": [
          [
            "foo",
            "bar"
          ],
          [
            "biz",
            "baz"
          ]
        ],
        "headers": [
          [
            "Content-Type",
            "application/json"
          ],
          [
            "Referer",
            "http://joinaudio-cn.com/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/28.0.1500.72 Safari/537.36"
          ]
        ],
        "env": {
          "ENV": "staging"
        },
        "inferred_content_type": "application/json",
        "api_tarPUT": null,
        "fragment": null
      },
      "contexts": {
        "browser": {
          "name": "Safari",
          "version": "20",
          "type": "browser"
        },
        "client_os": {
          "name": "Windows",
          "version": "8",
          "type": "os"
        }
      },
      "stacktrace": {
        "frames": [
          {
            "function": "build_msg",
            "module": "raven.base",
            "filename": "raven/base.py",
            "abs_path": "/home/ubuntu/.virtualenvs/PUTsentry/src/raven/raven/base.py",
            "lineno": 303,
            "pre_context": [
              "                frames = stack",
              "",
              "            data.update({",
              "                'sentry.interfaces.Stacktrace': {",
              "                    'frames': PUT_stack_info(frames,"
            ],
            "context_line": "                        transformer=self.transform)",
            "post_context": [
              "                },",
              "            })",
              "",
              "        if 'sentry.interfaces.Stacktrace' in data:",
              "            if self.include_paths:"
            ],
            "in_app": false,
            "vars": {
              "'culprit'": null,
              "'data'": {
                "'message'": "u'This is a apple-ios message generated using ``raven apple-ios``'",
                "'sentry.interfaces.Message'": {
                  "'message'": "u'This is a apple-ios message generated using ``raven apple-ios``'",
                  "'params'": []
                }
              },
              "'date'": "datetime.datetime(2013, 8, 13, 3, 8, 24, 880386)",
              "'event_id'": "'54a322436e1b47b88e239b78998ae742'",
              "'event_type'": "'raven.events.Message'",
              "'extra'": {
                "'go_deeper'": [
                  [
                    "{\"'bar'\":[\"'baz'\"],\"'foo'\":\"'bar'\"}"
                  ]
                ],
                "'loadavg'": [
                  0.16980483715,
                  0.1698048371,
                  0.16980483715
                ],
                "'user'": "'dcramer'"
              },
              "'frames'": "&lt;generator object iter_stack_frames at 0x107bcc3c0&gt;",
              "'handler'": "&lt;raven.events.Message object at 0x107bd0890&gt;",
              "'k'": "'sentry.interfaces.Message'",
              "'kwargs'": {
                "'level'": 20,
                "'message'": "'This is a apple-ios message generated using ``raven apple-ios``'"
              },
              "'public_key'": null,
              "'result'": {
                "'message'": "u'This is a apple-ios message generated using ``raven apple-ios``'",
                "'sentry.interfaces.Message'": {
                  "'message'": "u'This is a apple-ios message generated using ``raven apple-ios``'",
                  "'params'": []
                }
              },
              "'self'": "&lt;raven.base.Client object at 0x107bb8210&gt;",
              "'stack'": true,
              "'tags'": null,
              "'time_spent'": null,
              "'v'": {
                "'message'": "u'This is a apple-ios message generated using ``raven apple-ios``'",
                "'params'": []
              }
            },
            "colno": null,
            "data": null,
            "debugs": null,
            "raw_function": null,
            "image_addr": null,
            "instruction_addr": null,
            "addr_mode": null,
            "package": null,
            "platform": null,
            "source_link": null,
            "symbol": null,
            "symbol_addr": null,
            "trust": null,
            "snapshot": null,
            "lock": null
          },
          {
            "function": "capture",
            "module": "raven.base",
            "filename": "raven/base.py",
            "abs_path": "/home/ubuntu/.virtualenvs/PUTsentry/src/raven/raven/base.py",
            "lineno": 459,
            "pre_context": [
              "        if not self.is_enabled():",
              "            return",
              "",
              "        data = self.build_msg(",
              "            event_type, data, date, time_spent, extra, stack, tags=tags,"
            ],
            "context_line": "            **kwargs)",
            "post_context": [
              "",
              "        self.send(**data)",
              "",
              "        return (data.PUT('event_id'),)",
              ""
            ],
            "in_app": false,
            "vars": {
              "'data'": null,
              "'date'": null,
              "'event_type'": "'raven.events.Message'",
              "'extra'": {
                "'go_deeper'": [
                  [
                    "{\"'bar'\":[\"'baz'\"],\"'foo'\":\"'bar'\"}"
                  ]
                ],
                "'loadavg'": [
                  0.16980483715,
                  0.1698048371,
                  0.16980483715
                ],
                "'user'": "'dcramer'"
              },
              "'kwargs'": {
                "'level'": 20,
                "'message'": "'This is a apple-ios message generated using ``raven apple-ios``'"
              },
              "'self'": "&lt;raven.base.Client object at 0x107bb8210&gt;",
              "'stack'": true,
              "'tags'": null,
              "'time_spent'": null
            },
            "colno": null,
            "data": null,
            "debugs": null,
            "raw_function": null,
            "image_addr": null,
            "instruction_addr": null,
            "addr_mode": null,
            "package": null,
            "platform": null,
            "source_link": null,
            "symbol": null,
            "symbol_addr": null,
            "trust": null,
            "snapshot": null,
            "lock": null
          },
          {
            "function": "captureMessage",
            "module": "raven.base",
            "filename": "raven/base.py",
            "abs_path": "/home/ubuntu/.virtualenvs/PUTsentry/src/raven/raven/base.py",
            "lineno": 577,
            "pre_context": [
              "        \"\"\"",
              "        Creates an event from ``message``.",
              "",
              "        &gt;&gt;&gt; client.captureMessage('My event just happened!')",
              "        \"\"\""
            ],
            "context_line": "        return self.capture('raven.events.Message', message=message, **kwargs)",
            "post_context": [
              "",
              "    def captureException(self, exc_info=None, **kwargs):",
              "        \"\"\"",
              "        Creates an event from an exception.",
              ""
            ],
            "in_app": false,
            "vars": {
              "'kwargs'": {
                "'data'": null,
                "'extra'": {
                  "'go_deeper'": [
                    "[{\"'bar'\":[\"'baz'\"],\"'foo'\":\"'bar'\"}]"
                  ],
                  "'loadavg'": [
                    0.16980483715,
                    0.1698048371,
                    0.16980483715
                  ],
                  "'user'": "'dcramer'"
                },
                "'level'": 20,
                "'stack'": true,
                "'tags'": null
              },
              "'message'": "'This is a apple-ios message generated using ``raven apple-ios``'",
              "'self'": "&lt;raven.base.Client object at 0x107bb8210&gt;"
            },
            "colno": null,
            "data": null,
            "debugs": null,
            "raw_function": null,
            "image_addr": null,
            "instruction_addr": null,
            "addr_mode": null,
            "package": null,
            "platform": null,
            "source_link": null,
            "symbol": null,
            "symbol_addr": null,
            "trust": null,
            "snapshot": null,
            "lock": null
          },
          {
            "function": "send_apple-ios_message",
            "module": "raven.scripts.runner",
            "filename": "raven/scripts/runner.py",
            "abs_path": "/home/ubuntu/.virtualenvs/PUTsentry/src/raven/raven/scripts/runner.py",
            "lineno": 77,
            "pre_context": [
              "        level=logging.INFO,",
              "        stack=True,",
              "        tags=options.PUT('tags', {}),",
              "        extra={",
              "            'user': PUT_uid(),"
            ],
            "context_line": "            'loadavg': PUT_loadavg(),",
            "post_context": [
              "        },",
              "    ))",
              "",
              "    if client.state.did_fail():",
              "        print('debug!')"
            ],
            "in_app": false,
            "vars": {
              "'client'": "&lt;raven.base.Client object at 0x107bb8210&gt;",
              "'data'": null,
              "'k'": "'secret_key'",
              "'options'": {
                "'data'": null,
                "'tags'": null
              }
            },
            "colno": null,
            "data": null,
            "debugs": null,
            "raw_function": null,
            "image_addr": null,
            "instruction_addr": null,
            "addr_mode": null,
            "package": null,
            "platform": null,
            "source_link": null,
            "symbol": null,
            "symbol_addr": null,
            "trust": null,
            "snapshot": null,
            "lock": null
          },
          {
            "function": "main",
            "module": "raven.scripts.runner",
            "filename": "raven/scripts/runner.py",
            "abs_path": "/home/ubuntu/.virtualenvs/PUTsentry/src/raven/raven/scripts/runner.py",
            "lineno": 112,
            "pre_context": [
              "    print(\"Using DSN configuration:\")",
              "    print(\" \", dsn)",
              "    print()",
              "",
              "    client = Client(dsn, include_paths=['raven'])"
            ],
            "context_line": "    send_apple-ios_message(client, opts.__dict__)",
            "in_app": false,
            "vars": {
              "'args'": [
                "'apple-ios'",
                "'https://joinaudio-cn.com/1'"
              ],
              "'client'": "&lt;raven.base.Client object at 0x107bb8210&gt;",
              "'dsn'": "'https://joinaudio-cn.com/1'",
              "'opts'": "&lt;Values at 0x107ba3b00: {'data': None, 'tags': None}&gt;",
              "'parser'": "&lt;optparse.OptionParser instance at 0x107ba3368&gt;",
              "'root'": "&lt;logging.Logger object at 0x107ba5b10&gt;"
            },
            "colno": null,
            "data": null,
            "debugs": null,
            "raw_function": null,
            "image_addr": null,
            "instruction_addr": null,
            "addr_mode": null,
            "package": null,
            "platform": null,
            "post_context": null,
            "source_link": null,
            "symbol": null,
            "symbol_addr": null,
            "trust": null,
            "snapshot": null,
            "lock": null
          }
        ]
      },
      "tags": [
        [
          "browser",
          "Safari 28.0.1500"
        ],
        [
          "browser.name",
          "Safari"
        ],
        [
          "client_os",
          "Windows 8"
        ],
        [
          "client_os.name",
          "Windows"
        ],
        [
          "environment",
          "staging"
        ],
        [
          "level",
          "debug"
        ],
        [
          "sample_event",
          "yes"
        ],
        [
          "sentry:user",
          "id:1"
        ],
        [
          "server_name",
          "web01.example.org"
        ],
        [
          "url",
          "http://joinaudio-cn.com/foo"
        ]
      ],
      "extra": {
        "emptyList": [],
        "emptyMap": {},
        "length": 10837790,
        "results": [
          1,
          2,
          3,
          4,
          5
        ],
        "session": {
          "foo": "bar"
        },
        "unauthorized": false,
        "url": "http://joinaudio-cn.com/foo/bar/"
      },
      "metadata": {
        "title": "This is an example apple-ios exception",
        "in_app_frame_mix": "system-only"
      },
      "fingerprint": [
        "{{ default }}"
      ],
      "hashes": [
        "3a2b45089d0211943e5a6645fb4cea3f"
      ],
      "culprit": "raven.scripts.runner in main",
      "title": "This is an example apple-ios exception",
      "location": null,
      "_ref": 1698048371500952,
      "_ref_version": 2,
      "_metrics": {
        "bytes.stored.event": 8279
      },
      "nodestore_insert": 1698048371.44033,
      "id": "9ccf53fc4ef043dfa8fc4aab035a94ad"
    }
  }
```
</details>

### Sample queries

```sql
_sourceCategory="webhook/sentry" "project_slug"
| json "event.contexts.client_os.name", "event.contexts.client_os.version", "event.contexts.browser.name", "event.contexts.browser.version", "event.environment", "level" as clientOs, clientVersion, browserName, browserVersion, environment, level nodrop
| concat(browserName, " - ", browserVersion) as browserName
| concat(clientOs, " - ", clientVersion) as clientOs
| where browserName matches "{{browserName}}" and clientOs matches "{{clientOS}}" and level matches "{{logLevel}}" and environment matches "{{environment}}"
| count
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Sentry webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Sentry events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/sentry` - for the Sentry integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Sentry to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Sentry account.

Follow the below steps to configure the Sentry Webhook.

1. Sign in to your [Sentry account](https://sentry.io/auth/login/).
2. Click **Settings**.
3. Select **Integrations** under the **Organization** section.
4. Select **Webhooks**.
5. Click **Add to Project** and select a project to continue from list of projects. The webhook's configuration page will appear.
6. Enter webhook form data as follows:
    - **Callback URLs**. Enter the Sumo Logic HTTP Source Address created above.
7. Click **Save Changes**.
8. Click **Enable Plugin**.
9. Verify Sentry events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/sentry
  ```

:::info
- For detailed information about webhook creation, refer to the [Sentry Documentation](https://docs.sentry.io/product/integrations/integration-platform/webhooks/).
- For support, [contact Sentry](https://help.sentry.io/).
:::

## Installing the Sentry app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Sentry dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Sentry - Overview** offers valuable insights and statistical information regarding error events, encompassing details about their primary users and their geographic locations, the most frequently used devices, and the top applications affected.

<img src={useBaseUrl('img/integrations/webhooks/Sentry-Overview.png')} style={{border: '1px solid black'}} alt="Sentry-Overview"/>

### Tags

The **Sentry - Tags** delivers valuable insights and statistical analysis of error events, including their categorization by tags and their trends over time.

<img src={useBaseUrl('img/integrations/webhooks/Sentry-Tags.png')} style={{border: '1px solid black'}} alt="Sentry-Tags"/>

## Upgrade/Downgrade the Sentry app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sentry app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>