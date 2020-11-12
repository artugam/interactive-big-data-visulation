FROM node:12 as dependencies
WORKDIR /app

RUN \
  apt-get update && \
  apt-get install -y git && \
  apt-get install -y openjdk-8-jre

COPY ./ ./

######

FROM dependencies as builder
WORKDIR /app

# Compile typescript to JS

RUN npx tsc

# Remove some packages and files to make final image smaller
RUN \
  npm prune --production && \
  find ./node_modules/ -name '*.md' -or -name 'LICENSE' | xargs rm -rf

FROM node:12
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# Not using `npm start` to run app, saves around 30Mb of RAM
ENTRYPOINT ["node", "./dist/index.js"]
