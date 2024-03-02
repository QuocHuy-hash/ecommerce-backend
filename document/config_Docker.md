1: setup docker container for mys
2: cmd: docker exec -it container_id bash
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


------->>> SETUP NGINX 
link document: <https://duthanhduoc.com/blog/deploy-website-nextjs-hoac-nodejs-len-vps
cmd : <sudo apt-get update && sudo apt-get install nginx>
        < Mở port 22 (ssh), Nginx Full mở rồi không cần mở lại
        cmd <sudo ufw allow ssh>
        # Bật tường lửa, nhưng cái này chỉ bật trong phiên làm việc hiện tại thôi, reboot là nó tự tắt
        cmd :<sudo ufw enable>
        # Kiểm tra trạng thái tường lửa
        cmd : <sudo ufw status>
        # Yêu cầu tường lửa lên mỗi khi khởi động lại server
        cmd: <sudo systemctl enable ufw>  

    -------if choose HTTP-----
    <sudo ufw delete allow 'Nginx HTTP'>


-------->>>SETUP NGINX CONFIG--------
step 1: bash into container nginx 
step 2: vim /etc/nginx/nginx.conf
step 3: http {
                server {
                        listen 80;
                        server_name mydomain.com www.mydomain.com;

                        location / {
                        proxy_pass http://localhost:3000; // Chuyển hướng đến ứng dụng Node.js của bạn
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-Proto $scheme;
                        }
                }

                # Các cấu hình khác...
                }
step 4: nginx -t // check 
step 5: service nginx restart 