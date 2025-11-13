# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# 빌드 전에 환경 변수 설정
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr
ENV NODE_ENV=production

# dependencies 설치
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# 프로젝트 전체 복사 후 빌드
COPY . .
RUN npm run build

# Run Stage
FROM node:20-alpine
WORKDIR /app

# 런타임때 쓸 환경 변수수
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr

# 필요한 파일만 선택적으로 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# production dependencies만 설치
RUN npm ci --only=production && \
    npm cache clean --force

EXPOSE 3000

# Standalone 모드로 실행
CMD ["node", "server.js"]