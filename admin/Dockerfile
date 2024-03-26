FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install the dependencies
COPY package*.json ./
RUN npm install

# Copy the source code to the container
COPY . .

# Build the application
RUN npm run build

# Make port 5173 available to the world outside this container
EXPOSE 4173

# Run the application
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]