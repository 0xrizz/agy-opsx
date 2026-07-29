---
description: "Bridge workflow to delegate tasks to the gan-planner subagent"
---

# Bridge Workflow: /a-gan-planner

This workflow delegates tasks directly to the `gan-planner` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/gan-planner/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-gan-planner`:
1. Invoke subagent `gan-planner` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/gan-planner/agent.md).
3. Return execution results to the primary workflow controller.
