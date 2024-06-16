# Use the official Node.js image as the base image
FROM node:20.12.2 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install


FROM node:20.12.2
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
RUN npm install -g nodemon
RUN npm install -g pino-pretty
COPY . .

EXPOSE 8000


# Start the Node.js application
CMD ["npm", "start"]