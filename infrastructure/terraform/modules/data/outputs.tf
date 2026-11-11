output "s3_bucket_arn" {
  description = "arn of s3 bucket"
  value       = aws_s3_bucket.tielearn_assets.arn
}
output "database_identifier" {
  description = "Identifier of the TieLearn database"
  value       = aws_db_instance.tielearn_database.identifier
}