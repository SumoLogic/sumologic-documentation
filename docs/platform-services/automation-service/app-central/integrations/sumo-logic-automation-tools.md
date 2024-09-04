---
title: Sumo Logic Automation Tools
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png')} alt="sumo-logic-notifications" width="100"/>

***Version: 1.0  
Updated: Sep 9, 2024***

Sumo Logic Automation Tools simplifies CloudSOAR playbooks with data processing and automation.

### Actions

* **Buffer** (*Custom*) - [Description](#buffer)
* **Data Transform** (*Custom*) - [Description](#data-transform)
* **Build JSON Object** (*Custom*) - [Description](#build-json-object)
* **Build Signal Output** (*Custom*) - [Description](#build-signal-output)

## Actions Details

### Buffer
- Takes a JSON string or object and returns it as a JSON result. Helpful for dumping a JSON blob in string format and rendering in JSON format.

### Data Transform
- Provides various functions to more easily transform data in a playbook:
  - **String Input** - The value to transform.
  - **Transform Function** - Which string operation to use. Valid options are 'Split', 'Strip', 'Replace' or 'Regex'
      - **Split**: Splits a string into an array based on the delimiter provided in the "Transform Argument" parameter.
      - **Strip / lstrip / rstrip**: Removes leading and trailing characters from a string. Space is the default character to remove, unless specified otherwise in the "Transform Argument" parameter.
      - **Append**: Attaches a string to the end of a string (String Input > Transform Argument)
      - **Prepend**: Attaches a string to the beginning of a string (Transform Argument > String Input)
      - **Replace**: Replace a specified string/word/character with the value specified in the "Transform Argument" and "Replace" parameters.
      - **Regex Replace**: Replace a specified string/word/character with the value specified as a regular expression. This allows for user-provided value to be replace within the 'Transform Argument' and an user-provided value to be replace with in the 'Replace' argument.
      - **Regex**: Match a string with a regex pattern (python regex). Currently, this will return only the first capture group/match in an array. Could be further modified to accept an array num input.
      - **Encode UTF8 / Encode ASCII**: Encodes a string in UTF8 or ASCII formats
      - **Lowercase / Uppercase / Title Case / Capitalize**: Converts the case of a string based on the desired case type.
  - **Transform Argument** - Function input (e.g. regex pattern (w/ capture groups), replace argument (a,b) or split delimiter).
  - **Array Element** - Optional: if using 'split' function, select the element to return. Otherwise return the entire array.

### Build JSON Object
- Provide the action with JSON key placeholder or string to build a new JSON object with the specified key/values.

### Build Signal Output
- Get Insight V2 action from the the Sumo Logic CSE integration and then takes all signals from the output and converts it into a formatted signal output to be used (example: the output has been used in an email, ticketing system, or a notes section of the CSOAR incident)
- Exclude fields take precedence over include fields
- Must add the field signals to the output section of the Get Insight V2 action from the Sumo Logic CSE integration
- The output format of the signal can be chosen between (HTML or plain text), with the option to include line breaks in the output.

## Change Log

* Sep 09, 2024 - First upload