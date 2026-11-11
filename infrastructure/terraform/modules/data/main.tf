resource "aws_s3_bucket" "tielearn_assets" {
  bucket = "tielearn-demo-bucket"
  tags = {
    Name    = "Tielearn-Assets"
    Project = "Tielearn"
  }
}
resource "aws_db_instance" "tielearn_database" {
  identifier        = "tielearn-database"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "tielearn"
  username          = "tielearn_admin"
  password          = "var.db_password"

  skip_final_snapshot = true
}