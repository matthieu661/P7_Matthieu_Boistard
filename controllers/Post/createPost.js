const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')

module.exports = {
    createPost: async function (req, res) {

        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);


        const title = req.body.title; // no null
        const content = req.body.content; // no null
        const atachement = req.body.atachement; 

        // validation donée 
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'remplir le titre et la description' });
        }
        if (title.lenght < 2 || title.lenght > 30 || content.length < 2) {
            return res.status(400).json({ 'error': ' title:[2min-30max] / content:[2min]' })
        }

        await models.User.findOne({
            where: { id: userId }
        }).then(async function(user){
            if(user){
                let user = await models.User.findOne({ where: {id : userId} })
                let newPost = await models.Post.create({
                    
                   title : title,
                   userName : user.username,
                   content : content,
                   atachement : atachement,
                   like : 0,
                   UserId : user.id,

                   
                   
                }) ;
                return res.status(201).json({ newPost : newPost }) 

            }else{
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'error dans block code 2' });
        });
    }
};
