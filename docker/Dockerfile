# 多阶段构建 Dockerfile for React Gas Now Web App

# 第一阶段：构建阶段
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，构建时需要）
RUN npm ci --silent

# 设置 API URL 环境变量
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=https://api.gasnow.link

# 复制源代码
COPY public/ ./public/
COPY src/ ./src/

# 构建应用
RUN npm run build

# 第二阶段：运行时阶段
FROM node:16-alpine AS production

# 安装 serve 用于提供静态文件服务
RUN npm install -g serve

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

# 设置工作目录
WORKDIR /app

# 从构建阶段复制构建产物
COPY --from=builder /app/build ./build

# 更改所有权
RUN chown -R reactuser:nodejs /app

# 切换到非 root 用户
USER reactuser

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# 启动静态文件服务器
CMD ["serve", "-s", "build", "-l", "3000"]
