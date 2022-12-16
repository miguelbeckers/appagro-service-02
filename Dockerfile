FROM node:12.18.1

ENV NODE_ENV=production

COPY . .

RUN npm install --production

EXPOSE 8000

CMD [ "node","index.js" ]