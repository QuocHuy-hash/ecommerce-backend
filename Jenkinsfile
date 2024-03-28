pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'release', url: 'https://github.com/QuocHuy-hash/Nodejs-MySql'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                  
                    sshagent(['ssh-vps']) {
                        sh 'ssh -o StrictHostKeyChecking=no root@14.225.207.2 "cd /app/Nodejs-MySql && git pull origin release"'

                        // Sử dụng Docker Compose trên server để build và khởi chạy containers aaaaaaa
                        sh 'ssh root@14.225.207.2 "cd /root/app/Nodejs-MySql && sudo docker compose up -d"'
                        sh 'ssh root@14.225.207.2 "cd /root/app/Nodejs-MySql && sudo docker compose up -d --build" > deploy.log 2>&1'

                    }
                }
            }
        }
    }

    
}
