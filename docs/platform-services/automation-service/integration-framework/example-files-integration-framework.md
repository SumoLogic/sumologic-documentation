---
id: example-files-integration-framework
title: Example Files for the Integration Framework
sidebar_label: Example Files
description: See example files for the integration framework. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

##  Example files for the Automation Service

Following are example definition and action files for integrations. To see an explanation of the file contents, see [Integration framework file formats](/docs/platform-services/automation-service/integration-framework/about-integration-framework/#integration-framework-file-formats). To see integration definition and action files used in a working integration for Cloud SIEM, see [Advanced example: Configure a custom integration](/docs/cse/automation/cloud-siem-automation-examples/#advanced-example-configure-a-custom-integration).

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

## Example files for Cloud SOAR

The following example files are for Cloud SOAR only.

### Integration definition file to change integration name from VirusTotal to VirusTotalNew 

```
name: 'VirusTotalNew'
official_name: 'VirusTotal'
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

Other example (using strings array)

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
    string:
     - 'false'
     - 'null'
     - 'waiting'
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

Other example (using action's input):

```
integration: 'Testing Purpose'
name: 'testing Scheduled'
type: Scheduled
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
    parser.add_argument('--days', help='days', required=False, action=EnvDefault)
    parser.add_argument('--protocol', help='protocol', required=False, action=EnvDefault)
    parser.add_argument('--closingReasonID', help='closingReasonID', required=False, action=EnvDefault)
    args, unknown = parser.parse_known_args()
    days = args.days
    asd = [
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
        }
    ]
    print(json.dumps(asd))
exit_condition:
  - path: 'input.exit_condition_path'
    string: "input.exit_condition_string"
scheduled:
  - every: 'input.scheduler_every'
    expire: 'input.scheduler_expire'
fields:
  - id: scheduler_every
    label: 'scheduler rate'
    type: text
    required: true
    hint: "schedule rate i.e 1m 5m 1d (supported placeholder m=minutes, h=hours, d=days)"
  - id: scheduler_expire
    label: 'schedule expiration'
    type: text
    required: true
    hint: "schedule expiration i.e 1m 5m 1d (supported placeholder m=minutes, h=hours, d=days)"
  - id: exit_condition_path
    label: 'output path'
    type: text
    required: true
    hint: "output path to check"
  - id: exit_condition_string
    label: 'string to check'
    type: tag
    required: true
    hint: "string to check"
output:
  - path : '[]."ip-dst_string"'
  - path : '[].{Name: name, ID: _id, Address: address, FriendName: friends.[].name}'
  - path : '[].tags.[] | unique()'
  - path : '[].tags.[]'
  - path : '[].guid | join(,)'
  - path : '[].guid | join(SEPARATOR)'
  - path : '[].guid'
  - path : '[]._id'
  - path : '[].guid'
  - path : '[].isActive'
  - path : '[].balance'
  - path : '[].picture'
  - path : '[].eyeColor'
  - path : '[].name'
  - path : '[].age'
  - path : '[].gender'
  - path : '[].company'
  - path : '[].email'
  - path : '[].phone'
  - path : '[].address'
  - path : '[].friends'
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

Now you can perform a `POST` request to the [Cloud SOAR API](/docs/api/cloud-soar/) `/webhook` resource with a raw payload:
```json
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