# Vercel デプロイ手順

## 方法1: Vercel Dashboard（最も簡単）

1. [Vercel Dashboard](https://vercel.com/new)にアクセス
2. "Add New..." → "Project"をクリック
3. "Import Third-Party Git Repository"を選択
4. このプロジェクトのパスを指定：
   ```
   /Users/chiakikato/Documents/Obsidian Vault/itako_murakami
   ```
   または、GitHubにpushしてから連携

5. **環境変数を設定**（重要！）：
   - `OPENAI_API_KEY`: `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`
   - `GITHUB_REPO`: `StudioSaitama-LLC/murakami-context`
   - `GITHUB_BRANCH`: `main`

6. "Deploy"をクリック

## 方法2: GitHubと連携（推奨）

### Step 1: GitHubリポジトリを作成

```bash
cd "/Users/chiakikato/Documents/Obsidian Vault/itako_murakami"
git init
git add .
git commit -m "Initial commit: イタコ村上 AI記事生成システム"
```

### Step 2: GitHubにプッシュ

新しいリポジトリを作成：https://github.com/new

```bash
git remote add origin git@github.com:YOUR_USERNAME/itako-murakami.git
git branch -M main
git push -u origin main
```

### Step 3: Vercelと連携

1. [Vercel Dashboard](https://vercel.com/new)にアクセス
2. "Import Git Repository"を選択
3. 作成したGitHubリポジトリを選択
4. 環境変数を設定：
   - `OPENAI_API_KEY`: `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`
   - `GITHUB_REPO`: `StudioSaitama-LLC/murakami-context`
   - `GITHUB_BRANCH`: `main`
5. "Deploy"をクリック

以降、GitHubにpushするたびに自動デプロイされます！

## 方法3: Vercel CLI

### 再度ログインを試す

```bash
vercel login
```

ブラウザでコードを入力：https://vercel.com/oauth/device?user_code=XMFF-MBMX

### デプロイ実行

```bash
# 環境変数を設定
vercel env add OPENAI_API_KEY
# 値: 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

vercel env add GITHUB_REPO
# 値: StudioSaitama-LLC/murakami-context

vercel env add GITHUB_BRANCH
# 値: main

# 本番環境にデプロイ
vercel --prod
```

## デプロイ後の確認

デプロイが完了すると、以下のようなURLが発行されます：
```
https://itako-murakami-xxxx.vercel.app
```

このURLにアクセスして、アプリが正常に動作するか確認してください。

## トラブルシューティング

### 環境変数が設定されていない場合

Vercel Dashboard → プロジェクト → Settings → Environment Variables から追加できます。

### ビルドエラーが発生した場合

ローカルでビルドを確認：
```bash
npm run build
```

エラーがあれば修正してから再デプロイしてください。

