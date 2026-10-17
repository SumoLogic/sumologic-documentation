// SCOPE (DOCS-63): The `sumo` language definition covers Sumo Logic LOG search
// query syntax only (pipe operators, parse, where, count, fields, keywords, etc.).
// SCOPE (DOCS-1952): The `metrics` language definition covers Sumo Logic metrics
// query syntax (key=value selectors, pipe operators, metric names, etc.).
export default function (Prism) {
  Prism.languages.metrics = {
    // 1. Quoted values — e.g. _collector="labs - hostmetricsv2"
    'string': {
      pattern: /"(?:\\.|[^\\"])*"/,
      greedy: true,
    },

    // 2. Pipe operator
    'operator': /\|/,

    // 3. Pipe operators and named functions — rendered pink (no italic)
    // Modifier arguments (counter, gauge, over) intentionally excluded — plain in UI
    'keyword': /\b(?:accum|along|avg|bottomk|count|delta|eval|ewma|fillmissing|filter|histogram_quantile|in|max|min|outlier|parse|pct|predict|quantize|rate|stddev|sum|timeshift|topk|where)\b/,

    // 4. Time units (e.g. 5m, 1h, 30s) — MUST come before number
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 5. Special metric variables used in eval expressions
    'variable': /\b_(?:value|granularity|rawmin|rawmax|count)\b/,

    // 6. Selector key (word before =) — plain/white
    'selector-key': /\b[a-zA-Z_]\w*(?=\s*=)/,

    // 7. Unquoted values after = — cyan via 'constant'
    // Stops at space, pipe, quote, =, parens, and brackets
    'constant': /(?<==)[^\s"|=()[\]<>]+/,

    // 8. Whole integers only — avoids highlighting decimal args like .5 inside parens
    'number': /\b\d+\b/,

    // 9. Pipe operator only — * is a wildcard value selector, not arithmetic
    'operator': /[|+\-]/,

    // 10. Punctuation
    'punctuation': /[=,*[\]()]/,
  };

  Prism.languages.sumo = {
    // 1. Strings
    'string': {
      pattern: /"(?:\\.|[^\\"])*"/,
      greedy: true,
    },

    // 2. Regex patterns (parse regex)
    'regex': {
      pattern: /\(\?<.*?\>.*?\)/,
      greedy: true,
    },

    // 3. URLs — covers all Sumo Logic URL schemes
    'url': /\b(?:asn|geo|https?|path|sumo):\/\/\S+/,

    // 4. Keywords — full Sumo Logic operator set (case-sensitive by design)
    // Includes: search operators, aggregate operators, parse operators,
    // Behavior Insights operators, modifiers, and boolean keywords
    // Alphabetized for maintainability
    'keyword': /\b(?:accum|and|append|as|asc|auto|avg|backshift|bin|by|cat|compare|contains|count|count_distinct|count_frequent|csv|dedup|desc|diff|false|field|fields|fillmissing|filter|first|format|formatDate|from|geo|geoip|hash|if|in|join|json|keyvalue|last|least_recent|limit|logcompare|logexplain|logreduce|lookup|lookupContains|matches|max|median|min|most_recent|multi|nodrop|not|now|num|on|or|outlier|parse|parseDate|parseHex|pct|pct_sampling|predict|replace|rollingstd|save|sessionize|smooth|sort|split|stddev|substring|sum|threatip|threatlookup|timeslice|toLowerCase|top|topk|total|toUpperCase|tourl|trace|transpose|trim|true|urldecode|urlencode|values|where|xml)\b/,

    // 5. Time units — MUST come before number so "1m", "24h" etc. match fully
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 6. Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // 7. Operators — character class for clarity
    'operator': /[|=+/,*]/,

    // 8. Metadata fields — alphabetized; case-insensitive to handle _messagetime/_messageTime variants
    'metadata': /\b_(?:collector|dataTier|index|messageTime|raw|source|sourceCategory|sourceHost|sourceName|view)\b/i,

    // 9. Functions (anything followed by parentheses)
    'function': /\b[a-zA-Z_]\w*(?=\()/,
  };
}
