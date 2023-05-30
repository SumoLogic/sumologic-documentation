---
id: automation-service-integration-framework
title: Automation Service Integration Framework
sidebar_label: Automation Service Integration Framework
description: Learn about the framework used for integrations. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

{@import ../../reuse/automation-service-la-note.md}

The Integration Framework allows you to develop and extend integrations using a common, open, and easy-to-use framework. 

Integrations are defined using two types of text files. The first type, the integration definition file, is used to define the properties of the product which the integration connects. This includes information such as the name, logo, connection parameters, test code, and the Docker container used to execute the actions. One integration definition file is required for each integration and serves as a container for all the actions that the integration will perform.

The second type of file is an action definition file, which is used to define a single action that will be performed using the integration. Each integration action is defined in a separate action definition file, which will be associated with the appropriate integration definition. Action definition files are the files which contain the actual code which will be executed to perform the action. Supported languages include Perl, Python, PowerShell, and Bash. In addition to the action code, action definition files also contain information such as the name, required and optional fields, and the format in which the resulting information will be displayed. 

The following diagram shows the integration file hierarchy:

<img src={useBaseUrl('img/cse/integration-framework-container.png')} alt="Integraton framework container" width="700"/>

Defining integrations at the action level allows users have greater flexibility in customizing existing integrations and sharing new actions with other users. For example, you may choose to extend the existing RSA NetWitness integration to include an additional action which retrieves all network connections for a given host. Once you create this new action, you can easily add it to the existing RSA Netwitness integration by uploading the new integration action file. 

You can also share this new action and use it to extend the functionality of the integration for others. The following diagram shows action file portability:

<img src={useBaseUrl('img/cse/integration-framework-file-portability.png')} alt="Integration framework file portability" width="700"/>

## Integration framework file formats

