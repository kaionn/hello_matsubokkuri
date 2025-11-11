# AWS セットアップガイド

このガイドでは、GitHub ActionsからAWSへデプロイするために必要なアクセスキーの発行手順を説明します。

## 1. IAMユーザーの作成

### 1-1. AWSマネジメントコンソールにログイン

https://console.aws.amazon.com/

### 1-2. IAMサービスを開く

- 検索バーで「IAM」と入力
- 「IAM」サービスをクリック

### 1-3. 新しいユーザーを作成

1. 左メニューから「ユーザー」をクリック
2. 「ユーザーを追加」ボタンをクリック
3. ユーザー名を入力（例: `github-actions-deploy`）
4. 「次へ」をクリック

## 2. 権限の設定

### 2-1. ポリシーを直接アタッチ

「ポリシーを直接アタッチする」を選択

### 2-2. カスタムポリシーの作成

「ポリシーを作成」ボタンをクリックし、JSONタブを開いて以下を貼り付け：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Access",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

**重要**: `YOUR_BUCKET_NAME` を実際のS3バケット名に置き換えてください。

3. ポリシー名を入力（例: `GitHubActionsDeployPolicy`）
4. 「ポリシーの作成」をクリック
5. 元のタブに戻り、作成したポリシーを検索してチェック
6. 「次へ」をクリック

### 2-3. ユーザーの作成を完了

「ユーザーの作成」をクリック

## 3. アクセスキーの発行

### 3-1. 作成したユーザーをクリック

IAMユーザー一覧から先ほど作成したユーザーをクリック

### 3-2. アクセスキーを作成

1. 「セキュリティ認証情報」タブをクリック
2. 「アクセスキーを作成」ボタンをクリック
3. ユースケースで「サードパーティーサービス」を選択
4. 確認チェックボックスにチェック
5. 「次へ」をクリック
6. 説明タグを入力（オプション、例: `GitHub Actions Deploy`）
7. 「アクセスキーを作成」をクリック

### 3-3. 認証情報を保存

**重要**: この画面でしかシークレットアクセスキーを確認できません！

- **アクセスキーID**: `AKIA...` で始まる文字列
- **シークレットアクセスキー**: ランダムな文字列

これらを安全な場所にコピーしてください。

## 4. GitHub Secretsへの登録

### 4-1. GitHubリポジトリを開く

https://github.com/YOUR_USERNAME/hello_matsubokkuri

### 4-2. Settings > Secrets and variables > Actions

1. リポジトリの「Settings」タブをクリック
2. 左メニューから「Secrets and variables」 > 「Actions」をクリック
3. 「New repository secret」ボタンをクリック

### 4-3. 以下のシークレットを1つずつ追加

| Name | Value |
|------|-------|
| `AWS_ACCESS_KEY_ID` | 先ほどコピーしたアクセスキーID |
| `AWS_SECRET_ACCESS_KEY` | 先ほどコピーしたシークレットアクセスキー |
| `AWS_REGION` | 使用するリージョン（例: `ap-northeast-1`） |
| `S3_BUCKET_NAME` | S3バケット名 |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFrontのディストリビューションID（使用する場合） |

## 5. S3バケットの作成

### 5-1. S3サービスを開く

AWSコンソールで「S3」を検索

### 5-2. バケットを作成

1. 「バケットを作成」ボタンをクリック
2. バケット名を入力（グローバルで一意である必要があります）
3. リージョンを選択（例: `アジアパシフィック (東京) ap-northeast-1`）
4. 「パブリックアクセスをすべてブロック」のチェックを**外す**
5. 警告を確認してチェック
6. 「バケットを作成」をクリック

### 5-3. 静的ウェブサイトホスティングを有効化

1. 作成したバケットをクリック
2. 「プロパティ」タブをクリック
3. 一番下の「静的ウェブサイトホスティング」セクションで「編集」をクリック
4. 「有効にする」を選択
5. インデックスドキュメント: `index.html`
6. エラードキュメント: `index.html`（SPAの場合）
7. 「変更を保存」をクリック

### 5-4. バケットポリシーの設定

1. 「アクセス許可」タブをクリック
2. 「バケットポリシー」セクションで「編集」をクリック
3. 以下のポリシーを貼り付け（`YOUR_BUCKET_NAME`を置き換え）：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

4. 「変更を保存」をクリック

## 6. CloudFrontの設定（オプションだが推奨）

### 6-1. CloudFrontサービスを開く

AWSコンソールで「CloudFront」を検索

### 6-2. ディストリビューションを作成

1. 「ディストリビューションを作成」ボタンをクリック
2. オリジンドメイン: S3バケットの静的ウェブサイトエンドポイントを入力
   - 形式: `your-bucket-name.s3-website-ap-northeast-1.amazonaws.com`
3. ビューワープロトコルポリシー: 「Redirect HTTP to HTTPS」を選択
4. デフォルトルートオブジェクト: `index.html`
5. 「ディストリビューションを作成」をクリック

### 6-3. ディストリビューションIDを取得

作成されたディストリビューションの「ID」（例: `E1234ABCDEFG`）をコピーし、GitHub Secretsに`CLOUDFRONT_DISTRIBUTION_ID`として登録

## 7. デプロイのテスト

mainブランチに何かをpushすると、GitHub Actionsが自動的に実行されます。

```bash
git add .
git commit -m "test: deploy"
git push origin main
```

GitHubのリポジトリ > Actionsタブでデプロイの進行状況を確認できます。

## セキュリティのベストプラクティス

- ✅ 最小権限の原則に従ったIAMポリシー
- ✅ アクセスキーはGitHub Secretsに保存（リポジトリにコミットしない）
- ✅ 定期的なアクセスキーのローテーション
- ✅ 使用しないアクセスキーは削除

## トラブルシューティング

### デプロイが失敗する場合

1. GitHub Secretsの設定が正しいか確認
2. IAMユーザーの権限が正しく設定されているか確認
3. S3バケット名が正しいか確認
4. GitHub Actionsのログを確認

### アクセスキーを紛失した場合

1. IAMコンソールで新しいアクセスキーを発行
2. GitHub Secretsを更新
3. 古いアクセスキーを削除
