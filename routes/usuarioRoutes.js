import express from "express";

const router = express.Router();

//Controlladores
import {
    formularioLogin,
    formularioRegistro,
    olvideContrasenia,
    logger,
    registrar,
    recuperar
} from "../controllers/usuarioController.js";
//Routing
//cuando alguien visite la diagonal va hacer lo siguiente, req: lo que envias al servidor , res:lo que responde el servidor
// router.get("/",  (req, res)=> {
//     res.send("Hola mundo en express"); //muestra informacion de texto plano
// });
router.get("/login", formularioLogin);
router.post("/login", logger);

router.get("/registro", formularioRegistro);
//cuando usamos formularios
router.post("/registro", registrar);

router.get("/olvide-password", olvideContrasenia);
router.post("/olvide-password", recuperar);

// router.get("/json", (req, res) =>{
//     res.json({ nombre: "Bryan desde get" }); //devolvemos un json
// });
// router.post("/json", (req, res)=> {
//     res.json({ nombre: "Bryan desde post" });
// });
//ya que las 2 anteriores apuntan a la misma ruta pero son solicitudes diferentes podemos hacer lo siguiente
// router
//     .route("/json")
//     .get(function (req, res) {
//         res.json({ nombre: "Bryan desde get" }); //devolvemos un json
//     })
//     .post(function (req, res) {
//         res.json({ nombre: "Bryan desde post" });
//     })

// router.get("/contacto", function (req, res) {
//     res.send("Mi numero es 0995607826 ");
// });

export default router;
