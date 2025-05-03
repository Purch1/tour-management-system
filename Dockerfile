# Use a smaller base image for Node.js
FROM node:18.12.1-alpine3.17

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# # Build the TypeScript code
# RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
