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

// Cargar todos los componentes al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const components = [
        { id: 'navbar', url: 'views/navbar.html' },
        { id: 'hero', url: 'views/hero.html' },
        { id: 'features', url: 'views/features.html' },
        { id: 'content', url: 'views/content.html' },
        { id: 'footer', url: 'views/footer.html' },
        { id: 'services', url: 'views/services.html' }
    ];

    // Cargar componentes en paralelo
    const promises = components.map(component => loadComponent(component.id, component.url));
    await Promise.all(promises);

    console.log('Todos los componentes han sido cargados.');
});