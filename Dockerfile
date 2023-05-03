// Builder 
FROM node:16-apline as builder
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build

//Dev environment
FROM node:16-alpine 
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npm install pm2 -g
COPY --from=builder /app/build ./build
EXPOSE 2567
CMD ["pm2-runtime", "build/server.bundle.js"]
