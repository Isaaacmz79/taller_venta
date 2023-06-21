//Importar paquetes requeridos de node
const {response}= require('express')
const bcrypt = require('bcrypt');


//Importacion de los modelos 
const Venta =require('../models/venta')

//insercion, modificacion de datos

//consultar
const ventaGet = async(req, res = response)=>{
    const{codigo_venta}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const ventas = await Venta.find()
    res.json({
        ventas
    })
}


const ventaPost = async (req, res = response) => {
    const body = req.body; //Captura de atributos
    let mensaje = '';
  
    try {
      const venta = new Venta(body);
      
      //guardar objeto
      await venta.save();
      mensaje = 'La inserción se realizó exitosamente';

    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error(Object.values(error.errors).map(val => val.message));
        mensaje = Object.values(error.errors).map(val => val.message);
      } else {
        // Manejar otros errores aquí si es necesario
        mensaje = 'Hubo un error en el servidor';
        console.log(error)
      }
    }
  
    res.json({
      msg: mensaje
    });
  };
  

const ventaPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{codigo_venta, nombre, nro_identificacion, tipo_cliente, direccion}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const venta = await Venta.findOneAndUpdate(
            { codigo_venta:codigo_venta},
            { nombre: nombre, nro_identificacion: nro_identificacion, tipo_cliente: tipo_cliente, direccion: direccion, }
          );
          
        mensaje='La modificacion se efectuo correctamente'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificacion'
        console.log(error)
    }

   

    res.json({
        msg: mensaje 
    })

}

const ventaDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const venta = await Venta.deleteOne({_id:_id})
        mensaje='La eliminacion se efectuo correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en  la eliminacion.'

    }

   

    res.json({
        msg: mensaje 
    })

}


module.exports = {
  ventaGet,
  ventaPost,
  ventaPut,
  ventaDelete
};

