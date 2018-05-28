const firebase = require('../config/firebase');

module.exports = (req, res, next) => {
    // If no token present send error
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'No token present'
        });
    }
    const token = req.headers.authorization.split(" ")[1];
    firebase.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            req.uid= decodedToken.uid;
            next();
        }).catch(function(error) {
        // Handle error if token cannot be verified
        return res.status(401).json({
            message: 'Invalid token'
        });
    });


};