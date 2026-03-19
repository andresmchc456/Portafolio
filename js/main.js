// Función para cargar un componente dinámicamente
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando componente ${id}:`, error);
    }
}

// Detectar si estamos en index.html (raíz) o en una página dentro de views/
function getComponentUrl(componentName) {
    const currentPage = window.location.pathname;
    if (currentPage.includes('/views/')) {
        // Si estamos en una página dentro de views/, usar rutas relativas hacia arriba
        return `../views/${componentName}.html`;
    }
    // Si estamos en index.html (raíz), usar rutas normales
    return `views/${componentName}.html`;
}

// Determinar la página actual y marcar el link activo en la navbar
function activateNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const dataPage = link.getAttribute('data-page');
        
        if (currentPage.includes('/services.html') && dataPage === 'services') {
            link.classList.add('active');
        } else if (!currentPage.includes('/views/') && dataPage === 'inicio') {
            link.classList.add('active');
        }
    });
}

// Cargar todos los componentes al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const componentsToLoad = ['navbar', 'footer'];
    
    // Verificar si la página actual es index.html y tiene más componentes
    const currentPage = window.location.pathname;
    if (!currentPage.includes('/views/')) {
        componentsToLoad.unshift('hero');
        componentsToLoad.splice(2, 0, 'features', 'content');
    }

    const components = componentsToLoad.map(component => ({
        id: component,
        url: getComponentUrl(component)
    }));

    // Cargar componentes en paralelo
    const promises = components.map(component => loadComponent(component.id, component.url));
    await Promise.all(promises);
    
    // Activar el link de navegación correcto después de cargar los componentes
    activateNavLink();

    console.log('Todos los componentes han sido cargados.');
});