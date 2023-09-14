FROM node:alpine

WORKDIR /usr/app/

# Install nodemon
RUN npm install -g nodemon

COPY ./package.json /usr/app/
COPY ./src /usr/app/src/
COPY yarn.lock /usr/app/

RUN npm install

CMD ["npm", "run", "dev"]