# Simplify — Documentation Content Simplification

Simplifies overly complex, verbose, or hard-to-understand documentation content to meet 8th-grade reading level standards.

## What this command does

When you invoke `/simplify`, Claude will:

1. **Read target content**. Get the file, section, or text to simplify
2. **Analyze complexity**. Identify reading level, passive voice, long sentences, jargon
3. **Rewrite content**. Simplify while maintaining technical accuracy
4. **Present comparison**. Show before/after with complexity analysis
5. **Apply changes**. Update with user approval

## When to use this command

* Content is too technical or wordy
* Reading level above 8th grade
* Long, complex sentences (20+ words)
* Excessive passive voice
* Unnecessary jargon or filler words
* User feedback that docs are "hard to understand"
* Preparing content for broader audience

## Workflow

### Step 1: Get Target Content

Ask the user to specify what to simplify:

**Option 1: Full file**
```
/simplify docs/send-data/collect-from-other-sources/azure-monitoring.md
```
Simplifies the entire document.

**Option 2: Specific section**
```
/simplify the Prerequisites section in docs/integrations/saas-cloud/salesforce.md
```
Simplifies just that section.

**Option 3: Line range**
```
/simplify lines 45-78 in docs/metrics/introduction.md
```
Simplifies specific lines.

**Option 4: User provides text**
User pastes text directly for simplification.

### Step 2: Analyze Complexity

Check for these complexity indicators:

#### Reading Level
- **Above 8th grade?** Needs simplification
- Use short words, simple sentences
- One idea per sentence

**Tools to assess:**
- Long words (3+ syllables)
- Sentence length (words per sentence)
- Complex sentence structures

#### Passive Voice
Passive voice makes content harder to read.

❌ **Passive examples:**
- "Data is ingested by Sumo Logic"
- "The dashboard can be configured by users"
- "Logs are parsed and indexed"
- "Alerts are triggered when thresholds are exceeded"

✅ **Active alternatives:**
- "Sumo Logic ingests data"
- "You can configure the dashboard"
- "Sumo Logic parses and indexes logs"
- "Sumo Logic triggers alerts when thresholds are exceeded"

#### Long Sentences
Sentences over 20 words are hard to follow.

❌ **Too long (42 words):**
"In order to configure the source properly, you need to navigate to the Cloud-to-Cloud Integration page in Sumo Logic, select the appropriate integration type from the dropdown menu, and then enter your authentication credentials in the fields provided."

✅ **Broken up:**
"To configure the source, go to the Cloud-to-Cloud Integration page in Sumo Logic. Select your integration type from the dropdown menu. Enter your authentication credentials in the fields."

#### Jargon and Technical Terms
Undefined jargon confuses readers.

❌ **Undefined jargon:**
- "Instantiate a new collector"
- "Leverage the API endpoint"
- "Utilize the following methodology"

✅ **Plain language:**
- "Create a new collector"
- "Use the API endpoint"
- "Follow these steps"

**When technical terms are necessary:**
- Define acronyms on first use: "Application Load Balancer (ALB)"
- Provide context: "The collector (a lightweight agent that sends data)"
- Link to glossary if available

#### Filler Words
Remove these unnecessary words:

| Filler | Example | Better |
|--------|---------|--------|
| simply | simply click the button | click the button |
| just | just add the field | add the field |
| very | very important | important |
| easy | easy to configure | configure |
| straightforward | straightforward process | (remove or rewrite) |
| actually | actually sends data | sends data |
| basically | basically allows you | allows you |

#### Nested Clauses
Multiple commas and dependent clauses make sentences hard to parse.

❌ **Nested (hard to read):**
"The collector, which runs on your infrastructure, collects logs from various sources, including applications, servers, and network devices, and then sends them to Sumo Logic, where they are parsed and indexed."

✅ **Simplified:**
"The collector runs on your infrastructure and collects logs from applications, servers, and network devices. It sends the logs to Sumo Logic for parsing and indexing."

#### Redundancy
Common redundant phrases:

