# 使用 Docker 安装

## 使用 `docker run`

```
$ docker run --name typecho-server -e TYPECHO_SITE_URL=https://your-domain.com -d joyqi/typecho:nightly-php7.4-apache
```

## 使用 `docker compose`

```
version: '3.7'

services:
  typecho:
    image: joyqi/typecho:nightly-php7.4-apache
    container_name: typecho-server
    restart: always
    environment:
      - TYPECHO_SITE_URL=https://your-domain.com
    ports:
      - 8080:80
    volumes:
      - /var/typecho:/app/usr
```

1. 替换 `your-domain.com` 为你的域名。
2. Port `8080` 只是示例端口，修改为你需要映射的端口
3. `/var/typecho` 是你的 Typecho 数据目录，你可以使用任何你喜欢的目录，但请确保目录存在且可写。
