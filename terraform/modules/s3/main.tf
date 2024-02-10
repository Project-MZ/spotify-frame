resource "aws_s3_bucket" "spotify_frame" {
  bucket        = var.s3_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "spotify_frame" {
  bucket = aws_s3_bucket.spotify_frame.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "spotify_frame" {
  depends_on = [aws_s3_bucket_ownership_controls.spotify_frame]
  bucket     = aws_s3_bucket.spotify_frame.id
  acl        = "private"
}

resource "aws_s3_bucket_policy" "spotify_frame" {
  bucket = aws_s3_bucket.spotify_frame.id
  policy = data.aws_iam_policy_document.spotify_frame.json
}

data "aws_iam_policy_document" "spotify_frame" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [var.cloudfront_origin_access_identity_iam_arn]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${aws_s3_bucket.spotify_frame.arn}/*"
    ]
  }
}
