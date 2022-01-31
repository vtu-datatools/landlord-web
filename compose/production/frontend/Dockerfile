FROM node:13.12.0-alpine
ENV NODE_ENV=production
WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci --production
RUN npm install react-scripts@3.4.1 -g 
COPY ./frontend ./
EXPOSE 3000