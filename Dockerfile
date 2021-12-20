FROM node:16-alpine as build
 
# Copies everything over to Docker environment
COPY . /usr/src/app/
 
# Switch to work directory
WORKDIR /usr/src/app

# Install all node packages
RUN yarn install
RUN yarn global add react-scripts@latest

# Build project
RUN npm run build

# Run production server
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port. Used for local Docker build. Will be overridden by Docker Compose
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]