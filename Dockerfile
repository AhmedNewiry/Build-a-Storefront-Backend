FROM node:16-alpine3.14
WORKDIR /app
COPY package*.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3001
CMD ["yarn","start"]