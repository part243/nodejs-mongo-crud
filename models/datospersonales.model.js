module.exports = mongoose => {
    const DatosPersonalesModel = mongoose.model(
      "datospersonales", // nombre de la base de datos
      mongoose.Schema(
        { //atributos
          nombres: String,
          apellidos: String,
          trabaja: Boolean
        },
        { timestamps: true }
      )
    );
    return DatosPersonalesModel;
  };