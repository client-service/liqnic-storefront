# DEV
FROM node:22-alpine AS dev-target
ENV NODE_ENV=development

# Create directory named app to hold the application code inside the image
WORKDIR /app

# Sharp utility
RUN apk add --no-cache libc6-compat

# Add package.json and package-lock.json
COPY package*.json /tmp/

RUN cd /tmp && npm install

# Move installed node modules to app
RUN cp -a /tmp/node_modules /app

# Bundle app source
COPY . /app

# PORT ID inside docker container
EXPOSE 3000

# Build
FROM dev-target AS build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN npm run build

# Reduce installed packages to production-only.
RUN npm prune --production

# PROD
FROM node:22-alpine AS prod-target
ENV NODE_ENV=production
# Force sharp to use only 1 core of the CPU
ENV SHARP_CONCURRENCY=1

WORKDIR /app

# Only copy the necessary standalone files
COPY --from=build-target /app/public ./public
COPY --from=build-target /app/.next/standalone ./
COPY --from=build-target /app/.next/static ./.next/static
COPY --from=build-target /app/check-env-variables.js ./check-env-variables.js

# PORT ID inside docker container
EXPOSE 3000

CMD ["node", "server.js"]
