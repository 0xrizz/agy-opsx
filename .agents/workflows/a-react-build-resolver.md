---
description: "Bridge workflow to delegate tasks to the react-build-resolver subagent"
---

# Bridge Workflow: /a-react-build-resolver

This workflow delegates tasks directly to the `react-build-resolver` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/react-build-resolver/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-react-build-resolver`:
1. Invoke subagent `react-build-resolver` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/react-build-resolver/agent.md).
3. Return execution results to the primary workflow controller.
