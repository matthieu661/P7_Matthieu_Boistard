const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')


module.exports = {
    modifyPost: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }
        }).then(async function (user) {
            if (user) {
                console.log('hello')
                await models.Post.findOne({
                    where: { id: req.params.id }
                }).then(async function (post) {
                    if (post) {
                        if (req.body.title){
                            post.title = req.body.title
                        };
                        if (req.body.content){
                            post.content = req.body.content
                        }
                        if (req.body.attachement){
                            post.attachement = req.body.attachement
                        }
                        const newPost = await post.save({ fields: ['title','content','attachement']});
                            return res.status(200).json({
                                post: newPost,
                                messageRetour: "update validé"
                            });
                    }
                    else {
                       return res.status(404).json({ 'error': 'Erreur dans la recupération du post' });
                    }
                }).catch(function (err) {
                   return res.status(500).json({ 'error': 'server erreur' })
                });
            } else {
               return res.status(404).json({ 'error': 'Erreur identification' });
            }
        }).catch(function (err) {
           return res.status(500).json({ 'error': 'server erreur' })
        });
    }
}