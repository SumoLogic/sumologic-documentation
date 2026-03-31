export default function (Prism) {
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

    // 3. URLs (VERY IMPORTANT - prevent // issues)
    'url': /\b(?:asn|path|https?):\/\/[^\s]+/,

    // 4. Keywords — full Sumo Logic operator set
    // Includes: search operators, aggregate operators, parse operators,
    // Behavior Insights operators, modifiers, and boolean keywords
    'keyword': /\b(accum|as|backshift|bin|cat|compare|contains|dedup|diff|fields|fillmissing|filter|format|formatDate|geoip|hash|join|limit|lookup|lookupContains|logcompare|logexplain|matches|now|num|outlier|parse|predict|replace|rollingstd|save|sessionize|smooth|sort|substring|threatip|timeslice|toLowerCase|toUpperCase|top|topk|total|tourl|trace|transpose|trim|urldecode|urlencode|where|avg|count|count_distinct|count_frequent|first|last|median|min|max|most_recent|least_recent|pct|pct_sampling|stddev|sum|values|json|csv|xml|keyvalue|split|if|in|and|or|not|by|on|from|append|multi|auto|field|nodrop|asc|desc|true|false)\b/,

    // 5. Time units — MUST come before number so "1m", "24h" etc. match fully
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 6. Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // 7. Operators (removed bare - to avoid false matches on hyphenated field names)
    'operator': /\||=|\+|\/|,|\*/,

    // 8. Metadata fields — case-insensitive to handle _messagetime/_messageTime variants
    'metadata': /\b_(?:sourceCategory|sourceHost|sourceName|collector|source|dataTier|messageTime|raw|view|index)\b/i,

    // 9. Functions (anything followed by parentheses)
    'function': /\b[a-zA-Z_]\w*(?=\()/,
  };
}
