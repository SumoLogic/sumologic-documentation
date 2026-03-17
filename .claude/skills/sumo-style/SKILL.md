---
name: sumo-style
description: Sumo Logic writing conventions and style guide. Apply when writing, editing, or reviewing any documentation content for the sumologic-documentation repo.
---

# Sumo Logic Style Guide — sumologic-documentation

## Always fetch before applying rules

Before writing, editing, or auditing any content, fetch both of these pages:

* https://www.sumologic.com/help/docs/contributing/style-guide/
* https://www.sumologic.com/help/docs/contributing/word-list/

Apply the fetched rules. This is a living style guide -- the live pages take precedence over everything below. The rules below are fallback defaults only, for cases where the fetch fails or is unavailable.


## Fallback defaults

### Voice and tone

- Address the reader as "you" -- never "the user", "users", or "one"
- Active voice throughout
- Conversational but professional -- no stiff or institutional phrasing
- No "please" in task directives; introduce instructions with a stem ("To add a collector:")
- Use "need to" instead of "must" or "have to"
- Always write "Sumo Logic" in full -- never "Sumo" (except in code); "we" is acceptable conversationally
- Aim for approximately 8th-grade reading level in introductory content
- Avoid filler adjectives: "very", "best", "simply", "just", "easy", "straightforward"
- Be judicious with "always" and "never"

### Contractions

- Common contractions (you'll, they're, I'm, we're) are acceptable
- Negative contractions must be spelled out: "cannot" not "can't", "will not" not "won't", "do not" not "don't"
- Avoid uncommon contractions: "should've", "it'll", "they'd"

### Abbreviations

- "for example" not "e.g."
- "that is" not "i.e."
- "and so on" not "etc."

### Acronyms

- Spell out on first use in body text, then use the acronym throughout: "Application Load Balancer (ALB)"
- Do not spell out in headings -- use the acronym only

### Inclusive language

| Use | Avoid |
|-----|-------|
| allowlist | whitelist |
| denylist | blacklist |
| placeholder data | dummy data |
| primary / main | master |
| press / click | hit |

- No gender pronouns unless referring to a named person
- No regional idioms or slang

### Capitalization

- Doc titles (`title:` frontmatter): Title Case
- H2 and below: sentence case (proper nouns excepted)
- Never use H1 in the body -- it's generated from `title:`
- Sumo Logic product terms: Collector, Source, Library, Hosted Collector (capitalize per word list)
- User-created dashboards: lowercase ("dashboard")

### Headings

- Plain text only -- no bold, italics, or inline code in headings
- Keep titles under 60 characters for SEO

### Emphasis

- Bold: UI elements the reader interacts with (buttons, tabs, field names)
- Italics: first-time term definitions, or content the reader types into a field
- Never underline text

### Lists

- Numbered lists for sequential steps
- Bulleted lists (using `-`) for non-sequential items
- Always use `1.` for numbered steps -- markdown auto-numbers on build
- End each bullet with a terminal period
- Introduce instructions with a stem before the list

### Links

- Internal links: relative paths or `useBaseUrl`
- External links: full absolute URLs
- Descriptive link text -- never "click here" or "here"
- Use "Learn more" when linking to supplementary Sumo Logic docs
- Do not use "click on" -- use "click"

### Code

- Inline code: single backticks for commands, operators, API methods, error messages
- Code blocks: triple backticks, always specify the language
  - `sql` for Sumo Logic queries
  - `json` for Sumo Logic log examples
- Code blocks are for runnable snippets only -- not for error messages or non-executable output

### Word list quick reference (fetch the full list)

- "click" not "click on"
- "data are" not "data is"
- "check box" -- two words
- "plugin" -- one word, no hyphen
- "dropdown" (noun), "drop-down" (adjective)
- "setup" (noun/adjective), "set up" (verb)
- "login" (noun/adjective), "log in" (verb)
- "email" -- one word, no hyphen, lowercase
- "JavaScript" -- always camelCase
- "repo" -- acceptable, no need to spell out "repository"
- Spell out numbers one through nine; use numerals for 10 and above
- Ampersand (&): do not use for "and" in prose

### App and source openers

- App docs must open with: "The Sumo Logic app for [Vendor]..."
- C2C source docs must open with: "The Sumo Logic source for [Vendor]..."

### Doc structure

Every doc should include:

1. Frontmatter
2. Introduction (what the page teaches, why read it, who should read it)
3. Contextual guidance (where this fits in a tutorial or workflow, if applicable)
4. Links to related concepts for additional reading
5. Admonitions where appropriate

### Contributing workflow

1. Fork the repo and create a branch from `main`
2. Edit or add markdown files in `/docs`
3. Add frontmatter to every new file
4. Add the page to `sidebars.ts`
5. Add to the hub/index page if creating a new section page
6. Add a CID URL mapping in `cid-redirects.json` if needed
7. Submit a PR to `main`
