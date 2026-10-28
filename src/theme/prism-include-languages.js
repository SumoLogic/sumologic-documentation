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

    // 3. Aggregate/transform/eval pipe operators — rendered pink (no italic)
    // Note: modifier arguments like counter, gauge, over are intentionally excluded
    // as they render as plain text in the Sumo Logic UI
    'keyword': /\b(?:along|avg|bottomk|count|delta|eval|ewma|fillmissing|filter|max|min|outlier|predict|quantize|rate|stddev|sum|timeshift|topk)\b/,

    // 4. Time units (e.g. 5m, 1h, 30s) — MUST come before number
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 5. Special metric variables used in eval expressions
    'variable': /\b_(?:value|granularity|rawmin|rawmax|count)\b/,

    // 6. Selector key (word before =) — plain/white
    'selector-key': /\b[a-zA-Z_]\w*(?=\s*=)/,

    // 7. Unquoted values after = — cyan via 'constant'
    'constant': /(?<==)[^\s"|=]+/,

    // 8. Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // 9. Operators including arithmetic used in eval
    'operator': /[|*/+\-]/,

    // 10. Punctuation
    'punctuation': /[=,]/,
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
