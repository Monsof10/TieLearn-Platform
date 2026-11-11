
resource "aws_instance" "tielearn_test" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  iam_instance_profile   = var.instance_profile_name
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]


}
