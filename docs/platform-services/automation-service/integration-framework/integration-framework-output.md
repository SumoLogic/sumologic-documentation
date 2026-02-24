---
id: integration-framework-output
title: Integration Framework Output
sidebar_label: Output
description: Learn how to work with output from the integration framework. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article describes the format of integration output. To edit the output of an integration, see [Edit output of an action](/docs/platform-services/automation-service/automation-service-integrations/#edit-output-of-an-action).

## About integration output

Integrations primarily use JSON to pass data between actions and other internal components. There is no requirement that integrations return JSON results; integrations will execute regardless of the data or data type they return. However, in order to pass data returned from an action to a future action in a runbook or to other internal components, the output from an integration action must be returned in JSON, and the JSON fields must be defined in the output:path attributes of the action definition file. In other words, if the action output is not returned in JSON, it will not be able to be used in any other areas.

Most APIs can return JSON data, either by default or as an option. If an integration does not return JSON natively, the returned data may be converted to JSON prior to being returned by the action code so long as it matches the structure specified in the output:path attributes of the action definition file. For example, to return JSON data using Python, the output should be printed as follows:

```
Import json
...
print(json.dumps(<JSON Data>))
```

The system will use the standard error and standard output to determinate if an action terminates successfully or not. So if you print a string in `stderr` like the following...

```
sys.stderr.write(str(err)) -> Action failed with reason string err
```

...output from each integration action can be viewed in either table view or JSON view when executed. Table view is used to display a subset of the data, defined in the action definition file `table_view` attributes listed above, in a table format. For example, the following code in an action definition file would result in a table view with columns for **ID**, **CVSS**, **A**, **C**, and **I**:

```
table_view:
- display_name: 'ID'
value : 'id'
- display_name: 'CVSS'
value : cvss'
```

The following image shows the table view:

<img src={useBaseUrl('img/cse/integration-framework-action-result.png')} style={{border:'1px solid gray'}} alt="Action result" width="600"/>

The JSON view will display the entire output of the integration action in JSON format:

<img src={useBaseUrl('img/cse/integration-framework-action-result-2.png')} style={{border:'1px solid gray'}} alt="Action result output" width="600"/>

Following is the setting for a link type:

```
- display_name: 'CVSS'
value : 'cvss'
type : 'link'
```

<img src={useBaseUrl('img/cse/integration-framework-show-details.png')} style={{border:'1px solid gray'}} alt="Show details" width="600"/>

### Add an output type for an action

It's possible to specify a JSON path or use rawOutput to specify text output to use as `srcDoc` for iframe sandbox (it is not possible to use JavaScript):

```
integration: 'Incident tools'
name: 'intervallo date 3ededed'
type: Enrichment
script:
 code: |
    [....]
    art = '''
          <html>
            <head></head>
            <body>
               <style>
                 [...]
               </style>
               <dl>
                 <dt>
                    Browser market share June 2015
                 </dt>
                 <dd class='percentage percentage-11'><span class='text'>IE 11: 11.33%</span></dd>
                 <dd class='percentage percentage-49'><span class='text'>Chrome: 49.77%</span></dd>
                 <dd class='percentage percentage-16'><span class='text'>Firefox: 16.09%</span></dd>
                 <dd class='percentage percentage-5'><span class='text'>Safari: 5.41%</span></dd>
                 <dd class='percentage percentage-2'><span class='text'>Opera: 1.62%</span></dd>
                 <dd class='percentage percentage-2'><span class='text'>Android 4.4: 2%</span></dd>
               </dl>
            </body>
          </html>
    '''    
    print(art)
src_doc: 'rawOutput'
```

The following image shows output from the code example:

<img src={useBaseUrl('img/cse/integration-framework-browser-market-share.png')} style={{border:'1px solid gray'}} alt="Browser market share" width="600"/>

The `image_base64_png(jpg)` field provides the result path where to get base64 png or jpg image, for example:

<img src={useBaseUrl('img/cse/integration-framework-show-details-2.png')} style={{border:'1px solid gray'}} alt="Result path" width="600"/>



## Use multi-select in output

```
    [
        {
            "_id": "5fda1d0faa3f39c44361b84e",
            "index": 0,
            "days": days,
            "guid": "900c39df-837f-4394-a463-f0dffdb5420e",
            "isActive": False,
            "balance": "$2,434.45",
            "picture": "http://placehold.it/32x32",
            "age": 37,
            "eyeColor": "brown",
            "name": "Lindsey Mcknight",
            "gender": "male",
            "company": "PORTALIS",
            "email": "lindseymcknight@portalis.com",
            "phone": "+1 (868) 490-3497",
            "address": "566 Bainbridge Street, Waterloo, Nebraska, 1714",
            "about": "Sunt quis culpa enim eiusmod ullamco tempor enim. Culpa nisi nostrud quis nisi commodo mollit mollit irure. Duis sunt reprehenderit duis labore dolor dolor ullamco Lorem eiusmod. Nulla nulla excepteur ipsum dolor qui reprehenderit laborum elit esse nulla do incididunt. Ea qui tempor sunt veniam magna do ea laborum qui ut. Veniam veniam ut consequat duis. Commodo incididunt duis culpa mollit eu.\r\n",
            "registered": "2015-12-30T12:58:10 -01:00",
            "latitude": -78.618655,
            "longitude": -148.652818,
            "tags": [
                "et",
                "do",
                "ut",
                "excepteur",
                "dolore",
                "cillum",
                "laborum"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Herman Sharp"
                },
                {
                    "id": 1,
                    "name": "Foreman Berger"
                },
                {
                    "id": 2,
                    "name": "Loretta Blair"
                }
            ],
            "greeting": "Hello, Lindsey Mcknight! You have 3 unread messages.",
            "favoriteFruit": "apple"
        },
        {
            "_id": "5fda1d0fa888a79dbbf27e40",
            "index": 1,
            "guid": "246533ba-31ca-4cd0-b307-e3c8ff450ff1",
            "isActive": True,
            "balance": "$3,469.55",
            "picture": "http://placehold.it/32x32",
            "age": 21,
            "eyeColor": "brown",
            "name": "Johnston Merritt",
            "gender": "male",
            "company": "TERRAGEN",
            "email": "johnstonmerritt@terragen.com",
            "phone": "+1 (960) 583-2954",
            "address": "405 Oxford Walk, Sunnyside, Alaska, 4197",
            "about": "Voluptate cillum deserunt veniam ullamco in culpa ad amet ut ea. Sit et reprehenderit deserunt reprehenderit consequat anim elit pariatur sint irure proident. Non sint velit mollit irure amet aute in ad. In amet magna consectetur esse dolor Lorem est proident.\r\n",
            "registered": "2016-10-27T03:29:02 -02:00",
            "latitude": 73.096704,
            "longitude": 98.965585,
            "tags": [
                "consequat",
                "adipisicing",
                "esse",
                "ad",
                "laborum",
                "pariatur",
                "sunt"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Viola Bailey"
                },
                {
                    "id": 1,
                    "name": "Jodi Richardson"
                },
                {
                    "id": 2,
                    "name": "Strong Patel"
                }
            ],
            "greeting": "Hello, Johnston Merritt! You have 6 unread messages.",
            "favoriteFruit": "apple"
        }
    ]
```
With a result as shown above it's possible to add into OIF YAML output section:

```
output:
  - path : '[].{Name: name, ID: _id, Address: address}'

```
And if you use that output into `textarea` as placeholder:

<img src={useBaseUrl('img/cse/integration-framework-app-d-image-1.png')} style={{border:'1px solid gray'}} alt="Textarea" width="600"/>

You will get a print HTML of aggregated elements

<img src={useBaseUrl('img/cse/integration-framework-app-d-image-2.png')} style={{border:'1px solid gray'}} alt="HTML of aggregated elements" width="500"/>

## Pipe functions in YAML output

With the same action used in [Use mult-select in output](#use-multi-select-in-output), it's possible to use two common pipe functions to process action output.

Pipe function `join('separator')`:

```
output:
  - path : '[].guid | join(,)'
```

<img src={useBaseUrl('img/cse/integration-framework-app-3-image-1.png')} style={{border:'1px solid gray'}} alt="Join separator pipe function" width="600"/>

And so the next action will run one time with a string created join array element with `separator` specified:

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-2.png')} style={{border:'1px solid gray'}} alt="Separator specified" width="700"/>

Pipe function `unique()`:
```
output:
  - path : '[].tags.[] | unique()'
```

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-3.png')} style={{border:'1px solid gray'}} alt="Unique pipe function" width="600"/>

The array will be populated with not duplicated element:

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-4.png')} style={{border:'1px solid gray'}} alt="Pip function specified" width="800"/>
