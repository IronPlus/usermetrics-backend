# Use an official Node.js runtime as the base image
FROM node:lts-alpine3.18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire local directory into the container at /usr/src/app
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Set the NODE_ENV environment variable to production
ENV NODE_ENV production

## Use the node user from the image instead of the root user
USER node

# Expose the port that the application will run on
EXPOSE 8080

# Define the command to start the application
CMD ["node", "dist/main.js"]
