const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    modifyCom: async function (req, res) {
        const HeaderAuth = await req.headers['authorization'];

        const userId = await jwtUtils.getUserId(HeaderAuth);
        const isAdmin = await jwtUtils.getUserRole(HeaderAuth);
        const idComment = await models.Comment.findOne({ where : { id : req.params.idComment}})
        //recuperer l'id du message dans l'url
        const postid = req.params.id

        //body transverse
        //test Si postId constient bien l'id
        
        await models.User.findOne({
            where: { id: userId }
        }).then(async function(){
            //console.log(isAdmin)
            //console.log(idComment.userId)
            //console.log(userId)
            if( userId === idComment.userId || isAdmin == true ){ 
                await models.Comment.findOne({
                   where : { id : req.params.idComment} 
                }).then(async function(comment){
                    if(comment){
                        comment.postReply = req.body.postReply
                        const newComment = await comment.save({ fields : ['postReply']});
                        return res.status(201).json({
                            comment: newComment,
                            message: "update validé"
                        });
                    }else {
                       return res.status(404).json({ 'error': 'Erreur dans la recupération du comment' });
                    }
                }).catch(function (err) {
                   return res.status(500).json({ 'error': 'server erreur 2' })
                });
            }else {
               return res.status(404).json({ 'error': 'Erreur identification' });
            }        
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'server erreur 1' })
         });
        
    }
};