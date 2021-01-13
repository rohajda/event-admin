FROM node:12-alpine

# Create app directory

WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8081

COPY server/dist dist
COPY server/package.json package.json

# install server deps


RUN npm install  && \
    echo "NODE_ENV=prod" > .env

EXPOSE 8081

ENTRYPOINT ["node", "dist/main.js"]
