// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Ocultar loader después de 1.5 segundos con transición suave
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Transición suave de 0.5s
        }, 1500); // 1.5 segundos para una carga más rápida
    }
});

// Mostrar/Ocultar secciones
function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
        section.setAttribute('aria-hidden', 'true');
    });

    // Mostrar la sección seleccionada
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.add('visible');
        seccion.setAttribute('aria-hidden', 'false');
        seccion.scrollIntoView({ behavior: 'smooth' });
    }

    // Actualizar clase active en el menú y accesibilidad
    document.querySelectorAll('.nav-item, .dropbtn').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
    });
    const menuItem = document.querySelector(`[href="#${seccionId}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
        menuItem.setAttribute('aria-selected', 'true');
    }
    const dropBtn = document.querySelector(`.dropbtn[href="#${seccionId}"]`);
    if (dropBtn) {
        dropBtn.classList.add('active');
        dropBtn.setAttribute('aria-selected', 'true');
    }

    // Cerrar el menú móvil y desplegable si está abierto (solo en dispositivos móviles)
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        const dropButton = document.querySelector('.dropbtn');
        if (dropButton) dropButton.setAttribute('aria-expanded', 'false');
    }
}

// Mostrar Adhesivos por defecto al cargar (después del loader)
window.addEventListener('load', () => {
    setTimeout(() => {
        mostrarSeccion('adhesivos');
    }, 2000); // 2 segundos para coincidir con el loader + transición
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
}

// Filtros y ordenamiento
function filtrarProductos(filtro, seccionId) {
    const catalog = document.getElementById(`${seccionId}-catalog`);
    if (!catalog) return;

    const productos = catalog.querySelectorAll('.product');
    productos.forEach(product => {
        const disponible = product.getAttribute('data-disponible') === 'true';
        switch (filtro) {
            case 'todos':
                product.style.display = 'block';
                break;
            case 'disponibles':
                product.style.display = disponible ? 'block' : 'none';
                break;
            case 'agotados':
                product.style.display = !disponible ? 'block' : 'none';
                break;
            default:
                product.style.display = 'block';
        }
    });
}

function ordenarProductos(orden, seccionId) {
    const catalog = document.getElementById(`${seccionId}-catalog`);
    if (!catalog) return;

    const productos = Array.from(catalog.querySelectorAll('.product'));
    if (!productos.length) return;

    switch (orden) {
        case 'mas-vendidos':
            // Ordenar por un atributo data-vendido (si existe) o aleatorio como backup
            productos.sort((a, b) => {
                const vendidoA = parseInt(a.getAttribute('data-vendido') || 0);
                const vendidoB = parseInt(b.getAttribute('data-vendido') || 0);
                return vendidoB - vendidoA || 0.5 - Math.random();
            });
            break;
        case 'precio-asc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.getAttribute('data-precio')) || 0;
                const precioB = parseFloat(b.getAttribute('data-precio')) || 0;
                return precioA - precioB;
            });
            break;
        case 'precio-desc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.getAttribute('data-precio')) || 0;
                const precioB = parseFloat(b.getAttribute('data-precio')) || 0;
                return precioB - precioA;
            });
            break;
        default:
            return; // No ordenar si el criterio no es válido
    }

    // Reorganizar los elementos en el DOM
    productos.forEach(product => catalog.appendChild(product));
}

// Manejo de errores y compatibilidad
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que las funciones se ejecuten solo cuando el DOM esté listo
    const selectFilters = document.querySelectorAll('.filter-select');
    const selectSorts = document.querySelectorAll('.sort-select');

    selectFilters.forEach(select => {
        select.addEventListener('change', (e) => {
            const seccionId = select.closest('.section').id;
            filtrarProductos(e.target.value, seccionId);
        });
    });

    selectSorts.forEach(select => {
        select.addEventListener('change', (e) => {
            const seccionId = select.closest('.section').id;
            ordenarProductos(e.target.value, seccionId);
        });
    });
});