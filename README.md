# イタコ村上 - 村上要スタイル記事ジェネレーター

WWD JAPAN編集長・村上要氏のスタイルを学習したAI記事生成システム

## 概要

このアプリケーションは、村上要氏の執筆スタイル、トレンド分析の視点、ブランドに関するインサイトを学習し、与えられたテーマについて村上氏の癖や指向性を捉えた形で記事を生成します。

### 主な機能

- **コンテキスト学習**: GitHubに格納された村上氏のスタイルガイドとサンプル記事を参照
- **AI記事生成**: OpenAI GPT-4を使用して村上氏のスタイルで記事を生成
- **リアルタイム更新**: GitHubのコンテキストデータが更新されると自動的に反映
- **モダンUI**: TailwindCSSを使用した美しいレスポンシブデザイン

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI**: OpenAI GPT-4 Turbo
- **デプロイ**: Vercel
- **データソース**: GitHub (Raw Content API)

## セットアップ

### 前提条件

- Node.js 18.17以上
- npm または yarn
- OpenAI APIキー
- GitHubリポジトリへのアクセス

### インストール

1. リポジトリのクローン

```bash
cd itako_murakami
npm install
```

2. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を設定：

```env
OPENAI_API_KEY=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
GITHUB_REPO=StudioSaitama-LLC/murakami-context
GITHUB_BRANCH=main
```

3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
npm install -g vercel
vercel
```

### 方法2: Vercel Dashboard

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. "New Project"をクリック
3. GitHubリポジトリを接続（または手動でアップロード）
4. 環境変数を設定：
   - `OPENAI_API_KEY`: OpenAI APIキー
   - `GITHUB_REPO`: `StudioSaitama-LLC/murakami-context`
   - `GITHUB_BRANCH`: `main`
5. "Deploy"をクリック

### 環境変数の設定

Vercel Dashboardで以下の環境変数を設定してください：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `OPENAI_API_KEY` | `sk-proj-...` | OpenAI APIキー |
| `GITHUB_REPO` | `StudioSaitama-LLC/murakami-context` | GitHubリポジトリ |
| `GITHUB_BRANCH` | `main` | GitHubブランチ |

## 使用方法

1. **テーマの入力**: 記事のテーマを入力します（例: "2025年春夏のサステナブルファッションのトレンドについて"）

2. **追加の指示（オプション）**: より具体的な指示を追加できます（例: "ラグジュアリーブランドの事例を中心に"）

3. **記事生成**: "記事を生成"ボタンをクリックして、AIが村上氏のスタイルで記事を生成するのを待ちます

4. **結果の確認**: 生成された記事が右側のパネルに表示されます

## アーキテクチャ

```
itako_murakami/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── generate/
│   │       └── route.ts   # 記事生成API
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── lib/                    # ユーティリティ
│   ├── github.ts          # GitHub API統合
│   └── openai.ts          # OpenAI API統合
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vercel.json            # Vercel設定
```

## コンテキストデータの構造

GitHubリポジトリに以下のファイルが格納されています：

- `01_murakami_style.md`: 村上氏の執筆スタイル、視点、語彙選択などのガイド
- `02_sample.md`: 村上氏が執筆した記事のサンプル

これらのファイルを更新することで、AIの生成スタイルを改善できます。

## カスタマイズ

### プロンプトの調整

`lib/openai.ts`の`buildSystemPrompt`と`buildUserPrompt`関数でプロンプトをカスタマイズできます。

### モデルの変更

`lib/openai.ts`の`generateMurakamiStyleArticle`関数で使用するモデルを変更できます：

```typescript
model: 'gpt-4-turbo-preview', // または 'gpt-4', 'gpt-3.5-turbo' など
```

### キャッシュ設定

`lib/github.ts`の`CACHE_DURATION`を変更して、コンテキストデータのキャッシュ期間を調整できます。

## トラブルシューティング

### APIキーエラー

- `.env.local`ファイルが正しく設定されているか確認
- Vercelの場合、Dashboard > Project Settings > Environment Variablesで設定を確認

### GitHubからデータを取得できない

- リポジトリがpublicであることを確認
- ファイルパスが正しいことを確認（`01_murakami_style.md`, `02_sample.md`）
- インターネット接続を確認

### 記事生成が遅い

- GPT-4は応答に時間がかかる場合があります（通常10-30秒）
- より高速なモデル（gpt-3.5-turbo）への変更を検討

## ライセンス

このプロジェクトは私的利用を目的としています。

## 貢献

コンテキストデータの改善提案は[GitHubリポジトリ](https://github.com/StudioSaitama-LLC/murakami-context)にIssueを作成してください。

## お問い合わせ

質問や問題がある場合は、プロジェクトのメンテナーに連絡してください。

