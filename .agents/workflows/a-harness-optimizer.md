---
description: "Bridge workflow to delegate tasks to the harness-optimizer subagent"
---

# Bridge Workflow: /a-harness-optimizer

This workflow delegates tasks directly to the `harness-optimizer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/harness-optimizer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-harness-optimizer`:
1. Invoke subagent `harness-optimizer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/harness-optimizer/agent.md).
3. Return execution results to the primary workflow controller.
