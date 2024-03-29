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
                        sh 'ssh -o StrictHostKeyChecking=no root@14.225.207.2 "cd /root/app/Nodejs-MySql && git pull origin release"'
                        sh 'ssh root@14.225.207.2 "cd /root/app/Nodejs-MySql && sudo docker compose up -d --build"'

                    }
                }
            }
        }
    }

    
}
