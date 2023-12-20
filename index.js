require('dotenv').config()
const express = require('express')
const { sequelize } = require("./config/database");
const {User} = require("./models/User");
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/user')
const cors = require('cors')


// connect to postgres
sequelize.authenticate().then(() => {
  User.sync({ alter: true });

  const app = express()

  // middleware
  app.use(express.json())
  app.use(cors())
  
  // routers
  app.use('/auth', authRouter)
  app.use('/user', userRouter)
  
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
