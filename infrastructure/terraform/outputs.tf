
output "instance_id" {
  description = "ID of the TieLearn EC2 instance"
  value       = module.compute.instance_id
}

output "vpc_id" {
  description = "ID of the TieLearn VPC"
  value       = module.networking.vpc_id
}

output "subnet_id" {
  description = "ID of the TieLearn subnet"
  value       = module.networking.subnet_id
}

output "security_group_id" {
  description = "ID of the TieLearn security group"
  value       = module.networking.security_group_id
}

output "aws_iam_policy" {
  description = "ARN of the TieLearn S3 read policy"
  value       = module.iam.aws_iam_policy
}

output "aws_iam_role" {
  description = "ARN of the TieLearn EC2 role"
  value       = module.iam.aws_iam_role
}

output "iam_instance_profile_arn" {
  description = "ARN of the TieLearn EC2 instance profile"
  value       = module.iam.instance_profile_arn
}

output "s3_bucket_arn" {
  description = "ARN of the TieLearn S3 bucket"
  value       = module.data.s3_bucket_arn
}

output "database_identifier" {
  description = "Identifier of the TieLearn database"
  value       = module.data.database_identifier
}
