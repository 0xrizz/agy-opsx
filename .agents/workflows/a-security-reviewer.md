---
description: "Bridge workflow to delegate tasks to the security-reviewer subagent"
---

# Bridge Workflow: /a-security-reviewer

This workflow delegates tasks directly to the `security-reviewer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/security-reviewer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-security-reviewer`:
1. Invoke subagent `security-reviewer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/security-reviewer/agent.md).
3. Return execution results to the primary workflow controller.
