# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# 빌드 전에 환경 변수 설정 (빌드 타임 주입)
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr
ENV NODE_ENV=production

# dependencies 설치
COPY package*.json ./
RUN npm ci

# 프로젝트 전체 복사 후 빌드
COPY . .
RUN npm run build

# Run Stage
FROM node:20-alpine
WORKDIR /app

# 빌드 결과만 복사
COPY --from=builder /app ./

# Next.js SSR 서버 포트
EXPOSE 3000

# 환경 변수 (런타임용도 다시 설정)
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr

# SSR 서버 실행
CMD ["npm", "run", "start"]