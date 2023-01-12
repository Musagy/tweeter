FROM node:18

WORKDIR /tweeter/server

RUN npm i --location=global yarn --force

COPY . .

RUN yarn install

RUN yarn prisma:generate

RUN yarn prisma:deploy

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start" ]