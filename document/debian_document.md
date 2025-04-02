sudo sync && sudo echo 3 | sudo tee /proc/sys/vm/drop_caches

# Xoá các images không có tag hoặc không sử dụng

    docker image prune -f

# Xoá tất cả nhưng volume đã dùng:

    docker volume prune -f

# Xóa tất cả networks không sử dụng

       docker network prune -f

# Xóa tất cả build cache

    docker builder prune -a -f

# Xóa tất cả (containers, images, volumes, networks) không sử dụng

    docker system prune -a -f --volumes

# tạo một bản sao lưu của dữ liệu PostgreSQL hiện tại từ 1 container

    docker exec money_manager_server-database-1 pg_dumpall -U postgres > full_backup.sql

# Xoá tất cả logs trong container

    truncate -s 0 $(docker inspect --format='{{.LogPath}}' <container_id>)

# Download an file to local computer

    scp root@14.225.207.2:app/backup_data/money_manager_backup_03112024.sql ~/Documents/myProject/money_manager/database_backup

# Kiểm tra container su dung RAM

    docker stats
