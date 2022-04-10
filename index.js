require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/user')
const cors = require('cors')

const url = process.env.MONGODB_URI

// connect to mongodb
mongoose.connect(url).then(() => {

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
  })

