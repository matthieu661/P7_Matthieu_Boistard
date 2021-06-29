const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')


module.exports = {
    getOnePost: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);
        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.Post.findOne({
            attributes: ['id', 'title', 'content', 'likes', 'dislikes'],
            where: { id: req.params.id },
        }).then(async function (post) {

            await models.User.findOne({
                attributes : ['username'],
                where: { id: userId }
            }).then(async function (user) {
                await models.Comment.findAll({
                    attributes : ['postReply', 'username'],
                    where : { postId : req.params.id}, 
                })
                .then(function (comment){
                    const One = { post, user, comment}
                res.status(200).json(One)
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'server erreur sur COMMENT' })
                });
            }).catch(function (err) {
                res.status(500).json({ 'error': 'server erreur sur USER' })
            });
        }).catch(function (err) {
            res.status(500).json({ 'error': 'server erreur sur POST' })
        });


    }
}
