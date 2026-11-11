FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server python3 \
    && rm -rf /var/lib/apt/lists/*


RUN useradd --create-home --shell /bin/bash ansible 


RUN mkdir -p /run/sshd

RUN mkdir -p /home/ansible/.ssh && chmod 700 /home/ansible/.ssh && chown -R ansible:ansible /home/ansible/.ssh 


RUN touch /home/ansible/.ssh/authorized_keys && chmod 600 /home/ansible/.ssh/authorized_keys 


RUN chown ansible:ansible /home/ansible/.ssh/authorized_keys


RUN sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config

EXPOSE 22 


CMD ["/bin/sh", "-c", "ssh-keygen -A && exec /usr/sbin/sshd -D -e"]
