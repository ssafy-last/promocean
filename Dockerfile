# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

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

# 환경 변수 설정하기기
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr

# SSR 서버 실행
CMD ["npm", "run", "start"]