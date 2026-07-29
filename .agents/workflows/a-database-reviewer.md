---
description: "Bridge workflow to delegate tasks to the database-reviewer subagent"
---

# Bridge Workflow: /a-database-reviewer

This workflow delegates tasks directly to the `database-reviewer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/database-reviewer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-database-reviewer`:
1. Invoke subagent `database-reviewer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/database-reviewer/agent.md).
3. Return execution results to the primary workflow controller.
