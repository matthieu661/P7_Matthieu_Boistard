const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils')


module.exports = {
    createPost: async function (req, res) {

        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);
        let imageUrl;

        const POST = req.body; // no null
        console.log(POST)

        // validation donée 
        if (POST.title == null || POST.content == null) {
            return res.status(400).json({ 'error': 'remplir le titre et la description' });
        }
        if (POST.title.lenght < 2 || POST.title.lenght > 30 || POST.content.length < 2) {
            return res.status(400).json({ 'error': ' title:[2min-30max] / content:[2min]' })
        }
        // pour les images :


        await models.User.findOne({
            where: { id: userId }

        }).then(async function (user) {

            if (user) {
                console.log("helloooooooooo")
                if (req.file) {
                    
                    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                
                } else {
                    imageUrl = null;
                }
                console.log(imageUrl)

                let user = await models.User.findOne({ where: { id: userId } })
                let newPost = await models.Post.create({

                    title: POST.title,
                    userName: user.username,
                    content: POST.content,
                    attachement: imageUrl,
                    like: 0,
                    UserId: user.id,



                });
                
                return res.status(201).json({ newPost: newPost })

            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'error dans block code 2' });
        });
    }
};
