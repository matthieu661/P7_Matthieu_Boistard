const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    getAllPost: async function (req, res) {
        await models.Post.findAll({
            order : [["createdAt", "DESC"]],
            include : {
                model : models.User,
                attributes : ['username'] 
            }
            // selection plus fine des elements à afficher ici 
            // attributes : 
        }).then(allPost => res.send(allPost))     
    }  
}
