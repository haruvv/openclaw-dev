import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { z } from 'zod';
import type { Env } from './types';
import { getTask, putTask, updateTaskStatus } from './kv';
import { triggerDevTask } from './github';

function createMcpServer(env: Env): McpServer {
  const server = new McpServer({
    name: 'openclaw-dev-team',
    version: '1.0.0',
  });

  server.tool(
    'run_task',
    {
      spec: z.string().describe('実装仕様（自然言語）'),
      callback_url: z.string().url().describe('完了時に通知する OpenClaw の base URL'),
      callback_token: z.string().describe('webhook 認証トークン'),
      task_label: z.string().optional().describe('任意のラベル（ログ・追跡用）'),
    },
    async ({ spec, callback_url, callback_token, task_label }) => {
      const task_id = crypto.randomUUID();
      const now = new Date().toISOString();

      await putTask(env, {
        id: task_id,
        spec,
        status: 'pending',
        callback_url,
        callback_token,
        task_label,
        created_at: now,
        updated_at: now,
      });

      await triggerDevTask(env, { task_id, spec, callback_url, callback_token, task_label });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ task_id, status: 'accepted' }),
          },
        ],
      };
    },
  );

  server.tool(
    'get_task_status',
    {
      task_id: z.string().describe('run_task が返した task_id'),
    },
    async ({ task_id }) => {
      const task = await getTask(env, task_id);
      if (!task) {
        return {
          content: [
            { type: 'text', text: JSON.stringify({ error: 'Task not found', task_id }) },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              task_id: task.id,
              status: task.status,
              summary: task.summary,
              artifact_url: task.artifact_url,
              error: task.error,
            }),
          },
        ],
      };
    },
  );

  server.tool(
    'cancel_task',
    {
      task_id: z.string().describe('キャンセルする task_id'),
    },
    async ({ task_id }) => {
      const updated = await updateTaskStatus(env, task_id, 'cancelled');
      const cancelled = updated !== null;
      return {
        content: [{ type: 'text', text: JSON.stringify({ cancelled, task_id }) }],
      };
    },
  );

  return server;
}

export async function handleMcp(request: Request, env: Env): Promise<Response> {
  const server = createMcpServer(env);
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  return transport.handleRequest(request);
}
