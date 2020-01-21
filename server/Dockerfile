FROM node:12.3.1-alpine
# assigning working dir
WORKDIR /server
# copying package.json & package-lock.json
COPY package*.json /server/
# installing dependencies
RUN npm install
# copying all files - except if exempted through .dockerignore) 
COPY . /server/
# exposing the endpoint
EXPOSE 80
# running the command
CMD ["npm", "start"]

# Install app dependencies
# FROM node:12.3.1-alpine
# RUN mkdir /build-dir
# WORKDIR /build-dir
# COPY package*.json /build-dir
# RUN npm install -g babel babel-runtime babel-register nodemon
# RUN npm install

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# RUN ln -s /build-dir/node_modules node_modules

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 3000
# CMD [ "npm", "start" ]