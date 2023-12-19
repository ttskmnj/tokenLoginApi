const router = require('express').Router()
const User = require('../models/user')
//const middleware = require('../utils/middleware')
const passport = require('passport')
require('../passport-config')(passport)


//router.use(middleware.verifyToken)
router.use(passport.initialize())

router.get('/', 
    passport.authenticate('jwt', { session: false }), 
    async (request, response) => {
        const users = await User.find()
        const result = users.map((user) => {
            return {"id":user._id, 'name':user.name}
        } )

        response.status(200).send(result)
})


router.get('/:uid', async (request, response) => {
    const target_uid = request.params.uid
    const uid = request.decoded.id

    if(uid === target_uid){
        const user = await User.findById(uid)
        response.status(200).send(user)
    }else{
        response.status(401).json({ error: 'you are not allowed to see other user detail' })
    }
})


router.put('/', async(request, response) => {
    const uid = request.decoded.id
    const userdata = request.body

    const user = await User.findOneAndUpdate({"_id":uid}, userdata, {new: true})

    response.status(200).send(user)
})


router.delete('/', async (request, response) => {
    const target_uid = request.body.target_uid
    const uid = request.decoded.id

    await User.deleteOne({user_id: uid})
    response.status(200).json({ msg: 'successfully removed user' })
})


module.exports = router;