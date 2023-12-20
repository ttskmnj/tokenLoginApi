const router = require('express').Router()
const {User} = require('../models/user')
const passport = require('passport')
require('../config/passport-config')(passport)

router.use(passport.initialize())

router.get('/', 
    passport.authenticate('jwt', { session: false }), 
    async (request, response) => {
        const users = await User.findAll()
        const result = users.map((user) => {
            return {id:user.id, name:user.name, email: user.email}
        } )

        response.status(200).send(result)
})


router.get('/:uid', async (request, response) => {
    const target_uid = request.params.uid
    const uid = request.decoded.id

    if(uid === target_uid){
        const user = await User.findByPk(uid)
        response.status(200).send(user)
    }else{
        response.status(401).json({ error: 'you are not allowed to see other user detail' })
    }
})


router.put('/', async(request, response) => {
    const uid = request.decoded.id
    const userdata = request.body

    const user = await User.update(userdata, {where: {id: uid}} )

    response.status(200).send(user)
})


router.delete('/', async (request, response) => {
    const target_uid = request.body.target_uid

    await User.destroy({where:{id: target_uid}})
    response.status(200).json({ msg: 'successfully removed user' })
})


module.exports = router;