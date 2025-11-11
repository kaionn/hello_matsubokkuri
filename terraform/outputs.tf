output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website.id
}

output "s3_bucket_website_endpoint" {
  description = "S3 static website endpoint"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.website[0].id : null
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.website[0].domain_name : null
}

output "iam_user_name" {
  description = "IAM user name"
  value       = aws_iam_user.github_actions.name
}

output "aws_access_key_id" {
  description = "AWS Access Key ID for GitHub Actions"
  value       = aws_iam_access_key.github_actions.id
  sensitive   = false
}

output "aws_secret_access_key" {
  description = "AWS Secret Access Key for GitHub Actions"
  value       = aws_iam_access_key.github_actions.secret
  sensitive   = true
}

output "github_secrets_summary" {
  description = "Summary of values to set as GitHub Secrets"
  value = {
    AWS_ACCESS_KEY_ID            = aws_iam_access_key.github_actions.id
    AWS_SECRET_ACCESS_KEY        = "<sensitive - run: terraform output -raw aws_secret_access_key>"
    AWS_REGION                   = var.aws_region
    S3_BUCKET_NAME               = aws_s3_bucket.website.id
    CLOUDFRONT_DISTRIBUTION_ID   = var.enable_cloudfront ? aws_cloudfront_distribution.website[0].id : "not enabled"
  }
}
