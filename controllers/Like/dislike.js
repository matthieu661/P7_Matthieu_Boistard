const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    dislike: async function (req, res) {
        //auth
        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);
        //recuperer l'id du message dans l'url
        const postId = req.params.id
        //test Si postId constient bien l'id
        if (postId <= 0) {
            return res.status(400).json({ 'error': ' No postId' })
        }
        // reverse LIKE
        // cherche dans la table like si userId + postId sont présent
        await models.Dislike.findOne({
            where: { userId: userId, postId: postId },
        })
            //alors passe le resultat
            .then(async function (find) {
                //si resultat true (ANNULE LE LIKE)
                if (find) {
                    // invoque la methode destroy 
                    await models.Dislike.destroy(
                        // sur le resultat de la table like
                        { where: { userId: userId, postId: postId } },
                    );
                    // invoque le methode findOne dans Post
                    await models.Post.findOne(
                        // sur le post qui a l'id transmis dans les params
                        {
                            where: { id: postId }
                        },
                        // alors transmet le resultat
                    ).then(async function (post) {
                        // si vrai
                        if (post) {
                            // "de"crémente
                            post.dislikes -= 1;
                        }
                        // invoque la methode save dans post
                        const newPost = await post.save({ fields: ['dislikes'] });
                        return res.status(200).send({
                            post: newPost,
                            message: " dislike reset"
                        });
                    })
                    // returne confirmation du reset
                    // sinon 
                } else {
                    //CAS 2 NON PRESENT DANS LA TABLE DES LIKES
                    // cherche dans la table dislike
                    // invoque la methode finOne dans Dislike
                    await models.Like.findOne({
                        // sur la row qui a userId et postId correspondant
                        where: { userId: userId, postId: postId },
                        // alors transmet le resultat du findOne
                    }).then(async function (like) {

                        // si vrai (EFFACE LE DISLIKE)
                        if (like) {
                            //invoque la methode destroy dans Dislike
                            await models.Like.destroy(
                                // sur la row qui a userId et postId correspondant
                                { where: { userId: userId, postId: postId } }
                            ),
                                // invoque la methode findOne dans Post    BLOCK ICI
                                await models.Post.findOne({
                                    // sur la row qui a postId correspondant
                                    where: {
                                        id: postId
                                    },
                                    //alors transmet le resultat
                                }).then(async function (post) {
                                    //si vrai
                                    if (post) {
                                        // incremente la valeur de likes
                                        post.likes -= 1;
                                        post.dislikes += 1;
                                    }
                                    // invoque la methode save pour update le post.likes
                                    const newPost = await post.save({ fields: ['likes', 'dislikes'] });
                                    return res.status(200).json({
                                        post: newPost,
                                        message: "modifié"
                                    })
                                }).catch(function (err) {
                                    return res.status(500).json({ 'error': 'error dans block code 0' });
                                })
                        } else { // si NON PRESENT DANS DISLIKE
                            // invoque create dans la table Like pour ajouter une row
                            // invoque FindOne dans POST
                            await models.Post.findOne({
                                where: {
                                    // trouve le Post avec l'id passer dans les params
                                    id: postId
                                }
                                //alor passe le resultat de la recherche
                            }).then(async function (post) {
                                // si vrai 
                                if (post) {
                                    // incremente
                                    post.dislikes += 1;
                                }// save le changement
                                const newPost = await post.save({ fields: ['dislikes'] });
                                return res.status(200).json({
                                    post: newPost,
                                    message: "dislike ajouté"
                                })
                            })
                        }
                    })
                    await models.Dislike.create({
                        userId: userId,
                        postId: postId,
                    })
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'error dans block code 1' });
            })
    }
}

















