# DemoServer
This is a DemoServer create by Nodejs, build deb file by node-deb 

# Config:
* init or start type: [auto|upstart|systemd|sysv|none], recommend used systemd
  * none: not used init
  * upstart: /etc/init/xxxx.conf
  * sysv: /etc/init.d/xxxx
  * systemd: /etc/systemd/system/xxxx.service link by /lib/systemd/system/xxxx.service
  * auto: upstart, sysv and systemd

# Requirements by Dev:
* node-deb
    ```shell
    npm -g install node-deb
    ```
* jq, fakeroot, dpkg
    ```shell
    brew install jq fakeroot dpkg
    ```


# Requirements by Run on linux:
* Nodejs (node)
  1. add node path to profile
        ```shell
        echo "PATH=\$PATH:/usr/local/lib/node/bin" > /etc/profile.d/node.sh
        ```

  2. link node path to /usr/bin (fix systemctl not find node bug)
        ```shell
        ln -s /usr/local/lib/node/bin/node /usr/local/bin
        ln -s /usr/local/lib/node/bin/npm /usr/local/bin
        ```

```shell

dpkg --info demoserver_1.0.0_all.deb
dpkg --contents demoserver_1.0.0_all.deb
dpkg --unpack 

dpkg -r demoserver

dpkg --purge demoserver



systemctl status demoserver.service

systemctl restart demoserver.service

systemctl start demoserver.service

systemctl stop demoserver.service

journalctl -xe

```

Test DemoServer:
>curl http://localhost:8180
