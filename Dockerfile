FROM node:16-alpine

RUN mkdir -p /home/app
WORKDIR /home/app
COPY package*.json .
RUN npm i -g nodemon && npm i

ENV NODE_ENV=development

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
