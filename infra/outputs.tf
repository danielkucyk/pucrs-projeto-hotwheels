output "frontend_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "api_instance_ip" {
  value = aws_instance.api_server.public_ip
}