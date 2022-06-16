---
id: test
title: Sumo Syntax Test
---


```sumo
_sourceCategory=Labs/Apache/Access
| parse "HTTP/1.1\" * " as status_code
| if(status_code=200, 1, 0) as successes
| if(status_code=404, 1, 0) as client_errors  
| sum(successes) as success_cnt, sum(client_errors) as client_errors_cnt
```

```sumo
_sourceCategory=Labs/Apache/Access and status_code=404
| logcompare timeshift -24h
| where abs(_deltaPercentage) > 25
```


```sumo
_sourceCategory=Labs/Apache/Access status_code=404
| timeslice 1m
| count(status_code) as error_count by _timeslice
| outlier error_count window=10, consecutive=1, threshold=3, direction=+-
```


```sumo
_sourceCategory=Labs/Apache/Access
| parse "* - -" as client_ip
| lookup latitude, longitude from geo://location on ip=client_ip
| count by latitude, longitude
| sort _count
```



```sumo
_sourceCategory=Labs/Apache/Access (status_code=200 or status_code=404)
| timeslice 1m
| if (status_code = "200", 1, 0) as successes
| if (status_code = "404", 1, 0) as fails
| sum(successes) as success_cnt, sum(fails) as fail_cnt by _timeslice
| (fail_cnt/(success_cnt+fail_cnt)) * 100 as failure_rate_pct
| sort _timeslice desc
| outlier failure_rate_pct window=5, threshold=3, consecutive=1, direction=+
```


<details><summary><small>Source file = /node_modules/prismjs/components/prism-sumo.js (click to expand)</small></summary>

