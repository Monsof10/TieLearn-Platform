#stage 1: install dependencies 
FROM node:20-alpine AS deps 

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --omit=dev


#stage2 : production

FROM node:20-alpine AS runner 

WORKDIR /app 
RUN apk update && apk upgrade 
ENV NODE_ENV=production 

# Remove package managers from the production runtime
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack 

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 5000 

USER node

CMD ["node", "server.js"]
