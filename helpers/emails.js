import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // console.log(datos);
    const {correo,nombre,token}=datos;

    await transport.sendMail({
        from: 'Bienes Raices',
        to:correo,
        subject:'Confirma tu cuenta en bienes raices',
        text:`Confirma tu cuenta`,
        html:`
            <p>Hola ${nombre}, verifica tu cuenta en Bienes Raices</p>
            <p>Tu cuentas esta lista solo debes confirmar en el siguiente enlace</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu Cuenta </a>

            <p>Si no creaste esta cuenta, ignora este mensaje</p>
            `
    })
};

export { emailRegistro };
