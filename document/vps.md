`create ssh key:` 
-  ssh-keygen -t rsa -b 4096 ;{length:4096 bit}
/root/.ssh/id_rsa => private key : dan key nay vao trong config SSH OVER PUBLISH trong jenkins
`config for login using ssh key whithout password`
    1...[vim ~/.ssh/authorized_keys] => `Copy toàn bộ nội dung Public key [Năm trong thư muc /root/.ssh/id_rsa.pub] (dạng ssh-rsa AAAA...) chèn thêm phía cuối file. Nhấn Ctrl+O để lưu lại nội dung và Ctrl+X để thoát khỏi editor.`
    2...[https://hocvps.com/ssh-keys-login/]
            =>[`PubkeyAuthentication yes` ;
            `AuthorizedKeysFile .ssh/authorized_keys`]
    3... `restart service` =>>[service sshd restart]


```NOTE``` download plugin [SSH Agent Plugin]