output "vpc_id" {
  description = "id of the tielearn network"
  value       = aws_vpc.tielearn_network.id
}
output "subnet_id" {
  description = "id of the tielearn subnet"
  value       = aws_subnet.tielearn_web.id

}
output "security_group_id" {
  description = "id of the tielearn security group"
  value       = aws_security_group.tielearn_web.id

}