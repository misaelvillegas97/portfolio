FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2.10.2-alpine

RUN addgroup -S caddy \
    && adduser -S -D -H -G caddy caddy \
    && mkdir -p /data /config /srv \
    && chown -R caddy:caddy /data /config /srv

COPY --chown=caddy:caddy Caddyfile /etc/caddy/Caddyfile
COPY --chown=caddy:caddy --from=build /app/dist /srv

USER caddy
EXPOSE 8080
