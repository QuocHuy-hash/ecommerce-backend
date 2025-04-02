sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
📌 Swap giúp tránh tình trạng hết RAM đột ngột, thay vì bị lỗi timeout thì hệ thống có thể dùng swap để xử lý.

📌 Để xoá swap khi không cần nữa
sudo swapoff /swapfile
sudo rm /swapfile
sudo sed -i '/swapfile/d' /etc/fstab
