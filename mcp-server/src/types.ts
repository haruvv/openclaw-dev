export type TaskStatus = 'pending' | 'running' | 'done' | 'failed' | 'cancelled';

export interface Task {
  id: string;
  spec: string;
  status: TaskStatus;
  callback_url: string;
  callback_token: string;
  task_label?: string;
  created_at: string;
  updated_at: string;
  summary?: string;
  artifact_url?: string;
  error?: string;
}

export interface Env {
  DEV_TEAM_TASKS: KVNamespace;
  DEV_TEAM_MCP_TOKEN: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string; // e.g. "haruvv/openclaw-dev"
}
