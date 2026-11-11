
resource "aws_vpc" "tielearn_network" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "tielearn_network"
  }
}

resource "aws_subnet" "tielearn_web" {
  vpc_id            = aws_vpc.tielearn_network.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-central-1a"

  tags = {
    Name = "Tielearn-web-subnet"
  }
}

resource "aws_security_group" "tielearn_web" {
  name        = "tielearn-web-security-group"
  description = "allow http traffic to tielearn"
  vpc_id      = aws_vpc.tielearn_network.id

  ingress {
    description = "allow http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "tielearn-web-security-group"
  }
}
