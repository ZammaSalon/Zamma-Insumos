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
    const dropBtn = document.querySelector(`.dropbtn[href="#${seccionId}"]`);
    if (dropBtn) {
        dropBtn.classList.add('active');
        dropBtn.setAttribute('aria-selected', 'true');
    }

    // Cerrar menú y dropdown en móviles
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const dropdownContent = document.querySelector('.nav-dropdown-content');
        const menuToggle = document.querySelector('.menu-toggle');
        const dropButton = document.querySelector('.dropbtn');
        if (navMenu && navMenu.classList.contains('active')) {
            setTimeout(() => {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }, 300); // Reducido para mejor respuesta
        }
        if (dropdownContent && dropdownContent.classList.contains('active')) {
            setTimeout(() => {
                dropdownContent.classList.remove('active');
                if (dropButton) dropButton.setAttribute('aria-expanded', 'false');
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
    menuToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
}

if (dropButton && dropdownContent) {
    let touchActive = false;

    // Manejo de toque para móviles
    dropButton.addEventListener('touchstart', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            if (isExpanded) {
                touchActive = true;
                setTimeout(() => { touchActive = false; }, 1000);
            }
            if (isExpanded && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, { passive: false });

    // Manejo de clic (evitar duplicidad con touchstart)
    dropButton.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (e.defaultPrevented) return; // Ignorar si touchstart ya lo manejó
            e.preventDefault();
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            if (isExpanded) {
                touchActive = true;
                setTimeout(() => { touchActive = false; }, 1000);
            }
            if (isExpanded && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        } else {
            const seccionId = dropButton.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        }
    });

    // Manejo de desplazamiento para evitar cierres accidentales
    dropButton.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768 && dropdownContent.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Cerrar al tocar fuera
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

    // Cerrar con clic fuera (para compatibilidad)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !touchActive && !dropButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('active');
            dropButton.setAttribute('aria-expanded', 'false');
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