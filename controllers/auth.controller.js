
const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

const crearUsuario =  async ( req, res = response ) => {

    const { correo, nombre, password } = req.body; // recibimos datos por body de la peticion

    try {
        // Verificar correo
        let usuario = await Usuario.findOne({ correo });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        // Crear usuario con el modelo
        const userBD = new Usuario( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        userBD.password = bcrypt.hashSync(password, salt);
        
        // Generar el JWT
     

        // Crear usuario de BD
        await userBD.save( (err, usuarioDB) => {
                
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            // Generar respuesta exitosa
            return res.status(201).json({
                ok: true,
                usuario: usuarioDB
            });
    
        });

        
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
 
   

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