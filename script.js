

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// Mostrar/Ocultar secciones
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
    });
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.add('visible');
        seccion.scrollIntoView({ behavior: 'smooth' });
    }
    // Actualizar clase active en el menú
    document.querySelectorAll('.nav-item, .dropbtn').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[href="#${seccionId}"]`)?.classList.add('active');
    document.querySelector(`.dropbtn[href="#${seccionId}"]`)?.classList.add('active');

    // Cerrar el menú móvil si está abierto (solo en dispositivos móviles)
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Mostrar Adhesivos por defecto al cargar
window.addEventListener('load', () => {
    mostrarSeccion('adhesivos');
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Filtros y ordenamiento
function filtrarProductos(filtro, seccionId) {
    const catalog = document.getElementById(`${seccionId}-catalog`).querySelectorAll('.product');
    catalog.forEach(product => {
        const disponible = product.getAttribute('data-disponible') === 'true';
        if (filtro === 'todos' || (filtro === 'disponibles' && disponible) || (filtro === 'agotados' && !disponible)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function ordenarProductos(orden, seccionId) {
    const catalog = document.getElementById(`${seccionId}-catalog`);
    const products = Array.from(catalog.querySelectorAll('.product'));
    if (orden === 'mas-vendidos') {
        products.sort(() => 0.5 - Math.random());
    } else if (orden === 'precio-asc') {
        products.sort((a, b) => parseFloat(a.getAttribute('data-precio')) - parseFloat(b.getAttribute('data-precio')));
    } else if (orden === 'precio-desc') {
        products.sort((a, b) => parseFloat(b.getAttribute('data-precio')) - parseFloat(a.getAttribute('data-precio')));
    }
    products.forEach(product => catalog.appendChild(product));
}