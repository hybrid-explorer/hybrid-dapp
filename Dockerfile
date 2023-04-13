FROM gplane/pnpm:8.2

WORKDIR /usr/src/hybrid-dapp

COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 4173

CMD pnpm preview --host 0.0.0.0