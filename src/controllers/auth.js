const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/register',  async (request, response) => {
    const userdata = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userdata.password, saltRounds)
    
    const user = new User({
        name: userdata.name,
        email: userdata.email,
        password: passwordHash,
        street: userdata.street,
        city: userdata.city,
        state: userdata.state,
        creation_date: new Date().toISOString()
    })
    const savedUser = await user.save()
    
    response.json(savedUser)
})


router.post('/login', async (request, response) => {
    const {email, password} = request.body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
        error: 'invalid username or password'
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id,
    }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, user_id: user._id, email: user.email, name: user.name })
})

module.exports = router;