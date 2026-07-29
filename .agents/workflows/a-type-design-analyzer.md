---
description: "Bridge workflow to delegate tasks to the type-design-analyzer subagent"
---

# Bridge Workflow: /a-type-design-analyzer

This workflow delegates tasks directly to the `type-design-analyzer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/type-design-analyzer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-type-design-analyzer`:
1. Invoke subagent `type-design-analyzer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/type-design-analyzer/agent.md).
3. Return execution results to the primary workflow controller.
