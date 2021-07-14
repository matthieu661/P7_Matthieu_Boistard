const bcrypt = require('bcrypt');
const models = require('../../models');

module.exports = {
    register: function (req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const mdp = req.body.mdp;
        const BIO = req.body.BIO
        // import DB 
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(async function (noDoubleEmail) {
                if (!noDoubleEmail) {
                    await models.User.findOne({
                        attributes: ['username'],
                        where: { username: username }
                    })
                        .then(async function (noDoubleUsername) {
                            if (!noDoubleUsername) {
                                await bcrypt.hash(mdp, 10, function (err, hashMdp) {
                                    models.User.create({
                                        email: email,
                                        username: username,
                                        mdp: hashMdp,
                                        BIO: BIO,
                                        isAdmin: 0
                                    })
                                        .then(function (User) {
                                            return res.status(201).json({ User })
                                        })
                                        .catch(function (err) {
                                            return res.status(500).json({ 'error': 'code error' })
                                        })
                                })
                            } else {
                                return res.status(401).json({ 'error': 'username existant' })
                            }
                        }).catch(function (err) {
                            return res.status(500).json({ 'error': 'code error 1' })
                        })
                } else {
                    return res.status(401).json({ 'error': 'Email existant' })
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'code error 1' })
            })
    },
};




