FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["*"", "/app"]

RUN cd /app
RUN npm install --production

#COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]