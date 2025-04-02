await Comment.destroy({
where: {
comment_productId: productId,
comment_right: {
[Op.gte]: leftValue, // Lớn hơn hoặc bằng leftValue
[Op.lte]: rightValue // Nhỏ hơn hoặc bằng rightValue
}
},
transaction: t
});
gt: lớn hơn
lt: bé hơn
gte : lớn hơn hơặc bằng
lte: bé hơn hoặc bằng

<<<<<<<==================================================================================================>>>>
Deploy server EC2
cấu hình để đăng nhập bằng ssh và password trên ec2 với quyền root

```bash
sudo passwd root
sudo nano /etc/ssh/sshd_config
---Thay đổi các dòng:
PermitRootLogin yes
PasswordAuthentication yes
sudo systemctl restart ssh



```

Command:

install nginx

1. Reverse Proxy Nginx

```bash
sudo apt-get install -y nginx
    run ip, not wokring then htto open secirity
cd /etc/nginx/sites-available

sudo vim default

location /api {
 rewrite ^\/api\/(.*)$ /api/$1 break;
 proxy_pass  http://localhost:3000;
 proxy_set_header Host $host;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}


sudo systemctl restart nginx
```

2. Add domain to nginx configuration

```bash
server_name api.shopdev.lol www.api.shopdev.lol;

location / {
    proxy_pass http://locahost:3056;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

3. add SSL to domain

```bash [download common]
sudo apt-get update
sudo apt install --reinstall software-properties-common
sudo add-apt-repository ppa:certbot/certbot (dùng cho ubuntu )
sudo apt-get update
sudo apt-get install python3-certbot-nginx (dùng cho debian )
sudo certbot --nginx -d api.shopdev.lol hoặc sudo certbot certonly --nginx -d api.shopdev.click -d www.shop-ecommerce.click
sudo certbot renew --dry-run
sudo systemctl status certbot.timer
```

sudo systemctl enable apache2

tesst
ALter pass mysql on VPS :
[https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server]

upstream backend_servers {
server localhost:3055;  
 server 43.74.41.163:3056;  
}
