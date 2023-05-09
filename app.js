// ARRAY PRODUCTOS
let plantas = [
    { id: 1, nombre: "lengua de suegra", tipo: "interior", precio: 2000, cantComprada: 0 },
    { id: 2, nombre: "potus", tipo: "interior", precio: 1500, cantComprada: 0 },
    { id: 3, nombre: "rosario corazon", tipo: "interior", precio: 2500, cantComprada: 0 },
    { id: 4, nombre: "lazo de amor", tipo: "interior", precio: 1000, cantComprada: 0 },
    { id: 5, nombre: "helecho", tipo: "interior", precio: 2000, cantComprada: 0 },
    { id: 6, nombre: "lirio de la paz", tipo: "interior", precio: 2000, cantComprada: 0 },
    { id: 7, nombre: "monstera deliciosa", tipo: "exterior", precio: 4000, cantComprada: 0 },
    { id: 8, nombre: "guzmania", tipo: "exterior", precio: 3500, cantComprada: 0 },
    { id: 9, nombre: "sarracenia", tipo: "exterior", precio: 2000, cantComprada: 0 },
    { id: 10, nombre: "ave del paraiso", tipo: "exterior", precio: 3500, cantComprada: 0 },
    { id: 11, nombre: "jazmin", tipo: "exterior", precio: 2500, cantComprada: 0 },
    { id: 12, nombre: "margarita", tipo: "exterior", precio: 2000, cantComprada: 0 },
];

plantas.forEach(planta => console.log(planta));

// ARRAY MENU
const menuLista = [
    { id: "a", nombre: "Comprar plantas" },
    { id: "b", nombre: "Ver carrito" },
    { id: "c", nombre: "Eliminar producto" },
    { id: "d", nombre: "Vaciar carrito" },
    { id: "e", nombre: "Finalizar compra" },
];

let carrito = [];

const listaOperaciones = menuLista.map((elemento) => "\n" + elemento.id + ". " + elemento.nombre);

const listaDePlantas = plantas.map((elemento) => "\n" + elemento.id + ". " + elemento.nombre + " -  $" + elemento.precio);




// AGREGAR AL CARRITO

function comprar() {
    const seleccionaPlanta = parseInt(prompt("que planta te gustaria?" + "\n" + listaDePlantas))
    const plantaEncontrada = plantas.find((elem) => elem.id === seleccionaPlanta)
    carrito.push(plantaEncontrada)

    let cantidadDePlantas = prompt("Cuantas unidades queres llevar?");
        if (cantidadDePlantas <= 0 || cantidadDePlantas === null) {
            alert("Opción inválida. Intente de nuevo.");
        }
        else {
        carrito.cantComprada = cantidadDePlantas;
        }
};



function continuar() {
    let seguir;
    do {
        comprar();
        seguir = prompt("Desea seguir comprando? si/no")
    } while (seguir === "si");
}

// VER CARRITO

function verCarrito() {
    let plantasCarrito = carrito.map((elemento) => "\n" + elemento.cantComprada + " " + elemento.nombre + " -  $" + (elemento.precio * elemento.cantComprada))

    alert("Tu carrito de compras hasta el momento:" + "\n" + plantasCarrito)
}

// FINALIZA LA COMPRA

function finalizarCompra() {
    verCarrito()
    let precio = carrito.map((el) => el.precio);
    const total = precio.reduce((acumulador, elemento) => acumulador + elemento, 0);
    alert("El total de tu compra es: $" + total);
}

function eliminarPlanta() {
}

// FUNCTION GENERAL

function selection() {
    const seleccion = prompt("Qué operación desea realizar?" + listaOperaciones);
    if (seleccion === "a") {
        comprar()
        continuar()
        selection()
    }

    else if (seleccion === "b") {
        verCarrito()
        selection()
    }

    else if (seleccion === "c") {
        eliminarPlanta()
        verCarrito()
        selection()
    }

    else if (seleccion === "d") {
        carrito.splice(0, carrito.length);
        alert("Tu carrito se ha vaciado")
        selection()
    }

    else {
        finalizarCompra()
    }

}

selection()

