# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリは、Astroフレームワークを使用した個人ウェブサイト・ブログです。MDXサポート、TypeScript、Tailwind CSS、React（一部コンポーネント）を活用しています。

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# Prettierによるコード整形（手動実行）
npx prettier --write .

# TypeScriptの型チェック
npx tsc --noEmit
```

## アーキテクチャ概要

### ディレクトリ構造

- `src/pages/` - Astroのファイルベースルーティング
  - `index.astro` - ホームページ
  - `posts/[slug].astro` - 個別ブログ記事ページ
  - `posts/[...page].astro` - ブログ記事一覧（ページネーション付き）
  - `tags/[tag]/[...page].astro` - タグ別記事一覧
  - `social-cards/[slug].png.ts` - OGP画像生成エンドポイント
  - `rss.xml.ts` - RSSフィード生成
  - `robots.txt.ts` - robots.txt生成

- `src/content/` - コンテンツ管理
  - `posts/` - ブログ記事（.md/.mdx）
  - `home.md` - ホームページコンテンツ
  - `addendum.md` - 追記セクションコンテンツ

- `src/components/` - UIコンポーネント
  - `.astro` - Astroコンポーネント（主要）
  - `.tsx` - Reactコンポーネント（ReactGithubCalendar.tsx等）

- `src/plugins/` - カスタムRemarkプラグイン
  - `remark-admonitions.ts` - 注意書きブロック機能
  - `remark-gemoji.ts` - 絵文字ショートコード対応

### 重要な設定ファイル

- `astro.config.mjs` - Astroの設定、プラグイン、インテグレーション
- `src/site.config.ts` - サイト全体の設定（タイトル、説明、ナビゲーション、テーマ等）
- `src/content.config.ts` - コンテンツコレクションのスキーマ定義
- `tsconfig.json` - TypeScript設定とパスエイリアス

### スタイリング

- Tailwind CSS v4（`@tailwindcss/vite`使用）
- テーマは`github-dark`と`github-light`を使用
- JetBrains Mono Variableフォント

### 主要な機能

1. **Markdownサポート**
   - MDXによる拡張Markdown
   - 数式対応（KaTeX）
   - コードハイライト（Expressive Code）
   - 絵文字ショートコード
   - アドモニション（注意書きブロック）

2. **自動生成機能**
   - 目次生成
   - 読了時間計算
   - RSS フィード
   - サイトマップ
   - ソーシャルカード（OGP画像）

3. **検索機能**
   - Pagefindによるクライアントサイド検索

### コンテンツ作成

新しいブログ記事を作成する場合：
1. `src/content/posts/`ディレクトリに`.md`または`.mdx`ファイルを作成
2. フロントマターに必須項目を記載：
   ```yaml
   ---
   title: "記事タイトル"
   published: 2025-01-27
   tags: ["タグ1", "タグ2"]
   ---
   ```

### 注意事項

- コミット前に`npm run build`でビルドエラーがないことを確認
- Prettierの設定に従ったコードフォーマット（セミコロンなし、シングルクォート使用）
- TypeScriptの厳格モード有効
- パスエイリアス使用可能：`@components/*`、`@layouts/*`、`@types`、`@utils`