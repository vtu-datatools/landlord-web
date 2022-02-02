FROM node:13.12.0-alpine
ENV NODE_ENV=production
ENV REACT_APP_PROD=true

WORKDIR /app
RUN chown -R node:node /app


COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci
ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node ./frontend/src/ ./src
COPY --chown=node:node ./frontend/public/ ./public

RUN npm run build
