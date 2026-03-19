//  Cargar componente dinámicamente
async function loadComponent(id, url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);

        document.getElementById(id).innerHTML = await res.text();
    } catch (err) {
        console.error(`Error cargando ${id}:`, err);
    }
}

//  Detectar si estamos dentro de /views/
const isInViews = window.location.pathname.includes('/views/');

// Obtener ruta del componente
function getComponentUrl(name) {
    return isInViews
        ? `../views/${name}.html`
        : `views/${name}.html`;
}

//  Activar link activo automáticamente
function activateNavLink() {
    const current = window.location.pathname;

    document.querySelectorAll('.nav-link').forEach(link => {
        const page = link.dataset.page; // data-page

        // Activa si la URL incluye el nombre de la página
        if (
            (page === 'inicio' && !isInViews) ||
            current.includes(`${page}.html`)
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

//  Inicialización
document.addEventListener('DOMContentLoaded', async () => {

    // Componentes base (siempre)
    let components = ['navbar', 'footer'];

    // Componentes solo para index
    if (!isInViews) {
        components = [
            'navbar',
            'hero',
            'features',
            'content',
            'portfolio',
            'footer'
        ];
    }

    // Cargar todos en paralelo
    await Promise.all(
        components.map(c => loadComponent(c, getComponentUrl(c)))
    );

    activateNavLink();

    console.log('Componentes cargados');
});