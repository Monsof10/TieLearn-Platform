# stage 1: Dependencies 
FROM node:20-alpine AS deps 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

#stage 2 : build 
FROM node:20-alpine AS builder 

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build 

#stage3 : production
FROM node:20-alpine AS runner 

WORKDIR /app 

RUN apk update && apk upgrade 
ENV NODE_ENV=production 

RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

USER node

CMD ["node" , "server.js"]