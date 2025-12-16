const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  // error controlado
  window.location.href = 'index.html';
}

fetch('json/productos.json')
  .then(r => r.json())
  .then(productos => {
    const producto = productos.find(p => p.id === id);

    if (!producto) {
      document.body.innerHTML = '<h1>Producto no encontrado</h1>';
      return;
    }

    document.getElementById('titulo').textContent = producto.titulo;
    document.getElementById('descripcion').textContent = producto.descripcion;
    
    const galeria = document.getElementById('galeria');
    const img = document.createElement('img');
    img.src = producto.imagen;
    galeria.appendChild(img);

    const precio = document.getElementById('precio');
    let contador=0;
    producto.precio.forEach(p => {
      const formato = document.createElement('p');

      if(producto.cant!=null){
        formato.textContent = producto.cant[contador]+" "+p;
        contador++;
      }else{
        formato.textContent = p;
      }
      precio.appendChild(formato);
    })
    const boton = document.createElement('a');
    boton.textContent = "Contactar por WhatsApp";
    boton.href = "https://wa.me/593995840993?text=Hola, me interesa: "+producto.titulo;
    boton.target = "blank";
    boton.className = "whatsapp";
    precio.appendChild(boton);

    const uso = document.getElementById('uso');
    producto.propiedades.forEach(p => {
      const linea = document.createElement('p');
      linea.textContent = p;
      uso.appendChild(linea);
    })
  })
