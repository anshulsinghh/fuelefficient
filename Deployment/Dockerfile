# Creates a production-ready image of FuelEfficient
FROM node:12
WORKDIR /usr/src

RUN mkdir Client
COPY ./Client/ ./Client/
RUN rm -rf ./Client/node_modules ./Client/build
RUN cd Client && npm install && npm run build
RUN cd ..

COPY ./Server/ ./
RUN rm -rf Dockerfile .dockerignore
RUN npm install

EXPOSE 4000

ENV NODE_ENV=production
CMD ["node", "server.js"]

# docker build -t anshulsingh/fuelefficient-production -f Deployment/Dockerfile . (run in FuelEfficient directory)