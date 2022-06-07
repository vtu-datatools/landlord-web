FROM node:13.12.0-alpine
ENV NODE_ENV=development
ENV REACT_APP_PROD=false

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app


COPY ./frontend/package.json ./frontend/package-lock.json ./
# This is due to a bug in npm 7 see: https://github.com/npm/cli/issues/2011
RUN mkdir node_modules && chown node:node node_modules
USER node
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY --chown=node:node ./frontend/src/ ./src
COPY --chown=node:node ./frontend/public/ ./public