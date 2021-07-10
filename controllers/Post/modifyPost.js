const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')
const fs = require("fs"); //

module.exports = {
    modifyPost: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];

        const userId = await jwtUtils.getUserId(HeaderAuth);
        const isAdmin = await jwtUtils.getUserRole(HeaderAuth);
        const idPost = await models.Post.findOne({ where: { id: req.params.id } })

        let newImageUrl;

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }
        }).then(async function () {
            if (userId === idPost.UserId || isAdmin == true) {
                
                await models.Post.findOne({
                    where: { id: req.params.id }
                }).then(async function (post) {
                    if (post) {

                        if (req.file) {
                            newImageUrl = `${req.protocol}://${req.get("host")}/images/${
                              req.file.filename
                            }`;
                            if (post.attachement) {
                                console.log(post.attachement)
                                const filename = post.attachement.split("/images")[1];
                                fs.unlink(`images/${filename}`, (err) => {
                                  if (err) console.log(err);
                                  else {
                                    console.log(`Deleted file: images/${filename}`);
                                  }
                                });
                              }
                            }

                        
                        if (req.body.title) {
                            post.title = req.body.title
                        };
                        if (req.body.content) {
                            post.content = req.body.content
                            console.log(post.content)
                        }
                        if (req.file) {
                            post.attachement = newImageUrl
                            console.log(post.attachement)
                        }
                        const newPost = await post.save({ fields: ['title', 'content', 'attachement'] });
                        return res.status(201).json({
                            post: newPost,
                            message: "update validé"
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