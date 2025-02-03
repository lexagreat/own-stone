FROM node:18 as base
ENV NODE_ENV=production

WORKDIR /var/www/own/data/www/own.okttastudio.ru

# build
FROM base as build

COPY --link package*.json .
RUN yarn install --production=false

COPY --link . .

RUN yarn build

# run
FROM base
COPY --from=build /var/www/own/data/www/own.okttastudio.ru/.output /var/www/own/data/www/own.okttastudio.ru/.output

CMD [ "node", ".output/server/index.mjs" ]