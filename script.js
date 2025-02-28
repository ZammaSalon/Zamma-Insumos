:root {
    --black: #0a0a0a;
    --gold: #D4AF37;
    --light-gold: rgba(212, 175, 55, 0.2);
    --white: #ffffff;
    --transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;
    line-height: 1.6;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
}

/* Loader */
#loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

#loader.hidden {
    opacity: 0;
    pointer-events: none;
}

.loader-bar {
    width: 200px;
    height: 4px;
    background: var(--light-gold);
    border-radius: 2px;
    overflow: hidden;
}

.loader-progress {
    width: 0;
    height: 100%;
    background: var(--gold);
    animation: load 1.5s ease-in-out infinite alternate;
}

@keyframes load {
    0% { width: 0; }
    100% { width: 100%; }
}

/* Header */
header {
    background: rgba(10, 10, 10, 0.95);
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--gold), #FFE8A3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    text-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
    transition: var(--transition);
}

.logo:hover {
    text-shadow: 0 0 25px rgba(212, 175, 55, 1);
}

.nav-menu {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    transition: all 0.3s ease;
}

.nav-dropdown {
    position: relative;
    display: inline-block;
}

.nav-dropdown .dropbtn {
    color: var(--white);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    -webkit-tap-highlight-color: transparent;
}

.nav-dropdown .dropbtn:hover, .nav-dropdown .dropbtn.active {
    color: var(--gold);
}

.nav-dropdown .dropbtn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.nav-dropdown .dropbtn:hover::after, .nav-dropdown .dropbtn.active::after {
    transform: scaleX(1);
}

.nav-dropdown-content {
    display: none;
    position: absolute;
    background: rgba(10, 10, 10, 0.95);
    min-width: 200px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    z-index: 1001;
    border-radius: 5px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.nav-dropdown-content.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.nav-dropdown:hover .nav-dropdown-content, .nav-dropdown:focus-within .nav-dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.nav-dropdown-content a {
    color: var(--white);
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    display: block;
    font-size: 1rem;
    transition: var(--transition);
    position: relative;
    -webkit-tap-highlight-color: transparent;
}

.nav-dropdown-content a::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: var(--gold);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.nav-dropdown-content a:hover::before {
    transform: scaleY(1);
}

.nav-dropdown-content a:hover {
    color: var(--gold);
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(5px);
}

.nav-item {
    color: var(--white);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    transition: var(--transition);
    cursor: pointer;
}

.nav-item:hover, .nav-item.active {
    color: var(--gold);
}

.menu-toggle {
    display: none;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: var(--white);
    cursor: pointer;
    z-index: 1002;
    position: relative;
}

/* Hero */
.hero {
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('ruta/a/tu/video/lashes.mp4') no-repeat center center;
    background-size: cover;
    color: var(--white);
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero p {
    font-size: 1.1rem;
    max-width: 700px;
    margin-bottom: 1.5rem;
}

.hero .cta-btn {
    background: var(--gold);
    color: var(--black);
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;
    box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
}

.hero .cta-btn:hover {
    background: #FFE8A3;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5);
}

/* Secciones */
.section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    display: none;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translateY(10px);
}

.section.visible {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--gold);
    font-weight: 700;
    text-align: center;
    position: relative;
    text-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: var(--gold);
    border-radius: 2px;
    animation: pulse 2s infinite alternate;
}

@keyframes pulse {
    0% { transform: translateX(-50%) scaleX(1); }
    100% { transform: translateX(-50%) scaleX(1.2); }
}

/* Catálogo */
.catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.filter-select, .sort-select {
    padding: 0.6rem 1.2rem;
    border: 2px solid var(--light-gold);
    border-radius: 25px;
    font-size: 0.9rem;
    background: var(--black);
    color: var(--white);
    transition: var(--transition);
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-select:hover, .sort-select:hover {
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}

.product {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    transition: var(--transition);
    border: 2px solid var(--light-gold);
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.product:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    border-color: var(--gold);
}

.product::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(212, 175, 55, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.product:hover::before {
    opacity: 1;
}

.product img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: 5px;
    margin-bottom: 0.8rem;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product:hover img {
    transform: scale(1.05);
}

.product h3 {
    color: var(--white);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.product p {
    color: var(--gold);
    font-size: 0.9rem;
    font-weight: 600;
}

.sold-out {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--light-gold);
    color: var(--white);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    animation: blink 2s infinite;
}

@keyframes blink {
    50% { opacity: 0.7; }
}

/* Botón WhatsApp */
.whatsapp-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--gold);
    color: var(--white);
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.whatsapp-btn:hover {
    background: #FFE8A3;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5);
}

/* Ubicación */
.location-container {
    max-width: 1200px;
    width: 90%;
    text-align: center;
}

#ubicacion iframe {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    border: 2px solid var(--gold);
    margin-top: 1.5rem;
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.1);
}

#ubicacion p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--white);
}

#ubicacion a {
    color: var(--gold);
    text-decoration: none;
    transition: var(--transition);
    font-size: 0.9rem;
}

#ubicacion a:hover {
    color: #FFE8A3;
}

/* Footer */
footer {
    padding: 2rem 2rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.03);
    font-size: 0.9rem;
    color: var(--white);
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.social-links {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.social-links a {
    color: var(--gold);
    font-size: 1.2rem;
    transition: var(--transition);
    position: relative;
}

.social-links a::before {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--gold);
    transition: var(--transition);
}

.social-links a:hover::before {
    width: 15px;
}

.social-links a:hover {
    color: #FFE8A3;
    transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
    .header-container {
        padding: 0 1rem;
    }

    .nav-menu {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(10, 10, 10, 0.95);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .nav-menu.active {
        display: flex;
    }

    .menu-toggle {
        display: block;
    }

    .hero {
        min-height: 30vh;
        padding: 2rem 1rem;
        background-size: cover;
        background-position: center;
    }

    .hero h1 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 0.9rem;
    }

    .catalog {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .product {
        padding: 0.8rem;
    }

    .product img {
        height: auto;
        max-height: 150px;
    }

    .product h3 {
        font-size: 0.9rem;
    }

    .product p {
        font-size: 0.8rem;
    }

    .whatsapp-btn {
        bottom: 1.5rem;
        right: 1.5rem;
        padding: 0.6rem 1.2rem;
        font-size: 0.8rem;
    }

    .nav-dropdown:hover .nav-dropdown-content {
        display: none;
    }

    .nav-dropdown-content {
        position: absolute;
        width: 100%;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        background: rgba(10, 10, 10, 0.95);
        padding: 0;
        top: 100%;
        left: 0;
        display: none;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }

    .nav-dropdown-content.active {
        display: block;
        opacity: 1;
        transform: translateY(0);
        z-index: 1001;
    }

    .nav-dropdown-content a {
        padding: 0.8rem 2rem;
        width: 100%;
        text-align: center;
    }

    .nav-dropdown .dropbtn {
        padding: 0.5rem 1rem;
    }

    .nav-dropdown .dropbtn:hover {
        color: var(--gold);
    }
}

@media (max-width: 480px) {
    .hero h1 {
        font-size: 1.5rem;
    }
    .hero p {
        font-size: 0.8rem;
    }
    .whatsapp-btn {
        padding: 0.5rem 1rem;
        font-size: 0.7rem;
        bottom: 1rem;
        right: 1rem;
    }
    .product {
        padding: 0.5rem;
    }
    .product h3 {
        font-size: 0.85rem;
    }
    .product p {
        font-size: 0.75rem;
    }
}