FROM node

WORKDIR /CoText

COPY . .

RUN npm install 

CMD [ "npm", "start"]
