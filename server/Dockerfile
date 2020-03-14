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
EXPOSE 9000
# running the command
CMD ["npm", "start"]

