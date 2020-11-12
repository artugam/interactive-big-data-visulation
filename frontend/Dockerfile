FROM node:12 as dependencies
WORKDIR /app

RUN \
  apt-get update && \
  apt-get install -y git && \
  apt-get install -y openjdk-8-jre

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
