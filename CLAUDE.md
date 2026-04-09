# Claude Code 作業指針

openclaw-dev は自律開発エージェントの作業リポジトリ兼モノレポ。
GitHub Issues で受け取ったタスクを実装・デプロイし、Telegram で結果を報告する。

## リポジトリ構成

```
openclaw-dev/
├── CLAUDE.md
├── .claude/
├── .github/workflows/
└── apps/                ← アプリはここに置く
    ├── <app-name>/      ← Cloudflare Worker / Pages
    │   ├── wrangler.jsonc
    │   ├── src/
    │   └── package.json
    └── ...
```

- 新しいアプリは `apps/<name>/` を切って作る
- 各アプリは独立した `wrangler.jsonc` と `package.json` を持つ
- 共有コードが必要になったら `packages/` を追加する

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

アプリのディレクトリに入ってから実行する。

```bash
cd apps/<name>

# 依存関係
npm ci

# 型チェック
npm run typecheck       # なければ: npx tsc --noEmit

# Lint
npm run lint            # なければスキップ

# テスト
npm test                # なければスキップ

# デプロイ（本番）
npx wrangler deploy

# デプロイ（dev 環境）
npx wrangler deploy --env dev
```

## 作業フロー

1. Issue を読んで対象アプリを特定する（`apps/` 以下のどれか、または新規）
2. 対象アプリのコードを調査する
3. 実装する
4. 対象アプリのディレクトリで検証ループを実行する
5. `git push origin main` で直接プッシュする
6. 対象アプリのディレクトリでデプロイする
7. デプロイ後の動作を確認する

## 検証ループ

対象アプリのディレクトリで実行する。エラーがあれば即座に修正してから次へ進む。

```bash
cd apps/<name>
npm run typecheck 2>/dev/null || npx tsc --noEmit 2>/dev/null || true
npm run lint 2>/dev/null || true
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
| **Never** | リポジトリ・ブランチの削除 / データストアの全削除 / 他リポジトリへの破壊的操作 / 対象アプリが曖昧なまま実装を進める（必ず確認してから実装する） |

## デプロイ判断

Issue 本文を読んでデプロイ先を判断する。

| 指示 | コマンド |
|------|---------|
| 明示なし / 本番 | `cd apps/<name> && npx wrangler deploy` |
| dev 環境 | `cd apps/<name> && npx wrangler deploy --env dev` |
| デプロイ不要（ドキュメント等） | スキップ |

## コミット

```bash
git add -A
git commit -m "feat(<app-name>): <概要>"   # または fix: / chore: / docs:
git push origin main
```
