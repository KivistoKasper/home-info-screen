# home-info-screen
Info screen project for all kinds of data

## Raberry PiOS (ARM)

### Building and saving
1. 'docker compose -f docker-compose.arm.yml build '
2. 'docker save info-screen-backend info-screen-frontend -o info-screen.tar'
3. 'docker run --privileged --rm tonistiigi/binfmt --install arm64'
installing: arm64 OK
4. 'docker run --rm --platform linux/arm64 alpine uname -m'
aarch64

### Ansible 
`ansible-playbook deploy_app.yml -i hosts.ini --ask-pass`