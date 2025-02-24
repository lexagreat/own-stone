FROM node:20 as base
ENV NODE_ENV=production

WORKDIR /var/www/fastuser/data/www/ownstone-frontend

# build
FROM base as build

COPY --link package*.json ./
RUN yarn install --production=false

COPY --link . .

RUN yarn build

# run
FROM base
COPY --from=build /var/www/fastuser/data/www/ownstone-frontend/.output /var/www/fastuser/data/www/ownstone-frontend/.output

CMD [ "node", ".output/server/index.mjs" ]