# openclaw-dev

OpenClaw 開発エージェント。Claude Code と GitHub Actions で動作する自律実装パイプライン。

## 概要

Discord でユーザーが開発依頼を送ると、OpenClaw の dev-intake エージェントが要件をヒアリングして GitHub Issue を起票する。
この Issue に `ai-dev` ラベルが付与されると GitHub Actions が起動し、Claude Code が自動的に実装して PR を作成する。

```
Discord
  ↓ 開発依頼
OpenClaw Gateway（dev-intake エージェント）
  ↓ 要件ヒアリング → GitHub Issue 起票
GitHub Issue（ai-dev ラベル）
  ↓ GitHub Actions トリガー
Claude Code（このリポジトリ）
  ↓ 実装 → PR 作成
GitHub PR
  ↓ CI
  ↓ Discord 通知
ユーザーがレビュー・マージ
```

## GitHub Actions

| ワークフロー | トリガー | 概要 |
|------------|---------|------|
| `dev-agent.yml` | Issue に `ai-dev` ラベル付与 | Claude Code が Issue を実装して PR を作成 |
| `ci.yml` | PR / main への push | lint・型検査・テスト |

## Secrets

| Secret | 用途 |
|--------|------|
| `ANTHROPIC_API_KEY` | Claude Code の API キー |
| `DISCORD_WEBHOOK_URL` | 実装完了・CI 結果の Discord 通知 |

## ラベル

| ラベル | 説明 |
|--------|------|
| `ai-dev` | Claude Code による自動実装のトリガー |
