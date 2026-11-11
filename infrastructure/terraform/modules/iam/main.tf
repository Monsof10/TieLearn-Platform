resource "aws_iam_policy" "tielearn_s3_read" {
  name        = "tielearn-s3-read-policy"
  description = "allow tielearn to read objects from s3 bucket"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["s3:GetObject"]
        Resource = ["arn:aws:s3:::tielearn-demo-bucket/*"]

        
      }
    ]
  })
}
resource "aws_iam_role" "tielearn_ec2_role" {
  name = "Tielearn-ec2-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}
resource "aws_iam_instance_profile" "tielearn_profile" {
  name = "Tielearn-ec2-profile"
  role = aws_iam_role.tielearn_ec2_role.name
}
resource "aws_iam_role_policy_attachment" "tielearn_s3_read" {
  role       = aws_iam_role.tielearn_ec2_role.name
  policy_arn = aws_iam_policy.tielearn_s3_read.arn
}