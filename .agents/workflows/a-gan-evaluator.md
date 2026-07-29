---
description: "Bridge workflow to delegate tasks to the gan-evaluator subagent"
---

# Bridge Workflow: /a-gan-evaluator

This workflow delegates tasks directly to the `gan-evaluator` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/gan-evaluator/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-gan-evaluator`:
1. Invoke subagent `gan-evaluator` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/gan-evaluator/agent.md).
3. Return execution results to the primary workflow controller.
