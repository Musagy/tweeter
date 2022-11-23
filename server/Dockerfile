FROM node:18

ENV DIR=/home/app/server
RUN mkdir -p ${DIR}
WORKDIR ${DIR}

COPY package.json .
RUN yarn install && yarn cache clean
# RUN yarn remove ts-node-dev
# RUN yarn add --dev nodemon ts-node

## para evitar errores de los comandos
ENV PATH=$DIR/node_modules/.bin:$PATH

WORKDIR ${DIR}/dev
COPY tsconfig.json ./

COPY src ./src
COPY .env ./

# COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "yarn", "dev" ]