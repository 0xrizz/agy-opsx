---
description: "Bridge workflow to delegate tasks to the e2e-runner subagent"
---

# Bridge Workflow: /a-e2e-runner

This workflow delegates tasks directly to the `e2e-runner` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/e2e-runner/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-e2e-runner`:
1. Invoke subagent `e2e-runner` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/e2e-runner/agent.md).
3. Return execution results to the primary workflow controller.
