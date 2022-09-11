module.exports = mongoose => {
    const DatosPersonalesModel = mongoose.model(
      "datospersonales", // database nombre
      mongoose.Schema(
        {
          nombres: String,
          apellidos: String,
          trabaja: Boolean
        },
        { timestamps: true }
      )
    );
    return DatosPersonalesModel;
  };