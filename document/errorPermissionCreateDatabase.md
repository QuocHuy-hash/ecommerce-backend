ERROR 1044: Access denied for user 'root'@'%' to database 'nodejs'

Đăng nhập vào MySQL bằng tài khoản root: 
    => mysql -u root -p
    => SHOW GRANTS FOR 'root'@'%';
Cấp quyền tạo cơ sở dữ liệu
    => GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
    => FLUSH PRIVILEGES;
Sau khi đã cấp quyền, thử lại lệnh tạo schema:
    => CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
