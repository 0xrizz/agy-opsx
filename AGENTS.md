# Project Rules & Agentic Workspace Governance — OpenSpec Repository

## 0. Universal Path Formatting & Shell Execution Environment
- All file paths in rules, documentation, scripts, change records, and agent tool parameters MUST strictly use forward-slash format (e.g., `d:/dev/agy-os/frameworks/openspec`, `d:/CLAUDE-PROJECT/website`). Windows backslashes (`\`) are strictly prohibited in metadata, paths, and documentation instructions to avoid cross-platform regex and tool failures.
- **Terminal Execution Environment**: All script executions, shell commands, and automated tooling MUST strictly run using **Git Bash** (e.g., `& 'C:/Program Files/Git/bin/bash.exe'` or bash shell execution). Running scripts via CMD or PowerShell is strictly prohibited.

## 1. Context & Workspace Boundaries
Workspace Root: `openspec` (`d:/dev/agy-os/frameworks/openspec`)

- **Target Repo (`website/`)**: `d:/CLAUDE-PROJECT/website`
  - **Access**: **READ-ONLY**. Only allowed for inspection, analysis, audit, AST parsing, and patch creation. Direct writes, edits, or file/folder deletions are strictly forbidden.
- **Harness Repo (`openspec`)**: `d:/dev/agy-os/frameworks/openspec`
  - **Access**: **READ & WRITE**. Full access to read, write, create, and modify files within this workspace.

## 2. Target Modification via Patch Staging
- Every recommended change to the Target Repo (`website/`) **MUST** be produced as a patch file (`.patch` or `.diff`) and saved in the `harness/patches/` directory within `openspec` (`d:/dev/agy-os/frameworks/openspec/harness/patches/`).
- Do not create, alter, or delete files directly in `d:/CLAUDE-PROJECT/website`.

## 3. OpenSpec & ECC Agentic Workflow Integration
- **OpenSpec Framework Engine**: OpenSpec (`@fission-ai/openspec`) is used for Spec-Driven Development (SDD) to manage proposals, specifications, and change plans.
- **ECC Custom Plugin Architecture**: ECC agentic workflows (agents, workflows, skills, hooks, rules) installed in `.agents/` execute the implementation, TDD, code review, and patch generation based on OpenSpec specifications.
- **Installed ECC Location**: Installed ECC plugin assets reside strictly in their target locations: agents in `.agents/plugin/ecc/agents/<name>/agent.md`, rules in `.agents/rules/<name>.md`, workflows in `.agents/workflows/<name>.md`, skills in `.agents/skills/<skill-name>/SKILL.md`, and hooks at `.agents/hooks.json`.

## 4. Official Agent Skills Specification (`agentskills.io`) Compliance
1. **Directory & Name Alignment**: Every skill must reside under `.agents/skills/<skill-name>/` containing a `SKILL.md`.
2. **Pushy & Descriptive Triggering**: The `description` field MUST specify both what the skill enables AND explicit triggering phrases.
3. **Progressive Disclosure Cap**: Main `SKILL.md` instruction body MUST remain concise (under 500 lines).

## 5. AGY Workflow Layout & Registry Purity Invariant
- The `.agents/workflows/` directory MUST strictly maintain a **Flat & Lean Layout**.
- Every file directly inside `.agents/workflows/` MUST be a single `.md` workflow file mapping to a valid slash command.

## 6. OpenAGY Documentation Hierarchy Invariant
- **Global PRD & Objective Suite Standard**: Exactly ONE Single Source of Truth global PRD exists at [docs/PRD.md](file:///d:/dev/agy-os/docs/PRD.md). Objective suites under `docs/OBJ-XX/` consist strictly of `spec.md`, `design.md`, `task.md`, and `artifacts/`. NO `PRD.md` or `prompt.md` files are permitted inside `docs/OBJ-XX/` directories.

