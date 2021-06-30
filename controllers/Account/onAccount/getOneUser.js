
const models = require('../../../models');
const jwtUtils = require('../../../utils/jwt.utils')


module.exports = {
    getOneUser: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })
        
        await models.User.findOne({
            attributes: ['id', 'email', 'username', 'BIO'],
            where: { id: req.params.id },
            include : [models.Post, models.Comment]
        }).then(function (user) {
            if (user) {
                res.status(200).send(user);
            }
            else {
                res.status(404).json({ 'error': ' utilisateur inconnu' });
            }
        }).catch(function(err) {
            res.status(500).json({'error' : 'server erreur'})
        });
    },
}
