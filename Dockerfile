FROM node

WORKDIR /CoText

COPY public /CoText/public
COPY src /CoText/src
COPY uploads /CoText/uploads
COPY .env /CoText/.env
COPY package.json /CoText/package.json
COPY package-lock.json /CoText/package-lock.json
COPY server.js /CoText/server.js

RUN npm install 

CMD [ "npm", "start"]
