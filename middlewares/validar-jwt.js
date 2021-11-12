const { response } = require('express');
const jwt = require('jsonwebtoken');

const validaJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    // Verificar si el token existe
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    // Verificar el token
    try {
        const { uid, nombre } = jwt.verify(token, process.env.JWT_SECRET_SEED);
        req.uid = uid;
        req.nombre = nombre;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }



    // Todo OK
    next();
};

module.exports = {
    validaJWT
};