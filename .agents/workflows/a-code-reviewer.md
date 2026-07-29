---
description: "Bridge workflow to delegate tasks to the code-reviewer subagent"
---

# Bridge Workflow: /a-code-reviewer

This workflow delegates tasks directly to the `code-reviewer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/code-reviewer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-code-reviewer`:
1. Invoke subagent `code-reviewer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/code-reviewer/agent.md).
3. Return execution results to the primary workflow controller.
