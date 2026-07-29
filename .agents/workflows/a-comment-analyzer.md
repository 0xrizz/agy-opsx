---
description: "Bridge workflow to delegate tasks to the comment-analyzer subagent"
---

# Bridge Workflow: /a-comment-analyzer

This workflow delegates tasks directly to the `comment-analyzer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/comment-analyzer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-comment-analyzer`:
1. Invoke subagent `comment-analyzer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/comment-analyzer/agent.md).
3. Return execution results to the primary workflow controller.
