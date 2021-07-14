const reg = require('./regex')

module.exports = {
    validationRegister: function (req, res, next) {
        const email = req.body.email;
        const username = req.body.username;
        const mdp = req.body.mdp;
        const BIO = req.body.BIO
        if (email == null || username == null || mdp == null) {
            return res.status(400).json({ 'error': 'missing params' })
        }
        // validation des données :
        // Email valide : (emailregex.com)
        if (!reg.regEmail.test(email)) {
            return res.status(400).json({ 'error': 'Veuillez renseigner un email valide' })
        }
        // Username length : (min = joe)(max = grandMaster666) 
        if (username.length <= 3 || username.length >= 15) {
            return res.status(400).json({ 'error': 'Votre pseudo doit avoir entre 3 et 15 caractéres' })
        }
        // mdp complexité : [min 8 caractéres / min : 1 miniscule / min : 1 majuscule / min : 1 number / min : 1 caractére spé (!@#$%^&*)]
        if (!reg.regMdp.test(mdp)){
            return res.status(400).json({ 'error': 'password non valide [min 8 caractéres / min : 1 miniscule / min : 1 majuscule / min : 1 number / min : 1 caractére spé (!@#$%^&*)]' })
        }
        // bio 5 NON OBLIGATOIRE mais si remplis Min(1)-max(254)
        if (BIO.length >= 254 ) {
            return res.status(400).json({ 'error': 'Veuillez vous decrire avec un text de minimum 10 caractére et maximum 254' })
        }
        next();
    },
    validationLogin: function (req, res, next) {
        const email = req.body.email;
        const mdp = req.body.mdp;
        
        // validation des données :
        // Email valide : (emailregex.com)
        if (!reg.regEmail.test(email)) {
            return res.status(400).json({ 'error': 'Veuillez renseigner un email valide' })
        }
        // mdp complexité : [min 8 caractéres / min : 1 miniscule / min : 1 majuscule / min : 1 number / min : 1 caractére spé (!@#$%^&*)]
        if (!reg.regMdp.test(mdp)){
            return res.status(400).json({ 'error': 'password non valide [min 8 caractéres / min : 1 miniscule / min : 1 majuscule / min : 1 number / min : 1 caractére spé (!@#$%^&*)]' })
        }
        next();
    }

}