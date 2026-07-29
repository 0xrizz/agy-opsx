---
description: "Bridge workflow to delegate tasks to the gan-generator subagent"
---

# Bridge Workflow: /a-gan-generator

This workflow delegates tasks directly to the `gan-generator` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/gan-generator/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-gan-generator`:
1. Invoke subagent `gan-generator` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/gan-generator/agent.md).
3. Return execution results to the primary workflow controller.
