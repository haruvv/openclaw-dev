---
description: Issue の内容を実装し、main に直接プッシュして本番デプロイする
---

# Implement

CLAUDE.md の方針に従い、以下のワークフローで実装する。

## Phase 0: 環境把握

```bash
# パッケージマネージャー確認
ls package.json bun.lockb pnpm-lock.yaml yarn.lock 2>/dev/null

# 利用可能なスクリプト確認
cat package.json | grep -A 20 '"scripts"' 2>/dev/null || true

# wrangler 設定確認
ls wrangler.jsonc wrangler.json wrangler.toml 2>/dev/null || true
```

## Phase 1: 要件把握

Issue の内容を読む。不明な点があれば既存コードを調査して補完する。
実装前に「何をどこに実装するか」を一度整理する。

## Phase 2: 実装

- 既存コードのスタイルに従う
- 関連ファイルを特定してから読む（ファイル全体を盲目的に読まない）
- 変更は最小限にする

## Phase 3: 検証ループ

```bash
# 型チェック（エラーがあれば修正）
npm run typecheck 2>/dev/null || npx tsc --noEmit 2>/dev/null || true

# Lint（エラーがあれば修正）
npm run lint 2>/dev/null || true

# テスト（失敗があれば修正）
npm test 2>/dev/null || true
```

エラーがあれば即座に修正し、再度検証する。検証が通るまで繰り返す。

## Phase 4: コミット・プッシュ

```bash
git add -A
git commit -m "<type>: <概要>"
git push origin main
```

commit type: `feat` / `fix` / `chore` / `docs` / `refactor`

## Phase 5: デプロイ

Issue の内容からデプロイ先を判断する。

```bash
# 本番（デフォルト）
npx wrangler deploy

# dev 環境（Issue に明示的な指示がある場合）
npx wrangler deploy --env dev
```

wrangler.jsonc / wrangler.json が存在しない場合はスキップ。

## 禁止事項

- リポジトリ・ブランチの削除
- `git push --force`
- データストアの全削除
