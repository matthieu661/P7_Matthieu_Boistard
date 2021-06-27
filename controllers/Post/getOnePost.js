const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')


module.exports = {
    getOnePost: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }
        }).then(async function (user) {
            if (user) {
                await models.Post.findOne({
                    where: { id: req.params.id },
                    include : {
                        model : models.User,
                        attributes : ['username'] 
                    }
                }).then(function (post) {
                    if (post) {
                        res.status(200).send(post);
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
