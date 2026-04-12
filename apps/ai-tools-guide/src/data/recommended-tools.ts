export interface Tool {
  title: string;
  description: string;
  url: string;
  badge?: string;
  category: string;
}

export const recommendedTools: Tool[] = [
  {
    title: 'Claude Code',
    description: 'Anthropic のターミナル直結AIコーディングアシスタント。自律的にコード生成・修正が可能。',
    url: 'https://claude.ai/code',
    badge: 'おすすめ',
    category: 'dev-tools',
  },
  {
    title: 'Cursor',
    description: 'AI搭載コードエディタ。VSCode ベースで移行もスムーズ。',
    url: 'https://cursor.com',
    badge: '人気',
    category: 'dev-tools',
  },
  {
    title: 'GitHub Copilot',
    description: 'GitHub 公式AIペアプログラマー。エディタ内でリアルタイム補完。',
    url: 'https://github.com/features/copilot',
    category: 'dev-tools',
  },
  {
    title: 'Zapier',
    description: '7,000以上のアプリを繋ぐ自動化プラットフォーム。ノーコードで業務効率化。',
    url: 'https://zapier.com',
    badge: '定番',
    category: 'business-automation',
  },
  {
    title: 'Make (Integromat)',
    description: 'ビジュアルで直感的な自動化ツール。複雑なワークフローも構築可能。',
    url: 'https://www.make.com',
    category: 'business-automation',
  },
  {
    title: 'n8n',
    description: 'オープンソースの自動化ツール。セルフホスト可能でカスタマイズ性が高い。',
    url: 'https://n8n.io',
    badge: '新着',
    category: 'business-automation',
  },
  {
    title: 'ChatGPT Plus',
    description: 'OpenAI の対話型AI。文章作成・翻訳・コード生成・画像分析など万能。',
    url: 'https://chat.openai.com',
    badge: '定番',
    category: 'social-media',
  },
  {
    title: 'Canva AI',
    description: 'AIデザイン機能搭載。SNS投稿画像・ストーリーズを数秒で作成。',
    url: 'https://www.canva.com',
    badge: 'おすすめ',
    category: 'social-media',
  },
  {
    title: 'CapCut',
    description: 'AI動画編集アプリ。リール・ショート動画を自動生成。',
    url: 'https://www.capcut.com',
    category: 'social-media',
  },
  {
    title: 'ChatGPT',
    description: '万能AI学習パートナー。質問応答・要約・テスト問題作成など学習を加速。',
    url: 'https://chat.openai.com',
    badge: 'おすすめ',
    category: 'education',
  },
  {
    title: 'Notion AI',
    description: 'ノート・ドキュメント管理 + AI要約・翻訳。学習ノートの整理に最適。',
    url: 'https://www.notion.so',
    category: 'education',
  },
  {
    title: 'Perplexity AI',
    description: 'AI検索エンジン。学術論文や最新情報をソース付きで回答。',
    url: 'https://www.perplexity.ai',
    badge: '新着',
    category: 'education',
  },
  {
    title: 'Notion AI',
    description: 'タスク管理・メモ・ドキュメントをAIで効率化。生産性を大幅アップ。',
    url: 'https://www.notion.so',
    badge: 'おすすめ',
    category: 'lifehack',
  },
  {
    title: 'Todoist + AI',
    description: 'AI搭載タスク管理。自然言語入力でタスク追加・優先度付けが可能。',
    url: 'https://todoist.com',
    category: 'lifehack',
  },
  {
    title: 'SwitchBot',
    description: 'スマートホームデバイス。AIアシスタント連携で家電を自動化。',
    url: 'https://www.switchbot.jp',
    badge: '人気',
    category: 'lifehack',
  },
];

export function getToolsByCategory(categorySlug: string, limit = 5): Tool[] {
  return recommendedTools
    .filter(tool => tool.category === categorySlug)
    .slice(0, limit);
}

export function getTopTools(limit = 5): Tool[] {
  return recommendedTools
    .filter(tool => tool.badge)
    .slice(0, limit);
}
