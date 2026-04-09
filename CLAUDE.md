# Claude Code 作業指針

openclaw-dev は自律開発エージェントの作業リポジトリ。
GitHub Issues で受け取ったタスクを実装・デプロイし、Telegram で結果を報告する。

## 方針

- **PR は作らない**。実装後は `git push origin main` で直接プッシュする
- デプロイ権限があれば即座に本番へ反映する
- 承認を求めない。迷ったら実行する
- 禁止: リポジトリ削除・データストア全削除など不可逆な操作のみ

## 技術スタック

| 用途 | 技術 |
|------|------|
| エッジ実行 | Cloudflare Workers |
| 静的サイト | Cloudflare Pages |
| デプロイツール | Wrangler CLI (`npx wrangler`) |
| パッケージ管理 | npm |
| 言語 | TypeScript |

## コマンド

```bash
# 依存関係
npm ci

# 型チェック
npm run typecheck       # なければ: npx tsc --noEmit

# Lint
npm run lint            # なければスキップ

# テスト
npm test                # なければスキップ

# ビルド
npm run build           # なければスキップ

# デプロイ（本番）
npx wrangler deploy

# デプロイ（dev 環境）
npx wrangler deploy --env dev
```

## 作業フロー

1. Issue の内容を読んで要件を把握する
2. 既存コードを調査する（関連ファイルを特定してから読む）
3. 実装する
4. 検証ループを実行する（下記）
5. `git push origin main` で直接プッシュする
6. Cloudflare にデプロイする（対象がある場合）
7. デプロイ後の動作を確認する

## 検証ループ

実装後、エラーがあれば即座に修正してから次へ進む。

```bash
# 1. 型チェック
npm run typecheck 2>/dev/null || npx tsc --noEmit 2>/dev/null || true

# 2. Lint
npm run lint 2>/dev/null || true

# 3. テスト
npm test 2>/dev/null || true
```

## コーディング規約

- 既存コードのスタイルに従う
- TypeScript: `any` を避ける
- コメントは自明でないロジックにのみ追加する

## 境界ルール

| 区分 | 内容 |
|------|------|
| **Always** | 型チェック・lint を実行してからプッシュ / main に直接コミット / デプロイまで完了させる |
| **Ask first** | 外部サービスとの新規統合 / データスキーマの破壊的変更 |
| **Never** | リポジトリ・ブランチの削除 / データストアの全削除 / 他リポジトリへの破壊的操作 |

## デプロイ対象の判断

Issue 本文を読んでデプロイ先を判断する。

| 指示 | コマンド |
|------|---------|
| 明示なし / 本番 | `npx wrangler deploy` |
| dev 環境・ステージング | `npx wrangler deploy --env dev` |
| デプロイ不要（ドキュメント等） | スキップ |

## コミット

```bash
git add -A
git commit -m "feat: <概要>"   # または fix: / chore: / docs:
git push origin main
```
