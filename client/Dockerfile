FROM node:18

ENV DIR=/home/app/tweeter/client
RUN mkdir -p ${DIR}
WORKDIR ${DIR}

COPY package.json ./
RUN yarn install && yarn cache clean
## para evitar errores de los comandos 
# ENV PATH=${DIR}/node_modules/.bin:$PATH

COPY . .

EXPOSE ${PORT}

CMD [ "yarn", "dev" ]