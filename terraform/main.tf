terraform {
  required_version = ">= 1.2.0"

  backend "s3" {
    bucket = "spotify-frame-tfstate"
    key    = "terraform/terraform.tfstate"
    region = "us-west-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key

  default_tags {
    tags = {
      project = "spotify_frame"
    }
  }
}

module "s3" {
  source                                    = "./modules/s3"
  s3_bucket_name                            = var.s3_bucket_name
  cloudfront_origin_access_identity_iam_arn = module.cloudfront.cloudfront_origin_access_identity_iam_arn
}

module "cloudfront" {
  source                         = "./modules/cloudfront"
  s3_bucket_id                   = module.s3.s3_bucket_id
  s3_bucket_regional_domain_name = module.s3.s3_bucket_regional_domain_name
}
