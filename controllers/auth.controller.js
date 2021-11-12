
const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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
        const token = await generarJWT(userBD._id, userBD.nombre);

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
                usuario: usuarioDB,
                token
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

const loginUsuario = async (req, res) => {

    const { correo, password } = req.body;

    try {
        
        const userDB = await Usuario.findOne({ correo });

        // Verificar si el correo existe
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar token
        const token = await generarJWT(userDB._id, userDB.nombre);

        // Generar respuesta exitosa
        return res.status(200).json({
            ok: true,
            usuario: userDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

const renovarToken =  (req, res) => {
    
    const { uid, nombre } = req; // generado desde el middleware

    return res.json({
        ok: true,
        uid,
        nombre
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};