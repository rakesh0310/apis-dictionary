const jwt = require('jsonwebtoken');
module.exports = (req,res, next) => {
    try{
        const decoded = jwt.verify(req.query.api_key, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message:'Invalid or Expired Key'
        })
    }

 
};