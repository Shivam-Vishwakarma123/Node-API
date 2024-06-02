const jwt = require('jsonwebtoken');

// Middleware for authenticating Bearer token

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.json({ message: 'Please select the request header' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.json({ message: 'Brearer token not matched' });;
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken: authenticateToken
}