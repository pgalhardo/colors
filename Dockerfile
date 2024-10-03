FROM node:18-alpine as build
WORKDIR /app
COPY . /app
RUN yarn install && yarn build

FROM node:18-alpine as run
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 80
RUN npm install -g http-server
CMD ["http-server", "-p", "80"]
