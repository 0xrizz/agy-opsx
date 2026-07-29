---
description: "Bridge workflow to delegate tasks to the build-error-resolver subagent"
---

# Bridge Workflow: /a-build-error-resolver

This workflow delegates tasks directly to the `build-error-resolver` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/build-error-resolver/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-build-error-resolver`:
1. Invoke subagent `build-error-resolver` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/build-error-resolver/agent.md).
3. Return execution results to the primary workflow controller.