```js
Prism.languages.sumo = {
	{
  variables: {
    digitpart: (?:\d(?:_?\d)*),
    id: (?:[\p{L}_$][\p{L}\p{N}_$]*),
    classcase_id: (?:\p{Lu}[\p{L}\p{N}_$]*),
    lowercase_id: (?:[_$]*\p{Ll}[\p{Ll}\p{N}_$]*\b),
    uppercase_id: (?:[_$]*\p{Lu}[\p{Lu}\p{N}_$]*\b),
    before_fqn: (?={{lowercase_id}}\s*\.)
  },
  contexts: {
    comments: [
      {
        match: "\/\/",
        scope: "punctuation.definition.comment.sumo",
        push: [
          {
            meta_scope: "comment.line.double-slash.sumo",
          },
          {
            match: \n,
            pop: true
          }
        ]
      },
      {
        match: \/\*,
        scope: "punctuation.definition.comment.sumo",
        push: [
          {
            meta_scope: "comment.block.c",
          },
          {
            match: \*\/,
            pop: true
          }
        ]
      }
    ],
    prototype: [
      {
        match: '(?=%>)',
        pop: true
      },
      {
        include: "comments"
      }
    ],
    any_POP: [
      {
        match: '(?=\S)',
        pop: true
      }
    ],
    immediate_POP: [
      {
        match: '',
        pop: true
      }
    ],
    main: [
      {
        include: "fields-operator"
      },
      {
        match: (?!\|  ),
        scope: "variable.language"
      },
      {
        match: '(ID:)([\S]+)',
        captures: {
          1: "keyword.other",
          2: "variable.language"
        }
      },
      {
        match: '\b(Scheduled Views|From Time|To Time|Records|Messages|Collectors|Collector|Sources|FERs|Partitions Indecies|Personal Folder Contents)\b',
        captures: {
          1: "keyword.other",
          2: "variable.language"
        }
      },
      {
        match: (Pending Warnings|Pending Errors|InProgress),
        captures: {
          1: "support.function"
        }
      },
      {
        match: '\+(=)+|\+|Completions|#|DONE GATHERING RESULTS | ([0-9]+\.[0-9]+)%',
        scope: "variable.language"
      },
      {
        match: '=|\-|:|<|>',
        scope: "keyword.other"
      },
      {
        match: \|,
        scope: "support.function"
      },
      {
        match: 'successfully|Loaded|DONE!|Success|▮|http[s]?://[^\s]+',
        scope: "string.quoted"
      },
      {
        include: "fields"
      },
      {
        include: "comments"
      },
      {
        include: "prototype"
      },
      {
        include: "code"
      }
    ],
    fields: [
      {
        match: (?:\s+as\s+)({{id}}),
        scope: "keyword.other.as.sumo",
        captures: {
          1: "variable.language.sumo meta.field.user.sumo"
        }
      }
    ],
    punctuation-accessor-dot: [
      {
        match: '\.',
        scope: "punctuation.accessor.dot.sumo"
      }
    ],
    punctuation-separator-comma: [
      {
        match: \,
        scope: "punctuation.separator.comma.sumo"
      }
    ],
    punctuation-terminator-semicolon: [
      {
        match: ';',
        scope: "punctuation.terminator.sumo"
      }
    ],
    before-next-pipe: [
      {
        match: (?=\b\|\b),
        pop: true
      }
    ],
    generic-type-invocation: [
      {
        match: <,
        scope: "punctuation.definition.generic.begin.sumo",
        set: "generic-type-argument"
      },
      {
        include: "any_POP"
      }
    ],
    object-type-reference: [
      {
        match: '{{before_fqn}}',
        set: [
          {
            meta_scope: "meta.path.sumo"
          },
          {
            include: "package"
          },
          {
            include: "object-type-reference-no-fqn"
          }
        ]
      },
      {
        include: "object-type-reference-no-fqn"
      }
    ],
    generic-type-argument: [
      {
        meta_scope: "meta.generic.sumo"
      },
      {
        match: \?,
        scope: "keyword.operator.wildcard.sumo",
        push: "generic-type-bounds"
      },
      {
        include: "generic-type-terminator"
      },
      {
        include: "object-and-array-types"
      },
      {
        include: "punctuation-separator-comma"
      }
    ],
    generic-type-bounds: [
      {
        match: '(,)|(?=>)',
        captures: {
          1: "punctuation.separator.comma.sumo"
        },
        pop: true
      },
      {
        match: \bextends\b,
        scope: "keyword.declaration.extends.sumo",
        push: [
          "generic-type-extends-multiple-bounds",
          "object-type-reference"
        ]
      },
      {
        match: \bsuper\b,
        scope: "keyword.declaration.super.sumo",
        push: "object-type-reference"
      }
    ],
    generic-type-extends-multiple-bounds: [
      {
        match: "&",
        scope: "keyword.operator.multiple-bounds.sumo",
        set: [
          "generic-type-extends-multiple-bounds",
          "object-type-reference"
        ]
      },
      {
        include: "any_POP"
      }
    ],
    method-invocations: [
      {
        match: (\.),
        captures: {
          1: "punctuation.accessor.dot."
        },
        push: "generic-type-invocation"
      },
      {
        match: '({{id}})\s*(\()',
        captures: {
          1: "variable.function.sumo",
          2: "punctuation.section.parens.begin.sumo"
        },
        push: [
          {
            meta_scope: "meta.function-call.sumo"
          },
          {
            match: \),
            scope: "punctuation.section.parens.end.sumo",
            pop: true
          },
          {
            include: "illegal-parens-terminators"
          },
          {
            include: "code"
          },
          {
            include: "punctuation-separator-comma"
          }
        ]
      }
    ],
    assignment: [
      {
        match: ([|&^*/+-]\=|\=(?!=)),
        scope: "keyword.operator.assignment.sumo",
        push: [
          {
            meta_scope: "meta.assignment.rhs.sumo"
          },
          {
            match: '(?=;|\)|\}|,)',
            pop: true
          },
          {
            include: "code"
          }
        ]
      }
    ],
    parens: [
      {
        match: "\(",
        scope: "punctuation.section.parens.begin.sumo",
        push: [
          {
            meta_scope: "meta.parens.sumo"
          },
          {
            match: "\)",
            scope: "punctuation.section.parens.end.sumo",
            pop: true
          },
          {
            include: "illegal-parens-terminators"
          },
          {
            include: "code"
          }
        ]
      }
    ],
    code: [
      {
        include: "assignment"
      },
      {
        include: "strings"
      },
      {
        include: "regexps"
      },
      {
        include: "method-invocations"
      },
      {
        include: "parens"
      },
      {
        include: "stray-parens"
      },
      {
        include: "coln-set"
      },
      {
        include: "scn-set"
      },
      {
        include: "idxn-set"
      },
      {
        include: "srcn-set"
      },
      {
        include: "svn-set"
      },
      {
        include: "builtin-group-operators"
      },
      {
        include: "builtin-parsing-operators"
      },
      {
        include: "builtin-cast-functions"
      },
      {
        include: "builtin-parse-operators"
      },
      {
        include: "builtin-network-control-functions"
      },
      {
        include: "builtin-network-format-functions"
      },
      {
        include: "builtin-search-format-functions"
      },
      {
        include: "builtin-metadata-variable-fields"
      },
      {
        include: "builtin-metadata-constants-fields"
      },
      {
        include: "builtin-string-functions"
      },
      {
        include: "builtin-control-functions"
      },
      {
        include: "builtin-filter-operators"
      },
      {
        include: "builtin-other-functions"
      },
      {
        include: "builtin-other-operators"
      }
    ],
    stray-braces: [
      {
        match: "\}",
        scope: "invalid.illegal.stray-brace-end",
      }
    ],
    stray-parens: [
      {
        match: "\)",
        scope: "invalid.illegal.stray-parens-end"
      }
    ],
    strings: [
      {
        match: '"',
        scope: "punctuation.definition.string.begin.sumo",
        push: [
          {
            meta_include_prototype: false
          },
          {
            meta_scope: "string.quoted.double.sumo"
          },
          {
            match: '(")|(\n)',
            captures: {
              1: "punctuation.definition.string.end.sumo",
              2: "invalid.illegal.newline.sumo"
            },
            pop: true
          },
          {
            match: "\\.",
            scope: "constant.character.escape.sumo"
          }
        ]
      },
      {
        match: "'",
        scope: "punctuation.definition.string.begin.sumo",
        push: [
          {
            meta_include_prototype: false
          },
          {
            meta_scope: "string.quoted.single.sumo"
          },
          {
            match: '(')|(\n)',
            captures: {
              1: "punctuation.definition.string.end.sumo",
              2: "invalid.illegal.newline.sumo"
            },
            pop: true
          },
          {
            match: "\\.",
            scope: "constant.character.escape.sumo"
          }
        ]
      }
    ],
    regexps: [
      {
        match: '(parse\s+regex)(?:\s+)(")',
        captures: {
          1: "keyword.function.parse.regex.sumo",
          2: "string.quoted.double.sumo punctuation.definition.string.begin.sumo"
        },
        push: [
          {
            meta_content_scope: "string.quoted.double.sumo"
          },
          {
            match: '"',
            scope: "punctuation.definition.string.end.sumo",
            pop: true
          },
          {
            match: '',
            embed: "scope:source.regexp.sumo",
            escape: '(?=")',
          }
        ]
      }
    ],
    builtin-other-functions: [
      {
        match: '\b(length|formatDate|toString|ipv4ToNumber|count_distinct|count_distinct_approx|count_frequent|topk|contains|getCIDRPrefix|now|sort|transpose|cat|save|logcompare|kv|parseHex|luhn)\(',
        scope: "support.function.other.sumo"
      }
    ],
    builtin-other-operators: [
      {
        match: "(lookup|trace|limit|join|order|compare|diff|total|predict|rollingstd|eval|timeslice|compose)",
        scope: "support.function.other.sumo"
      }
    ],
    fields-operator: [
      {
        match: '\|\s+(fields|where|AND|OR)(\-)?(?:\s+)(.*)',
        captures: {
          1: "support.function.other.sumo",
          2: "keyword.language.sumo",
          3: "variable.language.sumo"
        },
        push: [
          {
            meta_scope: "meta.function-call.sumo"
          },
          {
            match: \n|\|,
            pop: true
          }
        ]
      }
    ],
    builtin-search-control-functions: [
      {
        match: "top|first|last",
        scope: "keyword.function.search.control.sumo"
      }
    ],
    builtin-filter-operators: [
      {
        match: \b(outlier|logreduce|backshift|filter|smooth|transaction|transactionize|count|fillmissing|group|accum|by|compare)\b,
        scope: "keyword.operator.search.filter.sumo"
      }
    ],
    builtin-control-functions: [
      {
        match: \b(AND|if|OR|isBlank|isEmpty|isNull|isNumeric|isPrivateIP|isPublicIP|isValidIP|isValidIPv4|isValidIPv6)\b,
        scope: "keyword.operator.control.logical.sumo"
      }
    ],
    builtin-string-functions: [
      {
        match: \b(replace|substring|toLowerCase|toUpperCase|tourl|trim|urldecode|urlencode|now)\b,
        scope: "keyword.function.string.sumo"
      }
    ],
    builtin-network-control-functions: [
      {
        match: \b(compareCIDRPrefix)\b,
        scope: "keyword.function.control.network.sumo"
      }
    ],
    builtin-network-format-functions: [
      {
        match: \b(base64Decode|base64Encode|maskFromCIDR)\b,
        scope: "keyword.function.format.network.sumo"
      }
    ],
    builtin-search-format-functions: [
      {
        match: \b(concat|decToHex|format|haversine|hexToAscii|hexToDec)\b,
        scope: "keyword.function.search.other.format.sumo"
      }
    ],
    builtin-metadata-variable-fields: [
      {
        match: \b(_blockId|_collector|_collectorId|_format|_index|_messageCount|_messageId|_messageTime|_raw|_receiptTime|_size|_source|_sourceCategory|_sourceHost|_sourceId|_sourceName|_view)\b,
        scope: "keyword.variable.metadata.search.field.sumo"
      }
    ],
    builtin-group-operators: [
      {
        match: \b(count|fillmissing|group|accum|by)\b,
        scope: "keyword.operator.search.goup.sumo"
      }
    ],
    builtin-metadata-constants-fields: [
      {
        match: \b(queryEndTime()|queryStartTime()|queryTimeRange())\b,
        scope: "keyword.constant.metadata.field.sumo"
      }
    ],
    scn-set: [
      {
        match: \b(_sourceCategory)(?:=)(\S*)?,
        scope: "support.constant.metadata.field",
        captures: {
          1: "support.constant.metadata.field._sourcecategory.sumo",
          2: "meta.constant.metadata.field._sourcecategory.value.sumo"
        }
      },
      {
        match: \s,
        pop: true
      }
    ],
    coln-set: [
      {
        match: \b(_collector)(?:=)(\S*)?,
        scope: "support.constant.metadata.field",
        captures: {
          1: "support.constant.metadata.field._collector.sumo",
          2: "meta.constant.metadata.field._collector.value.sumo"
        }
      },
      {
        match: \s,
        pop: true
      }
    ],
    srcn-set: [
      {
        match: \b(_sourceName)((?:=)(\S*))?,
        scope: "support.constant.metadata.field",
        captures: {
          1: "support.constant.metadata.field._sourceName.sumo",
          2: "meta.constant.metadata.field._sourceName.value.sumo"
        }
      },
      {
        match: \s,
        pop: true
      }
    ],
    svn-set: [
      {
        match: \b(_view)((?:=)(\S*))?,
        scope: "support.constant.metadata.field",
        captures: {
          1: "support.constant.metadata.field._view.sumo",
          2: "meta.constant.metadata.field._view.value.sumo"
        }
      },
      {
        match: \s,
        pop: true
      }
    ],
    idxn-set: [
      {
        match: \b(_index)((?:=)(\S*))?,
        scope: "support.constant.metadata.field",
        captures: {
          1: "support.constant.metadata.field._index.sumo",
          2: "meta.constant.metadata.field._index.value.sumo"
        }
      },
      {
        match: \s,
        pop: true
      }
    ]
  }
};
```

</details>
