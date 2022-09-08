(function(){
    document.addEventListener('DOMContentLoaded', () => {
        // Nos conectamos a la base de datos creada en app.js
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    function validarCliente(e) {
        e.preventDefault();

        // Leer todos los Input
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Crear un objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now();
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error', 'error');
        };

        transaction.oncomplete = function() {
            console.log('Cliente Agregado');

            imprimirAlerta('El cliente se agregó correctamente');
            
            // Redirigir al usuario al index principal
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
})();