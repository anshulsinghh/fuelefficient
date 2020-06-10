# Creates a production-ready image of FuelEfficient
FROM node:12
WORKDIR /usr/src

# Create a Client folder, and copy the FuelEfficient client into it
RUN mkdir Client
COPY ./Client/ ./Client/

# Remove any existing node modules or build files
RUN rm -rf ./Client/node_modules ./Client/build

# Install and build the Client for FuelEfficient
RUN cd Client && npm install && npm run build
RUN cd ..

# Copy over the source code for the RESTful API, and install necessary node packages
COPY ./Server/ ./
RUN npm install

# The port the server is running on
EXPOSE 4000

# State that we're in production, and run the server file
ENV NODE_ENV=production
CMD ["node", "server.js"]

# docker build -t anshulsingh/fuelefficient-production -f Deployment/Dockerfile . (run in FuelEfficient directory)
# docker run -p 4000:4000 anshulsingh/fuelefficient-production