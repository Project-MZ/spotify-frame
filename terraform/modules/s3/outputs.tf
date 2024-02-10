output "s3_bucket_id" {
  value = aws_s3_bucket.spotify_frame.id
}

output "s3_bucket_regional_domain_name" {
  value = aws_s3_bucket.spotify_frame.bucket_regional_domain_name
}
