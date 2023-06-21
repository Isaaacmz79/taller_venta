const url = 'http://localhost:8091/api/venta'
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaVentas = data.ventas //Capturar el array devuelto por la api
        datos = 
        listaVentas.map(function(venta) {//Recorrer el array
            respuesta += `<tr><td>${venta.codigo_venta}</td>`+ 
            `<td>${venta.codigo_pedido}</td>`+
            `<td>${venta.nombre}</td>`+
            `<td>${venta.nro_identificacion}</td>`+
            `<td>${venta.tipo_cliente}</td>`+
            `<td>${venta.direccion}</td>`+
            `<td>${venta.fecha_entrega}</td>`+
            `<td>${venta.metodo_pago}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(venta)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red"  onclick='eliminar(${JSON.stringify(venta)})'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })

}


const registrar = async () => {
    let _codigo_venta = document.getElementById('codigo_venta').value;
    let _codigo_pedido = document.getElementById('codigo_pedido').value;
    let _nombre = document.getElementById('nombre').value;
    let _nro_identificacion = document.getElementById('nro_identificacion').value;
    let _tipo_cliente = document.getElementById('tipo_cliente').value;
    let _direccion = document.getElementById('direccion').value;
    let _fecha_entrega = document.getElementById('fecha_entrega').value;
    let _metodo_pago = document.getElementById('metodo_pago').value;
  
    const expresionNombre = /^[A-Za-z\s]+$/;
    const expresionNroIdentificacion = /^\d{1,10}$/;
    //const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const errores = [];

    if (_codigo_venta.trim() === '') {
      errores.push('El código de venta no puede estar vacío');
    }
  
    if (_codigo_pedido.trim() === '') {
      errores.push('El código de pedido no puede estar vacío');
    }
  
    if (!expresionNombre.test(_nombre)) {
      errores.push('El nombre solo debe contener letras');
    }
  
    if (!expresionNroIdentificacion.test(_nro_identificacion)) {
      errores.push('El número de identificación debe contener como máximo 10 dígitos');
    }
  
    if (_direccion.trim() === '') {
      errores.push('La dirección no puede estar vacía');
    }
  
    if (_fecha_entrega.trim() === '') {
      errores.push('La fecha de entrega no puede estar vacía');
    }
  
    if (errores.length > 0) {
      const erroresHTML = errores.map(error => `<li style="color: red;">${error}</li>`).join('');
      document.getElementById('error').innerHTML = erroresHTML;
      return;
    }
  
    let venta = {
      nro_identificacion: _nro_identificacion,
      nombre: _nombre,
      codigo_venta: _codigo_venta,
      codigo_pedido: _codigo_pedido,
      tipo_cliente: _tipo_cliente,
      direccion: _direccion,
      fecha_entrega: _fecha_entrega,
      _metodo_pago: _metodo_pago

    };
  
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(venta),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        if (json.msg) {
          Swal.fire(
            json.msg,
            '',
            'success'
          );
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire(
          'Se presentaron problemas en el registro',
          '',
          'error'
        );
      });
  };
  

const editar= (venta)=>{
    document.getElementById('codigo_venta').value = ''
    document.getElementById('codigo_pedido').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('nro_identificacion').value = ''
    document.getElementById('tipo_cliente').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('fecha_entrega').value = ''


    document.getElementById('codigo_venta').value = venta.codigo_venta
    document.getElementById('codigo_pedido').value = venta.codigo_pedido
    document.getElementById('nombre').value = venta.nombre 
    document.getElementById('nro_identificacion').value = venta.nro_identificacion
    document.getElementById('tipo_cliente').value = venta.tipo_cliente
    document.getElementById('direccion').value = venta.direccion
    document.getElementById('fecha_entrega').value = venta.fecha_entrega
  }


const eliminar= (id)=>{
    if(confirm('¿esta seguro que desea realizar la eliminacion ')== true){
    
        let venta = {
            _id : id        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
}

const actualizar = async()=>{
    let _codigo_venta = document.getElementById('codigo_venta').value
    let _codigo_pedido = document.getElementById('codigo_pedido').value;
    let _nombre = document.getElementById('nombre').value
    let _nro_identificacion = document.getElementById('nro_identificacion').value 
    let _tipo_cliente = document.getElementById('tipo_cliente').value;
    let _direccion = document.getElementById('direccion').value;
    let _fecha_entrega = document.getElementById('fecha_entrega').value;
     
        let venta = {
            codigo_venta: _codigo_venta,
            nombre:_nombre,
            nro_identificacion: _nro_identificacion,
            codigo_pedido: _codigo_pedido,
            tipo_cliente: _tipo_cliente,
            direccion: _direccion,
            fecha_entrega: _fecha_entrega
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(venta),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }


if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}


if(document.querySelector('#btnAEliminar')){
    document.querySelector('#btnAEliminar')
.addEventListener('click',eliminar)
}
