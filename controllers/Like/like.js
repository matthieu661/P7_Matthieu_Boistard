const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    like: async function (req, res) {

        //auth
        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);
        //recuperer l'id du message dans l'url
        const postId = req.params.id

        //test Si postId constient bien l'id
        if (postId <= 0) {
            return res.status(400).json({ 'error': ' No postId' })
        }

        await models.Like.findOne({
            where: { userId: userId, postId: postId },
        })
            .then(async function (user) {
                if (user) {
                    /*await models.Like.destroy(
                      { where: { userId: userId, postId: postId } },
                    );*/
                    return res.status(200).send({ messageRetour: "deja liké" });
                } else {
                    await models.dislike.findOne({
                        where: { userId: userId, postId: postId },
                    }).then(async function (dislike) {
                        if (dislike) {
                            await models.Dislike.destroy(
                                { where: { userId: userId, postId: postId } }
                            );
                            await models.Post.findOne({
                                where: {
                                    id: postId
                                },
                            }).then(async function (post) {
                                if (post) {
                                    post.likes += 1;
                                }
                                await post.save({ fields: ['likes'] });
                            })
                        }
                    })
                    await models.Like.create({
                        userId: userId,
                        postId: postId,
                    })
                    await models.Post.findOne({
                        where: {
                            id: postId
                        },
                    }).then(async function (post) {
                        if (post) {
                            post.likes += 1;
                        }
                        const newPost = await post.save({ fields: ['likes'] });
                        return res.status(200).json({
                            post: newPost,
                            message: "like ajouté"
                        })

                    })

                    res.status(201).json({ messageRetour: "vous aimez ce post" });
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'error dans block code 1' });
            })



    }
}

















