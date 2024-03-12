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