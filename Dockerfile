ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=production

WORKDIR /frontend

# build
FROM base as build

COPY --link package*.json .
RUN npm install --production=false

COPY --link . .

RUN yarn build

# run
FROM base

COPY --from=build/var/www/own/data/www/own.okttastudio.ru/.output /var/www/own/data/www/own.okttastudio.ru/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]