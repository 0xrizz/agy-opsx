---
trigger: manual
---

# Non-Prescriptive Deep-Thinking & Context Management Prompt Engineering Rules

This rule defines mandatory behavioral guidelines, prompt engineering patterns, and context window management invariants for autonomous AI agents within the Antigravity harness environment.

---

## 1. Goal-Oriented Non-Prescriptive Prompting
- **Outcome-Driven Directives**: Prompts engineered for autonomous agents MUST focus on specifying high-level goals, system context, and non-negotiable architectural invariants rather than micro-dictating individual shell commands, script calls, or code edits.
- **Agentic Autonomy**: Allow the AI agent to reason over the optimal execution sequence, tool selection, and code structures to achieve the specified goal cleanly.

---

## 2. Mandatory Extended Thinking Triggers
- **Pre-Execution Architectural Vector Analysis**: Prompts MUST explicitly force extended thinking mode by instructing the AI agent to analyze architectural trade-offs, edge cases, system invariants, and verification criteria *before* generating documentation or code.
- **Deep Verification Planning**: Require explicit step-by-step reasoning on complex tasks prior to performing file creations, deletions, or structural modifications.

---

## 3. Context Boundary Governance & Token Optimization
- **Explicit Deliverable Scoping**: Prompts MUST explicitly restrict file deliverables to target directories (e.g., scoping proposal generation strictly to `docs/OBJ-XX/artifacts/` when directed) to prevent context window clutter and unnecessary file churn.
- **Persistent Knowledge Graph Retrieval**: Prefer querying persistent knowledge graphs ([graphify-out/graph.json](file:///d:/dev/agy-os/graphify-out/graph.json)) or session persistence (`/save-session`, `/resume-session`) over dumping raw codebase files into active prompt memory.
- **Safe Token Footprint**: Structure prompts to maintain custom prompt token utilization strictly within the safe governance threshold of **85.0%–95.0%**.

---

## 4. Interactive Alignment & Approval Invariants
- **Design Alignment via `/grill-me`**: Use interactive design interviews (`/grill-me`) to clarify ambiguous requirements, resolve design dependencies, and obtain user alignment before creating major deliverables.
- **Strict Approval Gating**: Respect user approval boundaries ("NOT APPROVED", "read-only target repo", "artifacts only"). Halt immediately and update plans when the user restricts scope or denies approval.

---

## 5. Canonical Medium-Short English Prompt Template
When authoring or optimizing prompts for task execution, apply the following canonical pattern:

```markdown
# TASK: [Goal Description]

## CONTEXT
- **Target Objective**: [Objective Name/ID]
- **Primary Artifacts**: [Link to source artifacts/specs]
- **System Constraints**: [Non-negotiable invariants, forward-slash paths, read-only repos]

## DEEP THINKING & ARCHITECTURAL REASONING
Before generating any files or executing code, engage in extended thinking to evaluate:
1. [Architectural Vector 1: Trade-offs & Isolation Dynamics]
2. [Architectural Vector 2: System Invariants & Spec Compliance]
3. [Architectural Vector 3: Edge Cases & Verification Strategy]

## GOAL & DELIVERABLES
Produce fully populated, spec-driven deliverables:
- `[Target File 1]`: [Specific deliverable requirement]
- `[Target File 2]`: [Specific deliverable requirement]

## MANDATORY INVARIANTS
- Strictly use forward slashes (/) and clickable file:/// URIs.
- Target repository (`d:/CLAUDE-PROJECT/website`) is READ-ONLY.
```

---

## 6. Context-Referenced Prompt Density & Token Optimization
- **Anchored References**: When objective context already exists in `docs/OBJ-XX/` (`spec.md`, `design.md`, `task.md`), task execution prompts MUST be medium-short and high-density, referencing exact clickable `file:///` URIs and line ranges rather than duplicating specification text.
- **Zero Redundancy Invariant**: Prevent token budget bloat by avoiding redundant re-explanations of baseline manifests or directory structures already documented in objective artifacts.
