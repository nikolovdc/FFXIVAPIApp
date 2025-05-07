# Use Node base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install
COPY src/package*.json ./
RUN npm install

# Copy rest of the app
COPY src/ .

# Expose app port
EXPOSE 6003

# Use environment port or default
CMD ["node", "server/server.js"]

# Add the cloudsql connection
RUN mkdir -p /cloudsql

