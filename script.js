// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const loader = document.getElementById('loader');

    // Ocultar el loader después de 2 segundos (puedes ajustar el tiempo)
    setTimeout(() => {
        loader.classList.add('hidden'); // Usar clase CSS para transición
        document.body.style.overflow = 'auto'; // Habilitar scroll
    }, 2000);

    // Toggle del menú móvil
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-dropdown-content a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            // Mostrar la sección correspondiente al enlace
            const seccionId = link.getAttribute('onclick')?.replace('mostrarSeccion(', '').replace(')', '').trim();
            if (seccionId) mostrarSeccion(seccionId);
        });
    });

    // Mostrar sección específica al hacer clic
    function mostrarSeccion(seccionId) {
        const secciones = document.querySelectorAll('.section');
        secciones.forEach(seccion => {
            if (seccion.id === seccionId) {
                seccion.classList.add('visible');
                // Asegurar que el catálogo dentro de la sección sea visible
                const catalogo = seccion.querySelector('.catalog');
                if (catalogo) catalogo.style.display = 'grid';
            } else {
                seccion.classList.remove('visible');
                const catalogo = seccion.querySelector('.catalog');
                if (catalogo) catalogo.style.display = 'none';
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave al inicio
    }

    // Mostrar la primera sección (Adhesivos) por defecto
    mostrarSeccion('adhesivos');

    // Filtrar productos
    function filtrarProductos(filtro, seccion) {
        const productos = document.querySelectorAll(`#${seccion}-catalog .product`);
        productos.forEach(producto => {
            const disponible = producto.getAttribute('data-disponible') === 'true';
            switch (filtro) {
                case 'todos':
                    producto.style.display = 'block';
                    break;
                case 'disponibles':
                    producto.style.display = disponible ? 'block' : 'none';
                    break;
                case 'agotados':
                    producto.style.display = !disponible ? 'block' : 'none'; // Corrección lógica
                    break;
                default:
                    producto.style.display = 'block';
            }
        });
    }

    // Ordenar productos
    function ordenarProductos(criterio, seccion) {
        const catalogo = document.getElementById(`${seccion}-catalog`);
        const productos = Array.from(catalogo.getElementsByClassName('product'));

        productos.sort((a, b) => {
            const precioA = parseFloat(a.getAttribute('data-precio')) || 0;
            const precioB = parseFloat(b.getAttribute('data-precio')) || 0;

            switch (criterio) {
                case 'precio-asc':
                    return precioA - precioB;
                case 'precio-desc':
                    return precioB - precioA;
                case 'mas-vendidos':
                    // Simulación de "más vendidos" (ajusta con datos reales si los tienes)
                    const ventasA = parseInt(a.getAttribute('data-ventas') || 0);
                    const ventasB = parseInt(b.getAttribute('data-ventas') || 0);
                    return ventasB - ventasA;
                default:
                    return 0;
            }
        });

        // Reordenar los productos en el DOM
        productos.forEach(producto => catalogo.appendChild(producto));
    }

    // Asignar eventos a los selectores de filtro y ordenamiento
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const seccion = e.target.closest('.section').id;
            filtrarProductos(e.target.value, seccion);
        });
    });

    document.querySelectorAll('.sort-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const seccion = e.target.closest('.section').id;
            ordenarProductos(e.target.value, seccion);
        });
    });

    // Scroll suave al hacer clic en enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Cerrar menú móvil si está abierto
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                // Mostrar la sección si tiene ID
                const seccionId = target.id;
                if (seccionId) mostrarSeccion(seccionId);
            }
        });
    });

    // Añadir funcionalidad de WhatsApp con mensaje dinámico
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionTitle = btn.closest('.section')?.querySelector('.section-title')?.textContent || 'un producto';
            const defaultMessage = encodeURIComponent(`Hola, quiero pedir ${sectionTitle} Zamma`);
            const whatsappUrl = btn.getAttribute('href') || `https://wa.me/522721919293?text=${defaultMessage}`;
            btn.setAttribute('href', whatsappUrl);
        });
    });

    // Verificación básica de carga de imágenes
    document.querySelectorAll('.product img').forEach(img => {
        img.onerror = () => {
            console.error(`Error al cargar la imagen: ${img.src}`);
            img.src = 'https://via.placeholder.com/200x150?text=Imagen+No+Disponible'; // Placeholder
        };
    });
});
