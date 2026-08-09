# Project Rules & Agentic Workspace Governance

## 0. Universal Path Formatting & Shell Execution Environment
- All file paths in rules, documentation, scripts, change records, and agent tool parameters MUST strictly use forward-slash format (e.g., `d:/dev/agy-os`, `d:/CLAUDE-PROJECT/website`). Windows backslashes (`\`) are strictly prohibited in metadata, paths, and documentation instructions to avoid cross-platform regex and tool failures.
- **Terminal Execution Environment**: All script executions, shell commands, and automated tooling MUST strictly run using **Git Bash** (e.g., `& 'C:\Program Files\Git\bin\bash.exe'` or bash shell execution). Running scripts via CMD or PowerShell is strictly prohibited.

## 1. Context & Workspace Boundaries
Workspace Root: `agy-os` (`d:/dev/agy-os`)

- **Target Repo (`website/`)**: `d:/CLAUDE-PROJECT/website`
  - **Access**: **READ-ONLY**. Only allowed for inspection, analysis, audit, AST parsing, and patch creation. Direct writes, edits, or file/folder deletions are strictly forbidden.
- **Harness Repo (`agy-os`)**: `d:/dev/agy-os`
  - **Access**: **READ & WRITE**. Full access to read, write, create, and modify files within this workspace.

## 2. Target Modification via Patch Staging
- Every recommended change to the Target Repo (`website/`) **MUST** be produced as a patch file (`.patch` or `.diff`) and saved in the `harness/patches/` directory within `agy-os`.
- Do not create, alter, or delete files directly in `d:/CLAUDE-PROJECT/website`.

## 3. ECC Custom Plugin Architecture & Subagent Isolation
- **Upstream ECC Reference Isolation**: The upstream `ECC/` directory within `agy-os` is treated strictly as an isolated, READ-ONLY reference library.
- **Installed ECC Location**: Installed ECC plugin assets reside strictly in their target locations: agents in `.agents/plugin/ecc/agents/<name>/agent.md`, rules in `.agents/rules/<name>.md` (flat layout), workflows and bridge workflows in `.agents/workflows/<name>.md` (flat layout), skills in `.agents/skills/<skill-name>/SKILL.md`, and lifecycle hooks configuration at `.agents/hooks.json`. Never write installed assets directly into legacy `.agent/`.
- **Subagent Structure Standard**: ECC agents MUST be converted and stored as `.agents/plugin/ecc/agents/<name>/agent.md` along with supporting prompts, schemas, or references inside `.agents/plugin/ecc/agents/<name>/`.
- **Bridge Workflow Specification**: Root bridge workflows MUST be deployed directly to `.agents/workflows/a-<name>.md` using the `/a-<name>` slash command prefix (e.g., `/a-planner`) to delegate tasks to subagents in a flat, un-nested layout alongside base workflows in `.agents/workflows/<name>.md`.
- **Rules Layout Specification**: Installed rules MUST reside directly in `.agents/rules/<name>.md` as flat files using hyphenated names (e.g., `common-agents.md`, `typescript-coding-style.md`).
- **Hooks Location Specification**: Installed hooks configuration MUST reside at `.agents/hooks.json`.
- **Skills Standard**: Installed skills MUST reside directly under `.agents/skills/<skill-name>/SKILL.md` per the canonical `agentskills.io` standard.

## 4. Non-Destructive Custom Installer & Rollback Rules
- **Non-Destructive Guarantee**: Original installer files `ECC/install.sh` and `ECC/scripts/install-apply.js` MUST NOT be modified under any circumstances.
- **Custom Installer Location & Suffix**: All custom installer scripts, adapters, and entrypoints MUST reside under `harness/agy-script/` and use the `agy` suffix (e.g., `harness/agy-script/install-agy.sh`, `harness/agy-script/scripts/install-apply-agy.js`, `harness/agy-script/adapters/antigravity-project-agy.js`, `harness/agy-script/post-install-agy.js`).
- **Proposal Compliance Verification (OBJ-01)**: Verification scripts such as `harness/agy-script/scripts/verify-installation-agy.js` MUST enforce Fail-Fast validation (exiting with code 1 upon any discrepancy) when checking physical disk installation against Section 2.2 of `docs/OBJ-01/artifacts/proposal.md` across all 6 item kinds (`rules` in `.agents/rules/`, `agents` in `.agents/plugin/ecc/agents/`, `commands`/`workflows` in `.agents/workflows/`, `hooks` at `.agents/hooks.json`, `skills` in `.agents/skills/`, `platform` in `.agents/plugin/ecc/platform/`).
- **Rollback Safety**: Provide an automated `harness/agy-script/uninstall-agy.sh` teardown script to clean up `.agents/plugin/ecc/`, `.agents/rules/`, bridge workflows (`.agents/workflows/a-*.md`), `.agents/hooks.json`, and `.agents/skills/` if customization criteria fail.

## 5. Token Budget Governance
- **Target Token Footprint**: Custom prompt token utilization MUST be targeted and maintained strictly within the safe threshold of **85% – 95%**.
- **Budget Exceeded Rollback**: If total customization token usage exceeds 95%, manual user confirmation is strictly required before executing `harness/agy-script/uninstall-agy.sh` to revert state and adjust module selections with the user.

## 6. Official Agent Skills Specification (`agentskills.io`) Compliance
1. **Directory & Name Alignment**: Every skill must reside in a dedicated directory under `.agents/skills/<skill-name>/` containing a `SKILL.md`. The `name` in YAML frontmatter MUST match the directory name exactly, using only lowercase letters, numbers, and hyphens (`[a-z0-9-]`).
2. **Pushy & Descriptive Triggering**: The `description` field MUST specify both what the skill enables AND explicit triggering phrases/contexts. Descriptions should be slightly "pushy" to ensure reliable agent triggering.
3. **Progressive Disclosure Cap**: Main `SKILL.md` instruction body MUST remain concise (under 500 lines recommended). Deep documentation, schemas, and templates must be split into `references/*.md` or `assets/` and loaded on demand.

## 7. AGY Workflow Layout & Registry Purity Invariant
- The `.agents/workflows/` directory MUST strictly maintain a **Flat & Lean Layout**. 
- Every file directly inside `.agents/workflows/` MUST be a single `.md` workflow file mapping to a valid slash command (including base ECC workflows like `plan.md` and bridge workflows like `a-planner.md`).
- NO nested subdirectories containing `.md` files (e.g., `templates/`, `references/`) are permitted inside `.agents/workflows/` to prevent AGY slash command registry pollution.
- Supporting templates MUST be placed in `docs/` or `assets/`, scripts in `harness/agy-script/` or `harness/scripts/`, and reference documentation under `.agents/skills/<skill-name>/references/`.

## 8. OpenAGY Documentation Hierarchy & Task Verification Invariant
- **Global PRD & Objective Suite Standard**: Exactly ONE Single Source of Truth global PRD exists at [docs/PRD.md](file:///d:/dev/agy-os/docs/PRD.md). Objective suites under `docs/OBJ-XX/` consist strictly of `spec.md`, `design.md`, `task.md`, and `artifacts/`. NO `PRD.md` or `prompt.md` files are permitted inside `docs/OBJ-XX/` directories.
- **Spec Scenario Format**: `spec.md` requirements MUST use `### Requirement: <Name>` and scenarios MUST use `#### Scenario: <Name>` with bulleted `- **WHEN**`, `- **THEN**`, `- **AND**` clauses.
- **Design Matrix & Rollback**: `design.md` MUST contain a 4-column decision table (`Decision | Selected Option | Rationale | Alternatives Considered`) and an explicit Section 5 detailing Non-Destructive Rollback Architecture.
- **Stateful Task Checklists**: `task.md` MUST require sequential execution from the first unchecked checkbox (`- [ ]`) and end every major task group with an explicit **Verification Step** sub-task.
- **Clickable URI Links**: All file path references in documentation MUST use forward slashes (`/`) and clickable `file:///` URIs.

## 9. Prompt Engineering Language & Tool Calling Invariant
- **Prompt Optimization & Architecture Language**: All outputs generated by or using the `/prompt-optimizer` and `/prompt-architect` skills MUST be written strictly in **English**, regardless of the language used in the user's input prompt or interaction.
- **Explicit Tool Calling Mandate**: All prompts generated by `/prompt-optimizer` or `/prompt-architect` MUST explicitly include tool calling directives for every recommended ECC workflow or command (e.g., "Call tool `/plan` to...", "Invoke `/verify` to..."), ensuring deterministic tool execution by AI agents.

## 11. Post-Installation Runtime Script Management Harness Location Invariant
- **Runtime Script Management Harness Location**: All post-installation runtime script management harness modules (including lifecycle hook interceptors, PreToolUse/PostToolUse guardrails, tool observation envelope adapters, and runtime error contract handlers) MUST reside directly inside `.agents/hooks/scripts/` and strictly use the `-agy.js` suffix convention (e.g., `.agents/hooks/scripts/pre-tool-guardrail-agy.js`, `.agents/hooks/scripts/observation-envelope-agy.js`). If custom AGY-native helper libraries are created for runtime scripts, they MUST reside inside `.agents/hooks/scripts/lib/` using the `-agy.js` suffix.
- **Separation of Installer vs. Runtime**: Installer, setup, verification, and teardown scripts MUST remain strictly under `harness/agy-script/` (`install-agy.sh`, `install-apply-agy.js`, `verify-installation-agy.js`, `uninstall-agy.sh`), while active post-installation runtime management scripts MUST reside under `.agents/hooks/scripts/`.
- **In-Place ECC Script Resolution Invariant**: Upstream ECC hook scripts and shared libraries (`ECC/scripts/hooks/`, `ECC/scripts/lib/`) MUST NOT be copied or mirrored into `.agents/hooks/` or `.agents/hooks/lib/`. They MUST be referenced strictly in-place via `CLAUDE_PLUGIN_ROOT=d:/dev/agy-os/ECC` to enforce token budget governance (§5), prevent file duplication, and eliminate version drift.





