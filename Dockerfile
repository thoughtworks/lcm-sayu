FROM node:12
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build

EXPOSE 80:80

CMD ["yarn", "start"]
