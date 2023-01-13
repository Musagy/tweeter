FROM node:18

WORKDIR /tweeter/client

RUN npm i --location=global yarn --force

COPY . .

COPY .env .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "preview" ]