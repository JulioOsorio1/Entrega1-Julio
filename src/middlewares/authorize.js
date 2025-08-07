
function auth(req, res, next) {
    
    req.user = {
        id: 'user123',
        rol: 'cliente1',
    };
    next();
}


function authorize(allowedRoles = []) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado' });
        }

        next();
    };
}

export default auth; authorize;
