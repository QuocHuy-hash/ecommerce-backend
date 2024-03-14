FROM node:18
WORKDIR /src

COPY package*.json ./

# RUN npm install && npm install pm2 -g
RUN npm install 
RUN npm rebuild bcrypt 

COPY . .

EXPOSE 3055

CMD [ "npm", "start" , "npm start"]
# CMD [ "pm2-runtime", "start", "npm", "--", "run", "start" ]

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

RUN mkdir -p /var/log/redis && chown redis:redis /var/log/redis
