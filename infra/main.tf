resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_cloudfront_distribution" "frontend_cdn" {
  origin {
    domain_name = aws_s3_bucket.frontend.website_endpoint
    origin_id   = "frontendS3Origin"
  }

  enabled             = true
  default_root_object = "index.html"

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
}

resource "aws_instance" "api_server" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2
  instance_type = var.instance_type

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nodejs git
              git clone https://github.com/SEU_USUARIO/pucrs-projeto-hotwheels.git
              cd pucrs-projeto-hotwheels/hotwheels-api
              npm install
              npm start
            EOF

  tags = {
    Name = "${var.project_name}-api"
  }
}

