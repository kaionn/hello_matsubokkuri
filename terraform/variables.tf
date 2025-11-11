variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "bucket_name" {
  description = "S3 bucket name for static website hosting (must be globally unique)"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., production, staging)"
  type        = string
  default     = "production"
}

variable "iam_user_name" {
  description = "IAM user name for GitHub Actions"
  type        = string
  default     = "github-actions-deploy"
}

variable "enable_cloudfront" {
  description = "Enable CloudFront distribution"
  type        = bool
  default     = true
}