Both the integration definition file and the action definition file are YAML files. The following sections highlight the formats for each file type. The [Example files](#example-files) section contains samples of completed integration definition and action definition files as a reference.

### Integration definition file format

**\* ** Required fields

* **name* ** [String]: Name displayed in the UI. It must match the `integration` field of each action definition file added to the integration.
* **version* ** [String]: File version number.
* **icon* ** [Base64 String]: Integration logo.
* **script* **: 
   * **type* ** [String]: Indicates which code parser should be used to execute the code within the integration and action definition files. All action definition files for the integration must use the same code language as defined in the integration definition file. Acceptable values are: 
     * `bash`
     * `perl`
     * `powershell`
     * `python`
   * **test_connection_code* ** [String]: Code which can be used to test the integration through the UI by clicking on Test Saved Settings. Exiting with a value of `0` indicates success, while any other value will indicate failure. 
* **docker_repo_tag* ** [String]: Docker repository tag of the image build the new container is from. Can be from any local or remote repository configured on the server.
* **configuration* **: 
   * **testable_connection* ** [Boolean]: Is test code present (true/false).
   * **require_proxy_config* ** [Boolean]: True/false value indicating whether a proxy configuration tab should be available in the UI for the integration. If the value is set to true and a proxy is configured in the UI, the parameter `proxy_url` will be passed to the code on execution as an environment variable. 
   * **data_attributes* **: Fields required for configuration.
      * **<field_name>* ** [String]: Name of field which will be passed to code as environment variable. One <field_name> attribute should be added for each configuration parameter that will be required to configure the integration. For example, if a URL, username, and password are required to connect to an integrated solution, the attributes `configuration:data_attributes:url`, `configuration:data_attributes:user_name`, and `configuration:data_attributes:password` should be added with their appropriate sub-attributes. The <field_name> parameters will be passed to the code on execution.
         * **label* ** [String]: Label displayed in the UI.
         * **type* ** [String]: Type of field. Acceptable values are:
           * `checkbox`
            * `list`
            * `number`
            * `password`
            * `text`
            * `textarea`
         * **required* ** [Boolean]: Is the field required (true/false).
         * **validator** [String]: Input validator type. Acceptable values are: 
           * `host`
           * `integer`
           * `ip`
           * `port`
           * `url`
         * **default** [String]: Default field value.
         * **values** [String]: List of possible values for a list field in key:value format, where the key will be used as the input parameter and the value is what will be shown in the list. For example:
           * `domain: Domain`
           * `ip: IP Address`
           * `url: URL`<br/>In this example, if a user selected IP Address from the dropdown list, the value `ip` would be passed to the parameter at runtime as an environment variable. 
   * **listing_attributes** Configuration fields to show in the resource table.
      * **<field_name>* ** [String]: Name of field which will be shown in the table.
      * **name* ** [String]: Name displayed in the column header.
* **signature** [String]: Signature to indicate integration is the original one written by Sumo Logic.

### Action definition file format

**\* ** Required fields

* **integration* ** [String]: Name of integration. This should match the `name` field of the integration definition file for the integration. 
* **name* ** [String]: Name of action which will be displayed in the UI. If the action name does not already exist, it will be added. However, for consistency and simplicity, it is recommended to use one of the existing names in the list of actions, such as `ip reputation` or `system info`. 
* **type* ** [String]: Type of action being performed. Acceptable values are:
   * `Custom`
   * `Enrichment`
   * `Notification`
* **script* **:
   * **code* ** [String]: Action code.
* **fields* **:
   * **id* ** [String]: Name of field. One ID attribute should be added for each required or optional parameter that may be provided to the integration action at runtime. The name of the ID attribute will be passed as a environment variable to the code containing the dynamic value provided on execution.
   * **label* ** [String]: Label displayed in the UI.
   * **type* ** [String]: Type of field. Acceptable values are: 
     * `checkbox`
      * `datetime`
      * `fileDetonate`
      * `list`
      * `multilist`
      * `number`
      * `tag`
      * `text`
      * `textarea`
      * `upload`
   * **required* ** [Boolean]: Is the field required (true/false).
   * **validator* ** [String]: Input validator type. Acceptable values are:  
     * `datetime`
     * `domain`
     * `e-mail`
     * `hash`
     * `integer`
     * `ipaddress`
     * `ip_domain`
     * `md5`
     * `port`
     * `sha1`
     * `sha256`
     * `url`
   * **default** [String]: Default field value.
   * **values** [String]: List of possible values for a list field in key:value format, where the key will be used as the input parameter and the value will be shown in the list. For example:
     * `domain: Domain`
     * `ip: IP Address`
     * `url: URL`<br/>In this example, if a user selected **IP Address** from the dropdown list, the value `ip` would be passed to the parameter at runtime. 
   * **incident_artifacts** [Boolean]: Allow use of incident artifact values for the field (true/false). When set to `true`, incident artifact values such as `sourceAddress` can be used as inputs for the field. 
* **output* **: Expected fields from results.
   * **path* ** [String]: JSON path for each field which may be returned by the action, using the following JSON as an example:
   ```
   { country: "US",
   response_code: 1,
   as_owner: "CloudFlare, Inc.",
   detected_urls: {
   url: "http://google.com/",
   positives: 2
   }}
   ```
   The following `output:path` attributes should be added:
     * `country`
     * `response_code`
     * `as_owner`
     * `detected_urls.[].url`
     * `detected_urls.[].positives`
     * **type* ** [String]: Type of data returned. Reserved for future use. All outputs are treated as strings.
* **table_view* **: Results to display in table view. The sub-attributes will define which field values returned by the integration will be displayed when viewing the results in table view.
   * **display_name* ** [String]: Column name. 
   * **value* ** [String]: JSON path for each field which may be returned by the action. See the `output:path` field above for additional information.
   * **type* ** [String]: Type of value which is only possible to specify if the value should be shown as a link.
* **src_doc* ** [String]: Result path or raw output to take the entire output to show in html5 iframe sandboxed.
* **url_preview* ** [String]: Result path to show in html5 iframe sandboxed. 
* **image_base64_png(jpg)* ** [String]: Result path of a base64 image png or jpg format.
* **signature** [String]: Signature to indicate action is the original one written by Sumo Logic. Not to be set by user.

## Action parameters

For security reasons, all action parameters are passed to the Docker container as an environment variable, with the variable name equal to the ID specified in YAML. For Python code you can always use:

```
argparse.ArgumentParser()
```

But in that case, you have to specify a class to manage the environment variable:

```
class EnvDefault(argparse.Action):
  def __init__(self, required=True, default=None, **kwargs):
       envvar = kwargs.get("dest")
       default = os.environ.get(envvar, default) if envvar in os.environ else default
       required = False if required and default else required
       super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
   def __call__(self, parser, namespace, values, option_string=None):
       setattr(namespace, self.dest, values)
```

And you must add it into the action `kwargs`:

```
parser.add_argument('--host', help='host , REQUIRED', required=True, action=EnvDefault)
```

Otherwise, if you don't need extra utilities provided by `ArgumentParser` for validation, you can simply use:

```
host = os.environ.get("host", "localhost")
```

## Integration output

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

<img src={useBaseUrl('img/cse/integration-framework-action-result.png')} alt="Action result" width="600"/>

The JSON view will display the entire output of the integration action in JSON format:

<img src={useBaseUrl('img/cse/integration-framework-action-result-2.png')} alt="Action result output" width="600"/>

Following is the setting for a link type:

```
- display_name: 'CVSS'
value : 'cvss'
type : 'link'
```

<img src={useBaseUrl('img/cse/integration-framework-show-details.png')} alt="Show details" width="600"/>

### Added more output type for action

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

<img src={useBaseUrl('img/cse/integration-framework-browser-market-share.png')} alt="Browser market share" width="600"/>

The `image_base64_png(jpg)` field provides the result path where to get base64 png or jpg image, for example:

<img src={useBaseUrl('img/cse/integration-framework-show-details-2.png')} alt="Result path" width="600"/>

## Working with integrations

All integrations are configured by navigating to **Integrations** in the UI.

### Integration definitions

To add a new integration, click on the **+** icon on the **Integrations** page.

<img src={useBaseUrl('img/cse/integration-framework-definition.png')} alt="Add integration" width="800"/>

The **New Integration** window allows you to upload an integration definition file by clicking **Select File**. Once you define the integration definition file, click **Save** to add the new integration.

<img src={useBaseUrl('img/cse/integration-framework-new-integration.png')} alt="New integration" width="600"/>

To edit an existing integration by uploading a new integration definition file , click on the **Edit** button. To export the integration definition file for the selected integration, click the **Export** icon.

### Action definitions

To add a new action, select the appropriate integration from the integrations list, then click on the **Upload** button to the right of the integration.

The **New Action** window allows you to upload an action definition file by clicking **Select File**, and lets you select the kind of action.

<img src={useBaseUrl('img/cse/integration-framework-upload.png')} alt="Upload" width="600"/>

Once the action definition file has been selected, click **Save** to add the new action.

Existing actions may be edited by clicking the **Upload** button below the action name to upload a new action definition file, or by clicking the **Edit** button below the action name to open a text editor and edit the action directly.

<img src={useBaseUrl('img/cse/integration-framework-action-editor.png')} alt="Action editor" width="600"/>

To test an action, click on the **Test Action** button below the action name.

<img src={useBaseUrl('img/cse/integration-framework-add-integration.png')} alt="Add integration" width="600"/>

Enter the required parameters and click **Test Action**.

<img src={useBaseUrl('img/cse/integration-framework-test-action.png')} alt="Test action" width="600"/>

To export an action, click on the **Export** button below the action name.


##  Example files

### Integration definition file (VirusTotal)

```
name: 'VirusTotal'
version: '1.0'
icon:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAAA8RnWXAAAABmJLR0...[snip...]QMq1BbQK47AAAAAASUVORK5CYII=
script:
    type: python
    test_connection_code: |
            import json
            import argparse
            import requests
            import sys
            try:
      
                class EnvDefault(argparse.Action):
                  def __init__(self, required=True, default=None, **kwargs):
                    envvar = kwargs.get("dest")
                    default = os.environ.get(envvar, default) if envvar in os.environ else default
                    required = False if required and default else required
                    super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
                  def __call__(self, parser, namespace, values, option_string=None):
                    setattr(namespace, self.dest, values)
      
                parser = argparse.ArgumentParser()
                parser.add_argument('--api_key', help='api_key , REQUIRED', required=True, action=EnvDefault)
                parser.add_argument('--proxy_url', help='proxy_url', required=False, action=EnvDefault)
                args, unknown = parser.parse_known_args()
                params = {"apikey": args.api_key, 'url': 'google.com'}
                end_point = "https://www.virustotal.com/vtapi/v2/url/scan"
                session = requests.Session()
                if args.proxy_url is not None:
                   proxies = {'http': args.proxy_url, 'https': args.proxy_url}
                else:
                   proxies = None
                r = session.post(end_point, data=params, proxies=proxies, timeout=(5, 60))
                r.raise_for_status()
                exit(0)
            except Exception as e:
                sys.stderr.write(str(e))
                exit(-1)
docker_repo_tag: 'virustotal:latest'
configuration:
  testable_connection: true
  require_proxy_config: true
  data_attributes:
     api_key:
        label: 'api key'
        type: 'password'
        required: true
```

### Action definition file (VirusTotal)

```
integration: 'VirusTotal Open Framework CS'
name: 'scan file'
type: Enrichment
script:
code: |
            import json
            import argparse
            import virustotal from os import listdir
            import subprocess
            import os from os.path import isfile, join
            try:
  
                class EnvDefault(argparse.Action):
                  def __init__(self, required=True, default=None, **kwargs):
                    envvar = kwargs.get("dest")
                    default = os.environ.get(envvar, default) if envvar in os.environ else default
                    required = False if required and default else required
                    super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
                  def __call__(self, parser, namespace, values, option_string=None):
                    setattr(namespace, self.dest, values)
                 parser = argparse.ArgumentParser()
                 parser.add_argument('--api_key', help='api_key , REQUIRED', required=True, action=EnvDefault)
                 parser.add_argument('--filename', help='filename , REQUIRED', required=True, action=EnvDefault)
                 args, unknown = parser.parse_known_args()
                 v = virustotal.VirusTotal(args.api_key)
                 report = v.scan(args.filename)
                 report.join()
                 assert report.done == True
                 result = {
                     'Resource UID': report.id, 
                     'Scan UID': report.scan_id, 
                     'Permalink': report.permalink,
                     'Resource SHA1': report.sha1, 
                     'Resource SHA256': report.sha256,
                     'Resource MD5': report.md5,
                     'Resource status': report.status, 
                     'Antivirus total': report.total,
                     'Antivirus positives': report.positives, 
                     'Malware': []
                 }
                 for antivirus, malware in report:
                     if malware is not None:
                        malware_obj = {'Antivirus': antivirus[0], 'Antivirus version': antivirus[1], 'Antivirus update': antivirus[2], 'Malware': malware}
                        result['Malware'].append(malware_obj)
                 print(json.dumps({'filepath': ['file1', 'file2'],'report': [result]}))
                 exit(0)
            except Exception as e:
                 sys.stderr.write(str(e))
                 exit(1)
fields:
   - id: filename
     label: 'file to scan'
     type: fileDetonate
     required: true
     incident_artifacts: true
     observables: 'file'
output:
    - path : 'filepath.[]'
      type : text
    - path : 'report.[].Antivirus positives'
      type : integer
    - path : 'report.[].Antivirus total'
      type : text
    - path : 'report.[].Permalink'
      type : text
    - path : 'report.[].Resource SHA256'
      type : text
table_view:
    - display_name: 'filepath'
      value : 'filepath'
    - display_name: 'SHA256'
      value : 'report.[].Resource SHA256'
    - display_name: 'MD5'
      value : 'report.[].Resource MD5'
    - display_name: 'Malware'
      value : 'report.[].Malware.[].Malware'
    - display_name: 'Antivirus'
      value : 'report.[].Malware.[].Antivirus'
```


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

<img src={useBaseUrl('img/cse/integration-framework-app-d-image-1.png')} alt="Textarea" width="600"/>

You will get a print HTML of aggregated elements

<img src={useBaseUrl('img/cse/integration-framework-app-d-image-2.png')} alt="HTML of aggregated elements" width="500"/>

## Pipe functions in YAML output

With the same action used in [Use mult-select in output](#use-multi-select-in-output), it's possible to use two common pipe functions to process action output.

Pipe function `join('separator')`:

```
output:
  - path : '[].guid | join(,)'
```

<img src={useBaseUrl('img/cse/integration-framework-app-3-image-1.png')} alt="Join separator pipe function" width="600"/>

And so the next action will run one time with a string created join array element with `separator` specified:

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-2.png')} alt="Separator specified" width="700"/>

Pipe function `unique()`:
```
output:
  - path : '[].tags.[] | unique()'
```

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-3.png')} alt="Unique pipe function" width="600"/>

The array will be populated with not duplicated element:

<img src={useBaseUrl('img/cse/integration-framework-app-e-image-4.png')} alt="Pip function specified" width="800"/>
