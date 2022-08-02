// import Sequelize from 'sequelize'//podemos usar de ambas manersa
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

//******CREACION DE TABLAS */
//define nos permite definir nuestro modelo en la BDD
//1ro nombre de la tabla - 2do atributos
const Usuario = db.define(
    "usuarios",
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false, //permitir nulo
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
        },
        confirmado: DataTypes.BOOLEAN,
    },
    {
        //usaremos HOOKS los cuales s eejecutan en determinados momentos ya sean antes y despues
        hooks: {
            //antes de insertar
            beforeCreate: async function (usuario) {
                const salt = await bcrypt.genSalt(10); //minimo 10 rondas de hasheo
                usuario.password = await bcrypt.hash(usuario.password, salt);
            },
        },
    }
);

export default Usuario;
