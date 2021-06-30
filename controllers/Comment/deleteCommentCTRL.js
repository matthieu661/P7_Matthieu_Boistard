
const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    deleteCom: async function (req, res) {
        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);
        const isAdmin = await jwtUtils.getUserRole(HeaderAuth);
        const idComment = await models.Comment.findOne({ where : { id : req.params.idComment}})

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }
        }).then(async function () {
            //console.log(isAdmin)
            //console.log(idComment.userId)
            //console.log(userId)
            if( userId === idComment.userId || isAdmin == true ){
                await models.Comment.findOne({
                    where : { id :req.params.idComment }
                }).then(async function(coms){
                    if(coms){
                        await models.Comment.destroy({
                            where : { id : coms.id},

                        })
                        
                        return res.status(200).json({ message: "commentaire supprimé" });


                    }else {
                        return res.status(404).json({ 'error': 'Erreur dans la suppression du post' });
                    }
                }).catch(function (err) {
                    return res.status(500).json({ 'error': 'server erreur' })
                });
            }else {
                return res.status(404).json({ 'error': 'Erreur identification' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'server erreur' })
        });
    
    }
};