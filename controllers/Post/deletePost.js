const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')


module.exports = {
    deletePost: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);
        const isAdmin = await jwtUtils.getUserRole(HeaderAuth);
        const idPost = await models.Post.findOne({ where : { id : req.params.id}})

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }
        }).then(async function () {
            console.log(isAdmin)
            console.log(idPost.UserId)
            console.log(userId)
            if ( userId === idPost.UserId || isAdmin == true) {
                await models.Post.findOne({
                    where: { id: req.params.id }
                }).then(async function (post) {
                    if (post) {
                        await models.Post.destroy({
                             where: { id: post.id } },
                              { truncate: true });
                        return res.status(200).json({ message: "Post supprimé" });
                    }
                    else {
                        return res.status(404).json({ 'error': 'Erreur dans la suppression du post' });
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