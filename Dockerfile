FROM node:lts-alpine
# assigning working dir
WORKDIR usr/src/app
# copying package.json & package-lock.json
COPY package*.json ./
# installing dependencies
RUN npm install
# copying all files - except node_modules (exempted through via .dockerignore) 
COPY . .
#exposing the endpoint
EXPOSE 3000
# running the command
CMD ["npm", "start"]