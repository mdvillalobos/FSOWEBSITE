const jwt = require('jsonwebtoken');

const authorizationMiddleware = (userRole) => {
    return (req, res, next) => {
        const { loginToken } = req.cookies;
        if(loginToken) {
            const decodeToken = jwt.verify(loginToken, process.env.JWT_SECRET);
            if(decodeToken.role != userRole) {
                return res.status(403).json({message: "You don't have any permission to access this action!"})
            }
            return next();
        }

        return res.json({
            error: "You are not allowed to access this site."
        })
        
    }
}

module.exports = { authorizationMiddleware }