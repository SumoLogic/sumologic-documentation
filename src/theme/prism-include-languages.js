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

    // 4. Keywords (based on real Sumo operators)
    'keyword': /\b(parse|regex|lookup|lookupContains|where|if|in|matches|count|sum|avg|min|max|pct|total|timeslice|sort|limit|top|topk|first|last|backshift|transpose|join|dedup|save|cat|format|formatDate|replace|substring|toLowerCase|toUpperCase|now|num|as|by|on|and|or|not|append|multi|from)\b/,

    // 5. Time units — MUST come before number so "1m", "24h" etc. match fully
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 6. Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // 7. Operators (removed bare - to avoid false matches on hyphenated field names)
    'operator': /\||=|\+|\/|,|\*/,

    // 8. Metadata fields
    'metadata': /\b_(?:sourceCategory|sourceHost|sourceName|collector|source|dataTier|messageTime|raw)\b/,

    // 9. Functions (anything followed by parentheses)
    'function': /\b[a-zA-Z_]\w*(?=\()/,
  };
}
