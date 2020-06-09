FROM node:12
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]