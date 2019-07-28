FROM node:11.15.0
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 4200
CMD ng serve --environment dev
