resource "aws_cloudfront_distribution" "spotify_frame" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = var.s3_bucket_regional_domain_name
    origin_id   = var.s3_bucket_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.spotify_frame.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    viewer_protocol_policy   = "redirect-to-https"
    target_origin_id         = var.s3_bucket_id
    origin_request_policy_id = aws_cloudfront_origin_request_policy.spotify_frame.id
    cache_policy_id          = aws_cloudfront_cache_policy.spotify_frame.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_request_policy" "spotify_frame" {
  name = "spotify_frame"

  cookies_config {
    cookie_behavior = "none"
  }

  headers_config {
    header_behavior = "none"
  }

  query_strings_config {
    query_string_behavior = "none"
  }
}

resource "aws_cloudfront_cache_policy" "spotify_frame" {
  name        = "spotify_frame"
  min_ttl     = 1
  max_ttl     = 86400
  default_ttl = 3600

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "spotify_frame" {}
