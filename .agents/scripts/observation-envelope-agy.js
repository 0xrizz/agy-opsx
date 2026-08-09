/**
 * AGY Observation Envelope Adapter: PostToolUse Output Handler
 * Standardizes tool outputs with Error Recovery Contract per ECC harness standards.
 */

const fs = require('fs');

function readStdinSync() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (err) {
    return '';
  }
}

function extractArtifacts(payload) {
  const artifacts = [];
  if (!payload || typeof payload !== 'object') return artifacts;

  if (Array.isArray(payload.artifacts)) {
    for (const a of payload.artifacts) {
      if (typeof a === 'string') artifacts.push(a);
    }
  }

  const toolInput = payload.tool_input || payload.toolInput || {};
  const filePath = toolInput.file_path || toolInput.path || toolInput.TargetFile || toolInput.target_file;
  if (typeof filePath === 'string' && !artifacts.includes(filePath)) {
    artifacts.push(filePath);
  }

  return artifacts;
}

function main() {
  const inputRaw = readStdinSync();
  let payload = {};

  if (inputRaw && inputRaw.trim()) {
    try {
      payload = JSON.parse(inputRaw);
    } catch (err) {
      payload = { raw_output: inputRaw };
    }
  }

  // Determine if error occurred
  const isError = Boolean(
    payload.is_error ||
    payload.isError ||
    payload.error ||
    payload.status === 'error' ||
    (payload.exitCode !== undefined && payload.exitCode !== 0) ||
    (payload.code !== undefined && payload.code !== 0) ||
    (payload.tool_result && (payload.tool_result.is_error || payload.tool_result.error))
  );

  const isWarning = Boolean(!isError && (payload.warning || payload.status === 'warning'));

  const status = isError ? 'error' : isWarning ? 'warning' : 'success';

  // Build summary string
  let summary = payload.summary || payload.message || '';
  if (!summary && payload.tool_name) {
    summary = `Tool ${payload.tool_name} completed with status: ${status}`;
  } else if (!summary) {
    summary = `Tool execution completed with status: ${status}`;
  }
  // Ensure summary is single line
  summary = summary.replace(/[\r\n]+/g, ' ').trim();

  // Determine next actions
  let nextActions = [];
  if (Array.isArray(payload.next_actions) && payload.next_actions.length > 0) {
    nextActions = payload.next_actions;
  } else if (isError) {
    nextActions = [
      'Inspect tool input parameters and system error logs.',
      'Check workspace read/write permissions and path syntax before retrying.'
    ];
  } else {
    nextActions = [
      'Proceed with the next step in the implementation plan.'
    ];
  }

  // Extract artifacts
  const artifacts = extractArtifacts(payload);

  // Construct standard envelope
  const envelope = {
    status,
    summary,
    next_actions: nextActions,
    artifacts
  };

  // Attach error recovery contract if status is error
  if (isError) {
    const errorMsg =
      payload.error ||
      payload.message ||
      (payload.tool_result && payload.tool_result.error) ||
      'Tool execution encountered an unhandled failure.';

    envelope.error_recovery = {
      root_cause_hint: `Tool failure detected: ${String(errorMsg).replace(/[\r\n]+/g, ' ').trim()}`,
      safe_retry_instruction: 'Verify arguments match required JSON schema and confirm file paths use forward slashes.',
      max_retries: 2
    };
  }

  process.stdout.write(JSON.stringify(envelope, null, 2) + '\n');
  process.exit(0);
}

main();
