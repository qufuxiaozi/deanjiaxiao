# 本地打包与服务器部署指南 (Windows)

本指南针对已下载的源码 `D:\openclawwork\openclawl-lao\apiarydrive-shanghai---driving-school-portal (3)`，指导如何在 Windows 本地完成打包并部署到 Linux 虚拟机服务器。

---

## 一、 本地环境准备

在开始之前，请确保您的 Windows 电脑已安装以下软件：
1. **Node.js**: 推荐安装 20.x 或更高版本 ([下载地址](https://nodejs.org/))。
2. **终端工具**: 推荐使用 `PowerShell` 或 `CMD` (推荐 PowerShell)。

---

## 二、 本地打包步骤

1. **打开终端并进入项目目录**
   打开 PowerShell，输入并执行以下命令：
   ```powershell
   cd "D:\openclawwork\openclawl-lao\apiarydrive-shanghai---driving-school-portal (3)"
   ```

2. **安装项目依赖**
   首次运行或更新源码后，需安装必要的 npm 包：
   ```powershell
   npm install
   ```

3. **执行项目编译 (打包)**
   运行打包命令，Vite 会将源代码编译为可以直接在浏览器运行的静态文件：
   ```powershell
   npm run build
   ```
   *执行成功后，项目根目录下会生成一个 \`dist\` 文件夹。*

---

## 三、 将打包好的文件上传至服务器

假设您的虚拟机服务器 IP 为 \`192.168.x.x\`，用户名为 \`root\`，目标存放路径为 \`/var/www/html\`。

1. **(推荐) 先在本地压缩 dist 文件夹**
   在 Windows 的项目根目录，右键 \`dist\` 文件夹 -> 发送到 -> 压缩(zipped)文件夹，命名为 \`dist.zip\`。

2. **使用 scp 命令行上传**
   在 PowerShell 中运行：
   ```powershell
   scp dist.zip root@192.168.x.x:/tmp/
   ```

---

## 四、 服务器端部署 (以 Nginx 为例)

登录您的虚拟机服务器：

1. **进入目标目录并解压**
   ```bash
   cd /var/www/html
   rm -rf *  # 清理旧文件 (请谨慎操作)
   unzip /tmp/dist.zip -d .
   mv dist/* .
   rm -rf dist
   ```

2. **配置 Nginx**
   确保 Nginx 的 `root` 指向了该目录，且 `index` 包含 `index.html`。
   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       location / {
           root /var/www/html;
           index index.html;
           try_files $uri $uri/ /index.html; # 支持单页应用路由
       }
   }
   ```

3. **重启 Nginx**
   ```bash
   systemctl restart nginx
   ```

---

## 五、 总结常用命令列表 (快速查阅)

| 步骤 | 命令 | 说明 |
| :--- | :--- | :--- |
| **安装** | \`npm install\` | 安装所有库 |
| **打包** | \`npm run build\` | 生成 dist 文件夹 |
| **预览** | \`npm run preview\` | 本地预览打包效果 |
| **上传** | \`scp -r dist/* user@ip:/path\` | 直接上传所有文件 |
