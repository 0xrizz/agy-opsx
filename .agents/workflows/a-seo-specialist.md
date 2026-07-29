---
description: "Bridge workflow to delegate tasks to the seo-specialist subagent"
---

# Bridge Workflow: /a-seo-specialist

This workflow delegates tasks directly to the `seo-specialist` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/seo-specialist/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-seo-specialist`:
1. Invoke subagent `seo-specialist` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/seo-specialist/agent.md).
3. Return execution results to the primary workflow controller.
