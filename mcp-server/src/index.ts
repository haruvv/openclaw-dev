import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import type { Env } from './types';
import { handleMcp } from './mcp';
import { updateTaskStatus } from './kv';

const app = new Hono<{ Bindings: Env }>();

// ヘルスチェック（認証不要）
app.get('/health', (c) => c.json({ status: 'ok' }));

// MCP エンドポイント（Bearer 認証）
app.use('/mcp', async (c, next) => {
  const auth = bearerAuth({ token: c.env.DEV_TEAM_MCP_TOKEN });
  return auth(c, next);
});

app.all('/mcp', async (c) => {
  return handleMcp(c.req.raw, c.env);
});

// KV 更新エンドポイント（GitHub Actions から叩く内部 API）
app.use('/internal/*', async (c, next) => {
  const auth = bearerAuth({ token: c.env.DEV_TEAM_MCP_TOKEN });
  return auth(c, next);
});

app.patch('/internal/tasks/:taskId', async (c) => {
  const taskId = c.req.param('taskId');
  const body = await c.req.json<{
    status: 'running' | 'done' | 'failed';
    summary?: string;
    artifact_url?: string;
    error?: string;
  }>();

  const updated = await updateTaskStatus(c.env, taskId, body.status, {
    summary: body.summary,
    artifact_url: body.artifact_url,
    error: body.error,
  });

  if (!updated) {
    return c.json({ error: 'Task not found' }, 404);
  }

  return c.json({ task_id: taskId, status: updated.status });
});

export default app;
