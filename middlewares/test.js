const jwtUtils = require('../utils/jwt.utils');

module.exports = {
    controlToken :  async function (req, res){
        const HeaderAuth =  await req.headers['authorization'];
        const userId =  await jwtUtils.getUserId(HeaderAuth);
        
        
        if (userId < 0){
            return res.status(400).json({ 'error': 'invalide Token' })
        }
        
    } 
}   