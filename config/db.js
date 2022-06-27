import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();
//
//recibe 4 paramatros, nombreBDD-usuario-password-objetodeConfiguracion
// ?? Usamos el operador Nullish que lee ese valor o en este caso vacio
const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASS ?? "",
    {
        host: process.env.BD_HOST,
        port: process.env.BD_PORT,
        dialect: process.env.BD_DIALECT, //tipo de lenguaje que va a leer
        define: {
            //genera horas de registro de creacion y de actualizacion
            timestamps: process.env.BD_TIMESTAMPS,
        },
        pool: {
            //conexion de sequelize que configura el comportamiento para conexiones nuevas o existentes
            max: 5, //maximo de conexiones a mantener por usuario
            min: 0,
            acquire: process.env.BD_ACQUIRE, //tiempo que tomara intentando conectarse hasta generar un error
            idle: process.env.BD_IDLE , //si no registra visitas en 10s finaliza la conexion
        },
        operatorsAliases: process.env.BD_OPERATORSALIASES,
    }
);

export default db;
