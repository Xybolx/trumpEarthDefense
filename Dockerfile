# using alpine image for simplicity
FROM node:12.3.1
# assigning working dir
WORKDIR usr/src/app
# install nodemon for hot reloading
RUN npm install -g nodemon
# copying package.json & package-lock.json
COPY package*.json ./
# installing dependencies
RUN npm install
# copying all files - except node_modules (exempted through via .dockerignore) 
COPY . .
#exposing the endpoint
EXPOSE 3000
# running the command
CMD ["nodemon","server.js", "cd client && npm start"]