---
description: "Bridge workflow to delegate tasks to the chief-of-staff subagent"
---

# Bridge Workflow: /a-chief-of-staff

This workflow delegates tasks directly to the `chief-of-staff` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/chief-of-staff/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-chief-of-staff`:
1. Invoke subagent `chief-of-staff` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/chief-of-staff/agent.md).
3. Return execution results to the primary workflow controller.
