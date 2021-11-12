
const { response } = require('express');

const crearUsuario =  ( req, res = response ) => {

    const { correo, nombre, password } = req.body; // recibimos datos por body de la peticion
   
    return res.json({
        ok: true,
        msg: 'Usuario creado'
    });

};

const loginUsuario = (req, res) => {

    const { correo, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login de usuario'
    });

};

const renovarToken =  (req, res) => {
    
    return res.json({
        ok: true,
        msg: 'Renew'
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};