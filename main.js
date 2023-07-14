let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const mostrarProductos = (productos) => {
    const contenedorProductos = document.querySelector(".product-list");
    contenedorProductos.innerHTML = "";

    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <p>Nombre: ${producto.nombre}</p>
      <span> origen: ${producto.origen}</span>
      <b> PRECIO: $${producto.precio}</b>
      <img src="${producto.img}" />
      <p > id: ${producto.id}</p>
      <button id="btnAgregar-${producto.id}" class="add-to-cart">COMPRAR</button>
    `;

        contenedorProductos.appendChild(li);

        const boton = document.getElementById(`btnAgregar-${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
};

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);

    if (producto && !carrito.some((item) => item.id === id)) {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

const mostrarCarrito = () => {
    const contenedorCarrito = document.querySelector(".carrito");
    contenedorCarrito.innerHTML = "";

    if (carrito.length > 0) {
        const elementosCarrito = document.createElement("ul");
        elementosCarrito.classList.add("elementosCarrito");
        contenedorCarrito.appendChild(elementosCarrito);

        const contenedorTotal = document.createElement("p");
        actualizarTotal(contenedorTotal);
        contenedorCarrito.appendChild(contenedorTotal);

        carrito.forEach((producto) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <img src="${producto.img}" />
        <div class="productContent">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
        </div>
        <button id="eliminar-${producto.id}" class="remove">Eliminar</button>
      `;
            elementosCarrito.appendChild(li);

            const boton = document.getElementById(`eliminar-${producto.id}`);
            boton.addEventListener("click", () => {
                eliminarProducto(producto.id);
            });
        });
    } else {
        contenedorCarrito.innerHTML = `<p class="vacio">No hay frutas</p>`;
    }
};

const eliminarProducto = (id) => {
    carrito = carrito.filter((producto) => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

const actualizarTotal = (contenedor) => {
    const total = carrito.reduce(
        (acumulador, producto) => acumulador + producto.precio,
        0
    );
    contenedor.textContent = `Total: $${total}`;
};

let texto1 = document.getElementById("miContenedor1");
const zonasEntrega = [
    { zona: 1, barrios: "Belgrano Nuñez Saavedra", costoEnvio: 1300 },
    { zona: 2, barrios: "Palermo Recoleta Retiro", costoEnvio: 1500 },
    { zona: 3, barrios: "Vicente Lopez Florida Olivos", costoEnvio: 1150 },
    { zona: 4, barrios: "La Lucila Accasuso Martines", costoEnvio: 875 },
    { zona: 5, barrios: "San Isidro Beccar Victoria", costoEnvio: 900 },
    { zona: 6, barrios: "San Fernando Tigre", costoEnvio: 1200 },
];

zonasEntrega.forEach((sector) => {
    let div = document.createElement("div");
    div.className = "envios";
    div.innerHTML = `
    <span> ZONA DE ENVIO <b>${sector.zona}</b></span>
    <p> Barrios: ${sector.barrios}</p>
    <b> COSTO DE ENVIO: $${sector.costoEnvio}</b>
    <button id="boton">ELEGIR</button>
  `;
    texto1.appendChild(div);
});