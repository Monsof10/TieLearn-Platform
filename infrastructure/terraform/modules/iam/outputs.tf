output "aws_iam_policy" {
  description = "arn of tielearn s3 read policy"
  value       = aws_iam_policy.tielearn_s3_read.arn

}
output "aws_iam_role" {
  description = "arn of tielearn ec2 role"
  value       = aws_iam_role.tielearn_ec2_role.arn
}
output "instance_profile_arn" {
  description = "ARN of the TieLearn EC2 instance profile"
  value       = aws_iam_instance_profile.tielearn_profile.arn
}

output "instance_profile_name" {
  description = "Name of the EC2 instance profile"
  value       = aws_iam_instance_profile.tielearn_profile.name
}
