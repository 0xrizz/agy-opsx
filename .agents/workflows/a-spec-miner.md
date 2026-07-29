---
description: "Bridge workflow to delegate tasks to the spec-miner subagent"
---

# Bridge Workflow: /a-spec-miner

This workflow delegates tasks directly to the `spec-miner` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/spec-miner/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-spec-miner`:
1. Invoke subagent `spec-miner` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/spec-miner/agent.md).
3. Return execution results to the primary workflow controller.
