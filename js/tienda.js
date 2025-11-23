

let productosData = [];

// Función para mostrar productos
function mostrarProductos(filtro = "todos") {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = ""; // limpiar antes de volver a mostrar

  let filtrados = productosData;

  if (filtro !== "todos") {
    filtrados = productosData.filter(p => p.tipo === filtro);
  }

  if (filtrados.length === 0) {
    contenedor.innerHTML = "<p>No hay elementos para mostrar.</p>";
    return;
  }

  filtrados.forEach(prod => {
    const item = document.createElement("div");
    item.classList.add("producto");

    item.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.titulo}">
        <h3>${prod.titulo}</h3>
        <p>${prod.descripcion}</p>
        <div class="precio">$${prod.precio[0]}</div>
      `;

    item.addEventListener("click", () => abrirModal(prod));
    contenedor.appendChild(item);
  });
}


// Abrir modal
function abrirModal(prod) {
  const modal = document.getElementById("modal");
  const left = document.getElementById("modal-left");
  const right = document.getElementById("modal-right");

  left.innerHTML = `
    <h2>${prod.titulo}</h2>
    <p>${prod.descripcion}</p>
    <div class="precio">Precio: $${prod.precio}</div>
    <a class="whatsapp" target="_blank" href="https://wa.me/593995840993?text=Hola, estoy interesado en ${encodeURIComponent(prod.titulo)}">
      Contactar por WhatsApp
    </a>
  `;

  right.innerHTML = `<img src="${prod.imagen}" alt="${prod.titulo}">`;

  modal.style.display = "flex";
}

// Cerrar modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});

// Cargar JSON y mostrar todo al inicio
fetch("json/productos.json")
  .then(response => response.json())
  .then(productos => {
    productosData = productos;
    mostrarProductos();
  })
  .catch(error => console.error("Error al cargar productos:", error));

// Evento del filtro
document.getElementById("filtro-tipo").addEventListener("change", (e) => {
  mostrarProductos(e.target.value);
});
