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
    'keyword': /\b(parse|regex|lookup|lookupContains|where|if|in|matches|count|sum|avg|min|max|total|timeslice|sort|limit|top|topk|backshift|transpose|join|dedup|format|formatDate|replace|substring|toLowerCase|toUpperCase|now|num|as|by|on|and|or|not)\b/,
    // 5. Numbers
    'number': /\b\d+(?:\.\d+)?\b/,

    // 6. Time units (1m, 5m, etc.)
    'time': /\b\d+(?:ms|s|m|h|d|w)\b/,

    // 7. Operators
    'operator': /\||=|\+|-|\/|,|\*/,

    // 8. Metadata fields (_sourceCategory etc.)
    'metadata': /\b_(?:sourceCategory|sourceHost|sourceName|collector)\b/,

    // 9. Functions (anything followed by parentheses)
    'function': /\b[a-zA-Z_]\w*(?=\()/,

  };
}