---
description: "Bridge workflow to delegate tasks to the react-reviewer subagent"
---

# Bridge Workflow: /a-react-reviewer

This workflow delegates tasks directly to the `react-reviewer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/react-reviewer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-react-reviewer`:
1. Invoke subagent `react-reviewer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/react-reviewer/agent.md).
3. Return execution results to the primary workflow controller.
