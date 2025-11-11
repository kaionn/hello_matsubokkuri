# Terraform でのAWSインフラ構築

このディレクトリには、hello_matsubokkuliプロジェクトのAWSインフラストラクチャをTerraformで管理するための設定が含まれています。

## 構築されるリソース

- **S3バケット**: 静的ウェブサイトホスティング
- **CloudFront**: CDN配信（オプション）
- **IAMユーザー**: GitHub Actions用のデプロイユーザー
- **IAMポリシー**: S3とCloudFrontへの最小権限アクセス
- **IAMアクセスキー**: GitHub Actions用の認証情報

## 前提条件

1. **Terraform** がインストールされていること（v1.0以上）
   ```bash
   terraform -version
   ```

2. **AWS CLI** がインストールされていること
   ```bash
   aws --version
   ```

3. **AWS認証情報** が設定されていること
   ```bash
   aws configure
   ```

   または環境変数で設定:
   ```bash
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   ```

## 使用方法

### 1. 設定ファイルの準備

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

`terraform.tfvars` を編集して、S3バケット名を設定:

```hcl
bucket_name = "your-unique-bucket-name-12345"  # グローバルで一意である必要があります
aws_region = "ap-northeast-1"
enable_cloudfront = true
```

### 2. Terraformの初期化

```bash
terraform init
```

### 3. 実行計画の確認

```bash
terraform plan
```

作成されるリソースを確認します。

### 4. リソースの作成

```bash
terraform apply
```

`yes` を入力して実行を確認します。

### 5. 出力の確認

```bash
terraform output
```

GitHub Secretsに設定すべき値が表示されます:

```
github_secrets_summary = {
  AWS_ACCESS_KEY_ID = "AKIA..."
  AWS_REGION = "ap-northeast-1"
  AWS_SECRET_ACCESS_KEY = "<sensitive - run: terraform output -raw aws_secret_access_key>"
  CLOUDFRONT_DISTRIBUTION_ID = "E1234567890ABC"
  S3_BUCKET_NAME = "your-bucket-name"
}
```

### 6. シークレットアクセスキーの取得

```bash
terraform output -raw aws_secret_access_key
```

**重要**: この値は一度しか表示されません。安全に保存してください。

## GitHub Secretsへの設定

Terraformで作成した認証情報をGitHub Secretsに登録します:

```bash
# GitHubリポジトリ > Settings > Secrets and variables > Actions

# 以下の値を設定:
AWS_ACCESS_KEY_ID=$(terraform output -raw aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(terraform output -raw aws_secret_access_key)
AWS_REGION=$(terraform output -raw aws_region)
S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
```

## リソースの確認

### S3バケット

```bash
aws s3 ls s3://$(terraform output -raw s3_bucket_name)
```

### CloudFront

```bash
aws cloudfront get-distribution --id $(terraform output -raw cloudfront_distribution_id)
```

### ウェブサイトURL

```bash
# S3直接アクセス
echo "http://$(terraform output -raw s3_bucket_website_endpoint)"

# CloudFront経由（推奨）
echo "https://$(terraform output -raw cloudfront_domain_name)"
```

## カスタマイズ

### CloudFrontを無効にする

コスト削減のため、CloudFrontを使用しない場合:

```hcl
# terraform.tfvars
enable_cloudfront = false
```

### リージョンの変更

```hcl
# terraform.tfvars
aws_region = "us-east-1"
```

## リソースの削除

**警告**: すべてのリソースが削除されます。

```bash
terraform destroy
```

`yes` を入力して実行を確認します。

## トラブルシューティング

### バケット名が既に使用されている

```
Error: creating Amazon S3 Bucket: BucketAlreadyExists
```

**解決方法**: `terraform.tfvars` の `bucket_name` を変更して、グローバルで一意の名前にしてください。

### AWS認証エラー

```
Error: error configuring Terraform AWS Provider: no valid credential sources
```

**解決方法**: AWS CLIの認証情報を確認してください:
```bash
aws sts get-caller-identity
```

### CloudFrontのデプロイに時間がかかる

CloudFrontディストリビューションの作成には **15〜20分** かかることがあります。これは正常です。

## セキュリティのベストプラクティス

- ✅ `terraform.tfvars` はGitにコミットしない（.gitignoreに含まれています）
- ✅ アクセスキーは安全に保管する
- ✅ 定期的に `terraform plan` を実行して設定の変更を確認する
- ✅ 使用しなくなったリソースは `terraform destroy` で削除する

## ステート管理（本番環境向け）

本番環境では、Terraformステートをリモートバックエンドに保存することを推奨します:

```hcl
# main.tf に追加
terraform {
  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "hello_matsubokkuri/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
```

## 参考リンク

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-overview.html)
