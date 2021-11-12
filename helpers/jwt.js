const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre ) => {
    let payload = { uid, nombre }

    return new Promise( ( resolve, reject ) => {
        jwt.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: process.env.JWT_CADUCIDAD
        }, (err, token) => {
            if ( err ) {
                reject('Error generando el token');
            } else {
                resolve(token);
            }
        });
    })

};

module.exports = {
    generarJWT
};