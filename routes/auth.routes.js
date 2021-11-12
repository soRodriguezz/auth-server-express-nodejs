
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');

const router = Router();

// Login del usuario
router.post( '/', [
    check('correo', 'El correo es obligatorio').isEmail(), // validar campos - se pueden concatenar más validaciones
    check('password', 'La contraseña es obligatorio').isLength({ min: 6 })
],loginUsuario );

// Creacion de usuarios
router.post( '/nuevo-usuario', crearUsuario );

// Revalidar token
router.get( '/renovar', renovarToken);

module.exports = router;