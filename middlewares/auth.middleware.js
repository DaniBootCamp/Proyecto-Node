//importamos jwt
const jwt = require("jsonwebtoken")
const isAuth = (req, res, next) => {
    //Autorización de la peticion
    const authorization = req.headers.authorization;
    //Si esta autorizado hay bearer token, si no, error
    if(!authorization){
        return res.json({
            status: 401,
            message: 'Error de autenticación',
            data: null
        })
    }
    //se separa Bearer del token
    const splits = authorization.split(" ")
    if( splits.length!=2 || splits[0]!="Bearer"){
        return res.json({
            status: 400,
            message: HTTPSTATUSCODE[400],
            data: null
        })
    }
    const jwtString = splits[1];
    try{
        //verificamos el token y si es ok lo guardamos en una variable
        var token = jwt.verify(jwtString, req.app.get("secretKey"));
        
        //console.log("token tras verify",token)  
    } catch(err){
        return next(err)
    }
    //creamos una variable con la informacion que queremos meter en la 
    //peticion
    const authority = {
        id   : token.id,
        name: token.name
    }
    //Se la asignamos al request de la peticion
    req.authority = authority
    //si todo ha ido bien pasamos el middleware
		next()
}
//exportamos la funcion isAuth
module.exports = {
    isAuth,
}