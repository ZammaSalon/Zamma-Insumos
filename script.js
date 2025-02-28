// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// Mostrar/Ocultar secciones
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
        section.setAttribute('aria-hidden', 'true');
    });

    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.add('visible');
        seccion.setAttribute('aria-hidden', 'false');
        seccion.scrollIntoView({ behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-item, .dropbtn').forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
    });
    const menuItem = document.querySelector(`[href="#${seccionId}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
        menuItem.setAttribute('aria-selected', 'true');
    }

    // En móviles, cerrar solo el menú principal (nav-menu), no el dropdown
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            setTimeout(() => {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }, 300);
        }
    }
}

// Mostrar Adhesivos por defecto al cargar
window.addEventListener('load', () => {
    setTimeout(() => {
        mostrarSeccion('adhesivos');
    }, 2000);
});

// Menú móvil y desplegable
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropButton = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.nav-dropdown-content');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        const isExpanded = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Soporte táctil para el botón hamburguesa
    menuToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const isExpanded = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }, { passive: false });
}

if (dropButton && dropdownContent) {
    // Abrir/cerrar el desplegable con click
    dropButton.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    });

    // Soporte táctil para abrir el desplegable
    dropButton.addEventListener('touchstart', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    }, { passive: false });

    // Asegurar que los enlaces dentro del dropdown funcionen
    dropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el click cierre el dropdown
            const seccionId = link.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        });

        link.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            const seccionId = link.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        }, { passive: false });
    });

    // Cerrar dropdown al tocar fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !dropButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('active');
            dropButton.setAttribute('aria-expanded', 'false');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    document.addEventListener('touchend', (e) => {
        if (window.innerWidth <= 768 && !dropButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('active');
            dropButton.setAttribute('aria-expanded', 'false');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
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
            productos.sort((a, b) => {
                const vendidoA = parseInt(a.getAttribute('data-vendido') || 0);
                const vendidoB = parseInt(b.getAttribute('data-vendido') || 0);
                return vendidoB - vendidoA || 0.5 - Math.random();
            });
            break;
        case 'precio-asc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.getAttribute('data-precio') || 0);
                const precioB = parseFloat(b.getAttribute('data-precio') || 0);
                return precioA - precioB;
            });
            break;
        case 'precio-desc':
            productos.sort((a, b) => {
                const precioA = parseFloat(a.getAttribute('data-precio') || 0);
                const precioB = parseFloat(b.getAttribute('data-precio') || 0);
                return precioB - precioA;
            });
            break;
        default:
            return;
    }

    productos.forEach(product => catalog.appendChild(product));
}

// Manejo de errores y compatibilidad
document.addEventListener('DOMContentLoaded', () => {
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
