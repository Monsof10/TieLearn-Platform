
terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region     = "eu-central-1"
  access_key = "test"
  secret_key = "test"

  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  s3_use_path_style = true

  endpoints {
    ec2 = "http://localhost:4566"
    iam = "http://localhost:4566"
    s3  = "http://localhost:4566"
    rds = "http://localhost:4566"
  }
}

module "networking" {
  source = "./modules/networking"
}

module "iam" {
  source = "./modules/iam"
}

module "compute" {
  source = "./modules/compute"

  ami_id                = "ami-0abcdef1234567891"
  instance_type         = var.instance_type
  instance_profile_name = module.iam.instance_profile_name
  subnet_id             = module.networking.subnet_id
  security_group_id     = module.networking.security_group_id
}

module "data" {
  source     = "./modules/data"
  db_password = var.db_password
}


moved {
  from = aws_vpc.tielearn_network
  to   = module.networking.aws_vpc.tielearn_network
}

moved {
  from = aws_subnet.tielearn_web
  to   = module.networking.aws_subnet.tielearn_web
}

moved {
  from = aws_security_group.tielearn_web
  to   = module.networking.aws_security_group.tielearn_web
}

moved {
  from = aws_iam_policy.tielearn_s3_read
  to   = module.iam.aws_iam_policy.tielearn_s3_read
}

moved {
  from = aws_iam_role.tielearn_ec2_role
  to   = module.iam.aws_iam_role.tielearn_ec2_role
}

moved {
  from = aws_iam_instance_profile.tielearn_profile
  to   = module.iam.aws_iam_instance_profile.tielearn_profile
}

moved {
  from = aws_iam_role_policy_attachment.tielearn_s3_read
  to   = module.iam.aws_iam_role_policy_attachment.tielearn_s3_read
}

moved {
  from = aws_instance.tielearn_test
  to   = module.compute.aws_instance.tielearn_test
}

moved {
  from = aws_s3_bucket.tielearn_assets
  to   = module.data.aws_s3_bucket.tielearn_assets
}

moved {
  from = aws_db_instance.tielearn_database
  to   = module.data.aws_db_instance.tielearn_database
}
