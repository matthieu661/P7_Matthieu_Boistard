const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    createCom: async function (req, res) {
        //auth
        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);
        //recuperer l'id du message dans l'url
        const postid = req.params.id
        //test Si postId constient bien l'id
        if (postid <= 0) {
            return res.status(400).json({ 'error': ' No postId' })
        }
        await models.User.findOne({
            where: { id: userId }
        }).then(async function (user) {
            if (user) {
                let newComment = await models.Comment.create({ // Attention au await!
                    postId : parseInt(req.params.idPost),
                    userId : userId,
                    userName : user.username,
                    postReply: req.body.comment
                 }) 
                 
                 return res.status(201).json({ newComment, message : "succes" })
            }else{
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'error dans block code 0' });
        });
    }
};
