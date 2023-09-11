# Use an official Node.js runtime as the base image
FROM node:lts-alpine3.18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire local directory into the container at /usr/src/app
COPY . .

# Expose the port that the application will run on
EXPOSE 8080

# Define the command to start the application
CMD ["npm", "run", "start"]
