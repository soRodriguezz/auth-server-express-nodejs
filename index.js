const express = require("express");
const cors = require("cors");
require("dotenv").config(); // tomar configuracion desde .env
const { dbConnection } = require("./db/config");

// console.log(process.env); // procesos de node

// Crear servidor express
const app = express();

// base de datos
dbConnection();

// Directorio publico
app.use(express.static("public"));

// CORS
app.use(cors()); // permitir rutas

// lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));

// // GET
// app.get('/', (req, res) => {
//     res.status(200).json({ // puedo cambiar el status de la respuesta
//         ok: true,
//         mensaje: 'Petición GET realizada correctamente',
//         uid: 1234
//     });
// });

app.listen(process.env.PORT, () => {
  console.log(`servidor levantado en http://localhost: ${process.env.PORT}`);
});
