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

        // cherche dans la table like si userId + postId sont présent
        await models.Like.findOne({
            where: { userId: userId, postId: postId },
        })
            //alors passe le resultat
            .then(async function (find) {
                //si resultat true (ANNULE LE LIKE)
                if (find) {
                    // invoque la methode destroy 
                    await models.Like.destroy(
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
                            post.likes -= 1;
                        }
                        // invoque la methode save dans post
                        const newPost = await post.save({ fields: ['likes'] });
                        return res.status(200).send({ 
                            post : newPost,
                            message: " like reset" });
                    })
                    // returne confirmation du reset
                   


                    // sinon 
                } else {
                    //CAS 2 NON PRESENT DANS LA TABLE DES LIKES
                    // cherche dans la table dislike
                    // invoque la methode finOne dans Dislike
                    await models.Dislike.findOne({
                        // sur la row qui a userId et postId correspondant
                        where: { userId: userId, postId: postId },
                        // alors transmet le resultat du findOne
                    }).then(async function (dislike) {

                        // si vrai (EFFACE LE DISLIKE)
                        if (dislike) {
                            //invoque la methode destroy dans Dislike
                            await models.Dislike.destroy(
                                // sur la row qui a userId et postId correspondant
                                { where: { userId: userId, postId: postId } }
                            ),
                            // invoque la methode findOne dans Post
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
                                    post.dislikes -= 1;
                                    post.likes += 1;
                                }
                                // invoque la methode save pour update le post.likes
                                const newPost =await post.save({ fields: ['likes', 'dislike'] });
                                return res.status(200).json({
                                    post: newPost,
                                    message: "modifié"
                                })

                            }).catch(function (err) {
                                return res.status(500).json({ 'error': 'error dans block code 0' });
                            })
                        } else { // si NON PRESENT DANS DISLIKE
                            // invoque create dans la table Like pour ajouter une row
                            await models.Like.create({
                                userId: userId,
                                postId: postId,
                            })
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
                                    post.likes += 1;
                                }// save le changement
                                const newPost = await post.save({ fields: ['likes'] });
                                return res.status(200).json({
                                    post: newPost,
                                    message: "like ajouté"
                                })
                            })
                        }
                    })
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'error dans block code 1' });
            })
    }
}

















