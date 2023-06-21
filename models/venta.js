//Migracion 
const {Schema, model}=require('mongoose')

const VentaSchema= Schema({
    //se define tipos de datos
    codigo_venta:{
        unique:[true, 'El codigo de venta: {VALUE} ya existe'],
        type: String,
        required: [true,'El código de venta es requerido']
    },
    codigo_pedido:{
        type: String,
        required:[true, 'El código del pedido es requerido']
    },
    nombre:{
        type: String,
        required: [true,'El campo nombre del cliente es requerido']
    },
    nro_identificacion:{
        type: String,
        required: [true,'El número de identificación es requerido']
    },
    tipo_cliente:{
        type: String,
        required:[true, 'El campo tipo de cliente es obligatorio'],
        enum: ['Persona natural', 'Persona juridica', 'Empresa'],
        default: 'Persona natural'
    },
    direccion:{
        type: String,
        required:[true, 'La dirección es requerida'],
    },
    fecha_entrega:{
        type:Date,
        required:[true, 'La fecha de entrega es necesaria']
    },
    metodo_pago:{
        type: String,
        default: 'Efectivo',
        enum:['Efectivo']
    }

    
})
//este es el nombre del objeto Usuario
module.exports = model('Venta', VentaSchema)//Exportar el modelo

