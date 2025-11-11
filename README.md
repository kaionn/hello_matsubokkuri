# hello_matsubokkuri 🌲

松ぼっくりをクリックすると「コンニチハ」と挨拶してくれるインタラクティブなWebアプリケーションです。

## 特徴

- **音声合成**: Web Speech APIを使用して「コンニチハ」と発音
- **モダンなデザイン**: Tailwind CSSによるグラデーション背景とアニメーション
- **レスポンシブ対応**: スマホからデスクトップまであらゆる画面サイズに対応
- **インタラクティブ**: クリック・タッチ時のアニメーションエフェクト
- **コンポーネント設計**: 保守性の高いReactコンポーネント構造

## 技術スタック

- **React 19** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **Web Speech API** - ブラウザネイティブの音声合成

## セットアップ

### 前提条件

- Node.js 18以上

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## プロジェクト構造

```
src/
├── components/
│   ├── BackgroundPattern.tsx  # 背景パターン
│   ├── BottomGradient.tsx     # 下部グラデーション
│   ├── ContentArea.tsx        # コンテンツエリア
│   ├── InfoText.tsx           # 説明文
│   ├── Layout.tsx             # レイアウトコンテナ
│   ├── PineconeImage.tsx      # 松ぼっくり画像
│   └── Title.tsx              # タイトル
├── App.tsx                    # メインアプリケーション
├── App.css                    # アプリケーションスタイル
├── index.css                  # グローバルスタイル（Tailwind CSS）
└── main.tsx                   # エントリーポイント
```

## デザインの特徴

### カラー

- グラデーション背景: 紫 → ピンク → オレンジ
- グロウエフェクト: ピンク → 紫

### アニメーション

- タイトルのパルスアニメーション
- 松ぼっくりホバー時の拡大・回転
- クリック時の縮小・回転エフェクト
- グロウエフェクトのアニメーション

### レスポンシブブレークポイント

- スマホ（デフォルト）: 128px
- タブレット（sm）: 160px
- デスクトップ（md）: 192px
- 大画面（lg）: 256px

## AWSへのデプロイ

このプロジェクトはGitHub Actionsを使用してAWS S3 + CloudFrontに自動デプロイされます。

### セットアップ方法

#### オプション1: Terraformで自動構築（推奨）

Terraformを使用して、必要なAWSリソースを自動的に作成できます。

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvarsを編集してバケット名を設定
terraform init
terraform apply
```

詳細は [terraform/README.md](terraform/README.md) を参照してください。

#### オプション2: 手動セットアップ

手動でAWSリソースを作成する場合は [docs/AWS_SETUP.md](docs/AWS_SETUP.md) を参照してください。

### 前提条件

1. AWSアカウント
2. S3バケットの作成
3. CloudFrontディストリビューションの作成（オプション）

### GitHub Secretsの設定

リポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

- `AWS_ACCESS_KEY_ID`: AWSアクセスキーID
- `AWS_SECRET_ACCESS_KEY`: AWSシークレットアクセスキー
- `AWS_REGION`: AWSリージョン（例: `ap-northeast-1`）
- `S3_BUCKET_NAME`: S3バケット名
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFrontディストリビューションID（CloudFront使用時）

### デプロイフロー

1. `main`ブランチにpush
2. GitHub Actionsが自動的にビルドを実行
3. ビルド成果物をS3にアップロード
4. CloudFrontのキャッシュを無効化（設定時）

### 手動デプロイ

```bash
# ビルド
npm run build

# AWS CLIでS3にアップロード
aws s3 sync dist/ s3://your-bucket-name --delete

# CloudFrontキャッシュを無効化
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## ライセンス

MIT
