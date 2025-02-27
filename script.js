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

    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
        const isDropdownOpen = document.querySelector('.nav-dropdown-content')?.classList.contains('active');
        if (!isDropdownOpen) {
            setTimeout(() => {
                navMenu.classList.remove('active');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }, 700); // Aumentado a 700ms para mayor tolerancia
        }
        const dropButton = document.querySelector('.dropbtn');
        if (dropButton && !isDropdownOpen) dropButton.setAttribute('aria-expanded', 'false');
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
    let touchActive = false; // Bandera para rastrear interacción táctil

    // Manejo de clic para escritorio y móviles
    dropButton.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            if (isExpanded) {
                touchActive = true;
                setTimeout(() => { touchActive = false; }, 1500); // Aumentado a 1500ms
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

    // Manejo de toque para móviles
    dropButton.addEventListener('touchstart', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que se propague a otros eventos
            const isExpanded = !dropdownContent.classList.contains('active');
            dropdownContent.classList.toggle('active', isExpanded);
            dropButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            if (isExpanded) {
                touchActive = true;
                setTimeout(() => { touchActive = false; }, 1500);
            }
            if (isExpanded && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, { passive: false });

    // Manejo de desplazamiento para evitar cierres accidentales
    dropButton.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768 && dropdownContent.classList.contains('active')) {
            e.preventDefault(); // Evitar cierre durante desplazamiento
        }
    }, { passive: false });

    // Cerrar el desplegable si se hace clic o toca fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !touchActive && !dropButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            setTimeout(() => {
                dropdownContent.classList.remove('active');
                dropButton.setAttribute('aria-expanded', 'false');
            }, 500); // Aumentado a 500ms
        }
    });

    document.addEventListener('touchend', (e) => {
        if (window.innerWidth <= 768 && !touchActive && !dropButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            setTimeout(() => {
                dropdownContent.classList.remove('active');
                dropButton.setAttribute('aria-expanded', 'false');
            }, 500);
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
