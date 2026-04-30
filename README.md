# 🎫 基于 Vue + Node.js 的全栈微信票务系统

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-2.x-green.svg)](https://vuejs.org/)
[![Node](https://img.shields.io/badge/Node-Express-blue.svg)](https://nodejs.org/)
[![Apache](https://img.shields.io/badge/Server-Apache-red.svg)](https://httpd.apache.org/)

本仓库包含一个完整的全栈微信购票系统。项目不仅实现了业务逻辑，更重要的是完整走通了**生产环境部署**流程，解决了内网穿透、反向代理路径重写、静态资源托管及服务持久化等真实场景下的技术痛点。

---

## 📱 演示预览 (Demo)

### 1. 核心流程预览
![Demo Preview](./demo_preview.gif)

> **⚠️ 必读：微信测试号进入说明**
> 由于本项目运行在微信测试号环境下，受微信安全规则限制，**必须先进入白名单**：
> 1. **左侧扫码**：关注测试公众号（加入白名单）。
> 2. **右侧扫码**：进入票务系统演示页面。

<p align="center">
  <img src="./docs/images/测试公众号.jpg" width="220" title="1. 扫码关注测试号">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./docs/images/project_entry_qr.png" width="220" title="2. 扫码进入系统">
</p>

### 2. 完整演示视频
请观看下方演示录屏，了解从授权登录到下单支付的完整流程：

[📺 点击播放演示视频](https://github.com/user-attachments/assets/be529804-a7f2-4c57-b8da-d3c1a902e267)

---

## 🌟 项目亮点

*   **全栈实战**：深度集成微信 OAuth 2.0 授权流，实现 `code` 换取 `access_token` 及用户信息获取。
*   **生产级部署方案**：
    *   **Apache 反向代理**：解决 Vue History 模式刷新 404 问题，并实现前后端同源通信。
    *   **路径精细化转发**：通过 `ProxyPass` 映射规则，完美对接 Express 接口。
*   **高可用守护**：使用 **PM2** 守护后端进程，配置开机自启，确保服务 7x24 不间断。
*   **资源优化策略**：通过 Apache `Alias` 映射静态图片目录，实现数据库 URL 与物理路径解耦。

---

## 🏗️ 技术架构

*   **前端**: Vue.js 2.x, Vue Router (History mode), Axios, Vant UI
*   **后端**: Node.js, Express, MySQL 8.0
*   **运维/部署**: 
    *   **服务器**: Ubuntu / CentOS + Apache 2.4
    *   **进程管理**: PM2
    *   **内网穿透**: NATAPP (用于微信回调本地联调)

---

## 🚀 快速开始

### 1. 数据库准备
创建数据库并导入 `/db/ident.sql`：
```sql
CREATE DATABASE ticket_system;
USE ticket_system;
SOURCE ./db/ident.sql;
```

### 2. 后端配置与启动
进入 `server/` 目录，修改 `server.js` 中的数据库及微信配置：
```javascript
const db = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'ticket_system'
});

const WX_CONFIG = {
    AppID: '你的AppID',
    AppSecret: '你的AppSecret'
};
```
使用 PM2 启动：
```bash
npm install
pm2 start server.js --name "ticket-backend"
pm2 save
```

### 3. 前端构建
```bash
npm install
npm run build
```
将生成的 `dist` 目录上传至服务器 `/home/proj/ticket/dist`。

---

## 🌐 生产环境部署参考 (Apache)

为确保 History 模式及 API 转发正常，请参考以下虚拟主机配置：

```apache
<VirtualHost *:80>
    ServerName 你的域名.com
    DocumentRoot /home/proj/ticket/dist

    # 1. 解决 Vue History 模式刷新 404
    <Directory /home/proj/ticket/dist>
        AllowOverride All
        Options -Indexes +FollowSymLinks
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # 2. 接口反向代理 (映射到 Node.js 3333 端口)
    ProxyPass /dbapi http://127.0.0.1:3333/dbapi
    ProxyPassReverse /dbapi http://127.0.0.1:3333/dbapi

    # 3. 静态图片映射 (Alias 提升性能)
    Alias /img /home/proj/ticket/dist/img
    <Directory /home/proj/ticket/dist/img>
        Require all granted
    </Directory>
</VirtualHost>
```

---

## 📄 常用维护命令

| 任务 | 命令 |
| :--- | :--- |
| **重启后端服务** | `pm2 restart ticket-backend` |
| **查看服务日志** | `pm2 logs ticket-backend` |
| **测试 Apache 配置** | `sudo apache2ctl configtest` |
| **重载 Apache 服务** | `sudo systemctl reload apache2` |

---

## 🤝 联系我

如果你正在寻找一位具备**全栈开发能力**、熟悉 **Linux 运维部署**且能独立解决微信生态复杂问题的开发者，欢迎联系：

*   **Email**: [wolfyangzhou@163.com]
*   **Location**: [南京/远程]
*   **GitHub**: [@coder4word](https://github.com/coder4word)
