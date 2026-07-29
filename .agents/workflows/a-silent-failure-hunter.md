---
description: "Bridge workflow to delegate tasks to the silent-failure-hunter subagent"
---

# Bridge Workflow: /a-silent-failure-hunter

This workflow delegates tasks directly to the `silent-failure-hunter` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/silent-failure-hunter/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-silent-failure-hunter`:
1. Invoke subagent `silent-failure-hunter` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/silent-failure-hunter/agent.md).
3. Return execution results to the primary workflow controller.
