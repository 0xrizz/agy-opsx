---
description: "Bridge workflow to delegate tasks to the loop-operator subagent"
---

# Bridge Workflow: /a-loop-operator

This workflow delegates tasks directly to the `loop-operator` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/loop-operator/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-loop-operator`:
1. Invoke subagent `loop-operator` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/loop-operator/agent.md).
3. Return execution results to the primary workflow controller.
