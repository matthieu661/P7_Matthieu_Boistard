const bcrypt = require('bcrypt');
const jwtUtils = require('../../utils/jwt.utils')
const models = require('../../models');

module.exports = {
    register: function (req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const mdp = req.body.mdp;
        const BIO = req.body.BIO

        if (email == null || username == null || mdp == null) {
            return res.status(400).json({ 'error': 'missing params' })
        }
        // rajouter la validation 

        // import DB 
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function (NoDouble) {
            if (!NoDouble) {
                bcrypt.hash(mdp, 10, function (err, hashMdp) {
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        mdp: hashMdp,
                        BIO: BIO,
                        isAdmin: 0

                    }).then(function (User) {
                        return res.status(201).json({ User })
                    }).catch(function (err) {
                        return res.status(500).json({ 'error': 'code error' })
                    })
                })
            } else {
                return res.status(401).json({ 'error': 'utilisateur existant' })
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'code error 1' })
        })
    },
};




