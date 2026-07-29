---
description: "Bridge workflow to delegate tasks to the code-simplifier subagent"
---

# Bridge Workflow: /a-code-simplifier

This workflow delegates tasks directly to the `code-simplifier` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/code-simplifier/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-code-simplifier`:
1. Invoke subagent `code-simplifier` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/code-simplifier/agent.md).
3. Return execution results to the primary workflow controller.
