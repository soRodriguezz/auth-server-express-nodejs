const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  // se importa el response para obtener tipado
  const errors = validationResult(req); //comprobar errores del check

  !errors.isEmpty()
    ? res.status(400).json({
        ok: false,
        errors: errors.mapped(),
      })
    : next();
};

module.exports = {
  validarCampos,
};
