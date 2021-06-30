const models = require('../../../models');
const jwtUtils = require('../../../utils/jwt.utils')


module.exports = {
    deleteUser: async function (req, res) {
        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId },
        })
            .then(async function (user) {
                // faire une fonction séparée pour le mode admin
                if (userId === user.id) {
                    //console.log(user.id)
                    //console.log(userId)
                    await models.User.destroy({
                        where: {
                            id: userId
                        },
                    }).then(() => res.send("Bonne continuation Amigos"));

                } else {
                    res.status(404).json({ 'error': 'userId error' });
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'error dans block code 2' });
            })
    },
}