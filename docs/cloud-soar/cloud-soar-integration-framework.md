---
id: cloud-soar-integration-framework
title: Cloud SOAR Integration Framework
sidebar_label: Integration Framework
description: Learn about the framework used for integrations. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';


The Integration Framework allows you to develop and extend integrations using a common, open, and easy-to-use framework. For increased security and isolation, each integration is executed in its own Docker container, which you can easily customize when you create the integration.

Integrations are defined using two types of text files. The first type, the integration definition file, is used to define the properties of the product which the integration connects. This includes information such as the name, logo, connection parameters, test code, and the Docker container used to execute the actions. One integration definition file is required for each integration and serves as a container for all the actions that the integration will perform.

The second type of file is an action definition file, which is used to define a single action that will be performed using the integration. Each integration action is defined in a separate action definition file, which will be associated with the appropriate integration definition. Action definition files are the files which contain the actual code which will be executed to perform the action. Supported languages include Perl, Python, PowerShell, and Bash. In addition to the action code, action definition files also contain information such as the name, required and optional fields, and the format in which the resulting information will be displayed. 

The following diagram shows the integration file hierarchy:

<img src={useBaseUrl('img/cloud-soar/integration-framework-container.png')} alt="Integraton framework container" width="700"/>

Defining integrations at the action level allows users have greater flexibility in customizing existing integrations and sharing new actions with other users. For example, you may choose to extend the existing RSA NetWitness integration to include an additional action which retrieves all network connections for a given host. Once you create this new action, you can easily add it to the existing RSA Netwitness integration by uploading the new integration action file. 

You can also share this new action and use it to extend the functionality of the integration for others. The following diagram shows action file portability:

<img src={useBaseUrl('img/cloud-soar/integration-framework-file-portability.png')} alt="Integration framework file portability" width="700"/>

## Integration framework file formats

