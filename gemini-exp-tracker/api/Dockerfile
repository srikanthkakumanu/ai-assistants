# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json ./tsconfig.json

RUN npm ci





# Copy app source code
COPY src/ ./src/

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]