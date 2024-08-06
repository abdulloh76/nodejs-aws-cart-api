#Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "build" ]

#Stage 2: Run the application
FROM node:18-alpine As production

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .

EXPOSE 4000
CMD [ "node", "dist/main.js" ]
