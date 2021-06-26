const models = require('../../../models');

module.exports = {
     getAllUser: async function (req, res) {
        await models.User.findAll({
            // selection plus fine des elements à afficher ici 
        }).then(allUsers => res.send(allUsers))
    }
}

