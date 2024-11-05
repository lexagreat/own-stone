ARG NODE_VERSION=18.14.2

# FROM node:${NODE_VERSION}-slim as base
FROM node:18.19.1-alpine3.19
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
# COPY --from=build /frontend/.output /frontend/.output
# COPY --from=build /var/www/own/data/www/own.okttastudio.ru/.output /var/www/own/data/www/own.okttastudio.ru/.output
COPY --from=build /var/www/own/data/www/own.okttastudio.ru/.output /var/www/own/data/www/own.okttastudio.ru/.output

CMD [ "node", ".output/server/index.mjs" ]