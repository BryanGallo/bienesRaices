//check:revisa un campo en especifico
//validationResult: guarda el resultado de la validacion
import { check, validationResult } from "express-validator";

import Usuario from "../models/usuarioModels.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";

//Controlladores
const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Ingresar",
    }); //ya se posiciona en views porque nosotros le indicamos en nuestro set
};
const logger = (req, res) => {
    console.log(req.body);
};

const formularioRegistro = (req, res) => {
    //te registra en automatico la funcion de csrfToken() porque ya le declramos global en el index y es exclusiva 
    console.log(req.csrfToken());
    res.render("auth/registro", {
        pagina: "Crear Cuenta",
        csrfToken:req.csrfToken(),
    });
};
const registrar = async (req, res) => {
    // console.log(req.body);//siempre res.body lee la informacion que se ingresa a un formulario

    //extraemos los datos a traves de destructuracion
    const { nombre, correo, password,csrfToken} = req.body;

    //validar
    await check("nombre")
        .notEmpty()
        .withMessage("EL nombre no puede ir vacio")
        .run(req);
    await check("correo")
        .isEmail()
        .withMessage("Eso no parece un email")
        .run(req);
    await check("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .run(req);
    await check("repetir_password")
        .equals(password)
        .withMessage("Los password no son iguales")
        .run(req);

    //esto se hace para obtener un arreglo con los errores, iterar y amostar al usuario
    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            errores: resultado.array(),
            usuario: {
                nombre: nombre,
                email: correo,
            },
            csrfToken:req.csrfToken(),
        });
        //cada una de las instancias que vayamos creando va a retornarnos un objeto
    }

    //verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { correo } });
    if (existeUsuario) {
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            errores: [{ msg: "El usuario ya esta registrado" }],
            usuario: {
                nombre: nombre,
                email: correo,
            },
            csrfToken:req.csrfToken(),
        });
    }
    // return console.log(existeUsuario);

    //Crear usuario
    // const usuario = await Usuario.create(req.body);
    // res.json(usuario)
    //como ya destructuramos lo hacemos de la siguiente manera
    const usuario = await Usuario.create({
        nombre,
        correo,
        password,
        token: generarId(),
    });

    //enviar email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        correo: usuario.correo,
        token: usuario.token,
    });

    //mostrando mensaje de confirmacion
    res.render("templates/mensaje", {
        pagina: "Cuenta Creada Correctamente",
        mensaje: "Hemos enviado un email de confirmacion, presiona el enlace",
        csrfToken:req.csrfToken(),
    });
};

//funcion para comprobar una cuenta

const confirmar = async(req, res) => {
    // console.log('comprobando');
    //params cuando envias parametros a traves de la URL
    const {token}= req.params

    //Verificar el token
    const usuario = await Usuario.findOne({where:{token}})
    // console.log(usuario);
    if (!usuario) {
        return res.render('auth/confirmar-cuenta',{
            pagina: "Error al confirmar tu cuenta",
            mensaje: "Hubo un error al confirmar tu cuenta intenta denuevo",
            error:true
        })
    }
    //Confirmando cuenta
    //eliminamos el token y confirmamos el mismo pero por el momento esta en memoria temporal
    usuario.token=null;
    usuario.confirmado=true;
    console.log(usuario);
    //si queremos almacenarlos en Base con save() qeu es un metodo del orm
    await usuario.save();
    return res.render('auth/confirmar-cuenta',{
        pagina: "Tu cuenta se confirmo con exito",
        mensaje: "Felicidades ya puedes acceder",
        error:false
    })

};

const olvideContrasenia = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recuperar tu acceso ",
    });
};
const recuperar = (req, res) => {
    console.log(req.body);
};

export {
    formularioLogin,
    formularioRegistro,
    olvideContrasenia,
    logger,
    registrar,
    recuperar,
    confirmar,
};