| Replace | With |
|---------|------|
| in order to | to |
| due to the fact that | because |
| at this point in time | now |
| in the event that | if |
| prior to | before |
| subsequent to | after |
| a number of | several, many |
| is able to | can |
| in close proximity to | near |
| for the purpose of | to, for |
| has the ability to | can |
| at the present time | now |

### Step 3: Apply Simplification Rules

#### Sentence Structure Rules

1. **Keep sentences under 20 words**
   - Average 15-17 words per sentence
   - Vary sentence length for readability
   - One main idea per sentence

2. **Use active voice**
   - Subject performs the action
   - More direct and clear
   - Easier to understand

3. **Start with the action or subject**
   - Don't bury the main point
   - Front-load important information
   - Avoid long introductory clauses

4. **Break up complex sentences**
   - Multiple ideas → multiple sentences
   - Dependent clauses → independent sentences
   - Use periods instead of commas

#### Word Choice Rules

1. **Use common words**
   - "use" not "utilize"
   - "start" not "initiate"
   - "end" not "terminate"
   - "get" not "obtain"

2. **Replace jargon**
   - Technical terms → plain language when possible
   - Define acronyms on first use
   - Provide context for unfamiliar concepts

3. **Remove filler adjectives**
   - Delete: very, simply, just, easy, straightforward
   - Only keep if adds meaning

4. **Spell out contractions**
   - Negative contractions: can't → cannot
   - Keep common positive: you'll, they're, we're

#### Paragraph Structure Rules

1. **Keep paragraphs short**
   - 3-5 sentences maximum
   - One main point per paragraph
   - Use white space for readability

2. **Lead with the main point**
   - Topic sentence first
   - Supporting details after
   - Don't bury the lead

3. **Use bullets for lists**
   - 3+ similar items → bullet list
   - Easier to scan
   - Better comprehension

### Step 4: Simplification Examples

#### Example 1: Passive Voice + Jargon

**Original (Grade 12):**
```
The data is ingested by the collector which then utilizes various parsing methodologies to transform the logs into a structured format that can be leveraged by the analytics engine.
```

**Simplified (Grade 8):**
```
The collector ingests data and parses logs into a structured format. You can then use this data in the analytics engine.
```

**Changes:**
- Passive → active: "data is ingested" → "collector ingests"
- Removed jargon: "utilizes" → "parses", "leveraged" → "use"
- Split 31-word sentence into two shorter sentences (10 and 11 words)
- Added "you" to engage reader

#### Example 2: Long Sentence + Nested Clauses

**Original (Grade 13):**
```
In order to configure the AWS CloudTrail source, which collects API activity logs from your AWS account, you need to first navigate to the Sumo Logic console, then select the Manage Data option from the left navigation menu, and finally click on Collection in order to access the configuration page where you can add a new source.
```

**Simplified (Grade 7):**
```
To configure the AWS CloudTrail source, go to the Sumo Logic console. Select **Manage Data** from the left menu, then click **Collection**. This opens the configuration page where you can add the source. The source collects API activity logs from your AWS account.
```

**Changes:**
- Removed "in order to" → "To" (2 instances)
- Split 52-word sentence into 4 shorter sentences (9, 10, 11, 10 words)
- Removed nested clause, moved to separate sentence
- Added bold formatting for UI elements
- More direct instructions

#### Example 3: Technical Jargon

**Original (Grade 14):**
```
The application leverages a sophisticated algorithm to instantiate correlations between disparate data points, thereby enabling users to ascertain patterns that would otherwise remain obfuscated within the raw log data.
```

**Simplified (Grade 8):**
```
The app finds connections between different data points. This helps you spot patterns that are hard to see in raw logs.
```

**Changes:**
- "leverages" → "uses" (then simplified to implicit)
- "instantiate correlations" → "finds connections"
- "disparate" → "different"
- "ascertain patterns" → "spot patterns"
- "remain obfuscated" → "hard to see"
- Split into two short sentences (8 and 11 words)

