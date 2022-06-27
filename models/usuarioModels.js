// import Sequelize from 'sequelize'//podemos usar de ambas manersa
import {DataTypes} from 'sequelize'
import db from '../config/db.js';

//******CREACION DE TABLAS */
//define nos permite definir nuestro modelo en la BDD
//1ro nombre de la tabla - 2do atributos
const Usuario = db.define('usuarios',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false, //permitir nulo 
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    token:{
        type:DataTypes.STRING,
    },
    confimado:DataTypes.BOOLEAN
})

export default Usuario