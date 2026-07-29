---
description: "Bridge workflow to delegate tasks to the performance-optimizer subagent"
---

# Bridge Workflow: /a-performance-optimizer

This workflow delegates tasks directly to the `performance-optimizer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/performance-optimizer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-performance-optimizer`:
1. Invoke subagent `performance-optimizer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/performance-optimizer/agent.md).
3. Return execution results to the primary workflow controller.