#### Example 4: Filler Words + Redundancy

**Original (Grade 10):**
```
Simply navigate to the configuration page and just enter your credentials. This is a very straightforward process that is actually quite easy to complete, due to the fact that the interface is basically self-explanatory.
```

**Simplified (Grade 6):**
```
Go to the configuration page and enter your credentials. The interface is self-explanatory.
```

**Changes:**
- Removed fillers: "Simply", "just", "very", "actually quite", "basically"
- Removed redundancy: "due to the fact that" → (removed)
- "navigate to" → "Go to"
- Cut from 28 words to 13 words
- More direct and confident

### Step 5: Present Simplified Version

Show the user:

```markdown
## Original
**Reading level:** 12th grade
**Average sentence length:** 28 words
**Passive voice:** 4 instances

[Original text]

## Simplified
**Reading level:** 8th grade
**Average sentence length:** 14 words
**Passive voice:** 0 instances

[Simplified text]

## Changes made
- Broke 3 long sentences (25+ words) into 7 shorter sentences
- Changed 4 passive voice constructions to active voice
- Removed jargon: "instantiate" → "create", "utilize" → "use", "leverage" → "use"
- Removed filler words: "simply", "very", "just" (5 instances)
- Defined acronym: ALB (Application Load Balancer)
- Removed redundancy: "in order to" → "to" (3 instances)
- Split complex paragraph into two focused paragraphs
- Reduced word count from 247 to 178 words (28% reduction)
```

### Step 6: Apply Changes

After user approval:

1. **Use Edit tool** to replace the content
2. **Preserve structure**. keep headings, lists, code blocks unchanged
3. **Maintain formatting**. line breaks, markdown syntax
4. **Confirm success**

## Safety Guidelines

- **NEVER modify automatically**. always show simplified version first and get approval
- **Preserve technical accuracy**. don't oversimplify to the point of incorrectness
- **Keep code unchanged**. only simplify prose, not code snippets or examples
- **Maintain original meaning**. clarify, don't change intent or facts
- **Don't remove necessary technical terms**. if a term is required, define it instead

## What NOT to Simplify

1. **Code snippets or examples**. Leave code as-is
2. **API endpoint names**. Don't change technical identifiers
3. **Product names**. Proper nouns stay the same
4. **Quotes or references**. Don't modify quoted content
5. **Already-simple content**. If it's 8th grade or below, leave it
6. **URLs or file paths**. Technical paths must stay exact
7. **Version numbers**. Don't change technical specifications

## Edge Cases

### Already simple content
If content already meets readability standards:
```
This content already meets the 8th-grade reading level standard. The average sentence length is 15 words, and there's no passive voice or excessive jargon. No simplification needed.
```

### Highly technical content
If content must stay technical:
- Simplify the surrounding explanation
- Define technical terms clearly
- Add examples or analogies
- Don't sacrifice accuracy

Example:
```
Before: "The OAuth 2.0 authorization framework leverages bearer tokens."
After: "The OAuth 2.0 authorization framework uses bearer tokens (credentials that grant access without additional verification)."
```

### Lists and tables
Focus on descriptive text, not list items:
- Simplify list introductions
- Clarify bullet descriptions
- Don't change list structure

### Short content (1-2 sentences)
May already be optimal:
- Check reading level
- Fix passive voice if present
- Remove filler only
- Don't over-engineer

## Tips for Good Simplification

1. **Read aloud**. If it sounds stiff or confusing, simplify more
2. **One idea per sentence**. Don't combine unrelated concepts
3. **Front-load information**. Put the main point first
4. **Use familiar words**. Choose words most people know
5. **Provide examples**. Concrete examples clarify abstract concepts
6. **Test with fresh eyes**. Would a new user understand this?
7. **Maintain voice**. Keep Sumo Logic conversational tone

## After Simplification

Suggest:
- Review the rest of the document for similar issues
- Use `/tone-check` to validate voice and tone
- Consider if other sections need simplification
- Test with someone unfamiliar with the topic
