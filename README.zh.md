# DemoServer
这是一个基于Nodejs的DemoServer,使用 node-deb来生成deb安装文件

# 配置:
* 启动设置: [auto|upstart|systemd|sysv|none], 推荐使用systemd方式
  * none: 不使用启动设置
  * upstart: 使用 /etc/init/xxxx.conf
  * sysv: 使用 /etc/init.d/xxxx
  * systemd: 使用 /etc/systemd/system/xxxx.service link by /lib/systemd/system/xxxx.service
  * auto: upstart, sysv and systemd

* node-deb命令行运行参数
  * --verbose 啰嗦模式,可查看打包过程
  * -no-default-package-dependencies 不使用node-deb的默认包依赖

* package.json中node_deb设置参数
  * init = [auto|upstart|systemd|sysv|none]
  * dependencies = "sudo"           设置deb安装包的安装依赖(运行环境)
  * install_strategy 设置node_modules打包方式,默认auto
    * auto 默认为自动
    * copy 复制到deb安装包中
    * npm-install 不打包,安装deb时执行npm-install从网络或本地缓存中安装
  * install_dir =  "/opt"           安装路径(运行环境)
  * user = "emck"                   系统用户(运行环境)
  * group = "emck"                  系统组别(运行环境)
  * executable_name = "demoserver"  Services名称
  * package_name = "demoserver"     生成的deb文件名
  * output_deb_name = "demoserver"  指定生成的deb文件名(覆盖package_name的设置)
  * templates deb模板设置
    * control = "config/deb-templates/control"
    * default_variables": "config/deb-templates/default",
    * executable": "config/deb-templates/executable",
    * preinst": "config/deb-templates/preinst",
    * postinst": "config/deb-templates/postinst",
    * postrm": "config/deb-templates/postrm",
    * prerm": "config/deb-templates/prerm",
    * systemd_service": "config/deb-templates/systemdservice",
    * sysv_init": "config/deb-templates/sysv-init",
    * upstart_conf": "config/deb-templates/upstart.conf"
  * entrypoints
    * daemon = "app.js --daemon"

* node-deb命令行推荐

    node-deb --verbose --no-default-package-dependencies -- app.js lib

# 打包:
```shell
  npm run builddeb
```

# 开发环境:
* node-deb
    ```shell
    npm -g install node-deb
    ```
* jq, fakeroot, dpkg
    ```shell
    brew install jq fakeroot dpkg
    ```


# 运行环境 (on linux):
* Nodejs (node)
  1. 添加node路径到全局profile中
        ```shell
        echo "PATH=\$PATH:/usr/local/lib/node/bin" > /etc/profile.d/node.sh
        ```

  2. 软链node路径到/usr/bin (修复systemctl无法找到node的bug)
        ```shell
        ln -s /usr/local/lib/node/bin/node /usr/local/bin
        ln -s /usr/local/lib/node/bin/npm /usr/local/bin
        ```

```shell
dpkg常用命令行:
  dpkg --info demoserver_1.0.0_all.deb
  dpkg --contents demoserver_1.0.0_all.deb
  dpkg --unpack demoserver_1.0.0_all.deb

  dpkg -r demoserver
  dpkg --purge demoserver

systemctl常用命令行:
  systemctl start demoserver.service
  systemctl stop demoserver.service
  systemctl restart demoserver.service

如果运行出错,可使用以下命令来查看错误
  systemctl status demoserver.service
  journalctl -xe

```

测试DemoServer是否运行正常
```shell
curl http://localhost:8180
```