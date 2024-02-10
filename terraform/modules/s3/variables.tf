variable "s3_bucket_name" {
  type        = string
  description = "s3 bucket name"
}

variable "cloudfront_origin_access_identity_iam_arn" {
  type        = string
  description = "cloudfront orign access identity iam arn"
}
