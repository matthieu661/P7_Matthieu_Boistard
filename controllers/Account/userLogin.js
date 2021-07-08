const bcrypt = require('bcrypt');
const jwtUtils = require('../../utils/jwt.utils')
const models = require('../../models');

module.exports = {
    login: function (req, res) {
        const email = req.body.email;
        const mdp = req.body.mdp;

        models.User.findOne({
            where: { email: email }
        })
            .then(function (user) {
                if(user) {
                    bcrypt.compare(mdp, user.mdp, function(notequal, equal) {
                        if(equal){
                            return res.status(200).json({ 
                                'userName' : user.username,
                                'isAdmin': user.isAdmin,
                                'userId' : user.id,
                                'token' : jwtUtils.generateToken(user)
                            });
                        }else{return res.status(800).json({ 'error' : 'mdp invalide'})}
                    });
                } else {
                    return res.status(401).json({ 'error': 'utilisateur inexistant' })
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'probleme dans le bloc complet' })
            })
    },
};