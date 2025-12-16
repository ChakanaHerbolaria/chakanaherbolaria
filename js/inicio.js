let productosData = [];

function setMarco(prod){
    const marco = document.getElementById("hero_prod");
    marco.innerHTML = `
        <h3>${prod.titulo}</h3>
        <div class="contenedor_img_hero">
        <img src="${prod.imagen}" alt="${prod.titulo}">
        </div>
        <a class="info" href="producto.html?id=${prod.id}">Más información</a>
        <p class="precio">${prod.precio[0]}</p>
        <a class="btn_tienda" href="tienda.html">Ir a tienda</a>
    `;
}

function rotar(){
    setMarco(productosData[Math.floor(Math.random() * productosData.length)]);
    setTimeout(rotar, 3500);
}

fetch("json/productos.json")
  .then(response => response.json())
  .then(productos => {
    productosData = productos;
    rotar();
  })
  .catch(error => console.error("Error al cargar productos:", error));
