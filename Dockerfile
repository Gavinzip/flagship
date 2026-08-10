FROM node:24-alpine AS build

WORKDIR /app

RUN npm install --global pnpm@10.34.5

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM caddy:2.10-alpine AS runtime

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/Caddyfile.csp /etc/caddy/Caddyfile.csp
COPY --from=build /app/dist /usr/share/caddy

EXPOSE 8080
