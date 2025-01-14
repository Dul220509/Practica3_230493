import express from 'express'
import session from 'express-session'


const app =express();
 app.use(
    session({
        secret:'p3-Dulc3Bee-sessionespersistentes',
        resave:false,
        saveUninitialized:true,
        cookie:{ maxAge: 24*60*60*1000}
    })
 );

 //ruta para inicializar la sesión 
 app.get('/iniciar-sesion',(request,response) => {
    if(!request.session.inicio){
        request.session.inicio = new Date ();
        request.session.ultimoAccseso = new Date();
        response.send('Sesion iniciada');
    }else{
        response.send('La sesion ya esta activa')
    }
 });

 app.get('/actualizar',(request,response) => {
    if(request.session.inicio){
        request.session.ultimoAccseso = new Date();
        response.send('Fecha de ultima consulta actualizada')
    }else{
        response.send('No hay una sesion activa')
    }
 });

 app.get('/estado-sesion', ( request,response)=>{
    if(request.session.inicio){
        constinicio = request.session.inicio;
        const ultimoAccseso = request.session.ultimoAccseso;
        const ahora = new Date ();

        //calcular la aun tiguedad

        const antiguedadMs  = ahora - inicio;
        const horas  = Math.floor(antiguedadMs / ( 1000*60*60));
        const minutos = Math.floor((antiguedadMs % ( 1000*60*60)) / (1000*60));
        const  segundos = Math.floor((antiguedadMs % (1000*60))/ 1000);

        response.json({
            mensaje:'esdado de sesion',
            sesionID: request.sessionID,
            inicio: inicio.toISOString(),
            ultimoAccseso: ultimoAccseso.toISOString(),
            antiguedad: `${horas} horas, ${minutos} minutos, ${segundos} segundos`
        });
    }else{
        response.send('No hay una sesion activa')
    }
 });

 app.get('cerrar-sesion',(request,response) =>{
    if(request.session){
        request.session.destroy((err) => {
            if(err){
                return response.status(500).send('Error al cerrar sesion.');
            }
            response.send('Sesion cerrada corerrectamente');
        });
    }else{
        response.send('No hay una sesion activa para cerrar')
    }
 });

 //iniciar el servidos

 const port = 3000;
 app.listen(port,() => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
 })