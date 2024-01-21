FROM node:18

WORKDIR /app
COPY src/ ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]