FROM node:13.12.0-alpine
ENV NODE_ENV=production
ENV REACT_APP_PROD=true

WORKDIR /app

COPY --chown=node:node ./frontend/ ./src
# This is due to a bug in npm 7 see: https://github.com/npm/cli/issues/2011
# RUN mkdir node_modules && chown node:node node_modules

RUN npm ci --only=production

ENV PATH /app/node_modules/.bin:$PATH

USER node
RUN npm run build
