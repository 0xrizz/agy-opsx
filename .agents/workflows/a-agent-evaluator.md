---
description: "Bridge workflow to delegate tasks to the agent-evaluator subagent"
---

# Bridge Workflow: /a-agent-evaluator

This workflow delegates tasks directly to the `agent-evaluator` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/agent-evaluator/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-agent-evaluator`:
1. Invoke subagent `agent-evaluator` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/agent-evaluator/agent.md).
3. Return execution results to the primary workflow controller.
