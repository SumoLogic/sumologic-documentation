# humanizer (vendored third-party skill)

`SKILL.md` in this directory is **not authored by Sumo Logic**. It is a verbatim copy of a
third-party skill, included here so every contributor gets the same version without an
install step.

| | |
|---|---|
| Upstream | https://github.com/blader/humanizer |
| Version | 3.0.0 |
| Copied from commit | [`9862685f5`](https://github.com/blader/humanizer/commit/9862685f5) (2026-09-06) |
| `SKILL.md` sha256 | `e8269e236bed06ed0fe4824c274112e54950b0cb46b0bafe5e1576ef7c9f93d5` |
| License | MIT (see below) |

## Updating

Overwrite `SKILL.md` with the upstream file, then update the version, commit, and sha256
above. Confirm the new checksum with:

```bash
shasum -a 256 .claude/skills/humanizer/SKILL.md
```

**Do not edit `SKILL.md` locally.** Keeping it byte-identical to upstream is what makes an
update a clean overwrite rather than a manual merge. If a rule in it needs to change for
this repo, state the change in `AGENTS.md` instead and leave the vendored file alone.

## Where it is used

`AGENTS.md` requires running this skill on the draft of every GitHub PR comment, GitHub
issue comment, and Jira ticket comment. See the **Output tone** section there.

## License

The upstream project is MIT licensed. Its copyright and permission notice, reproduced from
https://github.com/blader/humanizer/blob/main/LICENSE:

```
MIT License

Copyright (c) 2025 Siqi Chen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

This notice covers `SKILL.md` only. The rest of this repository is licensed separately;
see the `LICENSE` file at the repository root.
