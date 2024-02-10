output "cloudfront_origin_access_identity_iam_arn" {
  value = aws_cloudfront_origin_access_identity.spotify_frame.iam_arn
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.spotify_frame.domain_name
}
