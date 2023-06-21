const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{ventaGet, ventaPost, ventaPut, ventaDelete}=require('../controllers/venta')
route.get('/', ventaGet)
route.post('/',ventaPost )
route.put('/',ventaPut )
route.delete('/',ventaDelete )



module.exports = route