Both the integration definition file and the action definition file are YAML files. The following sections highlight the formats for each file type. The [Example files](#example-files) section contains samples of completed integration definition and action definition files as a reference.

### Integration definition file format

**\* ** Required fields

* **name* ** [String]: Name of integration displayed in the UI. It must match the `integration` field of each action definition file added to the integration. 
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
* **local_repo** [Boolean]: Indicates that the Docker image is a local one and not one present in the repository.
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
* **name* ** [String]: Name of action which will be displayed in the UI. If the action name does not already exist, it will be added. However, for consistency and simplicity, it is recommended to use one of the existing names in the list of actions, such as `ban hash` or `system info`. 
* **type* ** [String]: Type of action being performed. Acceptable values are:
   * `Containment`
   * `Custom`
   * `Daemon`
   * `Notification`
   * `Trigger`
* **script* **:
   * **code* ** [String]: Action code.
* **fields* **:
   * **id* ** [String]: Name of field which will be passed to code at runtime as an environment variable. One ID attribute should be added for each required or optional parameter that may be provided to the integration action at runtime. The name of the ID attribute will be passed as a environment variable to the code containing the dynamic value provided on execution. 
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
   * **observables** [String]: This field defines the link between the action and the observables section. Specifying an observable type here will cause the action to be displayed in the **Actions** menu for the specified observable type. Acceptable values are:
     * `domain`
     * `email`
     * `file`
     * `ipaddress`
     * `md5`
     * `sha1`
     * `sha256`
     * `url`
     * `userdetail`
* **output* **: Expected fields from results.
   * **path* ** [String]:  JSON path for each field which may be returned by the action, using the following JSON as an example:
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
* **use_in_triage** [Boolean]: Action should be manually executable in triage event (default False). 
* **hook** [List]: List of hooks. Fields valid only for trigger actions. Possible values are:
   * `addObservableArtifact`
   * `addObservableDomain`
   * `addObservableIp`
   * `addObservableMail`
   * `addObservableUrl`
   * `addObservableUserDetail`
   * `approveTask`
   * `closeIncident`
   * `closeTask`
   * `createTask`
   * `discardEvent`
   * `grabEvent`
   * `incidentCustomAction`
   * `newIncident`
   * `reassignEvent`
   * `reassignTask`
   * `taskCustomAction`
   * `updateIncident`
   * `updateTask`
   * `webhook`
* **check_not_null_field** [String]: For actions with the hook `incidentCustomAction` and `taskCustomAction`, specifies the internal name of the element field. It should be not null to show the button in the UI.
* **src_doc* ** [String]: Result path or raw output to take the entire output to show in html5 iframe sandboxed. 
* **url_preview* ** [String]: Result path to show in html5 iframe sandboxed.
* **image_base64_png(jpg)* ** [String]: Result path of a base64 image png or jpg format.
* **signature** [String]: Signature to indicate action is the original one written by Sumo Logic.
* **exit_condition**: Specify what condition system has to evaluate to decide if continue with next execution or to stop scheduled action and continue with playbook next actions.
   * **path* ** [String]: Result path where to search in JSON structure as `table_view` section.
   * **string* ** [String]: Result path of string to check if is equal to result value. 
* **re-execution* ** [String] (force): By default if previous action run is not yet finished, next scheduled run is skipped. If you set `re-execution: 'force'`, the previous run will be killed, stopping the Docker container. 
* **scheduled**:
   * **every* ** [String] format <int\><interval type\>: Time interval between one run and the next one (for example, 10s, 5d, etc.):
     * s: SECONDS
     * d: DAYS
     * h: HOURS
     * m: MINUTES
   * **expire* ** [String] format <int\><interval type\>: Time after the first run to stop scheduling. The last result will be kept:
     * s: SECONDS
     * d: DAYS
     * h: HOURS
     * m: MINUTES

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

<img src={useBaseUrl('img/cloud-soar/integration-framework-action-result.png')} alt="Action result" width="600"/>

The JSON view will display the entire output of the integration action in JSON format:

<img src={useBaseUrl('img/cloud-soar/integration-framework-action-result-2.png')} alt="Action result output" width="600"/>

Following is the setting for a link type:

```
- display_name: 'CVSS'
value : 'cvss'
type : 'link'
```

<img src={useBaseUrl('img/cloud-soar/integration-framework-show-details.png')} alt="Show details" width="600"/>

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

<img src={useBaseUrl('img/cloud-soar/integration-framework-browser-market-share.png')} alt="Browser market share" width="600"/>

The `image_base64_png(jpg)` field provides the result path where to get base64 png or jpg image, for example:

<img src={useBaseUrl('img/cloud-soar/integration-framework-show-details-2.png')} alt="Result path" width="600"/>

## Working with integrations

All integrations are configured by navigating to **Integrations** in the UI.

### Integration definitions

To add a new integration, click on the **+** icon on the **Integrations** page.

<img src={useBaseUrl('img/cloud-soar/integration-framework-definition.png')} alt="Add integration" width="800"/>

The **New Integration** window allows you to upload an integration definition file by clicking **Select File**. Once you define the integration definition file and the Docker image, click **Save** to add the new integration.

<img src={useBaseUrl('img/cloud-soar/integration-framework-new-integration.png')} alt="New integration" width="600"/>

To edit an existing integration by uploading a new integration definition file , click on the **Edit** button. To export the integration definition file for the selected integration, click the **Export** icon.

### Action definitions

To add a new action, select the appropriate integration from the integrations list, then click on the **Upload** button to the right of the integration.

The **New Action** window allows you to upload an action definition file by clicking **Select File**, and lets you select the kind of action.

<img src={useBaseUrl('img/cloud-soar/integration-framework-upload.png')} alt="Upload" width="600"/>

Once the action definition file has been selected, click **Save** to add the new action.

Existing actions may be edited by clicking the **Upload** button below the action name to upload a new action definition file, or by clicking the **Edit** button below the action name to open a text editor and edit the action directly.

<img src={useBaseUrl('img/cloud-soar/integration-framework-action-editor.png')} alt="Action editor" width="600"/>

To test an action, click on the **Test Action** button below the action name.

<img src={useBaseUrl('img/cloud-soar/integration-framework-add-integration.png')} alt="Add integration" width="600"/>

Enter the required parameters and click **Test Action**.

<img src={useBaseUrl('img/cloud-soar/integration-framework-test-action.png')} alt="Test action" width="600"/>

To export an action, click on the **Export** button below the action name.


### Daemon action definitions

Uploading an action YAML file with type Daemon allows you to specify Daemon action. You can also define rules associated with Daemon.

<img src={useBaseUrl('img/cloud-soar/integration-framework-daemon-action.png')} alt="Daemon action" width="800"/>

Daemon action must return an array of objects in JSON format:

```
[{ 'a': 'a1', 'b': 'b1' }, { 'a': 'a2', 'b': 'b2' }]
```

Every object is processed by filter and action. It is also possible to define which output field should be passed to the next script run and an extra param key value pair to specialize each rule:

<img src={useBaseUrl('img/cloud-soar/integration-framework-add-automation-rule.png')} alt="Add automation rule" width="600"/>

All available actions are:
* Create incident from template
* Update incident
* Close Incident
* Change incident status
* Add events to an existing incident
* Change task progress
* Close task
* Add to Triage

#### Scheduled action definitions

YAML example:

```
 integration: \'Incident tools\'*
 name: 'intervallo date loop'
 type: Scheduled
 script:
    code: |
        [......]
 exit_condition:
   - path: 'exit_condition'
     string: 'false'
 re-execution: 'force'  
 scheduled: 
     - every: '10s'
       expire: '120s'
 output:
   - path : 'exit_condition'
```

Field notes:
* **re-execution**<br/>By default, if the previous action run is not yet finished, the next scheduled run is skipped. If you set `re-execution: 'force'`, the previous run will be killed, stopping the Docker container.
* **exit_condition**<br/>Specify what condition system has to evaluate to decide if continue with next execution or to stop scheduled action and continue with playbook next actions:
   * **exit_condition: path**<br/>It's where to search in JSON structure as `table_view` section.
   * **exit_condition: string**<br/>Value to check in path.
* **scheduled**<br/>Specify the time interval between one run and the next and action expiration.
   * **scheduled: EVERY**<br/>The time interval between one run and the next.
   * **scheduled: EXPIRE**<br/>The time after the first run to stop scheduling. The last result will be kept. Time interval:
     * s => SECONDS
     * d => DAYS
     * h => HOURS
     * m => MINUTES

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

### Daemon definition file (QRadar)

```
integration: 'IBM QRadar OIF'
name: 'Get Offenses Daemon'
type: Daemon
script:
code: |
    import argparse
    import base64
    import json
    import sys
    import requests
    import warnings
    from requests.packages.urllib3.exceptions import InsecureRequestWarning
    import traceback
    warnings.simplefilter('ignore', InsecureRequestWarning)
    class EnvDefault(argparse.Action):
      def __init__(self, required=True, default=None, **kwargs):
        envvar = kwargs.get("dest")
        default = os.environ.get(envvar, default) if envvar in os.environ else default
        required = False if required and default else required
        super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
      def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values)
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', help='URL , REQUIRED', required=True, action=EnvDefault)
    parser.add_argument('--authMethod', help='Authentication method ,
    REQUIRED', required=True, action=EnvDefault)
    parser.add_argument('--validateSSL', help='validateSSL , REQUIRED',
    required=True, action=EnvDefault)
    parser.add_argument('--id', help='last offense id', required=False, action=EnvDefault)
    parser.add_argument('--username', help='username', required=False, action=EnvDefault)
    parser.add_argument('--password', help='password', required=False, action=EnvDefault)
    parser.add_argument('--token', help='token', required=False, action=EnvDefault)
    parser.add_argument('--proxy_url', help='proxy url',
   required=False, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    max_destination_ip_to_get = 10
    host = str(args.url) + '/api/siem/offenses'
    if args.id:
    host += "?filter=id>" + args.id
    else:
    host += "?filter=id>145366"
    host += '&status!=CLOSED'
    header = {
        'Version': '5.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if args.authMethod == "credentials":
        base64byte = base64.b64encode(bytes(args.username + ":" + args.password, 'utf-8'))
        credential = base64byte.decode("utf-8")
        header['Authorization'] = 'Basic ' + credential
    else:
        header['SEC'] = args.token
    verifySSL = args.validateSSL == "true"
    proxies = {'http': args.proxy_url, 'https': args.proxy_url} if args.proxy_url is not None else None
    try:
        s = requests.Session()
        r = s.get(url=host, headers=header, verify=verifySSL, proxies=proxies, timeout=(5, 60))
        r.raise_for_status()
        json_data = json.loads(r.text)
        new_array = []
        for event in json_data:
            ariel_search_utl = args.url + '/api/siem/source_addresses/'
            event['source_address_ip'] = []
            for source_ip_id in event['source_address_ids']:
                search_ip = ariel_search_utl + str(source_ip_id) + '?fields=source_ip'
                try:
                    request_post = s.get(url=search_ip, headers=header, verify=verifySSL, proxies=proxies, timeout=(5, 60))
                    request_post.raise_for_status()
                    json_data_post = json.loads(request_post.text)
                    event['source_address_ip'].append(json_data_post['source_ip'])
                except Exception:
                    pass
            ariel_search_utl = args.url + '/api/siem/local_destination_addresses/'
            event['local_destination_ip'] = []
            for destination_ip_id in event['local_destination_address_ids'][:max_destination_ip_to_get]:
                search_ip = ariel_search_utl + str(destination_ip_id) + '?fields=local_destination_ip'
                try:
                    request_post = s.get(url=search_ip, headers=header, verify=verifySSL, proxies=proxies, timeout=(5, 60))
                    request_post.raise_for_status()
                    json_data_post = json.loads(request_post.text)
                    event['local_destination_ip'].append(json_data_post['local_destination_ip'])
                except Exception:
                    pass
            new_array.append(event)
        print(json.dumps(new_array))
        exit(0)
    except Exception as e:
        sys.stderr.write(str(e))
        exit(-1)
fields:
    - id: id
      label: "From offence id"
      type: text
output:
    - path: '[].username_count'
      type: integer
    - path: '[].description'
      type: string
    - path: '[].event_count'
      type: integer
    - path: '[].flow_count'
      type: integer
    - path: '[].assigned_to'
      type: string
    - path: '[].security_category_count'
      type: integer
    - path: '[].follow_up'
      type: string
    - path: '[].source_address_ids.[]'
      type: integer
    - path: '[].source_count'
      type: integer
    - path: '[].inactive'
      type: string
    - path: '[].protected'
      type: string
    - path: '[].category_count'
      type: integer
    - path: '[].source_network'
      type: string
    - path: '[].destination_networks.[]'
      type: string
    - path: '[].closing_user'
      type: string
    - path: '[].close_time'
      type: datetime
    - path: '[].remote_destination_count'
      type: integer
    - path: '[].start_time'
      type: datetime
    - path: '[].last_updated_time'
      type: datetime
    - path: '[].credibility'
      type: integer
    - path: '[].magnitude'
      type: integer
    - path: '[].id'
      type: integer
    - path: '[].categories.[]'
      type: string
    - path: '[].severity'
      type: integer
    - path: '[].policy_category_count'
      type: integer
    - path: '[].device_count'
      type: integer
    - path: '[].closing_reason_id'
      type: string
    - path: '[].offense_type'
      type: integer
    - path: '[].relevance'
      type: integer
    - path: '[].domain_id'
      type: integer
    - path: '[].offense_source'
      type: string
    - path: '[].local_destination_address_ids.[]'
      type: integer
    - path: '[].local_destination_count'
      type: integer
    - path: '[].status'
      type: string
    - path: '[].source_address_ip'
      type: string
    - path: '[].local_destination_ip'
      type: string
signature: '4fbf0ab65bde0eba04875da80457b8915645485a399f16100f80fa17a7dd70bae9183afea233a3a9846336f7def5ab0ffd05b28c637d6fe4001203c29396eeb2'
```

### Trigger definition file (Incident Tools)

```
integration: 'Incident Tools'
name: 'Change severity trigger'
type: Trigger
script:
code: |
    import json
    import argparse
    from datetime import datetime
    import sys
    import requests
    import time
    class EnvDefault(argparse.Action):
      def __init__(self, required=True, default=None, **kwargs):
        envvar = kwargs.get("dest")
        default = os.environ.get(envvar, default) if envvar in os.environ else default
        required = False if required and default else required
        super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
      def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values)
    parser = argparse.ArgumentParser()
    parser.add_argument('--incidentsBeforeUpdate', help='incident before update', required=False, action=EnvDefault)
    parser.add_argument('--incidentsAfterUpdate', help='incident after update', required=False, action=EnvDefault)
    parser.add_argument('--token', help='JWT token , REQUIRED', required=True, action=EnvDefault)
    parser.add_argument('--cloudsoarurl', help='Cloud SOAR URL , REQUIRED', required=True, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    inc_det_before = json.loads(args.incidentsBeforeUpdate)
    inc_det_after = json.loads(args.incidentsAfterUpdate)
    incidentID = inc_det_after.get('id')
    sys.stderr.write(str(json.dumps(inc_det_before)))
    sys.stderr.write(str(json.dumps(inc_det_after)))
    prio = inc_det_after.get('restriction')
    if inc_det_after.get('restriction') != inc_det_before.get('restriction'):
        headers = {
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + args.token
        }
        end_point = '{cloudsoarurl}/api/v2/incidents/{incidentid}'.format(cloudsoarurl=args.cloudsoarurl incidentid=incidentID)
        session = requests.Session()
        session.verify = False
        additional_info = inc_det_after.get('additional_info')
        additional_info += "<br>incident field Priority modified to " + str(prio)
        payload = {
            "additional_info": additional_info,
        }
        incident = session.put(end_point, headers=headers, data=payload, proxies=None, timeout=(5, 60))
        try:
            incident.raise_for_status()
        except Exception as e:
            sys.stderr.write("Error updating incident Severity: ")
            sys.stderr.write(str(e))
        exit(0)
hook:
    - updateIncident
```

### Trigger taskCustomAction definition file (Incident Tools)

```
integration: 'Incident tools'
name: 'ADDWORKINFO TASK'
type: Trigger
script:
code: |
    import json
    import argparse
    from datetime import datetime
    import sys
    import time
    class EnvDefault(argparse.Action):
      def __init__(self, required=True, default=None, **kwargs):
        envvar = kwargs.get("dest")
        default = os.environ.get(envvar, default) if envvar in os.environ else default
        required = False if required and default else required
        super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
      def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values)
    parser = argparse.ArgumentParser()
    parser.add_argument('--tasksDetail', help='tasksDetail', required=False, action=EnvDefault)
    parser.add_argument('--text', help='text', required=False, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    task = json.loads(args.tasksDetail)
    print({'element_json': task, 'text': args.text})
check_not_null_field: opt_3
hook:
    - taskCustomAction
```

### Trigger incidentCustomAction definition file (Incident Tools)

```
integration: 'Incident tools'
name: 'ADDWORKINFO'
type: Trigger
script:
code:
    import json
    import argparse
    from datetime import datetime
    import sys
    import time
    class EnvDefault(argparse.Action):
      def __init__(self, required=True, default=None, **kwargs):
        envvar = kwargs.get("dest")
        default = os.environ.get(envvar, default) if envvar in os.environ else default
        required = False if required and default else required
        super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
      def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values)
    parser = argparse.ArgumentParser()
    parser.add_argument('--incidentsDetail', help='incidentsDetail', required=False, action=EnvDefault)
    parser.add_argument('--text', help='text', required=False, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    task = json.loads(args.incidentsDetail)
    print({'element_json': task, 'text': args.text})
check_not_null_field: opt_15
hook:
    - incidentCustomAction
```

### Scheduled definition file (Incident Tools)

```
integration: 'Incident tools'
name: 'intervallo date loop'
type: Scheduled
script:
code:
    import json
    import argparse
    from datetime import datetime
    import sys
    import time
    class EnvDefault(argparse.Action):
      def __init__(self, required=True, default=None, **kwargs):
        envvar = kwargs.get("dest")
        default = os.environ.get(envvar, default) if envvar in os.environ else default
        required = False if required and default else required
        super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
      def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values)
    parser = argparse.ArgumentParser()
    parser.add_argument('--cloudSoarTaskDetails', help='cloudSoarTaskDetails', required=False, action=EnvDefault)
    parser.add_argument('--days', help='days', required=False, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    time.sleep(20)
    dictionary = {
        'exit_condition': 'true',
        'array': [{
            'amount': '23',
            'amount2': 11,
            'days': args.days,
            'start': str(datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")),
            'end': str(datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S"))
        }]
    }
    print(json.dumps(dictionary, default=lambda val: str(val)))
exit_condition:
  - path: 'exit_condition'
string: 'false'
re-execution: 'force'
scheduled:
  - every: '10s'
    expire: '120s'
fields:
    - id: days
      label: 'intervallo giorni'
      type: number
      required: true
output:
    - path : 'array.[].start'
    - path : 'array.[].end'
    - path : 'array.[].days'
    - path : 'array.[].amount'
    - path : 'array.[].amount2'
    - path : 'exit_condition'
```

### Trigger webhook definition file

```
integration: 'Testing Purpose'
name: 'testing webhook'
type: Trigger
hook:
    - webHook
script:
 code: |
    import json 
    import argparse
    from datetime import datetime
    import sys
    import os
    import time
    class EnvDefault(argparse.Action):
        def __init__(self, required=True, default=None, **kwargs):
            envvar = kwargs.get("dest")
            default = os.environ.get(envvar, default) if envvar in os.environ else default
            required = False if required and default else required
            super(EnvDefault, self).__init__(default=default, required=required,**kwargs)
        def __call__(self, parser, namespace, values, option_string=None):
            setattr(namespace, self.dest, values)
                    
    parser = argparse.ArgumentParser()
    parser.add_argument('--payload', help='payload', required=True, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    payload = json.loads(args.payload)
    print(payload.get("title"))
fields:
  - id: payload
    label: 'payload'
    type: text      
    required: true
```

Now you can perform a `POST` request to the [Cloud SOAR API](/docs/cloud-soar/cloud-soar-apis/) `/webhook` resource with a raw payload:
```
{
"title": "test",
"hours": 2,
"percentage": 90,
"priority": 88,
"report_time": "2023-01-19T15:28:38.000Z",
"start_time": "2023-01-19T15:28:34.000Z",
"end_time": "2023-01-19T15:28:37.000Z",
"status": 776,
"assigned_to": 3,
"additional_info": "lorem ipsum additional info text"
}
```

Your script will print `(print(payload.get("title")))` tests. (Cloud SOAR saves log-only action errors, but doesn’t save webhook trigger results.)

You can add more than one webhook trigger. While you cannot discriminate execution at the API request, you can do so inside an action script. For example:
```
if payload.get("title") == "test":
   print("OK")
else:
   return
``` 

## Using a custom Docker image

You can execute all the actions of an integration in a container built from a custom Docker image. This is particularly useful, for example, if you want to improve actions by taking advantage of third-party libraries. In that case, you can install those third-party libraries in the Docker container where actions will be executed making them available to the interpreter of the action scripts. However, there are many other ways in which using a custom Docker image can allow you to customize your integrations and actions.

### Steps to create a custom Docker image

1. Go to the **Integrations** page.
1. Look for the integration for which you need to create a custom Docker image and click on it.
1. Next to the name of the integration, you will see two buttons. Click on the one that is on the far right and has the Docker logo on it.
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-custom-docker-image.png')} alt="Custom Docker image" width="700"/>
<br/>This will open the custom Docker editor:
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-docker-editor.png')} alt="Docker editor" width="700"/>
1. Type a name for your custom image in the **Docker image tag** field. This is a required field.
1. When you are creating a new custom Docker image, you will see the **Last update** field is showing **Never edited before**. The text area below allows you to write a Dockerfile with the instructions to build your custom image:
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-docker-editor-2.png')} alt="Docker custom image" width="700"/>
1. Proceed to write your custom Dockerfile as you would normally do. If you need tips on how to do this, refer to [Useful Docker commands](#useful-docker-commands) or check the Docker official documentation. Keep in mind that the following statements are not currently available, which means they will be ignored when building the image: `COPY`, `WORKDIR`, `EXPOSE`, `ADD`, `ENTRYPOINT`, `USER`, `ARG`, and `STOPSIGNAL`.
1. In the editor you will see there is a dropdown menu above the text area that reads **Valid Instructions**. This dropdown menu enumerates in a descriptive way a set of instructions that you can use in your Dockerfile. If you choose them from the dropdown menu, a new line will be added to your Dockerfile with the keyword to start the statement, so you can pick up from there. The use of this dropdown menu is completely optional and you can write your Dockerfile directly in the text area.
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-docker-editor-3.png')} alt="Docker instructions" width="600"/>
1. As soon as you change something in your Dockerfile, a **Save** button will appear next to the Docker editor button. Click on it if you are ready to save your custom Dockerfile.

Once you have saved a custom Dockerfile, the integration will be executed on a container built from the relative custom Docker image.

### Testing your custom Docker image

We strongly suggest that you test your custom images as soon as you create or modify them. If by any chance you save a faulty custom Dockerfile, when the actions from that integration are triggered, their execution will fail because the Docker image will fail as well.

1. To test your custom images, click where it says **TEST IMAGE** at the bottom right corner of the editor.
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-test-docker-image.png')} alt="Test Docker image" width="6700"/>
<br/>The system will try to build an image from your Dockerfile. While this happens, a spinner will appear in the editor. Consider this may take a few moments, depending on the instructions used in your Dockerfile.
<br/><img src={useBaseUrl('img/cloud-soar/integration-framework-test-docker-image-2.png')} alt="Docker image tested" width="700"/>
1. If your custom Docker image was built without error, a success message will pop up in your screen. Otherwise, if a proper image cannot be built from your custom Dockerfile, an error message will pop up, containing details on what went wrong. In that case, it is very important that you correct your Dockerfile and test it again until an image is built successfully. As an alternative, you can always revert to the original Docker image used by the integration, by clicking on Reset Default Image at the bottom of the editor.

### Deleting your custom Docker image and reverting to the original one

The **RESET DEFAULT IMAGE** button that appears at the bottom of the editor allows you to delete your custom Docker image and revert to the original Docker image used for that integration.

As soon as you click on it, the integration will start being executed again in a container based on the original integration image. Notice that your custom Dockerfile will be lost, so you will have to write it again if you want to revert back to your custom image.

### Checking whether an integration is using a custom Docker image

If you have appropriate permissions, you can set up custom Docker images for any integration. There are many ways to check if any of your integrations are being executed in a container from a custom Docker image.

If you go to the Docker YAML editor of the integration, if it is using a custom image, a comment above the `docker_repo_tag` will tell you so:

<img src={useBaseUrl('img/cloud-soar/integration-framework-test-docker-image-3.png')} alt="Docker custom image" width="800"/>

However, the best way to check whether an integration is using a custom image is to open the Docker editor for that integration (by clicking on the button with the Docker logo on it).

Integrations using a custom image will have a **Docker image tag**, a **Last update** date, and some Dockerfile content.

On the other hand, integrations that are not using a custom Docker image will have an empty Docker editor showing **Never edited before** in the **Last update** field:

<img src={useBaseUrl('img/cloud-soar/integration-framework-test-docker-image-4.png')} alt="Docker never edited" width="800"/>


## Useful Docker commands

The following commands may be useful in performing some common actions in Docker on your server. See the official Docker documentation at https://docs.docker.com/ for additional information.

### Create Docker image (Python example)

1. Create a file with name dockerfile inside a dedicated directory:
   ```
   FROM python:2-slim
   RUN pip install --trusted-host pypi.python.org requests suds
   ```
1. Inside this directory run:
   ```
   docker build -t <my_integration>
   ```
1. If you run Docker image ls you can see your image with tag
   ```
   <my_integration>
   ```
1. Now you can use this tag in YAML:
   ```
   docker_repo_tag: '<my_integration>:latest'
   ```

### Load an image from a tar archive

```
docker load < docker_image.tar
```

### Add third-party libraries to the Docker image when building

```
pip install --trusted-host pypi.python.org tenable_io mock==2.0.0 pytest==3.0.4 Sphinx==1.5.1
```

### List all Docker images

```
docker image ls
```

### Show Docker disk usage

```
docker system df
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

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-d-image-1.png')} alt="Textarea" width="600"/>

You will get a print HTML of aggregated elements

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-d-image-2.png')} alt="HTML of aggregated elements" width="500"/>

## Pipe functions in YAML output

With the same action used in [Use mult-select in output](#use-multi-select-in-output), it's possible to use two common pipe functions to process action output.

Pipe function `join('separator')`:

```
output:
  - path : '[].guid | join(,)'
```

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-3-image-1.png')} alt="Join separator pipe function" width="600"/>

And so the next action will run one time with a string created join array element with `separator` specified:

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-e-image-2.png')} alt="Separator specified" width="700"/>

Pipe function `unique()`:
```
output:
  - path : '[].tags.[] | unique()'
```

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-e-image-3.png')} alt="Unique pipe function" width="600"/>

The array will be populated with not duplicated element:

<img src={useBaseUrl('img/cloud-soar/integration-framework-app-e-image-4.png')} alt="Pip function specified" width="800"/>
