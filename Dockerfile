FROM node:12

# create app directory
WORKDIR /app

# bundle app source
COPY . /app

# copy both package.json & package-lock.json
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# expose port to docker daemon
EXPOSE 8080

# define command to run app
CMD ["npm", "start"]

# psql
RUN apt-get update && apt-get install -y postgresql-client