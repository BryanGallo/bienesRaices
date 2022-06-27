// const express = require('express')//Common JS forma anterior de importar paquetes
import express from "express"; //forma actual EJS pero debemos en package.json colocar type module
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

//Crear la app
const app = express();

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

//Conexion BDD
try {
    await db.authenticate(); //metodo de sequelize para auntenticar
    db.sync()//generar la tabla si no existe
    console.log("conecxion correcta a la base de datos");
} catch (error) {
    console.log(error);
}

//ROUNTING
// app.get('/',usuarioRoutes)//busca rutas exactas a ella para mostrar cuando importamos rutas
// app.use("/",usuarioRoutes)//busca todas las rutas que tenga el router importado
app.use("/auth", usuarioRoutes);

//Habilitar PUG --- set es para agregar configuracion
app.set("view engine", "pug");
app.set("views", "./views"); //le indicamos que carpeta es la de views o vistas

//Carpeta publica contenedor de nuestros archis estaticos(css3,js etc)
app.use(express.static("./public"));

//Definir un puerto para arranca r el proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
