1: setup docker container for mys
2: cmd: docker exec -it container_id bash
//Link DockerFile
[https://elroydevops.tech/mau-dockerfile-cac-du-an/#Dockerfile_Nodejs]
--show database 
-->>> COPPY DATABASE FROM LOCAL INTO DOCKER CONTAINER ;
1:cmd:  <mysqldump -u username -p database_name > backup_file_name.sql> //backup file mysql

2: cmd: <docker cp backup.sql container_id:/path/to/backup.sql>  //coppy file backup into folder container docker
        ---docker cp nodejs.sql container_id:/home/backup.sql

3: connect into docker container 
4: cmd: <mysql -u username -p database_name < /path/to/backup_file_name.sql>


------------ChangePassMysqlRoot----------------
<ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';>
<FLUSH PRIVILEGES;>


---->UPLOAD PROJECT INTO VPS USING CMD
cmd :<scp -r <your-project-directory> <user>@<host>:/path/to/destination >

------>SETUP DOCKER ON THE VPS 
cmd :   <curl -fsSL https://get.docker.com -o get-docker.sh>
        <sudo sh get-docker.sh>
        <sudo curl -L "https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose>
        <sudo chmod +x /usr/local/bin/docker-compose>



add SSL 
1:
sudo apt update
sudo apt install software-properties-common
sudo add-apt-reponsitory ppa:certbot/certbot
sudo apt-update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d shop-ecommerce.click


IF ERROR MEMORIS 
ExecStart=/usr/bin/dockerd --exec-opt native.cgroupdriver=systemd --memory-swap-enable=true
sudo systemctl daemon-reload
sudo systemctl restart docker
