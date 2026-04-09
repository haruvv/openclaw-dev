import type { Env } from './types';

export async function triggerDevTask(
  env: Env,
  payload: {
    task_id: string;
    spec: string;
    callback_url: string;
    callback_token: string;
    task_label?: string;
  },
): Promise<void> {
  const res = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'openclaw-dev-team/1.0',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      event_type: 'run-dev-task',
      client_payload: payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub dispatch failed: ${res.status} ${text}`);
  }
}
