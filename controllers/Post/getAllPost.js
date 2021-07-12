const models = require('../../models');

module.exports = {
    getAllPost: async function (req, res) {
        await models.Post.findAll({
            order : [["createdAt", "DESC"]],
            // selection plus fine des elements à afficher ici 
            // attributes : 
        }).then(allPost => res.send(allPost))
        .catch(function (err) {
            return res.status(500).json({ 'error': 'server erreur' })
        });   
    }  
}
