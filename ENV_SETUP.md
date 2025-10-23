# Vercel 環境変数設定手順

## デプロイ後に環境変数を追加する方法

### 1. Vercel Dashboardにアクセス

デプロイ完了画面から「Go to Dashboard」または以下のURLにアクセス：
https://vercel.com/studiosaitama-llc/itako-murakami/settings/environment-variables

### 2. Settings → Environment Variables に移動

1. プロジェクトダッシュボードで「Settings」タブをクリック
2. 左サイドバーから「Environment Variables」をクリック

### 3. 環境変数を1つずつ追加

#### 変数1: OPENAI_API_KEY

```
Key: OPENAI_API_KEY

Value: your_openai_api_key_here

Environment: Production, Preview, Development (すべてチェック)
```

**「Save」をクリック**

#### 変数2: GITHUB_REPO

```
Key: GITHUB_REPO

Value: StudioSaitama-LLC/murakami-context

Environment: Production, Preview, Development (すべてチェック)
```

**「Save」をクリック**

#### 変数3: GITHUB_BRANCH

```
Key: GITHUB_BRANCH

Value: main

Environment: Production, Preview, Development (すべてチェック)
```

**「Save」をクリック**

### 4. 再デプロイ

環境変数を追加した後、変更を反映するために再デプロイが必要です：

1. プロジェクトダッシュボードの「Deployments」タブに移動
2. 最新のデプロイメントの右側にある「...」（三点リーダー）をクリック
3. **「Redeploy」**を選択
4. 確認ダイアログで**「Redeploy」**をクリック

または、トップページの「Redeploy」ボタンをクリックしてください。

---

## コピー用テキスト

環境変数の値をコピーしやすいように、以下にまとめます：

### OPENAI_API_KEY
```
your_openai_api_key_here
```

### GITHUB_REPO
```
StudioSaitama-LLC/murakami-context
```

### GITHUB_BRANCH
```
main
```

---

## トラブルシューティング

### アプリが動かない場合

1. 環境変数が正しく設定されているか確認
2. 環境変数追加後に再デプロイを実行したか確認
3. デプロイログを確認（Deployments → 最新のデプロイ → Building → View Function Logs）

### 環境変数が反映されない場合

- Production、Preview、Development すべての環境にチェックが入っているか確認
- 再デプロイを実行

---

## 完了確認

すべて完了したら、デプロイされたアプリにアクセスして動作確認してください！

デプロイURL例：
- https://itako-murakami.vercel.app
- https://itako-murakami-xxxxx.vercel.app

