//es una manera de generar tokens sin instalar una dependencia extra
const generarId=()=> Math.random.toString(32).substring(2)+ Date.now().toString(32);

export{
    generarId
}