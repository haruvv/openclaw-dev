import type { Task, TaskStatus, Env } from './types';

export async function getTask(env: Env, taskId: string): Promise<Task | null> {
  const raw = await env.DEV_TEAM_TASKS.get(taskId);
  if (!raw) return null;
  return JSON.parse(raw) as Task;
}

export async function putTask(env: Env, task: Task): Promise<void> {
  await env.DEV_TEAM_TASKS.put(task.id, JSON.stringify(task), {
    expirationTtl: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function updateTaskStatus(
  env: Env,
  taskId: string,
  status: TaskStatus,
  extra?: Partial<Pick<Task, 'summary' | 'artifact_url' | 'error'>>,
): Promise<Task | null> {
  const task = await getTask(env, taskId);
  if (!task) return null;
  const updated: Task = {
    ...task,
    ...extra,
    status,
    updated_at: new Date().toISOString(),
  };
  await putTask(env, updated);
  return updated;
}
