# build
FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps && npm install -g serve
COPY . .

RUN npm run build

# serve
EXPOSE 3000
CMD ["sh", "-c", "serve -s build -l 3000"]
