const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    getAllPost: async function (req, res) {
        await models.Post.findAll({
            include : {
                model : models.User,
                attributes : ['username'] 
            }
            
            // selection plus fine des elements à afficher ici 
        }).then(allPost => res.send(allPost))
    }
}
