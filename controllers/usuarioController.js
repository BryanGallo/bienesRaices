import Usuario from "../models/usuarioModels.js";

//Controlladores
const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina:'Ingresar'
    }); //ya se posiciona en views porque nosotros le indicamos en nuestro set
};
const logger = (req, res) => {
    console.log(req.body);
};

const formularioRegistro=(req, res)=>{
    res.render("auth/registro", {
        pagina:'Crear Cuenta'
    });
}
const registrar= async(req, res)=>{
    // console.log(req.body);//siempre res.body lee la informacion que se ingresa a un formulario
    const usuario = await Usuario.create(req.body);
    //cada una de las instancias que vayamos creando va a retornarnos un objeto
    res.json(usuario)
}

const olvideContrasenia=(req, res)=>{
    res.render("auth/olvide-password", {
        pagina:'Recuperar tu acceso '
    });
}
const recuperar=(req, res)=>{
    console.log(req.body);
}

export {
    formularioLogin,
    formularioRegistro,
    olvideContrasenia,
    logger,
    registrar,
    recuperar
}