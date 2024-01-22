const router = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')


router.use(middleware.verifyToken)

router.get('/', async (request, response) => {
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


router.put('/:uid', async(request, response) => {
    const target_uid = request.params.uid
    const uid = request.decoded.id
    const userdata = request.body

    if(target_uid != uid)
        return response.status(401).json({ error: 'you are not allowed to update other user detail' })

    try{
        const user = await User.findOneAndUpdate({"_id":uid}, userdata, {new: true})
        response.status(200).send(user)
    }catch (error){
        response.status(500).json({ error })
    }

})


router.delete('/:uid', async (request, response) => {
    const target_uid = request.params.uid
    const uid = request.decoded.id

    if(target_uid != uid)
        return response.status(401).json({ error: 'you are not allowed to delete other user' })

    try{
        await User.deleteOne({user_id: uid})
        response.status(200).json({ msg: 'successfully removed user' })
    }catch (error){
        response.status(500).json({ error })
    }
})


module.exports = router;