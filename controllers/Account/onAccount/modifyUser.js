const models = require('../../../models');
const jwtUtils = require('../../../utils/jwt.utils')


module.exports = {
    modifyUser: async function (req, res) {
        const HeaderAuth =  req.headers['authorization'];
        const userId =  jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId },

        })
            .then(async function (user) {
                if (user) {
                    let user = await models.User.findOne({ where: { id: userId } });
                    if (req.body.BIO) {
                        user.BIO = req.body.BIO
                    }
                    if (req.body.username) {
                        user.username = req.body.username
                    }
                    const newUser = await user.save({ fields: ["username", "BIO"] }); // on sauvegarde les changements dans la bdd
                    return res.status(200).json({
                        user: newUser,
                        messageRetour: "update validé",
                    });
                }else{
                    res.status(404).json({ 'error': 'probleme dans block code 1' }); 
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'error dans block code 2' });
            })
    },
}
