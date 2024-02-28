1: setup docker container for mys
2: cmd: docker exec -it container_id bash
--show database 
-->>> coppy database from local into docker container ;
1:cmd:  <mysqldump -u username -p database_name > backup_file_name.sql> //backup file mysql

2: cmd: <docker cp backup.sql container_id:/path/to/backup.sql>  //coppy file backup into folder container docker

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
