# Base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .


# Expose the port on which the app will run
EXPOSE 3000

# Start the app inside the container
CMD ["npm", "start"]
