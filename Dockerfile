FROM node:12.2.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY . .
#EXPOSE 4200
#CMD npm start
#RUN ng build --output-path=dist
#FROM nginx:1.16.0-alpine
#COPY --from=build /app/dist /usr/share/nginx/html
#EXPOSE 80

#run nginx
#CMD ["nginx", "-g", "daemon off;"]
EXPOSE 4200
 
CMD ng serve --host=0.0.0.0 --port=4200  --disableHostCheck=true --publicHost=http://ec2-18-191-112-129.us-east-2.compute.amazonaws.com
