const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected");

  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD");
  }
};

module.exports = {
    dbConnection
};