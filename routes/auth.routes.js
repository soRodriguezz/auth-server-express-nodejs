
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');

const router = Router();

// Login del usuario
router.post( '/', [
    check('correo', 'El correo es obligatorio').isEmail(), // validar campos - se pueden concatenar más validaciones
    check('password', 'El largo de la contraseña es 6').isLength({ min: 6 })
],loginUsuario );

// Creacion de usuarios
router.post( '/nuevo-usuario', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // validar que nombre es obligatorio
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio con largo de al mennos 6 caracteres').not().isEmpty().isLength({ min: 6 })
],crearUsuario );

// Revalidar token
router.get( '/renovar', renovarToken);

module.exports = router;