# Step 1 - Copy Files
FROM node:16.13.2 as copy-files
 
## Copy everything over to Docker environment
COPY . /usr/src/app/

# Step 2 - Install Dependencies
FROM copy-files as install-dependencies

## Switch to work directory
WORKDIR /usr/src/app

# Install all node packages
RUN yarn install
RUN yarn global add react-scripts@3.4.1

# Step 3 - Build
FROM install-dependencies as build

## Build project
RUN npm run build

# Step 4 - Run production server
FROM nginx:stable-alpine

## Copy built files
COPY --from=build /usr/src/app/build /usr/share/nginx/html

## Copy Conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port. Used for local Docker build. Will be overridden by Docker Compose
EXPOSE 80

## Run nginx
CMD ["nginx", "-g", "daemon off;"]