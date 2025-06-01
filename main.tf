resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend"
}

resource "aws_cloudfront_origin_access_identity" "frontend_oai" {
  comment = "OAI for frontend CloudFront distribution"
}

resource "aws_cloudfront_distribution" "frontend_cdn" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "frontendS3Origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "frontendS3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

resource "aws_instance" "api_server" {
  ami           = "ami-0b5a42ccb0a949cf1"
  instance_type = var.instance_type

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nodejs git
              git clone https://github.com/danielkucyk/pucrs-projeto-hotwheels.git
              cd pucrs-projeto-hotwheels/hotwheels-api
              npm install
              npm start
            EOF

  tags = {
    Name = "${var.project_name}-api"
  }
}

