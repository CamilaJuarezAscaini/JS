document.addEventListener('DOMContentLoaded', () => {
    let baseDeDatos = [
        { id: 1, nombre: "lengua de suegra", precio: 2000, imageUrl: "LenguaDeSuegra.png" },
        { id: 2, nombre: "potus", precio: 1500, imageUrl: "potuss.jpg" },
        { id: 3, nombre: "rosario corazon", precio: 2500, imageUrl: "RosarioCorazon.png" },
        { id: 4, nombre: "Palmito", precio: 1000, imageUrl: "Palmito.png" },
        { id: 5, nombre: "Lirio", precio: 2000, imageUrl: "lilirios.jpg" },
        { id: 6, nombre: "China del DInero", precio: 2000, imageUrl: "ChinaDinero.png" },
        { id: 7, nombre: "Pluma rosa", precio: 4000, imageUrl: "plumaRosa.png" },
    ];


    let carrito = [];
    // ELEMENTOS DEL DOM
    const divisa = '$';
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.getElementById('carrito');
    const DOMtotal = document.getElementById('total');
    const DOMbotonVaciar = document.getElementById('boton-vaciar');
    const miLocalStorage = window.localStorage;


    // LISTA PRODUCTOS
    function renderizarProductos() {
        baseDeDatos.forEach((item) => {
            const card = `
              <div class="card">
                <img src="${item.imageUrl}" alt="${item.nombre}">
                <div class="card-body"> 
                   <h5 class="card-title">${item.nombre}</h5>
                   <p class="card-text"> ${divisa} ${item.precio}</p>
                   <button type="button" class="btn btn-primary" id="btnAgregar">Agregar al Carrito</button>
                </div>
              </div>
              `;
              DOMitems.innerHTML += card;
              let btnAgregar = document.getElementById('btnAgregar')
              btnAgregar.setAttribute('marcador', item.id);
              btnAgregar.addEventListener('click', agregarProductos);
        });
    }

    function agregarProductos(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
    }



    function renderizarCarrito() {
        DOMcarrito.innerHTML = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${ numeroUnidadesItem } x ${ miItem[0].nombre } - ${ miItem[0].precio }${ divisa } `;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'position-absolute', 'top-0', 'start-100');
            miBoton.textContent = 'X';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }


    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }


    function calcularTotal() {
        return carrito.reduce((acum, elem) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(elem);
            });
            console.log(miItem)

            return acum + miItem[0].precio;
        }, 0);
    }

    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});

