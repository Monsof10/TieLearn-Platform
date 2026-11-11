variable "instance_type" {
  description = "the type we created"
  type        = string
  default     = "t3.micro"
}
variable "db_password" {
  description = "Password for the TieLearn PostgreSQL database"
  type        = string
  sensitive   = true
}