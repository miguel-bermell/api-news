FROM node:16-alpine

WORKDIR /src
COPY package*.json .
EXPOSE 3000

ENV NODE_ENV=development
RUN npm i -g nodemon && npm i
COPY . /
CMD ["npm", "run", "start:dev"]