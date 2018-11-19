const jwtoken = {};

jwtoken.ensureToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        const split = bearerToken.split(" ");
        req.token = split[1];
        next();
    } else {
        res.status(403).json({
            err: 'Por favor, autentifíquese para poder acceder a este recurso'
        });
    }
}

module.exports = jwtoken;